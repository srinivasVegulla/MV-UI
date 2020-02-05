var testdata = require('../inputs/testdata/Login.json');
var testdata2 = require('../inputs/testdata/XpathRepository.json');

describe('UI Baseline App', function () {
//(MVIEW-2651) Localization: Login: Question mark is located at the beginning (on the right) of forgot password link
it('Question mark is located at the beginning (on the right) of forgot password link for EG & IL', function () {

//Input file to refer
var testdata1 = protractor.loginHelpers.security();

browser.refresh();
browser.sleep(5000);

browser.get(testdata.url.URL);
browser.sleep(2000);
//For language selection
var testdata10 = protractor.loginHelpers.lang;
element(by.css(testdata10)).click();

expect(browser.getTitle()).toEqual(testdata.url.Title);
expect(browser.getCurrentUrl()).toMatch(testdata.url.CurrentUrl);
browser.sleep(8000);

//Retrieving the Forgotpassword link
var forgotlink = element(by.xpath(testdata2.LoginPage.ForgotPassword_Link));
browser.sleep(8000);

var testdata4 = protractor.loginHelpers.langCode;
function localizedvalue(testdata4){
var testdata3 =testdata1.LOGIN_FORGOT_PASSWORD;
switch (testdata4) {
case "EG":
//Removing the '؟' mark and replacing the empty space
testdata3 = testdata3.replace('؟','');
//Validating that the Question(؟) mark is located at the beginning of the text
expect(forgotlink.getText()).toEqual(testdata3+"؟");
break;

case "IL":
//Removing the '؟' mark and replacing the empty space
testdata3 = testdata3.replace('?','');
//Validating that the Question(?) mark is located at the beginning of the text
expect(forgotlink.getText()).toEqual("?"+testdata3);
break;
}
}

localizedvalue(testdata4);

});
}); 
