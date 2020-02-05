var testdata = require('../inputs/testdata/ActivityLogUpdating.json');
var testdata1 = require('../inputs/testdata/Login.json');
var testdata2 =require('../inputs/testdata/JsonFileCreation.json');
var testdata4 =require('../inputs/testdata/XpathRepository.json');

describe('Verify Activity Log widget is updated', function () {

  it('validate update account in activitylog', function () {

    var testdata5=protractor.loginHelpers.dashboard();
    browser.refresh();
    browser.sleep(3000);

   //Launch to the MV2.0 application
   protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);

    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata2.userName,testdata2.passwordField);

    //validating edit button  and click on edit button
    element(by.xpath(testdata4.AccountInformation.EditLink)).click();
    browser.sleep(3000);
    expect(element(by.xpath(testdata4.AccountInformation.Edit_Title)).getText()).toEqual(testdata5.TEXT_EDIT_ACCOUNT_INFORMATION);
    //updating phn no
    expect(element(by.xpath(testdata4.AccountInformation.Edit_Phone_Label)).getText()).toEqual(testdata5.TEXT_PHONE);
    browser.sleep(1000);
    expect(element(by.xpath(testdata4.AccountInformation.Edit_Phone_Value)).isDisplayed()).toBe(true);
    browser.sleep(1000);
    element(by.xpath(testdata4.AccountInformation.Edit_Phone_Value)).clear();
    browser.sleep(1000);
    element(by.xpath(testdata4.AccountInformation.Edit_Phone_Value)).sendKeys(testdata.newno);
    browser.sleep(1000);
    element(by.xpath(testdata4.AccountInformation.Edit_Country_Value)).click();
    browser.sleep(500);
    element(by.xpath(testdata4.AccountInformation.Edit_Country_Bangladesh)).click();
    browser.sleep(500);
    element(by.xpath(testdata4.AccountInformation.Edit_Country_Value)).click();
    browser.sleep(500);
    element(by.xpath(testdata4.AccountInformation.Edit_Country_Armenia)).click();
    browser.sleep(500);
    element(by.xpath(testdata4.AccountInformation.Edit_Country_Value)).click();
    browser.sleep(500);
    element(by.xpath(testdata4.AccountInformation.Edit_Country_Bangladesh)).click();
    browser.sleep(1000);
    expect(element(by.xpath(testdata4.AccountInformation.Edit_Save)).isDisplayed()).toBe(true);
    element(by.xpath(testdata4.AccountInformation.Edit_Save)).click();
    browser.sleep(3000);
    expect(element(by.xpath(testdata4.AccountInformation.Phone_Value)).getText()).toEqual(testdata.newno);
 
  });
  
  it('Validate the Account Update iN Activity Log', function () {
    
    var testdata3=protractor.loginHelpers.dashboard();
    var testdata5 = protractor.loginHelpers.lang;
    
    browser.get(testdata2.URL);
    browser.sleep(5000);  
    element(by.css(testdata5)).click();
    browser.sleep(3000);
    element(by.xpath(testdata4.LoginPage.UserName)).sendKeys(testdata2.userName);
    element(by.xpath(testdata4.LoginPage.Password)).sendKeys(testdata2.passwordField);
    browser.findElement(By.xpath(testdata4.LoginPage.LogInButton)).click();
    browser.sleep(12000);
    var el = element(by.xpath(testdata4.ActivityLog.Title)); 
    browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
    browser.sleep(2000);
    expect(element(by.xpath(testdata4.ActivityLog.Today_Text)).getText()).toEqual(testdata3.TEXT_TODAY);
    browser.sleep(2000);
    expect(element(by.xpath(testdata4.ActivityLog.AccountUpdate)).getText()).toEqual('Account Update');

    //Logout from metraview
    protractor.loginHelpers.logOutMV();
  });

});