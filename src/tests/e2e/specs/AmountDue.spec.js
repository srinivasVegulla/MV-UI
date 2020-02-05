var testdata = require('../inputs/testdata/AmountDue.json');
var testdata1 = require('../inputs/testdata/XpathRepository.json');
var testdata3 = require('../inputs/testdata/XpathRepository.json');
var testdata=require('../inputs/testdata/PaymentMethods.json');
var testdata10=require('../inputs/testdata/JsonFileCreation.json');

describe('UI Baseline App', function () {
  it('Validate "Add and Pay Now" scenario in Bills Layer Amount Due Widget using Credit Card.', function () {
    //Input file to refer
 browser.refresh();
    browser.sleep(5000);
    var testdata5 = protractor.loginHelpers.lang;
//Load the URL
browser.get(testdata10.URL);
browser.sleep(3000);
element(by.css(testdata5)).click();
//Log in to MetraView with corporate account
element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata10.userName);
element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata10.passwordField);
browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
browser.sleep(10000);
   
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
    browser.sleep(3000);
    var due1 = element(by.xpath(testdata3.MakeaPayment.MakeaPayment_AmountDue)).getText();
    //validate both amount due in Amount due widget and Make a Payment
    expect(due).toEqual(due1);
    //click on payusing dropdown value
    element(by.xpath(testdata3.MakeaPayment.PayUsing_Dropdown)).click();
    browser.sleep(3000);
    var total=element(by.xpath(testdata3.MakeaPayment.methods)).count;
    if(total==2){
//Select new payment method from the drop down
element.all(by.xpath(testdata3.MakeaPayment.PayUsing_Dropdown_NewPaymentMethod)).then(function(items) {
  items[1].click();
});
}else{
      element(by.xpath(testdata3.MakeaPayment.PaymentMethod_New)).click();
      
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

    browser.sleep(3000);
  });

  it('Validate "Add and Pay Now" scenario in Bills Layer Amount Due Widget using ACH Card.', function () {
    //Input file to refer

    browser.refresh();
    browser.sleep(5000);

    element(by.xpath(testdata3.LayerSelector.Dropdown)).click();
    element(by.xpath(testdata3.LayerSelector.Bills)).click();

    var due = element(by.xpath(testdata3.MakeaPayment.AmountDue)).getText();
    
    browser.sleep(3000);
    expect(element(by.xpath(testdata3.MakeaPayment.MakeaPaymentButton)).isDisplayed()).toBe(true);
    browser.sleep(3000);
    element(by.xpath(testdata3.MakeaPayment.MakeaPaymentButton)).click();
    element(by.xpath(testdata3.MakeaPayment.PayUsing_Dropdown)).isPresent();
    browser.sleep(3000);
    element(by.xpath(testdata3.MakeaPayment.PayUsing_Dropdown)).click();

    var total=element(by.xpath(testdata3.MakeaPayment.methods)).count;
    if(total==2){
//Select new payment method from the drop down
element.all(by.xpath(testdata3.MakeaPayment.PayUsing_Dropdown_NewPaymentMethod)).then(function(items) {
  items[1].click();
});
}else{
      element(by.xpath(testdata3.MakeaPayment.PaymentMethod_New)).click();
      
  }
    element(by.xpath(testdata3.MakeaPayment.PaythisAmount_Value)).clear();

    element(by.xpath(testdata3.MakeaPayment.PaythisAmount_Value)).sendKeys(testdata.payamount);
    element(by.xpath(testdata3.MakeaPayment.SaveforFutureUse_CheckBox)).isPresent();
    browser.sleep(3000);
    element(by.xpath(testdata3.MakeaPayment.PayNow_Button)).click();

    element(by.xpath(testdata3.MakeaPayment.ReviewPayment)).isPresent();
    element(by.xpath(testdata3.MakeaPayment.PayNow_Button)).click();
    browser.sleep(3000);
    browser.actions().mouseMove(element(by.xpath(testdata3.MakeaPayment.CyberSource_PopUp))).perform();
    element(by.xpath(testdata3.MakeaPayment.CyberSource_Proceed)).click();
    browser.ignoreSynchronization = true;
    browser.waitForAngular();
    browser.sleep(2000);
    // if not redirecting to cybersource validation
    expect(element(by.xpath(testdata3.MakeaPayment.CyberSource_Text)).isDisplayed()).toBe(true);
    browser.sleep(3000);

    browser.actions().mouseMove(element(by.xpath(testdata3.PaymentMethods.CyberSource_Echeckoption))).perform();
    element(by.xpath(testdata3.PaymentMethods.CyberSource_Echeckoption_Button)).click();
    browser.sleep(1000);
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


    // routing number

    element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_RoutingNumber)).click();
    element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_RoutingNumber)).sendKeys(testdata.routingnum);
    element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_AccountNumber)).click();
    element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_AccountNumber)).sendKeys(testdata.accountnum);
    element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_Check_Number)).click();
    element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_Check_Number)).sendKeys(testdata.checknum);

    element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_Account_Type)).click();
    element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_Account_Type_Savings)).click();
    //CyberSource_PaymentDetails_Account_Type_Checking

    element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_DOB_Month)).click();
    element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_DOB_Month_Value)).click();
    element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_DOB_Day)).click();
    element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_DOB_DayValue)).click();
    element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_DOB_Year)).click();
    element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_DOB_Year_Value)).click();
    element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_Finish)).click();

    browser.ignoreSynchronization = true;
    browser.waitForAngular();

    browser.sleep(10000);
});

it('Validate Amountdue widget', function () {
  
  var testdata3 = protractor.loginHelpers.dashboard();
browser.refresh();
browser.sleep(5000);

var el = element(by.xpath(testdata1.AmountDue.AmountDue_Text));
//browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
expect(element(by.xpath(testdata1.AmountDue.AmountDue_Text)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata1.AmountDue.AmountDue_Text)).getText()).toEqual(testdata3.TEXT_TOTAL_AMOUNT_DUE);
expect(element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Button)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Button)).getText()).toEqual(testdata3.TEXT_MAKE_A_PAYMENT);

var paymentlink = expect(element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Button)).isDisplayed()).toBe(true);

browser.refresh();
browser.sleep(5000);
element(By.xpath(testdata1.MakeaPayment.MakeaPayment_Button)).click();
browser.sleep(2000);
var amountvalue = expect(element(by.xpath(testdata1.MakeaPayment.Method_Text)).isDisplayed()).toBe(true);

element(By.xpath(testdata1.MakeaPayment.PaythisAmount_Value)).clear();
browser.sleep(2000);
element(by.xpath(testdata1.MakeaPayment.PaymentMethod_Dropdown)).click();
browser.sleep(2000);
element(by.partialLinkText('Visa *1111')).click();
browser.sleep(2000);

element(by.xpath(testdata1.MakeaPayment.PaythisAmount_Value)).clear();

element(by.xpath(testdata1.MakeaPayment.PaythisAmount_Value)).sendKeys(testdata.RejectedAmount);
browser.sleep(2000);
var i=1;
element(by.xpath(testdata1.MakeaPayment.PayNow_Button)).click();
browser.sleep(2000);

element(by.xpath(testdata1.MakeaPayment.PayNow_Button)).click();
browser.sleep(2000);

element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Close)).click();

browser.refresh();
browser.sleep(2000);
element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Button)).click();
browser.sleep(2000);
element(by.xpath(testdata1.MakeaPayment.PaymentMethod_Dropdown)).click();
browser.sleep(2000);

element(by.partialLinkText('Visa *1111')).click();
browser.sleep(2000);
element(by.xpath(testdata1.MakeaPayment.PaythisAmount_Value)).clear();
browser.sleep(2000);
element(by.xpath(testdata1.MakeaPayment.PaythisAmount_Value)).sendKeys(testdata.SuccessAmount);
browser.sleep(2000);

element(by.xpath(testdata1.MakeaPayment.PayNow_Button)).click();
browser.sleep(2000);

element(by.xpath(testdata1.MakeaPayment.PayNow_Button)).click();
browser.sleep(2000);

element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Close)).click();

browser.refresh();
browser.sleep(2000);
element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Button)).click();
browser.sleep(2000);
element(by.xpath(testdata1.MakeaPayment.PaymentMethod_Dropdown)).click();
browser.sleep(2000);

element(by.partialLinkText('Visa *1111')).click();
browser.sleep(2000);
element(by.xpath(testdata1.MakeaPayment.PaythisAmount_Value)).clear();
browser.sleep(2000); 
    element(by.xpath(testdata1.MakeaPayment.PaythisAmount_Value)).sendKeys(testdata.PendingAmount);

      browser.sleep(2000);
      expect(element(by.xpath(testdata1.MakeaPayment.Calendar)).isDisplayed()).toBe(true);
      element(by.xpath(testdata1.MakeaPayment.Calendar)).click();
      browser.sleep(2000);
      // selection of date
      const currentDate = element(by.xpath(testdata1.MakeaPayment.Calender_FutureDate))
      currentDate.click();
      element(by.xpath(testdata1.MakeaPayment.AddandPayNow)).click();
      browser.sleep(2000);
      expect(element(by.xpath(testdata1.MakeaPayment.ReviewPaymentDetails_Text)).isDisplayed()).toBe(true);
      browser.sleep(2000);
      element(by.xpath(testdata1.MakeaPayment.PayNow_Button)).click();
      browser.sleep(2000);
      element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Close)).click();

browser.refresh();
browser.sleep(5000);

element(by.xpath(testdata1.LiveWidget.GoToBills_AmountDue)).click();
browser.sleep(5000);

element(by.xpath(testdata1.Billing.SelectIntervalDropdown)).click();
element(by.xpath(testdata1.Billing.SelectFirstInterval)).click();
browser.sleep(3000);

expect(element(by.xpath(testdata1.Payments.Popup)).isDisplayed()).toBe(true);
browser.actions().mouseMove(element(by.xpath(testdata1.Payments.Popup))).perform();
browser.sleep(1000);
//The user should be able to view the recently made transaction through ACH method under Pending transactions
expect(element(by.xpath(testdata1.Payments.AchCard)).isDisplayed()).toBe(true);

browser.sleep(3000);
//Validate pending transactions are visible in the pop up
expect(element(by.xpath(testdata1.Payments.PendingTransactions)).isDisplayed()).toBe(true);
element(by.xpath(testdata1.Payments.ViewAll)).click();
browser.sleep(2000);

browser.sleep(4000);
//There should be three check boxes available to filter the transactions accordingly as pending,failed and successful
expect(element(by.xpath(testdata1.Payments.Checkbox)).isPresent()).toBe(true);
expect(element(by.xpath(testdata1.Payments.Checkbox)).isPresent()).toBe(true);
expect(element(by.xpath(testdata1.Payments.Checkbox)).isPresent()).toBe(true);

element(by.xpath(testdata1.MySubscriptions.Style_Card)).click();
// The card view should be visible by default along with the tabular view option
expect(element(by.xpath(testdata1.MySubscriptions.Style_Card)).isDisplayed()).toBe(true);
//validate Tabular view option is there
expect(element(by.xpath(testdata1.MySubscriptions.Style_Table)).isDisplayed()).toBe(true);
//Click on Tabular View option
element(by.xpath(testdata1.MySubscriptions.Style_Table)).click();
browser.sleep(3000);
var values=element.all(by.xpath(testdata1.Payments.Status_Value)).getText();

expect(values).toContain(testdata.Pendingvalue);
expect(values).toContain(testdata.Rejectedvalue);

element.all(by.xpath(testdata1.Payments.Checkbox)).then(function(elm){
elm[0].click();
});
browser.sleep(3000);
var value=element.all(by.xpath(testdata1.Payments.Status_Value)).getText(); 
expect(value).toContain(testdata.Successvalue);

expect(element(by.xpath(testdata1.Payments.SuccessLabel)).getText()).toEqual(testdata3.TEXT_STATUS_SUCCESS);
expect(element(by.xpath(testdata1.Payments.PendingLabel)).getText()).toEqual(testdata3.TEXT_STATUS_PENDING);
expect(element(by.xpath(testdata1.Payments.RejectedLabel)).getText()).toEqual(testdata3.TEXT_STATUS_REJECTED);

element(by.xpath(testdata1.Adjustment.SelectByDropdown)).click();
//element(by.xpath(testdata1.Adjustment.SelectBy_Bill)).click();
browser.sleep(2000);
//element(by.xpath(testdata1.Adjustment.SelectInterval)).click();
//element(by.xpath(testdata1.Billing.SelectFirstInterval)).click();
element(by.xpath(testdata1.Adjustment.SortByDropdown)).click();
element(by.xpath(testdata1.Adjustment.SortByDropdownFirstValue)).click();
browser.sleep(2000);
//click on filter icon
element(by.xpath(testdata1.Adjustment.FilterIcon)).click();
browser.actions().mouseMove(element(by.xpath(testdata1.Payments.Filter_SelectBy))).perform();
browser.sleep(2000);

element.all(by.xpath(testdata1.Payments.Filter_Checkbox)).then(function(elm){
  elm[2].click();
  }); 
  browser.sleep(3000);
element.all(by.xpath(testdata1.Payments.Filter_Checkbox)).then(function(elm){
  elm[0].click();
  }); 


browser.sleep(3000);
element(by.xpath(testdata1.Adjustment.Filter_ApplyButton)).click();
browser.sleep(2000);
// All the pending transactions with the payment methods ACH and CC should be displayed BUT CC IS NOT THERE
expect(element(by.xpath(testdata1.Payments.PaymentType_ACH)).isDisplayed()).toBe(true);


//click on filter icon
element(by.xpath(testdata1.Adjustment.FilterIcon)).click();
browser.actions().mouseMove(element(by.xpath(testdata1.Payments.Filter_SelectBy))).perform();
browser.sleep(2000);

element.all(by.xpath(testdata1.Payments.Filter_Checkbox)).then(function(elm){
  elm[0].click();
  }); 
  browser.sleep(3000);
element.all(by.xpath(testdata1.Payments.Filter_Checkbox)).then(function(elm){
  elm[1].click();
  }); 
browser.sleep(3000);
element(by.xpath(testdata1.Adjustment.Filter_ApplyButton)).click();
browser.sleep(2000);

//All the successful transactions with the payment methods ACH and CC should be displayed
// expect(element(by.xpath("//div[contains(text(),'ACH')]")).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata1.Payments.PaymentType_ACH)).isDisplayed()).toBe(true);

//click on filter icon
element(by.xpath(testdata1.Adjustment.FilterIcon)).click();
browser.actions().mouseMove(element(by.xpath(testdata1.Payments.Filter_SelectBy))).perform();
browser.sleep(2000);


element.all(by.xpath(testdata1.Payments.Filter_Checkbox)).then(function(elm){
  elm[1].click();
  }); 
  browser.sleep(3000);
  element.all(by.xpath(testdata1.Payments.Filter_Checkbox)).then(function(elm){
  elm[2].click();
  }); 

browser.sleep(3000);
element(by.xpath(testdata1.Adjustment.Filter_ApplyButton)).click();
browser.sleep(5000);
expect(element(by.xpath(testdata1.Payments.PaymentType_ACH)).isDisplayed()).toBe(true);
browser.sleep(10000);
var rejected=element.all(by.xpath(testdata1.Payments.Status_Value)).getText();
expect(rejected).toContain(testdata.Rejectedvalue);
browser.sleep(2000);
element.all(by.xpath(testdata1.Payments.Checkbox)).then(function(elm){
elm[0].click();
elm[1].click();
}); 
browser.sleep(5000);

//validate tabular view is there
expect(element(by.xpath(testdata1.Payments.TabularViewModel)).isDisplayed()).toBe(true);

element(by.xpath(testdata1.Adjustment.SelectTabularView)).click();
browser.sleep(1000);

//There should be a settings option(Icon) in the tabular view of Payments History Overlay
expect(element(by.xpath(testdata1.Adjustment.Settings)).isDisplayed()).toBe(true);

//All the fields that are unchecked should not be visible
//click on settings icon
element(by.xpath(testdata1.Adjustment.Settings)).click();

element(by.xpath(testdata1.Payments.Settings_Status)).click();

element(by.xpath(testdata1.Payments.Settings_AccountNumber)).click();


element(by.xpath(testdata1.Payments.Settings_Apply)).click();

browser.sleep(2000);
expect(element(by.xpath(testdata1.Payments.Tablecolumns_Status)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata1.Payments.Tablecolumns_AccountNumber)).isDisplayed()).toBe(true);

//All the fields that are checked should be visible
//click on settings icon
element(by.xpath(testdata1.Adjustment.Settings)).click();

browser.sleep(2000);

//click on None Button
element(by.xpath(testdata1.Payments.Settings_None)).click();

element(by.xpath(testdata1.Payments.Settings_Status)).click();

element(by.xpath(testdata1.Payments.Settings_AccountNumber)).click();


element(by.xpath(testdata1.Payments.Settings_Apply)).click();
browser.sleep(2000);
expect(element(by.xpath(testdata1.Payments.Tablecolumns_Status)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata1.Payments.Tablecolumns_ModifiedAccountNumber)).isDisplayed()).toBe(true);

//Table settings overlay should be displayed with all the displayable fields for this charge details
// should be displayed in the order they are displayed in customer locale

//click on settings icon
element(by.xpath(testdata1.Adjustment.Settings)).click();

//click on All 
element(by.xpath(testdata1.Payments.Settings_All)).click();

element(by.xpath(testdata1.Payments.Settings_Apply)).click();

//click on settings icon
element(by.xpath(testdata1.Adjustment.Settings)).click();

var payment=element(by.xpath(testdata1.Payments.Settingscolumn_PaymentDate)).getText();

var statusvalue=element(by.xpath(testdata1.Payments.Settingscolumn_Status)).getText();

var accountnumber=element(by.xpath(testdata1.Payments.Settingscolumn_AccountNumber)).getText();

var currencyvalue=element(by.xpath(testdata1.Payments.Settingscolumn_Amount)).getText();

var amountvalue=element(by.xpath(testdata1.Payments.Settingscolumn_PaymentType)).getText();

element(by.xpath(testdata1.Payments.Settings_Cancel)).click();

var paymenttable = element(by.xpath(testdata1.Payments.Tablecolumns_PaymentDate)).getText();


expect(payment).toEqual(paymenttable );

var statustable=element(by.xpath(testdata1.Payments.Tablecolumns_Status)).getText();

expect(statusvalue).toEqual(statustable);

var accountnumbertable=element(by.xpath(testdata1.Payments.Tablecolumns_AccountNumber)).getText();

expect(accountnumber).toEqual(accountnumbertable);

var currencytablevalue=element(by.xpath(testdata1.Payments.Tablecolumns_Amount)).getText();
expect(currencyvalue).toEqual(currencytablevalue);

var amounttablevalue=element(by.xpath(testdata1.Payments.Tablecolumns_PaymentType)).getText();

expect(amountvalue).toEqual(amounttablevalue);
//click on settings icon
element(by.xpath(testdata1.Adjustment.Settings)).click();


//click on pin 
element(by.xpath(testdata1.Payments.Settings_Pin)).click();
element(by.xpath(testdata1.Payments.Settings_Pin)).click();

//validate the column is freezed after click on pin
expect(element(by.xpath(testdata1.Payments.Settings_PaymentDate)).isDisplayed()).toBe(false);

element(by.xpath(testdata1.Payments.Settings_Cancel)).click();

//click on settings icon
element(by.xpath(testdata1.Adjustment.Settings)).click();
//click on pin 
element(by.xpath(testdata1.Payments.Settings_Pin)).click();       

element(by.xpath(testdata1.Payments.Settings_PaymentDate)).click();
element(by.xpath(testdata1.Payments.Settingscolumn_PaymentMethod)).click();

browser.sleep(2000);
element(by.xpath(testdata1.Payments.Settings_Apply)).click();

//The overlay should close on clicking the close icon
element(by.xpath(testdata1.Payments.Payments_Close)).click();

browser.sleep(2000);
expect(browser.getTitle()).toEqual('ECB MetraView : Dashboard');

// Log Out from Application
browser.findElement(by.xpath(testdata1.SystemBar.Logout)).click();
browser.sleep(12000);
});
});





