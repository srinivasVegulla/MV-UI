var testData3 = require('../inputs/testdata/XpathRepository.json');
var testdata=require('../inputs/testdata/PaymentMethods.json');
var testdata2= require('../inputs/testdata/prebillandpostbillcreation.json');
var testdata4 = require('../inputs/testdata/AmountDue.json');
var testData1 = require('../inputs/testdata/Login.json');

describe('UI Baseline App', function() {

it('Validate "Add and Pay Now" scenario in Bills Layer Amount Due Widget using Credit Card.', function () {

//Refresh the main page
browser.refresh();
browser.sleep(7000);

var testData5 = protractor.loginHelpers.lang;
var testdata7 = require('../inputs/testdata/JsonFileCreation.json');
//Get Metraview 2.0 URL
browser.get(testdata7.URL);
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
//expect(due).toEqual(due1);
//click on payusing dropdown value
element(by.xpath(testData3.MakeaPayment.PayUsing_Dropdown)).click();
browser.sleep(3000);
element.all(by.xpath(testData3.MakeaPayment.methods)).then(function(items){

if(items.length==2){
//Select new payment method from the drop down
element.all(by.xpath(testData3.MakeaPayment.PayUsing_Dropdown_NewPaymentMethod)).then(function(items) {
items[1].click();
});
}else{
element(by.xpath(testData3.MakeaPayment.PaymentMethod_New)).click();
}
});
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

it('Validate Summarised Charge details',function() {

var testData = protractor.loginHelpers.dashboard();

//Refresh the main page
browser.refresh();
browser.sleep(7000);

const ele1 = element(by.xpath(testData3.MakeaPayment.AmountDue));

ele1.getText().then(function change(text){

str = text;

// pay now 
expect(element(by.xpath(testData3.MakeaPayment.MakeaPayment_Button)).isDisplayed()).toBe(true);
element(by.xpath(testData3.MakeaPayment.MakeaPayment_Button)).click();

//click on payusing dropdown value
element(by.xpath(testData3.MakeaPayment.PaymentMethod_Dropdown)).click();
browser.sleep(3000);

var cardsno =  element.all(by.xpath(testData3.MakeaPayment.TotalCards_Count)).count();

element(by.partialLinkText('Visa *1111')).click();
browser.sleep(2000);
element(by.xpath(testData3.MakeaPayment.PaythisAmount_Value)).clear();

element(by.xpath(testData3.MakeaPayment.PaythisAmount_Value)).sendKeys(testdata4.SuccessAmount);
browser.sleep(2000);
var i=1;
element(by.xpath(testData3.MakeaPayment.PayNow_Button)).click();
browser.sleep(2000);

element(by.xpath(testData3.MakeaPayment.PayNow_Button)).click();
browser.sleep(2000);

element(by.xpath(testData3.MakeaPayment.MakeaPayment_Close)).click();

browser.refresh();

browser.sleep(5000);
element(by.xpath(testData3.Billing.GoToBillsButton)).click();
browser.sleep(5000);

//Click on dropdown to select the hardclosed interval date
element(by.xpath(testData3.Billing.SelectIntervalDropdown)).click();

//select the 
element(by.xpath(testData3.Billing.SelectFirstInterval)).click();
browser.sleep(3000);
//The user should able to view the 'Prior Balance' Widget in dashboard
var widget = element(by.xpath(testData3.PriorBalance.Title)).isPresent();

expect(element(by.xpath(testData3.PriorBalance.PriorBalanceAmount)).isDisplayed()).toBe(true);

expect(element(by.xpath(testData3.PriorBalance.PreviousBalance)).isDisplayed()).toBe(true);
expect(element(by.xpath(testData3.PriorBalance.PreviousBalance)).getText()).toEqual(testData.TEXT_PREVIOUS_BALANCE);
expect(element(by.xpath(testData3.PriorBalance.PreviousBalanceAmount)).isDisplayed()).toBe(true);

expect(element(by.xpath(testData3.PriorBalance.PostBillAdjustment)).isDisplayed()).toBe(true);
expect(element(by.xpath(testData3.PriorBalance.PostBillAdjustment)).getText()).toEqual(testData.TEXT_POSTBILL_ADJUSTMENTS);
expect(element(by.xpath(testData3.PriorBalance.PostBillAdjustmentAmount)).isDisplayed()).toBe(true);

expect(element(by.xpath(testData3.PriorBalance.PaymentRecived)).isDisplayed()).toBe(true);
expect(element(by.xpath(testData3.PriorBalance.PaymentRecived)).getText()).toEqual(testData.TEXT_PAYMENTS_RECEIVED);
expect(element(by.xpath(testData3.PriorBalance.PaymentRecivedAmount)).isDisplayed()).toBe(true);



//validation of postbill adjustments       
//Click on dropdown to select the hardclosed interval date
element(by.xpath(testData3.Billing.SelectIntervalDropdown)).click();
browser.sleep(3000);
element(by.xpath(testData3.Billing.SelectFirstInterval)).click();
browser.sleep(3000);

expect(element(by.xpath(testData3.Charges.PrebillAdjustment)).getText()).toEqual(testData.TEXT_PREBILL_ADJUSTMENTS);
//expect(element(by.xpath(testData3.PriorBalance.PriorBalance_PoupuTransactionAmount)).isDisplayed()).toBe(true); 
//expect(element(by.xpath(testData3.PriorBalance.PriorBalance_PoupuPOName)).isDisplayed()).toBe(true); 
browser.actions().mouseMove(element(by.xpath(testData3.PriorBalance.PostBillAdjustment))).perform();
browser.sleep(1000);

element(By.xpath(testData3.Charges.PrebillAdjustment_Popup_ViewAll)).click(); 

expect(element(by.xpath(testData3.PriorBalance.FadedView)).getAttribute('ng-click')).toContain('table');


// card  fade view image 
expect(element(by.xpath(testData3.PriorBalance.FadedView)).isDisplayed()).toBe(true);    

//tabular view icon click   
element(by.xpath(testData3.MySubscriptions.Style_Card)).click();
browser.sleep(3000);

expect(element(by.xpath(testData3.PriorBalance.FadedView)).getAttribute('ng-click')).toContain('card');

expect(element(by.xpath(testData3.Adjustment.CardView)).isDisplayed()).toBe(true);  

//tabular view icon click   
element(by.xpath(testData3.MySubscriptions.Style_Table)).click();


expect(element(by.xpath(testData3.Adjustment.Settings)).isDisplayed()).toBe(true); 

expect(element(by.xpath(testData3.Adjustment.AdjustmentTabularView)).isDisplayed()).toBe(true);

//session id


//box
element(by.xpath(testData3.Adjustment.Settings)).click();
element(by.xpath(testData3.PriorBalance.AdjustmentAmountCheckBox)).click();
  element(by.xpath(testData3.PriorBalance.Settings_ApplyChanges)).click();
browser.sleep(3000);
browser.waitForAngular();
element(by.xpath(testData3.Adjustment.Settings)).click();

// none    
element(by.xpath(testData3.Adjustment.Settings_UnselectAll)).click(); 
browser.sleep(3000);
element(by.xpath(testData3.PriorBalance.Settings_ApplyChanges)).click();
browser.sleep(2000);

element(by.xpath(testData3.Adjustment.Settings_Cancel)).click();

element(by.xpath(testData3.Adjustment.Settings)).click();
browser.sleep(3000);

element(by.xpath(testData3.Adjustment.Settings_SelectAll)).click(); 
// all
element(by.xpath(testData3.PriorBalance.Settings_ApplyChanges)).click();

browser.sleep(1000);

element(by.xpath(testData3.Adjustment.CloseButtonPostBill)).click();
browser.sleep(1000);

// browser.sleep(5000);
element(by.xpath(testData3.Billing.SelectIntervalDropdown)).click();
browser.sleep(3000);
element(by.xpath(testData3.Billing.SelectFirstInterval)).click();
 browser.sleep(3000);
//payments recieved display
//The user should able to view the transactions are displayed in card view after click/touch on the Payments received
expect(element(by.xpath(testData3.Charges.PaymentReceived_Button)).isDisplayed()).toBe(true);

expect(element(by.xpath(testData3.Charges.PaymentReceived_Button)).getText()).toEqual(testData.TEXT_PAYMENTS_RECEIVED);
browser.actions().mouseMove(element(by.xpath(testData3.Charges.PaymentReceived_Button))).perform();
browser.sleep(1000);
var paymentsreceiveddisplay =  element(by.xpath(testData3.Charges.PrebillAdjustment_Popup)).isPresent();

//payments received should be shown

browser.sleep(3000);
expect(element(by.xpath(testData3.Charges.PaymentReceived_Popup_CradNoLabel)).getText()).toEqual(testData.TEXT_CARD_NO);
expect(element(by.xpath(testData3.Charges.PaymentReceived_Popup_CradNo)).isDisplayed()).toBe(true); 
expect(element(by.xpath(testData3.Charges.PaymentReceived_Popup_TransactionIdLabel)).getText()).toEqual(testData.TEXT_TRANSACTION_ID);
expect(element(by.xpath(testData3.Charges.PaymentReceived_Popup_TransactionId)).isDisplayed()).toBe(true); 
expect(element(by.xpath(testData3.Charges.PaymentReceived_Popup_PaymentMethod)).isDisplayed()).toBe(true); 

expect(element(by.xpath(testData3.Charges.PaymentReceived_Popup_Amount)).isDisplayed()).toBe(true); 
expect(element(by.xpath(testData3.Charges.PaymentReceived_Popup_Date)).isDisplayed()).toBe(true); 
var paymentsviewlldisplay =  element(by.xpath(testData3.Charges.Popup_ViewAll)).isPresent();

//View all is displayed and click on View all
expect(element(by.xpath(testData3.Charges.Popup_ViewAll)).isDisplayed()).toBe(true);
expect(element(by.xpath(testData3.Charges.Popup_ViewAll)).getText()).toContain(testData.TEXT_VIEW_ALL);
element(by.xpath(testData3.Charges.Popup_ViewAll)).click();
browser.sleep(3000);
//The user should able to the change the view to Tabluar view in desktop resolution
expect(element(by.xpath(testData3.PriorBalance.PaymentReceivedTabularView)).isDisplayed()).toBe(true);
browser.sleep(3000);
//click on settings icon
element(by.xpath(testData3.Adjustment.Settings)).click();
browser.sleep(3000);
//click on All 
element(by.xpath(testData3.Adjustment.Settings_SelectAll)).click();
browser.sleep(3000);
element(by.xpath(testData3.PriorBalance.Settings_ApplyChanges)).click();
browser.sleep(3000);
element(by.xpath(testData3.Adjustment.SelectByDropdown)).click();
browser.sleep(3000);
element(by.xpath(testData3.Quotes.SelectBy_Bill)).click();
element(by.xpath(testData3.Adjustment.SelectInterval)).click();
browser.sleep(3000);
element(by.xpath(testData3.Adjustment.SelectFirstInterval)).click();
browser.sleep(3000);
element(by.xpath(testData3.Adjustment.SortByDropdown)).click();
element(by.xpath(testData3.Adjustment.SortByDropdownFirstValue)).click();
browser.sleep(3000);
//click on filter icon
element(by.xpath(testData3.Adjustment.FilterIcon)).click();
browser.sleep(3000);
browser.actions().mouseMove(element(by.xpath(testData3.Adjustment.Filter_SortBy))).perform();

element(by.xpath(testData3.Adjustment.Filter_ApplyButton)).click();
browser.sleep(3000); 

//card view
//Click on card view option
element(by.xpath(testData3.MySubscriptions.Style_Card)).click();
browser.sleep(3000);

//click on tabularview option
element(by.xpath(testData3.MySubscriptions.Style_Table)).click();

// The user should able to view transactions in tabular view and the fields that are marked for display shall be shown with correct display names
expect(element(by.xpath(testData3.PriorBalance.Tablecolumns_PaymentDate)).getText()).toEqual(testData.TEXT_PAYMENT_DATE);

expect(element(by.xpath(testData3.PriorBalance.Tablecolumns_Status)).getText()).toEqual(testData.TEXT_STATUS);

expect(element(by.xpath(testData3.PriorBalance.Tablecolumns_AccountNumber)).getText()).toEqual(testData.TEXT_ACCOUNT_NUMBER);


expect(element(by.xpath(testData3.PriorBalance.Tablecolumns_Amount)).getText()).toEqual(testData.TEXT_AMOUNT);
expect(element(by.xpath(testData3.PriorBalance.Tablecolumns_PaymentType)).getText()).toEqual(testData.TEXT_PAYMENT_TYPE);
expect(element(by.xpath(testData3.PriorBalance.Tablecolumns_PaymentMethod)).getText()).toEqual(testData.TEXT_PAYMENT_METHOD);
//click on settings icon
element(by.xpath(testData3.Adjustment.Settings)).click();

//click on All 
element(by.xpath(testData3.Adjustment.Settings_SelectAll)).click();

element(by.xpath(testData3.PriorBalance.Settings_ApplyChanges)).click();

//The table settings overlay should be presented with all the displayable fields for the correspondingtransactions 
//and by default the fields that are currently being displayed should be selected

expect(element(by.xpath(testData3.PriorBalance.Tablecolumns_PaymentDate)).isDisplayed()).toBe(true);

expect(element(by.xpath(testData3.PriorBalance.Tablecolumns_Status)).isDisplayed()).toBe(true);

expect(element(by.xpath(testData3.PriorBalance.Tablecolumns_AccountNumber)).isDisplayed()).toBe(true);

expect(element(by.xpath(testData3.PriorBalance.Tablecolumns_Amount)).isDisplayed()).toBe(true);
expect(element(by.xpath(testData3.PriorBalance.Tablecolumns_PaymentType)).isDisplayed()).toBe(true);

expect(element(by.xpath(testData3.PriorBalance.Tablecolumns_PaymentMethod)).isDisplayed()).toBe(true);
//click on settings icon
element(by.xpath(testData3.Adjustment.Settings)).click();

browser.sleep(2000);

element(by.xpath(testData3.PriorBalance.Settingscolumn_PaymentDate)).click();
browser.sleep(2000);
//The user should have the capability of changing the column settings
element(by.xpath(testData3.MySubscriptions.Settings_Cancel)).click();
browser.sleep(2000);
//click on settings icon
element(by.xpath(testData3.Adjustment.Settings)).click();
browser.sleep(2000);
//The user should have the ability to check/uncheck to show/hide the columns.
element(by.xpath(testData3.Adjustment.Settings_SelectAll)).click();
browser.sleep(200);
element(by.xpath(testData3.Adjustment.Settings_UnselectAll)).click();
//click on cance button
element(by.xpath(testData3.MySubscriptions.Settings_Cancel)).click();
browser.sleep(2000);
element(by.xpath(testData3.PriorBalance.ClosePaymentHistory)).click();
browser.sleep(2000);
//The user should able to close the payments received and return to te view that launched this widget
expect(element(by.xpath(testData3.Charges.PaymentReceived_Button)).getText()).toEqual(testData.TEXT_PAYMENTS_RECEIVED);
// expect(browser.getTitle()).toEqual('ECB MetraView : Dashboard');

});
}); 

it('Validate Summarised Charge details Error Message', function () {

browser.refresh();
browser.sleep(9000);

if(browser.params.value=='ViewOnlineBill'){

//Launch to the MV2.0 application
protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);

//Login to the MV2.0 application
protractor.loginHelpers.logInMV(testdata2.userName2,testdata2.passwordField);

//Validate the Offer Charge Summary without charges
noTransactions();

//To validate whether dynamic value  is executing.
console.log(browser.params.value);

//Log IN to MetraNet Applciation and navigate to View Online Bill screen
protractor.loginHelpers.viewOnlineBill(testdata2.userName2);

//Validate the Offer Charge Summary without charges
noTransactions();

//Logout from the MetraNet
protractor.loginHelpers.logOutMetraNet();

//Launch to the MV2.0 application
protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);

//Login to the MV2.0 application
protractor.loginHelpers.logInMV(testdata2.userName2,testdata2.passwordField);

}
else
{
//Launch to the MV2.0 application
protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);

//Login to the MV2.0 application
protractor.loginHelpers.logInMV(testdata2.userName2,testdata2.passwordField);

//Validate the Offer Charge Summary without charges
noTransactions();
}  


});

function noTransactions(){
var testData2 = protractor.loginHelpers.dashboard();
//Test Case: MetraView_2.0/ Charge_Details/ 017_Error_while_getting_transactions

browser.refresh();
browser.sleep(7000);

//MetraView downarrow
element(by.xpath(testData3.LayerSelector.Dropdown)).click();
element(by.xpath(testData3.LayerSelector.Bills)).click();

//Sort by 
element(by.xpath(testData3.Adjustment.SelectInterval)).click();

//Select the Period/Invoice dropdown, without invoice generated Date 
element(by.xpath(testData3.Billing.SelectSecondInterval)).click();
browser.sleep(3000);

//Offer view and Click on Product Offering name
//Under Charges Summary widget, click on the PO (the parent node)
element.all(by.xpath(testData3.OfferCharge.ProductOfferingLabel)).then(function(pos){
  pos[0].click();
  browser.sleep(2000);
  });

//Click on the Priceable Item
element.all(by.xpath(testData3.OfferCharge.PI_Selection)).then(function(pis){
  pis[0].click();
  browser.sleep(4000);
  });
//The user should able to view the transactions are displayed in card view after click/touch on the summarized charge
expect(element(by.xpath(testData3.Adjustment.Charges_Transactions)).isDisplayed()).toBe(true);
//Sort by 
element(by.xpath(testData3.Adjustment.SelectInterval)).click();

//Select the Period/Invoice dropdown, without invoice generated Date 
element(by.xpath(testData3.Billing.SelectFirstInterval)).click();
browser.sleep(3000);
//Validating the error message
//var str="No records found. Please try by changing bill or date range";
expect(element(by.xpath(testData3.Adjustment.No_offers)).getText()).toEqual(testData2.TEXT_NO_TRANSACTION);

// Log Out from Application
browser.findElement(by.xpath(testData3.SystemBar.Logout)).click();
browser.sleep(12000);
}

});