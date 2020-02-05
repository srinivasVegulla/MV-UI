var testdata1 = require('../inputs/testdata/Login.json');
var testdata2= require('../inputs/testdata/JsonFileCreation.json')
var testdata = require('../inputs/testdata/PaymentMethods.json');
var testdata3 = require('../inputs/testdata/XpathRepository.json');

var sort = [];

describe('Valdiate Payments received in Bills Layers', function () {

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

//Test Case: MetraView_2.0/ Payment_Received/ 006_Sorting
it('Validate Sorting functionality in payment received layer', function () {

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
  browser.sleep(3000);

   browser.ignoreSynchronization = true;
   browser.waitForAngular();

   browser.sleep(3000);
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
   
   expect(element(by.xpath(testdata3.MakeaPayment.MakeaPayment_Button)).isDisplayed()).toBe(true);
   //click on make a payment link
   element(by.xpath(testdata3.MakeaPayment.MakeaPayment_Button)).click();
  browser.sleep(3000);
   
   //Clear the pay this amount value textbox
   element(by.xpath(testdata3.MakeaPayment.PaythisAmount_Value)).clear();
   browser.sleep(3000);
    //Enter the pay this amount value textbox
   element(by.xpath(testdata3.MakeaPayment.PaythisAmount_Value)).sendKeys(testdata.PaymentNewValue);
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

   element(by.xpath(testdata3.LayerSelector.Dropdown)).click();
   element(by.xpath(testdata3.LayerSelector.Bills)).click();

   browser.sleep(5000);
   browser.actions().mouseMove(element(by.xpath(testdata3.Payments.PaymentsRecievedPopUp))).perform();
   browser.sleep(2000);
   //click on view all button in order o validate the card view
   var viewall = element(By.xpath(testdata3.Payments.ViewAll)).click();
   browser.sleep(2000);

//Get the values of columns
 const elem = element.all(by.xpath(testdata3.Payments.PaymentsColumnsList))

  browser.sleep(2000);

  //click on sort and select amount from the dropdown
  element(by.xpath(testdata3.ActivityLog.SortBy)).click();
  element(by.xpath(testdata3.Payments.PaymentsReceived_Sortvalue)).click();
  browser.sleep(10000);
  //Get the values of amount in sort mode
  elem.map(function(eachName){
  eachName.getText().then(function sorting(sorted){
   sort.push(sorted);
   return sorted ;
 
});

//validate the sorting functionality
}).then(function compare ()
{

for (var i = 0; i < sort.length-1; i++) {

console.log(sort.length,sort[i],sort[i+1],i)
if(sort[i] < sort[i+1])
{
 console.log("Test Case Failed as Sort is not Working as Expected")
 break;
 
}

} 
})

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