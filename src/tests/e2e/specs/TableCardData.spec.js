var testdata = require('../inputs/testdata/Login.json');
var testData2 = require('../inputs/testData/JsonFileCreation.json');
var testData3 = require('../inputs/testData/XpathRepository.json');

describe('UI Baseline App', function () {
    
    it('should have  same data in tabular as well as card view for payments recieved', function () {
        element(by.xpath(testData3.LayerSelector.Dropdown)).click();
        element(by.xpath(testData3.LayerSelector.Bills)).click();
        expect(element(by.xpath(testData3.Charges.PaymentReceived_Button)).isDisplayed()).toBe(true);
        browser.actions().mouseMove(element(by.xpath(testData3.Charges.PaymentReceived_Button))).perform();
        browser.sleep(2000);
        element(by.xpath(testData3.Charges.Popup_ViewAll)).click();
        element(by.xpath(testData3.Adjustment.Settings)).click();
              
   // all
        element(by.xpath(testData3.OfferCharge.All_Button)).click();
        browser.sleep(1000);
        element(by.xpath(testData3.OfferCharge.Settings_Apply_Button)).click();
        browser.sleep(2000);
        //get text of tabular view header
        var a = element.all(by.xpath(testData3.OfferCharge.Table_Heading)).getText();
        //get table data
        var b = element.all(by.xpath(testData3.OfferCharge.Table_Data)).getText();
        //click on card veiw
        element(by.xpath(testData3.Payments.CardView)).click();
        //get card view heading
        var c = element.all(by.xpath(testData3.OfferCharge.Card_Heading)).getText();
        //get card view data
        var d = element.all(by.css(testData3.OfferCharge.Card_Data)).getText();
        //validate card and tabular view headings and data
        expect(a[0]).toEqual(c[0]);
        expect(a[1]).toEqual(c[1]);
        expect(a[2]).toEqual(c[2]);
        expect(a[3]).toEqual(c[3]);
        expect(a[4]).toEqual(c[4]);
        expect(a[5]).toEqual(c[5]);
        expect(b[0]).toEqual(d[0]);
        expect(b[1]).toEqual(d[1]);
        expect(b[2]).toEqual(d[2]);
        expect(b[3]).toEqual(d[3]);
        expect(b[4]).toEqual(d[4]);
        expect(b[5]).toEqual(d[5]);
        

    });
    it('should have  same data in tabular as well as card view for misc adjustments', function () {
        browser.refresh();
        element(by.xpath(testData3.LayerSelector.Dropdown)).click();
        element(by.xpath(testData3.LayerSelector.Bills)).click();
        //var testData5=protractor.loginHelpers.dashboard();
        //browser.actions().mouseMove(element(by.xpath("//a[contains(text(),'Miscellaneous Adjustments')]"))).perform();
        browser.sleep('2000');
        element(by.css(testData3.OfferCharge.Misc)).click();
      
           var a = element.all(by.xpath(testData3.OfferCharge.Table_Heading)).getText();
           var b = element.all(by.xpath(testData3.OfferCharge.Table_Data)).getText();
           element(by.xpath(testData3.Payments.CardView)).click();
           var c = element.all(by.xpath(testData3.OfferCharge.Card_Heading)).getText();
           var d = element.all(by.css(testData3.OfferCharge.Card_Data)).getText();
           expect(a[0]).toEqual(c[0]);
           expect(a[1]).toEqual(c[1]);
           expect(a[2]).toEqual(c[2]);
           expect(a[3]).toEqual(c[3]);
           expect(a[4]).toEqual(c[4]);
           expect(a[5]).toEqual(c[5]);
           expect(b[0]).toEqual(d[0]);
           expect(b[1]).toEqual(d[1]);
           expect(b[2]).toEqual(d[2]);
           expect(b[3]).toEqual(d[3]);
           expect(b[4]).toEqual(d[4]);
           expect(b[5]).toEqual(d[5]);

           //MVIEW-2822 
      //click on tabular view
      element(by.xpath(testData3.Payments.CardView)).click();
      //click on global filter
      element(by.xpath(testData3.ActivityLog.Filter_Icon)).click();
      //send some amount in amount column
      element.all(by.css('[ng-model="vm.filterFields[item.key]"]')).get(4).sendKeys('1234');
      element(by.xpath(testData3.OfferCharge.Global_Apply)).click();
      expect(b[5]).toEqual(d[5]);
      //check whether table is absent
      expect(element(by.xpath(testData3.OfferCharge.Table_Data)).isPresent()).toBeFalsy();
      //click on global filter
      element(by.xpath(testData3.ActivityLog.Filter_Icon)).click();
      //send some amount in amount column
      element.all(by.css('[ng-model="vm.filterFields[item.key]"]')).clear();
      element.all(by.css('[ng-model="vm.filterFields[item.key]"]')).get(4).sendKeys('4');
      browser.sleep(3000);
      element(by.xpath(testData3.OfferCharge.Global_Apply)).click();
      expect(b[5]).toEqual(d[5]);
      //check whether table is absent
      expect(element(by.xpath(testData3.OfferCharge.Table_Data)).isDisplayed()).toBe(true);
    
    
    
    });
    it('should have  same data in tabular as well as card view for NonSTandard Charges', function () {
        browser.refresh();
        element(by.xpath(testData3.LayerSelector.Dropdown)).click();
        element(by.xpath(testData3.LayerSelector.Bills)).click();
        //var testData5=protractor.loginHelpers.dashboard();
        //browser.actions().mouseMove(element(by.xpath("//a[contains(text(),'Miscellaneous Adjustments')]"))).perform();
        browser.sleep('2000');
        element(by.css(testData3.OfferCharge.NSC)).click();
        element(by.xpath(testData3.Adjustment.Settings)).click();
              
        // all
             element(by.xpath(testData3.OfferCharge.All_Button)).click();
             browser.sleep(1000);
             element(by.xpath(testData3.OfferCharge.Settings_Apply_Button)).click();
             browser.sleep(2000);
             var a = element.all(by.xpath(testData3.OfferCharge.Table_Heading)).getText();
             var b = element.all(by.xpath(testData3.OfferCharge.Table_Data)).getText();
             element(by.xpath(testData3.Payments.CardView)).click();
             var c = element.all(by.xpath(testData3.OfferCharge.Card_Heading)).getText();
             var d = element.all(by.css(testData3.OfferCharge.Card_Data)).getText();
             expect(a[0]).toEqual(c[0]);
             expect(a[1]).toEqual(c[1]);
             expect(a[2]).toEqual(c[2]);
             expect(a[3]).toEqual(c[3]);
             expect(a[4]).toEqual(c[4]);
             expect(a[5]).toEqual(c[5]);
             expect(a[6]).toEqual(c[6]);
             expect(a[7]).toEqual(c[7]);
             expect(a[8]).toEqual(c[8]);
             expect(a[9]).toEqual(c[9]);
             expect(a[10]).toEqual(c[10]);
             expect(a[11]).toEqual(c[11]);
             expect(a[12]).toEqual(c[12]);
             expect(a[13]).toEqual(c[13]);
             expect(a[14]).toEqual(c[14]);
             expect(a[15]).toEqual(c[15]);
             
            
             expect(b[0]).toEqual(d[0]);
             expect(b[1]).toEqual(d[1]);
             expect(b[2]).toEqual(d[2]);
             expect(b[3]).toEqual(d[3]);
             expect(b[4]).toEqual(d[4]);
             expect(b[5]).toEqual(d[5]);
             expect(b[6]).toEqual(d[6]);
             expect(b[7]).toEqual(d[7]);
             expect(b[8]).toEqual(d[8]);
             expect(b[9]).toEqual(d[9]);
             expect(b[10]).toEqual(d[10]);
             expect(b[11]).toEqual(d[11]);
             expect(b[12]).toEqual(d[12]);
             expect(b[13]).toEqual(d[13]);
             expect(b[14]).toEqual(d[14]);
             expect(b[15]).toEqual(d[15]);
             


      //MVIEW-2822 
      //click on tabular view
      element(by.xpath(testData3.Payments.CardView)).click();
      //click on global filter
      element(by.xpath(testData3.ActivityLog.Filter_Icon)).click();
      //send some amount in amount column
      element.all(by.css('[ng-model="vm.filterFields[item.key]"]')).get(1).sendKeys('1234');
      element(by.xpath(testData3.OfferCharge.Global_Apply)).click();
      expect(b[5]).toEqual(d[5]);
      //check whether table is absent
      expect(element(by.xpath(testData3.OfferCharge.Table_Data)).isPresent()).toBeFalsy();
    
    
    
    });
    it('should have  same data in tabular as well as card view for postbill adjustments', function () {
        browser.refresh();
        element(by.xpath(testData3.LayerSelector.Dropdown)).click();
        element(by.xpath(testData3.LayerSelector.Bills)).click();
        //var testData5=protractor.loginHelpers.dashboard();
        //browser.actions().mouseMove(element(by.xpath("//a[contains(text(),'Miscellaneous Adjustments')]"))).perform();
        //After mouse hovering the pop up is displayed
    
        browser.actions().mouseMove(element(by.xpath(testData3.PriorBalance.PostBillAdjustment))).perform();
       browser.sleep(1000);

        //After mouse hovering the adjustments are displayed in the card view
        expect(element(by.xpath(testData3.PriorBalance.PostBillAdjustment_Popup_ListOfTransaction)).isDisplayed()).toBe(true);

        //click on view all button in order to validate the card view
        element(By.xpath(testData3.Charges.Popup_ViewAll)).click();
          browser.sleep(2000);
          element(by.xpath(testData3.Adjustment.Settings)).click();
              
          // all
               element(by.xpath(testData3.OfferCharge.All_Button)).click();
               browser.sleep(1000);
               element(by.xpath(testData3.OfferCharge.Settings_Apply_Button)).click();
               browser.sleep(2000);
               var a = element.all(by.xpath(testData3.OfferCharge.Table_Heading)).getText();
               var b = element.all(by.xpath(testData3.OfferCharge.Table_Data)).getText();
               element(by.xpath(testData5.Payments.CardView)).click();
               var c = element.all(by.xpath(testData3.OfferCharge.Card_Heading)).getText();
               var d = element.all(by.css(testData3.OfferCharge.Card_Data)).getText();
               expect(a[0]).toEqual(c[0]);
               expect(a[1]).toEqual(c[1]);
               expect(a[2]).toEqual(c[2]);
               
               expect(b[0]).toEqual(d[0]);
               expect(b[1]).toEqual(d[1]);
               expect(b[2]).toEqual(d[2]);
               
    
    });
    it('should have  same data in tabular as well as card view for prebill adjustments', function () {
        browser.refresh();
        element(by.xpath(testData3.LayerSelector.Dropdown)).click();
        element(by.xpath(testData3.LayerSelector.Bills)).click();
        //var testData5=protractor.loginHelpers.dashboard();
        //browser.actions().mouseMove(element(by.xpath("//a[contains(text(),'Miscellaneous Adjustments')]"))).perform();
       //validate the prebill adjustments
        expect(element(by.xpath(testData3.Charges.PrebillAdjustment)).isDisplayed()).toBe(true);

        browser.sleep(2000);
        //mouse hover on the prebill adjustments
        browser.actions().mouseMove(element(by.xpath(testData3.Charges.PrebillAdjustment))).perform();
       browser.sleep(1000);
      //Adjustments are dispalyed in the card view
      // expect(element(by.xpath(testData3.PriorBalance.PostBillAdjustment_Popup_ListOfTransaction)).isDisplayed()).toBe(true);
      //Click on view all button
      element(By.xpath(testData3.Charges.Popup_ViewAll)).click();
     element(by.xpath(testData3.Adjustment.Settings)).click();
              
   // all
        element(by.xpath(testData3.OfferCharge.All_Button)).click();
        browser.sleep(1000);
        element(by.xpath(testData3.OfferCharge.Settings_Apply_Button)).click();
        browser.sleep(2000);
        var a = element.all(by.xpath(testData3.OfferCharge.Table_Heading)).getText();
        var b = element.all(by.xpath(testData3.OfferCharge.Table_Data)).getText();
        element(by.xpath(testData5.Payments.CardView)).click();
        var c = element.all(by.xpath(testData3.OfferCharge.Card_Heading)).getText();
        var d = element.all(by.css(testData3.OfferCharge.Card_Data)).getText();
        expect(a[0]).toEqual(c[0]);
        expect(a[1]).toEqual(c[1]);
        expect(a[2]).toEqual(c[2]);
       
        expect(b[0]).toEqual(d[0]);
        expect(b[1]).toEqual(d[1]);
        expect(b[2]).toEqual(d[2]);
        
    
    });
    



}); 