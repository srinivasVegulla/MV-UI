var testdata = require('../inputs/testdata/Login.json');
var testdata3 = require('../inputs/testdata/XpathRepository.json');
var testdata4= require('../inputs/testdata/JsonFileCreation.json');

describe('UI Baseline App', function () {

  //Q1 Bugs: MVIEW-2654-Copyright text "Ⓒ Ericsson AB, 2015-2018" shows in the national languages when localization are Swedish and Japanese
  //Q1 Bugs: MVIEW-2657 :Localization: 'New Account Sign Up' dialog: copyright display issues in different locales
it('Verify copyright text "Ⓒ Ericsson AB, 2015-2018" is displayed in English on Login Page, Forgot Password page and in New Account Sign Up page', function () {

  browser.refresh();
  browser.sleep(3000);

  browser.get(testdata4.URL);
  browser.sleep(2000);
  var testdata6 = protractor.loginHelpers.lang; 

  element(by.css(testdata6)).click();
  browser.sleep(3000);

  var testdata5 =protractor.loginHelpers.langCode;

  function copyRightsValidate(testdata5){
  //Input file to refer
  var testdata9 = protractor.loginHelpers.security();
  var testda=testdata9.LOGIN_COPYRIGHT;
  console.log(testda);
  testdata10= testda.replace('Ⓒ Ericsson AB, 2015-2018','');
  var lpage=element(by.xpath(testdata3.LoginPage.CopyRight));

  switch (testdata5) {

  case "BR":
  expect(lpage.getText()).toEqual("Ⓒ Ericsson AB, 2015-2018"+testdata10);
  //click on signup button
  element(by.xpath(testdata3.LoginPage.SignUpLink)).click();
  browser.sleep(3000);
  //Verify the Copy Rights in New Account Sign Up Page
  expect(lpage.getText()).toEqual("Ⓒ Ericsson AB, 2015-2018"+testdata10);
  //Click on Cancel Button
  element(by.xpath(testdata3.SignUpPage.CancelButton)).click();
  //Click on Forgot Passord link
  element(by.xpath(testdata3.LoginPage.ForgotPassword_Link)).click();
  browser.sleep(3000);
  //Verify the Copy Rights text is in English in Forgot Password Page
  expect(fpage.getText()).toEqual("Ⓒ Ericsson AB, 2015-2018"+testdata10);

  break;

  case "DE":
  expect(lpage.getText()).toEqual("Ⓒ Ericsson AB, 2015-2018"+testdata10);
  //click on signup button
  element(by.xpath(testdata3.LoginPage.SignUpLink)).click();
  browser.sleep(3000);
  //Verify the Copy Rights in New Account Sign Up Page
  expect(lpage.getText()).toEqual("Ⓒ Ericsson AB, 2015-2018"+testdata10);
  //Click on Cancel Button
  element(by.xpath(testdata3.SignUpPage.CancelButton)).click();
  //Clicking on Forgot Passord link
  element(by.xpath(testdata3.LoginPage.ForgotPassword_Link)).click();
  browser.sleep(3000);
  //Verify the Copy Rights text is in English in Forgot Password Page
  expect(lpage.getText()).toEqual("Ⓒ Ericsson AB, 2015-2018"+testdata10);
  break;

  case "EG":
  expect(lpage.getText()).toEqual(testdata10+ "Ⓒ Ericsson AB, 2015-2018");
  //click on signup button
  element(by.xpath(testdata3.LoginPage.SignUpLink)).click();
  browser.sleep(3000);
  //Verify the Copy Rights in New Account Sign Up Page
  expect(lpage.getText()).toEqual(testdata10+ "Ⓒ Ericsson AB, 2015-2018");
  //Click on Cancel Button
  element(by.xpath(testdata3.SignUpPage.CancelButton)).click();
  //Click on Forgot Passord link
  element(by.xpath(testdata3.LoginPage.ForgotPassword_Link)).click();
  browser.sleep(3000);
  //Verify the Copy Rights text is in English in Forgot Password Page
  expect(lpage.getText()).toEqual(testdata10+ "Ⓒ Ericsson AB, 2015-2018");

  break;

  case "ES":
  expect(lpage.getText()).toEqual("Ⓒ Ericsson AB, 2015-2018"+testdata10);
  //click on signup button
  element(by.xpath(testdata3.LoginPage.SignUpLink)).click();
  browser.sleep(3000);
  //Verify the Copy Rights in New Account Sign Up Page
  expect(lpage.getText()).toEqual("Ⓒ Ericsson AB, 2015-2018"+testdata10);
  //Click on Cancel Button
  element(by.xpath(testdata3.SignUpPage.CancelButton)).click();
  //Click on Forgot Passord link
  element(by.xpath(testdata3.LoginPage.ForgotPassword_Link)).click();
  browser.sleep(3000);
  //Verify the Copy Rights text is in English in Forgot Password Page
  expect(lpage.getText()).toEqual("Ⓒ Ericsson AB, 2015-2018"+testdata10);
  break;

  case "FR":

  expect(lpage.getText()).toEqual("Ⓒ Ericsson AB, 2015-2018"+testdata10);
  //click on signup button
  element(by.xpath(testdata3.LoginPage.SignUpLink)).click();
  browser.sleep(3000);
  //Verify the Copy Rights in New Account Sign Up Page
  expect(lpage.getText()).toEqual("Ⓒ Ericsson AB, 2015-2018"+testdata10);
  //Click on Cancel Button
  element(by.xpath(testdata3.SignUpPage.CancelButton)).click();
  //Click on Forgot Passord link
  element(by.xpath(testdata3.LoginPage.ForgotPassword_Link)).click();
  browser.sleep(3000);
  //Verify the Copy Rights text is in English in Forgot Password Page
  expect(lpage.getText()).toEqual("Ⓒ Ericsson AB, 2015-2018"+testdata10);
  break;

  case "GB":
  expect(lpage.getText()).toEqual("Ⓒ Ericsson AB, 2015-2018"+testdata10);
  //click on signup button
  element(by.xpath(testdata3.LoginPage.SignUpLink)).click();
  browser.sleep(3000);
  //Verify the Copy Rights in New Account Sign Up Page
  expect(lpage.getText()).toEqual("Ⓒ Ericsson AB, 2015-2018"+testdata10);
  //Click on Cancel Button
  element(by.xpath(testdata3.SignUpPage.CancelButton)).click();
  //Click on Forgot Passord link
  element(by.xpath(testdata3.LoginPage.ForgotPassword_Link)).click();
  browser.sleep(3000);
  //Verify the Copy Rights text is in English in Forgot Password Page
  expect(lpage.getText()).toEqual("Ⓒ Ericsson AB, 2015-2018"+testdata10);
  break;

  case "IL":
  expect(lpage.getText()).toEqual(testdata10+"Ⓒ Ericsson AB, 2015-2018");
  //click on signup button
  element(by.xpath(testdata3.LoginPage.SignUpLink)).click();
  browser.sleep(3000);
  //Verify the Copy Rights in New Account Sign Up Page
  expect(lpage.getText()).toEqual(testdata10+"Ⓒ Ericsson AB, 2015-2018");
  //Click on Cancel Button
  element(by.xpath(testdata3.SignUpPage.CancelButton)).click();
  //Click on Forgot Passord link
  element(by.xpath(testdata3.LoginPage.ForgotPassword_Link)).click();
  browser.sleep(3000);
  //Verify the Copy Rights text is in English in Forgot Password Page
  expect(lpage.getText()).toEqual(testdata10+ "Ⓒ Ericsson AB, 2015-2018");
  break;

  case "JP":

  expect(lpage.getText()).toEqual("Ⓒ Ericsson AB, 2015-2018"+testdata10);
  //click on signup button
  element(by.xpath(testdata3.LoginPage.SignUpLink)).click();
  browser.sleep(3000);
  //Verify the Copy Rights in New Account Sign Up Page
  expect(lpage.getText()).toEqual("Ⓒ Ericsson AB, 2015-2018"+testdata10);
  //Click on Cancel Button
  element(by.xpath(testdata3.SignUpPage.CancelButton)).click();
  //Click on Forgot Passord link
  element(by.xpath(testdata3.LoginPage.ForgotPassword_Link)).click();
  browser.sleep(3000);
  //Verify the Copy Rights text is in English in Forgot Password Page
  expect(lpage.getText()).toEqual("Ⓒ Ericsson AB, 2015-2018"+testdata10);
  break;

  case "MX":

  expect(lpage.getText()).toEqual("Ⓒ Ericsson AB, 2015-2018"+testdata10);
  //click on signup button
  element(by.xpath(testdata3.LoginPage.SignUpLink)).click();
  browser.sleep(3000);
  //Verify the Copy Rights in New Account Sign Up Page
  expect(lpage.getText()).toEqual("Ⓒ Ericsson AB, 2015-2018"+testdata10);
  //Click on Cancel Button
  element(by.xpath(testdata3.SignUpPage.CancelButton)).click();
  //Click on Forgot Passord link
  element(by.xpath(testdata3.LoginPage.ForgotPassword_Link)).click();
  browser.sleep(3000);
  //Verify the Copy Rights text is in English in Forgot Password Page
  expect(lpage.getText()).toEqual("Ⓒ Ericsson AB, 2015-2018"+testdata10);
  break;

  case "SE":

  expect(lpage.getText()).toEqual("Ⓒ Ericsson AB, 2015-2018"+testdata10);
  //click on signup button
  element(by.xpath(testdata3.LoginPage.SignUpLink)).click();
  browser.sleep(3000);
  //Verify the Copy Rights in New Account Sign Up Page
  expect(lpage.getText()).toEqual("Ⓒ Ericsson AB, 2015-2018"+testdata10);
  //Click on Cancel Button
  element(by.xpath(testdata3.SignUpPage.CancelButton)).click();
  //Click on Forgot Passord link
  element(by.xpath(testdata3.LoginPage.ForgotPassword_Link)).click();
  browser.sleep(3000);
  //Verify the Copy Rights text is in English in Forgot Password Page
  expect(fpage.getText()).toEqual("Ⓒ Ericsson AB, 2015-2018"+testdata10);
  break;

  case "US":

  //Verify the Copy right in Login Page
  expect(lpage.getText()).toEqual("Ⓒ Ericsson AB, 2015-2018" +testdata10);
  //click on signup button
  element(by.xpath(testdata3.LoginPage.SignUpLink)).click();
  browser.sleep(3000);
  //Verify the Copy Rights in New Account Sign Up Page
  expect(lpage.getText()).toEqual("Ⓒ Ericsson AB, 2015-2018"+testdata10);
  //Click on Cancel Button
  element(by.xpath(testdata3.SignUpPage.CancelButton)).click();
  //Click on Forgot Passord link
  element(by.xpath(testdata3.LoginPage.ForgotPassword_Link)).click();
  browser.sleep(3000);
  //Verify the Copy Rights text is in English in Forgot Password Page
  expect(lpage.getText()).toEqual("Ⓒ Ericsson AB, 2015-2018"+testdata10);

  break;
  }
  // return today;
  }

  copyRightsValidate(testdata5);

  browser.get(testdata4.URL);
  browser.sleep(5000);
  
  // element(by.css(testdata6)).click();
  // browser.sleep(5000);

  // //Login to Metraview with Corporate Account(not subscribed to any PO) 
  // element(by.xpath(testdata3.LoginPage.UserName)).sendKeys(testdata4.userName);
  // element(by.xpath(testdata3.LoginPage.Password)).sendKeys(testdata4.passwordField);
  // browser.findElement(By.xpath(testdata3.LoginPage.LogInButton)).click();
  // browser.sleep(12000);

});

});