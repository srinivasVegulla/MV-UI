var testdata1 = require('../inputs/testdata/Login.json');
var testdataAccountCreation = require('../inputs/testdata/AccountCreation.json');
var testdata3 = require('../inputs/testdata/XpathRepository.json');
var testdata11 = require('../inputs/testdata/JsonFileCreation.json');
describe('Verify account creation fields in UI Baseline App', function () {

//MetraView_2.0/ Account_Creation/ 025_Verify_fields
it('Verify account creation fields should be displayed', function () {

//Load MetraView
browser.get(testdata11.URL);
browser.sleep(3000);

//For language selection
var testdata6 = protractor.loginHelpers.lang;
element(by.css(testdata6)).click();

//Check for Sign up button
var signupBtn = element(by.xpath(testdata3.LoginPage.SignUpLink));
expect((signupBtn).isPresent()).toBe(true);

//Click on Sign Up
signupBtn.click();

//Check the fields in the form with UserName,Email,Password,Verify Password Fields
var userNameField = element(by.xpath(testdata3.SignUpPage.UserName_Input));
expect((userNameField).isPresent()).toBe(true);

var emailField = element(by.xpath(testdata3.SignUpPage.Email_Input));
expect((emailField).isPresent()).toBe(true);

var passwordField = element(by.xpath(testdata3.SignUpPage.Password_Input));
expect((passwordField).isPresent()).toBe(true);

var verifypasswordField = element(by.xpath(testdata3.SignUpPage.VerifyPassword_Input));
expect((verifypasswordField).isPresent()).toBe(true);

var SignUpLink = element(by.xpath(testdata3.LoginPage.SignUpButton));
expect((SignUpLink).isPresent()).toBe(true);

var cancelButton = element(by.xpath(testdata3.SignUpPage.CancelButton));
expect((cancelButton).isPresent()).toBe(true);  

//Click on 'Cancel' Button
cancelButton.click();
browser.sleep(5000);

//Load MetraView URL
browser.get(testdata11.URL);
browser.sleep(3000);
});

//MetraView_2.0/ Account_Creation/ 026_Marking_of_mandatory_fields
it('Verify All the mandatory fields should be marked in blue', function () {

//Load MetraView URL
browser.get(testdata11.URL);
browser.sleep(3000);

//For language selection
var testdata5 = protractor.loginHelpers.lang;
element(by.css(testdata5)).click();

//Check for Sign up button
var signupBtn = element(by.xpath(testdata3.LoginPage.SignUpLink));
expect((signupBtn).isPresent()).toBe(true);

//Click on Sign Up
signupBtn.click();
browser.sleep(3000);

//Verify 'UserName' Field 
var userNameMandatoryField = element(by.xpath(testdata3.SignUpPage.UserName_BlueLine));
expect((userNameMandatoryField).isPresent()).toBe(true);

//Verify 'Email' Field
var emailMandatoryField = element(by.xpath(testdata3.SignUpPage.Email_BlueLine));
expect((emailMandatoryField).isPresent()).toBe(true);

//Verify 'Password' Field
var passwordMandatoryField = element(by.xpath(testdata3.SignUpPage.Password_BlueLine));
expect((passwordMandatoryField).isPresent()).toBe(true);

//Verify 'Verify Password' Field
var verifypasswordMandatoryField = element(by.xpath(testdata3.SignUpPage.VerifyPassword_BlueLine));
expect((verifypasswordMandatoryField).isPresent()).toBe(true);

//Verify 'Cancel' Button
var cancelButton = element(by.xpath(testdata3.SignUpPage.CancelButton));
expect((cancelButton).isPresent()).toBe(true);  

//Click on 'Cancel'
cancelButton.click();
browser.sleep(5000);

//Load MetraView URL
browser.get(testdata11.URL);
browser.sleep(3000);
});

//MetraView_2.0/ Account_Creation/ 034_Password_mismatch
it('Verify proper error message when the passwords does not match', function () {

//Input file to refer
var testdata4 = protractor.loginHelpers.signUp();

//Load MetraView URL
browser.get(testdata11.URL);
browser.sleep(3000);

//For language selection
var testdata7 = protractor.loginHelpers.lang;
element(by.css(testdata7)).click();

//Check for Sign up button
var signupBtn = element(by.xpath(testdata3.LoginPage.SignUpLink));
expect((signupBtn).isPresent()).toBe(true);

//Click on Sign Up
signupBtn.click();
browser.sleep(3000);

//Provide Password
var passwordField = element(by.xpath(testdata3.SignUpPage.Password_Input));
passwordField.sendKeys(testdataAccountCreation.password);

//Re-enter the Password
var verifypasswordField = element(by.xpath(testdata3.SignUpPage.VerifyPassword_Input));
verifypasswordField.sendKeys(testdataAccountCreation.verifyPassword);

//Provide mail
var emailField = element(by.xpath(testdata3.SignUpPage.Email_Input));
emailField.sendKeys(testdataAccountCreation.email);

//Validate Error Message
var errorMsg = element(by.xpath(testdata3.SignUpPage.MismatchPassword_ErrorMessage));
expect(errorMsg.getText()).toEqual(testdata4.SIGN_UP_VERIFY_PASSWORD);

//Check 'Cancel' Button
var cancelButton = element(by.xpath(testdata3.SignUpPage.CancelButton));
expect((cancelButton).isPresent()).toBe(true);  

//Click on 'Cancel'
cancelButton.click();
browser.sleep(5000);

//Load MetraView URL
browser.get(testdata11.URL);
browser.sleep(3000);
});

//MetraView_2.0/ Account_Creation/ 035_Password_criteria
it('Verify proper error message when the password does not meet the criteria', function () {

//Input file to refer
var testdata8 = protractor.loginHelpers.signUp();

//Load MetraView URL
browser.get(testdata11.URL);
browser.sleep(3000);

//For language selection
var testdata5 = protractor.loginHelpers.lang;
element(by.css(testdata5)).click();

//Check for Sign up button
var signupBtn = element(by.xpath(testdata3.LoginPage.SignUpLink));
expect((signupBtn).isPresent()).toBe(true);

//Click on Sign Up
signupBtn.click();
browser.sleep(3000);

//Provide Password
var passwordField = element(by.xpath(testdata3.SignUpPage.Password_Input));
passwordField.sendKeys(testdataAccountCreation.incorrectPwd);

//Provide Incorrect Password
var verifypasswordField = element(by.xpath(testdata3.SignUpPage.VerifyPassword_Input));
verifypasswordField.sendKeys(testdataAccountCreation.incorrectPwd);

//Provide Email
var emailField = element(by.xpath(testdata3.SignUpPage.Email_Input));
emailField.sendKeys(testdataAccountCreation.email);

//Validate Error Message
var errorMsg = element(by.xpath(testdata3.SignUpPage.IncorrectPatternPassword_ErrorMessage));
expect(errorMsg.getText()).toEqual(testdata8.SIGN_UP_PASSWORD_INCORRECT_PATTERN);

//Check for Cancel Button
var cancelButton = element(by.xpath(testdata3.SignUpPage.CancelButton));
expect((cancelButton).isPresent()).toBe(true); 

//Click on 'Cancel'
cancelButton.click();
browser.sleep(5000);

//Load MetraView URL
browser.get(testdata11.URL);
browser.sleep(5000);
});

//MetraView_2.0/ Account_Creation/ 040_Login_after_registration and MetraView_2.0/ Account_Creation/ 042_Visibility_of_created_user_in_metranet
it('Verify the user is able to login once the self registration is successful and Verify the created user should be visible in Metranet Application', function () {


var randomnumber=Math.floor(Math.random()*1000);
var user = testdataAccountCreation.userName+randomnumber;

//Load MetraView URL
browser.get(testdata11.URL);
browser.sleep(3000);

//For language selection
var testdata8 = protractor.loginHelpers.lang;
element(by.css(testdata8)).click();

//Check for Sign up button
var signupBtn = element(by.xpath(testdata3.LoginPage.SignUpLink));
expect((signupBtn).isPresent()).toBe(true);

//Click on Sign Up
signupBtn.click();
browser.sleep(3000);

//Fill the fields in the form
var userNameField = element(by.xpath(testdata3.SignUpPage.UserName_Input));
userNameField.sendKeys(user);

var emailField = element(by.xpath(testdata3.SignUpPage.Email_Input));
emailField.sendKeys(user+"@mv.com");

var passwordField = element(by.xpath(testdata3.SignUpPage.Password_Input));
passwordField.sendKeys(testdataAccountCreation.accountPwd);

var verifypasswordField = element(by.xpath(testdata3.SignUpPage.VerifyPassword_Input));
verifypasswordField.sendKeys(testdataAccountCreation.accountPwd);

//Click on 'Sign Up'
var SignUpLink = element(by.xpath(testdata3.LoginPage.SignUpButton));
SignUpLink.click(); 

browser.sleep(5000);

//Verify Account to be Logged In
var loginToMetraView = element(by.xpath(testdata3.SignUpPage.AfterSignUp_WelcomePage_WelcomeMessage));
expect((loginToMetraView).isPresent()).toBe(true);

//Close the Account activation dialog
var closeWelcomeDialog = element(by.xpath(testdata3.SignUpPage.AfterSignUp_WelcomePage_CloseButton));
closeWelcomeDialog.click(); 
browser.sleep(5000);

//Click on 'Logout'
element(by.xpath(testdata3.SystemBar.Logout)).click();
browser.sleep(5000);

//Ignore Synchronization to access non angualr Pages
browser.ignoreSynchronization = true;

//Load MetraNet URL
browser.get(testdataAccountCreation.metraNetURL);

//Provide Username
var mnUserName = element(by.xpath(testdata3.MetraNet.UserName_Input));
mnUserName.sendKeys(testdataAccountCreation.mnAdmin);
browser.sleep(3000);

//Provide Password
var mnPassword = element(by.xpath(testdata3.MetraNet.Password_Input));
mnPassword.sendKeys(testdataAccountCreation.mnAdminPwd);
browser.sleep(3000);

//Click on 'Login'
var mnlogin = element(by.xpath(testdata3.MetraNet.LogInButton));
mnlogin.click();
browser.sleep(3000);

//Load the account
var accSearch = element(by.xpath(testdata3.MetraNet.Searchbar));
accSearch.sendKeys(user);
browser.sleep(5000);

//Verify the Newly Created Account in MetraView
var retrieveCreatedAccount = element(by.xpath(testdata3.MetraNet.Searchbar_Result));
expect(retrieveCreatedAccount.getText()).toContain(user);
browser.sleep(5000);

//Logout of MetraNet
var mnLogout = element(by.xpath(testdata3.MetraNet.LogOut_Button));
mnLogout.click();

//Load MetraView URL
browser.sleep(5000);
browser.get(testdata11.URL);
browser.sleep(5000);

});

});