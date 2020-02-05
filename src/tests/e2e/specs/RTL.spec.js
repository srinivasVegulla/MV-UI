var testdata = require('../inputs/testdata/Login.json');
var testData2 = require('../inputs/testData/JsonFileCreation.json');
var testData3 = require('../inputs/testData/XpathRepository.json');

describe('UI Baseline App', function () {
    
//0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10509/ 001_Verify_Components_In_OfferStorePage_Render_RTL 
it('should have  RTL in offer store', function () {


    
element(by.xpath(testData3.LayerSelector.Dropdown)).click();
element(by.xpath(testData3.LayerSelector.OfferStore)).click();
element.all(by.xpath(testData3.MySubscriptions.AvailablePONames))
//validate text-align attribute for offerstore
element(by.xpath(testData3.MySubscriptions.AvailablePONames)).getCssValue('text-align').then((POALign) => {

expect(POALign).toEqual("right");

});

});
//MVIEW-2977 The text is not indented properly in RTL locales


//validate in MISC
it('should validate close(x) icon and chevron  in mic adjustments and also alignment of offer charge summary', function () {
  //MVIEW-2973-The close (x) icon is towards the right when the "View All" link (under Charges Summary) is clicked in RTL locales
    var testdata12 = protractor.loginHelpers.dashboard();
    element(by.xpath(testData3.LayerSelector.Dropdown)).click();
    element(by.xpath(testData3.LayerSelector.Bills)).click();
    //validate padding alignment margin for all the amount values
    element.all(by.css(testData3.Adjustment.Amount)).then((items) => {
        element.all(by.css(testData3.Adjustment.Amount)).count().then((n) => {

            for(var i=0;i<n;i++)
             {
                items[i].getCssValue('white-space').then((textALign) => {
                    expect(textALign).toEqual('pre-line');
                });
                items[i].getCssValue('vertical-align').then((textALign) => {
                    expect(textALign).toEqual('middle');
                });
                items[i].getCssValue('width').then((textALign) => {
                    expect(textALign).toEqual('90.25px'+'25%');
                });
                items[i].getCssValue('padding-right').then((textALign) => {
                    expect(textALign).toEqual('0px');
                });
                items[i].getCssValue('margin').then((textALign) => {
                    expect(textALign).toEqual('0px');
                });
                

             }
            
       
          });

    });
    //validate padding alignment and margin for all the offers in offerchargeSummary
    element.all(by.css(testData3.Adjustment.Offers)).then((items) => {
        element.all(by.css(testData3.Adjustment.Offers)).count().then((n) => {

            for(var i=0;i<n;i++)
             {
                items[i].getCssValue('white-space').then((textALign) => {
                    expect(textALign).toEqual('pre-line');
                });
                items[i].getCssValue('vertical-align').then((textALign) => {
                    expect(textALign).toEqual('middle');
                });
                items[i].getCssValue('width').then((textALign) => {
                    expect(textALign).toEqual('245.75px');
                });
                items[i].getCssValue('padding-left').then((textALign) => {
                    expect(textALign).toEqual('0px');
                });
                items[i].getCssValue('margin').then((textALign) => {
                    expect(textALign).toEqual('0px');
                });

             }
            
       
          });

    });



   

    browser.sleep(2000);
    //click on Misc adjustments
     element(by.xpath(testData3.OfferCharge.Misc_Adjustments_Label+testdata12.TEXT_MISC_ADJUSTMENTS+testData3.ChildAccounts.CloseXpath)).click();
     browser.sleep(1000);
    //Validate Miscellaneous Adjsutmetns Details are opened
    expect(element(by.xpath(testData3.OfferCharge.Header+testdata12.TEXT_MISC_ADJUSTMENTS+testData3.ChildAccounts.CloseXpath)).isDisplayed()).toBe(true);
     
    //validate thhe alignment of close icon
    element(by.xpath(testData3.OfferCharge.ClickOn_X_Button)).getCssValue('float').then((taxAlign) => {

     expect(taxAlign).toEqual("left");
    });


     //click on cancel button to go back to offer store page
     element(by.xpath(testData3.OfferCharge.ClickOn_X_Button)).click();
      browser.sleep(1000);

     //MVIEW-2966-Tree Localization: Chevron is pointed in the wrong direction in RTL languages

    element(by.xpath(testData3.OfferCharge.AccountView_Pane)).click();
 
    element(by.xpath(testData3.OfferCharge.Chevron)).getCssValue('text-align').then((taxAlign) => {

        expect(taxAlign).toEqual("right");
        });

    
});    

//0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10604/ 001_Facing_few_alignment_issues_overlappings
it('should validate RTL in few widgets', function () {

element(by.xpath(testData3.LayerSelector.Dropdown)).click();
element(by.xpath(testData3.LayerSelector.Bills)).click();
//validate text-align attribute for overlappings

element(by.xpath(testData3.Charges.PrebillAdjustment)).getCssValue('text-align').then((prebillAlign) => {

expect(prebillAlign).toEqual("right");
element(by.xpath(testData3.Charges.Tax)).getCssValue('text-align').then((taxAlign) => {

expect(taxAlign).toEqual("right");
});
element(by.xpath(testData3.Charges.Tax)).getCssValue('text-align').then((taxAlign) => {

expect(taxAlign).toEqual("right");
});
});

});
//MVIEW- -2695 -Reset Password Screen is not Following RTL Standards
it('should validate RTL in changepassword page', function () {
    element(by.xpath(testData3.SystemBar.Logout)).click();
    element(by.xpath(testData3.LoginPage.UserName)).sendKeys('corpb');
    element(by.xpath(testData3.LoginPage.Password)).sendKeys('123');
    browser.findElement(By.xpath(testData3.LoginPage.LogInButton)).click().then(function () {

        browser.sleep(12000);
      }, 1000);
      //validate text-align attribute for reset passord screen
         element(by.css(testData3.ResetPasswordPage.User_Name)).getCssValue('text-align').then((textalignment) => {
        expect(textalignment).toEqual("right");
        element(by.css(testData3.ResetPasswordPage.Old_Password)).getCssValue('text-align').then((textalignment) => {
            expect(textalignment).toEqual("right");
        });
        element(by.css(testData3.ResetPasswordPage.Password)).getCssValue('text-align').then((textalignment) => {
            expect(textalignment).toEqual("right");
        });
        element(by.css(testData3.ResetPasswordPage.Confirm_Password)).getCssValue('text-align').then((textalignment) => {
            expect(textalignment).toEqual("right");
        });
    });




});


// 0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10595/ 001_Verifythat_fieldsInSignupPageShouldrenderRTL

it('should validate RTL in signup page', function () {
element(by.xpath(testData3.SystemBar.Logout)).click();
//For language selection
var testdata6 = protractor.loginHelpers.lang;
element(by.css(testdata6)).click();

//Check for Sign up button
var signupBtn = element(by.xpath(testData3.LoginPage.SignUpButton));
expect((signupBtn).isPresent()).toBe(true);

//Click on Sign Up
signupBtn.click();
//(element(by.xpath(testData2.SignUpPage.Title)).isDisplayed()).toBe(true);

element(by.xpath(testData3.LoginPage.SignUp_user)).getCssValue('text-align').then((textalignment) => {

element(by.xpath(testData3.LoginPage.SignUp_email)).getCssValue('text-align').then((emailalignment) => {

element(by.xpath(testData3.LoginPage.SignUp_password)).getCssValue('text-align').then((passwordalignment) => {

expect(textalignment).toEqual("left");
expect(emailalignment).toEqual("left");
expect(passwordalignment).toEqual("left");
});
});
});

});

});