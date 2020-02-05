var testdata1 = require('../inputs/testdata/Login.json');
var testdata2 = require('../inputs/testdata/JsonFileCreation.json');
var testdata3 = require('../inputs/testdata/XpathRepository.json');

describe('Verify the Login page is displayed properly after the session time-out in metraView', function(){

it('Verify the Login page is displayed properly after the session time-out', function(){ 

    //ESR-10525/ 001_Verify_login_page_displayed_proper_with_image
    //Refreshing the page
    browser.refresh();

    //Wait for the session time-out to happen
    browser.sleep(1600000);  
    browser.refresh();
    browser.sleep(5000);

 
    //After session timeout, verify the Login page is displayed properly with the image, the necessary input fields, buttons and links.
    expect(browser.getTitle()).toEqual(testdata1.url.Title);
    var cur = testdata2.CurrentUrl;
 
    //    var ul = cur.substring(8, 22);
        var lc = cur.toLowerCase();
        
        expect(browser.getCurrentUrl()).toEqual(lc);
    expect(element(by.xpath(testdata3.LoginPage.UserName)).isDisplayed()).toBe(true);
    expect(element(by.xpath(testdata3.LoginPage.Password)).isDisplayed()).toBe(true);
    expect(element(by.xpath(testdata3.LoginPage.LogInButton)).isDisplayed()).toBe(true);
    expect(element(by.xpath(testdata3.LoginPage.ForgotPassword_Link)).isDisplayed()).toBe(true);
    expect(element(by.xpath(testdata3.LoginPage.Login_Image)).isDisplayed()).toBe(true);

});

it('Should render login page', function () {

    //For language selection
    var testdata9 = protractor.loginHelpers.lang;
  
    browser.get(testdata2.URL);
    browser.sleep(2000);
  
    element(by.css(testdata9)).click();
  
    expect(browser.getTitle()).toEqual(testdata1.url.Title);
    var cur = testdata2.CurrentUrl;
 
//    var ul = cur.substring(8, 22);
    var lc = cur.toLowerCase();
    
    expect(browser.getCurrentUrl()).toEqual(lc);
   // expect(browser.getCurrentUrl()).toMatch(testdata2.CurrentUrl);
    element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata2.userName);
    element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata2.passwordField);
    browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
    browser.sleep(12000);  
    browser.driver.manage().window().maximize();
    browser.sleep(7000);
    
  //Logout from metraview
  protractor.loginHelpers.logOutMV();
  
  });

});