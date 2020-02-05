var testdata = require('../inputs/testdata/paymentMethods.json');
var testdata4 = require('../inputs/testdata/ECBARAdjustments.json');
var testData3 = require('../inputs/testData/XpathRepository.json');

describe('UI Baseline App', function () {


  it('validate paynowACH in AR', function () {
    var testdata1 = require('../inputs/testdata/login.json'); 

    //Input file to refer
  var testdata10 = protractor.loginHelpers.dashboard();
   
  browser.refresh();
  browser.sleep(3000);
 //Launch to the MV2.0 application
 protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);

  //Login to the MV2.0 application
  protractor.loginHelpers.logInMV(testdata4.corpAccountUserName,testdata4.passwordField);
  browser.driver.manage().window().maximize();
    const ele1 = element(by.xpath(testData3.AmountDue.Amount));
    
    ele1.isPresent().then(function(){
    ele1.getText().then(function change(text){
        
    str = text;     
    // pay now 
   

    element(by.xpath(testData3.MakeaPayment.MakeaPaymentButton)).click();
    element(by.xpath(testData3.MakeaPayment.PayUsing_TextField)).isPresent();
    element(by.xpath(testData3.MakeaPayment.PayUsing_Dropdown)).click();
   


    element(by.xpath(testData3.MakeaPayment.NewPaymentMethod)).click();
      
    browser.sleep(2000);
    var i=1;
    // sendvalue(i);
     element.all(by.xpath(testData3.MakeaPayment.InvoiceList)).count().then(function (result){
      if (i <= result) { 
          sendvaluep(result)
        }else{
          console.log('no visa and master card');
        }
     });
                
    function sendvalue(i) {
        
        
          if( i <= reuslt ){
           console.log('amount updated in invocie no'+ i);    
        element(by.css('div.form-group.row.ecb-formResponsive.ng-scope > div > table > tbody > tr:nth-child(' + i + ') > td:nth-child(5) > input')).clear();
        element(by.css('div.form-group.row.ecb-formResponsive.ng-scope > div > table > tbody > tr:nth-child(' + i + ') > td:nth-child(5) > input')).sendKeys('4');
       
        // element(by.xpath("//div[@class='form-group row ecb-formResponsive ng-scope']/ div/ table/ tbody/ tr[2]/td[5]/input")).clear();
       // element(by.xpath("//div[@class='form-group row ecb-formResponsive ng-scope']/ div/ table/ tbody/ tr[2]/td[5]/input")).sendKeys('1200');
            
        i++;
        sendvalue(i);
         }else{
         console.log('Amount sent in existing invoices');
        }
        }

        function sendvaluep(inp) {
           var  res = inp;
               console.log('amount updated in invocie no'+ i);    
            element(by.css('div.form-group.row.ecb-formResponsive.ng-scope > div > table > tbody > tr:nth-child(' + i + ') > td:nth-child(5) > input')).clear();
            element(by.css('div.form-group.row.ecb-formResponsive.ng-scope > div > table > tbody > tr:nth-child(' + i + ') > td:nth-child(5) > input')).sendKeys('4');
           
 
                
            i++;
            if(i <= inp){
                sendvaluep(inp);
            }
              
            }
       
            element.all(by.xpath(testData3.MakeaPayment.InvoiceList)).count().then(function (inv){
        
        element(by.xpath(testData3.MakeaPayment.AddandPayNow)).click();
         browser.sleep(2000);
        expect(element(by.xpath(testData3.MakeaPayment.Back)).isDisplayed()).toBe(true);
        element(by.xpath(testData3.MakeaPayment.Back)).click();
        element(by.xpath(testData3.MakeaPayment.AddandPayNow)).click();
        
        
                        
                        element(by.xpath(testData3.MakeaPayment.AuthoriseCheck)).click();
                        browser.actions().mouseMove(element(by.xpath(testData3.MakeaPayment.CyberSource_PopUp))).perform();
                        element(by.xpath(testdata10.TEXT_PROCEED)).click();
                       
                        browser.ignoreSynchronization = true;
                        browser.waitForAngular();
        
                        browser.sleep(2000);
                    
                          
    browser.sleep(1000);
    // if not redirecting to cybersource validation
    expect(element(by.xpath(testData3.MakeaPayment.CyberSource_Text)).isDisplayed()).toBe(true);
    
    browser.actions().mouseMove(element(by.xpath(testData3.PaymentMethods.CyberSource_Card))).perform();
    element(by.xpath(testData3.PaymentMethods.CyberSource_Visacard_Name)).click();
    expect(element(by.xpath(testData3.PaymentMethods.CyberSource_BillingInformationTitle)).getText()).toEqual('Billing Information');
    element(by.xpath(testData3.PaymentMethods.CyberSource_FirstName)).clear();
    element(by.xpath(testData3.PaymentMethods.CyberSource_FirstName)).sendKeys(testdata.name);
    element(by.xpath(testData3.PaymentMethods.CyberSource_LastName)).clear();
    element(by.xpath(testData3.PaymentMethods.CyberSource_LastName)).sendKeys(testdata.surname);
    element(by.xpath(testData3.PaymentMethods.CyberSource_Company)).clear();
    element(by.xpath(testData3.PaymentMethods.CyberSource_Company)).sendKeys(testdata.companyname);
    element(by.xpath(testData3.PaymentMethods.CyberSource_AddressLine1)).clear();
    element(by.xpath(testData3.PaymentMethods.CyberSource_AddressLine1)).sendKeys(testdata.address1);
    element(by.xpath(testData3.PaymentMethods.CyberSource_AddressLine2)).clear();
    element(by.xpath(testData3.PaymentMethods.CyberSource_AddressLine2)).sendKeys(testdata.address2);
    element(by.xpath(testData3.PaymentMethods.CyberSource_City)).clear();
    element(by.xpath(testData3.PaymentMethods.CyberSource_City)).sendKeys(testdata.city);
    element(by.xpath(testData3.PaymentMethods.CyberSource_Country)).click();
    element(by.xpath(testData3.PaymentMethods.CyberSource_Countryvalue)).click();
    element(by.xpath(testData3.PaymentMethods.CyberSource_State)).clear();
    element(by.xpath(testData3.PaymentMethods.CyberSource_State)).sendKeys(testdata.state);
    element(by.xpath(testData3.PaymentMethods.CyberSource_PostalCode)).clear();
    element(by.xpath(testData3.PaymentMethods.CyberSource_PostalCode)).sendKeys(testdata.postalcode);
    element(by.xpath(testData3.PaymentMethods.CyberSource_Phone)).clear();
    element(by.xpath(testData3.PaymentMethods.CyberSource_Phone)).sendKeys(testdata.phno);
    element(by.xpath(testData3.PaymentMethods.CyberSource_Email)).clear();
    element(by.xpath(testData3.PaymentMethods.CyberSource_Email)).sendKeys(testdata.email);

    // card no
    var widget = element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_Text));
    browser.executeScript('arguments[0].scrollIntoView()', widget.getWebElement());
    browser.sleep(1000);
    element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_CardNumber)).click();
    element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_CardNumber)).sendKeys(testdata.cardno);


    element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_CVNLabel)).isPresent();
    element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_CVNValue)).isPresent();
    element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_CVNValue)).click();

    element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_CVNValue)).sendKeys(testdata.cvnno);

    // expiration date edit
    element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_ExpirationMonth)).click();
    element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_ExpirationMonthValue)).click();

    element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_ExpirationYear)).click();
    element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_ExpirationYearValue)).click();
    element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_Finish)).click();

    browser.ignoreSynchronization = true;
    browser.waitForAngular();

    browser.sleep(10000);
        
        expect(browser.getTitle()).toEqual(testdata1.url.DashBoard);
        browser.sleep(10000);
            expect(element(by.xpath(testData3.AmountDue.Amount)).getText()).not.toEqual(str);
            //expect(a).toEqual(b);
            var n = element.all(by.xpath(testData3.MakeaPayment.Invoicecount)).count();
        expect(n).toEqual(inv);
        });
        
                        });
                    }); 
      });

      it('validate paymentsrecieved scenario in AR', function () {

        //Launch to the MV2.0 application
 protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);

 //Login to the MV2.0 application
 protractor.loginHelpers.logInMV(testdata4.corpAccountUserName,testdata4.passwordField);
 browser.driver.manage().window().maximize();
        browser.refresh();
        browser.driver.manage().window().maximize();
  
     //validate in payments recieved
     element(by.xpath(testData3.LayerSelector.Dropdown)).click();
     element(by.xpath(testData3.LayerSelector.Bills)).click();
     browser.sleep(2000);
     expect(element(by.xpath(testData3.Charges.PaymentReceivedAR)).isDisplayed()).toBe(true);
     browser.actions().mouseMove(element(by.xpath(testData3.Charges.PaymentReceivedAR))).perform();
     browser.sleep(2000);
     element(by.xpath(testData3.Charges.Popup_ViewAll)).click();
     
        element(by.xpath(testData3.Table.col1)).getCssValue('text-overflow').then((textoverflow) => {
            expect(textoverflow).toEqual('ellipsis');
          
            }); 
    
    element(by.xpath(testData3.Table.col2)).getCssValue('text-overflow').then((textoverflow) => {
        expect(textoverflow).toEqual('clip');
      
    });
    //MVIEW-2588 Incorrect Amount format in MetraView2.0
    var a = element(by.xpath(testData3.Table.col1)).getText();
    expect(a).toContain('$');
    expect(a).toContain(',');
    element(by.xpath(testData3.Payments.CardView)).click();

    var b = element(by.xpath(testData3.Payments.PaymentsReceived_CardCurrency)).getText();
    expect(b).toContain('$');
    expect(b).toContain(',');
    expect(a).toEqual(b);
    
      });
      it('validate MiscAdjustments in AR', function (){


        //validate in MISC
         element(by.xpath(testData3.LayerSelector.Dropdown)).click();
     element(by.xpath(testData3.LayerSelector.Bills)).click();
    element(by.css(testData3.OfferCharge.Misc)).click();
     element(by.xpath(testData3.Table.col1)).getCssValue('text-overflow').then((textoverflow) => {
     expect(textoverflow).toEqual('ellipsis');
     });  
      element(by.xpath(testData3.Table.col2)).getCssValue('text-overflow').then((textoverflow) => {
   expect(textoverflow).toEqual('ellipsis');
      });
   element(by.xpath(testData3.Table.col3)).getCssValue('text-overflow').then((textoverflow) => {
   expect(textoverflow).toEqual('ellipsis');
    }); 
    element(by.xpath(testData3.Table.col4)).getCssValue('text-overflow').then((textoverflow) => {
   expect(textoverflow).toEqual('ellipsis');
     }); 
     element(by.xpath(testData3.Table.col5)).getCssValue('text-overflow').then((textoverflow) => {
   expect(textoverflow).toEqual('ellipsis');
    }); 
    element(by.xpath(testData3.Table.col6)).getCssValue('text-overflow').then((textoverflow) => {
   expect(textoverflow).toEqual('ellipsis');
    }); 
   /*element(by.xpath(testData3.Table.col7)).getCssValue('text-overflow').then((textoverflow) => {
   expect(textoverflow).toEqual('ellipsis');
    }); */
    element(by.xpath(testData3.Table.col6)).getCssValue('text-align').then((textALign) => {
   expect(textALign).toEqual('start');
    });
    //MVIEW-2588
    var a = element(by.xpath(testData3.Table.col5)).getText();
    expect(a).toContain('$');
    expect(a).toContain(',');  
    element(by.xpath(testData3.Payments.CardView)).click();

   var b = element(by.xpath(testData3.OfferCharge.Misc_TabularCurrency)).getText();
    expect(b).toContain('$');
   expect(b).toContain(',');
   expect(a).toEqual(b);

      });
  



    });