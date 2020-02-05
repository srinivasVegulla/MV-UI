

var HtmlReporter = require("protractor-html-screenshot-reporter");


exports.config = {
  
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  
 specs: [
   
   'src/tests/e2e/specs/Navigation.spec.js',
   'src/tests/e2e/specs/Accountinformation.spec.js',
   'src/tests/e2e/specs/widget-Nowcast.spec.js',
   'src/tests/e2e/specs/widget-Quotes.spec.js',
   'src/tests/e2e/specs/widget-transactions.spec.js',
   'src/tests/e2e/specs/addandcancelsubscription.spec.js',
   'src/tests/e2e/specs/Subscriptionviewall.spec.js',
   'src/tests/e2e/specs/Subscriptionsearch.spec.js',
   'src/tests/e2e/specs/addingcards.spec.js',
   'src/tests/e2e/specs/Removingcards.spec.js',
   'src/tests/e2e/specs/visaandachcardsedit.spec.js',
   'src/tests/e2e/specs/mastercardedit.spec.js',
   'src/tests/e2e/specs/paynow.spec.js',
   'src/tests/e2e/specs/addandpaynow.spec.js',
   'src/tests/e2e/specs/schedulenow.spec.js',
   'src/tests/e2e/specs/addandschedulenow.spec.js',
   'src/tests/e2e/specs/onetimepayment.spec.js',
   'src/tests/e2e/specs/paymentmethodsviewall.spec.js',
   'src/tests/e2e/specs/ACtivityLog-Update.spec.js',
   'src/tests/e2e/specs/Activitylogviewall.spec.js',
   'src/tests/e2e/specs/livewidgets.spec.js',
   'src/tests/e2e/specs/Widget-Amountdue.spec.js',
   'src/tests/e2e/specs/BillingPeriodTotal.spec.js',
   'src/tests/e2e/specs/widget-priorbalance.spec.js',
   'src/tests/e2e/specs/Widget-Newcharges.spec.js',
   'src/tests/e2e/specs/widget-chargessummary.spec.js',
   'src/tests/e2e/specs/widget-Download.spec.js',
   'src/tests/e2e/specs/widget-AccountSettings.spec.js',
    'src/tests/e2e/specs/changepassword.spec.js',
    'src/tests/e2e/specs/signup.spec.js',
    'src/tests/e2e/specs/forgotpassword.spec.js'


  
   
  ],
  
  
  multiCapabilities: [/*{
    'browserName': 'firefox',
    acceptInsecureCerts: true,
     //marionette : true,
    jasmineNodeOpts: 40000,  
      jvmArgs: ['-Dwebdriver.firefox.bin=c:/Program Files (x86)/Mozilla Firefox/firefox.exe',
    '-Dwebdriver.gecko.driver=C:/Users/Developer/AppData/Roaming/npm/node_modules/protractor/node_modules/webdriver-manager/selenium/geckodriver-v0.16.0.exe']
  },
  {
    'browserName': 'internet explorer',
       acceptInsecureCerts: true,
        localSeleniumStandaloneOpts : {
         jvmArgs : ["-Dwebdriver.ie.driver=node_modules/protractor/node_modules/webdriver-manager/selenium/IEDriverServer3.4.0.exe"] 
         
		}
  } ,*/
   
  {
    'browserName': 'chrome',
     
  }],
   
     
  
   
   jasmineNodeOpts: {
        defaultTimeoutInterval: 2500000,
        realtimeFailure: true,
        stopSpecOnExpectationFailure: true
        
    },
    onPrepare: function() {
      var jasmineReporters = require('jasmine-reporters');
      jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
          consolidateAll: true,
          savePath: 'src/tests/e2e/REPORTS/e2e',
          filePrefix: 'xmloutput'
      }));
       },
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
    baseUrl: 'http://10.0.2.2:8000/'
    
 
};