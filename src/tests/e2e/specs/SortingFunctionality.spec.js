var testData = require('../inputs/testData/prebillandpostbillcreation.json');
var testData1=require('../inputs/testData/Login.json');
var testData3 = require('../inputs/testData/XpathRepository.json');
var testdata6 = require('../inputs/testdata/JsonFileCreation.json');

describe('Sorting Functionality Test cases', function () {

//0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10618/ 001_filtersort_functionality_should_work_properly
//0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10624/ 001_DefaultSortingOrder_in_Bills_page_is_decending
//0_MTHF_17.0/ MTHF_17.0-S012/ ESRs-MetraView/ ESR-10608/ 001_sort_functionality_in_Card_view_should_work

it('Validating Sorting functonality for Postbill adjestment', function () {

var sort = [];
var unSort = [];

//Refresh the main page
browser.refresh();
browser.sleep(10000);

//Launch to the MV2.0 application
protractor.loginHelpers.launchMV(protractor.loginHelpers.lang);
//Login to the MV2.0 application
protractor.loginHelpers.logInMV(testdata6.userName,testdata6.passwordField);

var testData5 = protractor.loginHelpers.lang;
//Get Metraview 2.0 URL
browser.get(testdata6.URL);
browser.sleep(5000);

//Select the reqired Currency
element(by.css(testData5)).click();
browser.sleep(3000);

//Login to MetraView as Corporate User
//Enter username as userName2
element(by.xpath(testData3.LoginPage.UserName)).sendKeys(testData.userName);

//Enter password
element(by.xpath(testData3.LoginPage.Password)).sendKeys(testData.passwordField);

//Click on Login Button
browser.findElement(By.xpath(testData3.LoginPage.LogInButton)).click();
browser.sleep(12000);  

//Click on Go to Bills Link
element(by.xpath(testData3.Billing.GoToBillsButton)).click();
browser.sleep(8000);

//Click on dropdown to select the hardclosed interval date
element(by.xpath(testData3.Billing.SelectIntervalDropdown)).click();

//select the 
element(by.xpath(testData3.Billing.SelectFirstInterval)).click();
browser.sleep(3000);

//Sorting for PostbillAdjustment
browser.actions().mouseMove(element(by.xpath(testData3.PriorBalance.PostBillAdjustment))).perform();
browser.sleep(1000);

//After mouse hovering the adjustments are displayed in the card view
expect(element(by.xpath(testData3.PriorBalance.PostBillAdjustment_Popup_ListOfTransaction)).isDisplayed()).toBe(true);

//click on view all button in order to validate the card view
element(By.xpath(testData3.Charges.Popup_ViewAll)).click();
browser.sleep(2000);

//Sorting from sortby Drop down (Tabular view)

//Get the values of adjutment amount in unsort mode
const elem = element.all(by.xpath(testData3.Adjustment.postbillAdjValues));
elem.map(function(eachName){ 
eachName.getText().then(function unsorting(unSorted){
unSort.push (unSorted);
console.log(unSort);
return unSorted;
});

});
browser.sleep(2000);

//click on sort and select adjutment amount from the dropdown
element(by.xpath(testData3.Adjustment.SortByDropdown)).click();
element(by.xpath(testData3.Adjustment.SortByDropdownFirstValue)).click();
browser.sleep(10000);

//Get the values of adjutment amount in sort mode
elem.map(function(eachName){
eachName.getText().then(function sorting(sorted){
sort.push(sorted);
console.log(sort);
return sorted ;

});

//validate the sorting functionality
}).then(function compare ()

{       
for (var i = 0; i < sort.length-1; i++) {
console.log(sort.length,sort[i].replace(/\$|,/g, ''),sort[i+1].replace(/\$|,/g, ''),i);

if(parseFloat(sort[i].replace(/\$|,/g, '')) >= parseFloat(sort[i+1].replace(/\$|,/g, '')))
{
console.log("Sorting functionality is Working as Expected in Descending order for Postbill adjestment");

}   
else{
console.log(sort.length,sort[i].replace(/\$|,/g, ''),sort[i+1].replace(/\$|,/g, ''),i)
console.log("Sorting functionality is Not Working as Expected in Descending order for Postbill adjestment");
break;  
}     
}         
})

var sort1 = [];
var unSort1 = [];

//Filter Sorting (Tabular view)
browser.refresh();
browser.sleep(3000);

//Click on Go to Bills Link
element(by.xpath(testData3.Billing.GoToBillsButton)).click();
browser.sleep(8000);

//Click on dropdown to select the hardclosed interval date
element(by.xpath(testData3.Billing.SelectIntervalDropdown)).click();

//select the 
element(by.xpath(testData3.Billing.SelectFirstInterval)).click();
browser.sleep(3000);

//Sorting for PostbillAdjustment
browser.actions().mouseMove(element(by.xpath(testData3.PriorBalance.PostBillAdjustment))).perform();
browser.sleep(1000);

//After mouse hovering the adjustments are displayed in the card view
expect(element(by.xpath(testData3.PriorBalance.PostBillAdjustment_Popup_ListOfTransaction)).isDisplayed()).toBe(true);

//click on view all button in order to validate the card view
element(By.xpath(testData3.Charges.Popup_ViewAll)).click();
browser.sleep(2000);

//Get the values of adjutment amount in unsort mode
const elem1 = element.all(by.xpath(testData3.Adjustment.postbillAdjValues))
elem.map(function(eachName){
eachName.getText().then(function unsorting(unSorted){
unSort1.push (unSorted);
console.log(unSort1);
return unSorted;
});
});
browser.sleep(2000);
element(by.xpath(testData3.Downloads.SortingFilter)).click();
browser.sleep(5000);
////browser.actions().mouseMove(element(by.xpath(testData3.Downloads.SortingFilter_Label))).perform();

//click on sort and select adjutment amount from the dropdown
element(by.xpath(testData3.Adjustment.Filter_sortby_dropdown)).click();
element(by.xpath(testData3.Adjustment.Filter_sortby_dropdown_Firstvalue)).click();
browser.sleep(3000);

//Apply button 
element(by.xpath(testData3.Adjustment.Apply_Button)).click();
browser.sleep(10000);

//Get the values of adjutment amount in sort mode
elem1.map(function(eachName){
eachName.getText().then(function sorting(sorted){
sort1.push(sorted);
console.log(sort1);
return sorted ;

});

//validate the sorting functionality
}).then(function compare ()

{ 

for (var i = 0; i < sort1.length-1; i++) {

console.log(sort1.length,sort1[i].replace(/\$|,/g, ''),sort1[i+1].replace(/\$|,/g, ''),i);

if(parseFloat(sort1[i].replace(/\$|,/g, '')) >= parseFloat(sort1[i+1].replace(/\$|,/g, '')))
{
console.log("Sorting functionality is Working as Expected in Descending order for Postbill adjestment");

}   
else{
console.log(sort1.length,sort1[i].replace(/\$|,/g, ''),sort1[i+1].replace(/\$|,/g, ''),i)
console.log("Sorting functionality is Not Working as Expected in Descending order for Postbill adjestment");
break;  
}     
}         
})

var sort2 = [];
var unSort2 = [];

//Grid Sorting Validation (Tabular view)
browser.refresh();
browser.sleep(3000);

//Click on Go to Bills Link
element(by.xpath(testData3.Billing.GoToBillsButton)).click();
browser.sleep(8000);

//Click on dropdown to select the hardclosed interval date
element(by.xpath(testData3.Billing.SelectIntervalDropdown)).click();

//select the 
element(by.xpath(testData3.Billing.SelectFirstInterval)).click();
browser.sleep(3000);

//Sorting for PostbillAdjustment
browser.actions().mouseMove(element(by.xpath(testData3.PriorBalance.PostBillAdjustment))).perform();
browser.sleep(1000);

//After mouse hovering the adjustments are displayed in the card view
expect(element(by.xpath(testData3.PriorBalance.PostBillAdjustment_Popup_ListOfTransaction)).isDisplayed()).toBe(true);

//click on view all button in order to validate the card view
element(By.xpath(testData3.Charges.Popup_ViewAll)).click();
browser.sleep(2000);

//Get the values of adjutment amount in unsort mode
const elem2 = element.all(by.xpath(testData3.Adjustment.postbillAdjValues))
elem.map(function(eachName){
eachName.getText().then(function unsorting(unSorted){
unSort2.push (unSorted);
console.log(unSort2);
return unSorted;
});
});

//click on 
element(by.xpath(testData3.Adjustment.Postbill_Chargeamount_Grid)).click();
browser.sleep(10000);

//Get the values of adjutment amount in sort mode
elem2.map(function(eachName){
eachName.getText().then(function sorting(sorted){
sort2.push(sorted);
console.log(sort2);
return sorted ;

});

//validate the sorting functionality
}).then(function compare ()

{       
for (var i = 0; i < sort2.length-1; i++) {
console.log(sort2.length,sort2[i].replace(/\$|,/g, ''),sort2[i+1].replace(/\$|,/g, ''),i);

if(parseFloat(sort2[i].replace(/\$|,/g, '')) <= parseFloat(sort2[i+1].replace(/\$|,/g, '')))
{
console.log("Sorting functionality is Working as Expected in Ascending order as For grid sorting Ascending order is the default one for Postbill adjestment");

}   
else{
console.log(sort2.length,sort2[i].replace(/\$|,/g, ''),sort2[i+1].replace(/\$|,/g, ''),i)
console.log("Sorting functionality is Not Working as Expected in Ascending order as For grid sorting Ascending order is the default one for Postbill adjestment");
break;  
}     
}         
})

//Sorting from sortby Drop down (Card view)
browser.refresh();
browser.sleep(3000);

var sort3 = [];
var unSort3 = [];


//Click on Go to Bills Link
element(by.xpath(testData3.Billing.GoToBillsButton)).click();
browser.sleep(8000);

//Click on dropdown to select the hardclosed interval date
element(by.xpath(testData3.Billing.SelectIntervalDropdown)).click();

//select the 
element(by.xpath(testData3.Billing.SelectFirstInterval)).click();
browser.sleep(3000);

//Sorting for PostbillAdjustment
browser.actions().mouseMove(element(by.xpath(testData3.PriorBalance.PostBillAdjustment))).perform();
browser.sleep(1000);

//After mouse hovering the adjustments are displayed in the card view
expect(element(by.xpath(testData3.PriorBalance.PostBillAdjustment_Popup_ListOfTransaction)).isDisplayed()).toBe(true);

//click on view all button in order to validate the card view
element(By.xpath(testData3.Charges.Popup_ViewAll)).click();
browser.sleep(2000);

//click on card view button
element(by.xpath(testData3.MySubscriptions.Style_Card)).click();

//The adjustments are displayed in the card view
expect(element(by.xpath(testData3.Adjustment.CardView)).isDisplayed()).toBe(true);

//Get the values of adjutment amount in unsort mode
const elem3 = element.all(by.xpath(testData3.Adjustment.Cardview_charges));
elem.map(function(eachName){
eachName.getText().then(function unsorting(unSorted){
unSort3.push (unSorted);
console.log(unSort3);
return unSorted;
});
});

//click on sort and select adjutment amount from the dropdown
element(by.xpath(testData3.Adjustment.SortByDropdown)).click();
element(by.xpath(testData3.Adjustment.SortByDropdownFirstValue)).click();
browser.sleep(10000);

//Get the values of adjutment amount in sort mode
elem3.map(function(eachName){
eachName.getText().then(function sorting(sorted){
sort3.push(sorted);
console.log(sort3);
return sorted ;
});

//validate the sorting functionality
}).then(function compare ()

{       
for (var i = 0; i < sort3.length-1; i++) {
console.log(sort3.length,sort3[i].replace(/\$|,/g, ''),sort3[i+1].replace(/\$|,/g, ''),i);

if(parseFloat(sort3[i].replace(/\$|,/g, '')) >= parseFloat(sort3[i+1].replace(/\$|,/g, '')))
{
console.log("Sorting functionality is Working as Expected in Descending order in card view Sort by Dropdown for Postbill adjestment");

}   
else{
console.log(sort3.length,sort3[i].replace(/\$|,/g, ''),sort3[i+1].replace(/\$|,/g, ''),i)
console.log("Sorting functionality is Not Working as Expected in Descending order in card view Sort by Dropdown for Postbill adjestment");
break;  
}     
}         
})

//Sorting from Filter, (Card view)
browser.refresh();
browser.sleep(3000);

var sort4 = [];
var unSort4 = [];

//Click on Go to Bills Link
element(by.xpath(testData3.Billing.GoToBillsButton)).click();
browser.sleep(8000);

//Click on dropdown to select the hardclosed interval date
element(by.xpath(testData3.Billing.SelectIntervalDropdown)).click();

//select the 
element(by.xpath(testData3.Billing.SelectFirstInterval)).click();
browser.sleep(3000);

//Sorting for PostbillAdjustment
browser.actions().mouseMove(element(by.xpath(testData3.PriorBalance.PostBillAdjustment))).perform();
browser.sleep(1000);

//After mouse hovering the adjustments are displayed in the card view
expect(element(by.xpath(testData3.PriorBalance.PostBillAdjustment_Popup_ListOfTransaction)).isDisplayed()).toBe(true);

//click on view all button in order to validate the card view
element(by.xpath(testData3.Charges.Popup_ViewAll)).click();
browser.sleep(2000);

//click on card view button
element(by.xpath(testData3.MySubscriptions.Style_Card)).click();

//The adjustments are displayed in the card view
expect(element(by.xpath(testData3.Adjustment.CardView)).isDisplayed()).toBe(true);

//Get the values of adjutment amount in unsort mode
const elem4 = element.all(by.xpath(testData3.Adjustment.Cardview_charges))
elem.map(function(eachName){
eachName.getText().then(function unsorting(unSorted){
unSort4.push (unSorted);
console.log(unSort4);
return unSorted;
});
});
browser.sleep(2000);
element(by.xpath(testData3.Downloads.SortingFilter)).click();
browser.sleep(5000);
//browser.actions().mouseMove(element(by.xpath(testData3.Downloads.SortingFilter_Label))).perform();

//click on sort and select adjutment amount from the dropdown
element(by.xpath(testData3.Adjustment.Filter_sortby_dropdown)).click();
element(by.xpath(testData3.Adjustment.Filter_sortby_dropdown_Firstvalue)).click();
browser.sleep(3000);

//Apply button 
element(by.xpath(testData3.Adjustment.Apply_Button)).click();
browser.sleep(10000);

//Get the values of adjutment amount in sort mode
elem4.map(function(eachName){
eachName.getText().then(function sorting(sorted){
sort4.push(sorted);
console.log(sort4);
return sorted ;
});

//validate the sorting functionality
}).then(function compare ()

{       
for (var i = 0; i < sort4.length-1; i++) {
console.log(sort4.length,sort4[i].replace(/\$|,/g, ''),sort4[i+1].replace(/\$|,/g, ''),i);

if(parseFloat(sort4[i].replace(/\$|,/g, '')) >= parseFloat(sort4[i+1].replace(/\$|,/g, '')))
{
console.log("Sorting functionality is Working as Expected in Descending order in card view Sort by Filter for Postbill adjestment");

}   
else{
console.log(sort4.length,sort4[i].replace(/\$|,/g, ''),sort4[i+1].replace(/\$|,/g, ''),i)
console.log("Sorting functionality is Not Working as Expected in Descending order in card view sort by Filter for Postbill adjestment");
break;  
}     
}         
})
});


it('Validating Sorting functonality for Miscellaneous Adjustments', function () {

//Refresh the main pages
browser.refresh();
browser.sleep(10000);

// Log Out from Application
browser.findElement(by.xpath(testData3.SystemBar.Logout)).click();
browser.sleep(5000);

var testData5 = protractor.loginHelpers.lang;
//Get Metraview 2.0 URL
browser.get(testdata6.URL);
browser.sleep(5000);

//Select the reqired Currency
element(by.css(testData5)).click();
browser.sleep(3000);

//Login to MetraView as Corporate User
//Enter username as userName2
element(by.xpath(testData3.LoginPage.UserName)).sendKeys(testData.userName);

//Enter password
element(by.xpath(testData3.LoginPage.Password)).sendKeys(testData.passwordField);

//Click on Login Button
browser.findElement(By.xpath(testData3.LoginPage.LogInButton)).click();
browser.sleep(12000);  

var testdata12 = protractor.loginHelpers.dashboard();

var sort = [];
var unSort = [];

//Sorting from sortby Drop down (Tabular view)
//Refres the browser
browser.refresh();
browser.sleep(8000);
//Click on Go to Bills Link
element(by.xpath(testData3.Billing.GoToBillsButton)).click();
browser.sleep(8000);

//Click on dropdown to select the hardclosed interval date
element(by.xpath(testData3.Billing.SelectIntervalDropdown)).click();

//select the yesterdays hardclosed interval
element(by.xpath(testData3.Billing.SelectFirstInterval)).click();

browser.sleep(3000);
//testData3.OfferCharge.Misc_Adjustments_Label+testdata12.TEXT_MISC_ADJUSTMENTS+testData3.ChildAccounts.CloseXpath
//validate the prebill adjustments
expect(element(by.xpath(testData3.OfferCharge.Misc_Adjustments_Label+testdata12.TEXT_MISC_ADJUSTMENTS+testData3.ChildAccounts.CloseXpath)).isDisplayed()).toBe(true);

browser.sleep(2000);
//mouse hover on the prebill adjustments
browser.actions().mouseMove(element(by.xpath(testData3.OfferCharge.Misc_Adjustments_Label+testdata12.TEXT_MISC_ADJUSTMENTS+testData3.ChildAccounts.CloseXpath))).perform();
browser.sleep(1000);

element(by.xpath(testData3.OfferCharge.Misc_Adjustments_Label+testdata12.TEXT_MISC_ADJUSTMENTS+testData3.ChildAccounts.CloseXpath)).click();
 browser.sleep(2000);

// //Click on view all button
// element(By.xpath(testData3.Charges.Popup_ViewAll)).click();
// browser.sleep(2000);

//Sorting for prebill Adjustment
//Get the values of adjutment amount in unsort mode
const elem = element.all(by.xpath(testData3.Adjustment.Misc_Chargeamount_Grid))
elem.map(function(eachName){
eachName.getText().then(function unsorting(unSorted){
unSort.push (unSorted);
console.log(unSort);
return unSorted;
});

});
browser.sleep(2000);

//click on sort and select adjutment amount from the dropdown
element(by.xpath(testData3.Adjustment.SortByDropdown)).click();
element(by.xpath("//li[@class='ebComponentList-item ng-scope'][5]//a[contains(@ng-click,'sortKey')]")).click();
browser.sleep(10000);

//Get the values of adjutment amount in sort mode
elem.map(function(eachName){
eachName.getText().then(function sorting(sorted){
sort.push(sorted);
console.log(sort);
return sorted ;

});

//validate the sorting functionality
}).then(function compare ()

{       
for (var i = 0; i < sort.length-1; i++) {
console.log(sort.length,sort[i].replace(/\$|,/g, ''),sort[i+1].replace(/\$|,/g, ''),i);

if(parseFloat(sort[i].replace(/\$|,/g, '')) >= parseFloat(sort[i+1].replace(/\$|,/g, '')))
{
//console.log(sort.length,sort[i].replace(/\$|,/g, ''),sort[i+1].replace(/\$|,/g, ''),i)
console.log("Sorting functionality is Working as Expected in Descending order for Miscellaneous Adjustments");          
}   

else{
console.log(sort.length,sort[i].replace(/\$|,/g, ''),sort[i+1].replace(/\$|,/g, ''),i)
console.log("Sorting functionality is Not Working as Expected in Descending order for Miscellaneous Adjustments");
break;  
}     
}         
})

var sort1 = [];
var unSort1 = [];

//Filter Sorting (Tabular view)
browser.refresh();
browser.sleep(3000);

//Click on Go to Bills Link
element(by.xpath(testData3.Billing.GoToBillsButton)).click();
browser.sleep(8000);

//Click on dropdown to select the hardclosed interval date
element(by.xpath(testData3.Billing.SelectIntervalDropdown)).click();

//select the 
element(by.xpath(testData3.Billing.SelectFirstInterval)).click();
browser.sleep(3000);

//After mouse hovering the adjustments are displayed in the card view
expect(element(by.xpath(testData3.OfferCharge.Misc_Adjustments_Label+testdata12.TEXT_MISC_ADJUSTMENTS+testData3.ChildAccounts.CloseXpath)).isDisplayed()).toBe(true);

//Sorting for PrebillAdjustment
browser.actions().mouseMove(element(by.xpath(testData3.OfferCharge.Misc_Adjustments_Label+testdata12.TEXT_MISC_ADJUSTMENTS+testData3.ChildAccounts.CloseXpath))).perform();
browser.sleep(1000);

element(by.xpath(testData3.OfferCharge.Misc_Adjustments_Label+testdata12.TEXT_MISC_ADJUSTMENTS+testData3.ChildAccounts.CloseXpath)).click();
 browser.sleep(2000);

// //click on view all button in order to validate the card view
// element(By.xpath(testData3.Charges.Popup_ViewAll)).click();
// browser.sleep(2000);

//Get the values of adjutment amount in unsort mode
const elem1 = element.all(by.xpath(testData3.Adjustment.Misc_Chargeamount_Grid))
elem1.map(function(eachName){
eachName.getText().then(function unsorting(unSorted){
unSort1.push (unSorted);
console.log(unSort1);
return unSorted;
});
});
browser.sleep(2000);
element(by.xpath(testData3.Downloads.SortingFilter)).click();
browser.sleep(5000);
//browser.actions().mouseMove(element(by.xpath(testData3.Downloads.SortingFilter_Label))).perform();

//click on sort and select adjutment amount from the dropdown
element(by.xpath(testData3.Adjustment.Filter_sortby_dropdown)).click();
element(by.xpath("//li[@class='ebComponentList-item ng-scope'][4]//following::a[contains(@ng-click,'sortKey')][8]")).click();
browser.sleep(3000);

//Apply button 
element(by.xpath(testData3.Adjustment.Apply_Button)).click();
browser.sleep(10000);

//Get the values of adjutment amount in sort mode
elem1.map(function(eachName){
eachName.getText().then(function sorting(sorted){
sort1.push(sorted);
console.log(sort1);
return sorted ;

});

//validate the sorting functionality
}).then(function compare ()

{ 

for (var i = 0; i < sort1.length-1; i++) {
console.log(sort1.length,sort1[i].replace(/\$|,/g, ''),sort1[i+1].replace(/\$|,/g, ''),i);

if(parseFloat(sort1[i].replace(/\$|,/g, '')) >= parseFloat(sort1[i+1].replace(/\$|,/g, '')))
{
console.log("Sorting functionality is Working as Expected in Descending order for Miscellaneous Adjustments");

}   
else{
console.log(sort1.length,sort1[i].replace(/\$|,/g, ''),sort1[i+1].replace(/\$|,/g, ''),i)
console.log("Sorting functionality is Not Working as Expected in Descending order for Miscellaneous Adjustments");
break;  
}     
}         
})


//Grid Sorting Validation (Tabular view)
browser.refresh();
browser.sleep(3000);

var sort2 = [];
var unSort2 = [];

//Click on Go to Bills Link
element(by.xpath(testData3.Billing.GoToBillsButton)).click();
browser.sleep(8000);

//Click on dropdown to select the hardclosed interval date
element(by.xpath(testData3.Billing.SelectIntervalDropdown)).click();

//select the 
element(by.xpath(testData3.Billing.SelectFirstInterval)).click();
browser.sleep(3000);

//Sorting for PrebillAdjustment
browser.actions().mouseMove(element(by.xpath(testData3.OfferCharge.Misc_Adjustments_Label+testdata12.TEXT_MISC_ADJUSTMENTS+testData3.ChildAccounts.CloseXpath))).perform();
browser.sleep(1000);

//After mouse hovering the adjustments are displayed in the card view
expect(element(by.xpath(testData3.OfferCharge.Misc_Adjustments_Label+testdata12.TEXT_MISC_ADJUSTMENTS+testData3.ChildAccounts.CloseXpath)).isDisplayed()).toBe(true);

element(by.xpath(testData3.OfferCharge.Misc_Adjustments_Label+testdata12.TEXT_MISC_ADJUSTMENTS+testData3.ChildAccounts.CloseXpath)).click();
 browser.sleep(2000);

// //click on view all button in order to validate the card view
// element(By.xpath(testData3.Charges.Popup_ViewAll)).click();
// browser.sleep(2000);

//Get the values of adjutment amount in unsort mode
const elem2 = element.all(by.xpath(testData3.Adjustment.Misc_Chargeamount_Grid))
elem2.map(function(eachName){
eachName.getText().then(function unsorting(unSorted){
unSort2.push (unSorted);
console.log(unSort2);
return unSorted;
});
});

//click on 
element(by.xpath(testData3.Adjustment.Amount_grid_misc)).click();
browser.sleep(10000);

//Get the values of adjutment amount in sort mode
elem2.map(function(eachName){
eachName.getText().then(function sorting(sorted){
sort2.push(sorted);
console.log(sort2);
return sorted ;

});

//validate the sorting functionality
}).then(function compare ()

{       
for (var i = 0; i < sort2.length-1; i++) {
console.log(sort2.length,sort2[i].replace(/\$|,/g, ''),sort2[i+1].replace(/\$|,/g, ''),i);

if(parseFloat(sort2[i].replace(/\$|,/g, '')) <= parseFloat(sort2[i+1].replace(/\$|,/g, '')))
{
console.log("Sorting functionality is Working as Expected in Ascending order as For grid sorting Ascending order is the default one for Miscellaneous Adjustments");

}   
else{
console.log(sort2.length,sort2[i].replace(/\$|,/g, ''),sort2[i+1].replace(/\$|,/g, ''),i)
console.log("Sorting functionality is Not Working as Expected in Ascending order as For grid sorting Ascending order is the default one for Miscellaneous Adjustments");
break;  
}     
}         
})

var sort3 = [];
var unSort3 = [];

//Sorting from sortby Drop down (Card view)
browser.refresh();
browser.sleep(3000);

//Click on Go to Bills Link
element(by.xpath(testData3.Billing.GoToBillsButton)).click();
browser.sleep(8000);

//Click on dropdown to select the hardclosed interval date
element(by.xpath(testData3.Billing.SelectIntervalDropdown)).click();

//select the 
element(by.xpath(testData3.Billing.SelectFirstInterval)).click();
browser.sleep(3000);

//Sorting for PrebillAdjustment
browser.actions().mouseMove(element(by.xpath(testData3.OfferCharge.Misc_Adjustments_Label+testdata12.TEXT_MISC_ADJUSTMENTS+testData3.ChildAccounts.CloseXpath))).perform();
browser.sleep(1000);

//After mouse hovering the adjustments are displayed in the card view
expect(element(by.xpath(testData3.OfferCharge.Misc_Adjustments_Label+testdata12.TEXT_MISC_ADJUSTMENTS+testData3.ChildAccounts.CloseXpath)).isDisplayed()).toBe(true);

element(by.xpath(testData3.OfferCharge.Misc_Adjustments_Label+testdata12.TEXT_MISC_ADJUSTMENTS+testData3.ChildAccounts.CloseXpath)).click();
 browser.sleep(2000);

// //click on view all button in order to validate the card view
// element(By.xpath(testData3.Charges.Popup_ViewAll)).click();
// browser.sleep(2000);

//click on card view button
element(by.xpath(testData3.MySubscriptions.Style_Card)).click();

//The adjustments are displayed in the card view
expect(element(by.xpath(testData3.Adjustment.CardView)).isDisplayed()).toBe(true);

//Get the values of adjutment amount in unsort mode
const elem3 = element.all(by.xpath(testData3.Adjustment.Cardview_charges));
elem3.map(function(eachName){
eachName.getText().then(function unsorting(unSorted){
unSort3.push (unSorted);
console.log(unSort3);
return unSorted;
});
});

//click on sort and select adjutment amount from the dropdown
element(by.xpath(testData3.Adjustment.SortByDropdown)).click();
element(by.xpath("//li[@class='ebComponentList-item ng-scope'][5]//a[contains(@ng-click,'sortKey')]")).click();
browser.sleep(10000);

//Get the values of adjutment amount in sort mode
elem3.map(function(eachName){
eachName.getText().then(function sorting(sorted){
sort3.push(sorted);
console.log(sort3);
return sorted ;
});

//validate the sorting functionality
}).then(function compare ()

{       
for (var i = 0; i < sort3.length-1; i++) {
console.log(sort3.length,sort3[i].replace(/\$|,/g, ''),sort3[i+1].replace(/\$|,/g, ''),i);

if(parseFloat(sort3[i].replace(/\$|,/g, '')) >= parseFloat(sort3[i+1].replace(/\$|,/g, '')))
{
console.log("Sorting functionality is Working as Expected in Descending order in card view Sort by Dropdown for Miscellaneous Adjustments");

}   
else{
console.log(sort3.length,sort3[i].replace(/\$|,/g, ''),sort3[i+1].replace(/\$|,/g, ''),i)
console.log("Sorting functionality is Not Working as Expected in Descending order in card view Sort by Dropdown for Miscellaneous Adjustments");
break;  
}     
}         
})

var sort4 = [];
var unSort4 = [];

//Sorting from Filter, (Card view)
browser.refresh();
browser.sleep(3000);

//Click on Go to Bills Link
element(by.xpath(testData3.Billing.GoToBillsButton)).click();
browser.sleep(8000);

//Click on dropdown to select the hardclosed interval date
element(by.xpath(testData3.Billing.SelectIntervalDropdown)).click();

//select the 
element(by.xpath(testData3.Billing.SelectFirstInterval)).click();
browser.sleep(3000);

//Sorting for PrebillAdjustment
browser.actions().mouseMove(element(by.xpath(testData3.OfferCharge.Misc_Adjustments_Label+testdata12.TEXT_MISC_ADJUSTMENTS+testData3.ChildAccounts.CloseXpath))).perform();
browser.sleep(1000);

//After mouse hovering the adjustments are displayed in the card view
expect(element(by.xpath(testData3.OfferCharge.Misc_Adjustments_Label+testdata12.TEXT_MISC_ADJUSTMENTS+testData3.ChildAccounts.CloseXpath)).isDisplayed()).toBe(true);


element(by.xpath(testData3.OfferCharge.Misc_Adjustments_Label+testdata12.TEXT_MISC_ADJUSTMENTS+testData3.ChildAccounts.CloseXpath)).click();
 browser.sleep(2000);

// //click on view all button in order to validate the card view
// element(By.xpath(testData3.Charges.Popup_ViewAll)).click();
// browser.sleep(2000);

//click on card view button
element(by.xpath(testData3.MySubscriptions.Style_Card)).click();

//The adjustments are displayed in the card view
expect(element(by.xpath(testData3.Adjustment.CardView)).isDisplayed()).toBe(true);
browser.sleep(2000);

//Get the values of adjutment amount in unsort mode
const elem4 = element.all(by.xpath(testData3.Adjustment.Cardview_charges))
elem.map(function(eachName){
eachName.getText().then(function unsorting(unSorted){
unSort4.push (unSorted);
console.log(unSort4);
return unSorted;
});
});
browser.sleep(2000);
element(by.xpath(testData3.Downloads.SortingFilter)).click();
browser.sleep(5000);
//browser.actions().mouseMove(element(by.xpath(testData3.Downloads.SortingFilter_Label))).perform();

//click on sort and select adjutment amount from the dropdown
element(by.xpath(testData3.Adjustment.Filter_sortby_dropdown)).click();
element(by.xpath("//li[@class='ebComponentList-item ng-scope'][4]//following::a[contains(@ng-click,'sortKey')][8]")).click();
browser.sleep(3000);

//Apply button 
element(by.xpath(testData3.Adjustment.Apply_Button)).click();
browser.sleep(10000);

//Get the values of adjutment amount in sort mode
elem4.map(function(eachName){
eachName.getText().then(function sorting(sorted){
sort4.push(sorted);
console.log(sort4);
return sorted ;
});

//validate the sorting functionality
}).then(function compare ()

{       
for (var i = 0; i < sort4.length-1; i++) {
console.log(sort4.length,sort4[i].replace(/\$|,/g, ''),sort4[i+1].replace(/\$|,/g, ''),i);

if(parseFloat(sort4[i].replace(/\$|,/g, '')) >= parseFloat(sort4[i+1].replace(/\$|,/g, '')))
{
console.log("Sorting functionality is Working as Expected in Descending order in card view Sort by Filter for Miscellaneous Adjustments");

}   
else{
console.log(sort4.length,sort4[i].replace(/\$|,/g, ''),sort4[i+1].replace(/\$|,/g, ''),i)
console.log("Sorting functionality is Not Working as Expected in Descending order in card view Sort by Filter for Miscellaneous Adjustments");
break;  
}     
}         
})


});

it('Validating Sorting functonality for Non Standard Charges', function () {

    //Refresh the main page
browser.refresh();
browser.sleep(10000);

// Log Out from Application
browser.findElement(by.xpath(testData3.SystemBar.Logout)).click();
browser.sleep(5000);

var testData5 = protractor.loginHelpers.lang;
//Get Metraview 2.0 URL
browser.get(testdata6.URL);
browser.sleep(5000);

//Select the reqired Currency
element(by.css(testData5)).click();
browser.sleep(3000);

//Login to MetraView as Corporate User
//Enter username as userName2
element(by.xpath(testData3.LoginPage.UserName)).sendKeys(testData.userName);

//Enter password
element(by.xpath(testData3.LoginPage.Password)).sendKeys(testData.passwordField);

//Click on Login Button
browser.findElement(By.xpath(testData3.LoginPage.LogInButton)).click();
browser.sleep(12000);  

var sort = [];
var unSort = [];


//Sorting from sortby Drop down (Tabular view)
//Refres the browser
browser.refresh();
browser.sleep(8000);
//Click on Go to Bills Link
element(by.xpath(testData3.Billing.GoToBillsButton)).click();
browser.sleep(8000);

//Click on dropdown to select the hardclosed interval date
element(by.xpath(testData3.Billing.SelectIntervalDropdown)).click();

//select the yesterdays hardclosed interval
element(by.xpath(testData3.Billing.SelectFirstInterval)).click();  
browser.sleep(3000);
var testdata12 = protractor.loginHelpers.dashboard();
//mouse hover on the prebill adjustments
element(by.xpath(testData3.OfferCharge.Non_Standard_Charge_Label+testdata12.TEXT_NON_STANDARD_CHARGES+testData3.Transactions.CloseXpath)).click();
browser.sleep(3000);

//Sorting for prebill Adjustment
//Get the values of adjutment amount in unsort mode
const elem = element.all(by.xpath(testData3.Adjustment.Misc_values))
elem.map(function(eachName){
eachName.getText().then(function unsorting(unSorted){
unSort.push (unSorted);
console.log(unSort);
return unSorted;
});

});
browser.sleep(2000);

//click on sort and select adjutment amount from the dropdown
element(by.xpath(testData3.Adjustment.SortByDropdown)).click();
element(by.xpath(testData3.Adjustment.SortByDropdownSecondValue)).click();
browser.sleep(10000);

//Get the values of adjutment amount in sort mode
elem.map(function(eachName){
eachName.getText().then(function sorting(sorted){
sort.push(sorted);
console.log(sort);
return sorted ;

});

//validate the sorting functionality
}).then(function compare ()

{       
for (var i = 0; i < sort.length-1; i++) {
console.log(sort.length,sort[i].replace(/\$|,/g, ''),sort[i+1].replace(/\$|,/g, ''),i);

if(parseFloat(sort[i].replace(/\$|,/g, '')) >= parseFloat(sort[i+1].replace(/\$|,/g, '')))
{
//console.log(sort.length,sort[i].replace(/\$|,/g, ''),sort[i+1].replace(/\$|,/g, ''),i)
console.log("Sorting functionality is Working as Expected in Descending order for Non Standard Charges");          
}   

else{
console.log(sort.length,sort[i].replace(/\$|,/g, ''),sort[i+1].replace(/\$|,/g, ''),i)
console.log("Sorting functionality is Not Working as Expected in Descending order for Non Standard Charges");
break;  
}     
}         
})

var sort1 = [];
var unSort1 = [];

//Filter Sorting (Tabular view)
browser.refresh();
browser.sleep(3000);

//Click on Go to Bills Link
element(by.xpath(testData3.Billing.GoToBillsButton)).click();
browser.sleep(8000);

//Click on dropdown 
element(by.xpath(testData3.Billing.SelectIntervalDropdown)).click();

//select the hardclosed interval date
element(by.xpath(testData3.Billing.SelectFirstInterval)).click();
browser.sleep(3000);

//Sorting for PrebillAdjustment
element(by.xpath(testData3.OfferCharge.Non_Standard_Charge_Label+testdata12.TEXT_NON_STANDARD_CHARGES+testData3.Transactions.CloseXpath)).click();
browser.sleep(2000);

//Get the values of adjutment amount in unsort mode
const elem1 = element.all(by.xpath(testData3.Adjustment.Misc_values))
elem1.map(function(eachName){
eachName.getText().then(function unsorting(unSorted){
unSort1.push (unSorted);
console.log(unSort1);
return unSorted;
});
});
browser.sleep(2000);
element(by.xpath(testData3.Downloads.SortingFilter)).click();
browser.sleep(5000);
//browser.actions().mouseMove(element(by.xpath(testData3.Downloads.SortingFilter_Label))).perform();

//click on sort and select adjutment amount from the dropdown
element(by.xpath(testData3.Adjustment.Filter_sortby_dropdown)).click();
element(by.xpath(testData3.Adjustment.Filter_sortby_dropdown_secondvalue)).click();
browser.sleep(3000);

//Apply button 
element(by.xpath(testData3.Adjustment.Apply_Button)).click();
browser.sleep(10000);

//Get the values of adjutment amount in sort mode
elem1.map(function(eachName){
eachName.getText().then(function sorting(sorted){
sort1.push(sorted);
console.log(sort1);
return sorted ;

});

//validate the sorting functionality
}).then(function compare ()

{ 

for (var i = 0; i < sort1.length-1; i++) {
console.log(sort1.length,sort1[i].replace(/\$|,/g, ''),sort1[i+1].replace(/\$|,/g, ''),i);

if(parseFloat(sort1[i].replace(/\$|,/g, '')) >= parseFloat(sort1[i+1].replace(/\$|,/g, '')))
{
console.log("Sorting functionality is Working as Expected in Descending order for Non Standard Charges");

}   
else{
console.log(sort1.length,sort1[i].replace(/\$|,/g, ''),sort1[i+1].replace(/\$|,/g, ''),i)
console.log("Sorting functionality is Not Working as Expected in Descending order for Non Standard Charges");
break;  
}     
}         
})

var sort2 = [];
var unSort2 = [];

//Grid Sorting Validation (Tabular view)
browser.refresh();
browser.sleep(3000);

//Click on Go to Bills Link
element(by.xpath(testData3.Billing.GoToBillsButton)).click();
browser.sleep(8000);

//Click on dropdown to select the hardclosed interval date
element(by.xpath(testData3.Billing.SelectIntervalDropdown)).click();

//select the 
element(by.xpath(testData3.Billing.SelectFirstInterval)).click();
browser.sleep(3000);

//After mouse hovering the adjustments are displayed in the card view
element(by.xpath(testData3.OfferCharge.Non_Standard_Charge_Label+testdata12.TEXT_NON_STANDARD_CHARGES+testData3.Transactions.CloseXpath)).click();
browser.sleep(2000);

//Get the values of adjutment amount in unsort mode
const elem2 = element.all(by.xpath(testData3.Adjustment.Misc_values))
elem2.map(function(eachName){
eachName.getText().then(function unsorting(unSorted){
unSort2.push (unSorted);
console.log(unSort2);
return unSorted;
});
});

//click on 
element(by.xpath(testData3.Adjustment.Nonstandard_Grid)).click();
browser.sleep(10000);

//Get the values of adjutment amount in sort mode
elem2.map(function(eachName){
eachName.getText().then(function sorting(sorted){
sort2.push(sorted);
console.log(sort2);
return sorted ;

});

//validate the sorting functionality
}).then(function compare ()

{       
for (var i = 0; i < sort2.length-1; i++) {
console.log(sort2.length,sort2[i].replace(/\$|,/g, ''),sort2[i+1].replace(/\$|,/g, ''),i);

if(parseFloat(sort2[i].replace(/\$|,/g, '')) <= parseFloat(sort2[i+1].replace(/\$|,/g, '')))
{
console.log("Sorting functionality is Working as Expected in Ascending order as For grid sorting Ascending order is the default one for Non Standard Charges");

}   
else{
console.log(sort2.length,sort2[i].replace(/\$|,/g, ''),sort2[i+1].replace(/\$|,/g, ''),i)
console.log("Sorting functionality is Not Working as Expected in Ascending order as For grid sorting Ascending order is the default one for Non Standard Charges");
break;  
}     
}         
})

var sort3 = [];
var unSort3 = [];

//Sorting from sortby Drop down (Card view)
browser.refresh();
browser.sleep(3000);

//Click on Go to Bills Link
element(by.xpath(testData3.Billing.GoToBillsButton)).click();
browser.sleep(8000);

//Click on dropdown to select the hardclosed interval date
element(by.xpath(testData3.Billing.SelectIntervalDropdown)).click();

//select the 
element(by.xpath(testData3.Billing.SelectFirstInterval)).click();
browser.sleep(3000);

//After mouse hovering the adjustments are displayed in the card view
element(by.xpath(testData3.OfferCharge.Non_Standard_Charge_Label+testdata12.TEXT_NON_STANDARD_CHARGES+testData3.Transactions.CloseXpath)).click();
browser.sleep(2000);

//click on card view button
element(by.xpath(testData3.MySubscriptions.Style_Card)).click();

//The adjustments are displayed in the card view
expect(element(by.xpath(testData3.Adjustment.CardView)).isDisplayed()).toBe(true);

//Get the values of adjutment amount in unsort mode
const elem3 = element.all(by.xpath("//ecb-charges/div/div[2]/div/div/div/table/tbody/tr[2]/td[2]/span"));
elem3.map(function(eachName){
eachName.getText().then(function unsorting(unSorted){
unSort3.push (unSorted);
console.log(unSort3);
return unSorted;
});
});

//click on sort and select adjutment amount from the dropdown
element(by.xpath(testData3.Adjustment.SortByDropdown)).click();
element(by.xpath(testData3.Adjustment.SortByDropdownSecondValue)).click();
browser.sleep(10000);

//Get the values of adjutment amount in sort mode
elem3.map(function(eachName){
eachName.getText().then(function sorting(sorted){
sort3.push(sorted);
console.log(sort3);
return sorted ;
});

//validate the sorting functionality
}).then(function compare ()

{       
for (var i = 0; i < sort3.length-1; i++) {
console.log(sort3.length,sort3[i].replace(/\$|,/g, ''),sort3[i+1].replace(/\$|,/g, ''),i);

if(parseFloat(sort3[i].replace(/\$|,/g, '')) >= parseFloat(sort3[i+1].replace(/\$|,/g, '')))
{
console.log("Sorting functionality is Working as Expected in Descending order in card view Sort by Dropdown for Non Standard Charges");

}   
else{
console.log(sort3.length,sort3[i].replace(/\$|,/g, ''),sort3[i+1].replace(/\$|,/g, ''),i)
console.log("Sorting functionality is Not Working as Expected in Descending order in card view Sort by Dropdown for Non Standard Charges");
break;  
}     
}         
})

var sort4 = [];
var unSort4 = [];

//Sorting from Filter, (Card view)
browser.refresh();
browser.sleep(3000);

//Click on Go to Bills Link
element(by.xpath(testData3.Billing.GoToBillsButton)).click();
browser.sleep(8000);

//Click on dropdown to select the hardclosed interval date
element(by.xpath(testData3.Billing.SelectIntervalDropdown)).click();

//select the 
element(by.xpath(testData3.Billing.SelectFirstInterval)).click();
browser.sleep(3000);

//After mouse hovering the adjustments are displayed in the card view
element(by.xpath(testData3.OfferCharge.Non_Standard_Charge_Label+testdata12.TEXT_NON_STANDARD_CHARGES+testData3.Transactions.CloseXpath)).click();
browser.sleep(2000);

//click on card view button
element(by.xpath(testData3.MySubscriptions.Style_Card)).click();

//The adjustments are displayed in the card view
expect(element(by.xpath(testData3.Adjustment.CardView)).isDisplayed()).toBe(true);
browser.sleep(2000);

//Get the values of adjutment amount in unsort mode
const elem4 = element.all(by.xpath("//ecb-charges/div/div[2]/div/div/div/table/tbody/tr[2]/td[2]/span"))
elem4.map(function(eachName){
eachName.getText().then(function unsorting(unSorted){
unSort4.push (unSorted);
console.log(unSort4);
return unSorted;
});
});
browser.sleep(2000);
element(by.xpath(testData3.Downloads.SortingFilter)).click();
browser.sleep(5000);
//browser.actions().mouseMove(element(by.xpath(testData3.Downloads.SortingFilter_Label))).perform();

//click on sort and select adjutment amount from the dropdown
element(by.xpath(testData3.Adjustment.Filter_sortby_dropdown)).click();
element(by.xpath(testData3.Adjustment.Filter_sortby_dropdown_secondvalue)).click();
browser.sleep(3000);

//Apply button 
element(by.xpath(testData3.Adjustment.Apply_Button)).click();
browser.sleep(10000);

//Get the values of adjutment amount in sort mode
elem4.map(function(eachName){
eachName.getText().then(function sorting(sorted){
sort4.push(sorted);
console.log(sort4);
return sorted ;
});

//validate the sorting functionality
}).then(function compare ()

{       
for (var i = 0; i < sort4.length-1; i++) {
console.log(sort4.length,sort4[i].replace(/\$|,/g, ''),sort4[i+1].replace(/\$|,/g, ''),i);

if(parseFloat(sort4[i].replace(/\$|,/g, '')) >= parseFloat(sort4[i+1].replace(/\$|,/g, '')))
{
console.log("Sorting functionality is Working as Expected in Descending order in card view Sort by Filter for Non Standard Charges");

}   
else{
console.log(sort4.length,sort4[i].replace(/\$|,/g, ''),sort4[i+1].replace(/\$|,/g, ''),i)
console.log("Sorting functionality is Not Working as Expected in Descending order in card view Sort by Filter for Non Standard Charges");
break;  
}     
}         
})

//Logout from the MV2.0 Application 
protractor.loginHelpers.logOutMV();

});

});
   
   