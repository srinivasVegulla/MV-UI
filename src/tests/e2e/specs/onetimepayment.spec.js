var testdata = require('../inputs/testdata/PaymentMethods.json');
var testdata1 = require('../inputs/testdata/Login.json');
var testdata2 = require('../inputs/testdata/JsonFileCreation.json');
var testdata3 = require('../inputs/testdata/XpathRepository.json');

describe('Validate Add and Pay Now Scenario without selecting "Save for Future Use" option', function () {

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

it('Validate Add and Pay Now Scenario using ACH card', function () {
    
    var testdata4 = protractor.loginHelpers.dashboard();

    browser.refresh();
    browser.sleep(5000);

    expect(element(by.xpath(testdata3.MakeaPayment.MakeaPayment_Button)).isDisplayed()).toBe(true);
    element(by.xpath(testdata3.MakeaPayment.MakeaPayment_Button)).click();
    browser.sleep(2000);
    element(by.xpath(testdata3.MakeaPayment.PayUsing_TextField)).isPresent();
    element(by.xpath(testdata3.MakeaPayment.PayUsing_Dropdown)).click();


    var total=element(by.xpath(testdata3.MakeaPayment.methods)).count;
    if(total==2){
    //Select new payment method from the drop down
    element.all(by.xpath(testdata3.MakeaPayment.PayUsing_Dropdown_NewPaymentMethod)).then(function(items) {
    items[1].click();
    browser.sleep(3000);
});
}else{
    element.all(by.xpath(testdata3.MakeaPayment.PayUsing_Dropdown_NewPaymentMethod)).then(function(items) {
        items[0].click();
        browser.sleep(3000);
    });
  }
    element(by.xpath(testdata3.MakeaPayment.PaythisAmount_Value)).clear();
    
    element(by.xpath(testdata3.MakeaPayment.PaythisAmount_Value)).sendKeys(testdata.payamount);
    browser.sleep(2000);
    
    element(by.xpath(testdata3.MakeaPayment.SaveforFutureUse_CheckBox)).isPresent();
    element(by.xpath(testdata3.MakeaPayment.SaveforFutureUse_CheckBox)).click();
    browser.sleep(2000);
    element(by.xpath(testdata3.MakeaPayment.AddandPayNow)).click();
    browser.sleep(2000);
    element(by.xpath(testdata3.MakeaPayment.AddandPayNowConformButton)).click();
    browser.actions().mouseMove(element(by.xpath(testdata3.MakeaPayment.AddandPayNow_Popup))).perform();
  
    element(by.xpath(testdata3.MakeaPayment.CyberSource_Proceed)).click();
    browser.ignoreSynchronization = true;
    browser.waitForAngular();
        
    browser.sleep(2000);
    var cybersource = element(by.xpath(testdata3.PaymentMethods.CyberSource_Text));
                       
    browser.actions().mouseMove(element(by.xpath(testdata3.PaymentMethods.CyberSource_Echeckoption))).perform();
    element(by.xpath(testdata3.PaymentMethods.CyberSource_Echeckoption_Button)).click();
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
    // card no
               
    browser.sleep(1000);
                    
    element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_RoutingNumber)).sendKeys('112200439');
    element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_AccountNumber)).sendKeys('12345678');
    element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_Check_Number)).sendKeys('123');
    element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_Account_Type)).click();
    element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_Account_Type_Checking)).click();
    element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_Finish)).click();
        
        
    browser.ignoreSynchronization = true;
    browser.waitForAngular();       
    browser.sleep(10000);   
                
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

    expect(element(by.xpath(testdata3.ActivityLog.Today_Text)).getText()).toEqual(testdata4.TEXT_TODAY);
    expect(element(by.xpath(testdata3.ActivityLog.ActivityLog_LatestMessage)).getText()).toEqual('One-time Debit ACH succeeded');

     // Log Out from Application
     browser.findElement(by.xpath(testdata3.SystemBar.Logout)).click();
     browser.sleep(12000);
});
    });



