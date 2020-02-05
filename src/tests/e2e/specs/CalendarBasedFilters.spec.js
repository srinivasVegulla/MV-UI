var testdata2= require('../inputs/testdata/XpathRepository.json');
var testdata4 = require('../inputs/testdata/JsonFileCreation.json');

  describe('Calender Based filters in MetraView', function () {

    it('Validate Calender Based filters in ActivityLog widget', function () {
    //Input file to refer
    var testdata3 = protractor.loginHelpers.dashboard();
    browser.refresh();
    browser.sleep(5000);

    //Launch to the MV2.0 application
     protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);

     //Login to the MV2.0 application
     protractor.loginHelpers.logInMV(testdata4.userName,testdata4.passwordField);

    expect(element(by.xpath(testdata2.ActivityLog.Title)).isDisplayed()).toBe(true);
     
     //Click on View All link on Activity Log widget
    element(by.xpath(testdata2.ActivityLog.ViewAll)).click();
    browser.sleep(3000);
    //Click on Caret symbol to pick value from dropdown
    element(by.xpath(testdata2.ActivityLog.SelectBy)).click();
    browser.sleep(3000);

    //Click on Bill element from dropdown
    element(by.xpath(testdata2.Quotes.SelectBy_Bill)).click();
    browser.sleep(3000);

    //Validate Sortby label is displayed after selecting the 'Bill' from the dropdown
    expect(element(by.xpath(testdata2.ActivityLog.SortBy)).isDisplayed()).toBe(true);
    browser.sleep(5000);

    //Click on Caret symbol to pick value from dropdown
    element(by.xpath(testdata2.ActivityLog.SelectBy)).click();
    browser.sleep(3000);

    //Click on Date Range element from dropdown
    element(by.xpath(testdata2.ActivityLog.DateRange)).click();
    browser.sleep(3000);

    //Validate Start Date label is displayed after selecting the 'Date Range' from the dropdown
    element.all(by.xpath(testdata2.ActivityLog.StartDate)).then(function(items) {
      expect(items.length).toBe(2);
      expect(items[0].getText()).toBe(testdata3.TEXT_START_DATE);
      expect(items[1].getText()).toBe(testdata3.TEXT_END_DATE);
    });
    browser.sleep(4000);

    //Validate that StartDate filter is present in the page
    expect(element(by.xpath(testdata2.ActivityLog.ViewAll_StartDate_Field)).isDisplayed()).toBe(true);
    browser.sleep(2000);

    //Validate that EndDate filter is present in the page
    expect(element(by.xpath(testdata2.ActivityLog.ViewAll_EndDate_Field)).isDisplayed()).toBe(true);
    browser.sleep(3000);

    element(by.xpath(testdata2.ActivityLog.ViewAll_StartDate_Field)).click();
    element(by.xpath(testdata2.ActivityLog.EndDate_Today)).click();
    browser.sleep(4000);

    element(by.xpath(testdata2.ActivityLog.ViewAll_EndDate_Field)).click();
    element(by.xpath(testdata2.Quotes.Today)).click();
    browser.sleep(4000);

    //Click on Search button
    element(by.xpath(testdata2.ActivityLog.Search)).click();
    browser.sleep(4000);

    //Validate the Search button is present in the page
    expect(element(by.xpath(testdata2.ActivityLog.Search)).isDisplayed()).toBe(true);

    //Validate the Activity Box  content is displayed in the page
    expect(element(by.xpath(testdata2.ActivityLog.ActivityBox_Content)).isDisplayed()).toBe(true);

    //Logout from metraview
    protractor.loginHelpers.logOutMV();
  
    });

});
