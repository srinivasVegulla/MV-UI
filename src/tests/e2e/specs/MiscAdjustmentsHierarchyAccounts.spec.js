var testdata2 = require('../inputs/testdata/XpathRepository.json');
var testdata6 = require('../inputs/testdata/JsonFileCreation.json');

describe('UI Baseline App', function () {

//Tetscase:0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10474/ 001_VerifyMISCAdjustments_TransactionsLink
//Tetscase:0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10474/ Reg_003_VerifyMISCAdjustments_Chargessummary
it('Miscellaneous Adjustments are properly displayed under the Offer View tab, the Account View tab and the New Charges widget', function () {

//Refresh the page
browser.refresh();
browser.sleep(9000);

//Launch to the MV2.0 application
protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
//Login to the MV2.0 application
 protractor.loginHelpers.logInMV(testdata6.userName,testdata6.passwordField);

var testdata12= protractor.loginHelpers.dashboard();
//Click on the 'Transaction' link and navigate to 'Transaction' page
element(by.xpath(testdata2.Quotes.Transactions_Link)).click();
browser.actions().mouseMove(element(by.xpath(testdata2.Transactions.Title))).perform();
browser.sleep(5000);

//Click on 'Misc adjustments' Link under 'Offer View'
element(by.xpath(testdata2.OfferCharge.Misc_Adjustments_Label+testdata12.TEXT_MISC_ADJUSTMENTS+testdata2.ChildAccounts.CloseXpath)).click();
browser.sleep(5000);

//Click on  select by bills
element(by.xpath(testdata2.Adjustment.SelectByDropdown)).click();
element(by.xpath(testdata2.Quotes.SelectBy_Bill)).click();
browser.sleep(3000);

//Click on 'Search' button
element(by.xpath(testdata2.ActivityLog.Search)).click();
browser.sleep(3000);

//Verify the misc Adjustment amount
var pageContent = browser.getPageSource();
expect(pageContent).toContain((testdata6.miscAmt));

//Refresh the page
browser.refresh();
browser.sleep(10000);

//Click on the 'Transaction' link and navigate to 'Transaction' page
element(by.xpath(testdata2.Quotes.Transactions_Link)).click();
browser.actions().mouseMove(element(by.xpath(testdata2.Transactions.Title))).perform();
browser.sleep(2000);

//Navigate to 'Account View'
element(by.xpath(testdata2.OfferCharge.AccountView_Pane)).click();
browser.sleep(3000);

//Click on the Account name present in the page under 'Account View'
element(by.xpath(testdata2.OfferCharge.PayerPOSelection)).click();
browser.sleep(2000);

//Click on the Misc adjustments Link under 'Account View'
element(by.xpath(testdata2.OfferCharge.Misc_Adjustments_Label+testdata12.TEXT_MISC_ADJUSTMENTS+testdata2.ChildAccounts.CloseXpath)).click();
browser.sleep(5000);

//Click on  select by bills
element(by.xpath(testdata2.Adjustment.SelectByDropdown)).click();
element(by.xpath(testdata2.Quotes.SelectBy_Bill)).click();
browser.sleep(3000);

//Click on select by daterange
element(by.xpath(testdata2.Adjustment.SelectByDropdown)).click();
element(by.xpath(testdata2.Quotes.SelectBy_DateRange)).click();
browser.sleep(3000);

//Select start date and end date on which the misc adjustment has been created
element(by.xpath(testdata2.Quotes.StartDate)).click();
browser.sleep(1000);

element(by.xpath(testdata2.ActivityLog.ViewAll_Date_Today)).click();
browser.sleep(1000);

element(by.xpath(testdata2.Quotes.EndDate)).click();
browser.sleep(1000);

element(by.xpath(testdata2.Transactions.EndDate_Today)).click();
browser.sleep(1000);

//Click on 'Search' button
element(by.xpath(testdata2.ActivityLog.Search)).click();
browser.sleep(3000);

//Verify the misc Adjustment amount
var pageContent = browser.getPageSource();
expect(pageContent).toContain((testdata6.miscAmt));

//click on cancel button to go back to Dashboard page
element(by.xpath(testdata2.OfferCharge.ClickOn_X_Button)).click();

//Refresh the page
browser.refresh();
browser.sleep(9000);

//Logout
element(by.xpath(testdata2.SystemBar.Logout)).click();
browser.sleep(10000);

//Load the URL
browser.get(testdata6.URL)
browser.sleep(4000);

//For language selection
var testdata7 = protractor.loginHelpers.lang;
element(by.css(testdata7)).click();
browser.sleep(2000);

//Log in to MetraView with Department Account (Child5)
element(by.xpath(testdata2.LoginPage.UserName)).sendKeys(testdata6.child5);
element(by.xpath(testdata2.LoginPage.Password)).sendKeys(testdata6.passwordField);
browser.findElement(By.xpath(testdata2.LoginPage.LogInButton)).click();
browser.sleep(9000);

//Navigate to "Bills"
element(by.xpath(testdata2.LayerSelector.Dropdown)).click();
element(by.xpath(testdata2.LayerSelector.Bills)).click();
browser.sleep(5000);

//Verify the Miscellaneous Adjustments are properly displayed under the ChargesSummary widget
var pageContent = browser.getPageSource();
expect(pageContent).toContain((testdata6.miscAmtdeptAcc5));

//Refresh the page
browser.refresh();
browser.sleep(8000);

//Logout
element(by.xpath(testdata2.SystemBar.Logout)).click();
browser.sleep(10000);

//Load the URL
browser.get(testdata6.URL)
browser.sleep(4000);

//For language selection
var testdata7 = protractor.loginHelpers.lang;
element(by.css(testdata7)).click();
browser.sleep(2000);

//Log in to MetraView with CoreSubscriber Account (coreSubchild1)
element(by.xpath(testdata2.LoginPage.UserName)).sendKeys(testdata6.coreSubchild1);
element(by.xpath(testdata2.LoginPage.Password)).sendKeys(testdata6.passwordField);
browser.findElement(By.xpath(testdata2.LoginPage.LogInButton)).click();
browser.sleep(8000);

//Navigate to "Bills"
element(by.xpath(testdata2.LayerSelector.Dropdown)).click();
element(by.xpath(testdata2.LayerSelector.Bills)).click();
browser.sleep(5000);

//Verify the Miscellaneous Adjustments are properly displayed under the ChargesSummary widget
var pageContent = browser.getPageSource();
expect(pageContent).toContain((testdata6.miscAmtcoreSub1));

//Refresh the page
browser.refresh();
browser.sleep(8000);

//Logout
element(by.xpath(testdata2.SystemBar.Logout)).click();
browser.sleep(10000);

//Load the URL
browser.get(testdata6.URL)
browser.sleep(4000);

//For language selection
var testdata7 = protractor.loginHelpers.lang;
element(by.css(testdata7)).click();
browser.sleep(2000);

//Log in to MetraView with CoreSubscriber second Account (coreSubchild2)
element(by.xpath(testdata2.LoginPage.UserName)).sendKeys(testdata6.coreSubchild2);
element(by.xpath(testdata2.LoginPage.Password)).sendKeys(testdata6.passwordField);
browser.findElement(By.xpath(testdata2.LoginPage.LogInButton)).click();
browser.sleep(8000);

//Navigate to "Bills"
element(by.xpath(testdata2.LayerSelector.Dropdown)).click();
element(by.xpath(testdata2.LayerSelector.Bills)).click();
browser.sleep(5000);

//Verify the Miscellaneous Adjustments are properly displayed under the ChargesSummary widget
var pageContent = browser.getPageSource();
expect(pageContent).toContain((testdata6.miscAmtcoreSub2));

//Refresh the page
browser.refresh();
browser.sleep(10000);

//Logout
element(by.xpath(testdata2.SystemBar.Logout)).click();
browser.sleep(10000);

//Load the URL
browser.get(testdata6.URL)
browser.sleep(4000);

//For language selection
var testdata7 = protractor.loginHelpers.lang;
element(by.css(testdata7)).click();
browser.sleep(2000);

//Log in to MetraView with CoreSubscriber second Account (coreSubchild3)
element(by.xpath(testdata2.LoginPage.UserName)).sendKeys(testdata6.coreSubchild3);
element(by.xpath(testdata2.LoginPage.Password)).sendKeys(testdata6.passwordField);
browser.findElement(By.xpath(testdata2.LoginPage.LogInButton)).click();
browser.sleep(8000);

//Navigate to "Bills"
element(by.xpath(testdata2.LayerSelector.Dropdown)).click();
element(by.xpath(testdata2.LayerSelector.Bills)).click();
browser.sleep(5000);

//Verify the Miscellaneous Adjustments are properly displayed under the ChargesSummary widget
var pageContent = browser.getPageSource();
expect(pageContent).toContain((testdata6.miscAmtcoreSub3));

//Refresh the page
browser.refresh();
browser.sleep(10000);

//Logout
element(by.xpath(testdata2.SystemBar.Logout)).click();
browser.sleep(10000);

//Load the URL
browser.get(testdata6.URL)
browser.sleep(4000);

//For language selection
var testdata7 = protractor.loginHelpers.lang;
element(by.css(testdata7)).click();
browser.sleep(2000);

//Log in to MetraView with CoreSubscriber second Account (coreSubchild4)
element(by.xpath(testdata2.LoginPage.UserName)).sendKeys(testdata6.coreSubchild4);
element(by.xpath(testdata2.LoginPage.Password)).sendKeys(testdata6.passwordField);
browser.findElement(By.xpath(testdata2.LoginPage.LogInButton)).click();
browser.sleep(8000);

//Navigate to "Bills"
element(by.xpath(testdata2.LayerSelector.Dropdown)).click();
element(by.xpath(testdata2.LayerSelector.Bills)).click();
browser.sleep(5000);

//Verify the Miscellaneous Adjustments are properly displayed under the ChargesSummary widget
var pageContent = browser.getPageSource();
expect(pageContent).toContain((testdata6.miscAmtcoreSub4));

//Refresh the page
browser.refresh();
browser.sleep(8000);

//Logout
element(by.xpath(testdata2.SystemBar.Logout)).click();
browser.sleep(10000);

//Load the URL
browser.get(testdata6.URL)
browser.sleep(4000);

//For language selection
var testdata7 = protractor.loginHelpers.lang;
element(by.css(testdata7)).click();
browser.sleep(2000);

//Log in to MetraView with CoreSubscriber second Account (coreSubchild2)
element(by.xpath(testdata2.LoginPage.UserName)).sendKeys(testdata6.coreSubchild5);
element(by.xpath(testdata2.LoginPage.Password)).sendKeys(testdata6.passwordField);
browser.findElement(By.xpath(testdata2.LoginPage.LogInButton)).click();
browser.sleep(8000);

//Navigate to "Bills"
element(by.xpath(testdata2.LayerSelector.Dropdown)).click();
element(by.xpath(testdata2.LayerSelector.Bills)).click();
browser.sleep(5000);

//Verify the Miscellaneous Adjustments are properly displayed under the ChargesSummary widget
var pageContent = browser.getPageSource();
expect(pageContent).toContain((testdata6.miscAmtcoreSub5));

//Refresh the page
browser.refresh();
browser.sleep(8000);

    });

it('Verify the gap between the left border of the OfferStore page and the widgets in the first column', function(){

//Refresh the page
browser.refresh();
browser.sleep(9000);

//Load the URL
browser.get(testdata6.URL)
browser.sleep(4000);

//For language selection
var testdata7 = protractor.loginHelpers.lang;
element(by.css(testdata7)).click();
browser.sleep(2000);

//Log in to MetraView with Department Account (Child5)
element(by.xpath(testdata2.LoginPage.UserName)).sendKeys(testdata6.userName);
element(by.xpath(testdata2.LoginPage.Password)).sendKeys(testdata6.passwordField);
browser.findElement(By.xpath(testdata2.LoginPage.LogInButton)).click();
browser.sleep(8000);

//Navigate to "OfferStore"
element(by.xpath(testdata2.LayerSelector.Dropdown)).click();
element(by.xpath(testdata2.LayerSelector.OfferStore)).click();
browser.sleep(5000);

//Verify the gap between the left border of the 'OfferStore' page and the widgets in the first column (Offer Cards) is consistent
element(by.xpath(testdata2.OfferStore.OfferCard_One)).getCssValue('padding-left').then((leftPaddingOffercardone) => {

element(by.xpath(testdata2.OfferStore.OfferCard_Four)).getCssValue('padding-left').then((leftPaddingOffercardfour) => {

expect(leftPaddingOffercardone).toEqual("0px");
expect(leftPaddingOffercardfour).toEqual(leftPaddingOffercardone);
});
});
protractor.loginHelpers.logOutMV();
});
});