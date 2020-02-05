//var testData = require('../inputs/testData/PreandPostbillAdjustments.json');
var testData = require('../inputs/testData/prebillandpostbillcreation.json');
var testData1= require('../inputs/testData/Login.json');
var testData3 = require('../inputs/testData/XpathRepository.json');
var testdata6 = require('../inputs/testdata/JsonFileCreation.json');
var testdata = require('../inputs/testdata/PaymentMethods.json');

describe('Card View Sorting Functionality Test cases', function () {


it('Adding ACH Payment Method and Making few Pedning Payments', function () {

browser.refresh();
browser.sleep(10000);

//Launch to the MV2.0 application
protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
//Login to the MV2.0 application
protractor.loginHelpers.logInMV(testdata6.userName,testdata6.passwordField);

var testData5 = protractor.loginHelpers.lang;
//Get Metraview 2.0 URL
browser.get(testdata6.URL);
browser.sleep(5000);

//Select the reqired Currency
element(by.css(testData5)).click();
browser.sleep(3000);

//Login to MetraView as Corporate User
//Enter username as userName2
element(by.xpath(testData3.LoginPage.UserName)).sendKeys(testData.userName);

//Enter password
element(by.xpath(testData3.LoginPage.Password)).sendKeys(testData.passwordField);

//Click on Login Button
browser.findElement(By.xpath(testData3.LoginPage.LogInButton)).click();
browser.sleep(12000);  


expect(element(by.xpath(testData3.PaymentMethods.Link)).isDisplayed()).toBe(true);
element(by.xpath(testData3.PaymentMethods.Link)).click();
element(by.xpath(testData3.PaymentMethods.Popup_Proceed)).click();
browser.ignoreSynchronization = true;
browser.waitForAngular();
browser.sleep(5000);

element(by.xpath(testData3.PaymentMethods.CyberSource_Text));
browser.actions().mouseMove(element(by.xpath(testData3.PaymentMethods.CyberSource_Echeckoption))).perform();
element(by.xpath(testData3.PaymentMethods.CyberSource_Echeckoption_Button)).click();
browser.sleep(5000);

expect(element(by.xpath(testData3.PaymentMethods.CyberSource_BillingInformationTitle)).getText()).toEqual('Billing Information');

element(by.xpath(testData3.PaymentMethods.CyberSource_FirstName)).clear();
element(by.xpath(testData3.PaymentMethods.CyberSource_FirstName)).sendKeys(testdata.name);
element(by.xpath(testData3.PaymentMethods.CyberSource_LastName)).clear();
element(by.xpath(testData3.PaymentMethods.CyberSource_LastName)).sendKeys(testdata.surname);
element(by.xpath(testData3.PaymentMethods.CyberSource_Company)).clear();
element(by.xpath(testData3.PaymentMethods.CyberSource_Company)).sendKeys(testdata.companyname);
element(by.xpath(testData3.PaymentMethods.CyberSource_AddressLine1)).clear();
element(by.xpath(testData3.PaymentMethods.CyberSource_AddressLine1)).sendKeys(testdata.address1);
element(by.xpath(testData3.PaymentMethods.CyberSource_AddressLine2)).clear();
element(by.xpath(testData3.PaymentMethods.CyberSource_AddressLine2)).sendKeys(testdata.address2);
element(by.xpath(testData3.PaymentMethods.CyberSource_City)).clear();
element(by.xpath(testData3.PaymentMethods.CyberSource_City)).sendKeys(testdata.city);
element(by.xpath(testData3.PaymentMethods.CyberSource_Country)).click();
element(by.xpath(testData3.PaymentMethods.CyberSource_Countryvalue)).click();
element(by.xpath(testData3.PaymentMethods.CyberSource_State)).clear();
element(by.xpath(testData3.PaymentMethods.CyberSource_State)).sendKeys(testdata.state);
element(by.xpath(testData3.PaymentMethods.CyberSource_PostalCode)).clear();
element(by.xpath(testData3.PaymentMethods.CyberSource_PostalCode)).sendKeys(testdata.postalcode);
element(by.xpath(testData3.PaymentMethods.CyberSource_Phone)).clear();
element(by.xpath(testData3.PaymentMethods.CyberSource_Phone)).sendKeys(testdata.phno);
element(by.xpath(testData3.PaymentMethods.CyberSource_Email)).clear();
element(by.xpath(testData3.PaymentMethods.CyberSource_Email)).sendKeys(testdata.email);
// routing number
element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_RoutingNumber)).click();
element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_RoutingNumber)).sendKeys(testdata.routingnum);
element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_AccountNumber)).click();
element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_AccountNumber)).sendKeys(testdata.accountnum);
element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_Check_Number)).click();
element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_Check_Number)).sendKeys(testdata.checknum);

element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_Account_Type)).click();
element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_Account_Type_Savings)).click();

element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_DOB_Month)).click();
element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_DOB_Month_Value)).click();
element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_DOB_Day)).click();
element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_DOB_DayValue)).click();
element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_DOB_Year)).click();
element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_DOB_Year_Value)).click();
element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_Finish)).click();

browser.ignoreSynchronization = true;
browser.waitForAngular();


browser.refresh();
browser.sleep(10000);

element(by.xpath("//button[@id='makePaymentMinimal']")).click();
browser.sleep(3000);

//Clear the pay this amount value textbox
element(by.xpath(testData3.MakeaPayment.PaythisAmount_Value)).clear();
browser.sleep(3000);
//Enter the pay this amount value textbox
element(by.xpath(testData3.MakeaPayment.PaythisAmount_Value)).sendKeys("1");
browser.sleep(3000);

element(by.xpath(testData3.MakeaPayment.AddandPayNow)).click();
browser.sleep(3000);

element(by.xpath("//input[@ng-model='vm.authorizeCheck']")).click();
browser.sleep(3000);

element(by.xpath("//button[@ng-if='vm.payNow']")).click();
browser.sleep(3000);

browser.refresh();
browser.sleep(10000);

element(by.xpath("//button[@id='makePaymentMinimal']")).click();
browser.sleep(3000);

//Clear the pay this amount value textbox
element(by.xpath(testData3.MakeaPayment.PaythisAmount_Value)).clear();
browser.sleep(3000);
//Enter the pay this amount value textbox
element(by.xpath(testData3.MakeaPayment.PaythisAmount_Value)).sendKeys("2");
browser.sleep(3000);

element(by.xpath(testData3.MakeaPayment.AddandPayNow)).click();
browser.sleep(3000);

element(by.xpath("//input[@ng-model='vm.authorizeCheck']")).click();
browser.sleep(3000);

element(by.xpath("//button[@ng-if='vm.payNow']")).click();
browser.sleep(3000);
});

it('Adding Credit Card Payment Method and making few Succeded and Failed Payments ', function () {

browser.refresh();
browser.sleep(10000);

// Log Out from Application
browser.findElement(by.xpath(testData3.SystemBar.Logout)).click();
browser.sleep(5000);

var testData5 = protractor.loginHelpers.lang;

//Get Metraview 2.0 URL
browser.get(testdata6.URL);
browser.sleep(5000);

//Select the reqired Currency
element(by.css(testData5)).click();
browser.sleep(3000);

//Login to MetraView as Corporate User
//Enter username as userName2
element(by.xpath(testData3.LoginPage.UserName)).sendKeys(testData.userName);

//Enter password
element(by.xpath(testData3.LoginPage.Password)).sendKeys(testData.passwordField);

//Click on Login Button
browser.findElement(By.xpath(testData3.LoginPage.LogInButton)).click();
browser.sleep(12000);  

expect(element(by.xpath(testData3.PaymentMethods.Link)).isDisplayed()).toBe(true);
browser.sleep(3000);
element(by.xpath(testData3.PaymentMethods.Link)).click();
browser.sleep(3000);
element(by.xpath(testData3.PaymentMethods.Popup_Proceed)).click();
browser.sleep(3000);
browser.ignoreSynchronization = true;
browser.waitForAngular();

browser.sleep(1000);

element(by.xpath(testData3.PaymentMethods.Cybersource_Text));
browser.actions().mouseMove(element(by.xpath(testData3.PaymentMethods.CyberSource_Card))).perform();
element(by.xpath(testData3.PaymentMethods.CyberSource_Visacard_Name)).click();

expect(element(by.xpath(testData3.PaymentMethods.CyberSource_BillingInformationTitle)).getText()).toEqual('Billing Information');

element(by.xpath(testData3.PaymentMethods.CyberSource_FirstName)).clear();
element(by.xpath(testData3.PaymentMethods.CyberSource_FirstName)).sendKeys(testdata.name);
element(by.xpath(testData3.PaymentMethods.CyberSource_LastName)).clear();
element(by.xpath(testData3.PaymentMethods.CyberSource_LastName)).sendKeys(testdata.surname);
element(by.xpath(testData3.PaymentMethods.CyberSource_Company)).clear();
element(by.xpath(testData3.PaymentMethods.CyberSource_Company)).sendKeys(testdata.companyname);
element(by.xpath(testData3.PaymentMethods.CyberSource_AddressLine1)).clear();
element(by.xpath(testData3.PaymentMethods.CyberSource_AddressLine1)).sendKeys(testdata.address1);
element(by.xpath(testData3.PaymentMethods.CyberSource_AddressLine2)).clear();
element(by.xpath(testData3.PaymentMethods.CyberSource_AddressLine2)).sendKeys(testdata.address2);
element(by.xpath(testData3.PaymentMethods.CyberSource_City)).clear();
element(by.xpath(testData3.PaymentMethods.CyberSource_City)).sendKeys(testdata.city);
element(by.xpath(testData3.PaymentMethods.CyberSource_Country)).click();
element(by.xpath(testData3.PaymentMethods.CyberSource_Countryvalue)).click();
element(by.xpath(testData3.PaymentMethods.CyberSource_State)).clear();
element(by.xpath(testData3.PaymentMethods.CyberSource_State)).sendKeys(testdata.state);
element(by.xpath(testData3.PaymentMethods.CyberSource_PostalCode)).clear();
element(by.xpath(testData3.PaymentMethods.CyberSource_PostalCode)).sendKeys(testdata.postalcode);
element(by.xpath(testData3.PaymentMethods.CyberSource_Phone)).clear();
element(by.xpath(testData3.PaymentMethods.CyberSource_Phone)).sendKeys(testdata.phno);
element(by.xpath(testData3.PaymentMethods.CyberSource_Email)).clear();
element(by.xpath(testData3.PaymentMethods.CyberSource_Email)).sendKeys(testdata.email);

//card no
var widget = element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_Text));
browser.executeScript('arguments[0].scrollIntoView()', widget.getWebElement());
browser.sleep(1000);

element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_CardNumber)).click();
element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_CardNumber)).sendKeys(testdata.cardno);

element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_CVNLabel)).isPresent();
element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_CVNValue)).isPresent();
element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_CVNValue)).click();

element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_CVNValue)).sendKeys(testdata.cvnno);

// expiration date edit
element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_ExpirationMonth)).click();
element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_ExpirationMonthValue)).click();

element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_ExpirationYear)).click();
element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_ExpirationYearValue)).click();
element(by.xpath(testData3.PaymentMethods.CyberSource_PaymentDetails_Finish)).click();


browser.ignoreSynchronization = true;
browser.waitForAngular();

browser.refresh();
browser.sleep(10000);

element(by.xpath("//button[@id='makePaymentMinimal']")).click();
browser.sleep(3000);

//Clear the pay this amount value textbox
element(by.xpath(testData3.MakeaPayment.PaythisAmount_Value)).clear();
browser.sleep(3000);
//Enter the pay this amount value textbox
element(by.xpath(testData3.MakeaPayment.PaythisAmount_Value)).sendKeys("2");
browser.sleep(3000);

element(by.xpath(testData3.MakeaPayment.AddandPayNow)).click();
browser.sleep(3000);

element(by.xpath("//button[@ng-if='vm.payNow']")).click();
browser.sleep(3000);

browser.refresh();
browser.sleep(10000);

element(by.xpath("//button[@id='makePaymentMinimal']")).click();
browser.sleep(3000);

//Clear the pay this amount value textbox
element(by.xpath(testData3.MakeaPayment.PaythisAmount_Value)).clear();
browser.sleep(3000);
//Enter the pay this amount value textbox
element(by.xpath(testData3.MakeaPayment.PaythisAmount_Value)).sendKeys("4");
browser.sleep(3000);

element(by.xpath(testData3.MakeaPayment.AddandPayNow)).click();
browser.sleep(3000);

element(by.xpath("//button[@ng-if='vm.payNow']")).click();
browser.sleep(3000);

browser.refresh();
browser.sleep(10000);

element(by.xpath("//button[@id='makePaymentMinimal']")).click();
browser.sleep(3000);

//Clear the pay this amount value textbox
element(by.xpath(testData3.MakeaPayment.PaythisAmount_Value)).clear();
browser.sleep(3000);
//Enter the pay this amount value textbox
element(by.xpath(testData3.MakeaPayment.PaythisAmount_Value)).sendKeys("100000000000");
browser.sleep(3000);

element(by.xpath(testData3.MakeaPayment.AddandPayNow)).click();
browser.sleep(3000);

element(by.xpath("//button[@ng-if='vm.payNow']")).click();
browser.sleep(3000);

browser.refresh();
browser.sleep(10000);

element(by.xpath("//button[@id='makePaymentMinimal']")).click();
browser.sleep(3000);

//Clear the pay this amount value textbox
element(by.xpath(testData3.MakeaPayment.PaythisAmount_Value)).clear();
browser.sleep(3000);
//Enter the pay this amount value textbox
element(by.xpath(testData3.MakeaPayment.PaythisAmount_Value)).sendKeys("200000000000");
browser.sleep(3000);

element(by.xpath(testData3.MakeaPayment.AddandPayNow)).click();
browser.sleep(3000);

element(by.xpath("//button[@ng-if='vm.payNow']")).click();
browser.sleep(3000);

});

it('Validating Sorting functonality for Payments Recieved', function () {   

//Refresh the main page
browser.refresh();
browser.sleep(10000);

// Log Out from Application
browser.findElement(by.xpath(testData3.SystemBar.Logout)).click();
browser.sleep(5000);

var testData5 = protractor.loginHelpers.lang;

//Get Metraview 2.0 URL
browser.get(testdata6.URL);
browser.sleep(5000);

//Select the reqired Currency
element(by.css(testData5)).click();
browser.sleep(3000);

//Login to MetraView as Corporate User
//Enter username as userName2
element(by.xpath(testData3.LoginPage.UserName)).sendKeys(testData.userName);

//Enter password
element(by.xpath(testData3.LoginPage.Password)).sendKeys(testData.passwordField);

//Click on Login Button
browser.findElement(By.xpath(testData3.LoginPage.LogInButton)).click();
browser.sleep(12000);  
var sort = [];
var unSort = [];

//Click on Go to Bills Link
element(by.xpath(testData3.Billing.GoToBillsButton)).click();
browser.sleep(8000);

//Click on dropdown to select the hardclosed interval date
element(by.xpath(testData3.Billing.SelectIntervalDropdown)).click();

//select the 
element(by.xpath(testData3.Billing.SelectFirstInterval)).click();
browser.sleep(3000);

//Sorting for Payments recieved
browser.actions().mouseMove(element(by.xpath(testData3.Charges.PaymentReceived_Button))).perform();
browser.sleep(2000);

//click on view all button in order to validate the card view
element(By.xpath(testData3.Charges.Popup_ViewAll)).click();
browser.sleep(2000);

//click on card view button
element(by.xpath(testData3.MySubscriptions.Style_Card)).click();
browser.sleep(10000);

//Get the values of adjutment amount in unsort mode
const ele = element.all(by.xpath("//span[@ng-if='vm.paymentsHistoryConfigs[key].IsCurrency']"));

ele.map(function(eachName){
console.log('sorting in');
eachName.getText().then(function unsorting(unSorted){
unSort.push (unSorted);
return unSorted;
});
}).then(function(unSorted){
var testdata6 = protractor.loginHelpers.dashboard(); 
//click on sort and select adjutment amount from the dropdown
element(by.xpath(testData3.Adjustment.SortBy+testdata6.TEXT_NONE+testData3.Adjustment.CloseXpath)).click();
element(by.xpath(testData3.Adjustment.Dropdown_Value+testdata6.TEXT_AMOUNT+testData3.Adjustment.CloseXpath)).click();
browser.sleep(15000);
ele.map(function(eachName){
eachName.getText().then(function sorting(sorted){
sort.push(sorted);
return sorted ;
});

}).then(function compare ()

{       
for (var i = 0; i < sort.length-1; i++) {
console.log(sort.length,sort[i].replace(/\$|,/g, ''),sort[i+1].replace(/\$|,/g, ''),i);

if(parseFloat(sort[i].replace(/\$|,/g, '')) >= parseFloat(sort[i+1].replace(/\$|,/g, '')))
{
console.log(sort.length,sort[i].replace(/\$|,/g, ''),sort[i+1].replace(/\$|,/g, ''),i)
console.log("Sorting functionality is Working as Expected in Descending order for Success payments");          
}   

else{
console.log(sort.length,sort[i].replace(/\$|,/g, ''),sort[i+1].replace(/\$|,/g, ''),i)
console.log("Sorting functionality is Not Working as Expected in Descending order for Success payments");
break;  
}     
}         
})
});
});

it('Validating Sorting functonality for pending and failed transactions', function () {   
browser.refresh();
browser.sleep(3000);

var sort = [];
var unSort = [];


//Click on Go to Bills Link
element(by.xpath(testData3.Billing.GoToBillsButton)).click();
browser.sleep(8000);

//Click on dropdown to select the hardclosed interval date
element(by.xpath(testData3.Billing.SelectIntervalDropdown)).click();

//select the 
element(by.xpath(testData3.Billing.SelectFirstInterval)).click();
browser.sleep(3000);

//Sorting for Payments recieved
browser.actions().mouseMove(element(by.xpath(testData3.Payments.Popup))).perform();
browser.sleep(2000);

//click on view all button in order to validate the card view
element(By.xpath(testData3.Charges.Popup_ViewAll)).click();
browser.sleep(2000);

//click on card view button
element(by.xpath(testData3.MySubscriptions.Style_Card)).click();
browser.sleep(10000);

//Get the values of adjutment amount in unsort mode
const ele = element.all(by.xpath("//span[@ng-if='vm.paymentsHistoryConfigs[key].IsCurrency']"));

ele.map(function(eachName){
console.log('sorting in');
eachName.getText().then(function unsorting(unSorted){
unSort.push (unSorted);
return unSorted;
});
}).then(function(unSorted){
var testdata6 = protractor.loginHelpers.dashboard(); 
//click on sort and select adjutment amount from the dropdown
element(by.xpath(testData3.Adjustment.SortBy+testdata6.TEXT_NONE+testData3.Adjustment.CloseXpath)).click();
element(by.xpath(testData3.Adjustment.Dropdown_Value+testdata6.TEXT_AMOUNT+testData3.Adjustment.CloseXpath)).click();
browser.sleep(15000);
ele.map(function(eachName){
eachName.getText().then(function sorting(sorted){
sort.push(sorted);
return sorted ;
});
}).then(function compare ()

{       
for (var i = 0; i < sort.length-1; i++) {
console.log(sort.length,sort[i].replace(/\$|,/g, ''),sort[i+1].replace(/\$|,/g, ''),i);

if(parseFloat(sort[i].replace(/\$|,/g, '')) >= parseFloat(sort[i+1].replace(/\$|,/g, '')))
{
console.log(sort.length,sort[i].replace(/\$|,/g, ''),sort[i+1].replace(/\$|,/g, ''),i)
console.log("Sorting functionality is Working as Expected in Descending order for Pending Rejected payments");          
}   

else{
console.log(sort.length,sort[i].replace(/\$|,/g, ''),sort[i+1].replace(/\$|,/g, ''),i)
console.log("Sorting functionality is Not Working as Expected in Descending order for Pending Rejected payments");
break;  
}     
}         
})
});

});

it('Validating Sorting functonality for Charges widget', function () {   

//Refresh the main pages
browser.refresh();
browser.sleep(10000);

// Log Out from Application
browser.findElement(by.xpath(testData3.SystemBar.Logout)).click();
browser.sleep(5000);

var testData5 = protractor.loginHelpers.lang;

//Get Metraview 2.0 URL
browser.get(testdata6.URL);
browser.sleep(5000);

//Select the reqired Currency
element(by.css(testData5)).click();
browser.sleep(3000);

//Login to MetraView as Corporate User
//Enter username as userName2
element(by.xpath(testData3.LoginPage.UserName)).sendKeys(testData.userName);

//Enter password
element(by.xpath(testData3.LoginPage.Password)).sendKeys(testData.passwordField);

//Click on Login Button
browser.findElement(By.xpath(testData3.LoginPage.LogInButton)).click();
browser.sleep(12000);  

var sort = [];
var unSort = [];

//Click on Go to Bills Link
element(by.xpath(testData3.Billing.GoToBillsButton)).click();
browser.sleep(8000);

//Click on dropdown to select the hardclosed interval date
element(by.xpath(testData3.Billing.SelectIntervalDropdown)).click();

//click on group usage po
element(by.xpath(testData3.OfferCharge.PO_GroupUsage)).click();
browser.sleep(1000);

//Select PI link
element(by.xpath(testData3.OfferCharge.PI_Selection)).click();
browser.sleep(1000);       

//click on card view button
element(by.xpath(testData3.MySubscriptions.Style_Card)).click();
browser.sleep(10000);

//Get the values of adjutment amount in unsort mode
const elem = element.all(by.xpath("//td[text()='Display Amount']//following::td[1]"))
elem.map(function(eachName){
eachName.getText().then(function unsorting(unSorted){
unSort.push (unSorted);
console.log(unSort);
return unSorted;
});

});
browser.sleep(2000);

//click on sort and select adjutment amount from the dropdown
element(by.xpath(testData3.Adjustment.SortByDropdown)).click();
element(by.xpath("//li[@class='ebComponentList-item ng-scope'][2]//a[contains(@ng-click,'sortKey')]")).click();
browser.sleep(10000);

//Get the values of adjutment amount in sort mode
elem.map(function(eachName){
eachName.getText().then(function sorting(sorted){
sort.push(sorted);
console.log(sort);
return sorted ;

});

//validate the sorting functionality
}).then(function compare ()

{       
for (var i = 0; i < sort.length-1; i++) {
console.log(sort.length,sort[i].replace(/\$|,/g, ''),sort[i+1].replace(/\$|,/g, ''),i);

if(parseFloat(sort[i].replace(/\$|,/g, '')) >= parseFloat(sort[i+1].replace(/\$|,/g, '')))
{
//console.log(sort.length,sort[i].replace(/\$|,/g, ''),sort[i+1].replace(/\$|,/g, ''),i)
console.log("Sorting functionality is Working as Expected in Descending order for Pi details");          
}   

else{
console.log(sort.length,sort[i].replace(/\$|,/g, ''),sort[i+1].replace(/\$|,/g, ''),i)
console.log("Sorting functionality is Not Working as Expected in Descending order for Pi details");
break;  
}     
}         
})
});  

it('Validating Sorting functonality for Transaction widget', function () {   

browser.refresh();
browser.sleep(10000);
        
var sort = [];
var unSort = [];
                    
//Click on Go to Bills Link
//Click on the 'Transaction' link and navigate to 'Transaction' page
element(by.xpath(testData3.Quotes.Transactions_Link)).click();
browser.sleep(5000);
        
element(by.xpath(testData3.OfferCharge.AccountView_Pane)).click();
browser.sleep(2000);

//Click on the Account name present in the page under 'Account View'
element(by.xpath(testData3.OfferCharge.PayerPOSelection)).click();
browser.sleep(2000);
                
//click on group usage po    
element(by.xpath(testData3.OfferCharge.PO_GroupUsage)).click();
browser.sleep(1000);
    
//Select PI link
element(by.xpath(testData3.OfferCharge.PI_Selection)).click();
browser.sleep(1000);       
        
//click on card view button        
element(by.xpath(testData3.MySubscriptions.Style_Card)).click();
browser.sleep(10000);

//Get the values of adjutment amount in unsort mode
const elem = element.all(by.xpath("//td[text()='Display Amount']//following::td[1]"))
elem.map(function(eachName){
eachName.getText().then(function unsorting(unSorted){
unSort.push (unSorted);
console.log(unSort);
return unSorted;
});

});
browser.sleep(2000);

//click on sort and select adjutment amount from the dropdown
element(by.xpath(testData3.Adjustment.SortByDropdown)).click();
element(by.xpath("//li[@class='ebComponentList-item ng-scope'][2]//a[contains(@ng-click,'sortKey')]")).click();
browser.sleep(10000);

//Get the values of adjutment amount in sort mode
elem.map(function(eachName){
eachName.getText().then(function sorting(sorted){
sort.push(sorted);
console.log(sort);
return sorted ;

});

//validate the sorting functionality
}).then(function compare ()

{       
for (var i = 0; i < sort.length-1; i++) {
console.log(sort.length,sort[i].replace(/\$|,/g, ''),sort[i+1].replace(/\$|,/g, ''),i);

if(parseFloat(sort[i].replace(/\$|,/g, '')) >= parseFloat(sort[i+1].replace(/\$|,/g, '')))
{
//console.log(sort.length,sort[i].replace(/\$|,/g, ''),sort[i+1].replace(/\$|,/g, ''),i)
console.log("Sorting functionality is Working as Expected in Descending order for Pi details");          
}   

else{
console.log(sort.length,sort[i].replace(/\$|,/g, ''),sort[i+1].replace(/\$|,/g, ''),i)
console.log("Sorting functionality is Not Working as Expected in Descending order for Pi details");
break;  
}     
}         
}) 

//Logout from the MV2.0 Application 
protractor.loginHelpers.logOutMV();

});
});