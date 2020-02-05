var HtmlReporter = require("protractor-html-screenshot-reporter");

var testdata = require('../inputs/testdata/ActivityLog-paylater.json');

describe('UI Baseline App', function() {
 
    it('should make payment',function(){
     
      browser.sleep(3000);
     
      expect(element(by.xpath("//ecb-total-amount-due/div/div[2]/div[1]/div[1]/span")).getText()).toEqual(testdata.TotalAmount);
     
      element(by.xpath("//button[contains(text(),'Make a Payment')]")).click();
        browser.actions().mouseMove(element(by.xpath("//label[contains(text(),'Pay this Amount')]"))).perform();
         browser.sleep(1000);
     
       element(by.xpath("//input[@id='amountValue']")).clear();
       element(by.xpath("//input[@id='amountValue']")).sendKeys('1');
       browser.sleep(1000);
       //element(by.xpath("//button[@ng-model='vm.cardSelected']")).click();
       
       
       //element(by.xpath("//ul[@class='dropdown-menu filterDropDownBox scrollable-menu']/li[1]")).click();
       expect(element(by.xpath("//i[@ng-class='vm.caldendarCheck()']")).isDisplayed()).toBe(true);
       element(by.xpath("//i[@ng-class='vm.caldendarCheck()']")).click();
       browser.sleep(1000);
       
      
      
});

       it('should make payment later',function(){     
      
       var myDivs = element.all(by.repeater('item in days'));
      myDivs.get(testdata.futuredate).click();
       browser.sleep(1000);
       
      
        expect(element(by.xpath("//button[@ng-click='vm.payNowWidget(2)']")).getText()).toEqual(testdata.Schedule);
        element(by.xpath("//button[@ng-click='vm.payNowWidget(2)']")).click();
        expect(element(by.xpath("//div[@class='form-group review-message']/p[1]")).getText()).toEqual(testdata.Review);
        expect(element(by.xpath("//div[@class='pull-right']/button")).getText()).toEqual(testdata.Schedule);
        
        element(by.xpath("//div[@class='pull-right']/button")).click();
        
        
        //payment confirmation dialogue
         browser.sleep(3000);
        expect(element(by.xpath("//h3[@class='modal-title noBorder ng-binding']")).getText()).toEqual('Payment Confirmation');
        element(by.xpath("//button[@class='btn ebBtn ebBtn_color_darkBlue payment-modal-ok ng-binding']")).click();
        browser.sleep(3000);
       });
        it('login', function() {  
       browser.actions().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, protractor.Key.SHIFT ,"n")).perform();
     browser.sleep(2000);
    
     browser.get(testdata.url.URL);
     browser.sleep(2000);
     
     element(by.id('username')).sendKeys(testdata.user.username);
       element(by.id('password')).sendKeys(testdata.user.passwordField);
       browser.findElement(By.xpath("//div[@class='col-xs-4 col-sm-4 col-md-4']/button")).click();
       
      browser.waitForAngular();
    
        browser.sleep(3000);
       
       var el = element(by.xpath("//ecb-activity-log/div/div[1]/h2/span"));
      browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
      expect(element(by.xpath("//ecb-activity-log[@class='ng-isolate-scope']/div/div[2]/div/table/tbody/tr/td[1]")).getText()).toEqual(testdata.ActivityLog.today);
      expect(element(by.xpath("//ecb-activity-log[@class='ng-isolate-scope']/div/div[2]/div/table/tbody/tr/td[3]/div/p")).getText()).toEqual(testdata.ActivityLog.Scheduledpayment);
    
               });
              
              }
); 
        