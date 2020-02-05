var testdata = require('../inputs/testdata/SignUp.json');
var testdata2 = require('../inputs/testdata/XpathRepository.json');
var testdata11 = require('../inputs/testdata/JsonFileCreation.json');

describe('SignUp functionality in UI Baseline App', function () {

it('should render login page', function () {

//Input file to refer
var testdata4 = protractor.loginHelpers.signUp();
var testdata5 = protractor.loginHelpers.dashboard();

browser.refresh();
browser.sleep(5000);

browser.get(testdata11.URL);
browser.sleep(3000);
expect(browser.getTitle()).toEqual(testdata.url.Title);
var cur = testdata11.CurrentUrl;
var lc = cur.toLowerCase();
expect(browser.getCurrentUrl()).toEqual(lc);

//For language selection
var testdata10 = protractor.loginHelpers.lang;
element(by.css(testdata10)).click();

var signup = element(by.xpath(testdata2.LoginPage.SignUpLink));
signup.isPresent();
//Sign Up should be available
//Sign Up should be properly present and displayed in the UI
expect(element(by.xpath(testdata2.LoginPage.SignUpLink)).getText()).toEqual(testdata4.SIGN_UP_INPUT_SUBMIT);
//click on signup button
element(by.xpath(testdata2.LoginPage.SignUpLink)).click();
browser.sleep(3000);

browser.actions().mouseMove(element(by.xpath(testdata2.SignUpPage.Title))).perform();
//The user should be navigated to create account screen
//There should be a heading New Account Sign Up
expect(element(by.xpath(testdata2.SignUpPage.Title)).isDisplayed()).toBe(true);

browser.driver.manage().window().maximize();

element(by.xpath(testdata2.SignUpPage.UserName_Input)).click();
element(by.xpath(testdata2.SignUpPage.UserName_Input)).sendKeys(testdata.username);

//Click on cancel
//The details should be submitted and the form should get closed
element(by.xpath(testdata2.SignUpPage.CancelButton)).click();

//For language selection
var testdata9 = protractor.loginHelpers.lang;
element(by.css(testdata9)).click();
browser.sleep(2000);

element(by.xpath(testdata2.LoginPage.SignUpLink)).click();
browser.sleep(3000);

browser.actions().mouseMove(element(by.xpath(testdata2.SignUpPage.Title))).perform();
// The form should not get closed
element(by.xpath(testdata2.SignUpPage.UserName_Input)).click();
element(by.xpath(testdata2.SignUpPage.UserName_Input)).sendKeys(testdata.username+protractor.loginHelpers.randomNumber());
element(by.xpath(testdata2.SignUpPage.Email_Input)).click();
element(by.xpath(testdata2.SignUpPage.Email_Input)).sendKeys(testdata.emailid);
element(by.xpath(testdata2.SignUpPage.Password_Input)).click();
browser.sleep(1000);
element(by.xpath(testdata2.SignUpPage.Password_Input)).sendKeys(testdata.password);
element(by.xpath(testdata2.SignUpPage.VerifyPassword_Input)).click();
element(by.xpath(testdata2.SignUpPage.VerifyPassword_Input)).sendKeys(testdata.verifypassword);
//The form should not get closed
element(by.xpath(testdata2.SignUpPage.UserName_Input)).click();
element(by.xpath(testdata2.SignUpPage.Email_Input)).click();
element(by.xpath(testdata2.SignUpPage.Email_Input)).clear();
expect(element(by.xpath(testdata2.SignUpPage.EmailRequired_ErrorMessage)).isDisplayed()).toBe(true);
element(by.xpath(testdata2.SignUpPage.Email_Input)).click();
element(by.xpath(testdata2.SignUpPage.Email_Input)).sendKeys(testdata.emailid);
//The data should get submitted
element(by.xpath(testdata2.SignUpPage.SignUpButton)).click();

browser.sleep(6000);
browser.waitForAngular();
var welcome = element(by.xpath(testdata2.SignUpPage.AfterSignUp_WelcomePage_WelcomeMessage));
welcome.isPresent();
browser.actions().mouseMove(element(by.xpath(testdata2.SignUpPage.AfterSignUp_WelcomePage_WelcomeMessage))).perform();
browser.sleep(1000);
element(by.xpath(testdata2.SignUpPage.AfterSignUp_WelcomePage_AccountInformation)).click();
browser.sleep(2000);
expect(element(by.xpath(testdata2.AccountInformation.Edit_Title)).getText()).toEqual(testdata5.TEXT_EDIT_ACCOUNT_INFORMATION);
//checking for buttons at the top
//Both Sign Up and Cancel should be visible
expect(element(by.xpath(testdata2.AccountInformation.Edit_Save)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata2.AccountInformation.Edit_Save)).getText()).toEqual(testdata5.TEXT_SAVE)
expect(element(by.xpath(testdata2.AccountInformation.Edit_Cancel)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata2.AccountInformation.Edit_Cancel)).getText()).toEqual(testdata5.TEXT_CANCEL);
//for testing the label and sending the data in firstname
browser.sleep(1000);
expect(element(by.xpath(testdata2.AccountInformation.Edit_FirstName_Label)).getText()).toEqual(testdata5.TEXT_FIRST_NAME);
expect(element(by.xpath(testdata2.AccountInformation.Edit_FirstName_Input)).isDisplayed()).toBe(true);
element(by.xpath(testdata2.AccountInformation.Edit_FirstName_Input)).click();

element(by.xpath(testdata2.AccountInformation.Edit_FirstName_Input)).sendKeys(testdata.firstname);
expect(element(by.xpath(testdata2.AccountInformation.Edit_FirstName_BlueLine)).isDisplayed()).toBe(true);
//for testing the label and sending the data in middle name
expect(element(by.xpath(testdata2.AccountInformation.Edit_MiddleName_Label)).getText()).toEqual(testdata5.TEXT_MIDDLE_INITIAL);
expect(element(by.xpath(testdata2.AccountInformation.Edit_MiddleName_Input)).isDisplayed()).toBe(true);
element(by.xpath(testdata2.AccountInformation.Edit_MiddleName_Input)).click();
element(by.xpath(testdata2.AccountInformation.Edit_MiddleName_Input)).sendKeys(testdata.Middlename);
//for testing the label and sending the lastname
expect(element(by.xpath(testdata2.AccountInformation.Edit_LastName_Label)).getText()).toEqual(testdata5.TEXT_LAST_NAME);
expect(element(by.xpath(testdata2.AccountInformation.Edit_LastName_Input)).isDisplayed()).toBe(true);
element(by.xpath(testdata2.AccountInformation.Edit_LastName_Input)).click();

element(by.xpath(testdata2.AccountInformation.Edit_LastName_Input)).sendKeys(testdata.Lastname);
expect(element(by.xpath(testdata2.AccountInformation.Edit_LastName_BlueLine)).isDisplayed()).toBe(true);
//for testing email label and sending the email
expect(element(by.xpath(testdata2.AccountInformation.Edit_Email_Label)).getText()).toEqual(testdata5.TEXT_EMAIL);
expect(element(by.xpath(testdata2.AccountInformation.Edit_Email_Value)).isDisplayed()).toBe(true);
element(by.xpath(testdata2.AccountInformation.Edit_Email_Value)).clear();

element(by.xpath(testdata2.AccountInformation.Edit_Email_Value)).sendKeys(testdata.Email);
expect(element(by.xpath(testdata2.AccountInformation.Edit_Email_BlueLine)).isDisplayed()).toBe(true);
//for testing the phone label and sending the phone no
expect(element(by.xpath(testdata2.AccountInformation.Edit_Phone_Label)).getText()).toEqual(testdata5.TEXT_PHONE);
expect(element(by.xpath(testdata2.AccountInformation.Edit_Phone_Value)).isDisplayed()).toBe(true);
element(by.xpath(testdata2.AccountInformation.Edit_Phone_Value)).click();

element(by.xpath(testdata2.AccountInformation.Edit_Phone_Value)).sendKeys(testdata.newno);
//for testing the company name and sending the company name
expect(element(by.xpath(testdata2.AccountInformation.Edit_Company_Label)).getText()).toEqual(testdata5.TEXT_COMPANY_NAME);
expect(element(by.xpath(testdata2.AccountInformation.Edit_Company_Value)).isDisplayed()).toBe(true);
element(by.xpath(testdata2.AccountInformation.Edit_Company_Value)).click();
element(by.xpath(testdata2.AccountInformation.Edit_Company_Value)).sendKeys(testdata.company);
//for testing and sending billing address
expect(element(by.xpath(testdata2.AccountInformation.Edit_Address1_Label)).getText()).toEqual(testdata5.TEXT_BILLING_ADDRESS);
expect(element(by.xpath(testdata2.AccountInformation.Edit_Address1_Value)).isDisplayed()).toBe(true);
element(by.xpath(testdata2.AccountInformation.Edit_Address1_Value)).click();

element(by.xpath(testdata2.AccountInformation.Edit_Address1_Value)).sendKeys(testdata.address);
expect(element(by.xpath(testdata2.AccountInformation.Edit_Address1_BlueLine)).isDisplayed()).toBe(true);
//for testing and sending location
expect(element(by.xpath(testdata2.AccountInformation.Edit_Address2_Value)).isDisplayed()).toBe(true);
element(by.xpath(testdata2.AccountInformation.Edit_Address2_Value)).click();
element(by.xpath(testdata2.AccountInformation.Edit_Address2_Value)).sendKeys('Hyderabad');
expect(element(by.xpath(testdata2.AccountInformation.Edit_Address3_Value)).isDisplayed()).toBe(true);
element(by.xpath(testdata2.AccountInformation.Edit_Address3_Value)).click();
element(by.xpath(testdata2.AccountInformation.Edit_Address3_Value)).sendKeys('Hyderabad');
//city
expect(element(by.xpath(testdata2.AccountInformation.Edit_City_Label)).getText()).toEqual(testdata5.TEXT_CITY);
expect(element(by.xpath(testdata2.AccountInformation.Edit_City_Value)).isDisplayed()).toBe(true);

element(by.xpath(testdata2.AccountInformation.Edit_City_Value)).click();
element(by.xpath(testdata2.AccountInformation.Edit_City_Value)).sendKeys('Hyderabad');
expect(element(by.xpath(testdata2.AccountInformation.Edit_City_BlueLine)).isDisplayed()).toBe(true);
//state
expect(element(by.xpath(testdata2.AccountInformation.Edit_State_Label)).getText()).toEqual(testdata5.TEXT_STATE);
element(by.xpath(testdata2.AccountInformation.Edit_State_Value)).click();
element(by.xpath(testdata2.AccountInformation.Edit_State_Value)).sendKeys(testdata.state);
expect(element(by.xpath(testdata2.AccountInformation.Edit_State_Value)).isDisplayed()).toBe(true);
//postal code
expect(element(by.xpath(testdata2.AccountInformation.Edit_Zip_Label)).getText()).toEqual(testdata5.TEXT_ZIP_POSTAL_CODE);
expect(element(by.xpath(testdata2.AccountInformation.Edit_Zip_Value)).isDisplayed()).toBe(true);
element(by.xpath(testdata2.AccountInformation.Edit_Zip_Value)).click();

element(by.xpath(testdata2.AccountInformation.Edit_Zip_Value)).sendKeys('45656kM');


element(by.xpath(testdata2.AccountInformation.Edit_Country_Value)).click();
element(by.xpath(testdata2.AccountInformation.Edit_Country_Armenia)).click();
element(by.xpath(testdata2.AccountInformation.Edit_Country_Value)).click();
element(by.xpath(testdata2.AccountInformation.Edit_Country_Aruba)).click();

element(by.xpath(testdata2.AccountInformation.Edit_Country_Value)).click();
element(by.xpath(testdata2.AccountInformation.Edit_Country_Armenia)).click();
expect(element(by.xpath(testdata2.AccountInformation.Edit_Save)).isDisplayed()).toBe(true);

element(by.xpath(testdata2.AccountInformation.Edit_Save)).click();

browser.ignoreSynchronization = true;
browser.waitForAngular();

browser.sleep(3000);

// closing popup
element(by.xpath(testdata2.AccountInformation.ToastMsg_Success)).click();
browser.sleep(1000);

browser.refresh();
element(by.xpath(testdata2.SystemBar.Logout)).click();
browser.sleep(3000);

});

it('should verify existing user functionality', function () {
var testdata4 = protractor.loginHelpers.signUp();

browser.refresh();
browser.sleep(5000);

//For language selection
var testdata6 = protractor.loginHelpers.lang;
element(by.css(testdata6)).click();

element(by.xpath(testdata2.LoginPage.SignUpLink)).click();
browser.sleep(3000);

browser.actions().mouseMove(element(by.xpath(testdata2.SignUpPage.Title))).perform();
//The user should be navigated to create account screen
//There should be a heading New Account Sign Up
expect(element(by.xpath(testdata2.SignUpPage.Title)).isDisplayed()).toBe(true);

browser.driver.manage().window().maximize();
browser.sleep(2000);


element(by.xpath(testdata2.SignUpPage.UserName_Input)).click();
element(by.xpath(testdata2.SignUpPage.UserName_Input)).sendKeys(testdata.username);
element(by.xpath(testdata2.SignUpPage.Email_Input)).click();
element(by.xpath(testdata2.SignUpPage.Email_Input)).sendKeys(testdata.emailid);
element(by.xpath(testdata2.SignUpPage.Password_Input)).click();
browser.sleep(1000);
element(by.xpath(testdata2.SignUpPage.Password_Input)).sendKeys(testdata.password);
element(by.xpath(testdata2.SignUpPage.VerifyPassword_Input)).click();
element(by.xpath(testdata2.SignUpPage.VerifyPassword_Input)).sendKeys(testdata.verifypassword);

//The data should get submitted
element(by.xpath(testdata2.SignUpPage.SignUpButton)).click();
browser.sleep(5000);
expect(element(by.xpath(testdata2.SignUpPage.ErrorSavingAccount_Message)).getText()).toContain(testdata4.SIGN_UP_SERVER_ERRORS)
browser.sleep(5000);
element(by.xpath(testdata2.SignUpPage.CancelButton)).click();
});

// //Testcase:0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10615/ 001_UserNameWithFirstletterInUppercaseIsAllowed
it('UserName with first letter in uppercase is accepted and a new account created successfully in SignUp page', function () {

browser.refresh();
browser.sleep(3000);

browser.get(testdata11.URL);
browser.sleep(2000);

//For language selection
var testdata8 = protractor.loginHelpers.lang;
element(by.css(testdata8)).click();
browser.sleep(2000);

//click on signup button
element(by.xpath(testdata2.LoginPage.SignUpLink)).click();
browser.sleep(3000);

expect(element(by.xpath(testdata2.SignUpPage.Title)).isDisplayed()).toBe(true);

browser.driver.manage().window().maximize();

//Enter any upper case letter into 'User Name' field
element(by.xpath(testdata2.SignUpPage.UserName_Input)).click();
element(by.xpath(testdata2.SignUpPage.UserName_Input)).sendKeys(testdata.Uppercase_Username+protractor.loginHelpers.randomNumber());

//Enter email id
element(by.xpath(testdata2.SignUpPage.Email_Input)).click();
element(by.xpath(testdata2.SignUpPage.Email_Input)).sendKeys(testdata.emailid);

//Enter the password and verify password
element(by.xpath(testdata2.SignUpPage.Password_Input)).click();
browser.sleep(1000);
element(by.xpath(testdata2.SignUpPage.Password_Input)).sendKeys(testdata.password);
browser.sleep(1000);
element(by.xpath(testdata2.SignUpPage.VerifyPassword_Input)).click();
browser.sleep(1000);
element(by.xpath(testdata2.SignUpPage.VerifyPassword_Input)).sendKeys(testdata.verifypassword);
browser.sleep(1000);

//Click on the 'Sign Up' button
element(by.xpath(testdata2.SignUpPage.SignUpButton)).click();
browser.sleep(6000);

browser.waitForAngular();

//Verify UserName with first letter in uppercase is accepted and a new account created successfully
expect(element(by.xpath(testdata2.SignUpPage.AfterSignUp_WelcomePage_WelcomeMessage)).isDisplayed()).toBe(true);

});

it('Login to the application with username', function () {
//Input file to refer
var testdata5 = protractor.loginHelpers.lang;
var testdata4 = require('../inputs/testdata/JsonFileCreation.json');

browser.sleep(5000);
browser.get(testdata11.URL);
browser.sleep(5000);
element(by.css(testdata5)).click();
browser.sleep(3000);
element(by.xpath(testdata2.LoginPage.UserName)).sendKeys(testdata4.userName);
element(by.xpath(testdata2.LoginPage.Password)).sendKeys(testdata4.passwordField);
browser.findElement(By.xpath(testdata2.LoginPage.LogInButton)).click();
browser.sleep(12000);
});

//MVIEW-634:Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ Sanity_Bugs_TestCases/ 634_VerifyNewUserSuccessfulSignUp
it('it should render Signup welcome page when login with signup user', function () {

browser.refresh();
//Input file to refer
var testdata4 = protractor.loginHelpers.signUp();
var testData5 = protractor.loginHelpers.lang;
var data2=protractor.loginHelpers.randomNumber();

browser.refresh();
browser.sleep(10000);

// Log Out from Application
browser.findElement(by.xpath(testdata2.SystemBar.Logout)).click();
browser.sleep(5000);

var userNameDynamic = "TestSign"+data2;

browser.get(testdata11.URL);
browser.sleep(2000);

var signup = element(by.xpath(testdata2.LoginPage.SignUpLink));
signup.isPresent();
//Sign Up should be available
//Sign Up should be properly present and displayed in the UI
expect(element(by.xpath(testdata2.LoginPage.SignUpLink)).getText()).toEqual(testdata4.SIGN_UP_INPUT_SUBMIT);
//click on signup button
element(by.xpath(testdata2.LoginPage.SignUpLink)).click();
browser.sleep(3000);

browser.actions().mouseMove(element(by.xpath(testdata2.SignUpPage.Title))).perform();
//The user should be navigated to create account screen
//There should be a heading New Account Sign Up
expect(element(by.xpath(testdata2.SignUpPage.Title)).isDisplayed()).toBe(true);

browser.driver.manage().window().maximize();
//Enter any upper case letter into 'User Name' field
element(by.xpath(testdata2.SignUpPage.UserName_Input)).click();
element(by.xpath(testdata2.SignUpPage.UserName_Input)).sendKeys(userNameDynamic);

//Enter email id
element(by.xpath(testdata2.SignUpPage.Email_Input)).click();
element(by.xpath(testdata2.SignUpPage.Email_Input)).sendKeys(testdata.emailid);

//Enter the password and verify password
element(by.xpath(testdata2.SignUpPage.Password_Input)).click();
browser.sleep(1000);
element(by.xpath(testdata2.SignUpPage.Password_Input)).sendKeys(testdata.password);
browser.sleep(1000);
element(by.xpath(testdata2.SignUpPage.VerifyPassword_Input)).click();
browser.sleep(1000);
element(by.xpath(testdata2.SignUpPage.VerifyPassword_Input)).sendKeys(testdata.verifypassword);
browser.sleep(1000);

//Click on the 'Sign Up' button
element(by.xpath(testdata2.SignUpPage.SignUpButton)).click();
browser.sleep(6000);

//Sign up with the new account and verify teh welcome message
var welcome = element(by.xpath(testdata2.SignUpPage.AfterSignUp_WelcomePage_WelcomeMessage));
expect(welcome.isPresent()).toBe(true);
browser.actions().mouseMove(element(by.xpath(testdata2.SignUpPage.AfterSignUp_WelcomePage_WelcomeMessage))).perform();

//Click on 'X' button in the welcome message popup
element(by.xpath(testdata2.LoginPage.CloseWelcomeMessage)).click();


});

//#region TestHelpers

//#endregion TestHelpers
});
