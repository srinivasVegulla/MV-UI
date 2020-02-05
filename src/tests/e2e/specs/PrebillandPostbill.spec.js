var testData = require('../inputs/testData/prebillandpostbillcreation.json');
var testData3 = require('../inputs/testData/XpathRepository.json');
var testData8 = require('../inputs/testData/JsonFileCreation.json');
var sort = [];
var unSort = [];

describe('UI Baseline App', function () {

it('Prebill and postbill adjustments validation in card view', function () {
var testData2 = protractor.loginHelpers.dashboard();
//Refresh the main page
browser.refresh();
browser.sleep(10000);

var testData5 = protractor.loginHelpers.lang;
//Get Metraview 2.0 URL
browser.get(testData8.URL);
browser.sleep(5000);

//Select the reqired Currency
element(by.css(testData5)).click();
browser.sleep(3000);

//Login to MetraView as Corporate User
//Enter username as userName2
element(by.xpath(testData3.LoginPage.UserName)).sendKeys(testData.userName);

//Enter password
element(by.xpath(testData3.LoginPage.Password)).sendKeys(testData.passwordField);

//Click on Login Button
browser.findElement(By.xpath(testData3.LoginPage.LogInButton)).click();
browser.sleep(12000);  


//Click on Go to Bills Link
element(by.xpath(testData3.Billing.GoToBillsButton)).click();
browser.sleep(8000);


//Click on dropdown to select the hardclosed interval date
element(by.xpath(testData3.Billing.SelectIntervalDropdown)).click();

//select the 
element(by.xpath(testData3.Billing.SelectFirstInterval)).click();
browser.sleep(3000);
//After mouse hovering the pop up is displayed

browser.actions().mouseMove(element(by.xpath(testData3.PriorBalance.PostBillAdjustment))).perform();
browser.sleep(1000);

//After mouse hovering the adjustments are displayed in the card view
expect(element(by.xpath(testData3.PriorBalance.PostBillAdjustment_Popup_ListOfTransaction)).isDisplayed()).toBe(true);

//click on view all button in order to validate the card view
var viewall = element(By.xpath(testData3.Charges.Popup_ViewAll)).click();
browser.sleep(2000);

//click on card view button
element(by.xpath(testData3.MySubscriptions.Style_Card)).click();

//The adjustments are displayed in the card view
expect(element(by.xpath(testData3.Adjustment.CardView)).isDisplayed()).toBe(true);

//click on tabular view icon 
element(by.xpath(testData3.MySubscriptions.Style_Table)).click();
browser.sleep(2000);

//click on close icon
element(by.xpath(testData3.Adjustment.CloseButtonPostBill)).click();

browser.sleep(3000);
//Click on dropdown to select the hardclosed interval date
element(by.xpath(testData3.Billing.SelectIntervalDropdown)).click();


//select the yesterdays hardclosed interval
element(by.xpath(testData3.Billing.SelectSecondInterval)).click();
browser.sleep(3000);
//mouse hover on the prebill adjustments
browser.actions().mouseMove(element(by.xpath(testData3.Charges.PrebillAdjustment))).perform();
browser.sleep(1000);
//Adjustments are dispalyed in the card view
expect(element(by.xpath(testData3.PriorBalance.PostBillAdjustment_Popup_ListOfTransaction)).isDisplayed()).toBe(true);
//Click on view all button
var viewall = element(By.xpath(testData3.Charges.Popup_ViewAll)).click();
browser.sleep(2000);
//click on card view icon
element(by.xpath(testData3.MySubscriptions.Style_Card)).click();

//validate adjustments are dispayed in the card view 
expect(element(by.xpath(testData3.Adjustment.CardView)).isDisplayed()).toBe(true);
//click on tabular view icon
element(by.xpath(testData3.MySubscriptions.Style_Table)).click();

//click on close icon
element(by.xpath(testData3.Adjustment.CloseButton)).click();


browser.refresh();

});

it('Validate prebill sorting functonality', function () {

browser.refresh();
browser.sleep(8000);
//Click on Go to Bills Link
element(by.xpath(testData3.Billing.GoToBillsButton)).click();
browser.sleep(8000);

//Click on dropdown to select the hardclosed interval date
element(by.xpath(testData3.Billing.SelectIntervalDropdown)).click();

//select the yesterdays hardclosed interval
element(by.xpath(testData3.Billing.SelectSecondInterval)).click();

browser.sleep(3000);

//validate the prebill adjustments
expect(element(by.xpath(testData3.Charges.PrebillAdjustment)).isDisplayed()).toBe(true);

browser.sleep(2000);
//mouse hover on the prebill adjustments
browser.actions().mouseMove(element(by.xpath(testData3.Charges.PrebillAdjustment))).perform();
browser.sleep(1000);
//Adjustments are dispalyed in the card view
// expect(element(by.xpath(testData3.PriorBalance.PostBillAdjustment_Popup_ListOfTransaction)).isDisplayed()).toBe(true);
//Click on view all button
var viewall = element(By.xpath(testData3.Charges.Popup_ViewAll)).click();
browser.sleep(2000);


//Get the values of adjutment amount in unsort mode
const elem = element.all(by.xpath(testData3.Adjustment.PrebillAmountList))
elem.map(function(eachName){
eachName.getText().then(function unsorting(unSorted){
unSort.push (unSorted);
console.log(unSort);
return unSorted;
});

});
browser.sleep(2000);

//click on sort and select adjutment amount from the dropdown
element(by.xpath(testData3.Adjustment.SortByDropdown)).click();
element(by.xpath(testData3.Adjustment.SortByDropdownFirstValue)).click();
browser.sleep(10000);
//Get the values of adjutment amount in sort mode
elem.map(function(eachName){
eachName.getText().then(function sorting(sorted){
sort.push(sorted);
console.log(sort);
return sorted ;

});

//validate the sorting functionality
}).then(function compare ()
{

for (var i = 0; i < sort.length-1; i++) {

console.log(sort.length,sort[i],sort[i+1],i)
if(sort[i] >= sort[i+1])
{
console.log("Test Case Failed as Sort is not Working as Expected")
break;

}

} 

})
})

it('Verify pre and post bill adjustments received', function () {

var testData4 = protractor.loginHelpers.dashboard();
browser.refresh();

browser.sleep(5000);

//Click on Go to Bills Link
element(by.xpath(testData3.Billing.GoToBillsButton)).click();
browser.sleep(8000);

//Click on dropdown to select the hardclosed interval date
element(by.xpath(testData3.Billing.SelectIntervalDropdown)).click();

//select the yesterdays hardclosed interval
element(by.xpath(testData3.Billing.SelectFirstInterval)).click();

browser.sleep(3000);

//Verify if the link 'postbill adjustments' can clicked or touched when adjustments have been issued to the particular account
expect(element(by.xpath(testData3.PriorBalance.PostBillAdjustment)).isEnabled()).toBe(true);
browser.sleep(5000);

//Click on the 'postbill 'adjustments' link.
browser.actions().mouseMove(element(by.xpath(testData3.PriorBalance.PostBillAdjustment))).perform();
browser.sleep(5000);

//Verify that the overlay with list of transactions shall be opened as a popup
expect(element(by.xpath(testData3.PriorBalance.PostBillAdjustment_Popup_ListOfTransaction)).isPresent()).toBe(true);
browser.sleep(2000);

//Verify the popup should consists of 'View All' option and 'Download' option
expect(element(by.xpath(testData3.Charges.Popup_ViewAll)).getText()).toContain(testData4.TEXT_VIEW_ALL);
browser.sleep(2000);

expect(element(by.xpath(testData3.Charges.Popup_Download)).getText()).toContain(testData4.TEXT_DOWNLOAD);
browser.sleep(2000);

var downloadpath='C:/Users/Administrator/Downloads/';
var fs = require('fs');

var filename = downloadpath+'PostBillAdjustments.csv';

if (fs.existsSync(filename)) {
//Make sure the browser doesn't have to rename the download.
fs.unlinkSync(filename);
}

//Click on download button
element(by.xpath(testData3.Charges.Popup_Download)).click();
browser.sleep(10000);

//Verify that the list of adjustments with adjustment amount and description should get downloaded
browser.driver.wait(function() {
browser.waitForAngular();
browser.ignoreSynchronization = true;
return fs.existsSync(filename);
}, 5000).then(function(){ 

expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(
testData.postbillDecriptionTransactionone,testData.postbillDecriptionTransactionTwo,testData.adjustmentone,testData.adjustmentamountOne,testData.adjustmentamountTwo);
});

browser.refresh();
browser.sleep(5000);
//Click on Go to Bills Link
element(by.xpath(testData3.LayerSelector.Dropdown)).click();
element(by.xpath(testData3.LayerSelector.Bills)).click();
browser.sleep(8000);

//click on the second drop down from the select period drop down menu
element(by.xpath(testData3.Billing.SelectIntervalDropdown)).click();
browser.sleep(2000);

//Select the previous date invoice menu item from the drop down
expect(element(by.xpath(testData3.Billing.SelectSecondInterval)).getText()).toContain(testData.clickedInterval1);
browser.sleep(2000);
element(by.xpath(testData3.Billing.SelectSecondInterval)).click();
browser.sleep(2000);

//Verify that the user is able to view the 'Prior Balance' Widget in dashboard 
expect(element(by.xpath(testData3.PriorBalance.Title)).getText()).toEqual(testData4.TEXT_PAYMENTS_CREDITS_AND_ADJUSTMENTS);
browser.sleep(2000);

//Verify the user should not able to click/touch on the link of 'postbill adjustments' when there is no adjustments have been issued to this account
expect(element(by.xpath(testData3.PriorBalance.PostBillAdjustment)).getAttribute('disabled')).toEqual('true');

});

//MVIEW-2866Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ Sanity_Bugs_TestCases/ 2866_Verify_Download_btn_is_available_for_NSC
it('Verify the Non standatrd charges are able to download', function () {

var testData4 = protractor.loginHelpers.dashboard();
browser.refresh();

browser.sleep(5000);

//Click on Go to Bills Link
element(by.xpath(testData3.Billing.GoToBillsButton)).click();
browser.sleep(8000);

//Click on dropdown to select the hardclosed interval date
element(by.xpath(testData3.Billing.SelectIntervalDropdown)).click();

//select the yesterdays hardclosed interval
element(by.xpath(testData3.Billing.SelectFirstInterval)).click();

browser.sleep(3000);

//click on Non Standard charges
element(by.xpath(testData3.OfferCharge.Non_Standard_Charge_Label+testData4.TEXT_NON_STANDARD_CHARGES+testData3.ChildAccounts.CloseXpath)).click();
browser.sleep(1000);
//Validate Miscellaneous Adjsutmetns Details are opened
//Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ testData3
expect(element(by.xpath(testData3.OfferCharge.Header+testData4.TEXT_NON_STANDARD_CHARGES+testData3.Adjustment.CloseXpath)).isDisplayed()).toBe(true);

// expect(element(by.xpath(testData3.Charges.Popup_Download)).getText()).toContain(testData4.TEXT_DOWNLOAD);
browser.sleep(2000);

var downloadpath='C:/Users/Administrator/Downloads/';
var fs = require('fs');

var filename = downloadpath+'NonstandardCharges.csv';

if (fs.existsSync(filename)) {
//Make sure the browser doesn't have to rename the download.
fs.unlinkSync(filename);
}

//Click on download button
element(by.xpath(testData3.OfferCharge.Download_SummaryPage)).click();
browser.sleep(10000);

//Verify that the list of adjustments with adjustment amount and description should get downloaded
browser.driver.wait(function() {
browser.waitForAngular();
browser.ignoreSynchronization = true;
return fs.existsSync(filename);
}, 10000).then(function(){ 

expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(
testData.accnum);
});

browser.sleep(5000);

element(by.xpath(testData3.OfferCharge.Header+testData4.TEXT_NON_STANDARD_CHARGES+testData3.Adjustment.CloseXpath+testData3.Charges.close)).click();
browser.sleep(3000);

});

//MVIEW-2866:Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ Sanity_Bugs_TestCases/ 2866_Verify_Download_btn_available_for_Misc_Adj
it('Verify the miscellaneous adjustments are able to download', function () {

var testData4 = protractor.loginHelpers.dashboard();

browser.refresh();

browser.sleep(5000);

//Click on Go to Bills Link
element(by.xpath(testData3.Billing.GoToBillsButton)).click();
browser.sleep(8000);

//Click on dropdown to select the hardclosed interval date
element(by.xpath(testData3.Billing.SelectIntervalDropdown)).click();

//select the yesterdays hardclosed interval
element(by.xpath(testData3.Billing.SelectFirstInterval)).click();

browser.sleep(3000);



//click on Misc adjustments
element(by.xpath(testData3.OfferCharge.Misc_Adjustments_Label+testData4.TEXT_MISC_ADJUSTMENTS+testData3.ChildAccounts.CloseXpath)).click();
browser.sleep(1000);
//Validate Miscellaneous Adjsutmetns Details are opened
//Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 2902_NavigationToNewPageByClickingCharge
expect(element(by.xpath(testData3.OfferCharge.Header+testData4.TEXT_MISC_ADJUSTMENTS+testData3.Adjustment.CloseXpath)).isDisplayed()).toBe(true);

expect(element(by.xpath(testData3.OfferCharge.Download_SummaryPage)).isDisplayed()).toBe(true);
browser.sleep(2000);

var downloadpath='C:/Users/Administrator/Downloads/';
var fs = require('fs');

var filename = downloadpath+'MiscAdjustment.csv';

if (fs.existsSync(filename)) {
//Make sure the browser doesn't have to rename the download.
fs.unlinkSync(filename);
}

//Click on download button
element(by.xpath(testData3.OfferCharge.Download_SummaryPage)).click();
browser.sleep(2000);

//Verify that the list of adjustments with adjustment amount and description should get downloaded
browser.driver.wait(function() {
browser.waitForAngular();
browser.ignoreSynchronization = true;
return fs.existsSync(filename);
}, 5000).then(function(){ 

expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(
testData.accnum);
});

browser.sleep(5000);
//Click on the Viel all Popup
element(by.xpath(testData3.OfferCharge.Header+testData4.TEXT_MISC_ADJUSTMENTS+testData3.Adjustment.CloseXpath+testData3.Charges.close)).click();


});

it('Validate  Card View all Pre and Post Bill Adjustments received', function () {

var testData4 = protractor.loginHelpers.dashboard();
//Test Case: MetraView_2.0/ Card_view_-_View_all_Pre_and_Post_Bill_Adjustments_received/ 008_Tabular_view
browser.refresh();
browser.sleep(5000);
//Click on Go to Bills Link
element(by.xpath(testData3.Billing.GoToBillsButton)).click();
browser.sleep(10000);
//Click on dropdown to select the hardclosed interval date
element(by.xpath(testData3.Billing.SelectIntervalDropdown)).click();

//select the yesterdays hardclosed interval
element(by.xpath(testData3.Billing.SelectFirstInterval)).click();

browser.sleep(3000);
//Verify that post bill link is in enabled state
expect(element(by.xpath(testData3.PriorBalance.PostBillAdjustment)).isEnabled()).toBe(true);

//Click on 'Post Bill Adjustments' link
element(by.xpath(testData3.PriorBalance.PostBillAdjustment)).click();
browser.sleep(10000);
//Click on 'View All' button
element(by.xpath(testData3.Charges.Popup_ViewAll)).click();
browser.sleep(10000);

//Validating that navigates to 'Adjustment Detail's Page
expect(element(by.xpath(testData3.Adjustment.AdjustmentDetailsLabel)).getText()).toEqual(testData4.TEXT_ADJUSTMENT_DETAILS);
browser.sleep(3000);

//Validating that 'Adjustment Amount' field is available in 'Tabular View' of Adjustment Details page 
element.all(by.xpath(testData3.Adjustment.AdjustmentAmountText)).then(function(items){
var testdata13 = browser.getPageSource();
expect(testdata13).toContain(items[0].getText());
expect(testdata13).toContain(items[1].getText());
expect(testdata13).toContain(items[2].getText());
browser.sleep(3000);
});


//Valiating that navigates to 'Postbill Adjustments' page back from 'Adjustment Details' page of TabulerView
expect(element(by.xpath(testData3.Adjustment.AdjustmentTabularView)).isDisplayed()).toBe(true);

//Clicking on 'Desktop Resolution' button
element(by.xpath(testData3.MySubscriptions.Style_Card)).click();

//The adjustments are displayed in the card view
expect(element(by.xpath(testData3.Adjustment.CardView)).isDisplayed()).toBe(true);
element(by.xpath(testData3.MySubscriptions.Style_Table)).click();
browser.sleep(3000);

//Test Case: MetraView_2.0/ Card_view_-_View_all_Pre_and_Post_Bill_Adjustments_received/ 010_Closing_layout
//Clicking on 'x' button
element(by.xpath(testData3.Adjustment.CloseButtonPostBill)).click();
browser.sleep(8000);

//Valiating that navigates to Bills page back from 'Adjustment Details' page
expect(element(by.xpath(testData3.Billing.SelectPeriodInvoiceLabel)).getText()).toEqual(testData4.TEXT_SELECT_BILLING_PERIOD);

// Log Out from Application
browser.findElement(by.xpath(testData3.SystemBar.Logout)).click();
browser.sleep(12000);
});

});

