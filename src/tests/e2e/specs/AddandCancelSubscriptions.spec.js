var testdata1 = require('../inputs/testdata/JsonFileCreation.json');
var testdata2 = require('../inputs/testdata/Login.json');
var testdata3 = require('../inputs/testdata/XpathRepository.json');



describe('Validate Subscriptions Widget', function () {

 it('Login with new corporate user', function(){
      
        var testdata8=protractor.loginHelpers.langCode;
        function login(testdata8){
              var testdata5 = protractor.loginHelpers.lang; 
              browser.get(testdata1.URL);
              browser.sleep(5000);
              element(by.css(testdata5)).click();
              browser.sleep(5000);      
        switch (testdata8) {
            case "BR":
        //Loading the Login Page
        //Login to Metraview with Corporate Account(not subscribed to any PO) 
        element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata1.corpBR);
        element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata1.passwordField);
        browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
        browser.sleep(12000);
            break;
            case "DE":
        
        //Login to Metraview with Corporate Account(not subscribed to any PO) 
        element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata1.corpDE);
        element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata1.passwordField);
        browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
        browser.sleep(12000);
            break;
            case "EG":
        
        //Login to Metraview with Corporate Account(not subscribed to any PO) 
        element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata1.corpEG);
        element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata1.passwordField);
        browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
        browser.sleep(12000);
            break;
            case "ES":
        
        //Login to Metraview with Corporate Account(not subscribed to any PO) 
        element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata1.corpES);
        element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata1.passwordField);
        browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
        browser.sleep(12000);
                break;
            case "FR":
        
        //Login to Metraview with Corporate Account(not subscribed to any PO) 
        element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata1.corpFR);
        element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata1.passwordField);
        browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
        browser.sleep(12000);
                break;
            case "GB":
        
        //Login to Metraview with Corporate Account(not subscribed to any PO) 
        element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata1.corpGB);
        element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata1.passwordField);
        browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
        browser.sleep(12000);
                break;
            case "IL":
        
        //Login to Metraview with Corporate Account(not subscribed to any PO) 
        element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata1.corpIL);
        element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata1.passwordField);
        browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
        browser.sleep(12000);
            break;
            case "JP":
        
        //Login to Metraview with Corporate Account(not subscribed to any PO) 
        element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata1.corpJP);
        element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata1.passwordField);
        browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
        browser.sleep(12000);
                break; 
            case "MX":
        
        //Login to Metraview with Corporate Account(not subscribed to any PO) 
        element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata1.corpMX);
        element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata1.passwordField);
        browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
        browser.sleep(12000);
                break;    
            case "SE":
        
        //Login to Metraview with Corporate Account(not subscribed to any PO) 
        element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata1.corpSE);
        element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata1.passwordField);
        browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
        browser.sleep(12000);
                break;
            case "US":
        
        //Login to Metraview with Corporate Account(not subscribed to any PO) 
        element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata1.corpUS);
        element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata1.passwordField);
        browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
        browser.sleep(12000);
            break;
    }
          }
    
    login(testdata8);
    
    });
    
it('Validate fields in Subscriptions widget', function () { 
    //Input file to refer
    var testdata4 = protractor.loginHelpers.dashboard();

    browser.refresh();
    browser.sleep(5000);
    //validate the title of the widget

    expect(element(by.xpath(testdata3.Subscriptions.Title)).isDisplayed()).toBe(true);
    expect(element(by.xpath(testdata3.Subscriptions.Title)).getText()).toEqual(testdata4.TEXT_MY_SUBSCRIPTIONS);
    var el = element(by.xpath(testdata3.Subscriptions.Title));

    browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
    browser.sleep(500);
   // expect(element(by.xpath(testdata3.Subscriptions.Date)).isDisplayed()).toBe(true);
    
    // var today = new Date();
    // var dd = today.getDate();
    // var d = "0"+ today.getDate();
    // var dd = d.toString().substr(-2);
    // var m = "0"+today.getMonth()+1;
    // var mm= m.toString().substr(-2);  //January is 0!
    // var yyyy = today.getFullYear();
    // var endDate = new Date();
    // yy = yyyy.toString().substr(-2);
    // endDate = mm+"/"+dd+"/"+yy;
    // browser.sleep(1000);
    // expect(element(by.xpath(testdata3.Subscriptions.Date)).getText()).toEqual(endDate+" - "+endDate);
    
   
});

it('Validate add Subscriptions', function () {
    //Input file to refer
    var testdata4 = protractor.loginHelpers.dashboard();
    
    //expect(element(by.xpath(testdata3.Subscriptions.Title)).isDisplayed()).toBe(true);
         
    element(by.xpath(testdata3.Subscriptions.AddSubscription_Link)).click();
    browser.sleep(1000);             
    expect(element(by.xpath(testdata3.OfferStore.AddIcon)).isPresent()).toBe(true);
    expect(element(by.xpath(testdata3.OfferStore.AddIcon)).isDisplayed()).toBe(true);
    browser.actions().mouseMove(element(by.xpath(testdata3.OfferStore.AddIcon))).perform(); 
    browser.sleep(1000);
   /* element.all(by.xpath(testdata3.OfferStore.AddIcon)).then(function(items) {
     
    for (let index = 0; index < items.length; index++) {

        items[index].click();
        expect(element(by.xpath(testdata3.OfferStore.Availability_Label)).getText()).toEqual(testdata4.TEXT_AVAILABLE_BETWEEN);
        element(by.xpath(testdata3.OfferStore.AddSubscription_Button)).click();
        browser.sleep(1000);
       
        element(by.xpath(testdata3.AccountInformation.ToastMsg_Success)).getText().then((msg) => {
            items.length=index;

            });
      
    }
    });*/
    element.all(by.xpath(testdata3.OfferStore.AddIcon)).then(function (items) {
        count = (items.length)-1;
        
        var i =0;
        var k =1;
        var j=0;
        var m =0;
        
        function clickAdd (i,k){
        
        console.log( i + "times")
        items[j].click();
       
        browser.manage().window().setSize(1600, 1000);
        
         
          console.log('k value' + k);
          element(by.css("div.ecb-subscriptionOffersContent.clearfix.ng-scope > div > div:nth-child(" + k + ") > div.ecb-eligibleOfferDetails > div.ecb-eligibleOfferDatepicker > div > datepicker > i")).click().then(function () {
            
          });    
           
          browser.sleep(1000);
          expect(element(by.xpath(testdata3.OfferStore.Datepicker_NextDateAvailability)).isDisplayed()).toBe(true);
          // clicking next mnth dates
          element(by.xpath(testdata3.OfferStore.Datepicker_NextArrow_Button)).click();
          browser.sleep(1000);
          element(by.xpath(testdata3.OfferStore.Datepicker_NextDate)).click();
          browser.sleep(500); 
          element.all(by.xpath(testdata3.OfferStore.AddSubscription_Button)).then(function (items) {
            items[m].click();
            
          // j++;

          });
           element(by.xpath(testdata3.AccountInformation.ToastMsg_Success)).getText().then((msg) => {
            if(msg == testdata4.TEXT_OFFER_ADDED_SUCCESSFUL) {       
       
         console.log("offer added to " +i + " subscription");
                  
          } else if (i<1 &&i++<count) {
              j++;
              k++;
              m++;
          
            clickAdd(i,k);
          }else if(i++<count){
              console.log('last else');
              m=m+2;
              j++;
              k= k+2;
              clickAdd(i,k);


          }

        });
     }
    clickAdd(i,k);
    });
    
     

    
    
    
    /* 
    element(by.xpath(testdata3.OfferStore.AddIcon)).click();
    browser.sleep(3000);
    element(by.xpath(testdata3.OfferStore.CancelSubscription_Button)).click();
    browser.sleep(1000);
    element(by.xpath(testdata3.OfferStore.AddIcon)).click(); 
    browser.sleep(1000);
    element(by.xpath(testdata3.OfferStore.Datepicker_Icon)).click();
    browser.sleep(1000);
    expect(element(by.xpath(testdata3.OfferStore.Datepicker_NextDateAvailability)).isDisplayed()).toBe(true);
    // clicking next mnth dates
    element(by.xpath(testdata3.OfferStore.Datepicker_NextArrow_Button)).click();
    browser.sleep(1000);
    element(by.xpath(testdata3.OfferStore.Datepicker_NextDate)).click();
    browser.sleep(1000);
    */         
 
});


it('Validate  cancel Subscriptions', function () {  
    browser.refresh();
    browser.sleep(3000);
    element(by.xpath(testdata3.Subscriptions.ViewAll)).click();
    browser.sleep(1000);
    expect(element(by.xpath(testdata3.MySubscriptions.CancelSubscription)).isPresent()).toBe(true);
    var cancelbutton = element(by.xpath(testdata3.MySubscriptions.CancelSubscription));
    cancelbutton.click();
    browser.sleep(1000);
    expect(element(by.xpath(testdata3.MySubscriptions.CancelDilogueBox)).isDisplayed()).toBe(true);  
    browser.sleep(3000);
    // future date selection
    element(by.xpath(testdata3.MySubscriptions.CancelDilogueBox_Datepicker_Icon)).click();
    browser.sleep(1000);
    expect(element(by.xpath(testdata3.MySubscriptions.CancelDilogueBox_Datepicker_CurrentDate)).isDisplayed()).toBe(true);
    // clicking next mnth dates
    element(by.xpath(testdata3.MySubscriptions.CancelDilogueBox_Datepicker_NextArrow_Button)).click();
    browser.sleep(1000);
    element(by.xpath(testdata3.MySubscriptions.CancelDilogueBox_Datepicker_NextDate)).click();
    browser.sleep(1000);
    // future date selection
    element(by.xpath(testdata3.MySubscriptions.CancelDilogueBox_Datepicker_Icon)).click();
    browser.sleep(1000);
    element(by.xpath(testdata3.MySubscriptions.CancelDilogueBox_Datepicker_PreviousArrow_Button)).click();
    browser.sleep(1000);
    var today = new Date();
    var dd = today.getDate();
    today = dd;
    element(by.xpath(testdata3.MySubscriptions.CancelDilogueBox_Datepicker_NextDate)).click();
    browser.sleep(1000);
    // ok clicking
    element(by.xpath(testdata3.MySubscriptions.CancelDilogueBox_Datepicker_OK)).click();
    browser.sleep(3000); 

});

it('Login with new corporate user', function(){
      
    var testdata8=protractor.loginHelpers.langCode;
    function login(testdata8){
          var testdata5 = protractor.loginHelpers.lang; 
          browser.get(testdata1.URL);
          browser.sleep(5000);
          element(by.css(testdata5)).click();
          browser.sleep(5000);      
    switch (testdata8) {
        case "BR":
    //Loading the Login Page
    //Login to Metraview with Corporate Account(not subscribed to any PO) 
    element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata1.corpBR);
    element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata1.passwordField);
    browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
    browser.sleep(12000);
        break;
        case "DE":
    
    //Login to Metraview with Corporate Account(not subscribed to any PO) 
    element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata1.corpDE);
    element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata1.passwordField);
    browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
    browser.sleep(12000);
        break;
        case "EG":
    
    //Login to Metraview with Corporate Account(not subscribed to any PO) 
    element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata1.corpEG);
    element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata1.passwordField);
    browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
    browser.sleep(12000);
        break;
        case "ES":
    
    //Login to Metraview with Corporate Account(not subscribed to any PO) 
    element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata1.corpES);
    element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata1.passwordField);
    browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
    browser.sleep(12000);
            break;
        case "FR":
    
    //Login to Metraview with Corporate Account(not subscribed to any PO) 
    element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata1.corpFR);
    element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata1.passwordField);
    browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
    browser.sleep(12000);
            break;
        case "GB":
    
    //Login to Metraview with Corporate Account(not subscribed to any PO) 
    element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata1.corpGB);
    element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata1.passwordField);
    browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
    browser.sleep(12000);
            break;
        case "IL":
    
    //Login to Metraview with Corporate Account(not subscribed to any PO) 
    element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata1.corpIL);
    element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata1.passwordField);
    browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
    browser.sleep(12000);
        break;
        case "JP":
    
    //Login to Metraview with Corporate Account(not subscribed to any PO) 
    element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata1.corpJP);
    element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata1.passwordField);
    browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
    browser.sleep(12000);
            break; 
        case "MX":
    
    //Login to Metraview with Corporate Account(not subscribed to any PO) 
    element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata1.corpMX);
    element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata1.passwordField);
    browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
    browser.sleep(12000);
            break;    
        case "SE":
    
    //Login to Metraview with Corporate Account(not subscribed to any PO) 
    element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata1.corpSE);
    element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata1.passwordField);
    browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
    browser.sleep(12000);
            break;
        case "US":
    
    //Login to Metraview with Corporate Account(not subscribed to any PO) 
    element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata1.corpUS);
    element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata1.passwordField);
    browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
    browser.sleep(12000);
        break;
}
      }

login(testdata8);

});

it('Validate the Subscription Changes in Activity Log', function () {
    //Input file to refer
    var testdata4 = protractor.loginHelpers.dashboard();
    var el = element(by.xpath(testdata3.ActivityLog.Title));
    browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
    expect(element(by.xpath(testdata3.ActivityLog.Today_Text)).getText()).toEqual(testdata4.TEXT_TODAY);
    element.all(by.xpath(testdata3.ActivityLog.List_Values)).then(function(items) { 
    expect(items[0].getText()).toBe("Subscription Update");
    expect(items[1].getText()).toBe("Subscription Creation");
    });

});

//0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10510/ Reg_007_Audit_log_Reflection_For_Subscriptions
it('Validate the Subscription Changes in Activity Log when click on View all', function () {
    browser.refresh();
    browser.sleep(3000);
    var el = element(by.xpath(testdata3.ActivityLog.Title));
    browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
    browser.sleep(10000);
    element(by.xpath(testdata3.ActivityLog.ViewAll)).click();
    browser.sleep(5000);
    expect(element.all(by.xpath(testdata3.ActivityLog.ActivityLog_SubscriptionChange)).getText()).toContain("Subscription Creation");
  
   //Logout from metraview
   protractor.loginHelpers.logOutMV();

});

})
