
var HtmlReporter = require("protractor-html-screenshot-reporter");
var testdata = require('../inputs/testdata/paymentmethods.json');


describe('UI Baseline App', function() {
  
    
    it('should contain  payment methods',function(){ 
         browser.sleep(3000);
         
            var widget =  element(by.xpath("//ecb-payment-methods[@class='ng-isolate-scope']/div"));
    widget.isPresent().then(function(result) {
    if ( result ) {
      expect(element(by.xpath("//ecb-payment-methods[@class='ng-isolate-scope']/div/div[1]/h2")).getText()).toEqual(testdata.widgetname);
   
              
         var widget= element(by.xpath("//ecb-payment-methods[@class='ng-isolate-scope']/div/div[1]/h2"));
     browser.executeScript('arguments[0].scrollIntoView()',widget.getWebElement());
        // interactive cards
       var cards = element(by.xpath("//ecb-payment-methods/div/div[2]/div[1]"));
       cards.isPresent().then(function(result) {
           if ( result ) {
               console.log('cards are present');
           
          browser.actions().mouseMove(element(by.xpath("//div[@class='content widget-content-list ecb-expandPaymentsMethodBody ng-scope']/div[@ng-if='vm.paymentMethods'][1]"))).perform();
            var cardtype=   element(by.xpath("//div[@ng-if='vm.paymentMethods'][1]/div[1]/div/div[1]/span/i/b[contains(text(),'VISA')]"));
          cardtype.isPresent().then(function(result) {
            if ( result ) {
              console.log('It is visa card');
               element(by.xpath("//span[contains(text(),testdata.remove)]")).isPresent();
            
               element(by.xpath("//div[@ng-if='vm.paymentMethods'][1]/div[1]/div[@class='ecb-paymentOptions ng-scope']/ul/li[3]/button/span")).click();
             // warning is present or not while removing
             browser.actions().mouseMove(element(by.xpath("//span[contains(text(),'Delete Confirmation')]"))).perform();
             browser.sleep(1000);
                element(by.xpath("//div[@class='cancel-payment active']/div/div[1]/div[2]/div[2]/i")).isPresent();
                element(by.xpath("//div[@class='cancel-payment active']/div/div[1]/div[2]/div[2]/i/span")).isPresent();
                    
             //   validation
                     element(by.xpath("//div[@class='cancel-payment active']/div/div[2]/button[1]")).isPresent();
                 element(by.xpath("//div[@class='cancel-payment active']/div/div[2]/button[2]")).isPresent();
              element(by.xpath("//div[@class='cancel-payment active']/div/div[2]/button[1]")).click();
              browser.sleep(1000);
               } else {
                 console.log('It is master card or ach card');
                 var achcard = element(by.xpath("//ecb-payment-methods/div/div[2]/div[1]/div[3]/div/div[1]/span[contains(text(),'N/A')]"));
                 achcard.isPresent().then(function(result) {
                   if ( result ) {
                     console.log('it is ach card');
          var remove = element(by.xpath("//ecb-payment-methods/div/div[2]/div[1]/div[3]/div[2]/ul/li[3]/button[@disabled='disabled']"));
          remove.isPresent().then(function(result) {
            if ( result ){
              console.log('May be payment is scheduled for ach card so it cannot be removed');
            
            } else {
              element(by.xpath("//div[@ng-if='vm.paymentMethods'][1]/div[3]/div[@class='ecb-paymentOptions ng-scope']/ul/li[3]/button/span")).click();
              // warning is present or not while removing
              browser.actions().mouseMove(element(by.xpath("//span[contains(text(),'Delete Confirmation')]"))).perform();
              browser.sleep(1000);
                 element(by.xpath("//div[@class='cancel-payment active']/div/div[1]/div[2]/div[2]/i")).isPresent();
                 element(by.xpath("//div[@class='cancel-payment active']/div/div[1]/div[2]/div[2]/i/span")).isPresent();
                      
              // yes and no validation
                      element(by.xpath("//div[@class='cancel-payment active']/div/div[2]/button[1]")).isPresent();
                  element(by.xpath("//div[@class='cancel-payment active']/div/div[2]/button[2]")).isPresent();
               element(by.xpath("//div[@class='cancel-payment active']/div/div[2]/button[1]")).click();
               browser.sleep(1000);  
            }
          });
                   }
                   else {
                     console.log('It is master card');
                     element(by.xpath("//span[contains(text(),testdata.remove)]")).isPresent();
            
               element(by.xpath("//div[@ng-if='vm.paymentMethods'][1]/div[1]/div[@class='ecb-paymentOptions ng-scope']/ul/li[3]/button/span")).click();
             // warning is present or not while removing
             browser.actions().mouseMove(element(by.xpath("//span[contains(text(),'Delete Confirmation')]"))).perform();
             browser.sleep(1000);
                element(by.xpath("//div[@class='cancel-payment active']/div/div[1]/div[2]/div[2]/i")).isPresent();
                element(by.xpath("//div[@class='cancel-payment active']/div/div[1]/div[2]/div[2]/i/span")).isPresent();
                       
             //   validation
                     element(by.xpath("//div[@class='cancel-payment active']/div/div[2]/button[1]")).isPresent();
                 element(by.xpath("//div[@class='cancel-payment active']/div/div[2]/button[2]")).isPresent();
              element(by.xpath("//div[@class='cancel-payment active']/div/div[2]/button[1]")).click();
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