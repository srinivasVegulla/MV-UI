
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
              var cardtype=   element(by.xpath("//ecb-payment-methods/div/div[2]/div[1]/div[1]/div[1]/div[1]/span/i/b[contains(text(),'MASTERCARD')]"));
          cardtype.isPresent().then(function(result) {
            if ( result ) {
               expect(element(by.xpath("//div[@ng-if='vm.paymentMethods'][1]/div[1]/div/div[3]/span[2]")).getText()).toEqual(testdata.expirydate);
             element(by.xpath("//span[contains(text(),testdata.edit)]")).isPresent();
              element(by.xpath("//span[contains(text(),testdata.makepayment)]")).isPresent();
               element(by.xpath("//span[contains(text(),testdata.remove)]")).isPresent();
               var edit = element(by.xpath("//div[@ng-if='vm.paymentMethods'][1]/div[1]/div[@class='ecb-paymentOptions ng-scope']/ul/li[1]/button[@disabled='disabled']"));
               edit.isPresent().then(function(result) {
                 if ( result ) {
                 console.log('edit is disabled for this card,may be payment is scheduled for this card');
                 }   else {
                                 
               element(by.xpath("//div[@ng-if='vm.paymentMethods'][1]/div[1]/div[@class='ecb-paymentOptions ng-scope']/ul/li[1]/button/span")).click();
               
                browser.actions().mouseMove(element(by.xpath("//div[@class='modal-content ecb-contentPaymentPopup']"))).perform();
            element(by.xpath("//button[contains(text(),'Yes')]")).isPresent();
            
            element(by.xpath("//button[contains(text(),'No')]")).isPresent();
           element(by.xpath("//div[@class='modal fade ecb-modalPaymentPopup in']/div[@class='modal-dialog']/div/div[3]/button[1]")).click();
           
            browser.sleep(3000);
            browser.ignoreSynchronization = true; 
            
            var cybersource= element(by.xpath("//div[@class='review_container group']/h1"));
            cybersource.isPresent().then(function(result) {
              if ( result ) {
                
            expect(element(by.xpath("//div[@class='review_container group']/h1")).getText()).toEqual(testdata.cyberpage);
             element(by.xpath("//h3[contains(text(),'Billing Address')]")).isPresent();
              element(by.xpath("//input[@value='Edit Address']")).isPresent();
             element(by.xpath("//h3[contains(text(),'Payment Details')]")).isPresent();
           element(by.xpath("//input[@value='Edit Details']")).isPresent();
            element(by.xpath("//input[@value='Edit Address']")).click();
            browser.sleep(2000);
             expect(element(by.xpath("//div[@class='left_column updateCheckBox']/h1")).getText()).toEqual('Billing Information');
               element(by.xpath("//label[contains(text(),'Phone Number *')]")).isPresent();
               element(by.xpath("//div[@class='left_column updateCheckBox']/fieldset[3]/ol/li[1]/input")).clear();
               browser.sleep(1000);
            element(by.xpath("//div[@class='left_column updateCheckBox']/fieldset[3]/ol/li[1]/input")).sendKeys(testdata.phno);
            browser.sleep(1000);
             browser.actions().mouseMove(element(by.xpath("//div[@id='payment_details']/h1"))).perform();
              element(by.xpath("//label[contains(text(),'CVN *')]")).isPresent();
              element(by.xpath("//li[@id='card_cvn_line']/input[1]")).isPresent();
              element(by.xpath("//li[@id='card_cvn_line']/input[2]")).click();
              browser.sleep(1000);
             element(by.xpath("//li[@id='card_cvn_line']/input[2]")).sendKeys(testdata.cvnno);
             // expiration date edit
             element(by.xpath("//select[@name='card_expiry_month']")).click();
             element(by.xpath("//select[@name='card_expiry_month']/option[5]")).click();
          
             element(by.xpath("//select[@name='card_expiry_year']")).click();
             element(by.xpath("//select[@name='card_expiry_year']/option[5]")).click();
             element(by.xpath("//input[@value='Next']")).isPresent();
             // cancel validation
              element(by.xpath("//div[@class='echeck_dialog']/input[1]")).isPresent();
              //next validation
              element(by.xpath("//input[@value='Next']")).click();
              browser.sleep(1000);
              browser.ignoreSynchronization = true; 
              
             element(by.xpath("//input[@name='commit']")).click();
          
            
                browser.ignoreSynchronization = true;
      browser.waitForAngular();
      
       browser.sleep(10000);
             
            expect(browser.getTitle()).toEqual(testdata.url.DashBoard);
          
           
            browser.sleep(2000);
             browser.actions().mouseMove(element(by.xpath("//div[@class='content widget-content-list ecb-expandPaymentsMethodBody ng-scope']/div[@ng-if='vm.paymentMethods'][1]"))).perform();
             expect(element(by.xpath("//div[@ng-if='vm.paymentMethods'][1]/div[1]/div/div[3]/span[2]")).getText()).toEqual(testdata.expirydate1);
             
              }
         else {
              console.log('there is some error in the request contact customer care');
              browser.actions().mouseMove(element(by.xpath("//p[contains(text(),'There was an error launching page to process your request.')]"))).perform();
              element(by.xpath("//p[contains(text(),'Try again after sometime or Contact Customer Service.')]")).isPresent();
              browser.close();
         }   
            });
                 }
               });
                 
               } else {
                 console.log('It is not master card');
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