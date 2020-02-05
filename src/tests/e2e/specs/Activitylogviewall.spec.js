var testdata2= require('../inputs/testdata/XpathRepository.json');
var testdata4 = require('../inputs/testdata/JsonFileCreation.json');

describe('Validate the Activity log Widget View All Link', function() {
 
it('Validate the Activity log Widget after selecting View All Link ',function() {

  var testdata=protractor.loginHelpers.dashboard();
  var testdata1=protractor.loginHelpers.expiredPassword(); 
   
browser.refresh();
browser.sleep(10000);

//Launch to the MV2.0 application
protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);

//Login to the MV2.0 application
protractor.loginHelpers.logInMV(testdata4.userName,testdata4.passwordField);


var el = element(by.xpath(testdata2.ActivityLog.Title));
browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
browser.sleep(10000);

element(by.xpath(testdata2.ActivityLog.ViewAll)).click();
browser.sleep(5000);

 element(by.xpath(testdata2.ActivityLog.SelectBy)).click();
 browser.sleep(5000);

element.all(by.xpath(testdata2.ActivityLog.SelectBy_Values)).then(function(items) {
  expect(items[0].getText()).toBe(testdata.TEXT_BILL);
  browser.sleep(2000);
  expect(items[1].getText()).toBe(testdata.TEXT_DATE_RANGE);
  
});
browser.sleep(2000);  
element.all(by.xpath(testdata2.ActivityLog.StartDate)).then(function(items) {
  expect(items[0].getText()).toBe(testdata.TEXT_START_DATE);
  browser.sleep(2000);
  expect(items[1].getText()).toBe(testdata.TEXT_END_DATE);
  
});

expect(element(by.xpath(testdata2.ActivityLog.Search)).isDisplayed()).toBe(true);

element(by.xpath(testdata2.ActivityLog.SortBy)).click();
browser.sleep(500);
var testdata13 = protractor.loginHelpers.activityLogValues();
console.log(testdata13);        
element.all(by.xpath(testdata2.ActivityLog.SortBy_Values)).then(function(items) {
  expect(items[0].getText()).toBe(testdata.TEXT_NONE);
  expect(testdata13).toContain(items[1].getText());
  expect(testdata13).toContain(items[2].getText());
  expect(testdata13).toContain(items[3].getText());
  expect(testdata13).toContain(items[4].getText());
  expect(testdata13).toContain(items[5].getText());
  expect(testdata13).toContain(items[6].getText());

  // expect(items[1].getText()).toBe(testdata.TEXT_DATE);
  // expect(items[2].getText()).toBe(testdata1.EXPIRED_TEXT_USERNAME);
  // expect(items[3].getText()).toBe('Event');
  // expect(items[4].getText()).toBe('Details');
  // expect(items[5].getText()).toBe('Logged In');
  // expect(items[6].getText()).toBe('Audit ID');
  
});

expect(element(by.xpath(testdata2.ActivityLog.Filter_Icon)).isDisplayed()).toBe(true);

element(by.xpath(testdata2.ActivityLog.ViewAll_StartDate_Field)).click();
browser.sleep(1000);
element(by.xpath(testdata2.ActivityLog.ViewAll_Date_Today)).click();
browser.sleep(1000);
element(by.xpath(testdata2.ActivityLog.ViewAll_EndDate_Field)).click();
browser.sleep(3000);
element(by.xpath(testdata2.ActivityLog.ViewAll_EndDate_Field)).click();
browser.sleep(3000);

expect(element(by.xpath(testdata2.ActivityLog.ActivityBox_Content)).isDisplayed()).toBe(true);

element(by.xpath(testdata2.Adjustment.SelectByDropdown)).click();
browser.sleep(1000);
element(by.xpath(testdata2.Quotes.SelectBy_Bill)).click();
browser.sleep(3000); 
expect(element(by.xpath(testdata2.ActivityLog.ActivityBox_Content)).isDisplayed()).toBe(true);

element(by.xpath(testdata2.ActivityLog.Filter_Icon)).click();
browser.sleep(2000);

browser.actions().mouseMove(element(by.xpath(testdata2.ActivityLog.Filter_SelectBy))).perform();
browser.sleep(500);
element.all(by.xpath(testdata2.ActivityLog.Filter_FieldNames)).then(function(items) {
expect(items[0].getText()).toBe(testdata.TEXT_SELECTED_BY);
expect(items[1].getText()).toBe(testdata.TEXT_SELECT_BILLING_PERIOD);
expect(items[2].getText()).toBe(testdata.TEXT_SORT_BY);
// expect(items[3].getText()).toBe(testdata.TEXT_DATE);
// expect(items[4].getText()).toBe(testdata1.EXPIRED_TEXT_USERNAME);
// expect(items[5].getText()).toBe('Event');
// expect(items[6].getText()).toBe('Details');
// expect(items[7].getText()).toBe('Logged In');
// expect(items[8].getText()).toBe('Audit ID');

expect(testdata13).toContain(items[3].getText());
expect(testdata13).toContain(items[4].getText());
expect(testdata13).toContain(items[5].getText());
expect(testdata13).toContain(items[6].getText());
expect(testdata13).toContain(items[7].getText());
expect(testdata13).toContain(items[8].getText());
});

  //Logout from metraview
  protractor.loginHelpers.logOutMV();

});
});