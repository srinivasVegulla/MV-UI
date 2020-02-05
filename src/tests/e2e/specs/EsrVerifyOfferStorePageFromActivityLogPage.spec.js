var testdata2 =require('../inputs/testdata/JsonFileCreation.json');
var testdata3 = require('../inputs/testdata/XpathRepository.json');

describe('UI Baseline Offer store Widget', function () {
  
it('Verify if Offer Store page rendered when navigated from Activity Log page under My Account', function () {
    //Logout from metraview
    browser.sleep(5000);
    browser.refresh();
   

//Launch to the MV2.0 application
protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);

//Login to the MV2.0 application
protractor.loginHelpers.logInMV(testdata2.userName,testdata2.passwordField);

//Input file to refer
var testdata4 = protractor.loginHelpers.viewSelector();
var testdata5 = protractor.loginHelpers.dashboard();

//Click On dropdown arrow to select My Account page
element(by.xpath(testdata3.LayerSelector.Dropdown)).click();
browser.sleep(1000);

element(by.xpath(testdata3.LayerSelector.MyAccount)).click();
browser.sleep(3000);

//Verify My Account Page is displayed after My account from the list
expect(element(by.xpath(testdata3.LayerSelector.MyAccount_Label)).getText()).toEqual(testdata4.MV_VIEW_MY_ACCOUNT);
browser.sleep(3000);

//Click on 'View All' link under Activity Log in My Account page
element(by.xpath(testdata3.ActivityLog.ViewAll)).click();
browser.sleep(3000);

//Verify the Activity Log page is displayed
expect(element(by.xpath(testdata3.ActivityLog.Title)).isDisplayed()).toBe(true);

// Again click on dropdown arrow to select Offer Store page
element(by.xpath(testdata3.LayerSelector.Dropdown)).click();
browser.sleep(3000);

element(by.xpath(testdata3.LayerSelector.OfferStore)).click();
browser.sleep(3000);

expect(element(by.xpath(testdata3.LayerSelector.OfferStore_Page)).isPresent()).toBe(true);

//Verify the Offer store page is displayed
expect(element(by.xpath(testdata3.ExpiredPasswordPage.WelcomeAccount_Message)).getText()).toContain(testdata5.TEXT_OFFER_STORE);

  //Logout from metraview
 protractor.loginHelpers.logOutMV();

    });
});
