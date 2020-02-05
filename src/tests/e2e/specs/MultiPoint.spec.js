var testData1 = require('../inputs/testData/Login.json');
var testData3 = require('../inputs/testData/XpathRepository.json');
var testData4 = require('../inputs/testData/Multipointer1.json');
var testData6 = require('../inputs/testData/Multipointer2.json');
var testData7 = require('../inputs/testData/Multipointer3.json');
var testData8 = require('../inputs/testData/Multipointer4.json');
var EC = protractor.ExpectedConditions;


describe('MultiPoint functionality', function () {
    /**
     * Test Case: MetraView_Folder/ MetraView_2.0_Improved/ MetraView_Functionality_Validation/ 
     * 04_ChargesWithAdjustments_Transactions/ MultiPoint/ 
     * 3071_TC02_Ver_MP_AccV_Sce1 
     * "Account View", Corporate account is the Payer'
     */
    it('Validate Multi-Point PI functionality in "Account View", Corporate account is the Payer', function () {
        var testData5 = protractor.loginHelpers.lang;

        //Launch to the MV2.0 application
        protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
        //Maximize the browser
        browser.driver.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(5000);

        //Login to the MV2.0 application
        protractor.loginHelpers.logInMV(testData4.corpSce1, testData4.passwordField);

        //Explicit wait, browser waits till the expected condition is met
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.Billing.GoToBillsButton))), 10000);

        //Click on Go to Bills Link
        element(by.xpath(testData3.Billing.GoToBillsButton)).click();
        //Explicit wait, browser waits till the expected condition is met
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.Transactions.AccountView))), 10000);
        //Click on AccountView in ChargeSummary Widget
        element(by.xpath(testData3.Transactions.AccountView)).click();
        //Click on Department/Corparate
        element(by.xpath(testData3.OfferCharge.AccountName_Expand)).click();
        //Click on ViewAll link
        element(by.xpath(testData3.OfferCharge.ViewAll_Link)).click();
        //Explicit wait, browser waits till the expected condition is met
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.MultiPoint.POSelection_Localized))), 5000);
        //Click on PO
        element(by.xpath(testData3.MultiPoint.POSelection_localized)).click();
        //Explicit wait, browser waits till the expected condition is met
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.MultiPoint.PI_Selection))), 3000);
        //browser.sleep(5000);
        //Click on PI
        element(by.xpath(testData3.MultiPoint.PI_Selection)).click();
        //Explicit wait, browser waits till the expected condition is met
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.MultiPoint.AudioConfLocal))), 3000);
        element(by.xpath(testData3.MultiPoint.AudioConfLocal)).click();
        //Explicit wait, browser waits till the expected condition is met
        browser.wait(EC.presenceOf(element(by.xpath(testData3.OfferCharge.ParentPIName))), 3000);
        //Validating PI Launched
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");
        //Validate Font is Bold
        expect(element(by.xpath(testData3.OfferCharge.MultiPoint_Header)).getCssValue('font-weight')).toBeGreaterThan(600);
        //Validate Font is Bold
        expect(element(by.xpath(testData3.OfferCharge.MultiPointCharges_Header)).getCssValue('font-weight')).toBeGreaterThan(600);
        //Validate Select Multi-Point Dropdown
        expect(element(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown)).getText()).toEqual("Select Multi-Point");

        //Click on Select Multi-Point DropDown
        element(by.xpath(testData3.OfferCharge.MultiPoint_Select)).click();

        //Validate the DropDown Values present in Select Multi-Point
        let multiPointDropDown = element.all(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown));
        expect(multiPointDropDown.getText()).toEqual(['Select Multi-Point', 'Audio Conferencing Connections | $ 285.00', 'Audio Conferencing Feature | $ 7.00']);

        var total = 0;
        var multiChargeVal = 0;
        var charge;

        //To get Count of Values in Select Mult-point Dropdown
        multiPointDropDown.count().then(function (multiPointCount) {
            let name;
            //To get the Values in Dropdown
            multiPointDropDown.getText().then(function (name) {
                //Itteration to get each value in Dropdown    
                for (var i = 1; i < multiPointCount; i++) {
                    //Split the value and get only the Amount
                    var value = name[i].split("$");
                    charge = value[1];
                    //Calculate the total amount in the Child PIs
                    total = +total + +charge;
                }
                //Get the Display amount value on the application 
                element(by.xpath(testData3.OfferCharge.MultPoint_TotalAmtDept)).getText().then(function (displayAmt) {
                    //Split the value from $ and get only the numerics
                    var displayValue = displayAmt.split("$ ");
                    multiChargeVal = 0 + +displayValue[1];
                    //Validate each transaction under the Multi-Point Charges column is the Total of charges of the child PI's  
                    expect(multiChargeVal).toBe(total);
                });
            });
        });

        //Click on First Child PI in Dropdown
        element.all(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown)).then(function (options) {
            options[1].click();
        });
        browser.sleep(3000);
        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Connections");

        //Validate Heading in the Dialog box of the Child PI
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_Heading)).getText()).toEqual("Multi-Point");

        //Validate Child PI amount is displayed in the Dialog box
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_DispAmt)).isDisplayed()).toBe(true);

        var downloadpath = 'C:/Users/Developer/Downloads/';
        var fs = require('fs');
        var filename = downloadpath + 'OfferChargeSummary.csv';

        if (fs.existsSync(filename)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(filename);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        //Wait till the file downloads
        browser.sleep(10000);

        //Verify that the list of adjustments with adjustment amount and description should get downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(filename);
        }, 10000).then(function () {
            expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on Cardview icon
        element(by.xpath(testData3.OfferCharge.MultiPoint_CardView)).click();

        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Connections");

        //Validate Child PI amount is displayed in the Dialog box for CardView
        expect(element(by.xpath(testData3.OfferCharge.CardView_DispAmt)).isDisplayed()).toBe(true);

        var cardViewfilename = downloadpath + 'OfferChargeSummary (1).csv';
        if (fs.existsSync(cardViewfilename)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(cardViewfilename);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the details of the PI are downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(cardViewfilename);
        }, 10000).then(function () {
            expect(fs.readFileSync(cardViewfilename, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });
        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.DialogBox_CloseIcon)).click();

        //Validate Parent PI is displayed
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");

        //Click on Second Child PI in Dropdown
        element.all(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown)).then(function (options) {
            options[2].click();
        });
        browser.sleep(3000);
        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Feature");

        //Validate Heading in the Dialog box of the Child PI
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_Heading)).getText()).toEqual("Multi-Point");

        //Validate Child PI amount is displayed in the Dialog box
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_DispAmt)).isDisplayed()).toBe(true);

        var filename1 = downloadpath + 'OfferChargeSummary (2).csv';

        if (fs.existsSync(filename1)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(filename1);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the list of adjustments with adjustment amount and description should get downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(filename1);
        }, 10000).then(function () {
            expect(fs.readFileSync(filename1, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on Card view icon
        element(by.xpath(testData3.OfferCharge.MultiPoint_CardView)).click();

        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Feature");

        //Validate Child PI amount is displayed in the Dialog box for CardView
        expect(element(by.xpath(testData3.OfferCharge.CardView_DispAmt)).isDisplayed()).toBe(true);

        var cardViewfilename1 = downloadpath + 'OfferChargeSummary (3).csv';

        if (fs.existsSync(cardViewfilename1)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(cardViewfilename1);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the details of the PI are downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(cardViewfilename1);
        }, 10000).then(function () {

            //Validate data in the downloaded file
            expect(fs.readFileSync(cardViewfilename1, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.DialogBox_CloseIcon)).click();

        //Validate Parent PI is displayed
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");

        //Logging out of the MetraView application
        protractor.loginHelpers.logOutMV();
    });


    /**
     * Test Case: MetraView_Folder/ MetraView_2.0_Improved/ MetraView_Functionality_Validation/ 
     * 04_ChargesWithAdjustments_Transactions/ MultiPoint/ 
     * 3071_TC02_Ver_MP_AccV_Sce1 
     * "Account View", Department account is the Payer'
     */

    it('Validate Multi-Point PI functionality in "Account View", Department account is the Payer', function () {
        var testData5 = protractor.loginHelpers.lang;

        //Launch to the MV2.0 application
        protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
        
        //Login to the MV2.0 application
        protractor.loginHelpers.logInMV(testData4.deptSce1, testData4.passwordField);

        //Explicit wait, browser waits till the expected condition is met
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.Billing.GoToBillsButton))), 10000);



        //Click on Go to Bills Link
        element(by.xpath(testData3.Billing.GoToBillsButton)).click();
        browser.wait(protractor.ExpectedConditions.elementToBeClickable(element(by.xpath(testData3.Transactions.AccountView))), 3000);
        //Click on AccountView in ChargeSummary Widget
        element(by.xpath(testData3.Transactions.AccountView)).click();
        //Click on Department
        element(by.xpath(testData3.OfferCharge.AccountName_Expand)).click();
        browser.sleep(3000);
        //Click on PO
        element(by.xpath(testData3.OfferCharge.POSelection_Localized)).click();
        browser.sleep(3000);
        //Click on PI
        element(by.xpath(testData3.OfferCharge.PI_Selection)).click();
        browser.sleep(5000);
        //Validating PI Launched
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");

        //Validate Font is Bold
        expect(element(by.xpath(testData3.OfferCharge.MultiPoint_Header)).getCssValue('font-weight')).toBeGreaterThan(600);
        //Validate Font is Bold
        expect(element(by.xpath(testData3.OfferCharge.MultiPointCharges_Header)).getCssValue('font-weight')).toBeGreaterThan(600);
        //Validate Select Multi-Point Dropdown
        expect(element(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown)).getText()).toEqual("Select Multi-Point");

        //Click on Select Multi-Point DropDown
        element(by.xpath(testData3.OfferCharge.MultiPoint_Select)).click();

        //Validate the DropDown Values present in Select Multi-Point
        let multiPointDropDown = element.all(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown));
        expect(multiPointDropDown.getText()).toEqual(['Select Multi-Point', 'Audio Conferencing Connections | $ 285.00', 'Audio Conferencing Feature | $ 7.00']);


        var total = 0;
        var charge;

        //To get Count of Values in Select Mult-point Dropdown
        multiPointDropDown.count().then(function (multiPointCount) {

            let name;

            //To get the Values in Dropdown
            multiPointDropDown.getText().then(function (name) {
                //Itteration to get each value in Dropdown    
                for (var i = 1; i < multiPointCount; i++) {

                    //Split the value and get only the Amount
                    var value = name[i].split("$");

                    charge = value[1];
                    //Calculate the total amount in the Child PIs
                    total = +total + +charge;
                }

                element(by.xpath(testData3.OfferCharge.MultPoint_TotalAmtDept)).getText().then(function (displayAmt) {
                    var displayValue = displayAmt.split("$ ");
                    console.log(displayValue[1]);
                    displayValue = +0 + +displayValue[1];
                    expect(displayValue).toBe(total);
                });
            });
        });

        //Click on First Child PI in Dropdown
        element.all(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown)).then(function (options) {
            options[1].click();
        });
        browser.sleep(3000);
        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Connections");

        //Validate Heading in the Dialog box of the Child PI
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_Heading)).getText()).toEqual("Multi-Point");

        //Validate Child PI amount is displayed in the Dialog box
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_DispAmt)).isDisplayed()).toBe(true);


        var downloadpath = 'C:/Users/Developer/Downloads/';
        var fs = require('fs');

        var filename = downloadpath + 'OfferChargeSummary.csv';

        if (fs.existsSync(filename)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(filename);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the list of adjustments with adjustment amount and description should get downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(filename);
        }, 10000).then(function () {

            expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on Cardview icon
        element(by.xpath(testData3.OfferCharge.MultiPoint_CardView)).click();
        browser.sleep(3000);
        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Connections");


        //Validate Child PI amount is displayed in the Dialog box for CardView
        expect(element(by.xpath(testData3.OfferCharge.CardView_DispAmt)).isDisplayed()).toBe(true);


        var cardViewfilename = downloadpath + 'OfferChargeSummary (1).csv';

        if (fs.existsSync(cardViewfilename)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(cardViewfilename);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the details of the PI are downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(cardViewfilename);
        }, 15000).then(function () {

            expect(fs.readFileSync(cardViewfilename, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.DialogBox_CloseIcon)).click();

        //Validate Parent PI is displayed
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");


        //Click on Second Child PI in Dropdown
        element.all(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown)).then(function (options) {
            options[2].click();
        });
        browser.sleep(3000);
        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Feature");

        //Validate Heading in the Dialog box of the Child PI
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_Heading)).getText()).toEqual("Multi-Point");

        //Validate Child PI amount is displayed in the Dialog box
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_DispAmt)).isDisplayed()).toBe(true);


        var filename1 = downloadpath + 'OfferChargeSummary (2).csv';

        if (fs.existsSync(filename1)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(filename1);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);


        //Verify that the list of adjustments with adjustment amount and description should get downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(filename1);
        }, 10000).then(function () {

            expect(fs.readFileSync(filename1, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });


        element(by.xpath(testData3.OfferCharge.MultiPoint_CardView)).click();

        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Feature");


        //Validate Child PI amount is displayed in the Dialog box for CardView
        expect(element(by.xpath(testData3.OfferCharge.CardView_DispAmt)).isDisplayed()).toBe(true);


        var cardViewfilename1 = downloadpath + 'OfferChargeSummary (3).csv';

        if (fs.existsSync(cardViewfilename1)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(cardViewfilename1);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the details of the PI are downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(cardViewfilename1);
        }, 15000).then(function () {

            //Validate data in the downloaded file
            expect(fs.readFileSync(cardViewfilename1, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.DialogBox_CloseIcon)).click();

        //Validate Parent PI is displayed
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");

        //Logging out of the MetraView application
        protractor.loginHelpers.logOutMV();

    });

    /**
     * Test Case: MetraView_Folder/ MetraView_2.0_Improved/ MetraView_Functionality_Validation/
     *04_ChargesWithAdjustments_Transactions/ MultiPoint/ 
     *3071_TC01_Ver_MP_OffV_Sce1
     *"Offer View", Corporate account is the Payer
     */

    it('Validate Multi-Point PI functionality in "Offer View", Corporate account is the Payer', function () {
        var testData5 = protractor.loginHelpers.lang;

        //Launch to the MV2.0 application
        protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
        //Maximize the browser

        //Login to the MV2.0 application
        protractor.loginHelpers.logInMV(testData4.corpSce1, testData4.passwordField);

        //Explicit wait, browser waits till the expected condition is met
         browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.Billing.GoToBillsButton))), 10000);
        //Click on Go to Bills Link
        element(by.xpath(testData3.Billing.GoToBillsButton)).click();
        //Explicit wait, browser waits till the expected condition is met
        browser.wait(protractor.ExpectedConditions.elementToBeClickable(element(by.xpath(testData3.OfferCharge.AccountName_Expand))), 5000);
        //Click on PO
        element(by.xpath(testData3.OfferCharge.AccountName_Expand)).click();
        browser.sleep(3000);
        //Click on PI
        element(by.xpath(testData3.OfferCharge.OfferView_PISelection)).click();
        browser.sleep(3000);
        //Validating PI Launched
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");
        browser.sleep(3000);
        //Validate Font is Bold
        expect(element(by.xpath(testData3.OfferCharge.MultiPoint_Header)).getCssValue('font-weight')).toBeGreaterThan(600);
        //Validate Font is Bold
        expect(element(by.xpath(testData3.OfferCharge.MultiPointCharges_Header)).getCssValue('font-weight')).toBeGreaterThan(600);
        //Validate Select Multi-Point Dropdown
        expect(element(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown)).getText()).toEqual("Select Multi-Point");

        //Click on Select Multi-Point DropDown
        element(by.xpath(testData3.OfferCharge.MultiPoint_Select)).click();

        //Validate the DropDown Values present in Select Multi-Point
        let multiPointDropDown = element.all(by.xpath(testData3.OfferCharge.MulPoint2SelDropdown));
        expect(multiPointDropDown.getText()).toEqual(['Select Multi-Point', 'Audio Conferencing Connections | $ 285.00', 'Audio Conferencing Feature | $ 7.00']);


        var total = 0;
        var charge;

        //To get Count of Values in Select Mult-point Dropdown
        multiPointDropDown.count().then(function (multiPointCount) {
            let name;

            //To get the Values in Dropdown
            multiPointDropDown.getText().then(function (name) {
                //Itteration to get each value in Dropdown    
                for (var i = 1; i < multiPointCount; i++) {

                    //Split the value and get only the Amount
                    var value = name[i].split("$");

                    charge = value[1];
                    //Calculate the total amount in the Child PIs
                    total = +total + +charge;
                }

                element(by.xpath(testData3.OfferCharge.MultPoint_TotalAmt)).getText().then(function (displayAmt) {
                    var displayValue = displayAmt.split("$ ");
                    displayValue = +0 + +displayValue[1];
                    expect(displayValue).toBe(total);

                });
            });
        });

        //Click on First Child PI in Dropdown
        element.all(by.xpath(testData3.OfferCharge.MulPoint2SelDropdown)).then(function (options) {
            options[1].click();
        });
        browser.sleep(3000);
        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Connections");

        //Validate Heading in the Dialog box of the Child PI
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_Heading)).getText()).toEqual("Multi-Point");

        //Validate Child PI amount is displayed in the Dialog box
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_DispAmt)).isDisplayed()).toBe(true);


        var downloadpath = 'C:/Users/Developer/Downloads/';
        var fs = require('fs');

        var filename = downloadpath + 'OfferChargeSummary.csv';

        if (fs.existsSync(filename)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(filename);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the list of adjustments with adjustment amount and description should get downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(filename);
        }, 10000).then(function () {

            expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on Cardview icon
        element(by.xpath(testData3.OfferCharge.MultiPoint_CardView)).click();

        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Connections");

        //Validate Child PI amount is displayed in the Dialog box for CardView
        expect(element(by.xpath(testData3.OfferCharge.CardView_DispAmt)).isDisplayed()).toBe(true);


        var cardViewfilename = downloadpath + 'OfferChargeSummary (1).csv';

        if (fs.existsSync(cardViewfilename)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(cardViewfilename);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the details of the PI are downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(cardViewfilename);
        }, 10000).then(function () {

            expect(fs.readFileSync(cardViewfilename, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.DialogBox_CloseIcon)).click();

        //Validate Parent PI is displayed
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");


        //Click on Second Child PI in Dropdown
        element.all(by.xpath(testData3.OfferCharge.MulPoint2SelDropdown)).then(function (options) {
            options[2].click();
        });
        browser.sleep(3000);
        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Feature");

        //Validate Heading in the Dialog box of the Child PI
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_Heading)).getText()).toEqual("Multi-Point");

        //Validate Child PI amount is displayed in the Dialog box
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_DispAmt)).isDisplayed()).toBe(true);


        var filename1 = downloadpath + 'OfferChargeSummary (2).csv';

        if (fs.existsSync(filename1)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(filename1);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);


        //Verify that the list of adjustments with adjustment amount and description should get downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(filename1);
        }, 10000).then(function () {

            expect(fs.readFileSync(filename1, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });


        element(by.xpath(testData3.OfferCharge.MultiPoint_CardView)).click();

        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Feature");


        //Validate Child PI amount is displayed in the Dialog box for CardView
        expect(element(by.xpath(testData3.OfferCharge.CardView_DispAmt)).isDisplayed()).toBe(true);


        var cardViewfilename1 = downloadpath + 'OfferChargeSummary (3).csv';

        if (fs.existsSync(cardViewfilename1)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(cardViewfilename1);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the details of the PI are downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(cardViewfilename1);
        }, 10000).then(function () {

            //Validate data in the downloaded file
            expect(fs.readFileSync(cardViewfilename1, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.DialogBox_CloseIcon)).click();

        //Validate Parent PI is displayed
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");

        //Logging out of the MetraView application
        //element(by.xpath(testData3.SystemBar.Logout)).click()  
        protractor.loginHelpers.logOutMV();

    });


    /**
    * Test Case: MetraView_Folder/ MetraView_2.0_Improved/ MetraView_Functionality_Validation/
    *04_ChargesWithAdjustments_Transactions/ MultiPoint/ 
    *3071_TC01_Ver_MP_OffV_Sce1
    *"Offer View", Department account is the Payer
    */
    it('Validate Multi-Point PI functionality in "Offer View", Department account is the Payer', function () {
        var testData5 = protractor.loginHelpers.lang;


        //Launch to the MV2.0 application
        protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);

        //Login to the MV2.0 application
        protractor.loginHelpers.logInMV(testData4.deptSce1, testData4.passwordField);
         //Explicit wait, browser waits till the expected condition is met
         browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.Billing.GoToBillsButton))), 10000);
        //Click on Go to Bills Link
        element(by.xpath(testData3.Billing.GoToBillsButton)).click();
        //Explicit wait, browser waits till the expected condition is met
        browser.wait(protractor.ExpectedConditions.elementToBeClickable(element(by.xpath(testData3.OfferCharge.AccountName_Expand))), 3000);

        //Click on Department
        element(by.xpath(testData3.OfferCharge.AccountName_Expand)).click();
        browser.sleep(3000);
        //Click on PI
        element(by.xpath(testData3.OfferCharge.OfferView_PISelection)).click();
        browser.sleep(5000);
        //Validating PI Launched
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");

        //Validate Font is Bold
        expect(element(by.xpath(testData3.OfferCharge.MultiPoint_Header)).getCssValue('font-weight')).toBeGreaterThan(600);
        //Validate Font is Bold
        expect(element(by.xpath(testData3.OfferCharge.MultiPointCharges_Header)).getCssValue('font-weight')).toBeGreaterThan(600);
        //Validate Select Multi-Point Dropdown
        expect(element(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown)).getText()).toEqual("Select Multi-Point");

        //Click on Select Multi-Point DropDown
        element(by.xpath(testData3.OfferCharge.MultiPoint_Select)).click();

        //Validate the DropDown Values present in Select Multi-Point
        let multiPointDropDown = element.all(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown));
        expect(multiPointDropDown.getText()).toEqual(['Select Multi-Point', 'Audio Conferencing Connections | $ 285.00', 'Audio Conferencing Feature | $ 7.00']);

        var total = 0;
        var charge;

        //To get Count of Values in Select Mult-point Dropdown
        multiPointDropDown.count().then(function (multiPointCount) {

            let name;

            //To get the Values in Dropdown
            multiPointDropDown.getText().then(function (name) {
                //Itteration to get each value in Dropdown    
                for (var i = 1; i < multiPointCount; i++) {
                    //Split the value and get only the Amount
                    var value = name[i].split("$");
                    charge = value[1];
                    //Calculate the total amount in the Child PIs
                    total = +total + +charge;
                }

                element(by.xpath(testData3.OfferCharge.MultPoint_TotalAmtDept)).getText().then(function (displayAmt) {
                    var displayValue = displayAmt.split("$ ");
                    displayValue = +0 + +displayValue[1];
                    expect(displayValue).toBe(total);
                });
            });
        });

        //Click on First Child PI in Dropdown
        element.all(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown)).then(function (options) {
            options[1].click();
        });
        browser.sleep(3000);
        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Connections");

        //Validate Heading in the Dialog box of the Child PI
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_Heading)).getText()).toEqual("Multi-Point");

        //Validate Child PI amount is displayed in the Dialog box
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_DispAmt)).isDisplayed()).toBe(true);

        var downloadpath = 'C:/Users/Developer/Downloads/';
        var fs = require('fs');

        var filename = downloadpath + 'OfferChargeSummary.csv';

        if (fs.existsSync(filename)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(filename);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the list of adjustments with adjustment amount and description should get downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(filename);
        }, 10000).then(function () {

            expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on Cardview icon
        element(by.xpath(testData3.OfferCharge.MultiPoint_CardView)).click();
        browser.sleep(3000);
        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Connections");

        //Validate Child PI amount is displayed in the Dialog box for CardView
        expect(element(by.xpath(testData3.OfferCharge.CardView_DispAmt)).isDisplayed()).toBe(true);

        var cardViewfilename = downloadpath + 'OfferChargeSummary (1).csv';

        if (fs.existsSync(cardViewfilename)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(cardViewfilename);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the details of the PI are downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(cardViewfilename);
        }, 15000).then(function () {

            expect(fs.readFileSync(cardViewfilename, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.DialogBox_CloseIcon)).click();

        //Validate Parent PI is displayed
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");


        //Click on Second Child PI in Dropdown
        element.all(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown)).then(function (options) {
            options[2].click();
        });
        browser.sleep(3000);
        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Feature");

        //Validate Heading in the Dialog box of the Child PI
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_Heading)).getText()).toEqual("Multi-Point");

        //Validate Child PI amount is displayed in the Dialog box
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_DispAmt)).isDisplayed()).toBe(true);


        var filename1 = downloadpath + 'OfferChargeSummary (2).csv';

        if (fs.existsSync(filename1)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(filename1);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);


        //Verify that the list of adjustments with adjustment amount and description should get downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(filename1);
        }, 10000).then(function () {

            expect(fs.readFileSync(filename1, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });
        element(by.xpath(testData3.OfferCharge.MultiPoint_CardView)).click();

        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Feature");
        //Validate Child PI amount is displayed in the Dialog box for CardView
        expect(element(by.xpath(testData3.OfferCharge.CardView_DispAmt)).isDisplayed()).toBe(true);

        var cardViewfilename1 = downloadpath + 'OfferChargeSummary (3).csv';

        if (fs.existsSync(cardViewfilename1)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(cardViewfilename1);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the details of the PI are downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(cardViewfilename1);
        }, 10000).then(function () {

            //Validate data in the downloaded file
            expect(fs.readFileSync(cardViewfilename1, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.DialogBox_CloseIcon)).click();

        //Validate Parent PI is displayed
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");

        //Logging out of the MetraView application
        protractor.loginHelpers.logOutMV();

    });

    /**
     * MetraView_Folder/ MetraView_2.0_Improved/ MetraView_Functionality_Validation/
     *  04_ChargesWithAdjustments_Transactions/ MultiPoint/ 
     * 3071_TC03_Ver_MP_OffV_Sce2
     * "Offer View", Corporate account is the Payer for Department and Core
     */

    it('Validate Multi-Point PI functionality "Offer View", Corporate account is the Payer for Department and Core', function () {
        var testData5 = protractor.loginHelpers.lang;


        //Launch to the MV2.0 application
        protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
                
        //Login to the MV2.0 application
        protractor.loginHelpers.logInMV(testData6.corpSce2, testData6.passwordField);
        //Explicit wait, browser waits till the expected condition is met
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.Billing.GoToBillsButton))), 10000);
        //Click on Go to Bills Link
        element(by.xpath(testData3.Billing.GoToBillsButton)).click();
        //Explicit wait, browser waits till the expected condition is met
        browser.wait(protractor.ExpectedConditions.elementToBeClickable(element(by.xpath(testData3.OfferCharge.AccountName_Expand))), 3000);
        //Click on PO
        element(by.xpath(testData3.OfferCharge.AccountName_Expand)).click();
        browser.sleep(3000);
        //Click on PI
        element(by.xpath(testData3.OfferCharge.OfferView_PISelection)).click();
        browser.sleep(3000);
        //Validating PI Launched
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");
        browser.sleep(3000);
        //Validate Font is Bold
        expect(element(by.xpath(testData3.OfferCharge.MultiPoint_Header)).getCssValue('font-weight')).toBeGreaterThan(600);
        //Validate Font is Bold
        expect(element(by.xpath(testData3.OfferCharge.MultiPointCharges_Header)).getCssValue('font-weight')).toBeGreaterThan(600);
        //Validate Select Multi-Point Dropdown
        expect(element(by.xpath(testData3.OfferCharge.MulPoint2SelDropdown)).getText()).toEqual("Select Multi-Point");

        //Click on Select Multi-Point DropDown
        element(by.xpath(testData3.OfferCharge.MultiPoint_Select)).click();

        //Validate the DropDown Values present in Select Multi-Point
        let multiPointDropDown = element.all(by.xpath(testData3.OfferCharge.MulPoint2SelDropdown));
        expect(multiPointDropDown.getText()).toEqual(['Select Multi-Point', 'Audio Conferencing Connections | $ 285.00']);


        var total = 0;
        var charge;

        //To get Count of Values in Select Mult-point Dropdown
        multiPointDropDown.count().then(function (multiPointCount) {
            let name;

            //To get the Values in Dropdown
            multiPointDropDown.getText().then(function (name) {
                //Itteration to get each value in Dropdown    
                for (var i = 1; i < multiPointCount; i++) {

                    //Split the value and get only the Amount
                    var value = name[i].split("$");

                    charge = value[1];
                    //Calculate the total amount in the Child PIs
                    total = +total + +charge;
                }

                element(by.xpath(testData3.OfferCharge.MultPoint_TotalAmt)).getText().then(function (displayAmt) {
                    var displayValue = displayAmt.split("$ ");
                    console.log(displayValue[1]);
                    displayValue = +0 + +displayValue[1];
                    expect(displayValue).toBe(total);

                });
            });
        });

        //Click on First Child PI in Dropdown
        element.all(by.xpath(testData3.OfferCharge.MulPoint2SelDropdown)).then(function (options) {
            options[1].click();
        });
        browser.sleep(3000);
        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Connections");

        //Validate Heading in the Dialog box of the Child PI
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_Heading)).getText()).toEqual("Multi-Point");

        //Validate Child PI amount is displayed in the Dialog box
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_DispAmt)).isDisplayed()).toBe(true);


        var downloadpath = 'C:/Users/Developer/Downloads/';
        var fs = require('fs');

        var filename = downloadpath + 'OfferChargeSummary.csv';

        if (fs.existsSync(filename)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(filename);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the list of adjustments with adjustment amount and description should get downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(filename);
        }, 10000).then(function () {

            expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on Cardview icon
        element(by.xpath(testData3.OfferCharge.MultiPoint_CardView)).click();

        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Connections");


        //Validate Child PI amount is displayed in the Dialog box for CardView
        expect(element(by.xpath(testData3.OfferCharge.CardView_DispAmt)).isDisplayed()).toBe(true);


        var cardViewfilename = downloadpath + 'OfferChargeSummary (1).csv';

        if (fs.existsSync(cardViewfilename)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(cardViewfilename);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the details of the PI are downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(cardViewfilename);
        }, 10000).then(function () {

            expect(fs.readFileSync(cardViewfilename, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.DialogBox_CloseIcon)).click();

        //Validate Parent PI is displayed
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");

        //Validate Select Multi-Point Dropdown
        expect(element(by.xpath(testData3.OfferCharge.MulPoint3SelDropdown)).getText()).toEqual("Select Multi-Point");

        //Click on Second Core Account Select Multi-Point DropDown
        //element(by.xpath(testData3.OfferCharge.MulPoint3SelDropdown)).click();

        //Validate the DropDown Values present in Select Multi-Point
        let multiPointDropDown1 = element.all(by.xpath(testData3.OfferCharge.MulPoint3SelDropdown));
        expect(multiPointDropDown1.getText()).toEqual(['Select Multi-Point', 'Audio Conferencing Feature | $ 7.00']);

        var total1 = 0;
        var charge1;

        //To get Count of Values in Select Mult-point Dropdown
        multiPointDropDown1.count().then(function (multiPointCount) {
            let name;
            //To get the Values in Dropdown
            multiPointDropDown1.getText().then(function (name) {
                //Itteration to get each value in Dropdown    
                for (var i = 1; i < multiPointCount; i++) {

                    //Split the value and get only the Amount
                    var value = name[i].split("$");

                    charge1 = value[1];
                    //Calculate the total amount in the Child PIs
                    total1 = +total1 + +charge1;
                }

                element(by.xpath(testData3.OfferCharge.MultPoint_TotalAmt3)).getText().then(function (displayAmt) {
                    var displayValue = displayAmt.split("$ ");
                    displayValue = +0 + +displayValue[1];
                    expect(displayValue).toBe(total1);

                });
            });
        });

        //Click on First Child PI in Dropdown
        element.all(by.xpath(testData3.OfferCharge.MulPoint3SelDropdown)).then(function (options) {
            options[1].click();
        });
        browser.sleep(3000);

        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Feature");

        //Validate Heading in the Dialog box of the Child PI
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_Heading)).getText()).toEqual("Multi-Point");

        //Validate Child PI amount is displayed in the Dialog box
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_DispAmt)).isDisplayed()).toBe(true);

        var filename1 = downloadpath + 'OfferChargeSummary (2).csv';

        if (fs.existsSync(filename1)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(filename1);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);


        //Verify that the list of adjustments with adjustment amount and description should get downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(filename1);
        }, 10000).then(function () {

            expect(fs.readFileSync(filename1, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });


        element(by.xpath(testData3.OfferCharge.MultiPoint_CardView)).click();

        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Feature");


        //Validate Child PI amount is displayed in the Dialog box for CardView
        expect(element(by.xpath(testData3.OfferCharge.CardView_DispAmt)).isDisplayed()).toBe(true);


        var cardViewfilename1 = downloadpath + 'OfferChargeSummary (3).csv';

        if (fs.existsSync(cardViewfilename1)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(cardViewfilename1);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the details of the PI are downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(cardViewfilename1);
        }, 10000).then(function () {

            //Validate data in the downloaded file
            expect(fs.readFileSync(cardViewfilename1, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.DialogBox_CloseIcon)).click();

        //Validate Parent PI is displayed
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");


        //Logging out of the MetraView application
        protractor.loginHelpers.logOutMV();

    });


    //TC04
    it('Validate Multi-Point PI functionality "Offer View", Department account is the Payer for Corporate and Core', function () {
        var testData5 = protractor.loginHelpers.lang;

        //Launch to the MV2.0 application
        protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);

        //Login to the MV2.0 application
        protractor.loginHelpers.logInMV(testData7.deptSce3, testData7.passwordField);
        //Explicit wait, browser waits till the expected condition is met
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.Billing.GoToBillsButton))), 10000);
        //Click on Go to Bills Link
        element(by.xpath(testData3.Billing.GoToBillsButton)).click();
        //Explicit wait, browser waits till the expected condition is met
        browser.wait(protractor.ExpectedConditions.elementToBeClickable(element(by.xpath(testData3.OfferCharge.AccountName_Expand))), 3000);        
        //Click on PO
        element(by.xpath(testData3.OfferCharge.AccountName_Expand)).click();
        browser.sleep(3000);
        //Click on PI
        element(by.xpath(testData3.OfferCharge.OfferView_PISelection)).click();
        browser.sleep(3000);
        //Validating PI Launched
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");
        browser.sleep(3000);
        //Validate Font is Bold
        expect(element(by.xpath(testData3.OfferCharge.MultiPoint_Header)).getCssValue('font-weight')).toBeGreaterThan(600);
        //Validate Font is Bold
        expect(element(by.xpath(testData3.OfferCharge.MultiPointCharges_Header)).getCssValue('font-weight')).toBeGreaterThan(600);
        //Validate Select Multi-Point Dropdown
        expect(element(by.xpath(testData3.OfferCharge.MulPoint2SelDropdown)).getText()).toEqual("Select Multi-Point");

        //Click on Select Multi-Point DropDown
        element(by.xpath(testData3.OfferCharge.MultiPoint_Select)).click();

        //Validate the DropDown Values present in Select Multi-Point
        let multiPointDropDown = element.all(by.xpath(testData3.OfferCharge.MulPoint1SelDropdown));
        expect(multiPointDropDown.getText()).toEqual(['Select Multi-Point', 'Audio Conferencing Connections | $ 285.00', 'Audio Conferencing Feature | $ 7.00']);


        var total = 0;
        var charge;

        //To get Count of Values in Select Mult-point Dropdown
        multiPointDropDown.count().then(function (multiPointCount) {
            let name;

            //To get the Values in Dropdown
            multiPointDropDown.getText().then(function (name) {
                //Itteration to get each value in Dropdown    
                for (var i = 1; i < multiPointCount; i++) {

                    //Split the value and get only the Amount
                    var value = name[i].split("$");

                    charge = value[1];
                    //Calculate the total amount in the Child PIs
                    total = +total + +charge;
                }

                element(by.xpath(testData3.OfferCharge.MultPoint_TotalAmtDept)).getText().then(function (displayAmt) {
                    var displayValue = displayAmt.split("$ ");
                    console.log(displayValue[1]);
                    displayValue = +0 + +displayValue[1];

                    expect(displayValue).toBe(total);

                });
            });
        });

        //Click on First Child PI in Dropdown
        element.all(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown)).then(function (options) {
            options[1].click();
        });
        browser.sleep(3000);
        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Connections");

        //Validate Heading in the Dialog box of the Child PI
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_Heading)).getText()).toEqual("Multi-Point");

        //Validate Child PI amount is displayed in the Dialog box
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_DispAmt)).isDisplayed()).toBe(true);


        var downloadpath = 'C:/Users/Developer/Downloads/';
        var fs = require('fs');

        var filename = downloadpath + 'OfferChargeSummary.csv';

        if (fs.existsSync(filename)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(filename);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the list of adjustments with adjustment amount and description should get downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(filename);
        }, 10000).then(function () {

            expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on Cardview icon
        element(by.xpath(testData3.OfferCharge.MultiPoint_CardView)).click();

        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Connections");


        //Validate Child PI amount is displayed in the Dialog box for CardView
        expect(element(by.xpath(testData3.OfferCharge.CardView_DispAmt)).isDisplayed()).toBe(true);


        var cardViewfilename = downloadpath + 'OfferChargeSummary (1).csv';

        if (fs.existsSync(cardViewfilename)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(cardViewfilename);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the details of the PI are downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(cardViewfilename);
        }, 10000).then(function () {

            expect(fs.readFileSync(cardViewfilename, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.DialogBox_CloseIcon)).click();

        //Validate Parent PI is displayed
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");

        //Validate Select Multi-Point Dropdown
        expect(element(by.xpath(testData3.OfferCharge.MulPoint2SelDropdown)).getText()).toEqual("Select Multi-Point");

        //Click on Second Core Account Select Multi-Point DropDown
        element(by.xpath(testData3.OfferCharge.MulPoint2SelDropdown)).click();

        //Validate the DropDown Values present in Select Multi-Point
        let multiPointDropDown1 = element.all(by.xpath(testData3.OfferCharge.MulPoint2SelDropdown));
        expect(multiPointDropDown1.getText()).toEqual(['Select Multi-Point', 'Audio Conferencing Feature | $ 7.00']);

        var total1 = 0;
        var charge1;

        //To get Count of Values in Select Mult-point Dropdown
        multiPointDropDown1.count().then(function (multiPointCount) {
            let name;
            //To get the Values in Dropdown
            multiPointDropDown1.getText().then(function (name) {
                //Itteration to get each value in Dropdown    
                for (var i = 1; i < multiPointCount; i++) {
                    //Split the value and get only the Amount
                    var value = name[i].split("$");
                    charge1 = value[1];
                    //Calculate the total amount in the Child PIs
                    total1 = +total1 + +charge1;
                }

                element(by.xpath(testData3.OfferCharge.MultPoint_TotalAmt)).getText().then(function (displayAmt) {
                    var displayValue = displayAmt.split("$ ");
                    displayValue = +0 + +displayValue[1];
                    expect(displayValue).toBe(total1);
                });
            });
        });

        //Click on First Child PI in Dropdown
        element.all(by.xpath(testData3.OfferCharge.MulPoint2SelDropdown)).then(function (options) {
            options[1].click();
        });
        browser.sleep(3000);

        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Feature");

        //Validate Heading in the Dialog box of the Child PI
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_Heading)).getText()).toEqual("Multi-Point");

        //Validate Child PI amount is displayed in the Dialog box
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_DispAmt)).isDisplayed()).toBe(true);

        var filename1 = downloadpath + 'OfferChargeSummary (2).csv';

        if (fs.existsSync(filename1)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(filename1);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);


        //Verify that the list of adjustments with adjustment amount and description should get downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(filename1);
        }, 10000).then(function () {

            expect(fs.readFileSync(filename1, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });
        element(by.xpath(testData3.OfferCharge.MultiPoint_CardView)).click();

        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Feature");
        //Validate Child PI amount is displayed in the Dialog box for CardView
        expect(element(by.xpath(testData3.OfferCharge.CardView_DispAmt)).isDisplayed()).toBe(true);

        var cardViewfilename1 = downloadpath + 'OfferChargeSummary (3).csv';

        if (fs.existsSync(cardViewfilename1)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(cardViewfilename1);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the details of the PI are downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(cardViewfilename1);
        }, 10000).then(function () {

            //Validate data in the downloaded file
            expect(fs.readFileSync(cardViewfilename1, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.DialogBox_CloseIcon)).click();

        //Validate Parent PI is displayed
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");
        //Logging out of the MetraView application
        protractor.loginHelpers.logOutMV();

    });


    /**
     * MetraView_Folder/ MetraView_2.0_Improved/ MetraView_Functionality_Validation/ 
     * 04_ChargesWithAdjustments_Transactions/ MultiPoint/ 
     * 3071_TC05_Ver_MP_OffV_Sce4
     * "Offer View", Corporate account is the payer for Core Accounts
     */
    it('Validate Multi-Point PI functionality "Offer View", Corporate account is the payer for Core Accounts', function () {
        var testData5 = protractor.loginHelpers.lang;


        //Launch to the MV2.0 application
        protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
        //Maximize the browser
        
        //Login to the MV2.0 application
        protractor.loginHelpers.logInMV(testData8.corpSce4, testData4.passwordField);

        //Explicit wait, browser waits till the expected condition is met
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.Billing.GoToBillsButton))), 10000);
        //Click on Go to Bills Link
        element(by.xpath(testData3.Billing.GoToBillsButton)).click();
        //Explicit wait, browser waits till the expected condition is met
        browser.wait(protractor.ExpectedConditions.elementToBeClickable(element(by.xpath(testData3.OfferCharge.AccountName_Expand))), 3000);
        //Click on PO
        element(by.xpath(testData3.OfferCharge.AccountName_Expand)).click();
        browser.sleep(3000);
        //Click on PI
        element(by.xpath(testData3.OfferCharge.OfferView_PISelection)).click();
        browser.sleep(3000);
        //Validating PI Launched
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");
        browser.sleep(3000);
        //Validate Font is Bold
        expect(element(by.xpath(testData3.OfferCharge.MultiPoint_Header)).getCssValue('font-weight')).toBeGreaterThan(600);
        //Validate Font is Bold
        expect(element(by.xpath(testData3.OfferCharge.MultiPointCharges_Header)).getCssValue('font-weight')).toBeGreaterThan(600);
        //Validate Select Multi-Point Dropdown
        expect(element(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown)).getText()).toEqual("Select Multi-Point");

        //Click on Select Multi-Point DropDown
        element(by.xpath(testData3.OfferCharge.MultiPoint_Select)).click();

        //Validate the DropDown Values present in Select Multi-Point
        let multiPointDropDown = element.all(by.xpath(testData3.OfferCharge.MulPoint1SelDropdown));
        expect(multiPointDropDown.getText()).toEqual(['Select Multi-Point', 'Audio Conferencing Connections | $ 285.00']);


        var total = 0;
        var charge;

        //To get Count of Values in Select Mult-point Dropdown
        multiPointDropDown.count().then(function (multiPointCount) {
            let name;

            //To get the Values in Dropdown
            multiPointDropDown.getText().then(function (name) {
                //Itteration to get each value in Dropdown    
                for (var i = 1; i < multiPointCount; i++) {

                    //Split the value and get only the Amount
                    var value = name[i].split("$");

                    charge = value[1];
                    //Calculate the total amount in the Child PIs
                    total = +total + +charge;
                }

                element(by.xpath(testData3.OfferCharge.MultPoint_TotalAmtDept)).getText().then(function (displayAmt) {
                    var displayValue = displayAmt.split("$ ");
                    displayValue = +0 + +displayValue[1];
                    expect(displayValue).toBe(total);

                });
            });
        });

        //Click on First Child PI in Dropdown
        element.all(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown)).then(function (options) {
            options[1].click();
        });
        browser.sleep(3000);
        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Connections");

        //Validate Heading in the Dialog box of the Child PI
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_Heading)).getText()).toEqual("Multi-Point");

        //Validate Child PI amount is displayed in the Dialog box
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_DispAmt)).isDisplayed()).toBe(true);


        var downloadpath = 'C:/Users/Developer/Downloads/';
        var fs = require('fs');

        var filename = downloadpath + 'OfferChargeSummary.csv';

        if (fs.existsSync(filename)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(filename);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the list of adjustments with adjustment amount and description should get downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(filename);
        }, 10000).then(function () {

            expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on Cardview icon
        element(by.xpath(testData3.OfferCharge.MultiPoint_CardView)).click();

        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Connections");

        //Validate Child PI amount is displayed in the Dialog box for CardView
        expect(element(by.xpath(testData3.OfferCharge.CardView_DispAmt)).isDisplayed()).toBe(true);

        var cardViewfilename = downloadpath + 'OfferChargeSummary (1).csv';

        if (fs.existsSync(cardViewfilename)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(cardViewfilename);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the details of the PI are downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(cardViewfilename);
        }, 10000).then(function () {

            expect(fs.readFileSync(cardViewfilename, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.DialogBox_CloseIcon)).click();

        //Validate Parent PI is displayed
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");

        //Validate Select Multi-Point Dropdown
        expect(element(by.xpath(testData3.OfferCharge.MultiPoint_SelectOption)).getText()).toEqual("Select Multi-Point");

        //Click on Second Core Account Select Multi-Point DropDown
        element(by.xpath(testData3.OfferCharge.MultiPoint_Select)).click();

        //Validate the DropDown Values present in Select Multi-Point
        let multiPointDropDown1 = element.all(by.xpath(testData3.OfferCharge.MulPoint2SelDropdown));
        expect(multiPointDropDown1.getText()).toEqual(['Select Multi-Point', 'Audio Conferencing Feature | $ 7.00']);

        var total1 = 0;
        var charge1;

        //To get Count of Values in Select Mult-point Dropdown
        multiPointDropDown1.count().then(function (multiPointCount) {
            let name;
            //To get the Values in Dropdown
            multiPointDropDown1.getText().then(function (name) {
                //Itteration to get each value in Dropdown    
                for (var i = 1; i < multiPointCount; i++) {

                    //Split the value and get only the Amount
                    var value = name[i].split("$");

                    charge1 = value[1];
                    //Calculate the total amount in the Child PIs
                    total1 = +total1 + +charge1;
                }

                element(by.xpath(testData3.OfferCharge.MultPoint_TotalAmt)).getText().then(function (displayAmt) {
                    var displayValue = displayAmt.split("$ ");
                    displayValue = +0 + +displayValue[1];
                    expect(displayValue).toBe(total1);

                });
            });
        });

        //Click on First Child PI in Dropdown
        element.all(by.xpath(testData3.OfferCharge.MultiPoint_SelectOption)).then(function (options) {
            options[1].click();
        });
        browser.sleep(3000);

        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Feature");

        //Validate Heading in the Dialog box of the Child PI
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_Heading)).getText()).toEqual("Multi-Point");

        //Validate Child PI amount is displayed in the Dialog box
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_DispAmt)).isDisplayed()).toBe(true);

        var filename1 = downloadpath + 'OfferChargeSummary (2).csv';

        if (fs.existsSync(filename1)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(filename1);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);


        //Verify that the list of adjustments with adjustment amount and description should get downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(filename1);
        }, 10000).then(function () {

            expect(fs.readFileSync(filename1, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });


        element(by.xpath(testData3.OfferCharge.MultiPoint_CardView)).click();

        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Feature");


        //Validate Child PI amount is displayed in the Dialog box for CardView
        expect(element(by.xpath(testData3.OfferCharge.CardView_DispAmt)).isDisplayed()).toBe(true);


        var cardViewfilename1 = downloadpath + 'OfferChargeSummary (3).csv';

        if (fs.existsSync(cardViewfilename1)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(cardViewfilename1);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the details of the PI are downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(cardViewfilename1);
        }, 10000).then(function () {

            //Validate data in the downloaded file
            expect(fs.readFileSync(cardViewfilename1, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.DialogBox_CloseIcon)).click();

        //Validate Parent PI is displayed
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");

        //Validate "Select Multi-Point" drop-down is displayed for Core3 Account
        expect(element(by.xpath(testData3.OfferCharge.MultiPoint_Select)).isPresent()).toBeFalsy();

        //Validate "Multi-Point Charges" is empty for Core3 Account
        expect(element(by.xpath(testData3.OfferCharge.MultPoint_TotalAmt3)).isPresent()).toBeFalsy();

        //Logging out of the MetraView application
        protractor.loginHelpers.logOutMV();
    });

    /**
     * MetraView_Folder/ MetraView_2.0_Improved/ MetraView_Functionality_Validation/ 
     * 04_ChargesWithAdjustments_Transactions/ MultiPoint/ 
     * 3071_TC06_Ver_MP_OffV_Sce4_SelfP
     * "Offer View", for Self-payer
     */
    it('Validate Multi-Point PI functionality "Offer View", for Self-payer', function () {
        var testData5 = protractor.loginHelpers.lang;


        //Launch to the MV2.0 application
        protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);

        //Login to the MV2.0 application
        protractor.loginHelpers.logInMV(testData8.core4Sce4, testData4.passwordField);
        //Explicit wait, browser waits till the expected condition is met
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.Billing.GoToBillsButton))), 10000);
        //Click on Go to Bills Link
        element(by.xpath(testData3.Billing.GoToBillsButton)).click();
        //Explicit wait, browser waits till the expected condition is met
        browser.wait(protractor.ExpectedConditions.elementToBeClickable(element(by.xpath(testData3.OfferCharge.AccountName_Expand))), 3000);
        //Click on PO
        element(by.xpath(testData3.OfferCharge.AccountName_Expand)).click();
        browser.sleep(3000);
        //Click on PI
        element(by.xpath(testData3.OfferCharge.OfferView_PISelection)).click();
        browser.sleep(3000);
        //Validating PI Launched
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");
        browser.sleep(3000);
        //Validate Font is Bold
        expect(element(by.xpath(testData3.OfferCharge.MultiPoint_Header)).getCssValue('font-weight')).toBeGreaterThan(600);
        //Validate Font is Bold
        expect(element(by.xpath(testData3.OfferCharge.MultiPointCharges_Header)).getCssValue('font-weight')).toBeGreaterThan(600);
        //Validate Select Multi-Point Dropdown
        expect(element(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown)).getText()).toEqual("Select Multi-Point");

        //Click on Select Multi-Point DropDown
        element(by.xpath(testData3.OfferCharge.MultiPoint_Select)).click();

        //Validate the DropDown Values present in Select Multi-Point
        let multiPointDropDown = element.all(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown));
        expect(multiPointDropDown.getText()).toEqual(['Select Multi-Point', 'Audio Conferencing Connections | $ 285.00', 'Audio Conferencing Feature | $ 7.00']);


        var total = 0;
        var charge;

        //To get Count of Values in Select Mult-point Dropdown
        multiPointDropDown.count().then(function (multiPointCount) {
            let name;

            //To get the Values in Dropdown
            multiPointDropDown.getText().then(function (name) {
                //Itteration to get each value in Dropdown    
                for (var i = 1; i < multiPointCount; i++) {

                    //Split the value and get only the Amount
                    var value = name[i].split("$");

                    charge = value[1];
                    //Calculate the total amount in the Child PIs
                    total = +total + +charge;
                }

                element(by.xpath(testData3.OfferCharge.MultPoint_TotalAmtDept)).getText().then(function (displayAmt) {
                    var displayValue = displayAmt.split("$ ");
                    console.log(displayValue[1]);
                    displayValue = +0 + +displayValue[1];

                    expect(displayValue).toBe(total);

                });
            });
        });

        //Click on First Child PI in Dropdown
        element.all(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown)).then(function (options) {
            options[1].click();
        });
        browser.sleep(3000);
        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Connections");

        //Validate Heading in the Dialog box of the Child PI
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_Heading)).getText()).toEqual("Multi-Point");

        //Validate Child PI amount is displayed in the Dialog box
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_DispAmt)).isDisplayed()).toBe(true);


        var downloadpath = 'C:/Users/Developer/Downloads/';
        var fs = require('fs');

        var filename = downloadpath + 'OfferChargeSummary.csv';

        if (fs.existsSync(filename)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(filename);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the list of adjustments with adjustment amount and description should get downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(filename);
        }, 10000).then(function () {

            expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on Cardview icon
        element(by.xpath(testData3.OfferCharge.MultiPoint_CardView)).click();

        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Connections");


        //Validate Child PI amount is displayed in the Dialog box for CardView
        expect(element(by.xpath(testData3.OfferCharge.CardView_DispAmt)).isDisplayed()).toBe(true);


        var cardViewfilename = downloadpath + 'OfferChargeSummary (1).csv';

        if (fs.existsSync(cardViewfilename)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(cardViewfilename);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the details of the PI are downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(cardViewfilename);
        }, 10000).then(function () {

            expect(fs.readFileSync(cardViewfilename, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.DialogBox_CloseIcon)).click();

        //Validate Parent PI is displayed
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");


        //Click on Second Child PI in Dropdown
        element.all(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown)).then(function (options) {
            options[2].click();
        });
        browser.sleep(3000);
        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Feature");

        //Validate Heading in the Dialog box of the Child PI
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_Heading)).getText()).toEqual("Multi-Point");

        //Validate Child PI amount is displayed in the Dialog box
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_DispAmt)).isDisplayed()).toBe(true);


        var filename1 = downloadpath + 'OfferChargeSummary (2).csv';

        if (fs.existsSync(filename1)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(filename1);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);


        //Verify that the list of adjustments with adjustment amount and description should get downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(filename1);
        }, 10000).then(function () {

            expect(fs.readFileSync(filename1, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });


        element(by.xpath(testData3.OfferCharge.MultiPoint_CardView)).click();

        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Feature");


        //Validate Child PI amount is displayed in the Dialog box for CardView
        expect(element(by.xpath(testData3.OfferCharge.CardView_DispAmt)).isDisplayed()).toBe(true);


        var cardViewfilename1 = downloadpath + 'OfferChargeSummary (3).csv';

        if (fs.existsSync(cardViewfilename1)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(cardViewfilename1);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the details of the PI are downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(cardViewfilename1);
        }, 10000).then(function () {

            //Validate data in the downloaded file
            expect(fs.readFileSync(cardViewfilename1, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.DialogBox_CloseIcon)).click();

        //Validate Parent PI is displayed
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");

        //Logging out of the MetraView application
        //element(by.xpath(testData3.SystemBar.Logout)).click()  
        protractor.loginHelpers.logOutMV();


    });


    /**
     * MetraView_Folder/ MetraView_2.0_Improved/ MetraView_Functionality_Validation/ 
     * 04_ChargesWithAdjustments_Transactions/ MultiPoint/ 
     * 3071_TC07_Ver_MP_AccV_Sce4_SelfP
     *  "Account View", for Self-payer
     */
    it('Validate Multi-Point PI functionality in "Account View", for Self-payer', function () {
        var testData5 = protractor.loginHelpers.lang;


        //Launch to the MV2.0 application
        protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
        
        //Login to the MV2.0 application
        protractor.loginHelpers.logInMV(testData8.core4Sce4, testData4.passwordField);
        //Explicit wait, browser waits till the expected condition is met
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.Billing.GoToBillsButton))), 8000);
        //Click on Go to Bills Link
        element(by.xpath(testData3.Billing.GoToBillsButton)).click();
        //Explicit Wait to wait until the link/button is clickable
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.Transactions.AccountView))), 3000);

        //Click on AccountView in ChargeSummary Widget
        element(by.xpath(testData3.Transactions.AccountView)).click();
        browser.sleep(3000);
        //Click on Department
        element(by.xpath(testData3.OfferCharge.AccountName_Expand)).click();
        browser.sleep(3000);
        //Click on PO
        element(by.xpath(testData3.OfferCharge.POSelection_Localized)).click();
        browser.sleep(3000);
        //Click on PI
        element(by.xpath(testData3.OfferCharge.PI_Selection)).click();
        browser.sleep(3000);
        //Validating PI Launched
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");

        //Validate Font is Bold
        expect(element(by.xpath(testData3.OfferCharge.MultiPoint_Header)).getCssValue('font-weight')).toBeGreaterThan(600);
        //Validate Font is Bold
        expect(element(by.xpath(testData3.OfferCharge.MultiPointCharges_Header)).getCssValue('font-weight')).toBeGreaterThan(600);
        //Validate Select Multi-Point Dropdown
        expect(element(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown)).getText()).toEqual("Select Multi-Point");

        //Click on Select Multi-Point DropDown
        element(by.xpath(testData3.OfferCharge.MultiPoint_Select)).click();

        //Validate the DropDown Values present in Select Multi-Point
        let multiPointDropDown = element.all(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown));
        expect(multiPointDropDown.getText()).toEqual(['Select Multi-Point', 'Audio Conferencing Connections | $ 285.00', 'Audio Conferencing Feature | $ 7.00']);


        var total = 0;
        var charge;

        //To get Count of Values in Select Mult-point Dropdown
        multiPointDropDown.count().then(function (multiPointCount) {
            let name;

            //To get the Values in Dropdown
            multiPointDropDown.getText().then(function (name) {
                //Itteration to get each value in Dropdown    
                for (var i = 1; i < multiPointCount; i++) {

                    //Split the value and get only the Amount
                    var value = name[i].split("$");

                    charge = value[1];
                    //Calculate the total amount in the Child PIs
                    total = +total + +charge;
                }

                element(by.xpath(testData3.OfferCharge.MultPoint_TotalAmtDept)).getText().then(function (displayAmt) {
                    var displayValue = displayAmt.split("$ ");
                    console.log(displayValue[1]);
                    displayValue = +0 + +displayValue[1];
                    expect(displayValue).toBe(total);

                });
            });
        });

        //Click on First Child PI in Dropdown
        element.all(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown)).then(function (options) {
            options[1].click();
        });
        browser.sleep(3000);
        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Connections");

        //Validate Heading in the Dialog box of the Child PI
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_Heading)).getText()).toEqual("Multi-Point");

        //Validate Child PI amount is displayed in the Dialog box
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_DispAmt)).isDisplayed()).toBe(true);


        var downloadpath = 'C:/Users/Developer/Downloads/';
        var fs = require('fs');

        var filename = downloadpath + 'OfferChargeSummary.csv';

        if (fs.existsSync(filename)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(filename);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the list of adjustments with adjustment amount and description should get downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(filename);
        }, 10000).then(function () {

            expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on Cardview icon
        element(by.xpath(testData3.OfferCharge.MultiPoint_CardView)).click();

        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Connections");


        //Validate Child PI amount is displayed in the Dialog box for CardView
        expect(element(by.xpath(testData3.OfferCharge.CardView_DispAmt)).isDisplayed()).toBe(true);


        var cardViewfilename = downloadpath + 'OfferChargeSummary (1).csv';

        if (fs.existsSync(cardViewfilename)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(cardViewfilename);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the details of the PI are downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(cardViewfilename);
        }, 10000).then(function () {

            expect(fs.readFileSync(cardViewfilename, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.DialogBox_CloseIcon)).click();

        //Validate Parent PI is displayed
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");


        //Click on Second Child PI in Dropdown
        element.all(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown)).then(function (options) {
            options[2].click();
        });
        browser.sleep(3000);
        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Feature");

        //Validate Heading in the Dialog box of the Child PI
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_Heading)).getText()).toEqual("Multi-Point");

        //Validate Child PI amount is displayed in the Dialog box
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_DispAmt)).isDisplayed()).toBe(true);


        var filename1 = downloadpath + 'OfferChargeSummary (2).csv';

        if (fs.existsSync(filename1)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(filename1);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);


        //Verify that the list of adjustments with adjustment amount and description should get downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(filename1);
        }, 10000).then(function () {

            expect(fs.readFileSync(filename1, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });


        element(by.xpath(testData3.OfferCharge.MultiPoint_CardView)).click();

        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Feature");


        //Validate Child PI amount is displayed in the Dialog box for CardView
        expect(element(by.xpath(testData3.OfferCharge.CardView_DispAmt)).isDisplayed()).toBe(true);


        var cardViewfilename1 = downloadpath + 'OfferChargeSummary (3).csv';

        if (fs.existsSync(cardViewfilename1)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(cardViewfilename1);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the details of the PI are downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(cardViewfilename1);
        }, 10000).then(function () {

            //Validate data in the downloaded file
            expect(fs.readFileSync(cardViewfilename1, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.DialogBox_CloseIcon)).click();

        //Validate Parent PI is displayed
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");

        //Logging out of the MetraView application
        //element(by.xpath(testData3.SystemBar.Logout)).click()  
        protractor.loginHelpers.logOutMV();


    });

    /**
     * 3071_TC11
     */
    it('Validate Multi-Point PI functionality in Transactions "Account View", Corporate account is payer', function () {
        var testData5 = protractor.loginHelpers.lang;

        //Launch to the MV2.0 application
        protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);

        //Login to the MV2.0 application
        protractor.loginHelpers.logInMV(testData4.corpSce1, testData4.passwordField);
        //Explicit wait, browser waits till the expected condition is met
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.Quotes.Transactions_Link))), 8000);
        //Click on Go to Bills Link
        element(by.xpath(testData3.Quotes.Transactions_Link)).click();
        //Explicit Wait to wait until the link/button is clickable
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.Transactions.AccountView))), 3000);
        //Click on AccountView in ChargeSummary Widget
        element(by.xpath(testData3.Transactions.AccountView)).click();
        //Click on Department/Corparate
        element(by.xpath(testData3.OfferCharge.AccountName_Expand)).click();
        //Click on PO
        element(by.xpath(testData3.MultiPoint.POSelection_localized)).click();
        //browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.MultiPoint.PI_Selection))), 3000);
        browser.sleep(2000);
        //Click on PI
        element(by.xpath(testData3.MultiPoint.PI_Selection)).click();
        browser.sleep(3000);
        element(by.xpath(testData3.MultiPoint.AudioConfLocal)).click();
        browser.sleep(3000);
        //Validating PI Launched
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");

        //Validate Font is Bold
        expect(element(by.xpath(testData3.OfferCharge.MultiPoint_Header)).getCssValue('font-weight')).toBeGreaterThan(600);
        //Validate Font is Bold
        expect(element(by.xpath(testData3.OfferCharge.MultiPointCharges_Header)).getCssValue('font-weight')).toBeGreaterThan(600);
        //Validate Select Multi-Point Dropdown
        expect(element(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown)).getText()).toEqual("Select Multi-Point");

        //Click on Select Multi-Point DropDown
        element(by.xpath(testData3.OfferCharge.MultiPoint_Select)).click();

        //Validate the DropDown Values present in Select Multi-Point
        let multiPointDropDown = element.all(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown));
        expect(multiPointDropDown.getText()).toEqual(['Select Multi-Point', 'Audio Conferencing Connections | $ 285.00', 'Audio Conferencing Feature | $ 7.00']);


        var total = 0;
        var multiChargeVal = 0;
        var charge;

        //To get Count of Values in Select Mult-point Dropdown
        multiPointDropDown.count().then(function (multiPointCount) {
            let name;

            //To get the Values in Dropdown
            multiPointDropDown.getText().then(function (name) {
                //Itteration to get each value in Dropdown    
                for (var i = 1; i < multiPointCount; i++) {

                    //Split the value and get only the Amount
                    var value = name[i].split("$");

                    charge = value[1];
                    //Calculate the total amount in the Child PIs
                    total = +total + +charge;
                }
                //Get the Display amount value on the application 
                element(by.xpath(testData3.OfferCharge.MultPoint_TotalAmtDept)).getText().then(function (displayAmt) {
                    //Split the value from $ and get only the numerics
                    var displayValue = displayAmt.split("$ ");
                    multiChargeVal = 0 + +displayValue[1];
                    //Validate each transaction under the Multi-Point Charges column is the Total of charges of the child PI's  
                    expect(multiChargeVal).toBe(total);
                });

            });
        });

        //Click on First Child PI in Dropdown
        element.all(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown)).then(function (options) {
            options[1].click();
        });
        browser.sleep(3000);
        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Connections");

        //Validate Heading in the Dialog box of the Child PI
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_Heading)).getText()).toEqual("Multi-Point");

        //Validate Child PI amount is displayed in the Dialog box
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_DispAmt)).isDisplayed()).toBe(true);


        var downloadpath = 'C:/Users/Developer/Downloads/';
        var fs = require('fs');

        var filename = downloadpath + 'OfferChargeSummary.csv';

        if (fs.existsSync(filename)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(filename);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        //Wait till the file downloads
        browser.sleep(10000);

        //Verify that the list of adjustments with adjustment amount and description should get downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(filename);
        }, 10000).then(function () {

            expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on Cardview icon
        element(by.xpath(testData3.OfferCharge.MultiPoint_CardView)).click();

        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Connections");


        //Validate Child PI amount is displayed in the Dialog box for CardView
        expect(element(by.xpath(testData3.OfferCharge.CardView_DispAmt)).isDisplayed()).toBe(true);


        var cardViewfilename = downloadpath + 'OfferChargeSummary (1).csv';

        if (fs.existsSync(cardViewfilename)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(cardViewfilename);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the details of the PI are downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(cardViewfilename);
        }, 15000).then(function () {

            expect(fs.readFileSync(cardViewfilename, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });
        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.DialogBox_CloseIcon)).click();

        //Validate Parent PI is displayed
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");

        //Click on Second Child PI in Dropdown
        element.all(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown)).then(function (options) {
            options[2].click();
        });
        browser.sleep(3000);
        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Feature");

        //Validate Heading in the Dialog box of the Child PI
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_Heading)).getText()).toEqual("Multi-Point");

        //Validate Child PI amount is displayed in the Dialog box
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_DispAmt)).isDisplayed()).toBe(true);


        var filename1 = downloadpath + 'OfferChargeSummary (2).csv';

        if (fs.existsSync(filename1)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(filename1);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);


        //Verify that the list of adjustments with adjustment amount and description should get downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(filename1);
        }, 10000).then(function () {

            expect(fs.readFileSync(filename1, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });


        element(by.xpath(testData3.OfferCharge.MultiPoint_CardView)).click();

        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Feature");


        //Validate Child PI amount is displayed in the Dialog box for CardView
        expect(element(by.xpath(testData3.OfferCharge.CardView_DispAmt)).isDisplayed()).toBe(true);


        var cardViewfilename1 = downloadpath + 'OfferChargeSummary (3).csv';

        if (fs.existsSync(cardViewfilename1)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(cardViewfilename1);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the details of the PI are downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(cardViewfilename1);
        }, 15000).then(function () {

            //Validate data in the downloaded file
            expect(fs.readFileSync(cardViewfilename1, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.DialogBox_CloseIcon)).click();

        //Validate Parent PI is displayed
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");

        //Logging out of the MetraView application
        protractor.loginHelpers.logOutMV();

    });

    //TC11
    it('Validate Multi-Point PI functionality in Transactions "Account View", Department account is the Payer', function () {
        var testData5 = protractor.loginHelpers.lang;

        //Launch to the MV2.0 application
        protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
        //Login to the MV2.0 application
        protractor.loginHelpers.logInMV(testData4.deptSce1, testData4.passwordField);
        //Explicit wait, browser waits till the expected condition is met
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.Quotes.Transactions_Link))), 8000);
        //Click on Go to Bills Link
        element(by.xpath(testData3.Quotes.Transactions_Link)).click();
        //Explicit Wait to wait until the link/button is clickable
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.Transactions.AccountView))), 3000);
        //Click on AccountView in ChargeSummary Widget
        element(by.xpath(testData3.Transactions.AccountView)).click();
        //Click on Department
        element(by.xpath(testData3.OfferCharge.AccountName_Expand)).click();
        browser.sleep(3000);
        //Click on PO
        element(by.xpath(testData3.OfferCharge.POSelection_Localized)).click();
        browser.sleep(3000);
        //Click on PI
        element(by.xpath(testData3.OfferCharge.PI_Selection)).click();
        browser.sleep(5000);
        //Validating PI Launched
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");

        //Validate Font is Bold
        expect(element(by.xpath(testData3.OfferCharge.MultiPoint_Header)).getCssValue('font-weight')).toBeGreaterThan(600);
        //Validate Font is Bold
        expect(element(by.xpath(testData3.OfferCharge.MultiPointCharges_Header)).getCssValue('font-weight')).toBeGreaterThan(600);
        //Validate Select Multi-Point Dropdown
        expect(element(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown)).getText()).toEqual("Select Multi-Point");

        //Click on Select Multi-Point DropDown
        element(by.xpath(testData3.OfferCharge.MultiPoint_Select)).click();

        //Validate the DropDown Values present in Select Multi-Point
        let multiPointDropDown = element.all(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown));
        expect(multiPointDropDown.getText()).toEqual(['Select Multi-Point', 'Audio Conferencing Connections | $ 285.00', 'Audio Conferencing Feature | $ 7.00']);


        var total = 0;
        var charge;

        //To get Count of Values in Select Mult-point Dropdown
        multiPointDropDown.count().then(function (multiPointCount) {

            let name;

            //To get the Values in Dropdown
            multiPointDropDown.getText().then(function (name) {
                //Itteration to get each value in Dropdown    
                for (var i = 1; i < multiPointCount; i++) {

                    //Split the value and get only the Amount
                    var value = name[i].split("$");

                    charge = value[1];
                    //Calculate the total amount in the Child PIs
                    total = +total + +charge;
                }

                element(by.xpath(testData3.OfferCharge.MultPoint_TotalAmtDept)).getText().then(function (displayAmt) {
                    var displayValue = displayAmt.split("$ ");
                    displayValue = +0 + +displayValue[1];
                    expect(displayValue).toBe(total);

                });
            });
        });

        //Click on First Child PI in Dropdown
        element.all(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown)).then(function (options) {
            options[1].click();
        });
        browser.sleep(3000);
        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Connections");

        //Validate Heading in the Dialog box of the Child PI
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_Heading)).getText()).toEqual("Multi-Point");

        //Validate Child PI amount is displayed in the Dialog box
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_DispAmt)).isDisplayed()).toBe(true);


        var downloadpath = 'C:/Users/Developer/Downloads/';
        var fs = require('fs');

        var filename = downloadpath + 'OfferChargeSummary.csv';

        if (fs.existsSync(filename)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(filename);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the list of adjustments with adjustment amount and description should get downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(filename);
        }, 10000).then(function () {

            expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on Cardview icon
        element(by.xpath(testData3.OfferCharge.MultiPoint_CardView)).click();
        browser.sleep(3000);
        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Connections");


        //Validate Child PI amount is displayed in the Dialog box for CardView
        expect(element(by.xpath(testData3.OfferCharge.CardView_DispAmt)).isDisplayed()).toBe(true);


        var cardViewfilename = downloadpath + 'OfferChargeSummary (1).csv';

        if (fs.existsSync(cardViewfilename)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(cardViewfilename);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the details of the PI are downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(cardViewfilename);
        }, 15000).then(function () {

            expect(fs.readFileSync(cardViewfilename, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.DialogBox_CloseIcon)).click();

        //Validate Parent PI is displayed
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");


        //Click on Second Child PI in Dropdown
        element.all(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown)).then(function (options) {
            options[2].click();
        });
        browser.sleep(3000);
        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Feature");

        //Validate Heading in the Dialog box of the Child PI
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_Heading)).getText()).toEqual("Multi-Point");

        //Validate Child PI amount is displayed in the Dialog box
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_DispAmt)).isDisplayed()).toBe(true);


        var filename1 = downloadpath + 'OfferChargeSummary (2).csv';

        if (fs.existsSync(filename1)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(filename1);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);


        //Verify that the list of adjustments with adjustment amount and description should get downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(filename1);
        }, 10000).then(function () {

            expect(fs.readFileSync(filename1, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });


        element(by.xpath(testData3.OfferCharge.MultiPoint_CardView)).click();

        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Feature");


        //Validate Child PI amount is displayed in the Dialog box for CardView
        expect(element(by.xpath(testData3.OfferCharge.CardView_DispAmt)).isDisplayed()).toBe(true);


        var cardViewfilename1 = downloadpath + 'OfferChargeSummary (3).csv';

        if (fs.existsSync(cardViewfilename1)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(cardViewfilename1);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the details of the PI are downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(cardViewfilename1);
        }, 10000).then(function () {

            //Validate data in the downloaded file
            expect(fs.readFileSync(cardViewfilename1, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.DialogBox_CloseIcon)).click();

        //Validate Parent PI is displayed
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");

        //Logging out of the MetraView application
        protractor.loginHelpers.logOutMV();

    });

    //TC10
    it('Validate Multi-Point PI functionality in Transactions "Offer View", Corporate account is the Payer', function () {
        var testData5 = protractor.loginHelpers.lang;

        //Launch to the MV2.0 application
        protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
        
        //Login to the MV2.0 application
        protractor.loginHelpers.logInMV(testData4.corpSce1, testData4.passwordField);
        //Explicit wait, browser waits till the expected condition is met
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.Quotes.Transactions_Link))), 8000);
        //Click on Go to Bills Link
        element(by.xpath(testData3.Quotes.Transactions_Link)).click();
        //Explicit Wait to wait until the link/button is clickable
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.OfferCharge.AccountName_Expand))), 3000);
        //Click on PO
        element(by.xpath(testData3.OfferCharge.AccountName_Expand)).click();
        browser.sleep(3000);
        //Click on PI
        element(by.xpath(testData3.OfferCharge.OfferView_PISelection)).click();
        browser.sleep(3000);
        //Validating PI Launched
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");
        browser.sleep(3000);
        //Validate Font is Bold
        expect(element(by.xpath(testData3.OfferCharge.MultiPoint_Header)).getCssValue('font-weight')).toBeGreaterThan(600);
        //Validate Font is Bold
        expect(element(by.xpath(testData3.OfferCharge.MultiPointCharges_Header)).getCssValue('font-weight')).toBeGreaterThan(600);
        //Validate Select Multi-Point Dropdown
        expect(element(by.xpath(testData3.OfferCharge.MulPoint2SelDropdown)).getText()).toEqual("Select Multi-Point");

        //Click on Select Multi-Point DropDown
        element(by.xpath(testData3.OfferCharge.MultiPoint_Select)).click();

        //Validate the DropDown Values present in Select Multi-Point
        let multiPointDropDown = element.all(by.xpath(testData3.OfferCharge.Transaction_MultPtDropDown));
        expect(multiPointDropDown.getText()).toEqual(['Select Multi-Point', 'Audio Conferencing Connections | $ 285.00', 'Audio Conferencing Feature | $ 7.00']);


        var total = 0;
        var charge;

        //To get Count of Values in Select Mult-point Dropdown
        multiPointDropDown.count().then(function (multiPointCount) {
            let name;

            //To get the Values in Dropdown
            multiPointDropDown.getText().then(function (name) {
                //Itteration to get each value in Dropdown    
                for (var i = 1; i < multiPointCount; i++) {

                    //Split the value and get only the Amount
                    var value = name[i].split("$");

                    charge = value[1];
                    //Calculate the total amount in the Child PIs
                    total = +total + +charge;
                }

                element(by.xpath(testData3.OfferCharge.MultPoint_TotalAmt)).getText().then(function (displayAmt) {
                    var displayValue = displayAmt.split("$ ");
                    displayValue = +0 + +displayValue[1];
                    expect(displayValue).toBe(total);
                });
            });
        });

        //Click on First Child PI in Dropdown
        element.all(by.xpath(testData3.OfferCharge.MulPoint2SelDropdown)).then(function (options) {
            options[1].click();
        });
        browser.sleep(3000);
        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Connections");

        //Validate Heading in the Dialog box of the Child PI
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_Heading)).getText()).toEqual("Multi-Point");

        //Validate Child PI amount is displayed in the Dialog box
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_DispAmt)).isDisplayed()).toBe(true);


        var downloadpath = 'C:/Users/Developer/Downloads/';
        var fs = require('fs');

        var filename = downloadpath + 'OfferChargeSummary.csv';

        if (fs.existsSync(filename)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(filename);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the list of adjustments with adjustment amount and description should get downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(filename);
        }, 10000).then(function () {

            expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on Cardview icon
        element(by.xpath(testData3.OfferCharge.MultiPoint_CardView)).click();

        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Connections");


        //Validate Child PI amount is displayed in the Dialog box for CardView
        expect(element(by.xpath(testData3.OfferCharge.CardView_DispAmt)).isDisplayed()).toBe(true);


        var cardViewfilename = downloadpath + 'OfferChargeSummary (1).csv';

        if (fs.existsSync(cardViewfilename)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(cardViewfilename);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the details of the PI are downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(cardViewfilename);
        }, 15000).then(function () {

            expect(fs.readFileSync(cardViewfilename, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.DialogBox_CloseIcon)).click();

        //Validate Parent PI is displayed
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");


        //Click on Second Child PI in Dropdown
        element.all(by.xpath(testData3.OfferCharge.MulPoint2SelDropdown)).then(function (options) {
            options[2].click();
        });
        browser.sleep(3000);
        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Feature");

        //Validate Heading in the Dialog box of the Child PI
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_Heading)).getText()).toEqual("Multi-Point");

        //Validate Child PI amount is displayed in the Dialog box
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_DispAmt)).isDisplayed()).toBe(true);


        var filename1 = downloadpath + 'OfferChargeSummary (2).csv';

        if (fs.existsSync(filename1)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(filename1);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);


        //Verify that the list of adjustments with adjustment amount and description should get downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(filename1);
        }, 10000).then(function () {

            expect(fs.readFileSync(filename1, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });


        element(by.xpath(testData3.OfferCharge.MultiPoint_CardView)).click();

        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Feature");


        //Validate Child PI amount is displayed in the Dialog box for CardView
        expect(element(by.xpath(testData3.OfferCharge.CardView_DispAmt)).isDisplayed()).toBe(true);


        var cardViewfilename1 = downloadpath + 'OfferChargeSummary (3).csv';

        if (fs.existsSync(cardViewfilename1)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(cardViewfilename1);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the details of the PI are downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(cardViewfilename1);
        }, 10000).then(function () {

            //Validate data in the downloaded file
            expect(fs.readFileSync(cardViewfilename1, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.DialogBox_CloseIcon)).click();

        //Validate Parent PI is displayed
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");

        //Logging out of the MetraView application
        //element(by.xpath(testData3.SystemBar.Logout)).click()  
        protractor.loginHelpers.logOutMV();

    });

    //TC10
    it('Validate Multi-Point PI functionality in Transactions "Offer View", Department account is the Payer', function () {
        var testData5 = protractor.loginHelpers.lang;

        //Launch to the MV2.0 application
        protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
        
        //Login to the MV2.0 application
        protractor.loginHelpers.logInMV(testData4.deptSce1, testData4.passwordField);
        //Explicit wait, browser waits till the expected condition is met
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.Quotes.Transactions_Link))), 8000);
        //Click on Go to Bills Link
        element(by.xpath(testData3.Quotes.Transactions_Link)).click();
        //Explicit Wait to wait until the link/button is clickable
        browser.wait(EC.elementToBeClickable(element(by.xpath(testData3.OfferCharge.AccountName_Expand))), 3000);
        //Click on PO
        element(by.xpath(testData3.OfferCharge.AccountName_Expand)).click();
        browser.sleep(3000);
        //Click on PI
        element(by.xpath(testData3.OfferCharge.OfferView_PISelection)).click();
        browser.sleep(5000);
        //Validating PI Launched
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");

        //Validate Font is Bold
        expect(element(by.xpath(testData3.OfferCharge.MultiPoint_Header)).getCssValue('font-weight')).toBeGreaterThan(600);
        //Validate Font is Bold
        expect(element(by.xpath(testData3.OfferCharge.MultiPointCharges_Header)).getCssValue('font-weight')).toBeGreaterThan(600);
        //Validate Select Multi-Point Dropdown
        expect(element(by.xpath(testData3.OfferCharge.MulPoint1SelDropdown)).getText()).toEqual("Select Multi-Point");

        //Click on Select Multi-Point DropDown
        element(by.xpath(testData3.OfferCharge.MultiPoint_Select)).click();

        //Validate the DropDown Values present in Select Multi-Point
        let multiPointDropDown = element.all(by.xpath(testData3.OfferCharge.MulPoint1SelDropdown));
        expect(multiPointDropDown.getText()).toEqual(['Select Multi-Point', 'Audio Conferencing Connections | $ 285.00', 'Audio Conferencing Feature | $ 7.00']);

        var total = 0;
        var charge;

        //To get Count of Values in Select Mult-point Dropdown
        multiPointDropDown.count().then(function (multiPointCount) {

            let name;

            //To get the Values in Dropdown
            multiPointDropDown.getText().then(function (name) {
                //Itteration to get each value in Dropdown    
                for (var i = 1; i < multiPointCount; i++) {

                    //Split the value and get only the Amount
                    var value = name[i].split("$");

                    charge = value[1];
                    //Calculate the total amount in the Child PIs
                    total = +total + +charge;
                }

                element(by.xpath(testData3.OfferCharge.MultPoint_TotalAmt)).getText().then(function (displayAmt) {
                    var displayValue = displayAmt.split("$ ");
                    displayValue = +0 + +displayValue[1];
                    expect(displayValue).toBe(total);

                });
            });
        });

        //Click on First Child PI in Dropdown
        element.all(by.xpath(testData3.OfferCharge.MulPoint1SelDropdown)).then(function (options) {
            options[1].click();
        });
        browser.sleep(3000);
        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Connections");

        //Validate Heading in the Dialog box of the Child PI
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_Heading)).getText()).toEqual("Multi-Point");

        //Validate Child PI amount is displayed in the Dialog box
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_DispAmt)).isDisplayed()).toBe(true);


        var downloadpath = 'C:/Users/Developer/Downloads/';
        var fs = require('fs');

        var filename = downloadpath + 'OfferChargeSummary.csv';

        if (fs.existsSync(filename)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(filename);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the list of adjustments with adjustment amount and description should get downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(filename);
        }, 10000).then(function () {

            expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on Cardview icon
        element(by.xpath(testData3.OfferCharge.MultiPoint_CardView)).click();
        browser.sleep(3000);
        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Connections");


        //Validate Child PI amount is displayed in the Dialog box for CardView
        expect(element(by.xpath(testData3.OfferCharge.CardView_DispAmt)).isDisplayed()).toBe(true);


        var cardViewfilename = downloadpath + 'OfferChargeSummary (1).csv';

        if (fs.existsSync(cardViewfilename)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(cardViewfilename);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the details of the PI are downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(cardViewfilename);
        }, 15000).then(function () {

            expect(fs.readFileSync(cardViewfilename, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.DialogBox_CloseIcon)).click();

        //Validate Parent PI is displayed
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");

        //Click on Second Child PI in Dropdown
        element.all(by.xpath(testData3.OfferCharge.MulPoint1SelDropdown)).then(function (options) {
            options[2].click();
        });
        browser.sleep(3000);
        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Feature");

        //Validate Heading in the Dialog box of the Child PI
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_Heading)).getText()).toEqual("Multi-Point");

        //Validate Child PI amount is displayed in the Dialog box
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_DispAmt)).isDisplayed()).toBe(true);


        var filename1 = downloadpath + 'OfferChargeSummary (2).csv';

        if (fs.existsSync(filename1)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(filename1);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the list of adjustments with adjustment amount and description should get downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(filename1);
        }, 10000).then(function () {

            expect(fs.readFileSync(filename1, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });


        element(by.xpath(testData3.OfferCharge.MultiPoint_CardView)).click();

        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Feature");


        //Validate Child PI amount is displayed in the Dialog box for CardView
        expect(element(by.xpath(testData3.OfferCharge.CardView_DispAmt)).isDisplayed()).toBe(true);


        var cardViewfilename1 = downloadpath + 'OfferChargeSummary (3).csv';

        if (fs.existsSync(cardViewfilename1)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(cardViewfilename1);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the details of the PI are downloaded
        browser.driver.wait(function () {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(cardViewfilename1);
        }, 15000).then(function () {

            //Validate data in the downloaded file
            expect(fs.readFileSync(cardViewfilename1, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount");
        });

        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.DialogBox_CloseIcon)).click();

        //Validate Parent PI is displayed
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");

        //Logging out of the MetraView application
        protractor.loginHelpers.logOutMV();

    });

    //TC08
    xit('Validate Multi-Point PI functionality "Offer View" tab under Partition, Corporate account is the payer for Core Accounts', function () {
        var testData5 = protractor.loginHelpers.lang;
        var fs = require('fs');
        var ncp = require('ncp').ncp;
        var rimraf = require("rimraf");
        var destFolder = 'C:/ECB/METRAVIEW-CONFIG/UI-EXT-DATA/partition';
        var srcFolder = 'C:/ECB/METRAVIEW-CONFIG/UI-EXT-DATA/default';

        //Check File exists with the same name.
        if (fs.existsSync(destFolder)) {
            console.log("File " + destFolder + " exists.");
            //If Exists, delete the folder
            rimraf.sync(destFolder);
        }

        ncp.limit = 16;
        //Create a new folder and copy data/files from source to destination folders
        ncp(srcFolder, destFolder, function (err) {
            if (err) {
                return console.error(err);
            }
        });

        /*    
        //Launch to the MV2.0 application
        protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
        //Maximize the browser
        browser.driver.manage().window().maximize();
       // browser.manage().timeouts().implicitlyWait(5000);

        //Login to the MV2.0 application
        protractor.loginHelpers.logInMV(testData4.corporateAccount4UserName,testData4.passwordField);
      
        //browser.sleep(8000);
        
        //Click on Go to Bills Link
        element(by.xpath(testData3.Billing.GoToBillsButton)).click();
        browser.sleep(3000);
        //Click on PO
        element(by.xpath(testData3.OfferCharge.AccountName_Expand)).click();
        browser.sleep(3000);
        //Click on PI
        element(by.xpath(testData3.OfferCharge.OfferView_PISelection)).click();
        browser.sleep(3000);
        //Validating PI Launched
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");
        browser.sleep(3000);
        //Validate Font is Bold
        expect(element(by.xpath(testData3.OfferCharge.MultiPoint_Header)).getCssValue('font-weight')).toBeGreaterThan(600);
        //Validate Font is Bold
        expect(element(by.xpath(testData3.OfferCharge.MultiPointCharges_Header)).getCssValue('font-weight')).toBeGreaterThan(600);
        //Validate Select Multi-Point Dropdown
        expect(element(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown)).getText()).toEqual("Select Multi-Point");

        //Click on Select Multi-Point DropDown
        element(by.xpath(testData3.OfferCharge.MultiPoint_Select)).click();

        //Validate the DropDown Values present in Select Multi-Point
        let multiPointDropDown = element.all(by.xpath(testData3.OfferCharge.MulPoint1SelDropdown));
        expect(multiPointDropDown.getText()).toEqual(['Select Multi-Point','Audio Conferencing Connections | $ 136.25']);
        
        
        var total=0;
        var charge;

        //To get Count of Values in Select Mult-point Dropdown
        multiPointDropDown.count().then(function(multiPointCount){
            let name ;

            //To get the Values in Dropdown
            multiPointDropDown.getText().then(function(name){
                //Itteration to get each value in Dropdown    
                for(var i=1; i<multiPointCount; i++){
                       
                    //Split the value and get only the Amount
                    var value = name[i].split("$");
                        
                    charge = value[1];
                    //Calculate the total amount in the Child PIs
                    total=+total + +charge;
                }

                element(by.xpath(testData3.OfferCharge.MultPoint_TotalAmtDept)).getText().then(function(displayAmt){
                    var displayValue = displayAmt.split("$ ");
                        
                    expect(136.25).toBe(total);
                
                });
            });
        });
        
        //Click on First Child PI in Dropdown
        element.all(by.xpath(testData3.OfferCharge.MultiPoint_SelectionDropDown)).then(function(options){
          options[1].click();
        });
        browser.sleep(3000);
        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Connections");

        //Validate Heading in the Dialog box of the Child PI
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_Heading)).getText()).toEqual("Multi-Point");

        //Validate Child PI amount is displayed in the Dialog box
        expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_DispAmt)).isDisplayed()).toBe(true);

                
        var downloadpath='C:/Users/Developer/Downloads/';
        var fs = require('fs');

        var filename = downloadpath+'OfferChargeSummary.csv';

        if (fs.existsSync(filename)) {
        //Make sure the browser doesn't have to rename the download.
                fs.unlinkSync(filename);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the list of adjustments with adjustment amount and description should get downloaded
        browser.driver.wait(function() {
        browser.waitForAngular();
        browser.ignoreSynchronization = true;
        return fs.existsSync(filename);
        }, 10000).then(function(){ 

        expect(fs.readFileSync(filename, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount\n"
                +"2019-07-09 06:21:55.0,136.2500000000");
        });

        //Click on Cardview icon
        element(by.xpath(testData3.OfferCharge.MultiPoint_CardView)).click();

        //Validate Child PI dialog box is opened
        expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Connections");
       
        //Validate Child PI amount is displayed in the Dialog box for CardView
        expect(element(by.xpath(testData3.OfferCharge.CardView_DispAmt)).isDisplayed()).toBe(true);
        
        var cardViewfilename = downloadpath+'OfferChargeSummary (1).csv';

        if (fs.existsSync(cardViewfilename)) {
        //Make sure the browser doesn't have to rename the download.
        fs.unlinkSync(cardViewfilename);
        }

        //Click on download button
        element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
        browser.sleep(10000);

        //Verify that the details of the PI are downloaded
        browser.driver.wait(function() {
        browser.waitForAngular();
        browser.ignoreSynchronization = true;
        return fs.existsSync(cardViewfilename);
        }, 15000).then(function(){ 

        expect(fs.readFileSync(cardViewfilename, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount\n"
                +"2019-07-09 06:21:55.0,136.2500000000");
        });

        //Click on close icon to close the dialog box
        element(by.xpath(testData3.OfferCharge.DialogBox_CloseIcon)).click();
       
        //Validate Parent PI is displayed
        expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");
        
        //Validate Select Multi-Point Dropdown
        expect(element(by.xpath(testData3.OfferCharge.MultiPoint_SelectOption)).getText()).toEqual("Select Multi-Point");

        //Click on Second Core Account Select Multi-Point DropDown
        element(by.xpath(testData3.OfferCharge.MultiPoint_Select)).click();

        //Validate the DropDown Values present in Select Multi-Point
        let multiPointDropDown1 = element.all(by.xpath(testData3.OfferCharge.MulPoint2SelDropdown));
        expect(multiPointDropDown1.getText()).toEqual(['Select Multi-Point','Audio Conferencing Feature | $ 5.00']);

        var total1=0;
        var charge1;

        //To get Count of Values in Select Mult-point Dropdown
        multiPointDropDown1.count().then(function(multiPointCount){
            let name ;
            //To get the Values in Dropdown
            multiPointDropDown1.getText().then(function(name){
                //Itteration to get each value in Dropdown    
                for(var i=1; i<multiPointCount; i++){
                       
                    //Split the value and get only the Amount
                    var value = name[i].split("$");
                        
                    charge1 = value[1];
                    //Calculate the total amount in the Child PIs
                    total1=+total1 + +charge1;
                }

                element(by.xpath(testData3.OfferCharge.MultPoint_TotalAmt)).getText().then(function(displayAmt){
                    var displayValue = displayAmt.split("$ ");                        

                    expect(5.00).toBe(total1);
                
                });
            });
        });
        
        //Click on First Child PI in Dropdown
        element.all(by.xpath(testData3.OfferCharge.MultiPoint_SelectOption)).then(function(options){
          options[1].click();
        });
        browser.sleep(3000);

          expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Feature");
  
          //Validate Heading in the Dialog box of the Child PI
          expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_Heading)).getText()).toEqual("Multi-Point");
  
          //Validate Child PI amount is displayed in the Dialog box
          expect(element(by.xpath(testData3.OfferCharge.PIDialogBox_DispAmt)).isDisplayed()).toBe(true);
            
          var filename1 = downloadpath+'OfferChargeSummary (2).csv';
  
          if (fs.existsSync(filename1)) {
          //Make sure the browser doesn't have to rename the download.
          fs.unlinkSync(filename1);
          }
  
          //Click on download button
          element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
          browser.sleep(10000);

          
        //Verify that the list of adjustments with adjustment amount and description should get downloaded
            browser.driver.wait(function() {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(filename1);
            }, 10000).then(function(){ 
    
            expect(fs.readFileSync(filename1, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount\n"
                            +"2019-07-09 06:29:18.0,5.0000000000");
            });
    
    
            element(by.xpath(testData3.OfferCharge.MultiPoint_CardView)).click();
    
            //Validate Child PI dialog box is opened
            expect(element(by.xpath(testData3.OfferCharge.AudioConfConn_Header)).getText()).toEqual("Audio Conferencing Feature");
    
           
            //Validate Child PI amount is displayed in the Dialog box for CardView
            expect(element(by.xpath(testData3.OfferCharge.CardView_DispAmt)).isDisplayed()).toBe(true);
    
            
            var cardViewfilename1 = downloadpath+'OfferChargeSummary (3).csv';
    
            if (fs.existsSync(cardViewfilename1)) {
            //Make sure the browser doesn't have to rename the download.
            fs.unlinkSync(cardViewfilename1);
            }
    
            //Click on download button
            element(by.xpath(testData3.OfferCharge.MultPoint_CSVDownIcon)).click();
            browser.sleep(10000);
    
            //Verify that the details of the PI are downloaded
            browser.driver.wait(function() {
            browser.waitForAngular();
            browser.ignoreSynchronization = true;
            return fs.existsSync(cardViewfilename1);
            }, 15000).then(function(){ 
            
            //Validate data in the downloaded file
            expect(fs.readFileSync(cardViewfilename1, { encoding: 'utf8' })).toContain("Time Stamp,Display Amount\n"
                            +"2019-07-09 06:29:18.0,5.0000000000");
            });
    
            //Click on close icon to close the dialog box
            element(by.xpath(testData3.OfferCharge.DialogBox_CloseIcon)).click();
           
            //Validate Parent PI is displayed
            expect(element(by.xpath(testData3.OfferCharge.ParentPIName)).getText()).toEqual("AudioConfCall-Localized");

            //Validate "Select Multi-Point" drop-down is displayed for Core3 Account
            expect(element(by.xpath(testData3.OfferCharge.MultiPoint_Select)).isPresent()).toBeFalsy();

            //Validate "Multi-Point Charges" is empty for Core3 Account
            expect(element(by.xpath(testData3.OfferCharge.MultPoint_TotalAmt3)).isPresent()).toBeFalsy();
 
            //Logging out of the MetraView application
            protractor.loginHelpers.logOutMV();
            */

    });

});