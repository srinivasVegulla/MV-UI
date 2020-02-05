describe('UI Baseline App', function () {

var metraViewDataFile = require('../inputs/testData/JsonFileCreation.json');
var xpathRepo = require('../inputs/testData/XpathRepository.json');

// 0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10516/ Reg_002_VerifyPaddingOnBillsPage
it('should have uniform padding across all widgets and should have proper welcome message', function () {

//Launch to the MV2.0 application
protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);

//Login to the MV2.0 application
protractor.loginHelpers.logInMV(metraViewDataFile.userName,metraViewDataFile.passwordField);

//0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10592/ 001_VerifyWelcometextcontainsUserNameasstoredinDB 
//Navigate to the Bills page
element(by.xpath(xpathRepo.LayerSelector.Dropdown)).click();
element(by.xpath(xpathRepo.LayerSelector.Bills)).click();
element.all(by.css(xpathRepo.LayoutPanels.widgets_class)).then((items) => {
element.all(by.css(xpathRepo.LayoutPanels.widgets_class)).count().then((n) => {
for(var i=0;i<n;i++)
{
items[i].getCssValue('padding-left').then((LeftAlign) => {
expect(LeftAlign).toEqual('15px');
}); 
}
});
});
});

it('should have uniform padding across all widgets in accounts page', function () {
browser.navigate().refresh();
//Navigate to the Accounts page
element(by.xpath(xpathRepo.LayerSelector.Dropdown)).click();
element(by.xpath(xpathRepo.LayerSelector.MyAccount)).click();
element.all(by.css(xpathRepo.LayoutPanels.widgets_class)).then((items) => {
element.all(by.css(xpathRepo.LayoutPanels.widgets_class)).count().then((n) => {

for(var i=0;i<n;i++)
{

items[i].getCssValue('padding-left').then((LeftAlign) => {
expect(LeftAlign).toEqual('15px');
});


}


});

});
//MVIEW-2411 -when we click on security icon security page is broken
element(by.xpath(xpathRepo.MyAccountLayer.Account_Security)).click();
expect(element(by.xpath(xpathRepo.MyAccountLayer.Account_SecurityForm)).isDisplayed()).toBe(true);


});

//0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10474/ Reg_002_VerifyMISCAdjustments_New_charges
it('payer should have  misc adjustments related to payee', function () {
browser.navigate().refresh();
element(by.xpath(xpathRepo.LayerSelector.Dropdown)).click();
browser.sleep(2000);
element(by.xpath(xpathRepo.LayerSelector.Bills)).click();
browser.sleep(2000);
//MVIEW-2992 Miller/Tree widget items render not properly in IE and FF browsers
//validate padding alignment and margin for all the offers in offerchargeSummary
element.all(by.css(xpathRepo.Adjustment.Offers)).then((items) => {
element.all(by.css(xpathRepo.Adjustment.Offers)).count().then((n) => {
for(var i=0;i<n;i++)
{
items[i].getCssValue('white-space').then((textALign) => {
expect(textALign).toEqual('pre-line');
});
items[i].getCssValue('vertical-align').then((textALign) => {
expect(textALign).toEqual('middle');
});
items[i].getCssValue('width').then((textALign) => {
expect(textALign).toEqual('225.5px');
});
items[i].getCssValue('padding-left').then((textALign) => {
expect(textALign).toEqual('0px');
});
items[i].getCssValue('margin').then((textALign) => {
expect(textALign).toEqual('0px');
});

}


});

});

element(by.xpath(xpathRepo.SystemBar.AccountName)).click();
element.all(by.xpath(xpathRepo.SystemBar.ChildAccounts_Lists)).then(function(items) {
items[1].getText().then(function(payeeID) {

element(by.xpath(xpathRepo.SystemBar.AccountName)).click();

});
});
//// Log Out from Application
browser.findElement(by.xpath(xpathRepo.SystemBar.Logout)).click();
browser.sleep(12000); 
});



});