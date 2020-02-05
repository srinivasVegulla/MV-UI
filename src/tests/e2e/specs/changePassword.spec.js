var testdata = require('../inputs/testdata/ChangePassword.json');
var testdata2 = require('../inputs/testdata/JsonFileCreation.json');
var testdata3 = require('../inputs/testdata/XpathRepository.json');

describe('UI Baseline App', function () {

it('Verify error message when password does not meet the security criteria', function () {

//Input file to refer
var testdata4 = protractor.loginHelpers.changePassword();

//Launch to the MV2.0 application
protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);

//Login to the MV2.0 application
protractor.loginHelpers.logInMV(testdata2.userName,testdata2.passwordField);

element(by.xpath(testdata3.SystemBar.AccountName)).click();
browser.sleep(5000);
element(by.xpath(testdata3.SystemBar.ChangePassword_Link));
{
element(by.xpath(testdata3.SystemBar.ChangePassword_Link)).click();
browser.sleep(2000);
browser.actions().mouseMove(element(by.xpath(testdata3.ChangePasswordPage.Title))).perform();
browser.sleep(2000);
//Validate user should able to see the new password field
expect(element(by.xpath(testdata3.ChangePasswordPage.NewPassword_Input)).isDisplayed()).toBe(true);

//validate user should able to see the verify password field
expect(element(by.xpath(testdata3.ChangePasswordPage.VerifyPassword_Input)).isDisplayed()).toBe(true);


element(by.xpath(testdata3.ChangePasswordPage.CurrentPassword_Input)).sendKeys(testdata2.passwordField);

element(by.xpath(testdata3.ChangePasswordPage.NewPassword_Input)).sendKeys(testdata.invalidnewpassword);
browser.sleep(3000);
element(by.xpath(testdata3.ChangePasswordPage.VerifyPassword_Input)).click();
element(by.xpath(testdata3.ChangePasswordPage.VerifyPassword_Input)).sendKeys(testdata.invalidnewpassword);
//Validate the error message when password does not meet the security criteria
expect(element(by.xpath(testdata3.ChangePasswordPage.IncorrectPattern_ErrorMessage)).getText()).toEqual(testdata4.CHANGE_PASSWORD_INCORRECT_PATTERN);
browser.sleep(3000);

element(by.xpath(testdata3.ChangePasswordPage.Cancel)).click();
};
});

//Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ Sanity_Bugs_TestCases/ 2635_Main_SaveBtn_On_Pwds_Mismatch
it('Verify save button is disabled after entering the different passwords in new and verify password', function () {

//Input file to refer
var testdata10 = protractor.loginHelpers.changePassword();

browser.refresh();
browser.sleep(5000);
element(by.xpath(testdata3.SystemBar.AccountName)).click();
browser.sleep(5000);
element(by.xpath(testdata3.SystemBar.ChangePassword_Link));
{
element(by.xpath(testdata3.SystemBar.ChangePassword_Link)).click();
browser.sleep(2000);
browser.actions().mouseMove(element(by.xpath(testdata3.ChangePasswordPage.Title))).perform();
browser.sleep(2000);


element(by.xpath(testdata3.ChangePasswordPage.CurrentPassword_Input)).sendKeys(testdata2.passwordField);

element(by.xpath(testdata3.ChangePasswordPage.NewPassword_Input)).sendKeys(testdata.newPassword);
browser.sleep(3000);
element(by.xpath(testdata3.ChangePasswordPage.VerifyPassword_Input)).click();
element(by.xpath(testdata3.ChangePasswordPage.VerifyPassword_Input)).sendKeys(testdata.verifyPassword);

browser.sleep(3000);
//Validate save button is disabled
expect(element(by.xpath(testdata3.ChangePasswordPage.Save)).isEnabled()).not.toBe(true);
//Click on Cancel button
element(by.xpath(testdata3.ChangePasswordPage.Cancel)).click();
};
});

it('Verify if the user is able to cancel the change password', function () {
browser.refresh();
browser.sleep(3000);
//Clicking on Corp Account
element(by.xpath(testdata3.SystemBar.AccountName)).click();
browser.sleep(5000);
element(by.xpath(testdata3.SystemBar.ChangePassword_Link));
{
//Clicking on 'Change Password' Link
element(by.xpath(testdata3.SystemBar.ChangePassword_Link)).click();
browser.sleep(2000);
browser.actions().mouseMove(element(by.xpath(testdata3.ChangePasswordPage.Title))).perform();
browser.sleep(2000);
//Validate user should able to see the new password field
expect(element(by.xpath(testdata3.ChangePasswordPage.NewPassword_Input)).isDisplayed()).toBe(true);
//Validate user should able to see the verify password field
expect(element(by.xpath(testdata3.ChangePasswordPage.VerifyPassword_Input)).isDisplayed()).toBe(true);
//element(by.xpath(testdata3.ChangePasswordPage.CurrentPassword_Input)).click();
element(by.xpath(testdata3.ChangePasswordPage.CurrentPassword_Input)).sendKeys(testdata2.passwordField);
// element(by.xpath(testdata3.ChangePasswordPage.NewPassword_Input)).click();
element(by.xpath(testdata3.ChangePasswordPage.NewPassword_Input)).sendKeys(testdata.validNewPassword);
browser.sleep(2000);
//Validate that the user is able to cancel the change password action by clicking on it
element(by.xpath(testdata3.ChangePasswordPage.Cancel)).click();

};
});

it('should work for changer password functionality', function () {

//Input file to refer
var testdata5 = protractor.loginHelpers.viewSelector();

browser.refresh();
browser.sleep(5000);

browser.sleep(3000);
element(by.xpath(testdata3.SystemBar.AccountName)).click();
browser.sleep(1000);
var changepwdlink = element(by.xpath(testdata3.SystemBar.ChangePassword_Link));

expect(changepwdlink.isPresent()).toBe(true);

element(by.xpath(testdata3.SystemBar.ChangePassword_Link)).click();
browser.sleep(2000);
browser.actions().mouseMove(element(by.xpath(testdata3.ChangePasswordPage.Title))).perform();
browser.sleep(2000);
//validate user should able to see the new password field
expect(element(by.xpath(testdata3.ChangePasswordPage.NewPassword_Input)).isDisplayed()).toBe(true);
//validate user should able to see the verify password field
expect(element(by.xpath(testdata3.ChangePasswordPage.VerifyPassword_Input)).isDisplayed()).toBe(true);
element(by.xpath(testdata3.ChangePasswordPage.CurrentPassword_Input)).click();
element(by.xpath(testdata3.ChangePasswordPage.CurrentPassword_Input)).sendKeys(testdata2.passwordField);
element(by.xpath(testdata3.ChangePasswordPage.NewPassword_Input)).click();
element(by.xpath(testdata3.ChangePasswordPage.NewPassword_Input)).sendKeys(testdata2.newPassword);
//Validate the new password contains the data
element(by.xpath(testdata3.ChangePasswordPage.VerifyPassword_Input)).click();
element(by.xpath(testdata3.ChangePasswordPage.VerifyPassword_Input)).sendKeys(testdata2.confirmPassword);

//Validate the verify password contains the data
browser.sleep(1000);
//validate current password field is required as mandatory with a blue line at the end
expect(element(by.xpath(testdata3.ChangePasswordPage.CurrentPassword_BlueLine)).isDisplayed()).toBe(true);
//validate New password field is required as mandatory with a blue line at the end
expect(element(by.xpath(testdata3.ChangePasswordPage.NewPassword_BlueLine)).isDisplayed()).toBe(true);
//validate confirm password field is required as mandatory with a blue line at the end
expect(element(by.xpath(testdata3.ChangePasswordPage.VerifyPassword_BlueLine)).isDisplayed()).toBe(true);

element(by.xpath(testdata3.ChangePasswordPage.Save)).click();
browser.sleep(4000);
var save = element(by.xpath(testdata3.ChangePasswordPage.PasswordChangeFailed_ErrorMessage));
expect(save.isPresent()).toBe(true);

browser.actions().mouseMove(element(by.xpath(testdata3.ChangePasswordPage.PasswordChangeFailed_ErrorMessage))).perform();
element(by.xpath(testdata3.ChangePasswordPage.PasswordChangeFailed_ErrorMessage_CloseButton)).click();
browser.sleep(1000);
element(by.xpath(testdata3.ChangePasswordPage.Cancel)).click();
browser.sleep(3000);
// myaccounticon clicking in userlink
element(by.xpath(testdata3.SystemBar.AccountName)).click();
browser.sleep(2000);
element(by.xpath(testdata3.SystemBar.MyAccount_Button)).click();
browser.sleep(3000);
expect(element(by.xpath(testdata3.LayerSelector.MyAccount_Label)).getText()).toEqual(testdata5.MV_VIEW_MY_ACCOUNT);
browser.sleep(2000);
element(by.xpath(testdata3.SystemBar.Logout)).click();
browser.sleep(3000);


});
});
