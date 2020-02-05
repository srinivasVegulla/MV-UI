var testdata = require('../inputs/testdata/Downloads.json');
var testdata4 = require('../inputs/testdata/JsonFileCreation.json');
var testdata9 = require('../inputs/testdata/XpathRepository.json');


describe('Verify Download widget in MetraView', function () {

  it('Validate downloads widget', function () {
    
    //Input file to refer
  var testdata10 = protractor.loginHelpers.dashboard();
   
   browser.refresh();
   browser.sleep(3000);
  //Launch to the MV2.0 application
  protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);

   //Login to the MV2.0 application
   protractor.loginHelpers.logInMV(testdata4.userName,testdata4.passwordField);

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
    //element(by.xpath("//div[@class='ebBreadcrumbs-list ecb-navOn']/ul/li[2]/a")).click();
    
    var widget = element(by.xpath(testdata9.Downloads.Downloads_Header));
    widget.isPresent().then(function (result) {
      if (result) {
        var el = element(by.xpath(testdata9.Downloads.Downloads_Header));
        browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
        browser.sleep(3000);

        //statements
        expect(element(by.xpath(testdata9.Downloads.Statements_Image)).isDisplayed()).toBe(true);
        expect(element(by.xpath(testdata9.Downloads.StatementsList)).isDisplayed()).toBe(true);
        expect(element(by.xpath(testdata9.Downloads.StatementsList)).getText()).toEqual(testdata10.TEXT_DOWNLOAD_STATEMENTS);
        var statements = element(by.xpath(testdata9.Downloads.StatementName));
        statements.isPresent().then(function (result) {
          if (result) {

            expect(element(by.xpath(testdata9.Downloads.StatementName)).getText()).toEqual(testdata.statementname);

          } else {
            expect(element(by.xpath(testdata9.Downloads.NoStatementAvailable_Text)).isDisplayed()).toBe(true);
            expect(element(by.xpath(testdata9.Downloads.NoStatementAvailable_Text)).getText()).toEqual(testdata10.TEXT_NO_STATEMENTS);
            console.log('no statements');
          }
        });

        //Invoices
        expect(element(by.xpath(testdata9.Downloads.Invoice_Image)).isDisplayed()).toBe(true);
        expect(element(by.xpath(testdata9.Downloads.Invoice_Label)).isDisplayed()).toBe(true);
        expect(element(by.xpath(testdata9.Downloads.Invoice_Label)).getText()).toEqual(testdata10.TEXT_DOWNLOAD_INVOICES);
        var Invoices = element(by.xpath(testdata9.Downloads.InvoiceName));
        Invoices.isPresent().then(function (result) {
          if (result) {

            expect(element(by.xpath(testdata9.Downloads.InvoiceName)).getText()).toEqual(testdata.Invoicename);

          } else {
            expect(element(by.xpath(testdata9.Downloads.NoInvoiceavailableforcurrentperiodtext)).isDisplayed()).toBe(true);
            expect(element(by.xpath(testdata9.Downloads.NoInvoiceavailableforcurrentperiodtext)).getText()).toEqual(testdata10.TEXT_NO_INVOICE);
            console.log('no Invoices');
          }
        });

        //creditnotes
        expect(element(by.xpath(testdata9.Downloads.Creditnote_Image)).isDisplayed()).toBe(true);
        expect(element(by.xpath(testdata9.Downloads.Creditnote_Label)).isDisplayed()).toBe(true);
        expect(element(by.xpath(testdata9.Downloads.Creditnote_Label)).getText()).toEqual(testdata10.TEXT_DOWNLOAD_CREDIT_NOTES);
        var credits = element(by.xpath(testdata9.Downloads.CreditnoteName));
        credits.isPresent().then(function (result) {
          if (result) {

            expect(element(by.xpath(testdata9.Downloads.CreditnoteName)).getText()).toEqual(testdata.Creditnotename);

          } else {
            expect(element(by.xpath(testdata9.Downloads.NoCreditNotesAvailabletext)).isDisplayed()).toBe(true);
            expect(element(by.xpath(testdata9.Downloads.NoCreditNotesAvailabletext)).getText()).toEqual(testdata10.TEXT_NO_CREDIT_NOTES);
            console.log('no Creditnotes');
          }
        });

        var Viewall = element(by.xpath(testdata9.Downloads.Downloads_Viewall));
        Viewall.isPresent().then(function (result) {
          if (result) {
            expect(element(by.xpath(testdata9.Downloads.Downloads_Viewall)).getText()).toEqual(testdata10.TEXT_VIEW_ALL+">");
            element(by.xpath(testdata9.Downloads.Downloads_Viewall)).click();
            browser.sleep(1000);

            expect(element(by.xpath(testdata9.Downloads.StatementsList)).getText()).toEqual(testdata10.TEXT_DOWNLOAD_STATEMENTS);
            expect(element(by.xpath(testdata9.Downloads.InvoiceName)).getText()).toEqual(testdata10.TEXT_DOWNLOAD_INVOICES);
            expect(element(by.xpath(testdata9.Downloads.Creditnote_Label)).getText()).toEqual(testdata10.TEXT_DOWNLOAD_CREDIT_NOTES);
            // clicking on the check boxes
            element(by.xpath(testdata9.Downloads.Statements_Input)).click();
            element(by.xpath(testdata9.Downloads.Invoices_Input)).click();
            browser.sleep(500);
            element(by.xpath(testdata9.Downloads.CreditNotes_Input)).click();
            element(by.xpath(testdata9.Downloads.Statements_Input)).click();
            expect(element(by.xpath(testdata9.Downloads.Invoices_Input)).isDisplayed()).toBe(true);
            element(by.xpath(testdata9.Downloads.Invoices_Input)).click();
            element(by.xpath(testdata9.NowCast.ViewAll_Date)).click();
            browser.sleep(500);
            element(by.xpath(testdata9.Downloads.DateHorizontal)).click();
            // In daterange view in selected by
            expect(element(by.xpath(testdata9.Downloads.Creditnote_Label)).getText()).toEqual(testdata10.TEXT_DOWNLOAD_CREDIT_NOTES);
            expect(element(by.xpath(testdata9.Downloads.QuotesLabel)).getText()).toEqual(testdata10.TEXT_QUOTES);
            element(by.xpath(testdata9.NowCast.ViewAll_Date)).click();
            browser.sleep(500);
            element(by.xpath(testdata9.Downloads.DateHorizontal)).click();
            // clicking on sort by
            element(by.xpath(testdata9.NowCast.ViewAll_Sort)).click();
            browser.sleep(500);
            element(by.xpath(testdata9.Downloads.SortBy_Link)).click();
            element(by.xpath(testdata9.Downloads.SortBy_Span)).click();
            var noinvoices = element(by.xpath(testdata9.Downloads.NoInvoices));
            noinvoices.isPresent().then(function (result) {
              if (result) {
                element(by.xpath(testdata9.Downloads.NoInvoices)).click();
                browser.sleep(500);
              } else {

                console.log('There are no invoices, so unable to sort');
              }
            });
            element(by.xpath(testdata9.Downloads.SortingFilter)).click();
            browser.sleep(500);
            browser.actions().mouseMove(element(by.xpath(testdata9.Downloads.SortingFilter_Label))).perform();

            element(by.xpath(testdata9.Downloads.FormGroup)).click();
            var sortinginfilter = element(by.xpath(testdata9.Downloads.SortingFilter_HorizontalBar));
            sortinginfilter.isPresent().then(function (result) {
              if (result) {
                browser.actions().mouseMove(element(by.xpath(testdata9.Downloads.SortingFilter_Label))).perform();
                element(by.xpath(testdata9.Downloads.SortingFilter_Modal)).click();
                browser.sleep(500);
                element(by.xpath(testdata9.Downloads.InvoiceViewAllApplyButton)).click();
                browser.sleep(500);
              } else {

                console.log('There are no quotes ,so unable to sort');
                element(by.xpath(testdata9.Downloads.InvoiceViewAllCancelButton)).click();
                browser.sleep(500);
              }
            });

            element(by.xpath(testdata9.Downloads.CloseInvoiceViewAll)).click();
            browser.sleep(500);
            browser.refresh();

          } else {
            console.log('No statements,credits,invoices available');
            browser.refresh();
          }
        });
      } else {
        console.log('downloads widget is absent');
        browser.refresh();
      }
    });

  //Logout from metraview
  protractor.loginHelpers.logOutMV();

  });

});