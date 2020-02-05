var sEndDate="01/01/2106 12:00:00 AM";
var testdata = require('../inputs/testdata/XpathRepository.json');
var testdata3 =  require('../inputs/testdata/JsonFileCreation.json');

describe('Cancel Subscription Hover related test case', function () {

it('Validate cancelsubscription after hover', function () {
  browser.refresh();
    browser.sleep(5000);

    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata3.userName,testdata3.passwordField);

    expect(element(by.xpath(testdata.Subscriptions.Title)).isDisplayed()).toBe(true);
    
    //Perform mouse over on the subscription widget
    browser.actions().mouseMove(element(by.xpath(testdata.Subscriptions.Hover_PO))).perform();
    browser.sleep(3000);
    //Validate the cancel subscription button is present after hover in my subscription widget
    expect(element(by.xpath(testdata.Subscriptions.CancelSubscription_Button)).isDisplayed()).toBe(true);
    browser.sleep(3000);

    //Click on cancel subscription button
    element(by.xpath(testdata.Subscriptions.CancelSubscription_Button)).click();  
    browser.sleep(2000);
    //Verify the Cancel Subscription heading is displayed after click on cancel subscription button
    expect(element(by.xpath(testdata.Subscriptions.CancelSubscription_Title)).isDisplayed()).toBe(true);
    browser.sleep(3000);

    //Click on View all link in My subscription widget
    element(by.xpath(testdata.Subscriptions.ViewAll)).click();  
    browser.sleep(4000);

    //Validate the End date in the My Subscription page
    element.all(by.xpath(testdata.MySubscriptions.EndDate_Value)).then(function(items) {
      expect(items[2].getText()).toEqual(sEndDate);
      });
    
    //Logout from the MV2.0 Application 
    protractor.loginHelpers.logOutMV();
               
  });

});