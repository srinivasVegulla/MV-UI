var testdata = require('../inputs/testdata/Login.json');
var testdata2 = require('../inputs/testdata/JsonFileCreation.json');
var testdata3 = require('../inputs/testdata/XpathRepository.json');
var testdataAccountCreation = require('../inputs/testdata/AccountCreation.json');
var localeViewConfigPath = 'C:/ECB/METRAVIEW-CONFIG/UI-EXT-DATA/default/viewConfig/Localization/';
var activityLogPath = require('C:/ECB/METRAVIEW-CONFIG/UI-EXT-DATA/default/viewConfig/ActivityLog.json');
var downloadsPath = require('C:/ECB/METRAVIEW-CONFIG/UI-EXT-DATA/default/viewConfig/Downloads.json');
var miscAdjustmentPath = require('C:/ECB/METRAVIEW-CONFIG/UI-EXT-DATA/default/viewConfig/MiscAdjustment.json');
var nonstandardChargesPath = require('C:/ECB/METRAVIEW-CONFIG/UI-EXT-DATA/default/viewConfig/NonstandardCharges.json');
var payerSubscriptionsPath = require('C:/ECB/METRAVIEW-CONFIG/UI-EXT-DATA/default/viewConfig/PayerSubscriptions.json');
var paymentMethodsPath = require('C:/ECB/METRAVIEW-CONFIG/UI-EXT-DATA/default/viewConfig/PaymentMethods.json');
var paymentReceivedPath = require('C:/ECB/METRAVIEW-CONFIG/UI-EXT-DATA/default/viewConfig/PaymentReceived.json');
var paymentsHistoryPath = require('C:/ECB/METRAVIEW-CONFIG/UI-EXT-DATA/default/viewConfig/PaymentsHistory.json');
var postBillPath = require('C:/ECB/METRAVIEW-CONFIG/UI-EXT-DATA/default/viewConfig/PostBill.json');
var preBillPath = require('C:/ECB/METRAVIEW-CONFIG/UI-EXT-DATA/default/viewConfig/PreBill.json');
var subscriptionsPath = require('C:/ECB/METRAVIEW-CONFIG/UI-EXT-DATA/default/viewConfig/Subscriptions.json');

var localeconfigFilepath='C:/ECB/METRAVIEW-CONFIG/UI-EXT-DATA/default/localeConfig/';
var fs = require('fs');

describe('Launch the MV 2.0 Application', function () {

exports.viewOnlineBill = (userName) =>{
//Ignore Synchronization to access non angualr Pages
browser.ignoreSynchronization = true;

//Load MetraNet URL
browser.get(testdataAccountCreation.metraNetURL);
browser.sleep(3000);

element(by.xpath('//img[@src="/Res/Images/flags/us.png"]')).click();
browser.sleep(3000);

//Provide Username
var mnUserName = element(by.xpath(testdata3.MetraNet.UserName_Input));
mnUserName.sendKeys(testdataAccountCreation.mnAdmin);
browser.sleep(3000);

//Provide Password
var mnPassword = element(by.xpath(testdata3.MetraNet.Password_Input));
mnPassword.sendKeys(testdataAccountCreation.mnAdminPwd);
browser.sleep(3000);

//Click on 'Login'
var mnlogin = element(by.xpath(testdata3.MetraNet.LogInButton));
mnlogin.click();
browser.sleep(3000);

//Load the account
var accSearch = element(by.xpath(testdata3.MetraNet.Searchbar));
accSearch.sendKeys(userName);
browser.sleep(5000);

element(by.xpath("//h3[contains(text(),'"+userName+"')]")).click();
browser.sleep(5000);

element(by.xpath("//div[contains(@class,'collapse-east')]")).click();
browser.sleep(3000);

browser.switchTo().frame('MainContentIframe');

element(by.xpath("//button[text()='Account']")).click();
browser.sleep(3000);

element(by.xpath("//a[@id='ViewOnlineBill']/span")).click();
browser.sleep(3000);

browser.switchTo().frame('ticketFrame');
browser.sleep(3000);

//Ignore Synchronization to access non angualr Pages
browser.ignoreSynchronization = true;
}
exports.logOutMetraNet = () =>{
browser.refresh();
browser.sleep(5000);

element(by.xpath('//a[contains(@class,"Logout")] ')).click();
browser.sleep(3000);
}

exports.launchMV = (lang) =>{
var dirPath = 'C:/Users/Administrator/Downloads';
  try { var files = fs.readdirSync(dirPath); }
  catch(e) { return; }
  if (files.length > 0)
    for (var i = 0; i < files.length; i++) {
      var filePath = dirPath + '/' + files[i];
      if (fs.statSync(filePath).isFile())
        fs.unlinkSync(filePath);
    }
browser.get(testdata2.URL);
browser.sleep(2000);
element(by.css(lang)).click();
browser.sleep(3000);
}

exports.logInMV = (userName,password) =>{
  browser.ignoreSynchronization=false;
element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(userName);
browser.sleep(2000);
element(by.xpath(testdata3.LoginPage.Password)).sendKeys(password);
browser.sleep(2000);
element(by.xpath(testdata3.LoginPage.LogInButton)).click();
browser.sleep(12000);

}

exports.logOutMV = () =>{
browser.refresh();
browser.sleep(5000);

element(by.xpath(testdata3.SystemBar.LogoutMV)).click();
browser.sleep(5000);
}

it('Launch the URL', function () {
browser.get(testdata2.URL);
browser.sleep(2000);

element(by.css( testdata3.Languages.US)).click();
browser.sleep(3000);

browser.driver.manage().window().maximize();
browser.sleep(2000);
});

});
describe('Exporting the Localalized Files from MetraView-Ext-Data', function () {

it('Retrieving the localized files',  () => {

exports.lang = testdata3.Languages.US;
exports.langCode="US";
exports.PaymentsLang = testdata3.AccountSummary_Payments.US;

exports.randomNumber =function(){
//Gets a random number between min and max
var number = Math.floor(Math.random() * 1000);
console.log(number);
return number;

};

exports.changePassword =  function(){
var testdata = require('C:/ECB/METRAVIEW-CONFIG/UI-EXT-DATA/default/i18n/changePassword/locale-en.json');
return testdata;        
};

exports.common = function(){
var testdata = require('C:/ECB/METRAVIEW-CONFIG/UI-EXT-DATA/default/i18n/common/locale-en.json');
return testdata;
};

exports.localeConfig = function(){
var testdata = require('C:/ECB/METRAVIEW-CONFIG/UI-EXT-DATA/default/localeConfig/localeSelector.json');
return testdata;
};

exports.dashboard = function(){
var testdata = require('C:/ECB/METRAVIEW-CONFIG/UI-EXT-DATA/default/i18n/dashboard/locale-en.json');
return testdata;      
};

exports.expiredPassword = function(){
var testdata = require('C:/ECB/METRAVIEW-CONFIG/UI-EXT-DATA/default/i18n/expiredPassword/locale-en.json');
return testdata;
};

exports.forgotPasswordInstruction = function(){   
var testdata = require('C:/ECB/METRAVIEW-CONFIG/UI-EXT-DATA/default/i18n/forgotPasswordInstruction/locale-en.json');
return testdata;
};

exports.nowCast = function(){
var testdata = require('C:/ECB/METRAVIEW-CONFIG/UI-EXT-DATA/default/i18n/nowCast/locale-en.json');
return testdata;
};

exports.productViews = function(){  
var testdata = require('C:/ECB/METRAVIEW-CONFIG/UI-EXT-DATA/default/i18n/productViews/locale-en.json');
return testdata;    
};

exports.resetPassword = function(){
var testdata = require('C:/ECB/METRAVIEW-CONFIG/UI-EXT-DATA/default/i18n/resetPassword/locale-en.json');
return testdata;
};

exports.security = function(){
var testdata = require('C:/ECB/METRAVIEW-CONFIG/UI-EXT-DATA/default/i18n/security/locale-en.json');
return testdata;   
};

exports.signUp = function(){
var testdata = require('C:/ECB/METRAVIEW-CONFIG/UI-EXT-DATA/default/i18n/signUp/locale-en.json');
return testdata;      
};

exports.viewSelector = function(){
var testdata = require('C:/ECB/METRAVIEW-CONFIG/UI-EXT-DATA/default/i18n/viewSelector/locale-en.json');
return testdata;
};

exports.commonconfig = function(){
  return 'C:/ECB/METRAVIEW-CONFIG/UI-EXT-DATA/default/commonConfig.json';
};

exports.activityLogValues = function(){
var keys = [] ;
var names = [];

var keys2= [] ;
var names2 = [];

var keys3= [] ;
var rawdata = JSON.stringify(activityLogPath);
rawdata = rawdata.replace('{"columns":{"fields":[{',",");
for(var element in rawdata.split('}'))
{
var individualValue  =  rawdata.split('}')[element];
for(var columnSeperateValue in individualValue.split(','))
{
var commaSeperateValuetype =individualValue.split(',')[columnSeperateValue];
if(commaSeperateValuetype.includes('"Sortable"'))
{
keys.push(individualValue.split(',')[1].replace('{','').split(':')[1]);
names.push(individualValue.split(',')[2].replace('{','').split(':')[1]);
}

}

}    
var testdata4 = require(localeViewConfigPath+'ActivityLog_en.json');
var rawdata2 = JSON.stringify(testdata4);
rawdata2 = rawdata2.replace('{"columns":{"fields":[',",");

for(var element2 in rawdata2.split('}'))
{
var individualValue2  =  rawdata2.split('}')[element2];
for(var columnSeperateValue2 in individualValue2.split(','))
{

var commaSeperateValuetype2 =individualValue2.split(',')[columnSeperateValue2];
if(commaSeperateValuetype2.includes('"Name":')){
names2.push(individualValue2.split(',')[1].replace('{','').split(':')[1]);
keys2.push(individualValue2.split(',')[2].replace('{','').split(':')[1]);

}


}
}

for(var i in keys)
{
for(var j in names2)
{
if(keys[i]==keys2[j])
{
keys3.push(names2[j]);
break;
}
}
} 
// console.log("Final Keys1 : " +keys1.toString());
// console.log("Final Sortable values are : " +keys3.toString());

return keys3.toString();
};

exports.downloadValues = function(){
var keys = [] ;
var names = [];

var keys2= [] ;
var names2 = [];

var keys3= [] ;
var rawdata = JSON.stringify(downloadsPath);
rawdata = rawdata.replace('{"columns":{"fields":[{',",");
for(var element in rawdata.split('}'))
{
var individualValue  =  rawdata.split('}')[element];
for(var columnSeperateValue in individualValue.split(','))
{
var commaSeperateValuetype =individualValue.split(',')[columnSeperateValue];
if(commaSeperateValuetype.includes('"Sortable"'))
{
keys.push(individualValue.split(',')[1].replace('{','').split(':')[1]);
names.push(individualValue.split(',')[2].replace('{','').split(':')[1]);
}

}

}    
var testdata4 = require(localeViewConfigPath+'Downloads_en.json');

var rawdata2 = JSON.stringify(testdata4);
rawdata2 = rawdata2.replace('{"columns":{"fields":[',",");

for(var element2 in rawdata2.split('}'))
{
var individualValue2  =  rawdata2.split('}')[element2];
for(var columnSeperateValue2 in individualValue2.split(','))
{
var commaSeperateValuetype2 =individualValue2.split(',')[columnSeperateValue2];
if(commaSeperateValuetype2.includes('"Name":')){
names2.push(individualValue2.split(',')[1].replace('{','').split(':')[1]);
keys2.push(individualValue2.split(',')[2].replace('{','').split(':')[1]);

}


}
}

for(var i in keys)
{
for(var j in names2)
{
if(keys[i]==keys2[j])
{
keys3.push(names2[j]);
break;
}
}
} 
// console.log("Final Keys1 : " +keys1.toString());
// console.log("Final Sortable values are : " +keys3.toString());

return keys3.toString();
};

exports.miscAdjustmentValues = function(){
var keys = [] ;
var names = [];

var keys2= [] ;
var names2 = [];

var keys3= [] ;
var rawdata = JSON.stringify(miscAdjustmentPath);
rawdata = rawdata.replace('{"columns":{"fields":[{',",");
for(var element in rawdata.split('}'))
{
var individualValue  =  rawdata.split('}')[element];
for(var columnSeperateValue in individualValue.split(','))
{
var commaSeperateValuetype =individualValue.split(',')[columnSeperateValue];
if(commaSeperateValuetype.includes('"Sortable"'))
{
keys.push(individualValue.split(',')[1].replace('{','').split(':')[1]);
names.push(individualValue.split(',')[2].replace('{','').split(':')[1]);
}

}

}    
var testdata4 = require(localeViewConfigPath+'MiscAdjustment_en.json');
var rawdata2 = JSON.stringify(testdata4);
rawdata2 = rawdata2.replace('{"columns":{"fields":[',",");

for(var element2 in rawdata2.split('}'))
{
var individualValue2  =  rawdata2.split('}')[element2];
for(var columnSeperateValue2 in individualValue2.split(','))
{

var commaSeperateValuetype2 =individualValue2.split(',')[columnSeperateValue2];
if(commaSeperateValuetype2.includes('"Name":')){
names2.push(individualValue2.split(',')[1].replace('{','').split(':')[1]);
keys2.push(individualValue2.split(',')[2].replace('{','').split(':')[1]);

}


}
}

for(var i in keys)
{
for(var j in names2)
{
if(keys[i]==keys2[j])
{
keys3.push(names2[j]);
break;
}
}
} 
// console.log("Final Keys1 : " +keys1.toString());
// console.log("Final Sortable values are : " +keys3.toString());

return keys3.toString();
};

exports.nonStandardChargesValues = function(){
var keys = [] ;
var names = [];

var keys2= [] ;
var names2 = [];

var keys3= [] ;
var rawdata = JSON.stringify(nonstandardChargesPath);
rawdata = rawdata.replace('{"columns":{"fields":[{',",");
for(var element in rawdata.split('}'))
{
var individualValue  =  rawdata.split('}')[element];
for(var columnSeperateValue in individualValue.split(','))
{
var commaSeperateValuetype =individualValue.split(',')[columnSeperateValue];
if(commaSeperateValuetype.includes('"Sortable"'))
{
keys.push(individualValue.split(',')[1].replace('{','').split(':')[1]);
names.push(individualValue.split(',')[2].replace('{','').split(':')[1]);
}

}

}    
var testdata4 = require(localeViewConfigPath+'NonstandardCharges_en.json');
var rawdata2 = JSON.stringify(testdata4);
rawdata2 = rawdata2.replace('{"columns":{"fields":[',",");

for(var element2 in rawdata2.split('}'))
{
var individualValue2  =  rawdata2.split('}')[element2];
for(var columnSeperateValue2 in individualValue2.split(','))
{

var commaSeperateValuetype2 =individualValue2.split(',')[columnSeperateValue2];
if(commaSeperateValuetype2.includes('"Name":')){
names2.push(individualValue2.split(',')[1].replace('{','').split(':')[1]);
keys2.push(individualValue2.split(',')[2].replace('{','').split(':')[1]);

}


}
}

for(var i in keys)
{
for(var j in names2)
{
if(keys[i]==keys2[j])
{
keys3.push(names2[j]);
break;
}
}
} 
// console.log("Final Keys1 : " +keys1.toString());
// console.log("Final Sortable values are : " +keys3.toString());

return keys3.toString();
};

exports.payerSubscriptionsValues = function(){
var keys = [] ;
var names = [];

var keys2= [] ;
var names2 = [];

var keys3= [] ;
var rawdata = JSON.stringify(payerSubscriptionsPath);
rawdata = rawdata.replace('{"columns":{"fields":[{',",");
for(var element in rawdata.split('}'))
{
var individualValue  =  rawdata.split('}')[element];
for(var columnSeperateValue in individualValue.split(','))
{
var commaSeperateValuetype =individualValue.split(',')[columnSeperateValue];
if(commaSeperateValuetype.includes('"Sortable"'))
{
keys.push(individualValue.split(',')[1].replace('{','').split(':')[1]);
names.push(individualValue.split(',')[2].replace('{','').split(':')[1]);
}

}

}    
var testdata4 = require(localeViewConfigPath+'PayerSubscriptions_en.json');
var rawdata2 = JSON.stringify(testdata4);
rawdata2 = rawdata2.replace('{"columns":{"fields":[',",");

for(var element2 in rawdata2.split('}'))
{
var individualValue2  =  rawdata2.split('}')[element2];
for(var columnSeperateValue2 in individualValue2.split(','))
{

var commaSeperateValuetype2 =individualValue2.split(',')[columnSeperateValue2];
if(commaSeperateValuetype2.includes('"Name":')){
names2.push(individualValue2.split(',')[1].replace('{','').split(':')[1]);
keys2.push(individualValue2.split(',')[2].replace('{','').split(':')[1]);

}


}
}

for(var i in keys)
{
for(var j in names2)
{
if(keys[i]==keys2[j])
{
keys3.push(names2[j]);
break;
}
}
} 
// console.log("Final Keys1 : " +keys1.toString());
// console.log("Final Sortable values are : " +keys3.toString());

return keys3.toString();
};

exports.paymentMethodsValues = function(){
var keys = [] ;
var names = [];

var keys2= [] ;
var names2 = [];

var keys3= [] ;
var rawdata = JSON.stringify(paymentMethodsPath);
rawdata = rawdata.replace('{"columns":{"fields":[{',",");
for(var element in rawdata.split('}'))
{
var individualValue  =  rawdata.split('}')[element];
for(var columnSeperateValue in individualValue.split(','))
{
var commaSeperateValuetype =individualValue.split(',')[columnSeperateValue];
if(commaSeperateValuetype.includes('"Sortable"'))
{
keys.push(individualValue.split(',')[1].replace('{','').split(':')[1]);
names.push(individualValue.split(',')[2].replace('{','').split(':')[1]);
}

}

}    
var testdata4 = require(localeViewConfigPath+'PaymentMethods_en.json');
var rawdata2 = JSON.stringify(testdata4);
rawdata2 = rawdata2.replace('{"columns":{"fields":[',",");

for(var element2 in rawdata2.split('}'))
{
var individualValue2  =  rawdata2.split('}')[element2];
for(var columnSeperateValue2 in individualValue2.split(','))
{

var commaSeperateValuetype2 =individualValue2.split(',')[columnSeperateValue2];
if(commaSeperateValuetype2.includes('"Name":')){
names2.push(individualValue2.split(',')[1].replace('{','').split(':')[1]);
keys2.push(individualValue2.split(',')[2].replace('{','').split(':')[1]);

}


}
}

for(var i in keys)
{
for(var j in names2)
{
if(keys[i]==keys2[j])
{
keys3.push(names2[j]);
break;
}
}
} 
// console.log("Final Keys1 : " +keys1.toString());
// console.log("Final Sortable values are : " +keys3.toString());

return keys3.toString();
};

exports.paymentMethodsKeys = function(){
var keys = [] ;
var names = [];

var keys2= [] ;
var names2 = [];

var keys3= [] ;
var rawdata = JSON.stringify(paymentMethodsPath);
rawdata = rawdata.replace('{"columns":{"fields":[{',",");
for(var element in rawdata.split('}'))
{
var individualValue  =  rawdata.split('}')[element];
for(var columnSeperateValue in individualValue.split(','))
{
var commaSeperateValuetype =individualValue.split(',')[columnSeperateValue];
if(commaSeperateValuetype.includes('"DisplayName":"Credit Card Type"'))
{
keys.push(individualValue.split(',')[1].replace('{','').split(':')[1]);
names.push(individualValue.split(',')[2].replace('{','').split(':')[1]);
}

}

}    
var testdata4 = require(localeViewConfigPath+'PaymentMethods_en.json');
var rawdata2 = JSON.stringify(testdata4);
rawdata2 = rawdata2.replace('{"columns":{"fields":[',",");

for(var element2 in rawdata2.split('}'))
{
var individualValue2  =  rawdata2.split('}')[element2];
for(var columnSeperateValue2 in individualValue2.split(','))
{
{
var commaSeperateValuetype2 =individualValue2.split(',')[columnSeperateValue2];
if(commaSeperateValuetype2.includes('"Name":"idCreditcardType"')){
names2.push(individualValue2.split(',')[1].replace('{','').split(':')[1]);
keys2.push(individualValue2.split(',')[2].replace('{','').split(':')[1]);

}

}
}
}

for(var i in keys)
{
for(var j in names2)
{
if(keys[i]==keys2[j])
{
keys3.push(names2[j].replace('"',"").replace('"',""));
break;
}
}
} 
// console.log("Final Keys1 : " +keys3.toString());
// console.log("Final Sortable values are : " +keys3.toString());

return keys3.toString();
};

exports.paymentReceivedValues = function(){
var keys = [] ;
var names = [];

var keys2= [] ;
var names2 = [];

var keys3= [] ;
var rawdata = JSON.stringify(paymentReceivedPath);
rawdata = rawdata.replace('{"columns":{"fields":[{',",");
for(var element in rawdata.split('}'))
{
var individualValue  =  rawdata.split('}')[element];
for(var columnSeperateValue in individualValue.split(','))
{
var commaSeperateValuetype =individualValue.split(',')[columnSeperateValue];
if(commaSeperateValuetype.includes('"Sortable"'))
{
keys.push(individualValue.split(',')[1].replace('{','').split(':')[1]);
names.push(individualValue.split(',')[2].replace('{','').split(':')[1]);
}
}

}    
var testdata4 = require(localeViewConfigPath+'PaymentReceived_en.json');
var rawdata2 = JSON.stringify(testdata4);
rawdata2 = rawdata2.replace('{"columns":{"fields":[',",");

for(var element2 in rawdata2.split('}'))
{
var individualValue2  =  rawdata2.split('}')[element2];
for(var columnSeperateValue2 in individualValue2.split(','))
{

var commaSeperateValuetype2 =individualValue2.split(',')[columnSeperateValue2];
if(commaSeperateValuetype2.includes('"Name":')){
names2.push(individualValue2.split(',')[1].replace('{','').split(':')[1]);
keys2.push(individualValue2.split(',')[2].replace('{','').split(':')[1]);

}


}
}

for(var i in keys)
{
for(var j in names2)
{
if(keys[i]==keys2[j])
{
keys3.push(names2[j]);
break;
}
}
} 
// console.log("Final Keys1 : " +keys1.toString());
// console.log("Final Sortable values are : " +keys3.toString());

return keys3.toString();
};

exports.paymentsHistoryValues = function(){
var keys = [] ;
var names = [];

var keys2= [] ;
var names2 = [];

var keys3= [] ;
var rawdata = JSON.stringify(paymentsHistoryPath);
rawdata = rawdata.replace('{"columns":{"fields":[{',",");
for(var element in rawdata.split('}'))
{
var individualValue  =  rawdata.split('}')[element];
for(var columnSeperateValue in individualValue.split(','))
{
var commaSeperateValuetype =individualValue.split(',')[columnSeperateValue];
if(commaSeperateValuetype.includes('"Sortable"'))
{
keys.push(individualValue.split(',')[1].replace('{','').split(':')[1]);
names.push(individualValue.split(',')[2].replace('{','').split(':')[1]);
}

}

}    
var testdata4 = require(localeViewConfigPath+'PaymentsHistory_en.json');
var rawdata2 = JSON.stringify(testdata4);
rawdata2 = rawdata2.replace('{"columns":{"fields":[',",");

for(var element2 in rawdata2.split('}'))
{
var individualValue2  =  rawdata2.split('}')[element2];
for(var columnSeperateValue2 in individualValue2.split(','))
{

var commaSeperateValuetype2 =individualValue2.split(',')[columnSeperateValue2];
if(commaSeperateValuetype2.includes('"Name":')){
names2.push(individualValue2.split(',')[1].replace('{','').split(':')[1]);
keys2.push(individualValue2.split(',')[2].replace('{','').split(':')[1]);

}

}
}

for(var i in keys)
{
for(var j in names2)
{
if(keys[i]==keys2[j])
{
keys3.push(names2[j]);
break;
}
}
} 
// console.log("Final Keys1 : " +keys1.toString());
// console.log("Final Sortable values are : " +keys3.toString());

return keys3.toString();
};

exports.postBillValues = function(){
var keys = [] ;
var names = [];

var keys2= [] ;
var names2 = [];

var keys3= [] ;
var rawdata = JSON.stringify(postBillPath);
rawdata = rawdata.replace('{"columns":{"fields":[{',",");
for(var element in rawdata.split('}'))
{
var individualValue  =  rawdata.split('}')[element];
for(var columnSeperateValue in individualValue.split(','))
{
var commaSeperateValuetype =individualValue.split(',')[columnSeperateValue];
if(commaSeperateValuetype.includes('"Sortable"'))
{
keys.push(individualValue.split(',')[1].replace('{','').split(':')[1]);
names.push(individualValue.split(',')[2].replace('{','').split(':')[1]);
}
}

}    
var testdata4 = require(localeViewConfigPath+'PostBill_en.json');
var rawdata2 = JSON.stringify(testdata4);
rawdata2 = rawdata2.replace('{"columns":{"fields":[',",");

for(var element2 in rawdata2.split('}'))
{
var individualValue2  =  rawdata2.split('}')[element2];
for(var columnSeperateValue2 in individualValue2.split(','))
{
var commaSeperateValuetype2 =individualValue2.split(',')[columnSeperateValue2];
if(commaSeperateValuetype2.includes('"Name":')){
names2.push(individualValue2.split(',')[1].replace('{','').split(':')[1]);
keys2.push(individualValue2.split(',')[2].replace('{','').split(':')[1]);

}


}
}

for(var i in keys)
{
for(var j in names2)
{
if(keys[i]==keys2[j])
{
keys3.push(names2[j]);
break;
}
}
} 
// console.log("Final Keys1 : " +keys1.toString());
// console.log("Final Sortable values are : " +keys3.toString());

return keys3.toString();
};

exports.preBillValues = function(){
var keys = [] ;
var names = [];

var keys2= [] ;
var names2 = [];

var keys3= [] ;
var rawdata = JSON.stringify(preBillPath);
rawdata = rawdata.replace('{"columns":{"fields":[{',",");
for(var element in rawdata.split('}'))
{
var individualValue  =  rawdata.split('}')[element];
for(var columnSeperateValue in individualValue.split(','))
{
var commaSeperateValuetype =individualValue.split(',')[columnSeperateValue];
if(commaSeperateValuetype.includes('"Sortable"'))
{
keys.push(individualValue.split(',')[1].replace('{','').split(':')[1]);
names.push(individualValue.split(',')[2].replace('{','').split(':')[1]);
}

}

}    
var testdata4 = require(localeViewConfigPath+'PreBill_en.json');
var rawdata2 = JSON.stringify(testdata4);
rawdata2 = rawdata2.replace('{"columns":{"fields":[',",");

for(var element2 in rawdata2.split('}'))
{
var individualValue2  =  rawdata2.split('}')[element2];
for(var columnSeperateValue2 in individualValue2.split(','))
{

var commaSeperateValuetype2 =individualValue2.split(',')[columnSeperateValue2];
if(commaSeperateValuetype2.includes('"Name":')){
names2.push(individualValue2.split(',')[1].replace('{','').split(':')[1]);
keys2.push(individualValue2.split(',')[2].replace('{','').split(':')[1]);

}
}
}

for(var i in keys)
{
for(var j in names2)
{
if(keys[i]==keys2[j])
{
keys3.push(names2[j]);
break;
}
}
} 
// console.log("Final Keys1 : " +keys1.toString());
// console.log("Final Sortable values are : " +keys3.toString());

return keys3.toString();
};

exports.SubscriptionsValues = function(){
var keys = [] ;
var names = [];

var keys2= [] ;
var names2 = [];

var keys3= [] ;
var rawdata = JSON.stringify(subscriptionsPath);
rawdata = rawdata.replace('{"columns":{"fields":[{',",");
for(var element in rawdata.split('}'))
{
var individualValue  =  rawdata.split('}')[element];
for(var columnSeperateValue in individualValue.split(','))
{
var commaSeperateValuetype =individualValue.split(',')[columnSeperateValue];
if(commaSeperateValuetype.includes('"Sortable"'))
{
keys.push(individualValue.split(',')[1].replace('{','').split(':')[1]);
names.push(individualValue.split(',')[2].replace('{','').split(':')[1]);
}S
}

}    
var testdata4 = require(localeViewConfigPath+'Subscriptions_en.json');
var rawdata2 = JSON.stringify(testdata4);
rawdata2 = rawdata2.replace('{"columns":{"fields":[',",");

for(var element2 in rawdata2.split('}'))
{
var individualValue2  =  rawdata2.split('}')[element2];
for(var columnSeperateValue2 in individualValue2.split(','))
{
var commaSeperateValuetype2 =individualValue2.split(',')[columnSeperateValue2];
if(commaSeperateValuetype2.includes('"Name":')){
names2.push(individualValue2.split(',')[1].replace('{','').split(':')[1]);
keys2.push(individualValue2.split(',')[2].replace('{','').split(':')[1]);

}

}
}

for(var i in keys)
{
for(var j in names2)
{
if(keys[i]==keys2[j])
{
keys3.push(names2[j]);
break;
}
}
} 
// console.log("Final Keys1 : " +keys1.toString());
// console.log("Final Sortable values are : " +keys3.toString());

return keys3.toString();
};

exports.productViewsValues = function(){
var keys = [] ;
var names = [];
var testdata = require('C:/ECB/METRAVIEW-CONFIG/UI-EXT-DATA/default/i18n/productViews/DefaultProductView_en.json');
var rawdata = JSON.stringify(testdata);
rawdata = rawdata.replace('{"mt_config":{"language_code":"US","locale_space":{"name":"metratech.com/defaultproductview","locale_entry":[',"");
for(var element in rawdata.split('}'))
{
var individualValue  =  rawdata.split('}')[element];
for(var columnSeperateValue in individualValue.split(','))
{
var commaSeperateValuetype =individualValue.split(',')[columnSeperateValue];
if(commaSeperateValuetype.includes('"Name":"metratech.com/DefaultProductView/'))
{
keys.push(individualValue.split(',')[1].replace('{','').split(':')[1]);
names.push(individualValue.split(',')[2].replace('{','').split(':')[1]);
}
}


}    

return keys.toString();
};

exports.DisplayAmount = function(){
var keys = [] ;

var testdata = require('C:/ECB/METRAVIEW-CONFIG/UI-EXT-DATA/default/i18n/productViews/DefaultProductView_en.json');
var rawdata = JSON.stringify(testdata);
rawdata = rawdata.replace('{"mt_config":{"language_code":"US","locale_space":{"name":"metratech.com/defaultproductview","locale_entry":[',"");
for(var element in rawdata.split('}'))
{
var individualValue  =  rawdata.split('}')[element];
for(var columnSeperateValue in individualValue.split(','))
{
var commaSeperateValuetype =individualValue.split(',')[columnSeperateValue];
if(commaSeperateValuetype.includes('"Name":"metratech.com/DefaultProductView/DisplayAmount"'))
{
keys.push(individualValue.split(',')[1].replace('{','').split(':')[1].replace('"','').replace('"',''));
}

}

}
return keys.toString();
};

exports.TimeStamp = function(){
var keys = [] ;

var testdata = require('C:/ECB/METRAVIEW-CONFIG/UI-EXT-DATA/default/i18n/productViews/DefaultProductView_en.json');
var rawdata = JSON.stringify(testdata);
rawdata = rawdata.replace('{"mt_config":{"language_code":"US","locale_space":{"name":"metratech.com/defaultproductview","locale_entry":[',"");
for(var element in rawdata.split('}'))
{
var individualValue  =  rawdata.split('}')[element];
for(var columnSeperateValue in individualValue.split(','))
{
var commaSeperateValuetype =individualValue.split(',')[columnSeperateValue];
if(commaSeperateValuetype.includes('"Name":"metratech.com/DefaultProductView/TimeStamp"'))
{
keys.push(individualValue.split(',')[1].replace('{','').split(':')[1].replace('"','').replace('"',''));
}

}

}
return keys.toString();
};

});
});

describe('Validate the Localized flags and Country Code and Login to MV 2.0 Application', function () { 

it('verify the country language code', function(){

//TestCase:0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10526/ 001_HoverTextShouldContainCountryCodeAndLanguage
//Input file to refer
var filename = localeconfigFilepath+'localeSelector.json';

//Storing all the contents of localeSelector.json file
let rawdata = fs.readFileSync(filename);  
let localeSelectorData = JSON.parse(rawdata); 

//Select language tag from the json file 
var languageSelect = localeSelectorData["English(US)"];

//Fetch the 'Title' of the language
var title = languageSelect.title;
console.log(title); 

//Verify the hover text should contain the country code and the language in its respective locales
var countryCode = element(by.xpath(testdata3.Languages_Title.US_Title));
browser.sleep(1000);
browser.actions().mouseMove(countryCode).perform();
browser.sleep(1000);
expect(countryCode.getAttribute('title')).toEqual(title);

});

});
