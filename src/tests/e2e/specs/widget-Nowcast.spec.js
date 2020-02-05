var HtmlReporter = require("protractor-html-screenshot-reporter");

var testdata = require('../inputs/testdata/Nowcast.json');

describe('UI Baseline App', function () {
 
  it('Validate Nowcast', function () {
   
    browser.sleep(3000);
    var widget = element(by.xpath("//ecb-now-cast[@class='ng-isolate-scope']"));
    widget.isPresent().then(function (result) {
      if (result) {
        expect(element(by.xpath("//ecb-now-cast[@class='ng-isolate-scope']/div/div/h2")).isDisplayed()).toBe(true);
        expect(element(by.xpath("//ecb-now-cast[@class='ng-isolate-scope']/div/div/h2")).getText()).toEqual(testdata.widgetname);
        var widget = element(by.xpath("//div[@id='nowcast-svg']"));
        widget.isPresent().then(function (result) {
          if (result) {
            expect(element(by.css("text.title")).isDisplayed()).toBe(true);
            expect(element(by.css("text.title")).getText()).toEqual(testdata.name);
            expect(element(by.css("text.decisionDates")).isDisplayed()).toBe(true);
            expect(element(by.css("text.decisionDates")).getText()).toEqual(testdata.decisiondate);
            //expect(element(by.cssContainingText('.subtitle', testdata.revenue)).isDisplayed()).toBe(true);
          
            var viewall = element(by.xpath("//div[@id='nowcast-widget']/div[3]/p/button"));
            viewall.isPresent().then(function (result) {
              if (result) {
                viewall.click();
                expect(element(by.css("#nowcast-widget div h2")).getText()).toEqual(testdata.widgetname);               
                browser.sleep(3000);
               element(by.xpath("//button[@id='dropdownMenu2']/span[2]")).click();
               element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div/ul[1]/li/div/ul/li/a")).click();
               browser.sleep(500);
               element(by.xpath("//button[@id='dropdownMenu3']/span")).click();
               element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div/ul[2]/li/div/ul/li[1]/a")).click();
               browser.sleep(500);
               element(by.xpath("//div[@id='nowcast-widget']/div[1]/span")).click();
              } else {
                console.log('view all is not present');
              }
            });
          } else {
            console.log('nowcast data  is absent');
            expect(element(by.xpath("//div[@id='nowcast-body']/text")).isDisplayed()).toBe(true);
            expect(element(by.xpath("//div[@id='nowcast-body']/text")).getText()).toEqual(testdata.nodata);
          }
        });
      } else {
        console.log('nowcaste is absent');
      }
    });
  });
}
); 