var testdata = require('../inputs/testdata/PaymentMethods.json');
var testdata1 = require('../inputs/testdata/Login.json');
var testdata2 = require('../inputs/testdata/JsonFileCreation.json');
var testdata3 = require('../inputs/testdata/XpathRepository.json');

describe('Validate currency "$" symbol is displayed for Amount Due in localization using ACH/Credit card', function () {

it('Login with new corporate user and Adding Payment Methods to check the "$" sign in Amount due ', function(){
//MVIEW-2838-Validate "$" currency sign is displayed in the Amount field at Credit Card "Review Payment details" and "Payment Confirmation"    
var testdata8=protractor.loginHelpers.langCode;

function login(){
var testdata5 = protractor.loginHelpers.lang; 
browser.get(testdata2.URL);
browser.sleep(5000);
element(by.css(testdata5)).click();
browser.sleep(5000);      
switch (testdata8) {
case "BR":
//Loading the Login Page
//Login to Metraview with Corporate Account
element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata2.corpBR);
element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata2.passwordField);
browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
browser.sleep(12000);
break;
case "DE":

//Login to Metraview with Corporate Account
element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata2.corpDE);
element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata2.passwordField);
browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
browser.sleep(12000);
break;
case "EG":

//Login to Metraview with Corporate Account
element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata2.corpEG);
element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata2.passwordField);
browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
browser.sleep(12000);
break;
case "ES":

//Login to Metraview with Corporate Account
element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata2.corpES);
element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata2.passwordField);
browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
browser.sleep(12000);
break;
case "FR":

//Login to Metraview with Corporate Account
element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata2.corpFR);
element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata2.passwordField);
browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
browser.sleep(12000);
break;
case "GB":

//Login to Metraview with Corporate Account
element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata2.corpGB);
element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata2.passwordField);
browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
browser.sleep(12000);
break;
case "IL":

//Login to Metraview with Corporate Account
element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata2.corpIL);
element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata2.passwordField);
browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
browser.sleep(12000);
break;
case "JP":

//Login to Metraview with Corporate Account
element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata2.corpJP);
element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata2.passwordField);
browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
browser.sleep(12000);
break; 
case "MX":

//Login to Metraview with Corporate Account
element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata2.corpMX);
element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata2.passwordField);
browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
browser.sleep(12000);
break;    
case "SE":

//Login to Metraview with Corporate Account
element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata2.corpSE);
element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata2.passwordField);
browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
browser.sleep(12000);
break;
case "US":

//Login to Metraview with Corporate Account
element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata2.corpUS);
element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata2.passwordField);
browser.findElement(by.xpath(testdata3.LoginPage.LogInButton)).click();
browser.sleep(12000);
break;
}
}
browser.refresh();
browser.sleep(7000);
login();


expect(element(by.xpath(testdata3.PaymentMethods.Link)).isDisplayed()).toBe(true);
browser.sleep(5000);
element(by.xpath(testdata3.PaymentMethods.Link)).click();
browser.sleep(5000);
element(by.xpath(testdata3.PaymentMethods.Popup_Proceed)).click();
browser.sleep(3000);
browser.ignoreSynchronization = true;
browser.waitForAngular();
browser.sleep(1000);

element(by.xpath(testdata3.PaymentMethods.Cybersource_Text));
browser.actions().mouseMove(element(by.xpath(testdata3.PaymentMethods.CyberSource_Card))).perform();
element(by.xpath(testdata3.PaymentMethods.CyberSource_Visacard_Name)).click();

expect(element(by.xpath(testdata3.PaymentMethods.CyberSource_BillingInformationTitle)).getText()).toEqual('Billing Information');

element(by.xpath(testdata3.PaymentMethods.CyberSource_FirstName)).clear();
element(by.xpath(testdata3.PaymentMethods.CyberSource_FirstName)).sendKeys(testdata.name);
element(by.xpath(testdata3.PaymentMethods.CyberSource_LastName)).clear();
element(by.xpath(testdata3.PaymentMethods.CyberSource_LastName)).sendKeys(testdata.surname);
element(by.xpath(testdata3.PaymentMethods.CyberSource_Company)).clear();
element(by.xpath(testdata3.PaymentMethods.CyberSource_Company)).sendKeys(testdata.companyname);
element(by.xpath(testdata3.PaymentMethods.CyberSource_AddressLine1)).clear();
element(by.xpath(testdata3.PaymentMethods.CyberSource_AddressLine1)).sendKeys(testdata.address1);
element(by.xpath(testdata3.PaymentMethods.CyberSource_AddressLine2)).clear();
element(by.xpath(testdata3.PaymentMethods.CyberSource_AddressLine2)).sendKeys(testdata.address2);
element(by.xpath(testdata3.PaymentMethods.CyberSource_City)).clear();
element(by.xpath(testdata3.PaymentMethods.CyberSource_City)).sendKeys(testdata.city);
element(by.xpath(testdata3.PaymentMethods.CyberSource_Country)).click();
element(by.xpath(testdata3.PaymentMethods.CyberSource_Countryvalue)).click();
element(by.xpath(testdata3.PaymentMethods.CyberSource_State)).clear();
element(by.xpath(testdata3.PaymentMethods.CyberSource_State)).sendKeys(testdata.state);
element(by.xpath(testdata3.PaymentMethods.CyberSource_PostalCode)).clear();
element(by.xpath(testdata3.PaymentMethods.CyberSource_PostalCode)).sendKeys(testdata.postalcode);
element(by.xpath(testdata3.PaymentMethods.CyberSource_Phone)).clear();
element(by.xpath(testdata3.PaymentMethods.CyberSource_Phone)).sendKeys(testdata.phno);
element(by.xpath(testdata3.PaymentMethods.CyberSource_Email)).clear();
element(by.xpath(testdata3.PaymentMethods.CyberSource_Email)).sendKeys(testdata.email);

//Card Number

var widget = element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_Text));
browser.executeScript('arguments[0].scrollIntoView()', widget.getWebElement());
browser.sleep(1000);

element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_CardNumber)).click();
element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_CardNumber)).sendKeys(testdata.cardno);

element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_CVNLabel)).isPresent();
element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_CVNValue)).isPresent();
element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_CVNValue)).click();

element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_CVNValue)).sendKeys(testdata.cvnno);

// expiration date edit
element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_ExpirationMonth)).click();
element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_ExpirationMonthValue)).click();

element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_ExpirationYear)).click();
element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_ExpirationYearValue)).click();
element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_Finish)).click();
browser.sleep(3000);

//Adding ACH Payment Method
browser.refresh();
browser.sleep(5000);
expect(element(by.xpath(testdata3.PaymentMethods.Link)).isDisplayed()).toBe(true);
element(by.xpath(testdata3.PaymentMethods.Link)).click();
element(by.xpath(testdata3.PaymentMethods.Popup_Proceed)).click();
browser.ignoreSynchronization = true;
browser.waitForAngular();
browser.sleep(12000);

element(by.xpath(testdata3.PaymentMethods.CyberSource_Text));
browser.sleep(3000);
//browser.actions().mouseMove(element(by.xpath(testdata3.PaymentMethods.CyberSource_Echeckoption))).perform();
browser.sleep(3000);
element(by.xpath(testdata3.PaymentMethods.CyberSource_Echeckoption_Button)).click();
browser.sleep(5000);

expect(element(by.xpath(testdata3.PaymentMethods.CyberSource_BillingInformationTitle)).getText()).toEqual('Billing Information');

element(by.xpath(testdata3.PaymentMethods.CyberSource_FirstName)).clear();
element(by.xpath(testdata3.PaymentMethods.CyberSource_FirstName)).sendKeys(testdata.name);
element(by.xpath(testdata3.PaymentMethods.CyberSource_LastName)).clear();
element(by.xpath(testdata3.PaymentMethods.CyberSource_LastName)).sendKeys(testdata.surname);
element(by.xpath(testdata3.PaymentMethods.CyberSource_Company)).clear();
element(by.xpath(testdata3.PaymentMethods.CyberSource_Company)).sendKeys(testdata.companyname);
element(by.xpath(testdata3.PaymentMethods.CyberSource_AddressLine1)).clear();
element(by.xpath(testdata3.PaymentMethods.CyberSource_AddressLine1)).sendKeys(testdata.address1);
element(by.xpath(testdata3.PaymentMethods.CyberSource_AddressLine2)).clear();
element(by.xpath(testdata3.PaymentMethods.CyberSource_AddressLine2)).sendKeys(testdata.address2);
element(by.xpath(testdata3.PaymentMethods.CyberSource_City)).clear();
element(by.xpath(testdata3.PaymentMethods.CyberSource_City)).sendKeys(testdata.city);
element(by.xpath(testdata3.PaymentMethods.CyberSource_Country)).click();
element(by.xpath(testdata3.PaymentMethods.CyberSource_Countryvalue)).click();
element(by.xpath(testdata3.PaymentMethods.CyberSource_State)).clear();
element(by.xpath(testdata3.PaymentMethods.CyberSource_State)).sendKeys(testdata.state);
element(by.xpath(testdata3.PaymentMethods.CyberSource_PostalCode)).clear();
element(by.xpath(testdata3.PaymentMethods.CyberSource_PostalCode)).sendKeys(testdata.postalcode);
element(by.xpath(testdata3.PaymentMethods.CyberSource_Phone)).clear();
element(by.xpath(testdata3.PaymentMethods.CyberSource_Phone)).sendKeys(testdata.phno);
element(by.xpath(testdata3.PaymentMethods.CyberSource_Email)).clear();
element(by.xpath(testdata3.PaymentMethods.CyberSource_Email)).sendKeys(testdata.email);

//Routing number
element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_RoutingNumber)).click();
element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_RoutingNumber)).sendKeys(testdata.routingnum);
element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_AccountNumber)).click();
element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_AccountNumber)).sendKeys(testdata.accountnum);
element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_Check_Number)).click();
element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_Check_Number)).sendKeys(testdata.checknum);

element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_Account_Type)).click();
element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_Account_Type_Savings)).click();

element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_DOB_Month)).click();
element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_DOB_Month_Value)).click();
element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_DOB_Day)).click();
element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_DOB_DayValue)).click();
element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_DOB_Year)).click();
element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_DOB_Year_Value)).click();
element(by.xpath(testdata3.PaymentMethods.CyberSource_PaymentDetails_Finish)).click();
browser.sleep(3000);

//Validate "$" currency sign is displayed in the Amount field at Credit Card "Review Payment details" and "Payment Confirmation" pages
browser.refresh();
browser.sleep(5000);
element(by.xpath(testdata3.MakeaPayment.AmountDue)).getText().then(function (text) {
console.log("Amount Due = "+text);
var totalrowsCount=text.split('',1);
var currencySign=totalrowsCount.toString().replace('[ ','').replace(' ]','');
console.log("Total Amount Text =  "+currencySign);

//Validating the Dollar ($) Sign in 'Amount Due' text in the MetraView Main Page
expect(currencySign).toEqual("$");
});

//Verifying 'Make a payment' link is available
expect(element(by.xpath(testdata3.MakeaPayment.MakeaPayment_Button)).isDisplayed()).toBe(true);
browser.sleep(3000);

//click on 'Make a payment' link
element(by.xpath(testdata3.MakeaPayment.MakeaPayment_Button)).click();
browser.sleep(3000);
//Inserting $1 for Payment
element(by.xpath(testdata3.MakeaPayment.PaythisAmount_Value)).clear();
browser.sleep(1000);
element(by.xpath(testdata3.MakeaPayment.PaythisAmount_Value)).sendKeys("1");

//Validating the ACH payment method
element(by.xpath(testdata3.MakeaPayment.PaymentMethod_Dropdown)).click();
browser.sleep(2000);
//element(by.xpath(testdata3.MakeaPayment.PaymentMethod_Dropdown_Values)).click();

element(by.partialLinkText('Visa *1111')).click();
browser.sleep(2000);

element(by.xpath(testdata3.MakeaPayment.AddandPayNow)).click();
browser.sleep(5000);

expect(element(by.xpath(testdata3.MakeaPayment.ReviewPaymentDetails_Text)).isDisplayed()).toBe(true);
browser.sleep(2000);

//Validating '$' currency sign is displayed in the 'Amount' field in 'Review Payment details' overlay with ACH Payment Method
element(by.xpath(testdata3.MakeaPayment.AmountDue)).getText().then(function (text) {
console.log("Amount Due = "+text);
expect(text).toContain("$");
});

//Click on 'PayNow' button
element(by.xpath(testdata3.MakeaPayment.PayNow_Button)).click();
browser.sleep(3000);

//Validating '$' currency sign is displayed in the 'Amount' field in 'Payment Confirmation' overlay 
element(by.xpath(testdata3.MakeaPayment.AmountDue)).getText().then(function (text) {
console.log("Amount Due = "+text);
expect(text).toContain("$");

});
});

it('Validate "$" currency sign is displayed in the Amount field at Credit Card "Review Payment details" and "Payment Confirmation" ', function () {
//MVIEW-2838-Validate "$" currency sign is displayed in the Amount field at Credit Card "Review Payment details" and "Payment Confirmation"    
//Input file to refer
var testdata6 = protractor.loginHelpers.dashboard();

browser.refresh();
browser.sleep(10000);

//Load the URL
browser.get(testdata2.URL);
browser.sleep(3000);

//For language selection
var testdata7 = protractor.loginHelpers.lang;
element(by.css(testdata7)).click();
browser.sleep(3000);

//Log in to MetraView with corporate account
element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata2.corpUS);
element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata2.passwordField);
browser.sleep(3000);

browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
browser.sleep(12000);

element(by.xpath(testdata3.MakeaPayment.AmountDue)).getText().then(function (text) {
console.log("Amount Due = "+text);
var totalrowsCount=text.split('',1);
var currencySign=totalrowsCount.toString().replace('[ ','').replace(' ]','');
console.log("Total Amount Text =  "+currencySign);

//Validating the Dollar ($) Sign in 'Amount Due' text in the MetraView Main Page
expect(currencySign).toEqual("$");
});

//Verifying 'Make a payment' link is available
expect(element(by.xpath(testdata3.MakeaPayment.MakeaPayment_Button)).isDisplayed()).toBe(true);
browser.sleep(3000);

//click on 'Make a payment' link
element(by.xpath(testdata3.MakeaPayment.MakeaPayment_Button)).click();
browser.sleep(3000);
//Inserting $1 for Payment
element(by.xpath(testdata3.MakeaPayment.PaythisAmount_Value)).clear();
browser.sleep(1000);
element(by.xpath(testdata3.MakeaPayment.PaythisAmount_Value)).sendKeys("1");
browser.sleep(3000);

//Validating the CC payment method
element(by.xpath(testdata3.MakeaPayment.PaymentMethod_Dropdown)).click();
browser.sleep(2000);
expect(element(by.partialLinkText(testdata3.MakeaPayment.PaymentMethod_Dropdown_Visa)).isPresent()).toBe(true);
element(by.partialLinkText(testdata3.MakeaPayment.PaymentMethod_Dropdown_Visa)).click();

element(by.xpath(testdata3.MakeaPayment.AddandPayNow)).click();
browser.sleep(5000);

expect(element(by.xpath(testdata3.MakeaPayment.ReviewPaymentDetails_Text)).isDisplayed()).toBe(true);
browser.sleep(2000);

//Validating '$' currency sign is displayed in the 'Amount' field in 'Review Payment details' overlay 
element(by.xpath(testdata3.MakeaPayment.AmountDue)).getText().then(function (text) {
console.log("Amount Due = "+text);
expect(text).toContain("$");
});

//Click on 'PayNow' button
element(by.xpath(testdata3.MakeaPayment.PayNow_Button)).click();
browser.sleep(3000);

//Validating '$' currency sign is displayed in the 'Amount' field in 'Payment Confirmation' overlay 
element(by.xpath(testdata3.MakeaPayment.AmountDue)).getText().then(function (text) {
console.log("Amount Due = "+text);
expect(text).toContain("$");
browser.sleep(3000);
});
});

it('Cleanup-Delete Payment Card',function(){
browser.refresh();
browser.sleep(7000);

element(by.xpath(testdata3.PaymentMethods.ViewAll_PaymentMethods)).click();
browser.sleep(10000);
//clean-up
element.all(by.xpath(testdata3.PaymentMethods.ViewAllPaymentMethods_Remove_Button)).then(function(items) {
items[0].click();
});
browser.sleep(3000);
element(by.xpath(testdata3.PaymentMethods.Delete_button)).click();
browser.sleep(5000);

// Log Out from Application
browser.findElement(by.xpath(testdata3.SystemBar.Logout)).click();
browser.sleep(12000);

});

});