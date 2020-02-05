var testdata = require('../inputs/testdata/Login.json');
var testdata2 =  require('../inputs/testdata/JsonFileCreation.json');
var testdata3 = require('../inputs/testdata/XpathRepository.json');


describe('Subscriptions Widget for Payer related test cases', function () {
   
    it('Login with new user', function () {
    //Input file to refer
    var testdata4 = protractor.loginHelpers.lang;
    browser.refresh();
    browser.sleep(5000);

    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata2.userName,testdata2.passwordField);

    });
    it('Subscriptions widget for payer',function ()
    {
    var testdata4 = protractor.loginHelpers.dashboard();

    browser.sleep(3000);
    var el=element(by.xpath(testdata3.Subscriptions.Title));
    browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
    //validate My Subscriptions text
    expect(element(by.xpath(testdata3.Subscriptions.Title)).getText()).toEqual(testdata4.TEXT_MY_SUBSCRIPTIONS);
    element(by.xpath(testdata3.Subscriptions.ViewAll)).click();
    browser.sleep(2000);
    element.all(by.css("ui-grid-header-cell-label ng-binding")).count().then((n) => {

        for(var i=0;i<n;i++)
         {
            
            items[i].getCssValue('font-weight').then((font) => {
                expect(font).toEqual('700');
            });
            
            
         }
        
   
      });
      element.all(by.css("ui-grid-cell-contents ng-binding ng-scope")).count().then((n) => {

        for(var i=0;i<n;i++)
         {
            
            items[i].getCssValue('padding').then((padding) => {
                expect(padding).toEqual('10px');
            });
            
            
         }
        
   
      });  
      element.all(by.css("ecb-subscriptionsImage-tabularView ng-scope")).count().then((n) => {

        for(var i=0;i<n;i++)
         {
            
            items[i].getCssValue('padding').then((padding) => {
                expect(padding).toEqual('10px');
            });
            
            
         }
        
   
      });  



    //Click on cancel subscription button
   // element(by.xpath(testdata3.Subscriptions.CancelSubscription_Button)).click(); 
   element(by.xpath("//span[contains(text(),'Cancel Subscription')]")).click(); 
    browser.sleep(2000);
    //verify padding at the cancel box

    element(by.css(" div.ebDialogBox-actionBlock.ecb-subscriptionConfirmationFooter")).getCssValue('padding-bottom').then((padding) => {
        expect(padding).toEqual('2px');
    });
    //Verify the Cancel Subscription heading is displayed after click on cancel subscription button
    expect(element(by.xpath(testdata3.Subscriptions.CancelSubscription_Title)).isDisplayed()).toBe(true);
    browser.sleep(3000);
    expect(element(by.xpath(testdata3.Adjustment.Settings)).isDisplayed()).toBe(false);
 
});

});   