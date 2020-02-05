// Define/configure framework details, selenium details, Specs,Script timeouts, 
// Onprepare functions, capabilities,reports and all generic stuffs.
exports.config = {
  framework: 'jasmine',
// The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',

// Specs parameter for Protractor to execute
  specs: [
    'src/tests/e2e/specs/LoginSanity.spec.js',
    'src/tests/e2e/specs/Navigation.spec.js',
    'src/tests/e2e/specs/Newcharges.spec.js'
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
    protractor.loginHelpers = require('./src/tests/e2e/specs/LoginSanity.spec.js');
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
    outputPath: './src/tests/e2e/MV 2.0 Automation execution results-Sanity/e2e',
        screenshotPath: './src/tests/e2e/MV 2.0 Automation execution results-Sanity/e2e',
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