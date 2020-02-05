var testdata = require('../inputs/testdata/BillingPeriodTotal.json');
var testdata3 = require('../inputs/testdata/XpathRepository.json');
var testdata5 = require('../inputs/testdata/JsonFileCreation.json');

describe('Verify Billing Period Total in MetraView', function () {

  it('should scroll down to widget location', function () {

    browser.refresh();
    browser.sleep(3000);

    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);

     //Login to the MV2.0 application
     protractor.loginHelpers.logInMV(testdata5.userName,testdata5.passwordField);

    element(by.xpath(testdata3.LayerSelector.Dropdown)).click();
    element(by.xpath(testdata3.LayerSelector.Bills)).click();
    browser.sleep(3000);
    //validating estimated total bill widget
    var el = element(by.xpath(testdata3.BillTotal.BillTotalSection));
    //var el = element(by.xpath("//ecb-total-bill-amount[@class='ng-isolate-scope']"));
    browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
  });
  
  it('Validate BillingPeriodTotal', function () {
    //Input file to refer
    var testdata4 = protractor.loginHelpers.dashboard();
    browser.sleep(4000);
    expect(element(by.xpath(testdata3.BillTotal.Label)).getText()).toEqual(testdata4.TEXT_ACTUAL_TOTAL_BILL_AMOUNT);
    //validate previous period balance
    expect(element(by.xpath(testdata3.BillTotal.Amount)).isDisplayed()).toBe(true);
    //validate previous period balance
    expect(element(by.xpath(testdata3.BillTotal.PreviousPeriodBalance)).isDisplayed()).toBe(true);
    //validate previous period balance text
    expect(element(by.xpath(testdata3.BillTotal.PreviousPeriodBalance)).getText()).toEqual(testdata4.TEXT_TOTAL_BALANCE);
    //validate previous period balance amount
    expect(element(by.xpath(testdata3.BillTotal.PreviousPeriodAmount)).isDisplayed()).toBe(true);
      //validate previous Total charges text
    expect(element(by.xpath(testdata3.BillTotal.TotalCharges_Label)).isDisplayed()).toBe(true);
    expect(element(by.xpath(testdata3.BillTotal.TotalCharges_Label)).getText()).toEqual(testdata4.TEXT_TOTAL_CHARGES);
      //validate previous Total charges amount
    expect(element(by.xpath(testdata3.BillTotal.TotalCharges_Amount)).isDisplayed()).toBe(true);
   
    //Logout from metraview
  protractor.loginHelpers.logOutMV();

  
  });
});