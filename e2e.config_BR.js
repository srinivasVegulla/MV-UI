// Define/configure framework details, selenium details, Specs,Script timeouts, 
// Onprepare functions, capabilities,reports and all generic stuffs.
exports.config = {
framework: 'jasmine',
// The address of a running selenium server.
seleniumAddress: 'http://localhost:4444/wd/hub',

// Specs parameter for Protractor to execute
specs: [
'src/tests/e2e/specs/Login_BR.spec.js',
'src/tests/e2e/specs/Q2-bugsBillmanager.spec.js',
'src/tests/e2e/specs/q2-bugssecurity.spec.js',
'src/tests/e2e/specs/NavigationLayers.spec.js',
'src/tests/e2e/specs/Reports.spec.js',
'src/tests/e2e/specs/AR-addnpaynow.spec.js',
'src/tests/e2e/specs/CopyRights_Locale.spec.js',
'src/tests/e2e/specs/AccountInformation.spec.js',
'src/tests/e2e/specs/BillManager.spec.js',
'src/tests/e2e/specs/Navigation.spec.js',
'src/tests/e2e/specs/NowCast.spec.js',
'src/tests/e2e/specs/EsrVerifyOfferStorePageFromActivityLogPage.spec.js',
'src/tests/e2e/specs/EsrVerifySubscribedPoDisplayedinMVPages.spec.js',
'src/tests/e2e/specs/Quotes.spec.js',
'src/tests/e2e/specs/Transactions.spec.js',
'src/tests/e2e/specs/MiscAdjustments_HierarchyAccounts.spec.js',
'src/tests/e2e/specs/CancelSubscription_Hover.spec.js',
'src/tests/e2e/specs/Subscriptions_ViewAll.spec.js',
'src/tests/e2e/specs/Subscriptions_Search.spec.js',
'src/tests/e2e/specs/AddandCancelSubscriptions.spec.js',
'src/tests/e2e/specs/Subscriptions_WidgetforPayer.spec.js',
'src/tests/e2e/specs/PaymentMethod_ACH.spec.js',
'src/tests/e2e/specs/PaymentMethod_CC.spec.js',
'src/tests/e2e/specs/PaymentMethods_ViewAll.spec.js',
'src/tests/e2e/specs/AddandPayNow_CC.spec.js',
'src/tests/e2e/specs/AddAndPayNow_ACH.spec.js',
'src/tests/e2e/specs/AddandScheduleNow.spec.js',
'src/tests/e2e/specs/OneTimePayment.spec.js',
'src/tests/e2e/specs/ScheduleNow_ZeroandNegativeTAD.spec.js',
'src/tests/e2e/specs/ActivityLog_Update.spec.js',
'src/tests/e2e/specs/ActivityLog_ViewAll.spec.js',
'src/tests/e2e/specs/BillingActivity.spec.js',
'src/tests/e2e/specs/LiveWidgets.spec.js',
'src/tests/e2e/specs/AmountDue.spec.js',
'src/tests/e2e/specs/AmountDuePayments.spec.js',
'src/tests/e2e/specs/PriorBalance.spec.js',
'src/tests/e2e/specs/Newcharges.spec.js',
'src/tests/e2e/specs/OfferChargeSummary.spec.js',
'src/tests/e2e/specs/Downloads.spec.js',
'src/tests/e2e/specs/BillingPeriodTotal.spec.js',
'src/tests/e2e/specs/Security.spec.js',
'src/tests/e2e/specs/SignUp.spec.js',
'src/tests/e2e/specs/ForgotPassword.spec.js',
'src/tests/e2e/specs/OnDemand.spec.js',
'src/tests/e2e/specs/PriorBalanceandNSC.spec.js',
'src/tests/e2e/specs/PasswordExpiry.spec.js',
'src/tests/e2e/specs/PrebillAdjustments_Export.spec.js',
'src/tests/e2e/specs/SummarizedPostBill.spec.js',
'src/tests/e2e/specs/AccountInformation_Edit.spec.js',
'src/tests/e2e/specs/Padding.spec.js',
'src/tests/e2e/specs/Schedulepayment.spec.js',    
'src/tests/e2e/specs/VerifyAccountCreationFields.spec.js',
'src/tests/e2e/specs/CalendarBasedFilters.spec.js',
'src/tests/e2e/specs/Payments_FailedandPending.spec.js',
'src/tests/e2e/specs/SortingFunctionality.spec.js',
'src/tests/e2e/specs/PrebillandPostbill.spec.js',
'src/tests/e2e/specs/MillerWidgetChanges.spec.js',
'src/tests/e2e/specs/PaymentReceived.spec.js',
'src/tests/e2e/specs/MyAccount.spec.js',
'src/tests/e2e/specs/ActivityLog_Payments.spec.js',
'src/tests/e2e/specs/ChangePassword.spec.js',
'src/tests/e2e/specs/LoginPageDisplay.spec.js',
'src/tests/e2e/specs/ECBAR.spec.js',
'src/tests/e2e/specs/DecimalAmount.spec.js',
'src/tests/e2e/specs/ECBARDecimalAmount.spec.js',
'src/tests/e2e/specs/PopUpmisplaced.spec.js',
'src/tests/e2e/specs/Payments_CurrencyValidations.spec.js',
'src/tests/e2e/specs/SignUp_UserName_Locale.spec.js',
'src/tests/e2e/specs/CardView-Sorting.spec.js',
'src/tests/e2e/specs/ChargeSummaryTransactionsBugs.spec.js',
'src/tests/e2e/specs/AASQ1ReleaseTreeView.spec.js',
'src/tests/e2e/specs/PartitionNamespace.spec.js',
'src/tests/e2e/specs/TreeView.spec.js',
'src/tests/e2e/specs/Table-CardData.spec.js',
'src/tests/e2e/specs/LayoutPanel.spec.js',
'src/tests/e2e/specs/BugsTreeView.spec.js',
'src/tests/e2e/specs/Charges.spec.js',
'src/tests/e2e/specs/EcbarAdjustment.spec.js'


],

// Capabilities to be passed to the webdriver instance.
multiCapabilities: [
{
browserName: 'chrome',
prefs: {
download: {
'prompt_for_download': false,
'directory_upgrade': true,
'default_directory':  'C:/Users/Developer/Downloads/'
}   
}	
},
{
browserName: 'firefox',
marionette: true,
acceptInsecureCerts: true,
jasmineNodeOpts: 40000,  
jvmArgs: ['-Dwebdriver.firefox.bin=C:/Program Files/Mozilla Firefox/firefox.exe',
'-Dwebdriver.gecko.driver=C:/Users/Developer/AppData/Roaming/npm/node_modules/protractor/node_modules/webdriver-manager/selenium/geckodriver-v0.23.0.exe'],
prefs: {
download: {
'prompt_for_download': false,
'directory_upgrade': true,
'default_directory':  'C:/Users/Developer/Downloads/'
}   
}	
},
{
'browserName': 'internet explorer',
localSeleniumStandaloneOpts : {
jvmArgs : ["-Dwebdriver.ie.driver=node_modules/protractor/node_modules/webdriver-manager/selenium/IEDriverServer3.141.5.exe"] 

},

prefs: {
download: {
  'prompt_for_download': false,
  'directory_upgrade': true,
  'default_directory':  'C:/Users/Developer/Downloads/'
}   
  }	    
}

],

// Options to be passed to Jasmine-node.
jasmineNodeOpts: {
defaultTimeoutInterval: 2500000,
realtimeFailure: true,
stopSpecOnExpectationFailure: false

},

// A callback function called once protractor is ready and available, and
// before the specs are executed
onPrepare: function () {
protractor.loginHelpers = require('./src/tests/e2e/specs/Login_BR.spec.js');
var jasmineReporters = require('jasmine-reporters');
jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
consolidateAll: true,
savePath: 'src/tests/e2e/REPORTS/e2e',
filePrefix: 'xmloutput'
}));
},

// A callback function called once tests are finished.
onComplete: function() {
var browserName, browserVersion;
var capsPromise = browser.getCapabilities();

capsPromise.then(function (caps) {
browserName = caps.get('browserName');
browserVersion = caps.get('version');

var HTMLReport = require('protractor-html-reporter');
// Call custom report for html output
testConfig = {

reportTitle: 'Test Execution Report',
outputPath: './src/tests/e2e/MV 2.0 Automation execution results-Portugese/e2e',
screenshotPath: './src/tests/e2e/MV 2.0 Automation execution results-Portugese/e2e',
testBrowser: browserName,
browserVersion: browserVersion,
modifiedSuiteName: false,
screenshotsOnlyOnFailure: true
};
new HTMLReport().from('./src/tests/e2e/REPORTS/e2e/xmloutput.xml', testConfig);
});
},

// Plugins extend Protractor's base features by using hooks during 
// test execution to gather more data and potentially modify the test output.
plugins: [{
package: 'protractor-screenshoter-plugin',
screenshotPath: 'src/tests/e2e/htmlreports/e2e',
screenshotOnExpect: 'failure+success',
screenshotOnSpec: 'failure',
clearFoldersBeforeTest: 'true',
htmlReport: 'true',
withLogs: 'true',
writeReportFreq: 'asap',
clearFoldersBeforeTest: true
}],
};