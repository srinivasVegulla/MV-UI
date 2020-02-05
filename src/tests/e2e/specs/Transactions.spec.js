describe('UI Baseline App', function () {

    //#region DataFiles
    
    var testdata2 = require('../inputs/testdata/XpathRepository.json');
    var testdata11 = require('../inputs/testdata/JsonFileCreation.json');
    var downloadpath='C:/Users/Administrator/Downloads/';
    var fs = require('fs');
    
    //#endregion DataFiles
    
    //#region Tests
    
    it('Validate transactions widget', function () {
    
    browser.refresh();
    browser.sleep(9000);
    
    if(browser.params.value=='ViewOnlineBill'){
    
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata11.userName,testdata11.passwordField);
    
    //Validate the Offer Charge Summary Widget Fields
    transactionWidgetValidation();
    
    //To validate whether dynamic value  is executing.
    console.log(browser.params.value);
    
    //Log IN to MetraNet Applciation and navigate to View Online Bill screen
    protractor.loginHelpers.viewOnlineBill(testdata11.userName);
    
    //Validate the Offer Charge Summary Widget Fields
    transactionWidgetValidation();
    
    //Logout from the MetraNet
    protractor.loginHelpers.logOutMetraNet();
    
    }
    else
    {
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata11.userName,testdata11.passwordField);
    
    //Validate the Offer Charge Summary Widget Fields
    transactionWidgetValidation();
    }
    });
    
    it('Validate transactions widget offer view', function () {
    browser.refresh();
    browser.sleep(9000);
    
    if(browser.params.value=='ViewOnlineBill'){
    
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    browser.ignoreSynchronization=true;
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata11.userName,testdata11.passwordField);
    
    //Validate the Offer Charge Summary Widget Fields
    offerView();
    
    //To validate whether dynamic value  is executing.
    console.log(browser.params.value);
    
    //Log IN to MetraNet Applciation and navigate to View Online Bill screen
    protractor.loginHelpers.viewOnlineBill(testdata11.userName);
    
    //Validate the Offer Charge Summary Widget Fields
    offerView();
    
    //Logout from the MetraNet
    protractor.loginHelpers.logOutMetraNet();
    
    }
    else
    {
      
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    browser.ignoreSynchronization=true;
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata11.userName,testdata11.passwordField);
    
    //Validate the Offer Charge Summary Widget Fields
    offerView();
    }
    
    });
    
    it('Validate transactions widget account view', function () {
    
    browser.refresh();
    browser.sleep(9000);
    
    if(browser.params.value=='ViewOnlineBill'){
    
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata11.userName,testdata11.passwordField);
    
    //Validate the Offer Charge Summary Widget Fields
    accountView();
    
    //To validate whether dynamic value  is executing.
    console.log(browser.params.value);
    
    //Log IN to MetraNet Applciation and navigate to View Online Bill screen
    protractor.loginHelpers.viewOnlineBill(testdata11.userName);
    
    //Validate the Offer Charge Summary Widget Fields
    accountView();
    
    //Logout from the MetraNet
    protractor.loginHelpers.logOutMetraNet();
    
    }
    else
    {
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    browser.ignoreSynchronization=true;
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata11.userName,testdata11.passwordField);
    
    //Validate the Offer Charge Summary Widget Fields
    accountView();
    }
    });
    
    //Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ Sanity_Bugs_TestCases/ 2703_Reg_002_NonStdCharges_under_TransactionWidget
    it('Validate Nonstandard charges in  transactions widget account view(Child account)', function () {
    
        browser.refresh();
        browser.sleep(9000);
        
        if(browser.params.value=='ViewOnlineBill'){
        
        //Launch to the MV2.0 application
        protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
        
        //Login to the MV2.0 application
        protractor.loginHelpers.logInMV(testdata11.userName13,testdata11.passwordField);
        
        //Validate the Offer Charge Summary Widget Fields
        NonstandardInTransationWidget();
        
        //To validate whether dynamic value  is executing.
        console.log(browser.params.value);
        
        //Log IN to MetraNet Applciation and navigate to View Online Bill screen
        protractor.loginHelpers.viewOnlineBill(testdata11.userName13);
        
        //Validate the Offer Charge Summary Widget Fields
        NonstandardInTransationWidget();
        
        //Logout from the MetraNet
        protractor.loginHelpers.logOutMetraNet();
        
        }
        else
        {
        //Launch to the MV2.0 application
        protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
        browser.ignoreSynchronization=true;
        
        //Login to the MV2.0 application
        protractor.loginHelpers.logInMV(testdata11.userName13,testdata11.passwordField);
        
        //Validate the Offer Charge Summary Widget Fields
        NonstandardInTransationWidget();
        }
        
    });
    
    //Tetscase:0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10601/ 001_Miscellaneous_adjustments_link_should_work
    //Tetscase:0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10601/ Reg_003_MISC_Adjustments_displayed_in_cardview
    it('The Miscellaneous adjustments  link should work in both Under "Charges Summary", and Transaction page', function () {
    
    browser.refresh();
    browser.sleep(9000);
    
    if(browser.params.value=='ViewOnlineBill'){
    
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata11.userName,testdata11.passwordField);
    
    //Validate the Offer Charge Summary Widget Fields
    miscAdjustments();
    
    //To validate whether dynamic value  is executing.
    console.log(browser.params.value);
    
    //Log IN to MetraNet Applciation and navigate to View Online Bill screen
    protractor.loginHelpers.viewOnlineBill(testdata11.userName);
    
    //Validate the Offer Charge Summary Widget Fields
    miscAdjustments();
    
    //Logout from the MetraNet
    protractor.loginHelpers.logOutMetraNet();
    
    }
    else
    {
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    browser.ignoreSynchronization=true;
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata11.userName,testdata11.passwordField);
    
    //Validate the Offer Charge Summary Widget Fields
    miscAdjustments();
    }
    
    });
    
    it('Validate the "Non-standard charges" and  "Miscellaneous pertaining to the Payer should be displayed in Transactions Widget', function () {
    
    browser.refresh();
    browser.sleep(9000);
    
    if(browser.params.value=='ViewOnlineBill'){
    
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata11.userName,testdata11.passwordField);
    
    //Validate the Offer Charge Summary Widget Fields
    adjustments();
    
    //To validate whether dynamic value  is executing.
    console.log(browser.params.value);
    
    //Log IN to MetraNet Applciation and navigate to View Online Bill screen
    protractor.loginHelpers.viewOnlineBill(testdata11.userName);
    
    //Validate the Offer Charge Summary Widget Fields
    adjustments();
    
    //Logout from the MetraNet
    protractor.loginHelpers.logOutMetraNet();
    
    }
    else
    {
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata11.userName,testdata11.passwordField);
    
    //Validate the Offer Charge Summary Widget Fields
    adjustments();
    }
    });
    
    it('Validate the "Non-standard charges" and  "Miscellaneous pertaining to the Payer should be displayed and PI info Is downloaded From Transactions Widget', function () {
    
    browser.refresh();
    browser.sleep(9000);
    
    if(browser.params.value=='ViewOnlineBill'){
    
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata11.userName13,testdata11.passwordField);
    
    //Validate the Offer Charge Summary Widget Fields
    pIDownlaod();
    
    //To validate whether dynamic value  is executing.
    console.log(browser.params.value);
    
    //Log IN to MetraNet Applciation and navigate to View Online Bill screen
    protractor.loginHelpers.viewOnlineBill(testdata11.userName13);
    
    //Validate the Offer Charge Summary Widget Fields
    pIDownlaod();
    
    //Logout from the MetraNet
    protractor.loginHelpers.logOutMetraNet();
    
    }
    else
    {
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata11.userName13,testdata11.passwordField);
    
    //Validate the Offer Charge Summary Widget Fields
    pIDownlaod();
    }
    });
    
    //#endregion Tests
    
    //#region TestHelpers
    
    function transactionWidgetValidation(){
    
    var testdata3 = protractor.loginHelpers.dashboard();
    
    var el = element(by.xpath(testdata2.Quotes.Title));
    browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
    expect(element(by.xpath(testdata2.Quotes.Title)).isPresent()).toBe(true);
    console.log('quotes and transactions widget is present');
    
    expect(element(by.xpath(testdata2.Quotes.BillDate)).getText()).toEqual(testdata3.TEXT_SINCE_LAST_BILL+" ( "+localizedDate()+" - "+localizedDate()+" )");
    
    }
    
    function offerView(){
    var testdata3 = protractor.loginHelpers.dashboard();
    
    // Transactions - offerview  
    element(by.xpath(testdata2.Quotes.Transactions_Link)).click();
    browser.sleep(5000);
    browser.actions().mouseMove(element(by.xpath(testdata2.Transactions.Title))).perform();
    browser.sleep(2000);
    
    expect(element(by.xpath(testdata2.OfferCharge.ChargesSubtotal_Label)).getText()).toEqual(testdata3.TEXT_CHARGES_SUB_TOTAL);
    browser.sleep(1000);
    
    expect(element(by.xpath(testdata2.OfferCharge.ChargesSubtotal_Value)).getText()).toEqual(totalchargesamount());
    browser.sleep(1000);
    
    //Charge Details should be shown with the offers subscribed
    expect(element(by.xpath(testdata2.OfferCharge.ProductOfferingLabel)).isDisplayed()).toBe(true);
    
    // Click the link of the product offer name and Each [Offer Name] should able to drilled-down by click/touch
    //click on group usage po
    element(by.xpath(testdata2.OfferCharge.PO_GroupUsage)).click();
    
    browser.sleep(1000);
    
    //Select PI link
    element(by.xpath(testdata2.OfferCharge.PI_Selection)).click();
    browser.sleep(1000);
    
    expect(element(by.xpath(testdata2.Adjustment.SelectTabularView)).getAttribute('class')).toContain('Fade');
    browser.sleep(2000);
    
    // sort by 
    element(by.xpath(testdata2.ActivityLog.SortBy)).click();
    element.all(by.xpath(testdata2.ActivityLog.SortBy_Values)).then(function(items) {
    items[1].click();
    browser.sleep(2000);
    expect(items[1].getAttribute('class')).toContain('item_selected');
    });
    browser.sleep(2000);
    
    // global filter 
    element(by.xpath(testdata2.Adjustment.FilterIcon)).click();
    browser.sleep(2000);
    browser.actions().mouseMove(element(by.xpath(testdata2.Adjustment.Filter_SortBy))).perform();
    element(by.xpath(testdata2.Adjustment.Filter_SortByButton)).click();
    element.all(by.xpath(testdata2.Transactions.Filter_SortBy_Values)).then(function(values) {
    expect(values.length).toBe(3);
    values[2].click();
    //browser.sleep(5000);
    });
    
    element.all(by.xpath(testdata2.Transactions.FilterApply)).then(function(val1) {
    val1[0].click();
    browser.sleep(5000);
    });
    
    //clicking on settings icon
    element(by.xpath(testdata2.Adjustment.Settings)).click();
    browser.sleep(2000);
    
    browser.actions().mouseMove(element(by.xpath(testdata2.Adjustment.Settings_Label))).perform();
    element.all(by.xpath(testdata2.Transactions.Settings_Select)).then(function(select) {
    expect(select.length).toBe(2);
    select[1].click();
    select[0].click();
    });
    
    element.all(by.xpath(testdata2.Transactions.Settings_Checkbox)).then(function(checkbox) {
    expect(checkbox.length).toBe(2);
    checkbox[0].click();
    checkbox[1].click();
    });
    
    element.all(by.xpath(testdata2.Transactions.Settings_Pin)).then(function(pin) {
    expect(pin.length).toBe(2);
    pin[1].click();
    });
    var testdata13= protractor.loginHelpers.productViewsValues();
    console.log(testdata13);
    element.all(by.xpath(testdata2.Transactions.Settings_Values)).then(function(items) {
    expect(items.length).toBe(2);
    expect(testdata13).toContain(items[0].getText());
    expect(testdata13).toContain(items[1].getText());
    //expect(items[0].getText()).toBe(testdata4.TEXT_TIMESTAMP);
    //expect(items[1].getText()).toBe('Display Amount');
    });
    
    element(by.xpath(testdata2.MySubscriptions.Settings_Cancel)).click();
    browser.sleep(2000);
    
    // clicking on card view
    element(by.xpath(testdata2.MySubscriptions.Style_Card)).click();
    browser.sleep(2000);
    expect(element(by.xpath(testdata2.OfferCharge.CardLayout_Icon)).isPresent()).toBe(true);
    
    // download 
    element(by.xpath(testdata2.OfferCharge.DownloadLink)).click();
    browser.sleep(3000);
    
    // clicking on cross button and back to dashboard
    element(by.xpath(testdata2.Transactions.Close)).click();
    browser.sleep(2000);  
    
    }
    
    function accountView(){
    
    // Transactions - accountview
    //ESR-10617/ Reg_002_Back_link_in_Transaction_Widget_displayed  
    element(by.xpath(testdata2.Quotes.Transactions_Link)).click();
    browser.sleep(5000);
    browser.actions().mouseMove(element(by.xpath(testdata2.Transactions.Title))).perform();
    browser.sleep(2000);
    expect(element(by.xpath(testdata2.Transactions.AccountView)).isPresent()).toBe(true);
    console.log('account view and offer view are present');
    
    element(by.xpath(testdata2.Transactions.AccountView)).click();
    browser.sleep(5000);
    //click on group usage po
    element(by.xpath(testdata2.OfferCharge.PayerPOSelection)).click();
    browser.sleep(2000);
    element(by.xpath(testdata2.OfferCharge.PO_GroupUsage)).click();
    browser.sleep(2000);
    element(by.xpath(testdata2.OfferCharge.PI_Selection)).click();
    browser.sleep(4000);
    
    // sort by 
    element(by.xpath(testdata2.ActivityLog.SortBy)).click();
    browser.sleep(1000);
    element.all(by.xpath(testdata2.ActivityLog.SortBy_Values)).then(function(items) {
    items[1].click();
    });
    browser.sleep(2000);
    
    // global filter 
    element(by.xpath(testdata2.Adjustment.FilterIcon)).click();
    browser.actions().mouseMove(element(by.xpath(testdata2.Adjustment.Filter_SortBy))).perform();
    browser.sleep(2000);
    element(by.xpath(testdata2.Adjustment.Filter_SortByButton)).click();
    element.all(by.xpath(testdata2.Transactions.Filter_SortBy_Values)).then(function(values) {
    expect(values.length).toBe(3);
    values[2].click();
    });
    
    element.all(by.xpath(testdata2.Transactions.FilterApply)).then(function(val1) {
    val1[0].click();
    browser.sleep(5000);
    });
    
    //clicking on settings icon
    element(by.xpath(testdata2.Adjustment.Settings)).click();
    browser.actions().mouseMove(element(by.xpath(testdata2.Adjustment.Settings_Label))).perform();
    element.all(by.xpath(testdata2.Transactions.Settings_Select)).then(function(select) {
    expect(select.length).toBe(2);
    select[1].click();
    select[0].click();
    });
    
    element.all(by.xpath(testdata2.Transactions.Settings_Checkbox)).then(function(checkbox) {
    expect(checkbox.length).toBe(2);
    checkbox[0].click();
    checkbox[1].click();
    });
    
    element.all(by.xpath(testdata2.Transactions.Settings_Pin)).then(function(pin) {
    expect(pin.length).toBe(2);
    pin[1].click();
    });
    
    element(by.xpath(testdata2.MySubscriptions.Settings_Cancel)).click();
    browser.sleep(2000);
    
    // clicking on card view
    element(by.xpath(testdata2.MySubscriptions.Style_Card)).click();
    browser.sleep(2000);
    
    expect(element(by.xpath(testdata2.OfferCharge.CardLayout_Icon)).isPresent()).toBe(true);
    
    // download 
    element(by.xpath(testdata2.OfferCharge.DownloadLink)).click();
    browser.sleep(3000);
    
    // clicking on cross button and back to dashboard
    element(by.xpath(testdata2.Transactions.Close)).click();
    browser.sleep(2000);
    
    }
    
    function localizedDate(){
        //The data loaded should be as per the selected interval
    var testdata7=protractor.loginHelpers.langCode;
    var today = new Date();
    var yyyy = today.getFullYear();
    yy = yyyy.toString().substr(-2);
    switch (testdata7) {
    case "BR":
    var d = "0"+ today.getDate();
    var dd = d.toString().substr(-2);
    var m = today.getMonth()+1;
    var m2="0"+m;
    var mm= m2.toString().substr(-2);  //January is 0!
    var endDate= new Date();
    endDate = m+"/"+dd+"/"+yy;
    break;
    case "DE":
    var d = "0"+ today.getDate();
    var dd = d.toString().substr(-2);
    var m = today.getMonth()+1;
    var m2="0"+m;
    var mm= m2.toString().substr(-2);  //January is 0!
    var endDate= new Date();
    endDate = m+"/"+dd+"/"+yy;
    
    break;
    case "EG":
    var d = "0"+ today.getDate();
    var dd = d.toString().substr(-2);
    var m = today.getMonth()+1;
    var m2="0"+m;
    var mm= m2.toString().substr(-2);  //January is 0!
    var endDate= new Date();
    endDate = m+"/"+dd+"/"+yy;
    break;
    case "ES":
    var d = "0"+ today.getDate();
    var dd = d.toString().substr(-2);
    var m = today.getMonth()+1;
    var m2="0"+m;
    var mm= m2.toString().substr(-2);  //January is 0!
    var endDate= new Date();
    endDate = m+"/"+dd+"/"+yy;
    break;
    case "FR":
    var d = "0"+ today.getDate();
    var dd = d.toString().substr(-2);
    var m = today.getMonth()+1;
    var m2="0"+m;
    var mm= m2.toString().substr(-2);  //January is 0!
    var endDate= new Date();
    endDate = m+"/"+dd+"/"+yy;
    break;
    case "GB":
    var d = "0"+ today.getDate();
    var dd = d.toString().substr(-2);
    var m = today.getMonth()+1;
    var m2="0"+m;
    var mm= m2.toString().substr(-2);  //January is 0!
    var endDate= new Date();
    endDate = m+"/"+dd+"/"+yy;
    break;
    case "IL":
    var d = "0"+ today.getDate();
    var dd = d.toString().substr(-2);
    var m = today.getMonth()+1;
    var m2="0"+m;
    var mm= m2.toString().substr(-2);  //January is 0!
    var endDate= new Date();
    endDate = m+"/"+dd+"/"+yy;
    break;
    case "JP":
    var d = "0"+ today.getDate();
    var dd = d.toString().substr(-2);
    var m = today.getMonth()+1;
    var m2="0"+m;
    var mm= m2.toString().substr(-2);  //January is 0!
    var endDate= new Date();
    endDate = m+"/"+dd+"/"+yy;
    break; 
    case "MX":
    var d = "0"+ today.getDate();
    var dd = d.toString().substr(-2);
    var m = today.getMonth()+1;
    var m2="0"+m;
    var mm= m2.toString().substr(-2);  //January is 0!
    var endDate= new Date();
    endDate = m+"/"+dd+"/"+yy;
    break;    
    case "SE":
    var d = "0"+ today.getDate();
    var dd = d.toString().substr(-2);
    var m = today.getMonth()+1;
    var m2="0"+m;
    var mm= m2.toString().substr(-2);  //January is 0!
    var endDate= new Date();
    endDate = m+"/"+dd+"/"+yy;
    break;
    case "US":
    var d = "0"+today.getDate();
    var dd = d.toString().substr(-2);
    var m = today.getMonth()+1; //January is 0!
    var m2="0"+m;
    var mm= m2.toString().substr(-2); 
    var endDate = mm+"/"+dd+"/"+yyyy;
    break;
    }
    var today = endDate;
    return today;
    }
    
    function miscAdjustments(){
    
    //Input file to refer
    var testdata12 = protractor.loginHelpers.dashboard();
    
    //Navigate to "Bills"
    element(by.xpath(testdata2.LayerSelector.Dropdown)).click();
    element(by.xpath(testdata2.LayerSelector.Bills)).click();
    browser.sleep(5000);
    
    //click on Misc adjustments Link
    element(by.xpath(testdata2.OfferCharge.Misc_Adjustments_Label+testdata12.TEXT_MISC_ADJUSTMENTS+testdata2.ChildAccounts.CloseXpath)).click();
    browser.sleep(5000);
    
    //Validate Miscellaneous Adjsutmetns Details are opened
    //MVIEW-2902
    expect(element(by.xpath(testdata2.OfferCharge.Header+testdata12.TEXT_MISC_ADJUSTMENTS+testdata2.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
    
    //Click on setting icon
    element(by.xpath(testdata2.Adjustment.Settings)).click();
    browser.sleep(3000);
    browser.actions().mouseMove(element(by.xpath(testdata2.Adjustment.Settings_Label))).perform();
    
    //Uncheck the 'Description' item from the list
    element(by.xpath(testdata2.Transactions.Uncheck_Description)).click();
    browser.sleep(3000);
    
    //Click on 'Apply changes'
    element(by.xpath(testdata2.Adjustment.Settings_ApplyChanges)).click();
    browser.sleep(5000);
    
    //verify the setting functionality is working properly as 'Description' is not getting displayed in the tabular view
    element.all(by.xpath(testdata2.Adjustment.MiscAdjustment_Attributes)).then(function(items) {
    expect(items[0].getText()).not.toContain(testdata12.TEXT_DESCRIPTION);
    expect(items[1].getText()).not.toContain(testdata12.TEXT_DESCRIPTION);
    expect(items[2].getText()).not.toContain(testdata12.TEXT_DESCRIPTION);
    expect(items[3].getText()).not.toContain(testdata12.TEXT_DESCRIPTION);
    expect(items[4].getText()).not.toContain(testdata12.TEXT_DESCRIPTION);
    });
    
    browser.sleep(3000);
    
    //Click again on setting icon and check 'Description' item
    element(by.xpath(testdata2.Adjustment.Settings)).click();
    browser.sleep(3000);
    element(by.xpath(testdata2.Transactions.Uncheck_Description)).click();
    browser.sleep(3000);
    //Click on 'Apply changes'
    element(by.xpath(testdata2.Adjustment.Settings_ApplyChanges)).click();
    browser.sleep(5000);
    
    //Click on 'Filter' option
    element(by.xpath(testdata2.ActivityLog.Filter_Icon)).click();
    browser.sleep(2000);
    
    //Click on Sort by filter
    element(by.xpath(testdata2.Transactions.MiscAdjustment_SortByFilter)).click();
    browser.sleep(1000);
    
    //Select the 'Document Id' from the filter drop down
    element(by.xpath(testdata2.Adjustment.SortByDropdownFourthValue)).click();
    browser.sleep(10000);
    
    //Click on 'Apply'
    element(by.xpath(testdata2.OfferCharge.MiscAdjusment_FilterApply)).click();
    browser.sleep(5000);
    
    //Verify filter functionality is working properly as the 'Description' is selcted in the 'sort By'
    expect(element(by.xpath(testdata2.Adjustment.SortByDropdown_Value)).getText()).toContain(testdata12.TEXT_DESCRIPTION);
    browser.sleep(2000);
    
    //Click on Card view option
    element(by.xpath(testdata2.OfferCharge.TabularActiveView_Icon)).click();
    browser.sleep(3000);
    
    //Verify the Card view of Miscellaneous adjustments is proper
    expect(element(by.xpath(testdata2.TreeView.MiscAjustment)).isDisplayed()).toBe(true);
    browser.sleep(2000);
    
    //Refresh the page
    browser.refresh();
    browser.sleep(8000);
    
    //Navigate to "Bills"
    element(by.xpath(testdata2.LayerSelector.Dropdown)).click();
    element(by.xpath(testdata2.LayerSelector.Bills)).click();
    browser.sleep(5000);
    
    
    // account view
    expect(element(by.xpath(testdata2.OfferCharge.AccountView_Pane)).isDisplayed()).toBe(true);
    element(by.xpath(testdata2.OfferCharge.AccountView_Pane)).click();
    browser.sleep(2000);
    
    //Test Case: MVIEW_S00NEXT_TestCases/ MVIEW-2612_001_MainCase
    expect(element(by.xpath(testdata2.OfferCharge.PI_Selection)).isPresent()).toBe(false);
    
    //click on group usage po
    element(by.xpath(testdata2.OfferCharge.PayerPOSelection)).click();
    browser.sleep(2000);
    
    //click on Misc adjustments Link
    element(by.xpath(testdata2.OfferCharge.Misc_Adjustments_Label+testdata12.TEXT_MISC_ADJUSTMENTS+testdata2.ChildAccounts.CloseXpath)).click();
    browser.sleep(5000);
    
    //Verify after clicking on 'Misc adjustment' link, it is navigating to Miscellaneous Adjustments page
    //MVIEW-2902
    expect(element(by.xpath(testdata2.OfferCharge.Header+testdata12.TEXT_MISC_ADJUSTMENTS+testdata2.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
    //Verify the tabular view of Miscellaneous adjustments is proper 
    //Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ Sanity_Bugs_TestCases/ 2893_PILinkshouldworkinthechargesWidgetDashboardpg
    expect(element(by.xpath(testdata2.OfferCharge.Grid_Row_Values)).isDisplayed()).toBe(true);
    
    //Verify the misc Adjustment amount
    //expect(element(by.xpath(testdata2.Transactions.MiscAmount)).getText()).toContain((testdata11.miscAmt));
    
    //Click on setting icon
    element(by.xpath(testdata2.Adjustment.Settings)).click();
    browser.sleep(3000);
    browser.actions().mouseMove(element(by.xpath(testdata2.Adjustment.Settings_Label))).perform();
    
    //Uncheck the 'Description' item from the list
    element(by.xpath(testdata2.Transactions.Uncheck_Description)).click();
    browser.sleep(3000);
    
    //Click on 'Apply changes'
    element(by.xpath(testdata2.Adjustment.Settings_ApplyChanges)).click();
    browser.sleep(5000);
    
    //verify the setting functionality is working properly as 'Description' is not getting displayed in the tabular view
    element.all(by.xpath(testdata2.Adjustment.MiscAdjustment_Attributes)).then(function(items) {
    expect(items[0].getText()).not.toContain(testdata12.TEXT_DESCRIPTION);
    expect(items[1].getText()).not.toContain(testdata12.TEXT_DESCRIPTION);
    expect(items[2].getText()).not.toContain(testdata12.TEXT_DESCRIPTION);
    expect(items[3].getText()).not.toContain(testdata12.TEXT_DESCRIPTION);
    expect(items[4].getText()).not.toContain(testdata12.TEXT_DESCRIPTION);
    
    });
    browser.sleep(3000);
    
    //Click again on setting icon and check 'Description' item
    element(by.xpath(testdata2.Adjustment.Settings)).click();
    browser.sleep(3000);
    element(by.xpath(testdata2.Transactions.Uncheck_Description)).click();
    browser.sleep(3000);
    //Click on 'Apply changes'
    element(by.xpath(testdata2.Adjustment.Settings_ApplyChanges)).click();
    browser.sleep(5000);
    
    //Click on 'Filter' option
    element(by.xpath(testdata2.ActivityLog.Filter_Icon)).click();
    browser.sleep(2000);
    
    //Click on Sort by filter
    element(by.xpath(testdata2.Transactions.MiscAdjustment_SortByFilter)).click();
    browser.sleep(2000);
    
    //Select the 'Document Id' from the filter drop down
    element(by.xpath(testdata2.Adjustment.SortByDropdownFourthValue)).click();
    browser.sleep(2000);
    
    //Click on 'Apply'
    element(by.xpath(testdata2.OfferCharge.MiscAdjusment_FilterApply)).click();
    browser.sleep(5000);
    
    //Verify filter functionality is working properly as the 'Description' is selcted in the 'sort By'
    expect(element(by.xpath(testdata2.Adjustment.SortByDropdown_Value)).getText()).toContain(testdata12.TEXT_DESCRIPTION);
    
    //Refresh the page
    browser.refresh();
    browser.sleep(8000);
    
    //Click on the 'Transaction' link and navigate to 'Transaction' page
    element(by.xpath(testdata2.Quotes.Transactions_Link)).click();
    browser.sleep(5000);
    browser.actions().mouseMove(element(by.xpath(testdata2.Transactions.Title))).perform();
    browser.sleep(2000);
    
    element(by.xpath(testdata2.OfferCharge.AccountView_Pane)).click();
    browser.sleep(4000);
    
    //Test Case: MVIEW_S00NEXT_TestCases/ MVIEW-2612_001_MainCase
    //MetraView_Folder/ MV2.0_AAS_Q1_Release/ Sanity_Bugs_TestCases/ 2893_PILink_should_work_in_the_charges_Widget.
    expect(element(by.xpath(testdata2.OfferCharge.PI_Selection)).isPresent()).toBe(false);
    
    //click on group usage po
    element(by.xpath(testdata2.OfferCharge.PayerPOSelection)).click();
    browser.sleep(2000);
    
    //Verify after clicking on 'Misc adjustment' link, it is navigating to Miscellaneous Adjustments page
    //MVIEW-2902
    expect(element(by.xpath(testdata2.OfferCharge.Misc_Adjustments_Label+testdata12.TEXT_MISC_ADJUSTMENTS+testdata2.ChildAccounts.CloseXpath)).isDisplayed()).toBe(true);
    
    //Verify the misc Adjustment amount
    //expect(element(by.xpath(testdata2.Transactions.MiscAmount)).getText()).toEqual(amount);
    //expect(element(by.xpath(testdata2.Transactions.MiscAmount)).getText()).toContain((testdata11.miscAmt));
    
    }
    
    function adjustments(){
    
    //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10625/ Reg_002_NonStandardCharges_in_Transaction_Widget
    var testdata3 = protractor.loginHelpers.dashboard();
    
    // Transactions - offerview  
    element(by.xpath(testdata2.Quotes.Transactions_Link)).click();
    browser.sleep(5000);
    browser.actions().mouseMove(element(by.xpath(testdata2.Transactions.Title))).perform();
    browser.sleep(2000);
    
    //Validate that "Non-standard charges" and "Miscellaneous Adjustments" should be displayed under Transactions widget (Offer view)
    //Validate that Localization should work for "Non-standard charges" and "Miscellaneous Adjustments" labels (Offer view)
    
    //  expect(element.all(by.xpath(testdata2.Transactions.OfferDetails)).getText()).toContain("GROUP_USAGE_Simple_PO");
    expect(element.all(by.xpath(testdata2.Transactions.OfferDetails)).getText()).toContain(testdata3.TEXT_MISC_ADJUSTMENTS);
    //expect(element.all(by.xpath(testdata2.Transactions.OfferDetails)).getText()).toContain(testdata3.TEXT_NON_STANDARD_CHARGES);
    
    browser.refresh();
    browser.sleep(9000);
    
    // Transactions - accountview  
    element(by.xpath(testdata2.Quotes.Transactions_Link)).click();
    browser.sleep(5000);
    browser.actions().mouseMove(element(by.xpath(testdata2.Transactions.Title))).perform();
    browser.sleep(2000);
    
    expect(element(by.xpath(testdata2.Transactions.AccountView)).isPresent()).toBe(true);
    console.log('account view and offer view are present');
    element(by.xpath(testdata2.OfferCharge.AccountView_Pane)).click();
    browser.sleep(2000);
    
    //Test Case: MVIEW_S00NEXT_TestCases/ MVIEW-2612_001_MainCase
    expect(element(by.xpath(testdata2.OfferCharge.PI_Selection)).isPresent()).toBe(false);
    
    //Click on the Account name present in the page under 'Account View'
    element(by.xpath(testdata2.OfferCharge.PayerPOSelection)).click();
    browser.sleep(2000);
    
    //Validate that "Non-standard charges" and "Miscellaneous Adjustments" should be displayed under Transactions widget (Account view)  for CorpAcc
    //Validate that Localization should work for "Non-standard charges" and "Miscellaneous Adjustments" labels (Account view) for CorpAcc
    browser.actions().mouseMove(element(by.xpath(testdata2.Transactions.Title))).perform();
    browser.sleep(2000);
    
    //expect(element.all(by.xpath(testdata2.Transactions.OfferDetails)).getText()).toContain("GROUP_USAGE_Simple_PO");
    expect(element.all(by.xpath(testdata2.Transactions.OfferDetails)).getText()).toContain(testdata3.TEXT_MISC_ADJUSTMENTS);
    //expect(element.all(by.xpath(testdata2.Transactions.OfferDetails)).getText()).toContain(testdata3.TEXT_NON_STANDARD_CHARGES);
    }
    
    function pIDownlaod(){
    
    //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10655/ Reg_002_VerifyPIinfoIsdownloadedFromTransactions
    //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10621/ Reg_002_NonStdCharges_under_TransactionWidget
    
    // Input file to refervar 
    var testdata3 = protractor.loginHelpers.dashboard();
    
    
    //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10621/ Reg_002_NonStdCharges_under_TransactionWidget
    // Transactions - accountview  
    element(by.xpath(testdata2.Quotes.Transactions_Link)).click();
    browser.sleep(5000);
    browser.actions().mouseMove(element(by.xpath(testdata2.Transactions.Title))).perform();
    browser.sleep(2000);
    expect(element(by.xpath(testdata2.Transactions.AccountView)).isPresent()).toBe(true);
    console.log('account view and offer view are present');
    
    element(by.xpath(testdata2.OfferCharge.AccountView_Pane)).click();
    browser.sleep(4000);
    
    //Test Case: MVIEW_S00NEXT_TestCases/ MVIEW-2612_001_MainCase
    expect(element(by.xpath(testdata2.OfferCharge.PI_Selection)).isPresent()).toBe(false);
    
    //click on group usage po
    element(by.xpath(testdata2.OfferCharge.PayerPOSelection)).click();
    browser.sleep(2000);
    
    
    //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10625/ Reg_002_NonStandardCharges_in_Transaction_Widget
    //Validate that "Non-standard charges" and "Miscellaneous Adjustments" should be displayed under Transactions widget (Account view)  for CorpAcc
    //Validate that Localization should work for "Non-standard charges" and "Miscellaneous Adjustments" labels (Account view) for CorpAcc
    
    browser.actions().mouseMove(element(by.xpath(testdata2.Transactions.Title))).perform();
    browser.sleep(2000);
    
    //Click on Dept account link 
    element.all(by.xpath(testdata2.OfferCharge.ChildAccount)).then(function(filtervalues) {
    filtervalues[3].click();
    });
    browser.sleep(4000);
    
    //Validate that "Miscellaneous Adjustments" lable is displayed (Account view) for Department account
    expect(element(by.xpath(testdata2.OfferCharge.Misc_Adjustments_Label+testdata3.TEXT_MISC_ADJUSTMENTS+testdata2.ChildAccounts.CloseXpath)).isDisplayed()).toBe(true);
    browser.sleep(2000);
    
    //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10655/ Reg_002_VerifyPIinfoIsdownloadedFromTransactions
    
    //MONETAAS-1519: Unable to click on PI link after navigating to Transactions and Offercharges Screen in BR,ES,MX langauges 
    //Test case will fail in BR,ES,MX langauges because of MONETAAS-1519
    element(by.xpath(testdata2.OfferCharge.PO_GroupUsage)).click();
    browser.sleep(500);
    
    //Defining the path for downloaded .csv file.
    var filename = downloadpath+'OfferChargeSummary.csv';
    
    //Verify that the list of adjustments should get downloaded
    if (fs.existsSync(filename)) {
    // Make sure the browser doesn't have to rename the download.
    fs.unlinkSync(filename);
    }
    //Click on DownLoad link beside the PI
    element(by.xpath(testdata2.OfferCharge.Download)).click();
    browser.sleep(5000);
    
    //Verify that that charges file should get downloaded
    browser.driver.wait(function() {
    browser.waitForAngular();
    browser.ignoreSynchronization = true;
    return fs.existsSync(filename);
    }, 10000).then(function(){ 
    
    //Verifying the Payer details in downloaded .csv file (CorpAcc, DeptAcc and all 5 Coresub Acc)
    expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain('41.6666666667','33.3333333333');
    }); 
    browser.sleep(2000);
    
    browser.refresh();
    browser.sleep(10000);
    
    // Transactions - offerview  
    element(by.xpath(testdata2.Quotes.Transactions_Link)).click();
    browser.sleep(5000);
    browser.actions().mouseMove(element(by.xpath(testdata2.Transactions.Title))).perform();
    browser.sleep(2000);
    
    //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10655/ Reg_002_VerifyPIinfoIsdownloadedFromTransactions
    //MONETAAS-1519: Unable to click on PI link after navigating to Transactions and Offercharges Screen in BR,ES,MX langauges 
    //Test case will fail in BR,ES,MX langauges because of MONETAAS-1519
    
    element(by.xpath(testdata2.OfferCharge.PO_GroupUsage)).click();
    browser.sleep(500);
    
    //Defining the path for downloaded .csv file.
    var filename1 = downloadpath+'OfferChargeSummary.csv';
    
    //Verify that the list of adjustments should get downloaded
    if (fs.existsSync(filename1)) {
    // Make sure the browser doesn't have to rename the download.
    fs.unlinkSync(filename1);
    }
    //Click on DownLoad link beside the PI
    element(by.xpath(testdata2.OfferCharge.Download)).click();
    browser.sleep(5000);
    
    //Verify that that charges file should get downloaded
    browser.driver.wait(function() {
    browser.waitForAngular();
    browser.ignoreSynchronization = true;
    return fs.existsSync(filename1);
    }, 10000).then(function(){ 
    
    //Verifying the Payer details in downloaded .csv file (CorpAcc, DeptAcc and all 5 Coresub Acc)
    expect(fs.readFileSync(filename1, { encoding: 'utf8' })).toContain('41.6666666667','33.3333333333');
    }); 

    protractor.loginHelpers.logOutMV();
    
    }
    
    function totalchargesamount(){
    //Charge Details should be visible
    var testdata6 = require('../inputs/testdata/OfferChargeSummary.json');
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
    
    function NonstandardInTransationWidget(){
        var testdata3 = protractor.loginHelpers.dashboard();
        //Launch to the MV2.0 application
        //protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
        //Login to the MV2.0 application
        //protractor.loginHelpers.logInMV(testdata2.userName13,testdata2.passwordField);
        // Transactions - accountview
        //ESR-10617/ Reg_002_Back_link_in_Transaction_Widget_displayed  
        element(by.xpath(testdata2.Quotes.Transactions_Link)).click();
        browser.sleep(5000);
        browser.actions().mouseMove(element(by.xpath(testdata2.Transactions.Title))).perform();
        browser.sleep(2000);
        expect(element(by.xpath(testdata2.Transactions.AccountView)).isPresent()).toBe(true);
        console.log('account view and offer view are present');
        
        element(by.xpath(testdata2.Transactions.AccountView)).click();
        browser.sleep(5000);
        //click on group usage po
        element(by.xpath(testdata2.OfferCharge.PayerPOSelection)).click();
        browser.sleep(2000);
       ///Under Charges Summary widget, click on the Child Node
        element.all(by.xpath(testdata2.OfferCharge.PayerPOSelection)).then(function(pos){
        pos[1].click();
        browser.sleep(2000);
        expect(pos[1].getText()).toBe(testdata11.dept5Friendlyname);
        });
    
        //Verify the Nonstandard and miscellaneous adjustments are displayed under child accounts (Account view)
        element.all(by.xpath("//a[text()='"+testdata11.dept5Friendlyname+"']/following::div[contains(@class,'nonofferingCharges')]//a")).then(function(items){
        expect(items[1].getText()).toContain(testdata3.TEXT_MISC_ADJUSTMENTS);
        expect(items[4].getText()).toContain(testdata3.TEXT_NON_STANDARD_CHARGES);
        });
        browser.sleep(2000);
    
        }
    
    //#endregion TestHelpers
    });