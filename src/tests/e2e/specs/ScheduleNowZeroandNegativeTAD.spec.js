var testdata = require('../inputs/testdata/PaymentMethods.json');
var testdata1 = require('../inputs/testdata/Login.json');
var testdata2 = require('../inputs/testdata/JsonFileCreation.json');
var testdata3 = require('../inputs/testdata/XpathRepository.json');

describe('Validate Payment Scenarios for TAD less than zero', function () {

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

it('Valdiate "ScheduleNow" scenario for Payment amount to be zero by adding new credit card', function () {
    var testdata4 = protractor.loginHelpers.dashboard();
    
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
    expect(element(by.xpath(testdata3.ActivityLog.Today_Text)).getText()).toEqual(testdata4.TEXT_TODAY);
    expect(element(by.xpath(testdata3.ActivityLog.SuccessMessage)).getText()).toEqual('Successfully added credit card');
    

    browser.sleep(5000);

    browser.refresh();
    browser.sleep(5000); 
    const ele1 = element(by.xpath(testdata3.MakeaPayment.AmountDue));
    ele1.getText().then(function change(text){
    str = text;
    // pay now 
    expect(element(by.xpath(testdata3.MakeaPayment.MakeaPayment_Button)).isDisplayed()).toBe(true);
    element(by.xpath(testdata3.MakeaPayment.MakeaPayment_Button)).click();
    browser.sleep(2000);
    expect(element(by.xpath(testdata3.MakeaPayment.Calendar)).isDisplayed()).toBe(true);
    element(by.xpath(testdata3.MakeaPayment.Calendar)).click();
    browser.sleep(2000);
   // selection of date
   const futureDate = element(by.xpath(testdata3.MakeaPayment.Calender_FutureDate));
   futureDate.click();
   element(by.xpath(testdata3.MakeaPayment.PaythisAmount_Value)).clear();
    
    element(by.xpath(testdata3.MakeaPayment.PaythisAmount_Value)).sendKeys(testdata.payamount);
    browser.sleep(3000);
    element(by.xpath(testdata3.MakeaPayment.PayNow_Button)).click();
    browser.sleep(2000);
    expect(element(by.xpath(testdata3.MakeaPayment.ReviewPaymentDetails_Text)).isDisplayed()).toBe(true);
    element(by.xpath(testdata3.MakeaPayment.PayNow_Button)).click();
    element(by.xpath(testdata3.MakeaPayment.MakeaPayment_Close));

    browser.sleep(1000);
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
    var el = element(by.xpath(testdata3.ActivityLog.Title));
    browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
    expect(element(by.xpath(testdata3.MakeaPayment.AmountDue)).getText()).toEqual(str);
    expect(element(by.xpath(testdata3.ActivityLog.Today_Text)).getText()).toEqual(testdata4.TEXT_TODAY);
    expect(element(by.xpath(testdata3.ActivityLog.SuccessMessage)).getText()).toEqual('Successfully scheduled electronic payment');
});
});

it('Validate "Pay Now" scenario for Payment Amount less than Zero using credit card', function () {

var testdata4 = protractor.loginHelpers.dashboard();

browser.refresh();
browser.sleep(5000);
    
const ele1 = element(by.xpath(testdata3.MakeaPayment.AmountDue));
ele1.getText().then(function change(text){
str = text;    
// pay now 
expect(element(by.xpath(testdata3.MakeaPayment.MakeaPayment_Button)).isDisplayed()).toBe(true);
element(by.xpath(testdata3.MakeaPayment.MakeaPayment_Button)).click();

element(by.xpath(testdata3.MakeaPayment.PaymentMethod_Dropdown)).click();
browser.sleep(2000);
    
expect(element(by.partialLinkText(testdata3.MakeaPayment.PaymentMethod_Dropdown_Visa)).isPresent()).toBe(true);
element(by.partialLinkText(testdata3.MakeaPayment.PaymentMethod_Dropdown_Visa)).click();
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

browser.sleep(1000);
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
    
expect(element(by.xpath(testdata3.MakeaPayment.AmountDue)).getText()).not.toEqual(str);

expect(element(by.xpath(testdata3.ActivityLog.Today_Text)).getText()).toEqual(testdata4.TEXT_TODAY);
expect(element(by.xpath(testdata3.ActivityLog.ActivityLog_LatestMessage)).getText()).toEqual('Credit card debit succeeded');
});
});

it('Cleanup-Delete Payment Card',function(){
    browser.refresh();
    browser.sleep(7000);
    
    element(by.xpath(testdata3.PaymentMethods.ViewAll_PaymentMethods)).click();
    browser.sleep(10000);
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