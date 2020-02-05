describe('MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView',function(){

  //#region dataFiles
  
  var sce1= require('../inputs/testdata/TreeViewScenario1.json');
  var sce2= require('../inputs/testdata/TreeViewScenario2.json');
  var sce3= require('../inputs/testdata/TreeViewScenario3.json');
  var xpathRepo = require('../inputs/testdata/XpathRepository.json');
  var dirPath = 'C:/Users/Administrator/Downloads/';
  const fs = require('fs');
  
  //#endregion dataFiles
  
  //#region Tests
  
  it('/MVIEW-2816/TC01_Dwd_Chg_CSV_OffView Scenario 1', function(){
  
  browser.refresh();
  browser.sleep(5000);
  //Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2816_TC01_Dwd_Chg_CSV_OffView
  DwdChgCSVOffViewCorp(sce1.corporateAccountUserName,sce1.passwordField);
  
  DwdChgCSVOffViewSC1Dept(sce1.departmentAccountUserName,sce1.passwordField);
  
  });
  
  it('/MVIEW-2816/TC01_Dwd_Chg_CSV_OffView Scenario 2', function(){
  //Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2816_TC01_Dwd_Chg_CSV_OffView
  DwdChgCSVOffViewCorp(sce2.corporateAccountUserName,sce2.passwordField);
  
  });
  
  it('/MVIEW-2816/TC01_Dwd_Chg_CSV_OffView Scenario 3', function(){
  //Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2816_TC01_Dwd_Chg_CSV_OffView
  DwdChgCSVOffViewCorp(sce3.corporateAccountUserName,sce3.passwordField);
  
  });
  
  it('/MVIEW-2816/TC01_Dwd_Chg_CSV_AccView Scenario 1', function(){
  
  //Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2816_TC01_Dwd_Chg_CSV_AccView
  DwdChgCSVAccViewParent(sce1.corporateAccountUserName,sce1.passwordField);
  DwdChgCSVAccViewSce1Child(sce1.departmentAccountUserName,sce1.passwordField);
  
  });
  
  it('/MVIEW-2816/TC01_Dwd_Chg_CSV_AccView Scenario 2', function(){
  //Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2816_TC01_Dwd_Chg_CSV_AccView
  DwdChgCSVAccViewParent(sce2.corporateAccountUserName,sce2.passwordField);
  
  });
  
  it('/MVIEW-2816/TC01_Dwd_Chg_CSV_AccView Scenario 3', function(){
  //Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2816_TC01_Dwd_Chg_CSV_AccView
  DwdChgCSVAccViewParent(sce3.corporateAccountUserName,sce3.passwordField);
  
  });
  
  it('/MVIEW-2818 Scenario 1', function(){
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2818_TC01_Click_Trnslink_No_Dlog_Disp 
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2818_TC02_Hiera_Disp_For_Select_DateRange 
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2818_TC03_Trns_Data_For_PI_Displayed
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2818_TC04_No_DataRange_Avbl
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2818_TC05_Trns_Data_PI_Sel_Dates
  MVIEW2818TransValidations(sce1.corporateAccountUserName,sce1.passwordField);
  MVIEW2818TransValidations(sce1.departmentAccountUserName,sce1.passwordField);
  MVIEW2818TransValidations(sce1.core1AccountUserName,sce1.passwordField);
  
  });
  
  it('/MVIEW-2818 Scenario 2', function(){
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2818_TC01_Click_Trnslink_No_Dlog_Disp 
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2818_TC02_Hiera_Disp_For_Select_DateRange 
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2818_TC03_Trns_Data_For_PI_Displayed
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2818_TC04_No_DataRange_Avbl
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2818_TC05_Trns_Data_PI_Sel_Dates
  MVIEW2818TransValidations(sce2.corporateAccountUserName,sce2.passwordField);
  
  });
  
  it('/MVIEW-2818 Scenario 3', function(){
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2818_TC01_Click_Trnslink_No_Dlog_Disp 
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2818_TC02_Hiera_Disp_For_Select_DateRange 
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2818_TC03_Trns_Data_For_PI_Displayed
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2818_TC04_No_DataRange_Avbl
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2818_TC05_Trns_Data_PI_Sel_Dates
  MVIEW2818TransValidations(sce3.corporateAccountUserName,sce3.passwordField);
  
  });
  
  it('/MVIEW-2814 Scenario 1',function(){
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2814_TC01_ViewAll_Disp_Footer 
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2814_TC02_ViewAll_Click_ExpView_Disp 
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2814_TC03_ViewAll_ExpView_ScrollBar_Disp 
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2814_TC04_ViewAll_Exp_Close_Btn_Disp 
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2814_TC05_ViewAll_CloseBtn_Click 
  MVIEW2814ViewAllSce1Corp(sce1.corporateAccountUserName,sce1.passwordField);
  MVIEW2814ViewAllSce1Dept(sce1.departmentAccountUserName,sce1.passwordField);
  });
  
  it('/MVIEW-2814 Scenario 2',function(){
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2814_TC01_ViewAll_Disp_Footer 
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2814_TC02_ViewAll_Click_ExpView_Disp 
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2814_TC03_ViewAll_ExpView_ScrollBar_Disp 
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2814_TC04_ViewAll_Exp_Close_Btn_Disp 
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2814_TC05_ViewAll_CloseBtn_Click 
  MVIEW2814ViewAllCommon(sce2.corporateAccountUserName,sce2.passwordField);
  
  });
  
  it('/MVIEW-2814 Scenario 3',function(){
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2814_TC01_ViewAll_Disp_Footer 
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2814_TC02_ViewAll_Click_ExpView_Disp 
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2814_TC03_ViewAll_ExpView_ScrollBar_Disp 
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2814_TC04_ViewAll_Exp_Close_Btn_Disp 
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2814_TC05_ViewAll_CloseBtn_Click 
  MVIEW2814ViewAllCommon(sce3.corporateAccountUserName,sce3.passwordField);
  
  });
  
  it('/MVIEW-2812 Scenario 1',function(){
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2812_TC01_Click_Parent_Node_Exp 
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2812_TC02_Click_Parent_Node_Collap 
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2812_TC03_No_Back_Link 
  MVIEW2812ClickParentNodeExpSce1Corp(sce1.corporateAccountUserName,sce1.passwordField);
  MVIEW2812ClickParentNodeExpSce1Dept(sce1.departmentAccountUserName,sce1.passwordField);
  });
      
  it('/MVIEW-2812 Scenario 2',function(){
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2812_TC01_Click_Parent_Node_Exp 
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2812_TC02_Click_Parent_Node_Collap 
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2812_TC03_No_Back_Link 
  MVIEW2812ClickParentNodeExpCommon(sce2.corporateAccountUserName,sce2.passwordField);
  });
  
  it('/MVIEW-2812 Scenario 3',function(){
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2812_TC01_Click_Parent_Node_Exp 
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2812_TC02_Click_Parent_Node_Collap 
  // Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2812_TC03_No_Back_Link
  MVIEW2812ClickParentNodeExpCommon(sce3.corporateAccountUserName,sce3.passwordField);
  });
  
  //#endregion Tests
  
  //#region TestHelpers
  
  //#region MVIEW2816
  
  function DwdChgCSVOffViewCorp(userName,password){
    
  //Launch to the MV2.0 application
  protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
  
  //Login to the MV2.0 application with Corporate Account
  protractor.loginHelpers.logInMV(userName,password);
  
  //Click on Layer Selector Dropdown
  element(by.xpath(xpathRepo.LayerSelector.Dropdown)).click();
  browser.sleep(5000);
  
  //Click on Bills Layer
  element(by.xpath(xpathRepo.LayerSelector.Bills)).click();
  browser.sleep(5000);
  
  //Select the Billing Period Dropdown
  element(by.xpath(xpathRepo.Billing.SelectPeriodInvoiceDropdown)).click();
  browser.sleep(2000);
  
  //Select the Period/Invoice for which charges are available
  element(by.xpath(xpathRepo.OfferCharge.Link+localizedDate()+" - "+localizedDate()+xpathRepo.OfferCharge.CloseXpath)).click();
  browser.sleep(1000);
  
  //Under Charges Summary widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  
  pos[0].click();
  browser.sleep(2000);
  pos[0].click();
  browser.sleep(2000);
  });
  
  //click on down arrow to open the tree view
  element.all(by.xpath(xpathRepo.OfferCharge.ArrowExpand)).then(function(arrow){
  //expect(arrow.length).toBe(3);
  arrow[0].click();
  browser.sleep(2000);
  });
  
  //Verify the parent node expands and the Priceable Item (the child node) is displayed under it
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isDisplayed()).toBe(true);
  
  //Click on the download icon adjacent to the Priceable Item
  element.all(by.xpath(xpathRepo.OfferCharge.Download_PI_Link)).then(function(download){
  download[0].click();
  browser.sleep(2000);
  });
  
  //Verify the charges .csv file is downloaded
  browser.driver.wait(function() {
  browser.waitForAngular();
  browser.ignoreSynchronization = true;
  let filename=dirPath+"/OfferChargeSummary.csv";
  return fs.existsSync(filename);
  }, 10000).then(function(){ 
  let filename=dirPath+"/OfferChargeSummary.csv";
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain("41.6666666667");
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(timestamp());
  // 
  // browser.ignoreSynchronization = false;
  });
  
  //Click on the Priceable Item
  element.all(by.xpath(xpathRepo.OfferCharge.PI_Selection)).then(function(pis){
  pis[0].click();
  browser.sleep(4000);
  });
  
  //Click on the download icon 
  element.all(by.xpath(xpathRepo.OfferCharge.DownloadLink)).then(function(dwnldIcon){
  dwnldIcon[0].click();
  browser.sleep(2000);
  });
  
  //Verify the charges .csv file is downloaded
  browser.driver.wait(function() {
  browser.waitForAngular();
  browser.ignoreSynchronization = true;
  let filename=dirPath+"/OfferChargeSummary (1).csv";
  return fs.existsSync(filename);
  }, 10000).then(function(){ 
  let filename=dirPath+"/OfferChargeSummary (1).csv";
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain("41.6666666667");
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(timestamp());
  
  //Verify Localization
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(protractor.loginHelpers.DisplayAmount());
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(protractor.loginHelpers.TimeStamp());
  // 
  // browser.ignoreSynchronization = false;
  });
  
  browser.refresh();
  browser.sleep(5000);
  
  //Click on Layer Selector Dropdown
  element(by.xpath(xpathRepo.LayerSelector.Dropdown)).click();
  
  //Click on Bills Layer
  element(by.xpath(xpathRepo.LayerSelector.Bills)).click();
  browser.sleep(5000);
  
  //Select the Billing Period Dropdown
  element(by.xpath(xpathRepo.Billing.SelectPeriodInvoiceDropdown)).click();
  browser.sleep(1000);
  
  //Select the Period/Invoice for which charges are available
  element(by.xpath(xpathRepo.OfferCharge.Link+localizedDate()+" - "+localizedDate()+xpathRepo.OfferCharge.CloseXpath)).click();
  browser.sleep(3000);
  
  //Click on the download icon adjacent to the Priceable Item
  element.all(by.xpath(xpathRepo.OfferCharge.Download_PI_Link)).then(function(download){
  download[0].click();
  browser.sleep(2000);
  });
  
  //Verify the charges .csv file is downloaded
  browser.driver.wait(function() {
  browser.waitForAngular();
  browser.ignoreSynchronization = true;
  let filename=dirPath+"/OfferChargeSummary (2).csv";
  return fs.existsSync(filename);
  }, 10000).then(function(){ 
  let filename=dirPath+"/OfferChargeSummary (2).csv";
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain("302.0000000000");
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(timestamp());
  // 
  // browser.ignoreSynchronization = false;
  });
  
  //Under Charges Summary widget, click on the default PL
  element.all(by.xpath(xpathRepo.OfferCharge.MultiplePO)).then(function(pos){
  pos[3].click();
  browser.sleep(4000);
  });
  
  //Click on the download icon 
  element.all(by.xpath(xpathRepo.OfferCharge.DownloadLink)).then(function(dwnldIcon){
  dwnldIcon[0].click();
  browser.sleep(2000);
  });
  
  //Verify the charges .csv file is downloaded
  browser.ignoreSynchronization = true;
  browser.driver.wait(function() {
  browser.waitForAngular();
  let filename=dirPath+"/OfferChargeSummary (3).csv";
  return fs.existsSync(filename);
  }, 10000).then(function(){ 
  let filename=dirPath+"/OfferChargeSummary (3).csv";
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain("302.0000000000");
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(timestamp());
  
  //Verify Localization
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(protractor.loginHelpers.DisplayAmount());
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(protractor.loginHelpers.TimeStamp());
  // 
  // browser.ignoreSynchronization = false;
  });
  
  protractor.loginHelpers.logOutMV();
  
  }
  
  function DwdChgCSVOffViewSC1Dept(userName,password){
  
  //Launch to the MV2.0 application
  protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
  
  //Login to the MV2.0 application with Corporate Account
  protractor.loginHelpers.logInMV(userName,password);
  
  //#region PO
  
  //Click on Layer Selector Dropdown
  element(by.xpath(xpathRepo.LayerSelector.Dropdown)).click();
  browser.sleep(5000);
  
  //Click on Bills Layer
  element(by.xpath(xpathRepo.LayerSelector.Bills)).click();
  browser.sleep(5000);
  
  //Select the Billing Period Dropdown
  element(by.xpath(xpathRepo.Billing.SelectPeriodInvoiceDropdown)).click();
  browser.sleep(1000);
  
  //Select the Period/Invoice for which charges are available
  element(by.xpath(xpathRepo.OfferCharge.Link+localizedDate()+" - "+localizedDate()+xpathRepo.OfferCharge.CloseXpath)).click();
  browser.sleep(1000);
  
  //Under Charges Summary widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  
  pos[1].click();
  browser.sleep(2000);
  pos[1].click();
  browser.sleep(2000);
  });
  
  //click on down arrow to open the tree view
  element.all(by.xpath(xpathRepo.OfferCharge.ArrowExpand)).then(function(arrow){
  //expect(arrow.length).toBe(3);
  arrow[0].click();
  browser.sleep(2000);
  });
  
  //Verify the parent node expands and the Priceable Item (the child node) is displayed under it
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isDisplayed()).toBe(true);
  
  //Click on the download icon adjacent to the Priceable Item
  element.all(by.xpath(xpathRepo.OfferCharge.Download_PI_Link)).then(function(download){
  download[0].click();
  browser.sleep(2000);
  });
  
  //Verify the charges .csv file is downloaded
  browser.driver.wait(function() {
  browser.waitForAngular();
  browser.ignoreSynchronization = true;
  let filename=dirPath+"OfferChargeSummary (4).csv";
  return fs.existsSync(filename);
  }, 10000).then(function(){ 
  let filename=dirPath+"OfferChargeSummary (4).csv";
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain("41.6666666667");
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(timestamp());
  });
  
  //Click on the Priceable Item
  element.all(by.xpath(xpathRepo.OfferCharge.PI_Selection)).then(function(pis){
  pis[0].click();
  browser.sleep(4000);
  });
  
  //Click on the download icon 
  element.all(by.xpath(xpathRepo.OfferCharge.DownloadLink)).then(function(dwnldIcon){
  dwnldIcon[0].click();
  browser.sleep(2000);
  });
  
  //Verify the charges .csv file is downloaded
  browser.driver.wait(function() {
  browser.waitForAngular();
  browser.ignoreSynchronization = true;
  let filename=dirPath+"OfferChargeSummary (5).csv";
  return fs.existsSync(filename);
  }, 10000).then(function(){ 
  let filename=dirPath+"OfferChargeSummary (5).csv";
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain("41.6666666667");
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(timestamp());
  
  //Verify Localization
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(protractor.loginHelpers.DisplayAmount());
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(protractor.loginHelpers.TimeStamp());
  
  });
  
  //MVIEW-2812:Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2812_TC09_Chg_CSV_Dwd
  element(by.xpath(xpathRepo.OfferCharge.ChargeSummary_X_Button)).click();
  //#endregion PO
  
  //#region defaultPL
  browser.refresh();
  browser.sleep(5000);
  
  //Click on Layer Selector Dropdown
  element(by.xpath(xpathRepo.LayerSelector.Dropdown)).click();
  
  //Click on Bills Layer
  element(by.xpath(xpathRepo.LayerSelector.Bills)).click();
  browser.sleep(5000);
  
  //Select the Billing Period Dropdown
  element(by.xpath(xpathRepo.Billing.SelectPeriodInvoiceDropdown)).click();
  browser.sleep(1000);
  
  //Select the Period/Invoice for which charges are available
  element(by.xpath(xpathRepo.OfferCharge.Link+localizedDate()+" - "+localizedDate()+xpathRepo.OfferCharge.CloseXpath)).click();
  browser.sleep(3000);
  
  //Click on the download icon adjacent to the Priceable Item
  element.all(by.xpath(xpathRepo.OfferCharge.Download_PI_Link)).then(function(download){
  download[0].click();
  browser.sleep(2000);
  });
  
  //Verify the charges .csv file is downloaded
  browser.driver.wait(function() {
  browser.waitForAngular();
  browser.ignoreSynchronization = true;
  let filename=dirPath+"OfferChargeSummary (6).csv";
  return fs.existsSync(filename);
  }, 10000).then(function(){ 
  let filename=dirPath+"OfferChargeSummary (6).csv";
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain("302.0000000000");
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(timestamp());
  });
  
  //Under Charges Summary widget, click on the default PL
  element.all(by.xpath(xpathRepo.OfferCharge.MultiplePO)).then(function(pos){
  pos[3].click();
  browser.sleep(4000);
  });
  
  //Click on the download icon 
  element.all(by.xpath(xpathRepo.OfferCharge.DownloadLink)).then(function(dwnldIcon){
  dwnldIcon[0].click();
  browser.sleep(2000);
  });
  
  //Verify the charges .csv file is downloaded
  browser.driver.wait(function() {
  browser.waitForAngular();
  browser.ignoreSynchronization = true;
  let filename=dirPath+"OfferChargeSummary (7).csv";
  return fs.existsSync(filename);
  }, 10000).then(function(){ 
  let filename=dirPath+"OfferChargeSummary (7).csv";
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain("302.0000000000");
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(timestamp());
  
  //Verify Localization
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(protractor.loginHelpers.DisplayAmount());
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(protractor.loginHelpers.TimeStamp());
  });
  //#endregion defaultPL
  
  protractor.loginHelpers.logOutMV();
  
  }
  
  function DwdChgCSVAccViewParent(userName,password){
  
  //Launch to the MV2.0 application
  protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
  
  //Login to the MV2.0 application with Corporate Account
  protractor.loginHelpers.logInMV(userName,password);
  
  //#region PI1
  
  //Click on Layer Selector Dropdown
  element(by.xpath(xpathRepo.LayerSelector.Dropdown)).click();
  browser.sleep(5000);
  
  //Click on Bills Layer
  element(by.xpath(xpathRepo.LayerSelector.Bills)).click();
  browser.sleep(5000);
  
  //Select the Billing Period Dropdown
  element(by.xpath(xpathRepo.Billing.SelectPeriodInvoiceDropdown)).click();
  browser.sleep(5000);
  
  //Select the Period/Invoice for which charges are available
  element(by.xpath(xpathRepo.OfferCharge.Link+localizedDate()+" - "+localizedDate()+xpathRepo.OfferCharge.CloseXpath)).click();
  browser.sleep(5000);
  
  //Click on the Account View tab
  element(by.xpath(xpathRepo.OfferCharge.AccountView_Pane)).click();
  browser.sleep(2000);
  
  //Click on the Account Name (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).then(function(accName){
  accName[0].click();
  browser.sleep(2000);
  });
  
  //Under Charges Summary widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PO_GroupUsage)).then(function(pos){
  pos[0].click();
  browser.sleep(2000);
  });
  
  //Verify the parent node expands and the Priceable Item (the child node) is displayed under it
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isDisplayed()).toBe(true);
  
  //Click on the download icon adjacent to the Priceable Item
  element.all(by.xpath(xpathRepo.OfferCharge.Download_PI_Link)).then(function(download){
  download[0].click();
  browser.sleep(2000);
  });
  
  //Verify the charges .csv file is downloaded
  browser.driver.wait(function() {
  browser.waitForAngular();
  browser.ignoreSynchronization = true;
  let filename=dirPath+"/OfferChargeSummary.csv";
  return fs.existsSync(filename);
  }, 10000).then(function(){ 
  let filename=dirPath+"/OfferChargeSummary.csv";
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain("41.6666666667");
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(timestamp());
  });
  
  //Click on the Priceable Item
  element.all(by.xpath(xpathRepo.OfferCharge.PI_Selection)).then(function(pis){
  pis[0].click();
  browser.sleep(4000);
  });
  
  
  //Click on the download icon 
  element.all(by.xpath(xpathRepo.OfferCharge.DownloadLink)).then(function(dwnldIcon){
  dwnldIcon[0].click();
  browser.sleep(2000);
  });
  
  //Verify the charges .csv file is downloaded
  browser.driver.wait(function() {
  browser.waitForAngular();
  browser.ignoreSynchronization = true;
  let filename=dirPath+"/OfferChargeSummary (1).csv";
  return fs.existsSync(filename);
  }, 10000).then(function(){ 
  let filename=dirPath+"/OfferChargeSummary (1).csv";
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain("41.6666666667");
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(timestamp());
  
  //Verify Localization
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(protractor.loginHelpers.DisplayAmount());
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(protractor.loginHelpers.TimeStamp());
  });
  
  //MVIEW-2812:Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2812_TC09_Chg_CSV_Dwd
  element(by.xpath(xpathRepo.OfferCharge.ChargeSummary_X_Button)).click();
  
  //#endregion PI1
  
  //#region defaultPL
  browser.refresh();
  browser.sleep(5000);
  
  //Click on Layer Selector Dropdown
  element(by.xpath(xpathRepo.LayerSelector.Dropdown)).click();
  
  //Click on Bills Layer
  element(by.xpath(xpathRepo.LayerSelector.Bills)).click();
  browser.sleep(5000);
  
  //Select the Billing Period Dropdown
  element(by.xpath(xpathRepo.Billing.SelectPeriodInvoiceDropdown)).click();
  browser.sleep(1000);
  
  //Select the Period/Invoice for which charges are available
  element(by.xpath(xpathRepo.OfferCharge.Link+localizedDate()+" - "+localizedDate()+xpathRepo.OfferCharge.CloseXpath)).click();
  
  //Click on the Account View tab
  element(by.xpath(xpathRepo.OfferCharge.AccountView_Pane)).click();
  browser.sleep(2000);
  
  //Click on the Account Name (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).then(function(accName){
  accName[0].click();
  browser.sleep(2000);
  });
  
  //Click on the download icon adjacent to the Priceable Item
  element.all(by.xpath(xpathRepo.OfferCharge.Download_PI_Link)).then(function(download){
  download[0].click();
  browser.sleep(2000);
  });
  
  //Verify the charges .csv file is downloaded
  browser.driver.wait(function() {
  browser.waitForAngular();
  browser.ignoreSynchronization = true;
  let filename=dirPath+"/OfferChargeSummary (2).csv";
  return fs.existsSync(filename);
  }, 10000).then(function(){ 
  let filename=dirPath+"/OfferChargeSummary (2).csv";
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain("302.0000000000");
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(timestamp());
  });
  
  //Under Charges Summary widget, click on the default PL
  element.all(by.xpath(xpathRepo.OfferCharge.MultiplePO)).then(function(pos){
  pos[4].click();
  browser.sleep(4000);
  });
  
  //Click on the download icon 
  element.all(by.xpath(xpathRepo.OfferCharge.DownloadLink)).then(function(dwnldIcon){
  dwnldIcon[0].click();
  browser.sleep(2000);
  });
  
  //Verify the charges .csv file is downloaded
  browser.driver.wait(function() {
  browser.waitForAngular();
  browser.ignoreSynchronization = true;
  let filename=dirPath+"/OfferChargeSummary (3).csv";
  return fs.existsSync(filename);
  }, 10000).then(function(){ 
  let filename=dirPath+"/OfferChargeSummary (3).csv";
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain("302.0000000000");
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(timestamp());
  
  //Verify Localization
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(protractor.loginHelpers.DisplayAmount());
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(protractor.loginHelpers.TimeStamp());
  });
  //#endregion defaultPL
  
  protractor.loginHelpers.logOutMV();
  
  }
  
  function DwdChgCSVAccViewSce1Child(userName,password){
  
  //Launch to the MV2.0 application
  protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
  
  //Login to the MV2.0 application with Corporate Account
  protractor.loginHelpers.logInMV(userName,password);
  
  //#region PI1
  
  //Click on Layer Selector Dropdown
  element(by.xpath(xpathRepo.LayerSelector.Dropdown)).click();
  browser.sleep(5000);
  
  //Click on Bills Layer
  element(by.xpath(xpathRepo.LayerSelector.Bills)).click();
  browser.sleep(5000);
  
  //Select the Billing Period Dropdown
  element(by.xpath(xpathRepo.Billing.SelectPeriodInvoiceDropdown)).click();
  browser.sleep(1000);
  
  //Select the Period/Invoice for which charges are available
  element(by.xpath(xpathRepo.OfferCharge.Link+localizedDate()+" - "+localizedDate()+xpathRepo.OfferCharge.CloseXpath)).click();
  browser.sleep(1000);
  
  //Click on the Account View tab
  element(by.xpath(xpathRepo.OfferCharge.AccountView_Pane)).click();
  browser.sleep(2000);
  
  //Click on the Account Name (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).then(function(accName){
  accName[0].click();
  browser.sleep(2000);
  });
  
  //Under Charges Summary widget, click on the Child Node
  element.all(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).then(function(pos){
  pos[2].click();
  browser.sleep(2000);
  });
  
  //Click on the Account View tab
  element(by.xpath(xpathRepo.OfferCharge.ViewAll)).click();
  browser.sleep(2000);
  
  //Verify the parent node expands and the Product Offers/Accounts (the child nodes) are displayed under it
  element.all(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).then(function(accName){
  expect(accName[2].getText()).toContain('core2Sub');
  browser.sleep(2000);
  });
  
  //Under Charges Summary widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  pos[2].click();
  browser.sleep(2000);
  });
  
  //Verify the parent node expands and the Priceable Item (the child node) is displayed under it
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isDisplayed()).toBe(true);
  
  //Click on the download icon adjacent to the Priceable Item
  element.all(by.xpath(xpathRepo.OfferCharge.Download_PI_Link)).then(function(download){
  download[0].click();
  browser.sleep(2000);
  });
  
  //Verify the charges .csv file is downloaded
  browser.driver.wait(function() {
  browser.waitForAngular();
  browser.ignoreSynchronization = true;
  let filename=dirPath+"/OfferChargeSummary (4).csv";
  return fs.existsSync(filename);
  }, 10000).then(function(){ 
  let filename=dirPath+"/OfferChargeSummary (4).csv";
  
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(timestamp());
  });
  
  //Click on the Priceable Item
  element.all(by.xpath(xpathRepo.OfferCharge.PI_Selection)).then(function(pis){
  pis[3].click();
  browser.sleep(4000);
  });
  
  //Click on the download icon 
  element.all(by.xpath(xpathRepo.OfferCharge.DownloadLink)).then(function(dwnldIcon){
  dwnldIcon[0].click();
  browser.sleep(2000);
  });
  
  //Verify the charges .csv file is downloaded
  browser.driver.wait(function() {
  browser.waitForAngular();
  browser.ignoreSynchronization = true;
  let filename=dirPath+"/OfferChargeSummary (5).csv";
  return fs.existsSync(filename);
  }, 10000).then(function(){ 
  let filename=dirPath+"/OfferChargeSummary (5).csv";
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(timestamp());
  
  //Verify Localization
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(protractor.loginHelpers.DisplayAmount());
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(protractor.loginHelpers.TimeStamp());
  });
  
  //MVIEW-2812:Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2812_TC09_Chg_CSV_Dwd
  element(by.xpath(xpathRepo.OfferCharge.ChargeSummary_X_Button)).click();
  
  //#endregion PI1
  
  //#region defaultPL
  browser.refresh();
  browser.sleep(5000);
  
  //Click on Layer Selector Dropdown
  element(by.xpath(xpathRepo.LayerSelector.Dropdown)).click();
  
  //Click on Bills Layer
  element(by.xpath(xpathRepo.LayerSelector.Bills)).click();
  browser.sleep(5000);
  
  //Select the Billing Period Dropdown
  element(by.xpath(xpathRepo.Billing.SelectPeriodInvoiceDropdown)).click();
  browser.sleep(1000);
  
  //Select the Period/Invoice for which charges are available
  element(by.xpath(xpathRepo.OfferCharge.Link+localizedDate()+" - "+localizedDate()+xpathRepo.OfferCharge.CloseXpath)).click();
  
  ////Click on the Account View tab
  element(by.xpath(xpathRepo.OfferCharge.AccountView_Pane)).click();
  browser.sleep(2000);
  
  //Click on the Account Name (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).then(function(accName){
  accName[0].click();
  browser.sleep(2000);
  });
  
  //Under Charges Summary widget, click on the Child Node
  element.all(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).then(function(pos){
  pos[2].click();
  browser.sleep(2000);
  });
  
  //Click on the Account View tab
  element(by.xpath(xpathRepo.OfferCharge.ViewAll)).click();
  browser.sleep(2000);
  
  //Click on the download icon adjacent to the Priceable Item
  element.all(by.xpath(xpathRepo.OfferCharge.Download_PI_Link)).then(function(download){
  download[0].click();
  browser.sleep(2000);
  });
  
  //Verify the charges .csv file is downloaded
  browser.driver.wait(function() {
  browser.waitForAngular();
  browser.ignoreSynchronization = true;
  let filename=dirPath+"/OfferChargeSummary (6).csv";
  return fs.existsSync(filename);
  }, 10000).then(function(){ 
  let filename=dirPath+"/OfferChargeSummary (6).csv";
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain("302.0000000000");
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(timestamp());
  });
  
  //Under Charges Summary widget, click on the default PL
  element.all(by.xpath(xpathRepo.OfferCharge.MultiplePO)).then(function(pos){
  pos[6].click();
  browser.sleep(4000);
  });
  
  //Click on the download icon 
  element.all(by.xpath(xpathRepo.OfferCharge.DownloadLink)).then(function(dwnldIcon){
  dwnldIcon[0].click();
  browser.sleep(2000);
  });
  
  //Verify the charges .csv file is downloaded
  browser.driver.wait(function() {
  browser.waitForAngular();
  browser.ignoreSynchronization = true;
  let filename=dirPath+"/OfferChargeSummary (7).csv";
  return fs.existsSync(filename);
  }, 10000).then(function(){ 
  let filename=dirPath+"/OfferChargeSummary (7).csv";
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain("302.0000000000");
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(timestamp());
  
  //Verify Localization
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(protractor.loginHelpers.DisplayAmount());
  expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain(protractor.loginHelpers.TimeStamp());
  });
  
  //#endregion defaultPL
  
  protractor.loginHelpers.logOutMV();
  
  }
  
  //#endregion MVIEW2816
  
  //#region MVIEW2818
  
  function MVIEW2818TransValidations(userName,password){
  
  var locale = protractor.loginHelpers.dashboard();
  
  //Launch to the MV2.0 application
  protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
  
  //Login to the MV2.0 application with Corporate Account
  protractor.loginHelpers.logInMV(userName,password);
  
  //Click on the Transactions  link under Quotes & Transactions  widget in the Dashboard  page
  element(by.xpath(xpathRepo.Quotes.Transactions_Link)).click();
  browser.sleep(5000);
  
  //#region ClickTrnslinkNoDlogDisp
  //Verify no dialog is displayed
  var pageContent = browser.getPageSource();
  expect(pageContent).not.toContain(locale.TEXT_NO_OFFERS);
  
  //Verify Localization
  expect(element(by.xpath(xpathRepo.OfferCharge.Header_Main+locale.TEXT_TRANSACTIONS+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.OfferCharge.PageTitle+locale.TEXT_OFFER_CHARGE_SUMMARY+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.Transactions.ChargesTotal_Label)).isDisplayed()).toBe(true);
  
  //#endregion ClickTrnslinkNoDlogDisp
  
  //#region NoDataRangeAvbl
  //Verify only Date Range  option is available in the Select By  drop-down
  element(by.xpath(xpathRepo.Adjustment.SelectByDropdown)).click();
  browser.sleep(5000);
  
  expect(element(by.xpath(xpathRepo.OfferCharge.Link+locale.TEXT_DATE_RANGE+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  browser.sleep(5000);
  
  element(by.xpath(xpathRepo.Adjustment.SelectByDropdown)).click();
  browser.sleep(1000);
  //#endregion NoDataRangeAvbl
  
  //#region TrnsDataForPIDisplayed
  
  //#region HieraDispForSelectDateRange
  //Fill the dates for which transactions are available 
  element(by.xpath(xpathRepo.Quotes.StartDate)).click();
  browser.sleep(2000);
  element(by.xpath(xpathRepo.Quotes.Datepicker_Open+today()+xpathRepo.Transactions.CloseXpath)).click();
  browser.sleep(2000);
  
  element(by.xpath(xpathRepo.Quotes.EndDate)).click();
  browser.sleep(2000);
  
  element(by.xpath(xpathRepo.Quotes.Datepicker_Open+today()+xpathRepo.Transactions.CloseXpath)).click();
  browser.sleep(2000);
  
  //click on Search  button
  element(by.xpath(xpathRepo.ActivityLog.Search)).click();
  browser.sleep(2000);
  
  //Verify the transactions corresponding to the selected date-range are displayed
  element.all(by.xpath(xpathRepo.Transactions.ProductOffersList)).then(function(items){
  expect(items.length).toBe(3);
  });
  //#endregion HieraDispForSelectDateRange
  
  //Click on a PO
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  pos[0].click();
  browser.sleep(2000);
  });
  
  //Click on the PI
  element.all(by.xpath(xpathRepo.OfferCharge.PI_Selection)).then(function(pis){
  pis[0].click();
  browser.sleep(4000);
  });
  
  //Verify the details corresponding to the PI are displayed
  var pageContent =browser.getPageSource();
  expect(pageContent).toContain("41.67");
  
 
  //#region Trns_Data_PI_Sel_Dates
  //Fill the dates for which transactions are available 
  element(by.xpath(xpathRepo.Quotes.StartDate)).click();
  browser.sleep(2000);
  element(by.xpath(xpathRepo.Quotes.Datepicker_Open+yesterday()+xpathRepo.Transactions.CloseXpath)).click();
  browser.sleep(2000);
  
  element(by.xpath(xpathRepo.Quotes.EndDate)).click();
  browser.sleep(2000);
  
  element(by.xpath(xpathRepo.Quotes.Datepicker_Open+yesterday()+xpathRepo.Transactions.CloseXpath)).click();
  browser.sleep(2000);
  
  //click on Search  button
  element(by.xpath(xpathRepo.ActivityLog.Search)).click();
  browser.sleep(2000);
  
  //Verify the transactions corresponding to the selected date-range are displayed
  element.all(by.xpath(xpathRepo.Transactions.ProductOffersList)).then(function(items){
  expect(items.length).toBe(1);
  });
  //#endregion Trns_Data_PI_Sel_Dates
  
  //Click on a PO
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  pos[0].click();
  browser.sleep(2000);
  });
  
  //Click on the PI
  element.all(by.xpath(xpathRepo.OfferCharge.PI_Selection)).then(function(pis){
  pis[0].click();
  browser.sleep(4000);
  });
  
  //Verify the details corresponding to the PI are displayed
  var pageContent =browser.getPageSource();
  expect(pageContent).toContain("41.67");
  
  //Verify Localization
  expect(element(by.xpath(xpathRepo.OfferCharge.Header_Main+locale.TEXT_TRANSACTIONS+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.Transactions.Labels+locale.TEXT_SELECTED_BY+xpathRepo.Transactions.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.Transactions.Labels+locale.TEXT_SORT_BY+xpathRepo.Transactions.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.Transactions.Labels+locale.TEXT_START_DATE+xpathRepo.Transactions.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.Transactions.Labels+locale.TEXT_END_DATE+xpathRepo.Transactions.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.Transactions.Buttons+locale.TEXT_SEARCH+xpathRepo.Transactions.CloseXpath)).isDisplayed()).toBe(true);
  
  //#endregion TrnsDataForPIDisplayed
  
  protractor.loginHelpers.logOutMV();
  
  }
  
  //#endregion MVIEW2818
  
  //#region MVIEW2814 
  
  function MVIEW2814ViewAllSce1Corp(userName,password){
  
  var locale = protractor.loginHelpers.viewSelector();
  var dashboardLocale = protractor.loginHelpers.dashboard();
  
  //Launch to the MV2.0 application
  protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
  
  //Login to the MV2.0 application with Corporate Account
  protractor.loginHelpers.logInMV(userName,password);
  
  //Click on Layer Selector Dropdown
  element(by.xpath(xpathRepo.LayerSelector.Dropdown)).click();
  browser.sleep(5000);
  
  //Navigate to the Bills  page
  element(by.xpath(xpathRepo.LayerSelector.Bills)).click();
  browser.sleep(5000);
  
  //Select the Billing Period Dropdown
  element(by.xpath(xpathRepo.Billing.SelectPeriodInvoiceDropdown)).click();
  browser.sleep(5000);
  
  //Select the Period/Invoice for which charges are available
  element(by.xpath(xpathRepo.OfferCharge.Link+localizedDate()+" - "+localizedDate()+xpathRepo.OfferCharge.CloseXpath)).click();
  browser.sleep(7000);
  
  //Verify Localization
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_MISC_ADJUSTMENTS+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_NON_STANDARD_CHARGES+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.OfferCharge.ChargesSubtotal_Label)).getText()).toContain(dashboardLocale.TEXT_CHARGES_SUB_TOTAL);
  
  //div[contains(@class,'chargeTreeView')]//div[contains(@class,'nonofferingCharges')]//a[contains(text(),'Miscellaneous Adjustments')]
  //Under Charges Summary  widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  pos[0].click();
  browser.sleep(3000);
  pos[1].click();
  browser.sleep(3000);
  pos[2].click();
  browser.sleep(2000);
  });
  
  //Verify the parent node expands and the Priceable Item (the child node) is displayed under it
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isDisplayed()).toBe(true);
  
  //Verify the View All  link is present at the footer of the table
  expect(element(by.xpath(xpathRepo.OfferCharge.ViewAll_Footer+'footer'+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  
  //Verify Localization
  expect(element(by.xpath(xpathRepo.OfferCharge.ViewAll)).getText()).toContain(dashboardLocale.TEXT_VIEW_ALL+" >");
  
  //Click on the View All  link
  element(by.xpath(xpathRepo.OfferCharge.ViewAll)).click();
  browser.sleep(2000);
  
  //Verify the view is expanded and all data is shown
  element.all(by.xpath(xpathRepo.OfferCharge.PO_GroupUsage)).then(function(pos){
  expect(pos.length).toBe(3);
  });
  
  
  //Verify Localization
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_MISC_ADJUSTMENTS+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_NON_STANDARD_CHARGES+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.OfferCharge.ChargesSubtotal_Label)).getText()).toContain(dashboardLocale.TEXT_CHARGES_SUB_TOTAL);
  
  expect(element(by.xpath(xpathRepo.OfferCharge.OfferView_Active)).isDisplayed()).toBe(true);
  
  //Verify the close (x) button is displayed
  expect(element(by.xpath(xpathRepo.OfferCharge.CloseIcon+'close'+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  
  //Click on the close (x) button
  element(by.xpath(xpathRepo.OfferCharge.Close)).click();
  browser.sleep(2000);
  
  //and verify the expanded view closes
  var pageContent = browser.getPageSource();
  expect(pageContent).toContain(locale.MV_VIEW_BILLS);
  
  //Click on the Account View  tab
  element(by.xpath(xpathRepo.OfferCharge.AccountView_Pane)).click();
  browser.sleep(2000);
  
  //Click on the Account Name (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).then(function(accName){
  accName[0].click();
  browser.sleep(2000);
  });
  
  //Verify Localization
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_MISC_ADJUSTMENTS+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_NON_STANDARD_CHARGES+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  
  //Under Charges Summary widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  pos[0].click();
  browser.sleep(2000);
  });
  //Under Charges Summary widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  pos[1].click();
  browser.sleep(2000);
  });
  
  //Verify the View All  link is present at the footer of the table
  expect(element(by.xpath(xpathRepo.OfferCharge.ViewAll_Footer+'footer'+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.OfferCharge.ViewAll)).getText()).toContain(dashboardLocale.TEXT_VIEW_ALL+" >");
  
  //Click on the View All  link
  element(by.xpath(xpathRepo.OfferCharge.ViewAll)).click();
  browser.sleep(2000);
  
  //Verify Localization
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_MISC_ADJUSTMENTS+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_NON_STANDARD_CHARGES+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.OfferCharge.ChargesSubtotal_Label)).getText()).toContain(dashboardLocale.TEXT_CHARGES_SUB_TOTAL);
  
  expect(element(by.xpath(xpathRepo.OfferCharge.AccountView_Active)).isDisplayed()).toBe(true);
  
  //Verify the view is expanded and all data is shown
  element.all(by.xpath(xpathRepo.OfferCharge.MultiplePO)).then(function(pos){
  expect(pos.length).not.toBe(0);
  
  });
  
  //Under Charges Summary widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  pos[2].click();
  browser.sleep(2000);
  });
  
  //Under Charges Summary widget, click on the Child Node
  element.all(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).then(function(pos){
  pos[1].click();
  browser.sleep(2000);
  });
  
  element.all(by.xpath(xpathRepo.OfferCharge.ChargesSubtotal_Label)).then(function(items){
  //Verify the vertical scroll bar is present and could be dragged down
  browser.executeScript('arguments[0].scrollIntoView()', items[0].getWebElement());
  browser.sleep(3000);
  });
  
  //Click on the Account Name (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.Name+dashboardLocale.TEXT_NAME+xpathRepo.Transactions.CloseXpath)).then(function(accName){
  //Verify the vertical scroll bar is present and could be dragged up
  browser.executeScript('arguments[0].scrollIntoView()',accName[0]);
  browser.sleep(3000);
  });
  
  element.all(by.xpath(xpathRepo.OfferCharge.ChargesSubtotal_Label)).then(function(items){
  //Verify the vertical scroll bar is present and could be dragged down
  browser.executeScript('arguments[0].scrollIntoView()', items[0].getWebElement());
  browser.sleep(3000);
  });
  
  //Verify the close (x) button is displayed
  expect(element(by.xpath(xpathRepo.OfferCharge.CloseIcon+'close'+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  
  //Click on the close (x) button
  element(by.xpath(xpathRepo.OfferCharge.Close)).click();
  browser.sleep(2000);
  
  //and verify the expanded view closes
  var pageContent = browser.getPageSource();
  expect(pageContent).toContain(locale.MV_VIEW_BILLS);
  
  
  }
  
  function MVIEW2814ViewAllSce1Dept(userName,password){
  
  var locale = protractor.loginHelpers.viewSelector();
  var dashboardLocale = protractor.loginHelpers.dashboard();
  
  //Launch to the MV2.0 application
  protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
  
  //Login to the MV2.0 application with Corporate Account
  protractor.loginHelpers.logInMV(userName,password);
  
  //Click on Layer Selector Dropdown
  element(by.xpath(xpathRepo.LayerSelector.Dropdown)).click();
  browser.sleep(5000);
  
  //Navigate to the Bills  page
  element(by.xpath(xpathRepo.LayerSelector.Bills)).click();
  browser.sleep(5000);
  
  //Select the Billing Period Dropdown
  element(by.xpath(xpathRepo.Billing.SelectPeriodInvoiceDropdown)).click();
  browser.sleep(1000);
  
  //Select the Period/Invoice for which charges are available
  element(by.xpath(xpathRepo.OfferCharge.Link+localizedDate()+" - "+localizedDate()+xpathRepo.OfferCharge.CloseXpath)).click();
  browser.sleep(7000);
  
  //Verify Localization
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_MISC_ADJUSTMENTS+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_NON_STANDARD_CHARGES+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.OfferCharge.ChargesSubtotal_Label)).getText()).toContain(dashboardLocale.TEXT_CHARGES_SUB_TOTAL);
  
  
  //Under Charges Summary  widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  pos[0].click();
  browser.sleep(3000);
  pos[1].click();
  browser.sleep(3000);
  pos[2].click();
  browser.sleep(2000);
  });
  
  //Verify the parent node expands and the Priceable Item (the child node) is displayed under it
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isDisplayed()).toBe(true);
  
  //Verify the View All  link is present at the footer of the table
  expect(element(by.xpath(xpathRepo.OfferCharge.ViewAll_Footer+'footer'+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  
  //Verify Localization
  expect(element(by.xpath(xpathRepo.OfferCharge.ViewAll)).getText()).toEqual(dashboardLocale.TEXT_VIEW_ALL+" >");
  
  //Click on the View All  link
  element(by.xpath(xpathRepo.OfferCharge.ViewAll)).click();
  browser.sleep(2000);
  
  //Verify the view is expanded and all data is shown
  element.all(by.xpath(xpathRepo.OfferCharge.PO_GroupUsage)).then(function(pos){
  expect(pos.length).toBe(3);
  });
  
  //Verify Localization
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_MISC_ADJUSTMENTS+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_NON_STANDARD_CHARGES+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.OfferCharge.ChargesSubtotal_Label)).getText()).toContain(dashboardLocale.TEXT_CHARGES_SUB_TOTAL);
  
  expect(element(by.xpath(xpathRepo.OfferCharge.OfferView_Active)).isDisplayed()).toBe(true);
  
  //Verify the close (x) button is displayed
  expect(element(by.xpath(xpathRepo.OfferCharge.CloseIcon+'close'+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  
  //Click on the close (x) button
  element(by.xpath(xpathRepo.OfferCharge.Close)).click();
  browser.sleep(2000);
  
  //and verify the expanded view closes
  var pageContent = browser.getPageSource();
  expect(pageContent).toContain(locale.MV_VIEW_BILLS);
  
  //Click on the Account View  tab
  element(by.xpath(xpathRepo.OfferCharge.AccountView_Pane)).click();
  browser.sleep(2000);
  
  expect(element(by.xpath(xpathRepo.OfferCharge.ChargesSubtotal_Label)).getText()).toContain(dashboardLocale.TEXT_CHARGES_SUB_TOTAL);
  
  //Click on the Account Name (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).then(function(accName){
  accName[0].click();
  browser.sleep(2000);
  });
  
  //Click on the Account Name (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).then(function(accName){
  accName[1].click();
  browser.sleep(2000);
  });
  
  //Under Charges Summary widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  pos[0].click();
  browser.sleep(2000);
  });
  
  //Verify the View All  link is present at the footer of the table
  expect(element(by.xpath(xpathRepo.OfferCharge.ViewAll_Footer+'footer'+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.OfferCharge.ViewAll)).getText()).toContain(dashboardLocale.TEXT_VIEW_ALL+" >");
  
  //Click on the View All  link
  element(by.xpath(xpathRepo.OfferCharge.ViewAll)).click();
  browser.sleep(2000);
  
  //Verify Localization
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_MISC_ADJUSTMENTS+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_NON_STANDARD_CHARGES+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.OfferCharge.ChargesSubtotal_Label)).getText()).toContain(dashboardLocale.TEXT_CHARGES_SUB_TOTAL);
  
  expect(element(by.xpath(xpathRepo.OfferCharge.AccountView_Active)).isDisplayed()).toBe(true);
  
  //Verify the view is expanded and all data is shown
  element.all(by.xpath(xpathRepo.OfferCharge.MultiplePO)).then(function(pos){
  expect(pos.length).not.toBe(0);
  });
  
  //Under Charges Summary widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  pos[1].click();
  browser.sleep(2000);
  pos[2].click();
  browser.sleep(2000);
  });
  
  //Under Charges Summary widget, click on the Child Node
  element.all(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).then(function(pos){
  pos[2].click();
  browser.sleep(2000);
  });
  
  //Under Charges Summary widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  pos[4].click();
  browser.sleep(2000);
  pos[5].click();
  browser.sleep(2000);
  });
  
  element.all(by.xpath(xpathRepo.OfferCharge.ChargesSubtotal_Label)).then(function(items){
  //Verify the vertical scroll bar is present and could be dragged down
  browser.executeScript('arguments[0].scrollIntoView()', items[0].getWebElement());
  browser.sleep(3000);
  });
  
  //Click on the Account Name (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.Name+dashboardLocale.TEXT_NAME+xpathRepo.Transactions.CloseXpath)).then(function(accName){
  //Verify the vertical scroll bar is present and could be dragged up
  browser.executeScript('arguments[0].scrollIntoView()',accName[0]);
  browser.sleep(3000);
  });
  
  element.all(by.xpath(xpathRepo.OfferCharge.ChargesSubtotal_Label)).then(function(items){
  //Verify the vertical scroll bar is present and could be dragged down
  browser.executeScript('arguments[0].scrollIntoView()', items[0].getWebElement());
  browser.sleep(3000);
  });
  
  //Verify the close (x) button is displayed
  expect(element(by.xpath(xpathRepo.OfferCharge.CloseIcon+'close'+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  
  //Click on the close (x) button
  element(by.xpath(xpathRepo.OfferCharge.Close)).click();
  browser.sleep(2000);
  
  //and verify the expanded view closes
  var pageContent = browser.getPageSource();
  expect(pageContent).toContain(locale.MV_VIEW_BILLS);
  
  
  }
  
  function MVIEW2814ViewAllCommon(userName,password){
  
  var locale = protractor.loginHelpers.viewSelector();
  var dashboardLocale = protractor.loginHelpers.dashboard();
  
  //Launch to the MV2.0 application
  protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
  
  //Login to the MV2.0 application with Corporate Account
  protractor.loginHelpers.logInMV(userName,password);
  
  //Click on Layer Selector Dropdown
  element(by.xpath(xpathRepo.LayerSelector.Dropdown)).click();
  browser.sleep(5000);
  
  //Navigate to the Bills  page
  element(by.xpath(xpathRepo.LayerSelector.Bills)).click();
  browser.sleep(5000);
  
  //Select the Billing Period Dropdown
  element(by.xpath(xpathRepo.Billing.SelectPeriodInvoiceDropdown)).click();
  browser.sleep(5000);
  
  //Select the Period/Invoice for which charges are available
  element(by.xpath(xpathRepo.OfferCharge.Link+localizedDate()+" - "+localizedDate()+xpathRepo.OfferCharge.CloseXpath)).click();
  browser.sleep(7000);
  
  //Verify Localization
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_MISC_ADJUSTMENTS+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_NON_STANDARD_CHARGES+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.OfferCharge.ChargesSubtotal_Label)).getText()).toContain(dashboardLocale.TEXT_CHARGES_SUB_TOTAL);
  
  
  //Under Charges Summary  widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  pos[0].click();
  browser.sleep(3000);
  pos[1].click();
  browser.sleep(3000);
  pos[2].click();
  browser.sleep(2000);
  });
  
  //Verify the parent node expands and the Priceable Item (the child node) is displayed under it
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isDisplayed()).toBe(true);
  
  //Verify the View All  link is present at the footer of the table
  expect(element(by.xpath(xpathRepo.OfferCharge.ViewAll_Footer+'footer'+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  
  //Verify Localization
  expect(element(by.xpath(xpathRepo.OfferCharge.ViewAll)).getText()).toEqual(dashboardLocale.TEXT_VIEW_ALL+" >");
  
  //Click on the View All  link
  element(by.xpath(xpathRepo.OfferCharge.ViewAll)).click();
  browser.sleep(2000);
  
  //Verify the view is expanded and all data is shown
  element.all(by.xpath(xpathRepo.OfferCharge.PO_GroupUsage)).then(function(pos){
  expect(pos.length).toBe(3);
  });
  
  //Verify Localization
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_MISC_ADJUSTMENTS+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_NON_STANDARD_CHARGES+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.OfferCharge.ChargesSubtotal_Label)).getText()).toContain(dashboardLocale.TEXT_CHARGES_SUB_TOTAL);
  
  expect(element(by.xpath(xpathRepo.OfferCharge.OfferView_Active)).isDisplayed()).toBe(true);
  
  //Verify the close (x) button is displayed
  expect(element(by.xpath(xpathRepo.OfferCharge.CloseIcon+'close'+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  
  //Click on the close (x) button
  element(by.xpath(xpathRepo.OfferCharge.Close)).click();
  browser.sleep(2000);
  
  //and verify the expanded view closes
  var pageContent = browser.getPageSource();
  expect(pageContent).toContain(locale.MV_VIEW_BILLS);
  
  //Click on the Account View  tab
  element(by.xpath(xpathRepo.OfferCharge.AccountView_Pane)).click();
  browser.sleep(6000);
  
  expect(element(by.xpath(xpathRepo.OfferCharge.ChargesSubtotal_Label)).getText()).toContain(dashboardLocale.TEXT_CHARGES_SUB_TOTAL);
  
  //Click on the Account Name (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).then(function(accName){
  accName[0].click();
  browser.sleep(2000);
  });
  
  // //Click on the Account Name (the parent node)
  // element.all(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).then(function(accName){
  // accName[1].click();
  // browser.sleep(2000);
  // });
  
  //Under Charges Summary widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  pos[0].click();
  browser.sleep(2000);
  });
  
  //Verify Localization
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_MISC_ADJUSTMENTS+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  
  //Verify the View All  link is present at the footer of the table
  expect(element(by.xpath(xpathRepo.OfferCharge.ViewAll_Footer+'footer'+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.OfferCharge.ViewAll)).getText()).toContain(dashboardLocale.TEXT_VIEW_ALL+" >");
  
  //Click on the View All  link
  element(by.xpath(xpathRepo.OfferCharge.ViewAll)).click();
  browser.sleep(2000);
  
  //Verify Localization
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_MISC_ADJUSTMENTS+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_NON_STANDARD_CHARGES+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.OfferCharge.ChargesSubtotal_Label)).getText()).toContain(dashboardLocale.TEXT_CHARGES_SUB_TOTAL);
  
  expect(element(by.xpath(xpathRepo.OfferCharge.AccountView_Active)).isDisplayed()).toBe(true);
  
  //Verify the view is expanded and all data is shown
  element.all(by.xpath(xpathRepo.OfferCharge.MultiplePO)).then(function(pos){
  expect(pos.length).not.toBe(0);
  });
  
  //Under Charges Summary widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  pos[1].click();
  browser.sleep(2000);
  pos[2].click();
  browser.sleep(5000);
  });
  
  //Under Charges Summary widget, click on the Child Node
  element.all(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).then(function(pos){
  pos[1].click();
  browser.sleep(2000);
  });
  
  //Under Charges Summary widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  pos[4].click();
  browser.sleep(2000);
  pos[5].click();
  browser.sleep(2000);
  });
  
  element.all(by.xpath(xpathRepo.OfferCharge.ChargesSubtotal_Label)).then(function(items){
  //Verify the vertical scroll bar is present and could be dragged down
  browser.executeScript('arguments[0].scrollIntoView()', items[0].getWebElement());
  browser.sleep(3000);
  });
  
  //Click on the Account Name (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.Name+dashboardLocale.TEXT_NAME+xpathRepo.Transactions.CloseXpath)).then(function(accName){
  //Verify the vertical scroll bar is present and could be dragged up
  browser.executeScript('arguments[0].scrollIntoView()',accName[0]);
  browser.sleep(3000);
  });
  
  element.all(by.xpath(xpathRepo.OfferCharge.ChargesSubtotal_Label)).then(function(items){
  //Verify the vertical scroll bar is present and could be dragged down
  browser.executeScript('arguments[0].scrollIntoView()', items[0].getWebElement());
  browser.sleep(3000);
  });
  
  //Verify the close (x) button is displayed
  expect(element(by.xpath(xpathRepo.OfferCharge.CloseIcon+'close'+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  
  //Click on the close (x) button
  element(by.xpath(xpathRepo.OfferCharge.Close)).click();
  browser.sleep(2000);
  
  //and verify the expanded view closes
  var pageContent = browser.getPageSource();
  expect(pageContent).toContain(locale.MV_VIEW_BILLS);
  
  
  }
  //#endregion MVIEW2814
  
  //#region MVIEW2812 
  
  function MVIEW2812ClickParentNodeExpSce1Corp(userName,password){
  
  var locale = protractor.loginHelpers.viewSelector();
  var dashboardLocale = protractor.loginHelpers.dashboard();
  
  //Launch to the MV2.0 application
  protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
  
  //Login to the MV2.0 application with Corporate Account
  protractor.loginHelpers.logInMV(userName,password);
  
  //Click on Layer Selector Dropdown
  element(by.xpath(xpathRepo.LayerSelector.Dropdown)).click();
  browser.sleep(3000);
  
  //Navigate to the Bills  page
  element(by.xpath(xpathRepo.LayerSelector.Bills)).click();
  browser.sleep(5000);
  
  //Select the Billing Period Dropdown
  element(by.xpath(xpathRepo.Billing.SelectPeriodInvoiceDropdown)).click();
  browser.sleep(3000);
  
  //Select the Period/Invoice for which charges are available
  element(by.xpath(xpathRepo.OfferCharge.Link+localizedDate()+" - "+localizedDate()+xpathRepo.OfferCharge.CloseXpath)).click();
  browser.sleep(7000);
  
  //Verify Localization
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_MISC_ADJUSTMENTS+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_NON_STANDARD_CHARGES+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.OfferCharge.ChargesSubtotal_Label)).getText()).toContain(dashboardLocale.TEXT_CHARGES_SUB_TOTAL);
  
  //Under Charges Summary  widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  pos[0].click();
  browser.sleep(3000);
  });
  
  //Verify the parent node expands and the Priceable Item (the child node) is displayed under it
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isDisplayed()).toBe(true);
  
  //Validates that No 'Back' link is visible beside PI in Tree  view
  expect(element(by.xpath(xpathRepo.OfferCharge.Back_Button)).isDisplayed()).not.toBe(true);
  browser.sleep(1000);
  
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  pos[0].click();
  browser.sleep(1000);
  });
  
  //Validates that Parent PO link is not visible in Tree  view
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_OrderCookies_Label)).isDisplayed()).not.toBe(true);
  
  //CLick on 2nd PO link
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  pos[1].click();
  browser.sleep(3000);
  });
  //Verify the parent node expands and the Priceable Item (the child node) is displayed under it
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isPresent()).toBe(true);
  browser.sleep(1000);
  //Validates that  No <Back  link is visible
  expect(element(by.xpath(xpathRepo.OfferCharge.Back_Button)).isDisplayed()).not.toBe(true);
  browser.sleep(1000);
  
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  pos[1].click();
  browser.sleep(1000);
  });
  //Validates that Parent PO link is not visible in Tree  view
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_FlatRecurringChage_Label)).isDisplayed()).not.toBe(true);
  browser.sleep(3000);
  
  //=========================== Account View Tab ====================
  //Click on the Account View  tab
  element(by.xpath(xpathRepo.OfferCharge.AccountView_Pane)).click();
  browser.sleep(2000);
  
  //Click on the Account Name (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).then(function(accName){
  accName[0].click();
  browser.sleep(2000);
  });
  
  //Under Charges Summary widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PO_GroupUsage)).then(function(pos){
  pos[0].click();
  browser.sleep(2000);
  });
  
  //Verify the parent node expands and the Priceable Item (the child node) is displayed under it
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isPresent()).toBe(true);
  
  //Validates that No 'Back' link is visible beside PI in Tree  view
  expect(element(by.xpath(xpathRepo.OfferCharge.Back_Button)).isDisplayed()).not.toBe(true);
  
  
  //Under Charges Summary widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PO_GroupUsage)).then(function(pos){
  pos[0].click();
  browser.sleep(3000);
  });
  
  element.all(by.xpath(xpathRepo.OfferCharge.PI_Selection)).then(function(items){
  expect(items[0])
  });
  
  //Validates that Parent PO link is not visible in Tree  view
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_OrderCookies_Label)).isDisplayed()).not.toBe(true);
  browser.sleep(3000);
  
  //===========2nd PO===============
  
  //Under Charges Summary widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PO_GroupUsage)).then(function(pos){
  pos[1].click();
  browser.sleep(3000);
  });
  
  //Verify the parent node expands and the Priceable Item (the child node) is displayed under it
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isDisplayed()).toBe(true);
  
  //Validates that No 'Back' link is visible beside PI in Tree  view
  expect(element(by.xpath(xpathRepo.OfferCharge.Back_Button)).isDisplayed()).not.toBe(true);
  
  //Under Charges Summary widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PO_GroupUsage)).then(function(pos){
  pos[1].click();
  browser.sleep(2000);
  });
  
  //Validates that Parent PO link is not visible in Tree  view
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_FlatRecurringChage_Label)).isDisplayed()).not.toBe(true);
  browser.sleep(3000);
  
  //Verify Localization
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_MISC_ADJUSTMENTS+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_NON_STANDARD_CHARGES+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  
  //=================2nd Account Name(Department Account)===========================
  //Click on the Account Name (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).then(function(accName){
  accName[1].click();
  browser.sleep(5000);
  });

  //Click on 'ViewAll' link
  element(by.xpath(xpathRepo.OfferCharge.ViewAll_Link)).click();

  //Under Charges Summary widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PO_GroupUsage)).then(function(pos){
  pos[3].click();
  browser.sleep(3000);
  });
   
  //Verify the parent node expands and the Priceable Item (the child node) is displayed under it
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isPresent()).toBe(true);
  
  //Validates that No 'Back' link is visible beside PI in Tree  view
  expect(element(by.xpath(xpathRepo.OfferCharge.Back_Button)).isDisplayed()).not.toBe(true);
  
  //Under Charges Summary widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PO_GroupUsage)).then(function(pos){
  pos[3].click();
  browser.sleep(5000);
  });
  
  //Validates that Parent PO link is not visible in Tree  view
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_OrderCookies_Label)).isDisplayed()).not.toBe(true);
  browser.sleep(3000);
  
  //==============================2nd PO===================
  
  //Under Charges Summary widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PO_GroupUsage)).then(function(pos){
  pos[4].click();
  browser.sleep(3000);
  });
  
  //Verify the parent node expands and the Priceable Item (the child node) is displayed under it
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isDisplayed()).toBe(true);
  
  expect(element(by.xpath(xpathRepo.OfferCharge.Back_Button)).isDisplayed()).not.toBe(true);
  browser.sleep(3000);
  
  //Click on the Account Name (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PO_GroupUsage)).then(function(pos){
  pos[4].click();
  browser.sleep(3000);
  });
  
  //Verify the parent node expands and the Priceable Item (the child node) is displayed under it
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_FlatRecurringChage_Label)).isDisplayed()).not.toBe(true);
  browser.sleep(3000);         
  
  }
  
  function MVIEW2812ClickParentNodeExpSce1Dept(userName,password){
  
  var locale = protractor.loginHelpers.viewSelector();
  var dashboardLocale = protractor.loginHelpers.dashboard();
  
  //Launch to the MV2.0 application
  protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
  
  //Login to the MV2.0 application with Corporate Account
  protractor.loginHelpers.logInMV(userName,password);
  browser.sleep(5000);
  
  //Click on Layer Selector Dropdown
  element(by.xpath(xpathRepo.LayerSelector.Dropdown)).click();
  
  //Navigate to the Bills  page
  element(by.xpath(xpathRepo.LayerSelector.Bills)).click();
  browser.sleep(5000);
  
  //Select the Billing Period Dropdown
  element(by.xpath(xpathRepo.Billing.SelectPeriodInvoiceDropdown)).click();
  browser.sleep(3000);
  
  //Select the Period/Invoice for which charges are available
  element(by.xpath(xpathRepo.OfferCharge.Link+localizedDate()+" - "+localizedDate()+xpathRepo.OfferCharge.CloseXpath)).click();
  browser.sleep(1000);
  
  //========================== 1st PO ================================
  //Under Charges Summary widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PO_GroupUsage)).then(function(pos){
  pos[0].click();
  browser.sleep(2000);
  });
  
  //Verify the parent node expands and the Priceable Item (the child node) is displayed under it
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isPresent()).toBe(true);
  browser.sleep(5000);
  //Verify no <Back  link is visible
  expect(element(by.xpath(xpathRepo.OfferCharge.Back_Button)).isDisplayed()).not.toBe(true);
  browser.sleep(2000);
  
  //Under Charges Summary widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PO_GroupUsage)).then(function(pos){
  pos[0].click();
  browser.sleep(3000);
  });
  
  //Validates that the parent node collapses and the child nodes are not displayed
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_OrderCookies_Label)).isDisplayed()).not.toBe(true);
  browser.sleep(3000);
  //======================== 2nd PO ===================
  //Under Charges Summary  widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  pos[1].click();
  browser.sleep(3000);
  });
  
  //Verify the parent node expands and the Priceable Item (the child node) is displayed under it
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isPresent()).toBe(true);
  
  //Validates that no <Back  link is visible
  expect(element(by.xpath(xpathRepo.OfferCharge.Back_Button)).isDisplayed()).not.toBe(true);
  browser.sleep(3000);
  
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  pos[1].click();
  browser.sleep(3000);
  });
  
  //Validates that the parent node collapses and the child nodes are not displayed
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_FlatRecurringChage_Label)).isDisplayed()).not.toBe(true);
  browser.sleep(2000);
  
  //Verify Localization
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_MISC_ADJUSTMENTS+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_NON_STANDARD_CHARGES+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.OfferCharge.ChargesSubtotal_Label)).getText()).toContain(dashboardLocale.TEXT_CHARGES_SUB_TOTAL);
  
  //=======================================Account View Pane======================
  //Click on the Account View  tab
  element(by.xpath(xpathRepo.OfferCharge.AccountView_Pane)).click();
  browser.sleep(2000);
  
  //Click on the Account Name (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).then(function(accName){
  accName[0].click();
  browser.sleep(5000);
  });
  
  //========== 1st Core Account Name (Child) =============
  //Click on the Account Name (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).then(function(accName){
  accName[1].click();
  browser.sleep(3000);
  });
  
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  pos[0].click();
  browser.sleep(3000);
  });
  
  //Verify the parent node expands and the Priceable Item (the child node) is displayed under it
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isPresent()).toBe(true);
  browser.sleep(3000);
  
  //Validates that no <Back  link is visible
  expect(element(by.xpath(xpathRepo.OfferCharge.Back_Button)).isDisplayed()).not.toBe(true);
  browser.sleep(3000);
  
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  pos[0].click();
  browser.sleep(3000);
  });
  
  //Validates that the parent node collapses and the child nodes are not displayed
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_OrderCookies_Label)).isDisplayed()).not.toBe(true);
  
  //======= 2nd PO under 1st Core Account ===============
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  pos[1].click();
  browser.sleep(3000);
  });
  
  //Verify the parent node expands and the Priceable Item (the child node) is displayed under it
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isPresent()).toBe(true);
  
  //Validates that no <Back  link is visible
  expect(element(by.xpath(xpathRepo.OfferCharge.Back_Button)).isDisplayed()).not.toBe(true);
  browser.sleep(3000);
  
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  pos[1].click();
  browser.sleep(3000);
  });
  
  //Validates that the parent node collapses and the child nodes are not displayed
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_FlatRecurringChage_Label)).isDisplayed()).not.toBe(true);
  browser.sleep(3000);
  
  //Verify Localization
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_MISC_ADJUSTMENTS+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_NON_STANDARD_CHARGES+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  
  }
  
  function MVIEW2812ClickParentNodeExpCommon(userName,password){
  
  var locale = protractor.loginHelpers.viewSelector();
  var dashboardLocale = protractor.loginHelpers.dashboard();
  
  //Launch to the MV2.0 application
  protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
  
  //Login to the MV2.0 application with Corporate Account
  protractor.loginHelpers.logInMV(userName,password);
  
  //Click on Layer Selector Dropdown
  element(by.xpath(xpathRepo.LayerSelector.Dropdown)).click();
  browser.sleep(5000);
  
  //Navigate to the Bills  page
  element(by.xpath(xpathRepo.LayerSelector.Bills)).click();
  browser.sleep(5000);
  
  //Select the Billing Period Dropdown
  element(by.xpath(xpathRepo.Billing.SelectPeriodInvoiceDropdown)).click();
  browser.sleep(3000);
  
  //Select the Period/Invoice for which charges are available
  element(by.xpath(xpathRepo.OfferCharge.Link+localizedDate()+" - "+localizedDate()+xpathRepo.OfferCharge.CloseXpath)).click();
  browser.sleep(3000);
  
  //========================== 1st PO ================================
  //Under Charges Summary widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PO_GroupUsage)).then(function(pos){
  pos[0].click();
  browser.sleep(2000);
  });
  
  //Verify the parent node expands and the Priceable Item (the child node) is displayed under it
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isPresent()).toBe(true);
  browser.sleep(5000);
  //Verify no <Back  link is visible
  expect(element(by.xpath(xpathRepo.OfferCharge.Back_Button)).isDisplayed()).not.toBe(true);
  browser.sleep(2000);
  
  //Under Charges Summary widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PO_GroupUsage)).then(function(pos){
  pos[0].click();
  browser.sleep(3000);
  });
  
  //Validates that the parent node collapses and the child nodes are not displayed
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_OrderCookies_Label)).isDisplayed()).not.toBe(true);
  browser.sleep(3000);
  //======================== 2nd PO ===================
  //Under Charges Summary  widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  pos[1].click();
  browser.sleep(3000);
  });
  
  //Verify the parent node expands and the Priceable Item (the child node) is displayed under it
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isPresent()).toBe(true);
  
  //Validates that no <Back  link is visible
  expect(element(by.xpath(xpathRepo.OfferCharge.Back_Button)).isDisplayed()).not.toBe(true);
  browser.sleep(3000);
  
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  pos[1].click();
  browser.sleep(3000);
  });
  
  //Validates that the parent node collapses and the child nodes are not displayed
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_FlatRecurringChage_Label)).isDisplayed()).not.toBe(true);
  browser.sleep(2000);
  
  //======================== 3rd PO ===================
  //Under Charges Summary  widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  pos[2].click();
  browser.sleep(3000);
  });
  
  //Verify the parent node expands and the Priceable Item (the child node) is displayed under it
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isPresent()).toBe(true);
  
  //Validates that no <Back  link is visible
  expect(element(by.xpath(xpathRepo.OfferCharge.Back_Button)).isDisplayed()).not.toBe(true);
  browser.sleep(3000);
  
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  pos[2].click();
  browser.sleep(3000);
  });
  
  //Validates that the parent node collapses and the child nodes are not displayed
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_UnitDependentRecurringCharge_Label)).isDisplayed()).not.toBe(true);
  browser.sleep(2000);
  
  //Verify Localization
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_MISC_ADJUSTMENTS+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_NON_STANDARD_CHARGES+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.OfferCharge.ChargesSubtotal_Label)).getText()).toContain(dashboardLocale.TEXT_CHARGES_SUB_TOTAL);
  
  //=========================== Account View Tab ====================
  //Click on the Account View  tab
  element(by.xpath(xpathRepo.OfferCharge.AccountView_Pane)).click();
  browser.sleep(2000);
  
  //Click on the Account Name (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).then(function(accName){
  accName[0].click();
  browser.sleep(2000);
  });
  
  //Under Charges Summary widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PO_GroupUsage)).then(function(pos){
  pos[0].click();
  browser.sleep(2000);
  });
  
  //Verify the parent node expands and the Priceable Item (the child node) is displayed under it
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isPresent()).toBe(true);
  
  //Validates that No 'Back' link is visible beside PI in Tree  view
  expect(element(by.xpath(xpathRepo.OfferCharge.Back_Button)).isDisplayed()).not.toBe(true);
  
  //Under Charges Summary widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PO_GroupUsage)).then(function(pos){
  pos[0].click();
  browser.sleep(3000);
  });
  
  element.all(by.xpath(xpathRepo.OfferCharge.PI_Selection)).then(function(items){
  expect(items[0])
  });
  
  //Validates that Parent PO link is not visible in Tree  view
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_OrderCookies_Label)).isDisplayed()).not.toBe(true);
  browser.sleep(3000);
  
  //=========== 2nd PO ===============
  
  //Under Charges Summary widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PO_GroupUsage)).then(function(pos){
  pos[1].click();
  browser.sleep(3000);
  });
  
  //Verify the parent node expands and the Priceable Item (the child node) is displayed under it
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isDisplayed()).toBe(true);
  
  //Validates that No 'Back' link is visible beside PI in Tree  view
  expect(element(by.xpath(xpathRepo.OfferCharge.Back_Button)).isDisplayed()).not.toBe(true);
  
  //Under Charges Summary widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PO_GroupUsage)).then(function(pos){
  pos[1].click();
  browser.sleep(2000);
  });
  
  //Validates that Parent PO link is not visible in Tree  view
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_FlatRecurringChage_Label)).isDisplayed()).not.toBe(true);
  browser.sleep(3000);
  
  //======================== 3rd PO ===================
  //Under Charges Summary  widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  pos[2].click();
  browser.sleep(3000);
  });
  
  //Verify the parent node expands and the Priceable Item (the child node) is displayed under it
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isPresent()).toBe(true);
  
  //Validates that no <Back  link is visible
  expect(element(by.xpath(xpathRepo.OfferCharge.Back_Button)).isDisplayed()).not.toBe(true);
  browser.sleep(3000);
  
  element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
  pos[2].click();
  browser.sleep(3000);
  });
  
  //Validates that the parent node collapses and the child nodes are not displayed
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_UnitDependentRecurringCharge_Label)).isDisplayed()).not.toBe(true);
  browser.sleep(2000);
  
  //Verify Localization
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_MISC_ADJUSTMENTS+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  expect(element(by.xpath(xpathRepo.OfferCharge.NonOfferCharges_Label+dashboardLocale.TEXT_NON_STANDARD_CHARGES+xpathRepo.OfferCharge.CloseXpath)).isDisplayed()).toBe(true);
  
  //================= 2nd Account Name(Department Account )===========================
  //Click on the Account Name (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).then(function(accName){
  accName[1].click();
  browser.sleep(5000);
  });
  
  //Click on 'ViewAll' link
  element(by.xpath(xpathRepo.OfferCharge.ViewAll_Link)).click();
  
  //Under Charges Summary widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PO_GroupUsage)).then(function(pos){
  pos[3].click();
  browser.sleep(3000);
  });
  
  //Verify the parent node expands and the Priceable Item (the child node) is displayed under it
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isPresent()).toBe(true);
  
  //Validates that No 'Back' link is visible beside PI in Tree  view
  expect(element(by.xpath(xpathRepo.OfferCharge.Back_Button)).isDisplayed()).not.toBe(true);
  
  //Under Charges Summary widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PO_GroupUsage)).then(function(pos){
  pos[3].click();
  browser.sleep(5000);
  });
  
  //Validates that Parent PO link is not visible in Tree  view
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_OrderCookies_Label)).isDisplayed()).not.toBe(true);
  browser.sleep(3000);
  
  //============================== 2nd PO ===================
  
  //Under Charges Summary widget, click on the PO (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PO_GroupUsage)).then(function(pos){
  pos[4].click();
  browser.sleep(3000);
  });
  
  
  //Verify the parent node expands and the Priceable Item (the child node) is displayed under it
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isDisplayed()).toBe(true);
  
  expect(element(by.xpath(xpathRepo.OfferCharge.Back_Button)).isDisplayed()).not.toBe(true);
  browser.sleep(3000);
  
  //Click on the Account Name (the parent node)
  element.all(by.xpath(xpathRepo.OfferCharge.PO_GroupUsage)).then(function(pos){
  pos[4].click();
  browser.sleep(3000);
  });
  //Verify the parent node expands and the Priceable Item (the child node) is displayed under it
  expect(element(by.xpath(xpathRepo.OfferCharge.PI_FlatRecurringChage_Label)).isDisplayed()).not.toBe(true);
  browser.sleep(3000);  
  
  }
  //#endregion MVIEW2812
  
  //#region Common
  
  function localizedDate(){
    
  var testdata5 =protractor.loginHelpers.langCode;
  var today = new Date();
  var yyyy = today.getFullYear();
  yy = yyyy.toString().substr(-2);
  switch (testdata5) {
  case "BR":
  var d = "0"+ today.getDate();
  var dd = d.toString().substr(-2);
  var m = today.getMonth()+1;
  var m2="0"+m;
  var mm= m2.toString().substr(-2);  //January is 0!
  var endDate= new Date();
  endDate = dd+"/"+mm+"/"+yyyy;
  break;
  case "DE":
  var d = "0"+ today.getDate();
  var dd = d.toString().substr(-2);
  var m = today.getMonth()+1;
  var m2="0"+m;
  var mm= m2.toString().substr(-2);  //January is 0!
  var endDate= new Date();
  endDate = dd+"."+mm+"."+yyyy;
  break;
  case "EG":
  var d =  "0"+today.getDate();
  var dd = d.toString().substr(-2);
  var m = today.getMonth()+1;
  var m2="0"+m;
  var mm= m2.toString().substr(-2);  //January is 0!
  var endDate= new Date();
  endDate = mm+"/"+dd+"/"+yyyy;
  break;
  case "ES":
  var d = "0"+ today.getDate();
  var dd = d.toString().substr(-2);
  var m = today.getMonth()+1;
  var m2="0"+m;
  var mm= m2.toString().substr(-2);  //January is 0!
  var endDate= new Date();
  endDate = dd+"/"+mm+"/"+yyyy;
  break;
  case "FR":
  var d = "0"+ today.getDate();
  var dd = d.toString().substr(-2);
  var m = today.getMonth()+1;
  var m2="0"+m;
  var mm= m2.toString().substr(-2);  //January is 0!
  var endDate= new Date();
  endDate = dd+"/"+mm+"/"+yyyy;
  break;
  case "GB":
  var d = "0"+ today.getDate();
  var dd = d.toString().substr(-2);
  var m = today.getMonth()+1;
  var m2="0"+m;
  var mm= m2.toString().substr(-2);  //January is 0!
  var endDate= new Date();
  endDate = mm+"/"+dd+"/"+yyyy;
  break;
  case "IL":
  var d =  "0"+today.getDate();
  var dd = d.toString().substr(-2);
  var m = today.getMonth()+1;
  var m2="0"+m;
  var mm= m2.toString().substr(-2);  //January is 0!
  var endDate= new Date();
  endDate = mm+"/"+dd+"/"+yyyy;
  break;
  case "JP":
  var d = "0"+ today.getDate();
  var dd = d.toString().substr(-2);
  var m = today.getMonth()+1;
  var m2="0"+m;
  var mm= m2.toString().substr(-2); //January is 0!
  endDate = yyyy+"/"+mm+"/"+dd
  break; 
  case "MX":
  var d = "0"+ today.getDate();
  var dd = d.toString().substr(-2);
  var m = today.getMonth()+1;
  var m2="0"+m;
  var mm= m2.toString().substr(-2); //January is 0!
  endDate = dd+"/"+mm+"/"+yyyy;
  break;    
  case "SE":
  var d =  "0"+today.getDate();
  var dd = d.toString().substr(-2);
  var m = today.getMonth()+1;
  var m2="0"+m;
  var mm= m2.toString().substr(-2);  //January is 0!
  var endDate= new Date();
  endDate = mm+"/"+dd+"/"+yyyy;
  break;
  case "US":
  var d =  "0"+today.getDate();
  var dd = d.toString().substr(-2);
  var m = today.getMonth()+1;
  var m2="0"+m;
  var mm= m2.toString().substr(-2);  //January is 0!
  var endDate= new Date();
  endDate = mm+"/"+dd+"/"+yyyy;
  break;
  }
  var today = endDate;
  return today;
  }
  
  function timestamp(){
  
  var today = new Date();
  var yyyy = today.getFullYear();
  yy = yyyy.toString().substr(-2);
  var d = "0"+ today.getDate();
  var dd = d.toString().substr(-2);
  var m = today.getMonth()+1;
  var m2="0"+m;
  var mm= m2.toString().substr(-2);  //January is 0!
  var endDate= new Date();
  endDate = yyyy+"-"+mm+"-"+dd;
  
  return endDate;
  }
  
  function today(){
  var today = new Date();
  var d = today.getDate();
  return d;
  }
  
  function yesterday(){
  var today = new Date();
  var d = today.getDate()-1;
  return d;
  }
  
  //#endregion Common
  
  //#endregion TestHelpers
  
  });