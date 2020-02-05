var HtmlReporter = require("protractor-html-screenshot-reporter");

var testdata = require('../inputs/testdata/addandcancelsubscription.json');


describe('UI Baseline App', function() {
  
    
     it('Validate Subscriptions widget',function() {
         browser.sleep(2000);
  
       var widget = element(by.xpath("//h2[contains(text(),'Subscriptions')]"));
     widget.isPresent().then(function(result) {
       if ( result ) {
          
        var el = element(by.xpath("//h2[contains(text(),'Subscriptions')]"));
      browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
       browser.sleep(500);
      
      var adding = element(by.xpath("//ecb-payer-subscriptions/div/div[2]/div[2]/div/div[2]/div[3]/div[1]/span"));
      adding.isPresent().then(function(result) {
    if ( result ) {
      console.log('subscriptions are present');
      console.log('it is payer account so it can only view no of subscribers subscribed it');
      console.log('it cannot add subscriptions');
      
    } else {
      console.log('It is not an payer  account,so adding subscriptions is possible');
      element(by.xpath("//ecb-subscriptions/div/div[1]/button[2]")).click();
      browser.sleep(1000);
      var offerstore = element(by.xpath("//ecb-subscriptions/div/div/div[2]/div/div[1]"));
          offerstore.isPresent().then(function(result) {
    if ( result ) {
      console.log('offers are present in the offer store');
      var addicon = element(by.xpath("//div[@class='ecb-addSubscriptionIcon']/div/i"));
      addicon.isPresent().then(function(result) {
        if ( result ) {
           expect(element(by.xpath("//div[@class='ecb-addSubscriptionIcon']/div/i")).isDisplayed()).toBe(true);
          browser.actions().mouseMove(element(by.xpath("//div[@class='ecb-addSubscriptionIcon']/div/i"))).perform();
       
        element(by.xpath("//div[@class='ecb-addSubscriptionIcon']/div/i")).click();
     
        //expect(element(by.xpath("//ecb-subscriptions/div/div/div[2]/div/div[1]/div[2]/div[4]/label")).isDisplayed()).toBe(true);
        
        //expect(element(by.xpath("//ecb-subscriptions/div/div/div[2]/div/div[1]/div[2]/div[4]/div/datepicker/i")).isDisplayed()).toBe(true);
        //expect(element(by.xpath("//ecb-subscriptions/div/div/div[2]/div/div[1]/div[2]/div[5]/button[2]/span")).isDisplayed()).toBe(true);        
        
         //expect(element(by.xpath("//ecb-subscriptions/div/div/div[2]/div/div[1]/div[2]/div[5]/button[1]/i")).isDisplayed()).toBe(true);
         element(by.xpath("//ecb-subscriptions/div/div/div[2]/div/div[1]/div[2]/div[5]/button[1]/i")).click();
       
         console.log('if it is not added successfully it will display that something error occured while adding');
         console.log('the product offer may be already added');
         console.log('error occured while adding offer,please contact customer care');
         browser.sleep(1000);
         element(by.xpath("//a[@ng-click='vm.showDashboard()']")).click();
         browser.sleep(2000);
           var el = element(by.xpath("//h2[contains(text(),'Subscriptions')]"));
      browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
       browser.sleep(500);
      
       var offerspresent = element(by.xpath("//ecb-subscriptions/div/div[2]/div[1]"));
       offerspresent.isPresent().then(function(result) {
        if ( result ) {
          browser.actions().mouseMove(element(by.xpath("//ecb-subscriptions/div/div[2]/div[1]"))).perform();
          browser.sleep(1000);
       var cancel = element(by.xpath("//span[contains(text(),'Cancel Subscription')]"));
       cancel.isPresent().then(function(result) {
        if ( result ) {
              
              console.log('this offer can be cancelled');
              element(by.xpath("//button[@ng-class='{disabled:vm.itemDisabled[0] == true}']/span")).click()
              element(by.xpath("//ecb-subscriptions/div/div[2]/div[1]/div[3]/div/div[2]/button[1]")).click();
              browser.sleep(1000);
              element(by.xpath("//ecb-subscriptions/div/div[1]/button/i")).click();
              browser.sleep(1000);
        } else {
          console.log('this offer cannot be cancelled');
        }
      });
        } else {
          console.log('there are no offers to cancel');
        }
      });
        } else {
         console.log('There are no subscriptions to add');          
        }
      });
    } else {
      console.log('There are subscriptions in the offer store');
    }
          });
          
    }
      });
     
    } else {
         console.log('subscriptions widget is absent');
       }
     });
       
       
          });
}
); 