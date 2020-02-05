describe('MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView',function(){

    //#region dataFiles
    
    var sce1= require('../inputs/testdata/TreeViewScenario1.json');
    var sce2= require('../inputs/testdata/TreeViewScenario2.json');
    var sce3= require('../inputs/testdata/TreeViewScenario3.json');
    var xpathRepo = require('../inputs/testdata/XpathRepository.json');
   
    //#endregion dataFiles
    
    //#region Tests
    
    it('/MVIEW-2812_TC10_NodeExp_Same_RootNode_Collap Scenario 1', function(){
    
    browser.refresh();
    browser.sleep(5000);
    //Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2812_TC10_NodeExp_Same_RootNode_Collap
    RootNodeExpandCollapesRemainsSameCorp(sce1.corporateAccountUserName,sce1.passwordField);
   RootNodeExpandCollapesRemainsSameDept(sce1.departmentAccountUserName,sce1.passwordField);
    
    });
    
    it('MVIEW-2812_TC10_NodeExp_Same_RootNode_Collap Scenario 2', function(){
    //Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2812_TC10_NodeExp_Same_RootNode_Collap
    RootNodeExpandCollapesRemainsSameCorp(sce2.corporateAccountUserName,sce2.passwordField);
    
    });
    
    it('MVIEW-2812_TC10_NodeExp_Same_RootNode_Collap Scenario 3', function(){
    //Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 11_TreeView/ MVIEW-2812_TC10_NodeExp_Same_RootNode_Collap
    RootNodeExpandCollapesRemainsSameCorp(sce3.corporateAccountUserName,sce3.passwordField);
    
    });
    
   
   
    //#endregion Tests
    
    //#region TestHelpers
    
    //#region MVIEW2812-NodeExp_Same_RootNode_Collap
    
    function RootNodeExpandCollapesRemainsSameCorp(userName,password){

    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application with Corporate Account
    protractor.loginHelpers.logInMV(userName,password);
    
    //Click on Layer Selector Dropdown
    element(by.xpath(xpathRepo.LayerSelector.Dropdown)).click();
    
    //Click on Bills Layer
    element(by.xpath(xpathRepo.LayerSelector.Bills)).click();
    browser.sleep(5000);
    
    //Select the Billing Period Dropdown
    element(by.xpath(xpathRepo.Billing.SelectPeriodInvoiceDropdown)).click();
    browser.sleep(2000);

    //select the yesterdays hardclosed interval
    //element(by.xpath(xpathRepo.Billing.SelectFirstInterval)).click();
    
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

       //Under Charges Summary widget, click on the PO (the parent node)Group Usage Simple PO display name
       element.all(by.xpath(xpathRepo.OfferCharge.PO_GroupUsage)).then(function(pos){
       pos[0].click();
       browser.sleep(2000);
       });

    //Verify the OrderCookies PI is displayed under PO (the parent node)   
    expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isDisplayed()).toBe(true);
   
     //Click on the Account Name (the parent node)  to close the parent node
     element.all(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).then(function(accName){
        accName[0].click();
        browser.sleep(3000);
        });

      //Click on the Account Name (the parent node) again to open the parent node
        element.all(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).then(function(accName){
        accName[0].click();
        browser.sleep(2000);
        
      });
    
    //Verify the OrderCookies PI is displayed under PO (the parent node) after click on parent node and remains same  
    expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isDisplayed()).toBe(true);

   
     //Under Charges Summary widget, click on the PO (the parent node)
     element.all(by.xpath(xpathRepo.OfferCharge.PO_GroupUsage)).then(function(pos){
        pos[0].click();
        browser.sleep(2000);
        });

   //Verify the OrderCookies PI is displayed under PO (the parent node) is not visible 
   // expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isDisplayed()).toBe(false);

     //Click on the Account Name (the parent node)  to close the parent node
     element.all(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).then(function(accName){
        accName[0].click();
        browser.sleep(2000);
        });

      //Click on the Account Name (the parent node) again to open the parent node
        element.all(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).then(function(accName){
        accName[0].click();
        browser.sleep(2000);
        
      });

    //Verify the OrderCookies PI is displayed under PO (the parent node) is not visible 
    expect(element(by.xpath(xpathRepo.OfferCharge.PO_GroupUsage)).isDisplayed()).toBe(true);

    protractor.loginHelpers.logOutMV();
    
    }
    
    function RootNodeExpandCollapesRemainsSameDept(userName,password){
    
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application with Corporate Account
    protractor.loginHelpers.logInMV(userName,password);
    
    //#region PO
    
    //Click on Layer Selector Dropdown
    element(by.xpath(xpathRepo.LayerSelector.Dropdown)).click();
    
    //Click on Bills Layer
    element(by.xpath(xpathRepo.LayerSelector.Bills)).click();
    browser.sleep(5000);
    
    //Select the Billing Period Dropdown
    element(by.xpath(xpathRepo.Billing.SelectPeriodInvoiceDropdown)).click();
    browser.sleep(1000);

    //select the yesterdays hardclosed interval
  //element(by.xpath(xpathRepo.Billing.SelectFirstInterval)).click();
    
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

       //Click on the Account Name (the parent node)
     element.all(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).then(function(accName){
        accName[1].click();
        browser.sleep(2000);
        }); 

    
    //Under Charges Summary widget, click on the PO (the parent node)
    element.all(by.xpath(xpathRepo.OfferCharge.ProductOfferingLabel)).then(function(pos){
    
    pos[0].click();
    browser.sleep(2000);
    pos[0].click();
    browser.sleep(2000);
    });

    //Under Charges Summary widget, click on the PO (the parent node)
    element.all(by.xpath(xpathRepo.OfferCharge.PO_GroupUsage)).then(function(pos){
    pos[0].click();
    browser.sleep(2000);
    });
    
    //Verify the parent node expands and the Priceable Item (the child node) is displayed under it
    expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isDisplayed()).toBe(true);
    
     //Click on the Account Name (the parent node)
     element.all(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).then(function(accName){
        accName[0].click();
        browser.sleep(2000);
        });

         //Click on the Account Name (the parent node) second time to collapse node
        element.all(by.xpath(xpathRepo.OfferCharge.PayerPOSelection)).then(function(accName){
        accName[0].click();
        browser.sleep(2000);
        });

    //Verify the parent node expands and the Priceable Item (the child node) is displayed under it after click on parent node and again expanded
    expect(element(by.xpath(xpathRepo.OfferCharge.PI_Selection)).isDisplayed()).toBe(true);
   
    //#endregion defaultPL
    protractor.loginHelpers.logOutMV();
    
    }
     
    //#endregion MVIEW2812-NodeExp_Same_RootNode_Collap


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