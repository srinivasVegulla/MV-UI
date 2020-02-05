var HtmlReporter = require("protractor-html-screenshot-reporter");

 var testdata = require('../inputs/testdata/ActivityLog-update.json');

describe('UI Baseline App', function() {
 
    it('Update', function() {
           browser.sleep(3000);
        
           //validating edit button  and click on edit button
        element(by.xpath("//button[@ng-click='vm.editAccount(vm.user.accountId)']")).click();
        
        browser.sleep(2000);
        expect(element(by.xpath("//h3[@id='myModalLabel']")).getText()).toEqual('Edit Account Information');
        //updating phn no
       expect(element(by.xpath('//div[@class="form-group ng-scope"][5]/label')).getText()).toEqual('Phone');
       expect(element(by.xpath('//div[@class="form-group ng-scope"][5]/div/input')).isDisplayed()).toBe(true);
       element(by.xpath('//div[@class="form-group ng-scope"][5]/div/input')).clear();
       
       element(by.xpath('//div[@class="form-group ng-scope"][5]/div/input')).sendKeys(testdata.newno);
       // updating address
       expect(element(by.xpath('//div[@class="form-group ng-scope"][8]/div/input')).isDisplayed()).toBe(true);
       element(by.xpath('//div[@class="form-group ng-scope"][8]/div/input')).clear();
       element(by.xpath('//div[@class="form-group ng-scope"][8]/div/input')).sendKeys('Hyderabad');
      // updating country
        element(by.xpath("//select[@ng-change='vm.updateEnumName()']")).click();
        element(by.xpath("//select[@ng-change='vm.updateEnumName()']/option[18]")).click();
        element(by.xpath("//select[@ng-change='vm.updateEnumName()']")).click();
        element(by.xpath("//select[@ng-change='vm.updateEnumName()']/option[11]")).click();
        element(by.xpath("//select[@ng-change='vm.updateEnumName()']")).click();
        element(by.xpath("//select[@ng-change='vm.updateEnumName()']/option[18]")).click();
        browser.sleep(1000);
        expect(element(by.xpath('//button[@type="submit"]')).isDisplayed()).toBe(true);
        element(by.xpath('//button[@type="submit"]')).click();
            
         browser.ignoreSynchronization = true;
        browser.waitForAngular();
         browser.sleep(3000);
        
       
           expect(element(by.xpath('//address[5]/span/a[@class="ebBtn btn-link ebColor_textLinkBlue ng-binding"]')).getText()).toEqual(testdata.newno); 
      
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
      expect(element(by.xpath("//ecb-activity-log/div/div[2]/div[1]/table/tbody/tr[1]/td[1]/div/div/p")).getText()).toEqual(testdata.ActivityLog.today);
      expect(element(by.xpath("//ecb-activity-log/div/div[2]/div[1]/table/tbody/tr[1]/td[3]/div/p")).getText()).toEqual(testdata.ActivityLog.Updatedaccount);
    
               });
              
              }
); 
    
    
 
    