    var testdata = require('../inputs/testdata/AmountDue.json');
    var testdata1 = require('../inputs/testdata/XpathRepository.json');
    var testdata2 = require('../inputs/testdata/EcbarAdjustments.json');
    var testdata3 = require('../inputs/testdata/Login.json');

    describe('UI Baseline App', function () {
      //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10504/ Reg_002_VerifyCreditNoteInDownloadsWidget
      //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10504/ Reg_003_VerifyCreditDebitNotesInDownloadsWidget
      //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10519/ Reg_003_Verify_CreditDebitNote_Download_with_ECBAR

    it('Validate Credit and Debit Notes', function () {
    //Refresh the Browser
        browser.refresh();
        //Sleep for 5 sec
        browser.sleep(5000);
        //Logout
        element(by.xpath(testdata1.SystemBar.Logout)).click();
        //Sleep for 5 sec
        browser.sleep(5000);
        //Select the language
        var testdata5 = protractor.loginHelpers.lang;
        //Get data from ecb->Metraview-ext-data
        var testdata6 = protractor.loginHelpers.dashboard();
        //Load the URL
        browser.get(testdata3.url.URL);
        //Sleep for 3sec
        browser.sleep(3000);
        //Click on the language
        element(by.css(testdata5)).click();
        //Log in to MetraView with username
        element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata2.userName);
          //Log in to MetraView with password
        element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata2.passwordField);
        //Click on Log in button
        browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
        //Sleep for 3sec
        browser.sleep(3000);
        //click on go to bills button
      element(by.xpath(testdata1.LiveWidget.GoToBills_AmountDue)).click();
      //Sleep for 6sec untill and unless page appear
      browser.sleep(6000);
      //Click on interval dropdown
      element(by.xpath(testdata1.Adjustment.SelectInterval)).click();
      //Select the interval from the dropdown
      element(by.xpath(testdata1.Billing.SelectFirstInterval)).click();
    //sleep for 5 sec to load the page
      browser.sleep(5000);
    //Validate creditnotes pdf are present against the credit notes
    element(by.xpath(testdata1.Downloads.CreditNotes_Pdf)).isPresent();
    //sleep for 2 sec to load the page
    browser.sleep(2000);
    //Validate credit notes label
    expect(element(by.xpath(testdata1.Downloads.Creditnote_Label)).getText()).toContain(testdata6.TEXT_DOWNLOAD_CREDIT_NOTES);
    //Validate credit notes pdf is present aginst credit notes
    element(by.xpath(testdata1.Downloads.CreditNotes_Pdf)).isPresent();
    //Sleep for 2 sec
    browser.sleep(2000);
    //Get the credit note name
    element(by.xpath(testdata1.Downloads.CreditNotes_Pdf)).getText().then((creditNoteName) => {
    //Print the credit note name
    console.log("Credit Note downloaded name is "+ creditNoteName);
    //Click on download link
    element(by.xpath(testdata1.Downloads.CreditNotes_Pdf)).click();
    //Sleep for 5 sec
    browser.sleep(5000);
    //Repalce the space 
    var creditName=creditNoteName.toString().replace(' ','');
    //Now print the credit note name
    console.log(creditName);
    //Declare Path for creditnote download
    var pdfFilePath="C:/Users/Administrator/Downloads/"+creditName; //you can use any pdf here by providing PDF file path.

    function readPDFFile(pdfFilePath) {

    var PDFParser = require("pdf2json"); //store pdf2json library into variable which contains all methods of reading PDF file.
    // var fs=require("fs"); //create file system object
    let FileParser = new PDFParser(this,1); // Create object of PDFParser defined in first line.

    //If data read successfully
    FileParser.on("pdfParser_dataReady", function() {

    //to print data on console
    console.log(FileParser.getRawTextContent().toString());
    expect(FileParser.getRawTextContent().toString()).toContain(testdata2.creditAmt);


    });
    FileParser.loadPDF(pdfFilePath);
    }
    //To execute above function
    readPDFFile(pdfFilePath);

    });



    //Validate debititnotes pdf are present against the invoices
    element(by.xpath(testdata1.Downloads.DebitNotes_Pdf)).isPresent();
    //Validate debit notes label
    expect(element(by.xpath(testdata1.Downloads.DebitNotes)).getText()).toContain(testdata6.TEXT_DOWNLOAD_DEBIT_NOTES);
    //Get the name of the Debit Note
    element(by.xpath(testdata1.Downloads.DebitNotes_Pdf)).getText().then((debitNoteName) => {
    //Print the Debit Note name in the log
    console.log("Debit Note downloaded name is "+ debitNoteName);
    //Click on Download link
    element(by.xpath(testdata1.Downloads.DebitNotes_Pdf)).click();
    //Sleep for 5 sec
    browser.sleep(5000);
    //Replace the space 
    var debitName=debitNoteName.toString().replace(' ','');
    //Path for download one
    var pdfFilePath="C:/Users/Administrator/Downloads/"+debitName; //you can use any pdf here by providing PDF file path.

    function readPDFFile(pdfFilePath) {

    var PDFParser = require("pdf2json"); //store pdf2json library into variable which contains all methods of reading PDF file.
    // var fs=require("fs"); //create file system object
    let FileParser = new PDFParser(this,1); // Create object of PDFParser defined in first line.

    //If data read successfully
    FileParser.on("pdfParser_dataReady", function() {

    //to print data on console
    console.log(FileParser.getRawTextContent().toString());
    expect(FileParser.getRawTextContent().toString()).toContain(testdata2.debitAmt);


    });
    FileParser.loadPDF(pdfFilePath);
    }
    //To execute above function
    readPDFFile(pdfFilePath);

    });


      })


    //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10504/ 001_VerifyInvoiceInDownloadsWidget
    //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10519/ 001_The_invoice_PDFs_should_be_downloaded

    it('Validate invoices', function () {
      //Refresh Browser
      browser.refresh();
      //Sleep for 5 sec
      browser.sleep(5000);
    //Click on Go to bills Button
      element(by.xpath(testdata1.LiveWidget.GoToBills_AmountDue)).click();
      //Sllep for 6 sec to load the page after clicking on the Go to bills Button
      browser.sleep(6000);
    //Click on interval dropdown
      element(by.xpath(testdata1.Adjustment.SelectInterval)).click();
      //Select the soft closed invoice from the dropdown
    element(by.xpath(testdata1.Billing.SelectSecondInterval)).click();
    //sleep for 5 sec to load the page
    browser.sleep(5000);
    //Validate invoice are present against the invoices
    element(by.xpath(testdata1.Downloads.Invoice_Pdf)).isPresent();
    //Sleep for 2 sec
    browser.sleep(2000);
    //Click on invoice pdf download button
    element(by.xpath(testdata1.Downloads.Invoice_Pdf)).click();
    //Sleep for 2 sec
    browser.sleep(2000);
    //Invoice name
    var sss='Invoice_'+testdata2.invoiceid+'.pdf';
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

    //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10609/ Reg_002_All_Quotes_displayed_under_Quotes_section
    //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10609/ 001_Generated_quote_should_be_downloaded
    //MVIEW-2673
    it('Validate Quotes', function () {
      //Refresh the Browser
      browser.refresh();
      //Sleep for 5 sec
      browser.sleep(5000);
      
        var today = new Date();
        var yyyy = today.getFullYear();
        yy = yyyy.toString().substr(-2);
        var d = "0"+ today.getDate();
        var dd = d.toString().substr(-2);
        var m = today.getMonth()+1;
        var m2="0"+m;
        var mm= m2.toString().substr(-2); //January is 0!
        var endDate= new Date();
        endDate =mm+"/"+dd+"/"+yyyy;
        
        
        //Quotes link is displaying under quotes and Transactions
      expect(element(by.xpath(testdata1.Quotes.Quotes_Link)).isDisplayed()).toBe(true);
    //Click on qotes
      element(by.xpath(testdata1.Quotes.Quotes_Link)).click();
      //Sllep for 3 sec to load the page
      browser.sleep(3000);
    //Validate Quote pdf is there
      expect(element(by.xpath(testdata1.Quotes.Quotes_Pdf)).isDisplayed()).toBe(true);
    //Storing the date start value in a variable
    var date=element(by.xpath(testdata1.Quotes.DateRange)).getText();
    //Validate quote Date
    var quotedate=element(by.xpath(testdata1.Quotes.DatePdf)).getText();
    //expect(endDate).toContain(quotedate);
    // var dateofquote=quotedate.toString().replace('Date :', '');
    // console.log(dateofquote);

    // //valiadte the date
    var ele=expect(quotedate).toContain(endDate);
    //Sleep for 2 sec
    browser.sleep(2000);
    //Get the quote name
    element(by.xpath(testdata1.Quotes.Quote_Name)).getText().then((quoteName) => {
    //print the quote name
    console.log("Quotedownloaded name is "+ quoteName);
    //Download the quote name
    element(by.xpath(testdata1.Quotes.QuotesDownloadButton)).click();
    //Sleep for 5 sec
    browser.sleep(5000);
    //Path to download the file
    var pdfFilePath="C:/Users/Administrator/Downloads/"+quoteName; //you can use any pdf here by providing PDF file path.

    function readPDFFile(pdfFilePath) {

    var PDFParser = require("pdf2json"); //store pdf2json library into variable which contains all methods of reading PDF file.
    // var fs=require("fs"); //create file system object
    let FileParser = new PDFParser(this,1); // Create object of PDFParser defined in first line.

    //If data read successfully
    FileParser.on("pdfParser_dataReady", function() {

    //to print data on console
    console.log(FileParser.getRawTextContent().toString());
    expect(FileParser.getRawTextContent().toString()).toContain(testdata2.quoteItem);

    });
    FileParser.loadPDF(pdfFilePath);
    }
    //To execute above function
    readPDFFile(pdfFilePath);

    });

        })

    //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10474/ Reg_004_VerifyECBAR_MISCAdjustments_Chargessummary

    it('Validate Misc Adjustments', function () {
    //Refresh the browser
      browser.refresh();
      //Sleep for 5 sec to load the page
      browser.sleep(5000);
      ////Declare a varaiable to get the amount values in all languages
      testdata8=protractor.loginHelpers.langCode;
      function MiscAdjustments(testdata8){
      switch (testdata8) {
      case "BR":
      var miscCharge=testdata2.miscAmt1;
      break;
      case "DE":
      var miscCharge=testdata2.miscAmt1;
      break;
      case "EG":
      var miscCharge=testdata2.miscAmt1;
      break;
      case "ES":
      var miscCharge=testdata2.miscAmt1;
      break;
      case "FR":
      var miscCharge=testdata2.miscAmt1;
      break;
      case "GB": 
      var miscCharge=testdata2.miscAmt;
      break;
      case "IL":
      var miscCharge=testdata2.miscAmt;
      break;
      case "JP":
      var miscCharge=testdata2.miscAmt;
      break; 
      case "MX":
      var miscCharge=testdata2.miscAmt;
      break; 
      case "SE":
      var miscCharge=testdata2.miscAmt1;
      break;
      case "US":
      var miscCharge=testdata2.miscAmt;
      break;
      } 
      return miscCharge;
      } 
      //Click on Go to bills Button
      element(by.xpath(testdata1.LiveWidget.GoToBills_AmountDue)).click();
      //Sleep for 6 sec
      browser.sleep(6000);
      //Validate the Misc amount under offercharge summary tab
      expect(element(by.xpath(testdata1.Billing.ChargesSummary_MiscRate)).getText()).toContain(MiscAdjustments(testdata8));


      //Logout
        element(by.xpath(testdata1.SystemBar.Logout)).click();
        browser.sleep(5000);
        var testdata7 = protractor.loginHelpers.lang;
        //Load the URL
        browser.get(testdata3.url.URL);
        browser.sleep(3000);
        element(by.css(testdata7)).click();
        //Log in to MetraView with username
        element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata2.userName1);
        //Enter the password
        element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata2.passwordField);
        //Click on login button
        browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
    //Sleep for 3 sec
        browser.sleep(6000);

          ////Declare a varaiable to get the amount values in all languages
      testdata8=protractor.loginHelpers.langCode;
      function MiscAdjustmentsfordivision(testdata8){
      switch (testdata8) {
      case "BR":
      var miscCharge=testdata2.miscdiv1;
      break;
      case "DE":
      var miscCharge=testdata2.miscdiv1;
      break;
      case "EG":
      var miscCharge=testdata2.miscdiv1;
      break;
      case "ES":
      var miscCharge=testdata2.miscdiv1;
      break;
      case "FR":
      var miscCharge=testdata2.miscdiv1;
      break;
      case "GB": 
      var miscCharge=testdata2.miscdiv;
      break;
      case "IL":
      var miscCharge=testdata2.miscdiv;
      break;
      case "JP":
      var miscCharge=testdata2.miscdiv;
      break; 
      case "MX":
      var miscCharge=testdata2.miscdiv;
      break; 
      case "SE":
      var miscCharge=testdata2.miscdiv1;
      break;
      case "US":
      var miscCharge=testdata2.miscdiv;
      break;
      } 
      return miscCharge;
      } 
        
    //Click on Go to bills Button
        element(by.xpath(testdata1.LiveWidget.GoToBills_AmountDue)).click();
      browser.sleep(6000);
    //Validate the same amount is reflecting for Division Account
      expect(element(by.xpath(testdata1.Billing.ChargesSummary_MiscRate)).getText()).toContain(MiscAdjustmentsfordivision(testdata8));

    });

    //MetraView_Folder/ MVIEW_S00NEXT_TestCases/ MVIEW-2589_001_MainCase
    it('Validate amount Adjustments', function () {

      //Refresh the Browser
      browser.refresh();
      
      //Sleep for 6sec
      browser.sleep(6000);
      expect(element(by.xpath(testdata1.PaymentMethods.Link)).isDisplayed()).toBe(true);
      browser.sleep(3000);
      element(by.xpath(testdata1.PaymentMethods.Link)).click();
      browser.sleep(3000);
      element(by.xpath(testdata1.PaymentMethods.Popup_Proceed)).click();
      browser.sleep(3000);
      browser.ignoreSynchronization = true;
      browser.waitForAngular();
  
      browser.sleep(1000);
      
      element(by.xpath(testdata1.PaymentMethods.Cybersource_Text));
      browser.actions().mouseMove(element(by.xpath(testdata1.PaymentMethods.CyberSource_Card))).perform();
      element(by.xpath(testdata1.PaymentMethods.CyberSource_Visacard_Name)).click();
      
      expect(element(by.xpath(testdata1.PaymentMethods.CyberSource_BillingInformationTitle)).getText()).toEqual('Billing Information');
  
      element(by.xpath(testdata1.PaymentMethods.CyberSource_FirstName)).clear();
      element(by.xpath(testdata1.PaymentMethods.CyberSource_FirstName)).sendKeys(testdata7.name);
      element(by.xpath(testdata1.PaymentMethods.CyberSource_LastName)).clear();
      element(by.xpath(testdata1.PaymentMethods.CyberSource_LastName)).sendKeys(testdata7.surname);
      element(by.xpath(testdata1.PaymentMethods.CyberSource_Company)).clear();
      element(by.xpath(testdata1.PaymentMethods.CyberSource_Company)).sendKeys(testdata7.companyname);
      element(by.xpath(testdata1.PaymentMethods.CyberSource_AddressLine1)).clear();
      element(by.xpath(testdata1.PaymentMethods.CyberSource_AddressLine1)).sendKeys(testdata7.address1);
      element(by.xpath(testdata1.PaymentMethods.CyberSource_AddressLine2)).clear();
      element(by.xpath(testdata1.PaymentMethods.CyberSource_AddressLine2)).sendKeys(testdata7.address2);
      element(by.xpath(testdata1.PaymentMethods.CyberSource_City)).clear();
      element(by.xpath(testdata1.PaymentMethods.CyberSource_City)).sendKeys(testdata7.city);
      element(by.xpath(testdata1.PaymentMethods.CyberSource_Country)).click();
      element(by.xpath(testdata1.PaymentMethods.CyberSource_Countryvalue)).click();
      element(by.xpath(testdata1.PaymentMethods.CyberSource_State)).clear();
      element(by.xpath(testdata1.PaymentMethods.CyberSource_State)).sendKeys(testdata7.state);
      element(by.xpath(testdata1.PaymentMethods.CyberSource_PostalCode)).clear();
      element(by.xpath(testdata1.PaymentMethods.CyberSource_PostalCode)).sendKeys(testdata7.postalcode);
      element(by.xpath(testdata1.PaymentMethods.CyberSource_Phone)).clear();
      element(by.xpath(testdata1.PaymentMethods.CyberSource_Phone)).sendKeys(testdata7.phno);
      element(by.xpath(testdata1.PaymentMethods.CyberSource_Email)).clear();
      element(by.xpath(testdata1.PaymentMethods.CyberSource_Email)).sendKeys(testdata7.email);
  
      //card no
  
      var widget = element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_Text));
      browser.executeScript('arguments[0].scrollIntoView()', widget.getWebElement());
      browser.sleep(1000);
  
      element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_CardNumber)).click();
      element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_CardNumber)).sendKeys(testdata7.cardno);
  
      element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_CVNLabel)).isPresent();
      element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_CVNValue)).isPresent();
      element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_CVNValue)).click();
  
      element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_CVNValue)).sendKeys(testdata7.cvnno);
  
      // expiration date edit
      element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_ExpirationMonth)).click();
      element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_ExpirationMonthValue)).click();
  
      element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_ExpirationYear)).click();
      element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_ExpirationYearValue)).click();
      element(by.xpath(testdata1.PaymentMethods.CyberSource_PaymentDetails_Finish)).click();
  
  
      browser.ignoreSynchronization = true;
      browser.waitForAngular();
  
      browser.sleep(5000);


      browser.refresh();

     //click on go to bills button
     element(by.xpath(testdata1.LiveWidget.GoToBills_AmountDue)).click();


       element(by.xpath(testdata1.LayerSelector.Dropdown)).click();
      element(by.xpath(testdata1.LayerSelector.Bills)).click();

      browser.sleep(5000);
      browser.actions().mouseMove(element(by.xpath(testdata1.Payments.PaymentsRecievedPopUp))).perform();
      browser.sleep(2000);
      //click on settings icon
      element(by.xpath(testdata1.Adjustment.Settings)).click();
      //click on None Button
      element(by.xpath(testdata1.Payments.Settings_None)).click();

      expect(element(by.xpath(testdata1.Payments.Amountvalue)).isDisplayed()).toBe(true);
      
      expect(element(by.xpath(testdata1.Payments.InvoicesAmount)).isDisplayed()).toBe(true);

    });
      });