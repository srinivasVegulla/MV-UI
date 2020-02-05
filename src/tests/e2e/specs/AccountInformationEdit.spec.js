var testdata2 = require('../inputs/testdata/JsonFileCreation.json');
var testdata3 = require('../inputs/testdata/EditAccountInfo.json');
var testdata4= require('../inputs/testdata/AccountInfomation.json');
var testdata5 = require('../inputs/testdata/XpathRepository.json');
var testdata8 = require('../inputs/testdata/Login.json');

describe('UI Baseline App-Edit Account Information Widget', function () {

  it('Login to the application with USerName', function () {
    //Input file to refer
    var testdata9 = protractor.loginHelpers.lang;

    browser.get(testdata2.URL);
    browser.sleep(5000);
    element(by.css(testdata9)).click();
    browser.sleep(3000);
    element(by.xpath(testdata5.LoginPage.UserName)).sendKeys(testdata2.userName3);
    element(by.xpath(testdata5.LoginPage.Password)).sendKeys(testdata2.passwordField);
    browser.findElement(By.xpath(testdata5.LoginPage.LogInButton)).click();
    browser.sleep(12000);
     
});

  it('Validate Account Information widget Edit functionality', function () {

     //Input file to refer
    var testdata8 = protractor.loginHelpers.dashboard();
    
    //Test Case : MetraView_2.0/ Edit_Account_Info/ 011_First_name
    //Verify that the field First Name length should not exceed 40 characters 
    browser.sleep(5000);
    //Click on 'Edit' button in Account Information widget
    element(by.xpath(testdata5.AccountInformation.EditLink)).click();
    browser.sleep(5000);
    browser.actions().mouseMove(element(by.xpath(testdata5.AccountInformation.Edit_Title))).perform();
    browser.sleep(3000);
    element(by.xpath(testdata5.AccountInformation.Edit_FirstName_Input)).clear();
    //Inserting 'First Name' with 43 characters length (more than 40 characters)
    element(by.xpath(testdata5.AccountInformation.Edit_FirstName_Input)).sendKeys(testdata3.invalidFirstname);
    browser.sleep(2000);
    //Validating that the 'First Name' accepts 40 character length only
    expect(element(by.xpath(testdata5.AccountInformation.Edit_FirstName_Input)).getText()).not.toBe(testdata3.invalidFirstname);

    //Test Case : MetraView_2.0/ Edit_Account_Info/ 013_Last_Name
    //Verifying that the field 'Last Name' length should not exceed 40 characters
    browser.refresh();
    browser.sleep(3000);
    //Click on 'Edit' button in Account Information widget
    element(by.xpath(testdata5.AccountInformation.EditLink)).click();
    browser.sleep(5000);
    browser.actions().mouseMove(element(by.xpath(testdata5.AccountInformation.Edit_Title))).perform();
    browser.sleep(3000);
    element(by.xpath(testdata5.AccountInformation.Edit_LastName_Input)).clear();
    //Inserting 'Last Name' with 43 characters length (more than 40 characters)
    element(by.xpath(testdata5.AccountInformation.Edit_LastName_Input)).sendKeys(testdata3.invalidLastname);
    browser.sleep(3000);
    //Validating that the 'Last Name' accepts 40 character length only
    expect(element(by.xpath(testdata5.AccountInformation.Edit_LastName_Input)).getText()).not.toBe(testdata3.invalidLastname);
       
    //Test Case : MetraView_2.0/ Edit_Account_Info/ 014_Company_name
    //Verifying that the field 'Company Name' length should not exceed 255 characters
    browser.refresh();
    browser.sleep(5000);
    //Click on 'Edit' button in Account Information widget
    //
    element(by.xpath(testdata5.AccountInformation.EditLink)).click();
    browser.sleep(5000);
    browser.actions().mouseMove(element(by.xpath(testdata5.AccountInformation.Edit_Title))).perform();
    browser.sleep(5000);
    element(by.xpath(testdata5.AccountInformation.Edit_Company_Value)).clear();
    //Inserting 'Company Name' with 258 characters length (more than 255 characters)
    element(by.xpath(testdata5.AccountInformation.Edit_Company_Value)).sendKeys(testdata3.invalidcompname);
    browser.sleep(3000);
    //Validating that the 'Company Name' accepts 255 character length only
    expect(element(by.xpath(testdata5.AccountInformation.Edit_Company_Value)).getText()).not.toBe(testdata3.invalidcompname);


    //Test Case : MetraView_2.0/ Edit_Account_Info/ 015_Address
    //Verifying that the field 'Address' length should not exceed 100 characters
    browser.refresh();
    browser.sleep(5000);
    //Click on 'Edit' button in Account Information widget
    element(by.xpath(testdata5.AccountInformation.EditLink)).click();
    browser.sleep(5000);
    browser.actions().mouseMove(element(by.xpath(testdata5.AccountInformation.Edit_Title))).perform();
    browser.sleep(5000);
    element(by.xpath(testdata5.AccountInformation.Edit_Address1_Value)).clear();
    //Inserting 'Address' with 103 characters length (more than 100 characters)
    element(by.xpath(testdata5.AccountInformation.Edit_Address1_Value)).sendKeys(testdata3.invalidAddress);
    browser.sleep(3000);
    //Validating that the 'Address' accepts 100 character length only
    expect(element(by.xpath(testdata5.AccountInformation.Edit_Address1_Value)).getText()).not.toBe(testdata3.invalidAddress);

    //Test Case : MetraView_2.0/ Edit_Account_Info/ 016_City
    //Verifying that the field 'City' length should not exceed 40 characters
    browser.refresh();
    browser.sleep(5000);
    //Click on 'Edit' button in Account Information widget
    element(by.xpath(testdata5.AccountInformation.EditLink)).click();
    browser.sleep(5000);
    browser.actions().mouseMove(element(by.xpath(testdata5.AccountInformation.Edit_Title))).perform();
    browser.sleep(5000);
    element(by.xpath(testdata5.AccountInformation.Edit_City_Value)).clear();
    //Inserting 'City' with 43 characters length (more than 40 characters)
    element(by.xpath(testdata5.AccountInformation.Edit_City_Value)).sendKeys(testdata3.invalidCity);
    browser.sleep(3000);
    //Validating that the 'City' accepts 40 character length only
    expect(element(by.xpath(testdata5.AccountInformation.Edit_City_Value)).getText()).not.toBe(testdata3.invalidCity);
       
    //Test Case : MetraView_2.0/ Edit_Account_Info/ 017_State
    //Verifying that the field 'State' length should not exceed 40 characters
    browser.refresh();
    browser.sleep(5000);
    //Click on 'Edit' button in Account Information widget
    element(by.xpath(testdata5.AccountInformation.EditLink)).click();
    browser.sleep(5000);
    browser.actions().mouseMove(element(by.xpath(testdata5.AccountInformation.Edit_Title))).perform();
    browser.sleep(5000);
    element(by.xpath(testdata5.AccountInformation.Edit_State_Value)).clear();
    //Inserting 'State' with 43 characters length (more than 40 characters)
    element(by.xpath(testdata5.AccountInformation.Edit_State_Value)).sendKeys(testdata3.invalidState);
    browser.sleep(3000);
    //Validating that the 'State' accepts 40 character length only
    expect(element(by.xpath(testdata5.AccountInformation.Edit_State_Value)).getText()).not.toBe(testdata3.invalidState);

    //Test Case: MetraView_2.0/ Edit_Account_Info/ 018_Zipcode
    //Verifying that the field 'Zipcode' length should not exceed 40 characters
    browser.refresh();
    browser.sleep(5000);
    //Click on 'Edit' button in Account Information widget
    element(by.xpath(testdata5.AccountInformation.EditLink)).click();
    browser.sleep(5000);
    browser.actions().mouseMove(element(by.xpath(testdata5.AccountInformation.Edit_Title))).perform();
    browser.sleep(5000);
    element(by.xpath(testdata5.AccountInformation.Edit_Zip_Value)).clear();
    //Inserting 'Zipcode' with 43 characters length (more than 40 characters)
    element(by.xpath(testdata5.AccountInformation.Edit_Zip_Value)).sendKeys(testdata3.invalidZipcode);
    browser.sleep(3000);
    //Validating that the 'Zipcode' accepts 40 character length only
    expect(element(by.xpath(testdata5.AccountInformation.Edit_Zip_Value)).getText()).not.toBe(testdata3.invalidZipcode);
      
    //Test Case: MetraView_2.0/ Edit_Account_Info/ 021_Required_fields
    //Verify that the  string "Required Field" with the corresponding symbol should be shown
    browser.refresh();
    browser.sleep(3000);

    //Click on 'Edit' button in Account Information widget
    element(by.xpath(testdata5.AccountInformation.EditLink)).click();
    browser.sleep(5000);
    browser.actions().mouseMove(element(by.xpath(testdata5.AccountInformation.Edit_Title))).perform();
    browser.sleep(3000);
    //Validating  that the string "Required Field"
    expect(element(by.xpath(testdata5.AccountInformation.Required_Field)).getText()).toEqual(testdata8.TEXT_REQUIRED_FIELD);
    browser.sleep(2000);
    //Validating that the corresponding symbol should be shown
    expect(element(by.xpath(testdata5.AccountInformation.Required_Field_BlueLine)).isDisplayed()).toBe(true);
  
    //Test Case: MetraView_2.0/ Edit_Account_Info/ 029_Account_info_display
    //Verify the account information is available below the Account information heading without any overlap          
    //Validates 'Account Information' header is available
    element(By.xpath(testdata5.AccountInformation.Account_Information_Header));
    browser.sleep(3000);
    expect(element(By.xpath(testdata5.AccountInformation.Account_Information_Header)).getText()).toBe(testdata8.TEXT_ACCOUNT_INFORMATION);
      var testdata7=protractor.loginHelpers.dashboard();
    //Validating the display of Address, State, City, Phone, Email fields in account information  
     element.all(by.xpath(testdata5.AccountInformation.Account_Information_Details)).then(function(items) {
    expect(items[0].getText()).toBe(testdata2.corpaccFirstNameValue+" "+testdata2.corpaccMiddleNameValue+" "+testdata2.corpaccLastNameValue+" | "+testdata4.company_Name_old);
    expect(items[1].getText()).toBe(testdata7.TEXT_ACCOUNT_NUMBER+" "+testdata2.corpaccID);
    expect(items[2].getText()).toBe(testdata4.billing_Address1_old + ", " + testdata4.billing_Address2_old + ", " + testdata4.billing_Address3_old);
    expect(items[3].getText()).toContain(testdata4.city_old+ ", " + testdata4.state_old + ", " + testdata4.zIP_old + ",");
    expect(items[4].getText()).toBe(testdata7.TEXT_PHONE + " " + testdata4.oldno);
    expect(items[5].getText()).toBe(testdata4.email_old);

        });
  });

   //MVIEW-2637-Validates that all the fields are correctly pre-filled in 'Edit Account Information' overlay in MetraView     
  it('Validate all fields, that are expected to contain existing user data are pre-filled in "Edit Account Information" widget, ', function () {
      
    browser.refresh();
    browser.sleep(9000);

    //Logout
    element(by.xpath(testdata5.SystemBar.Logout)).click();
    browser.sleep(5000);
    
    //Load the URL
    browser.get(testdata2.URL);
    browser.sleep(3000);
    
    //For language selection
    var testdata7 = protractor.loginHelpers.lang;
    element(by.css(testdata7)).click();
    browser.sleep(3000);
    
    //Log in to MetraView with CorpUS account
    element(by.xpath(testdata5.LoginPage.UserName)).sendKeys(testdata2.corpUS);
    element(by.xpath(testdata5.LoginPage.Password)).sendKeys(testdata2.passwordField);
    browser.sleep(3000);
    
    browser.findElement(By.xpath(testdata5.LoginPage.LogInButton)).click();
    browser.sleep(8000);
    
    //Click on 'Edit' button in Account Information widget
    element(by.xpath(testdata5.AccountInformation.EditLink)).click();
    browser.sleep(5000);
    browser.actions().mouseMove(element(by.xpath(testdata5.AccountInformation.Edit_Title))).perform();
    browser.sleep(3000);
    
    //Validates that the  First Name field is correctly pre-filled in Edit Account Information overlay in MetraView
    element.all(by.xpath(testdata5.AccountInformation.Edit_FirstName_Input)).getAttribute('value').then(function(items) {
    expect(items[0]).toEqual(testdata2.corpUS_FirstName);
    });
    browser.sleep(1000);

    //Validates that the  Middle Name field is correctly pre-filled in Edit Account Information overlay in MetraView
    element.all(by.xpath(testdata5.AccountInformation.Edit_MiddleName_Input)).getAttribute('value').then(function(items) {
    expect(items[0]).toEqual(testdata2.corpUS_MiddleInitial);
    });
    browser.sleep(1000);

    //Validates that the  Last Name field is correctly pre-filled in Edit Account Information overlay in MetraView
    element.all(by.xpath(testdata5.AccountInformation.Edit_LastName_Input)).getAttribute('value').then(function(items) {
    expect(items[0]).toEqual(testdata2.corpUS_LastName)
    });
    browser.sleep(1000);

    //Validates that the  Company Name field is correctly pre-filled in Edit Account Information overlay in MetraView
     element.all(by.xpath(testdata5.AccountInformation.Edit_Company_Value)).getAttribute('value').then(function(items) {
     expect(items[0]).toEqual(testdata2.corpUS_Company)
     });
     browser.sleep(1000);

     //Validates that the  Email field is correctly pre-filled in Edit Account Information overlay in MetraView
     element.all(by.xpath(testdata5.AccountInformation.Edit_Email_Value)).getAttribute('value').then(function(items) {
     expect(items[0]).toEqual(testdata2.corpUS_Email)
     });
     browser.sleep(1000);

     //Validates that the  Phone number field is correctly pre-filled in Edit Account Information overlay in MetraView
      element.all(by.xpath(testdata5.AccountInformation.Edit_Phone_Value)).getAttribute('value').then(function(items) {
      expect(items[0]).toEqual(testdata2.corpUS_Phone)
      });
      browser.sleep(1000);

      //Validates that the  Address1 field is correctly pre-filled in Edit Account Information overlay in MetraView
      element.all(by.xpath(testdata5.AccountInformation.Edit_Address1_Value)).getAttribute('value').then(function(items) {
      expect(items[0]).toEqual(testdata2.corpUS_Address1)
      });
      browser.sleep(1000);

      //Validates that the  Address2 field is correctly pre-filled in Edit Account Information overlay in MetraView
      element.all(by.xpath(testdata5.AccountInformation.Edit_Address2_Value)).getAttribute('value').then(function(items) {
      expect(items[0]).toEqual(testdata2.corpUS_Address2)
      });
      browser.sleep(1000);

      //Validates that the  Address3 field is correctly pre-filled in Edit Account Information overlay in MetraView
      element.all(by.xpath(testdata5.AccountInformation.Edit_Address3_Value)).getAttribute('value').then(function(items) {
      expect(items[0]).toEqual(testdata2.corpUS_Address3)
      });
      browser.sleep(1000);

      //Validates that the  City field is correctly pre-filled in Edit Account Information overlay in MetraView
      element.all(by.xpath(testdata5.AccountInformation.Edit_City_Value)).getAttribute('value').then(function(items) {
      expect(items[0]).toEqual(testdata2.corpUS_City)
      });
      browser.sleep(1000);

      //Validates that the  State field is correctly pre-filled in Edit Account Information overlay in MetraView
      element.all(by.xpath(testdata5.AccountInformation.Edit_State_Value)).getAttribute('value').then(function(items) {
      expect(items[0]).toEqual(testdata2.corpUS_State)
      });
      browser.sleep(1000);

      //Validates that the  ZipCode field is correctly pre-filled in Edit Account Information overlay in MetraView
      element.all(by.xpath(testdata5.AccountInformation.Edit_Zip_Value)).getAttribute('value').then(function(items) {
      expect(items[0]).toEqual(testdata2.corpUS_Zip)
      });
      browser.sleep(1000);

      //Validates that the Country field is correctly pre-filled in Edit Account Information overlay in MetraView
      element.all(by.xpath(testdata5.AccountInformation.Edit_Selected_Country_Option)).getText().then(function(items) {
      expect(items[0]).toEqual(testdata2.corpUS_Country)

      browser.refresh();
      browser.sleep(5000);

      });

      //Logout from the MV2.0 Application 
      protractor.loginHelpers.logOutMV();
  });

  
});