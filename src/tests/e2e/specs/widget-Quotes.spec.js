var HtmlReporter = require("protractor-html-screenshot-reporter");

var testdata = require('../inputs/testdata/widget-QuotesandTransactions.json');

describe('UI Baseline App', function() {
 
    
    it('Validate quotes widget',function() {
  
       browser.refresh();
       browser.sleep(3000);
      
       var el = element(by.xpath("//ecb-since-last-bill/div/div[1]/h2/span"));
      browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
      var widget = element(by.xpath("//ecb-since-last-bill/div/div[1]/h2/span"));
      widget.isPresent().then(function(result) {
    if ( result ) {
      console.log('quotes and transactions widget is present');
      expect(element(by.xpath("//ecb-since-last-bill/div/div[2]/div[1]")).getText()).toEqual(testdata.sincelastbilldates);
      expect(element(by.xpath("//ecb-since-last-bill/div/div[2]/div[2]/a")).isDisplayed()).toBe(true);
      expect(element(by.xpath("//ecb-since-last-bill/div/div[2]/div[3]/a")).isDisplayed()).toBe(true);
      var attr = element(by.xpath("//ecb-since-last-bill/div/div[2]/div[2]/img")).getAttribute('src');
                    expect(attr).toEqual(testdata.img);
     var attr = element(by.xpath("//ecb-since-last-bill/div/div[2]/div[3]/img")).getAttribute('src');
                    expect(attr).toEqual(testdata.img1);
     // clicking on quotes
      element(by.xpath("//ecb-since-last-bill/div/div[2]/div[2]/a")).click();
      // quotes view all 
      expect(element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[1]/label[1]")).isDisplayed()).toBe(true);
      element(by.xpath("//button[@id='dropdownMenu2']/span[2]")).click();
      browser.sleep(2000);
      // in selected by clicking on bills
      element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[1]/li/div/ul/li[1]/a")).click();
      browser.sleep(4000);
      expect(element(by.xpath("//ecb-invoice/div/div[1]/ul/li[1]/label/span[2]")).getText()).toEqual(testdata.statements);
      expect(element(by.xpath("//ecb-invoice/div/div[1]/ul/li[2]/label/span[2]")).getText()).toEqual(testdata.invoices);
      expect(element(by.xpath("//ecb-invoice/div/div[1]/ul/li[3]/label/span[2]")).getText()).toEqual(testdata.creditnotes);
      // clicking on the check boxes
      element(by.xpath("//ecb-invoice/div/div[1]/ul/li[1]/label/input")).click();
     element(by.xpath("//ecb-invoice/div/div[1]/ul/li[2]/label/input")).click();
     browser.sleep(2000);
     element(by.xpath("//ecb-invoice/div/div[1]/ul/li[3]/label/input")).click();
     element(by.xpath("//ecb-invoice/div/div[1]/ul/li[1]/label/input")).click();
     element(by.xpath("//ecb-invoice/div/div[1]/ul/li[2]/label/input")).click();
     browser.sleep(2000);
     // expand views of the check boxes
     //element(by.xpath("//ecb-invoice/div/div[2]/div/div[1]/div[1]/div[1]/i")).click();
     //browser.sleep(500);
     //element(by.xpath("//ecb-invoice/div/div[2]/div/div[1]/div[1]/div[1]/i")).click();
     element(by.xpath("//button[@id='dropdownMenu2']/span[2]")).click();
     browser.sleep(2000);
      element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[1]/li/div/ul/li[2]/a")).click();
      // In daterange view in selected by
      expect(element(by.xpath("//ecb-invoice/div/div[1]/ul/li[1]/label/span[2]")).getText()).toEqual(testdata.creditnotes);
      expect(element(by.xpath("//ecb-invoice/div/div[1]/ul/li[2]/label/span[2]")).getText()).toEqual(testdata.quotes);
      // clicking on sort by
      element(by.xpath("//button[@id='dropdownMenu3']/span")).click();
      browser.sleep(2000);
      var zeroquotes = element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[3]/li/div/ul/li[2]/a"));
      zeroquotes.isPresent().then(function(result) {
    if ( result ) {
           element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[3]/li/div/ul/li[2]/a")).click();
       browser.sleep(2000);
    } else {
      
        console.log('There are zero quotes, so unable to sort');
    }
    });
    element(by.xpath("//div[@class='ebIcon_filter ecb-widgetsFilterIcon pull-right ng-scope']")).click();
    browser.sleep(2000);
     browser.actions().mouseMove(element(by.xpath("//div[@id='filterModal']/div/div/div[2]/form/div/div/div[4]/label"))).perform();
     
     element(by.xpath("//div[@class='form-group col-sm-12 col-xs-12 col-md-12 ecb-sortBy ng-scope']/div/button/span")).click();
     var sortinginfilter = element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[3]/li/div/ul/li[2]/a"));
      sortinginfilter.isPresent().then(function(result) {
    if ( result ) {
        browser.actions().mouseMove(element(by.xpath("//div[@id='filterModal']/div/div/div[2]/form/div/div/div[4]/label"))).perform();
       element(by.xpath("//div[@id='filterModal']/div/div/div[2]/form/div/div/div[4]/div/ul/li[2]/a")).click();
       browser.sleep(2000);
       element(by.xpath("//div[@id='filterModal']/div/div/div[1]/div[2]/button[1]")).click();
       browser.sleep(2000);
    } else {
     
      console.log('There are no quotes ,so unable to sort');
      element(by.xpath("//div[@id='filterModal']/div/div/div[1]/div/button[2]")).click();
      browser.sleep(2000);
    }
      });
     
      element(by.xpath("//ecb-invoice/div/div[1]/span/i")).click();
      browser.sleep(2000);
           
      } else {
   console.log('quotes and transactions widget is absent');
      }
    });      
}
); 
});     