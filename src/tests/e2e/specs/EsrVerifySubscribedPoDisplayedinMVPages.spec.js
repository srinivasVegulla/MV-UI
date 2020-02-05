var testdata2 = require('../inputs/testdata/JsonFileCreation.json');
var testdata3 = require('../inputs/testdata/XpathRepository.json');
var testdata6 = require('../inputs/testdata/Login.json');

describe('UI Baseline App', function () {

//Q1Bug:MVIEW-2983:Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ Sanity_Bugs_TestCases/ 2983_Verify_subscriptions_are_available_for_Payer
it('Verify the Subscribed PO is displayed in Metraview pages', function () {

browser.refresh();
browser.sleep(5000);
var testdata4 = protractor.loginHelpers.dashboard();

 var testData5 = protractor.loginHelpers.lang;
// //Get Metraview 2.0 URL
browser.get(testdata2.URL);
browser.sleep(5000);

// //Select the reqired Currency
element(by.css(testData5)).click();
browser.sleep(3000);

//Login to MetraView as Corporate User(Without Post Bill Adjustment)
//Enter username as userName2
element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata2.userName2);

//Enter password
element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata2.passwordField);

//Click on Login Button
browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
browser.sleep(12000);  

expect(element(by.xpath(testdata3.Subscriptions.Title)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata3.Subscriptions.Title)).getText()).toEqual(testdata4.TEXT_MY_SUBSCRIPTIONS);
//Click on View all link in My subscription widget
element(by.xpath(testdata3.Subscriptions.ViewAll)).click();  
browser.sleep(4000);
//Validate the Subscribed PO in My Subscription Page. 
expect(element(by.xpath(testdata3.MySubscriptions.GroupUsageSimplePOName)).isDisplayed()).toBe(true);
browser.sleep(2000);   
//Click On dropdown arrow to select Bills page
element(by.xpath(testdata3.LayerSelector.Dropdown)).click();
element(by.xpath(testdata3.LayerSelector.Bills)).click();
browser.sleep(2000);
//Click on View all link in My subscription widget
element(by.xpath(testdata3.Subscriptions.ViewAll)).click();  
browser.sleep(4000);
//Validate the Subscribed PO in My Subscription Page. 
expect(element(by.xpath(testdata3.MySubscriptions.GroupUsageSimplePOName)).isDisplayed()).toBe(true);
//Click On dropdown arrow to select My Account page
element(by.xpath(testdata3.LayerSelector.Dropdown)).click();
element(by.xpath(testdata3.LayerSelector.MyAccount)).click();
browser.sleep(2000);
//Click on View all link in My subscription widget
element(by.xpath(testdata3.Subscriptions.ViewAll)).click();  
browser.sleep(3000);
//Validate the Subscribed PO in My Subscription Page. 
expect(element(by.xpath(testdata3.MySubscriptions.GroupUsageSimplePOName)).isDisplayed()).toBe(true);

});

// //Q1Bug:MVIEW-2983-Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ Sanity_Bugs_TestCases/ 2983_VerifySubscriptionsAvailableForIndividualUser
it('Validate the PO is subscribed to Independent Account', function () {
var testdata4 = protractor.loginHelpers.dashboard();
browser.refresh();
browser.sleep(5000);
var testdata5 = protractor.loginHelpers.lang; 
browser.get(testdata2.URL);
browser.sleep(5000);
element(by.css(testdata5)).click();
browser.sleep(2000);
//Login to Metraview with IndependentAccount(not subscribed to any PO) 
element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata2.Indept);
element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata2.passwordField);
browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
browser.sleep(12000);
expect(element(by.xpath(testdata3.Subscriptions.Title)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata3.Subscriptions.Title)).getText()).toEqual(testdata4.TEXT_MY_SUBSCRIPTIONS);
//Click on View all link in My subscription widget
element(by.xpath(testdata3.Subscriptions.ViewAll)).click();  
browser.sleep(4000);
//Validate the Subscribed PO in My Subscription Page. 
expect(element(by.xpath(testdata3.MySubscriptions.GroupUsageSimplePOName)).isDisplayed()).toBe(true);

});

// //Q1Bug:MVIEW-2983-Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ Sanity_Bugs_TestCases/ 2983_Verify_subscriptions_available_for_Subscriber
// it('Validate the PO is subscribed to Department account', function () {
// var testdata4 = protractor.loginHelpers.dashboard();
// var testdata5 = protractor.loginHelpers.lang;
// browser.refresh();
// browser.sleep(5000);

// browser.get(testdata2.URL);
// browser.sleep(5000);

// // //Select the reqired Currency
// element(by.css(testdata5)).click();
// browser.sleep(3000);

// //Login to MetraView as Corporate User(Without Post Bill Adjustment)
// //Enter username as userName
// element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata2.userName);
// //Enter password
// element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata2.passwordField);
// //Click on Login Button
// browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
// browser.sleep(12000);
// element(by.xpath(testdata3.SystemBar.AccountName)).click();
// browser.sleep(2000);
// //Validating the child account i.e Department1 account
// element.all(by.xpath(testdata3.SystemBar.ChildAccounts_Lists)).then(function(items) {
// expect(items[1].getText()).toContain(testdata4.TEXT_ACCOUNT_ID+" "+testdata2.accID1);
// });

// //LogOut from MV2.0
// element(by.xpath(testdata3.SystemBar.Logout)).click();
// browser.sleep(10000);
// browser.get(testdata6.url.URL);
// browser.sleep(5000);
// element(by.css(testdata5)).click();
// browser.sleep(2000);
// //Log in to MetraView with Department Account (Child1)
// element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata2.child1);
// element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata2.passwordField);
// browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
// browser.sleep(12000);
// expect(element(by.xpath(testdata3.Subscriptions.Title)).isDisplayed()).toBe(true);
// expect(element(by.xpath(testdata3.Subscriptions.Title)).getText()).toEqual(testdata4.TEXT_MY_SUBSCRIPTIONS);
// //Click on View all link in My subscription widget
// element(by.xpath(testdata3.Subscriptions.ViewAll)).click();  
// browser.sleep(4000);
// //Validate the Subscribed PO in My Subscription Page. 
// expect(element(by.xpath(testdata3.MySubscriptions.GroupUsageSimplePOName)).isDisplayed()).toBe(true);

// //Logout from the MV2.0 Application 
// protractor.loginHelpers.logOutMV();

// });
});
