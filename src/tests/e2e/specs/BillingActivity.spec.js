var testdata2 = require('../inputs/testdata/prebillandpostbillcreation.json');
var testdata4= require('../inputs/testdata/XpathRepository.json');
describe('Billing Activity in metraview', function () {

it('Verify Billing Activity history MetraView', function () {

    var testdata3=protractor.loginHelpers.dashboard();
    var testdata5=protractor.loginHelpers.langCode;
  //Launch to the MV2.0 application
  protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
  //Login to the MV2.0 application
  protractor.loginHelpers.logInMV(testdata2.userName,testdata2.passwordField);
    
    element(by.xpath(testdata4.LayerSelector.Dropdown)).click();
    element(by.xpath(testdata4.LayerSelector.Bills)).click();
    browser.sleep(5000);
    var amount= element.all(by.xpath(testdata4.InvoicedTotalCharges.Billed_Amounts)).getText();
    function slice (arrayFinder, from, to) {
      return arrayFinder.filter(function(elem, index) {
          if (index >= from && index < to) {
              return true;
          }
      });
    }

    slice(amount,0,amount.length);
  
    browser.refresh();
    browser.sleep(5000);

    expect(element(by.xpath(testdata4.InvoicedTotalCharges.Widget)).isDisplayed()).toBe(true);
    expect(element(by.xpath(testdata4.InvoicedTotalCharges.Widget)).isPresent());
    
    var el = element(by.xpath(testdata4.InvoicedTotalCharges.Widget));
    browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());

    expect(element(by.xpath(testdata4.InvoicedTotalCharges.Title)).getText()).toEqual(testdata3.TEXT_INVOICE_TOTAL_CHARGE);
    expect(element(by.xpath(testdata4.InvoicedTotalCharges.Bar_Visibility)).isPresent()).toBe(true);
  
    expect(element(by.xpath(testdata4.InvoicedTotalCharges.Invoiced_Creation_Date_Axis)).getText()).toEqual(testdata3.TEXT_INVOICE_DATE);
    expect(element(by.xpath(testdata4.InvoicedTotalCharges.Billed_Amount_Axis)).getText()).toEqual(testdata3.TEXT_BILL_AMOUNT+"($)");

    var today = new Date();

  var yyyy = today.getFullYear();
  yy = yyyy.toString().substr(-2);
  
  function localizedDate(testdata5){
    switch (testdata5) {
      case "BR":
      var d =today.getDate()-1;         
      var tdd="0"+d;
      var dd = d.toString().substr(-2);
      var m = today.getMonth()+1;
      var m2="0"+m;
      var mm= m2.toString().substr(-2); //January is 0!
      endDate = dd+"/"+mm+"/"+yy;
    
      break;
      case "DE":
      var d =today.getDate()-1;         
      var tdd="0"+d;
      var dd = d.toString().substr(-2);
      var m = today.getMonth()+1;
      var m2="0"+m;
      var mm= m2.toString().substr(-2); //January is 0!
      endDate = dd+"."+mm+"."+yy;
      break;
      case "EG":
        var d =today.getDate()-1;         
        var tdd="0"+d;
      var m = today.getMonth()+1;
      var m2=m;
      var endDate= new Date();
      endDate = d+"."+m2+"."+yyyy;
      break;
      case "ES":
        var d =today.getDate()-1;         
        //var tdd="0"+d;
      //var dd = d.toString().substr(-2);
      var m = today.getMonth()+1;
      var m2=m;
      //var mm= m2.toString().substr(-2); //January is 0!
      endDate = d+"/"+m2+"/"+yy;
          break;
      case "FR":
      var d =today.getDate()-1;         
      var tdd="0"+d;
      var dd = d.toString().substr(-2);
      var m = today.getMonth()+1;
      var m2="0"+m;
      var mm= m2.toString().substr(-2); //January is 0!
      endDate = dd+"/"+mm+"/"+yyyy;
          break;
      case "GB":
      var d =today.getDate()-1;         
      var tdd="0"+d;
      var dd = d.toString().substr(-2);
      var m = today.getMonth()+1;
      var m2="0"+m;
      var mm= m2.toString().substr(-2); //January is 0!
      endDate = dd+"/"+mm+"/"+yyyy;    
          break;
      case "IL":
        var d =today.getDate()-1; 
      var m = today.getMonth()+1;
      var m2=m;
      endDate = d+"."+m2+"."+yyyy;
      break;
      case "JP":
      var d =today.getDate()-1;         
      var tdd="0"+d;
      var dd = d.toString().substr(-2);
      var m = today.getMonth()+1;
      var m2="0"+m;
      var mm= m2.toString().substr(-2); //January is 0!
      endDate = yyyy+"/"+mm+"/"+dd; 
          break; 
      case "MX":
      var d =today.getDate()-1;        
       var tdd="0"+d;
      var dd = d.toString().substr(-2);
      var m = today.getMonth()+1;
      var m2="0"+m;
      var mm= m2.toString().substr(-2); //January is 0!
      endDate = dd+"/"+mm+"/"+yy;
          break;    
      case "SE":
      var d =today.getDate()-1;        
       var tdd="0"+d;
      var dd = d.toString().substr(-2);
      var m = today.getMonth()+1;
      var m2="0"+m;
      var mm= m2.toString().substr(-2); //January is 0!
      endDate = yyyy+"-"+mm+"-"+dd; 
          break;
      case "US":
      var d =today.getDate()-1;
      var tdd="0"+d;
      var dd = tdd.toString().substr(-2);
      var m = today.getMonth()+1;
      var m2="0"+m;
      var mm= m2.toString().substr(-2);
      endDate = mm+"/"+dd+"/"+yyyy;

      break;
      } 
      return endDate;
    }
      browser.sleep(1000);
      element.all(by.xpath(testdata4.InvoicedTotalCharges.Billed_Amounts)).map(function(elm) {
        return elm.getText();   
      }).then(function(texts) {
        texts.forEach(elm => {
          expect(amount).toContain(elm);
        }
        );
      });

  var items = element.all(by.xpath(testdata4.InvoicedTotalCharges.Invoiced_Creation_Date_For_Billed_Amount)).getText();
    expect(items).toContain(localizedDate(testdata5));

    var bar = element(by.css(testdata4.InvoicedTotalCharges.Invoiced_Billed_Amount_Bars));
    bar.isPresent().then(function (result) {
    if (result) {
    // bars clicking
    var els = element.all(by.css(testdata4.InvoicedTotalCharges.Bars));
    els.then(function (result) {
    var index = 0;
    clickBar(result, index)
    function clickBar(result, index) {
    if (result !== null && result.length > 0) {
    result[index].getAttribute('height').then((hgt) => {
    if (hgt > 0) {
    console.log("innn"+result[index]);
    result[index].click();
    browser.sleep(5000);
    var wid=element(by.xpath(testdata4.InvoicedTotalCharges.Bar_Click));

    browser.executeScript('arguments[0].scrollIntoView()', wid.getWebElement());
    browser.executeScript('arguments[0].click();', wid);

    browser.sleep(5000);
    function intervalDate(){
      var testdata5 =protractor.loginHelpers.langCode;
      var today = new Date();
      var yyyy = today.getFullYear();
      yy = yyyy.toString().substr(-2);
      switch (testdata5) {
      case "BR":
      var d =today.getDate()-1;         var tdd="0"+d;
      var dd = d.toString().substr(-2);
      var m = today.getMonth()+1;
      var m2="0"+m;
      var mm= m2.toString().substr(-2);  //January is 0!
      var endDate= new Date();
      endDate = dd+"/"+mm+"/"+yyyy;
      break;
      case "DE":
      var d =today.getDate()-1;         var tdd="0"+d;
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
      var d =today.getDate()-1;         var tdd="0"+d;
      var dd = d.toString().substr(-2);
      var m = today.getMonth()+1;
      var m2="0"+m;
      var mm= m2.toString().substr(-2);  //January is 0!
      var endDate= new Date();
      endDate = dd+"/"+mm+"/"+yyyy;
      break;
      case "FR":
      var d =today.getDate()-1;         var tdd="0"+d;
      var dd = d.toString().substr(-2);
      var m = today.getMonth()+1;
      var m2="0"+m;
      var mm= m2.toString().substr(-2);  //January is 0!
      var endDate= new Date();
      endDate = dd+"/"+mm+"/"+yyyy;
      break;
      case "GB":
      var d =today.getDate()-1;         var tdd="0"+d;
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
      var d =today.getDate()-1;         var tdd="0"+d;
      var dd = d.toString().substr(-2);
      var m = today.getMonth()+1;
      var m2="0"+m;
      var mm= m2.toString().substr(-2); //January is 0!
      endDate = yyyy+"/"+mm+"/"+dd
      break; 
      case "MX":
      var d =today.getDate()-1;         var tdd="0"+d;
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
      var d =  "0"+today.getDate();
      var dd = d.toString().substr(-2);
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
    expect(element(by.xpath(testdata4.Billing.IntervalList)).getText()).toContain(intervalDate());
    }

    });
                  
    } else if ((index + 1) < result.length) {
      clickBar(result, index + 1);
    }

    }

    })
    browser.sleep(3000); 
    }  
    });

//Logout from metraview
 protractor.loginHelpers.logOutMV();

    });  
});