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

    browser.get(testdata2.URL);
    browser.sleep(2000);
    element(by.css(testdata4)).click();
    browser.sleep(3000);
    expect(browser.getTitle()).toEqual(testdata.url.Title);
    var cur = testdata2.CurrentUrl;
 
    //var ul = cur.substring(8, 22);
    var lc = cur.toLowerCase();
    //var k = "https://"+lc+":8080/login";
    expect(browser.getCurrentUrl()).toEqual(lc);
    element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata2.userName3);
    element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata2.passwordField);
    browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();

    browser.sleep(25000);
    });

    it('Subscriptions widget for payer',function ()
    {
    var testdata4 = protractor.loginHelpers.dashboard();

    browser.sleep(3000);
    var el=element(by.xpath(testdata3.Subscriptions.Title));
    browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
    //validate My Subscriptions text
    expect(element(by.xpath(testdata3.Subscriptions.Title)).getText()).toEqual(testdata4.TEXT_MY_SUBSCRIPTIONS);
    //There should be a message saying that there are no active subscriptions
    expect(element(by.xpath(testdata3.Subscriptions.NoSubscriptions_Label)).isDisplayed()).toBe(true);
    expect(element(by.xpath(testdata3.Subscriptions.AddSubscription_Link)).isDisplayed()).toBe(true);

    //There shouldn be any option to add subscriptions under subscriptions
    element(by.xpath(testdata3.Subscriptions.AddSubscription_Link)).click();
    browser.sleep(3000);
    element(by.xpath(testdata3.OfferStore.AddIcon)).click();
    element(by.xpath(testdata3.OfferStore.AddSubscription_Button)).click();

    browser.refresh();
    browser.sleep(12000);
    //Drag down to the end of the page
    var el=element(by.xpath(testdata3.Subscriptions.Title));
    browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());

    //Mouse Hover for cancel subscription
    browser.actions().mouseMove(element(by.xpath(testdata3.Subscriptions.Hover_PO))).perform();
    element(by.xpath(testdata3.Subscriptions.CancelSubscription_Button)).click();

    //There shouldn t be any option to delete any existing subscriptions under subscriptions
    expect(element(by.xpath(testdata3.Subscriptions.CancelSubscription_Title)).isDisplayed()).toBe(true);

    element(by.xpath(testdata3.Subscriptions.CancelSubscription_OK)).click();

    //Logout from the MV2.0 Application 
    protractor.loginHelpers.logOutMV();

    });

});

