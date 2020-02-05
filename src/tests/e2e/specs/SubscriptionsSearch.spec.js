var testdata = require('../inputs/testdata/SubscriptionsSearch.json');
var testdata2 = require('../inputs/testdata/Login.json');
var testdata3 =  require('../inputs/testdata/JsonFileCreation.json');
var testdata4 = require('../inputs/testdata/XpathRepository.json');


describe('Validate Subscription Search in OfferStore Layer', function () {

it('Validate offerstore search subscriptions', function () {
browser.refresh();
browser.sleep(9000);

//Launch to the MV2.0 application
protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
//Login to the MV2.0 application
protractor.loginHelpers.logInMV(testdata3.userName,testdata3.passwordField);

element(by.xpath(testdata4.LayerSelector.Dropdown)).click();
element(by.xpath(testdata4.LayerSelector.OfferStore)).click();
browser.sleep(5000);

browser.actions().mouseMove(element(by.css(testdata4.OfferStore.Search_Field))).perform();
element.all(by.css(testdata4.OfferStore.Search_Field)).then(function(elm){
elm[0].click();
elm[0].sendKeys(testdata.searchname);
}); 

element.all(by.css(testdata4.OfferStore.Search_Button)).then(function(elm){
elm[0].click();
});

// element(by.xpath(testdata4.OfferStore.Search_Button)).click();
browser.sleep(3000);       
console.log('No offers found related to your search please try again');
browser.sleep(1000);

element(by.xpath(testdata4.LayerSelector.Dropdown)).click();
element(by.xpath(testdata4.LayerSelector.Dashboard)).click();
browser.sleep(5000);
    });

it('Validate the offerStore for available offers if no subscription',function(){

  //Input file to refer
var testdata5 = protractor.loginHelpers.lang;
browser.refresh();
browser.sleep(9000);

element(by.xpath(testdata4.SystemBar.Logout)).click();
browser.sleep(5000);

browser.get(testdata3.URL);
browser.sleep(2000);

element(by.css(testdata5)).click();
browser.sleep(3000);

expect(browser.getTitle()).toEqual(testdata2.url.Title);
 var cur = testdata3.CurrentUrl;
 
    //var ul = cur.substring(8, 22);
    var lc = cur.toLowerCase();
   // var k = "https://"+lc+":8080/login";
    expect(browser.getCurrentUrl()).toEqual(lc);

element(by.xpath(testdata4.LoginPage.UserName)).sendKeys(testdata3.userName3);
element(by.xpath(testdata4.LoginPage.Password)).sendKeys(testdata3.passwordField);
browser.findElement(By.xpath(testdata4.LoginPage.LogInButton)).click();
browser.sleep(9000);

element(by.xpath(testdata4.LayerSelector.Dropdown)).click();
element(by.xpath(testdata4.LayerSelector.OfferStore)).click();
browser.sleep(3000);

expect(element(by.xpath(testdata4.OfferStore.Offers_AudioConf)).getText()).toContain(testdata.po_name);

browser.refresh();
browser.sleep(9000);

element(by.xpath(testdata4.SystemBar.Logout)).click();
browser.sleep(5000);

element(by.css(testdata5)).click();
browser.sleep(3000);

//expect(browser.getTitle()).toEqual(testdata2.url.Title);
//expect(browser.getCurrentUrl()).toMatch(testdata3.CurrentUrl);
 var cur = testdata3.CurrentUrl;
 
   // var ul = cur.substring(8, 22);
    var lc = cur.toLowerCase();
    //var k = "https://"+lc+":8080/login";
    expect(browser.getCurrentUrl()).toEqual(lc);

element(by.xpath(testdata4.LoginPage.UserName)).sendKeys(testdata3.userName);
element(by.xpath(testdata4.LoginPage.Password)).sendKeys(testdata3.passwordField);
browser.findElement(By.xpath(testdata4.LoginPage.LogInButton)).click();
browser.sleep(9000);

//Logout from the MV2.0 Application 
protractor.loginHelpers.logOutMV();

    });
});
