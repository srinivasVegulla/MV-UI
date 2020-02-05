var HtmlReporter = require("protractor-html-screenshot-reporter");

var testdata = require('../inputs/testdata/Download.json');

describe('UI Baseline App', function() {
 
   it('Validate downloads widget',function() {
    
        browser.sleep(3000);
       var widget = element(by.xpath("//ecb-invoice/div/div[1]/h2"));
      widget.isPresent().then(function(result) {
        if ( result ) {
      var el = element(by.xpath("//ecb-invoice/div/div[1]/h2"));
      browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
      browser.sleep(1000);
      
        //statements
   expect(element(by.xpath("// ecb-invoice[@class='ng-isolate-scope']/div/div[2]/div/div/img")).isDisplayed()).toBe(true);
   expect(element(by.xpath("// ecb-invoice[@class='ng-isolate-scope']/div/div[2]/div/div[2]/p")).isDisplayed()).toBe(true);
   expect(element(by.xpath("// ecb-invoice[@class='ng-isolate-scope']/div/div[2]/div/div[2]/p")).getText()).toEqual(testdata.statements);
   var statements =  element(by.xpath("//ecb-invoice/div/div[2]/div[1]/div[2]/div/table/tbody/tr/td/a"));
         statements.isPresent().then(function(result) {
    if ( result ) {
      
    expect(element(by.xpath("//ecb-invoice/div/div[2]/div[1]/div[2]/div/table/tbody/tr/td/a")).getText()).toEqual(testdata.statementname);   
      
    }else
    {
      expect(element(by.xpath("//ecb-invoice/div/div[2]/div[1]/div[2]/p[2]")).isDisplayed()).toBe(true);
      expect(element(by.xpath("//ecb-invoice/div/div[2]/div[1]/div[2]/p[2]")).getText()).toEqual("No statements available"); 
      console.log('no statements');      
    }
  });
  
   //Invoices
   expect(element(by.xpath("// ecb-invoice[@class='ng-isolate-scope']/div/div[2]/div[2]/div/img")).isDisplayed()).toBe(true);
   expect(element(by.xpath("// ecb-invoice[@class='ng-isolate-scope']/div/div[2]/div[2]/div[2]/p")).isDisplayed()).toBe(true);
   expect(element(by.xpath("// ecb-invoice[@class='ng-isolate-scope']/div/div[2]/div[2]/div[2]/p")).getText()).toEqual(testdata.Invoices);
   var Invoices =  element(by.xpath("//ecb-invoice/div/div[2]/div[2]/div[2]/div/table/tbody/tr/td/a"));
         Invoices.isPresent().then(function(result) {
    if ( result ) {
      
    expect(element(by.xpath("//ecb-invoice/div/div[2]/div[2]/div[2]/div/table/tbody/tr/td/a")).getText()).toEqual(testdata.Invoicename);   
      
    }else
    {
      expect(element(by.xpath("//ecb-invoice/div/div[2]/div[2]/div[2]/p[2]")).isDisplayed()).toBe(true);
      expect(element(by.xpath("//ecb-invoice/div/div[2]/div[2]/div[2]/p[2]")).getText()).toEqual("No invoices available for current period"); 
      console.log('no Invoices');      
    }
  });
  
  //creditnotes
  
 
   expect(element(by.xpath("// ecb-invoice[@class='ng-isolate-scope']/div/div[2]/div[3]/div/img")).isDisplayed()).toBe(true);
   expect(element(by.xpath("// ecb-invoice[@class='ng-isolate-scope']/div/div[2]/div[3]/div[2]/p")).isDisplayed()).toBe(true);
   expect(element(by.xpath("// ecb-invoice[@class='ng-isolate-scope']/div/div[2]/div[3]/div[2]/p")).getText()).toEqual(testdata.credits);
   var credits =  element(by.xpath("//ecb-invoice/div/div[2]/div[3]/div[2]/div/table/tbody/tr[1]/td/a"));
         credits.isPresent().then(function(result) {
    if ( result ) {
      
    expect(element(by.xpath("//ecb-invoice/div/div[2]/div[3]/div[2]/div/table/tbody/tr[1]/td/a")).getText()).toEqual(testdata.Creditnotename);   
      
    }else
    {
      expect(element(by.xpath("//ecb-invoice/div/div[2]/div[3]/div[2]/p[2]")).isDisplayed()).toBe(true);
      expect(element(by.xpath("//ecb-invoice/div/div[2]/div[3]/div[2]/p[2]")).getText()).toEqual("No Credit notes available"); 
      console.log('no Creditnotes');      
    }
  });
  
  var Viewall =  element(by.xpath("//ecb-invoice/div/div[3]/p/buuton"));
         Viewall.isPresent().then(function(result) {
    if ( result ) {
      expect(element(by.xpath("//ecb-invoice/div/div[3]/p/buuton")).getText()).toEqual("View All>"); 
      element(by.xpath("//ecb-invoice/div/div[3]/p/buuton")).click();
      browser.sleep(1000);
      
      expect(element(by.xpath("//ecb-invoice/div/div[1]/ul/li[1]/label/span[2]")).getText()).toEqual(testdata.statements);
      expect(element(by.xpath("//ecb-invoice/div/div[1]/ul/li[2]/label/span[2]")).getText()).toEqual(testdata.invoices);
      expect(element(by.xpath("//ecb-invoice/div/div[1]/ul/li[3]/label/span[2]")).getText()).toEqual(testdata.creditnotes);
      // clicking on the check boxes
      element(by.xpath("//ecb-invoice/div/div[1]/ul/li[1]/label/input")).click();
     element(by.xpath("//ecb-invoice/div/div[1]/ul/li[2]/label/input")).click();
     browser.sleep(500);
     element(by.xpath("//ecb-invoice/div/div[1]/ul/li[3]/label/input")).click();
     element(by.xpath("//ecb-invoice/div/div[1]/ul/li[1]/label/input")).click();
     element(by.xpath("//ecb-invoice/div/div[1]/ul/li[2]/label/input")).click();
    element(by.xpath("//button[@id='dropdownMenu2']/span[2]")).click();
     browser.sleep(500);
      element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[1]/li/div/ul/li[2]/a")).click();
      // In daterange view in selected by
      expect(element(by.xpath("//ecb-invoice/div/div[1]/ul/li[1]/label/span[2]")).getText()).toEqual(testdata.creditnotes);
      expect(element(by.xpath("//ecb-invoice/div/div[1]/ul/li[2]/label/span[2]")).getText()).toEqual(testdata.quotes);
       element(by.xpath("//button[@id='dropdownMenu2']/span[2]")).click();
       browser.sleep(500);
     element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[1]/li/div/ul/li[1]/a")).click();
      // clicking on sort by
      element(by.xpath("//button[@id='dropdownMenu3']/span")).click();
      browser.sleep(500);
      element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[2]/li/div/ul/li[4]/a")).click();
      element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[3]/li/div/button/span")).click();
      var noinvoices = element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[3]/li/div/ul/li[2]/a"));
      noinvoices.isPresent().then(function(result) {
    if ( result ) {
           element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[3]/li/div/ul/li[2]/a")).click();
       browser.sleep(500);
    } else {
      
        console.log('There are no invoices, so unable to sort');
    }
    });
    element(by.xpath("//div[@class='ebIcon_filter ecb-widgetsFilterIcon pull-right ng-scope']")).click();
    browser.sleep(500);
     browser.actions().mouseMove(element(by.xpath("//div[@id='filterModal']/div/div/div[2]/form/div/div/div[3]/label"))).perform();
     
     element(by.xpath("//div[@class='form-group col-sm-12 col-xs-12 col-md-12 ecb-sortBy ng-scope']/div/button/span")).click();
     var sortinginfilter = element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[3]/li/div/ul/li[2]/a"));
      sortinginfilter.isPresent().then(function(result) {
    if ( result ) {
        browser.actions().mouseMove(element(by.xpath("//div[@id='filterModal']/div/div/div[2]/form/div/div/div[3]/label"))).perform();
       element(by.xpath("//div[@id='filterModal']/div/div/div[2]/form/div/div/div[3]/div/ul/li[2]/a")).click();
       browser.sleep(500);
       element(by.xpath("//div[@id='filterModal']/div/div/div[1]/div/button[1]")).click();
       browser.sleep(500);
    } else {
     
      console.log('There are no quotes ,so unable to sort');
      element(by.xpath("//div[@id='filterModal']/div/div/div[1]/div/button[2]")).click();
      browser.sleep(500);
    }
      });
     
      element(by.xpath("//ecb-invoice/div/div[1]/span/i")).click();
      browser.sleep(500);
           
    }else
    {
      console.log('No statements,credits,invoices available');
    }
  });
        } else {
          console.log('downloads widget is absent');
        }
      });
       
    });
});