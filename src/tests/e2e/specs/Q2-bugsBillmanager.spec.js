var fs = require('fs');
var testdata4 = require('../inputs/testdata/XpathRepository.json');
var testdata = require('../inputs/testdata/TreeViewScenario3.json');
var testdata2 = require('../inputs/testdata/JsonFileCreation.json');
describe('Bill Manager related test cases', function () {

it('Validate the name in system bar fro corporate as well as core accounts', function () {
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata.corporateAccountUserName,testdata.passwordField);
    browser.driver.manage().window().maximize();
     browser.sleep(5000);
     //verify the welcome message with company name
     expect(element(by.css(testdata4.LoginPage.welcome)).getText()).
     toEqual("Welcome"+' '+ testdata.CompanyCorporate);
    element(by.css(testdata4.SystemBar.Accountname)).click();
    browser.sleep(2000);
    expect(element(by.css(testdata4.SystemBar.AccountNameDropdown)).getText()).toEqual(testdata.FirstNameCorporate+" "+ testdata.LastNameCorporate);

    //Launch to the MV2.0 application for core1
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata.core3AccountUserName,testdata.passwordField);
    //verify the welcome message with company name
expect(element(by.css(testdata4.LoginPage.welcome)).getText()).toEqual("Welcome"+" "+ testdata.CompanyCorporate);
    element(by.css(testdata4.SystemBar.Accountname)).click();
    browser.sleep(2000);
    expect(element(by.css(testdata4.SystemBar.AccountNameDropdown)).getText()).toEqual(testdata.FirstNameCoresub5+" "+testdata.LastNameCoresub5);

    //Launch to the MV2.0 application for core2
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata.core5AccountUserName,testdata.passwordField);
    //verify the welcome message with company name
    expect(element(by.css(testdata4.LoginPage.welcome)).getText()).toEqual("Welcome"+" "+  testdata.CompanyCorporate);
    element(by.css(testdata4.SystemBar.Accountname)).click();
    browser.sleep(2000);
expect(element(by.css(testdata4.SystemBar.AccountNameDropdown)).getText()).toEqual(testdata.FirstNameCoresub2+" " +testdata.LastNameCoresub2);
    
}); 

it('Validate the name in system bar fro corporate as well as core accountss', function () {

    //updating the system bar name as company name
    var rawdata2 = require(protractor.loginHelpers.commonconfig());
    console.log('rawdata2', rawdata2);
    //add  and remove company name in json
    rawdata2.displayName.rule.systemBarName.unshift(["company"]);
    rawdata2.displayName.rule.welcomeName.shift(["company"]);
    rawdata2.displayName.rule.accountNameinDropdown.shift(["firstName","lastName"]);
    console.log(rawdata2);
    fs.writeFile(protractor.loginHelpers.commonconfig(), JSON.stringify(rawdata2, null, 2), 'utf8', function(err, data) {
        if (err) {
            console.log(err);
        }
    });

    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata.corporateAccountUserName,testdata.passwordField);
    browser.driver.manage().window().maximize();
     browser.sleep(2000);
expect(element(by.css(testdata4.SystemBar.Accountname)).getText()).toEqual(testdata.CompanyCorporate);
expect(element(by.css(testdata4.LoginPage.welcome)).getText()).toEqual("Welcome"+' '+ testdata.FirstNameCorporate+' '+testdata.LastNameCorporate );
element(by.css(testdata4.SystemBar.Accountname)).click();
    browser.sleep(2000);
expect(element(by.css(testdata4.SystemBar.AccountNameDropdown)).getText()).toEqual(testdata.FirstNameCorporate);

  //Launch to the MV2.0 application for core1
  protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
  //Login to the MV2.0 application
  protractor.loginHelpers.logInMV(testdata.core4AccountUserName,testdata.passwordField);
  browser.driver.manage().window().maximize();
  browser.sleep(2000);
expect(element(by.css(testdata4.SystemBar.Accountname)).getText()).toEqual(testdata.CompanyCorporate);
expect(element(by.css(testdata4.LoginPage.welcome)).getText()).toEqual("Welcome"+' '+ testdata.FirstNameCoresub1+' '+testdata.LastNameCoresub1);
element(by.css(testdata4.SystemBar.Accountname)).click();
 browser.sleep(2000);
expect(element(by.css(testdata4.SystemBar.AccountNameDropdown)).getText()).toEqual(testdata.FirstNameCoresub1);

 //Launch to the MV2.0 application for core2
 protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
 //Login to the MV2.0 application
 protractor.loginHelpers.logInMV(testdata.core5AccountUserName,testdata.passwordField);
 browser.driver.manage().window().maximize();
  browser.sleep(2000);
expect(element(by.css(testdata4.SystemBar.Accountname)).getText()).toEqual(testdata.CompanyCorporate);
expect(element(by.css(testdata4.LoginPage.welcome)).getText()).toEqual("Welcome"+' '+ testdata.FirstNameCoresub2+' '+testdata.LastNameCoresub2);
element(by.css(testdata4.SystemBar.Accountname)).click();
 browser.sleep(2000);
expect(element(by.css(testdata4.SystemBar.AccountNameDropdown)).getText()).toEqual(testdata.FirstNameCoresub2);





});
it('Validate the username in system bar', function () {
    //updating the system bar name as firstname
    var rawdata2 = require(protractor.loginHelpers.commonconfig());
    console.log('rawdata2', rawdata2);
    rawdata2.displayName.rule.systemBarName.unshift(["firstName"]);
    rawdata2.displayName.rule.welcomeName.shift(["firstName","lastName"]);
    rawdata2.displayName.rule.accountNameinDropdown.shift(["firstName"]);
    console.log(rawdata2);
    fs.writeFile(protractor.loginHelpers.commonconfig(), JSON.stringify(rawdata2, null, 2), 'utf8', function(err, data) {
        if (err) {
            console.log(err);
        }
    });
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata.corporateAccountUserName,testdata.passwordField);
    browser.driver.manage().window().maximize();
     browser.sleep(3000);
   expect(element(by.css(testdata4.SystemBar.Accountname)).getText()).toEqual(testdata.FirstNameCorporate);
   expect(element(by.css(testdata4.LoginPage.welcome)).getText()).toEqual("Welcome"+' '+ testdata.FirstNameCorporate);
    element(by.css(testdata4.SystemBar.Accountname)).click();
    browser.sleep(2000);
   expect(element(by.css(testdata4.SystemBar.AccountNameDropdown)).getText()).toEqual(testdata.LastNameCorporate);

    //Launch to the MV2.0 application for core1
  protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
  //Login to the MV2.0 application
  protractor.loginHelpers.logInMV(testdata.core4AccountUserName,testdata.passwordField);
  browser.driver.manage().window().maximize();
     browser.sleep(2000);
   expect(element(by.css(testdata4.SystemBar.Accountname)).getText()).toEqual(testdata.FirstNameCoresub1);
   expect(element(by.css(testdata4.LoginPage.welcome)).getText()).toEqual("Welcome"+' '+ testdata.FirstNameCoresub1);
    element(by.xpath(testdata4.SystemBar.AccountName)).click();
    browser.sleep(2000);
   expect(element(by.css(testdata4.SystemBar.Accountname)).getText()).toEqual(testdata.FirstNameCoresub1);

   //Launch to the MV2.0 application for core2
 protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
 //Login to the MV2.0 application
 protractor.loginHelpers.logInMV(testdata.core5AccountUserName,testdata.passwordField);
 browser.driver.manage().window().maximize();
     browser.sleep(2000);
   expect(element(by.css(testdata4.SystemBar.Accountname)).getText()).toEqual(testdata.FirstNameCoresub2);
   expect(element(by.css(testdata4.LoginPage.welcome)).getText()).toEqual("Welcome"+' '+  testdata.FirstNameCoresub2);
    element(by.xpath(testdata4.SystemBar.AccountName)).click();
    browser.sleep(2000);
   expect(element(by.css(testdata4.SystemBar.Accountname)).getText()).toEqual(testdata.FirstNameCoresub2);





});
it('Validate the username in system bar', function () {
   //updating the system bar name as Lastname
   var rawdata2 = require(protractor.loginHelpers.commonconfig());
    console.log('rawdata2', rawdata2);
   rawdata2.displayName.rule.systemBarName.unshift(["lastName"]);
   rawdata2.displayName.rule.welcomeName.shift(["firstName"]);
   rawdata2.displayName.rule.accountNameinDropdown.shift(["lastName"]);
   console.log(rawdata2);
   fs.writeFile(protractor.loginHelpers.commonconfig(), JSON.stringify(rawdata2, null, 2), 'utf8', function(err, data) {
       if (err) {
           console.log(err);
       }
   });
   //Launch to the MV2.0 application
   protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
   //Login to the MV2.0 application
   protractor.loginHelpers.logInMV(testdata.corporateAccountUserName,testdata.passwordField);
   browser.driver.manage().window().maximize();
    browser.sleep(2000);
expect(element(by.css(testdata4.SystemBar.Accountname)).getText()).toEqual(testdata.LastNameCorporate);
expect(element(by.css(testdata4.LoginPage.welcome)).getText()).toEqual("Welcome"+' '+ testdata.LastNameCorporate);
expect(element(by.css(testdata4.LoginPage.welcome)).getText()).toEqual("Welcome"+' '+ testdata.LastNameCorporate);
element(by.css(testdata4.SystemBar.Accountname)).click();
    browser.sleep(2000);
expect(element(by.css(testdata4.SystemBar.AccountNameDropdown)).getText()).toEqual(testdata.CompanyCorporate);

//Launch to the MV2.0 application for core1
protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
//Login to the MV2.0 application
protractor.loginHelpers.logInMV(testdata.core5AccountUserName,testdata.passwordField);
browser.driver.manage().window().maximize();
browser.sleep(2000);
expect(element(by.css(testdata4.SystemBar.Accountname)).getText()).toEqual(testdata.LastNameCoresub2);
expect(element(by.css(testdata4.LoginPage.welcome)).getText()).toEqual("Welcome"+' '+ testdata.LastNameCoresub2);
expect(element(by.css(testdata4.LoginPage.welcome)).getText()).toEqual("Welcome"+' '+ testdata.LastNameCoresub2);
element(by.css(testdata4.SystemBar.Accountname)).click();
browser.sleep(2000);
expect(element(by.css(testdata4.SystemBar.AccountNameDropdown)).getText()).toEqual(testdata.CompanyCorporate);


//Launch to the MV2.0 application for core2
protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
//Login to the MV2.0 application
protractor.loginHelpers.logInMV(testdata.core5AccountUserName,testdata.passwordField);
browser.driver.manage().window().maximize();
browser.sleep(2000);
expect(element(by.css(testdata4.SystemBar.Accountname)).getText()).toEqual(testdata.LastNameCoresub2);
expect(element(by.css(testdata4.LoginPage.welcome)).getText()).toEqual("Welcome"+' '+ testdata.LastNameCoresub2);
expect(element(by.css(testdata4.LoginPage.welcome)).getText()).toEqual("Welcome"+' '+ testdata.LastNameCoresub2);
element(by.css(testdata4.SystemBar.Accountname)).click();
browser.sleep(2000);
expect(element(by.css(testdata4.SystemBar.AccountNameDropdown)).getText()).toEqual(testdata.CompanyCorporate);



});/*
it('Validate the username in system bar', function () {
  //updating the system bar name as firstName and Lastname
  var rawdata2 = require(protractor.loginHelpers.commonconfig());
    console.log('rawdata2', rawdata2);
  rawdata2.displayName.rule.systemBarName.unshift(["firstName","lastName"]);
  rawdata2.displayName.rule.welcomeName.shift(["lastName"]);
  rawdata2.displayName.rule.accountNameinDropdown.shift(["company"]);
  
  console.log(rawdata2);
  fs.writeFile(protractor.loginHelpers.commonconfig(), JSON.stringify(rawdata2, null, 2), 'utf8', function(err, data) {
      if (err) {
          console.log(err);
      }
  });
  //Launch to the MV2.0 application
  protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
  //Login to the MV2.0 application
  protractor.loginHelpers.logInMV(testdata.corporateAccountUserName,testdata.passwordField);
  browser.driver.manage().window().maximize();
   browser.sleep(2000);
expect(element(by.css(testdata4.SystemBar.Accountname)).getText()).toEqual(testdata.FirstNameCore2+' '+testdata.LastNameCore2);
expect(element(by.css(testdata4.LoginPage.welcome)).getText()).toEqual("Welcome"+' '+ testdata.corporateAccountUserName);
element(by.css(testdata4.SystemBar.Accountname)).click();
    browser.sleep(2000);
expect(element(by.css(testdata4.SystemBar.AccountNameDropdown)).getText()).toEqual(testdata.corporateAccountUserName);


//Launch to the MV2.0 application for core1
protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
//Login to the MV2.0 application
protractor.loginHelpers.logInMV(testdata.core4AccountUserName,testdata.passwordField);
browser.driver.manage().window().maximize();
browser.sleep(2000);
expect(element(by.css(testdata4.SystemBar.Accountname)).getText()).toEqual();
expect(element(by.css(testdata4.LoginPage.welcome)).getText()).toEqual("Welcome"+ testdata.core4AccountUserName);
element(by.css(testdata4.SystemBar.Accountname)).click();
 browser.sleep(2000);
expect(element(by.css(testdata4.SystemBar.AccountNameDropdown)).getText()).toEqual(testdata.core4AccountUserName);

//Launch to the MV2.0 application for core2
protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
//Login to the MV2.0 application
protractor.loginHelpers.logInMV(testdata.core2AccountUserName,testdata.passwordField);
browser.driver.manage().window().maximize();
browser.sleep(2000);
expect(element(by.css(testdata4.SystemBar.Accountname)).getText()).toEqual(testdata.FirstNameCoresub5+' '+testdata.LastNameCoresub5);
expect(element(by.css(testdata4.LoginPage.welcome)).getText()).toEqual("Welcome"+ testdata.FirstNameCoresub5);
element(by.css(testdata4.SystemBar.Accountname)).click();
 browser.sleep(2000);
expect(element(by.css(testdata4.SystemBar.AccountNameDropdown)).getText()).toEqual(testdata.core2AccountUserName);



});*/

});

