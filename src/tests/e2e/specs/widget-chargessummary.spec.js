var HtmlReporter = require("protractor-html-screenshot-reporter");

 var testdata = require('../inputs/testdata/widget-chargessummary.json');

describe('UI Baseline App', function() {
  
    it('Validate Summarised Charge details',function() {
        browser.sleep(3000);
      var widget = element(by.xpath("//ecb-total-amount-due[@class='ng-isolate-scope']/div/div/h2"));
      widget.isPresent().then(function(result) {
        if ( result ) {
          
          element(by.xpath("//ecb-offer-charge-summary/div/div[1]/div/ul/label/div/div[2]")).click();
          browser.sleep(500);
          element(by.xpath("//ecb-offer-charge-summary/div/div[1]/div/ul/label/div/div[2]")).click();
          
          browser.sleep(500);
      
          var elementpresent =  element(by.xpath("//table[@class='table ebTable table-noborder miller-table ng-scope']/tbody/tr[1]/td[1]/a"));
          elementpresent.isPresent().then(function(result){
         if ( result ) {
             browser.actions().mouseMove(element(by.xpath("//div[@id='hide-chargeDetails']/div/table/thead/tr/th[1]"))).perform();
         element(by.xpath("//table[@class='table ebTable table-noborder miller-table ng-scope']/tbody/tr[1]/td[1]/a")).click();
         browser.sleep(500);
          element(by.xpath("//div[@id='hide-chargeDetails']/div/table/tbody/tr[2]/td[1]/a")).click();
          browser.sleep(1000);
           element(by.xpath("//table[@class='table ebTable table-noborder miller-table ng-scope']/tbody/tr[2]/td[1]/a")).click();
      
      browser.sleep(1000);
     
      // selected by bills
       element(by.xpath("//button[@id='dropdownMenu2']/span[2]")).click();
    
       element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[1]/li/div/ul/li[1]/a")).click();
       browser.sleep(1000);
       // selected by daterange
        element(by.xpath("//button[@id='dropdownMenu2']/span[2]")).click();
     element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[1]/li/div/ul/li[2]/a")).click();
       // sort by 
       element(by.xpath("//button[@id='dropdownMenu3']/span")).click();
       element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[3]/li/div/ul/li[2]/a")).click();
       browser.sleep(2000);
       // global filter 
        element(by.xpath("//div[@class='ebIcon_filter ecb-widgetsFilterIcon pull-right ng-scope']")).click();
        browser.sleep(1000);
        browser.actions().mouseMove(element(by.xpath("//div[@id='filterModal']/div/div/div[2]/form/div/div/div[4]/label"))).perform();
       element(by.xpath("//div[@id='filterModal']/div/div/div[1]/div/button[1]")).click();
        browser.sleep(2000);
       // clicking on tabular view
       element(by.xpath("//ecb-offer-charge-summary/div/div[1]/div/div[2]/div/div[1]/i")).click();
       browser.sleep(1000);
       //clicking on settings icon
       element(by.xpath("//ecb-offer-charge-summary/div/div[1]/div/div[3]/span")).click();
       browser.actions().mouseMove(element(by.xpath("//div[@id='hide-chargeDetails']/div[1]/div[1]/div[1]/span[2]/b"))).perform();
       element(by.xpath("//div[@id='hide-chargeDetails']/div[1]/div[2]/div[4]/a")).click();
       element(by.xpath("//div[@id='hide-chargeDetails']/div[1]/div[2]/div[2]/a")).click();
       element(by.xpath("//div[@id='hide-chargeDetails']/div[1]/div[3]/ul/li[1]/label/input")).click();
       element(by.xpath("//div[@id='hide-chargeDetails']/div[1]/div[3]/ul/li[2]/label/input")).click();
        element(by.xpath("//div[@id='hide-chargeDetails']/div[1]/div[3]/ul/li[3]/div/i")).click();
        browser.sleep(500);
        element(by.xpath("//button[@ng-click='vm.applyCancelSettings(1)']")).click();
        browser.sleep(1000);
        // clicking on card view
        element(by.xpath("//ecb-offer-charge-summary/div/div[1]/div/div[2]/div/div[2]/i")).click();
        browser.sleep(1000);
        // clicking on cross button and back to dashboard
       element(by.xpath("//ecb-offer-charge-summary/div/div[1]/span/i")).click();
       browser.sleep(500);
       } else {
              console.log('something error occured or there are no orders for this interval');
            }
          });  
          
        } else {
          console.log('charges summary widget is absent in bills');
        }
      });
      
           });
}
); 