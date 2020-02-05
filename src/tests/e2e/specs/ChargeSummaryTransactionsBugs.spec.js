describe('UI Baseline App', function () {

    //#region DataFiles
    
    var xpathRepo = require('../inputs/testdata/XpathRepository.json');
    var metraViewSetupData = require('../inputs/testdata/JsonFileCreation.json');
    var treeViewData = require('../inputs/testdata/TreeViewScenario1.json');
  
    //#endregion DataFiles
    
    //#region Tests
    
    
    it('MVIEW-2961: Validate Bill Details Are Displayed For Default PL', function () {
    //Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ Sanity_Bugs_TestCases/ 2961_VerifyDetailsAreDisplayedForDefaultPL
    browser.refresh();
    browser.sleep(9000);
    
    if(browser.params.value=='ViewOnlineBill'){
    
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(metraViewSetupData.userName15,metraViewSetupData.passwordField);
    
    //Validate the Offer Charge Summary Charges Whether Details Are Displayed For Default PL
    DetailsAreDisplayedForDefaultPL();
    
    //To validate whether dynamic value  is executing.
    console.log(browser.params.value);
    
    //Log IN to MetraNet Applciation and navigate to View Online Bill screen
    protractor.loginHelpers.viewOnlineBill(metraViewSetupData.userName15);
    
    //Validate the Offer Charge Summary Charges Whether Details Are Displayed For Default PL
    DetailsAreDisplayedForDefaultPL();
    
    //Logout from the MetraNet
    protractor.loginHelpers.logOutMetraNet();
    
    }
    else
    {
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(metraViewSetupData.userName15,metraViewSetupData.passwordField);
    
    //Validate the Offer Charge Summary Charges Whether Details Are Displayed For Default PL
    DetailsAreDisplayedForDefaultPL();
    }      
    });
    
    it('MVIEW-2874: Validate Date Control Changes Only The View Opened', function () {
    //Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ Sanity_Bugs_TestCases/ 2874_VerifyDateControlChangesOnlyTheViewOpened   
    browser.refresh();
    browser.sleep(9000);
    
    if(browser.params.value=='ViewOnlineBill'){
    
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(treeViewData.corporateAccountUserName,treeViewData.passwordField);
    
    //Validate that Date Control Changes Only The View Opened in Offer Charge Summary page
    DateControlChangesOnlyTheViewOpened();
    
    //To validate whether dynamic value  is executing.
    console.log(browser.params.value);
    
    //Log IN to MetraNet Applciation and navigate to View Online Bill screen
    protractor.loginHelpers.viewOnlineBill(treeViewData.corporateAccountUserName);
    
    //Validate that Date Control Changes Only The View Opened in Offer Charge Summary page
    DateControlChangesOnlyTheViewOpened();
    
    //Logout from the MetraNet
    protractor.loginHelpers.logOutMetraNet();
    
    }
    else
    {
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(treeViewData.corporateAccountUserName,treeViewData.passwordField);
    
    //Validate that Date Control Changes Only The View Opened in Offer Charge Summary page
    DateControlChangesOnlyTheViewOpened();
    }      
    });
    
    it('MONETAAS:1322: Validate Transactions appear in selected date range offerview', function () {
    //Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 1322_Transactionsappearinslcteddaterange_offerview
    browser.refresh();
    browser.sleep(9000);
    
    if(browser.params.value=='ViewOnlineBill'){
    
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(metraViewSetupData.userName13,metraViewSetupData.passwordField);
    
    //Validate Transactions appear in selected date range in offerview of Offer Charge Summary Charges 
    TransactionsappearinslcteddaterangeOfferview();
    
    //To validate whether dynamic value  is executing.
    console.log(browser.params.value);
    
    //Log IN to MetraNet Applciation and navigate to View Online Bill screen
    protractor.loginHelpers.viewOnlineBill(metraViewSetupData.userName13);
    
    //Validate Transactions appear in selected date range in offerview of Offer Charge Summary Charges
    TransactionsappearinslcteddaterangeOfferview();
    
    //Logout from the MetraNet
    protractor.loginHelpers.logOutMetraNet();
    
    }
    else
    {
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(metraViewSetupData.userName13,metraViewSetupData.passwordField);
    
    //Validate Transactions appear in selected date range in offerview of Offer Charge Summary Charges
    TransactionsappearinslcteddaterangeOfferview();
    }      
    });
    
    it('MONETAAS:1322: Validate Transactions appear in selected date range Account View', function () {
    //Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 1322_Transactionsappearinslcteddaterange_accntview
    browser.refresh();
    browser.sleep(9000);
    
    if(browser.params.value=='ViewOnlineBill'){
    
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(metraViewSetupData.userName13,metraViewSetupData.passwordField);
    
    //Validate Transactions appear in selected date range in Account View of Offer Charge Summary Charges 
    TransactionsappearinslcteddaterangeAccountView();
    
    //To validate whether dynamic value  is executing.
    console.log(browser.params.value);
    
    //Log IN to MetraNet Applciation and navigate to View Online Bill screen
    protractor.loginHelpers.viewOnlineBill(metraViewSetupData.userName13);
    
    //Validate Transactions appear in selected date range in Account View of Offer Charge Summary Charges 
    TransactionsappearinslcteddaterangeAccountView();
    
    //Logout from the MetraNet
    protractor.loginHelpers.logOutMetraNet();
    
    }
    else
    {
      browser.sleep(2000);
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(metraViewSetupData.userName13,metraViewSetupData.passwordField);
    
    //Validate Transactions appear in selected date range in Account View of Offer Charge Summary Charges 
    TransactionsappearinslcteddaterangeAccountView();
    }      
    });
    

    //#endregion Tests
    
    //#region TestHelpers
    
    function DetailsAreDisplayedForDefaultPL(){
    
    //Click on Go to Bills Link
    element(by.xpath(xpathRepo.Billing.GoToBillsButton)).click();
    browser.sleep(5000);
    
    //Select the Period/Invoice dropdown in Bills
    element(by.xpath(xpathRepo.Billing.SelectIntervalDropdown)).click();
    browser.sleep(3000);
    
    //Click on the PI link which is at the same level of the PO
    element(by.xpath(xpathRepo.OfferCharge.PI_PL_Selection)).click();
    browser.sleep(3000);
    //Validates Bill details are displayed when clicked on the default PL assigned to an Account under "Charges Summary" widget
    expect(element(by.xpath(xpathRepo.Adjustment.Charges_Transactions)).isDisplayed()).toBe(true);
    browser.sleep(1000);
    expect(element(by.xpath((xpathRepo.Billing.TimeStamp_ColumnList))).isDisplayed()).toBe(true);
    
    }
    
    function DateControlChangesOnlyTheViewOpened(){
    
    //Click on Go to Bills Link
    element(by.xpath(xpathRepo.Billing.GoToBillsButton)).click();
    browser.sleep(5000);
    
    //Select the Period/Invoice dropdown in Bills
    element(by.xpath(xpathRepo.Billing.SelectIntervalDropdown)).click();
    browser.sleep(8000);

    //Select yesterday date from the interval dropdown
    element(by.xpath(xpathRepo.Billing.SelectSecondInterval)).click();
    browser.sleep(3000);
    
    element(by.xpath(xpathRepo.OfferCharge.AccountView_Pane)).click();
    browser.sleep(5000);
    
    //Click on Account Name 
    element(by.xpath(xpathRepo.OfferCharge.AccountView_AccountName_Link)).click();
    browser.sleep(3000);    
    
    element.all(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).then(function(items){
      items[1].click();
      browser.sleep(3000);
    });
    
    
    //Validates that PO is avilable in Charge Summary page after clicking 'ViewAll' 
    expect(element(by.xpath(xpathRepo.OfferCharge.Group_Usage_PO)).isPresent()).toBe(true);
    browser.sleep(1000);
    
    //Select the Period/Invoice dropdown in Bills
    element(by.xpath(xpathRepo.Billing.SelectIntervalDropdown)).click();
    browser.sleep(1000);
    element(by.xpath(xpathRepo.Billing.SelectFirstInterval)).click();
    browser.sleep(3000);

    //Validate that The initial date is displayed in 'Select Period Invoice'
    element(by.xpath(xpathRepo.Billing.SelectIntervalDropdown)).click();
    browser.sleep(1000); 
    expect(element(by.xpath(xpathRepo.Billing.IntervalList)).getText()).toContain(localizedDate()+" - "+localizedDate());
    
    }
    
    function TransactionsappearinslcteddaterangeOfferview(){
    
    //Click on Transactions link
    element(by.xpath(xpathRepo.Transactions.Transactions_LinkNew)).click();
    browser.sleep(3000);
    
    //Select Start Date  as today
    element(by.xpath(xpathRepo.ActivityLog.ViewAll_StartDate_Field)).click();
    element(by.xpath(xpathRepo.ActivityLog.ViewAll_Date_Today)).click();
    browser.sleep(3000);
    
    //Click on select by daterange
    element(by.xpath(xpathRepo.Adjustment.SelectByDropdown)).click();
    browser.sleep(1000);
    element(by.xpath(xpathRepo.OfferCharge.BIlls_DateRange)).click();
    browser.sleep(3000);
    
    //Select End Date as today
    element(by.xpath(xpathRepo.ActivityLog.ViewAll_EndDate_Field)).click();
    browser.sleep(3000);
    element(by.xpath(xpathRepo.ActivityLog.EndDate_New)).click();
    browser.sleep(1000);
    element(by.xpath(xpathRepo.ActivityLog.Search)).click();
    browser.sleep(3000);
    
   browser.refresh();
   browser.sleep(3000);

   element(by.xpath(xpathRepo.Transactions.Transactions_LinkNew)).click();
   browser.sleep(3000);
    
    //Validates that Transactions should appear if data exists in selected Date range in Offer View Structure. 
    expect(element(by.xpath(xpathRepo.OfferCharge.Group_Usage_PO)).isPresent()).toBe(true);
    browser.sleep(1000);
    
    }
    
    function TransactionsappearinslcteddaterangeAccountView(){
    
    //Click on Transactions link
    element(by.xpath(xpathRepo.Transactions.Transactions_LinkNew)).click();
    browser.sleep(3000);
    
    element(by.xpath(xpathRepo.OfferCharge.AccountView_Pane)).click();
    browser.sleep(5000);
    
    //Select Start Date  as today
    element(by.xpath(xpathRepo.ActivityLog.ViewAll_StartDate_Field)).click();
    element(by.xpath(xpathRepo.ActivityLog.ViewAll_Date_Today)).click();
    browser.sleep(3000);
    
    //Click on select by daterange
    element(by.xpath(xpathRepo.Adjustment.SelectByDropdown)).click();
    browser.sleep(1000);
    element(by.xpath(xpathRepo.OfferCharge.BIlls_DateRange)).click();
    browser.sleep(3000);
    
    //Select End Date  as today
    element(by.xpath(xpathRepo.ActivityLog.ViewAll_EndDate_Field)).click();
    browser.sleep(3000);
    element(by.xpath(xpathRepo.ActivityLog.EndDate_New)).click();
    browser.sleep(1000);
    element(by.xpath(xpathRepo.ActivityLog.Search)).click();
    browser.sleep(3000);
    
    //Validates that Transactions appearing in selected Date range in Account View Structure. 
    expect(element(by.xpath(xpathRepo.OfferCharge.AccountView_AccountName_Link)).isPresent()).toBe(true);
    browser.sleep(1000);
    
    
    //Click on the Account Name (the parent node)
    element.all(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).then(function(accName){
    accName[0].click();
    browser.sleep(2000);
    });

    //Validates that Transactions should appear if data exists in selected Date range in Offer View Structure. 
    expect(element(by.xpath(xpathRepo.OfferCharge.Group_Usage_PO)).isPresent()).toBe(true);
    browser.sleep(1000);

    protractor.loginHelpers.logOutMV();
}
    
    function localizedDate(){
    //The data loaded should be as per the selected interval
    var today = new Date();
    var yyyy = today.getFullYear();
    yy = yyyy.toString().substr(-2);
    var dd = today.getDate();
    var m = today.getMonth()+1; //January is 0!
    var m2="0"+m;
    var mm= m2.toString().substr(-2); 
    var endDate = mm+"/"+dd+"/"+yyyy;
    
    return endDate;
    }
    
    //#endregion TestHelpers
    
    });
    