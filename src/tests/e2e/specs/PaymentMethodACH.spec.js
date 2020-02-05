var testdata = require('../inputs/testdata/PaymentMethods.json');
var testdata1 = require('../inputs/testdata/XpathRepository.json');
var testdata2 = require('../inputs/testdata/Login.json');
var testdata3 = require('../inputs/testdata/JsonFileCreation.json');

describe('Validate Adding, Editing , Deleting ACH Payment Method', function () {

it('Login with new corporate user', function(){
      
    var testdata8=protractor.loginHelpers.langCode;
    function login(testdata8){
          var testdata5 = protractor.loginHelpers.lang; 
          browser.get(testdata3.URL);
          browser.sleep(5000);
          element(by.css(testdata5)).click();
          browser.sleep(5000);      
    switch (testdata8) {
        case "BR":
    //Loading the Login Page
    //Login to Metraview with Corporate Account(not subscribed to any PO) 
    element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpBR);
    element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
    browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
    browser.sleep(12000);
        break;
        case "DE":
    
    //Login to Metraview with Corporate Account(not subscribed to any PO) 
    element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpDE);
    element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
    browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
    browser.sleep(12000);
        break;
        case "EG":
    
    //Login to Metraview with Corporate Account(not subscribed to any PO) 
    element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpEG);
    element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
    browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
    browser.sleep(12000);
        break;
        case "ES":
    
    //Login to Metraview with Corporate Account(not subscribed to any PO) 
    element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpES);
    element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
    browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
    browser.sleep(12000);
            break;
        case "FR":
    
    //Login to Metraview with Corporate Account(not subscribed to any PO) 
    element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpFR);
    element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
    browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
    browser.sleep(12000);
            break;
        case "GB":
    
    //Login to Metraview with Corporate Account(not subscribed to any PO) 
    element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpGB);
    element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
    browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
    browser.sleep(12000);
            break;
        case "IL":
    
    //Login to Metraview with Corporate Account(not subscribed to any PO) 
    element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpIL);
    element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
    browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
    browser.sleep(12000);
        break;
        case "JP":
    
    //Login to Metraview with Corporate Account(not subscribed to any PO) 
    element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpJP);
    element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
    browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
    browser.sleep(12000);
            break; 
        case "MX":
    
    //Login to Metraview with Corporate Account(not subscribed to any PO) 
    element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpMX);
    element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
    browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
    browser.sleep(12000);
            break;    
        case "SE":
    
    //Login to Metraview with Corporate Account(not subscribed to any PO) 
    element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpSE);
    element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
    browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
    browser.sleep(12000);
            break;
        case "US":
    
    //Login to Metraview with Corporate Account(not subscribed to any PO) 
    element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpUS);
    element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
    browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
    browser.sleep(12000);
        break;
}
      }

login(testdata8);

});

it('Validate Adding ACH Payment Method', function () {
  //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10505/ 001_Verify_Adding_PaymentMethod
  //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10512/ 001_Add_PaymentMethod()
    var testdata5=protractor.loginHelpers.dashboard();

    browser.refresh();
    browser.sleep(5000);
    expect(element(by.xpath(testdata1.PaymentMethods.Link)).isDisplayed()).toBe(true);
    element(by.xpath(testdata1.PaymentMethods.Link)).click();
    element(by.xpath(testdata1.PaymentMethods.Popup_Proceed)).click();
    browser.ignoreSynchronization = true;
    browser.waitForAngular();
    browser.sleep(5000);
	
    element(by.xpath(testdata1.PaymentMethods.CyberSource_Text));
    browser.actions().mouseMove(element(by.xpath(testdata1.PaymentMethods.CyberSource_Echeckoption))).perform();
    element(by.xpath(testdata1.PaymentMethods.CyberSource_Echeckoption_Button)).click();
    browser.sleep(5000);
	
    expect(element(by.xpath(testdata1.PaymentMethods.CyberSource_BillingInformationTitle)).getText()).toEqual('Billing Information');

    element(by.xpath(testdata1.PaymentMethods.CyberSource_FirstName)).clear();
    element(by.xpath(testdata1.PaymentMethods.CyberSource_FirstName)).sendKeys(testdata.name);
    element(by.xpath(testdata1.PaymentMethods.CyberSource_LastName)).clear();
    element(by.xpath(testdata1.PaymentMethods.CyberSource_LastName)).sendKeys(testdata.surname);
    element(by.xpath(testdata1.PaymentMethods.CyberSource_Company)).clear();
    element(by.xpath(testdata1.PaymentMethods.CyberSource_Company)).sendKeys(testdata.companyname);
    element(by.xpath(testdata1.PaymentMethods.CyberSource_AddressLine1)).clear();
    element(by.xpath(testdata1.PaymentMethods.CyberSource_AddressLine1)).sendKeys(testdata.address1);
    element(by.xpath(testdata1.PaymentMethods.CyberSource_AddressLine2)).clear();
    element(by.xpath(testdata1.PaymentMethods.CyberSource_AddressLine2)).sendKeys(testdata.address2);
    element(by.xpath(testdata1.PaymentMethods.CyberSource_City)).clear();
    element(by.xpath(testdata1.PaymentMethods.CyberSource_City)).sendKeys(testdata.city);
    element(by.xpath(testdata1.PaymentMethods.CyberSource_Country)).click();
    element(by.xpath(testdata1.PaymentMethods.CyberSource_Countryvalue)).click();
    element(by.xpath(testdata1.PaymentMethods.CyberSource_State)).clear();
    element(by.xpath(testdata1.PaymentMethods.CyberSource_State)).sendKeys(testdata.state);
    element(by.xpath(testdata1.PaymentMethods.CyberSource_PostalCode)).clear();
    element(by.xpath(testdata1.PaymentMethods.CyberSource_PostalCode)).sendKeys(testdata.postalcode);
    element(by.xpath(testdata1.PaymentMethods.CyberSource_Phone)).clear();
    element(by.xpath(testdata1.PaymentMethods.CyberSource_Phone)).sendKeys(testdata.phno);
    element(by.xpath(testdata1.PaymentMethods.CyberSource_Email)).clear();
    element(by.xpath(testdata1.PaymentMethods.CyberSource_Email)).sendKeys(testdata.email);
    // routing number
    element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_RoutingNumber)).click();
    element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_RoutingNumber)).sendKeys(testdata.routingnum);
    element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_AccountNumber)).click();
    element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_AccountNumber)).sendKeys(testdata.accountnum);
    element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_Check_Number)).click();
    element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_Check_Number)).sendKeys(testdata.checknum);

    element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_Account_Type)).click();
    element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_Account_Type_Savings)).click();

    element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_DOB_Month)).click();
    element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_DOB_Month_Value)).click();
    element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_DOB_Day)).click();
    element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_DOB_DayValue)).click();
    element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_DOB_Year)).click();
    element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_DOB_Year_Value)).click();
    element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_Finish)).click();

    browser.ignoreSynchronization = true;
    browser.waitForAngular();

    browser.sleep(10000);
    expect(element(by.xpath(testdata1.ActivityLog.Today_Text)).getText()).toEqual(testdata5.TEXT_TODAY);
    expect(element(by.xpath(testdata1.ActivityLog.ActivityLog_LatestMessage)).getText()).toEqual('Add ACH succeeded');
  
   
});

it('Validate availability of Payment Link', function () {

  var testdata5=protractor.loginHelpers.dashboard();

  browser.refresh();
  browser.sleep(5000);

  //Test Case: MetraView_2.0/ Configuring_Multiple_Cyber_sources/ 004_Availability_of_payment_link Started
  //Validate the [+ payment method] link should be available to add CC/ACH payment method
  expect(element(by.xpath(testdata1.PaymentMethods.Link)).isDisplayed()).toBe(true);
  expect(element(by.xpath(testdata1.PaymentMethods.Link)).getText()).toEqual(testdata5.TEXT_ADD_PAYMENT_METHODS);
  
  //Click on [+ payment method] link
  element(by.xpath(testdata1.PaymentMethods.Link)).click();
 
  //Validate the user should able to view a warning message after clicking on [+payment method] link
  expect(element(by.xpath(testdata1.PaymentMethods.Popup_WarningMessage)).isPresent()).toBe(true);
  expect(element(by.xpath(testdata1.PaymentMethods.Popup_WarningMessage)).getText()).toEqual(testdata5.TEXT_CYBERSOURCE_POPUP);

 
});

it('Validate Editing ACH Payment Method', function () {

  //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10512/ Reg_005_Edit_PaymentMethod
    var testdata7 = protractor.loginHelpers.dashboard();
    
   browser.refresh();
   browser.sleep(5000);
  
   browser.actions().mouseMove(element(by.xpath(testdata1.PaymentMethods.PaymentMethod_Select1))).perform(); 
   
   browser.sleep(3000);
    expect(element(by.xpath(testdata1.MakeaPayment.Edit_ACH)).isDisplayed()).toBe(true);
    expect(element(by.xpath(testdata1.MakeaPayment.Edit_ACH)).getText()).toEqual(testdata7.TEXT_EDIT);
    browser.sleep(5000);
   
    element(by.xpath(testdata1.MakeaPayment.Edit_ACH)).click();
    browser.actions().mouseMove(element(by.xpath(testdata1.MakeaPayment.Edit_Popup))).perform();
    element(by.xpath(testdata1.MakeaPayment.Edit_PopupProceed)).isPresent();
   
    element(by.xpath(testdata1.MakeaPayment.Edit_PopupProceed)).click();

    browser.sleep(3000);
    browser.ignoreSynchronization = true;

  expect(element(by.xpath(testdata1.MakeaPayment.Edit_ReviewMessage)).getText()).toEqual(testdata.cyberpage);
  element(by.xpath(testdata1.MakeaPayment.Edit_BillingAddresslabel)).isPresent();
  element(by.xpath(testdata1.MakeaPayment.Edit_EditAddressButton)).isPresent();
  element(by.xpath(testdata1.MakeaPayment.Edit_PaymentDetailsLabel)).isPresent();
  element(by.xpath(testdata1.MakeaPayment.Edit_EditDetailsButton)).isPresent();
  element(by.xpath(testdata1.MakeaPayment.Edit_EditDetailsButton)).click();
  browser.sleep(2000);
  expect(element(by.xpath(testdata1.PaymentMethods.CyberSource_BillingInformationTitle)).getText()).toEqual('Billing Information');
  element(by.xpath(testdata1.MakeaPayment.Edit_PhoneNumberLabel)).isPresent();
  element(by.xpath(testdata1.PaymentMethods.CyberSource_Phone)).clear();
  browser.sleep(1000);
  element(by.xpath(testdata1.PaymentMethods.CyberSource_Phone)).sendKeys(testdata.phno);
  browser.sleep(1000);
   browser.actions().mouseMove(element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_Text))).perform();
  
  browser.sleep(1000);
  element(by.xpath(testdata1.MakeaPayment.Edit_AchcheckNumber)).click();
  //testdata1.PaymentMethods.Edit_AchcheckNumber
  element(by.xpath(testdata1.MakeaPayment.Edit_AchcheckNumber)).sendKeys(testdata.cvnno);
  browser.sleep(2000);
  //click on account type
  element(by.xpath(testdata1.MakeaPayment.Edit_ACHAccountNumber)).click();
  browser.sleep(2000);
  element(by.xpath(testdata1.MakeaPayment.Edit_ACHAccountNumbervalue)).click();
  // expiration date edit
  browser.sleep(2000);
  element(by.xpath(testdata1.MakeaPayment.Edit_Day)).click();
  element(by.xpath(testdata1.MakeaPayment.Edit_DayValue)).click();

  element(by.xpath(testdata1.MakeaPayment.Edit_Month)).click();
  element(by.xpath(testdata1.MakeaPayment.Edit_MonthValue)).click();
  element(by.xpath(testdata1.MakeaPayment.Edit_Next)).isPresent();
  //expiration year edit
  browser.sleep(2000);
  element(by.xpath(testdata1.MakeaPayment.Edit_Year)).click();
  //testdata1.MakeaPaymentEdit_YearValue
  element(by.xpath(testdata1.MakeaPayment.Edit_YearValue)).click();
  // cancel validation
  expect(element(by.xpath(testdata1.MakeaPayment.Edit_Cancel)).isDisplayed()).toBe(true);
  //next validation
  browser.sleep(2000);
  element(by.xpath(testdata1.MakeaPayment.Edit_Next)).click();
  browser.sleep(1000);
  browser.ignoreSynchronization = true;

  element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_Finish)).click();
  browser.ignoreSynchronization = true;
  browser.waitForAngular();
  browser.sleep(3000);
  var testdata8=protractor.loginHelpers.langCode;
  function login(testdata8){
        var testdata5 = protractor.loginHelpers.lang; 
        browser.get(testdata2.url.URL);
        browser.sleep(5000);
        element(by.css(testdata5)).click();
        browser.sleep(5000);      
  switch (testdata8) {
      case "BR":
  //Loading the Login Page
  //Login to Metraview with Corporate Account(not subscribed to any PO) 
  element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpBR);
  element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
  browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
  browser.sleep(12000);
      break;
      case "DE":
  
  //Login to Metraview with Corporate Account(not subscribed to any PO) 
  element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpDE);
  element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
  browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
  browser.sleep(12000);
      break;
      case "EG":
  
  //Login to Metraview with Corporate Account(not subscribed to any PO) 
  element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpEG);
  element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
  browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
  browser.sleep(12000);
      break;
      case "ES":
  
  //Login to Metraview with Corporate Account(not subscribed to any PO) 
  element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpES);
  element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
  browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
  browser.sleep(12000);
          break;
      case "FR":
  
  //Login to Metraview with Corporate Account(not subscribed to any PO) 
  element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpFR);
  element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
  browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
  browser.sleep(12000);
          break;
      case "GB":
  
  //Login to Metraview with Corporate Account(not subscribed to any PO) 
  element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpGB);
  element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
  browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
  browser.sleep(12000);
          break;
      case "IL":
  
  //Login to Metraview with Corporate Account(not subscribed to any PO) 
  element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpIL);
  element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
  browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
  browser.sleep(12000);
      break;
      case "JP":
  
  //Login to Metraview with Corporate Account(not subscribed to any PO) 
  element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpJP);
  element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
  browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
  browser.sleep(12000);
          break; 
      case "MX":
  
  //Login to Metraview with Corporate Account(not subscribed to any PO) 
  element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpMX);
  element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
  browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
  browser.sleep(12000);
          break;    
      case "SE":
  
  //Login to Metraview with Corporate Account(not subscribed to any PO) 
  element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpSE);
  element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
  browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
  browser.sleep(12000);
          break;
      case "US":
  
  //Login to Metraview with Corporate Account(not subscribed to any PO) 
  element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpUS);
  element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
  browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
  browser.sleep(12000);
      break;
}
    }

login(testdata8);
  
  var el = element(by.xpath(testdata1.ActivityLog.Title));
  browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
  expect(element(by.xpath(testdata1.ActivityLog.Today_Text)).getText()).toEqual(testdata7.TEXT_TODAY);
  expect(element(by.xpath(testdata1.ActivityLog.SuccessMessage)).getText()).toEqual('Update ACH Succeeded');
        
 
});

it('Validate Deleting ACH Payment Method', function () {

  //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10512/ Reg_006_Remove_PaymentMethod
  var testdata5 = protractor.loginHelpers.dashboard();
  browser.refresh();
  browser.sleep(5000);

  browser.actions().mouseMove(element(by.xpath(testdata1.PaymentMethods.PaymentMethod_Select1))).perform(); 
  browser.sleep(3000);
  expect(element(by.xpath(testdata1.PaymentMethods.PaymentMethod_RemoveButton_ACH)).isDisplayed()).toBe(true);
  browser.sleep(5000);
  element(by.xpath(testdata1.PaymentMethods.PaymentMethod_RemoveButton_ACH)).click();
  browser.sleep(3000);
  expect(element(by.xpath(testdata1.PaymentMethods.RemovePaymentMethod_DoYouWantToProceed_Text_ACH)).getText()).toEqual(testdata5.TEXT_REMOVE_PAYMENT_METHOD);
  expect(element(by.xpath(testdata1.PaymentMethods.PaymentMethod_DeleteConfirmation_Delete)).isDisplayed()).toBe(true);
  expect(element(by.xpath(testdata1.PaymentMethods.PaymentMethod_DeleteConfirmation_Cancel_ACH)).isDisplayed()).toBe(true);
  element(by.xpath(testdata1.PaymentMethods.PaymentMethod_DeleteConfirmation_Cancel_ACH)).click();
  browser.sleep(3000);
  browser.actions().mouseMove(element(by.xpath(testdata1.PaymentMethods.PaymentMethod_Select1))).perform(); 
  browser.sleep(3000);
  element(by.xpath(testdata1.PaymentMethods.PaymentMethod_RemoveButton_ACH)).click();
  browser.sleep(3000);
  expect(element(by.xpath(testdata1.PaymentMethods.PaymentMethod_DeleteConfirmation_Cancel_ACH)).isDisplayed()).toBe(true);
  expect(element(by.xpath(testdata1.PaymentMethods.RemovePaymentMethod_DoYouWantToProceed_Text_ACH)).getText()).toEqual(testdata5.TEXT_REMOVE_PAYMENT_METHOD);
  element(by.xpath(testdata1.PaymentMethods.PaymentMethod_DeleteConfirmation_Delete)).click();
  browser.sleep(3000);
  expect(element(by.xpath(testdata1.PaymentMethods.NoPaymentdetailsavailable_Text)).getText()).toEqual(testdata5.TEXT_NO_PAYMENTS);
  var testdata8=protractor.loginHelpers.langCode;
  function login(testdata8){
        var testdata5 = protractor.loginHelpers.lang; 
        browser.get(testdata2.url.URL);
        browser.sleep(5000);
        element(by.css(testdata5)).click();
        browser.sleep(5000);      
  switch (testdata8) {
      case "BR":
  //Loading the Login Page
  //Login to Metraview with Corporate Account(not subscribed to any PO) 
  element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpBR);
  element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
  browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
  browser.sleep(12000);
      break;
      case "DE":
  
  //Login to Metraview with Corporate Account(not subscribed to any PO) 
  element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpDE);
  element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
  browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
  browser.sleep(12000);
      break;
      case "EG":
  
  //Login to Metraview with Corporate Account(not subscribed to any PO) 
  element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpEG);
  element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
  browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
  browser.sleep(12000);
      break;
      case "ES":
  
  //Login to Metraview with Corporate Account(not subscribed to any PO) 
  element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpES);
  element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
  browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
  browser.sleep(12000);
          break;
      case "FR":
  
  //Login to Metraview with Corporate Account(not subscribed to any PO) 
  element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpFR);
  element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
  browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
  browser.sleep(12000);
          break;
      case "GB":
  
  //Login to Metraview with Corporate Account(not subscribed to any PO) 
  element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpGB);
  element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
  browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
  browser.sleep(12000);
          break;
      case "IL":
  
  //Login to Metraview with Corporate Account(not subscribed to any PO) 
  element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpIL);
  element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
  browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
  browser.sleep(12000);
      break;
      case "JP":
  
  //Login to Metraview with Corporate Account(not subscribed to any PO) 
  element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpJP);
  element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
  browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
  browser.sleep(12000);
          break; 
      case "MX":
  
  //Login to Metraview with Corporate Account(not subscribed to any PO) 
  element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpMX);
  element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
  browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
  browser.sleep(12000);
          break;    
      case "SE":
  
  //Login to Metraview with Corporate Account(not subscribed to any PO) 
  element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpSE);
  element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
  browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
  browser.sleep(12000);
          break;
      case "US":
  
  //Login to Metraview with Corporate Account(not subscribed to any PO) 
  element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.corpUS);
  element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
  browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
  browser.sleep(12000);
      break;
}
    }

login(testdata8);

  expect(element(by.xpath(testdata1.ActivityLog.Today_Text)).getText()).toEqual(testdata5.TEXT_TODAY);
  expect(element(by.xpath(testdata1.ActivityLog.ActivityLog_LatestMessage)).getText()).toEqual("Delete ACH succeeded");
                  
// Log Out from Application
browser.findElement(by.xpath(testdata1.SystemBar.Logout)).click();
browser.sleep(12000);
    
});

});