/*------------------------------------------------------------------------------
 *******************************************************************************
 * COPYRIGHT Ericsson 2016
 *
 * The copyright to the computer program(s) herein is the property of
 * Ericsson Inc. The programs may be used and/or copied only with written
 * permission from Ericsson Inc. or in accordance with the terms and
 * conditions stipulated in the agreement/contract under which the
 * program(s) have been supplied.
 *******************************************************************************
 *----------------------------------------------------------------------------*/

package com.ericsson.ecb.ui;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.net.ssl.SSLContext;

import org.apache.http.client.HttpClient;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.ssl.SSLContextBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

import com.google.common.base.Strings;

import javax.annotation.PostConstruct;

/*
    CyberSource response receiver after successful addition or update
    of card response.
*/

@Controller
public class PaymentController {

  private final Logger logger = LoggerFactory.getLogger(this.getClass());

  @Value("${http.client.ssl.trust-store:#{null}}")
  private String keyStore;
  @Value("${http.client.ssl.trust-store-password:#{null}}")
  private String keyStorePassword;

  @Autowired
  private PathProp pathProp;

  private RestTemplate restTemplate = new RestTemplate();

  @PostConstruct
  private void setupTemplate() {
    try {
      if (keyStore == null) {
        logger.debug("http.client.ssl.trust-store is not set, so not setting trust store for RestTemplate");
        return;
      } else {
        SSLContext sslContext = new SSLContextBuilder()
            .loadTrustMaterial(
                new java.io.File(keyStore),
                keyStorePassword.toCharArray()
            ).build();
        SSLConnectionSocketFactory socketFactory =
            new SSLConnectionSocketFactory(sslContext);
        HttpClient httpClient = HttpClients.custom()
            .setSSLSocketFactory(socketFactory).build();
        HttpComponentsClientHttpRequestFactory factory =
            new HttpComponentsClientHttpRequestFactory(httpClient);
        logger.debug("RestTemplate configured using trustStore: " + keyStore);
        restTemplate = new RestTemplate(factory);
      }
    } catch (Throwable t) {
      logger.error("Failed to initialize PaymentController", t);
      throw new RuntimeException(t);
    }
  }

  @RequestMapping(value="/payment/receipt")
  public String saveData(HttpServletRequest request,
      HttpServletResponse response,Map<String, Object> model){
	  if (!Strings.isNullOrEmpty(pathProp.getxFrameHeader())) {
        response.addHeader("X-Frame-Options", pathProp.getxFrameHeader());
	  }
    HashMap params = new HashMap();
    Enumeration paramsEnum = request.getParameterNames();
    String json="{";
    while (paramsEnum.hasMoreElements()) {
      String paramName = (String) paramsEnum.nextElement();
      String paramValue = request.getParameter(paramName);
      json+="\""+paramName+"\":\""+paramValue+"\",";
      params.put(paramName, paramValue);
    }
    json=json.substring(0,json.lastIndexOf(","));
    json+="}";
    model.put("domainLink", pathProp.getDomainLink());
    model.put("request", params);

    ResponseEntity<JSONObject> apiResponse;
    ResponseEntity<JSONObject> invoiceList;
    OauthTokenInfo oauth;
    String status = "";
    String message = "";
    String method = "";
    try {
      oauth = (OauthTokenInfo) request.getSession().getAttribute("USER-OAUTH-TOKEN-INFO");
      String accessToken="";
      if (oauth != null){
        accessToken = oauth.getAccessToken();
      }

      if (params.get("req_transaction_type").equals("create_payment_token")) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + accessToken);

        /*
         * For OneTimePayment, the form sent to CyberSource will contain
         * 3 additional fields, which are also present in the response
         * from CyberSource and are used for processing the payment in
         * this section . These fields are -
         * merchant_defined_data1 -> flag for one time payment
         * merchant_defined_data2 -> Payment Amount
         * merchant_defined_data3 -> Invoice Date
         */
        if (params.containsKey("req_merchant_defined_data1") && params
            .get("req_merchant_defined_data1").equals("onetimepayment") &&
            params.get("req_merchant_defined_data4").equals("INVOICE_LIST_UUID")) {
          HashMap<String, String> ecbPaymentData = new HashMap<>();
          ecbPaymentData.put("IsOneTimePayment", "true");
          ecbPaymentData.put("Amount", (String) params
              .get("req_merchant_defined_data2"));
          ecbPaymentData.put("InvoiceDate", (String) params
              .get("req_merchant_defined_data3"));
          ecbPaymentData.put("InvoiceNum", "");
          ecbPaymentData.put("Currency", (String) params.get("req_currency"));
          ecbPaymentData.put("PayNow", "true");
          ecbPaymentData.put("OneTimePaymentAccountId", (String) params
              .get("req_consumer_id"));
          HashMap<String, HashMap<String, String>> map = new HashMap<>();
          map.put("ecbpaymentdata", ecbPaymentData);
          map.put("ecbpaymentmethod", params);
          HttpEntity<HashMap> entity = new HttpEntity<HashMap>(map, headers);
          apiResponse = restTemplate.postForEntity(pathProp.getApiPath()
                  + "/paymentmethods/makepayment",
              entity, JSONObject.class);
          message = (String) apiResponse.getBody().get("Message");
          if(message == null) {
            model.put("confirmationnumber", (String) apiResponse.getBody()
                .get("ConfirmationNumber"));

            if (((String)params.get("req_payment_method")).equals("card")) {
              switch ((String)params.get("req_card_type"))
              {
                case "001":
                  method = "Visa";
                  break;
                case "002":
                  method = "MasterCard";
                  break;
                case "003":
                  method = "American_Express";
                  break;
                case "004":
                  method = "Discover";
                  break;
                case "005":
                  method = "Diners_Club";
                  break;
                case "007":
                  method = "JCB";
                  break;
                case "024":
                case "042":
                  //TODO 024 Maestro (UK Domestic)
                  //TODO 042 Maestro (International)
                  method = "Maestro";
              }

              String cardNumber = ((String) params.get("req_card_number")).replaceAll("x", "");
              method += " *" + cardNumber;
            } else {
              if (((String)params.get("req_echeck_account_type")).equals("s")) {
                method = "Saving";
              } else {
                method = "Checking";
              }
              String accNumber = ((String) params.get("req_echeck_account_number")).replaceAll("x", "");
              method += " *" + accNumber;
            }
            model.put("method", method);
          }
        } else if (params.containsKey("req_merchant_defined_data1") && params
            .get("req_merchant_defined_data1").equals("onetimepayment") &&
            !params.get("req_merchant_defined_data4").equals("INVOICE_LIST_UUID")) {
          HashMap invParams = new HashMap();
          invParams.put("accountId", params
              .get("req_consumer_id"));
          invParams.put("uuId", params
              .get("req_merchant_defined_data4"));
          HttpEntity<HashMap> inventity = new HttpEntity<HashMap>(invParams, headers);
          invoiceList = restTemplate.postForEntity(
              pathProp.getApiPath()
                  + "/paymentmethods/getarinvoicelist",inventity, JSONObject.class);
          HashMap<String,String> ecbPaymentData = new HashMap<String,String>();
          ecbPaymentData.put("IsOneTimePayment", "true");
          ecbPaymentData.put("Amount", (String) params
              .get("req_merchant_defined_data2"));
          ecbPaymentData.put("InvoiceDate", (String) params
              .get("req_merchant_defined_data3"));
          ecbPaymentData.put("InvoicesAsString", invoiceList.getBody().get("invoiceList").toString());
          ecbPaymentData.put("InvoiceNum", "");
          ecbPaymentData.put("Currency", (String) params.get("req_currency"));
          ecbPaymentData.put("PayNow", "true");
          ecbPaymentData.put("OneTimePaymentAccountId", (String) params
              .get("req_consumer_id"));
          HashMap map = new HashMap();
          map.put("id_Acc", (String) params
              .get("req_consumer_id"));
          map.put("MakePaymentDataAR", ecbPaymentData);
          map.put("ecbpaymentmethod", params);
          HttpEntity<HashMap> entity = new HttpEntity<HashMap>(map, headers);
          apiResponse = restTemplate.postForEntity(pathProp.getApiPath()
                  + "/paymentmethods/makearpayment",
              entity, JSONObject.class);
          message = (String) apiResponse.getBody().get("Message");
          if(message == null) {
            HashMap<?,?> resp = (HashMap<?, ?>) apiResponse.getBody().get("ARpaymentDetails");
            model.put("confirmationnumber", (String) resp.get("ConfirmationNumber"));
            if (((String)params.get("req_payment_method")).equals("card")) {
              switch ((String)params.get("req_card_type"))
              {
                case "001":
                  method = "Visa";
                  break;
                case "002":
                  method = "MasterCard";
                  break;
                case "003":
                  method = "American_Express";
                  break;
                case "004":
                  method = "Discover";
                  break;
                case "005":
                  method = "Diners_Club";
                  break;
                case "007":
                  method = "JCB";
                  break;
                case "024":
                case "042":
                  //TODO 024 Maestro (UK Domestic)
                  //TODO 042 Maestro (International)
                  method = "Maestro";
              }

              String cardNumber = ((String) params.get("req_card_number")).replaceAll("x", "");
              method += " *" + cardNumber;
            } else {
              if (((String)params.get("req_echeck_account_type")).equals("s")) {
                method = "Saving";
              } else {
                method = "Checking";
              }
              String accNumber = ((String) params.get("req_echeck_account_number")).replaceAll("x", "");
              method += " *" + accNumber;
            }
            model.put("method", method);
          }
        } else {
          HttpEntity<HashMap> entity =
              new HttpEntity<HashMap>(params, headers);
          apiResponse = restTemplate.postForEntity(pathProp.getApiPath()
                  + "/paymentmethods/addpaymentmethod",
              entity, JSONObject.class);
          message = (String) apiResponse.getBody().get("Message");
        }
      } else if (params.get("req_transaction_type").equals("update_payment_token")) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer "+ accessToken);
        HttpEntity<HashMap> entity = new HttpEntity<HashMap>(params, headers);
        apiResponse = restTemplate.exchange(
            pathProp.getApiPath()+"/paymentmethods/updatepaymentmethod/" + params.get("req_consumer_id"),
            HttpMethod.PUT , entity, JSONObject.class);
      }
      if(message != "" && message != null){
        model.put("status","cancelorder");
        model.put("message", message);
      }else {
        model.put("status","success");
      }
    } catch (Exception ex) {
      ex.printStackTrace();
      model.put("status","failure");
    }
    return "payment";
  }

}