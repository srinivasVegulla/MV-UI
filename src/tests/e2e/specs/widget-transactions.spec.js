var HtmlReporter = require("protractor-html-screenshot-reporter");

var testdata = require('../inputs/testdata/widget-QuotesandTransactions.json');

describe('UI Baseline App', function() {
  
    it('Validate transactions widget',function() {
  
     
       browser.sleep(3000);
      
       var el = element(by.xpath("//ecb-since-last-bill/div/div[1]/h2/span"));
      browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
      var widget = element(by.xpath("//ecb-since-last-bill/div/div[1]/h2/span"));
      widget.isPresent().then(function(result) {
    if ( result ) {
      console.log('quotes and transactions widget is present');
      // Transactions   
       element(by.xpath("//ecb-since-last-bill/div/div[2]/div[3]/a")).click();
      browser.actions().mouseMove(element(by.xpath("//div[@id='hide-chargeDetails']/div[2]/div[1]/h3/span"))).perform();
      browser.sleep(2000);
       element(by.xpath("//div[@id='hide-chargeDetails']/div[2]/div[2]/div/ul/label/div/div[2]")).click();
     element(by.xpath("//div[@id='hide-chargeDetails']/div[2]/div[2]/div/ul/label/div/div[2]")).click();
     browser.sleep(2000);
     var zerotrnasactions = element(by.xpath("//div[@id='hide-chargeDetails']/div[2]/table/tbody/tr[1]/td[1]/a"));
     zerotrnasactions.isPresent().then(function(result) {
       if ( result ) {
      element(by.xpath("//div[@id='hide-chargeDetails']/div[2]/table/tbody/tr[1]/td[1]/a")).click();
      element(by.xpath("//div[@id='hide-chargeDetails']/div[2]/table/tbody/tr[2]/td[1]/a")).click();
      browser.sleep(2000);
      element(by.xpath("//div[@id='hide-chargeDetails']/div[2]/table/tbody/tr[2]/td[1]/a")).click();
     browser.sleep(2000);
      // selected by bills
       element(by.xpath("//button[@id='dropdownMenu2']/span[2]")).click();
    
       element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[1]/li/div/ul/li[1]/a")).click();
       browser.sleep(2000);
       // selected by daterange
        element(by.xpath("//button[@id='dropdownMenu2']/span[2]")).click();
     element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[1]/li/div/ul/li[2]/a")).click();
       // sort by 
       element(by.xpath("//button[@id='dropdownMenu3']/span")).click();
       element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[3]/li/div/ul/li[3]/a")).click();
       browser.sleep(2000);
       // global filter 
        element(by.xpath("//div[@class='ebIcon_filter ecb-widgetsFilterIcon pull-right ng-scope']")).click();
        browser.actions().mouseMove(element(by.xpath("//div[@id='filterModal']/div/div/div[2]/form/div/div/div[4]/label"))).perform();
       element(by.xpath("//div[@class='form-group col-sm-12 col-xs-12 col-md-12 ecb-sortBy ng-scope']/div/button/span")).click();
        element(by.xpath("//div[@id='filterModal']/div/div/div[2]/form/div/div/div[4]/div/ul/li[3]/a")).click();
        element(by.xpath("//div[@id='filterModal']/div/div/div[1]/div[2]/button[1]")).click();
        browser.sleep(2000);
       // clicking on tabular view
       element(by.xpath("//ecb-offer-charge-summary/div/div[1]/div/div[2]/div/div[1]/i")).click();
       browser.sleep(2000);
       //clicking on settings icon
       element(by.xpath("//ecb-offer-charge-summary/div/div[1]/div/div[3]/span")).click();
       browser.actions().mouseMove(element(by.xpath("//div[@id='hide-chargeDetails']/div[1]/div[1]/div[1]/span[2]/b"))).perform();
       element(by.xpath("//div[@id='hide-chargeDetails']/div[1]/div[2]/div[4]/a")).click();
       element(by.xpath("//div[@id='hide-chargeDetails']/div[1]/div[2]/div[2]/a")).click();
       element(by.xpath("//div[@id='hide-chargeDetails']/div[1]/div[3]/ul/li[1]/label/input")).click();
       element(by.xpath("//div[@id='hide-chargeDetails']/div[1]/div[3]/ul/li[2]/label/input")).click();
        element(by.xpath("//div[@id='hide-chargeDetails']/div[1]/div[3]/ul/li[3]/div/i")).click();
        element(by.xpath("//div[@id='hide-chargeDetails']/div[1]/div[1]/div[2]/button[1]")).click();
        browser.sleep(2000);
        // clicking on card view
        element(by.xpath("//ecb-offer-charge-summary/div/div[1]/div/div[2]/div/div[2]/i")).click();
        browser.sleep(2000);
        // clicking on cross button and back to dashboard
       element(by.xpath("//ecb-offer-charge-summary/div/div[1]/span/i")).click();
       browser.sleep(2000);
       } else {
         console.log('No transactions are present for this interval');
         browser.sleep(2000);
         element(by.xpath("//div[@id='hide-chargeDetails']/div[2]/div[1]/div/i")).click();
         browser.sleep(2000);
         element(by.xpath("//ecb-offer-charge-summary/div/div[1]/span/i")).click();
         browser.sleep(2000);
       }
      });
       } else {
   console.log('quotes and transactions widget is absent');
      }
    });      
}
); 
});     