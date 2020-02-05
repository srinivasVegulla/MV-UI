describe('NewCharges.spec.js', function() {

    //#region dataFiles
    
    var testData = require('../inputs/testData/NewCharges.json');
    var testData3 = require('../inputs/testData/XpathRepository.json');
    var testData4 = require('../inputs/testData/JsonFileCreation.json');
    //#endregion dataFiles
    
    //#region Tests
    
    it('Validate Charges Functionality',function() {
    browser.refresh();
    browser.sleep(5000);
    
    if(browser.params.value=='ViewOnlineBill'){
    
    //Validate the New Charges widget
    newChargesValidation();
    
    //To validate whether dynamic value  is executing.
    console.log(browser.params.value);
    
    //Log IN to MetraNet Applciation and navigate to View Online Bill screen
    protractor.loginHelpers.viewOnlineBill(testData4.userName);
    
    //Validate the New Charges widget
    newChargesValidation();
    
    //Logout from the MetraNet
    protractor.loginHelpers.logOutMetraNet();
    
    //Launch to the MV2.0 application
    protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
    
    //Login to the MV2.0 application
    protractor.loginHelpers.logInMV(testData4.userName,testData4.passwordField);

    }
    else
    {

	//Launch to the MV2.0 application
	protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
	//Login to the MV2.0 application
	protractor.loginHelpers.logInMV(testData4.userName,testData4.passwordField);

    //Validate the New Charges widget
    newChargesValidation();

	//Logout from the MV2.0 Application 
	protractor.loginHelpers.logOutMV();

    }
    
    });
    
    //#endregion Tests
    
    //#region TestHelpers
    
    function newChargesValidation(){
    //Input file to refer
    var testData2 = protractor.loginHelpers.dashboard();
    
    element(by.xpath(testData3.LayerSelector.Dropdown)).click();
    element(by.xpath(testData3.LayerSelector.Bills)).click();
    browser.sleep(10000);

    expect(element(by.xpath(testData3.Charges.Widget)).isPresent()).toBe(true);
    
    expect(element(by.xpath(testData3.Charges.Title)).getText()).toEqual(testData2.TEXT_CHARGES_TEXT);
    expect(element(by.xpath(testData3.Charges.SubCharges)).isDisplayed()).toBe(true);
    expect(element(by.xpath(testData3.Charges.ChargeAmount)).isDisplayed()).toBe(true);
    expect(element(by.xpath(testData3.Charges.PrebillAdjustment)).isPresent()).toBe(true);
    expect(element(by.xpath(testData3.Charges.PrebillAdjustment)).getText()).toEqual(testData2.TEXT_PREBILL_ADJUSTMENTS);
    
    //The user should able to click/touch on the link of 'Prebill adjustments'
    browser.actions().mouseMove(element(by.xpath(testData3.Charges.PrebillAdjustment))).perform();
    browser.sleep(3000);
    
    //validation of prebill adjustments
    //The overlay with list of transactions shall be opened as a popup     
    expect(element(by.xpath(testData3.Charges.PrebillAdjustment_Popup)).isPresent()).toBe(true);
    expect(element(by.xpath(testData3.Charges.PrebillAdjustment_Popup)).getText()).toEqual(testData2.TEXT_PREBILL_ADJUSTMENTS);
    
    browser.sleep(1000);
    expect(element(by.xpath(testData3.Charges.PrebillAdjustment_Popup_EndDate)).getText()).toEqual(localizedDate());
    expect(element(by.xpath(testData3.Charges.PrebillAdjustment_Popup_PoName)).getText()).toContain(testData.po1);
    expect(element(By.xpath(testData3.Charges.PrebillAdjustment_Popup_ViewAll)).isPresent()).toBe(true);
    browser.sleep(2000);
    
    element(By.xpath(testData3.Charges.PrebillAdjustment_Popup_ViewAll)).click();
    browser.sleep(2000);
    
    //view that prebill adjustments are in tabular view
    expect(element(by.xpath(testData3.Adjustment.AdjustmentTable)).isDisplayed()).toBe(true);
    element(by.xpath(testData3.Adjustment.SelectByDropdown)).click();
    browser.sleep(2000);
    
    element(by.xpath(testData3.Adjustment.FilterIcon)).click();
    browser.sleep(2000);
    
    browser.actions().mouseMove(element(by.xpath(testData3.Adjustment.Filter_SortBy))).perform();
    browser.sleep(2000);
    
    element(by.xpath(testData3.Adjustment.Filter_ApplyButton)).click();
    browser.sleep(2000);
    
    element(by.xpath(testData3.Adjustment.SelectTabularView)).click();
    browser.sleep(2000);
    
    element(by.xpath(testData3.Adjustment.Settings)).click();
    browser.sleep(2000);
    
    browser.actions().mouseMove(element(by.xpath(testData3.Adjustment.Settings_Label))).perform();
    element(by.xpath(testData3.Adjustment.Settings_UnselectAll)).click();
    browser.sleep(2000);
    
    element(by.xpath(testData3.Adjustment.Settings_SelectAll)).click();
    browser.sleep(2000);
    
    element(by.xpath(testData3.Adjustment.Settings_ApplyChanges)).click();
    browser.sleep(2000);
    
    //Click on card view
    element(by.xpath(testData3.Adjustment.SelectCardView)).click();
    browser.sleep(2000);
    
    //validate it is in card view mode
    expect(element(by.xpath(testData3.Adjustment.CardView)).isDisplayed()).toBe(true);
    
    //click on cancel button to redirect to bills page
    element(by.xpath(testData3.Adjustment.CloseButton)).click();
    browser.sleep(3000);
 
    
    //Q1-Bug :MVIEW-2702 Charges widget: The taxes are not in the correct place - should be at the bottom
    expect(element(by.xpath(testData3.Charges.Charges_BottomRow)).getText()).toEqual(testData2.TEXT_TAX);
    
    //expect(element(by.xpath(testData3.Charges.NonStandardCharges_Value)).getText()).toContain(nscValues());
    browser.sleep(2000);
    
    //click on Non Standard charges
    element(by.xpath(testData3.OfferCharge.Non_Standard_Charge_Label+testData2.TEXT_NON_STANDARD_CHARGES+testData3.ChildAccounts.CloseXpath)).click();
    browser.sleep(3000);

    
    expect(element(by.xpath(testData3.Adjustment.AdjustmentTable)).isDisplayed()).toBe(true);

    browser.sleep(2000);
    
    element(by.xpath(testData3.Adjustment.SortByDropdown)).click();
    browser.sleep(2000);
    
    element(by.xpath(testData3.Adjustment.FilterIcon)).click();
    browser.actions().mouseMove(element(by.xpath(testData3.Adjustment.Filter_SortBy))).perform();
    
    browser.sleep(2000);
    element(by.xpath(testData3.Adjustment.Filter_SortByButton)).click();
    
    element(by.xpath(testData3.Adjustment.Filter_ApplyButton)).click();
    browser.sleep(1000);
    
    element(by.xpath(testData3.Adjustment.SelectTabularView)).click();
    element(by.xpath(testData3.Adjustment.Settings)).click();
    browser.actions().mouseMove(element(by.xpath(testData3.Adjustment.Settings_Label))).perform();
    element(by.xpath(testData3.Adjustment.Settings_UnselectAll)).click();
    element(by.xpath(testData3.Adjustment.Settings_SelectAll)).click();
    expect(element(by.xpath(testData3.Adjustment.Settings_CheckBox)).getAttribute('checked')).toBe('true');
    browser.sleep(1000);
    
    //Cancel settings
    element(by.xpath(testData3.Adjustment.Settings_ApplyChanges)).click();
    element(by.xpath(testData3.Adjustment.Settings)).click();
    browser.sleep(1000);
    
    //The user should able to close column settings for charge details by touch/click on [close] icon
    element(by.xpath(testData3.Adjustment.Settings_Cancel)).click();
    browser.sleep(1000);
    
    //Click on Card view
    element(by.xpath(testData3.Adjustment.Card_View)).click();
    browser.sleep(1000);
    
    //validate it is in card view
    expect(element(by.xpath(testData3.Adjustment.CardView)).isDisplayed()).toBe(true);
    element(by.xpath(testData3.Adjustment.Close_NSC)).click();
    browser.sleep(3000);
    
    //misc display
    expect(element(by.xpath(testData3.Charges.MiscAdjustment)).isPresent()).not.toBe(true);
    console.log('Miscellaneous Adjustments are absent in Charges widget');
    
    //click on Misc adjustments
    element(by.xpath(testData3.OfferCharge.Misc_Adjustments_Label+testData2.TEXT_MISC_ADJUSTMENTS+testData3.ChildAccounts.CloseXpath)).click();
    browser.sleep(1000);
    //Validate Miscellaneous Adjsutmetns Details are opened
    //Test Case: MetraView_Folder/ MV2.0_AAS_Q1_Release/ 2902_NavigationToNewPageByClickingCharge
   //No Non Standard in Charges to validate it so Validating it udner Offer Charge Summary
    
    element(by.xpath(testData3.Adjustment.SortByDropdown)).click();
    element(by.xpath(testData3.Adjustment.SortByDropdownFirstValue)).click();
    browser.sleep(3000);
    
    element(by.xpath(testData3.Adjustment.FilterIcon)).click();
    browser.actions().mouseMove(element(by.xpath(testData3.Adjustment.Filter_SortBy))).perform();
    browser.sleep(3000);
    
    element(by.xpath(testData3.Adjustment.Filter_ApplyButton)).click();
    browser.sleep(1000);
    
    element(by.xpath(testData3.Adjustment.SelectTabularView)).click();
    element(by.xpath(testData3.Adjustment.Settings)).click();
    browser.sleep(3000);
    
    browser.actions().mouseMove(element(by.xpath(testData3.Adjustment.Settings_Label))).perform();
    browser.sleep(3000);
    
    element(by.xpath(testData3.Adjustment.Settings_UnselectAll)).click();
    element(by.xpath(testData3.Adjustment.Settings_SelectAll)).click();
    element(by.xpath(testData3.Adjustment.Settings_ApplyChanges)).click();
    browser.sleep(3000);
    
    //click on card view
    element(by.xpath(testData3.Adjustment.Card_View)).click();
    browser.sleep(1000);
    
    //Validate it is in card view
    expect(element(by.xpath(testData3.Adjustment.CardView)).isDisplayed()).toBe(true);
    element(by.xpath(testData3.Adjustment.Close_Misc)).click();
    browser.sleep(3000);
    
    //Text-tax
    expect(element(by.xpath(testData3.Charges.Tax)).getText()).toEqual(testData2.TEXT_TAX);
    
    //0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10520/ 001__The_tax_should_be_populated_in_MV_2.0
    //Verify in the Charges  widget, the tax is populated
    expect(element(by.xpath(testData3.Charges.TaxAmount)).getText()).not.toEqual("0.00");
    expect(element(by.xpath(testData3.Charges.TaxAmount)).getText()).not.toEqual("0,00");
    }
    
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
    endDate = dd+"/"+mm+"/"+yy;
    break;
    case "DE":
    var d = "0"+ today.getDate();
    var dd = d.toString().substr(-2);
    var m = today.getMonth()+1;
    var m2="0"+m;
    var mm= m2.toString().substr(-2);  //January is 0!
    var endDate= new Date();
    endDate = dd+"."+mm+"."+yy;
    break;
    case "EG":
    var d = today.getDate();
    var m = today.getMonth()+1;
    var m2=m;
    var endDate= new Date();
    endDate = d+"/"+m2+"/"+yyyy;
    break;
    case "ES":
    var d = today.getDate();
    var m = today.getMonth()+1;
    var m2=m;
    endDate = d+"/"+m2+"/"+yy; 
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
    endDate = dd+"/"+mm+"/"+yyyy;
    break;
    case "IL":
    var d = today.getDate();
    var m = today.getMonth()+1;
    var m2=m;
    var endDate= new Date();
    endDate = d+"."+m2+"."+yyyy;
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
    endDate = dd+"/"+mm+"/"+yy;
    break;    
    case "SE":
    var d = "0"+ today.getDate();
    var dd = d.toString().substr(-2);
    var m = today.getMonth()+1;
    var m2="0"+m;
    var mm= m2.toString().substr(-2); //January is 0!
    endDate = yyyy+"-"+mm+"-"+dd;  
    break;
    case "US":
    var d =  today.getDate();
    //var dd = d.toString().substr(-2);
    var m = today.getMonth()+1;
    var m2=m;
    var m= m2.toString().substr(-2);  //January is 0!
    var endDate= new Date();
    endDate = m+"/"+d+"/"+yy;
    break;
    }
    var today = endDate;
    return today;
    }
    
    //#endregion TestHelpers
    });    