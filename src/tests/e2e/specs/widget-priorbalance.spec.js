var HtmlReporter = require("protractor-html-screenshot-reporter");

var testdata = require('../inputs/testdata/previousperiodbalance.json');

describe('UI Baseline App', function() {
  
    it('Validate Summarised Charge details',function() {
      
      element(by.xpath("//i[@class='ebIcon ebIcon_small ebIcon_interactive ebIcon_downArrow_10px']")).click();
      element(by.xpath("//div[@class='ebBreadcrumbs-list ecb-navOn']/ul/li[1]/a")).click();
      browser.sleep(2000);
      browser.refresh();
      browser.sleep(2000);
      element(by.xpath("//button[contains(text(),'Go to Bills >')]")).click();
      browser.sleep(5000);
       var widget = element(by.xpath("//ecb-payments-credits-adjustments/div/div[1]/h2"));
     widget.isPresent().then(function(result) {
    if ( result ) {
        console.log('widget is present');
      var el = element(by.xpath('//ecb-payments-credits-adjustments[@class="ng-isolate-scope"]/div/div/h2'));
      browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
        browser.driver.manage().window().maximize();
        expect(element(by.xpath('//ecb-payments-credits-adjustments[@class="ng-isolate-scope"]/div/div/h2')).isDisplayed()).toBe(true);
       
         expect(element(by.xpath('//div[@class="amount-tile"]/span')).isDisplayed()).toBe(true);
        
         expect(element(by.xpath('//ecb-payments-credits-adjustments[@class="ng-isolate-scope"]/div/div[2]/table/tbody/tr/td[1]')).isDisplayed()).toBe(true);
         expect(element(by.xpath('//ecb-payments-credits-adjustments[@class="ng-isolate-scope"]/div/div[2]/table/tbody/tr/td[1]')).getText()).toEqual('Previous Balance');
         expect(element(by.xpath('//ecb-payments-credits-adjustments[@class="ng-isolate-scope"]/div/div[2]/table/tbody/tr/td[2]')).isDisplayed()).toBe(true);
                                                                                                                                                                     expect(element(by.xpath('//ecb-payments-credits-adjustments[@class="ng-isolate-scope"]/div/div[2]/table/tbody/tr[2]/td[1]/button')).isDisplayed()).toBe(true);
          expect(element(by.xpath('//ecb-payments-credits-adjustments[@class="ng-isolate-scope"]/div/div[2]/table/tbody/tr[2]/td[1]/button')).getText()).toEqual('Postbill Adjustments');
          expect(element(by.xpath('//ecb-payments-credits-adjustments[@class="ng-isolate-scope"]/div/div[2]/table/tbody/tr/td[2]/span')).isDisplayed()).toBe(true);
         
          expect(element(by.xpath('//ecb-payments-credits-adjustments[@class="ng-isolate-scope"]/div/div[2]/table/tbody/tr[3]/td[1]')).isDisplayed()).toBe(true);
          expect(element(by.xpath('//ecb-payments-credits-adjustments[@class="ng-isolate-scope"]/div/div[2]/table/tbody/tr[3]/td[1]')).getText()).toEqual('Payments Received');
          expect(element(by.xpath('//ecb-payments-credits-adjustments[@class="ng-isolate-scope"]/div/div[2]/table/tbody/tr[3]/td[2]')).isDisplayed()).toBe(true);
         
          browser.actions().mouseMove(element(by.xpath("//ecb-payments-credits-adjustments[@class='ng-isolate-scope']/div/div[2]/table/tbody/tr[2]/td[1]"))).perform();
      browser.sleep(1000);
      
 //validation of postbill adjustments       
       var popupdisplay =  element(by.xpath("//div[@class='ecb-billAdjustmentPopup']/div/div/h3"));
    popupdisplay.isPresent().then(function(result) {
    if ( result ) {
       
      expect(element(by.xpath("//div[@class='ecb-billAdjustmentPopup']/div/div/h3")).getText()).toEqual(testdata.bills);
      expect(element(by.xpath("//div[@class='ecb-billAdjustmentPopup']/div/div/div[2]/div/div[1]/div/div[1]")).isDisplayed()).toBe(true); 
      expect(element(by.xpath("//div[@class='ecb-billAdjustmentPopup']/div/div/div[2]/div/div[1]/div/div[2]")).isDisplayed()).toBe(true); 
      expect(element(by.xpath("//div[@class='ecb-billAdjustmentPopup']/div/div/div[2]/div/div[1]/div[2]/h4")).isDisplayed()).toBe(true); 
        var viewallButton =  element(By.xpath("//div[@class='ecb-billAdjustmentPopup']/div/div/div[3]/button"));
    viewallButton.isPresent().then(function(result) {
    if ( result ) {
      element(By.xpath("//div[@class='ecb-billAdjustmentPopup']/div/div/div[3]/button")).click();         
       //card fade-view  
      expect(element(by.xpath("//div[@class='widget ecb-paymentCreditsExpandMain card-expanded']/div[1]/div/div[1]/span/b")).isDisplayed()).toBe(true);     
    
       // card  fade view image        
     expect(element(by.xpath("//div[@class='widget ecb-paymentCreditsExpandMain card-expanded']/div[1]/div/div[2]/div/div[2]/img")).isDisplayed()).toBe(true);     
     //tabular view icon click   
    element(by.xpath("//div[@class='widget ecb-paymentCreditsExpandMain card-expanded']/div[1]/div/div[2]/div/div[1]/img")).click();
     browser.sleep(3000);
     
      
        expect(element(by.xpath("//div[@class='widget ecb-paymentCreditsExpandMain card-expanded']/div[1]/div/div[1]/span/b")).isDisplayed()).toBe(true);  
      // clicking card view icon
           element(by.xpath("//div[@class='widget ecb-paymentCreditsExpandMain card-expanded']/div[1]/div/div[2]/div/div[2]/img")).click(); 
           browser.sleep(2000);
         element(by.xpath("//div[@class='widget ecb-paymentCreditsExpandMain card-expanded']/div[1]/div/div[2]/div/div[1]/img")).click();
        
      element(by.xpath("//div[@class='widget ecb-paymentCreditsExpandMain card-expanded']/div[1]/div/div[2]/div/div[1]/img")).click();
      expect(element(by.xpath("//div[@ng-click='vm.togglePcaTabularViewSettings()']/span[@class='ebText']/b")).isDisplayed()).toBe(true); 
     
      
      
      expect(element(by.xpath("//div[@ng-repeat='(colRenderIndex, col) in colContainer.renderedColumns track by col.uid']")).isDisplayed()).toBe(true);
      
     //session id
      
        expect(element(by.xpath("//div[@class='ecb-settingsColumnList']/ul/li[1]/label/span[@class='ebCheckbox-label ng-binding']")).getText()).toEqual('Session Id');
       //box
       
         element(by.xpath("//div[@class='ecb-settingsColumnList']/ul/li[1]/label/input")).click();
           element(by.xpath("//button[@ng-click='vm.applyPcaCancelSettings(1)']")).click();
      browser.sleep(3000);
       browser.waitForAngular();
       element(by.xpath("//span[@class='ebIcon_settings ecb-headerIcons']")).click();
      element(by.xpath("//a[@ng-click='vm.togglePcaSelectAll(1)']")).click(); 
 // all
      element(by.xpath("//button[@ng-click='vm.applyPcaCancelSettings(1)']")).click();
      expect(element(by.xpath("//div[@class='ecb-offerChargeTabularView ng-scope']")).isDisplayed()).toBe(true);
       element(by.xpath("//span[@class='ebIcon_settings ecb-headerIcons']")).click();
       browser.sleep(1000);
       // none    
      element(by.xpath("//a[@ng-click='vm.togglePcaSelectAll(0)']")).click(); 
       element(by.xpath("//button[@ng-click='vm.applyPcaCancelSettings(1)']")).click();

      expect(element(by.xpath("//span[@class='pull-right ebColor_textLinkBlue ecb-pcacloseImageViewAll expanded-charges-view']")).isPresent()).toBe(false);
  
     
       browser.sleep(1000);
   
        element(by.xpath("//span[@ng-click='vm.pcaExpandedStateclose()']/i")).click();
        browser.sleep(1000);
        expect(browser.getTitle()).toEqual('ECB MetraView : Dashboard');     
      
      } else {
        console.log('Postbill viewall is not there');
        }
        });
    } 
    else {
        console.log('Postbill  value is zero');
        }
        });    

//payments recieved display    
    
    browser.actions().mouseMove(element(by.xpath("//ecb-payments-credits-adjustments[@class='ng-isolate-scope']/div/div[2]/table/tbody/tr[3]/td[1]"))).perform();
      browser.sleep(1000);
      var paymentsreceiveddisplay =  element(by.xpath("//div[@class='ecb-billAdjustmentPopup']/div/h3"));
    paymentsreceiveddisplay.isPresent().then(function(result) {
    if ( result ) {
    
       expect(element(by.xpath("//div[@class='ecb-billAdjustmentPopup']/div/h3")).getText()).toEqual(testdata.PR);
      browser.sleep(3000);
      expect(element(by.xpath("//div[@class='ecb-billAdjustmentPopup']/div/div[2]/div/div/div[2]/table/tbody/tr[1]/td[1]")).getText()).toEqual(testdata.cardno);
      expect(element(by.xpath("//div[@class='ecb-billAdjustmentPopup']/div/div[2]/div/div/div[2]/table/tbody/tr[1]/td[2]")).isDisplayed()).toBe(true); 
      expect(element(by.xpath("//div[@class='ecb-billAdjustmentPopup']/div/div[2]/div/div/div[2]/table/tbody/tr[2]/td[1]")).getText()).toEqual(testdata.transid);
      expect(element(by.xpath("//div[@class='ecb-billAdjustmentPopup']/div/div[2]/div/div/div[2]/table/tbody/tr[2]/td[2]")).isDisplayed()).toBe(true); 
      expect(element(by.xpath("//div[@class='ecb-billAdjustmentPopup']/div/div[2]/div/div/div[2]/div")).isDisplayed()).toBe(true); 
      
     expect(element(by.xpath("//div[@class='ecb-billAdjustmentPopup']/div/div[2]/div/div/div/div[1]")).isDisplayed()).toBe(true); 
      expect(element(by.xpath("//div[@class='ecb-billAdjustmentPopup']/div/div[2]/div/div/div/div[2]")).isDisplayed()).toBe(true); 
      var paymentsviewlldisplay =  element(by.xpath("//div[@class='ebDialogBox-actionBlock text-center']/button"));
         paymentsviewlldisplay.isPresent().then(function(result) {
    if ( result ) {
      
      expect(element(by.xpath("//div[@class='ebDialogBox-actionBlock text-center']/button")).isDisplayed()).toBe(true);
      expect(element(by.xpath("//div[@class='ebDialogBox-actionBlock text-center']/button")).getText()).toEqual(testdata.view);
      element(by.xpath("//div[@class='ebDialogBox-actionBlock text-center']/ button")).click();
      browser.sleep(2000);
      element(by.xpath("//button[@id='dropdownMenu2']/span[2]")).click();
      element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[1]/li/div/ul/li/a")).click();
      element(by.xpath("//button[@id='dropdownMenu3']/span")).click();
      element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[2]/li/div/ul/li[1]/a")).click();
      browser.sleep(2000);
      element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[3]/li/div/button/span")).click();
      element(by.xpath("//nav[@class='col-md-12 visible-lg ebHorizontalBar ng-scope']/div[1]/ul[3]/li/div/ul/li[2]/a")).click();
      browser.sleep(2000);
      element(by.xpath("//div[@class='ebIcon_filter ecb-widgetsFilterIcon pull-right ng-scope']")).click();
      browser.sleep(1000);
      browser.actions().mouseMove(element(by.xpath("//div[@id='filterModal']/div/div/div[2]/form/div/div/div[1]/label"))).perform();
      
      element(by.xpath("//div[@id='filterModal']/div/div/div[1]/div/button[1]")).click();
      browser.sleep(1000);  
      
      //tabular view
      element(by.xpath("//ecb-payments-credits-adjustments/div/div[1]/div/div/div/div[1]/i")).click();
      browser.sleep(2000);
      element(by.xpath("//ecb-payments-credits-adjustments/div/div[1]/div/div[2]/span")).click();
      browser.sleep(1000);
      browser.actions().mouseMove(element(by.xpath("//ecb-payments-credits-adjustments/div/div[2]/div[1]/div[1]/span[2]/b"))).perform();
      element(by.xpath("//a[@ng-click='vm.togglePcaSelectAll(0)']")).click();
      browser.sleep(1000);
      element(by.xpath("//a[@ng-click='vm.togglePcaSelectAll(1)']")).click();
      browser.sleep(500);
      element(by.xpath("//ecb-payments-credits-adjustments/div/div[2]/div[3]/ul/li[1]/div/i")).click();
      expect(element(by.xpath("//button[@ng-click='vm.applyPcaCancelSettings(0)']")).isDisplayed()).toBe(true);
      element(by.xpath("//button[@ng-click='vm.applyPcaCancelSettings(1)']")).click();
      browser.sleep(1000);
      element(by.xpath("//ecb-payments-credits-adjustments/div/div[1]/span/i")).click();
      browser.sleep(3000);


       
        }
        else{
        console.log('Viewall is not present for payments recieved');
        }
      });
      
    }
    
    else {
        console.log('payments recieved  value is zero');
        }
    });
    
    } else {
      console.log('priorbalance widget is absent');
    }
    });
          });
}
); 
