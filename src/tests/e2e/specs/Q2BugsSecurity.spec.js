var testData = require('../inputs/testData/EditAccountInfo.json');
var testData1 = require('../inputs/testData/XpathRepository.json');
var testdata2 = require('../inputs/testdata/Login.json');
var testdata4 = require('../inputs/testdata/JsonFileCreation.json');
var err;
describe('R2 Test Cases MyAccount in MetraView', function () {
//MVIEW-2959
  it('Validate Security On Edit functionality and select security question from dropdown', function () {


    //Input file to refer
    var testData3 = protractor.loginHelpers.dashboard();
  
    browser.refresh();
    browser.sleep(10000);
  
    //Launch to the MV2.0 application
  protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
  
  //Login to the MV2.0 application
  protractor.loginHelpers.logInMV(testdata4.userName,testdata4.passwordField);
  
    //Redirecting to My Account
    element(by.xpath(testData1.LayerSelector.Dropdown)).click();
    element(by.xpath(testData1.LayerSelector.MyAccount)).click();
    browser.sleep(2000);
  
    //Click on Security On to Update Security Question and answer
    element(by.xpath(testData1.AccountsSettings.EditSecurityOn)).click();
    browser.sleep(2000);
  
    //Select Security Question
    element(by.xpath(testData1.AccountsSettings.SecurityQuestionDropdown)).click();
    browser.sleep(2000);
    element(by.xpath(testData1.AccountsSettings.SelectFirstSecurityQuestion)).click();
    browser.sleep(3000);
  
    //Enter the answer
    element(by.xpath(testData1.AccountsSettings.EnterSecurityAnswer)).clear();    
    element(by.xpath(testData1.AccountsSettings.EnterSecurityAnswer)).sendKeys(testData.SecurityQuestionAnswer);
    browser.sleep(3000);
  
    //Click on Save button
    element(by.xpath(testData1.AccountInformation.Edit_Save)).click();
  
    //Validate that Security Question is updated successfully
    expect(element(by.xpath(testData1.AccountInformation.ToastMsg_Success)).getText()).toEqual(testData3.TEXT_ACCOUNT_SECURITY_UPDATE_SUCCESSFUL);
  
  
    });
   
  it('Validate Security On Edit functionality and select None from dropdown', function () {

    //Input file to refer
    var testData3 = protractor.loginHelpers.dashboard();
    
  
    browser.refresh();
    browser.sleep(10000);
  
   
    //Redirecting to My Account
    element(by.xpath(testData1.LayerSelector.Dropdown)).click();
    element(by.xpath(testData1.LayerSelector.MyAccount)).click();
    browser.sleep(2000);
  
    //Click on Security On to Update Security Question and answer
    element(by.xpath(testData1.AccountsSettings.EditSecurityOn)).click();
    browser.sleep(2000);
  
    //Select Security Question
    element(by.xpath(testData1.AccountsSettings.SecurityQuestionDropdown)).click();
    browser.sleep(2000);
    element(by.xpath(testData1.AccountsSettings.SelectFirstSecurityNone)).click();
    browser.sleep(3000);
  
    
  
    //Click on Save button
    element(by.xpath(testData1.AccountInformation.Edit_Save)).click();
  
    //Validate that Security Question is updated successfully
    expect(element(by.xpath(testData1.AccountInformation.ToastMsg_Success)).getText()).toEqual(testData3.TEXT_ACCOUNT_SECURITY_UPDATE_SUCCESSFUL);
  
  
    });
    it('Validate Security On Edit functionality and answr custom security question', function () {


      //Input file to refer
      var testData3 = protractor.loginHelpers.dashboard();
    
      browser.refresh();
      browser.sleep(10000);
    
      
      //Redirecting to My Account
      element(by.xpath(testData1.LayerSelector.Dropdown)).click();
      element(by.xpath(testData1.LayerSelector.MyAccount)).click();
      browser.sleep(2000);
    
      //Click on Security On to Update Security Question and answer
      element(by.xpath(testData1.AccountsSettings.EditSecurityOn)).click();
      browser.sleep(2000);
    
      //enter custom security question
      element(by.css(testData1.AccountsSettings.CustomSecurityQuestion)).sendKeys('whats your company?');
    
      //Enter the answer
      element(by.xpath(testData1.AccountsSettings.EnterSecurityAnswer)).clear();    
      element(by.xpath(testData1.AccountsSettings.EnterSecurityAnswer)).sendKeys(testData.SecurityQuestionAnswer);
      browser.sleep(3000);
    
      //Click on Save button
      element(by.xpath(testData1.AccountInformation.Edit_Save)).click();
    
      //Validate that Security Question is updated successfully
      expect(element(by.xpath(testData1.AccountInformation.ToastMsg_Success)).getText()).toEqual(testData3.TEXT_ACCOUNT_SECURITY_UPDATE_SUCCESSFUL);
    
    
      });
  



    

  it('Validate error message ', function () {

  
  //Input file to refer
  var testData3 = protractor.loginHelpers.dashboard();

  browser.refresh();
  browser.sleep(10000);

 

  //Redirecting to My Account
  element(by.xpath(testData1.LayerSelector.Dropdown)).click();
  element(by.xpath(testData1.LayerSelector.MyAccount)).click();
  browser.sleep(2000);

  //Click on Security On to Update Security Question and answer
  element(by.xpath(testData1.AccountsSettings.EditSecurityOn)).click();
  browser.sleep(2000);

  //Select Security Question
  element(by.xpath(testData1.AccountsSettings.SecurityQuestionDropdown)).click();
  browser.sleep(2000);
  element(by.xpath(testData1.AccountsSettings.SelectFirstSecurityQuestion)).click();
  browser.sleep(3000);

  //Enter the answer
  element(by.xpath(testData1.AccountsSettings.EnterSecurityAnswer)).clear();    
  element(by.xpath(testData1.AccountsSettings.EnterSecurityAnswer)).sendKeys(testData.SecurityQuestionAnswer);
  browser.sleep(3000);
  //enter custom security question
  element(by.css(testData1.AccountsSettings.CustomSecurityQuestion)).sendKeys('whats your company?');

  //Click on Save button
  element(by.xpath(testData1.AccountInformation.Edit_Save)).click();
  
  // catch the error message
   err = element(by.xpath(testData1.LoginPage.InvalidCredentials_ErrorMessage)).getText();
   expect(err).toContain('Could not save edits. Unable to set both the Security Question and the Custom Security Question.');

  });

});