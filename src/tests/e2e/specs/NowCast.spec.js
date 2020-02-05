var testdata = require('../inputs/testdata/NowCast.json');
var testdata2 = require('../inputs/testdata/XpathRepository.json');
var testdata5 =require('../inputs/testdata/JsonFileCreation.json');

describe('Validate The Nowcast widget in MetraView', function () {

  it('Validate Nowcast', function () {
  
    browser.refresh();
    browser.sleep(5000);

  //Launch to the MV2.0 application
  protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);

   //Login to the MV2.0 application
   protractor.loginHelpers.logInMV(testdata5.userName,testdata5.passwordField);

  //Input file to refer
  var testdata3 = protractor.loginHelpers.dashboard();
  var widget = element(by.xpath(testdata2.NowCast.Widget));
  widget.isPresent().then(function (result) {
  if (result) {
    expect(element(by.xpath(testdata2.NowCast.Title)).isDisplayed()).toBe(true);
    expect(element(by.xpath(testdata2.NowCast.Title)).getText()).toEqual(testdata3.TEXT_NOW_CAST);
    var widget = element(by.xpath(testdata2.NowCast.Graph));
    widget.isPresent().then(function (result) {
    if (result) {
      expect(element(by.css(testdata2.NowCast.Graph_XAxis_Title)).isDisplayed()).toBe(true);
      expect(element(by.css(testdata2.NowCast.Graph_XAxis_Title)).getText()).toEqual(testdata.name);
      expect(element(by.css(testdata2.NowCast.Graph_XAxis_Title)).isDisplayed()).toBe(true);
      expect(element(by.css(testdata2.NowCast.Graph_XAxis_Title)).getText()).toEqual(testdata.decisiondate);
    } else {
      console.log('Nowcast widget data  is absent');
      expect(element(by.xpath(testdata2.NowCast.NoDecisionFound_Text)).isDisplayed()).toBe(true);
      expect(element(by.xpath(testdata2.NowCast.NoDecisionFound_Text)).getText()).toEqual(testdata3.TEXT_NO_DECISIONS_FOUND);
    }
   });
  } else {
    console.log('nowcaste widget is absent');
  }
});
});

it('Validate Nowcast view all', function () {
  var viewall = element(by.xpath(testdata2.NowCast.ViewAll));
  viewall.isPresent().then(function (result) {
    if (result) {
      viewall.click();
      expect(element(by.css(testdata2.NowCast.ViewAll_Title)).getText()).toEqual(testdata3.TEXT_NOW_CAST);
      browser.sleep(3000);
      element(by.xpath(testdata2.NowCast.ViewAll_Date)).click();

      browser.sleep(500);
      element(by.xpath(testdata2.NowCast.ViewAll_Sort)).click();
      
      browser.sleep(500);
      element(by.xpath(testdata2.NowCast.ViewAll_Close)).click();
    } else {
      console.log('view all is not present for nowcast widget in dashboard');
    }
  });

  //Logout from metraview
  protractor.loginHelpers.logOutMV();       
  
  });

}); 