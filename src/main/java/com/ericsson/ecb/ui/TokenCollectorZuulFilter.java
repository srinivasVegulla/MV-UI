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

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.nio.charset.StandardCharsets;
import java.text.Normalizer;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import org.apache.commons.io.IOUtils;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Component;

/*
 * Collecting the security details from localstorage and
 * storing it in session storage so that the same access
 * details can be supplied while sharing the cybersource
 * response with backend.
 */

@Component
public class TokenCollectorZuulFilter extends ZuulFilter {
    private static final Logger LOGGER = Logger.getLogger(TokenCollectorZuulFilter.class.getName());

    @Override
    public String filterType() {
        return "post";
    }

    @Override
    public int filterOrder() {
        return -2;
    }

    @Override
    public boolean shouldFilter() {
        return true;
    }

    private String getAndRemoveResponseBody(RequestContext ctx) {
        String result = ctx.getResponseBody();
        if (result != null) {
            return result;
        }

        InputStream content = ctx.getResponseDataStream();
        if (content == null) {
            return null;
        }

        StringWriter contentStr = new StringWriter(128);
        try {
            IOUtils.copy(content, contentStr, StandardCharsets.UTF_8);
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }

        return contentStr.toString();
    }

    private String getResponseBody(RequestContext ctx) {
        String result = Normalizer.normalize(getAndRemoveResponseBody(ctx), Normalizer.Form.NFC);
        if (result != null) {
            ctx.setResponseDataStream(new ByteArrayInputStream(result.getBytes(StandardCharsets.UTF_8)));
        }
        return result;
    }

    private static String toString(Object obj) {
        return obj != null ? obj.toString() : null;
    }

    private OauthTokenInfo parseOauthTokenInfo(String str) {
        JSONParser parser = new JSONParser();
        Object parsedObj;
        try {
            parsedObj = parser.parse(str);
        } catch (ParseException ex) {
            LOGGER.log(Level.WARNING, "Response is not a a valid JSON object: " + str, ex);
            return null;
        }

        if (parsedObj instanceof JSONObject) {
            JSONObject jsonObj = (JSONObject)parsedObj;

            String accessToken = toString(jsonObj.get("access_token"));
            if (accessToken == null) {
                return null;
            }

            String refreshToken = toString(jsonObj.get("refresh_token"));
            return new OauthTokenInfo(accessToken, refreshToken);
        }
        else {
            return null;
        }
    }

    @Override
    public Object run() {
        RequestContext ctx = RequestContext.getCurrentContext();
        HttpServletRequest request = ctx.getRequest();
        String uri = request.getRequestURI();

        if (uri != null && uri.startsWith("/oauth/token")) {
            String responseBody = getResponseBody(ctx);
            OauthTokenInfo tokenInfo = parseOauthTokenInfo(responseBody);

            if (tokenInfo != null) {
                request.getSession().setAttribute(OauthTokenInfo.SESSION_ATTR_NAME, tokenInfo);
                LOGGER.log(Level.INFO, "Storing Oauth token in session variable " + OauthTokenInfo.SESSION_ATTR_NAME);
            }
            else {
                LOGGER.log(Level.INFO, "Received no token for token request.");
            }
        }

        return null;
    }
}
