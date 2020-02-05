
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
      //schedule now
       browser.actions().mouseMove(element(by.xpath("//div[@class='content widget-content-list ecb-expandPaymentsMethodBody ng-scope']/div[@ng-if='vm.paymentMethods'][1]"))).perform();
          var cardname =  element(by.xpath("//div[@ng-if='vm.paymentMethods'][1]/div[1]/div/div[1]/span/i/b[contains(text(),'VISA')]"));
             cardname.isPresent().then(function(result) {
    if ( result ) {
             
                   element(by.xpath("//div[@ng-if='vm.paymentMethods'][1]/div[1]/div[@class='ecb-paymentOptions ng-scope']/ul/li[2]/button/span[contains(text(),'Make Payment')]")).click();
                    element(by.xpath("//input[@ng-model='vm.duePaymentAmountPayable']")).clear();
                             
             element(by.xpath("//input[@ng-model='vm.duePaymentAmountPayable']")).sendKeys(testdata.payamountee);     
         
            element(by.xpath("//label[contains(text(),'Pay Using')]")).isPresent();
              
                element(by.xpath("//label[contains(text(),'Payment Method')]")).isPresent();
          
                expect(element(by.xpath("//i[@ng-class='vm.caldendarCheck()']")).isDisplayed()).toBe(true);
                element(by.xpath("//i[@ng-class='vm.caldendarCheck()']")).click();
                browser.sleep(2000);
            // selection of date
            var myDivs = element.all(by.repeater('item in days'));
            myDivs.get(testdata.futuredate).click();
             browser.sleep(2000);
           
           element(by.xpath("//button[contains(text(),'Schedule Now')]")).click();
           // review payment details page
            element(by.xpath("//p[contains(text(),'Review payment details.')]")).isPresent();
            
            // then click schedule now
           element(by.xpath("//button[@class='btn ebBtn ebBtn_color_darkBlue ng-binding ng-scope']")).click();
           browser.sleep(3000);
           
       
           
            element(by.xpath("//p[contains(text(),'Your Payment has been processed.')]")).isPresent();
            element(by.xpath("//button[@class='btn ebBtn ebBtn_color_darkBlue payment-modal-ok ng-binding']")).click();
            browser.sleep(1000);
           
            
            
    }   
    
            else {
               console.log('it is ach card or master card');
        var achcard = element(by.xpath("//ecb-payment-methods/div/div[2]/div[1]/div[3]/div/div[1]/span[2][contains(text(),'N/A')]"));
              achcard.isPresent().then(function(result) {
    if ( result ) {
              element(by.xpath("//div[@ng-if='vm.paymentMethods'][1]/div[3]/div[@class='ecb-paymentOptions ng-scope']/ul/li[2]/button/span")).click();
                    element(by.xpath("//input[@ng-model='vm.duePaymentAmountPayable']")).clear();
                             
             element(by.xpath("//input[@ng-model='vm.duePaymentAmountPayable']")).sendKeys(testdata.payamountee);     
         
            element(by.xpath("//label[contains(text(),'Pay Using')]")).isPresent();
              
                element(by.xpath("//label[contains(text(),'Payment Method')]")).isPresent();
          
                expect(element(by.xpath("//i[@ng-class='vm.caldendarCheck()']")).isDisplayed()).toBe(true);
                element(by.xpath("//i[@ng-class='vm.caldendarCheck()']")).click();
                browser.sleep(2000);
            // selection of date
            var myDivs = element.all(by.repeater('item in days'));
            myDivs.get(testdata.futuredate).click();
             browser.sleep(2000);
           
           element(by.xpath("//button[contains(text(),'Schedule Now')]")).click();
           // review payment details page
            element(by.xpath("//p[contains(text(),'Review payment details.')]")).isPresent();
             element(by.xpath("//div[@class='ecb-terms-inputBox']/input")).click();
           
           element(by.xpath("//button[@class='btn ebBtn ebBtn_color_darkBlue ng-binding ng-scope']")).click();
          browser.sleep(3000);
               element(by.xpath("//p[contains(text(),'Your Payment has been processed.')]")).isPresent();
            element(by.xpath("//button[@class='btn ebBtn ebBtn_color_darkBlue payment-modal-ok ng-binding']")).click();
            browser.sleep(1000);
           
            
    } else {
      console.log('It is master card');
        element(by.xpath("//div[@ng-if='vm.paymentMethods'][1]/div[1]/div[@class='ecb-paymentOptions ng-scope']/ul/li[2]/button/span[contains(text(),'Make Payment')]")).click();
                    element(by.xpath("//input[@ng-model='vm.duePaymentAmountPayable']")).clear();
                             
             element(by.xpath("//input[@ng-model='vm.duePaymentAmountPayable']")).sendKeys(testdata.payamountee);     
         
            element(by.xpath("//label[contains(text(),'Pay Using')]")).isPresent();
              
                element(by.xpath("//label[contains(text(),'Payment Method')]")).isPresent();
          
                expect(element(by.xpath("//i[@ng-class='vm.caldendarCheck()']")).isDisplayed()).toBe(true);
                element(by.xpath("//i[@ng-class='vm.caldendarCheck()']")).click();
                browser.sleep(2000);
            // selection of date
            var myDivs = element.all(by.repeater('item in days'));
            myDivs.get(testdata.futuredate).click();
             browser.sleep(2000);
           
           element(by.xpath("//button[contains(text(),'Schedule Now')]")).click();
           // review payment details page
            element(by.xpath("//p[contains(text(),'Review payment details.')]")).isPresent();
            
            // then click schedule now
           element(by.xpath("//button[@class='btn ebBtn ebBtn_color_darkBlue ng-binding ng-scope']")).click();
           browser.sleep(3000);
           
       
           
            element(by.xpath("//p[contains(text(),'Your Payment has been processed.')]")).isPresent();
            element(by.xpath("//button[@class='btn ebBtn ebBtn_color_darkBlue payment-modal-ok ng-binding']")).click();
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
                 