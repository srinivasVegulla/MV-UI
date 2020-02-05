var testdata = require('../inputs/testdata/PaymentMethods.json');
var testdata3 = require('../inputs/testdata/XpathRepository.json');
describe('UI Baseline App', function () {

it('Login with new corporate user', function(){
      var testdata4= require('../inputs/testdata/JsonFileCreation.json');
      var testdata6=require('../inputs/testdata/Login.json');
      var testdata8=protractor.loginHelpers.langCode;
      function login(testdata8){
            var testdata5 = protractor.loginHelpers.lang; 
            browser.get(testdata4.URL);
            browser.sleep(5000);
            element(by.css(testdata5)).click();
            browser.sleep(5000);      
      switch (testdata8) {
          case "BR":
      //Loading the Login Page
      //Login to Metraview with Corporate Account(not subscribed to any PO) 
      element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata4.corpBR);
      element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata4.passwordField);
      browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
      browser.sleep(12000);
          break;
          case "DE":
      
      //Login to Metraview with Corporate Account(not subscribed to any PO) 
      element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata4.corpDE);
      element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata4.passwordField);
      browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
      browser.sleep(12000);
          break;
          case "EG":
      
      //Login to Metraview with Corporate Account(not subscribed to any PO) 
      element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata4.corpEG);
      element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata4.passwordField);
      browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
      browser.sleep(12000);
          break;
          case "ES":
      
      //Login to Metraview with Corporate Account(not subscribed to any PO) 
      element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata4.corpES);
      element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata4.passwordField);
      browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
      browser.sleep(12000);
              break;
          case "FR":
      
      //Login to Metraview with Corporate Account(not subscribed to any PO) 
      element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata4.corpFR);
      element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata4.passwordField);
      browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
      browser.sleep(12000);
              break;
          case "GB":
      
      //Login to Metraview with Corporate Account(not subscribed to any PO) 
      element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata4.corpGB);
      element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata4.passwordField);
      browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
      browser.sleep(12000);
              break;
          case "IL":
      
      //Login to Metraview with Corporate Account(not subscribed to any PO) 
      element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata4.corpIL);
      element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata4.passwordField);
      browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
      browser.sleep(12000);
          break;
          case "JP":
      
      //Login to Metraview with Corporate Account(not subscribed to any PO) 
      element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata4.corpJP);
      element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata4.passwordField);
      browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
      browser.sleep(12000);
              break; 
          case "MX":
      
      //Login to Metraview with Corporate Account(not subscribed to any PO) 
      element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata4.corpMX);
      element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata4.passwordField);
      browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
      browser.sleep(12000);
              break;    
          case "SE":
      
      //Login to Metraview with Corporate Account(not subscribed to any PO) 
      element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata4.corpSE);
      element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata4.passwordField);
      browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
      browser.sleep(12000);
              break;
          case "US":
      
      //Login to Metraview with Corporate Account(not subscribed to any PO) 
      element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata4.corpUS);
      element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata4.passwordField);
      browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
      browser.sleep(12000);
          break;
  }
        }
  
  login(testdata8);

});

it('Validate Adding Credit Card Payment Method', function () {
    //Input file to refer
 var testdata5 = protractor.loginHelpers.dashboard();
  
 browser.refresh();
 browser.sleep(5000);    
 expect(element(by.xpath(testdata3.PaymentMethods.Link)).isDisplayed()).toBe(true);
 browser.sleep(3000);
 element(by.xpath(testdata3.PaymentMethods.Link)).click();
 browser.sleep(3000);
 element(by.xpath(testdata3.PaymentMethods.Popup_Proceed)).click();
 browser.sleep(3000);
 browser.ignoreSynchronization = true;
 browser.waitForAngular();
 
 browser.sleep(1000);
 
 
 element(by.xpath(testdata3.PaymentMethods.Cybersource_Text));
 browser.actions().mouseMove(element(by.xpath(testdata3.PaymentMethods.CyberSource_Card))).perform();
 element(by.xpath(testdata3.PaymentMethods.CyberSource_Visacard_Name)).click();
 
 expect(element(by.xpath(testdata3.PaymentMethods.CyberSource_BillingInformationTitle)).getText()).toEqual('Billing Information');
 
 element(by.xpath(testdata3.PaymentMethods.CyberSource_FirstName)).clear();
 element(by.xpath(testdata3.PaymentMethods.CyberSource_FirstName)).sendKeys(testdata.name);
 element(by.xpath(testdata3.PaymentMethods.CyberSource_LastName)).clear();
 element(by.xpath(testdata3.PaymentMethods.CyberSource_LastName)).sendKeys(testdata.surname);
 element(by.xpath(testdata3.PaymentMethods.CyberSource_Company)).clear();
 element(by.xpath(testdata3.PaymentMethods.CyberSource_Company)).sendKeys(testdata.companyname);
 element(by.xpath(testdata3.PaymentMethods.CyberSource_AddressLine1)).clear();
 element(by.xpath(testdata3.PaymentMethods.CyberSource_AddressLine1)).sendKeys(testdata.address1);
 element(by.xpath(testdata3.PaymentMethods.CyberSource_AddressLine2)).clear();
 element(by.xpath(testdata3.PaymentMethods.CyberSource_AddressLine2)).sendKeys(testdata.address2);
 element(by.xpath(testdata3.PaymentMethods.CyberSource_City)).clear();
 element(by.xpath(testdata3.PaymentMethods.CyberSource_City)).sendKeys(testdata.city);
 element(by.xpath(testdata3.PaymentMethods.CyberSource_Country)).click();
 element(by.xpath(testdata3.PaymentMethods.CyberSource_Countryvalue)).click();
 element(by.xpath(testdata3.PaymentMethods.CyberSource_State)).clear();
 element(by.xpath(testdata3.PaymentMethods.CyberSource_State)).sendKeys(testdata.state);
 element(by.xpath(testdata3.PaymentMethods.CyberSource_PostalCode)).clear();
 element(by.xpath(testdata3.PaymentMethods.CyberSource_PostalCode)).sendKeys(testdata.postalcode);
 element(by.xpath(testdata3.PaymentMethods.CyberSource_Phone)).clear();
 element(by.xpath(testdata3.PaymentMethods.CyberSource_Phone)).sendKeys(testdata.phno);
 element(by.xpath(testdata3.PaymentMethods.CyberSource_Email)).clear();
 element(by.xpath(testdata3.PaymentMethods.CyberSource_Email)).sendKeys(testdata.email);
 
 //card no
 
 var widget = element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_Text));
 browser.executeScript('arguments[0].scrollIntoView()', widget.getWebElement());
 browser.sleep(1000);
 
 element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_CardNumber)).click();
 element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_CardNumber)).sendKeys(testdata.cardno);
 
 element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_CVNLabel)).isPresent();
 element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_CVNValue)).isPresent();
 element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_CVNValue)).click();
 
 element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_CVNValue)).sendKeys(testdata.cvnno);
 
 // expiration date edit
 element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_ExpirationMonth)).click();
 element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_ExpirationMonthValue)).click();
 
 element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_ExpirationYear)).click();
 element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_ExpirationYearValue)).click();
 element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_Finish)).click();
 
 
 browser.ignoreSynchronization = true;
 browser.waitForAngular();
 
 browser.sleep(10000);
 var el = element(by.xpath(testdata3.ActivityLog.Title));
 browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
 expect(element(by.xpath(testdata3.ActivityLog.Today_Text)).getText()).toEqual(testdata5.TEXT_TODAY);
 expect(element(by.xpath(testdata3.ActivityLog.SuccessMessage)).getText()).toEqual('Successfully added credit card');
       
        
});

it('Validate Adding Credit Card Payment Method', function () {
  //Input file to refer
var testdata5 = protractor.loginHelpers.dashboard();
browser.refresh();
browser.sleep(5000);    
expect(element(by.xpath(testdata3.PaymentMethods.Link)).isDisplayed()).toBe(true);
browser.sleep(3000);
element(by.xpath(testdata3.PaymentMethods.Link)).click();
browser.sleep(3000);
element(by.xpath(testdata3.PaymentMethods.Popup_Proceed)).click();
browser.sleep(3000);
browser.ignoreSynchronization = true;
browser.waitForAngular();

browser.sleep(1000);


element(by.xpath(testdata3.PaymentMethods.Cybersource_Text));
browser.actions().mouseMove(element(by.xpath(testdata3.PaymentMethods.CyberSource_Card))).perform();
element(by.xpath(testdata3.PaymentMethods.CyberSource_Visacard_Name)).click();

expect(element(by.xpath(testdata3.PaymentMethods.CyberSource_BillingInformationTitle)).getText()).toEqual('Billing Information');

element(by.xpath(testdata3.PaymentMethods.CyberSource_FirstName)).clear();
element(by.xpath(testdata3.PaymentMethods.CyberSource_FirstName)).sendKeys(testdata.name);
element(by.xpath(testdata3.PaymentMethods.CyberSource_LastName)).clear();
element(by.xpath(testdata3.PaymentMethods.CyberSource_LastName)).sendKeys(testdata.surname);
element(by.xpath(testdata3.PaymentMethods.CyberSource_Company)).clear();
element(by.xpath(testdata3.PaymentMethods.CyberSource_Company)).sendKeys(testdata.companyname);
element(by.xpath(testdata3.PaymentMethods.CyberSource_AddressLine1)).clear();
element(by.xpath(testdata3.PaymentMethods.CyberSource_AddressLine1)).sendKeys(testdata.address1);
element(by.xpath(testdata3.PaymentMethods.CyberSource_AddressLine2)).clear();
element(by.xpath(testdata3.PaymentMethods.CyberSource_AddressLine2)).sendKeys(testdata.address2);
element(by.xpath(testdata3.PaymentMethods.CyberSource_City)).clear();
element(by.xpath(testdata3.PaymentMethods.CyberSource_City)).sendKeys(testdata.city);
element(by.xpath(testdata3.PaymentMethods.CyberSource_Country)).click();
element(by.xpath(testdata3.PaymentMethods.CyberSource_Countryvalue)).click();
element(by.xpath(testdata3.PaymentMethods.CyberSource_State)).clear();
element(by.xpath(testdata3.PaymentMethods.CyberSource_State)).sendKeys(testdata.state);
element(by.xpath(testdata3.PaymentMethods.CyberSource_PostalCode)).clear();
element(by.xpath(testdata3.PaymentMethods.CyberSource_PostalCode)).sendKeys(testdata.postalcode);
element(by.xpath(testdata3.PaymentMethods.CyberSource_Phone)).clear();
element(by.xpath(testdata3.PaymentMethods.CyberSource_Phone)).sendKeys(testdata.phno);
element(by.xpath(testdata3.PaymentMethods.CyberSource_Email)).clear();
element(by.xpath(testdata3.PaymentMethods.CyberSource_Email)).sendKeys(testdata.email);

//card no

var widget = element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_Text));
browser.executeScript('arguments[0].scrollIntoView()', widget.getWebElement());
browser.sleep(1000);

element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_CardNumber)).click();
element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_CardNumber)).sendKeys(testdata.cardno);

element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_CVNLabel)).isPresent();
element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_CVNValue)).isPresent();
element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_CVNValue)).click();

element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_CVNValue)).sendKeys(testdata.cvnno);

// expiration date edit
element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_ExpirationMonth)).click();
element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_ExpirationMonthValue)).click();

element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_ExpirationYear)).click();
element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_ExpirationYearValue)).click();
element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_Finish)).click();


browser.ignoreSynchronization = true;
browser.waitForAngular();

browser.sleep(10000);
var el = element(by.xpath(testdata3.ActivityLog.Title));
browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
expect(element(by.xpath(testdata3.ActivityLog.Today_Text)).getText()).toEqual(testdata5.TEXT_TODAY);
expect(element(by.xpath(testdata3.ActivityLog.SuccessMessage)).getText()).toEqual('Successfully added credit card');
     
      
});

it('validate payment methods viewall', function () {
    var testdata4 = protractor.loginHelpers.dashboard();
   
    browser.refresh();
    browser.sleep(5000);              
    element(by.xpath(testdata3.PaymentMethods.ViewAll_PaymentMethods)).click();
    browser.sleep(10000);
   // expect(element(by.xpath(testdata3.PaymentMethods.SelectBy_Text)).getText()).toEqual(testdata4.TEXT_SELECTED_BY);
   // element(by.xpath(testdata3.Adjustment.SelectByDropdown)).click();
   // element(by.xpath(testdata3.Adjustment.SelectBy_Bill)).click();
   // browser.sleep(500); 
    //selecting interval
   // element(by.xpath(testdata3.Adjustment.SelectInterval)).click();
   // element(by.xpath(testdata3.Adjustment.SelectFirstInterval)).click();
    // tabular view
    element(by.xpath(testdata3.PaymentMethods.TabularView)).click();
    // settings
    element(by.xpath(testdata3.Adjustment.Settings)).click();
    browser.actions().mouseMove(element(by.xpath(testdata3.Adjustment.Settings_Label))).perform();
    browser.sleep(2000);
    element(by.xpath(testdata3.PaymentMethods.Settins_None)).click();
    browser.sleep(2000);
    element(by.xpath(testdata3.PaymentMethods.Settins_All)).click();
    browser.sleep(2000);

    // freeze
    element(by.xpath(testdata3.PaymentMethods.Settings_FirstColumn)).click();
    browser.sleep(2000);
    
   
    //Verify First column is disabled
    var columnCount = element.all(by.xpath(testdata3.PaymentMethods.Settings_ColumnCount));
    expect(columnCount.count()).toBe(4);

    // apply
    element(by.xpath(testdata3.PaymentMethods.Settins_Apply)).click();
    browser.sleep(1000);
    browser.refresh();
    browser.sleep(5000);
    element(by.xpath(testdata3.PaymentMethods.ViewAll_PaymentMethods)).click();
    browser.sleep(3000);
    expect(element(by.xpath(testdata3.PaymentMethods.ViewAll_Edit)).isDisplayed()).toBe(true);
    expect(element(by.xpath(testdata3.PaymentMethods.ViewAllPaymentMethods_MakeaPayement_Button)).isDisplayed()).toBe(true);
    expect(element(by.xpath(testdata3.PaymentMethods.ViewAllPaymentMethods_Remove_Button)).isDisplayed()).toBe(true);
    var testdata13 = protractor.loginHelpers.paymentMethodsKeys();
    console.log(testdata13);


    expect(element(by.xpath("//span[contains(text(),'"+testdata13+"')]")).isDisplayed()).toBe(true);
    element.all(by.xpath(testdata3.PaymentMethods.ViewAll_Edit)).then(function(items) {
    items[1].click();
        
    });
    browser.sleep(2000);     
    browser.actions().mouseMove(element(by.xpath(testdata3.PaymentMethods.EditPaymentMethod_PopUp))).perform();
    element(by.xpath(testdata3.PaymentMethods.EditPaymentMethod_PopUp_Proceed)).isPresent();
  
    element(by.xpath(testdata3.PaymentMethods.EditPaymentMethod_PopUp_Cancel)).isPresent();
    element(by.xpath(testdata3.PaymentMethods.EditPaymentMethod_PopUp_Proceed)).click();
  
    browser.sleep(3000);
    browser.ignoreSynchronization = true;
    expect(element(by.xpath(testdata3.PaymentMethods.ReviewyourOrder_Label)).getText()).toEqual(testdata.cyberpage);
    element(by.xpath(testdata3.PaymentMethods.BillingAddress_Label)).isPresent();
    element(by.xpath(testdata3.PaymentMethods.EditAddress)).isPresent();
    element(by.xpath(testdata3.PaymentMethods.PaymentDetails_Label)).isPresent();
    element(by.xpath(testdata3.PaymentMethods.EditDetails)).isPresent();
    element(by.xpath(testdata3.PaymentMethods.EditAddress)).click();
    browser.sleep(2000);
    expect(element(by.xpath(testdata3.PaymentMethods.CyberSource_BillingInformationTitle)).getText()).toEqual('Billing Information');
    element(by.xpath(testdata3.PaymentMethods.PhoneNumber_Text)).isPresent();
    element(by.xpath(testdata3.PaymentMethods.CyberSource_Phone)).clear();
    browser.sleep(1000);
    element(by.xpath(testdata3.PaymentMethods.CyberSource_Phone)).sendKeys(testdata.phno);
    browser.sleep(1000);
    //browser.actions().mouseMove(element(by.xpath(testdata3.PaymentMethods.PaymentDetails_Text))).perform();
    element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_CVNLabel)).isPresent();
    element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_CVNValue)).isPresent();
    element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_CVNValue)).click();
    browser.sleep(1000);
    element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_CVNValue)).sendKeys(testdata.cvnno);
  // expiration date edit
  element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_ExpirationMonth)).click();
  element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_ExpirationMonthValue)).click();

  element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_ExpirationYear)).click();
  element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_ExpirationYearValue)).click();
  
    element(by.xpath(testdata3.PaymentMethods.Next_Button)).isPresent();
    // cancel validation
    element(by.xpath(testdata3.PaymentMethods.Cancel_Button)).isPresent();
    //next validation
    element(by.xpath(testdata3.PaymentMethods.Next_Button)).click();
    browser.sleep(2000);
    browser.ignoreSynchronization = true;
  
    element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_Finish)).click();
    browser.ignoreSynchronization = true;
    browser.waitForAngular();
  
    browser.sleep(10000);
    element(by.xpath(testdata3.PaymentMethods.ViewAll_PaymentMethods)).click();
    browser.sleep(1000);
    //clicking selected by
   // expect(element(by.xpath(testdata3.PaymentMethods.SelectBy_Text)).getText()).toEqual(testdata.selectbytext);
  //  element(by.xpath(testdata3.Adjustment.SelectByDropdown)).click();
  //  element(by.xpath(testdata3.Adjustment.SelectBy_Bill)).click();
    browser.sleep(500); 
    //selecting interval
  //  element(by.xpath(testdata3.Adjustment.SelectInterval)).click();
  //  element(by.xpath(testdata3.Adjustment.SelectFirstInterval)).click();
    // tabular view
    element(by.xpath(testdata3.PaymentMethods.TabularView)).click();
    // settings
    element(by.xpath(testdata3.Adjustment.Settings)).click();
    browser.actions().mouseMove(element(by.xpath(testdata3.Adjustment.Settings_Label))).perform();
    browser.sleep(500);
    element(by.xpath(testdata3.PaymentMethods.Settins_None)).click();
    element(by.xpath(testdata3.PaymentMethods.Settins_All)).click();
    element(by.xpath(testdata3.PaymentMethods.Settins_Apply)).click();
    browser.sleep(1000);
    element(by.xpath(testdata3.PaymentMethods.ViewAllPaymentMethods_MakeaPayement_Button)).click();
    element(by.xpath(testdata3.MakeaPayment.PaythisAmount_Value)).clear();
  
    element(by.xpath(testdata3.MakeaPayment.PaythisAmount_Value)).sendKeys(testdata.payamount);
    browser.sleep(2000);
    element(by.xpath(testdata3.MakeaPayment.PayNow_Button)).click();
    browser.sleep(2000);
    expect(element(by.xpath(testdata3.MakeaPayment.Back_Button)).isDisplayed()).toBe(true);
    element(by.xpath(testdata3.MakeaPayment.Back_Button)).click();
    browser.sleep(2000);
    element(by.xpath(testdata3.MakeaPayment.PayNow_Button)).click();
    console.log('paynow clicked');
  
    expect(element(by.xpath(testdata3.MakeaPayment.Amount_Text)).getText()).toEqual(testdata4.TEXT_AMOUNT);
    expect(element(by.xpath(testdata3.MakeaPayment.Method_Text)).getText()).toEqual(testdata4.TEXT_METHOD);
    expect(element(by.xpath(testdata3.MakeaPayment.PayUsing_Text)).getText()).toEqual(testdata4.TEXT_PAY_USING);
    expect(element(by.xpath(testdata3.MakeaPayment.Date_Text)).getText()).toEqual(testdata4.TEXT_DATE);     
    expect(element(by.xpath(testdata3.MakeaPayment.PayNow_Button)).isDisplayed()).toBe(true);
  
    element(by.xpath(testdata3.MakeaPayment.PayNow_Button)).click();
    browser.sleep(2000);
    expect(element(by.xpath(testdata3.MakeaPayment.YourPaymenthasbeenProcessed_Text)).isDisplayed()).toBe(true);
    element(by.xpath(testdata3.MakeaPayment.MakeaPayment_Close)).click();
    browser.refresh();
    browser.sleep(5000);
    element(by.xpath(testdata3.PaymentMethods.ViewAll_PaymentMethods)).click();
    browser.sleep(10000);
  
    //again settings icon
    element(by.xpath(testdata3.Adjustment.Settings)).click();
    browser.sleep(500);
    browser.actions().mouseMove(element(by.xpath(testdata3.Adjustment.Settings_Label))).perform();
    browser.sleep(500);
  
    // unfreeze
    var unfreeze = element.all(by.xpath(testdata3.PaymentMethods.Settins_Values)).last();
    unfreeze.click();
    browser.sleep(1000);
  
    expect(element(by.xpath(testdata3.PaymentMethods.Settins_Cancel)).isDisplayed()).toBe(true);
    element(by.xpath(testdata3.PaymentMethods.Settins_Cancel)).click();
    browser.sleep(2000);
   expect(element(by.xpath("//span[contains(text(),'"+testdata13+"')]")).isDisplayed()).toBe(true);
    element(by.xpath(testdata3.Adjustment.Settings)).click();
    // apply
    element(by.xpath(testdata3.PaymentMethods.Settins_Apply)).click();
    browser.sleep(1000);


element.all(by.xpath(testdata3.PaymentMethods.ViewAllPaymentMethods_Remove_Button)).then(function(items) {
  items[0].click();
});
browser.sleep(3000);
//ESR-10593/ 001_Verify_DeleteConfirmation_dialog_is_displayed
//Verify that "Delete Confirmation" dialog is displayed
expect(element(by.xpath(testdata3.PaymentMethods.PaymentMethod_DeleteConfirmation_Dialogue)).getText()).toEqual(testdata4.TEXT_DELETE_CONFIMATION);
element(by.xpath(testdata3.PaymentMethods.Delete_button)).click();
browser.sleep(5000);
//Verify that the payment method is deleted
expect(element(by.xpath(testdata3.PaymentMethods.ViewAllPaymentMethods_Grid)).getText()).not.toContain(testdata.expirydate);
//clean-up
element.all(by.xpath(testdata3.PaymentMethods.ViewAllPaymentMethods_Remove_Button)).then(function(items) {
  items[0].click();
});
browser.sleep(3000);
element(by.xpath(testdata3.PaymentMethods.Delete_button)).click();
browser.sleep(5000);
 // Log Out from Application
 browser.findElement(by.xpath(testdata3.SystemBar.Logout)).click();
 browser.sleep(12000);   
});  

});