
var HtmlReporter = require("protractor-html-screenshot-reporter");
var testdata = require('../inputs/testdata/usageactivity.json');


describe('UI Baseline App', function() {
  it('should have a title', function() {
    browser.get(testdata.url.URL);
    expect(browser.getTitle()).toEqual(testdata.url.Title);
    
  });
})
describe('login page', function() {
    
    it('should render login page', function() {
      expect(browser.getCurrentUrl()).toMatch(testdata.url.CurrentUrl);
       
       
       element(by.id('username')).sendKeys(testdata.user.username);
       element(by.id('password')).sendKeys(testdata.user.passwordField);
      
       
    });
    
     
     
    it('Validate title and URL', function() {

      // Click to sign in - waiting for Angular as it is manually bootstrapped.
      
      browser.findElement(By.xpath("//div[@class='col-xs-4 col-sm-4 col-md-4']/button")).click().then(function() {

      browser.waitForAngular();
      expect(browser.getCurrentUrl()).toMatch(testdata.url.DashBoardURL);
        expect(browser.getTitle()).toEqual(testdata.url.DashBoard);
       }, 1000);
       //browser.getPageSource('http://localhost:8080/mt');
    });
        
    
     
    it('usage activity widget',function(){ 
       browser.driver.manage().window().maximize();
      
        var widget =  element(by.xpath("//ecb-usage-activity/div[@class='widget']"));
    widget.isPresent().then(function(result) {
    if ( result ) {
     
       var widget= element(by.xpath("//ecb-usage-activity/div[@class='widget']/div[1]/h2"));
     browser.executeScript('arguments[0].scrollIntoView()',widget.getWebElement());
      expect(element(by.xpath("//ecb-usage-activity/div[@class='widget']/div[1]/h2")).getText()).toEqual(testdata.widgetname);
     
    var widget =  element(by.xpath("//div[@class='ecb-usageActivity-Svg']"));
    widget.isPresent().then(function(result) {
    if ( result ) {
    
     var img =  element(by.xpath("//div[@class='ecb-billingactivity-svg']"));
    img.isPresent().then(function(result) {
    if ( result ) {
      
       items =element.all(by.css(".bar"));
      startCount = items.count();
      expect(startCount).toEqual(testdata.numofbarsinboth); 
      
        console.log('billing history present');
       
         expect(element(by.css('g.tick>text')).getText()).toEqual(testdata.date);
         var bar =  element(by.css("rect.bar"));
         bar.isPresent().then(function(result) {
         if ( result ) {
         element(by.css("rect.bar")).click(); 
           
      browser.sleep(3000);
         } else {
         console.log('bar graphs are not present to click');
         }
        });
      
      } else {
      
      
         items =element.all(by.css(".bar"));
     startCount = items.count();
      expect(startCount).toEqual(testdata.usagebars); 
      console.log('there are 5 bars in usage activity');
         
        expect(element(by.css('g.tick>text')).getText()).toEqual(testdata.date);
        var graph = element(by.css("rect.bar"));
        graph.isPresent().then(function(result) {
        if ( result ) {
      element(by.css("rect.bar")).click(); 
      browser.sleep(3000);
        } else {
          console.log('bar graphs are not present to click');
        }
      });
      
        // presence of x-axis and y axis text
       element(by.xpath("//text[contains(text(),testdata.xaxis)]")).isPresent();
               element(by.xpath("//text[contains(text(),testdata.yaxis)]")).isPresent();
   
    }
        
    }); 

       
       
      
      } else {
         element(by.xpath("//div[@class='content usage-activity']/div")).isPresent();
         expect(element(by.xpath("//div[@class='content usage-activity']/div")).getText()).toEqual(testdata.displaymessage);
         console.log('No prior usage activity');
         
        }
        });
      
    }else {
        console.log('widget is absent');
        }
        }); 
        
       
        }); 

}
);     
     