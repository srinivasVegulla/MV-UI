var testdata1 = require('../inputs/testData/XpathRepository.json');
var testdata2 = require('../inputs/testdata/Login.json');
var testdata4 = require('../inputs/testdata/EcbarAdjustments.json');
const updateJsonFile = require('C:/dev/METRAVIEW-UI/node_modules/update-json-file');
const fileName = 'C:/ECB/METRAVIEW-EXT-DATA/default/i18n/common/LocaleCurrency.json';
var fs = require('fs');
var currencyCode = "";
var currencySymbol = "";
var currencyDecimalPlaces;
var currencyThousandsDelimiter = "";
var currencyFractionDelimiter = "";

describe('MetraView ECBAR ESR Test Cases', function () {

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
 
  //MTHF_17.0-S013/ ESR-10643/ 004_Main_Case_Verify_the_decimal_Amount_with_Ecbar
  it('Verify the decimal amount with ECBAR for an account with KWD currency in all Charges widgets', function () {

    //Update 'currency_decimal_places' value to 5 for KWD currency
    updateJsonFile(fileName, (data) => {
     data[6].currency_code = "KWD",
     data[6].currency_symbol = "د.ك",
     data[6].currency_decimal_places = 5,
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
    element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata4.userKWD);
    element(by.xpath(testdata1.LoginPage.Password)).sendKeys(testdata4.passwordField);
    browser.findElement(By.xpath(testdata1.LoginPage.LogInButton)).click();
    browser.sleep(8000);
  
    //Verify if the charges are showing with the above given decimal places i.e., 5. Ex: 1.26000
    //Verify in Dashboard 'New Charges' widget
    expect(element(by.xpath(testdata1.Charges.NewCharges_Amount)).getText()).toContain("1.26000");
    expect(element(by.xpath(testdata1.Charges.NewCharges_Amount)).getText()).not.toContain("1.260000");
 
    //Navigate to Bills page 
    element(by.xpath(testdata1.LayerSelector.Dropdown)).click();
    element(by.xpath(testdata1.LayerSelector.Bills)).click();
    browser.sleep(15000);
 
    //Verify in Bills 'New Charges' widget
    expect(element(by.xpath(testdata1.Charges.ChargeAmount)).getText()).toContain("1.26000");
    expect(element(by.xpath(testdata1.Charges.MiscAdjustmentValue)).getText()).toContain("1.26000");

    //Verify the Amount with decimal values in New charges & Misc Adjustments is showing same
    expect(element(by.xpath(testdata1.Charges.ChargeAmount)).getText()).toContain(element(by.xpath(testdata1.Charges.MiscAdjustmentValue)).getText());
 
    //Verify in Bills 'Estimated Bill Total' widget
    expect(element(by.xpath(testdata1.BillTotal.Amount)).getText()).toContain("1.26000");
    expect(element(by.xpath(testdata1.InvoicedTotalCharges.BillTotal_Value)).getText()).toContain("1.26000");

    //Verify the Amount with decimal values in Estimated Bill total & Total charges is showing same
    expect(element(by.xpath(testdata1.BillTotal.Amount)).getText()).toContain(element(by.xpath(testdata1.InvoicedTotalCharges.BillTotal_Value)).getText());
 
    //Verify in Bills 'Prior Balance' widget
    expect(element(by.xpath(testdata1.PriorBalance.PaymentRecivedAmount)).getText()).toContain("0.00000");

    //Verify if the charges are showing with the above given decimal places i.e., 5. Ex: 1.26000
    //Verify in 'Offer View' pane
    expect(element(by.xpath(testdata1.Billing.ChargesSummary_MiscRate)).getText()).toContain("1.26000");
    expect(element(by.xpath(testdata1.Billing.ChargesSummary_MiscRate)).getText()).not.toContain("1.260000");
    expect(element(by.xpath(testdata1.OfferCharge.TotalCharges_Amount)).getText()).toContain("1.26000");
 
    //Click on 'Miscellaneous Adjustments' link
    element(by.xpath(testdata1.OfferCharge.Misc_Adjustments_value)).click();
    browser.sleep(2000);

    //Verify in 'Miscellaneous Adjustments' page
    var pageContent=browser.getPageSource();
    expect(pageContent).toContain("1.26000");

    element(by.xpath(testdata1.Charges.MiscAdjustments_Close)).click();
    browser.sleep(2000);
 
    //Click on 'Account View' button
    element(by.xpath(testdata1.OfferCharge.AccountView_Pane)).click();
    browser.sleep(2000);

    //Verify in 'Account View' pane
    expect(element(by.xpath(testdata1.OfferCharge.AccountName_Charges)).getText()).toContain("1.26000");
    expect(element(by.xpath(testdata1.OfferCharge.TotalCharges_Amount)).getText()).toContain("1.26000");

    //Click on the account
    browser.actions().mouseMove(element(by.xpath(testdata1.OfferCharge.AccountName_Header))).perform();
    element(by.xpath(testdata1.OfferCharge.AccountName_Present)).click();
    browser.sleep(5000);  
  
    expect(element(by.xpath(testdata1.Billing.ChargesSummary_MiscRate)).getText()).toContain("1.26000");
    expect(element(by.xpath(testdata1.OfferCharge.TotalCharges_Amount)).getText()).toContain("1.26000");

    //Click on 'Miscellaneous Adjustments' link
    element(by.xpath(testdata1.OfferCharge.Misc_Adjustments_value)).click();
    browser.sleep(2000);

    //Verify in 'Miscellaneous Adjustments' page
    var pageContent=browser.getPageSource();
    expect(pageContent).toContain("1.26000");
   
   });

  //MTHF_17.0-S013/ ESR-10643/ 005_Main_Verify_DecimalAmount_Ecbarfor_DiffCurrenc
  it('Verify the decimal amount with ECBAR for an account with USD currency in Charges Summary widget', function () {
 
    //Verify for an account USD currency
    //Update 'currency_decimal_places' value to 4 for USD currency
    updateJsonFile(fileName, (data) => {
     data[6].currency_code = "USD",
     data[6].currency_symbol = "$",  
     data[6].currency_decimal_places = 4,
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
 
    //Login to MetraView as Corp account with USD currency
    element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata4.userUSD);
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

  //MTHF_17.0-S013/ ESR-10643/ 005_Main_Verify_DecimalAmount_Ecbarfor_DiffCurrenc
  it('Verify the decimal amount with ECBAR for an account with EUR currency in Charges Summary widget', function () {
  
    //Verify for an account EUR currency
    //Update 'currency_decimal_places' value to 4 for EUR currency
    updateJsonFile(fileName, (data) => {
      data[6].currency_code = "EUR",
      data[6].currency_symbol = "€",  
      data[6].currency_decimal_places = 4,
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
  
     //Login to MetraView as Corp account with EUR currency
     element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata4.userEUR);
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

  //MTHF_17.0-S013/ ESR-10643/ 005_Main_Verify_DecimalAmount_Ecbarfor_DiffCurrenc
  it('Verify the decimal amount with ECBAR for an account with CAD currency in Charges Summary widget', function () {
  
    //Verify for an account CAD currency
    //Update 'currency_decimal_places' value to 4 for CAD currency
    updateJsonFile(fileName, (data) => {
      data[6].currency_code = "CAD",
      data[6].currency_symbol = "$",  
      data[6].currency_decimal_places = 4,
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
 
    //Login to MetraView as Corp account with CAD currency
    element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata4.userCAD);
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

  //MTHF_17.0-S013/ ESR-10643/ 005_Main_Verify_DecimalAmount_Ecbarfor_DiffCurrenc
  it('Verify the decimal amount with ECBAR for an account with JPY currency  in Charges Summary widget', function () {
  
    //Verify for an account JPY currency
    //Update 'currency_decimal_places' value to 4 for JPY currency
    updateJsonFile(fileName, (data) => {
      data[6].currency_code = "JPY",
      data[6].currency_symbol = "¥",  
      data[6].currency_decimal_places = 4,
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

    //Login to MetraView as Corp account with JPY currency
    element(by.xpath(testdata1.LoginPage.UserName)).sendKeys(testdata4.userJPY);
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

  it('Reverting changes in LocaleCurrency.json file', function () {

    updateJsonFile(fileName, (data) => {
     data[6].currency_code = currencyCode
     data[6].currency_symbol = currencySymbol
     data[6].currency_decimal_places = currencyDecimalPlaces,
     data[6].currency_thousands_delimiter = currencyThousandsDelimiter,
     data[6].currency_fraction_delimiter = currencyFractionDelimiter
     return data
    })

  });

});