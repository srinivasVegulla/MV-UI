var testdata = require('../inputs/testdata/JsonFileCreation.json');
var testdata1 = require('../inputs/testdata/Login.json');
var testdata2 = require('../inputs/testdata/PasswordExpiry.json');
var testdata3 = require('../inputs/testdata/XpathRepository.json');

describe('Paasword Expiry UI Baseline App', function () {
it('Login to the application with USerName', function () {
//Input file to refer
var testdata5 = protractor.loginHelpers.lang;

browser.sleep(5000);
browser.get(testdata.URL);
browser.sleep(5000);
element(by.css(testdata5)).click();
browser.sleep(3000);
element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata.child4);
element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata.passwordField);
browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
browser.sleep(12000);
browser.ignoreSynchronization = true;
});

it('should redirect to password expiry page', function () {

//Input file to refer
var testdata4 = protractor.loginHelpers.expiredPassword();
var testdata5 = protractor.loginHelpers.changePassword();

//Verify user is navigated to 'Expired password'screen and it should have a heading Expired password
expect(element(by.xpath(testdata3.ExpiredPasswordPage.Title)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata3.ExpiredPasswordPage.Title)).getText()).toEqual(testdata4.EXPIRED_PASSWORD);
browser.sleep(3000);

//Verify the content of the Expired password screen
expect(element(by.xpath(testdata3.ExpiredPasswordPage.OldPassword_Label)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata3.ExpiredPasswordPage.OldPassword_Label)).getText()).toEqual(testdata4.EXPIRED_OLD_PASSWORD);
browser.sleep(3000);

expect(element(by.xpath(testdata3.ExpiredPasswordPage.Password_Label)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata3.ExpiredPasswordPage.Password_Label)).getText()).toEqual(testdata4.EXPIRED_TEXT_PASSWORD);
browser.sleep(3000);  

expect(element(by.xpath(testdata3.ExpiredPasswordPage.ConfirmPassword_Label)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata3.ExpiredPasswordPage.ConfirmPassword_Label)).getText()).toEqual(testdata4.EXPIRED_TEXT_VERIFY_PASSWORD);
browser.sleep(3000);

element(by.xpath(testdata3.ExpiredPasswordPage.OldPassword_Input)).click();
browser.sleep(500);

//Providing invalid old password
element(by.xpath(testdata3.ExpiredPasswordPage.OldPassword_Input)).sendKeys(testdata2.Invalidoldpassword);

//Provide password with out satisfying the security requirement
element(by.xpath(testdata3.ExpiredPasswordPage.Password_Input)).click();
browser.sleep(500);
element(by.xpath(testdata3.ExpiredPasswordPage.Password_Input)).sendKeys(testdata2.Invalidoldpassword);
browser.sleep(2000);
element(by.xpath(testdata3.ExpiredPasswordPage.ConfirmPassword_Input)).click();
browser.sleep(500);

//Verify the error message saying that the security requirements donot match.
expect(element(by.xpath(testdata3.ExpiredPasswordPage.PasswordPattern_ErrorMessage)).getText()).toEqual(testdata4.EXPIRED_PASSWORD_INCORRECT_PATTERN);
browser.sleep(500);

//provide new password and confirm password
element(by.xpath(testdata3.ExpiredPasswordPage.Password_Input)).click();
element(by.xpath(testdata3.ExpiredPasswordPage.Password_Input)).clear();
browser.sleep(500);
element(by.xpath(testdata3.ExpiredPasswordPage.Password_Input)).sendKeys(testdata.newPassword);

element(by.xpath(testdata3.ExpiredPasswordPage.ConfirmPassword_Input)).click();
browser.sleep(500);
element(by.xpath(testdata3.ExpiredPasswordPage.ConfirmPassword_Input)).sendKeys(testdata.confirmPassword);
browser.sleep(2000);

//Verify the 'Expiry password' form is not closed when we click anywhere except cancel
expect(element(by.xpath(testdata3.ExpiredPasswordPage.Title)).getText()).toEqual(testdata4.EXPIRED_PASSWORD);

//Verify the 'Log In' and 'Cancel' button present on expiry password screen
expect(element(by.xpath(testdata3.ExpiredPasswordPage.Cancel_Button)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata3.ExpiredPasswordPage.Cancel_Button)).getText()).toEqual(testdata4.EXPIRED_INPUT_CANCEL);
expect(element(by.xpath(testdata3.ExpiredPasswordPage.Login_Button)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata3.ExpiredPasswordPage.Login_Button)).getText()).toEqual(testdata4.EXPIRED_INPUT_SUBMIT);

//Click on 'Log In' button
element(by.xpath(testdata3.ExpiredPasswordPage.Login_Button)).click();
browser.sleep(5000);

//Verify login fails when user enters invalid old password and Verify the error message 'Invalid old Password.'
expect(element(by.xpath(testdata3.ExpiredPasswordPage.InvalidOldPassword_ErrorMessage)).isDisplayed()).toBe(true);

//Verify account locked out when user enters invalid old password thrice continously.
//Verify the error message when the passwords does not match
for (let index = 0; index < testdata.loginAttempents; index++) {
    element(by.xpath(testdata3.ExpiredPasswordPage.Login_Button)).click();
    browser.sleep(5000);
}
expect(element(by.xpath(testdata3.ExpiredPasswordPage.AccountLocked_ErrorMessage)).isDisplayed()).toBe(true);
browser.sleep(2000);
element(by.xpath(testdata3.ExpiredPasswordPage.ConfirmPassword_Input)).click();
browser.sleep(1000);
element(by.xpath(testdata3.ExpiredPasswordPage.ConfirmPassword_Input)).clear();
browser.sleep(3000);
element(by.xpath(testdata3.ExpiredPasswordPage.ConfirmPassword_Input)).sendKeys(testdata2.mismatchpassword);
browser.sleep(3000);
//MVIEW-2782 Password: Log In button is in active mode when passwords don't match.
var foo = element(by.id('submitButton'));
expect(foo.getAttribute('disabled')).toEqual('true');

element(by.xpath(testdata3.ExpiredPasswordPage.ConfirmPassword_Label)).click();
browser.sleep(2000);

//Remove the data from the mandatory fields and make these fields empty.
element(by.xpath(testdata3.ExpiredPasswordPage.OldPassword_Input)).click();
element(by.xpath(testdata3.ExpiredPasswordPage.OldPassword_Input)).clear();
browser.sleep(1000);

element(by.xpath(testdata3.ExpiredPasswordPage.Password_Input)).click();
element(by.xpath(testdata3.ExpiredPasswordPage.Password_Input)).clear();
browser.sleep(1000);

element(by.xpath(testdata3.ExpiredPasswordPage.ConfirmPassword_Input)).click();
element(by.xpath(testdata3.ExpiredPasswordPage.ConfirmPassword_Input)).clear();
browser.sleep(2000);

//Verify that, leaving the mandatory fields empty will lead to validation error.
expect(element(by.xpath(testdata3.ExpiredPasswordPage.OldPasswordRequired_ErrorMessage)).getText()).toEqual(testdata4.EXPIRED_OLD_PASSWORD_REQUIRED_ERROR_MSG);
expect(element(by.xpath(testdata3.ExpiredPasswordPage.PasswordRequired_ErrorMessage)).getText()).toEqual(testdata4.EXPIRED_PASSWORD_REQUIRED_ERROR_MSG);
expect(element(by.xpath(testdata3.ExpiredPasswordPage.ConfirmPasswordRequired_ErrorMessage)).getText()).toEqual(testdata4.EXPIRED_VERIFY_PASSWORD_REQUIRED_ERROR_MSG);

//Q1 Bug: MVIEW-2784:Verify No error message is displayed in the expiry password page
expect(element(by.xpath(testdata3.ExpiredPasswordPage.Login_Button)).isEnabled()).toBe(false)

//Click on 'Cancel' button
element(by.xpath(testdata3.ExpiredPasswordPage.Cancel_Button)).click();
browser.sleep(3000);

//Load the Metraview login page
browser.get(testdata.URL);
browser.sleep(3000);

//For language selection
var testdata9 = protractor.loginHelpers.lang;
element(by.css(testdata9)).click();

//Enter username and password of the locked account
for (let index = 0; index < testdata.loginAttempents; index++) {
element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata.child4);
element(by.xpath(testdata3.LoginPage.Password)).sendKeys("1");
browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
browser.sleep(5000);   
}
//Verify the error message on login page when user tries to login after account locked out
expect(element(by.xpath(testdata3.ExpiredPasswordPage.AccountLocked_ErrorMessage)).isDisplayed()).toBe(true);
browser.sleep(2000);

browser.get(testdata.URL);
browser.sleep(3000);

//For language selection
var testdata8 = protractor.loginHelpers.lang;
element(by.css(testdata8)).click();

//Log in to MetraView with another Department account
element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata.child3);
element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata.passwordField);
browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();

browser.waitForAngular();
browser.sleep(5000);

//Enter old password
element(by.xpath(testdata3.ExpiredPasswordPage.OldPassword_Input)).click();
browser.sleep(500);
element(by.xpath(testdata3.ExpiredPasswordPage.OldPassword_Input)).sendKeys(testdata.passwordField);

//Enter the New password
element(by.xpath(testdata3.ExpiredPasswordPage.Password_Input)).click();
browser.sleep(500);
element(by.xpath(testdata3.ExpiredPasswordPage.Password_Input)).sendKeys(testdata.newPassword);

//Enter the confirm password
element(by.xpath(testdata3.ExpiredPasswordPage.ConfirmPassword_Input)).click();
browser.sleep(500);
element(by.xpath(testdata3.ExpiredPasswordPage.ConfirmPassword_Input)).sendKeys(testdata.confirmPassword);

browser.sleep(5000);
//Q1 Bug: MVIEW-2784:Verify No error message is displayed in the expiry password page
expect(element(by.xpath(testdata3.ChangePasswordPage.MismatchPassword_ErrorMessage)).isPresent()).not.toBe(true);
browser.sleep(500);
//Click on 'Log In' button
element(by.xpath(testdata3.ExpiredPasswordPage.Login_Button)).click();
browser.sleep(5000);

browser.refresh();
browser.sleep(5000);

//Verify that successful password change after providing the new password in the expiry password page.
expect(element(by.xpath(testdata3.ExpiredPasswordPage.WelcomeAccount_Message)).isDisplayed()).toBe(true);
browser.sleep(2000);

//Logout
element(by.xpath(testdata3.SystemBar.Logout)).click();
browser.sleep(5000);

browser.get(testdata.URL);
browser.sleep(3000);

//For language selection
var testdata10 = protractor.loginHelpers.lang;
element(by.css(testdata10)).click();

//Log in to MetraView with same Department account (for which the password has been changed)
element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata.child3);
element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata.confirmPassword);
browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
browser.sleep(5000);

//Verify the user is able to login to the application once the password is changed by verifying the account id in the dashboard.
element(by.xpath(testdata3.SystemBar.AccountName)).click();
browser.sleep(2000);
expect(element(by.xpath("//p[contains(text(),'"+testdata.accID3+"')]")).isDisplayed()).toBe(true);
browser.sleep(3000);

//Click on 'Change Password' link
element(by.xpath(testdata3.SystemBar.ChangePassword_Link)).click();
browser.sleep(2000);

//Verify the user is navigated to 'Change Password' Page
expect(element(by.xpath(testdata3.ChangePasswordPage.Title)).getText()).toEqual(testdata5.CHANGE_PASSWORD_TITLE);
browser.sleep(2000);

//Click on 'Cancel' button
element(by.xpath(testdata3.ChangePasswordPage.Cancel)).click();
browser.sleep(3000);

//Log out
element(by.xpath(testdata3.SystemBar.Logout)).click();
browser.sleep(5000);

browser.get(testdata.URL);
browser.sleep(3000);

//For language selection
var testdata11 = protractor.loginHelpers.lang;
element(by.css(testdata11)).click();

//Log in to MetraView with another Department account
element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata.child2);
element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata.passwordField);
browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
browser.waitForAngular();
browser.sleep(5000);

//Enter old password
element(by.xpath(testdata3.ExpiredPasswordPage.OldPassword_Input)).click();
browser.sleep(500);
element(by.xpath(testdata3.ExpiredPasswordPage.OldPassword_Input)).sendKeys(testdata.passwordField);

//Enter the New password
element(by.xpath(testdata3.ExpiredPasswordPage.Password_Input)).click();
browser.sleep(500);
element(by.xpath(testdata3.ExpiredPasswordPage.Password_Input)).sendKeys(testdata.newPassword);

//Enter the confirm password
element(by.xpath(testdata3.ExpiredPasswordPage.ConfirmPassword_Input)).click();
browser.sleep(500);
element(by.xpath(testdata3.ExpiredPasswordPage.ConfirmPassword_Input)).sendKeys(testdata.confirmPassword);

//Click on 'Cancel' button
element(by.xpath(testdata3.ExpiredPasswordPage.Cancel_Button)).click();
browser.sleep(3000);

browser.get(testdata.URL);
browser.sleep(3000);

//For language selection
var testdata12 = protractor.loginHelpers.lang;
element(by.css(testdata12)).click();

//Provide the same old password and verify that the password is not changed after clicking on 'Cancel' button on the expiry password screen.
element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata.child2);
element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata.passwordField);
browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
browser.sleep(5000);

browser.refresh();
browser.sleep(5000);

expect(element(by.xpath(testdata3.ExpiredPasswordPage.WelcomeAccount_Message)).isDisplayed()).toBe(true);

//Logout from the MV2.0 Application 
protractor.loginHelpers.logOutMV();

});

});