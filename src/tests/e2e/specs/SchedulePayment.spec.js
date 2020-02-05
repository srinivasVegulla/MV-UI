var testdata2= require('../inputs/testdata/JsonFileCreation.json');
var testdata = require('../inputs/testdata/PaymentMethods.json');
var testdata1 = require('../inputs/testdata/Login.json');
var testdata3 = require('../inputs/testdata/XpathRepository.json');

describe('Valdiate Schedule Payments in Dashboard layer using CC', function () {

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

it('Valdiate user is not able to select previous date and able to schedule payments for future date using CC ', function () {

    browser.refresh();
    browser.sleep(6000);
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

    browser.sleep(5000);
    //get the value of card in the created card
    var visaname=element(by.xpath(testdata3.MakeaPayment.Visaname));
    browser.sleep(5000);
    //Mouse hover on make a payment on the card
    browser.actions().mouseMove(element(by.xpath(testdata3.MakeaPayment.Payment_Button_Mousehover))).perform(); 
    browser.sleep(4000);
    expect(element(by.xpath(testdata3.MakeaPayment.Payment_Button_Mousehover)).isDisplayed()).toBe(true);
    browser.sleep(6000);
    //click on make make a payment button on the card
    element(by.xpath(testdata3.MakeaPayment.Payment_Button)).click();
    //click on paymentmethoddropdown value
    element(by.xpath(testdata3.MakeaPayment.PaymentMethod_Dropdown)).click();
    
    var visanamedropdown=element(by.xpath(testdata3.MakeaPayment.PaymentMethod_Dropdown_Visa));
   
    //compare both values
    //The corresponding should reflect in the make payment overlay in the payment methods drop down
    visaname=visanamedropdown;
    //click on cancel button
    element(by.xpath(testdata3.AccountInformation.Edit_Cancel)).click();

    //Verify is the user is not able to pick a past date for scheduling a payment
    element(by.xpath(testdata3.MakeaPayment.MakeaPayment_Button)).click();

    element(by.xpath(testdata3.MakeaPayment.Calendar)).click();
    //The user should not be able to schedule the payment for past date

    element(by.xpath(testdata3.MakeaPayment.Calender_DisabledValue)).click();
    //validate the date is in disabled state unable to select the previous date
    expect(element(by.xpath(testdata3.MakeaPayment.Calender_DisabledValue)).isDisplayed()).toBe(true);

    browser.refresh();
    browser.sleep(3000);
    //click on make make a payment button on the card
    element(by.xpath(testdata3.MakeaPayment.MakeaPayment_Button)).click();
   
   var today = new Date();
   var yyyy = today.getFullYear();
   var d = "0"+ today.getDate();
   var dd = d.toString().substr(-2);
   var m = today.getMonth()+1;
   var m2="0"+m;
   var mm= m2.toString().substr(-2);  //January is 0!
   var endDate= new Date();
   endDate = mm+"/"+dd+"/"+yyyy;
    expect(element(by.xpath(testdata3.MakeaPayment.DateTimeFormat)).getAttribute("date-set")).toEqual(endDate);
    
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
