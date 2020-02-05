var testdata1 = require('../inputs/testdata/Login.json');
var testdata2 = require('../inputs/testdata/JsonFileCreation.json');
var testdata4 = require('../inputs/testdata/PartitionAccountData.json');
var testdata3 = require('../inputs/testdata/XpathRepository.json');

describe('Application should work with same account ids with different namespaces', function(){

it('MVIEW-2627: Verify Application should work with same account ids with different namespaces', function(){ 

//Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 2627_Applicationshouldworkwithdifferent_namespaces

//Input file to refer
var testdata8 = protractor.loginHelpers.security();
//Refreshing the page
browser.refresh();
browser.sleep(5000);

browser.get(testdata4.URL);
browser.sleep(5000);
element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata4.corpUserName);
element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata4.passwordField);
browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();

//Validates that 'Edit' link is available in MetraView page, i.e., Successfully Logged into MetraView application with corpaccount under Partition Namespace
expect(element(by.xpath(testdata3.AccountInformation.EditLink)).isDisplayed()).toBe(true);
browser.sleep(5000);

//Logout
element(by.xpath(testdata3.SystemBar.Logout)).click();
browser.sleep(5000);

//Load the URL
browser.get(testdata4.URL);
browser.sleep(3000);

//For language selection
var testdata7 = protractor.loginHelpers.lang;
element(by.css(testdata7)).click();

//Log in to MetraView with AliasName of Corporate account
element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata4.aliasName);
element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata4.passwordField);

browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click().then(function () {
browser.driver.manage().window().maximize();  
browser.waitForAngular();
//Login should be unsuccessful when user logged with Alias name of partition namespace.
expect(element(by.xpath(testdata3.LoginPage.InvalidCredentials_ErrorMessage)).isDisplayed()).toBe(true);
console.log(testdata8.LOGIN_INVALID_CREDENTIALS);
browser.sleep(3000);
//Validates that error message while login with Alias Name i.e., 'Invalid username or password'
expect(element(by.xpath(testdata3.LoginPage.InvalidCredentials_ErrorMessage)).getText()).toContain(testdata8.LOGIN_INVALID_CREDENTIALS);
});

browser.sleep(5000);


});

});