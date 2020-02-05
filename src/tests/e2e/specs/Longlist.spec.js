var fs = require('fs');
var testData1 = require('../inputs/testData/Login.json');
var testData3 = require('../inputs/testData/XpathRepository.json');
var testData4 = require('../inputs/testData/Longlist.json');
var EC = protractor.ExpectedConditions;


describe('LongList functionality', function () {

    //TC02
    xit('Validate Long List handling functionality in Tree View', function () {
        var testData5 = protractor.loginHelpers.lang;


        //Launch to the MV2.0 application
        protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
        //Maximize the browser
        browser.driver.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(5000);

        //Login to the MV2.0 application
        protractor.loginHelpers.logInMV(testData4.corporateAccount2UserName, testData4.departmentPassword);
        //Explicit Wait to wait until the link/button is clickable
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.Billing.GoToBillsButton))), 3000);

        //Click on Go to Bills Link
        element(by.xpath(testData3.Billing.GoToBillsButton)).click();
        //browser.sleep(8000);
        //Click on AccountView in ChargeSummary Widget
        element(by.xpath(testData3.Transactions.AccountView)).click();
        //Click on Department/Corparate
        element(by.xpath(testData3.OfferCharge.AccountName_Expand)).click();
        //Click on ViewAll link
        element(by.xpath(testData3.OfferCharge.ViewAll_Link)).click();
        //Explicit Wait to wait presence of element
        browser.wait(EC.presenceOf(element(by.xpath(testData3.OfferCharge.Search_RecordText))), 3000);
        /*(element(by.xpath(testData3.OfferCharge.DisplayRecords)).getText()).then(function(displayDetail){
            console.log("Diplaying Records .... " +displayDetail);
        });
                //Verify Text "Ex: Displaying 1 Of 6." is displayed 
                expect(element(by.xpath(testData3.OfferCharge.DisplayRecords)).getText()).toEqual("corpsce2: Displaying 1 Of 6.");
           */
        //Validate Record data is displayed on the screen  
        expect(element(by.xpath(testData3.OfferCharge.Search_RecordText)).getText()).toEqual("3 Of 7 records");

        //Validate Filter/Search bar is present
        expect(element(by.xpath(testData3.OfferCharge.FilterSearchField)).isPresent()).toBeTruthy();

        //Provide a value to the input/search text box
        var inputValue = "sce";
        element.all(by.xpath(testData3.OfferCharge.FilterSearchField)).sendKeys(inputValue);
        //Get all the value displayed with the search key/data
        let searchFieldValues = element.all(by.xpath(testData3.OfferCharge.Text_ChildAccSearch));
        //expect(searchFieldValues.getText()).toEqual(['Select Multi-Point','Audio Conferencing Connections | $ 143.75','Audio Conferencing Feature | $ 5.00']);


        var count = 0;
        //To get Count of Values 
        searchFieldValues.count().then(function (searchFieldValuesCount) {
            let name;
            var numberDisplay;
            var value;
            //To get the data 
            searchFieldValues.getText().then(function (name) {
                //Itteration to get each value from the list of search data    
                for (var i = 0; i < searchFieldValuesCount; i++) {
                    var inputData = name[i];
                    //Get the count of occurences for the search
                    if (inputData.indexOf(inputValue) !== -1) {
                        count++;
                    }
                }
                //Validate the input value and the data matches
                element(by.xpath(testData3.OfferCharge.Search_RecordText)).getText().then(function (displayText) {
                    value = displayText.split(" ");
                    finalValue = +0 + +value[0];
                    expect(count).toEqual(finalValue);
                })
            })
        })
        //Clear input field and enter data
        element(by.xpath(testData3.OfferCharge.FilterSearchField)).clear().sendKeys("core2sce4");
        //Click on the Core Account
        element(by.xpath(testData3.OfferCharge.ChildActSearch_Name)).click();
        //Explicit Wait to wait until the link/button is clickable
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.OfferCharge.LongList_ChildPO))), 3000);
        //Click on Child PO
        element(by.xpath(testData3.OfferCharge.LongList_ChildPO)).click();
        //Click on Child PI
        element(by.xpath(testData3.OfferCharge.LongList_ChildPI)).click();
        //Validate if the dialog box for the Child PI is displayed/opened
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).isPresent()).toBeTruthy();
        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.ChargeSummary_X_Button)).click();
        //Click on ViewAll link
        element(by.xpath(testData3.OfferCharge.ViewAll_Link)).click();
        //Explicit Wait to wait until the element is clickable
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.OfferCharge.FilterSearchField))), 3000);
        //Clear input field and enter data
        element(by.xpath(testData3.OfferCharge.FilterSearchField)).clear().sendKeys("deptsce2");
        //Click on the Core Account
        element(by.xpath(testData3.OfferCharge.ChildActSearch_Name)).click();
        //Click on Child PO
        element(by.xpath(testData3.OfferCharge.LongList_ChildPO2)).click();
        //Click on Child PI
        element(by.xpath(testData3.OfferCharge.LongList_ChildPI2)).click();

        //Validate if the dialog box for the Child PI is displayed/opened
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).isPresent()).toBeTruthy();
        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.ChargeSummary_X_Button)).click();

        //Click on ViewAll link
        element(by.xpath(testData3.OfferCharge.ViewAll_Link)).click();
        //Explicit Wait to wait until the element is clickable
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.OfferCharge.FilterSearchField))), 3000);
        //Clear input field and enter data
        element(by.xpath(testData3.OfferCharge.FilterSearchField)).clear().sendKeys("dept2sce1");
        //Click on the Core Account
        element(by.xpath(testData3.OfferCharge.ChildActSearch_Name)).click();
        //Click on Child PO
        element(by.xpath(testData3.OfferCharge.LongList_ChildPO)).click();
        //Click on Child PI
        element(by.xpath(testData3.OfferCharge.LongList_ChildPI)).click();

        //Validate if the dialog box for the Child PI is displayed/opened
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).isPresent()).toBeTruthy();
        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.ChargeSummary_X_Button)).click();
        //Logging out of the MetraView application
        protractor.loginHelpers.logOutMV();
    });

    //TC04 Modify Page and Buffer size
    it('Validate Long List handling functionality in Tree View when the pageSize and bufferSize are modified', function () {
        var testData5 = protractor.loginHelpers.lang;

        //updating the system bar name as company name
        var rawdata2 = require(protractor.loginHelpers.commonconfig());
        console.log("before ", rawdata2);
        rawdata2.childAccount.pageSize = 3;
        rawdata2.childAccount.bufferSize = 2;

        fs.writeFile(protractor.loginHelpers.commonconfig(), JSON.stringify(rawdata2, null, 2), 'utf8', function (err, data) {
            if (err) {
                console.log(err);
            }
        });
        console.log("After ", rawdata2);

        //Launch to the MV2.0 application
        protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
        //Maximize the browser
        browser.driver.manage().window().maximize();
        //Implicit Wait
        browser.manage().timeouts().implicitlyWait(5000);

        //Login to the MV2.0 application
        protractor.loginHelpers.logInMV(testData4.corpSce5, testData4.passwordField);
        //Explicit wait, browser waits till the expected condition is met
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.Billing.GoToBillsButton))), 8000);
        //Click on Go to Bills Link
        element(by.xpath(testData3.Billing.GoToBillsButton)).click();
        //Explicit Wait to wait until the link/button is clickable
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.Transactions.AccountView))), 3000);

        //Click on AccountView in ChargeSummary Widget
        element(by.xpath(testData3.Transactions.AccountView)).click();
        //Click on Department/Corparate
        element(by.xpath(testData3.OfferCharge.AccountName_Expand)).click();
        //Click on ViewAll link
        element(by.xpath(testData3.OfferCharge.ViewAll_Link)).click();
        //Explicit Wait to verify presence of element
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.OfferCharge.Search_RecordText))), 3000);

        //Validate Record data is displayed on the screen  
        expect(element(by.xpath(testData3.OfferCharge.Search_RecordText)).getText()).toEqual("6 Of 7 records");

        //Validate Filter/Search bar is present
        expect(element(by.xpath(testData3.OfferCharge.FilterSearchField)).isPresent()).toBeTruthy();

        //Provide a value to the input/search text box
        var inputValue = "core";
        element.all(by.xpath(testData3.OfferCharge.FilterSearchField)).sendKeys(inputValue);
        //Get all the value displayed with the search key/data
        let searchFieldValues = element.all(by.xpath(testData3.OfferCharge.Text_ChildAccSearch));
        browser.sleep(2000);

        var count = 0;
        //To get Count of Values 
        searchFieldValues.count().then(function (searchFieldValuesCount) {
            let name;
            var numberDisplay;
            var value;
            //To get the data 
            searchFieldValues.getText().then(function (name) {
                //Itteration to get each value from the list of search data    
                for (var i = 0; i < searchFieldValuesCount; i++) {
                    var inputData = name[i];
                    //Get the count of occurences for the search
                    if (inputData.indexOf(inputValue) !== -1) {
                        count++;
                    }
                }
                //Validate the input value and the data matches
                element(by.xpath(testData3.OfferCharge.Search_RecordText)).getText().then(function (displayText) {
                    value = displayText.split(" ");
                    recordsValue = +0 + +value[0];
                    expect(count).toEqual(recordsValue);
                })
            })
        })
        //Clear input field and enter data
        element(by.xpath(testData3.OfferCharge.FilterSearchField)).clear().sendKeys("coreAcc");
        //Click on the Core Account
        element(by.xpath(testData3.OfferCharge.Text_ChildAccSearch)).click();
        browser.sleep(2000);
        //Explicit Wait to wait until the link/button is clickable
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.OfferCharge.LongList_ChildPO))), 3000);
        //Click on Child PO
        element(by.xpath(testData3.OfferCharge.LongList_ChildPO)).click();
        //Click on Child PI
        element(by.xpath(testData3.OfferCharge.LongList_ChildPI)).click();
        //Validate if the dialog box for the Child PI is displayed/opened
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).isPresent()).toBeTruthy();
        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.ChargeSummary_X_Button)).click();
        //Click on ViewAll link
        element(by.xpath(testData3.OfferCharge.ViewAll_Link)).click();
        //Explicit Wait to wait until the element is clickable
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.OfferCharge.FilterSearchField))), 3000);
        //Clear input field and enter data
        element(by.xpath(testData3.OfferCharge.FilterSearchField)).clear().sendKeys("deptAcc");
        //Click on the Core Account
        element(by.xpath(testData3.OfferCharge.Text_ChildAccSearch)).click();
        browser.sleep(2000);
        //Click on Child PO
        element(by.xpath(testData3.OfferCharge.LongList_ChildPO)).click();
        //Explicit Wait to wait until the element is clickable
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.OfferCharge.LongList_ChildPI))), 3000);
        //Click on Child PI
        element(by.xpath(testData3.OfferCharge.LongList_ChildPI)).click();

        //Validate if the dialog box for the Child PI is displayed/opened
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).isPresent()).toBeTruthy();
        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.ChargeSummary_X_Button)).click();

        //Click on ViewAll link
        element(by.xpath(testData3.OfferCharge.ViewAll_Link)).click();
        //Explicit Wait to wait until the element is clickable
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.OfferCharge.FilterSearchField))), 3000);
        //Clear input field and enter data
        element(by.xpath(testData3.OfferCharge.FilterSearchField)).clear().sendKeys("dept");
        //Click on the Core Account
        element(by.xpath(testData3.OfferCharge.ChildActSearch_Name)).click();
        browser.sleep(2000);
        //Click on Child PO
        element(by.xpath(testData3.OfferCharge.LongList_ChildPO2)).click();
        //Explicit Wait to wait until the element is clickable
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.OfferCharge.LongList_ChildPI2))), 3000);
        //Click on Child PI
        element(by.xpath(testData3.OfferCharge.LongList_ChildPI2)).click();

        //Validate if the dialog box for the Child PI is displayed/opened
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).isPresent()).toBeTruthy();
        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.ChargeSummary_X_Button)).click();
        //Logging out of the MetraView application
        protractor.loginHelpers.logOutMV();

   });

});