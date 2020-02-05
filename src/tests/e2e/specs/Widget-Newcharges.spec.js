var HtmlReporter = require("protractor-html-screenshot-reporter");

var testdata = require('../inputs/testdata/Newcharges.json');

describe('UI Baseline App', function() {
  
   
    it('Validate Billing period widget',function() {
     
        
        
        browser.sleep(3000);
       var widget = element(by.xpath("//ecb-charges/div/div[1]/h2"));
     widget.isPresent().then(function(result) {
    if ( result ) {
        console.log('widget is present');
      var el = element(by.xpath('//ecb-charges/div/div[1]/h2'));
      browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());

   
        expect(element(by.xpath("//ecb-charges[@class='ng-isolate-scope']/div/div/h2")).getText()).toEqual(testdata.widgetname);
        expect(element(by.xpath("//div[@id='hide-charges']/div/span")).isDisplayed()).toBe(true);
        expect(element(by.xpath("//div[@id='hide-charges']/div/span")).getText()).toEqual(testdata.prebillAmount);
        

         expect(element(by.xpath("//ecb-charges[@class='ng-isolate-scope']/div/div[2]/table/tbody/tr[1]/td[1]")).getText()).toEqual(testdata.Chargestotal);

           expect(element(by.xpath("//ecb-charges[@class='ng-isolate-scope']/div/div[2]/table/tbody/tr[1]/td[2]")).getText()).toEqual(testdata.Chargesvalue);
        element(by.xpath("//ecb-charges[@class='ng-isolate-scope']/div/div[2]/table/tbody/tr[2]/td[1]")).isPresent().then(function (result){
          if(result){
         expect(element(by.xpath("//ecb-charges[@class='ng-isolate-scope']/div/div[2]/table/tbody/tr[2]/td[1]")).getText()).toEqual(testdata.bills);
         
         expect(element(by.xpath("//ecb-charges[@class='ng-isolate-scope']/div/div[2]/table/tbody/tr[2]/td[2]")).getText()).toEqual(testdata.prebills);
          }
          else {
             console.log('Prebill Adjustments are not present');
          }
        });
        //validation of prebill adjustments     
       var popupdisplay =  element(by.xpath("//ecb-charges[@class='ng-isolate-scope']/div/div[2]/table/tbody/tr[2]/td[1]"));
    popupdisplay.isPresent().then(function(result) {
    if ( result ) {
      
       browser.actions().mouseMove(element(by.xpath("//ecb-charges[@class='ng-isolate-scope']/div/div[2]/table/tbody/tr[2]/td[1]"))).perform();
       browser.sleep(5000);
  expect(element(by.xpath("//ecb-billadjustment-popup/div/div/h3")).getText()).toEqual(testdata.bills);
      expect(element(by.xpath("//ecb-billadjustment-popup/div/div/div[2]/div/div[1]/div/div[1]")).getText()).toEqual(testdata.postbillamount);
      expect(element(by.xpath("//ecb-billadjustment-popup/div/div/div[2]/div/div[1]/div/div[2]")).getText()).toEqual(testdata.postbilldate);
      expect(element(by.xpath("//ecb-billadjustment-popup/div/div/div[2]/div/div[1]/div[2]/h4")).getText()).toEqual(testdata.po1);
        var viewallButton =  element(By.xpath("//ecb-billadjustment-popup/div/div/div[3]/button"));
    viewallButton.isPresent().then(function(result) {
    if ( result ) {
      element(By.xpath("//ecb-billadjustment-popup/div/div/div[3]/button")).click();  
      element(by.xpath("//button[@id='dropdownMenu2']/span[2]")).click();
      element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[1]/li/div/ul/li/a")).click();
        element(by.xpath("//button[@id='dropdownMenu3']/span")).click();
      element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[2]/li/div/ul/li[4]/a")).click();
      element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[3]/li/div/button")).click();
      element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[3]/li/div/ul/li[2]/a")).click();
      browser.sleep(500);
      element(by.xpath("//div[@class='ebIcon_filter ecb-widgetsFilterIcon pull-right ng-scope']")).click();
      browser.actions().mouseMove(element(by.xpath("//div[@id='filterModal']/div/div/div[2]/form/div/div/div[3]/label"))).perform();
  
      element(by.xpath("//button[@ng-disabled='!vm.isDateRange()']")).click();
      browser.sleep(1000);
      
      element(by.xpath("//ecb-charges/div/div[1]/div/div/div/div[1]")).click();
      element(by.xpath("//span[@class='ebIcon_settings ecb-headerIcons']")).click();
      browser.actions().mouseMove(element(by.xpath("//ecb-charges/div/div[2]/div[1]/div[1]/span[2]/b"))).perform();
      element(by.xpath("//a[@ng-click='vm.toggleChargesSelectAll(0)']")).click();
      element(by.xpath("//a[@ng-click='vm.toggleChargesSelectAll(1)']")).click();
      element(by.xpath("//button[@ng-click='vm.applyChargesCancelSettings(1)']")).click();
      element(by.xpath("//ecb-charges/div/div[1]/div/div[2]/div/div[2]")).click();
      element(by.xpath("//ecb-charges/div/div[1]/span/i")).click();
      browser.sleep(3000);
      
      
      } else {
        console.log('Prebill viewall is not there');
        }
        });
    } 
    else {
        console.log('prebill  value is zero');
        }
        }); 

    //NSC display    
    
    
      var nscdisplay =  element(by.xpath("//ecb-charges[@class='ng-isolate-scope']/div/div[2]/table/tbody/tr[3]/td[1]"));
    nscdisplay.isPresent().then(function(result) {
    if ( result ) {
      
      browser.actions().mouseMove(element(by.xpath("//ecb-charges[@class='ng-isolate-scope']/div/div[2]/table/tbody/tr[3]/td[1]"))).perform();
    browser.sleep(5000);
       expect(element(by.xpath("//tr[@id='nscData']/td[1]/button")).getText()).toEqual(testdata.nsc);
     expect(element(by.xpath("//tr[@id='nscData']/td[2]/span")).getText()).toEqual(testdata.nscvalue);
      
      var NSC =  element(by.xpath("//div[@class='ebDialogBox-actionBlock text-center']/button"));
         NSC.isPresent().then(function(result) {
    if ( result ) {
      
      expect(element(by.xpath("//div[@class='ebDialogBox-actionBlock text-center']/button")).isDisplayed()).toBe(true);
      expect(element(by.xpath("//div[@class='ebDialogBox-actionBlock text-center']/button")).getText()).toEqual(testdata.view);
      element(by.xpath("//div[@class='ebDialogBox-actionBlock text-center']/ button")).click();
      element(by.xpath("//button[@id='dropdownMenu2']/span[2]")).click();
      element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[1]/li/div/ul/li/a")).click();
        element(by.xpath("//button[@id='dropdownMenu3']/span")).click();
      element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[2]/li/div/ul/li[4]/a")).click();
      element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[3]/li/div/button")).click();
      element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[3]/li/div/ul/li[2]/a")).click();
      browser.sleep(500);
      element(by.xpath("//div[@class='ebIcon_filter ecb-widgetsFilterIcon pull-right ng-scope']")).click();
      browser.actions().mouseMove(element(by.xpath("//div[@id='filterModal']/div/div/div[2]/form/div/div/div[3]/label"))).perform();
  
      element(by.xpath("//div[@id='filterModal']/div/div/div[2]/form/div/div/div[3]/div/button")).click();
      
      element(by.xpath("//div[@id='filterModal']/div/div/div[1]/div/button[1]")).click();
      browser.sleep(1000);
      
      element(by.xpath("//ecb-charges/div/div[1]/div/div/div/div[1]")).click();
      element(by.xpath("//span[@class='ebIcon_settings ecb-headerIcons']")).click();
      browser.actions().mouseMove(element(by.xpath("//ecb-charges/div/div[2]/div[1]/div[1]/span[2]/b"))).perform();
      element(by.xpath("//a[@ng-click='vm.toggleChargesSelectAll(0)']")).click();
      element(by.xpath("//a[@ng-click='vm.toggleChargesSelectAll(1)']")).click();
      element(by.xpath("//button[@ng-click='vm.applyChargesCancelSettings(1)']")).click();
      element(by.xpath("//ecb-charges/div/div[1]/div/div[1]/div/div[2]")).click();
      element(by.xpath("//ecb-charges/div/div[1]/span/i")).click();
      browser.sleep(3000);
      
        }
        else{
        console.log('Viewall is not present for NSC');
        }
      });
      
    }
    
    else {
        console.log('NSC  value is zero');
        }
    });        
   
    //misc display    
    
   
      var miscdisplay =  element(by.xpath("//ecb-charges[@class='ng-isolate-scope']/div/div[2]/table/tbody/tr[4]/td[1]"));
    miscdisplay.isPresent().then(function(result) {
    if ( result ) {
     
      browser.actions().mouseMove(element(by.xpath("//ecb-charges[@class='ng-isolate-scope']/div/div[2]/table/tbody/tr[4]/td[1]"))).perform();
    browser.sleep(5000);
       expect(element(by.xpath("//div[@id='hide-charges']/table/tbody/tr[4]/td[1]/button")).getText()).toEqual(testdata.misc);
     expect(element(by.xpath("//div[@id='hide-charges']/table/tbody/tr[4]/td[2]/span")).getText()).toEqual(testdata.miscvalue);
      
      var misc =  element(by.xpath("//div[@class='ebDialogBox-actionBlock text-center']/button"));
         misc.isPresent().then(function(result) {
    if ( result ) {
      
      expect(element(by.xpath("//div[@class='ebDialogBox-actionBlock text-center']/button")).isDisplayed()).toBe(true);
      expect(element(by.xpath("//div[@class='ebDialogBox-actionBlock text-center']/button")).getText()).toEqual(testdata.view);
      element(by.xpath("//div[@class='ebDialogBox-actionBlock text-center']/ button")).click();
      element(by.xpath("//button[@id='dropdownMenu2']/span[2]")).click();
      element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[1]/li/div/ul/li/a")).click();
        element(by.xpath("//button[@id='dropdownMenu3']/span")).click();
      element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[2]/li/div/ul/li[4]/a")).click();
      element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[3]/li/div/button")).click();
      element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[3]/li/div/ul/li[2]/a")).click();
      browser.sleep(500);
      element(by.xpath("//div[@class='ebIcon_filter ecb-widgetsFilterIcon pull-right ng-scope']")).click();
      browser.actions().mouseMove(element(by.xpath("//div[@id='filterModal']/div/div/div[2]/form/div/div/div[3]/label"))).perform();
  
      element(by.xpath("//button[@ng-disabled='!vm.isDateRange()']")).click();
      browser.sleep(1000);
      
      element(by.xpath("//ecb-charges/div/div[1]/div/div/div/div[1]")).click();
      element(by.xpath("//span[@class='ebIcon_settings ecb-headerIcons']")).click();
      browser.actions().mouseMove(element(by.xpath("//ecb-charges/div/div[2]/div[1]/div[1]/span[2]/b"))).perform();
      element(by.xpath("//a[@ng-click='vm.toggleChargesSelectAll(0)']")).click();
      element(by.xpath("//a[@ng-click='vm.toggleChargesSelectAll(1)']")).click();
      element(by.xpath("//button[@ng-click='vm.applyChargesCancelSettings(1)']")).click();
      element(by.xpath("//ecb-charges/div/div[1]/div/div[1]/div/div[2]/i")).click();
      element(by.xpath("//ecb-charges/div/div[1]/span/i")).click();
      browser.sleep(3000);
      
        }
        else{
        console.log('Viewall is not present for misc');
        }
      });
      
    }
    
    else {
        console.log('misc  value is zero');
        }
    });        
     
  }
  else {
    console.log('charges widget is absent');
  }
      
});
      
                });
}
); 
