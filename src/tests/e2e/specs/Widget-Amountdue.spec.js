var HtmlReporter = require("protractor-html-screenshot-reporter");

var testdata = require('../inputs/testdata/Amountdue.json');

describe('UI Baseline App', function() {
  

   
    it('Validate Amountdue widget',function() {
      browser.sleep(3000);
      
  
      var el = element(by.xpath("//ecb-total-amount-due[@class='ng-isolate-scope']/div/div/h2"));
      browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
     expect(element(by.xpath("//ecb-total-amount-due[@class='ng-isolate-scope']/div/div/h2")).isDisplayed()).toBe(true);
     expect(element(by.xpath("//ecb-total-amount-due[@class='ng-isolate-scope']/div/div/h2")).getText()).toEqual(testdata.widgetname);
   
     expect(element(by.xpath("//button[@id='makePayment']")).isDisplayed()).toBe(true);
     expect(element(by.xpath("//button[@id='makePayment']")).getText()).toEqual(testdata.makepayment);
     expect(element(by.xpath("//div[@class='total-due']/p")).isDisplayed()).toBe(true);
     expect(element(by.xpath("//div[@class='total-due']/p")).getText()).toEqual(testdata.widgetname);
     
     expect(element(by.xpath("//div[@class='total-due']/span")).isDisplayed()).toBe(true);
 
     var paymentdue =  element(By.xpath("//div[@class='payment-due']"));
    paymentdue.isPresent().then(function(result) {
    if ( result ) {
      expect(element(by.xpath("//div[@class='payment-due']/p")).isDisplayed()).toBe(true);
      expect(element(by.xpath("//div[@class='payment-due']/div[1]/span")).getText()).toEqual(testdata.date);
      expect(element(by.xpath("//div[@class='payment-due']/div[2]/span")).getText()).toEqual(testdata.year);
      
      var paymentdue =  element(By.xpath("//ecb-total-amount-due/div/div[2]/div[2]/div/ul/li[2]/span"));
       paymentdue.isPresent().then(function(result) { 
      
      if(result){
            expect(element(by.xpath("//div[@class='total-due']/span")).getText()).toEqual(testdata.amount);
             expect(element(by.xpath("//ecb-total-amount-due[@class='ng-isolate-scope']/div/div[2]/div[2]/div/ul/li[3]/button")).getText()).toEqual(testdata.paymentstatus);
       expect(element(by.xpath("//ecb-total-amount-due[@class='ng-isolate-scope']/div/div[2]/div[2]/div/ul/li[1]/button")).isDisplayed()).toBe(true); 
       expect(element(by.xpath("//ecb-total-amount-due[@class='ng-isolate-scope']/div/div[2]/div[2]/div/ul/li[1]/button")).getText()).toEqual(testdata.automaticpayment);
      expect(element(by.xpath("//ecb-total-amount-due[@class='ng-isolate-scope']/div/div[2]/div[2]/div/ul/li[1]/button/i")).isDisplayed()).toBe(true); 
       expect(element(by.xpath("//ecb-total-amount-due[@class='ng-isolate-scope']/div/div[2]/div[2]/div/ul/li[2]/span")).isDisplayed()).toBe(true); 
       expect(element(by.xpath("//ecb-total-amount-due[@class='ng-isolate-scope']/div/div[2]/div[2]/div/ul/li[2]/span")).getText()).toEqual(testdata.paymentmethod);
       //element(By.xpath("//span[@ng-click='bm.closePopup()']")).click();
       browser.actions().mouseMove(element(by.xpath("//ecb-total-amount-due[@class='ng-isolate-scope']/div/div[2]/div[2]/div/ul/li[3]/button"))).perform();
         browser.sleep(2000);
         browser.actions().mouseMove(element(by.xpath("//ecb-billadjustment-popup/div/div/h3"))).perform();
         browser.sleep(2000);
     //expect(element(by.xpath("//div[@class='ecb-billadjustment-popup']/h3")).isDisplayed()).toBe(true);
     //expect(element(by.xpath("//div[@class='ecb-billadjustment-popup']/h3")).getText()).toEqual('Payments History');
     var viewallButton =  element(By.xpath("//ecb-billadjustment-popup/div/div/div[3]/button"));
    viewallButton.isPresent().then(function(result) {
    if ( result ) {
     
      element(By.xpath("//ecb-billadjustment-popup/div/div/div[3]/button")).click();         
           browser.sleep(1000);
           element(by.xpath("//button[@id='dropdownMenu2']/span[2]")).click();
           element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[1]/li/div/ul/li/a")).click();
             element(by.xpath("//button[@id='dropdownMenu3']/span")).click();
           element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[2]/li/div/ul/li[4]/a")).click();
           element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[3]/li/div/button")).click();
           element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[3]/li/div/ul/li[2]/a")).click();
           browser.sleep(1000);
           element(by.xpath("//div[@class='ebIcon_filter ecb-widgetsFilterIcon pull-right ng-scope']")).click();
           browser.actions().mouseMove(element(by.xpath("//div[@id='filterModal']/div/div/div[2]/form/div/div/div[1]/label"))).perform();
             browser.sleep(1000);
           element(by.xpath("//button[@ng-disabled='!vm.isDateRange()']")).click();
           browser.sleep(1000);
           
           element(by.xpath("//ecb-total-amount-due/div/div[1]/div/div/div/div[1]/i")).click();
           browser.sleep(1000);
           element(by.xpath("//span[@class='ebIcon_settings ecb-headerIcons']")).click();
           browser.actions().mouseMove(element(by.xpath("//ecb-total-amount-due/div/div[2]/div[1]/div[1]/span[2]/b"))).perform();
           element(by.xpath("//a[@ng-click='vm.toggleSelectAll(0)']")).click();
           browser.sleep(1000);
           element(by.xpath("//a[@ng-click='vm.toggleSelectAll(1)']")).click();
           element(by.xpath("//button[@ng-click='vm.applyCancelSettings(1)']")).click();
           element(by.xpath("//ecb-total-amount-due/div/div[1]/div/div[1]/div/div[2]/i")).click();
           element(by.xpath("//ecb-total-amount-due/div/div[1]/span/i")).click();
           browser.sleep(2000);
           expect(browser.getTitle()).toEqual('ECB MetraView : Dashboard');
      
      } else {
        console.log('Payment History viewall is absent');
       
        }
        });
       
      }
      else
      {
      console.log('automatic payment is off');
       expect(element(by.xpath("//ecb-total-amount-due/div/div[2]/div[2]/div/ul/li[2]/button")).getText()).toEqual(testdata.paymentstatus1);
      expect(element(by.xpath("//ecb-total-amount-due[@class='ng-isolate-scope']/div/div[2]/div[2]/div/ul/li[1]/button")).isDisplayed()).toBe(true); 
      expect(element(by.xpath("//ecb-total-amount-due[@class='ng-isolate-scope']/div/div[2]/div[2]/div/ul/li[1]/button")).getText()).toEqual(testdata.paymentoff);
      browser.actions().mouseMove(element(by.xpath("//ecb-total-amount-due[@class='ng-isolate-scope']/div/div[2]/div[2]/div/ul/li[2]/button"))).perform();
      browser.sleep(2000);
      browser.actions().mouseMove(element(by.xpath("//ecb-billadjustment-popup/div/div/h3"))).perform();
      browser.sleep(2000);
     //expect(element(by.xpath("//div[@class='ecb-billadjustment-popup']/h3")).isDisplayed()).toBe(true);
     //expect(element(by.xpath("//div[@class='ecb-billadjustment-popup']/h3")).getText()).toEqual('Payments History');
     var viewall =  element(By.xpath("//ecb-billadjustment-popup/div/div/div[3]/button"));
    viewall.isPresent().then(function(result) {
    if ( result ) { 
      viewall.click();
      browser.sleep(1000);      
      
      element(by.xpath("//button[@id='dropdownMenu2']/span[2]")).click();
      element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[1]/li/div/ul/li/a")).click();
        element(by.xpath("//button[@id='dropdownMenu3']/span")).click();
      element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[2]/li/div/ul/li[4]/a")).click();
      element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[3]/li/div/button")).click();
      element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[3]/li/div/ul/li[2]/a")).click();
      browser.sleep(1000);
      element(by.xpath("//div[@class='ebIcon_filter ecb-widgetsFilterIcon pull-right ng-scope']")).click();
      browser.actions().mouseMove(element(by.xpath("//div[@id='filterModal']/div/div/div[2]/form/div/div/div[1]/label"))).perform();
        browser.sleep(1000);
      element(by.xpath("//button[@ng-disabled='!vm.isDateRange()']")).click();
      browser.sleep(2000);
      
      element(by.xpath("//ecb-total-amount-due/div/div[1]/div/div/div/div[1]/i")).click();
      browser.sleep(1000);
      element(by.xpath("//span[@class='ebIcon_settings ecb-headerIcons']")).click();
      browser.actions().mouseMove(element(by.xpath("//ecb-total-amount-due/div/div[2]/div[1]/div[1]/span[2]/b"))).perform();
      element(by.xpath("//a[@ng-click='vm.toggleSelectAll(0)']")).click();
      browser.sleep(1000);
      element(by.xpath("//a[@ng-click='vm.toggleSelectAll(1)']")).click();
      element(by.xpath("//button[@ng-click='vm.applyCancelSettings(1)']")).click();
      element(by.xpath("//ecb-total-amount-due/div/div[1]/div/div[1]/div/div[2]/i")).click();
      element(by.xpath("//ecb-total-amount-due/div/div[1]/span/i")).click();
      browser.sleep(2000);
        expect(browser.getTitle()).toEqual('ECB MetraView : Dashboard');     
      
      } else {
        console.log('Payment History viewall is absent');
        //element(By.xpath("//span[@ng-click='bm.closePopup()']")).click();
        }
        });
      }
    });


      
    } 
    else {
        console.log('Amount due is not greater than zero');
        }
    });
    var el = element(by.xpath("//ecb-total-amount-due[@class='ng-isolate-scope']/div/div/h2"));
      browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
   // element(by.xpath("//ecb-total-amount-due[@class='ng-isolate-scope']/div/div/button")).click();
    //browser.switchTo().form(element(By.xpath("//div[@class='modal-dialog']/div/form")));
    expect(element(By.xpath("//button[contains(text(),'Make a Payment')]")).isDisplayed()).toBe(true);
    browser.sleep(2000);
    
    
    element(By.xpath("//button[contains(text(),'Make a Payment')]")).click();
    var amountvalue =  element(By.xpath("//label[contains(text(),'Payment Method')]"));
    amountvalue.isPresent().then(function(result) {
    if ( result ) {
      element(By.xpath("//input[@id='amountValue']")).clear();
      browser.sleep(2000);
      element(By.xpath("//input[@id='amountValue']")).sendKeys('1');
     
     element(by.xpath("//div[@class='pull-right']/button[1]")).click();
     browser.sleep(2000);
     
     var ach = element(by.xpath("//div[@class='ecb-terms-inputBox']/label"));
     ach.isPresent().then(function(result) {
       if (result) {
         element(by.xpath("//div[@class='ecb-terms-inputBox']/input")).click();
         element(by.xpath("//button[@ng-disabled='!vm.authorizeCheck']")).click();
         browser.sleep(2000);
         element(by.xpath("//button[@class='btn ebBtn ebBtn_color_darkBlue payment-modal-ok ng-binding']")).click();
       }
       else {
     element(by.xpath("//button[@class='btn ebBtn ebBtn_color_darkBlue ng-binding ng-scope']")).click();
     
     
    
     browser.ignoreSynchronization = true;
     browser.waitForAngular();
     browser.sleep(5000);
    
     var paymenterror =  element(by.xpath("//button[@class='btn ebBtn ebBtn_color_darkBlue payment-modal-ok ng-binding']"));
     paymenterror.isPresent().then(function(result) {
      if ( result ) {
        browser.actions().mouseMove(element(by.xpath("//p[contains(text(),'Your Payment has been processed.')]"))).perform();
        browser.sleep(1000);
      
        element(by.xpath("//button[@class='btn ebBtn ebBtn_color_darkBlue payment-modal-ok ng-binding']")).click();
     browser.sleep(4000);
      } else{
 console.log('may be there is some error payments are not working');
 expect(element(by.xpath("//div[@class='row ebDialogBox-primaryTextBox error-primaryText']/p[1]")).isDisplayed()).toBe(true);
 browser.sleep(2000);
 element(by.xpath("//i[@ng-click='vm.cancel()']")).click();
 browser.sleep(4000);
}
});
    
     expect(element(by.xpath("//div[@class='total-due']/span")).getText()).toEqual(testdata.amount1);
     
       }
     });
      
     
    } else {
         
       console.log('there is no payment method to make payment');
      
         
        
        }
    });
   
                });
}
); 