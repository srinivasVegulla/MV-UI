var testData = require('../inputs/testData/prebillandpostbillcreation.json');
var testData4=require('../inputs/testData/JsonFileCreation.json');
var testData1=require('../inputs/testData/Login.json');
var testData3 = require('../inputs/testData/XpathRepository.json');


describe('Summarized Post Bill Module', function(){

it('Summarized Post Bill Adjustment', function () {

    var testData2 = protractor.loginHelpers.dashboard();
    //Refresh the main page
    browser.refresh();
    browser.sleep(10000);

    var testData5 = protractor.loginHelpers.lang;
    //Get Metraview 2.0 URL
    browser.get(testData4.URL);
    browser.sleep(5000);

    //Select the reqired Currency
    element(by.css(testData5)).click();
    browser.sleep(3000);

    //Login to MetraView as Corporate User(Without Post Bill Adjustment)
    //Enter username as userName2
    element(by.xpath(testData3.LoginPage.UserName)).sendKeys(testData.userName2);

    //Enter password
    element(by.xpath(testData3.LoginPage.Password)).sendKeys(testData.passwordField);

    //Click on Login Button
    browser.findElement(By.xpath(testData3.LoginPage.LogInButton)).click();
    browser.sleep(12000);  

    //Click on Go to Bills Link
    element(by.xpath(testData3.Billing.GoToBillsButton)).click();
    browser.sleep(8000);

    //Test Case: MetraView_2.0/ Summarized_Post-bill/ 002_Visibility_of_prior_balance_widget
    //Verify that the user is able to view the 'Prior Balance' Widget in dashboard 
    expect(element(by.xpath(testData3.PriorBalance.Title)).getText()).toEqual(testData2.TEXT_PAYMENTS_CREDITS_AND_ADJUSTMENTS);

    //Test Case: MetraView_2.0/ Summarized_Post-bill/ 003_Visibility_data_in_prior_balance_widget
    //Verify if the user is able to view the fields 'Previous Balance', 'Postbill Adjustments' and 'Payments Received' in the 'Prior Balance' Widget in dashboard
    expect(element(by.xpath(testData3.PriorBalance.PreviousBalance)).getText()).toEqual(testData2.TEXT_PREVIOUS_BALANCE);
    expect(element(by.xpath(testData3.PriorBalance.PostBillAdjustment)).getText()).toEqual(testData2.TEXT_POSTBILL_ADJUSTMENTS);
    expect(element(by.xpath(testData3.PriorBalance.PaymentRecived)).getText()).toEqual(testData2.TEXT_PAYMENTS_RECEIVED);

    //Test Case: MetraView_2.0/ Summarized_Post-bill/ 004_Disability_of_post_bill_adjustment_widget
    //Verify if the link 'postbill adjustments' cannot be clicked or touched when there are no adjustments have been issued to this account
    expect(element(by.xpath(testData3.PriorBalance.PostBillAdjustment)).isEnabled()).toBe(false);

    // Log Out from Application
    browser.findElement(by.xpath(testData3.SystemBar.Logout)).click();
    browser.sleep(5000);

    var testData5 = protractor.loginHelpers.lang;
    //Get Metraview 2.0 URL
    browser.get(testData4.URL);
    browser.sleep(5000);

    //Select the reqired Currency
    element(by.css(testData5)).click();
    browser.sleep(3000);

    //Login to MetraView as Corporate User(With Post Bill Adjustment)
    //Enter username as userName2
    element(by.xpath(testData3.LoginPage.UserName)).sendKeys(testData.userName);

    //Enter password
    element(by.xpath(testData3.LoginPage.Password)).sendKeys(testData.passwordField);

    //Click on Login Button
    browser.findElement(By.xpath(testData3.LoginPage.LogInButton)).click();
    browser.sleep(12000);  


    //Click on Go to Bills Link
    element(by.xpath(testData3.Billing.GoToBillsButton)).click();
    browser.sleep(8000);

    //Click on the intervals drop down
    element(by.xpath(testData3.Billing.SelectIntervalDropdown)).click();
    browser.sleep(3000);
    function localizedDate(){
        var testdata5 =protractor.loginHelpers.langCode;
        var today = new Date();
        var yyyy = today.getFullYear();
        yy = yyyy.toString().substr(-2);
        switch (testdata5) {
        case "BR":
        var d = "0"+ today.getDate();
        var dd = d.toString().substr(-2);
        var m = today.getMonth()+1;
        var m2="0"+m;
        var mm= m2.toString().substr(-2);  //January is 0!
        var endDate= new Date();
        endDate = dd+"/"+mm+"/"+yyyy;
        break;
        case "DE":
        var d = "0"+ today.getDate();
        var dd = d.toString().substr(-2);
        var m = today.getMonth()+1;
        var m2="0"+m;
        var mm= m2.toString().substr(-2);  //January is 0!
        var endDate= new Date();
        endDate = dd+"."+mm+"."+yyyy;
        break;
        case "EG":
        var d =  "0"+today.getDate();
        var dd = d.toString().substr(-2);
        var m = today.getMonth()+1;
        var m2="0"+m;
        var mm= m2.toString().substr(-2);  //January is 0!
        var endDate= new Date();
        endDate = mm+"/"+dd+"/"+yyyy;
        break;
        case "ES":
        var d = "0"+ today.getDate();
        var dd = d.toString().substr(-2);
        var m = today.getMonth()+1;
        var m2="0"+m;
        var mm= m2.toString().substr(-2);  //January is 0!
        var endDate= new Date();
        endDate = dd+"/"+mm+"/"+yyyy;
        break;
        case "FR":
        var d = "0"+ today.getDate();
        var dd = d.toString().substr(-2);
        var m = today.getMonth()+1;
        var m2="0"+m;
        var mm= m2.toString().substr(-2);  //January is 0!
        var endDate= new Date();
        endDate = dd+"/"+mm+"/"+yyyy;
        break;
        case "GB":
        var d = "0"+ today.getDate();
        var dd = d.toString().substr(-2);
        var m = today.getMonth()+1;
        var m2="0"+m;
        var mm= m2.toString().substr(-2);  //January is 0!
        var endDate= new Date();
        endDate = mm+"/"+dd+"/"+yyyy;
        break;
        case "IL":
        var d =  "0"+today.getDate();
        var dd = d.toString().substr(-2);
        var m = today.getMonth()+1;
        var m2="0"+m;
        var mm= m2.toString().substr(-2);  //January is 0!
        var endDate= new Date();
        endDate = mm+"/"+dd+"/"+yyyy;
        break;
        case "JP":
        var d = "0"+ today.getDate();
        var dd = d.toString().substr(-2);
        var m = today.getMonth()+1;
        var m2="0"+m;
        var mm= m2.toString().substr(-2); //January is 0!
        endDate = yyyy+"/"+mm+"/"+dd
        break; 
        case "MX":
        var d = "0"+ today.getDate();
        var dd = d.toString().substr(-2);
        var m = today.getMonth()+1;
        var m2="0"+m;
        var mm= m2.toString().substr(-2); //January is 0!
        endDate = dd+"/"+mm+"/"+yyyy;
        break;    
        case "SE":
        var d =  "0"+today.getDate();
        var dd = d.toString().substr(-2);
        var m = today.getMonth()+1;
        var m2="0"+m;
        var mm= m2.toString().substr(-2);  //January is 0!
        var endDate= new Date();
        endDate = mm+"/"+dd+"/"+yyyy;
        break;
        case "US":
        var d =  today.getDate();
        var d2="0"+d;
        var dd = d2.toString().substr(-2);
        var m = today.getMonth()+1;
        var m2="0"+m;
        var mm= m2.toString().substr(-2);  //January is 0!
        var endDate= new Date();
        endDate = mm+"/"+dd+"/"+yyyy;
        break;
        }
        var today = endDate;
        return today;
        }
    //Select the apropriate interval containing Postbill Adjustments
    element(by.xpath("//a[contains(text(),'"+localizedDate()+"')]")).click();
    browser.sleep(10000);

    //Test Case: MetraView_2.0/ Summarized_Post-bill/ 005_Enabling_post_bill_adjustment_widget
    //Verify if the link 'postbill adjustments' can clicked or touched when adjustments have been issued to the particular account
    expect(element(by.xpath(testData3.PriorBalance.PostBillAdjustment)).isEnabled()).toBe(true);

    //Test Case: MetraView_2.0/ Summarized_Post-bill/ 006_Overlay_display_as_a_popup
    //Verify if the overlay with list of transactions shall be opened as a popup
    //Mouse Over to the Postbill Adjustment link
    browser.actions().mouseMove(element(by.xpath(testData3.PriorBalance.PostBillAdjustment))).perform();
    browser.sleep(1000);

    //Verify that the overlay with list of transactions shall be opened as a popup
    expect(element(by.xpath(testData3.PriorBalance.PostBillAdjustment_Popup_ListOfTransaction)).isPresent()).toBe(true);

    //Refresh the main page
    browser.refresh();
    browser.sleep(10000);

    // Log Out from Application
    browser.findElement(by.xpath(testData3.SystemBar.Logout)).click();
    browser.sleep(5000);
    });
});



