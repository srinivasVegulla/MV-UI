describe('Navigation in Metraview 2.0', function () {

    
    var testData2 = require('../inputs/testData/JsonFileCreation.json');
    var testData3 = require('../inputs/testData/XpathRepository.json');
    it('Launch the URL', function () {
        //Launch to the MV2.0 application
     protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
     
     //Login to the MV2.0 application
     protractor.loginHelpers.logInMV(testData2.userName,testData2.passwordField);
       });
    
    it('verify absence of select billing period in dashboard page', function () {
        browser.sleep(2000);
        //verify select billing period is absent
        browser.driver.manage().window().maximize();
        browser.sleep(5000);
        expect(element(by.xpath(testData3.Billing.SelectBillingPeriodLabel)).isPresent()).toBeFalsy();
          //Navigate to the Bills page
        element(by.xpath(testData3.LayerSelector.Dropdown)).click();
        element(by.xpath(testData3.LayerSelector.Bills)).click();
        //Validate that v is capital in metraview
        var mv = element(by.css(testData3.LayerSelector.DashBoard)).getText();
        
        expect(mv).toContain('V');
        //verify select billing period is present
        expect(element(by.xpath(testData3.Billing.SelectBillingPeriodLabel)).isPresent()).toBeTruthy();
         // again to dashboard
        element(by.xpath(testData3.LayerSelector.Dropdown)).click();
        element(by.xpath(testData3.LayerSelector.Dashboard)).click();
        browser.sleep(5000);
        
        //verify select billing period is absent
        expect(element(by.xpath(testData3.Billing.SelectBillingPeriodLabel)).isPresent()).toBeFalsy();
        
       //validation for third child
        element(by.xpath(testData3.LayerSelector.Dropdown)).click();
        element(by.xpath(testData3.LayerSelector.OfferStore)).click();
        browser.sleep(3000);
        //Validate that v is capital in metraview
        var mv = element(by.css(testData3.LayerSelector.DashBoard)).getText();
        
        expect(mv).toContain('V');
         // again to dashboard
        element(by.xpath(testData3.LayerSelector.Dropdown)).click();
        element(by.xpath(testData3.LayerSelector.Dashboard)).click();
        browser.sleep(5000);
        
        //verify select billing period is absent
        expect(element(by.xpath(testData3.Billing.SelectBillingPeriodLabel)).isPresent()).toBeFalsy();
        //validation of fourth child
        element(by.xpath(testData3.LayerSelector.Dropdown)).click();
        element(by.xpath(testData3.LayerSelector.MyAccount)).click();
        browser.sleep(2000);
        //Validate that v is capital in metraview
        var mv = element(by.css(testData3.LayerSelector.DashBoard)).getText();
        
        expect(mv).toContain('V');
         // again to dashboard
        element(by.xpath(testData3.LayerSelector.Dropdown)).click();
        element(by.xpath(testData3.LayerSelector.Dashboard)).click();
        browser.sleep(5000);
        
        //verify select billing period is absent
        expect(element(by.xpath(testData3.Billing.SelectBillingPeriodLabel)).isPresent()).toBeFalsy();
    });

});