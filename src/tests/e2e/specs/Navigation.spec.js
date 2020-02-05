describe('Navigation in Metraview 2.0', function () {

    //#region dataFiles
    
    var testData2 = require('../inputs/testData/JsonFileCreation.json');
    var testData3 = require('../inputs/testData/XpathRepository.json');
    
    //#endregion dataFiles
    
    //#region Tests
    it('Verify tapping usericon shouldnot logout user', function () {
    
    //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10517/ 001__Verify_tapping_usericon_shouldnot_logout_user
    browser.refresh();
    browser.sleep(5000);
    
    if(browser.params.value=='ViewOnlineBill'){
    
    //Validate the user Section
    userIconSection();
    
    //To validate whether dynamic value  is executing.
    console.log(browser.params.value);
    
    //Log IN to MetraNet Applciation and navigate to View Online Bill screen
    protractor.loginHelpers.viewOnlineBill(testData2.userName);
    
    //Validate the user Section
    userIconSection();
    
    //Logout from the MetraNet
    protractor.loginHelpers.logOutMetraNet();
    
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testData2.userName,testData2.passwordField);
    
    }
    else
    {
    //Validate the user Section
    userIconSection();
    }
    
    });
    
    it('ViewAll Link to be Displayed Under MySubscription Widget', function () {
    
    browser.refresh();
    browser.sleep(5000);
    
    if(browser.params.value=='ViewOnlineBill'){
    
    //Validate the viewAll under My Subscriptions Section
    viewAllValidation();
    
    //To validate whether dynamic value  is executing.
    console.log(browser.params.value);
    
    //Log IN to MetraNet Applciation and navigate to View Online Bill screen
    protractor.loginHelpers.viewOnlineBill(testData2.userName);
    
    //Validate the viewAll under My Subscriptions Section
    viewAllValidation();
    
    //Logout from the MetraNet
    protractor.loginHelpers.logOutMetraNet();
    
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testData2.userName,testData2.passwordField);
    
    }
    else
    {
    //Validate the viewAll under My Subscriptions Section
    viewAllValidation();
    }
    
    });
    
    it('Navigation', function () {
    browser.refresh();
    browser.sleep(5000);
    
    if(browser.params.value=='ViewOnlineBill'){
    
    //Validate navigation functionality
    navigation();
    
    //To validate whether dynamic value  is executing.
    console.log(browser.params.value);
    
    //Log IN to MetraNet Applciation and navigate to View Online Bill screen
    protractor.loginHelpers.viewOnlineBill(testData2.userName);
    
    //Validate navigation functionality
    navigation();
    
    //Logout from the MetraNet
    protractor.loginHelpers.logOutMetraNet();
    
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testData2.userName,testData2.passwordField);
    
    }
    else
    {
    //Validate navigation functionality
    navigation();
    }
    });
    
    it('Navigation to dashboard', function () {
    browser.refresh();
    browser.sleep(5000);
    
    if(browser.params.value=='ViewOnlineBill'){
    
    //Validate dashboard layer
    dashboard();
    
    //To validate whether dynamic value  is executing.
    console.log(browser.params.value);
    
    //Log IN to MetraNet Applciation and navigate to View Online Bill screen
    protractor.loginHelpers.viewOnlineBill(testData2.userName);
    
    //Validate dashboard layer
    dashboard();
    
    //Logout from the MetraNet
    protractor.loginHelpers.logOutMetraNet();
    
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testData2.userName,testData2.passwordField);
    
    }
    else
    {
    //Validate dashboard layer
    dashboard();
    }
    
    });
    
    it('Navigation to bills', function () {
    
    if(browser.params.value=='ViewOnlineBill'){
    
    //Validate bills layer
    bills();
    
    //To validate whether dynamic value  is executing.
    console.log(browser.params.value);
    
    //Log IN to MetraNet Applciation and navigate to View Online Bill screen
    protractor.loginHelpers.viewOnlineBill(testData2.userName);
    
    //Validate bills layer
    bills();
    
    //Logout from the MetraNet
    protractor.loginHelpers.logOutMetraNet();
    
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testData2.userName,testData2.passwordField);
    
    }
    else
    {
    //Validate bills layer
    bills();
    }
    
    });
    
    it('Navigation to offer store', function () {
    
    if(browser.params.value=='ViewOnlineBill'){
    
    //Validate offerStore layer
    offerStore();
    
    //To validate whether dynamic value  is executing.
    console.log(browser.params.value);
    
    //Log IN to MetraNet Applciation and navigate to View Online Bill screen
    protractor.loginHelpers.viewOnlineBill(testData2.userName);
    
    //Validate offerStore layer
    offerStore();
    
    //Logout from the MetraNet
    protractor.loginHelpers.logOutMetraNet();
    
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testData2.userName,testData2.passwordField);
    
    }
    else
    {
    //Validate offerStore layer
    offerStore();
    }
    });
    
    it('Navigation to myaccount', function () {
    
    if(browser.params.value=='ViewOnlineBill'){
    
    //Validate My Account layer
    myAccount();
    
    //To validate whether dynamic value  is executing.
    console.log(browser.params.value);
    
    //Log IN to MetraNet Applciation and navigate to View Online Bill screen
    protractor.loginHelpers.viewOnlineBill(testData2.userName);
    
    //Validate My Account layer
    myAccount();
    
    //Logout from the MetraNet
    protractor.loginHelpers.logOutMetraNet();
    
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testData2.userName,testData2.passwordField);
    
    }
    else
    {
    //Validate My Account layer
    myAccount();
    }
    
    });
    
    //#endregion Tests
    
    //#region TestHelpers
    
    function userIconSection(){
    
        var testData5 = protractor.loginHelpers.lang;
        //Get Metraview 2.0 URL
        browser.get(testData2.URL);
        browser.sleep(5000);
    
        //Select the reqired Currency
        element(by.css(testData5)).click();
        browser.sleep(3000);
    
        //Login to MetraView as Corporate User
        //Enter username as userName2
        element(by.xpath(testData3.LoginPage.UserName)).sendKeys(testData2.userName);
    
        //Enter password
        element(by.xpath(testData3.LoginPage.Password)).sendKeys(testData2.passwordField);
    
        //Click on Login Button
        browser.findElement(By.xpath(testData3.LoginPage.LogInButton)).click();
        browser.sleep(12000);  
    
    //Tap the user icon in the Dashboard page
    element(by.xpath(testData3.SystemBar.AccountName)).click();
    browser.sleep(2000);
    
    //Verify a small menu opens and user is not logged out
    expect(element(by.xpath(testData3.SystemBar.SystemBar_Menu)).isDisplayed()).toBe(true);
    expect(element(by.xpath("//p[contains(text(),'"+testData2.accnum+"')]")).isDisplayed()).toBe(true);
    browser.sleep(3000);
    
    }
    
    function viewAllValidation(){
    //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10522/ 001_ViewAllLinkTo_beDisplayedUnderMySubscription
    var testData4 = protractor.loginHelpers.dashboard();
    
    
    browser.sleep(5000);
    //Verify under the My Subscriptions widget, the View All link is displayed
    expect(element(by.xpath(testData3.Subscriptions.Widget_ViewAllButton)).isPresent()).toBe(true);
    expect(element(by.xpath(testData3.Subscriptions.Widget_ViewAllButton)).getText()).toContain(testData4.TEXT_VIEW_ALL);
    
    //Navigate to the Bills page
    element(by.xpath(testData3.LayerSelector.Dropdown)).click();
    element(by.xpath(testData3.LayerSelector.Bills)).click();
    browser.sleep(3000);
    //Verify under the My Subscriptions widget, the View All link is displayed
    expect(element(by.xpath(testData3.Subscriptions.Widget_ViewAllButton)).isPresent()).toBe(true);
    expect(element(by.xpath(testData3.Subscriptions.Widget_ViewAllButton)).getText()).toContain(testData4.TEXT_VIEW_ALL);
    
    //Navigate to the My Account Page
    element(by.xpath(testData3.LayerSelector.Dropdown)).click();
    element(by.xpath(testData3.LayerSelector.MyAccount)).click();
    browser.sleep(3000);
    
    //Verify under the My Subscriptions widget, the View All link is displayed
    expect(element(by.xpath(testData3.Subscriptions.MyAccount_Widget_ViewAllButton)).isPresent()).toBe(true);
    expect(element(by.xpath(testData3.Subscriptions.MyAccount_Widget_ViewAllButton)).getText()).toContain(testData4.TEXT_VIEW_ALL);
    }
    
    function navigation(){
    //Input file to refer
    var testData4 = protractor.loginHelpers.dashboard();
    
    
    expect(element(by.xpath(testData3.LayerSelector.MetraView_Label)).isDisplayed()).toBe(true);
    expect(element(by.xpath(testData3.LayerSelector.Dropdown)).isDisplayed()).toBe(true);
    //element(by.xpath(testData3.LayerSelector.Dropdown)).click();
    element(by.xpath(testData3.LayerSelector.MenuItems)).isPresent();
    expect(element(by.xpath(testData3.ExpiredPasswordPage.WelcomeAccount_Message)).getText()).toContain(testData4.TEXT_WELCOME);
    element(by.xpath(testData3.SystemBar.AccountName)).click();
    browser.sleep(2000);
    
    expect(element(by.xpath("//p[contains(text(),'"+testData2.accnum+"')]")).isDisplayed()).toBe(true);
    browser.sleep(3000);
    }
    
    function dashboard(){
    //Input file to refer
    var testData4 = protractor.loginHelpers.viewSelector();
    var testData6 = protractor.loginHelpers.dashboard();
    
    //to first child
    element(by.xpath(testData3.SystemBar.AccountName)).click();
    browser.sleep(2000);
    
    element(by.xpath(testData3.LayerSelector.Dropdown)).click();
    browser.sleep(2000);
    element.all(by.xpath(testData3.LayerSelector.ComponentLists)).then(function(items) {
    expect(items.length).toBe(4);
    //Existing Localization Defect:MVIEW-2965(MX)
    expect(items[0].getText()).toBe(testData4.MV_VIEW_DASHBOARD);
    expect(items[1].getText()).toBe(testData4.MV_VIEW_BILLS);
    expect(items[2].getText()).toBe(testData4.MV_VIEW_OFFER_STORE);
    expect(items[3].getText()).toBe(testData4.MV_VIEW_MY_ACCOUNT);
    });
    expect(element(by.xpath(testData3.LayerSelector.Dashboard)).isDisplayed()).toBe(true);
    var attr = element(by.xpath(testData3.LayerSelector.Dashboard_Option_Selected)).getAttribute('class');
    expect(attr).toContain("item_selected");
    
    expect(element(by.xpath(testData3.Charges.Widget)).isDisplayed()).toBe(true);
    expect(element(by.xpath(testData3.AmountDue.Widget)).isDisplayed()).toBe(true);
    expect(element(by.xpath(testData3.NowCast.Widget)).isDisplayed()).toBe(true);
    expect(element(by.xpath(testData3.InvoicedTotalCharges.Widget)).isDisplayed()).toBe(true);
    expect(element(by.xpath(testData3.AccountInformation.Widget)).isDisplayed()).toBe(true);
    expect(element(by.xpath(testData3.QuotesAndTransactions.Widget)).isDisplayed()).toBe(true);
    expect(element(by.xpath(testData3.PaymentMethods.Widget)).isDisplayed()).toBe(true);
    expect(element(by.xpath(testData3.ActivityLog.Title)).isDisplayed()).toBe(true);
    
    expect(element(by.xpath(testData3.Accounts.Widget)).isPresent()).toBe(true);  
    expect(element(by.xpath(testData3.InvoicedTotalCharges.Title)).isPresent()).toBe(true);
    expect(element(By.xpath(testData3.Subscriptions.Widget_Name)).isPresent()).toBe(true);
    expect(element(by.xpath(testData3.Subscriptions.Title)).isPresent()).toBe(true);
    expect(element(by.xpath(testData3.NowCast.Title)).isPresent()).toBe(true);
    
    //ESR-10501/ 001_Verify_Hebrew_Translations_in_AllPages
    //ESR-10589/ 001_Text_should_be_displayed_in_relevant_languages
    //Verify text in the Dashboard page is localized
    expect(element(by.xpath(testData3.SystemBar.Logout)).getText()).toEqual(testData6.TEXT_LOGOUT);
    //Click on the arrow beside the account name in the Header
    element(by.xpath(testData3.SystemBar.AccountName)).click();
    browser.sleep(4000);
    expect(element(by.xpath(testData3.SystemBar.SystemBar_Menu)).getText()).toContain(testData6.TEXT_ACCOUNT_ID);
    expect(element(by.xpath(testData3.SystemBar.SystemBar_Menu)).getText()).toContain(testData6.TEXT_CHANGE_PASSWORD);
    expect(element(by.xpath(testData3.SystemBar.SystemBar_Menu)).getText()).toContain(testData6.TEXT_MY_ACCOUNT);
    //expect(element(by.xpath(testData3.SystemBar.SystemBar_Menu)).getText()).toContain(testData6.TEXT_VIEW_ALL);
    var pageContent=browser.getPageSource();      
    expect(pageContent).toContain(testData6.TEXT_MAKE_A_PAYMENT);
    expect(pageContent).toContain(testData6.TEXT_TOTAL_AMOUNT_DUE);
    expect(pageContent).toContain(testData6.TEXT_PAYMENT_DUE);
    expect(pageContent).toContain(testData6.TEXT_AUTOPAY_OFF);
    expect(pageContent).toContain(testData6.TEXT_GO_TO_BILLS);
    expect(pageContent).toContain(testData6.TEXT_NOW_CAST);
    expect(pageContent).toContain(testData6.TEXT_INVOICE_TOTAL_CHARGE);
    // expect(pageContent).toContain(testData6.TEXT_INVOICE_DATE);
    expect(pageContent).toContain(testData6.TEXT_CHARGES_TEXT);
    expect(pageContent).toContain(testData6.TEXT_CHARGES_SUB_TOTAL);
    expect(pageContent).toContain(testData6.TEXT_PREBILL_ADJUSTMENTS);
    expect(pageContent).toContain(testData6.TEXT_ACCOUNT_INFORMATION);
    expect(pageContent).toContain(testData6.TEXT_ACCOUNT_NUMBER);
    expect(pageContent).toContain(testData6.TEXT_PHONE);
    expect(pageContent).toContain(testData6.TEXT_SINCE_LAST_BILL);
    expect(pageContent).toContain(testData6.TEXT_QUOTES);
    expect(pageContent).toContain(testData6.TEXT_TRANSACTIONS);
    expect(pageContent).toContain(testData6.TEXT_PAYMENT_METHODS);
    expect(pageContent).toContain(testData6.TEXT_ADD_PAYMENT_METHODS);
    expect(pageContent).toContain(testData6.TEXT_SUBSCRIPTIONS);
    expect(pageContent).toContain(testData6.TEXT_MY_SUBSCRIPTIONS);
    expect(pageContent).toContain(testData6.TEXT_SUBSCRIPTION);
    expect(pageContent).toContain(testData6.TEXT_VIEW_ALL);
    expect(pageContent).toContain(testData6.TEXT_ACCOUNT);
    expect(pageContent).toContain(testData6.TEXT_ACTIVITY_LOG);
    
    }
    
    function bills(){
    //Input file to refer
    var testData4 = protractor.loginHelpers.viewSelector();
    var testData5 = protractor.loginHelpers.dashboard();
    // to check second 
    element(by.xpath(testData3.LayerSelector.Dropdown)).click();
    element(by.xpath(testData3.LayerSelector.Bills)).click();
    browser.sleep(3000);
    //Existing Localization Defect:MVIEW-2965(MX)
    expect(element(by.xpath(testData3.LayerSelector.MyAccount_Label)).getText()).toEqual(testData4.MV_VIEW_BILLS);
    expect(element(by.xpath(testData3.AmountDue.Bills_Widget_AmountDue)).isDisplayed()).toBe(true);
    expect(element(by.xpath(testData3.ExpiredPasswordPage.WelcomeAccount_Message)).getText()).toContain(testData4.MV_VIEW_BILLS);
    expect(element(by.xpath(testData3.Downloads.Widget)).isDisplayed()).toBe(true);
    expect(element(by.xpath(testData3.InvoicedTotalCharges.Widget)).isDisplayed()).toBe(true);
    
    //ESR-10501/ 001_Verify_Hebrew_Translations_in_AllPages
    //ESR-10589/ 001_Text_should_be_displayed_in_relevant_languages
    //Verify text in the Bills page is localized
    var pageContent=browser.getPageSource();
    expect(pageContent).toContain(testData4.MV_VIEW_BILLS);
    expect(pageContent).toContain(testData5.TEXT_SELECT_BILLING_PERIOD);
    expect(pageContent).toContain(testData5.TEXT_TOTAL_AMOUNT_DUE);
    expect(pageContent).toContain(testData5.TEXT_PAYMENT_DUE);
    expect(pageContent).toContain(testData5.TEXT_AUTOPAY_OFF);
    expect(pageContent).toContain(testData5.TEXT_MAKE_A_PAYMENT);
    expect(pageContent).toContain(testData5.TEXT_PAYMENTS_CREDITS_AND_ADJUSTMENTS);
    expect(pageContent).toContain(testData5.TEXT_PREVIOUS_BALANCE);
    expect(pageContent).toContain(testData5.TEXT_POSTBILL_ADJUSTMENTS);
    expect(pageContent).toContain(testData5.TEXT_PAYMENTS_RECEIVED);
    expect(pageContent).toContain(testData5.TEXT_CHARGES_TEXT);
    expect(pageContent).toContain(testData5.TEXT_CHARGES_SUB_TOTAL);
    expect(pageContent).toContain(testData5.TEXT_PREBILL_ADJUSTMENTS);
    expect(pageContent).toContain(testData5.TEXT_TAX);
    expect(pageContent).toContain(testData5.TEXT_ACTUAL_TOTAL_BILL_AMOUNT);
    expect(pageContent).toContain(testData5.TEXT_TOTAL_BALANCE);
    expect(pageContent).toContain(testData5.TEXT_TOTAL_CHARGES);
    expect(pageContent).toContain(testData5.TEXT_OFFER_CHARGE_SUMMARY);
    expect(pageContent).toContain(testData5.TEXT_OFFER_VIEW);
    expect(pageContent).toContain(testData5.TEXT_ACCOUNT_VIEW);
    expect(pageContent).toContain(testData5.TEXT_INVOICE_TOTAL_CHARGE);
    //expect(pageContent).toContain(testData5.TEXT_INVOICE_DATE);
    expect(pageContent).toContain(testData5.TEXT_DOWNLOADS);
    expect(pageContent).toContain(testData5.TEXT_SUBSCRIPTIONS);
    expect(pageContent).toContain(testData5.TEXT_NOW_CAST);
    expect(pageContent).toContain(testData5.TEXT_DOWNLOAD_STATEMENTS);
    expect(pageContent).toContain(testData5.TEXT_DOWNLOAD_INVOICES);
    expect(pageContent).toContain(testData5.TEXT_DOWNLOAD_CREDIT_NOTES);
    // var downlaodsWidget = element(by.xpath("//ecb-invoice//div[contains(@class,'invoiceExpand')]"));
    // browser.executeScript('arguments[0].scrollIntoView()', downlaodsWidget.getWebElement());
    // //browser.executeScript('window.scrollTo(0,document.body.scrollHeight)').then(function(){
    // //browser.sleep(10000);
    // //});
    // expect(pageContent).toContain("statements");
    // expect(pageContent).toContain("invoices");
    // expect(pageContent).toContain("creditNotes");
    
    }
    
    function offerStore(){
    
    //Input file to refer
    var testData4 = protractor.loginHelpers.viewSelector();
    var testData5 = protractor.loginHelpers.dashboard();
    //validation for third child
    element(by.xpath(testData3.LayerSelector.Dropdown)).click();
    element(by.xpath(testData3.LayerSelector.OfferStore)).click();
    browser.sleep(2000);
    //Existing Localization Defect:MVIEW-2965(MX)
    expect(element(by.xpath(testData3.LayerSelector.MyAccount_Label)).getText()).toEqual(testData4.MV_VIEW_OFFER_STORE);
    
    element(by.xpath(testData3.LayerSelector.OfferStore_Page)).isPresent();
    expect(element(by.xpath(testData3.ExpiredPasswordPage.WelcomeAccount_Message)).getText()).toContain(testData5.TEXT_OFFER_STORE);
    
    //ESR-10501/ 001_Verify_Hebrew_Translations_in_AllPages
    //ESR-10589/ 001_Text_should_be_displayed_in_relevant_languages
    //Verify text in the Offer Store page is localized
    var pageContent=browser.getPageSource();
    expect(pageContent).toContain(testData5.TEXT_OFFER_STORE);
    expect(pageContent).toContain(testData5.TEXT_SEARCH);
    expect(pageContent).toContain(testData5.TEXT_SEARCH_HERE);
    expect(pageContent).toContain(testData5.TEXT_AVAILABLE_BETWEEN);
    
    }
    
    function myAccount(){
    //Input file to refer
    var testData4 = protractor.loginHelpers.viewSelector();
    var testData5 = protractor.loginHelpers.dashboard();
    
    //validation of fourth child
    element(by.xpath(testData3.LayerSelector.Dropdown)).click();
    element(by.xpath(testData3.LayerSelector.MyAccount)).click();
    browser.sleep(2000);
    //Existing Localization Defect:MVIEW-2965(MX)
    expect(element(by.xpath(testData3.LayerSelector.MyAccount_Label)).getText()).toEqual(testData4.MV_VIEW_MY_ACCOUNT);
    expect(element(by.xpath(testData3.AccountInformation.Widget)).isDisplayed()).toBe(true);
    expect(element(by.xpath(testData3.ExpiredPasswordPage.WelcomeAccount_Message)).getText()).toContain(testData5.TEXT_MY_ACCOUNT);
    expect(element(by.xpath(testData3.ActivityLog.Title)).isDisplayed()).toBe(true);
    
    //ESR-10501/ 001_Verify_Hebrew_Translations_in_AllPages
    //ESR-10589/ 001_Text_should_be_displayed_in_relevant_languages
    //Verify text in the My Account page is localized
    var pageContent=browser.getPageSource();
    expect(pageContent).toContain(testData5.TEXT_ACCOUNT_INFORMATION);
    expect(pageContent).toContain(testData5.TEXT_EDIT);
    expect(pageContent).toContain(testData5.TEXT_ACCOUNT_NUMBER);
    expect(pageContent).toContain(testData5.TEXT_PHONE);
    expect(pageContent).toContain(testData5.TEXT_ACCOUNT_SETTINGS);
    expect(pageContent).toContain(testData5.TEXT_AUTOPAY_OFF);
    expect(pageContent).toContain(testData5.TEXT_ACCOUNT_SECURITY_ON);
    expect(pageContent).toContain(testData5.TEXT_PAYMENT_METHODS);
    expect(pageContent).toContain(testData5.TEXT_ADD_PAYMENT_METHODS);
    expect(pageContent).toContain(testData5.TEXT_MY_SUBSCRIPTIONS);
    expect(pageContent).toContain(testData5.TEXT_SUBSCRIPTION);
    expect(pageContent).toContain(testData5.TEXT_VIEW_ALL);
    expect(pageContent).toContain(testData5.TEXT_ACCOUNT);
    expect(pageContent).toContain(testData5.TEXT_ACTIVITY_LOG);
    expect(pageContent).toContain(testData5.TEXT_ACCOUNT_ID);
    
    // again to dashboard
    element(by.xpath(testData3.LayerSelector.Dropdown)).click();
    element(by.xpath(testData3.LayerSelector.Dashboard)).click();
    browser.sleep(5000);
    
    //Logout from metraview
    protractor.loginHelpers.logOutMV();
    
    }
    
    //#endregion TestHelpers
    });
    