var HtmlReporter = require("protractor-html-screenshot-reporter");

var testdata = require('../inputs/testdata/AccountSettings.json');

describe('UI Baseline App', function () {
  
  it('should scroll down to widget location', function () {
     browser.sleep(2000);
    element(by.xpath("//span[@class='ebBreadcrumbs-arrow']")).click();
    element(by.xpath("//div[@class='ebBreadcrumbs-list ecb-navOn']/ul/li[4]")).click();
    browser.sleep(3000);
    var el = element(by.xpath("//h2[contains(text(),'Account Settings')]"));
    browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
  });

  it("Automatic pay off",function(){
    var Automaticpayoff = element(by.xpath("//div[@ng-if='vm.autoPayoff']")).isPresent().then(function(result){
      if ( result ) {
        element(by.xpath("//div[@ng-if='vm.autoPayoff']/button")).click();
        //expect(element(by.xpath("//form[@name='paymentSetupForm']")).isDisplayed()).toBe(true);
        var automaticpaymenton = element(by.xpath("//ul[@class='list-unstyled']/li[1]/label/input[@checked='checked']"));
        automaticpaymenton.isPresent().then(function (result){
          if (result) {
        element(by.xpath("//ul[@class='list-unstyled']/li[2]/label/input")).click();
        element(by.xpath("//div[@class='modal-header']/div[@class='pull-right']/button[1]")).click();
        browser.sleep(2000);
        expect(element(by.xpath("//div[@ng-if='vm.autoPayoff']/button")).getText()).toEqual(testdata.accountSetting1);
        element(by.xpath("//div[@ng-if='vm.autoPayoff']/button")).click();
        expect(element(by.xpath("//form[@name='paymentSetupForm']")).isDisplayed()).toBe(true);
        element(by.xpath("//ul[@class='list-unstyled']/li[1]/label/input")).click();
        element(by.xpath("//div[@class='modal-header']/div[@class='pull-right']/button[1]")).click();
        expect(element(by.xpath("//div[@ng-if='vm.autoPayoff']/button")).getText()).toEqual(testdata.accountSetting2);
        element(by.xpath("//div[@ng-if='vm.autoPayoff']/button")).click();
        expect(element(by.xpath("//form[@name='paymentSetupForm']")).isDisplayed()).toBe(true);
        element(by.xpath("//div[@class='modal-header']/div[@class='pull-right']/button[2]")).click(); 
        } else {
          console.log('automatic payment is on');
          element(by.xpath("//ul[@class='list-unstyled']/li[1]/label/input")).click();
          element(by.xpath("//div[@class='modal-header']/div[@class='pull-right']/button[1]")).click();
          browser.sleep(2000);
          expect(element(by.xpath("//div[@ng-if='vm.autoPayoff']/button")).getText()).toEqual(testdata.accountSetting1);
          element(by.xpath("//div[@ng-if='vm.autoPayoff']/button")).click();
          expect(element(by.xpath("//form[@name='paymentSetupForm']")).isDisplayed()).toBe(true);
          element(by.xpath("//ul[@class='list-unstyled']/li[2]/label/input")).click();
          browser.sleep(2000);
          element(by.xpath("//div[@class='modal-header']/div[@class='pull-right']/button[1]")).click();
          expect(element(by.xpath("//div[@ng-if='vm.autoPayoff']/button")).getText()).toEqual(testdata.accountSetting2);
          element(by.xpath("//div[@ng-if='vm.autoPayoff']/button")).click();
          expect(element(by.xpath("//form[@name='paymentSetupForm']")).isDisplayed()).toBe(true);
          element(by.xpath("//div[@class='modal-header']/div[@class='pull-right']/button[2]")).click();
        }
      });
      }
      else{
        console.log('Automaticpayoff link  is absent');
      }
    });
  
  });
  it("Paper invoice standards",function(){
    var PaperInvoiceStandard = element(By.xpath("//button[@ng-click='vm.invoiceMethod(vm.accountId)']"));
      PaperInvoiceStandard.isPresent().then(function (result) {
        if (result) {
          expect(element(by.xpath("//button[@ng-click='vm.invoiceMethod(vm.accountId)']")).isDisplayed()).toBe(true);
          expect(element(by.xpath("//button[@ng-click='vm.invoiceMethod(vm.accountId)']/i")).isDisplayed()).toBe(true);
          expect(element(by.xpath("//button[@ng-click='vm.invoiceMethod(vm.accountId)']")).getText()).toEqual(testdata.Invoicemethodbeforechanging);
          element(by.xpath("//button[@ng-click='vm.invoiceMethod(vm.accountId)']")).click();
          expect(element(by.xpath("//h3[@class='modal-title noBorder ng-binding']")).isDisplayed()).toBe(true);
          expect(element(by.xpath("//h3[@class='modal-title noBorder ng-binding']")).getText()).toEqual(testdata.Invoicemethod);
          expect(element(by.xpath("//button[@type='submit']")).isDisplayed()).toBe(true);
          expect(element(by.xpath("//button[@type='button']")).isDisplayed()).toBe(true);
          expect(element(by.xpath("//label[contains(text(),'Paper Invoice')]")).isDisplayed()).toBe(true);
          expect(element(by.xpath("//button[@ng-model='vm.selectedMethod']")).isDisplayed()).toBe(true);
          var attr = element(by.css('.ecb-goGreen')).getAttribute('src');  
          expect(attr).toEqual(testdata.img);
          element(by.xpath("//button[@ng-model='vm.selectedMethod']")).click();
          browser.sleep(2000);
          element(by.xpath("//a[contains(text(),'Paper Invoice')]")).click();         
          element(by.xpath("//button[@type='submit']")).click();
          //expect(element(by.xpath("//div[@class='toast-message']")).isDisplayed()).toBe(true);
          //expect(element(by.xpath("//div[@class='toast-message']")).getText()).toEqual(testdata.Invoicetoastmessage);  
          expect(element(by.xpath("//button[@ng-click='vm.invoiceMethod(vm.accountId)']")).getText()).toEqual(testdata.Invoicemethodafterchanging);  
        } else {
          console.log('Paper Invoice Standard is absent');
        }
      });  
  })
  it('Security Settings', function () {

    var AccountSecurityOn = element(By.xpath("//button[@ng-click='vm.securitySettings(vm.accountId)']"));
    AccountSecurityOn.isPresent().then(function (result) {
      if (result) {
        expect(element(by.xpath("//button[@ng-click='vm.securitySettings(vm.accountId)']")).isDisplayed()).toBe(true);
        expect(element(by.xpath("//button[@ng-click='vm.securitySettings(vm.accountId)']/i")).isDisplayed()).toBe(true);
        element(by.xpath("//button[@ng-click='vm.securitySettings(vm.accountId)']")).click();
        expect(element(by.xpath("//form[@name='securitySettingsForm']")).isDisplayed()).toBe(true); 
        browser.sleep(3000);       
        expect(element(by.xpath("//h3[@class='modal-title noBorder ng-binding']")).isDisplayed()).toBe(true);
        expect(element(by.xpath("//h3[@class='modal-title noBorder ng-binding']")).getText()).toEqual(testdata.securitysettings);
        expect(element(by.xpath("//button[@type='submit']")).isDisplayed()).toBe(true);
        expect(element(by.xpath("//button[@type='button']")).isDisplayed()).toBe(true);
        element(by.xpath("//button[@type='button']")).click();
        element(by.xpath("//button[@ng-click='vm.securitySettings(vm.accountId)']")).click();  
        element(by.xpath("//div[@ng-click='vm.securitySettingsError = false']")).isPresent().then(function(result){
          if(result){
            element(by.xpath("//div[@ng-click='vm.securitySettingsError = false']/i")).click();
          }
          else{
            console.log("element not found")
          }          
        })
        browser.sleep(2000);    
        expect(element(by.xpath("//label[contains(text(),'Security Question')]")).isDisplayed()).toBe(true);
        expect(element(by.xpath("//button[@name='securityQuestion']")).isDisplayed()).toBe(true);
        element(by.xpath("//button[@name='securityQuestion']")).click();
        browser.sleep(2000);
        element(by.xpath("//ul[@class='dropdown-menu filterDropDownBox scrollable-menu country-dropdown-menu']/li[1]/a")).click();
        expect(element(by.xpath("//label[@for='customSecurityQuestion']")).isDisplayed()).toBe(true);
        expect(element(by.xpath("//input[@name='customSecurityQuestion']")).isDisplayed()).toBe(true);
        element(by.xpath("//input[@name='customSecurityQuestion']")).sendKeys(testdata.randomques);
        expect(element(by.xpath("//label[@for='securityAnswer']")).isDisplayed()).toBe(true);
        expect(element(by.xpath("//input[@name='securityAnswer']")).isDisplayed()).toBe(true);
        element(by.xpath("//input[@name='securityAnswer']")).sendKeys(testdata.randomquesansr);
        browser.sleep(2000);
        expect(element(by.xpath("//span[@class='blueLine']")).isDisplayed()).toBe(true);
        expect(element(by.xpath("//div[@class='modal-footer']/label")).isDisplayed()).toBe(true);
        element(by.xpath("//button[@type='submit']")).click();
        browser.sleep(3000);

      

      } else {
        console.log('Security settings is absent');
      }
    });
    
  });
}
);
