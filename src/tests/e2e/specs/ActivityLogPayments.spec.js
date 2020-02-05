var testdata = require('../inputs/testdata/JsonFileCreation.json');
var testdata1 = require('../inputs/testdata/Login.json');
var testdata3 = require('../inputs/testdata/XpathRepository.json');
var testdata4 = require('../inputs/testdata/PaymentMethods.json');

describe('Valdiate Activity Log data after Payment settings changes', function () {

it('Valdiate Activity Log after auto payment settings', function () {
    var testData2 = protractor.loginHelpers.dashboard();
        browser.refresh();
        browser.sleep(5000);

        //Load the URL
       browser.get(testdata.URL);
       browser.sleep(3000);

        //For language selection
        var testdata7 = protractor.loginHelpers.lang;
        element(by.css(testdata7)).click();

        //Log in to MetraView with Department account
        element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata.userName);
        element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata.passwordField);
        browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();

        browser.waitForAngular();
        browser.sleep(6000);
        
        browser.refresh();
        browser.sleep(5000);
        expect(element(by.xpath(testdata3.PaymentMethods.Link)).isDisplayed()).toBe(true);
        element(by.xpath(testdata3.PaymentMethods.Link)).click();
        element(by.xpath(testdata3.PaymentMethods.Popup_Proceed)).click();
        browser.ignoreSynchronization = true;
        browser.waitForAngular();
        browser.sleep(1000);
        
        element(by.xpath(testdata3.PaymentMethods.CyberSource_Text));
        browser.actions().mouseMove(element(by.xpath(testdata3.PaymentMethods.CyberSource_Echeckoption))).perform();
        element(by.xpath(testdata3.PaymentMethods.CyberSource_Echeckoption_Button)).click();
        browser.sleep(1000);
        
        expect(element(by.xpath(testdata3.PaymentMethods.CyberSource_BillingInformationTitle)).getText()).toEqual('Billing Information');
    
        element(by.xpath(testdata3.PaymentMethods.CyberSource_FirstName)).clear();
        element(by.xpath(testdata3.PaymentMethods.CyberSource_FirstName)).sendKeys(testdata4.name);
        element(by.xpath(testdata3.PaymentMethods.CyberSource_LastName)).clear();
        element(by.xpath(testdata3.PaymentMethods.CyberSource_LastName)).sendKeys(testdata4.surname);
        element(by.xpath(testdata3.PaymentMethods.CyberSource_Company)).clear();
        element(by.xpath(testdata3.PaymentMethods.CyberSource_Company)).sendKeys(testdata4.companyname);
        element(by.xpath(testdata3.PaymentMethods.CyberSource_AddressLine1)).clear();
        element(by.xpath(testdata3.PaymentMethods.CyberSource_AddressLine1)).sendKeys(testdata4.address1);
        element(by.xpath(testdata3.PaymentMethods.CyberSource_AddressLine2)).clear();
        element(by.xpath(testdata3.PaymentMethods.CyberSource_AddressLine2)).sendKeys(testdata4.address2);
        element(by.xpath(testdata3.PaymentMethods.CyberSource_City)).clear();
        element(by.xpath(testdata3.PaymentMethods.CyberSource_City)).sendKeys(testdata4.city);
        element(by.xpath(testdata3.PaymentMethods.CyberSource_Country)).click();
        element(by.xpath(testdata3.PaymentMethods.CyberSource_Countryvalue)).click();
        element(by.xpath(testdata3.PaymentMethods.CyberSource_State)).clear();
        element(by.xpath(testdata3.PaymentMethods.CyberSource_State)).sendKeys(testdata4.state);
        element(by.xpath(testdata3.PaymentMethods.CyberSource_PostalCode)).clear();
        element(by.xpath(testdata3.PaymentMethods.CyberSource_PostalCode)).sendKeys(testdata4.postalcode);
        element(by.xpath(testdata3.PaymentMethods.CyberSource_Phone)).clear();
        element(by.xpath(testdata3.PaymentMethods.CyberSource_Phone)).sendKeys(testdata4.phno);
        element(by.xpath(testdata3.PaymentMethods.CyberSource_Email)).clear();
        element(by.xpath(testdata3.PaymentMethods.CyberSource_Email)).sendKeys(testdata4.email);
        // routing number
        element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_RoutingNumber)).click();
        element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_RoutingNumber)).sendKeys(testdata4.routingnum);
        element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_AccountNumber)).click();
        element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_AccountNumber)).sendKeys(testdata4.accountnum);
        element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_Check_Number)).click();
        element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_Check_Number)).sendKeys(testdata4.checknum);
    
        element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_Account_Type)).click();
        element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_Account_Type_Savings)).click();
    
        element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_DOB_Month)).click();
        element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_DOB_Month_Value)).click();
        element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_DOB_Day)).click();
        element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_DOB_DayValue)).click();
        element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_DOB_Year)).click();
        element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_DOB_Year_Value)).click();
        element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_Finish)).click();
    
        browser.ignoreSynchronization = true;
        browser.waitForAngular();
    
        browser.sleep(10000);
        expect(element(by.xpath(testdata3.ActivityLog.Today_Text)).getText()).toEqual(testData2.TEXT_TODAY);
        expect(element(by.xpath(testdata3.ActivityLog.ActivityLog_LatestMessage)).getText()).toEqual('Add ACH succeeded');
      

        browser.refresh();
        browser.sleep(5000);
        element(by.xpath(testdata3.LayerSelector.Dropdown)).click();
        element(by.xpath(testdata3.LayerSelector.MyAccount)).click();
        browser.sleep(7000);

        //Trun on automatic payment
        element(by.xpath("//button[@ng-click='vm.paymentSetup(vm.accountId)']")).click();
        browser.sleep(5000);

   // element.all(by.xpath("//input[contains(@ng-checked,'autopay')]//following::span[contains(@class,'RadioBtn-inputStatus')]")).then(function(items){
      // items[0].click();
     //   })
      //  browser.sleep(3000);

        var wid1=element(by.xpath("//input[contains(@ng-checked,'autopay')]//following::span[contains(@class,'RadioBtn-inputStatus')]"));
        browser.executeScript('arguments[0].click();', wid1);
        browser.sleep(5000);
        element(by.xpath(testdata3.AccountInformation.Edit_Save)).click();  
                
        browser.refresh();
        browser.sleep(10000);

        //ActivityLog View all
        element(by.xpath(testdata3.ActivityLog.ViewAll)).click();
        browser.sleep(5000);

        element.all(by.xpath("//div[@class='ecb-activityBoxContent']//p[5]")).then(function(items){
        expect(items[0].getText()).toContain("Autopay is turned on");
        browser.sleep(3000);
    });
        //expect(element(by.xpath("//div[@class='ecb-activityBoxContent ecb-expandActivityContent success-ecbActivityBox']/section/p[5]")).getText()).toContain("Autopay is turned on");
           

	 ////div[@class="ecb-activityBoxContent ecb-expandActivityContent success-ecbActivityBox"]/section/p[5]
    
	browser.refresh();
        browser.sleep(5000);
        element(by.xpath(testdata3.LayerSelector.Dropdown)).click();
        element(by.xpath(testdata3.LayerSelector.MyAccount)).click();
        browser.sleep(7000);

        //Trun Off automatic payment
        element(by.xpath("//button[@ng-click='vm.paymentSetup(vm.accountId)']")).click();
        browser.sleep(5000);
        var wid = element(by.xpath("//form[@name='paymentSetupForm']//li[2]//span[contains(@class,'radio')]"));
        browser.executeScript('arguments[0].click();', wid);
        
        browser.sleep(5000);
        element(by.xpath(testdata3.AccountInformation.Edit_Save)).click();  
                
        browser.refresh();
        browser.sleep(10000);

        //ActivityLog View all
        element(by.xpath(testdata3.ActivityLog.ViewAll)).click();
        browser.sleep(5000);

        element.all(by.xpath("//div[@class='ecb-activityBoxContent']//p[5]")).then(function(items){
        expect(items[0].getText()).toContain("Autopay is turned off");
        browser.sleep(3000);
    });
});

it('Cleanup-Delete Payment Card',function(){
browser.refresh();
browser.sleep(7000);

element(by.xpath(testdata3.PaymentMethods.ViewAll_PaymentMethods)).click();
browser.sleep(10000);
//clean-up
element.all(by.xpath(testdata3.PaymentMethods.ViewAllPaymentMethods_Remove_Button)).then(function(items) {
items[0].click();
});
browser.sleep(3000);
element(by.xpath(testdata3.PaymentMethods.Delete_button)).click();
browser.sleep(5000);

// Log Out from Application
browser.findElement(by.xpath(testdata3.SystemBar.Logout)).click();
browser.sleep(12000);

});

});
