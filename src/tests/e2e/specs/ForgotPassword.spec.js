var testdata = require('../inputs/testdata/ForgotPassword.json');
var testdata1 = require('../inputs/testdata/Login.json');
var testdata2 = require('../inputs/testdata/JsonFileCreation.json');
var testdata3 = require('../inputs/testdata/XpathRepository.json');

describe('UI Baseline App', function () {
it('should have a title', function () {

browser.get(testdata2.URL);
browser.sleep(2000);
expect(browser.getTitle()).toEqual(testdata1.url.Title);
});
})
describe('login page', function () {

it('should work forgot password', function () {

//For language selection
var testdata6 = protractor.loginHelpers.lang;
element(by.css(testdata6)).click();

var forgotlink = element(by.xpath(testdata3.LoginPage.ForgotPassword_Link));
expect(element(by.xpath(testdata3.LoginPage.ForgotPassword_Link)).isDisplayed()).toBe(true);
forgotlink.click();
browser.sleep(3000);
element(by.xpath(testdata3.ForgotPasswordPage.Send_Button));
browser.sleep(2000);
expect(element(by.xpath(testdata3.ForgotPasswordPage.Send_Button)).isDisplayed()).toBe(true);
browser.sleep(2000);
element(by.xpath(testdata3.ForgotPasswordPage.UserName_Input));
browser.sleep(2000);
expect(element(by.xpath(testdata3.ForgotPasswordPage.UserName_Input)).isDisplayed()).toBe(true);
browser.sleep(2000);
element(by.xpath(testdata3.ForgotPasswordPage.BacktoLogin_Button)).click();
browser.sleep(2000);
console.log("Able to click the back to login button");
forgotlink.click();
console.log("Successfulyl selected the forgot password link");
browser.sleep(3000);
element(by.xpath(testdata3.ForgotPasswordPage.UserName_Input)).click();

element(by.xpath(testdata3.ForgotPasswordPage.UserName_Input)).sendKeys(testdata2.userName);
browser.sleep(1000);
element(by.xpath(testdata3.ForgotPasswordPage.Send_Button)).click();
browser.sleep(3000);

});

it('Verify functionalities under Change Password', function () 
{
//For language selection
var testdata6 = protractor.loginHelpers.lang;
//Input file to refer
var testdata4 = protractor.loginHelpers.changePassword();
browser.get(testdata2.URL);
browser.sleep(2000);
element(by.css(testdata6)).click();
expect(browser.getTitle()).toEqual(testdata1.url.Title);
element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata2.userName);
element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata2.passwordField);
browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
browser.sleep(12000);  
browser.driver.manage().window().maximize();
browser.sleep(7000);

//Test Case: MetraView_2.0/ Forgot_Password_Link/ 015_Error_message_for_required_conditions
//Verify error message when the required conditions for password are not met,and also when both the passwords are not same
//Refresh the browser
browser.refresh();
browser.sleep(10000);

//Click on Down Arrow Button
element(by.xpath(testdata3.SystemBar.AccountName)).click();
browser.sleep(5000);

//Checking for change Password Link
expect(element(by.xpath(testdata3.SystemBar.ChangePassword_Link)).isPresent()).toBe(true);            
//Click on Change Password link 
element(by.xpath(testdata3.SystemBar.ChangePassword_Link)).click();
browser.sleep(3000);

//validate user should able to see the new password field
expect(element(by.xpath(testdata3.ChangePasswordPage.NewPassword_Input)).isPresent()).toBe(true);

//validate user should able to see the verify password field
expect(element(by.xpath(testdata3.ChangePasswordPage.VerifyPassword_Input)).isPresent()).toBe(true);
element(by.xpath(testdata3.ChangePasswordPage.CurrentPassword_Input)).sendKeys(testdata2.passwordField);
//Try to enter invalid password (password which is not meeting the conditions) into New Password Field
element(by.xpath(testdata3.ChangePasswordPage.NewPassword_Input)).click();
element(by.xpath(testdata3.ChangePasswordPage.NewPassword_Input)).sendKeys(testdata.InvalidPassword);
element(by.xpath(testdata3.ChangePasswordPage.VerifyPassword_Input)).click();
browser.sleep(3000);

//Validate Proper error message should be displayed according to the error conditions
expect(element(by.xpath(testdata3.ChangePasswordPage.IncorrectPattern_ErrorMessage)).getText()).toEqual(testdata4.CHANGE_PASSWORD_INCORRECT_PATTERN);

//Try to give the new password and confirm password fields with different names
element(by.xpath(testdata3.ChangePasswordPage.NewPassword_Input)).clear();
element(by.xpath(testdata3.ChangePasswordPage.NewPassword_Input)).sendKeys(testdata.ValidNewPassword);
element(by.xpath(testdata3.ChangePasswordPage.VerifyPassword_Input)).sendKeys(testdata.WrongVerifyPassword);
element(by.xpath(testdata3.ChangePasswordPage.NewPassword_Input)).click();
browser.sleep(2000);
element(by.xpath(testdata3.ChangePasswordPage.CurrentPassword_Input)).click();
//Validate Proper error message should be displayed according to the error conditions
expect(element(by.xpath(testdata3.ChangePasswordPage.MismatchPassword_ErrorMessage)).getText()).toEqual(testdata4.CHANGE_PASSWORD_VERIFY_PASSWORD);

});

it('Verify functionalities under Forgot Password Link', function()
{

//For language selection	   
var testdata8 = protractor.loginHelpers.lang;	  
var testdata5 = protractor.loginHelpers.forgotPasswordInstruction();	   
var testdata7 = protractor.loginHelpers.security();	


//Test Case: MetraView_2.0/ Forgot_Password/ 006_Disabling_send_button	    
//Verify send button is not activated before entering the user name	    
// Refreshing the page	  
browser.refresh();	     
browser.sleep(6000);   	  


// Log Out from Application	    
browser.findElement(by.xpath(testdata3.SystemBar.Logout)).click();	   
browser.sleep(5000);	   


//Loading the Login Page	   
browser.get(testdata2.URL);	    
browser.sleep(5000);	 


//For language selection	  
element(by.css(testdata8)).click();  

//Existing Localization Defect:MVIEW-2965(MX,JP,EG,BR)
//ESR-10596/ 001_verify_Hebrew_ResetPasswordscreen_is_in_Arabic	
//Verify "Forgot Password?" text is localized	
expect(element(by.xpath(testdata3.LoginPage.ForgotPassword_Link)).getText()).toEqual(testdata7.LOGIN_FORGOT_PASSWORD);	

// Click on Forgot Password link
browser.findElement(By.xpath(testdata3.LoginPage.ForgotPassword_Link)).click();	   
browser.sleep(3000);

//Existing Localization Defect:MVIEW-2965(MX,JP,EG,BR)	
//ESR-10596/ 001_verify_Hebrew_ResetPasswordscreen_is_in_Arabic	
//Verify that the Forgot Password screen text is localized in all the languages	
expect(element(by.xpath(testdata3.ForgotPasswordPage.UserName_Input)).getAttribute('placeholder')).toEqual(testdata5.FORGOTPASSWORD_INSTRUCTION_INPUT_USERNAME);	
expect(element(by.xpath(testdata3.ForgotPasswordPage.Send_Button)).getText()).toEqual(testdata5.FORGOTPASSWORD_INSTRUCTION_INPUT_SEND);	
expect(element(by.xpath(testdata3.ForgotPasswordPage.BacktoLogin_Button)).getText()).toEqual(testdata5.FORGOTPASSWORD_INSTRUCTION_BACKTO_LOGINFORM);   	
expect(element(by.xpath(testdata3.ForgotPasswordPage.ToEmailInstructions_Message)).getText()).toEqual(testdata5.FORGOTPASSWORD_INSTRUCTION_USERNAME_TO_EMAIL_INSTRUCTION);	
expect(element(by.xpath(testdata3.LoginPage.CopyRight)).getText()).toEqual(testdata7.LOGIN_COPYRIGHT);

//Validate Send Button is Disabled before entering the User Name feild	  
expect(element(by.xpath(testdata3.ForgotPasswordPage.Send_Button)).isEnabled()).toBe(false);
browser.sleep(3000);

//Test Case: MetraView_2.0/ Forgot_Password_Link/ 005_alert_for_wrong_inputs_in_assistance_page
//Verify if the user is able to view the Error Message when enters a username which is not having an associated email id to that account
//Enter Valid user name not associated with any email
browser.actions().mouseMove(element(by.css('#forgotPasswordUsername'))).perform();
element.all(by.css('#forgotPasswordUsername')).then(function(elm){
elm[0].click();
elm[0].sendKeys(testdata2.userName12);
});
browser.sleep(3000);

//Click on Send Button
browser.findElement(by.xpath(testdata3.ForgotPasswordPage.Send_Button)).click();    
browser.sleep(8000);

//Validate Error Message  
expect(browser.findElement(by.xpath(testdata3.ForgotPasswordPage.WrongUserNameEmail_ErrorMessage)).getText()).toContain(testdata5.FORGOTPASSWORD_INSTRUCTION_WRONG_USERNAME_EMAIL);

//Test Case: MetraView_2.0/ Forgot_Password_Link/ 011_View_back_to_login_page_link
//Verify if the user is able to view link to back to login and clicking on it shall redirect to login page
//Validate Back to Login button is visible
expect(element(by.xpath(testdata3.ForgotPasswordPage.BacktoLogin_Button)).isDisplayed()).toBe(true);
browser.sleep(3000);

//Click on Back to Login Button
element(by.xpath(testdata3.ForgotPasswordPage.BacktoLogin_Button)).click();
browser.sleep(3000);

//Validate we are redirected to Login page
expect(element(by.xpath(testdata3.LoginPage.LogInButton)).isDisplayed()).toBe(true);
browser.sleep(5000); 

//Test Case: MetraView_2.0/ Forgot_Password_Link/ 006_Validation_alert_on_empty_username
//Verify that not filling the username field will shown the proper validation message for the empty fields     
// Click on Forgot Password link
browser.findElement(By.xpath(testdata3.LoginPage.ForgotPassword_Link)).click();

// Enter a user name and clear it
browser.actions().mouseMove(element(by.css('#forgotPasswordUsername'))).perform();
element.all(by.css('#forgotPasswordUsername')).then(function(elm){
elm[0].click();
elm[0].sendKeys(testdata2.userName12);
elm[0].clear();
});
browser.sleep(3000);

//Validate Proper validation error message should be displayed for the empty fields
expect(element(by.xpath(testdata3.ForgotPasswordPage.UserNameRequired_ErrorMessage)).getText()).toContain(testdata5.FORGOTPASSWORD_INSTRUCTION_VALIDATION_REQUIRED_USERNAME);

//Test Case: MetraView_2.0/ Forgot_Password_Link/ 008_Send_button_functionality_on_valid_details
//Verify if the user is able to enter the valid username in the username field and click on send button
//Enter Valid UserName in User Name filed
browser.actions().mouseMove(element(by.css('#forgotPasswordUsername'))).perform();
element.all(by.css('#forgotPasswordUsername')).then(function(elm){
elm[0].click();
elm[0].sendKeys(testdata2.userName12);

// Click on Send Button
browser.findElement(by.xpath(testdata3.ForgotPasswordPage.Send_Button)).click();

browser.refresh();
browser.sleep(5000);
});


});

}
); 
