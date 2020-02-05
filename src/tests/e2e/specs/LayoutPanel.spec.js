describe('UI Baseline App', function () {
var testData2 = require('../inputs/testData/JsonFileCreation.json');
var testData3 = require('../inputs/testData/XpathRepository.json');
        
it('verify panel sizes in dashboard page', function () {
//Launch to the MV2.0 application
protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);

//Login to the MV2.0 application
protractor.loginHelpers.logInMV(testData2.userName,testData2.passwordField);
element(by.css(testData3.LayoutPanels.AmountDue_Live)).getCssValue('max-height').then((height) => {
expect(height).toEqual('207px');
});
element(by.css(testData3.LayoutPanels.Charges_Live)).getCssValue('max-height').then((height) => {
expect(height).toEqual('207px');
});
//validating the size of nowcast widget
element(by.css(testData3.LayoutPanels.NowCast)).getCssValue('max-height').then((maxheight) => {
expect(maxheight).toEqual('430px');

element(by.css(testData3.LayoutPanels.NowCast)).getCssValue('min-height').then((minheight) => {
expect(minheight).toEqual('99%');
});
});
//validating the size of billing activity widget height with and without data
element(by.css(testData3.LayoutPanels.Billing_Activity)).getCssValue('max-height').then((maxheight) => {
element(by.css(testData3.LayoutPanels.Billing_Activity)).getCssValue('min-height').then((minheight) => {
expect(minheight).toEqual(maxheight);
});
});
//validating account information widget height with and without data
element(by.css(testData3.LayoutPanels.Account_Information)).getCssValue('max-height').then((maxheight) => {
element(by.css(testData3.LayoutPanels.Account_Information)).getCssValue('min-height').then((minheight) => {
expect(minheight).toEqual(maxheight);
});
});
//validating the size of since lastbill widget
element(by.css(testData3.LayoutPanels.Since_LastBill)).getCssValue('max-height').then((maxheight) => {
element(by.css(testData3.LayoutPanels.Since_LastBill)).getCssValue('min-height').then((minheight) => {
expect(maxheight).toEqual(minheight);
});
});
//validation for payment methods widget
element(by.css(testData3.LayoutPanels.Payment_Methods)).getCssValue('max-height').then((maxheight) => {
element(by.css(testData3.LayoutPanels.Payment_Methods)).getCssValue('min-height').then((minheight) => {
expect(maxheight).toEqual(minheight);
});
});
//validation for subscriptions widget
element(by.css(testData3.LayoutPanels.Subscriptions)).getCssValue('max-height').then((maxheight) => {
element(by.css(testData3.LayoutPanels.Subscriptions)).getCssValue('min-height').then((minheight) => {
expect(maxheight).toEqual(minheight);
});
});
//validation for payersubscriptions widget
element(by.css(testData3.LayoutPanels.Payer_Subscription)).getCssValue('max-height').then((maxheight) => {
element(by.css(testData3.LayoutPanels.Payer_Subscription)).getCssValue('min-height').then((minheight) => {
expect(maxheight).toEqual(minheight);
});
});
//validation for activity log
element(by.css(testData3.LayoutPanels.Activity_Log)).getCssValue('max-height').then((maxheight) => {
element(by.css(testData3.LayoutPanels.Activity_Log)).getCssValue('min-height').then((minheight) => {
expect(maxheight).toEqual(minheight);
});
});
/*element(by.css('div#accountManagerMain.widget.ecb-accountManagerMain.ng-scope')).getCssValue('max-height').then((minheight) => {
element(by.css('div#accountManagerMain.widget.ecb-accountManagerMain.ng-scope')).getCssValue('min-height').then((maxheight) => {
expect(minheight).toEqual(maxheight);
});
});*/
//validation of space between all widgets
element.all(by.css(testData3.LayoutPanels.widgets_class)).then((items) => {
element.all(by.css(testData3.LayoutPanels.widgets_class)).count().then((n) => {

for(var i=0;i<n;i++)
{
items[i].getCssValue('padding-right').then((RightAlign) => {
expect(RightAlign).toEqual('15px');
});
items[i].getCssValue('padding-left').then((LeftAlign) => {
expect(LeftAlign).toEqual('15px');
});
items[i].getCssValue('margin-bottom').then((LeftAlign) => {
expect(LeftAlign).toEqual('15px');
});
items[i].getCssValue('width').then((LeftAlign) => {
expect(LeftAlign).toEqual('33.33%');
});

}


});

});
});
it('verify panel sizes in Bills page', function () {

browser.navigate().refresh();
element(by.xpath(testData3.LayerSelector.Dropdown)).click();
browser.sleep(2000);
element(by.xpath(testData3.LayerSelector.Bills)).click();
browser.sleep(2000);
//validate for total amount due widget
element(by.css(testData3.LayoutPanels.Total_Amountdue)).getCssValue('max-height').then((maxheight) => {
element(by.css(testData3.LayoutPanels.Total_Amountdue)).getCssValue('max-height').then((minheight) => {
expect(maxheight).toEqual(minheight);
});
});
//validation for offercharge summary
element(by.css(testData3.LayoutPanels.OfferChargeSummary)).getCssValue('max-height').then((maxheight) => {
element(by.css(testData3.LayoutPanels.OfferChargeSummary)).getCssValue('max-height').then((minheight) => {
expect(maxheight).toEqual(minheight);
});
});
//validation for billing activity widget
element(by.css(testData3.LayoutPanels.Billing_Activity)).getCssValue('max-height').then((maxheight) => {
element(by.css(testData3.LayoutPanels.Billing_Activity)).getCssValue('min-height').then((minheight) => {
expect(minheight).toEqual(maxheight);
});
});
//validation for Invoice widget
element(by.css(testData3.LayoutPanels.Invoice)).getCssValue('max-height').then((maxheight) => {
element(by.css(testData3.LayoutPanels.Invoice)).getCssValue('min-height').then((minheight) => {
expect(minheight).toEqual(maxheight);
});
});
//validation for payer subscriptions
element(by.css(testData3.LayoutPanels.Payer_Subscription)).getCssValue('max-height').then((maxheight) => {
element(by.css(testData3.LayoutPanels.Payer_Subscription)).getCssValue('min-height').then((minheight) => {
expect(maxheight).toEqual(minheight);
});
});
//validation for Nowcast
element(by.css(testData3.LayoutPanels.NowCast)).getCssValue('max-height').then((maxheight) => {
expect(maxheight).toEqual('430px');

element(by.css(testData3.LayoutPanels.NowCast)).getCssValue('min-height').then((minheight) => {
expect(minheight).toEqual('99%');
});
});
//validation of space between all widgets
element.all(by.css(testData3.LayoutPanels.widgets_class)).then((items) => {
element.all(by.css(testData3.LayoutPanels.widgets_class)).count().then((n) => {

for(var i=0;i<n;i++)
{
items[i].getCssValue('padding-right').then((RightAlign) => {
expect(RightAlign).toEqual('15px');
});
items[i].getCssValue('padding-left').then((LeftAlign) => {
expect(LeftAlign).toEqual('15px');
});
items[i].getCssValue('margin-bottom').then((LeftAlign) => {
expect(LeftAlign).toEqual('15px');
});
items[i].getCssValue('width').then((LeftAlign) => {
expect(LeftAlign).toEqual('33.33%');
});

}


});

});

});
it('verify  in offerstore page', function () {
browser.navigate().refresh();
element(by.xpath(testData3.LayerSelector.Dropdown)).click();
browser.sleep(2000);
element(by.xpath(testData3.LayerSelector.OfferStore)).click();
browser.sleep(2000);
//validation of space between all POs and their height and width
element.all(by.css(testData3.LayoutPanels.Offers)).then((items) => {
element.all(by.css(testData3.LayoutPanels.Offers)).count().then((n) => {

for(var i=0;i<n;i++)
{
items[i].getCssValue('width').then((width) => {
expect(parseFloat(width).toFixed(2)).toEqual(parseFloat('344.936px').toFixed(2));
});

}


});

});
element.all(by.css(testData3.LayoutPanels.Offers_Brief)).then((items) => {
element.all(by.css(testData3.LayoutPanels.Offers_Brief)).count().then((n) => {

for(var i=0;i<n;i++)
{
items[i].getCssValue('margin').then((margin) => {
// expect(margin).toEqual('6.51563px');
});
items[i].getCssValue('height').then((height) => {
expect(height).toEqual('310px');
});

}


});

});

});
it('verify  in Accounts page', function () {
//validating account information widget height with and without data
element(by.css(testData3.LayoutPanels.Account_Information)).getCssValue('max-height').then((maxheight) => {
element(by.css(testData3.LayoutPanels.Account_Information)).getCssValue('min-height').then((minheight) => {
expect(minheight).toEqual(maxheight);
});
});
//validation for payment methods widget
element(by.css(testData3.LayoutPanels.Payment_Methods)).getCssValue('max-height').then((maxheight) => {
element(by.css(testData3.LayoutPanels.Payment_Methods)).getCssValue('min-height').then((minheight) => {
expect(maxheight).toEqual(minheight);
});
}); 
//validation for subscriptions widget
element(by.css(testData3.LayoutPanels.Subscriptions)).getCssValue('max-height').then((maxheight) => {
element(by.css(testData3.LayoutPanels.Subscriptions)).getCssValue('min-height').then((minheight) => {
// expect(maxheight).toEqual(minheight);
});
});
//validation for activity log
element(by.css(testData3.LayoutPanels.Activity_Log)).getCssValue('max-height').then((maxheight) => {
element(by.css(testData3.LayoutPanels.Activity_Log)).getCssValue('min-height').then((minheight) => {
expect(maxheight).toEqual(minheight);
});
}); 
//validation of space between all widgets
element.all(by.css(testData3.LayoutPanels.widgets_class)).then((items) => {
element.all(by.css(testData3.LayoutPanels.widgets_class)).count().then((n) => {

for(var i=0;i<n;i++)
{
items[i].getCssValue('padding-right').then((RightAlign) => {
expect(RightAlign).toEqual('15px');
});
items[i].getCssValue('padding-left').then((LeftAlign) => {
expect(LeftAlign).toEqual('15px');
});
items[i].getCssValue('margin-bottom').then((LeftAlign) => {
expect(LeftAlign).toEqual('15px');
});
items[i].getCssValue('width').then((LeftAlign) => {
expect(LeftAlign).toEqual('33.33%');
});

}


});

});  

//// Log Out from Application
browser.findElement(by.xpath(testData3.SystemBar.Logout)).click();
browser.sleep(12000);

});
});   