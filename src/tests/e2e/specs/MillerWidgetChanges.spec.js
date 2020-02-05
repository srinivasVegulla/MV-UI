var testData1=require('../inputs/testdata/Login.json');
var testData2=require('../inputs/testdata/JsonFileCreation.json');
var testdata3 = require('../inputs/testdata/XpathRepository.json');

describe('Verify Miller Widget related Functionalities', function()
{
  it('Verify that user is not subscribed to any PO/bundle.Validate usage charge by default',function()
   {
      var testdata4 = protractor.loginHelpers.dashboard();
      var testdata5 = protractor.loginHelpers.lang;

      //Test Case: MetraView_2.0/ Miller_widget_changes/ 003_user_is_not_subscribed_to_any_PObundle.
      //Verify that, if user is not subscribed to any PO/bundle then Validate usage charge by default
       // Refreshing the page
       browser.refresh();
       browser.sleep(6000);  
       
       //Launch to the MV2.0 application
      protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
      //Login to the MV2.0 application
      protractor.loginHelpers.logInMV(testData2.userName,testData2.passwordField);

      //Loading the Login Page
       browser.get(testData2.URL);
       browser.sleep(5000);
       element(by.css(testdata5)).click();
       browser.sleep(3000);

       //Login to Metraview with Corporate Account(not subscribed to any PO) 
       element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testData2.userName12);
       element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testData2.passwordField);
       browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
       browser.sleep(12000);
      
      //Click on Go to Bills Link
      element(by.xpath(testdata3.Billing.GoToBillsButton)).click();
      browser.sleep(8000);

      //Verify User should not able to see any charges for any bundle/PO 
      expect(element(by.xpath(testdata3.Billing.MySubscription_NoSubscriptionText)).getText()).toEqual(testdata4.TEXT_NO_SUBSCRIPTION);
      browser.sleep(3000);
      expect(element(by.xpath(testdata3.Billing.ChargesSummary_NoChargesText)).getText()).toEqual(testdata4.TEXT_NO_OFFERS);

      // Log Out from Application
      browser.findElement(by.xpath(testdata3.SystemBar.Logout)).click();
      browser.sleep(2000);
   });

});