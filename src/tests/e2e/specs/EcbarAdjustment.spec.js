describe('MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView',function(){

//#region dataFiles

var ecbarAdjust= require('../inputs/testdata/EcbarAdjustments.json');

var xpathRepo = require('../inputs/testdata/XpathRepository.json');
var jsonfile=require('../inputs/testdata/JsonFileCreation.json');

//Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ New_Bugs_TestCases/ 2728_VerifyPositiveAmountDisplayedForDebitNoteAdj
//Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ New_Bugs_TestCases/ 2728_VerifyNegativeAmountDisplayedForCreditNoteAdj
it('validate Misc adjustments for negative scenerios', function(){

var testData5 = protractor.loginHelpers.lang;
//Get Metraview 2.0 URL
browser.get(jsonfile.URL);
browser.sleep(5000);

//Select the reqired Currency
element(by.css(testData5)).click();
browser.sleep(3000);

//Login to MetraView as Corporate User
//Enter username as userName2
element(by.xpath(xpathRepo.LoginPage.UserName)).sendKeys(ecbarAdjust.userName);

//Enter password
element(by.xpath(xpathRepo.LoginPage.Password)).sendKeys(ecbarAdjust.passwordField);

//Click on Login Button
browser.findElement(By.xpath(xpathRepo.LoginPage.LogInButton)).click();
browser.sleep(12000);  

//Click on Layer Selector Dropdown
element(by.xpath(xpathRepo.LayerSelector.Dropdown)).click();

//Click on Bills Layer
element(by.xpath(xpathRepo.LayerSelector.Bills)).click();
browser.sleep(5000);

//Click on dropdown to select the hardclosed interval date
element(by.xpath(xpathRepo.Billing.SelectIntervalDropdown)).click();

//select the first interval
element(by.xpath(xpathRepo.Billing.SelectFirstInterval)).click();
browser.sleep(3000);

element.all(by.xpath(xpathRepo.OfferCharge.MiscAdjustment_Charges)).then(function(items){
items[0].click();
})

browser.sleep(3000);

//validate the crtedit note and debit note values in metraview page
element.all(by.xpath(xpathRepo.OfferCharge.Charges_Value)).then(function(items){

expect(items[0].getText()).not.toEqual(debitAmount);
expect(items[1].getText()).not.toEqual(creditAmount);


});

//Load thge metranet to comapre the values in subledger report
protractor.loginHelpers.viewOnlineBill(ecbarAdjust.userName);

browser.refresh();


//Load the account
var accSearch = element(by.xpath(xpathRepo.MetraNet.Searchbar));
accSearch.sendKeys(ecbarAdjust.userName);
browser.sleep(5000);

element(by.xpath("//h3[contains(text(),'"+ecbarAdjust.userName+"')]")).click();
browser.sleep(5000);

element(by.xpath("//div[contains(@class,'collapse-east')]")).click();
browser.sleep(3000);

browser.switchTo().frame('MainContentIframe');

//click on to select the Adjustments/Charges
element(by.xpath(protractor.loginHelpers.PaymentsLang)).click();

//click on subledger report menu item
element(by.xpath("//a[@id='SubledgerReport']")).click();

browser.sleep(5000);
//validate the crtedit note and debit note values in metranet subledger report page
element.all(by.xpath(xpathRepo.OfferCharge.Payments_Value)).then(function(items){
    expect(items[1].getText()).not.toEqual(debitAmount);
    expect(items[0].getText()).not.toEqual(creditAmount);
    
    });
})
});
