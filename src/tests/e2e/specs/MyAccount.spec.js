var testData = require('../inputs/testData/EditAccountInfo.json');
var testData1 = require('../inputs/testData/XpathRepository.json');
var testdata2 = require('../inputs/testdata/Login.json');
var testdata4 = require('../inputs/testdata/JsonFileCreation.json');

describe('ESR Test Cases MyAccount in MetraView', function () {

  it('Validate Security On Edit functionality', function () {

  //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10521/ 001_NotificationMessage_ShouldNotContain_typoerror
  //Input file to refer
  var testData3 = protractor.loginHelpers.dashboard();

  browser.refresh();
  browser.sleep(10000);

  //Launch to the MV2.0 application
protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);

//Login to the MV2.0 application
protractor.loginHelpers.logInMV(testdata4.userName,testdata4.passwordField);

  //Redirecting to My Account
  element(by.xpath(testData1.LayerSelector.Dropdown)).click();
  element(by.xpath(testData1.LayerSelector.MyAccount)).click();
  browser.sleep(2000);

  //Click on Security On to Update Security Question and answer
  element(by.xpath(testData1.AccountsSettings.EditSecurityOn)).click();
  browser.sleep(2000);

  //Select Security Question
  element(by.xpath(testData1.AccountsSettings.SecurityQuestionDropdown)).click();
  browser.sleep(2000);
  element(by.xpath(testData1.AccountsSettings.SelectFirstSecurityQuestion)).click();
  browser.sleep(3000);

  //Enter the answer
  element(by.xpath(testData1.AccountsSettings.EnterSecurityAnswer)).clear();    
  element(by.xpath(testData1.AccountsSettings.EnterSecurityAnswer)).sendKeys(testData.SecurityQuestionAnswer);
  browser.sleep(3000);

  //Click on Save button
  element(by.xpath(testData1.AccountInformation.Edit_Save)).click();

  //Validate that Security Question is updated successfully
  expect(element(by.xpath(testData1.AccountInformation.ToastMsg_Success)).getText()).toEqual(testData3.TEXT_ACCOUNT_SECURITY_UPDATE_SUCCESSFUL);


  });

 //Test Case: 0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10524/ 001_The_FirstAndLastNameShould_be_Displayed
 it('Verify that First Name & Last Name are displayed within the boundary of the menu', function(){ 
    
  //Navigate to Metraview->My Account page
  browser.refresh();
  browser.sleep(10000);

  //Logout
  element(by.xpath(testData1.SystemBar.Logout)).click();
  browser.sleep(10000);

  //Load the URL
  browser.get(testdata4.URL);
  browser.sleep(4000);

  //For language selection
  var testdata7 = protractor.loginHelpers.lang;
  element(by.css(testdata7)).click();
  browser.sleep(2000);

  //Login to MetraView 
  element(by.xpath(testData1.LoginPage.UserName)).sendKeys(testdata4.userName13);
  element(by.xpath(testData1.LoginPage.Password)).sendKeys(testdata4.passwordField);
  browser.findElement(By.xpath(testData1.LoginPage.LogInButton)).click();
  browser.sleep(8000);

  element(by.xpath(testData1.LayerSelector.Dropdown)).click();
  element(by.xpath(testData1.LayerSelector.MyAccount)).click();
  browser.sleep(15000);

  //Click on Account Information's Edit Icon
  element(by.xpath(testData1.AccountInformation.EditLink)).click();
  browser.sleep(5000);

  //Edit the account information such that First Name & Last Name are too long
  element(by.xpath(testData1.AccountInformation.Edit_FirstName_Input)).clear();
  element(by.xpath(testData1.AccountInformation.Edit_FirstName_Input)).sendKeys("sasasasasasasasasasasasasasasasasasasasa");
  browser.sleep(2000);
  element(by.xpath(testData1.AccountInformation.Edit_LastName_Input)).clear();
  element(by.xpath(testData1.AccountInformation.Edit_LastName_Input)).sendKeys("mqmqmqmqmqmqmqmqmqmqmqmqmqmqmqmqmqmqmqmq");
  browser.sleep(2000);
  element(by.xpath(testData1.AccountInformation.Edit_City_Value)).clear();
  element(by.xpath(testData1.AccountInformation.Edit_City_Value)).sendKeys("HYD");
  browser.sleep(3000);
  element(by.xpath(testData1.AccountInformation.Edit_Zip_Value)).clear();
  element(by.xpath(testData1.AccountInformation.Edit_Zip_Value)).sendKeys(1234567);
  browser.sleep(3000);
  element(by.xpath(testData1.AccountInformation.Edit_Address1_Value)).clear();
  element(by.xpath(testData1.AccountInformation.Edit_Address1_Value)).sendKeys('A1');
  browser.sleep(2000);
  element(by.xpath(testData1.AccountInformation.Edit_Email_Value)).clear();
  element(by.xpath(testData1.AccountInformation.Edit_Email_Value)).sendKeys('test@test.com');
  browser.sleep(3000);
  element(by.xpath(testData1.AccountInformation.Edit_Country_Value)).click();
  element(by.xpath(testData1.AccountInformation.Edit_Country_Armenia)).click();
  browser.sleep(3000);
  element(by.xpath(testData1.AccountInformation.Edit_Save)).click();
  browser.sleep(2000);

  //Click on the arrow beside the account name in the Header
  element(by.xpath(testData1.SystemBar.AccountName)).click();
  browser.sleep(4000);

  //Verify the First Name & Last Names are displayed within the boundary of the menu
  expect(element(by.xpath(testData1.SystemBar.AccountDownArrow_NameFields)).getText()).toContain("sasasasasasasasasasasasasasasasasasasasa");
  expect(element(by.xpath(testData1.SystemBar.AccountDownArrow_NameFields)).getText()).toContain("mqmqmqmqmqmqmqmqmqmqmqmqmqmqmqmqmqmqmqmq");

  //ESR-10527/ 001_Nbsp_shouldBeDisplayed_no_CodeTo_BeDisplayed
  //Verify no code is displayed similar to "&nbsp"
   expect(element(by.xpath(testData1.SystemBar.SystemBar_Menu)).getText()).not.toContain("&nbsp");

});


 //Test Case: 0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10488/ 001_Verify_NoOverlapsBetweenTheCards_InActivityLog
 //Testcase: 0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10513/ 001_VerifyNonAvailabilityOfPaperInvoiceAttribute
 it('Verify that updated Account Information are reflected under Activity Log-widget and Paper Invoice attribute should not be displayed in the drop-down', function(){ 
    
    //Input file to refer
    var testdata5 = protractor.loginHelpers.dashboard();

    //Refresh the page
    browser.refresh();
    browser.sleep(10000);

    //Logout
    element(by.xpath(testData1.SystemBar.Logout)).click();
    browser.sleep(10000);

    //Load the URL
    browser.get(testdata4.URL);
    browser.sleep(4000);

    //For language selection
    var testdata7 = protractor.loginHelpers.lang;
    element(by.css(testdata7)).click();
    browser.sleep(2000);

    //Log in to MetraView 
    element(by.xpath(testData1.LoginPage.UserName)).sendKeys(testdata4.userName2);
    element(by.xpath(testData1.LoginPage.Password)).sendKeys(testdata4.passwordField);
    browser.findElement(By.xpath(testData1.LoginPage.LogInButton)).click();
    browser.sleep(8000);

    element(by.xpath(testData1.LayerSelector.Dropdown)).click();
    element(by.xpath(testData1.LayerSelector.MyAccount)).click();
    browser.sleep(8000);

    //Click on Account Information's Edit Icon
    element(by.xpath(testData1.AccountInformation.EditLink)).click();
    browser.sleep(5000);
    
    //Edit the account information such that First Name
    element(by.xpath(testData1.AccountInformation.Edit_FirstName_Input)).clear();
    element(by.xpath(testData1.AccountInformation.Edit_FirstName_Input)).sendKeys("CorpAcc");
    browser.sleep(2000);
    element(by.xpath(testData1.AccountInformation.Edit_Save)).click();
    browser.sleep(5000);

    //Click on Account Information's Edit Icon
    element(by.xpath(testData1.AccountInformation.EditLink)).click();
    browser.sleep(5000);

    //Edit the account information such that Phone Number
    element(by.xpath(testData1.AccountInformation.Edit_Phone_Value)).clear();
    //Gets a random number between min and max
    var newno = Math.floor(Math.random() * 9000000000) + 1000000000;
    element(by.xpath(testData1.AccountInformation.Edit_Phone_Value)).sendKeys(newno);
    browser.sleep(2000);
    element(by.xpath(testData1.AccountInformation.Edit_Save)).click();
    browser.sleep(3000);

    browser.refresh();
    browser.sleep(10000);

    //Logout
    element(by.xpath(testData1.SystemBar.Logout)).click();
    browser.sleep(6000);

    //Load the URL
    browser.get(testdata4.URL);
    browser.sleep(4000);

    //For language selection
    var testdata8 = protractor.loginHelpers.lang;
    element(by.css(testdata8)).click();
    browser.sleep(2000);

    //Log in to MetraView 
    element(by.xpath(testData1.LoginPage.UserName)).sendKeys(testdata4.userName2);
    element(by.xpath(testData1.LoginPage.Password)).sendKeys(testdata4.passwordField);
    browser.findElement(By.xpath(testData1.LoginPage.LogInButton)).click();
    browser.sleep(10000);

    //Click on 'My Account'
    element(by.xpath(testData1.LayerSelector.Dropdown)).click();
    element(by.xpath(testData1.LayerSelector.MyAccount)).click();
    browser.sleep(6000);

    element(by.xpath(testData1.ActivityLog.ViewAll)).click();
    browser.sleep(5000);

    //Expand the Activity log
    element(by.xpath(testData1.ActivityLog.Expand)).click();
    browser.sleep(3000);

    //Verify the updated account informations are reflected
    expect(element(by.xpath(testData1.ActivityLog.UpdateMessage)).getText()).toContain(newno);

    //Collapse the activity log
    element(by.xpath(testData1.ActivityLog.Collapse)).click();
    browser.sleep(3000);

    browser.refresh();
    browser.sleep(10000);

    //Logout
    element(by.xpath(testData1.SystemBar.Logout)).click();
    browser.sleep(6000);

    //Load the URL
    browser.get(testdata4.URL);
    browser.sleep(4000);

    //For language selection
    var testdata9 = protractor.loginHelpers.lang;
    element(by.css(testdata9)).click();
    browser.sleep(2000);

    //Log in to MetraView 
    element(by.xpath(testData1.LoginPage.UserName)).sendKeys(testdata4.userName2);
    element(by.xpath(testData1.LoginPage.Password)).sendKeys(testdata4.passwordField);
    browser.findElement(By.xpath(testData1.LoginPage.LogInButton)).click();
    browser.sleep(10000);

    browser.refresh();
    browser.sleep(10000);

    //Click on 'ViewAll' under activity log.
    element(by.xpath(testData1.ActivityLog.ViewAll)).click();
    browser.sleep(5000);

    //Expand the Activity log
    element(by.xpath(testData1.ActivityLog.Expand)).click();
    browser.sleep(3000);

    //Verify the updated account informations are reflected
    expect(element(by.xpath(testData1.ActivityLog.UpdateMessage)).getText()).toContain(newno);

    //Collapse the activity log
    element(by.xpath(testData1.ActivityLog.Collapse)).click();
    browser.sleep(3000);

    //Verify no overlaps are seen between the cards
    element(by.xpath(testData1.ActivityLog.ActivityLog_FirstCard)).getCssValue('padding-left').then((leftPaddingFirstCard) => {

      element(by.xpath(testData1.ActivityLog.ActivityLog_SecondCard)).getCssValue('padding-right').then((leftPaddingSecondCard) => {

              expect(leftPaddingFirstCard).toEqual("15px");
              expect(leftPaddingSecondCard).toEqual("15px");
              expect(leftPaddingFirstCard).toEqual(leftPaddingSecondCard);
      });
    });

    //Refresh the page
    browser.refresh();
    browser.sleep(10000);

    //Reverting back the account information
    element(by.xpath(testData1.LayerSelector.Dropdown)).click();
    element(by.xpath(testData1.LayerSelector.MyAccount)).click();
    browser.sleep(6000);

    //Click on Account Information's Edit Icon
    element(by.xpath(testData1.AccountInformation.EditLink)).click();
    browser.sleep(5000);

    //Update the phone number back to the original one
    element(by.xpath(testData1.AccountInformation.Edit_Phone_Value)).clear();
    element(by.xpath(testData1.AccountInformation.Edit_Phone_Value)).sendKeys(testdata2.oldno);
    browser.sleep(2000);
    element(by.xpath(testData1.AccountInformation.Edit_Save)).click();
    browser.sleep(2000);

    //Click on 'Paper Invoice' Link
    element(by.xpath(testData1.MyAccountLayer.PaperInvoice)).click();
    browser.sleep(2000);

    //Click on 'Paper Invoice' drop down button
    var wid1=element(by.xpath(testData1.MyAccountLayer.PaperInvoice_DropdownButton));
    browser.executeScript('arguments[0].click();', wid1);
    browser.sleep(5000);

    //Verify in the drop-down, 'Paper Invoice' attribute is not displayed
    element.all(by.xpath(testData1.MyAccountLayer.PaperInvoice_DropdownList)).then(function(items)
    {
          expect(items[0].getText()).not.toContain(testdata5.TEXT_PAPER_INVOICE);
          expect(items[1].getText()).not.toContain(testdata5.TEXT_PAPER_INVOICE);
          expect(items[2].getText()).not.toContain(testdata5.TEXT_PAPER_INVOICE);
          expect(items[3].getText()).not.toContain(testdata5.TEXT_PAPER_INVOICE);
    })

    //Logout from metraview
   protractor.loginHelpers.logOutMV();
            
});

});