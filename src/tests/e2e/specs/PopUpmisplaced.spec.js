var testData = require('../inputs/testdata/Login.json');
var testData3 = require('../inputs/testData/XpathRepository.json');
var testData4 = require('../inputs/testData/prebillandpostbillcreation.json');
var testdata2 = require('../inputs/testdata/JsonFileCreation.json');
var testdata=require('../inputs/testdata/PaymentMethods.json');

describe('UI Baseline App', function() {


    //MVIEW-2692-Prior Balance & Charges: Hover events completely impede the use of the application
it('Validate in misc adjustments',function() {
    browser.get(testData.url.URL);
        browser.sleep(2000);
        expect(browser.getTitle()).toEqual(testData.url.Title);
        expect(browser.getCurrentUrl()).toMatch(testData.url.CurrentUrl);
   
        element(by.xpath(testData3.LoginPage.UserName)).sendKeys(testData4.userName);
        element(by.xpath(testData3.LoginPage.Password)).sendKeys(testData4.passwordField);
        browser.findElement(By.xpath(testData3.LoginPage.LogInButton)).click().then(function () {
      
          browser.sleep(12000);
        }, 1000);
        
        browser.driver.manage().window().maximize();
        browser.sleep(12000);
    browser.refresh();
    browser.sleep(10000);
    //move to bills page
    element(by.xpath(testData3.LayerSelector.Dropdown)).click();
    element(by.xpath(testData3.LayerSelector.Bills)).click();
    
    browser.sleep(3000);
    // move to misc adjustments and hover over it
    browser.actions().mouseMove(element(by.css(testData3.Charges.Prebill))).perform();
    browser.sleep(500); 
    expect(element(by.xpath(testData3.Charges.PrebillAdjustment_Popup_ViewAll)).isPresent()).toBe(true);
    //moving right after hovering
    var el = element(by.xpath(testData3.InvoicedTotalCharges.Widget));
    browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
    browser.sleep(2000);
   expect(element(by.css(testData3.Charges.Prebill)).isPresent()).toBe(true);

   browser.actions().mouseMove(element(by.css(testData3.Charges.Prebill))).perform();
    browser.sleep(500); 
    expect(element(by.xpath(testData3.Charges.PrebillAdjustment_Popup_ViewAll)).isPresent()).toBe(true);
    //moving top after hovering    
    var el = element(by.xpath(testData3.PriorBalance.Title));
    browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
    browser.sleep(2000);
   expect(element(by.css(testData3.Charges.Prebill)).isPresent()).toBe(true);
   browser.actions().mouseMove(element(by.css(testData3.Charges.Prebill))).perform();
    browser.sleep(500); 
    expect(element(by.xpath(testData3.Charges.PrebillAdjustment_Popup_ViewAll)).isPresent()).toBe(true);
    //moving bottom after hovering        
    var el = element(by.xpath(testData3.Subscriptions.Title));
    browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
    browser.sleep(2000);
    expect(element(by.css(testData3.Charges.Prebill)).isPresent()).toBe(true);

    browser.actions().mouseMove(element(by.css(testData3.Charges.Prebill))).perform();
    browser.sleep(500); 
   // expect(element(by.xpath(testData3.Charges.PrebillAdjustment_Popup_ViewAll)).isPresent()).toBe(true);
    //moving left after hovering
    browser.executeScript('window.scrollTo(0,0);')           
    
    browser.sleep(2000);
    expect(element(by.css(testData3.Charges.Prebill)).isPresent()).toBe(true);
  

    



});
 
 it('Validate "Add and Pay Now" scenario in Bills Layer Amount Due Widget using Credit Card.', function () {
     
     var testData5 = protractor.loginHelpers.lang;
     //Get Metraview 2.0 URL
     browser.get(testData1.url.URL);
     browser.sleep(5000);
 
     //Select the reqired Currency
     element(by.css(testData5)).click();
     browser.sleep(3000);
 
     //Login to MetraView as Corporate User
     //Enter username as userName2
     element(by.xpath(testData3.LoginPage.UserName)).sendKeys(testdata2.userName);
 
     //Enter password
     element(by.xpath(testData3.LoginPage.Password)).sendKeys(testdata2.passwordField);
 
     //Click on Login Button
     browser.findElement(By.xpath(testData3.LoginPage.LogInButton)).click();
     
       browser.sleep(12000);  

    //MetraView downarrow
    element(by.xpath(testData3.LayerSelector.Dropdown)).click();
    element(by.xpath(testData3.LayerSelector.Bills)).click();
    var today = new Date();
    var d = "0"+ today.getDate();
    var dd = d.toString().substr(-2);
    var yyyy = today.getFullYear();
    var m = today.getMonth()+1;
    var m2="0"+m;
    var mm= m2.toString().substr(-2);

    var endDate = mm+"/"+dd+"/"+yyyy;


    //For validating the Amount due value in the Amount Due Widget
    var due = element(by.xpath(testData3.MakeaPayment.AmountDue)).getText();
    browser.sleep(3000);
    //For getting the year in the Amount Due Widget
    //var year = element(by.xpath(testData3.Make_a_Payment.AmountDue_PaymentYearValue)).getText();
    //Validate Make a payment link
    expect(element(by.xpath(testData3.MakeaPayment.MakeaPaymentButton)).isDisplayed()).toBe(true);
    browser.sleep(3000);
    //click on Make a payment link
    element(by.xpath(testData3.MakeaPayment.MakeaPaymentButton)).click();
    browser.sleep(3000);
    //Validate Payusing label
    expect(element(by.xpath(testData3.MakeaPayment.PayUsing_TextField)).isDisplayed()).toBe(true);
    browser.sleep(3000);
    //validate cancel button
    expect(element(by.xpath(testData3.MakeaPayment.CancelButton)).isDisplayed()).toBe(true);
    browser.sleep(3000);

    expect(element(by.xpath(testData3.MakeaPayment.DateTimeFormat)).getAttribute("date-set")).toEqual(endDate);
     //click on cancel button
    element(by.xpath(testData3.MakeaPayment.CancelButton)).click();
    browser.sleep(3000);
    element(by.xpath(testData3.MakeaPayment.MakeaPaymentButton)).click();
    //Amount due value in make a payment pop up
    browser.sleep(3000);
    var due1 = element(by.xpath(testData3.MakeaPayment.MakeaPayment_AmountDue)).getText();
    //validate both amount due in Amount due widget and Make a Payment
    expect(due).toEqual(due1);
    //click on payusing dropdown value
    element(by.xpath(testData3.MakeaPayment.PayUsing_Dropdown)).click();
    browser.sleep(3000);
    var total=element(by.xpath(testData3.MakeaPayment.methods)).count;
    if(total==2){
//Select new payment method from the drop down
element.all(by.xpath(testData3.MakeaPayment.PayUsing_Dropdown_NewPaymentMethod)).then(function(items) {
  items[1].click();
});
}else{
      element(by.xpath(testData3.MakeaPayment.PaymentMethod_New)).click();
      
  }
    
    //Clear the pay this amount value textbox
    element(by.xpath(testData3.MakeaPayment.PaythisAmount_Value)).clear();
    browser.sleep(3000);
     //Enter the pay this amount value textbox
    element(by.xpath(testData3.MakeaPayment.PaythisAmount_Value)).sendKeys(testdata.payamount);
    //validate save for future checkbox is there
    element(by.xpath(testData3.MakeaPayment.SaveforFutureUse_CheckBox)).isPresent();
    //click on add and paynow button
    element(by.xpath(testData3.MakeaPayment.PayNow_Button)).click();
    browser.sleep(3000);
    //valiadate Review payment Date
    element(by.xpath(testData3.MakeaPayment.ReviewPayment)).isPresent();
    browser.sleep(3000);
    //click on add and paynow button
    element(by.xpath(testData3.MakeaPayment.PayNow_Button)).click();
    
    browser.actions().mouseMove(element(by.xpath(testData3.MakeaPayment.CyberSource_PopUp))).perform();
    browser.sleep(3000);

    element(by.xpath(testData3.MakeaPayment.CyberSource_Proceed)).click();
    browser.sleep(3000);
    browser.ignoreSynchronization = true;
    browser.waitForAngular();

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

    // browser.ignoreSynchronization = true;
    // browser.waitForAngular();
    browser.refresh();
    browser.sleep(7000);
});

it('payment history popup remains on the screen after cursor moved ',function(){ 
   
//MVIEW-2865 Payment history popup remains on the screen after cursor has been removed from it
//Input file to refer

var testData2 = protractor.loginHelpers.dashboard();

browser.refresh();
browser.sleep(10000);

element(by.xpath(testData3.LayerSelector.Dropdown)).click();
element(by.xpath(testData3.LayerSelector.Bills)).click();

browser.sleep(10000);
//Payments recieved popup perform
expect(element(by.xpath(testData3.Charges.PaymentReceived_Button)).isDisplayed()).toBe(true);
browser.actions().mouseMove(element(by.xpath(testData3.Payments.PaymentsRecievedPopUp))).perform();
browser.sleep(5000); 
expect(element(by.xpath(testData3.Payments.ViewAll)).isDisplayed()).toBe(true);
//moving right after hovering
var el = element(by.xpath(testData3.InvoicedTotalCharges.Widget));
browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());

expect(element(by.xpath(testData3.Charges.PaymentReceived_Button)).isDisplayed()).toBe(true);
browser.actions().mouseMove(element(by.xpath(testData3.Payments.PaymentsRecievedPopUp))).perform();
browser.sleep(5000); 
expect(element(by.xpath(testData3.Payments.ViewAll)).isDisplayed()).toBe(true);
//moving top after hovering    
var el = element(by.xpath(testData3.PriorBalance.Title));
browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
    
browser.sleep(3000);
expect(element(by.xpath(testData3.Charges.PaymentReceived_Button)).isDisplayed()).toBe(true);
browser.actions().mouseMove(element(by.xpath(testData3.Payments.PaymentsRecievedPopUp))).perform();
browser.sleep(3000); 
expect(element(by.xpath(testData3.Payments.ViewAll)).isDisplayed()).toBe(true);
//moving bottom after hovering        
var el = element(by.xpath(testData3.Subscriptions.Title));
browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
browser.sleep(3000);
expect(element(by.xpath(testData3.Charges.PaymentReceived_Button)).isDisplayed()).toBe(true);
browser.actions().mouseMove(element(by.xpath(testData3.Payments.PaymentsRecievedPopUp))).perform();
browser.sleep(5000); 
expect(element(by.xpath(testData3.Payments.ViewAll)).isDisplayed()).toBe(true);
 //moving left after hovering           
var el = element(by.xpath(testData3.AmountDue.AmountDue_Text));
browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
            
 browser.sleep(3000);
expect(element(by.xpath(testData3.Charges.PaymentReceived_Button)).isDisplayed()).toBe(true);                   

//// Log Out from Application
browser.findElement(by.xpath(testData3.SystemBar.Logout)).click();
browser.sleep(12000);

});


});