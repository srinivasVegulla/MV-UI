var testdata2 = require('../inputs/testdata/XpathRepository.json');
var testdata = require('../inputs/testdata/JsonFileCreation.json');
var testdata1 = require('../inputs/testdata/Login.json');

describe('Subscriptions View All related Test cases', function () {

it('Validate subscription viewall', function () {

//Input file to refer
var testdata3 = protractor.loginHelpers.dashboard();
var testdata5 = protractor.loginHelpers.lang;

browser.refresh();
browser.sleep(9000);

//Launch to the MV2.0 application
protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
//Login to the MV2.0 application
protractor.loginHelpers.logInMV(testdata.userName,testdata.passwordField);

//Login with userName
browser.get(testdata.URL);
browser.sleep(5000);

element(by.css(testdata5)).click();
browser.sleep(3000);

element(by.xpath(testdata2.LoginPage.UserName)).sendKeys(testdata.userName14);
element(by.xpath(testdata2.LoginPage.Password)).sendKeys(testdata.passwordField);
browser.findElement(By.xpath(testdata2.LoginPage.LogInButton)).click();
browser.sleep(9000);

expect(element(by.xpath(testdata2.Subscriptions.Title)).isPresent()).toBe(true);
var el = element(by.xpath(testdata2.Subscriptions.Title));
browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
browser.sleep(1000);

expect(element(by.xpath(testdata2.Subscriptions.ViewAll)).isPresent()).toBe(true);
element(by.xpath(testdata2.Subscriptions.ViewAll)).click();
browser.sleep(2000);

//clicking selected by
expect(element(by.xpath(testdata2.MySubscriptions.SelectBy_Label)).getText()).toEqual(testdata3.TEXT_SELECTED_BY);
// element(by.xpath(testdata2.NowCast.ViewAll_Date)).click();
// element(by.xpath(testdata2.Adjustment.SelectBy_Bill)).click();
browser.sleep(1000);

//selecting interval
element(by.xpath(testdata2.NowCast.ViewAll_Sort)).click();
element(by.xpath(testdata2.Adjustment.SelectFirstInterval)).click();
browser.sleep(1000);

// sortby 
expect(element(by.xpath(testdata2.MySubscriptions.SortBy_Label)).getText()).toEqual(testdata3.TEXT_SORT_BY);
element(by.xpath(testdata2.Adjustment.SortByDropdown)).click();
element.all(by.xpath(testdata2.ActivityLog.SortBy_Values)).then(function(items) {
expect(items.length).toBe(3);
items[1].click();
});
browser.sleep(1000);

// settings
element(by.xpath(testdata2.Adjustment.Settings)).click();
browser.actions().mouseMove(element(by.xpath(testdata2.Adjustment.Settings_Label))).perform();
browser.sleep(1000);

element(by.xpath(testdata2.MySubscriptions.Settings_None)).click();
element(by.xpath(testdata2.MySubscriptions.Settings_All)).click();
browser.sleep(1000);

// freeze
element(by.xpath(testdata2.MySubscriptions.Settings_FreezeEndDate)).click();
browser.sleep(1000);
expect(element(by.xpath(testdata2.MySubscriptions.Settings_Disabled)).isPresent()).toBe(true);
console.log('First colomn name is freezed');

// cancel validation
expect(element(by.xpath(testdata2.MySubscriptions.Settings_Cancel)).isDisplayed()).toBe(true);

//apply
element(by.xpath(testdata2.MySubscriptions.Settings_Apply)).click();
browser.sleep(1000);

//again settings icon
element(by.xpath(testdata2.Adjustment.Settings)).click();
browser.sleep(1000);

browser.actions().mouseMove(element(by.xpath(testdata2.Adjustment.Settings_Label))).perform();
browser.sleep(1000);

// unfreeze
var unfreeze = element.all(by.xpath(testdata2.MySubscriptions.Settings_PinList)).last();
unfreeze.click();
browser.sleep(1000); 
// apply
element(by.xpath(testdata2.MySubscriptions.Settings_Apply)).click();
browser.sleep(1000);

// cardview
element(by.xpath(testdata2.MySubscriptions.Style_Card)).click();
browser.sleep(1000);
expect(element(by.xpath(testdata2.MySubscriptions.CardView_Validation)).isDisplayed()).toBe(true);

//TableView
element(by.xpath(testdata2.MySubscriptions.Style_Table)).click();
browser.sleep(1000);
element.all(by.xpath(testdata2.MySubscriptions.TableView_Validation)).then(function(items) {
expect(items.length).toBe(2);
});
browser.sleep(1000);

//filter
element(by.xpath(testdata2.Adjustment.FilterIcon)).click();
browser.sleep(1000);
element(by.xpath(testdata2.MySubscriptions.Filter_Dropdown)).click();
browser.sleep(1000);
element(by.xpath(testdata2.MySubscriptions.Filter_Interval)).click();
browser.sleep(1000);

// Selectby
expect(element(by.xpath(testdata2.ActivityLog.Filter_SelectBy)).getText()).toEqual(testdata3.TEXT_SELECTED_BY);

// sortby
expect(element(by.xpath(testdata2.Adjustment.Filter_SortBy)).getText()).toEqual(testdata3.TEXT_SORT_BY);
element(by.xpath(testdata2.Adjustment.Filter_ApplyButton)).click();
browser.sleep(1000);

//closing subscriptions viewall
element(by.xpath(testdata2.MySubscriptions.CloseButton)).click();
browser.sleep(1000); 
expect(element(by.xpath(testdata2.Subscriptions.Title)).isPresent()).toBe(true);
});

it('Verify search results of subscriptions ', function () {

//0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10510/ Reg_004_Verify_search_results_of_subscriptions

//Refresh the browser
browser.refresh();
browser.sleep(10000);

//Click on View all link under mysubscriptions widget in Dashboard page
expect(element(by.xpath(testdata2.Subscriptions.ViewAll)).isPresent()).toBe(true);
element(by.xpath(testdata2.Subscriptions.ViewAll)).click();
browser.sleep(4000);

//Click on Filter button
element(by.xpath(testdata2.Downloads.SortingFilter)).click();
browser.sleep(4000);

//Enter "Group" in Descrption field
element(by.xpath(testdata2.MySubscriptions.Description_inputField)).sendKeys("Group");
browser.sleep(2000);

//Click Apply button 
element(by.xpath(testdata2.OfferCharge.Apply_Button)).click();
browser.sleep(10000);

//Validate that Group usage simple po is displayed
expect(element(by.xpath(testdata2.MySubscriptions.Poname_Mysubsciptions_page)).getText()).toContain(testdata.po+" display name");
browser.sleep(2000);

//Refresh the browser
browser.refresh();
browser.sleep(9000);

//Click on Go to Bills Link
element(by.xpath(testdata2.Billing.GoToBillsButton)).click();
browser.sleep(8000);

element(by.xpath(testdata2.Billing.SelectIntervalDropdown)).click();
browser.sleep(2000);
element(by.xpath(testdata2.Billing.SelectFirstInterval)).click();
browser.sleep(5000);

//Click on View all link under mysubscriptions widget
expect(element(by.xpath(testdata2.MySubscriptions.Viewall_Billspage)).isPresent()).toBe(true);
element(by.xpath(testdata2.MySubscriptions.Viewall_Billspage)).click();
browser.sleep(4000);

//Click on Filter button
element(by.xpath(testdata2.Downloads.SortingFilter)).click();
browser.sleep(2000);

//Enter "Group" in Descrption field
element(by.xpath(testdata2.MySubscriptions.Description_inputField)).sendKeys("Group");
browser.sleep(2000);

//Click Apply button 
element(by.xpath(testdata2.OfferCharge.Apply_Button)).click();
browser.sleep(10000);

//Validate that Group usage simple po is displayed
expect(element.all(by.xpath(testdata2.MySubscriptions.Poname_Billspage)).getText()).toContain(testdata.po+" display name");
browser.sleep(2000);

//Refresh the browser
browser.refresh();
browser.sleep(5000);

//Navigate to MyAccount page
element(by.xpath(testdata2.LayerSelector.Dropdown)).click();
element(by.xpath(testdata2.LayerSelector.MyAccount)).click();
browser.sleep(5000);

//Click on View all link under mysubscriptions widget
expect(element(by.xpath(testdata2.Subscriptions.ViewAll)).isPresent()).toBe(true);
element(by.xpath(testdata2.Subscriptions.ViewAll)).click();
browser.sleep(4000);

//Click on Filter button
element(by.xpath(testdata2.Downloads.SortingFilter)).click();
browser.sleep(2000);

//Enter "Group" in Descrption field
element(by.xpath(testdata2.MySubscriptions.Description_inputField)).sendKeys("Group");
browser.sleep(2000);

//Click Apply button 
element(by.xpath(testdata2.OfferCharge.Apply_Button)).click();
browser.sleep(10000);

//Validate that Group usage simple po is displayed
expect(element.all(by.xpath(testdata2.MySubscriptions.Poname_Mysubsciptions_page)).getText()).toContain(testdata.po+" display name");

browser.sleep(2000);

//Logout from the MV2.0 Application 
protractor.loginHelpers.logOutMV();

})
});
