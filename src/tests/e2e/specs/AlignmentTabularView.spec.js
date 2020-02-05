var testdata = require('../inputs/testdata/Login.json');
var testdata2 = require('../inputs/testData/JsonFileCreation.json');
var testData3 = require('../inputs/testData/XpathRepository.json');
var testData4 = require('../inputs/testData/prebillandpostbillcreation.json');


describe('UI Baseline App', function () {


        it('should login',function(){
                var testData5 = protractor.loginHelpers.lang;
                    //Get Metraview 2.0 URL
                    browser.get(testdata.url.URL);
                    browser.sleep(2000);
                    expect(browser.getTitle()).toEqual(testdata.url.Title);
                    expect(browser.getCurrentUrl()).toMatch(testdata.url.CurrentUrl);
               
                    element(by.xpath(testData3.LoginPage.UserName)).sendKeys(testData4.userName);
                    element(by.xpath(testData3.LoginPage.Password)).sendKeys(testData4.passwordField);
                    browser.findElement(By.xpath(testData3.LoginPage.LogInButton)).click().then(function () {
                  
                      browser.sleep(12000);
                    }, 1000);
                    
                    browser.driver.manage().window().maximize();
                    browser.sleep(12000);
                browser.refresh();
                browser.sleep(10000); 
                });       


      //  0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10602/ 001__data_under_relevant_columns_in_Bills_page


it('should have  proper data under relavent columns in bills page', function () {
    
    //validate in postbill
    element(by.xpath(testData3.LayerSelector.Dropdown)).click();
    element(by.xpath(testData3.LayerSelector.Bills)).click();
    //element(by.css("button#dropdownMenu3")).click();
    //element(by.css("ul.list-inline.list-unstyled.ecb-rtlBillFilter.ng-scope > li > div > ul > li.ebComponentList-item.ng-scope.ebComponentList-item_selected > a")).click();
    browser.actions().mouseMove(element(by.xpath(testData3.PriorBalance.PostBillAdjustment))).perform();
    browser.sleep(2000);
    element(By.xpath(testData3.Charges.Popup_ViewAll)).click();
    element(by.xpath(testData3.Table.col1)).getCssValue('text-align').then((textALign) => {
     expect(textALign).toEqual('right');

     element(by.xpath(testData3.Table.col1)).getCssValue('text-overflow').then((textoverflow) => {
        expect(textoverflow).toEqual('ellipsis');
      
       
       });
   
    
    });
    element(by.xpath(testData3.Table.col2)).getCssValue('text-overflow').then((textoverflow) => {
     expect(textoverflow).toEqual('ellipsis');

     
});
     browser.navigate().refresh();
     //validate in NSC
     element(by.xpath(testData3.LayerSelector.Dropdown)).click();
     element(by.xpath(testData3.LayerSelector.Bills)).click();
     element(by.css(testData3.OfferCharge.NSC)).click();
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
element(by.xpath(testData3.Table.col7)).getCssValue('text-overflow').then((textoverflow) => {
        expect(textoverflow).toEqual('ellipsis');
});
element(by.xpath(testData3.Table.col2)).getCssValue('text-align').then((textALign) => {
        expect(textALign).toEqual('right');
});

browser.navigate().refresh();
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


//validate in offer charge.
//MVIEW-2443 Amount value displaying in offer charge summary is mismatching
browser.navigate().refresh();
element(by.xpath(testData3.LayerSelector.Dropdown)).click();
     element(by.xpath(testData3.LayerSelector.Bills)).click();
     var a = element(by.xpath(testData3.OfferCharge.Total)).getText();
     element(by.xpath(testData3.OfferCharge.AccountView_Pane)).click();
     var b = element(by.xpath(testData3.OfferCharge.Total)).getText();
     expect(a).toEqual(b); 
     browser.navigate().refresh();
     element(by.xpath(testData3.LayerSelector.Dropdown)).click();
     element(by.xpath(testData3.LayerSelector.Bills)).click();
     element(by.xpath(testData3.OfferCharge.PO_GroupUsage)).click();
     
     element(by.css(testData3.OfferCharge.Order_Cookies)).click();
     
     element(by.xpath(testData3.Table.col2)).getCssValue('text-overflow').then((textoverflow) => {
        expect(textoverflow).toEqual('ellipsis');
      });
      element(by.xpath(testData3.Table.col1)).getCssValue('text-overflow').then((textoverflow) => {
        expect(textoverflow).toEqual('ellipsis');
        element(by.xpath(testData3.Table.col1)).getCssValue('text-align').then((textALign) => {
            expect(textALign).toEqual('start');
         });
       element(by.xpath(testData3.Table.col2)).getCssValue('text-align').then((textALign) => {
        expect(textALign).toEqual('start');
      });        
     }); 
     element(by.xpath(testData3.Downloads.SortingFilter)).click();
     browser.sleep(5000);

//validate in prebilladjustments
browser.navigate().refresh();
element(by.xpath(testData3.LayerSelector.Dropdown)).click();
     element(by.xpath(testData3.LayerSelector.Bills)).click();
     browser.actions().mouseMove(element(by.css(testData3.Charges.Prebill))).perform();
     browser.sleep(3000);
     element(By.xpath(testData3.Charges.Popup_ViewAll)).click();
     element(by.xpath(testData3.Table.col1)).getCssValue('text-overflow').then((textoverflow) => {
        expect(textoverflow).toEqual('ellipsis');
});
element(by.xpath(testData3.Table.col2)).getCssValue('text-overflow').then((textoverflow) => {
    expect(textoverflow).toEqual('ellipsis');
});
element(by.xpath(testData3.Table.col3)).getCssValue('text-overflow').then((textoverflow) => {
    expect(textoverflow).toEqual('ellipsis');
});
element(by.xpath(testData3.Table.col1)).getCssValue('text-align').then((textALign) => {
        expect(textALign).toEqual('start');
});
});
//validate in payments recived widget

it('Login with new corporate user', function(){

        var testdata8=protractor.loginHelpers.langCode;
        function login(testdata8){
              var testdata5 = protractor.loginHelpers.lang; 
              browser.get(testdata.url.URL);
              browser.sleep(5000);
              element(by.css(testdata5)).click();
              browser.sleep(5000);      
        switch (testdata8) {
            case "BR":
        //Loading the Login Page
        //Login to Metraview with Corporate Account(not subscribed to any PO) 
        element(by.xpath(testData3.LoginPage.UserName)).sendKeys(testdata2.corpBR);
        element(by.xpath(testData3.LoginPage.Password)).sendKeys(testdata2.passwordField);
        browser.findElement(By.xpath(testData3.LoginPage.LogInButton)).click();
        browser.sleep(12000);
            break;
            case "DE":
        
        //Login to Metraview with Corporate Account(not subscribed to any PO) 
        element(by.xpath(testData3.LoginPage.UserName)).sendKeys(testdata2.corpDE);
        element(by.xpath(testData3.LoginPage.Password)).sendKeys(testdata2.passwordField);
        browser.findElement(By.xpath(testData3.LoginPage.LogInButton)).click();
        browser.sleep(12000);
            break;
            case "EG":
        
        //Login to Metraview with Corporate Account(not subscribed to any PO) 
        element(by.xpath(testData3.LoginPage.UserName)).sendKeys(testdata2.corpEG);
        element(by.xpath(testData3.LoginPage.Password)).sendKeys(testdata2.passwordField);
        browser.findElement(By.xpath(testData3.LoginPage.LogInButton)).click();
        browser.sleep(12000);
            break;
            case "ES":
        
        //Login to Metraview with Corporate Account(not subscribed to any PO) 
        element(by.xpath(testData3.LoginPage.UserName)).sendKeys(testdata2.corpES);
        element(by.xpath(testData3.LoginPage.Password)).sendKeys(testdata2.passwordField);
        browser.findElement(By.xpath(testData3.LoginPage.LogInButton)).click();
        browser.sleep(12000);
                break;
            case "FR":
        
        //Login to Metraview with Corporate Account(not subscribed to any PO) 
        element(by.xpath(testData3.LoginPage.UserName)).sendKeys(testdata2.corpFR);
        element(by.xpath(testData3.LoginPage.Password)).sendKeys(testdata2.passwordField);
        browser.findElement(By.xpath(testData3.LoginPage.LogInButton)).click();
        browser.sleep(12000);
                break;
            case "GB":
        
        //Login to Metraview with Corporate Account(not subscribed to any PO) 
        element(by.xpath(testData3.LoginPage.UserName)).sendKeys(testdata2.corpGB);
        element(by.xpath(testData3.LoginPage.Password)).sendKeys(testdata2.passwordField);
        browser.findElement(By.xpath(testData3.LoginPage.LogInButton)).click();
        browser.sleep(12000);
                break;
            case "IL":
        
        //Login to Metraview with Corporate Account(not subscribed to any PO) 
        element(by.xpath(testData3.LoginPage.UserName)).sendKeys(testdata2.corpIL);
        element(by.xpath(testData3.LoginPage.Password)).sendKeys(testdata2.passwordField);
        browser.findElement(By.xpath(testData3.LoginPage.LogInButton)).click();
        browser.sleep(12000);
            break;
            case "JP":
        
        //Login to Metraview with Corporate Account(not subscribed to any PO) 
        element(by.xpath(testData3.LoginPage.UserName)).sendKeys(testdata2.corpJP);
        element(by.xpath(testData3.LoginPage.Password)).sendKeys(testdata2.passwordField);
        browser.findElement(By.xpath(testData3.LoginPage.LogInButton)).click();
        browser.sleep(12000);
                break; 
            case "MX":
        
        //Login to Metraview with Corporate Account(not subscribed to any PO) 
        element(by.xpath(testData3.LoginPage.UserName)).sendKeys(testdata2.corpMX);
        element(by.xpath(testData3.LoginPage.Password)).sendKeys(testdata2.passwordField);
        browser.findElement(By.xpath(testData3.LoginPage.LogInButton)).click();
        browser.sleep(12000);
                break;    
            case "SE":
        
        //Login to Metraview with Corporate Account(not subscribed to any PO) 
        element(by.xpath(testData3.LoginPage.UserName)).sendKeys(testdata2.corpSE);
        element(by.xpath(testData3.LoginPage.Password)).sendKeys(testdata2.passwordField);
        browser.findElement(By.xpath(testData3.LoginPage.LogInButton)).click();
        browser.sleep(12000);
                break;
            case "US":
        
        //Login to Metraview with Corporate Account(not subscribed to any PO) 
        element(by.xpath(testData3.LoginPage.UserName)).sendKeys(testdata2.corpUS);
        element(by.xpath(testData3.LoginPage.Password)).sendKeys(testdata2.passwordField);
        browser.findElement(By.xpath(testData3.LoginPage.LogInButton)).click();
        browser.sleep(12000);
            break;
    }
          }
    
    login(testdata8);
  
  });
  
  
  it('Validate  in payment received layer', function () {
        var testData = require('../inputs/testdata/PaymentMethods.json');
     browser.refresh();
     browser.sleep(5000);
     
     var testdata3 = require('../inputs/testdata/XpathRepository.json');
    
       expect(element(by.xpath(testData3.PaymentMethods.Link)).isDisplayed()).toBe(true);
       browser.sleep(3000);
       element(by.xpath(testdata3.PaymentMethods.Link)).click();
       browser.sleep(3000);
       element(by.xpath(testdata3.PaymentMethods.Popup_Proceed)).click();
       browser.sleep(3000);
       browser.ignoreSynchronization = true;
       browser.waitForAngular();
      
          browser.sleep(1000);
    
     // if not redirecting to cybersource validation
     expect(element(by.xpath(testdata3.MakeaPayment.CyberSource_Text)).isDisplayed()).toBe(true);
  
     browser.actions().mouseMove(element(by.xpath(testdata3.PaymentMethods.CyberSource_Card))).perform();
     element(by.xpath(testdata3.PaymentMethods.CyberSource_Visacard_Name)).click();
     expect(element(by.xpath(testdata3.PaymentMethods.CyberSource_BillingInformationTitle)).getText()).toEqual('Billing Information');
     element(by.xpath(testdata3.PaymentMethods.CyberSource_FirstName)).clear();
     element(by.xpath(testdata3.PaymentMethods.CyberSource_FirstName)).sendKeys(testData.name);
     element(by.xpath(testdata3.PaymentMethods.CyberSource_LastName)).clear();
     element(by.xpath(testdata3.PaymentMethods.CyberSource_LastName)).sendKeys(testData.surname);
     element(by.xpath(testdata3.PaymentMethods.CyberSource_Company)).clear();
     element(by.xpath(testdata3.PaymentMethods.CyberSource_Company)).sendKeys(testData.companyname);
     element(by.xpath(testdata3.PaymentMethods.CyberSource_AddressLine1)).clear();
     element(by.xpath(testdata3.PaymentMethods.CyberSource_AddressLine1)).sendKeys(testData.address1);
     element(by.xpath(testdata3.PaymentMethods.CyberSource_AddressLine2)).clear();
     element(by.xpath(testdata3.PaymentMethods.CyberSource_AddressLine2)).sendKeys(testData.address2);
     element(by.xpath(testdata3.PaymentMethods.CyberSource_City)).clear();
     element(by.xpath(testdata3.PaymentMethods.CyberSource_City)).sendKeys(testData.city);
     element(by.xpath(testdata3.PaymentMethods.CyberSource_Country)).click();
     element(by.xpath(testdata3.PaymentMethods.CyberSource_Countryvalue)).click();
     element(by.xpath(testdata3.PaymentMethods.CyberSource_State)).clear();
     element(by.xpath(testdata3.PaymentMethods.CyberSource_State)).sendKeys(testData.state);
     element(by.xpath(testdata3.PaymentMethods.CyberSource_PostalCode)).clear();
     element(by.xpath(testdata3.PaymentMethods.CyberSource_PostalCode)).sendKeys(testData.postalcode);
     element(by.xpath(testdata3.PaymentMethods.CyberSource_Phone)).clear();
     element(by.xpath(testdata3.PaymentMethods.CyberSource_Phone)).sendKeys(testData.phno);
     element(by.xpath(testdata3.PaymentMethods.CyberSource_Email)).clear();
     element(by.xpath(testdata3.PaymentMethods.CyberSource_Email)).sendKeys(testData.email);
  
     // card no
     var widget = element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_Text));
     browser.executeScript('arguments[0].scrollIntoView()', widget.getWebElement());
     browser.sleep(1000);
     element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_CardNumber)).click();
     element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_CardNumber)).sendKeys(testData.cardno);
  
  
     element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_CVNLabel)).isPresent();
     element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_CVNValue)).isPresent();
     element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_CVNValue)).click();
  
     element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_CVNValue)).sendKeys(testData.cvnno);
  
                // expiration date edit
     element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_ExpirationMonth)).click();
     element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_ExpirationMonthValue)).click();
  
     element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_ExpirationYear)).click();
     element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_ExpirationYearValue)).click();
     element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_Finish)).click();
    browser.sleep(3000);
  
     browser.ignoreSynchronization = true;
     browser.waitForAngular();
  
     browser.sleep(3000);
     var testdata8=protractor.loginHelpers.langCode;
     function login(testdata8){
           var testdata5 = protractor.loginHelpers.lang; 
           browser.get(testdata.url.URL);
           browser.sleep(5000);
           element(by.css(testdata5)).click();
           browser.sleep(5000);      
     switch (testdata8) {
         case "BR":
     //Loading the Login Page
     //Login to Metraview with Corporate Account(not subscribed to any PO) 
     element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata2.corpBR);
     element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata2.passwordField);
     browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
     browser.sleep(12000);
         break;
         case "DE":
     
     //Login to Metraview with Corporate Account(not subscribed to any PO) 
     element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata2.corpDE);
     element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata2.passwordField);
     browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
     browser.sleep(12000);
         break;
         case "EG":
     
     //Login to Metraview with Corporate Account(not subscribed to any PO) 
     element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata2.corpEG);
     element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata2.passwordField);
     browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
     browser.sleep(12000);
         break;
         case "ES":
     
     //Login to Metraview with Corporate Account(not subscribed to any PO) 
     element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata2.corpES);
     element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata2.passwordField);
     browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
     browser.sleep(12000);
             break;
         case "FR":
     
     //Login to Metraview with Corporate Account(not subscribed to any PO) 
     element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata2.corpFR);
     element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata2.passwordField);
     browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
     browser.sleep(12000);
             break;
         case "GB":
     
     //Login to Metraview with Corporate Account(not subscribed to any PO) 
     element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata2.corpGB);
     element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata2.passwordField);
     browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
     browser.sleep(12000);
             break;
         case "IL":
     
     //Login to Metraview with Corporate Account(not subscribed to any PO) 
     element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata2.corpIL);
     element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata2.passwordField);
     browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
     browser.sleep(12000);
         break;
         case "JP":
     
     //Login to Metraview with Corporate Account(not subscribed to any PO) 
     element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata2.corpJP);
     element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata2.passwordField);
     browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
     browser.sleep(12000);
             break; 
         case "MX":
     
     //Login to Metraview with Corporate Account(not subscribed to any PO) 
     element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata2.corpMX);
     element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata2.passwordField);
     browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
     browser.sleep(12000);
             break;    
         case "SE":
     
     //Login to Metraview with Corporate Account(not subscribed to any PO) 
     element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata2.corpSE);
     element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata2.passwordField);
     browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
     browser.sleep(12000);
             break;
         case "US":
     
     //Login to Metraview with Corporate Account(not subscribed to any PO) 
     element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata2.corpUS);
     element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata2.passwordField);
     browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
     browser.sleep(12000);
         break;
  }
       }
  
  login(testdata8);
     
     expect(element(by.xpath(testdata3.MakeaPayment.MakeaPayment_Button)).isDisplayed()).toBe(true);
     //click on make a payment link
     element(by.xpath(testdata3.MakeaPayment.MakeaPayment_Button)).click();
    browser.sleep(3000);
     
     //Clear the pay this amount value textbox
     element(by.xpath(testdata3.MakeaPayment.PaythisAmount_Value)).clear();
     browser.sleep(3000);
      //Enter the pay this amount value textbox
     element(by.xpath(testdata3.MakeaPayment.PaythisAmount_Value)).sendKeys(testData.PaymentNewValue);
     //validate save for future checkbox is there
     element(by.xpath(testdata3.MakeaPayment.SaveforFutureUse_CheckBox)).isPresent();
     
     //click on add and paynow button
     element(by.xpath(testdata3.MakeaPayment.PayNow_Button)).click();
     browser.sleep(3000);
     //valiadate Review payment Date
     element(by.xpath(testdata3.MakeaPayment.ReviewPayment)).isPresent();
     browser.sleep(3000);
     //click on add and paynow button
     element(by.xpath(testdata3.MakeaPayment.PayNow_Button)).click();
     browser.sleep(3000);
     element(by.xpath(testdata3.MakeaPayment.MakeaPayment_Close)).click();
     browser.sleep(3000);
  

 
     browser.navigate().refresh();
     //validate in payments recieved
     element(by.xpath(testData3.LayerSelector.Dropdown)).click();
     element(by.xpath(testData3.LayerSelector.Bills)).click();
     expect(element(by.xpath(testData3.Charges.PaymentReceived_Button)).isDisplayed()).toBe(true);
     browser.actions().mouseMove(element(by.xpath(testData3.Charges.PaymentReceived_Button))).perform();
     browser.sleep(2000);
     element(by.xpath(testData3.Charges.Popup_ViewAll)).click();
     element(by.xpath(testData3.Table.col1)).getCssValue('text-align').then((textALign) => {
        expect(textALign).toEqual('left');
        element(by.xpath(testData3.Table.col1)).getCssValue('text-overflow').then((textoverflow) => {
            expect(textoverflow).toEqual('ellipsis');
          
            }); 
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
     







//// Log Out from Application
browser.findElement(by.xpath(testData3.SystemBar.Logout)).click();
browser.sleep(12000);

   });


}); 