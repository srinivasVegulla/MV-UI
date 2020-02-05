var testdata = require('../inputs/testdata/AmountDue.json');
var testdata1 = require('../inputs/testdata/XpathRepository.json');
var testdata7 = require('../inputs/testdata/PaymentMethods.json');
var testdata3= require('../inputs/testdata/prebillandpostbillcreation.json');

describe('UI Baseline App', function () {

it('Valdiate user is not able to select previous date and able to schedule payments for future date using CC ', function () {

browser.refresh();
browser.sleep(5000);
var jsondata= require('../inputs/testdata/JsonFileCreation.json');

browser.sleep(5000);
var testdata5 = protractor.loginHelpers.lang;
//Load the URL
browser.get(jsondata.URL);
browser.sleep(3000);
element(by.css(testdata5)).click();
//Log in to MetraView with corporate account
element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata3.userName);
element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata3.passwordField);
browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
browser.sleep(6000); 
browser.refresh();
browser.sleep(6000);   
expect(element(by.xpath(testdata1.PaymentMethods.Link)).isDisplayed()).toBe(true);
browser.sleep(3000);
element(by.xpath(testdata1.PaymentMethods.Link)).click();
browser.sleep(3000);
element(by.xpath(testdata1.PaymentMethods.Popup_Proceed)).click();
browser.sleep(3000);
browser.ignoreSynchronization = true;
browser.waitForAngular();

browser.sleep(1000);

element(by.xpath(testdata1.PaymentMethods.Cybersource_Text));
browser.actions().mouseMove(element(by.xpath(testdata1.PaymentMethods.CyberSource_Card))).perform();
element(by.xpath(testdata1.PaymentMethods.CyberSource_Visacard_Name)).click();

expect(element(by.xpath(testdata1.PaymentMethods.CyberSource_BillingInformationTitle)).getText()).toEqual('Billing Information');

element(by.xpath(testdata1.PaymentMethods.CyberSource_FirstName)).clear();
element(by.xpath(testdata1.PaymentMethods.CyberSource_FirstName)).sendKeys(testdata7.name);
element(by.xpath(testdata1.PaymentMethods.CyberSource_LastName)).clear();
element(by.xpath(testdata1.PaymentMethods.CyberSource_LastName)).sendKeys(testdata7.surname);
element(by.xpath(testdata1.PaymentMethods.CyberSource_Company)).clear();
element(by.xpath(testdata1.PaymentMethods.CyberSource_Company)).sendKeys(testdata7.companyname);
element(by.xpath(testdata1.PaymentMethods.CyberSource_AddressLine1)).clear();
element(by.xpath(testdata1.PaymentMethods.CyberSource_AddressLine1)).sendKeys(testdata7.address1);
element(by.xpath(testdata1.PaymentMethods.CyberSource_AddressLine2)).clear();
element(by.xpath(testdata1.PaymentMethods.CyberSource_AddressLine2)).sendKeys(testdata7.address2);
element(by.xpath(testdata1.PaymentMethods.CyberSource_City)).clear();
element(by.xpath(testdata1.PaymentMethods.CyberSource_City)).sendKeys(testdata7.city);
element(by.xpath(testdata1.PaymentMethods.CyberSource_Country)).click();
element(by.xpath(testdata1.PaymentMethods.CyberSource_Countryvalue)).click();
element(by.xpath(testdata1.PaymentMethods.CyberSource_State)).clear();
element(by.xpath(testdata1.PaymentMethods.CyberSource_State)).sendKeys(testdata7.state);
element(by.xpath(testdata1.PaymentMethods.CyberSource_PostalCode)).clear();
element(by.xpath(testdata1.PaymentMethods.CyberSource_PostalCode)).sendKeys(testdata7.postalcode);
element(by.xpath(testdata1.PaymentMethods.CyberSource_Phone)).clear();
element(by.xpath(testdata1.PaymentMethods.CyberSource_Phone)).sendKeys(testdata7.phno);
element(by.xpath(testdata1.PaymentMethods.CyberSource_Email)).clear();
element(by.xpath(testdata1.PaymentMethods.CyberSource_Email)).sendKeys(testdata7.email);

//card no

var widget = element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_Text));
browser.executeScript('arguments[0].scrollIntoView()', widget.getWebElement());
browser.sleep(1000);

element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_CardNumber)).click();
element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_CardNumber)).sendKeys(testdata7.cardno);

element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_CVNLabel)).isPresent();
element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_CVNValue)).isPresent();
element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_CVNValue)).click();

element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_CVNValue)).sendKeys(testdata7.cvnno);

// expiration date edit
element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_ExpirationMonth)).click();
element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_ExpirationMonthValue)).click();

element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_ExpirationYear)).click();
element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_ExpirationYearValue)).click();
element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_Finish)).click();


browser.ignoreSynchronization = true;
browser.waitForAngular();

browser.sleep(5000);


});

it('Validate "Add and Pay Now" scenario in Bills Layer Amount Due Widget using ACH Card.', function () {
browser.refresh();
browser.sleep(5000);
expect(element(by.xpath(testdata1.PaymentMethods.Link)).isDisplayed()).toBe(true);
browser.sleep(3000);
element(by.xpath(testdata1.PaymentMethods.Link)).click();
browser.sleep(3000);
element(by.xpath(testdata1.PaymentMethods.Popup_Proceed)).click();
browser.sleep(3000);
browser.ignoreSynchronization = true;
browser.waitForAngular();

browser.sleep(1000);    

// if not redirecting to cybersource validation
expect(element(by.xpath(testdata1.MakeaPayment.CyberSource_Text)).isDisplayed()).toBe(true);
browser.sleep(3000);

browser.actions().mouseMove(element(by.xpath(testdata1.PaymentMethods.CyberSource_Echeckoption))).perform();

element(by.xpath(testdata1.PaymentMethods.CyberSource_Echeckoption_Button)).click();
browser.sleep(1000);
expect(element(by.xpath(testdata1.PaymentMethods.CyberSource_BillingInformationTitle)).getText()).toEqual('Billing Information');

element(by.xpath(testdata1.PaymentMethods.CyberSource_FirstName)).clear();
element(by.xpath(testdata1.PaymentMethods.CyberSource_FirstName)).sendKeys(testdata7.name);
element(by.xpath(testdata1.PaymentMethods.CyberSource_LastName)).clear();
element(by.xpath(testdata1.PaymentMethods.CyberSource_LastName)).sendKeys(testdata7.surname);
element(by.xpath(testdata1.PaymentMethods.CyberSource_Company)).clear();
element(by.xpath(testdata1.PaymentMethods.CyberSource_Company)).sendKeys(testdata7.companyname);
element(by.xpath(testdata1.PaymentMethods.CyberSource_AddressLine1)).clear();
element(by.xpath(testdata1.PaymentMethods.CyberSource_AddressLine1)).sendKeys(testdata7.address1);
element(by.xpath(testdata1.PaymentMethods.CyberSource_AddressLine2)).clear();
element(by.xpath(testdata1.PaymentMethods.CyberSource_AddressLine2)).sendKeys(testdata7.address2);
element(by.xpath(testdata1.PaymentMethods.CyberSource_City)).clear();
element(by.xpath(testdata1.PaymentMethods.CyberSource_City)).sendKeys(testdata7.city);
element(by.xpath(testdata1.PaymentMethods.CyberSource_Country)).click();
element(by.xpath(testdata1.PaymentMethods.CyberSource_Countryvalue)).click();
element(by.xpath(testdata1.PaymentMethods.CyberSource_State)).clear();
element(by.xpath(testdata1.PaymentMethods.CyberSource_State)).sendKeys(testdata7.state);
element(by.xpath(testdata1.PaymentMethods.CyberSource_PostalCode)).clear();
element(by.xpath(testdata1.PaymentMethods.CyberSource_PostalCode)).sendKeys(testdata7.postalcode);
element(by.xpath(testdata1.PaymentMethods.CyberSource_Phone)).clear();
element(by.xpath(testdata1.PaymentMethods.CyberSource_Phone)).sendKeys(testdata7.phno);
element(by.xpath(testdata1.PaymentMethods.CyberSource_Email)).clear();
element(by.xpath(testdata1.PaymentMethods.CyberSource_Email)).sendKeys(testdata7.email);


// routing number

element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_RoutingNumber)).click();
element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_RoutingNumber)).sendKeys(testdata7.routingnum);
element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_AccountNumber)).click();
element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_AccountNumber)).sendKeys(testdata7.accountnum);
element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_Check_Number)).click();
element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_Check_Number)).sendKeys(testdata7.checknum);

element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_Account_Type)).click();
element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_Account_Type_Checking)).click();
//CyberSource_PaymentDetails_Account_Type_Checking

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



});

it('Validate Amountdue widget', function () {

// var testdata2 = protractor.loginHelpers.common();
var testdata3 = protractor.loginHelpers.dashboard();

browser.refresh();

browser.sleep(5000);

const ele1 = element(by.xpath(testdata1.MakeaPayment.AmountDue));

ele1.getText().then(function change(text){

str = text;

// pay now 
expect(element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Button)).isDisplayed()).toBe(true);
element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Button)).click();

element(by.xpath(testdata1.MakeaPayment.PaymentMethod_Dropdown)).click();
browser.sleep(2000);
var cardsno =  element.all(by.xpath(testdata1.MakeaPayment.TotalCards_Count)).count();

var visa=element(by.partialLinkText('Visa'));

element(by.partialLinkText('Checking')).click();

element(by.xpath(testdata1.MakeaPayment.PaythisAmount_Value)).clear();

element(by.xpath(testdata1.MakeaPayment.PaythisAmount_Value)).sendKeys(testdata.RejectedAmount);
browser.sleep(2000);
var i=1;
element(by.xpath(testdata1.MakeaPayment.PayNow_Button)).click();
browser.sleep(2000);

element(by.xpath(testdata1.MakeaPayment.Authorize_Checkbox)).click();

element(by.xpath(testdata1.MakeaPayment.PayNow_Button)).click();
browser.sleep(2000);

element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Close)).click();

browser.refresh();
browser.sleep(5000);
expect(element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Button)).isDisplayed()).toBe(true);
element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Button)).click();
browser.sleep(2000);
element(by.xpath(testdata1.MakeaPayment.PaymentMethod_Dropdown)).click();
browser.sleep(2000);
var cardsno =  element.all(by.xpath(testdata1.MakeaPayment.TotalCards_Count)).count();

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
browser.sleep(5000);
element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Button)).click();
browser.sleep(2000);
element(by.xpath(testdata1.MakeaPayment.PaymentMethod_Dropdown)).click();
browser.sleep(2000);
var cardsno =  element.all(by.xpath(testdata1.MakeaPayment.TotalCards_Count)).count();

element(by.partialLinkText('Visa *1111')).click();
browser.sleep(2000);
element(by.xpath(testdata1.MakeaPayment.PaythisAmount_Value)).clear();
browser.sleep(2000);
element(by.xpath(testdata1.MakeaPayment.PaythisAmount_Value)).sendKeys(testdata.SuccessAmount);
browser.sleep(2000);
var i=1;
element(by.xpath(testdata1.MakeaPayment.PayNow_Button)).click();

//MetraView_Folder/ MVIEW_S00NEXT_TestCases/ MVIEW-2571_001_MainCase
expect(element(by.xpath(testdata1.MakeaPayment.PayNow_Button)).isDisplayed()).toBe(true);
browser.sleep(2000);

element(by.xpath(testdata1.MakeaPayment.PayNow_Button)).click();
browser.sleep(2000);

element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Close)).click();

browser.refresh();
browser.sleep(5000);
element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Button)).click();
browser.sleep(2000);
element(by.xpath(testdata1.MakeaPayment.PaymentMethod_Dropdown)).click();
browser.sleep(2000);
var cardsno =  element.all(by.xpath(testdata1.MakeaPayment.TotalCards_Count)).count();

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

element(by.xpath(testdata1.Adjustment.SelectInterval)).click();
element(by.xpath(testdata1.Billing.SelectFirstInterval)).click();
browser.sleep(3000);
expect(element(by.xpath(testdata1.Payments.Popup)).isDisplayed()).toBe(true);
browser.actions().mouseMove(element(by.xpath(testdata1.Payments.Popup))).perform();
browser.sleep(1000);

browser.sleep(3000);
//Validate pending transactions are visible in the pop up
//expect(element(by.xpath(testdata1.Payments.PendingTransactions)).isDisplayed()).toBe(true);
var viewall = element(By.xpath(testdata1.Payments.ViewAll)).click();
browser.sleep(2000);

//The user should be able to view the recently made transaction through ACH method under Pending transactions
expect(element(by.xpath(testdata1.Payments.AchCard)).isDisplayed()).toBe(true);

element(by.xpath(testdata1.Adjustment.SelectInterval)).click();
element(by.xpath(testdata1.Billing.SelectFirstInterval)).click();
browser.sleep(3000);

element.all(by.xpath(testdata1.Payments.Checkbox)).then(function(elm){
elm[1].click();
}); 
//The user should be able to view the recently made transaction through ACH method under failed transactions
var value=element.all(by.xpath(testdata1.Payments.StatusValue)).getText();
expect(value).toContain(testdata.Rejectedvalue);

var cardachvalue=element.all(by.xpath(testdata1.Payments.PaymentTypeValue)).getText();
browser.sleep(2000);
expect(cardachvalue).toContain("ACH");

//Verify if only failed transactions are visible on applying failed transactions filter
//click on filter icon
element(by.xpath(testdata1.Adjustment.FilterIcon)).click();

browser.actions().mouseMove(element(by.xpath(testdata1.Payments.Filter_SelectBy))).perform();
browser.sleep(2000);

element.all(by.xpath(testdata1.Payments.Filter_Checkbox)).then(function(elm){
elm[1].click();
}); 

browser.sleep(2000);
//click on apply button
element(by.xpath(testdata1.Adjustment.Filter_ApplyButton)).click();
browser.sleep(2000);

browser.sleep(2000);
//click on filter icon
//Verify if both pending and the failed transactions are visible when both pending and failed filters are applied
element(by.xpath(testdata1.Adjustment.FilterIcon)).click();
browser.actions().mouseMove(element(by.xpath(testdata1.Payments.Filter_SelectBy))).perform();
browser.sleep(2000);

element.all(by.xpath(testdata1.Payments.Filter_Checkbox)).then(function(elm){
elm[1].click();
}); 
browser.sleep(2000);

element.all(by.xpath(testdata1.Payments.Filter_Checkbox)).then(function(elm){
elm[0].click();
}); 
browser.sleep(2000);
//click on apply button
element(by.xpath(testdata1.Adjustment.Filter_ApplyButton)).click();
browser.sleep(10000);
//All the pending and the failed transactions with the payment methods ACH and CC should be displayed
var cardach=element.all(by.xpath(testdata1.Payments.PaymentTypeValue)).getText();
browser.sleep(2000);
expect(cardach).toContain("ACH");
var visaname=element.all(by.xpath(testdata1.Payments.PaymentTypeValue)).getText();
browser.sleep(3000);
expect(visaname).toContain(testdata3.TEXT_CREDIT_CARD);
var pending=element.all(by.xpath(testdata1.Payments.StatusValue)).getText();
browser.sleep(2000);
expect(pending).toContain(testdata.Successvalue);
var rejectedvalues=element.all(by.xpath(testdata1.Payments.StatusValue)).getText();
browser.sleep(2000);
expect(rejectedvalues).toContain(testdata.Rejectedvalue);

browser.sleep(2000);

//click on filter icon
//Verify if both pending and the failed transactions are visible when both pending and failed filters are applied
element(by.xpath(testdata1.Adjustment.FilterIcon)).click();
browser.actions().mouseMove(element(by.xpath(testdata1.Payments.Filter_SelectBy))).perform();
browser.sleep(2000);


element.all(by.xpath(testdata1.Payments.Filter_Checkbox)).then(function(elm){
elm[0].click();
}); 

browser.sleep(2000);
//click on apply button
element(by.xpath(testdata1.Adjustment.Filter_ApplyButton)).click();
browser.sleep(10000);
expect(cardach).toContain("ACH");

expect(visaname).toContain(testdata3.TEXT_CREDIT_CARD);

browser.refresh();

browser.sleep(3000);

element(by.xpath(testdata1.LayerSelector.Dropdown)).click();
element(by.xpath(testdata1.LayerSelector.Bills)).click();

browser.sleep(5000);
browser.actions().mouseMove(element(by.xpath(testdata1.Payments.PaymentsRecievedPopUp))).perform();
browser.sleep(2000);

expect(element(by.xpath(testdata1.Payments.PaymentsRecievedPopUp)).isDisplayed()).toBe(true);

browser.refresh();

})
})
it('Validate "Amount Due" widget with negative values or zero and verify buttons disabled', function () {

//Test Case: MVIEW_S00NEXT_TestCases/ MVIEW-2449_001_MainCase
//Input file to refer
// var testdata4 = protractor.loginHelpers.dashboard();
// var testdata5 = protractor.loginHelpers.lang;
browser.refresh();
browser.sleep(5000); 
expect(element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Button)).isDisplayed()).toBe(true);
browser.sleep(3000);
element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Button)).click();
element(by.xpath(testdata1.MakeaPayment.PaythisAmount_Value)).clear();
element(by.xpath(testdata1.MakeaPayment.PaythisAmount_Value)).sendKeys(0);
browser.sleep(3000);

//Validate PayNow button is disabled
var payNowButton=element(by.xpath(testdata1.MakeaPayment.AddandPayNow));
expect(payNowButton.isEnabled()).toBe(false);

// var attr = element(by.css('.primary')).getAttribute('disabled');
//   expect(attr).toEqual("disabled");

browser.sleep(3000);
//Pay this Amount field with negative value
element(by.xpath(testdata1.MakeaPayment.PaythisAmount_Value)).clear();
element(by.xpath(testdata1.MakeaPayment.PaythisAmount_Value)).sendKeys(-1);
browser.sleep(3000); 
var payNowButtonDisable=element(by.xpath(testdata1.MakeaPayment.AddandPayNow));
expect(payNowButtonDisable.isEnabled()).toBe(false);

browser.sleep(3000);
element(by.xpath(testdata1.MakeaPayment.PaythisAmount_Value)).clear();
element(by.xpath(testdata1.MakeaPayment.PaythisAmount_Value)).sendKeys(0);

//click on payusing dropdown value
element(by.xpath(testdata1.MakeaPayment.PayUsing_Dropdown)).click();
browser.sleep(3000);
//Select new payment method from the drop down
element.all(by.xpath(testdata1.MakeaPayment.PayUsing_Dropdown_NewPaymentMethod)).then(function(items) {
items[0].click();
});
browser.sleep(3000);

//Validate that Add and Pay Now button is disabled
var addAndPayNowButtonDisable=element(by.xpath(testdata1.MakeaPayment.AddandPayNow));
expect(addAndPayNowButtonDisable.isEnabled()).toBe(false);

browser.sleep(3000);

//Validate the Schedule Now Button is disabled
element(by.xpath(testdata1.MakeaPayment.PaythisAmount_Value)).clear();
element(by.xpath(testdata1.MakeaPayment.PaythisAmount_Value)).sendKeys(-1);

//Click on date Calender and select the future date from date picker
expect(element(by.xpath(testdata1.MakeaPayment.Calendar)).isDisplayed()).toBe(true);
element(by.xpath(testdata1.MakeaPayment.Calendar)).click();
browser.sleep(2000);
// selection of future date
const date = element(by.xpath(testdata1.MakeaPayment.Calender_FutureDate));
date.click();
browser.sleep(2000);

//Validate the Schedule Now Button is disabled
var scheduleNowButtonDisable=element(by.xpath(testdata1.MakeaPayment.AddandPayNow));
expect(scheduleNowButtonDisable.isEnabled()).toBe(false);

browser.sleep(2000);
//Validate Add and Schedule Now button is disabled
element(by.xpath(testdata1.MakeaPayment.PaythisAmount_Value)).clear();
element(by.xpath(testdata1.MakeaPayment.PaythisAmount_Value)).sendKeys(0);
browser.sleep(2000);

//click on payusing dropdown value
element(by.xpath(testdata1.MakeaPayment.PayUsing_Dropdown)).click();
browser.sleep(3000);
//Select new payment method from the drop down
element.all(by.xpath(testdata1.MakeaPayment.PayUsing_Dropdown_NewPaymentMethod)).then(function(items) {
items[0].click();
});
browser.sleep(3000);
//Click on date Calender and select the future date from date picker
expect(element(by.xpath(testdata1.MakeaPayment.Calendar)).isDisplayed()).toBe(true);
element(by.xpath(testdata1.MakeaPayment.Calendar)).click();
browser.sleep(2000);
// selection of future date
const futureDate = element(by.xpath(testdata1.MakeaPayment.Calender_FutureDate));
futureDate.click();
browser.sleep(2000);
//Validate Add and schedule Now button is disabled in Amount due widget
var addAndScheduleNowButtonDisable=element(by.xpath(testdata1.MakeaPayment.AddandPayNow));
expect(addAndScheduleNowButtonDisable.isEnabled()).toBe(false);

});

it('Validate Scheduled payments are displayed as pending when Pay this amount field with positive value', function () {

//Test Case: MVIEW_S00NEXT_TestCases/ MVIEW-2449_001_MainCase
//Input file to refer
// var testdata4 = protractor.loginHelpers.dashboard();
// var testdata5 = protractor.loginHelpers.lang;
browser.refresh();
browser.sleep(5000); 
expect(element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Button)).isDisplayed()).toBe(true);
browser.sleep(3000);
element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Button)).click();
element(by.xpath(testdata1.MakeaPayment.PaythisAmount_Value)).clear();
element(by.xpath(testdata1.MakeaPayment.PaythisAmount_Value)).sendKeys(testdata.SchedulePaymentPending);
browser.sleep(3000);

//Click on date Calender and select the future date from date picker
expect(element(by.xpath(testdata1.MakeaPayment.Calendar)).isDisplayed()).toBe(true);
element(by.xpath(testdata1.MakeaPayment.Calendar)).click();
browser.sleep(2000);
// selection of future date
const futureDate = element(by.xpath(testdata1.MakeaPayment.Calender_FutureDate));
futureDate.click();
browser.sleep(2000);
//Click on Schedule Now button
element(by.xpath(testdata1.MakeaPayment.AddandPayNow)).click();
browser.sleep(2000);

expect(element(by.xpath(testdata1.MakeaPayment.YourPaymenthasbeenProcessed_Text)).isDisplayed()).toBe(true);
element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Close)).click();
//Click on Bills layer from the dropdown
element(by.xpath(testdata1.LayerSelector.Dropdown)).click();
element(by.xpath(testdata1.LayerSelector.Bills)).click();

//Mouse Over on the Payment Received link and click on View All link
expect(element(by.xpath(testdata1.Charges.PaymentReceived_Button)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata1.Charges.PaymentReceived_Button)).getText()).toEqual(testData.TEXT_PAYMENTS_RECEIVED);
browser.actions().mouseMove(element(by.xpath(testdata1.Charges.PaymentReceived_Button))).perform();
browser.sleep(1000);

//View all is displayed and click on View all
expect(element(by.xpath(testdata1.Charges.Popup_ViewAll)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata1.Charges.Popup_ViewAll)).getText()).toContain(testData.TEXT_VIEW_ALL);
element(by.xpath(testdata1.Charges.Popup_ViewAll)).click();

//Check only Pending check box
element.all(by.xpath(testdata1.Payments.Checkbox)).then(function(elm){
elm[0].click();
browser.sleep(1000);
elm[1].click(); 
browser.sleep(2000);
}); 

element.all(by.xpath(testdata1.AmountDue.PendingScheduled_Payment)).then(function(items){
expect(items[0].getText()).toContain("6");
browser.sleep(3000);
});

});

it('Validate Amountdue widget', function () {

var testdata8 = protractor.loginHelpers.dashboard();
browser.refresh();
browser.sleep(4000);
var el = element(by.xpath(testdata1.AmountDue.AmountDue_Text));
//browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
expect(element(by.xpath(testdata1.AmountDue.AmountDue_Text)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata1.AmountDue.AmountDue_Text)).getText()).toEqual(testdata8.TEXT_TOTAL_AMOUNT_DUE);

var paymentdue = expect(element(by.xpath(testdata1.AmountDue.PaymentDue)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata1.AmountDue.PaymentDue_Label)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata1.AmountDue.PaymentDue_Date)).getText()).toEqual(testdata.date);
expect(element(by.xpath(testdata1.AmountDue.PaymentDue_Year)).getText()).toEqual(testdata.year);
expect(element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Button)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Button)).getText()).toEqual(testdata8.TEXT_MAKE_A_PAYMENT);


element(by.xpath(testdata1.LiveWidget.GoToBills_AmountDue)).click();
browser.sleep(3000);
element(by.xpath(testdata1.Adjustment.SelectInterval)).click();
browser.sleep(3000);
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

//element(by.xpath(testdata1.Payments.PaymentType_ACH)).isPresent();
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
browser.sleep(2000);

element.all(by.xpath(testdata1.Payments.Checkbox)).then(function(elm){
elm[0].click();
}); 

expect(element(by.xpath(testdata1.Payments.SuccessLabel)).getText()).toEqual(testdata8.TEXT_STATUS_SUCCESS);
expect(element(by.xpath(testdata1.Payments.PendingLabel)).getText()).toEqual(testdata8.TEXT_STATUS_PENDING);
expect(element(by.xpath(testdata1.Payments.RejectedLabel)).getText()).toEqual(testdata8.TEXT_STATUS_REJECTED);

element(by.xpath(testdata1.Adjustment.SelectByDropdown)).click();
element(by.xpath(testdata1.Adjustment.SelectBy_Bill)).click();
browser.sleep(2000);
element(by.xpath(testdata1.Adjustment.SelectInterval)).click();
element(by.xpath(testdata1.Billing.SelectFirstInterval)).click();
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
element.all(by.xpath(testdata1.Payments.Filter_Checkbox)).then(function(elm){
elm[0].click();
}); 


browser.sleep(2000);
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
element.all(by.xpath(testdata1.Payments.Filter_Checkbox)).then(function(elm){
elm[1].click();
}); 
browser.sleep(2000);
element(by.xpath(testdata1.Adjustment.Filter_ApplyButton)).click();
browser.sleep(2000);

//All the successful transactions with the payment methods ACH and CC should be displayed

expect(element(by.xpath(testdata1.Payments.PaymentType_ACH)).isDisplayed()).toBe(true);

//click on filter icon
element(by.xpath(testdata1.Adjustment.FilterIcon)).click();
browser.actions().mouseMove(element(by.xpath(testdata1.Payments.Filter_SelectBy))).perform();
browser.sleep(2000);


element.all(by.xpath(testdata1.Payments.Filter_Checkbox)).then(function(elm){
elm[1].click();
});
element.all(by.xpath(testdata1.Payments.Filter_Checkbox)).then(function(elm){
elm[2].click();
}); 

browser.sleep(2000);
element(by.xpath(testdata1.Adjustment.Filter_ApplyButton)).click();
browser.sleep(5000);
expect(element(by.xpath(testdata1.Payments.PaymentType_ACH)).isDisplayed()).toBe(true);
browser.sleep(10000);
var rejected=element.all(by.xpath(testdata1.Payments.Status_Value)).getText();
expect(rejected).toContain(testdata.Rejectedvalue);
browser.sleep(2000);
var success=element.all(by.xpath(testdata1.Payments.Status_Value)).getText();
expect(success).toContain(testdata.Successvalue);
var pendingvalue=element.all(by.xpath(testdata1.Payments.Status_Value)).getText();
expect(pendingvalue).toContain(testdata.Pendingvalue);

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

var paymenttable = element(by.xpath(testdata1.Payments.Tablecolumns_PaymentDate)).getText();


expect(payment).toEqual(paymenttable );

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
//element(by.xpath(testdata1.Payments.Settingscolumn_PaymentMethod)).click();

browser.sleep(2000);
element(by.xpath(testdata1.Payments.Settings_Apply)).click();

//The overlay should close on clicking the close icon
element(by.xpath(testdata1.Payments.Payments_Close)).click();

expect(browser.getTitle()).toEqual('ECB MetraView : Dashboard');
});

//0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10610/ 001_VerifyPayment_search_functionality_should_work
it('Validate payments filter functionality', function (){

//Refresh Browser
browser.refresh();
browser.sleep(4000);

//Click on Go to bills Button
element(by.xpath(testdata1.LiveWidget.GoToBills_AmountDue)).click();
browser.sleep(3000);

//Click on Interval dropdown
//element(by.xpath(testdata1.Adjustment.SelectInterval)).click();
browser.sleep(3000);

//Select the interval from the dropdown
//selement(by.xpath(testdata1.Billing.SelectFirstInterval)).click();
browser.sleep(3000);

//Pending and Rejected pop up validation
expect(element(by.xpath(testdata1.Payments.Popup)).isDisplayed()).toBe(true);
//mouse hover on the Pending and Rejected pop
browser.actions().mouseMove(element(by.xpath(testdata1.Payments.Popup))).perform();
browser.sleep(1000);

//Click on View all button in the pop up
element(by.xpath(testdata1.Payments.ViewAll)).click();
browser.sleep(4000);

//Click on the Bills dropdown
element(by.xpath(testdata1.Adjustment.SelectByDropdown)).click();

//Select the Bills
element(by.xpath(testdata1.Adjustment.SelectBy_Bill)).click();
browser.sleep(2000);

//Click on interval
element(by.xpath(testdata1.Adjustment.SelectInterval)).click();

//Select the interval
element(by.xpath(testdata1.Billing.SelectFirstInterval)).click();

//Click on sort dropdown
element(by.xpath(testdata1.Adjustment.SortByDropdown)).click();

//Select the first value from the dropdown
element(by.xpath(testdata1.Adjustment.SortByDropdownFirstValue)).click();
browser.sleep(2000);

//click on filter icon
element(by.xpath(testdata1.Adjustment.FilterIcon)).click();

//Check for the filter popup
browser.actions().mouseMove(element(by.xpath(testdata1.Payments.Filter_SelectBy))).perform();
browser.sleep(2000);

//Deselect the pending checkbox
element.all(by.xpath(testdata1.Payments.Filter_Checkbox)).then(function(elm){
elm[1].click();
browser.sleep(1000);
//Deselect the Rejected checkbox
elm[2].click();
browser.sleep(1000);
//Select the success check box
elm[0].click();
browser.sleep(2000);

});

//Click on apply button
element(by.xpath(testdata1.Adjustment.Filter_ApplyButton)).click();
browser.sleep(2000);

//Validate success value is present according to the filter applied
var success=element(by.xpath(testdata1.Payments.Status_Value)).getText();
expect(success).toContain(testdata.Successvalue);
browser.sleep(2000);

//click on filter icon
element(by.xpath(testdata1.Adjustment.FilterIcon)).click();

//Check for the filter popup
browser.actions().mouseMove(element(by.xpath(testdata1.Payments.Filter_SelectBy))).perform();
browser.sleep(2000);

//Deselect the success checkbox
element.all(by.xpath(testdata1.Payments.Filter_Checkbox)).then(function(elm){
elm[0].click();
browser.sleep(1000);
//Select the Pending Check box
elm[1].click();
browser.sleep(2000);
}); 

//Clcik on Apply button
element(by.xpath(testdata1.Adjustment.Filter_ApplyButton)).click();
browser.sleep(2000);

//Validate pending value is present according to the filter applied
var pendingvalue=element.all(by.xpath(testdata1.Payments.Status_Value)).getText();
expect(pendingvalue).toContain(testdata.Pendingvalue);
browser.sleep(2000);

//click on filter icon
element(by.xpath(testdata1.Adjustment.FilterIcon)).click();

//Check for the filter popup
browser.actions().mouseMove(element(by.xpath(testdata1.Payments.Filter_SelectBy))).perform();
browser.sleep(2000);

//Deselect the pending checkbox
element.all(by.xpath(testdata1.Payments.Filter_Checkbox)).then(function(elm){
elm[1].click();
browser.sleep(1000);
//Select the Rejected checkbox
elm[2].click();
browser.sleep(2000);
}); 

//Clcik on Apply button
element(by.xpath(testdata1.Adjustment.Filter_ApplyButton)).click();
browser.sleep(2000);

//Validate Rejected value is present according to the filter applied
var rejected=element.all(by.xpath(testdata1.Payments.Status_Value)).getText();
expect(rejected).toContain(testdata.Rejectedvalue);
browser.sleep(2000);

// Log Out from Application
browser.findElement(by.xpath(testdata1.SystemBar.Logout)).click();
browser.sleep(12000);
})
});