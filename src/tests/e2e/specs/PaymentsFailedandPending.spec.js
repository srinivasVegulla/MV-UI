var testdata = require('../inputs/testdata/AmountDue.json');
var testdata1 = require('../inputs/testdata/XpathRepository.json');
var testdata3= require('../inputs/testdata/prebillandpostbillcreation.json');
var testdata7 = require('../inputs/testdata/PaymentMethods.json');
var testdata9 = require('../inputs/testdata/JsonFileCreation.json');

describe('Failed and Pending Payments Test cases ', function () {
    
//0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10588/ 001_Failed_and_pending_to_be_displayed_at_widget
//0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10588/ Reg_002_FailedPendingTransactionsWithACH
//0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10620/ 001_payment_method_should_be_added_succesfully

it('Adding Credit  card ( Visa ) payment Method ', function () {

browser.refresh();
browser.sleep(5000);
var testdata5 = protractor.loginHelpers.lang;
//Load the URL
browser.get(testdata9.URL);
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

it('Making Failed and Pending payments with Credit  card ( Visa ) ', function () {  

browser.refresh();
browser.sleep(5000);

expect(element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Button)).isDisplayed()).toBe(true);
element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Button)).click();

element(by.xpath(testdata1.MakeaPayment.PaymentMethod_Dropdown)).click();
browser.sleep(2000);
element.all(by.xpath(testdata1.MakeaPayment.TotalCards_Count)).count();

//Rejected Transaction with Creditcard Visa
element(by.partialLinkText('Visa *1111')).click();
browser.sleep(2000);

element(by.xpath(testdata1.MakeaPayment.PaythisAmount_Value)).clear();
element(by.xpath(testdata1.MakeaPayment.PaythisAmount_Value)).sendKeys(testdata.RejectedAmount);
browser.sleep(2000);

element(by.xpath(testdata1.MakeaPayment.PayNow_Button)).click();
browser.sleep(2000);

element(by.xpath(testdata1.MakeaPayment.PayNow_Button)).click();
browser.sleep(2000);
element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Close)).click();

//Success Transaction with Creditcard Visa
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

//Pending Transaction with Creditcard Visa
browser.refresh();
browser.sleep(4000);
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
browser.sleep(3000);
// selection of date
const currentDate = element(by.xpath(testdata1.MakeaPayment.Calender_FutureDate))
currentDate.click();
browser.sleep(2000);
element(by.xpath(testdata1.MakeaPayment.AddandPayNow)).click();
browser.sleep(2000);
expect(element(by.xpath(testdata1.MakeaPayment.ReviewPaymentDetails_Text)).isDisplayed()).toBe(true);
browser.sleep(2000);
element(by.xpath(testdata1.MakeaPayment.PayNow_Button)).click();
browser.sleep(2000);
element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Close)).click();
});

it('Validate that Failed and Pending  payments should be reflected Credit Card (Visa) ', function () {

var testdata4 = protractor.loginHelpers.dashboard();

//Case-1 : Tabular View 
browser.refresh();
browser.sleep(4000);
element(by.xpath(testdata1.LiveWidget.GoToBills_AmountDue)).click();
browser.sleep(5000);

element(by.xpath(testdata1.Adjustment.SelectInterval)).click();
element(by.xpath(testdata1.Billing.SelectFirstInterval)).click();
browser.sleep(3000);
expect(element(by.xpath(testdata1.Payments.Popup)).isDisplayed()).toBe(true);
browser.actions().mouseMove(element(by.xpath(testdata1.Payments.Popup))).perform();
browser.sleep(3000);

//Click on 'View All'
element(By.xpath(testdata1.Payments.ViewAll)).click();
browser.sleep(2000);

//Check only Reject check box
element.all(by.xpath(testdata1.Payments.Checkbox)).then(function(elm){
elm[1].click(); 
browser.sleep(2000);
}); 

//The user should be able to view the recently made transaction through Credit card method under failed transactions
var value=element(by.xpath(testdata1.Payments.StatusValue)).getText();
browser.sleep(2000);
expect(value).toContain("REJECTED");
browser.sleep(2000);

var cardatypeValue=element(by.xpath(testdata1.Payments.PaymentTypeValue)).getText();
browser.sleep(2000);
//Credit Card"
expect(cardatypeValue).toContain(testdata4.TEXT_CREDIT_CARD);
browser.sleep(1000);

//Check only Pending check box
element.all(by.xpath(testdata1.Payments.Checkbox)).then(function(elm){
elm[2].click();
browser.sleep(2000);
elm[1].click(); 
browser.sleep(2000);
}); 

//The user should be able to view the recently made transaction through Credit card method under failed transactions
var valuepending = element(by.xpath(testdata1.Payments.StatusValue)).getText();
expect(valuepending).toContain("PENDING");

var cardatype=element(by.xpath(testdata1.Payments.PaymentTypeValue)).getText();
browser.sleep(2000);
expect(cardatype).toContain(testdata4.TEXT_CREDIT_CARD);

//Case-2 : Card View 
browser.refresh();
browser.sleep(4000);
element(by.xpath(testdata1.LiveWidget.GoToBills_AmountDue)).click();
browser.sleep(3000);

element(by.xpath(testdata1.Adjustment.SelectInterval)).click();
element(by.xpath(testdata1.Billing.SelectFirstInterval)).click();
browser.sleep(3000);
expect(element(by.xpath(testdata1.Payments.Popup)).isDisplayed()).toBe(true);
browser.sleep(2000);
browser.actions().mouseMove(element(by.xpath(testdata1.Payments.Popup))).perform();
browser.sleep(2000);

//Click on 'View All'
element(By.xpath(testdata1.Payments.ViewAll)).click();
browser.sleep(2000);

//element(by.xpath(testdata1.Adjustment.SelectInterval)).click();
//element(by.xpath(testdata1.Billing.SelectFirstInterval)).click();
//browser.sleep(3000);

//validate card view option is there
expect(element(by.xpath(testdata1.MySubscriptions.Style_Card)).isDisplayed()).toBe(true);
//Click on card View option
element(by.xpath(testdata1.MySubscriptions.Style_Card)).click();
browser.sleep(2000);

//Check only Reject check box
element.all(by.xpath(testdata1.Payments.Checkbox)).then(function(elm){
elm[1].click(); 
browser.sleep(2000)
}); 

//Expand the status box
//element(by.xpath(testdata1.Payments.Expand_Status)).click();
//browser.sleep(2000)

//Verify the status is Rejected
var statusCard = element(by.xpath(testdata1.Payments.Status_CardView)).getText();
expect(statusCard).toContain("REJECTED");

//Verify the payment type 'Credit card'
 var statusPaymentType = element(by.xpath(testdata1.Payments.Status_PaymentType)).getText();
expect(statusPaymentType).toContain(testdata4.TEXT_CREDIT_CARD);

//Collapse the status box
// element(by.xpath(testdata1.Payments.Collapse_Status)).click();
// browser.sleep(3000)

//Check only Pending check box
element.all(by.xpath(testdata1.Payments.Checkbox)).then(function(elm){
elm[1].click();
browser.sleep(2000)
elm[2].click(); 
browser.sleep(2000)
}); 

//Expand the status box
// element(by.xpath(testdata1.Payments.Expand_Status)).click();
// browser.sleep(2000)

//Verify the status is pending
var statusCardPending = element(by.xpath(testdata1.Payments.Status_CardView)).getText();
expect(statusCardPending).toContain("PENDING");

//Verify the payment type 'Credit card'
var PaymentTypePending = element(by.xpath(testdata1.Payments.Status_PaymentType)).getText();
expect(PaymentTypePending).toContain(testdata4.TEXT_CREDIT_CARD);

//Collapse the status box
// element(by.xpath(testdata1.Payments.Collapse_Status)).click();
// browser.sleep(3000)

});

it('Adding ACH payment Method ', function () {
var testdata4 = protractor.loginHelpers.dashboard();
var testdata5 = protractor.loginHelpers.lang;

//Refresh
browser.refresh();
browser.sleep(5000);

//Logout
element(by.xpath(testdata1.SystemBar.Logout)).click();
browser.sleep(5000);

var testdata5 = protractor.loginHelpers.lang;

//Load the URL
browser.get(testdata9.URL);
browser.sleep(3000);

element(by.css(testdata5)).click();

//Log in to MetraView with corporate account
element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata9.userName13);
element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata9.passwordField);
browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
browser.sleep(6000); 

browser.refresh();
browser.sleep(6000);   

//Click on 'Payment Method' Link
expect(element(by.xpath(testdata1.PaymentMethods.Link)).isDisplayed()).toBe(true);
browser.sleep(3000);
element(by.xpath(testdata1.PaymentMethods.Link)).click();
browser.sleep(3000);

//Click on 'Proceed' to navigate to cyber source
element(by.xpath(testdata1.PaymentMethods.Popup_Proceed)).click();
browser.sleep(3000);

browser.ignoreSynchronization = true;
browser.waitForAngular();
browser.sleep(1000);    

//Verify the cyber source title is present
expect(element(by.xpath(testdata1.MakeaPayment.CyberSource_Text)).isDisplayed()).toBe(true);
browser.sleep(3000);

//Verify the 'eCheck' option on the cyber source page
browser.actions().mouseMove(element(by.xpath(testdata1.PaymentMethods.CyberSource_Echeckoption))).perform();

//Click on 'eCheck' button
element(by.xpath(testdata1.PaymentMethods.CyberSource_Echeckoption_Button)).click();
browser.sleep(1000);
//Verify the 'Billing Information' title
expect(element(by.xpath(testdata1.PaymentMethods.CyberSource_BillingInformationTitle)).getText()).toEqual('Billing Information');

//Insert data in to the required fields
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


//Enter the Payment Details
element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_RoutingNumber)).click();
element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_RoutingNumber)).sendKeys(testdata7.routingnum);
element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_AccountNumber)).click();
element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_AccountNumber)).sendKeys(testdata7.accountnum);
element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_Check_Number)).click();
element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_Check_Number)).sendKeys(testdata7.checknum);
browser.sleep(2000);
element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_Account_Type)).click();
browser.sleep(1000);
element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_Account_Type_Checking)).click();

//Enter Date of Birth
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
browser.sleep(10000);

//Load the MetraView Login page
browser.get(testdata9.URL);
browser.sleep(3000);
element(by.css(testdata5)).click();
browser.sleep(1000);

//Log in to MetraView with corporate account
element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata9.userName13);
element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata9.passwordField);
browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
browser.sleep(6000); 

browser.waitForAngular();
browser.sleep(12000);

//Verify 'Today' and 'Add ACH succeeded' text in the Activity Log Widget
expect(element(by.xpath(testdata1.ActivityLog.Today_Text)).getText()).toEqual(testdata4.TEXT_TODAY);
expect(element(by.xpath(testdata1.ActivityLog.SuccessMessage)).getText()).toEqual('Add ACH succeeded');


});

it('Making Failed and Pending payments with ACH payment Method ', function () {  

//Refresh
browser.refresh();
browser.sleep(5000);

//const ele1 = element(by.xpath(testdata1.MakeaPayment.AmountDue));
//ele1.getText().then(function change(text){
//str = text;

//Click on 'Make a Payment' link under 'Amount Due' widget
expect(element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Button)).isDisplayed()).toBe(true);
element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Button)).click();

//Click on the 'Payment Method' drop down button
element(by.xpath(testdata1.MakeaPayment.PaymentMethod_Dropdown)).click();
browser.sleep(2000);

//Select the card with 'Checking' Text
element(by.partialLinkText('Checking')).click();
browser.sleep(2000);

element(by.xpath(testdata1.MakeaPayment.PaythisAmount_Value)).clear();
browser.sleep(2000);

element(by.xpath(testdata1.MakeaPayment.PaythisAmount_Value)).sendKeys(testdata.RejectedAmount);
browser.sleep(2000);

//Click on 'Pay Now' button
element(by.xpath(testdata1.MakeaPayment.PayNow_Button)).click();
browser.sleep(2000);

//Click on 'I Authorize' check box
element(by.xpath(testdata1.MakeaPayment.Authorize_Checkbox)).click();
browser.sleep(2000);

//Click on 'Pay Now' button
element(by.xpath(testdata1.MakeaPayment.PayNow_Button)).click();
browser.sleep(2000);

//Click on the 'x' symbol
element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Close)).click();
browser.sleep(2000);

//Success Transaction with ACH card
browser.refresh();
browser.sleep(2000);
//Click on 'Make a Payment' button
element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Button)).click();
browser.sleep(2000);
//Click on 'Payment method' drop down
element(by.xpath(testdata1.MakeaPayment.PaymentMethod_Dropdown)).click();
browser.sleep(2000);
//selct the card with 'Checking' text from the drop down
element(by.partialLinkText('Checking')).click();
browser.sleep(2000);

element(by.xpath(testdata1.MakeaPayment.PaythisAmount_Value)).clear();
browser.sleep(2000);

//Enter payment amount
element(by.xpath(testdata1.MakeaPayment.PaythisAmount_Value)).sendKeys(testdata.SuccessAmount);
browser.sleep(2000);

//Click on 'Pay Now' button
element(by.xpath(testdata1.MakeaPayment.PayNow_Button)).click();
browser.sleep(2000);

//Click on 'I Authorize' check box
element(by.xpath(testdata1.MakeaPayment.Authorize_Checkbox)).click();
browser.sleep(2000);

//Click on 'Pay Now' button
element(by.xpath(testdata1.MakeaPayment.PayNow_Button)).click();
browser.sleep(2000);

//Click on 'x' symbol
element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Close)).click();
browser.sleep(2000);

//Pending Transaction with ACH card
browser.refresh();
browser.sleep(2000);
element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Button)).click();
browser.sleep(2000);
element(by.xpath(testdata1.MakeaPayment.PaymentMethod_Dropdown)).click();
browser.sleep(2000);

element(by.partialLinkText('Checking')).click();
browser.sleep(2000);

element(by.xpath(testdata1.MakeaPayment.PaythisAmount_Value)).clear();
browser.sleep(2000);

element(by.xpath(testdata1.MakeaPayment.PaythisAmount_Value)).sendKeys(testdata.PendingAmount);
browser.sleep(2000);

element(by.xpath(testdata1.MakeaPayment.PayNow_Button)).click();
browser.sleep(2000);

element(by.xpath(testdata1.MakeaPayment.Authorize_Checkbox)).click();
browser.sleep(2000);

element(by.xpath(testdata1.MakeaPayment.PayNow_Button)).click();
browser.sleep(2000);

element(by.xpath(testdata1.MakeaPayment.MakeaPayment_Close)).click();
browser.sleep(2000);  
})
;

it('Validate that Failed and Pending  payments should be reflected ACH Card ', function () {

var testdata4 = protractor.loginHelpers.dashboard();

//Refresh
browser.refresh();
browser.sleep(5000);

//Click on 'Go to Bills'
element(by.xpath(testdata1.LiveWidget.GoToBills_AmountDue)).click();
browser.sleep(3000);

element(by.xpath(testdata1.Adjustment.SelectInterval)).click();
element(by.xpath(testdata1.Billing.SelectFirstInterval)).click();
browser.sleep(3000);
expect(element(by.xpath(testdata1.Payments.Popup)).isDisplayed()).toBe(true);
browser.actions().mouseMove(element(by.xpath(testdata1.Payments.Popup))).perform();
browser.sleep(2000);

//Click on 'View All' button
element(By.xpath(testdata1.Payments.ViewAll)).click();
browser.sleep(2000);

//Check only Reject check box
element.all(by.xpath(testdata1.Payments.Checkbox)).then(function(elm){
elm[1].click(); 
browser.sleep(2000);
}); 

//The user should be able to view the recently made transaction through ACH method under failed transactions
var value=element(by.xpath(testdata1.Payments.StatusValue)).getText();
browser.sleep(2000);
expect(value).toContain("REJECTED");
browser.sleep(2000);

var cardatypeValue=element(by.xpath(testdata1.Payments.PaymentTypeValue)).getText();
browser.sleep(2000);
expect(cardatypeValue).toContain("ACH");

//Check only Pending check box
element.all(by.xpath(testdata1.Payments.Checkbox)).then(function(elm){
elm[1].click();
browser.sleep(1000);
elm[2].click(); 
browser.sleep(2000);
}); 

//The user should be able to view the recently made transaction through Credit card method under failed transactions
var pendingStatus = element(by.xpath(testdata1.Payments.StatusValue)).getText();
expect(pendingStatus).toContain("PENDING");

var cardatype=element(by.xpath(testdata1.Payments.PaymentTypeValue)).getText();
browser.sleep(2000);
expect(cardatype).toContain("ACH");

//Case-2 : Card View 
browser.refresh();
browser.sleep(4000);
element(by.xpath(testdata1.LiveWidget.GoToBills_AmountDue)).click();
browser.sleep(3000);

element(by.xpath(testdata1.Adjustment.SelectInterval)).click();
element(by.xpath(testdata1.Billing.SelectFirstInterval)).click();
browser.sleep(3000);
expect(element(by.xpath(testdata1.Payments.Popup)).isDisplayed()).toBe(true);
browser.sleep(2000);
browser.actions().mouseMove(element(by.xpath(testdata1.Payments.Popup))).perform();
browser.sleep(2000);

element(By.xpath(testdata1.Payments.ViewAll)).click();
browser.sleep(2000);

//validate Card view option is there
expect(element(by.xpath(testdata1.MySubscriptions.Style_Card)).isDisplayed()).toBe(true);
//Click on Card View option
element(by.xpath(testdata1.MySubscriptions.Style_Card)).click();
browser.sleep(2000);

//Check only Reject check box
element.all(by.xpath(testdata1.Payments.Checkbox)).then(function(elm){
elm[1].click(); 
browser.sleep(2000)
}); 

//Expand the status box
// element(by.xpath(testdata1.Payments.Expand_Status)).click();
// browser.sleep(2000)

//Verify the status is Rejected
var statusCard = element(by.xpath(testdata1.Payments.Status_CardView)).getText();
expect(statusCard).toContain("REJECTED");

//Verify the payment type 'ACH'
 var statusPaymentType = element(by.xpath(testdata1.Payments.Status_PaymentType)).getText();
expect(statusPaymentType).toContain("ACH");

//Collapse the status box
//element(by.xpath(testdata1.Payments.Collapse_Status)).click();
//browser.sleep(3000)

//Check only Pending check box
element.all(by.xpath(testdata1.Payments.Checkbox)).then(function(elm){
elm[1].click(); 
elm[2].click(); 
browser.sleep(2000)
}); 

//Expand the status box
// element(by.xpath(testdata1.Payments.Expand_Status)).click();
// browser.sleep(2000)

//Verify the status is pending
var statusCardPending = element(by.xpath(testdata1.Payments.Status_CardView)).getText();
expect(statusCardPending).toContain("PENDING");

//Verify the payment type 'ACH'
var PaymentTypePending = element(by.xpath(testdata1.Payments.Status_PaymentType)).getText();
expect(PaymentTypePending).toContain("ACH");

// Log Out from Application
browser.findElement(by.xpath(testdata1.SystemBar.Logout)).click();
browser.sleep(12000);

// //Collapse the status box
// element(by.xpath(testdata1.Payments.Collapse_Status)).click();
// browser.sleep(3000)

});

});