var testdata1 = require('../inputs/testData/XpathRepository.json');
var testdata2 = require('../inputs/testdata/Login.json');
var testdata4 = require('../inputs/testdata/JsonFileCreation.json');
const updateJsonFile = require('C:/ECB/METRAVIEW-UI/node_modules/update-json-file');
const fileName = 'C:/ECB/METRAVIEW-CONFIG/UI-EXT-DATA/default/i18n/common/LocaleCurrency.json';
var fs = require('fs');
var currencyCode = "";
var currencySymbol = "";
var currencyDecimalPlaces;
var currencyThousandsDelimiter = "";
var currencyFractionDelimiter = "";

describe('MetraView ESR Test Cases', function () {

  it('Retrieving currency values from LocaleCurrency.json file', function () {

   let rawData = fs.readFileSync(fileName);  
   let localeCurrencyData = JSON.parse(rawData); 
    
   //Retrieving data from LocaleCurrency.json file
   currencyCode = localeCurrencyData[6].currency_code;
   currencySymbol = localeCurrencyData[6].currency_symbol;
   currencyDecimalPlaces = localeCurrencyData[6].currency_decimal_places;
   currencyThousandsDelimiter = localeCurrencyData[6].currency_thousands_delimiter;
   currencyFractionDelimiter = localeCurrencyData[6].currency_fraction_delimiter;
    
  });

  //MTHF_17.0-S013/ ESR-10643/ 001_Main_Case_Verify_the_decimalAmount_inMV2.0
  it('Verify the decimal amount for the account with KWD currency in Charges Summary widget', function () {

   //Update 'currency_decimal_places' value to 4 for KWD currency
   updateJsonFile(fileName, (data) => {
    data[6].currency_code = "KWD",
    data[6].currency_symbol = "د.ك",  
    data[6].currency_decimal_places = 4,
    data[6].currency_thousands_delimiter = ",",
    data[6].currency_fraction_delimiter = "."
    return data
   })
    
   //Refresh the current page
   browser.refresh();
   browser.sleep(10000);

   //Load the URL
   browser.get(testdata2.url.URL);
   browser.sleep(4000);

   //For language selection
   var testdata7 = protractor.loginHelpers.lang;
   element(by.css(testdata7)).click();
   browser.sleep(2000);

   //Login to MetraView as Corp account
   element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata4.userNameKWD);
   element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata4.passwordField);
   browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
   browser.sleep(8000);

   //Navigate to Bills page
   element(by.xpath(testdata1.LayerSelector.Dropdown)).click();
   element(by.xpath(testdata1.LayerSelector.Bills)).click();
   browser.sleep(8000);

   //Verify if the charges are showing with the above given decimal places i.e., 4. Ex: 1.2600
   //Verify in 'Offer View' pane
   expect(element(by.xpath(testdata1.Billing.ChargesSummary_MiscRate)).getText()).toContain("1.2600");
   expect(element(by.xpath(testdata1.Billing.ChargesSummary_MiscRate)).getText()).not.toContain("1.26000");
   expect(element(by.xpath(testdata1.OfferCharge.TotalCharges_Amount)).getText()).toContain("1.2600");
 
   //Click on 'Miscellaneous Adjustments' link
   element(by.xpath(testdata1.OfferCharge.Misc_Adjustments_value)).click();
   browser.sleep(2000);

   //Verify in 'Miscellaneous Adjustments' page
   var pageContent=browser.getPageSource();
   expect(pageContent).toContain("1.2600");

   element(by.xpath(testdata1.Charges.MiscAdjustments_Close)).click();
   browser.sleep(2000);
 
   //Click on 'Account View' button
   element(by.xpath(testdata1.OfferCharge.AccountView_Pane)).click();
   browser.sleep(2000);

   //Verify in 'Account View' pane
   expect(element(by.xpath(testdata1.OfferCharge.AccountName_Charges)).getText()).toContain("1.2600");
   expect(element(by.xpath(testdata1.OfferCharge.TotalCharges_Amount)).getText()).toContain("1.2600");

   //Click on the account
   browser.actions().mouseMove(element(by.xpath(testdata1.OfferCharge.AccountName_Header))).perform();
   element(by.xpath(testdata1.OfferCharge.AccountName_Present)).click();
   browser.sleep(5000);  
  
   expect(element(by.xpath(testdata1.Billing.ChargesSummary_MiscRate)).getText()).toContain("1.2600");
   expect(element(by.xpath(testdata1.OfferCharge.TotalCharges_Amount)).getText()).toContain("1.2600");

   //Click on 'Miscellaneous Adjustments' link
   element(by.xpath(testdata1.OfferCharge.Misc_Adjustments_value)).click();
   browser.sleep(2000);

   //Verify in 'Miscellaneous Adjustments' page
   var pageContent=browser.getPageSource();
   expect(pageContent).toContain("1.2600");
  
  });

  //MTHF_17.0-S013/ ESR-10643/ 003_Reg_Case_verify_in_Payment_HistoryPage
  it('Verify the decimal amount for the account with KWD currency in "New Charges","Estimated Bill Total" etc widgets', function () {

   //Update 'currency_decimal_places' value to 3 for KWD currency
   updateJsonFile(fileName, (data) => {
    data[6].currency_code = "KWD",
    data[6].currency_symbol = "د.ك",
    data[6].currency_decimal_places = 3,
    data[6].currency_thousands_delimiter = ",",
    data[6].currency_fraction_delimiter = "."
    return data
   })
    
   //Refresh the current page
   browser.refresh();
   browser.sleep(10000);

   //LogOut from MV2.0
   element(by.xpath(testdata1.SystemBar.Logout)).click();
   browser.sleep(10000);

   //Load the URL
   browser.get(testdata2.url.URL);
   browser.sleep(4000);

   //For language selection
   var testdata7 = protractor.loginHelpers.lang;
   element(by.css(testdata7)).click();
   browser.sleep(2000);

   //Login to MetraView as Corp account
   element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata4.userNameKWD);
   element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata4.passwordField);
   browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
   browser.sleep(8000);
 
   //Verify if the charges are showing with the above given decimal places i.e., 3. Ex: 1.260
   //Verify in Dashboard 'New Charges' widget
   expect(element(by.xpath(testdata1.Charges.NewCharges_Amount)).getText()).toContain("KWD KWD -1.26");
   expect(element(by.xpath(testdata1.Charges.NewCharges_Amount)).getText()).not.toContain("1.2600");

   //Navigate to Bills page 
   element(by.xpath(testdata1.LayerSelector.Dropdown)).click();
   element(by.xpath(testdata1.LayerSelector.Bills)).click();
   browser.sleep(15000);

   //Verify in Bills 'New Charges' widget
   expect(element(by.xpath(testdata1.Charges.ChargeAmount)).getText()).toContain("KWD KWD -1.26");
   //expect(element(by.xpath(testdata1.Charges.MiscAdjustmentValue)).getText()).toContain("1.260");MiscAjustments are absent now

   //Verify in Bills 'Estimated Bill Total' widget
   expect(element(by.xpath(testdata1.BillTotal.Amount)).getText()).toContain("1.260");
   expect(element(by.xpath(testdata1.InvoicedTotalCharges.BillTotal_Value)).getText()).toContain("1.260");

   //Verify in Bills 'Prior Balance' widget
   expect(element(by.xpath(testdata1.PriorBalance.PaymentRecivedAmount)).getText()).toContain("0.000");
    
  });

  it('Reverting changes in LocaleCurrency.json file', function () {

    updateJsonFile(fileName, (data) => {
     data[6].currency_code = currencyCode,
     data[6].currency_symbol = currencySymbol,
     data[6].currency_decimal_places = currencyDecimalPlaces,
     data[6].currency_thousands_delimiter = currencyThousandsDelimiter,
     data[6].currency_fraction_delimiter = currencyFractionDelimiter
     return data
    })

  });

});