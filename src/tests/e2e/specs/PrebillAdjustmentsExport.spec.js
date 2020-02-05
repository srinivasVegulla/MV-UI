var testData = require('../inputs/testData/JsonFileCreation.json');
var testData2 = require('../inputs/testData/XpathRepository.json');

var downloadpath='C:/Users/Administrator/Downloads/';
var fs = require('fs');

describe('Prebill adjustments Export Functionality related Test cases', function(){

it('Prebill adjustments for Weekly account', function () {

    var testData3 = protractor.loginHelpers.dashboard();
    var testData5 = protractor.loginHelpers.lang;
    //Refresh the main page
    browser.refresh();
    browser.sleep(10000);

    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testData.userName,testData.passwordField);

    //Get Metraview 2.0 URL
    browser.get(testData.URL);
    browser.sleep(5000);

    //Select the reqired Currency
    element(by.css(testData5)).click();
    browser.sleep(3000);

    //Login to MetraView as UserName4(Weekly Account)
    //Enter username as userName2
    element(by.xpath(testData2.LoginPage.UserName)).sendKeys(testData.userName4);

    //Enter password
    element(by.xpath(testData2.LoginPage.Password)).sendKeys(testData.passwordField);

    //Click on Login Button
    browser.findElement(By.xpath(testData2.LoginPage.LogInButton)).click();
    browser.sleep(12000);  

    //Click on Go to Bills Link
    element(by.xpath(testData2.Billing.GoToBillsButton)).click();
    browser.sleep(8000);

    //Test Case: MetraView_2.0/ Export_prebill_Adjustments/ 001_Charges_weekly_account
    //Verify that the user is able to view the 'Charges' Widget in dashboard (weekly account)
    expect(element(by.xpath(testData2.Charges.Title)).getText()).toEqual(testData3.TEXT_CHARGES_TEXT);

    //Test Case: MetraView_2.0/ Export_prebill_Adjustments/ 002_Data_visbility_Charges_weekly_account
    //Verify that the user is able to view the fields 'Charges sub total', 'prebill adjustments' and 'tax' in the 'Charges' Widget in dashboard
    expect(element(by.xpath(testData2.Charges.Charges_SubTotal_Label)).getText()).toEqual(testData3.TEXT_CHARGES_SUB_TOTAL);
    expect(element(by.xpath(testData2.Charges.PrebillAdjustment)).getText()).toEqual(testData3.TEXT_PREBILL_ADJUSTMENTS);
    expect(element(by.xpath(testData2.Charges.Tax)).getText()).toEqual(testData3.TEXT_TAX);

    //Test Case: MetraView_2.0/ Export_prebill_Adjustments/ 003_Pre_bill_adjustments_link_disabled
    //Verify that the user is not able to click/touch on the link of 'prebill adjustments' when there are no adjustments have been issued to this account
    expect(element(by.xpath(testData2.Charges.PrebillAdjustment)).getAttribute('disabled')).toBe('true');

    //Refresh the main page
    browser.refresh();
    browser.sleep(10000);

    // Log Out from Application
    browser.findElement(by.xpath(testData2.SystemBar.Logout)).click();
    browser.sleep(5000);

    //Get Metraview 2.0 URL
    browser.get(testData.URL);
    browser.sleep(5000);

    //Select the reqired Currency
    element(by.css(testData5)).click();
    browser.sleep(3000);

    //Login to MetraView as UserName5(Weekly Account)
    //Enter username as userName5
    element(by.xpath(testData2.LoginPage.UserName)).sendKeys(testData.userName5);

    //Enter password
    element(by.xpath(testData2.LoginPage.Password)).sendKeys(testData.passwordField);

    //Click on Login Button
    browser.findElement(By.xpath(testData2.LoginPage.LogInButton)).click();
    browser.sleep(12000);  

    //Click on Go to Bills Link
    element(by.xpath(testData2.Billing.GoToBillsButton)).click();
    browser.sleep(8000);

    //Test Case: MetraView_2.0/ Export_prebill_Adjustments/ 004_Pre_bill_adjustments_link_enabled
    //Verify that the user should able to click/touch on the link of 'prebill adjustments' when adjustments have been issued to the particular account
    expect(element(by.xpath(testData2.Charges.PrebillAdjustment)).isEnabled()).toBe(true);

    //Test Case: MetraView_2.0/ Export_prebill_Adjustments/ 005_Download_adjustments_weekly_account
    //Click on download button
    element(by.xpath(testData2.Charges.PrebillAdjustment)).click();
    browser.sleep(5000);

    var filename = downloadpath+'PreviousBillAdjustments.csv';

    if (fs.existsSync(filename)) {
    // Make sure the browser doesn't have to rename the download.
    fs.unlinkSync(filename);
    }

    element(by.xpath(testData2.Charges.Popup_Download)).click();
    browser.sleep(10000);

    //Refresh the main page
    browser.refresh();
    browser.sleep(10000);

    //Verify that the list of adjustments should get downloaded
    browser.driver.wait(function() {
    browser.waitForAngular();
    browser.ignoreSynchronization = true;
    return fs.existsSync(filename);
    }, 10000).then(function(){ 

    expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(
    testData3.TEXT_DESCRIPTION, testData.prebillDescription+testData.userName5 );
    });

});

it('Prebill adjustments for Monthly account', function () {

    var testData3 = protractor.loginHelpers.dashboard();
    var testData5 = protractor.loginHelpers.lang;

    //Refresh the main page
    browser.refresh();
    browser.sleep(10000);

    // Log Out from Application
    browser.findElement(by.xpath(testData2.SystemBar.Logout)).click();
    browser.sleep(5000);


    //Get Metraview 2.0 URL
    browser.get(testData.URL);
    browser.sleep(5000);

    //Select the reqired Currency
    element(by.css(testData5)).click();
    browser.sleep(3000);

    //Login to MetraView as UserName6(Monthly Account)
    //Enter username as userName2
    element(by.xpath(testData2.LoginPage.UserName)).sendKeys(testData.userName4);

    //Enter password
    element(by.xpath(testData2.LoginPage.Password)).sendKeys(testData.passwordField);

    //Click on Login Button
    browser.findElement(By.xpath(testData2.LoginPage.LogInButton)).click();
    browser.sleep(12000);  

    //Click on Go to Bills Link
    element(by.xpath(testData2.Billing.GoToBillsButton)).click();
    browser.sleep(8000);

    //Test Case: MetraView_2.0/ Export_prebill_Adjustments/ 007_Charges_monthly_account
    //Verify that the user is able to view the 'Charges' Widget in dashboard (Monthly account)
    expect(element(by.xpath(testData2.Charges.Title)).getText()).toContain(testData3.TEXT_CHARGES_TEXT);

    //Test Case: MetraView_2.0/ Export_prebill_Adjustments/ 008_Data_visbility_Charges_Monthly_account    
    //Verify that the user is able to view the fields 'Charges sub total', 'prebill adjustments' and 'tax' in the 'Charges' Widget in dashboard
    expect(element(by.xpath(testData2.Charges.Charges_SubTotal_Label)).getText()).toEqual(testData3.TEXT_CHARGES_SUB_TOTAL);
    expect(element(by.xpath(testData2.Charges.PrebillAdjustment)).getText()).toEqual(testData3.TEXT_PREBILL_ADJUSTMENTS);
    expect(element(by.xpath(testData2.Charges.Tax)).getText()).toEqual(testData3.TEXT_TAX);

    //Test Case: MetraView_2.0/ Export_prebill_Adjustments/ 009_Pre_bill_adjustments_link_disabled_Monthly_acc
    //Verify that the user is not able to click/touch on the link of 'prebill adjustments' when there are no adjustments have been issued to this account
    expect(element(by.xpath(testData2.Charges.PrebillAdjustment)).getAttribute('disabled')).toBe('true');

    //Refresh the main page
    browser.refresh();
    browser.sleep(10000);

    // Log Out from Application
    browser.findElement(by.xpath(testData2.SystemBar.Logout)).click();
    browser.sleep(5000);

    //Get Metraview 2.0 URL
    browser.get(testData.URL);
    browser.sleep(5000);

    //Select the reqired Currency
    element(by.css(testData5)).click();
    browser.sleep(3000);

    //Login to MetraView as UserName7(Monthly Account)
    //Enter username as userName2
    element(by.xpath(testData2.LoginPage.UserName)).sendKeys(testData.userName7);

    //Enter password
    element(by.xpath(testData2.LoginPage.Password)).sendKeys(testData.passwordField);

    //Click on Login Button
    browser.findElement(By.xpath(testData2.LoginPage.LogInButton)).click();
    browser.sleep(12000);  

    //Click on Go to Bills Link
    element(by.xpath(testData2.Billing.GoToBillsButton)).click();
    browser.sleep(8000);

    //Test Case: MetraView_2.0/ Export_prebill_Adjustments/ 010_Pre_bill_adjustments_link_enabled_Monthly_Acc
    //Verify that the user should able to click/touch on the link of 'prebill adjustments' when adjustments have been issued to the particular account
    expect(element(by.xpath(testData2.Charges.PrebillAdjustment)).isEnabled()).toBe(true);

    //Test Case: MetraView_2.0/ Export_prebill_Adjustments/ 011_Download_adjustments_Monthly_Account
    //Click on download button
    element(by.xpath(testData2.Charges.PrebillAdjustment)).click();
    browser.sleep(10000);

    var filename = downloadpath+'PreviousBillAdjustments.csv';

    if (fs.existsSync(filename)) {
    // Make sure the browser doesn't have to rename the download.
    fs.unlinkSync(filename);
    }

    element(by.xpath(testData2.Charges.Popup_Download)).click();
    browser.sleep(10000);

    //Refresh the main page
    browser.refresh();
    browser.sleep(10000);

    //Verify that the list of adjustments should get downloaded
    browser.driver.wait(function() {
    browser.waitForAngular();
    browser.ignoreSynchronization = true;
    return fs.existsSync(filename);
    }, 10000).then(function(){ 

    expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(
    testData3.TEXT_DESCRIPTION, testData.prebillDescription+testData.userName7 );
    });     

});

it('Prebill adjustments for Quarterly account', function () {

    var testData3 = protractor.loginHelpers.dashboard();
    var testData5 = protractor.loginHelpers.lang;
    //Refresh the main page
    browser.refresh();
    browser.sleep(10000);

    // Log Out from Application
    browser.findElement(by.xpath(testData2.SystemBar.Logout)).click();
    browser.sleep(5000);

    //Get Metraview 2.0 URL
    browser.get(testData.URL);
    browser.sleep(5000);

    //Select the reqired Currency
    element(by.css(testData5)).click();
    browser.sleep(3000);

    //Login to MetraView as UserName8(Quarterly Account)
    //Enter username as userName2
    element(by.xpath(testData2.LoginPage.UserName)).sendKeys(testData.userName8);

    //Enter password
    element(by.xpath(testData2.LoginPage.Password)).sendKeys(testData.passwordField);

    //Click on Login Button
    browser.findElement(By.xpath(testData2.LoginPage.LogInButton)).click();
    browser.sleep(12000);  


    //Click on Go to Bills Link
    element(by.xpath(testData2.Billing.GoToBillsButton)).click();
    browser.sleep(8000);

    //Test Case: MetraView_2.0/ Export_prebill_Adjustments/ 013_Charges_quarterly_account
    //Verify that the user is able to view the 'Charges' Widget in dashboard (Quarterly account)
    expect(element(by.xpath(testData2.Charges.Title)).getText()).toContain(testData3.TEXT_CHARGES_TEXT);

    //Test Case: MetraView_2.0/ Export_prebill_Adjustments/ 014_Data_visbility_Charges_quarterly_acc
    //Verify that the user is able to view the fields 'Charges sub total', 'prebill adjustments' and 'tax' in the 'Charges' Widget in dashboard
    expect(element(by.xpath(testData2.Charges.Charges_SubTotal_Label)).getText()).toEqual(testData3.TEXT_CHARGES_SUB_TOTAL);
    expect(element(by.xpath(testData2.Charges.PrebillAdjustment)).getText()).toEqual(testData3.TEXT_PREBILL_ADJUSTMENTS);
    expect(element(by.xpath(testData2.Charges.Tax)).getText()).toEqual(testData3.TEXT_TAX);

    //Test Case: MetraView_2.0/ Export_prebill_Adjustments/ 015Pre_bill_adjustments_link_disabled_quarterly_ac
    //Verify that the user is not able to click/touch on the link of 'prebill adjustments' when there are no adjustments have been issued to this account
    expect(element(by.xpath(testData2.Charges.PrebillAdjustment)).getAttribute('disabled')).toEqual('true');

    //Refresh the main page
    browser.refresh();
    browser.sleep(10000);

    // Log Out from Application
    browser.findElement(by.xpath(testData2.SystemBar.Logout)).click();
    browser.sleep(5000);


    //Get Metraview 2.0 URL
    browser.get(testData.URL);
    browser.sleep(5000);

    //Select the reqired Currency
    element(by.css(testData5)).click();
    browser.sleep(3000);

    //Login to MetraView as UserName9(Quarterly Account)
    //Enter username as userName2
    element(by.xpath(testData2.LoginPage.UserName)).sendKeys(testData.userName9);

    //Enter password
    element(by.xpath(testData2.LoginPage.Password)).sendKeys(testData.passwordField);

    //Click on Login Button
    browser.findElement(By.xpath(testData2.LoginPage.LogInButton)).click();
    browser.sleep(12000);  


    //Click on Go to Bills Link
    element(by.xpath(testData2.Billing.GoToBillsButton)).click();
    browser.sleep(8000);

    //Test Case: MetraView_2.0/ Export_prebill_Adjustments/ 016_Pre_bill_adjustments_link_enabled_quarterly_Ac
    //Verify that the user should able to click/touch on the link of 'prebill adjustments' when adjustments have been issued to the particular account
    expect(element(by.xpath(testData2.Charges.PrebillAdjustment)).isEnabled()).toBe(true);

    //Test Case: MetraView_2.0/ Export_prebill_Adjustments/ 017_Download_adjustments_Quarterly_Account
    //Click on download button
    element(by.xpath(testData2.Charges.PrebillAdjustment)).click();
    browser.sleep(10000);

    var filename = downloadpath+'PreviousBillAdjustments.csv';

    if (fs.existsSync(filename)) {
    // Make sure the browser doesn't have to rename the download.
    fs.unlinkSync(filename);
    }

    element(by.xpath(testData2.Charges.Popup_Download)).click();
    browser.sleep(10000);

    //Refresh the main page
    browser.refresh();
    browser.sleep(10000);

    //Verify that the list of adjustments should get downloaded
    browser.driver.wait(function() {
    browser.waitForAngular();
    browser.ignoreSynchronization = true;
    return fs.existsSync(filename);
    }, 10000).then(function(){ 

    expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(
    testData3.TEXT_DESCRIPTION, testData.prebillDescription+testData.userName9 );
    });
});

it('Prebill adjustments for Annual account', function () {

    var testData3 = protractor.loginHelpers.dashboard();
    var testData5 = protractor.loginHelpers.lang;

    //Refresh the main page
    browser.refresh();
    browser.sleep(10000);

    // Log Out from Application
    browser.findElement(by.xpath(testData2.SystemBar.Logout)).click();
    browser.sleep(5000);

    //Get Metraview 2.0 URL
    browser.get(testData.URL);
    browser.sleep(5000);

    //Select the reqired Currency
    element(by.css(testData5)).click();
    browser.sleep(3000);

    //Login to MetraView as UserName10(Annually Account)
    //Enter username as userName2
    element(by.xpath(testData2.LoginPage.UserName)).sendKeys(testData.userName10);

    //Enter password
    element(by.xpath(testData2.LoginPage.Password)).sendKeys(testData.passwordField);

    //Click on Login Button
    browser.findElement(By.xpath(testData2.LoginPage.LogInButton)).click();
    browser.sleep(12000);  

    //Click on Go to Bills Link
    element(by.xpath(testData2.Billing.GoToBillsButton)).click();
    browser.sleep(8000);

    //Test Case: MetraView_2.0/ Export_prebill_Adjustments/ 019_Charges_annual_account
    //Verify that the user is able to view the 'Charges' Widget in dashboard (Annual account)
    expect(element(by.xpath(testData2.Charges.Title)).getText()).toContain(testData3.TEXT_CHARGES_TEXT);

    //Test Case: MetraView_2.0/ Export_prebill_Adjustments/ 020_Data_visbility_Charges_Annual_account
    //Verify that the user is able to view the fields 'Charges sub total', 'prebill adjustments' and 'tax' in the 'Charges' Widget in dashboard
    expect(element(by.xpath(testData2.Charges.Charges_SubTotal_Label)).getText()).toEqual(testData3.TEXT_CHARGES_SUB_TOTAL);
    expect(element(by.xpath(testData2.Charges.PrebillAdjustment)).getText()).toEqual(testData3.TEXT_PREBILL_ADJUSTMENTS);
    expect(element(by.xpath(testData2.Charges.Tax)).getText()).toEqual(testData3.TEXT_TAX);

    //Test Case: MetraView_2.0/ Export_prebill_Adjustments/ 021_Pre_bill_adjustments_link_disabled_annual_acc
    //Verify that the user is not able to click/touch on the link of 'prebill adjustments' when there are no adjustments have been issued to this account
    expect(element(by.xpath(testData2.Charges.PrebillAdjustment)).getAttribute('disabled')).toEqual('true');

    //Refresh the main page
    browser.refresh();
    browser.sleep(10000);

    // Log Out from Application
    browser.findElement(by.xpath(testData2.SystemBar.Logout)).click();
    browser.sleep(5000);

    //Get Metraview 2.0 URL
    browser.get(testData.URL);
    browser.sleep(5000);

    //Select the reqired Currency
    element(by.css(testData5)).click();
    browser.sleep(3000);

    //Login to MetraView as UserName11(Annually Account)
    //Enter username as userName2
    element(by.xpath(testData2.LoginPage.UserName)).sendKeys(testData.userName11);

    //Enter password
    element(by.xpath(testData2.LoginPage.Password)).sendKeys(testData.passwordField);

    //Click on Login Button
    browser.findElement(By.xpath(testData2.LoginPage.LogInButton)).click();
    browser.sleep(12000);  

    //Click on Go to Bills Link
    element(by.xpath(testData2.Billing.GoToBillsButton)).click();
    browser.sleep(8000);

    //Test Case: MetraView_2.0/ Export_prebill_Adjustments/ 022_Pre_bill_adjustments_link_enaabled_Annual_acc
    //Verify that the user should able to click/touch on the link of 'prebill adjustments' when adjustments have been issued to the particular account
    expect(element(by.xpath(testData2.Charges.PrebillAdjustment)).isEnabled()).toBe(true);

    //Test Case: MetraView_2.0/ Export_prebill_Adjustments/ 023_Download_adjustments_Annual_Account
    //Click on download button
    element(by.xpath(testData2.Charges.PrebillAdjustment)).click();
    browser.sleep(10000);

    var filename = downloadpath+'PreviousBillAdjustments.csv';

    if (fs.existsSync(filename)) {
    // Make sure the browser doesn't have to rename the download.
    fs.unlinkSync(filename);
    }

    element(by.xpath(testData2.Charges.Popup_Download)).click();
    browser.sleep(10000);

    //Refresh the main page
    browser.refresh();
    browser.sleep(10000);

    // Log Out from Application
    browser.findElement(by.xpath(testData2.SystemBar.Logout)).click();
    browser.sleep(5000);

    //Verify that the list of adjustments should get downloaded
    browser.driver.wait(function() {
    browser.waitForAngular();
    browser.ignoreSynchronization = true;
    return fs.existsSync(filename);
    }, 10000).then(function(){ 

    expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(
    testData3.TEXT_DESCRIPTION, testData.prebillDescription+testData.userName11 );
    });
  
});

});

