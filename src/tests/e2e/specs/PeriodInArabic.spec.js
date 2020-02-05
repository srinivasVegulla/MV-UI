var testdata = require('../inputs/testdata/Login.json');
var testdata2 = require('../inputs/testdata/JsonFileCreation.json');
var testdata3 = require('../inputs/testdata/XpathRepository.json');

describe('UI Baseline App', function () {
//(MVIEW-2656) Localization: Login and Reset Password: The period in Arabic is located at the beginning (on the right)
it('Q1 Bugs: Period is located at the beginning (on the Left) of forgot password link', function () {

//Input file to refer
var testdata1 = protractor.loginHelpers.forgotPasswordInstruction();

browser.refresh();
browser.sleep(5000);

browser.get(testdata.url.URL);
browser.sleep(2000);

//For language selection
var testdata10 = protractor.loginHelpers.lang;
element(by.css(testdata10)).click();

browser.sleep(2000);
// element(by.xpath(testdata3.ForgotPasswordPage.UserName_Input)).click();
// browser.sleep(2000);
 // Click on Forgot Password link
 browser.findElement(By.xpath(testdata3.LoginPage.ForgotPassword_Link)).click();	   
 browser.sleep(3000);

browser.actions().mouseMove(element(by.css('#forgotPasswordUsername'))).perform();
element.all(by.css('#forgotPasswordUsername')).then(function(elm){
    elm[0].click();
    elm[0].sendKeys(testdata2.userName);
});
//element(by.xpath(testdata3.ForgotPasswordPage.UserName_Input)).sendKeys(testdata2.userName);
element(by.xpath(testdata3.ForgotPasswordPage.UserName_Input)).clear();
browser.sleep(4000);

var testdata5 =testdata1.FORGOTPASSWORD_INSTRUCTION_VALIDATION_REQUIRED_USERNAME;

//Retrieving the UserName Error message
var userNameRequire = element(by.xpath(testdata3.SignUpPage.EmailRequired_ErrorMessage));
browser.sleep(8000);

//Removing the '.' mark and replacing the empty space
testdata5 = testdata5.replace('.','');
//Validating that the Question(.) mark is located at the beginning of the text
expect(userNameRequire.getText()).toEqual("."+testdata5);
browser.sleep(5000);

var testdata9 =testdata1.FORGOTPASSWORD_INSTRUCTION_USERNAME_TO_EMAIL_INSTRUCTION;

//Retrieving the Email Instruction message
var emailInstruction = element(by.xpath(testdata3.ForgotPasswordPage.ToEmailInstructions_Message));
browser.sleep(8000);

//Removing the '.' mark and replacing the empty space
testdata9 = testdata9.replace('.','');
//Validating that the Question(.) mark is located at the beginning of the text
expect(emailInstruction.getText()).toEqual("."+testdata9);

browser.sleep(8000);

//Validate Error sending email in the Forgot Password page
browser.actions().mouseMove(element(by.css('#forgotPasswordUsername'))).perform();
element.all(by.css('#forgotPasswordUsername')).then(function(elm){
    elm[0].click();
    elm[0].sendKeys(testdata2.corpUS);
    //elm[0].sendKeys("CorpAccUS0709455338137333");
});

//Click on Send Button
element(by.xpath(testdata3.ForgotPasswordPage.Send_Button)).click();
browser.sleep(8000);

var testdata11 = testdata1.FORGOTPASSWORD_INSTRUCTION_SENDING_EMAIL_ERROR

//Retrieving the Email Instruction message
var errorEmailSending = element(by.xpath(testdata3.SignUpPage.ErrorSavingAccount_Message));
browser.sleep(8000);

//Removing the '.' mark and replacing the empty space
testdata11 = testdata11.replace('.','');

//Validating that the Question(.) mark is located at the beginning of the text
expect(errorEmailSending.getText()).toEqual("."+testdata11);
browser.sleep(3000);
browser.get(testdata.url.URL);

});
}); 
    