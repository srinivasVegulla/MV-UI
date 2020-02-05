describe('MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView',function(){

      //#region dataFiles

      var sce1= require('../inputs/testdata/TreeViewScenario1.json');
      var sce2= require('../inputs/testdata/TreeViewScenario2.json');
      var sce3= require('../inputs/testdata/TreeViewScenario3.json');
      var xpathRepo = require('../inputs/testdata/XpathRepository.json');
      var sce16 = require('../inputs/testdata/TreeviewRC.json');

      function GroupusagePo(){
      //Charge Details should be visible
      var sce118=protractor.loginHelpers.langCode;
      switch (sce118) {
      case "BR":
      var Groupusage=sce1.GroupUsageName;
      break;
      case "DE":
      var Groupusage=sce1.GroupUsageName;
      break;
      case "EG":
      var Groupusage=sce1.GroupUsagepodisplayName;
      break;
      case "ES":
      var Groupusage=sce1.GroupUsageName;
      break;
      case "FR":
      var Groupusage=sce1.GroupUsageName; 
      break;
      case "GB":
      var Groupusage=sce1.GroupUsageName;
      break;
      case "IL":
      var Groupusage=sce1.GroupUsageName;
      break;
      case "JP":
      var Groupusage=sce1.GroupUsageName;
      break; 
      case "MX":
      var Groupusage=sce1.GroupUsageName;
      break;    
      case "SE":
      var Groupusage=sce1.GroupUsagepodisplayName;;
      break;
      case "US":
      var Groupusage=sce1.GroupUsagepodisplayName;
      break;
      } 
      return Groupusage;
      }
      function RecurringPo(){
      //Charge Details should be visible
      var sce115=protractor.loginHelpers.langCode;
      switch (sce115) {
      case "BR":
      var RecurringPoName=sce1.recurringChargeUSName;
      break;
      case "DE":
      var RecurringPoName=sce1.recurringChargeDEName;
      break;
      case "EG":
      var RecurringPoName=sce1.recurringChargeUSName;
      break;
      case "ES":
      var RecurringPoName=sce1.recurringChargeUSName;
      break;
      case "FR":
      var RecurringPoName=sce1.recurringChargeFRName; 
      break;
      case "GB":
      var RecurringPoName=sce1.recurringChargeUSName;
      break;
      case "IL":
      var RecurringPoName=sce1.recurringChargeITName;
      break;
      case "JP":
      var RecurringPoName=sce1.recurringChargeJPName;
      break; 
      case "MX":
      var RecurringPoName=sce1.recurringChargeMXName;
      break;    
      case "SE":
      var RecurringPoName=sce1.recurringChargeUSName;
      break;
      case "US":
      var RecurringPoName=sce1.recurringChargeUSName;
      break;
      } 
      return RecurringPoName;
      }

      function UDRecurringPo(){
      //Charge Details should be visible
      var sce116=protractor.loginHelpers.langCode;
      switch (sce116) {
      case "BR":
      var UDRecurringPoName=sce1.UDRecurringChargeUSName;
      break;
      case "DE":

      var UDRecurringPoName=sce1.UDRecurringChargeJPName;

      break;
      case "EG":
      var UDRecurringPoName=sce1.UDRecurringChargeUSName;
      break;
      case "ES":
      var UDRecurringPoName=sce1.UDRecurringChargeUSName;
      break;
      case "FR":

      var UDRecurringPoName=sce1.UDRecurringChargeFRName;
      break;
      case "GB":
      var UDRecurringPoName=sce1.UDRecurringChargeUSName;
      break;
      case "IL":

      var UDRecurringPoName=sce1.UDRecurringChargeITName;
      break;
      case "JP":
      var UDRecurringPoName=sce1.UDRecurringChargeJPName;
      break; 
      case "MX":
      var UDRecurringPoName=sce1.UDRecurringChargeUSName;
      break;    
      case "SE":
      var UDRecurringPoName=sce1.UDRecurringChargeUSName;
      break;
      case "US":
      var UDRecurringPoName=sce1.UDRecurringChargeUSName;
      break;
      } 
      return UDRecurringPoName;
      }

      function CaretXpath(){
      //Charge Details should be visible
      var testdata17=protractor.loginHelpers.langCode;
      switch (testdata17) {
      case "BR":
      var Caretvalue=xpathRepo.OfferCharge.ArrowExpand;
      break;
      case "DE":
      var Caretvalue=xpathRepo.OfferCharge.ArrowExpand;
      break;
      case "EG":
      var Caretvalue="//span[@class='chevron ng-scope left']"
      break;
      case "ES":
      var Caretvalue=xpathRepo.OfferCharge.ArrowExpand;
      break;
      case "FR":
      var Caretvalue=xpathRepo.OfferCharge.ArrowExpand;
      break;
      case "GB":
      var Caretvalue=xpathRepo.OfferCharge.ArrowExpand;
      break;
      case "IL":
      var Caretvalue="//span[@class='chevron ng-scope left']"
      break;
      case "JP":
      var Caretvalue=xpathRepo.OfferCharge.ArrowExpand;
      break; 
      case "MX":
      var Caretvalue=xpathRepo.OfferCharge.ArrowExpand;
      break;    
      case "SE":
      var Caretvalue=xpathRepo.OfferCharge.ArrowExpand;
      break;
      case "US":
      var Caretvalue=xpathRepo.OfferCharge.ArrowExpand;
      break;
      } 
      return Caretvalue;
      }

      //#region Tests

      it('Validate TreeLeafNode expansion for all the accounts', function(){


      browser.refresh();
      browser.sleep(5000);

      //Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2812_TC08_Leaf_Node_Click
      CorpScenerio(sce1.corporateAccountUserName,sce1.passwordField);
      DeptScenerio(sce1.departmentAccountUserName,sce1.passwordField);
      CorpScenerio(sce2.corporateAccountUserName,sce2.passwordField);
      CorpScenerio(sce3.corporateAccountUserName,sce3.passwordField);
      });

      it('Validate the carat is facing down when the node is expanded', function(){

      browser.refresh();
      browser.sleep(5000);

      //Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2812_TC05_Carat_Dwn_NodeExp
      CorporateScenerioforcaret(sce1.corporateAccountUserName,sce1.passwordField);
      DeptScenerioforcaret(sce1.departmentAccountUserName,sce1.passwordField);
      CorporateScenerioforcaret(sce2.corporateAccountUserName,sce2.passwordField);
      CorporateScenerioforcaret(sce3.corporateAccountUserName,sce3.passwordField);
      });

      it('Validate the carat is facing right when the node is collapsed', function(){

      browser.refresh();
      browser.sleep(5000);

      //Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2812_TC06_Carat_Right_Node_Collap
      CorporateScenerioforcaretRight(sce1.corporateAccountUserName,sce1.passwordField);
      DeptScenerioforcaretRight(sce1.departmentAccountUserName,sce1.passwordField);
      CorporateScenerioforcaretRight(sce2.corporateAccountUserName,sce2.passwordField);
      CorporateScenerioforcaretRight(sce3.corporateAccountUserName,sce3.passwordField);
      });

      function CorpScenerio(userName,password){

      //Launch to the MV2.0 application
      protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);

      //Login to the MV2.0 application with Corporate Account
      protractor.loginHelpers.logInMV(userName,password);

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
      //validate that there is no PI is present
      expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isPresent()).not.toBe(true);
      //click on caret
      element(by.xpath(CaretXpath())).click();
      browser.sleep(3000);
      //validate that there is  PI is present
      expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isDisplayed()).toBe(true);

      //click on PI
      element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).click();

      browser.sleep(3000);
      //Validate the charges details of the Priceable Item  are displayed
      element.all(by.xpath(xpathRepo.OfferCharge.Charges_po)).then((items) => { 

      expect(items[1].getText()).toContain(sce16.charges);

      })
      //clcik on close button
      element(by.xpath(xpathRepo.OfferCharge.Close)).click();

      browser.sleep(3000);
      //click on Account View
      element(by.xpath(xpathRepo.OfferCharge.AccountView_Pane)).click();

      //Click on the Account Name  (the parent node)
      element(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).click();
      // Verify the parent node expands and the Product Offers/Accounts  (the child nodes) are displayed under it
      expect(element(by.xpath(xpathRepo.OfferCharge.Group_Usage_PO)).isDisplayed()).toBe(true);
      browser.sleep(3000);

      expect(element(by.xpath(xpathRepo.OfferCharge.Dept_Acc)).isDisplayed()).toBe(true);
      browser.sleep(3000);

      element.all(by.xpath(xpathRepo.OfferCharge.Group_Usage_PO)).then((items)=> {
      expect(items[0].getText()).toEqual(GroupusagePo());
      expect(items[1].getText()).toContain(RecurringPo());
      expect(items[2].getText()).toContain(UDRecurringPo());
      })

      //Click on the PO
      element(by.xpath(xpathRepo.OfferCharge.Group_Usage_PO)).click();
      browser.sleep(3000);
      //Click on the Priceable Item  under it
      element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).click();

      //Validate the charges details of the Priceable Item  are displayed
      element.all(by.xpath(xpathRepo.OfferCharge.Charges_po)).then((items) => { 

      expect(items[1].getText()).toContain(sce16.charges);

      })
      //click on close button
      element(by.xpath(xpathRepo.OfferCharge.Close)).click();

      browser.sleep(3000);
      //Log out from MV
      protractor.loginHelpers.logOutMV();

      }


      function DeptScenerio(userName,password){

      //Launch to the MV2.0 application
      protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);

      //Login to the MV2.0 application with dEPARTMENT Account
      protractor.loginHelpers.logInMV(userName,password);

      //Click on Go to Bills Link
      element(by.xpath(xpathRepo.Billing.GoToBillsButton)).click();
      browser.sleep(8000);


      //Click on dropdown to select the interval date
      element(by.xpath(xpathRepo.Billing.SelectIntervalDropdown)).click();

      //select the First interval
      element(by.xpath(xpathRepo.Billing.SelectFirstInterval)).click();
      browser.sleep(3000);
      //Validate that there is no PI in the node
      expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isPresent()).not.toBe(true);
      // Under Charges Summary  widget, click on the PO (the parent node)
      element(by.xpath(CaretXpath())).click();
      browser.sleep(3000);
      //Verify the parent node expands and the Priceable Item (the child node) is displayed under it
      expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isDisplayed()).toBe(true);

      //Click on the Priceable Item
      element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).click();

      browser.sleep(3000);
      // Verify the charges details of the Priceable Item  are displayed
      element.all(by.xpath(xpathRepo.OfferCharge.Charges_po)).then((items) => { 

      expect(items[1].getText()).toContain(sce16.charges);

      })
      //click on close icon
      element(by.xpath(xpathRepo.OfferCharge.Close)).click();

      browser.sleep(3000);
      // Click on the Account View  tab
      element(by.xpath(xpathRepo.OfferCharge.AccountView_Pane)).click();

      //Click on the Account Name  (the parent node)
      element(by.xpath(xpathRepo.OfferCharge.AccountView_AccountName_Link)).click();
      browser.sleep(3000);
      // Verify the parent node expands and the Product Offers/Accounts  (the child nodes) are displayed under it
      element(by.xpath(CaretXpath())).click();
      browser.sleep(3000);

      element.all(by.xpath(xpathRepo.OfferCharge.Group_Usage_PO)).then((items)=> {
      expect(items[0].getText()).toEqual(GroupusagePo());
      expect(items[1].getText()).toContain(RecurringPo());
      expect(items[2].getText()).toContain(UDRecurringPo());

      })

      // Click on the PO
      element(by.xpath(xpathRepo.OfferCharge.Group_Usage_PO)).click();
      browser.sleep(3000);
      //Click on the Priceable Item  under it 
      element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).click();
      //Verify the charge details of the Priceable Item  are displayed
      element.all(by.xpath(xpathRepo.OfferCharge.Charges_po)).then((items) => { 

      expect(items[1].getText()).toContain(sce16.charges);

      })
      //click on close icon
      element(by.xpath(xpathRepo.OfferCharge.Close)).click();

      browser.sleep(3000); 
      //Logout from Mv
      protractor.loginHelpers.logOutMV();
      }

      function CorporateScenerioforcaret(userName,password){

      //Launch to the MV2.0 application
      protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);

      //Login to the MV2.0 application with Corporate Account
      protractor.loginHelpers.logInMV(userName,password);

      //Click on Layer Selector Dropdown
      element(by.xpath(xpathRepo.LayerSelector.Dropdown)).click();

      //Click on Bills Layer
      element(by.xpath(xpathRepo.LayerSelector.Bills)).click();
      browser.sleep(5000);

      //Click on dropdown to select the interval date
      element(by.xpath(xpathRepo.Billing.SelectIntervalDropdown)).click();

      //select the First interval
      element(by.xpath(xpathRepo.Billing.SelectFirstInterval)).click();
      browser.sleep(3000);
      //validate that there is no PI is present
      expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isPresent()).not.toBe(true);
      browser.sleep(3000);
      // Under Charges Summary widget, click on the PO (the parent node)
      element(by.xpath(CaretXpath())).click();
      browser.sleep(3000);

      //validate that PI is present
      expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isPresent()).toBe(true);

      //Verify the carat is facing down
      expect(element(by.xpath(xpathRepo.OfferCharge.ArrowExpanded)).isDisplayed()).toBe(true);

      browser.sleep(3000);
      //Click on the Account View tab
      element(by.xpath(xpathRepo.OfferCharge.AccountView_Pane)).click();

      //Click on the Account Name  (the parent node)
      element(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).click();
      //Verify the parent node expands and the Product Offers/Accounts  (the child nodes) are displayed under it
      expect(element(by.xpath(xpathRepo.OfferCharge.Group_Usage_PO)).isDisplayed()).toBe(true);
      browser.sleep(3000);
      expect(element(by.xpath(xpathRepo.OfferCharge.Dept_Acc)).isDisplayed()).toBe(true);
      browser.sleep(3000);

      element.all(by.xpath(xpathRepo.OfferCharge.Group_Usage_PO)).then((items)=> {
      expect(items[0].getText()).toEqual(GroupusagePo());
      expect(items[1].getText()).toContain(RecurringPo());
      expect(items[2].getText()).toContain(UDRecurringPo());
      })
       
      //Verify the carat is facing down
      expect(element(by.xpath(xpathRepo.OfferCharge.ArrowExpanded)).isDisplayed()).toBe(true);

      //Log out from MV
      protractor.loginHelpers.logOutMV();

      }

      function DeptScenerioforcaret(userName,password){

      //Launch to the MV2.0 application
      protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);

      //Login to the MV2.0 application with Corporate Account
      protractor.loginHelpers.logInMV(userName,password);

      //Click on Go to Bills Link
      element(by.xpath(xpathRepo.Billing.GoToBillsButton)).click();
      browser.sleep(8000);


      //Click on dropdown to select the interval DROP DOWN
      element(by.xpath(xpathRepo.Billing.SelectIntervalDropdown)).click();

      //select the forst interval
      element(by.xpath(xpathRepo.Billing.SelectFirstInterval)).click();
      browser.sleep(3000);

      //Validate that there is no PI is present
      expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isPresent()).not.toBe(true);

     //Under Charges Summary  widget, click on the PO (the parent node)
      element(by.xpath(CaretXpath())).click();
      browser.sleep(3000);

      //Validate that there is PI is present
      expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isDisplayed()).toBe(true);
      browser.sleep(3000);

      // Verify the carat  is facing down
      expect(element(by.xpath(xpathRepo.OfferCharge.ArrowExpanded)).isDisplayed()).toBe(true);
      browser.sleep(3000);
      
      //Click on the Account View tab
      element(by.xpath(xpathRepo.OfferCharge.AccountView_Pane)).click();

      //Click on the Account Name  (the parent node)
      element(by.xpath(xpathRepo.OfferCharge.AccountView_AccountName_Link)).click();
      browser.sleep(3000);
      //Click on the po
      element(by.xpath(CaretXpath())).click();
      browser.sleep(3000);

      //Verify the parent node expands and the Product Offers/Accounts  (the child nodes) are displayed under it
      expect(element(by.xpath(xpathRepo.OfferCharge.Group_Usage_PO)).isDisplayed()).toBe(true);
      browser.sleep(3000);

      element.all(by.xpath(xpathRepo.OfferCharge.Group_Usage_PO)).then((items)=> {
      expect(items[0].getText()).toEqual(GroupusagePo());
      expect(items[1].getText()).toContain(RecurringPo());
      expect(items[2].getText()).toContain(UDRecurringPo());

      })

      // Verify the carat is facing down
      expect(element(by.xpath(xpathRepo.OfferCharge.ArrowExpanded)).isDisplayed()).toBe(true);
      browser.sleep(3000);

      //Logout from MV
      protractor.loginHelpers.logOutMV();
      }


      function CorporateScenerioforcaretRight(userName,password){

      //Launch to the MV2.0 application
      protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);

      //Login to the MV2.0 application with Corporate Account
      protractor.loginHelpers.logInMV(userName,password);

      //Click on Layer Selector Dropdown
      element(by.xpath(xpathRepo.LayerSelector.Dropdown)).click();

      //Click on Bills Layer
      element(by.xpath(xpathRepo.LayerSelector.Bills)).click();
      browser.sleep(5000);

      //Click on dropdown to select the interval date
      element(by.xpath(xpathRepo.Billing.SelectIntervalDropdown)).click();

      //select the first interval
      element(by.xpath(xpathRepo.Billing.SelectFirstInterval)).click();
      browser.sleep(3000);

      //Validate that there is no PI
      expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isPresent()).not.toBe(true);
      browser.sleep(3000);

      //Under Charges Summary  widget, click on the PO (the parent node)
      element(by.xpath(CaretXpath())).click();
      browser.sleep(3000);

      //Verify the parent node expands and the Priceable Item  (the child node) is displayed under it
      expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isDisplayed()).toBe(true);
      browser.sleep(3000);

      //Click on the parent node
      element(by.xpath(xpathRepo.OfferCharge.ArrowExpanded)).click();
      browser.sleep(3000);

      ///Validate that there is no PI
      expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isDisplayed()).not.toBe(true);
      browser.sleep(3000);

      //Verify the carat  is facing right
      expect(element(by.xpath(CaretXpath())).isDisplayed()).toBe(true);

      //Click on the Account View tab
      element(by.xpath(xpathRepo.OfferCharge.AccountView_Pane)).click();

      //Click on the Account Name  (the parent node)
      element(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).click();
      browser.sleep(3000);
      //Verify the parent node expands and the Product Offers/Accounts  (the child nodes) are displayed under it
      expect(element(by.xpath(xpathRepo.OfferCharge.Group_Usage_PO)).isDisplayed()).toBe(true);
      browser.sleep(3000);
      expect(element(by.xpath(xpathRepo.OfferCharge.Dept_Acc)).isDisplayed()).toBe(true);
      browser.sleep(3000);

      element.all(by.xpath(xpathRepo.OfferCharge.Group_Usage_PO)).then((items)=> {
      expect(items[0].getText()).toEqual(GroupusagePo());
      expect(items[1].getText()).toContain(RecurringPo());
      expect(items[2].getText()).toContain(UDRecurringPo());
      })

      // Click on the parent node
      element(by.xpath(xpathRepo.OfferCharge.ArrowExpanded)).click();
      browser.sleep(3000);
      //Verify the parent node collapses and the child nodes are not displayed
      expect(element(by.xpath(xpathRepo.OfferCharge.Group_Usage_PO)).isDisplayed()).not.toBe(true);
      browser.sleep(3000);

      //Verify the carat  is facing right
      expect(element(by.xpath(CaretXpath())).isDisplayed()).toBe(true);

      }

      function DeptScenerioforcaretRight(userName,password){

      //Launch to the MV2.0 application
      protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);

      //Login to the MV2.0 application with Corporate Account
      protractor.loginHelpers.logInMV(userName,password);

      //Click on Go to Bills Link
      element(by.xpath(xpathRepo.Billing.GoToBillsButton)).click();
      browser.sleep(8000);


      //Click on dropdown to select the interval date
      element(by.xpath(xpathRepo.Billing.SelectIntervalDropdown)).click();

      //select the First interval
      element(by.xpath(xpathRepo.Billing.SelectFirstInterval)).click();
      browser.sleep(3000);

      //Validate PI is not there
      expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isPresent()).not.toBe(true);

      //Under Charges Summary  widget, click on the PO (the parent node)
      element(by.xpath(CaretXpath())).click();
      browser.sleep(3000);

      //Verify the parent node expands and the Priceable Item  (the child node) is displayed under it
      expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isDisplayed()).toBe(true);
      browser.sleep(3000);

      //Click on the parent node
      element(by.xpath(CaretXpath())).click();
      browser.sleep(3000);

       //Click on the parent node
      element(by.xpath(xpathRepo.OfferCharge.ArrowExpanded)).click();
      browser.sleep(3000);

      //Verify the parent node collapses and the child nodes are not displayed
      expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isDisplayed()).not.toBe(true);
      browser.sleep(3000);

      //Verify the carat  is facing right
      expect(element(by.xpath(CaretXpath())).isDisplayed()).toBe(true);

      //Click on the Account View tab
      element(by.xpath(xpathRepo.OfferCharge.AccountView_Pane)).click();

      // Click on the Account Name  (the parent node)
      element(by.xpath(xpathRepo.OfferCharge.AccountView_AccountName_Link)).click();
      browser.sleep(3000);

      //Click on the Account Name  (the parent node)
      element(by.xpath(CaretXpath())).click();
      browser.sleep(3000);

      //Verify the parent node expands and the Product Offers/Accounts  (the child nodes) are displayed under it
      expect(element(by.xpath(xpathRepo.OfferCharge.Group_Usage_PO)).isDisplayed()).toBe(true);
      browser.sleep(3000);
      element.all(by.xpath(xpathRepo.OfferCharge.Group_Usage_PO)).then((items)=> {
      expect(items[0].getText()).toEqual(GroupusagePo());
      expect(items[1].getText()).toContain(RecurringPo());
      expect(items[2].getText()).toContain(UDRecurringPo());

      })

      // Click on the parent node
      element(by.xpath(xpathRepo.OfferCharge.ArrowExpanded)).click();

      //Verify the parent node collapses and the child nodes are not displayed
      expect(element(by.xpath(xpathRepo.OfferCharge.Group_Usage_PO)).isDisplayed()).not.toBe(true);
      browser.sleep(3000);

      //Verify the carat  is facing right
      expect(element(by.xpath(CaretXpath())).isDisplayed()).toBe(true);

      //Logout from MV
      protractor.loginHelpers.logOutMV();
      }


      });