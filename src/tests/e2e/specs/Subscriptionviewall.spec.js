var HtmlReporter = require("protractor-html-screenshot-reporter");

var testdata = require('../inputs/testdata/Subscriptionviewall.json');

describe('UI Baseline App', function() {
  
     
    it('Validate subscription viewall',function() {
       browser.sleep(2000);
     var widget = element(by.xpath("//h2[contains(text(),'Subscriptions')]"));
     widget.isPresent().then(function(result) {
       if ( result ) {
       var el = element(by.xpath("//h2[contains(text(),'Subscriptions')]"));
      browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
     browser.sleep(1000);
      var subscriptionviewall = element(by.xpath("//ecb-payer-subscriptions/div/div[1]/h2"));
      subscriptionviewall.isPresent().then(function(result) {
    if ( result ) {
      console.log('It is payer account');
     element(by.xpath("//ecb-payer-subscriptions/div/div[3]/p/button")).click();
     browser.sleep(1000);
     element(by.xpath("//button[@id='dropdownMenu2']/span[2]")).click();
     element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[1]/li/div/ul/li/a")).click();
     browser.sleep(500);
     //element(by.xpath("//button[@id='dropdownMenu3']/span")).click();
    element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div/ul[3]/li/div/button")).click();
     element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[3]/li/div/ul/li[3]/a")).click();
     browser.sleep(500);
   element(by.xpath("//ecb-payer-subscriptions/div/div[1]/div/div/div/div[1]/i")).click();
     browser.sleep(1000);
     element(by.xpath("//span[@class='ebIcon_settings ecb-headerIcons']")).click();
     element(by.xpath("//a[@ng-click='vm.toggleSelectAll(0)']")).click();
    element(by.xpath("//a[@ng-click='vm.toggleSelectAll(1)']")).click();
   element(by.xpath("//button[@ng-click='vm.applyCancelSettings(1)']")).click();
   browser.sleep(1000);
   element(by.xpath("//ecb-payer-subscriptions/div/div[1]/div/div[1]/div/div[2]/i")).click();
   browser.sleep(1000);
   element(by.xpath("//div[@class='ebIcon_filter ecb-widgetsFilterIcon pull-right ng-scope']")).click();
   browser.sleep(500);
   browser.actions().mouseMove(element(by.xpath("//div[@id='filterModal']/div/div/div[2]/form/div/div/div[1]/label"))).perform();
   element(by.xpath("//div[@id='filterModal']/div/div/div[1]/div/button[1]")).click();
   browser.sleep(1000);
   element(by.xpath("//ecb-payer-subscriptions/div/div[1]/span/i")).click();
   browser.sleep(1000);
    } else {
      console.log('it is not a payer account');
      element(by.xpath("//ecb-subscriptions/div/div[3]/p/button")).click();
      browser.sleep(1000);
       browser.sleep(1000);
     element(by.xpath("//button[@id='dropdownMenu2']/span[2]")).click();
     element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[1]/li/div/ul/li/a")).click();
     browser.sleep(500);
     //element(by.xpath("//button[@id='dropdownMenu3']/span")).click();
    element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div/ul[3]/li/div/button")).click();
     element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[3]/li/div/ul/li[3]/a")).click();
     browser.sleep(500);
   element(by.xpath("//ecb-subscriptions/div/div[1]/div/div/div/div[1]/i")).click();
     browser.sleep(1000);
     element(by.xpath("//span[@class='ebIcon_settings ecb-headerIcons']")).click();
     element(by.xpath("//a[@ng-click='vm.toggleSelectAll(0)']")).click();
    element(by.xpath("//a[@ng-click='vm.toggleSelectAll(1)']")).click();
   element(by.xpath("//button[@ng-click='vm.applyCancelSettings(1)']")).click();
   browser.sleep(1000);
   element(by.xpath("//ecb-subscriptions/div/div[1]/div/div[1]/div/div[2]/i")).click();
   browser.sleep(1000);
   element(by.xpath("//div[@class='ebIcon_filter ecb-widgetsFilterIcon pull-right ng-scope']")).click();
   browser.sleep(500);
   browser.actions().mouseMove(element(by.xpath("//div[@id='filterModal']/div/div/div[2]/form/div/div/div[1]/label"))).perform();
   element(by.xpath("//div[@id='filterModal']/div/div/div[1]/div/button[1]")).click();
   browser.sleep(1000);
  // element(by.xpath("//ecb-subscriptions/div/div[1]/span/i")).click();
   browser.sleep(1000);
    }
      });
       } else {
         console.log('subscriptions widget is not present');
       }
     });
    }
    );
});
