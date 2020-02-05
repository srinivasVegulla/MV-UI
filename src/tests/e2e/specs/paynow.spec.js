
var HtmlReporter = require("protractor-html-screenshot-reporter");
var testdata = require('../inputs/testdata/paymentmethods.json');


describe('UI Baseline App', function() {
  
    
    
    it('should contain  payment methods',function(){ 
      
         browser.sleep(3000);
     
             
              
            var widget =  element(by.xpath("//ecb-payment-methods[@class='ng-isolate-scope']/div"));
    widget.isPresent().then(function(result) {
    if ( result ) {
      expect(element(by.xpath("//ecb-payment-methods[@class='ng-isolate-scope']/div/div[1]/h2")).getText()).toEqual(testdata.widgetname);
    
              
         expect(element(by.xpath("//div[@class='ecb-minimalAmountDue']/span")).getText()).toEqual(testdata.totalamount);
         
          var widget= element(by.xpath("//ecb-payment-methods[@class='ng-isolate-scope']/div/div[1]/h2"));
     browser.executeScript('arguments[0].scrollIntoView()',widget.getWebElement());
        
        // interactive cards
       var cards = element(by.xpath("//ecb-payment-methods/div/div[2]/div[1]"));
       cards.isPresent().then(function(result) {
           if ( result ) {
               console.log('cards are present');
         
           // pay now 
               
       browser.actions().mouseMove(element(by.xpath("//div[@class='content widget-content-list ecb-expandPaymentsMethodBody ng-scope']/div[@ng-if='vm.paymentMethods'][1]"))).perform();
        browser.sleep(1000);
           var cardname =  element(by.xpath("//div[@ng-if='vm.paymentMethods'][1]/div[1]/div/div[1]/span/i/b[contains(text(),'VISA')]"));
             cardname.isPresent().then(function(result) {
    if ( result ) {
             
                    element(by.xpath("//div[@ng-if='vm.paymentMethods'][1]/div[1]/div[2]/ul/li[2]/button/span[contains(text(),'Make Payment')]")).click();
                    element(by.xpath("//input[@ng-model='vm.duePaymentAmountPayable']")).clear();
                             
             element(by.xpath("//input[@ng-model='vm.duePaymentAmountPayable']")).sendKeys(testdata.payamount);     
          element(by.xpath("//label[contains(text(),'Pay Using')]")).isPresent();
             element(by.xpath("//button[@id='dropdownMenu2']/span[2]")).click();
              
                
                element(by.xpath("//a[contains(text(),'Existing Payment Method')]")).click();
                element(by.xpath("//label[contains(text(),'Payment Method')]")).isPresent();
                
                 
         
           element(by.xpath("//button[contains(text(),'Pay Now')]")).click();
           element(by.xpath("//p[contains(text(),'Review payment details.')]")).isPresent();
          
           element(by.xpath("//button[@class='btn ebBtn ebBtn_color_darkBlue ng-binding ng-scope']")).click();
          
           browser.sleep(4000);
           var paymenterror = element(by.xpath("//button[@class='btn ebBtn ebBtn_color_darkBlue payment-modal-ok ng-binding']"));
           paymenterror.isPresent().then(function(result) {
            if ( result ) {
            element(by.xpath("//p[contains(text(),'Your Payment has been processed.')]")).isPresent();
            element(by.xpath("//button[@class='btn ebBtn ebBtn_color_darkBlue payment-modal-ok ng-binding']")).click();
    } else{
       console.log('may be there is some error payments are not working');
       expect(element(by.xpath("//div[@class='row ebDialogBox-primaryTextBox error-primaryText']/p[1]")).isDisplayed()).toBe(true);
       browser.sleep(2000);
       element(by.xpath("//i[@ng-click='vm.cancel()']")).click();
       browser.sleep(4000);
    }
  });
            expect(element(by.xpath("//div[@class='ecb-minimalAmountDue']/span")).getText()).toEqual(testdata.totalamount1);
              browser.sleep(1000); 
    }      
      else 
      {  
        
            
              console.log('this is ach card or master card'); 
              var achcard = element(by.xpath("//ecb-payment-methods/div/div[2]/div[1]/div[3]/div/div[1]/span[2][contains(text(),'N/A')]"));
              achcard.isPresent().then(function(result) {
    if ( result ) {
           element(by.xpath("//div[@ng-if='vm.paymentMethods'][1]/div[3]/div[2]/ul/li[2]/button/span")).click();
                    element(by.xpath("//input[@ng-model='vm.duePaymentAmountPayable']")).clear();
                             
             element(by.xpath("//input[@ng-model='vm.duePaymentAmountPayable']")).sendKeys(testdata.payamount);     
          element(by.xpath("//label[contains(text(),'Pay Using')]")).isPresent();
             element(by.xpath("//button[@id='dropdownMenu2']/span[2]")).click();
              
                element(by.xpath("//a[contains(text(),'Existing Payment Method')]")).click();
                element(by.xpath("//label[contains(text(),'Payment Method')]")).isPresent();
                
                
         
           element(by.xpath("//button[contains(text(),'Pay Now')]")).click();
           element(by.xpath("//p[contains(text(),'Review payment details.')]")).isPresent();
       
       element(by.xpath("//div[@class='ecb-terms-inputBox']/input")).click();
           
           element(by.xpath("//button[@class='btn ebBtn ebBtn_color_darkBlue ng-binding ng-scope']")).click();
          browser.sleep(4000);
          var paymenterror = element(by.xpath("//button[@class='btn ebBtn ebBtn_color_darkBlue payment-modal-ok ng-binding']"));
          paymenterror.isPresent().then(function(result) {
           if ( result ) {
           element(by.xpath("//p[contains(text(),'Your Payment has been processed.')]")).isPresent();
           element(by.xpath("//button[@class='btn ebBtn ebBtn_color_darkBlue payment-modal-ok ng-binding']")).click();
   } else{
      console.log('may be there is some error payments are not working');
      expect(element(by.xpath("//div[@class='row ebDialogBox-primaryTextBox error-primaryText']/p[1]")).isDisplayed()).toBe(true);
      browser.sleep(2000);
      element(by.xpath("//i[@ng-click='vm.cancel()']")).click();
      browser.sleep(4000);
   }
 });
           
           
            expect(element(by.xpath("//div[@class='ecb-minimalAmountDue']/span")).getText()).toEqual(testdata.totalamount1);
              browser.sleep(1000); 
    } else {
      console.log('It is master card');
      element(by.xpath("//div[@ng-if='vm.paymentMethods'][1]/div[1]/div[2]/ul/li[2]/button/span[contains(text(),'Make Payment')]")).click();
                    element(by.xpath("//input[@ng-model='vm.duePaymentAmountPayable']")).clear();
                             
             element(by.xpath("//input[@ng-model='vm.duePaymentAmountPayable']")).sendKeys(testdata.payamount);     
          element(by.xpath("//label[contains(text(),'Pay Using')]")).isPresent();
              element(by.xpath("//button[@id='dropdownMenu2']/span[2]")).click();
              
              
                
                element(by.xpath("//a[contains(text(),'Existing Payment Method')]")).click();
                element(by.xpath("//label[contains(text(),'Payment Method')]")).isPresent();
                
           element(by.xpath("//button[contains(text(),'Pay Now')]")).click();
           element(by.xpath("//p[contains(text(),'Review payment details.')]")).isPresent();
          
           element(by.xpath("//button[@class='btn ebBtn ebBtn_color_darkBlue ng-binding ng-scope']")).click();
          browser.ignoreSynchronization = true;
          browser.waitForAngular();
           browser.sleep(4000);
           var paymenterror = element(by.xpath("//button[@class='btn ebBtn ebBtn_color_darkBlue payment-modal-ok ng-binding']"));
           paymenterror.isPresent().then(function(result) {
            if ( result ) {
            element(by.xpath("//p[contains(text(),'Your Payment has been processed.')]")).isPresent();
            element(by.xpath("//button[@class='btn ebBtn ebBtn_color_darkBlue payment-modal-ok ng-binding']")).click();
    } else{
       console.log('may be there is some error payments are not working');
       expect(element(by.xpath("//div[@class='row ebDialogBox-primaryTextBox error-primaryText']/p[1]")).isDisplayed()).toBe(true);
       browser.sleep(2000);
       element(by.xpath("//i[@ng-click='vm.cancel()']")).click();
       browser.sleep(4000);
    }
  });
            expect(element(by.xpath("//div[@class='ecb-minimalAmountDue']/span")).getText()).toEqual(testdata.totalamount1);
              browser.sleep(1000); 
    }
              });
    }
     
          });
          
          } else {
             console.log('cards are not present');
           }
       });
       }else {
        console.log('widget is absent');
        }
        });   
          
   });

}
);     
           