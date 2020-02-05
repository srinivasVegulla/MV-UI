var testdata = require('../inputs/testdata/QuotesandTransactions.json');
var testdata2 = require('../inputs/testdata/XpathRepository.json');
var testdata6 =require('../inputs/testdata/JsonFileCreation.json');

describe('Verify Quotes widget in MetraView', function () {

it('Validate quotes widget', function () {
  var testdata3 = protractor.loginHelpers.dashboard();
  browser.refresh();
  browser.sleep(5000);

  //Launch to the MV2.0 application
protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);

//Login to the MV2.0 application
protractor.loginHelpers.logInMV(testdata6.userName,testdata6.passwordField);

  var el = element(by.xpath(testdata2.Quotes.Title));
  browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
  expect(element(by.xpath(testdata2.Quotes.Title)).isPresent()).toBe(true);
  console.log('quotes and transactions widget is present');

  var today = new Date();
  var d = "0"+ today.getDate();
  var dd = d.toString().substr(-2);
  var m = "0"+today.getMonth()+1;
  var mm = m.toString().substr(-2);
  var yyyy = today.getFullYear();
  today= dd.toString();
  yesterday = d;
  yy = yyyy.toString().substr(-2);
  endDate = dd+"/"+mm+"/"+yy; 

  browser.sleep(1000);
  //expect(element(by.xpath(testdata2.Quotes.BillDate)).getText()).toEqual(testdata3.TEXT_SINCE_LAST_BILL + " ( "+endDate+" - "+endDate+" )");
  expect(element(by.xpath(testdata2.Quotes.Quotes_Link)).isDisplayed()).toBe(true);
  expect(element(by.xpath(testdata2.Quotes.Transactions_Link)).isDisplayed()).toBe(true);
  var attr = element(by.xpath(testdata2.Quotes.Quotes_Image)).getAttribute('src');
  expect(attr).toEqual(testdata.Quotes);
  var attr = element(by.xpath(testdata2.Quotes.Trasactions_Image)).getAttribute('src');
  expect(attr).toEqual(testdata.Transactions);
    
  });
  
it('Validate quotes grid page', function () {

  var testdata3 = protractor.loginHelpers.dashboard();

  var today = new Date();
  var d = today.getDate();
  var dd = d.toString().substr(-2);
  var m = "0"+today.getMonth()+1;
  var mm = m.toString().substr(-2);
  var yyyy = today.getFullYear();
  today= d.toString();
  yesterday = d;
  yy = yyyy.toString().substr(-2);
  endDate = dd+"/"+mm+"/"+yyyy;  

  //Clicking on quotes
  element(by.xpath(testdata2.Quotes.Quotes_Link)).click();
  expect(element(by.xpath(testdata2.Quotes.SelectBy_Label)).isDisplayed()).toBe(true);  
  element(by.xpath(testdata2.Quotes.StartDate)).click();
  expect(element(by.xpath(testdata2.ActivityLog.ViewAll_Date_Today)).getText()).toBe(today);
  element(by.xpath(testdata2.Quotes.EndDate)).click();
  expect(element(by.xpath(testdata2.Quotes.Today)).getText()).toBe(today);
  //Quotes view all 
  element(by.xpath(testdata2.Adjustment.SelectByDropdown)).click();
  browser.sleep(2000);
  //In selected by clicking on bills
  element(by.xpath(testdata2.Quotes.SelectBy_Bill)).click();
  browser.sleep(4000);
  expect(element(by.xpath(testdata2.Quotes.CreditNotes_Label)).getText()).toEqual(testdata3.TEXT_DOWNLOAD_CREDIT_NOTES);
  expect(element(by.xpath(testdata2.Quotes.Statments_Label)).getText()).toEqual(testdata3.TEXT_DOWNLOAD_STATEMENTS);
  expect(element(by.xpath(testdata2.Quotes.Invoices_Label)).getText()).toEqual(testdata3.TEXT_DOWNLOAD_INVOICES);
  //Clicking on the check boxes
  element(by.xpath(testdata2.Quotes.CreditNotes_Checkbox)).click();
  element(by.xpath(testdata2.Quotes.Invoices_Checkbox)).click();
  browser.sleep(2000);
  element(by.xpath(testdata2.Quotes.Statments_Checkbox)).click();
  element(by.xpath(testdata2.Quotes.CreditNotes_Checkbox)).click();
  element(by.xpath(testdata2.Quotes.Invoices_Checkbox)).click();
  browser.sleep(2000);
  element(by.xpath(testdata2.Adjustment.SelectByDropdown)).click();
  browser.sleep(2000);
  element(by.xpath(testdata2.Quotes.SelectBy_DateRange)).click();
  browser.sleep(3000);
  //In daterange view in selected by
  expect(element(by.xpath(testdata2.Quotes.CreditNotes_Label)).getText()).toEqual(testdata3.TEXT_DOWNLOAD_CREDIT_NOTES);
  expect(element(by.xpath(testdata2.Quotes.Quotes_Label)).getText()).toEqual(testdata3.TEXT_QUOTES);
  browser.sleep(2000);
  //Clicking on sort by
  expect(element(by.xpath(testdata2.Adjustment.SortByDropdown)).isPresent()).toBe(true);
  browser.sleep(2000);
 //Filter Icon Presence
  element(by.xpath(testdata2.ActivityLog.Filter_Icon)).click();
  browser.sleep(2000);

  browser.actions().mouseMove(element(by.xpath(testdata2.Adjustment.Filter_SortBy))).perform();

  expect(element(by.xpath(testdata2.Adjustment.Filter_SortByButton)).isPresent()).toBe(true);
  browser.sleep(2000); 

  //Logout from metraview
  protractor.loginHelpers.logOutMV();
  
});
});
