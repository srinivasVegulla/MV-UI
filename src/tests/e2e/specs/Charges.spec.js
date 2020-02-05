var testdata1 = require('../inputs/testdata/JsonFileCreation.json');
var testdata3 = require('../inputs/testdata/XpathRepository.json');
var testdata4=require('../inputs/testdata/prebillandpostbillcreation.json');

describe('Charges', function () {

//Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ Sanity_Bugs_TestCases/ 2592_Space_btw_MinusSign_Amount
  it('should validate that there is no space between the minus and the value', function () {

  //Refresh the main page
  browser.refresh();
  browser.sleep(10000);

    var testData5 = protractor.loginHelpers.lang;
    //Get Metraview 2.0 URL
    browser.get(testdata1.URL);
    browser.sleep(5000);

    //Select the reqired Currency
    element(by.css(testData5)).click();
    browser.sleep(3000);

    //Login to MetraView as Corporate User
    //Enter username as userName2
    element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata4.userName);

    //Enter password
    element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata4.passwordField);

    //Click on Login Button
    browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
    browser.sleep(12000);  

    var charges=element(by.xpath(testdata3.Charges.NewCharges_Amount)).getText();

    expect(charges).not.toEqual("- 145.33");
    
    element(by.xpath(testdata3.LayerSelector.Dropdown)).click();
    element(by.xpath(testdata3.LayerSelector.Bills)).click();
    browser.sleep(3000);

    var offerchargestotal=element(by.xpath(testdata3.OfferCharge.ChargesSubtotal_Value)).getText();

    expect(offerchargestotal).not.toEqual("- ");

    //Logout from MV
    protractor.loginHelpers.logOutMV();

  })
}
); 