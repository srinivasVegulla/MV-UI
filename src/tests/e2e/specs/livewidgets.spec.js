var testdata7 = require('../inputs/testdata/XpathRepository.json');
var testdata4 = require('../inputs/testdata/JsonFileCreation.json');

describe('Verify Live Widgets in MetraView', function () {

it('Amount Due Widget', function () {
  //Input file to refer
  var testdata8 = protractor.loginHelpers.viewSelector();
  var testdata9 = protractor.loginHelpers.dashboard();
  browser.refresh();
  browser.sleep(3000);

     //Launch to the MV2.0 application
     protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
     //Login to the MV2.0 application
     protractor.loginHelpers.logInMV(testdata4.userName,testdata4.passwordField);
  // presence of first live widget amount due
  
  expect(element(by.xpath(testdata7.LiveWidget.AmountDue_Label)).isDisplayed()).toBe(true);
  expect(element(by.xpath(testdata7.LiveWidget.AmountDue_Label)).getText()).toEqual(testdata9.TEXT_TOTAL_AMOUNT_DUE);
  expect(element(by.xpath(testdata7.LiveWidget.AmountDue_Text)).isDisplayed()).toBe(true);
  var widget = element(by.xpath(testdata7.LiveWidget.AmountDue_Label));
  browser.executeScript('arguments[0].scrollIntoView()', widget.getWebElement());

  element(by.xpath(testdata7.LiveWidget.GoToBills_AmountDue)).click();
  browser.sleep(3000);

  expect(element(by.xpath(testdata7.LiveWidget.Content_total_AmountDue)).isDisplayed()).toBe(true);
  //expect(element(by.xpath(testdata7.LiveWidget.Payment_Due)).isDisplayed()).toBe(true);
  expect(element(by.xpath(testdata7.LiveWidget.Automatic_Payment_Off)).isDisplayed()).toBe(true);
  expect(element(by.xpath(testdata7.LiveWidget.Make_A_Payment)).isDisplayed()).toBe(true);

  var wid=element(by.xpath(testdata7.LayerSelector.Dropdown));

  browser.executeScript('arguments[0].click();', wid).then(function(){


  browser.sleep(3000);
  element.all(by.xpath(testdata7.LiveWidget.MVPages_List)).then(function(items) {
  expect(items[1].getText()).toEqual(testdata8.MV_VIEW_BILLS);
  });
  expect(element(by.xpath(testdata7.LayerSelector.Bills)).isDisplayed()).toBe(true);

  });
  });

it('Charges(New) widget', function () {
    browser.refresh();
    browser.sleep(2000);
    var testdata8 = protractor.loginHelpers.viewSelector();
    var testdata9 = protractor.loginHelpers.dashboard();
    element(by.xpath(testdata7.LayerSelector.Dropdown)).click();
    element(by.xpath(testdata7.LayerSelector.Bills)).click();
    browser.sleep(5000);
    //presence of second live widget charges
    expect(element(by.xpath(testdata7.Charges.Title)).isPresent()).toBe(true);
    var widget = element(by.xpath(testdata7.Charges.Title));
    browser.executeScript('arguments[0].scrollIntoView()', widget.getWebElement());
    expect(element(by.xpath(testdata7.Charges.Charges_SubTotal_Label)).getText()).toEqual(testdata9.TEXT_CHARGES_SUB_TOTAL);
    browser.sleep(3000);
    expect(element(by.xpath(testdata7.Charges.Charges_Content)).isDisplayed()).toBe(true);
    expect(element(by.xpath(testdata7.Charges.Charges_SubTotal_Label)).isDisplayed()).toBe(true);
    browser.sleep(2000);
    expect(element(by.xpath(testdata7.Charges.PrebillAdjustment)).isDisplayed()).toBe(true);
    expect(element(by.xpath(testdata7.Charges.Tax)).isDisplayed()).toBe(true);
    browser.sleep(3000);
    //BreadCrumd Dropdown Xpath
    var wid=element(by.xpath(testdata7.LayerSelector.Dropdown));
    browser.executeScript('arguments[0].click();', wid).then(function(){
    browser.sleep(5000);  
    //MV Pages List Xpath
    element.all(by.xpath(testdata7.LiveWidget.MVPages_List)).then(function(items) {
      expect(items[1].getText()).toEqual(testdata8.MV_VIEW_BILLS);
    });
    //Validate Bills from the list after click on breadcrumd down arrow
    expect(element(by.xpath(testdata7.LayerSelector.Bills)).isDisplayed()).toBe(true);

     //Logout from metraview
    protractor.loginHelpers.logOutMV();
      
  });

  });

});
