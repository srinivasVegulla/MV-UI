var HtmlReporter = require("protractor-html-screenshot-reporter");
var testdata = require('../inputs/testdata/Subscriptionsearch.json');

describe('UI Baseline App', function() {
  

      
    it('Validate offerstore',function() {
     
      browser.sleep(2000);
      element(by.xpath("//i[@class='ebIcon ebIcon_small ebIcon_interactive ebIcon_downArrow_10px']")).click();
         element(by.xpath("//div[@class='ebBreadcrumbs-list ecb-navOn']/ul/li[3]/a")).click();
         browser.sleep(3000);
           
         var offerstore = element(by.xpath("//ecb-subscriptions/div/div/div[2]/div/div[1]"));
          offerstore.isPresent().then(function(result) {
    if ( result ) {
      console.log('offers are present in the offer store');
      
   element(by.xpath("//div[@id='dashboardContainer']/div[9]/ecb-subscriptions/div/div/div[1]/input")).click();
   element(by.xpath("//div[@id='dashboardContainer']/div[9]/ecb-subscriptions/div/div/div[1]/input")).sendKeys(testdata.searchname);

      
     browser.sleep(2000);
  element(by.xpath("//div[@id='dashboardContainer']/div[9]/ecb-subscriptions/div/div/div[1]/button/span")).click();
      browser.sleep(2000);
      var searchfound = element(by.xpath("//div[@ng-if='vm.isOffersAvailable']"));
      searchfound.isPresent().then(function(result) {
        if ( result ) {
          console.log('Found some offers related to your search');
          browser.sleep(1000);
          element(by.xpath("//i[@class='ebIcon ebIcon_small ebIcon_interactive ebIcon_downArrow_10px']")).click();
          element(by.xpath("//div[@class='ebBreadcrumbs-list ecb-navOn']/ul/li[1]/a")).click();
          browser.sleep(5000);
        } else {
          console.log('No offers found related to your search please try again');
          browser.sleep(1000);
          element(by.xpath("//i[@class='ebIcon ebIcon_small ebIcon_interactive ebIcon_downArrow_10px']")).click();
          element(by.xpath("//div[@class='ebBreadcrumbs-list ecb-navOn']/ul/li[1]/a")).click();
          browser.sleep(5000);
        }
      });
    } else {
      console.log('offers are not present in the store');
    }
          });
    
    }
);
});
      