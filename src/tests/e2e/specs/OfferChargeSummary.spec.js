describe('Offer Charge Summary widget', function () {

    //#region DataFiles
    
    var testdata11 = require('../inputs/testdata/XpathRepository.json');
    var testdata2 = require('../inputs/testdata/JsonFileCreation.json');
    var testdata6 = require('../inputs/testdata/OfferChargeSummary.json');
    var postBillData = require('../inputs/testdata/prebillandpostbillcreation.json');
    
    var downloadpath='C:/Users/Administrator/Downloads/';
    var fs = require('fs');
    
    //#endregion DataFiles
    
    //#region Tests
    
    it('Validate Summarised Charge details', function () {
    
    browser.refresh();
    browser.sleep(9000);
    
    if(browser.params.value=='ViewOnlineBill'){
    
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(postBillData.userName,postBillData.passwordField);
    
    //Validate the Offer Charge Summary Widget Fields
    OfferChargeSummarywidgetValidation();
    
    //To validate whether dynamic value  is executing.
    console.log(browser.params.value);
    
    //Log IN to MetraNet Applciation and navigate to View Online Bill screen
    protractor.loginHelpers.viewOnlineBill(postBillData.userName);
    
    //Validate the Offer Charge Summary Widget Fields
    OfferChargeSummarywidgetValidation();
    
    //Logout from the MetraNet
    protractor.loginHelpers.logOutMetraNet();
    
    }
    else
    {
      browser.refresh();
    browser.sleep(9000);
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(postBillData.userName,postBillData.passwordField);
    
    //Validate the Offer Charge Summary Widget Fields
    OfferChargeSummarywidgetValidation();
    }
    });
    //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10601/ Reg_002_ECBAR_Misc_adjustments_link_should_work
    // //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10503/ 001_Verify_NoDuplicateTransaction_SinglePOPI
    it('Validate No Duplicate Transaction is available in TabularView and Card View', function () {
    browser.refresh();
    browser.sleep(9000);
    
    if(browser.params.value=='ViewOnlineBill'){
    
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata2.userName,testdata2.passwordField);
    
    //Validate the Offer Charge Summary Widget Fields
    singlePOPI();
    
    //To validate whether dynamic value  is executing.
    console.log(browser.params.value);
    
    //Log IN to MetraNet Applciation and navigate to View Online Bill screen
    protractor.loginHelpers.viewOnlineBill(testdata2.userName);
    
    //Logout from the MetraNet
    protractor.loginHelpers.logOutMetraNet();
    
    
    }
    else
    {
    browser.refresh();
    browser.sleep(9000);
    
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata2.userName,testdata2.passwordField);
    
    //Validate the Offer Charge Summary Widget Fields
    singlePOPI();
    }
    });
    
    //Test Case: MetraView_2.0/ Charge_Details/ 007_Sorting_of_transactions
    it('Validate Sorting of transactions in Summarised Charge details', function () {
    browser.refresh();
    browser.sleep(9000);
    
    if(browser.params.value=='ViewOnlineBill'){
    
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata2.userName13,testdata2.passwordField);
    
    //Validate the Offer Charge Summary Charges Sorting Functionality
    sortingTransactions();
    
    //To validate whether dynamic value  is executing.
    console.log(browser.params.value);
    
    //Log IN to MetraNet Applciation and navigate to View Online Bill screen
    protractor.loginHelpers.viewOnlineBill(testdata2.userName13);
    
    //Validate the Offer Charge Summary Charges Sorting Functionality
    sortingTransactions();
    
    //Logout from the MetraNet
    protractor.loginHelpers.logOutMetraNet();
    
    }
    else
    {
      browser.refresh();
    browser.sleep(9000);
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata2.userName13,testdata2.passwordField);
    
    //Validate the Offer Charge Summary Charges Sorting Functionality
    sortingTransactions();
    }
    });
    
    it('Validate the "Non-standard charges" and "Miscellaneous pertaining to the Payer should be displayed and PI info Is downloaded From Charges Summary widget', function () {
    
    browser.refresh();
    browser.sleep(9000);
    
    if(browser.params.value=='ViewOnlineBill'){
    
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata2.userName13,testdata2.passwordField);
    
    //Validate the Offer Charge Summary Charges Sorting Functionality
    DownloadFromPayer();
    
    //To validate whether dynamic value  is executing.
    console.log(browser.params.value);
    
    //Log IN to MetraNet Applciation and navigate to View Online Bill screen
    protractor.loginHelpers.viewOnlineBill(testdata2.userName13);
    
    //Validate the Offer Charge Summary Charges Sorting Functionality
    DownloadFromPayer();
    
    //Logout from the MetraNet
    protractor.loginHelpers.logOutMetraNet();
    
    }
    else
    {
      browser.refresh();
    browser.sleep(9000);
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata2.userName13,testdata2.passwordField);
    
    //Validate the Offer Charge Summary Charges Sorting Functionality
    DownloadFromPayer();
    }
    });
    
    // //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10590/ Reg_002_DownloadPIinfoFromTransactionsPage
    it('Validate that Download PI info From TransactionsPage', function () {
    browser.refresh();
    browser.sleep(9000);
    
    if(browser.params.value=='ViewOnlineBill'){
    
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata2.userName,testdata2.passwordField);
    
    //Validate the Offer Charge Summary Widget Fields
    DownloadPIfromTransactions();
    
    //To validate whether dynamic value  is executing.
    console.log(browser.params.value);
    
    //Log IN to MetraNet Applciation and navigate to View Online Bill screen
    protractor.loginHelpers.viewOnlineBill(testdata2.userName);
    
    //Validate the Offer Charge Summary Widget Fields
    DownloadPIfromTransactions();
    
    //Logout from the MetraNet
    protractor.loginHelpers.logOutMetraNet();
    
    }
    else
    {
      browser.refresh();
    browser.sleep(9000);
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata2.userName,testdata2.passwordField);
    
    //Validate the Offer Charge Summary Widget Fields
    DownloadPIfromTransactions();
    }
    });
    //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10601/ Reg_002_ECBAR_Misc_adjustments_link_should_work
    // //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10503/ Reg_002_Verify_NoDuplicateTransaction_MultiplePOPI
    it('Validate No Duplicate Transaction area vailable in TabularView and Card View for Multiple PO PI', function () {
    
    browser.refresh();
    browser.sleep(9000);
    
    if(browser.params.value=='ViewOnlineBill'){
    
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata2.userName14,testdata2.passwordField);
    
    //Validate the Offer Charge Summary Charges Sorting Functionality
    multiplePOPI();
    
    //To validate whether dynamic value  is executing.
    console.log(browser.params.value);
    
    //Log IN to MetraNet Applciation and navigate to View Online Bill screen
    protractor.loginHelpers.viewOnlineBill(testdata2.userName14);
    
    //Validate the Offer Charge Summary Charges Sorting Functionality
    multiplePOPI();
    
    //Logout from the MetraNet
    protractor.loginHelpers.logOutMetraNet();
    
    }
    else
    {
      browser.refresh();
    browser.sleep(9000);
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata2.userName14,testdata2.passwordField);
    
    //Validate the Offer Charge Summary Charges Sorting Functionality
    multiplePOPI();
    }
    });
    
    it('Validate the "Non-standard charges" and "Miscellaneous Adjustments" pertaining to the Payer should be displayed in Charges Summary widget', function () {
    
    //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10625/ 001_NonStandardCharges_in_Charges_summary_widget
    browser.refresh();
    browser.sleep(9000);
    
    if(browser.params.value=='ViewOnlineBill'){
    
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata2.userName,testdata2.passwordField);
    
    //Validate the Offer Charge Summary Widget Fields
    singlePOPI();
    
    NoNPOs();
    
    //To validate whether dynamic value  is executing.
    console.log(browser.params.value);
    
    //Log IN to MetraNet Applciation and navigate to View Online Bill screen
    protractor.loginHelpers.viewOnlineBill(testdata2.userName);
    
    //Validate the Offer Charge Summary Widget Fields
    OfferChargsinglePOPIeSummarywidgetValidation();
    
    //Logout from the MetraNet
    protractor.loginHelpers.logOutMetraNet();
    
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata2.userName,testdata2.passwordField);
    
    }
    else
    {
      browser.refresh();
    browser.sleep(9000);
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata2.userName,testdata2.passwordField);
    
    //Validate the Offer Charge Summary Widget Fields
    payerChargers();
    }
    
    });
    
    //Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ Sanity_Bugs_TestCases/ 2703_001_NonStdCharges_pertaining_Payer_inChargesw
    it('Validate Non standard charges at the Department account(Child account)', function () {
    browser.refresh();
    browser.sleep(9000);
    
    if(browser.params.value=='ViewOnlineBill'){
    
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata2.userName13,testdata2.passwordField);
    
    //Validate the Non standard charges at the Transactions widget(Child account)
    NonStandardPertainingtoChildAccount();
    
    //To validate whether dynamic value  is executing.
    console.log(browser.params.value);
    
    //Log IN to MetraNet Applciation and navigate to View Online Bill screen
    protractor.loginHelpers.viewOnlineBill(testdata2.userName13);
    
    //Validate the standard charges at the Transactions widget(Child account)
    NonStandardPertainingtoChildAccount();
    
    //Logout from the MetraNet
    protractor.loginHelpers.logOutMetraNet();
    
    }
    else
    {
      browser.refresh();
    browser.sleep(9000);
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata2.userName13,testdata2.passwordField);
    
    //Validate the Offer Charge Summary Charges Sorting Functionality
    NonStandardPertainingtoChildAccount();
    
    //Logout from the MV2.0 Application 
    protractor.loginHelpers.logOutMV();
    }
    });
    
    //#endregion Tests
    
    //#region TestHelpers
    
    function OfferChargeSummarywidgetValidation(){
    
    //Input file to refer
    var testdata12 = protractor.loginHelpers.dashboard();
    
    element(by.xpath(testdata11.LayerSelector.Dropdown)).click();
    element(by.xpath(testdata11.LayerSelector.Bills)).click();
    browser.sleep(5000);
    
    //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10470/ 001_Verificationof_GraphHeading_XAxix_BillPeriods
    //Validating the bill periods label next to drop-down is changed to "Select Period/Invoice"
    expect(element(by.xpath(testdata11.Billing.SelectPeriodInvoiceLabel)).getText()).toEqual(testdata12.TEXT_SELECT_BILLING_PERIOD);
    expect(element(by.xpath(testdata11.Billing.SelectPeriodInvoiceLabel)).isDisplayed()).toBe(true);
    browser.sleep(3000);
    
    //Validating that the graph heading is changed to "Invoiced Total Charges"
    expect(element(by.xpath(testdata11.InvoicedTotalCharges.Title)).getText()).toEqual(testdata12.TEXT_INVOICE_TOTAL_CHARGE);
    expect(element(by.xpath(testdata11.InvoicedTotalCharges.Bar_Visibility)).isDisplayed()).toBe(true);
    
    //Validating that the X-axis label is changed to "Invoice Creation Date"
    expect(element(by.xpath(testdata11.InvoicedTotalCharges.Invoiced_Creation_Date_Axis)).getText()).toEqual(testdata12.TEXT_INVOICE_DATE);
    
    //There should be a date interval under the bills
    expect(element(by.xpath(testdata11.Billing.SelectPeriodInvoiceDropdown)).isDisplayed()).toBe(true);
    
    element(by.xpath(testdata11.Billing.SelectPeriodInvoiceDropdown)).click();
    browser.sleep(1000);
    //The date interval should be a dropdown
    expect(element(by.xpath(testdata11.Billing.IntervalList)).isDisplayed()).toBe(true);
    browser.sleep(1000);
    
    expect(element(by.xpath(testdata11.Billing.IntervalList)).getText()).toContain(localizedDate()+" - "+localizedDate());
    element(by.xpath(testdata11.Billing.SelectPeriodInvoiceDropdown)).click();
    expect(element(by.xpath(testdata11.OfferCharge.ChargesSubtotal_Label)).getText()).toEqual(testdata12.TEXT_CHARGES_SUB_TOTAL);
    browser.sleep(1000);
    
    //Charge Details should be shown with the offers subscribed
    expect(element(by.xpath(testdata11.OfferCharge.ProductOfferingLabel)).isDisplayed()).toBe(true);
    
    // Click the link of the product offer name and Each [Offer Name] should able to drilled-down by click/touch
    //click on group usage po
    element(by.xpath(testdata11.OfferCharge.PO_GroupUsage)).click();
    
    browser.sleep(1000);
    
    //click on down arrow to close the tree view
    element(by.xpath(testdata11.OfferCharge.ArrowExpanded)).click();
    browser.sleep(1000);
    
    //click on Misc adjustments
    element(by.xpath(testdata11.OfferCharge.Misc_Adjustments_Label+testdata12.TEXT_MISC_ADJUSTMENTS+testdata11.ChildAccounts.CloseXpath)).click();
    browser.sleep(1000);
    //Validate Miscellaneous Adjsutmetns Details are opened
    //Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 2902_NavigationToNewPageByClickingCharge
    expect(element(by.xpath(testdata11.OfferCharge.SecondHeader+testdata12.TEXT_MISC_ADJUSTMENTS+testdata11.Adjustment.CloseXpath)).isDisplayed()).toBe(true);
    //click on cancel button to go back to offer store page
    element(by.xpath(testdata11.OfferCharge.ClickOn_X_Button)).click();
    browser.sleep(1000);
    
    //click on Non Standard charges
    element(by.xpath(testdata11.OfferCharge.Non_Standard_Charge_Label+testdata12.TEXT_NON_STANDARD_CHARGES+testdata11.ChildAccounts.CloseXpath)).click();
    browser.sleep(1000);
    //Validate Miscellaneous Adjsutmetns Details are opened
    //Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 2902_NavigationToNewPageByClickingCharge
    expect(element(by.xpath(testdata11.OfferCharge.SecondHeader+testdata12.TEXT_NON_STANDARD_CHARGES+testdata11.Adjustment.CloseXpath)).isDisplayed()).toBe(true);
    
    //click on cancel button to go back to offer store page
    element(by.xpath(testdata11.OfferCharge.ClickOn_X_Button)).click();
    browser.sleep(1000);
    
    // offer view
    expect(element(by.xpath(testdata11.OfferCharge.AccountView_Pane)).isDisplayed()).toBe(true);
    
    console.log('account view and offer view are present');
    
    //  0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10473/ 001_DownloadChargesCSVFileFromBillsPage
    element(by.xpath(testdata11.OfferCharge.AccountView_Pane)).click();
    browser.sleep(2000);
    
    //Test Case: MVIEW_S00NEXT_TestCases/ MVIEW-2612_001_MainCase
    expect(element(by.xpath(testdata11.OfferCharge.PI_Selection)).isPresent()).toBe(false);
    
    //click on group usage po
    element(by.xpath(testdata11.OfferCharge.PayerPOSelection)).click();
    browser.sleep(2000);

    //click on group usage po
    element(by.xpath(testdata11.OfferCharge.PO_GroupUsage)).click();
    
    browser.sleep(1000);
    
    //Defining the download path
    filename = downloadpath+'OfferChargeSummary.csv';
    
    if (fs.existsSync(filename)) {
    //Make sure the browser doesn't have to rename the download.
    fs.unlinkSync(filename);
    }
    
    //Click on DownLoad link beside the PI
    element(by.xpath(testdata11.OfferCharge.Download_PI_Link)).click();
    browser.sleep(3000);
    
    //Verify that the list of adjustments should get downloaded
    browser.driver.wait(function() {
    browser.waitForAngular();
    browser.ignoreSynchronization = true;
    return fs.existsSync(filename);
    }, 8000).then(function(){
    //Verifying the Payer details in downloaded .csv file
    expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(timestamp());
    });
    
    //Need to find a way to validate the text in diferent languages
    element(by.xpath(testdata11.OfferCharge.OfferView_Pane)).click();
    browser.sleep(2000);
    
    //click on down arrow to close the tree view
    element(by.xpath(testdata11.OfferCharge.ArrowExpand)).click();
    browser.sleep(1000);
    
    //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10590/ 001_One_file_should_be_downloaded_in_bills_page
    expect(element(by.xpath(testdata11.OfferCharge.PO_GroupUsage)).isDisplayed()).toBe(true);
    
    //Defining the path for downloaded .csv file.
    var filename = downloadpath+'OfferChargeSummary.csv';
    
    //Verify that the list of adjustments should get downloaded
    if (fs.existsSync(filename)) {
    // Make sure the browser doesn't have to rename the download.
    fs.unlinkSync(filename);
    }
    //Click on DownLoad link beside the PI
    element(by.xpath(testdata11.OfferCharge.Download_PI_Link)).click();
    browser.sleep(3000);
    
    //Verify that that charges file should get downloaded
    browser.driver.wait(function() {
    browser.waitForAngular();
    browser.ignoreSynchronization = true;
    return fs.existsSync(filename);
    }, 10000).then(function(){
    
    //Verifying the Payer details in downloaded .csv file
    expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(timestamp());
    });
    browser.sleep(3000);
    
    //Select PI link
    element(by.xpath(testdata11.OfferCharge.PI_Selection)).click();
    browser.sleep(1000);
    
    //Validate 'Select Transaction' button exists in BIlls Page
    //Need to work on MVP-develop
    //Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 2902_NavigationToNewPageByClickingCharge
   // element(by.xpath(testdata11.OfferCharge.SelectCharges_Button)).click();
  //  browser.sleep(1000);
    
   // expect(element(by.xpath(testdata11.OfferCharge.ChargesSubtotal_Value)).getText()).toEqual(totalchargesamount());
    //browser.sleep(1000);
    
    //Charge Details should be shown with the offers subscribed
    //expect(element(by.xpath(testdata11.OfferCharge.ProductOfferingLabel)).isDisplayed()).toBe(true);
    
    // Click the link of the product offer name and Each [Offer Name] should able to drilled-down by click/touch
    //click on group usage po
    //element(by.xpath(testdata11.OfferCharge.PO_GroupUsage)).click();
    
    //browser.sleep(1000);
    
    //Select PI link
   // element(by.xpath(testdata11.OfferCharge.PI_Selection)).click();
   // browser.sleep(1000);
    
    //Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ Sanity_Bugs_TestCases/ 2893_PILink_should_work_in_the_charges_Widget.
    //The user should able to view the transactions are displayed in card view after click/touch on the summarized charge
    //Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 2902_NavigationToNewPageByClickingCharge
    expect(element(by.xpath(testdata11.OfferCharge.Grid_Row_Values)).isDisplayed()).toBe(true);
    
    // Click on Tabular view option
    element(by.xpath(testdata11.OfferCharge.TabularActiveView_Icon)).click();
    browser.sleep(3000);
    
    expect(element(by.xpath(testdata11.OfferCharge.CardLayout_Icon)).isDisplayed()).toBe(true);
    
    element(by.xpath(testdata11.OfferCharge.TabularActiveView_Icon)).click();
    
    // selected by bills
    element(by.xpath(testdata11.NowCast.ViewAll_Date)).click();
    element.all(by.xpath(testdata11.OfferCharge.SelectByDropDown)).then(function(items) {
    items[0].click();
    browser.sleep(1000);
    });
    // selected by daterange
    element(by.xpath(testdata11.NowCast.ViewAll_Date)).click();
    browser.sleep(2000);
    element.all(by.xpath(testdata11.OfferCharge.SelectByDropDown)).then(function(items) {
    items[1].click();
    browser.sleep(1000);
    });
    
    // sort by
    element(by.xpath(testdata11.ActivityLog.SortBy)).click();
    browser.sleep(2000);
    
    var testdata13= protractor.loginHelpers.productViewsValues();
    console.log(testdata13);
    
    element.all(by.xpath(testdata11.ActivityLog.SortBy_Values)).then(function(values) {
    expect(testdata13).toContain(values[1].getText());
    //expect(values[1].getText()).toEqual(testdata13.TEXT_TIMESTAMP);
    values[1].click();
    browser.sleep(1000);
    });
    var val=element(by.xpath(testdata11.OfferCharge.SortBy_Valdiation)).getText();
    expect(testdata13).toContain(val);
    browser.sleep(2000);
    
    // global filter
    element(by.xpath(testdata11.OfferCharge.Global_Filters)).click();
    browser.sleep(1000);
    browser.actions().mouseMove(element(by.xpath(testdata11.Adjustment.Filter_SortBy))).perform();
    element(by.xpath(testdata11.OfferCharge.SortBy_Dropdown)).click();
    element.all(by.xpath(testdata11.Transactions.Filter_SortBy_Values)).then(function(filtervalues) {
    expect(filtervalues.length).toBe(3);
    filtervalues[2].click();
    browser.sleep(1000);
    });
    
    element(by.xpath(testdata11.OfferCharge.Apply_Button)).click();
    browser.sleep(2000);
    
    // clicking on card view
    element(by.xpath(testdata11.MySubscriptions.Style_Card)).click();
    browser.sleep(2000);
    expect(element(by.xpath(testdata11.OfferCharge.CardLayout_Icon)).isPresent()).toBe(true);
    
    // clicking on tabular view
    element(by.xpath(testdata11.OfferCharge.TabularActiveView_Icon)).click();
    browser.sleep(4000);
    
    //clicking on settings icon
    element(by.xpath(testdata11.Adjustment.Settings)).click();
    browser.actions().mouseMove(element(by.xpath(testdata11.OfferCharge.Setting))).perform();
    element(by.xpath(testdata11.OfferCharge.None_Button)).click();
    element(by.xpath(testdata11.OfferCharge.All_Button)).click();
    element(by.xpath(testdata11.OfferCharge.DisplayAmount_CheckBox)).click();
    
    //element(by.xpath(testdata11.OfferCharge.TimeStamp_CheckBox)).click();
    element(by.xpath(testdata11.OfferCharge.Amount_Unpin)).click();
    browser.sleep(2000);
    element(by.xpath(testdata11.OfferCharge.Settings_Apply_Button)).click();
    browser.sleep(1000);
    
    // clicking on card view
    element(by.xpath(testdata11.OfferCharge.CardView_Header)).click();
    browser.sleep(1000);
    
    // download
    expect(element(by.xpath(testdata11.OfferCharge.DownloadLink)).isDisplayed()).toBe(true);
    element(by.xpath(testdata11.OfferCharge.DownloadLink)).click();
    browser.sleep(3000);
    
    element(by.xpath(testdata11.OfferCharge.TabularActiveView_Icon)).click();
    browser.sleep(1000);
    
    // clicking on cross button and back to dashboard
    element(by.xpath(testdata11.OfferCharge.Close)).click();
    browser.sleep(1000);
    
    //  0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10473/ 001_DownloadChargesCSVFileFromBillsPage
    
    // account view
    expect(element(by.xpath(testdata11.OfferCharge.AccountView_Pane)).isDisplayed()).toBe(true);
    element(by.xpath(testdata11.OfferCharge.AccountView_Pane)).click();
    browser.sleep(2000);
    
    //Test Case: MVIEW_S00NEXT_TestCases/ MVIEW-2612_001_MainCase
    expect(element(by.xpath(testdata11.OfferCharge.PI_Selection)).isPresent()).toBe(false);
    
    //click on group usage po
    element(by.xpath(testdata11.OfferCharge.PayerPOSelection)).click();
    browser.sleep(2000);
    
    //click on group usage po
    //Test Case: MVIEW_S00NEXT_TestCases/ MVIEW-2612_001_MainCase
    element(by.xpath(testdata11.OfferCharge.PO_GroupUsage)).click();
    browser.sleep(2000);
    
    //Test Case: MVIEW_S00NEXT_TestCases/ MVIEW-2612_001_MainCase
    expect(element(by.xpath(testdata11.OfferCharge.PI_Selection)).isPresent()).toBe(true);
    
    //click on group usage po
    element(by.xpath(testdata11.OfferCharge.PI_Selection)).click();
    
    //Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ Sanity_Bugs_TestCases/ 2893_PILink_should_work_in_the_charges_Widget.
    expect(element(by.xpath(testdata11.OfferCharge.Grid_Row_Values)).isDisplayed()).toBe(true);
    
    element(by.xpath(testdata11.NowCast.ViewAll_Date)).click();
    
    // selected by daterange
    element.all(by.xpath(testdata11.OfferCharge.SelectByDropDown)).then(function(items) {
    items[1].click();
    browser.sleep(1000);
    });
    
    // sort by
    element(by.xpath(testdata11.ActivityLog.SortBy)).click();
    browser.sleep(2000);
    element.all(by.xpath(testdata11.ActivityLog.SortBy_Values)).then(function(values) {
    expect(testdata13).toContain(values[1].getText());
    //expect(values[1].getText()).toEqual(testdata13.TEXT_TIMESTAMP);
    values[1].click();
    browser.sleep(1000);
    });
    var val1=element(by.xpath(testdata11.OfferCharge.SortBy_Valdiation)).getText();
    expect(testdata13).toContain(val1);
    browser.sleep(2000);
    //expect(element(by.xpath(testdata11.OfferCharge.SortBy_Valdiation)).getText()).toEqual(testdata13.TEXT_TIMESTAMP);
    //browser.sleep(2000);
    
    // global filter
    element(by.xpath(testdata11.OfferCharge.Global_Filters)).click();
    browser.sleep(1000);
    browser.actions().mouseMove(element(by.xpath(testdata11.Adjustment.Filter_SortBy))).perform();
    element(by.xpath(testdata11.OfferCharge.SortBy_Dropdown)).click();
    element.all(by.xpath(testdata11.Transactions.Filter_SortBy_Values)).then(function(filtervalues) {
    expect(filtervalues.length).toBe(3);
    filtervalues[2].click();
    browser.sleep(1000);
    });
    
    element(by.xpath(testdata11.OfferCharge.Apply_Button)).click();
    browser.sleep(2000);
    
    //expect(element(by.xpath(testdata11.OfferCharge.SortBy_Valdiation)).getText()).toEqual('Display Amount');
    
    // clicking on card view
    expect(element(by.xpath(testdata11.OfferCharge.CardView_Header)).isPresent()).toBe(true);
    element(by.xpath(testdata11.OfferCharge.CardView_Header)).click();
    browser.sleep(2000);
    
    // clicking on tabular view
    element(by.xpath(testdata11.OfferCharge.TabularActiveView_Icon)).click();
    browser.sleep(1000);
    
    //clicking on settings icon
    element(by.xpath(testdata11.Adjustment.Settings)).click();
    browser.actions().mouseMove(element(by.xpath(testdata11.OfferCharge.Setting))).perform();
    element(by.xpath(testdata11.OfferCharge.None_Button)).click();
    element(by.xpath(testdata11.OfferCharge.All_Button)).click();
    element(by.xpath(testdata11.OfferCharge.DisplayAmount_CheckBox)).click();
    
    //element(by.xpath(testdata11.OfferCharge.TimeStamp_CheckBox)).click();
    element(by.xpath(testdata11.OfferCharge.Amount_Unpin)).click();
    browser.sleep(1000);
    element(by.xpath(testdata11.OfferCharge.Settings_Apply_Button)).click();
    browser.sleep(1000);
    
    // download
    element(by.xpath(testdata11.OfferCharge.DownloadLink)).click();
    browser.sleep(3000);
    
    // clicking on cross button and back to dashboard
    element(by.xpath(testdata11.OfferCharge.Close)).click();
    browser.sleep(2000);
    }
    
    function sortingTransactions(){
    
    var sort = [];
    var unSort = [];
    
    
    //Click on Go to Bills Link
    element(by.xpath(testdata11.Billing.GoToBillsButton)).click();
    browser.sleep(5000);
    
    //Select the Period/Invoice dropdown in Bills
    element(by.xpath(testdata11.Billing.SelectIntervalDropdown)).click();
    browser.sleep(3000);
    
    //Offer view and Click on Product Offering name
    expect(element(by.xpath(testdata11.OfferCharge.PO_GroupUsage)).isPresent()).toBe(true);
    element(by.xpath(testdata11.OfferCharge.PO_GroupUsage)).click();
    browser.sleep(3000);
    
    element(by.xpath(testdata11.OfferCharge.PI_Selection)).click();
    browser.sleep(3000);
    //The user should able to view the transactions are displayed in card view after click/touch on the summarized charge
    expect(element(by.xpath(testdata11.Adjustment.Charges_Transactions)).isDisplayed()).toBe(true);
    //Sort by
    // element(by.xpath(testdata11.Adjustment.SelectInterval)).click();
    
    //Get the values of adjutment amount in unsort mode
    const elem = element.all(by.xpath(testdata11.Billing.TimeStamp_ColumnList))
    //const elem = element.all(by.xpath(testdata11.Adjustment.SortByDropdown))
    elem.map(function(eachName){
    eachName.getText().then(function unsorting(unSorted){
    unSort.push (unSorted);
    console.log(unSort);
    return unSorted;
    });
    
    });
    browser.sleep(2000);
    
    //click on sort and select adjutment amount from the dropdown
    element(by.xpath(testdata11.Adjustment.SortByDropdown)).click();
    element(by.xpath(testdata11.Adjustment.SortByDropdownSecondValue)).click();
    browser.sleep(10000);
    //Get the values of adjutment amount in sort mode
    elem.map(function(eachName){
    eachName.getText().then(function sorting(sorted){
    sort.push(sorted);
    console.log(sort);
    return sorted });
    
    //validate the sorting functionality
    }).then(function compare ()
    {
    for (var i = 0; i < sort.length-1; i++) {
    console.log(sort.length,sort[i],sort[i+1],i)
    if(sort[i] >= sort[i+1])
    {
    console.log("Test Case Failed as Sort is not Working as Expected")
    break;
    }}
    })
    }
    
    function singlePOPI(){
    var testdata12 = protractor.loginHelpers.dashboard();
    
    //Selecting 'Bills' from drop down in MetraView Dashboard Page
    element(by.xpath(testdata11.LayerSelector.Dropdown)).click();
    element(by.xpath(testdata11.LayerSelector.Bills)).click();
    browser.sleep(5000);
    expect(element(by.xpath(testdata11.Billing.SelectPeriodInvoiceDropdown)).isDisplayed()).toBe(true);
    
    //The interval date should be the dropdown
    element(by.xpath(testdata11.Billing.SelectPeriodInvoiceDropdown)).click();
    expect(element(by.xpath(testdata11.Billing.IntervalList)).isDisplayed()).toBe(true);
    browser.sleep(2000);
    
    expect(element(by.xpath(testdata11.Billing.IntervalList)).getText()).toContain(localizedDate()+" - "+localizedDate());
    element(by.xpath(testdata11.Billing.SelectPeriodInvoiceDropdown)).click();
    expect(element(by.xpath(testdata11.OfferCharge.ChargesSubtotal_Label)).getText()).toEqual(testdata12.TEXT_CHARGES_SUB_TOTAL);
    browser.sleep(1000);
    
    //Charge Details should be visible
    expect(element(by.xpath(testdata11.OfferCharge.ChargesSubtotal_Value)).getText()).toEqual(totalchargesamount());
    
    //Test Case: MVIEW_S00NEXT_TestCases/ MVIEW-2612_001_MainCase
    expect(element(by.xpath(testdata11.OfferCharge.PI_Selection)).isPresent()).toBe(false);
    
    //Charge Details should be shown with the offers subscribed
    expect(element(by.xpath(testdata11.OfferCharge.ChargeSummary_Widget)).isDisplayed()).toBe(true);
    //Click on group usage PO link
    element(by.xpath(testdata11.OfferCharge.PO_GroupUsage)).click();
    browser.sleep(3000);
    //Test Case: MVIEW_S00NEXT_TestCases/ MVIEW-2612_001_MainCase
    expect(element(by.xpath(testdata11.OfferCharge.PI_Selection)).isPresent()).toBe(true);
    //Select PI link
    element(by.xpath(testdata11.OfferCharge.PI_Selection)).click();
    browser.sleep(1000);
    
    //The user able to view a single transaction is displayed in Tabular view
    expect(element(by.xpath(testdata11.OfferCharge.Grid_Row_Values)).isDisplayed()).toBe(true);
    browser.sleep(3000);
    
    //Click on Card View icon
    element(by.xpath(testdata11.OfferCharge.TabularActiveView_Icon)).click();
    browser.sleep(5000);
    
    //Validate that a single card view is displayed
    expect(element(by.xpath(testdata11.OfferCharge.CardLayout_Icon)).isDisplayed()).toBe(true);
    
    //Goingback to Dashboard by refreshing
    browser.refresh();
    browser.sleep(5000);
    
    //Click on Transactions link
    element(by.xpath(testdata11.Transactions.Transactions_LinkNew)).click();
    browser.sleep(5000);
    
    //Select Start Date  as today
    element(by.xpath(testdata11.ActivityLog.ViewAll_StartDate_Field)).click();
    browser.sleep(1000);
    element(by.xpath(testdata11.ActivityLog.ViewAll_Date_Today)).click();
    browser.sleep(1000);
    
    element(by.xpath(testdata11.ActivityLog.ViewAll_EndDate_Field)).click();
    browser.sleep(1000);
    //Select End Date  as today
    element(by.xpath(testdata11.ActivityLog.ViewAll_EndDate_Field)).click();
    //element(by.xpath(testdata11.ActivityLog.ViewAll_Date_Today)).click();
    browser.sleep(1000);
    element(by.xpath(testdata11.ActivityLog.Search)).click();
    browser.sleep(3000);
    ////Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 2902_NavigationToNewPageByClickingCharge
    // element(by.xpath(testdata11.Transactions.Transactions_LinkNew)).click();
    // browser.sleep(3000);
    
    // Click the link of the product offer name and Each [Offer Name] should able to drilled-down by click/touch
    //click on group usage po
    element(by.xpath(testdata11.OfferCharge.PO_GroupUsage)).click();
    
    browser.sleep(1000);
    
    //click on down arrow to close the tree view
    element(by.xpath(testdata11.OfferCharge.ArrowExpanded)).click();
    browser.sleep(1000);
    
    //click on Misc adjustments
    element(by.xpath(testdata11.OfferCharge.Misc_Adjustments_Label+testdata12.TEXT_MISC_ADJUSTMENTS+testdata11.ChildAccounts.CloseXpath)).click();
    browser.sleep(1000);
    //Validate Miscellaneous Adjsutmetns Details are opened
    //Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 2902_NavigationToNewPageByClickingCharge
    expect(element(by.xpath(testdata11.OfferCharge.SecondHeader+testdata12.TEXT_MISC_ADJUSTMENTS+testdata11.Adjustment.CloseXpath)).isDisplayed()).toBe(true);
    //click on cancel button to go back to offer store page
    element(by.xpath(testdata11.OfferCharge.ClickOn_X_Button)).click();
    browser.sleep(10000);
    
    //Click on Transactions link
    element(by.xpath(testdata11.Transactions.Transactions_LinkNew)).click();
    browser.sleep(5000);
    
    //Select Start Date  as today
    element(by.xpath(testdata11.ActivityLog.ViewAll_StartDate_Field)).click();
    browser.sleep(1000);
    element(by.xpath(testdata11.ActivityLog.ViewAll_Date_Today)).click();
    browser.sleep(1000);
    
    element(by.xpath(testdata11.ActivityLog.ViewAll_EndDate_Field)).click();
    browser.sleep(1000);
    //Select End Date  as today
    element(by.xpath(testdata11.ActivityLog.ViewAll_EndDate_Field)).click();
    //element(by.xpath(testdata11.ActivityLog.ViewAll_Date_Today)).click();
    browser.sleep(1000);
    element(by.xpath(testdata11.ActivityLog.Search)).click();
    browser.sleep(3000);
    ////Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 2902_NavigationToNewPageByClickingCharge
   
    // Click the link of the product offer name and Each [Offer Name] should able to drilled-down by click/touch
    //click on group usage po
    element(by.xpath(testdata11.OfferCharge.PO_GroupUsage)).click();
    
    browser.sleep(1000);
    
    //click on down arrow to close the tree view
    element(by.xpath(testdata11.OfferCharge.ArrowExpanded)).click();
    browser.sleep(1000);
    
    //click on Non Standard charges
    console.log("xpath="+testdata11.OfferCharge.Misc_Adjustments_Label+testdata12.TEXT_NON_STANDARD_CHARGES+testdata11.ChildAccounts.CloseXpath)
    element(by.xpath(testdata11.OfferCharge.Misc_Adjustments_Label+testdata12.TEXT_NON_STANDARD_CHARGES+testdata11.ChildAccounts.CloseXpath)).click();
    browser.sleep(1000);
    
    
    //Validate Miscellaneous Adjsutmetns Details are opened
    //Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 2902_NavigationToNewPageByClickingCharge
    expect(element(by.xpath(testdata11.OfferCharge.SecondHeader+testdata12.TEXT_NON_STANDARD_CHARGES+testdata11.Adjustment.CloseXpath)).isDisplayed()).toBe(true);
    
    //click on cancel button to go back to offer store page
    element(by.xpath(testdata11.OfferCharge.ClickOn_X_Button)).click();
    browser.sleep(1000);
    
    //Click on Transactions link
    element(by.xpath(testdata11.Transactions.Transactions_LinkNew)).click();
    browser.sleep(5000);
    
    //Select Start Date  as today
    element(by.xpath(testdata11.ActivityLog.ViewAll_StartDate_Field)).click();
    browser.sleep(1000);
    element(by.xpath(testdata11.ActivityLog.ViewAll_Date_Today)).click();
    browser.sleep(1000);
    
    element(by.xpath(testdata11.ActivityLog.ViewAll_EndDate_Field)).click();
    browser.sleep(1000);
    //Select End Date  as today
    element(by.xpath(testdata11.ActivityLog.ViewAll_EndDate_Field)).click();
    //element(by.xpath(testdata11.ActivityLog.ViewAll_Date_Today)).click();
    browser.sleep(1000);
    element(by.xpath(testdata11.ActivityLog.Search)).click();
    browser.sleep(3000);
    ////Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 2902_NavigationToNewPageByClickingCharge
   
    // Account VIew
    element(by.xpath(testdata11.OfferCharge.AccountView_Pane)).click();
    browser.sleep(3000);
    //click on group usage po
    element(by.xpath(testdata11.OfferCharge.PayerPOSelection)).click();
    browser.sleep(2000);
    
    //Click on Group usage PO link
    element(by.xpath(testdata11.OfferCharge.PO_GroupUsage)).click();
    browser.sleep(3000);
    
    //Select PI link
    element(by.xpath(testdata11.OfferCharge.PI_Selection)).click();
    browser.sleep(1000);
    //Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ Sanity_Bugs_TestCases/ 2893_PILinkshouldworkinthechargesWidgetDashboardpg
    //The user should able to view a single transactions is displayed in Tabular view
    expect(element(by.xpath(testdata11.OfferCharge.Grid_Row_Values)).isDisplayed()).toBe(true);
    
    //Click on Card view option
    element(by.xpath(testdata11.OfferCharge.TabularActiveView_Icon)).click();
    browser.sleep(4000);
    
    //Validate that a single card view is displayed
    expect(element(by.xpath(testdata11.OfferCharge.CardLayout_Icon)).isDisplayed()).toBe(true);
    }
    
    function NonStandardPertainingtoChildAccount(){
    //Navigate to Bills page
    element(by.xpath(testdata11.LayerSelector.Dropdown)).click();
    element(by.xpath(testdata11.LayerSelector.Bills)).click();
    browser.sleep(5000);
    
    element(by.xpath(testdata11.Billing.SelectIntervalDropdown)).click();
    element(by.xpath(testdata11.Billing.SelectFirstInterval)).click();
    browser.sleep(4000);
    // Click On Account View Pane
    expect(element(by.xpath(testdata11.OfferCharge.AccountView_Pane)).isDisplayed()).toBe(true);
    element(by.xpath(testdata11.OfferCharge.AccountView_Pane)).click();
    browser.sleep(4000);
    //click on group usage po
    element(by.xpath(testdata11.OfferCharge.PayerPOSelection)).click();
    browser.sleep(2000);
    //Click on Dept account link
    element.all(by.xpath(testdata11.OfferCharge.ChildAccount)).then(function(filtervalues) {
    filtervalues[3].click();
    
    });
    //validate that Payer account (Department Account) is displayed
   // expect(element(by.xpath(testdata11.OfferCharge.PayerPOSelection)).getText()).toBe(testdata2.corp13Friendlyname);
    browser.sleep(2000);
    
    //Click on Expand link
    element(by.xpath(testdata11.OfferCharge.ExpandView)).click();
    
    browser.sleep(3000);
    
    //Verify the Nonstandard and miscellaneous adjustments are displayed under child accounts (Account view)
    expect(element(by.xpath(testdata11.OfferCharge.Child_Non_Standard_Charge_Label)).isDisplayed()).toBe(true);
    browser.sleep(2000);
    
    }
    
    function DownloadPIfromTransactions(){
    
    //Click on Transactions link
    element(by.xpath(testdata11.Transactions.Transactions_LinkNew)).click();
    browser.sleep(3000);
    
    //Select Start Date  as today
    element(by.xpath(testdata11.ActivityLog.ViewAll_StartDate_Field)).click();
    element(by.xpath(testdata11.ActivityLog.ViewAll_Date_Today)).click();
    browser.sleep(3000);
    // element(by.xpath(testdata11.ActivityLog.ViewAll_EndDate_Field)).click();
    // browser.sleep(1000);
    
    //Select End Date  as today
    element(by.xpath(testdata11.ActivityLog.ViewAll_EndDate_Field)).click();
    browser.sleep(3000);
    element(by.xpath(testdata11.ActivityLog.EndDate_New)).click();
    browser.sleep(1000);
    element(by.xpath(testdata11.ActivityLog.Search)).click();
    browser.sleep(3000);
    //Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 2902_NavigationToNewPageByClickingCharge
    // element(by.xpath(testdata11.Transactions.Transactions_LinkNew)).click();
    // browser.sleep(3000);
    
    element(by.xpath(testdata11.OfferCharge.AccountView_Pane)).click();
    browser.sleep(4000);
    
    //Test Case: MVIEW_S00NEXT_TestCases/ MVIEW-2612_001_MainCase
    expect(element(by.xpath(testdata11.OfferCharge.PI_Selection)).isPresent()).toBe(false);
    
    //click on group usage po
    element(by.xpath(testdata11.OfferCharge.PayerPOSelection)).click();
    browser.sleep(2000);
    
    //Click on Group usage PO link
    element(by.xpath(testdata11.OfferCharge.PO_GroupUsage)).click();
    browser.sleep(3000);
    
    //Defining the download path
    filename = downloadpath+'OfferChargeSummary.csv';
    
    if (fs.existsSync(filename)) {
    //Make sure the browser doesn't have to rename the download.
    fs.unlinkSync(filename);
    }
    //Click on DownLoad link beside the PI
    element(by.xpath(testdata11.OfferCharge.Download_PI_Link)).click();
    browser.sleep(3000);
    
    //Verify that only one file  get downloaded
    browser.driver.wait(function() {
    browser.waitForAngular();
    browser.ignoreSynchronization = true;
    return fs.existsSync(filename);
    }, 10000).then(function(){
    //Verifying the Payer details in downloaded .csv file
    expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain("37.4966666667");
    });
    
    }
    
    function DownloadFromPayer(){
    //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10621/ 001_NonStdCharges_pertaining_Payer_inChargeswidget
    //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10655/ 001_Verify_PIinfoIsdownloadedFromChargesSummary
    
    // Input file to refer
    var testdata4 = protractor.loginHelpers.dashboard();
    
    //Navigate to Bills page
    element(by.xpath(testdata11.LayerSelector.Dropdown)).click();
    element(by.xpath(testdata11.LayerSelector.Bills)).click();
    browser.sleep(5000);
    
    element(by.xpath(testdata11.Billing.SelectIntervalDropdown)).click();
    element(by.xpath(testdata11.Billing.SelectFirstInterval)).click();
    browser.sleep(5000);
    
    //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10621/ 001_NonStdCharges_pertaining_Payer_inChargeswidget
    element(by.xpath(testdata11.OfferCharge.AccountView_Pane)).click();
    browser.sleep(5000);
    
    //Click on Group usage PO link
    element(by.xpath(testdata11.OfferCharge.PayerPOSelection)).click();
    browser.sleep(3000);
    
    //Validate that "Miscellaneous Adjustments" lable is displayed (Account view)
    expect(element(by.xpath(testdata11.OfferCharge.Misc_Adjustments_Label+testdata4.TEXT_MISC_ADJUSTMENTS+testdata11.ChildAccounts.CloseXpath)).isDisplayed()).toBe(true);
    browser.sleep(2000);
    
    //Validate that "Non-Standard Charges" lable is displayed (Account view)
    expect(element(by.xpath(testdata11.OfferCharge.Non_Standard_Charge_Label+testdata4.TEXT_NON_STANDARD_CHARGES+testdata11.ChildAccounts.CloseXpath)).isDisplayed()).toBe(true);
    browser.sleep(2000);
    
    //Validate that Localization should work for "Miscellaneous Adjustments" and "Non-Standard Charges" lable (Account view)
    expect(element(by.xpath(testdata11.OfferCharge.Misc_Adjustments_Label+testdata4.TEXT_MISC_ADJUSTMENTS+testdata11.ChildAccounts.CloseXpath)).getText()).toBe(testdata4.TEXT_MISC_ADJUSTMENTS);
    browser.sleep(2000);
    
    //expect(element(by.xpath(testdata11.OfferCharge.Non_Standard_Charge_Label+testData4.TEXT_NON_STANDARD_CHARGES+testData11.ChildAccounts.CloseXpath)).getText()).toBe(testdata4.TEXT_NON_STANDARD_CHARGES);
    browser.sleep(2000);
    
    //Click on Dept account link
    element.all(by.xpath(testdata11.OfferCharge.ChildAccount)).then(function(filtervalues) {
    filtervalues[3].click();
    });
    browser.sleep(4000);
    
    //vlidate that Payer account (Department Account) is displayed
    expect(element(by.xpath(testdata11.OfferCharge.PayerPOSelection)).getText()).toBe(testdata2.corp13Friendlyname);
    browser.sleep(2000);
    
    //Click on View all link
    element(by.xpath(testdata11.OfferCharge.ExpandView)).click();
    browser.sleep(2000);
    
    //Validate that "Miscellaneous Adjustments" lable is displayed (Account view) for Department account
    expect(element(by.xpath(testdata11.OfferCharge.Misc_Adjustments_Label+testdata4.TEXT_MISC_ADJUSTMENTS+testdata11.ChildAccounts.CloseXpath)).isDisplayed()).toBe(true);
    browser.sleep(2000);
    
    //Validate that "Non-Standard Charges" lable is displayed (Account view) for Department account
    expect(element(by.xpath(testdata11.OfferCharge.Non_Standard_Charge_Label+testdata4.TEXT_NON_STANDARD_CHARGES+testdata11.ChildAccounts.CloseXpath)).isDisplayed()).toBe(true);
    browser.sleep(2000);
    
    //Validate that Localization should work for "Miscellaneous Adjustments" and "Non-Standard Charges" lable (Account view) for Department account
    expect(element(by.xpath(testdata11.OfferCharge.Misc_Adjustments_Label+testdata4.TEXT_MISC_ADJUSTMENTS+testdata11.ChildAccounts.CloseXpath)).getText()).toBe(testdata4.TEXT_MISC_ADJUSTMENTS);
    browser.sleep(2000);
    
    // /expect(element(by.xpath(testdata11.OfferCharge.Non_Standard_Charge_Label+testData4.TEXT_NON_STANDARD_CHARGES+testData11.ChildAccounts.CloseXpath)).getText()).toBe(testdata4.TEXT_NON_STANDARD_CHARGES);
    browser.sleep(2000);
    
    //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10655/ 001_Verify_PIinfoIsdownloadedFromChargesSummary
    
    //MONETAAS-1519: Unable to click on PI link after navigating to Transactions and Offercharges Screen in BR,ES,MX langauges
    //Test case will fail in BR,ES,MX langauges because of MONETAAS-1519
    
    element(by.xpath(testdata11.OfferCharge.PO_GroupUsage)).click();
    browser.sleep(8000);
    
    //Defining the path for downloaded .csv file.
    var filename = downloadpath+'OfferChargeSummary.csv';
    
    //Verify that the list of adjustments should get downloaded
    if (fs.existsSync(filename)) {
    // Make sure the browser doesn't have to rename the download.
    fs.unlinkSync(filename);
    }
    browser.sleep(3000);
    
    //Click on Pi download button
    element(by.xpath(testdata11.OfferCharge.Download_PI_Link)).click();
    browser.sleep(10000);
    
    //Verify that that charges file should get downloaded
    browser.driver.wait(function() {
    browser.waitForAngular();
    browser.ignoreSynchronization = true;
    return fs.existsSync(filename);
    }, 10000).then(function(){
    
    //Verifying the Payer details in downloaded .csv file (CorpAcc, DeptAcc and all 5 Coresub Acc)
    expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain("41.6666666667","33.3333333333");
    });
    
    //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10655/ 001_Verify_PIinfoIsdownloadedFromChargesSummary
    
    //MONETAAS-1519: Unable to click on PI link after navigating to Transactions and Offercharges Screen in BR,ES,MX langauges
    //Test case will fail in BR,ES,MX langauges because of MONETAAS-1519
    
    browser.refresh();
    browser.sleep(8000);
    
    //Navigate to Bills page
    element(by.xpath(testdata11.LayerSelector.Dropdown)).click();
    element(by.xpath(testdata11.LayerSelector.Bills)).click();
    browser.sleep(5000);
    
    element(by.xpath(testdata11.Billing.SelectIntervalDropdown)).click();
    element(by.xpath(testdata11.Billing.SelectFirstInterval)).click();
    browser.sleep(5000);
    
    element(by.xpath(testdata11.OfferCharge.PO_GroupUsage)).click();
    browser.sleep(1000);
    
    //Defining the path for downloaded .csv file.
    var filename1 = downloadpath+'OfferChargeSummary.csv';
    
    //Verify that the list of adjustments should get downloaded
    if (fs.existsSync(filename1)) {
    // Make sure the browser doesn't have to rename the download.
    fs.unlinkSync(filename1);
    }
    browser.sleep(3000);
    
    //Click on Pi download button
    element(by.xpath(testdata11.OfferCharge.Download_PI_Link)).click();
    browser.sleep(5000);
    
    //Verify that that charges file should get downloaded
    browser.driver.wait(function() {
    browser.waitForAngular();
    browser.ignoreSynchronization = true;
    return fs.existsSync(filename1);
    }, 10000).then(function(){
    
    //Verifying the Payer details in downloaded .csv file (CorpAcc, DeptAcc and all 5 Coresub Acc)
    expect(fs.readFileSync(filename1, { encoding: 'utf8' })).toContain("41.6666666667","33.3333333333");
    });
    
    }
    
    function payerChargers(){
    
    var testdata12 = protractor.loginHelpers.dashboard();
    
    //Navigate to Bills page
    element(by.xpath(testdata11.LayerSelector.Dropdown)).click();
    element(by.xpath(testdata11.LayerSelector.Bills)).click();
    browser.sleep(5000);
    
    //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10625/ 001_NonStandardCharges_in_Charges_summary_widget
    //Validate that "Miscellaneous Adjustments" lable is displayed (Offer view)
    expect(element(by.xpath(testdata11.OfferCharge.Misc_Adjustments_Label+testdata12.TEXT_MISC_ADJUSTMENTS+testdata11.ChildAccounts.CloseXpath)).isDisplayed()).toBe(true);
    browser.sleep(2000);
    
    //Validate that "Non-Standard Charges" lable is displayed (Offer view)
    expect(element(by.xpath(testdata11.OfferCharge.Non_Standard_Charge_Label+testdata12.TEXT_NON_STANDARD_CHARGES+testdata11.ChildAccounts.CloseXpath)).isDisplayed()).toBe(true);
    browser.sleep(2000);
    
    //Validate that Localization should work for "Miscellaneous Adjustments" and "Non-Standard Charges" lable (Offer view)
    expect(element(by.xpath(testdata11.OfferCharge.Misc_Adjustments_Label+testdata12.TEXT_MISC_ADJUSTMENTS+testdata11.ChildAccounts.CloseXpath)).getText()).toBe(testdata12.TEXT_MISC_ADJUSTMENTS);
    browser.sleep(2000);
    //expect(element(by.xpath(testdata11.OfferCharge.Non_Standard_Charge_Label+testData4.TEXT_NON_STANDARD_CHARGES+testData11.ChildAccounts.CloseXpath)).getText()).toBe(testdata12.TEXT_NON_STANDARD_CHARGES);
    browser.sleep(2000);
    
    // account view
    expect(element(by.xpath(testdata11.OfferCharge.AccountView_Pane)).isDisplayed()).toBe(true);
    element(by.xpath(testdata11.OfferCharge.AccountView_Pane)).click();
    browser.sleep(4000);
    
    //Test Case: MVIEW_S00NEXT_TestCases/ MVIEW-2612_001_MainCase
    expect(element(by.xpath(testdata11.OfferCharge.PI_Selection)).isPresent()).toBe(false);
    
    //click on group usage po
    element(by.xpath(testdata11.OfferCharge.PayerPOSelection)).click();
    browser.sleep(2000);
    
    //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10625/ 001_NonStandardCharges_in_Charges_summary_widget
    //Validate that "Miscellaneous Adjustments" lable is displayed (Account view)
    expect(element(by.xpath(testdata11.OfferCharge.Misc_Adjustments_Label+testdata12.TEXT_MISC_ADJUSTMENTS+testdata11.ChildAccounts.CloseXpath)).isDisplayed()).toBe(true);
    browser.sleep(2000);
    
    //Validate that "Non-Standard Charges" lable is displayed (Account view)
    expect(element(by.xpath(testdata11.OfferCharge.Non_Standard_Charge_Label+testdata12.TEXT_NON_STANDARD_CHARGES+testdata11.ChildAccounts.CloseXpath)).isDisplayed()).toBe(true);
    browser.sleep(2000);
    
    //Validate that Localization should work for "Miscellaneous Adjustments" and "Non-Standard Charges" lable (Account view)
    expect(element(by.xpath(testdata11.OfferCharge.Misc_Adjustments_Label+testdata12.TEXT_MISC_ADJUSTMENTS+testdata11.ChildAccounts.CloseXpath)).getText()).toBe(testdata12.TEXT_MISC_ADJUSTMENTS);
    browser.sleep(2000);
    
    //expect(element(by.xpath(testdata11.OfferCharge.Non_Standard_Charge_Label+testData4.TEXT_NON_STANDARD_CHARGES+testData11.ChildAccounts.CloseXpath)).getText()).toBe(testdata12.TEXT_NON_STANDARD_CHARGES);
    browser.sleep(2000);
    
    }
    
    function multiplePOPI(){
    
    //Selecting 'Bills' from drop down in MetraView Dashboard Page
    element(by.xpath(testdata11.LayerSelector.Dropdown)).click();
    element(by.xpath(testdata11.LayerSelector.Bills)).click();
    browser.sleep(5000);
    
    //Charge Details should be shown with the offers subscribed
    expect(element(by.xpath(testdata11.OfferCharge.ChargeSummary_Widget)).isDisplayed()).toBe(true);
    
    //Click on group usage PO link
    element.all(by.xpath(testdata11.OfferCharge.MultiplePO)).then(function(items) {
    items[0].click();
    });
    //element(by.xpath(testdata11.OfferCharge.PO_GroupUsage)).click();
    browser.sleep(3000);
    
    //Click on PI link
    element(by.xpath(testdata11.OfferCharge.PI_Selection)).click();
    browser.sleep(3000);
    
    //The user able to view a single transaction is displayed in Tabular view
    expect(element(by.xpath(testdata11.OfferCharge.Grid_Row_Values)).isDisplayed()).toBe(true);
    
    //Click on Card View icon
    element(by.xpath(testdata11.OfferCharge.TabularActiveView_Icon)).click();
    browser.sleep(4000);
    
    //Validate that a single card view is displayed
    expect(element(by.xpath(testdata11.OfferCharge.CardLayout_Icon)).isDisplayed()).toBe(true);
    element.all(by.xpath(testdata11.OfferCharge.CloseWindow)).then(function(items) {
    items[0].click();
    browser.sleep(3000);
    });
    
    //click on down arrow to close the tree view
    element(by.xpath(testdata11.OfferCharge.ArrowExpanded)).click();
    browser.sleep(3000);
    
    //Click on PI link
    element.all(by.xpath(testdata11.OfferCharge.MultiplePO)).then(function(items) {
    items[3].click();
    browser.sleep(3000);
    });
    //element(by.xpath(testdata11.OfferCharge.PO2_AudioConf)).click();
    
    //Click on PI link
    element.all(by.xpath(testdata11.OfferCharge.MultiplePO)).then(function(items) {
    items[4].click();
    browser.sleep(3000);
    });
    
    //The user able to view a single transaction is displayed in Tabular view
    expect(element(by.xpath(testdata11.OfferCharge.Grid_Row_Values)).isDisplayed()).toBe(true);
    
    //Click on Card View icon
    element(by.xpath(testdata11.OfferCharge.TabularActiveView_Icon)).click();
    browser.sleep(3000);
    
    //Validate that a single card view is displayed
    expect(element(by.xpath(testdata11.OfferCharge.CardLayout_Icon)).isDisplayed()).toBe(true);
    
    element(by.xpath(testdata11.OfferCharge.CloseWindow)).click();
    
    //click on down arrow to close the tree view
    element(by.xpath(testdata11.OfferCharge.ArrowExpanded)).click();
    browser.sleep(1000);
    
    //Click on PO link
    element.all(by.xpath(testdata11.OfferCharge.MultiplePO)).then(function(items) {
    items[6].click();
    });
    browser.sleep(3000);
    
    //Click on PI link
    element.all(by.xpath(testdata11.OfferCharge.MultiplePO)).then(function(items) {
    items[7].click();
    });
    browser.sleep(3000);
    
    //The user able to view a single transaction is displayed in Tabular view
    expect(element(by.xpath(testdata11.OfferCharge.Grid_Row_Values)).isDisplayed()).toBe(true);
    
    //Click on Card View icon
    element(by.xpath(testdata11.OfferCharge.TabularActiveView_Icon)).click();
    browser.sleep(3000);
    
    //Validate that a single card view is displayed
    expect(element(by.xpath(testdata11.OfferCharge.CardLayout_Icon)).isDisplayed()).toBe(true);
    
    element(by.xpath(testdata11.OfferCharge.CloseWindow)).click();
    
    //Goingback to Dashboard by refreshing
    browser.refresh();
    browser.sleep(5000);
    
    //Click on Transactions link
    element(by.xpath(testdata11.Quotes.Transactions_Link)).click();
    browser.sleep(5000);
    
    //Select Start Date  as today
    element(by.xpath(testdata11.ActivityLog.ViewAll_StartDate_Field)).click();
    element(by.xpath(testdata11.ActivityLog.ViewAll_Date_Today)).click();
    browser.sleep(1000);
    element(by.xpath(testdata11.Adjustment.SelectByDropdown)).click();
    browser.sleep(1000);
    element(by.xpath(testdata11.Adjustment.SelectByDropdown)).click();
    browser.sleep(1000);
    //Select End Date  as today
    element(by.xpath(testdata11.ActivityLog.ViewAll_EndDate_Field)).click();
    browser.sleep(1000);
    element(by.xpath(testdata11.ActivityLog.EndDate_New)).click();
    browser.sleep(1000);
    element(by.xpath(testdata11.ActivityLog.Search)).click();
    browser.sleep(3000);
    // element(by.xpath(testdata11.Transactions.Transactions_LinkNew)).click();
    // browser.sleep(3000);
    
    //Click on Group usage PO link
    element(by.xpath(testdata11.OfferCharge.PO_GroupUsage)).click();
    browser.sleep(3000);
    
    //Click on PI link
    element(by.xpath(testdata11.OfferCharge.PI_Selection)).click();
    browser.sleep(3000);
    
    //The user should able to view a single transactions is displayed in Tabular view
    expect(element(by.xpath(testdata11.OfferCharge.Grid_Row_Values)).isDisplayed()).toBe(true);
    
    //Click on Card view option
    element(by.xpath(testdata11.OfferCharge.TabularActiveView_Icon)).click();
    browser.sleep(3000);
    
    //Validate that a single card view is displayed
    expect(element(by.xpath(testdata11.OfferCharge.CardLayout_Icon)).isDisplayed()).toBe(true);
    browser.sleep(1000);
    }

    function localizedDate(){
    var testdata5 =protractor.loginHelpers.langCode;
    var today = new Date();
    var yyyy = today.getFullYear();
    yy = yyyy.toString().substr(-2);
    switch (testdata5) {
    case "BR":
    var d = "0"+ today.getDate();
    var dd = d.toString().substr(-2);
    var m = today.getMonth()+1;
    var m2="0"+m;
    var mm= m2.toString().substr(-2);  //January is 0!
    var endDate= new Date();
    endDate = dd+"/"+mm+"/"+yyyy;
    break;
    case "DE":
    var d = "0"+ today.getDate();
    var dd = d.toString().substr(-2);
    var m = today.getMonth()+1;
    var m2="0"+m;
    var mm= m2.toString().substr(-2);  //January is 0!
    var endDate= new Date();
    endDate = dd+"."+mm+"."+yyyy;
    break;
    case "EG":
    var d =  "0"+today.getDate();
    var dd = d.toString().substr(-2);
    var m = today.getMonth()+1;
    var m2="0"+m;
    var mm= m2.toString().substr(-2);  //January is 0!
    var endDate= new Date();
    endDate = mm+"/"+dd+"/"+yyyy;
    break;
    case "ES":
    var d = "0"+ today.getDate();
    var dd = d.toString().substr(-2);
    var m = today.getMonth()+1;
    var m2="0"+m;
    var mm= m2.toString().substr(-2);  //January is 0!
    var endDate= new Date();
    endDate = dd+"/"+mm+"/"+yyyy;
    break;
    case "FR":
    var d = "0"+ today.getDate();
    var dd = d.toString().substr(-2);
    var m = today.getMonth()+1;
    var m2="0"+m;
    var mm= m2.toString().substr(-2);  //January is 0!
    var endDate= new Date();
    endDate = dd+"/"+mm+"/"+yyyy;
    break;
    case "GB":
    var d = "0"+ today.getDate();
    var dd = d.toString().substr(-2);
    var m = today.getMonth()+1;
    var m2="0"+m;
    var mm= m2.toString().substr(-2);  //January is 0!
    var endDate= new Date();
    endDate = mm+"/"+dd+"/"+yyyy;
    break;
    case "IL":
    var d =  "0"+today.getDate();
    var dd = d.toString().substr(-2);
    var m = today.getMonth()+1;
    var m2="0"+m;
    var mm= m2.toString().substr(-2);  //January is 0!
    var endDate= new Date();
    endDate = mm+"/"+dd+"/"+yyyy;
    break;
    case "JP":
    var d = "0"+ today.getDate();
    var dd = d.toString().substr(-2);
    var m = today.getMonth()+1;
    var m2="0"+m;
    var mm= m2.toString().substr(-2); //January is 0!
    endDate = yyyy+"/"+mm+"/"+dd
    break;
    case "MX":
    var d = "0"+ today.getDate();
    var dd = d.toString().substr(-2);
    var m = today.getMonth()+1;
    var m2="0"+m;
    var mm= m2.toString().substr(-2); //January is 0!
    endDate = dd+"/"+mm+"/"+yyyy;
    break;
    case "SE":
    var d =  "0"+today.getDate();
    var dd = d.toString().substr(-2);
    var m = today.getMonth()+1;
    var m2="0"+m;
    var mm= m2.toString().substr(-2);  //January is 0!
    var endDate= new Date();
    endDate = mm+"/"+dd+"/"+yyyy;
    break;
    case "US":
    var d =  "0"+today.getDate();
    var dd = d.toString().substr(-2);
    var m = today.getMonth()+1;
    var m2="0"+m;
    var mm= m2.toString().substr(-2);  //January is 0!
    var endDate= new Date();
    endDate = mm+"/"+dd+"/"+yyyy;
    break;
    }
    var today = endDate;
    return today;
    }
    
    function totalchargesamount(){
    //Charge Details should be visible
    var testdata8=protractor.loginHelpers.langCode;
    switch (testdata8) {
    case "BR":
    var chargeValue=testdata6.totalchargesamount;
    break;
    case "DE":
    var chargeValue=testdata6.totalchargesamount;
    
    break;
    case "EG":
    var chargeValue=testdata6.totalchargesamount;
    break;
    case "ES":
    var chargeValue=testdata6.totalchargesamount;
    break;
    case "FR":
    var chargeValue=testdata6.totalchargesamount;
    break;
    case "GB":
    var chargeValue=testdata6.totalchargesamount;
    break;
    case "IL":
    var chargeValue=testdata6.totalchargesamount;
    break;
    case "JP":
    var chargeValue=testdata6.totalchargesamount;
    break;
    case "MX":
    var chargeValue=testdata6.totalchargesamount;
    break;
    case "SE":
    var chargeValue=testdata6.totalchargesamount;
    break;
    case "US":
    var chargeValue=testdata6.totalchargesamount;
    break;
    }
    return chargeValue;
    }
    //#endregion TestHelpers
    function timestamp(){
  
      var today = new Date();
      var yyyy = today.getFullYear();
      yy = yyyy.toString().substr(-2);
      var d = "0"+ today.getDate();
      var dd = d.toString().substr(-2);
      var m = today.getMonth()+1;
      var m2="0"+m;
      var mm= m2.toString().substr(-2);  //January is 0!
      var endDate= new Date();
      endDate = yyyy+"-"+mm+"-"+dd;
      
      return endDate;
      }
    });
    