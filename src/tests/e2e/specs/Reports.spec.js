var testdata = require('../inputs/testdata/Downloads.json');
var testdata4 = require('../inputs/testdata/NonECBARAdjustments.json');
var testdata9 = require('../inputs/testdata/XpathRepository.json');


describe('Verify Download widget in MetraView', function () {
  
  it('Validate Quotes in Downloads', function () {
    
    //Input file to refer
  var testdata10 = protractor.loginHelpers.dashboard();
   
   browser.refresh();
   browser.sleep(3000);
  //Launch to the MV2.0 application
  protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);

   //Login to the MV2.0 application
   protractor.loginHelpers.logInMV(testdata4.corpAccountUserName,testdata4.passwordField);
   element(by.xpath(testdata9.Billing.GoToBillsButton)).click();
   browser.sleep(3000);
   expect(element(by.xpath(testdata9.Billing.SelectPeriodInvoiceLabel)).getText()).toEqual(testdata10.TEXT_SELECT_BILLING_PERIOD);
   element(by.xpath(testdata9.Billing.SelectPeriodInvoiceDropdown)).click();
   browser.sleep(1000);
   element(by.xpath(testdata9.Billing.SelectPeriodFromList)).click();
   browser.sleep(5000);
   browser.refresh();
   browser.sleep(2000);
   element(by.xpath(testdata9.Billing.GoToBillsButton)).click();
   browser.sleep(2000);
   //verify Inovice is displyed or not
   expect(element(by.xpath(testdata9.Downloads.Invoice_text)).isDisplayed()).toBe(true);
   //click on an invoice
   element(by.xpath(testdata9.Downloads.Invoice_text)).click();
   //Sleep for 5 sec
   browser.sleep(5000);
   //Click on invoice pdf download button
   element(by.xpath(testdata9.Downloads.Invoice_Pdf)).click();
   //Sleep for 2 sec
   browser.sleep(2000);
   //Invoice name
   var sss='Invoice_'+testdata4.invoice+'.pdf';
   //Path for download 
   var pdfFilePath="C:/Users/Administrator/Downloads/"+sss; //you can use any pdf here by providing PDF file path.
   //To read the pdf file 
   function readPDFFile(pdfFilePath) {

     var PDFParser = require("pdf2json"); //store pdf2json library into variable which contains all methods of reading PDF file.
     // var fs=require("fs"); //create file system object
     let FileParser = new PDFParser(this,1); // Create object of PDFParser defined in first line.
     
     //If data read successfully
     FileParser.on("pdfParser_dataReady", function() {

     //to print data on console
     console.log(FileParser.getRawTextContent().toString());
     expect(FileParser.getRawTextContent().toString()).toContain(testdata2.invoiceid,testdata2.accountId);
     
     
     });
     FileParser.loadPDF(pdfFilePath);
     }
     //To execute above function
     readPDFFile(pdfFilePath);

 
  });

it('Validate quotes widget', function () {
  //Input file to refer
  var testdata10 = protractor.loginHelpers.dashboard();
   
   browser.refresh();
   browser.sleep(3000);
  //Launch to the MV2.0 application
  protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);

   //Login to the MV2.0 application
   protractor.loginHelpers.logInMV(testdata4.corpAccountUserName,testdata4.passwordField);
    var testdata2 = require('../inputs/testdata/XpathRepository.json');
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
  var currentdate = m+"/"+d+"/"+yyyy;
    var testdata10 = protractor.loginHelpers.dashboard();
    browser.refresh();
    expect(element(by.xpath(testdata2.Quotes.Quotes_Link)).isDisplayed()).toBe(true);
    expect(element(by.xpath(testdata2.Quotes.Quotes_Link)).getText()).toContain('Quotes (0)');
    //Clicking on quotes
  element(by.xpath(testdata2.Quotes.Quotes_Link)).click();
  expect(element(by.xpath(testdata9.ActivityLog.Selected)).getText()).toEqual(testdata10.TEXT_DATE_RANGE);
  expect(element(by.xpath(testdata2.Quotes.SelectBy_Label)).isDisplayed()).toBe(true); 
  //verify filter icon is displayed 
  expect(element(by.xpath(testdata9.ActivityLog.Filter_Icon)).isDisplayed()).toBe(true);
  expect(element(by.xpath(testdata9.Downloads.Search)).isDisplayed()).toBe(true); 
 // expect(element(by.xpath("ul[@ng-if='vm.widgetFilter.sortable']/label")).isDisplayed()).toBe(true); 
  //view all quotes
 //click on dropdown
 element(by.xpath(testdata9.Downloads.Dropdown)).click();
 browser.sleep(2000);
// visibility of bills in dropdown
expect(element(by.xpath(testdata2.Downloads.Bill)).getText()).toEqual(testdata10.TEXT_BILL);
element(by.xpath(testdata2.Downloads.Bill)).click();
//counting the presence of multi selection check boxes
var count = element.all(by.xpath(testdata2.Downloads.Checkbox)).count();
   expect(count).toBe(4);
 
 browser.sleep(2000);
  expect(element(by.xpath(testdata2.Quotes.CreditNotes_Label)).getText()).toEqual(testdata10.TEXT_DOWNLOAD_CREDIT_NOTES);
  //Clicking on the check boxes
  element(by.xpath(testdata2.Quotes.CreditNotes_Checkbox)).click();
 
  browser.sleep(2000);
  element(by.xpath(testdata2.Quotes.Statments_Checkbox)).click();
 // element(by.xpath(testdata2.Quotes.QuotesLabel)).click();

  browser.sleep(2000);
  element(by.xpath(testdata2.Downloads.Dropdown)).click();
  browser.sleep(2000);
  //visbility of date range in dropdown
  expect(element(by.xpath(testdata2.Downloads.DateRange)).getText()).toEqual(testdata10.TEXT_DATE_RANGE);
  element(by.xpath(testdata2.Downloads.DateRange)).click();
  browser.sleep(3000);
  //credit notes label is diaplaying
  expect(element(by.xpath(testdata2.Quotes.CreditNotes_Label)).getText()).toEqual(testdata10.TEXT_DOWNLOAD_CREDIT_NOTES);

  //click on start date in date range
  element(by.xpath(testdata2.Downloads.Startdate)).click();
  var l = element(by.xpath(testdata2.ActivityLog.ViewAll_Date_Today)).getText();
  expect(l).toContain(d);
  element(by.xpath(testdata2.ActivityLog.ViewAll_Date_Today)).click();
  element(by.xpath(testdata2.Downloads.Enddate)).click();
 // element(by.xpath(testdata2.ActivityLog.ViewAll_Date_Today)).click();
  expect(element(by.xpath(testdata9.Downloads.Search)).isDisplayed()).toBe(true);
  element(by.xpath(testdata9.Downloads.Search)).click();
  element(by.xpath(testdata2.Quotes.CreditNotes_Checkbox)).click();
   
 // expect(element(by.css(testdata2.Downloads.Creditnote)).getText()).toContain("CN");
//  expect(element(by.css(testdata2.Downloads.Date)).getText()).toEqual('Date :'+currentdate);
  element(by.xpath(testdata2.Downloads.CloseInvoiceViewAll)).click();
 // Log Out from Application
 browser.findElement(by.xpath(testdata2.SystemBar.Logout)).click();
 browser.sleep(12000);

});
}); 