
describe('Tree functionality', function () {
  var xpathRepo = require('../inputs/testData/XpathRepository.json');
  var sceJson1 = require('../inputs/testData/TreeViewScenario1.json');
  var sceJson2 = require('../inputs/testData/TreeViewScenario2.json');

it('Validating Tree View functionality for corp Accounts ', function () {
  var dashboardLocale=protractor.loginHelpers.dashboard();
  //Launch to the MV2.0 application
  protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
  //Login to the MV2.0 application
  protractor.loginHelpers.logInMV(sceJson1.corporateAccountUserName,sceJson1.passwordField);

  //Click on Go to Bills Link
  element(by.xpath(xpathRepo.Billing.GoToBillsButton)).click();
  browser.sleep(2000);

  element.all(by.css(xpathRepo.TreeView.Chevron)).then((items) => {
  element.all(by.css(xpathRepo.TreeView.Chevron)).count().then((n) => {
  expect(n).toEqual(6);
  for(var i=0;i<n;i++)
  {
  items[i].getCssValue('width').then((width) => {
  expect(width).toEqual(('20px'));
  });   
  }
  });
  });
  //Verify MiscAdjustments link
  element(by.css(xpathRepo.TreeView.MiscAdjust_Link)).click();
  expect(element(by.xpath(xpathRepo.TreeView.MiscAjustment)).isDisplayed()).toBe(true);
  //var wid1=element(by.css(xpathRepo.TreeView.Close_Icon));           browser.executeScript('arguments[0].click();', wid1);
  var wid1=element(by.css(xpathRepo.TreeView.Close_Icon));
  browser.executeScript('arguments[0].click();', wid1);
  browser.sleep(2000);
  //Verify NonStandard Charges link
  element(by.css(xpathRepo.TreeView.NSC_Link)).click();
  expect(element(by.xpath(xpathRepo.TreeView.Nsc_View)).isDisplayed()).toBe(true);
  var wid1=element(by.css(xpathRepo.TreeView.Close_Icon));
  browser.executeScript('arguments[0].click();', wid1);
  //verify details for different intervals
  expect(element(by.xpath(xpathRepo.TreeView.Group_Usage)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.TreeView.Recurring_Charge)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.TreeView.UDRC)).isDisplayed()).toBe(true);
  //click on dropdown menu
  element(by.xpath(xpathRepo.TreeView.Sort_By)).click();
  browser.sleep(3000);
  element(by.css(xpathRepo.TreeView.SecondChild)).click();
  expect(element(by.xpath(xpathRepo.TreeView.Group_Usage)).isDisplayed()).toBe(true);
  element(by.xpath(xpathRepo.TreeView.Sort_By)).click();
  browser.sleep(3000);
  element(by.css(xpathRepo.TreeView.FirstChild)).click();
  //Verify ACcount view and charges under this
  element(by.xpath(xpathRepo.OfferCharge.AccountView_Pane)).click();
  element(by.xpath(xpathRepo.TreeView.CorpAcc)).click();
  element.all(by.css(xpathRepo.TreeView.Chevron)).then((items) => {
  element.all(by.css(xpathRepo.TreeView.Chevron)).count().then((n) => {
  expect(n).toEqual(8);
  for(var i=0;i<n;i++)
  {
  items[i].getCssValue('width').then((width) => {
  expect(width).toEqual(('20px'));
  });
  }
  });
  });
  //verify Misc Adjustments link
  element(by.xpath(xpathRepo.TreeView.Adjust_LinkAccount+dashboardLocale.TEXT_MISC_ADJUSTMENTS+xpathRepo.Transactions.CloseXpath)).click();
  expect(element(by.xpath(xpathRepo.TreeView.MiscAjustment)).isDisplayed()).toBe(true);
  var wid1=element(by.css(xpathRepo.TreeView.Close_Icon));
  browser.executeScript('arguments[0].click();', wid1);
  browser.sleep(2000);
  //Verify NonStandardCharges link
  element(by.xpath(xpathRepo.TreeView.Adjust_LinkAccount+dashboardLocale.TEXT_NON_STANDARD_CHARGES+xpathRepo.Transactions.CloseXpath)).click();
  expect(element(by.xpath(xpathRepo.TreeView.Nsc_View)).isDisplayed()).toBe(true);
  var wid1=element(by.css(xpathRepo.TreeView.Close_Icon));
  browser.executeScript('arguments[0].click();', wid1);
  //Verify StandalonePI link
  element(by.xpath(xpathRepo.TreeView.AudiConfig)).click();
  element(by.css(xpathRepo.TreeView.OfferCharge_Close)).click();
});
it('Validating Tree View functionality for Deparment Accounts ', function () {

  //Launch to the MV2.0 application
  protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
  //Login to the MV2.0 application
  protractor.loginHelpers.logInMV(sceJson1.departmentAccountUserName,sceJson1.passwordField);
  //Click on Go to Bills Link
  element(by.xpath(xpathRepo.Billing.GoToBillsButton)).click();
  browser.sleep(2000);
  element.all(by.css(xpathRepo.TreeView.Chevron)).then((items) => {
  element.all(by.css(xpathRepo.TreeView.Chevron)).count().then((n) => {
  expect(n).toEqual(6);
  for(var i=0;i<n;i++)
  {
  items[i].getCssValue('width').then((width) => {
  expect(width).toEqual(('20px'));
  });
  }
  });
  });
  //verify Misc Adjustments link
  element(by.css(xpathRepo.TreeView.MiscAdjust_Link)).click();
  expect(element(by.xpath(xpathRepo.TreeView.MiscAjustment)).isDisplayed()).toBe(true);
  var wid1=element(by.css(xpathRepo.TreeView.Close_Icon));
  browser.executeScript('arguments[0].click();', wid1);
  browser.sleep(2000);
  //Verify NonStandardCharges link
  element(by.css(xpathRepo.TreeView.NSC_Link)).click();
  expect(element(by.xpath(xpathRepo.TreeView.Nsc_View)).isDisplayed()).toBe(true);
  var wid1=element(by.css(xpathRepo.TreeView.Close_Icon));
  browser.executeScript('arguments[0].click();', wid1);
});
it('Validating Tree View functionality for corp Accounts ', function () {
  var dashboardLocale=protractor.loginHelpers.dashboard();
  //Launch to the MV2.0 application
  protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
  //Login to the MV2.0 application
  protractor.loginHelpers.logInMV(sceJson2.corporateAccountUserName,sceJson1.passwordField);
  //Click on Go to Bills Link
  element(by.xpath(xpathRepo.Billing.GoToBillsButton)).click();
  browser.sleep(2000);
  element.all(by.css(xpathRepo.TreeView.Chevron)).then((items) => {
  element.all(by.css(xpathRepo.TreeView.Chevron)).count().then((n) => {
  expect(n).toEqual(6);
  for(var i=0;i<n;i++)
  {
  items[i].getCssValue('width').then((width) => {
  expect(width).toEqual(('20px'));
  });
  }
  });
  });
  //verify Misc Adjustments link
  element(by.css(xpathRepo.TreeView.MiscAdjust_Link)).click();
  expect(element(by.xpath(xpathRepo.TreeView.MiscAjustment)).isDisplayed()).toBe(true);
  var wid1=element(by.css(xpathRepo.TreeView.Close_Icon));
  browser.executeScript('arguments[0].click();', wid1);
  browser.sleep(2000);
  //Verify NonStandardCharges link
  element(by.css(xpathRepo.TreeView.NSC_Link)).click();
  expect(element(by.xpath(xpathRepo.TreeView.Nsc_View)).isDisplayed()).toBe(true);
  var wid1=element(by.css(xpathRepo.TreeView.Close_Icon));
  browser.executeScript('arguments[0].click();', wid1);
  //verify details for different intervals
  expect(element(by.xpath(xpathRepo.TreeView.Group_Usage)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.TreeView.Recurring_Charge)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.TreeView.UDRC)).isDisplayed()).toBe(true);
  //click on dropdown menu
  element(by.xpath(xpathRepo.TreeView.Sort_By)).click();
  browser.sleep(3000);
  element(by.css(xpathRepo.TreeView.SecondChild)).click();
  expect(element(by.xpath(xpathRepo.TreeView.Group_Usage)).isDisplayed()).toBe(true);
  element(by.xpath(xpathRepo.TreeView.Sort_By)).click();
  browser.sleep(3000);
  element(by.css(xpathRepo.TreeView.FirstChild)).click();
  //Verify ACcount view and charges under this
  element(by.xpath(xpathRepo.OfferCharge.AccountView_Pane)).click();
  element(by.xpath(xpathRepo.TreeView.CorpAcc)).click();
  element.all(by.css(xpathRepo.TreeView.Chevron)).then((items) => {
  element.all(by.css(xpathRepo.TreeView.Chevron)).count().then((n) => {
  expect(n).toEqual(8);
  for(var i=0;i<n;i++)
  {
  items[i].getCssValue('width').then((width) => {
  expect(width).toEqual(('20px'));
  });
  }
  });
  });
  //verify Misc Adjustments link
  element(by.xpath(xpathRepo.TreeView.Adjust_LinkAccount+dashboardLocale.TEXT_MISC_ADJUSTMENTS+xpathRepo.Transactions.CloseXpath)).click();
  expect(element(by.xpath(xpathRepo.TreeView.MiscAjustment)).isDisplayed()).toBe(true);
  var wid1=element(by.css(xpathRepo.TreeView.Close_Icon));           
  browser.executeScript('arguments[0].click();', wid1);
  browser.sleep(2000);
  //Verify NonStandardCharges link
  element(by.xpath(xpathRepo.TreeView.Adjust_LinkAccount+dashboardLocale.TEXT_NON_STANDARD_CHARGES+xpathRepo.Transactions.CloseXpath)).click();
  expect(element(by.xpath(xpathRepo.TreeView.Nsc_View)).isDisplayed()).toBe(true);
  var wid1=element(by.css(xpathRepo.TreeView.Close_Icon));           
  browser.executeScript('arguments[0].click();', wid1);
  //Verify StandalonePI link
  element(by.xpath(xpathRepo.TreeView.AudiConfig)).click();
  element(by.css(xpathRepo.TreeView.OfferCharge_Close)).click();

});
it('Validating Tree View functionality for Deparment Accounts ', function () {
  //Launch to the MV2.0 application
  protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
  //Login to the MV2.0 application
  protractor.loginHelpers.logInMV(sceJson1.departmentAccountUserName,sceJson1.passwordField);

  //Click on Go to Bills Link
  element(by.xpath(xpathRepo.Billing.GoToBillsButton)).click();
  browser.sleep(2000);
  element.all(by.css(xpathRepo.TreeView.Chevron)).then((items) => {
  element.all(by.css(xpathRepo.TreeView.Chevron)).count().then((n) => {
  expect(n).toEqual(6);
  for(var i=0;i<n;i++)
  {
  items[i].getCssValue('width').then((width) => {
  expect(width).toEqual(('20px'));
  });
  }
  });
  });
  //verify Misc Adjustments link
  element(by.css(xpathRepo.TreeView.MiscAdjust_Link)).click();
  expect(element(by.xpath(xpathRepo.TreeView.MiscAjustment)).isDisplayed()).toBe(true);
  var wid1=element(by.css(xpathRepo.TreeView.Close_Icon));           
  browser.executeScript('arguments[0].click();', wid1);
  browser.sleep(2000);
  //Verify NonStandardCharges link
  element(by.css(xpathRepo.TreeView.NSC_Link)).click();
  expect(element(by.xpath(xpathRepo.TreeView.Nsc_View)).isDisplayed()).toBe(true);
  var wid1=element(by.css(xpathRepo.TreeView.Close_Icon));           
  browser.executeScript('arguments[0].click();', wid1);
});
it('Validating Tree View functionality for corp Accounts ', function () {
  var dashboardLocale=protractor.loginHelpers.dashboard();
  //Launch to the MV2.0 application
  protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
  //Login to the MV2.0 application
  protractor.loginHelpers.logInMV(sceJson2.corporateAccountUserName,sceJson1.passwordField);
  //Click on Go to Bills Link
  element(by.xpath(xpathRepo.Billing.GoToBillsButton)).click();
  browser.sleep(2000);
  element.all(by.css(xpathRepo.TreeView.Chevron)).then((items) => {
  element.all(by.css(xpathRepo.TreeView.Chevron)).count().then((n) => {
  expect(n).toEqual(6);
  for(var i=0;i<n;i++)
  {
  items[i].getCssValue('width').then((width) => {
  expect(width).toEqual(('20px'));
  });
  }
  });
  });
  //verify Misc Adjustments link
  element(by.css(xpathRepo.TreeView.MiscAdjust_Link)).click();
  expect(element(by.xpath(xpathRepo.TreeView.MiscAjustment)).isDisplayed()).toBe(true);
  var wid1=element(by.css(xpathRepo.TreeView.Close_Icon));           
  browser.executeScript('arguments[0].click();', wid1);
  browser.sleep(2000);
  //Verify NonStandardCharges link
  element(by.css(xpathRepo.TreeView.NSC_Link)).click();
  expect(element(by.xpath(xpathRepo.TreeView.Nsc_View)).isDisplayed()).toBe(true);
  var wid1=element(by.css(xpathRepo.TreeView.Close_Icon));           
  browser.executeScript('arguments[0].click();', wid1);
  //verify details for different intervals
  expect(element(by.xpath(xpathRepo.TreeView.Group_Usage)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.TreeView.Recurring_Charge)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.TreeView.UDRC)).isDisplayed()).toBe(true);
  //click on dropdown menu
  element(by.xpath(xpathRepo.TreeView.Sort_By)).click();
  browser.sleep(3000);
  element(by.css(xpathRepo.TreeView.SecondChild)).click();
  expect(element(by.xpath(xpathRepo.TreeView.Group_Usage)).isDisplayed()).toBe(true);
  element(by.xpath(xpathRepo.TreeView.Sort_By)).click();
  browser.sleep(3000);
  element(by.css(xpathRepo.TreeView.FirstChild)).click();
  //Verify ACcount view and charges under this
  element(by.xpath(xpathRepo.OfferCharge.AccountView_Pane)).click();
  element(by.xpath(xpathRepo.TreeView.CorpAcc)).click();
  element.all(by.css(xpathRepo.TreeView.Chevron)).then((items) => {
  element.all(by.css(xpathRepo.TreeView.Chevron)).count().then((n) => {
  expect(n).toEqual(8);
  for(var i=0;i<n;i++)
  {
  items[i].getCssValue('width').then((width) => {
  expect(width).toEqual(('20px'));
  });
  }
  });
});
  //verify Misc Adjustments link
  element(by.xpath(xpathRepo.TreeView.Adjust_LinkAccount+dashboardLocale.TEXT_MISC_ADJUSTMENTS+xpathRepo.Transactions.CloseXpath)).click();
  expect(element(by.xpath(xpathRepo.TreeView.MiscAjustment)).isDisplayed()).toBe(true);
  var wid1=element(by.css(xpathRepo.TreeView.Close_Icon));           
  browser.executeScript('arguments[0].click();', wid1);
  browser.sleep(2000);
  //Verify NonStandardCharges link
  element(by.xpath(xpathRepo.TreeView.Adjust_LinkAccount+dashboardLocale.TEXT_NON_STANDARD_CHARGES+xpathRepo.Transactions.CloseXpath)).click();
  expect(element(by.xpath(xpathRepo.TreeView.Nsc_View)).isDisplayed()).toBe(true);
  var wid1=element(by.css(xpathRepo.TreeView.Close_Icon));           
  browser.executeScript('arguments[0].click();', wid1);
  //Verify StandalonePI link
  element(by.xpath(xpathRepo.TreeView.AudiConfig)).click();
  element(by.css(xpathRepo.TreeView.OfferCharge_Close)).click();
});
it('Validating Tree View functionality for Deparment Accounts ', function () {
  //Launch to the MV2.0 application
  protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
  //Login to the MV2.0 application
  protractor.loginHelpers.logInMV(sceJson1.departmentAccountUserName,sceJson1.passwordField);

  //Click on Go to Bills Link
  element(by.xpath(xpathRepo.Billing.GoToBillsButton)).click();
  browser.sleep(2000);
  element.all(by.css(xpathRepo.TreeView.Chevron)).then((items) => {
  element.all(by.css(xpathRepo.TreeView.Chevron)).count().then((n) => {
  expect(n).toEqual(6);
  for(var i=0;i<n;i++)
  {
  items[i].getCssValue('width').then((width) => {
  expect(width).toEqual(('20px'));
  });
  }
  });
  });
  //verify Misc Adjustments link
  element(by.css(xpathRepo.TreeView.MiscAdjust_Link)).click();
  expect(element(by.xpath(xpathRepo.TreeView.MiscAjustment)).isDisplayed()).toBe(true);
  var wid1=element(by.css(xpathRepo.TreeView.Close_Icon));          
  browser.executeScript('arguments[0].click();', wid1);
  browser.sleep(2000);
  //Verify NonStandardCharges link
  element(by.css(xpathRepo.TreeView.NSC_Link)).click();
  expect(element(by.xpath(xpathRepo.TreeView.Nsc_View)).isDisplayed()).toBe(true);
  var wid1=element(by.css(xpathRepo.TreeView.Close_Icon));           
  browser.executeScript('arguments[0].click();', wid1);
});
it('Validating logout ', function () {
  //Logout from metraview
  protractor.loginHelpers.logOutMV();
});
});