var testdata3 = require('../inputs/testdata/XpathRepository.json');
var testData1=require('../inputs/testData/JsonFileCreation.json');

describe('Verify OnDemand Invoice related Test cases', function() {

it('Verify for billing intervals in the application',function()
{
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
//Test Case: MetraView_2.0/ OnDemand_Invoice/ 006_verify_billing_intervals
//Verify for billing intervals in the application
browser.refresh();
browser.sleep(8000);

//Launch to the MV2.0 application
protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
//Login to the MV2.0 application
protractor.loginHelpers.logInMV(testData1.userName,testData1.passwordField);

//click on the select billing intervals widget
element(by.xpath(testdata3.LayerSelector.Dropdown)).click();
browser.sleep(3000);
element(by.xpath(testdata3.LayerSelector.Bills)).click();
browser.sleep(8000);

//Verify that the billing intervals should be shown in drop down
expect(element(by.xpath(testdata3.Billing.IntervalDropdown)).getAttribute('data-toggle')).toEqual('dropdown');
element(by.xpath(testdata3.Billing.IntervalDropdown)).click();
//var intervalXpath= "//a[contains(text(),'"+"01/17/19"+"')]";
var intervalXpath= "//a[contains(text(),'"+localizedDate()+"')]";
expect(element(by.xpath(intervalXpath)).isDisplayed()).toBe(true);
});


it('Validate OnDemandInvoice',function() {
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
browser.refresh();
browser.sleep(5000);
element(by.xpath(testdata3.Billing.GoToBillsButton)).click();
browser.sleep(5000);
expect(element(by.xpath(testdata3.Billing.SelectPeriodInvoiceLabel)).isDisplayed()).toBe(true);
//The user should able to see ondemand intervals
expect(element(by.xpath(testdata3.Billing.SelectPeriodInvoiceDropdown)).isDisplayed()).toBe(true);
element(by.xpath(testdata3.Billing.SelectPeriodInvoiceDropdown)).click();
browser.sleep(2000);
var intervalXpath= "//a[contains(text(),'"+localizedDate()+"')]";
//var intervalXpath= "//a[contains(text(),'"+"01/17/19"+"')]";
expect(element.all(by.xpath(intervalXpath)).isPresent()).toBe(true);


expect(element(by.xpath(intervalXpath)).isDisplayed()).toBe(true);
//The user should able to select OnDemand invoice interval from drop down
element(by.xpath(intervalXpath)).click();
browser.sleep(3000);
element(by.xpath(testdata3.OfferCharge.ProductOfferingLabel)).click();
browser.sleep(3000);
element(by.xpath(testdata3.OfferCharge.PI_Selection)).click();
browser.sleep(5000);
var today = new Date();
var yyyy = today.getFullYear();
yy = yyyy.toString().substr(-2);
var d =  today.getDate();
var d2="0"+d;
var dd = d2.toString().substr(-2);
var m = today.getMonth()+1;
var m2="0"+m;
var mm= m2.toString().substr(-2);  //January is 0!
var date= new Date();
date = mm+"/"+dd+"/"+yyyy;
expect(element(by.xpath(testdata3.Adjustment.Currency)).getText()).toContain(date);
expect(element(by.xpath(testdata3.Adjustment.FirstGridRow)).isDisplayed()).toBe(true);

element(by.xpath(testdata3.OfferCharge.Close)).click();

browser.refresh();
browser.sleep(5000);
//All the widgets should be updated with ondemand intervals data
//validate amount due ,charges and prior balance are loaded accordingly   
//expect(element(by.xpath('//ecb-total-amount-due/div/div[2]/div[1]/div[1]/span')).getText()).toEqual(testdata.amountdue);
element(by.xpath(testdata3.Billing.GoToBillsButton)).click();
browser.sleep(5000);
//Include code for validating the charges

//Logout from the MV2.0 Application 
protractor.loginHelpers.logOutMV();



});
});