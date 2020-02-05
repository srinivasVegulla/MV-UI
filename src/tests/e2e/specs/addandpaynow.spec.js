
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
         // add and pay now
           
           browser.actions().mouseMove(element(by.xpath("//div[@class='content widget-content-list ecb-expandPaymentsMethodBody ng-scope']/div[@ng-if='vm.paymentMethods'][1]"))).perform();
            var cardname =  element(by.xpath("//div[@ng-if='vm.paymentMethods'][1]/div[1]/div/div[1]/span/i/b[contains(text(),'VISA')]"));
             cardname.isPresent().then(function(result) {
    if ( result ) {
             
                   element(by.xpath("//div[@ng-if='vm.paymentMethods'][1]/div[1]/div[@class='ecb-paymentOptions ng-scope']/ul/li[2]/button/span[contains(text(),'Make Payment')]")).click();
                   browser.sleep(1000);
                    element(by.xpath("//input[@ng-model='vm.duePaymentAmountPayable']")).clear();
                             
             element(by.xpath("//input[@ng-model='vm.duePaymentAmountPayable']")).sendKeys(testdata.payamounte);     
          element(by.xpath("//label[contains(text(),'Pay Using')]")).isPresent();
               element(by.xpath("//button[@id='dropdownMenu2']/span[2]")).click();
              
                
                element(by.xpath("//a[contains(text(),'New Payment Method')]")).click();
                 element(by.xpath("//input[@class='ecb-saveFutureUse ng-pristine ng-untouched ng-valid ng-not-empty']")).isPresent();
               element(by.xpath("//button[contains(text(),'Add and Pay Now')]")).click();
                
              element(by.xpath("//p[contains(text(),'Review payment details.')]")).isPresent();
              element(by.xpath("//button[@ng-disabled='!vm.authorizeCheck']")).click();
               browser.actions().mouseMove(element(by.xpath("//div[@class='modal-content ecb-contentPaymentPopup']"))).perform();
            element(by.xpath("//button[contains(text(),'Yes')]")).isPresent();
            
            element(by.xpath("//button[contains(text(),'No')]")).isPresent();
           element(by.xpath("//div[@class='modal fade ecb-modalPayPopup ng-scope in']/div[@class='modal-dialog']/div/div[3]/button[1]")).click();
            browser.ignoreSynchronization = true;
      browser.waitForAngular();
      
       browser.sleep(1000);
       // if not redirecting to cybersource validation
            var cybersource= element(by.xpath("//h1[contains(text(),'How would you like to pay?')]"));
            cybersource.isPresent().then(function(result) {
              if ( result ) {
      
       browser.actions().mouseMove(element(by.xpath("//li[@class='card option four']"))).perform();
       element(by.xpath("//button[@id='_001']")).click();
      expect(element(by.xpath("//div[@class='left_column updateCheckBox']/h1")).getText()).toEqual('Billing Information');
            element(by.xpath("//input[@id='bill_to_forename']")).clear();
           element(by.xpath("//input[@id='bill_to_forename']")).sendKeys(testdata.name);
           element(by.xpath("//input[@id='bill_to_surname']")).clear();
           element(by.xpath("//input[@id='bill_to_surname']")).sendKeys(testdata.surname);
            element(by.xpath("//input[@id='bill_to_company_name']")).clear();
           element(by.xpath("//input[@id='bill_to_company_name']")).sendKeys(testdata.companyname);
           element(by.xpath("//input[@id='bill_to_address_line1']")).clear();
           element(by.xpath("//input[@id='bill_to_address_line1']")).sendKeys(testdata.address1);
           element(by.xpath("//input[@id='bill_to_address_line2']")).clear();
           element(by.xpath("//input[@id='bill_to_address_line2']")).sendKeys(testdata.address2);
           element(by.xpath("//input[@id='bill_to_address_city']")).clear();
           element(by.xpath("//input[@id='bill_to_address_city']")).sendKeys(testdata.city);
           element(by.xpath("//select[@id='bill_to_address_country']")).click();
           element(by.xpath("//select[@id='bill_to_address_country']/option[5]")).click();
          element(by.xpath("//input[@id='bill_to_address_state']")).clear();
          element(by.xpath("//input[@id='bill_to_address_state']")).sendKeys(testdata.state);
          element(by.xpath("//input[@id='bill_to_address_postal_code']")).clear();
           element(by.xpath("//input[@id='bill_to_address_postal_code']")).sendKeys(testdata.postalcode);
          element(by.xpath("//input[@id='bill_to_phone']")).clear();
          element(by.xpath("//input[@id='bill_to_phone']")).sendKeys(testdata.phno);
          element(by.xpath("//input[@id='bill_to_email']")).clear();
           element(by.xpath("//input[@id='bill_to_email']")).sendKeys(testdata.email);
             
             // card no
            
               
                var widget= element(by.xpath("//h1[@class='single_secure']"));
     browser.executeScript('arguments[0].scrollIntoView()',widget.getWebElement());
             browser.sleep(1000);
                 element(by.xpath("//input[@name='card_number']")).click();
               element(by.xpath("//input[@name='card_number']")).sendKeys(testdata.cardno);
               
              element(by.xpath("//label[contains(text(),'CVN *')]")).isPresent();
              element(by.xpath("//li[@id='card_cvn_line']/input[1]")).isPresent();
              element(by.xpath("//li[@id='card_cvn_line']/input[2]")).click();
             
             element(by.xpath("//li[@id='card_cvn_line']/input[2]")).sendKeys(testdata.cvnno);
             // expiration date edit
             element(by.xpath("//select[@name='card_expiry_month']")).click();
             element(by.xpath("//select[@name='card_expiry_month']/option[8]")).click();
          
             element(by.xpath("//select[@name='card_expiry_year']")).click();
             element(by.xpath("//select[@name='card_expiry_year']/option[8]")).click();
             element(by.xpath("//input[@name='commit']")).click();
             
            
                browser.ignoreSynchronization = true;
      browser.waitForAngular();
      
       browser.sleep(3000);
             
            expect(browser.getTitle()).toEqual(testdata.url.DashBoard);
            browser.sleep(10000);
       
               browser.actions().mouseMove(element(by.xpath("//div[@class='modal-header ng-scope']/h3"))).perform();
               var paymenterror = element(by.xpath("//button[@class='btn ebBtn ebBtn_color_darkBlue payment-modal-ok ng-binding']"));
               paymenterror.isPresent().then(function(result) {
                if ( result ) {
                  element(by.xpath("//button[@class='btn ebBtn ebBtn_color_darkBlue payment-modal-ok ng-binding']")).click();
                  browser.sleep(4000);
                  expect(browser.getTitle()).toEqual(testdata.url.DashBoard);
        } else{
           console.log('may be there is some error payments are not working');
           expect(element(by.xpath("//div[@class='row ebDialogBox-primaryTextBox error-primaryText']/p[1]")).isDisplayed()).toBe(true);
           browser.sleep(2000);
           element(by.xpath("//i[@ng-click='vm.cancel()']")).click();
           browser.sleep(4000);
        }
      });
              
               
              
             }
         else {
              console.log('there is some error in the request contact customer care');
             
              browser.close();
         }   
            });
             
    }
    else {
        console.log('it is ach card or master card');
        var achcard = element(by.xpath("//ecb-payment-methods/div/div[2]/div[1]/div[3]/div/div[1]/span[2][contains(text(),'N/A')]"));
              achcard.isPresent().then(function(result) {
    if ( result ) {
          element(by.xpath("//div[@ng-if='vm.paymentMethods'][1]/div[3]/div[@class='ecb-paymentOptions ng-scope']/ul/li[2]/button/span")).click();
                    element(by.xpath("//input[@ng-model='vm.duePaymentAmountPayable']")).clear();
                             
             element(by.xpath("//input[@ng-model='vm.duePaymentAmountPayable']")).sendKeys(testdata.payamounte);     
          element(by.xpath("//label[contains(text(),'Pay Using')]")).isPresent();
              element(by.xpath("//button[@id='dropdownMenu2']/span[2]")).click();
              
                element(by.xpath("//a[contains(text(),'New Payment Method')]")).click();
                 element(by.xpath("//input[@class='ecb-saveFutureUse ng-pristine ng-untouched ng-valid ng-not-empty']")).isPresent();
               element(by.xpath("//button[contains(text(),'Add and Pay Now')]")).click();
                
              element(by.xpath("//p[contains(text(),'Review payment details.')]")).isPresent();
              element(by.xpath("//button[@ng-disabled='!vm.authorizeCheck']")).click();
               browser.actions().mouseMove(element(by.xpath("//div[@class='modal-content ecb-contentPaymentPopup']"))).perform();
            element(by.xpath("//button[contains(text(),'Yes')]")).isPresent();
            
            element(by.xpath("//button[contains(text(),'No')]")).isPresent();
           element(by.xpath("//div[@class='modal fade ecb-modalPayPopup ng-scope in']/div[@class='modal-dialog']/div/div[3]/button[1]")).click();
            browser.ignoreSynchronization = true;
      browser.waitForAngular();
      
       browser.sleep(1000);
        var cybersource= element(by.xpath("//h1[contains(text(),'How would you like to pay?')]"));
            cybersource.isPresent().then(function(result) {
              if ( result ) {
       
       browser.actions().mouseMove(element(by.xpath("//li[@class='card option four']"))).perform();
       element(by.xpath("//button[@id='_001']")).click();
      expect(element(by.xpath("//div[@class='left_column updateCheckBox']/h1")).getText()).toEqual('Billing Information');
            element(by.xpath("//input[@id='bill_to_forename']")).clear();
           element(by.xpath("//input[@id='bill_to_forename']")).sendKeys(testdata.name);
           element(by.xpath("//input[@id='bill_to_surname']")).clear();
           element(by.xpath("//input[@id='bill_to_surname']")).sendKeys(testdata.surname);
            element(by.xpath("//input[@id='bill_to_company_name']")).clear();
           element(by.xpath("//input[@id='bill_to_company_name']")).sendKeys(testdata.companyname);
           element(by.xpath("//input[@id='bill_to_address_line1']")).clear();
           element(by.xpath("//input[@id='bill_to_address_line1']")).sendKeys(testdata.address1);
           element(by.xpath("//input[@id='bill_to_address_line2']")).clear();
           element(by.xpath("//input[@id='bill_to_address_line2']")).sendKeys(testdata.address2);
           element(by.xpath("//input[@id='bill_to_address_city']")).clear();
           element(by.xpath("//input[@id='bill_to_address_city']")).sendKeys(testdata.city);
           element(by.xpath("//select[@id='bill_to_address_country']")).click();
           element(by.xpath("//select[@id='bill_to_address_country']/option[5]")).click();
          element(by.xpath("//input[@id='bill_to_address_state']")).clear();
          element(by.xpath("//input[@id='bill_to_address_state']")).sendKeys(testdata.state);
          element(by.xpath("//input[@id='bill_to_address_postal_code']")).clear();
           element(by.xpath("//input[@id='bill_to_address_postal_code']")).sendKeys(testdata.postalcode);
          element(by.xpath("//input[@id='bill_to_phone']")).clear();
          element(by.xpath("//input[@id='bill_to_phone']")).sendKeys(testdata.phno);
          element(by.xpath("//input[@id='bill_to_email']")).clear();
           element(by.xpath("//input[@id='bill_to_email']")).sendKeys(testdata.email);
             
             // card no
            
               
                var widget= element(by.xpath("//h1[@class='single_secure']"));
     browser.executeScript('arguments[0].scrollIntoView()',widget.getWebElement());
             browser.sleep(1000);
                 element(by.xpath("//input[@name='card_number']")).click();
               element(by.xpath("//input[@name='card_number']")).sendKeys(testdata.cardno);
               
              element(by.xpath("//label[contains(text(),'CVN *')]")).isPresent();
              element(by.xpath("//li[@id='card_cvn_line']/input[1]")).isPresent();
              element(by.xpath("//li[@id='card_cvn_line']/input[2]")).click();
             
             element(by.xpath("//li[@id='card_cvn_line']/input[2]")).sendKeys(testdata.cvnno);
             // expiration date edit
             element(by.xpath("//select[@name='card_expiry_month']")).click();
             element(by.xpath("//select[@name='card_expiry_month']/option[8]")).click();
          
             element(by.xpath("//select[@name='card_expiry_year']")).click();
             element(by.xpath("//select[@name='card_expiry_year']/option[8]")).click();
             element(by.xpath("//input[@name='commit']")).click();
             
            
                browser.ignoreSynchronization = true;
      browser.waitForAngular();
      
       browser.sleep(3000);
             
            expect(browser.getTitle()).toEqual(testdata.url.DashBoard);
            browser.sleep(10000);
               browser.actions().mouseMove(element(by.xpath("//div[@class='modal-header ng-scope']/h3"))).perform();
               var paymenterror = element(by.xpath("//button[@class='btn ebBtn ebBtn_color_darkBlue payment-modal-ok ng-binding']"));
               paymenterror.isPresent().then(function(result) {
                if ( result ) {
                  element(by.xpath("//button[@class='btn ebBtn ebBtn_color_darkBlue payment-modal-ok ng-binding']")).click();
                  browser.sleep(4000);
                  expect(browser.getTitle()).toEqual(testdata.url.DashBoard);
        } else{
           console.log('may be there is some error payments are not working');
           expect(element(by.xpath("//div[@class='row ebDialogBox-primaryTextBox error-primaryText']/p[1]")).isDisplayed()).toBe(true);
           browser.sleep(2000);
           element(by.xpath("//i[@ng-click='vm.cancel()']")).click();
           browser.sleep(4000);
        }
      });
               
                 }
         else {
              console.log('there is some error in the request contact customer care');
             browser.close();
             
         }   
            });
    
     } else {
      console.log('It is master card');
       element(by.xpath("//div[@ng-if='vm.paymentMethods'][1]/div[1]/div[@class='ecb-paymentOptions ng-scope']/ul/li[2]/button/span[contains(text(),'Make Payment')]")).click();
                    element(by.xpath("//input[@ng-model='vm.duePaymentAmountPayable']")).clear();
                             
             element(by.xpath("//input[@ng-model='vm.duePaymentAmountPayable']")).sendKeys(testdata.payamounte);     
          element(by.xpath("//label[contains(text(),'Pay Using')]")).isPresent();
              element(by.xpath("//button[@id='dropdownMenu2']/span[2]")).click();
              
               
                
                element(by.xpath("//a[contains(text(),'New Payment Method')]")).click();
                 element(by.xpath("//input[@class='ecb-saveFutureUse ng-pristine ng-untouched ng-valid ng-not-empty']")).isPresent();
               element(by.xpath("//button[contains(text(),'Add and Pay Now')]")).click();
                
              element(by.xpath("//p[contains(text(),'Review payment details.')]")).isPresent();
              element(by.xpath("//button[@ng-disabled='!vm.authorizeCheck']")).click();
               browser.actions().mouseMove(element(by.xpath("//div[@class='modal-content ecb-contentPaymentPopup']"))).perform();
            element(by.xpath("//button[contains(text(),'Yes')]")).isPresent();
            
            element(by.xpath("//button[contains(text(),'No')]")).isPresent();
           element(by.xpath("//div[@class='modal fade ecb-modalPayPopup ng-scope in']/div[@class='modal-dialog']/div/div[3]/button[1]")).click();
            browser.ignoreSynchronization = true;
      browser.waitForAngular();
      
       browser.sleep(1000);
       // if not redirecting to cybersource validation
            var cybersource= element(by.xpath("//h1[contains(text(),'How would you like to pay?')]"));
            cybersource.isPresent().then(function(result) {
              if ( result ) {
      
       browser.actions().mouseMove(element(by.xpath("//li[@class='card option four']"))).perform();
       element(by.xpath("//button[@id='_001']")).click();
      expect(element(by.xpath("//div[@class='left_column updateCheckBox']/h1")).getText()).toEqual('Billing Information');
            element(by.xpath("//input[@id='bill_to_forename']")).clear();
           element(by.xpath("//input[@id='bill_to_forename']")).sendKeys(testdata.name);
           element(by.xpath("//input[@id='bill_to_surname']")).clear();
           element(by.xpath("//input[@id='bill_to_surname']")).sendKeys(testdata.surname);
            element(by.xpath("//input[@id='bill_to_company_name']")).clear();
           element(by.xpath("//input[@id='bill_to_company_name']")).sendKeys(testdata.companyname);
           element(by.xpath("//input[@id='bill_to_address_line1']")).clear();
           element(by.xpath("//input[@id='bill_to_address_line1']")).sendKeys(testdata.address1);
           element(by.xpath("//input[@id='bill_to_address_line2']")).clear();
           element(by.xpath("//input[@id='bill_to_address_line2']")).sendKeys(testdata.address2);
           element(by.xpath("//input[@id='bill_to_address_city']")).clear();
           element(by.xpath("//input[@id='bill_to_address_city']")).sendKeys(testdata.city);
           element(by.xpath("//select[@id='bill_to_address_country']")).click();
           element(by.xpath("//select[@id='bill_to_address_country']/option[5]")).click();
          element(by.xpath("//input[@id='bill_to_address_state']")).clear();
          element(by.xpath("//input[@id='bill_to_address_state']")).sendKeys(testdata.state);
          element(by.xpath("//input[@id='bill_to_address_postal_code']")).clear();
           element(by.xpath("//input[@id='bill_to_address_postal_code']")).sendKeys(testdata.postalcode);
          element(by.xpath("//input[@id='bill_to_phone']")).clear();
          element(by.xpath("//input[@id='bill_to_phone']")).sendKeys(testdata.phno);
          element(by.xpath("//input[@id='bill_to_email']")).clear();
           element(by.xpath("//input[@id='bill_to_email']")).sendKeys(testdata.email);
             
             // card no
            
               
                var widget= element(by.xpath("//h1[@class='single_secure']"));
     browser.executeScript('arguments[0].scrollIntoView()',widget.getWebElement());
             browser.sleep(1000);
                 element(by.xpath("//input[@name='card_number']")).click();
               element(by.xpath("//input[@name='card_number']")).sendKeys(testdata.cardno);
               
              element(by.xpath("//label[contains(text(),'CVN *')]")).isPresent();
              element(by.xpath("//li[@id='card_cvn_line']/input[1]")).isPresent();
              element(by.xpath("//li[@id='card_cvn_line']/input[2]")).click();
             
             element(by.xpath("//li[@id='card_cvn_line']/input[2]")).sendKeys(testdata.cvnno);
             // expiration date edit
             element(by.xpath("//select[@name='card_expiry_month']")).click();
             element(by.xpath("//select[@name='card_expiry_month']/option[8]")).click();
          
             element(by.xpath("//select[@name='card_expiry_year']")).click();
             element(by.xpath("//select[@name='card_expiry_year']/option[8]")).click();
             element(by.xpath("//input[@name='commit']")).click();
             
            
                browser.ignoreSynchronization = true;
      browser.waitForAngular();
      
       browser.sleep(3000);
             
            expect(browser.getTitle()).toEqual(testdata.url.DashBoard);
            browser.sleep(10000);
               browser.actions().mouseMove(element(by.xpath("//div[@class='modal-header ng-scope']/h3"))).perform();
               var paymenterror = element(by.xpath("//button[@class='btn ebBtn ebBtn_color_darkBlue payment-modal-ok ng-binding']"));
               paymenterror.isPresent().then(function(result) {
                if ( result ) {
                  element(by.xpath("//button[@class='btn ebBtn ebBtn_color_darkBlue payment-modal-ok ng-binding']")).click();
                  browser.sleep(4000);
                  expect(browser.getTitle()).toEqual(testdata.url.DashBoard);
        } else{
           console.log('may be there is some error payments are not working');
           expect(element(by.xpath("//div[@class='row ebDialogBox-primaryTextBox error-primaryText']/p[1]")).isDisplayed()).toBe(true);
           browser.sleep(2000);
           element(by.xpath("//i[@ng-click='vm.cancel()']")).click();
           browser.sleep(4000);
        }
      });
               
              
             }
         else {
              console.log('there is some error in the request contact customer care');
             
              browser.close();
         }   
            });
             
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
           
           
           
        