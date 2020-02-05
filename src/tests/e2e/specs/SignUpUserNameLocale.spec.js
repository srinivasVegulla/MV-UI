var testdata = require('../inputs/testdata/Login.json');
var testdata2 = require('../inputs/testdata/XpathRepository.json');
var testdata8 = require('../inputs/testdata/ForgotPassword.json');
describe('UI Baseline App', function () {
//MVIEW-2653-'New Account Sign Up' dialog: error is displayed when entering User Name in local languages
it('"New Account Sign Up" dialog: error is displayed when entering User Name in local languages', function () {

    //Input file to refer
    var testdata6 = protractor.loginHelpers.security();
    var data2=protractor.loginHelpers.randomNumber();

    browser.refresh();
    browser.sleep(5000);

    browser.get(testdata.url.URL);
    browser.sleep(2000);

    //For language selection
    var testdata10 = protractor.loginHelpers.lang;
    element(by.css(testdata10)).click();

    expect(browser.getTitle()).toEqual(testdata.url.Title);
    expect(browser.getCurrentUrl()).toMatch(testdata.url.CurrentUrl);
    browser.sleep(8000);

    //click on signup button
    element(by.xpath(testdata2.LoginPage.SignUpButton)).click();
    browser.sleep(3000);
    browser.actions().mouseMove(element(by.xpath(testdata2.SignUpPage.Title))).perform();

    //There should be a heading New Account Sign Up
    expect(element(by.xpath(testdata2.SignUpPage.Title)).isDisplayed()).toBe(true);
    browser.driver.manage().window().maximize();

    var testdata4 = protractor.loginHelpers.langCode;
    function localizedvalue(testdata4){
    var testdata7 =testdata6.LOGIN_VALIDATION_PATTERN_USERNAME;
          switch (testdata4) {
            
            case "FR":
            var userName1=testdata8.French+data2;
            console.log(userName1);
            element(by.xpath(testdata2.SignUpPage.UserName_Input)).sendKeys(userName1);
            element(by.xpath(testdata2.SignUpPage.Email_Input)).click();
            //Validating that invalid username error message is not appeared under username field 
            expect(element(by.xpath(testdata2.SignUpPage.Common+testdata7+testdata2.ChildAccounts.CloseXpath)).isPresent()).not.toBe(true);
            break;

            case "DE":
            var userName1=testdata8.German+data2;
            console.log(userName1);
            element(by.xpath(testdata2.SignUpPage.UserName_Input)).sendKeys(userName1);
            element(by.xpath(testdata2.SignUpPage.Email_Input)).click();
            //Validating that invalid username error message is not appeared under username field
            expect(element(by.xpath(testdata2.SignUpPage.Common+testdata7+testdata2.ChildAccounts.CloseXpath)).isPresent()).not.toBe(true);
            break;

            case "ES":
            var userName1=testdata8.Spanish+data2;
            console.log(userName1);
            element(by.xpath(testdata2.SignUpPage.UserName_Input)).sendKeys(userName1);
            element(by.xpath(testdata2.SignUpPage.Email_Input)).click();
            //Validating that invalid username error message is not appeared under username field
            expect(element(by.xpath(testdata2.SignUpPage.Common+testdata7+testdata2.ChildAccounts.CloseXpath)).isPresent()).not.toBe(true);
            break;

            case "JP":
            var userName1=testdata8.Japanese+data2;
            console.log(userName1);
            element(by.xpath(testdata2.SignUpPage.UserName_Input)).sendKeys(userName1);
            element(by.xpath(testdata2.SignUpPage.Email_Input)).click();
            //Validating that invalid username error message is not appeared under username field
            expect(element(by.xpath(testdata2.SignUpPage.Common+testdata7+testdata2.ChildAccounts.CloseXpath)).isPresent()).not.toBe(true);
            break;

            case "BR":
            var userName1=testdata8.Portuguese+data2;
            console.log(userName1);
            element(by.xpath(testdata2.SignUpPage.UserName_Input)).sendKeys(userName1);
            element(by.xpath(testdata2.SignUpPage.Email_Input)).click();
            //Validating that invalid username error message is not appeared under username field
            expect(element(by.xpath(testdata2.SignUpPage.Common+testdata7+testdata2.ChildAccounts.CloseXpath)).isPresent()).not.toBe(true);
            break;
    
            case "EG":
            var userName1=testdata8.Arabic+data2;
            console.log(userName1);
            element(by.xpath(testdata2.SignUpPage.UserName_Input)).sendKeys(userName1);
            element(by.xpath(testdata2.SignUpPage.Email_Input)).click();
            //Validating that invalid username error message is not appeared under username field
            expect(element(by.xpath(testdata2.SignUpPage.Common+testdata7+testdata2.ChildAccounts.CloseXpath)).isPresent()).not.toBe(true);
            break;
       }
      }
      localizedvalue(testdata4);
    });
}); 
