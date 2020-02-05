var testdata4 = require('../inputs/testdata/XpathRepository.json');
var testdata = require('../inputs/testdata/Login.json');

describe('Bill Manager related test cases', function () {

it('Validate the billable accounts', function () {

   //Input file to refer
   var testdata5 = protractor.loginHelpers.viewSelector();
   var testdata6 = protractor.loginHelpers.dashboard();
   var testdata2 = require('../inputs/testdata/JsonFileCreation.json');

    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testdata2.userName,testdata2.passwordField);

    expect(element(by.xpath(testdata4.SystemBar.AccountName)).getText()).toEqual(testdata2.userName);
    element(by.xpath(testdata4.SystemBar.AccountName)).click();
    browser.sleep(2000);
    
    expect(element(by.xpath(testdata4.SystemBar.MyAccount_Button)).getText()).toEqual(testdata6.TEXT_MY_ACCOUNT);
    element.all(by.xpath(testdata4.SystemBar.ChildAccounts_Lists)).then(function(items) {
    expect(items.length).toBe(4);  
    expect(items[0].getText()).toContain(testdata6.TEXT_ACCOUNT_ID+" "+testdata2.accnum);
    expect(items[1].getText()).toContain(testdata6.TEXT_ACCOUNT_ID+" "+testdata2.accID1);
    expect(items[2].getText()).toContain(testdata6.TEXT_ACCOUNT_ID+" "+testdata2.accID2);
    expect(items[3].getText()).toContain(testdata6.TEXT_ACCOUNT_ID+" "+testdata2.accID3);
    });
    expect(element(by.xpath(testdata4.SystemBar.ViewAllButton)).isDisplayed()).toBe(true);
    element(by.xpath(testdata4.SystemBar.ViewAllButton)).click();
    element.all(by.xpath(testdata4.SystemBar.ViewAllButton_ChildAccounts_DetailedLists)).then(function(items) {
    expect(items.length).toBe(7);  
  });
  //MVIEW-2667 Accounts: widget and dropdown do not match
  element.all(by.css(testdata4.SystemBar.AccountNames)).then(function(items) {
    var value1=testdata2.child1;
    value1=value1.replace('deptAcc1','');
    var value2=testdata2.child2;
    value2=value2.replace('deptAcc2','');
    var value3=testdata2.child3;
    value3=value3.replace('deptAcc3','');
    var value4=testdata2.child4;
    value4=value4.replace('deptAcc4','');
    var value6=testdata2.child6;
    value6=value6.replace('deptAcc6','');
    var value7=testdata2.child7;
    value7=value7.replace('deptAcc7','');
    var value8=testdata2.child8;
    value8=value8.replace('deptAcc8','');
    expect(items[0].getText()).toContain(value1);
    expect(items[2].getText()).toContain(value2);
    expect(items[4].getText()).toContain(value3);
    expect(items[6].getText()).toContain(value4);
    expect(items[8].getText()).toContain(value6);
    expect(items[10].getText()).toContain(value7);
    expect(items[12].getText()).toContain(value8);
  });
  
    //First child Account
    var value1=testdata2.child1;
    value1=value1.replace('deptAcc1','');
    element(by.xpath(testdata4.ChildAccounts.ChildNew+value1+testdata4.OfferCharge.CloseXpath)).click();

    expect(element(by.xpath(testdata4.SystemBar.ViewAll_ChildAccountName)).getText()).toContain(value1);
    var cur = testdata2.DashBoardURL;
   var lc = cur.toLowerCase();
   expect(browser.getCurrentUrl()).toEqual(lc);
    browser.sleep(5000);
    var testdata5 =protractor.loginHelpers.langCode;
    function localizedDate(testdata5){
      var today = new Date();
      var yyyy = today.getFullYear();
      yy = yyyy.toString().substr(-2);
      switch (testdata5) {
        case "BR":
        var d = "0"+ today.getDate();
        var dd = d.toString().substr(-2);
        var td = today.getDate()-1;
        var tdd="0"+td;
        var t=tdd.toString().substr(-2);
        var m = today.getMonth()+1;
        var m2="0"+m;
        var mm= m2.toString().substr(-2);  //January is 0!
        var endDate= new Date();
        endDate = dd+"/"+mm+"/"+yyyy;
        var nextDate=new Date();
        nextDate=t+"/"+mm+"/"+yyyy;
        break;
        case "DE":
        var d = "0"+ today.getDate();
        var dd = d.toString().substr(-2);
        var td = today.getDate()-1;
        var tdd="0"+td;
        var t=tdd.toString().substr(-2);
        var m = today.getMonth()+1;
        var m2="0"+m;
        var mm= m2.toString().substr(-2);  //January is 0!
        var endDate= new Date();
        endDate = dd+"."+mm+"."+yyyy;
        var nextDate = t+"."+mm+"."+yyyy;
        break;
        case "EG":
        var d = today.getDate();
        var td = today.getDate()-1;
        var tdd=td;
        var m = today.getMonth()+1;
        var m2=m;
        var endDate= new Date();
        endDate = d+"/"+m2+"/"+yyyy;
        var nextDate=new Date();
        nextDate=tdd+"/"+m2+"/"+yyyy;
        break;
        case "ES":
        var d = today.getDate();
        var td = today.getDate()-1;
        var tdd=td;
        var m = today.getMonth()+1;
        var m2=m;
        var endDate= new Date();
        endDate = d+"/"+m2+"/"+yyyy;
        var nextDate=new Date();
        nextDate=tdd+"/"+m2+"/"+yyyy;
            break;
        case "FR":
        var d = "0"+ today.getDate();
        var dd = d.toString().substr(-2);
        var td = today.getDate()-1;
        var tdd="0"+td;
        var t=tdd.toString().substr(-2);
        var m = today.getMonth()+1;
        var m2="0"+m;
        var mm= m2.toString().substr(-2);  //January is 0!
        var endDate= new Date();
        endDate = dd+"/"+mm+"/"+yyyy;
        var nextDate = t+"/"+mm+"/"+yyyy;
            break;
        case "GB":
        var d = "0"+ today.getDate();
        var dd = d.toString().substr(-2);
        var td = today.getDate()-1;
        var tdd="0"+td;
        var t=tdd.toString().substr(-2);
        var m = today.getMonth()+1;
        var m2="0"+m;
        var mm= m2.toString().substr(-2);  //January is 0!
        var endDate= new Date();
        endDate = dd+"/"+mm+"/"+yyyy;
        var nextDate = t+"/"+mm+"/"+yyyy;
            break;
        case "IL":
        var d = today.getDate();
        var td = today.getDate()-1;
        var tdd=td;
        var m = today.getMonth()+1;
        var m2=m;
        var endDate= new Date();
        endDate = d+"."+m2+"."+yyyy;
        var nextDate=new Date();
        nextDate=tdd+"."+m2+"."+yyyy;
        break;
        case "JP":
        var d = "0"+ today.getDate();
        var dd = d.toString().substr(-2);
        var td = today.getDate()-1;
        var tdd="0"+td;
        var t=tdd.toString().substr(-2);
        var m = today.getMonth()+1;
        var m2="0"+m;
        var mm= m2.toString().substr(-2);  //January is 0!
        var endDate= new Date();
        endDate = yyyy+"/"+mm+"/"+dd;
        var nextDate = yyyy+"/"+mm+"/"+t;  
            break; 
        case "MX":
        var d = "0"+ today.getDate();
        var dd = d.toString().substr(-2);
        var td = today.getDate()-1;
        var tdd="0"+td;
        var t=tdd.toString().substr(-2);
        var m = today.getMonth()+1;
        var m2="0"+m;
        var mm= m2.toString().substr(-2);  //January is 0!
        var endDate= new Date();
        endDate = dd+"/"+mm+"/"+yyyy;
        var nextDate=new Date();
        nextDate=t+"/"+mm+"/"+yyyy;
        break;    
        case "SE":
        var d = "0"+ today.getDate();
        var dd = d.toString().substr(-2);
        var td = today.getDate()-1;
        var tdd="0"+td;
        var t=tdd.toString().substr(-2);
        var m = today.getMonth()+1;
        var m2="0"+m;
        var mm= m2.toString().substr(-2);  //January is 0!
        var endDate= new Date();
        endDate = yyyy+"-"+mm+"-"+dd;
        var nextDate = yyyy+"-"+mm+"-"+t;  
            break;
        case "US":
        var d ="0"+ today.getDate();
        var dd = d.toString().substr(-2);
        var td = today.getDate()-1;
        var tdd="0"+td;
        var t=tdd.toString().substr(-2);
        var m = today.getMonth()+1;
        var m2="0"+m;
        var mm= m2.toString().substr(-2);  //January is 0!
        var endDate= new Date();
        endDate = mm+"/"+dd+"/"+yyyy;
        var nextDate=new Date();
        nextDate=m+"/"+d+"/"+yyyy;
        break;
        }
        var today = endDate + " - " +endDate;
        return today;
      }
    expect(element(by.xpath(testdata4.SystemBar.ViewAll_ChildAccount_LastBilldate)).getText()).toEqual(testdata6.TEXT_SINCE_LAST_BILL+ " ( "+localizedDate(testdata5)+ " )");
    
    element(by.xpath(testdata4.SystemBar.ViewAll_ChildAccount_GobackToYourOwnAccount)).click();
    browser.sleep(3000);

    //Second child Account
    element(by.xpath(testdata4.SystemBar.AccountName)).click();
    browser.sleep(3000);
    element(by.xpath(testdata4.SystemBar.ViewAllButton)).click();
    var value2=testdata2.child2;
    value2=value2.replace('deptAcc2','');
   
    element(by.xpath(testdata4.ChildAccounts.ChildNew+value2+testdata4.OfferCharge.CloseXpath)).click();
    expect(element(by.xpath(testdata4.SystemBar.ViewAll_ChildAccountName)).getText()).toContain(value2);

    var cur = testdata2.DashBoardURL;
 
    // var ul = cur.substring(8, 22);
    var lc = cur.toLowerCase();
    // var k = "https://"+lc+":8080/dashboard";
    expect(browser.getCurrentUrl()).toEqual(lc);
    expect(element(by.xpath(testdata4.SystemBar.ViewAll_ChildAccount_LastBilldate)).getText()).toEqual(testdata6.TEXT_SINCE_LAST_BILL+ " ( "+localizedDate(testdata5)+ " )");
    element(by.xpath(testdata4.SystemBar.ViewAll_ChildAccount_GobackToYourOwnAccount)).click();
    browser.sleep(3000);   
      
    //Third child Account
    element(by.xpath(testdata4.SystemBar.AccountName)).click();
    browser.sleep(3000);
    element(by.xpath(testdata4.SystemBar.ViewAllButton)).click();
    var value3=testdata2.child3;
    value3=value3.replace('deptAcc3','');
    element(by.xpath(testdata4.ChildAccounts.ChildNew+value3+testdata4.OfferCharge.CloseXpath)).click();

    expect(element(by.xpath(testdata4.SystemBar.ViewAll_ChildAccountName)).getText()).toContain(value3);

    expect(element(by.xpath(testdata4.SystemBar.ViewAll_ChildAccountName)).getText()).toEqual(testdata2.child3);
    var cur = testdata2.DashBoardURL;
 
   // var ul = cur.substring(8, 22);
   var lc = cur.toLowerCase();
   // var k = "https://"+lc+":8080/dashboard";
   expect(browser.getCurrentUrl()).toEqual(lc);
    expect(element(by.xpath(testdata4.SystemBar.ViewAll_ChildAccount_LastBilldate)).getText()).toEqual(testdata6.TEXT_SINCE_LAST_BILL+ " ( "+localizedDate(testdata5)+ " )");
    element(by.xpath(testdata4.SystemBar.ViewAll_ChildAccount_GobackToYourOwnAccount)).click();
    browser.sleep(3000); 

    //Fourth child Account
    element(by.xpath(testdata4.SystemBar.AccountName)).click();
    browser.sleep(3000);
    element(by.xpath(testdata4.SystemBar.ViewAllButton)).click();
     var value4=testdata2.child4;
     value4=value4.replace('deptAcc4','');
    element(by.xpath(testdata4.ChildAccounts.ChildNew+value4+testdata4.OfferCharge.CloseXpath)).click();
    expect(element(by.xpath(testdata4.SystemBar.ViewAll_ChildAccountName)).getText()).toContain(value4);
    var cur = testdata2.DashBoardURL;
 
    var lc = cur.toLowerCase();
    expect(browser.getCurrentUrl()).toEqual(lc);
    expect(element(by.xpath(testdata4.SystemBar.ViewAll_ChildAccount_LastBilldate)).getText()).toEqual(testdata6.TEXT_SINCE_LAST_BILL+ " ( "+localizedDate(testdata5)+ " )");
    element(by.xpath(testdata4.SystemBar.ViewAll_ChildAccount_GobackToYourOwnAccount)).click();
    browser.sleep(3000);
    
    //Logout from the MV2.0 Application 
    protractor.loginHelpers.logOutMV();

    });
});