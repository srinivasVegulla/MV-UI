var testdata = require('../inputs/testdata/Login.json');
var testdata4 = require('../inputs/testdata/XpathRepository.json');
var testdata3 =require('../inputs/testdata/JsonFileCreation.json');

//Edit_Account_Info Folder in APTest Manager
describe('UI Baseline App-Account Information Widget', function () {

it('validate accountinformation widget before edit', function () {

browser.refresh();
browser.sleep(12000);

//Launch to the MV2.0 application
protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);

//Login to the MV2.0 application
protractor.loginHelpers.logInMV(testdata3.userName,testdata3.passwordField);

//validating the display of address in account information        
expect(element(by.xpath(testdata4.AccountInformation.Name)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata4.AccountInformation.Company)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata4.AccountInformation.AccountNumber_Label)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata4.AccountInformation.AccountNumber_Value)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata4.AccountInformation.Address)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata4.AccountInformation.Location)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata4.AccountInformation.Phone_Label)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata4.AccountInformation.Phone_Value)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata4.AccountInformation.Email)).isDisplayed()).toBe(true);
    });

it('Validate accountinformation widget edit', function () {

//Input file to refer
var testdata2 = protractor.loginHelpers.dashboard();
browser.sleep(4000);

//Validating edit button  and click on edit button
expect(element(by.xpath(testdata4.AccountInformation.EditLink)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata4.AccountInformation.EditIcon)).isDisplayed()).toBe(true);

//Valdiating Account Information and Edit button are in line
element(by.xpath(testdata4.AccountInformation.EditIcon)).click();
browser.sleep(4000);
expect(element(by.xpath(testdata4.AccountInformation.Edit_Title)).getText()).toEqual(testdata2.TEXT_EDIT_ACCOUNT_INFORMATION);

//Checking for buttons at the top
expect(element(by.xpath(testdata4.AccountInformation.Edit_Save)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata4.AccountInformation.Edit_Cancel)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata4.AccountInformation.Edit_Cancel)).getText()).toEqual(testdata2.TEXT_CANCEL);
browser.sleep(1000);

//For testing the label and sending the data in firstname
expect(element(by.xpath(testdata4.AccountInformation.Edit_FirstName_Label)).getText()).toEqual(testdata2.TEXT_FIRST_NAME);
expect(element(by.xpath(testdata4.AccountInformation.Edit_FirstName_Input)).isDisplayed()).toBe(true);
element(by.xpath(testdata4.AccountInformation.Edit_FirstName_Input)).clear();
expect(element(by.xpath(testdata4.AccountInformation.Edit_EmptyField_ErrorMsg)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata4.AccountInformation.Edit_EmptyField_ErrorMsg)).getText()).toEqual(testdata2.TEXT_FIRST_NAME_REQUIRED_ERROR_MSG);
element(by.xpath(testdata4.AccountInformation.Edit_FirstName_Input)).sendKeys(testdata.firstname);
expect(element(by.xpath(testdata4.AccountInformation.Edit_FirstName_BlueLine)).isDisplayed()).toBe(true);
browser.sleep(1000);

//For testing the label and sending the data in middle name
expect(element(by.xpath(testdata4.AccountInformation.Edit_MiddleName_Label)).getText()).toEqual(testdata2.TEXT_MIDDLE_INITIAL);
expect(element(by.xpath(testdata4.AccountInformation.Edit_MiddleName_Input)).isDisplayed()).toBe(true);
element(by.xpath(testdata4.AccountInformation.Edit_MiddleName_Input)).clear(); 
browser.sleep(1000);

//Validating the middle name field accepts only one letter
element(by.xpath(testdata4.AccountInformation.Edit_MiddleName_Input)).sendKeys('ua');
expect(element(by.xpath(testdata4.AccountInformation.Edit_MiddleName_Input)).getText()).not.toBe('ua');
element(by.xpath(testdata4.AccountInformation.Edit_MiddleName_Input)).clear();
element(by.xpath(testdata4.AccountInformation.Edit_MiddleName_Input)).sendKeys(testdata.Middlename);
browser.sleep(1000);

//fFor testing the label and sending the lastname
expect(element(by.xpath(testdata4.AccountInformation.Edit_LastName_Label)).getText()).toEqual(testdata2.TEXT_LAST_NAME);
expect(element(by.xpath(testdata4.AccountInformation.Edit_LastName_Input)).isDisplayed()).toBe(true);
element(by.xpath(testdata4.AccountInformation.Edit_LastName_Input)).sendKeys('u');
element(by.xpath(testdata4.AccountInformation.Edit_LastName_Input)).clear();
expect(element(by.xpath(testdata4.AccountInformation.Edit_EmptyField_ErrorMsg)).getText()).toEqual(testdata2.TEXT_LAST_NAME_REQUIRED_ERROR_MSG);
element(by.xpath(testdata4.AccountInformation.Edit_LastName_Input)).sendKeys(testdata.Lastname);
expect(element(by.xpath(testdata4.AccountInformation.Edit_LastName_BlueLine)).isDisplayed()).toBe(true);
browser.sleep(1000);

//For testing email label and sending the email
expect(element(by.xpath(testdata4.AccountInformation.Edit_Email_Label)).getText()).toEqual(testdata2.TEXT_EMAIL);
expect(element(by.xpath(testdata4.AccountInformation.Edit_Email_Value)).isDisplayed()).toBe(true);
element(by.xpath(testdata4.AccountInformation.Edit_Email_Value)).clear();
browser.sleep(1000);

//Validating the email address with invalid format throws error
element(by.xpath(testdata4.AccountInformation.Edit_Email_Value)).sendKeys('test.com');
expect(element(by.xpath(testdata4.AccountInformation.Edit_Email_ErrorMsg)).isDisplayed()).toBe(true);
element(by.xpath(testdata4.AccountInformation.Edit_Email_Value)).clear();
element(by.xpath(testdata4.AccountInformation.Edit_Email_Value)).sendKeys('testcom');
expect(element(by.xpath(testdata4.AccountInformation.Edit_Email_ErrorMsg)).isDisplayed()).toBe(true);
element(by.xpath(testdata4.AccountInformation.Edit_Email_Value)).clear();
element(by.xpath(testdata4.AccountInformation.Edit_Email_Value)).sendKeys('test#45@test.com');
expect(element(by.xpath(testdata4.AccountInformation.Edit_Email_ErrorMsg)).isDisplayed()).toBe(true);
element(by.xpath(testdata4.AccountInformation.Edit_Email_Value)).clear();
browser.sleep(1000);

//Validating the save button is disabled when madatory field is left blank
expect(element(by.xpath(testdata4.AccountInformation.Edit_Save)).getAttribute('disabled')).toEqual('true');
browser.sleep(1000);

//Validating the color of the mandatory field when it is left blank
element(by.xpath(testdata4.AccountInformation.Edit_Email_Value)).clear();
expect(element(by.xpath(testdata4.AccountInformation.Edit_Email_Value)).getCssValue('color')).toContain('rgba(36, 36, 36, 1)');
browser.sleep(1000);

//Validating the error message of email field when left blank
expect(element(by.xpath(testdata4.AccountInformation.Edit_EmptyField_ErrorMsg)).getText()).toEqual(testdata2.TEXT_EMAIL_REQUIRED_ERROR_MSG);
element(by.xpath(testdata4.AccountInformation.Edit_Email_Value)).sendKeys(testdata.Email);
expect(element(by.xpath(testdata4.AccountInformation.Edit_Email_BlueLine)).isDisplayed()).toBe(true);
browser.sleep(1000);

//for testing the phone label and sending the phone number
expect(element(by.xpath(testdata4.AccountInformation.Edit_Phone_Label)).getText()).toEqual(testdata2.TEXT_PHONE);
expect(element(by.xpath(testdata4.AccountInformation.Edit_Phone_Value)).isDisplayed()).toBe(true);
element(by.xpath(testdata4.AccountInformation.Edit_Phone_Value)).sendKeys('u');
element(by.xpath(testdata4.AccountInformation.Edit_Phone_Value)).clear();
browser.sleep(1000);

//Gets a random number between min and max
var newno = Math.floor(Math.random() * 9000000000) + 1000000000;
element(by.xpath(testdata4.AccountInformation.Edit_Phone_Value)).sendKeys(newno);
browser.sleep(1000);

//for testing the company name and sending the company name
expect(element(by.xpath(testdata4.AccountInformation.Edit_Company_Value)).isDisplayed()).toBe(true);
element(by.xpath(testdata4.AccountInformation.Edit_Company_Value)).clear();
browser.sleep(1000);

//Validating the company name accepts 255character only 
element(by.xpath(testdata4.AccountInformation.Edit_Company_Value)).sendKeys(testdata.invalidcompname);
expect(element(by.xpath(testdata4.AccountInformation.Edit_Company_Value)).getText()).not.toBe(testdata.invalidcompname);
element(by.xpath(testdata4.AccountInformation.Edit_Company_Value)).clear();
element(by.xpath(testdata4.AccountInformation.Edit_Company_Value)).sendKeys(testdata.company);
browser.sleep(1000);

//for testing and sending billing address
expect(element(by.xpath(testdata4.AccountInformation.Edit_Address1_Label)).getText()).toEqual(testdata2.TEXT_BILLING_ADDRESS);
expect(element(by.xpath(testdata4.AccountInformation.Edit_Address1_Value)).isDisplayed()).toBe(true);
element(by.xpath(testdata4.AccountInformation.Edit_Address1_Value)).sendKeys('u');
element(by.xpath(testdata4.AccountInformation.Edit_Address1_Value)).clear();
expect(element(by.xpath(testdata4.AccountInformation.Edit_EmptyField_ErrorMsg)).getText()).toEqual(testdata2.TEXT_BILLING_ADDRESS_REQUIRED_ERROR_MSG);
element(by.xpath(testdata4.AccountInformation.Edit_Address1_Value)).sendKeys(testdata.address);
expect(element(by.xpath(testdata4.AccountInformation.Edit_Address1_BlueLine)).isDisplayed()).toBe(true);
browser.sleep(1000);

//for testing and sending location
expect(element(by.xpath(testdata4.AccountInformation.Edit_Address2_Label)).isDisplayed()).toBe(true);
element(by.xpath(testdata4.AccountInformation.Edit_Address2_Value)).sendKeys('u');
element(by.xpath(testdata4.AccountInformation.Edit_Address2_Value)).clear();
expect(element(by.xpath(testdata4.AccountInformation.Edit_Address3_Value)).isDisplayed()).toBe(true);
element(by.xpath(testdata4.AccountInformation.Edit_Address3_Value)).sendKeys('u');
element(by.xpath(testdata4.AccountInformation.Edit_Address3_Value)).clear();
element(by.xpath(testdata4.AccountInformation.Edit_Address3_Value)).sendKeys(testdata.city);
browser.sleep(1000);

//for testing and sending city
expect(element(by.xpath(testdata4.AccountInformation.Edit_City_Label)).getText()).toEqual(testdata2.TEXT_CITY);
expect(element(by.xpath(testdata4.AccountInformation.Edit_City_Value)).isDisplayed()).toBe(true);
element(by.xpath(testdata4.AccountInformation.Edit_City_Value)).sendKeys('u');
element(by.xpath(testdata4.AccountInformation.Edit_City_Value)).clear();
element(by.xpath(testdata4.AccountInformation.Edit_City_Value)).sendKeys(testdata.city);
expect(element(by.xpath(testdata4.AccountInformation.Edit_City_BlueLine)).isDisplayed()).toBe(true);
browser.sleep(1000);

//for testing and sending state
expect(element(by.xpath(testdata4.AccountInformation.Edit_State_Label)).getText()).toEqual(testdata2.TEXT_STATE);
element(by.xpath(testdata4.AccountInformation.Edit_State_Value)).sendKeys('u');
element(by.xpath(testdata4.AccountInformation.Edit_State_Value)).clear();
element(by.xpath(testdata4.AccountInformation.Edit_State_Value)).sendKeys(testdata.state);
expect(element(by.xpath(testdata4.AccountInformation.Edit_State_Value)).isDisplayed()).toBe(true);
browser.sleep(1000);

//for testing and sending postal code
expect(element(by.xpath(testdata4.AccountInformation.Edit_Zip_Label)).getText()).toEqual(testdata2.TEXT_ZIP_POSTAL_CODE);
expect(element(by.xpath(testdata4.AccountInformation.Edit_Zip_Value)).isDisplayed()).toBe(true);
element(by.xpath(testdata4.AccountInformation.Edit_Zip_Value)).sendKeys('u');
element(by.xpath(testdata4.AccountInformation.Edit_Zip_Value)).clear();
browser.sleep(1000);

element(by.xpath(testdata4.AccountInformation.Edit_Zip_Value)).sendKeys(testdata.pincode);
element(by.xpath(testdata4.AccountInformation.Edit_Country_Value)).click();
element(by.xpath(testdata4.AccountInformation.Edit_Country_Armenia)).click();
element(by.xpath(testdata4.AccountInformation.Edit_Country_Value)).click();
element(by.xpath(testdata4.AccountInformation.Edit_Country_Aruba)).click();
browser.sleep(1000);

element(by.xpath(testdata4.AccountInformation.Edit_Country_Value)).click();
element(by.xpath(testdata4.AccountInformation.Edit_Country_Armenia)).click();
expect(element(by.xpath(testdata4.AccountInformation.Edit_Save)).isDisplayed()).toBe(true);
element(by.xpath(testdata4.AccountInformation.Edit_Save)).click();
browser.sleep(2000);

expect(element(by.xpath(testdata4.AccountInformation.ToastMsg_Success)).getText()).toEqual(testdata2.TEXT_ACCOUNT_UPDATE_SUCCESSFUL);
console.log(newno);
expect(element(by.xpath(testdata4.AccountInformation.Phone_Value)).getText()).toContain(newno);  
browser.sleep(2000);

    });

it('validate the cancel button', function(){

var testdata2 = protractor.loginHelpers.dashboard();
expect(element(by.xpath(testdata4.AccountInformation.EditLink)).isDisplayed()).toBe(true);
expect(element(by.xpath(testdata4.AccountInformation.EditIcon)).isDisplayed()).toBe(true);
element(by.xpath(testdata4.AccountInformation.EditIcon)).click();
browser.sleep(4000);
expect(element(by.xpath(testdata4.AccountInformation.Edit_Title)).getText()).toEqual(testdata2.TEXT_EDIT_ACCOUNT_INFORMATION);
browser.sleep(2000);
element(by.xpath(testdata4.AccountInformation.Edit_Phone_Value)).sendKeys(testdata.oldno);
element(by.xpath(testdata4.AccountInformation.Edit_Cancel)).click();
browser.sleep(2000);

    });

it('validate accountinformation widget verification after edit', function () {

// verfication
var testdata2 = protractor.loginHelpers.dashboard();
expect(element(by.xpath(testdata4.AccountInformation.Name)).getText()).toEqual(testdata.name);
expect(element(by.xpath(testdata4.AccountInformation.Company)).getText()).toEqual(testdata.companyname);
expect(element(by.xpath(testdata4.AccountInformation.AccountNumber_Value)).getText()).toEqual(testdata3.accnum);
expect(element(by.xpath(testdata4.AccountInformation.AccountNumber_Label)).getText()).toEqual(testdata2.TEXT_ACCOUNT_NUMBER);
expect(element(by.xpath(testdata4.AccountInformation.Address)).getText()).toEqual(testdata.addressafter);
expect(element(by.xpath(testdata4.AccountInformation.Phone_Value)).getText()).not.toEqual(testdata.oldno);
expect(element(by.xpath(testdata4.AccountInformation.Phone_Label)).getText()).toEqual(testdata2.TEXT_PHONE);
expect(element(by.xpath(testdata4.AccountInformation.Email)).getText()).toEqual(testdata.email);
    });

//Q1Bugs :MVIEW-2639:Style: 'Edit Account Information' dialog: layout gets broken if validation errors are displayed for several fields at once
  it('Verify the Edit Account Info layout not broken if validation errors are displayed', function () {
    browser.refresh();  
    browser.sleep(8000);
     //Input file to refer
 var testdata2 = protractor.loginHelpers.dashboard();
  browser.sleep(4000);
  //Validiating Account Information and click on  Edit button link
  element(by.xpath(testdata4.AccountInformation.EditIcon)).click();
  browser.sleep(4000);

     //For testing the label and sending the lastname
 expect(element(by.xpath(testdata4.AccountInformation.Edit_LastName_Label)).getText()).toEqual(testdata2.TEXT_LAST_NAME);
 expect(element(by.xpath(testdata4.AccountInformation.Edit_LastName_Input)).isDisplayed()).toBe(true);
 element(by.xpath(testdata4.AccountInformation.Edit_LastName_Input)).sendKeys('u');
 element(by.xpath(testdata4.AccountInformation.Edit_LastName_Input)).clear();
// expect(element(by.xpath(testdata4.AccountInformation.Edit_EmptyField_ErrorMsg)).getText()).toEqual(testdata2.TEXT_LAST_NAME_REQUIRED_ERROR_MSG);
   
//For testing email field textbox label and sending the email
 expect(element(by.xpath(testdata4.AccountInformation.Edit_Email_Label)).getText()).toEqual(testdata2.TEXT_EMAIL);
 expect(element(by.xpath(testdata4.AccountInformation.Edit_Email_Value)).isDisplayed()).toBe(true);
 element(by.xpath(testdata4.AccountInformation.Edit_Email_Value)).clear();
 
 //for testing the phone field textbox label and sending the phone number
  expect(element(by.xpath(testdata4.AccountInformation.Edit_Phone_Label)).getText()).toEqual(testdata2.TEXT_PHONE);
  expect(element(by.xpath(testdata4.AccountInformation.Edit_Phone_Value)).isDisplayed()).toBe(true);
  element(by.xpath(testdata4.AccountInformation.Edit_Phone_Value)).sendKeys('u');
  element(by.xpath(testdata4.AccountInformation.Edit_Phone_Value)).clear();
//Verify the 'Edit Account Info' layout not broken if validation errors are displayed for several fields at once
element(by.xpath(testdata4.AccountInformation.Alignment_Layout)).getCssValue('height').then((heightLevel) => {

expect(heightLevel).toEqual("30px");
expect(heightLevel).not.toBe("35px");
});
});

it('Verify Verify Padding On Dashboard Page', function () {

//0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10516/ 001_VerifyPadding_On_DashboardPage
browser.refresh();  
browser.sleep(9000);

//element(by.xpath("//a[contains(@ng-if,'charge.type === 'MiscAd')]/following::a[1]""))
element(by.xpath(testdata4.SystemBar.AmountDueAndChargesWidget)).getCssValue('padding-left').then((leftPaddingAmountDueAndCharges) => {
browser.sleep(1000);

element(by.xpath(testdata4.SystemBar.AmountDueWidget)).getCssValue('margin-bottom').then((marginBottomAmountDue) => {
browser.sleep(1000);

element(by.xpath(testdata4.SystemBar.AccountInformationWidget)).getCssValue('padding-left').then((leftPaddingAccountInformation) => {
browser.sleep(1000);

expect(leftPaddingAmountDueAndCharges).toEqual("15px");
expect(marginBottomAmountDue).toEqual("15px");
expect(leftPaddingAccountInformation).toEqual(leftPaddingAmountDueAndCharges);

//Logout from metraview
protractor.loginHelpers.logOutMV();

});
});
});
    });    
});

 

