var testdata = require('../inputs/testdata/PaymentMethods.json');
var testdata1 = require('../inputs/testdata/Login.json');
var testdata2 = require('../inputs/testdata/JsonFileCreation.json');
var testdata3 = require('../inputs/testdata/XpathRepository.json');


describe('Validate Pay Now Scenarios using Credit card', function () {

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

it('Validate "Add and Pay Now" scenario in Bills Layer Amount Due Widget using Credit Card.', function () {
 //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10512/ Reg_002_Add_PaymentMethod_From_MakePaymentLink
    //Input file to refer
   var testdata4 = protractor.loginHelpers.dashboard();
   var testdata5 = protractor.loginHelpers.lang;

    browser.refresh();
    browser.sleep(5000);
    //MetraView downarrow
    element(by.xpath(testdata3.LayerSelector.Dropdown)).click();
    element(by.xpath(testdata3.LayerSelector.Bills)).click();
    var today = new Date();
    var d = "0"+ today.getDate();
    var dd = d.toString().substr(-2);
    var yyyy = today.getFullYear();
    var m = today.getMonth()+1;
    var m2="0"+m;
    var mm= m2.toString().substr(-2);

    var endDate = mm+"/"+dd+"/"+yyyy;


    //For validating the Amount due value in the Amount Due Widget
    var due = element(by.xpath(testdata3.MakeaPayment.AmountDue)).getText();
    browser.sleep(3000);
    //For getting the year in the Amount Due Widget
    //var year = element(by.xpath(testdata3.Make_a_Payment.AmountDue_PaymentYearValue)).getText();
    //Validate Make a payment link
    expect(element(by.xpath(testdata3.MakeaPayment.MakeaPaymentButton)).isDisplayed()).toBe(true);
    browser.sleep(3000);
    //click on Make a payment link
    element(by.xpath(testdata3.MakeaPayment.MakeaPaymentButton)).click();
    browser.sleep(3000);
    //Validate Payusing label
    expect(element(by.xpath(testdata3.MakeaPayment.PayUsing_TextField)).isDisplayed()).toBe(true);
    browser.sleep(3000);
    //validate cancel button
    expect(element(by.xpath(testdata3.MakeaPayment.CancelButton)).isDisplayed()).toBe(true);
    browser.sleep(3000);

    expect(element(by.xpath(testdata3.MakeaPayment.DateTimeFormat)).getAttribute("date-set")).toEqual(endDate);
     //click on cancel button
    element(by.xpath(testdata3.MakeaPayment.CancelButton)).click();
    browser.sleep(3000);
    element(by.xpath(testdata3.MakeaPayment.MakeaPaymentButton)).click();
    //Amount due value in make a payment pop up
    var due1 = element(by.xpath(testdata3.MakeaPayment.MakeaPayment_AmountDue)).getText();
    //validate both amount due in Amount due widget and Make a Payment
    expect(due).toEqual(due1);
    //click on payusing dropdown value
    element(by.xpath(testdata3.MakeaPayment.PayUsing_Dropdown)).click();
    browser.sleep(3000);
    //Select new payment method from the drop down
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
    //Clear the pay this amount value textbox
    element(by.xpath(testdata3.MakeaPayment.PaythisAmount_Value)).clear();
    browser.sleep(3000);
     //Enter the pay this amount value textbox
    element(by.xpath(testdata3.MakeaPayment.PaythisAmount_Value)).sendKeys(testdata.payamount);
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
    
    browser.actions().mouseMove(element(by.xpath(testdata3.MakeaPayment.CyberSource_PopUp))).perform();
    browser.sleep(3000);

    element(by.xpath(testdata3.MakeaPayment.CyberSource_Proceed)).click();
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

    expect(element(by.xpath(testdata3.MakeaPayment.AmountDue)).getText()).not.toEqual(due);

    
    
    expect(element(by.xpath(testdata3.ActivityLog.Today_Text)).getText()).toEqual(testdata4.TEXT_TODAY);
    expect(element(by.xpath(testdata3.ActivityLog.SuccessMessage)).getText()).toEqual('Credit card debit succeeded');

});

it('Validate "Pay Now" scenario in Dashboard layer Amount Due Widget using Credit Card', function () {

  var testdata4=protractor.loginHelpers.dashboard();

  browser.refresh();
  browser.sleep(5000);
  const ele1 = element(by.xpath(testdata3.MakeaPayment.AmountDue));
  ele1.getText().then(function change(text){

  var str = text;     

  // pay now 
  expect(element(by.xpath(testdata3.MakeaPayment.MakeaPayment_Button)).isDisplayed()).toBe(true);
  element(by.xpath(testdata3.MakeaPayment.MakeaPayment_Button)).click();

  element(by.xpath(testdata3.MakeaPayment.PaymentMethod_Dropdown)).click();
  browser.sleep(2000);
  expect(element(by.partialLinkText(testdata3.MakeaPayment.PaymentMethod_Dropdown_Visa)).isPresent()).toBe(true);
  element(by.partialLinkText(testdata3.MakeaPayment.PaymentMethod_Dropdown_Visa)).click();

  
  element(by.xpath(testdata3.MakeaPayment.PaythisAmount_Value)).clear();

  element(by.xpath(testdata3.MakeaPayment.PaythisAmount_Value)).sendKeys("2");

  browser.sleep(2000);

  element(by.xpath(testdata3.MakeaPayment.PayNow_Button)).click();
  browser.sleep(2000);
  expect(element(by.xpath(testdata3.MakeaPayment.Back_Button)).isDisplayed()).toBe(true);
  element(by.xpath(testdata3.MakeaPayment.Back_Button)).click();
  browser.sleep(2000);
  element(by.xpath(testdata3.MakeaPayment.PayNow_Button)).click();
  console.log('paynow clicked');
  browser.sleep(2000);
  
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