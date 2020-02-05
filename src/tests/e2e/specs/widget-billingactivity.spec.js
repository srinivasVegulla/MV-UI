var HtmlReporter = require("protractor-html-screenshot-reporter");

var testdata = require('../inputs/testdata/billingactivity.json');

describe('UI Baseline App', function() {
 
    
   
     it('Validate Billing history',function() {
      browser.sleep(3000);
       var widget =  element(by.xpath("//ecb-billing-activity[@class='ng-isolate-scope']"));
    widget.isPresent().then(function(result) {
    if ( result ) {
       var el = element(by.xpath("//ecb-billing-activity[@class='ng-isolate-scope']"));
      browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
   
        expect(element(by.xpath("//ecb-billing-activity[@class='ng-isolate-scope']/div/div/h2")).getText()).toEqual(testdata.widgetname);
        var widget =  element(by.xpath("//div[@class='ecb-billingactivity-svg']"));
    widget.isPresent().then(function(result) {
    if ( result ) {
        
        var img =  element(by.xpath("//div[@class='ecb-usageActivity-Svg']"));
    img.isPresent().then(function(result) {
    if ( result ) {


       expect(element(by.className("xAxisLabel")).getText()).toEqual(testdata.Invoices.Xaxis);
        expect(element(by.className("yAxisLabel")).getText()).toEqual(testdata.Invoices.Yaxis);
        //expect(element(by.xpath("//text[conatins(text(),Invoice Date)]")).isDisplayed()).toBe(true);
        items =element.all(by.css(".bar"));
      startCount = items.count();
      expect(startCount).toEqual(testdata.num); 
        console.log('usage present');
      //expect(element(by.xpath("//svg[@class='ecb-usageSvg-contentResponsive']/g/g/text[1]")).getText()).toEqual(testdata.date);
      expect(element(by.css('g.tick>text')).getText()).toEqual(testdata.date);
      var bar = element(by.css("rect.bar"));
      bar.isPresent().then(function(result){
        if (result) {
      element(by.css("rect.bar")).click(); 
      browser.sleep(3000);
        } else {
          console.log('bar graphs are not there to click');
        }
      });
       expect(element(by.css('g.tick>text')).getText()).toEqual(testdata.date1); 
        
      }else {
        
         items =element.all(by.css(".bar"));
      startCount = items.count();
      expect(startCount).toEqual(5); 
         console.log('usage absent');
        expect(element(by.css('g.tick>text')).getText()).toEqual(testdata.date);
        var graph = element(by.css("rect.bar"));
        graph.isPresent().then(function(result){
          if (result) {
      element(by.css("rect.bar")).click(); 
      browser.sleep(3000);
          } else {
          console.log('bar graphs are not present to click');
          }
        });
      
       expect(element(by.css('g.tick>text')).getText()).toEqual(testdata.date1); 
        
        
        }
        }); 
       
       
        
      }else {
        console.log('No billing activity for current period');
        }
        }); 
      
      
      
      
      }else {
        console.log('widget is absent');
        }
        }); 
        

        });
}
); 