
var testData1=require('../inputs/testData/Login.json');
var testData3 = require('../inputs/testData/XpathRepository.json');
var testData4 = require('../inputs/testData/miscadjust.json');

describe('Tree functionality', function () {
    
    it('Validating Tree View functionality for corp Accounts ', function () {
        var testData5 = protractor.loginHelpers.lang;
        
     
     //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testData4.userNamecorp,testData4.passwordField);
      
        browser.sleep(8000);
        
        //Click on Go to Bills Link
        element(by.xpath(testData3.Billing.GoToBillsButton)).click();
        browser.sleep(8000);
       
        //click on account view pane
        element(by.xpath(testData3.OfferCharge.AccountView_Pane)).click();
       //click on user in account view pane
       element(by.xpath(testData3.OfferCharge.PayerPOSelection)).click();
        browser.sleep(2000);
       // element(by.css(" div.ecb-chargeTreeView.hidden-xs.hidden-sm.visible-md-up > table > tfoot > tr > th > i")).click();
        //validate department account under corpaorate account
        expect(element(by.xpath(testData3.TreeView.DeptAcc2)).isDisplayed()).toBe(true);
        element(by.xpath(testData3.TreeView.DeptAcc2)).click();
       
         expect(element(by.xpath(testData3.TreeView.coreAcc1)).isDisplayed()).toBe(true);
    
        
        
       
    });
    //MVIEW-2980
    it('should validate nodes ', function () {

        browser.refresh();
        browser.sleep(8000);
        //Click on Go to Bills Link
        element(by.xpath(testData3.Billing.GoToBillsButton)).click();
        browser.sleep(8000);
        element(by.css(testData3.TreeView.Chevron)).click();
        browser.sleep(2000);
        element(by.xpath(testData3.OfferCharge.AccountView_Pane)).click();
        element(by.xpath(testData3.TreeView.corpAcc)).click();
        element(by.xpath(testData3.OfferCharge.OfferView_Pane)).click();
        element(by.css(testData3.TreeView.Chevron)).click();
        element(by.xpath(testData3.OfferCharge.AccountView_Pane)).click();
        element(by.xpath(testData3.OfferCharge.PayerPOSelection)).click();
        browser.sleep(2000);
      //  element(by.css(" div.ecb-chargeTreeView.hidden-xs.hidden-sm.visible-md-up > table > tfoot > tr > th > i")).click();
        expect(element(by.xpath(testData3.TreeView.corpAcc)).isDisplayed()).toBe(true);
        element(by.css(testData3.TreeView.Chevron)).click();
        element(by.css(testData3.TreeView.Chevron)).click();
        element(by.xpath(testData3.OfferCharge.OfferView_Pane)).click();
        expect(element(by.css(testData3.TreeView.ChevronRight)).isDisplayed()).toBe(true);
        

      });
      
    it('Validating Tree View functionality for dept Accounts1 ', function () {
        var testData5 = protractor.loginHelpers.lang;
   
      //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testData4.userNamedept1,testData4.passwordField);
 
        browser.sleep(2000);
        browser.refresh();
        browser.sleep(8000);
        //Click on Go to Bills Link
        element(by.xpath(testData3.Billing.GoToBillsButton)).click();
        browser.sleep(8000);
        //click on account view pane
        expect(element(by.xpath(testData3.OfferCharge.AccountView_Pane)).isDisplayed()).toBe(true);
       // element(by.xpath(testdata4.ChildAccounts.Child+testdata2.child1+testdata4.ChildAccounts.CloseXpath)).click();
        
        
    });
    it('Validating Tree View functionality for dept Accounts2 ', function () {
        var testData5 = protractor.loginHelpers.lang;
        
     
      //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testData4.userNamedept2,testData4.passwordField);
 
 
        browser.sleep(2000);
        browser.refresh();
        browser.sleep(2000);
        //Click on Go to Bills Link
        element(by.xpath(testData3.LayerSelector.Dropdown)).click();
        element(by.xpath(testData3.LayerSelector.Bills)).click();
        browser.sleep(8000);
        //click on account view pane
        element(by.xpath(testData3.OfferCharge.AccountView_Pane)).click();
       // element(by.xpath(testdata4.ChildAccounts.Child+testdata2.child1+testdata4.ChildAccounts.CloseXpath)).click();
        expect(element(by.xpath(testData3.TreeView.coreAcc2)).isDisplayed()).toBe(true);
        
    });
    it('Validating Tree View functionality for core Accounts2 ', function () {
        var testData5 = protractor.loginHelpers.lang;
        
     
     
       //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testData4.userNamecore2,testData4.passwordField);
 
        browser.sleep(2000);
        browser.refresh();
        element(by.xpath(testData3.LayerSelector.Dropdown)).click();
       element(by.xpath(testData3.LayerSelector.Bills)).click();
        browser.sleep(8000);
        //click on account view pane
        expect(element(by.css(testData3.TreeView.ChevronRight)).isDisplayed()).toBe(true);
        expect(element(by.xpath(testData3.OfferCharge.AccountView_Pane)).isPresent()).toBeFalsy();
       // element(by.xpath(testdata4.ChildAccounts.Child+testdata2.child1+testdata4.ChildAccounts.CloseXpath)).click();
        
        
    });
    it('Validating Tree View functionality for core Accounts1 ', function () {
        var testData5 = protractor.loginHelpers.lang;
        
     
      //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testData4.userNamecore1,testData4.passwordField);
 
        browser.sleep(2000);
        browser.refresh();
        browser.sleep(8000);
        //Click on Go to Bills Link
        element(by.xpath(testData3.LayerSelector.Dropdown)).click();
       element(by.xpath(testData3.LayerSelector.Bills)).click();
        browser.sleep(8000);
        
        expect(element(by.css(testData3.TreeView.ChevronRight)).isDisplayed()).toBe(true);
       // element(by.xpath(testdata4.ChildAccounts.Child+testdata2.child1+testdata4.ChildAccounts.CloseXpath)).click();
        
        it('Validating logout ', function () {
     //Logout from metraview
    protractor.loginHelpers.logOutMV();
    });
        
    });
    
    
     





});