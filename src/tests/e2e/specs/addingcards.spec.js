
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
            browser.ignoreSynchronization = true;
      browser.waitForAngular();
      browser.sleep(2000);
     
        //addding ach card
         var addlink = element(by.xpath("//ecb-payment-methods/div/div[1]/div/ul/button"));
         addlink.isPresent().then(function(result) {
           if ( result ) {
             
         element(by.xpath("//button[contains(text(),'+ Payment Methods')]")).click();
          browser.actions().mouseMove(element(by.xpath("//div[@class='modal-content ecb-contentPaymentPopup']"))).perform();
            
           element(by.xpath("//button[@ng-click='vm.getCreditMethods()']")).click();
    
       browser.sleep(3000);
        // if not redirecting to cybersource validation
            var cybersource= element(by.xpath("//h1[contains(text(),'How would you like to pay?')]"));
            cybersource.isPresent().then(function(result) {
              if ( result ) {
      
       
        browser.actions().mouseMove(element(by.xpath("//li[@class='echeck option four']"))).perform();
         element(by.xpath("//img[@alt='Pay with eCheck']")).click();
         browser.sleep(1000);
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
          
          
            // routing number
              
             
              
                 var widget= element(by.xpath("//h1[@class='single_secure']"));
     browser.executeScript('arguments[0].scrollIntoView()',widget.getWebElement());
              browser.sleep(1000);
            element(by.xpath("//input[@name='echeck_routing_number']")).click();
             element(by.xpath("//input[@name='echeck_routing_number']")).sendKeys(testdata.routingnum);
             element(by.xpath("//input[@name='echeck_account_number']")).click();
             element(by.xpath("//input[@name='echeck_account_number']")).sendKeys(testdata.accountnum);
              element(by.xpath("//input[@name='echeck_check_number']")).click();
             element(by.xpath("//input[@name='echeck_check_number']")).sendKeys(testdata.checknum);
             
         element(by.xpath("//select[@name='echeck_account_type']")).click();
        element(by.xpath("//select[@name='echeck_account_type']/option[@value='s']")).click();
       
         element(by.xpath("//select[@name='dob_month']")).click();
        element(by.xpath("//select[@name='dob_month']/option[@value='11']")).click();
        element(by.xpath("//select[@name='dob_day']")).click();
        element(by.xpath("//select[@name='dob_day']/option[@value='08']")).click();
        element(by.xpath("//select[@name='dob_year']")).click();
        element(by.xpath("//select[@name='dob_year']/option[@value='2017']")).click();
         element(by.xpath("//div[@id='payment_details']/input[2]")).click();
            
                browser.ignoreSynchronization = true;
      browser.waitForAngular();
      
       browser.sleep(10000);
       
      expect(browser.getTitle()).toEqual(testdata.url.DashBoard);
     
         
           }
         else {
              console.log('there is some error in the request contact customer care');
              browser.actions().mouseMove(element(by.xpath("//p[contains(text(),'There was an error launching page to process your request.')]"))).perform();
              element(by.xpath("//p[contains(text(),'Try again after sometime or Contact Customer Service.')]")).isPresent();
               element(by.xpath("//div[@ng-click='vm.errorClose()']/i")).click();
         }   
            });
      
       //adding visa card

      
         element(by.xpath("//button[contains(text(),'+ Payment Methods')]")).click();
        browser.actions().mouseMove(element(by.xpath("//div[@class='modal-content ecb-contentPaymentPopup']"))).perform();
            
            element(by.xpath("//button[@ng-click='vm.getCreditMethods()']")).click();
            browser.ignoreSynchronization = true;
      browser.waitForAngular();
      
       browser.sleep(3000);
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
           
             //card no
              
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
             element(by.xpath("//select[@name='card_expiry_month']/option[7]")).click();
          
             element(by.xpath("//select[@name='card_expiry_year']")).click();
             element(by.xpath("//select[@name='card_expiry_year']/option[3]")).click();
             element(by.xpath("//input[@name='commit']")).click();
             
            
                browser.ignoreSynchronization = true;
      browser.waitForAngular();
      
       browser.sleep(10000);
             
            expect(browser.getTitle()).toEqual(testdata.url.DashBoard);
            
             }
         else {
              console.log('there is some error in the request contact customer care');
              browser.actions().mouseMove(element(by.xpath("//p[contains(text(),'There was an error launching page to process your request.')]"))).perform();
              element(by.xpath("//p[contains(text(),'Try again after sometime or Contact Customer Service.')]")).isPresent();
               element(by.xpath("//div[@ng-click='vm.errorClose()']/i")).click();
         }   
            });
            
        // adding master card
         element(by.xpath("//button[contains(text(),'+ Payment Methods')]")).click();
        browser.actions().mouseMove(element(by.xpath("//div[@class='modal-content ecb-contentPaymentPopup']"))).perform();
            
            element(by.xpath("//button[@ng-click='vm.getCreditMethods()']")).click();
            browser.ignoreSynchronization = true;
      browser.waitForAngular();
      
       browser.sleep(3000);
       // if not redirecting to cybersource validation
            var cybersource= element(by.xpath("//h1[contains(text(),'How would you like to pay?')]"));
            cybersource.isPresent().then(function(result) {
              if ( result ) {
       
       browser.actions().mouseMove(element(by.xpath("//li[@class='card option four']"))).perform();
       element(by.xpath("//button[@id='_002']")).click();
     
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
           
             //card no
              
                 var widget= element(by.xpath("//h1[@class='single_secure']"));
     browser.executeScript('arguments[0].scrollIntoView()',widget.getWebElement());
              browser.sleep(1000);
              
                 element(by.xpath("//input[@id='card_number']")).click();
               element(by.xpath("//input[@id='card_number']")).sendKeys(testdata.mastercardno);
                         
             element(by.xpath("//input[@id='card_cvn']")).click();
             element(by.xpath("//input[@id='card_cvn']")).sendKeys(testdata.mastercvnno);
             
             // expiration date edit
            element(by.xpath("//select[@id='card_expiry_month']")).click();
             element(by.xpath("//select[@id='card_expiry_month']/option[7]")).click();
          
             element(by.xpath("//select[@id='card_expiry_year']")).click();
             element(by.xpath("//select[@id='card_expiry_year']/option[3]")).click();
             element(by.xpath("//div[@id='payment_details']/input[2]")).click();
             
            
                browser.ignoreSynchronization = true;
      browser.waitForAngular();
      
       browser.sleep(10000);
             
            expect(browser.getTitle()).toEqual(testdata.url.DashBoard);
            
             }
         else {
              console.log('there is some error in the request contact customer care');
              browser.actions().mouseMove(element(by.xpath("//p[contains(text(),'There was an error launching page to process your request.')]"))).perform();
              element(by.xpath("//p[contains(text(),'Try again after sometime or Contact Customer Service.')]")).isPresent();
               element(by.xpath("//div[@ng-click='vm.errorClose()']/i")).click();
         }   
            });
           } else {
        console.log('adding payment methods link is absent');
           }
         });           
         }else {
        console.log('widget is absent');
        }
        });  
   }); 

}
); 
             
       
        
        
        
        
        
        
        
        
        
        
        