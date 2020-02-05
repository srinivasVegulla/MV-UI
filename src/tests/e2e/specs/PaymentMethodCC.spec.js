var testdata = require('../inputs/testdata/PaymentMethods.json');
var testdata1 = require('../inputs/testdata/Login.json');
var testdata2 = require('../inputs/testdata/JsonFileCreation.json');
var testdata3 = require('../inputs/testdata/XpathRepository.json');

describe('Validate Adding, Editing , Deleting Credit Card Payment Method', function () {

it('Login with new corporate user', function(){
      
    var testdata8=protractor.loginHelpers.langCode;
    function login(testdata8){
          var testdata5 = protractor.loginHelpers.lang; 
          browser.get(testdata2.URL);
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

it('Validate Editing Credit Card Payment Method', function () {
var testdata4 = protractor.loginHelpers.dashboard();


browser.refresh();
browser.sleep(5000);

const ele1 = element(by.xpath(testdata3.MakeaPayment.Card_ExpiryYear));

ele1.getText().then(function change(text){
var str = text;
browser.actions().mouseMove(element(by.xpath(testdata3.PaymentMethods.PaymentMethod_Select1))).perform(); 
expect(element(by.xpath(testdata3.MakeaPayment.Edit)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata3.MakeaPayment.Edit)).getText()).toEqual(testdata4.TEXT_EDIT);
browser.sleep(3000);
element(by.xpath(testdata3.MakeaPayment.Edit)).click();
browser.actions().mouseMove(element(by.xpath(testdata3.MakeaPayment.Edit_Popup))).perform();
element(by.xpath(testdata3.MakeaPayment.Edit_PopupProceed)).isPresent();
element(by.xpath(testdata3.MakeaPayment.Edit_PopupProceed)).click();

browser.sleep(3000);
browser.ignoreSynchronization = true;

expect(element(by.xpath(testdata3.MakeaPayment.Edit_ReviewMessage)).getText()).toEqual(testdata.cyberpage);
element(by.xpath(testdata3.MakeaPayment.Edit_BillingAddresslabel)).isPresent();
element(by.xpath(testdata3.MakeaPayment.Edit_EditAddressButton)).isPresent();
element(by.xpath(testdata3.MakeaPayment.Edit_PaymentDetailsLabel)).isPresent();
element(by.xpath(testdata3.MakeaPayment.Edit_EditDetailsButton)).isPresent();
element(by.xpath(testdata3.MakeaPayment.Edit_EditDetailsButton)).click();
browser.sleep(2000);
expect(element(by.xpath(testdata3.PaymentMethods.CyberSource_BillingInformationTitle)).getText()).toEqual('Billing Information');
element(by.xpath(testdata3.MakeaPayment.Edit_PhoneNumberLabel)).isPresent();
element(by.xpath(testdata3.PaymentMethods.CyberSource_Phone)).clear();
browser.sleep(1000);
element(by.xpath(testdata3.PaymentMethods.CyberSource_Phone)).sendKeys(testdata.phno);
browser.sleep(1000);
browser.actions().mouseMove(element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_Text))).perform();
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
element(by.xpath(testdata3.MakeaPayment.Edit_Next)).isPresent();
// cancel validation
element(by.xpath(testdata3.MakeaPayment.Edit_Cancel)).isPresent();
//next validation
element(by.xpath(testdata3.MakeaPayment.Edit_Next)).click();
browser.sleep(1000);
browser.ignoreSynchronization = true;

element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_Finish)).click();
browser.ignoreSynchronization = true;
browser.waitForAngular();
browser.sleep(3000);

var testdata8=protractor.loginHelpers.langCode;
function login(testdata8){
      var testdata5 = protractor.loginHelpers.lang; 
      browser.get(testdata1.url.URL);
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

expect(element(by.xpath(testdata3.MakeaPayment.Card_ExpiryYear)).getText()).not.toEqual(str);
var el = element(by.xpath(testdata3.ActivityLog.Title));
browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
expect(element(by.xpath(testdata3.ActivityLog.Today_Text)).getText()).toEqual(testdata4.TEXT_TODAY);
expect(element(by.xpath(testdata3.ActivityLog.SuccessMessage)).getText()).toEqual('Successfully updated credit card');
            
      });
      });

it('Validate Deleting Credit Card Payment Method', function () {

var testdata4 = protractor.loginHelpers.dashboard();

browser.refresh();
browser.sleep(5000);


browser.actions().mouseMove(element(by.xpath(testdata3.PaymentMethods.PaymentMethod_Select1))).perform(); 
browser.sleep(3000);
expect(element(by.xpath(testdata3.PaymentMethods.PaymentMethod_Remove_Button)).isDisplayed()).toBe(true);
browser.sleep(5000);
element(by.xpath(testdata3.PaymentMethods.PaymentMethod_Remove_Button)).click();
expect(element(by.xpath(testdata3.PaymentMethods.RemovePaymentMethod_DoYouWantToProceed_Text)).getText()).toEqual(testdata4.TEXT_REMOVE_PAYMENT_METHOD);
expect(element(by.xpath(testdata3.PaymentMethods.PaymentMethod_DeleteConfirmation_Delete)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata3.PaymentMethods.PaymentMethod_DeleteConfirmation_Cancel)).isDisplayed()).toBe(true);
element(by.xpath(testdata3.PaymentMethods.PaymentMethod_DeleteConfirmation_Cancel)).click();
browser.actions().mouseMove(element(by.xpath(testdata3.PaymentMethods.PaymentMethod_Select1))).perform(); 
element(by.xpath(testdata3.PaymentMethods.PaymentMethod_Remove_Button)).click();
expect(element(by.xpath(testdata3.PaymentMethods.PaymentMethod_DeleteConfirmation_Cancel)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata3.PaymentMethods.RemovePaymentMethod_DoYouWantToProceed_Text)).getText()).toEqual(testdata4.TEXT_REMOVE_PAYMENT_METHOD);
element(by.xpath(testdata3.PaymentMethods.PaymentMethod_DeleteConfirmation_Delete)).click();
browser.sleep(2000);
expect(element(by.xpath(testdata3.PaymentMethods.NoPaymentdetailsavailable_Text)).getText()).toEqual(testdata4.TEXT_NO_PAYMENTS);

var testdata8=protractor.loginHelpers.langCode;
function login(testdata8){
      var testdata5 = protractor.loginHelpers.lang; 
      browser.get(testdata1.url.URL);
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

expect(element(by.xpath(testdata3.ActivityLog.Today_Text)).getText()).toEqual(testdata4.TEXT_TODAY);
expect(element(by.xpath(testdata3.ActivityLog.ActivityLog_LatestMessage)).getText()).toEqual('Successfully deleted credit card');
    // Log Out from Application
    browser.findElement(by.xpath(testdata3.SystemBar.Logout)).click();
    browser.sleep(12000);                     
      });
});