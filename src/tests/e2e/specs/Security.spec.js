var testdata = require('../inputs/testdata/Login.json');
var testdata2 = require('../inputs/testdata/Security.json');
var testdata3 = require('../inputs/testdata/JsonFileCreation.json');
var testdata4 = require('../inputs/testdata/XpathRepository.json');

describe('Valdiate the Error messages for invalid Login Attemps Security spec', function () {

it('Logout from the application and Navigate to MetraView URL', function () {
   browser.sleep(5000);
  //Launch to the MV2.0 application
   protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
 
  //Login to the MV2.0 application
   protractor.loginHelpers.logInMV(testdata3.userName,testdata3.passwordField);

    browser.refresh();
    browser.sleep(2000);
    
    element(by.xpath(testdata4.SystemBar.Logout)).click();
    browser.sleep(5000);

    //For language selection
    var testdata5 = protractor.loginHelpers.lang;
    element(by.css(testdata5)).click();

    browser.get(testdata3.URL);
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual(testdata.url.Title);
    });
  })
  describe('login page', function () {
  
it('invalid username and password', function () {

      //Input file to refer
      var testdata5 = protractor.loginHelpers.security();
      var cur = testdata3.CurrentUrl;
      var lc = cur.toLowerCase();
      expect(browser.getCurrentUrl()).toEqual(lc);
   
      //For language selection
      var testdata6 = protractor.loginHelpers.lang;
      element(by.css(testdata6)).click();
  
      element(by.xpath(testdata4.LoginPage.UserName)).sendKeys(testdata2.invalid.invalidusername);
      element(by.xpath(testdata4.LoginPage.Password)).sendKeys(testdata2.invalid.invalidpasswordField);
      expect(element(by.xpath(testdata4.LoginPage.CopyRight)).getText()).toEqual(testdata5.LOGIN_COPYRIGHT);
      browser.findElement(By.xpath(testdata4.LoginPage.LogInButton)).click().then(function () {
      browser.driver.manage().window().maximize();  
      browser.waitForAngular();
      expect(element(by.xpath(testdata4.LoginPage.InvalidCredentials_ErrorMessage)).isDisplayed()).toBe(true);
      browser.sleep(3000);
      expect(element(by.xpath(testdata4.LoginPage.InvalidCredentials_ErrorMessage)).getText()).toContain(testdata5.LOGIN_INVALID_CREDENTIALS);
      element(by.xpath(testdata4.LoginPage.InvalidCredentials_ErrorMessage_CloseButton)).isPresent();
      element(by.xpath(testdata4.LoginPage.InvalidCredentials_ErrorMessage_CloseButton)).click();
      expect(browser.getTitle()).toEqual(testdata.url.Title);
          
    
    });

    browser.sleep(5000);
      
   
});
it('invalid username and empty password', function () {

     //Input file to refer
     var testdata6 = protractor.loginHelpers.security();

     var cur = testdata3.CurrentUrl;
     var lc = cur.toLowerCase();
     expect(browser.getCurrentUrl()).toEqual(lc);

     //For language selection
     var testdata7 = protractor.loginHelpers.lang;
     element(by.css(testdata7)).click();
  
      element(by.xpath(testdata4.LoginPage.UserName)).sendKeys(testdata2.invalid.invalidusername);
      element(by.xpath(testdata4.LoginPage.Password)).sendKeys(testdata2.nodetails.nopasswordField);
      expect(element(by.xpath(testdata4.LoginPage.CopyRight)).getText()).toEqual(testdata6.LOGIN_COPYRIGHT);
      browser.findElement(By.xpath(testdata4.LoginPage.LogInButton)).click().then(function () {
      browser.driver.manage().window().maximize();  
      browser.waitForAngular();
      browser.sleep(3000);
      expect(element(by.xpath(testdata4.LoginPage.Login_Disabled)).getAttribute('disabled')).toBe('true');
      expect(browser.getTitle()).toEqual(testdata.url.Title);
      });

      browser.sleep(5000);
      
   
});
it('empty username and invalid password', function () {

      //Input file to refer
     var testdata7 = protractor.loginHelpers.security();

     var cur = testdata3.CurrentUrl;
     var lc = cur.toLowerCase();
     expect(browser.getCurrentUrl()).toEqual(lc);

      //For language selection
      var testdata8 = protractor.loginHelpers.lang;
      element(by.css(testdata8)).click();
  
      element(by.xpath(testdata4.LoginPage.UserName)).sendKeys(testdata2.nodetails.nousername);
      element(by.xpath(testdata4.LoginPage.Password)).sendKeys(testdata2.invalid.invalidpasswordField);
      expect(element(by.xpath(testdata4.LoginPage.CopyRight)).getText()).toEqual(testdata7.LOGIN_COPYRIGHT);
      browser.findElement(By.xpath(testdata4.LoginPage.LogInButton)).click().then(function () {
      browser.driver.manage().window().maximize();  
      browser.waitForAngular();
      browser.sleep(3000);
      expect(element(by.xpath(testdata4.LoginPage.Login_Disabled)).getAttribute('disabled')).toBe('true');
      expect(browser.getTitle()).toEqual(testdata.url.Title);
      });

      browser.sleep(5000);
      
   
});
it('invalid username and valid password', function () {

     //Input file to refer
     var testdata8 = protractor.loginHelpers.security();

     var cur = testdata3.CurrentUrl;
     var lc = cur.toLowerCase();
     expect(browser.getCurrentUrl()).toEqual(lc);

      //For language selection
      var testdata9 = protractor.loginHelpers.lang;
      element(by.css(testdata9)).click();
  
      element(by.xpath(testdata4.LoginPage.UserName)).sendKeys(testdata2.invalid.invalidusername);
      element(by.xpath(testdata4.LoginPage.Password)).sendKeys(testdata3.passwordField);
      expect(element(by.xpath(testdata4.LoginPage.CopyRight)).getText()).toEqual(testdata8.LOGIN_COPYRIGHT);
      browser.findElement(By.xpath(testdata4.LoginPage.LogInButton)).click().then(function () {
       browser.driver.manage().window().maximize();  
      browser.waitForAngular();
      expect(element(by.xpath(testdata4.LoginPage.InvalidCredentials_ErrorMessage)).isDisplayed()).toBe(true);
      console.log(testdata8.LOGIN_INVALID_CREDENTIALS);
      browser.sleep(3000);
      expect(element(by.xpath(testdata4.LoginPage.InvalidCredentials_ErrorMessage)).getText()).toContain(testdata8.LOGIN_INVALID_CREDENTIALS);
      element(by.xpath(testdata4.LoginPage.InvalidCredentials_ErrorMessage_CloseButton)).isPresent();
      element(by.xpath(testdata4.LoginPage.InvalidCredentials_ErrorMessage_CloseButton)).click();
      expect(browser.getTitle()).toEqual(testdata.url.Title);
      });

      browser.sleep(5000);
      
   
});
it('valid username and invalid password', function () {

  //Input file to refer
  var testdata9 = protractor.loginHelpers.security();

  var cur = testdata3.CurrentUrl;
  var lc = cur.toLowerCase();
  expect(browser.getCurrentUrl()).toEqual(lc);

      //For language selection
      var testdata10 = protractor.loginHelpers.lang;
      element(by.css(testdata10)).click();
  
      element(by.xpath(testdata4.LoginPage.UserName)).sendKeys(testdata3.userName2);
      element(by.xpath(testdata4.LoginPage.Password)).sendKeys(testdata2.invalid.invalidpasswordField);
      expect(element(by.xpath(testdata4.LoginPage.CopyRight)).getText()).toEqual(testdata9.LOGIN_COPYRIGHT);
      browser.findElement(By.xpath(testdata4.LoginPage.LogInButton)).click().then(function () {
      browser.driver.manage().window().maximize();  
      browser.waitForAngular();
      expect(element(by.xpath(testdata4.LoginPage.InvalidCredentials_ErrorMessage)).isDisplayed()).toBe(true);
      console.log(testdata9.LOGIN_INVALID_CREDENTIALS);
      browser.sleep(3000);
      expect(element(by.xpath(testdata4.LoginPage.InvalidCredentials_ErrorMessage)).getText()).toContain(testdata9.LOGIN_INVALID_CREDENTIALS);
      element(by.xpath(testdata4.LoginPage.InvalidCredentials_ErrorMessage_CloseButton)).isPresent();
      element(by.xpath(testdata4.LoginPage.InvalidCredentials_ErrorMessage_CloseButton)).click();
      expect(browser.getTitle()).toEqual(testdata.url.Title);
      });

      browser.sleep(5000);
      
   

    
  });
it('no username and password', function () {

  //Input file to refer
  var testdata10 = protractor.loginHelpers.security();

  var cur = testdata3.CurrentUrl;
  var lc = cur.toLowerCase();
  expect(browser.getCurrentUrl()).toEqual(lc);
    
      //For language selection
      var testdata9 = protractor.loginHelpers.lang;
      element(by.css(testdata9)).click();

    element(by.xpath(testdata4.LoginPage.UserName)).sendKeys(testdata2.nodetails.nousername);
    element(by.xpath(testdata4.LoginPage.Password)).sendKeys(testdata2.nodetails.nopasswordField);
    expect(element(by.xpath(testdata4.LoginPage.CopyRight)).getText()).toEqual(testdata10.LOGIN_COPYRIGHT);
    browser.findElement(By.xpath(testdata4.LoginPage.LogInButton)).click().then(function () {
    browser.driver.manage().window().maximize();  
    browser.waitForAngular();
    console.log('Credentials wrong');
    expect(element(by.xpath(testdata4.LoginPage.Login_Disabled)).getAttribute('disabled')).toBe('true');
    expect(browser.getTitle()).toEqual(testdata.url.Title);
    
    browser.sleep(2000);
    
  });
});
it('valid username and password', function () {

  //Input file to refer
  var testdata11 = protractor.loginHelpers.security();

  var cur = testdata3.CurrentUrl;
  var lc = cur.toLowerCase();
  expect(browser.getCurrentUrl()).toEqual(lc);

    //For language selection
    var testdata9 = protractor.loginHelpers.lang;
    element(by.css(testdata9)).click();

    element(by.xpath(testdata4.LoginPage.UserName)).sendKeys(testdata3.userName);
    element(by.xpath(testdata4.LoginPage.Password)).sendKeys(testdata3.passwordField);
    expect(element(by.xpath(testdata4.LoginPage.CopyRight)).getText()).toEqual(testdata11.LOGIN_COPYRIGHT);
    browser.findElement(By.xpath(testdata4.LoginPage.LogInButton)).click().then(function () {
    browser.driver.manage().window().maximize();  
    browser.waitForAngular();
    browser.sleep(6000);
    expect(element(by.xpath(testdata4.SystemBar.Exist)).isPresent()).toBe(true);
    browser.sleep(5000);
    var cur = testdata3.DashBoardURL;
    var lc = cur.toLowerCase();
    expect(browser.getCurrentUrl()).toEqual(lc);
    element(by.xpath(testdata4.SystemBar.Logout)).click();
    browser.sleep(2000);
    expect(browser.getTitle()).toEqual(testdata.url.Title);
    
  });
});
 
});
