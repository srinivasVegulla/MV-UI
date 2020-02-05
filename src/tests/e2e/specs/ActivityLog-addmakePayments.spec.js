var HtmlReporter = require("protractor-html-screenshot-reporter");

var testdata = require('../inputs/testdata/ACtivityLog-addmakePayments.json');

describe('UI Baseline App', function() {
 
    it('Validate Add and PayNow',function(){
      
      browser.sleep(3000);
    
    
     element(by.xpath("//button[@class='btn ebBtn btn-link pull-right ecb-makePaymentButton']")).click();
     browser.actions().mouseMove(element(by.xpath("//label[contains(text(),'Pay this Amount')]"))).perform();
     browser.sleep(1000);
        element(By.xpath("//input[@id='amountValue']")).clear();
         element(By.xpath("//input[@id='amountValue']")).sendKeys('1');
         element(by.xpath("//button[@ng-model='vm.payUsingMethod']/span[2]")).click();
         browser.sleep(3000);
         expect(element(by.xpath("//div[@class='dropdown open']/ul/li[2]/a")).getText()).toEqual(testdata.NewMethod);
         element(by.xpath("//div[@class='dropdown open']/ul/li[2]/a")).click();
         expect(element(by.xpath("//label[contains(text(),testdata.SaveforFutureUse)]")).isDisplayed()).toBe(true);
         browser.sleep(3000);
         expect(element(by.xpath("//button[@ng-click='vm.payNowWidget(2)']")).getText()).toEqual(testdata.AddNowandPayNow);
         element(by.xpath("//button[@ng-click='vm.payNowWidget(2)']")).click();
         //expect(element(by.xpath("//button[contains(text(),'Add and Pay Now')]")).getText()).toEqual(testdata.AddNowandPayNow);
       element(by.xpath("//button[@ng-click='vm.addPayNowPopup()']")).click();
       browser.actions().mouseMove(element(by.xpath("//div[@id='payConfirmPopup']/div/div/div[1]/h2"))).perform();
        element(by.xpath("//button[@ng-click='vm.addCardNowPayNow()']")).click();
       browser.ignoreSynchronization = true;
      browser.waitForAngular();
      browser.sleep(1000);
      element(by.xpath("//button[@id='_001']")).click();
      browser.sleep(1000);
      expect(element(by.xpath("//div[@id='billing_details']/h1")).getText()).toEqual('Billing Information');
      element(by.xpath("//select[@name='bill_to_address_country']")).click();
     
      element(by.xpath("//select[@name='bill_to_address_country']/option[@value='AS']")).click();
       element(by.xpath("//input[@id='card_number']")).sendKeys(testdata.CardNo);
       element(by.xpath("//input[@name='card_cvn']")).sendKeys(testdata.CVN);
      element(by.xpath("//select[@name='card_expiry_month']")).click();
      element(by.xpath("//select[@name='card_expiry_month']/option[@value='06']")).click();
      element(by.xpath("//select[@name='card_expiry_year']")).click();
      element(by.xpath("//select[@name='card_expiry_year']/option[@value='2032']")).click();
      element(by.xpath("//input[@id='bill_to_address_line2']")).sendKeys('xyz');
      expect(element(by.xpath("//input[@value='Finish']")).isDisplayed()).toBe(true);
      element(by.xpath("//input[@value='Finish']")).click();
      browser.ignoreSynchronization = true;
      browser.waitForAngular();
      browser.sleep(10000); 
       browser.actions().mouseMove(element(by.xpath("//div[@class='modal-header ng-scope']/h3"))).perform();
       browser.sleep(2000);
       element(by.xpath("//button[@class='btn ebBtn ebBtn_color_darkBlue payment-modal-ok ng-binding']")).click();
       browser.sleep(2000);
      
    });
    it('login', function() {  
       browser.actions().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, protractor.Key.SHIFT ,"n")).perform();
     browser.sleep(2000);
    
     browser.get(testdata.url.URL);
     browser.sleep(2000);
     //expect(browser.getTitle()).toEqual('ECB MetraView : Login');
     element(by.id('username')).sendKeys(testdata.user.username);
       element(by.id('password')).sendKeys(testdata.user.passwordField);
       browser.findElement(By.xpath("//div[@class='col-xs-4 col-sm-4 col-md-4']/button")).click();
       
      browser.waitForAngular();
      browser.sleep(3000);
     
            var el = element(by.xpath("//ecb-activity-log/div/div[1]/h2/span"));
      browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
      expect(element(by.xpath("//ecb-activity-log/div/div[2]/div[1]/table/tbody/tr[1]/td[1]/div/div/p")).getText()).toEqual(testdata.ActivityLog.today);
      expect(element(by.xpath("//ecb-activity-log/div/div[2]/div[1]/table/tbody/tr[1]/td[3]/div/p")).getText()).toEqual(testdata.ActivityLog.Amountpaidstatus);
      expect(element(by.xpath("//ecb-activity-log/div/div[2]/div[1]/table/tbody/tr[1]/td[1]/div/div/p")).getText()).toEqual(testdata.ActivityLog.today);
      expect(element(by.xpath("//ecb-activity-log/div/div[2]/div[1]/table/tbody/tr[2]/td[3]/div/p")).getText()).toEqual(testdata.ActivityLog.addedcard);
        
        
        
         });
        }
); 
    
    
    
    
    
    
    
    
    
    
    