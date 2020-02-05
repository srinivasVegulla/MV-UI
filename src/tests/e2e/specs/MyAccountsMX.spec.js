var testData3 = require('../inputs/testData/XpathRepository.json');
describe('UI Baseline App', function() {
    it('Validate my account page in MX',function() {
    //MVIEW-2904-Errors are displayed, data not visible, drop-downs not expanding under widgets.across pages
    //validation of fourth child
    element(by.xpath(testData3.LayerSelector.Dropdown)).click();
    element(by.xpath(testData3.LayerSelector.MyAccount)).click();
    //verify automatic pay off is present
    expect(element(by.xpath("//div[@ng-if='vm.autoPayoff']")).isDisplayed()).toBe(true);
    browser.sleep(2000);
    //verify whether subscription content is present or not 
    expect(element(by.xpath("//div[@class='list-content ecb-subscriptionCard ecb-cardBorder pull-left col-md-12 col-sm-12 col-xs-12']")).isDisplayed()).toBe(true);
    //verify automatic payoff
    element(by.xpath("//div[@ng-if='vm.autoPayoff']/button")).click();
    browser.sleep(2000);
    //verify the presence of dropdown
    expect(element(by.css('.dropdown')).isDisplayed()).toBe(true);
    element(by.xpath("//button[@ng-click = 'vm.cancel()']")).click();
    //verify paper invoice type
    element(by.xpath("//button[@ng-click='vm.invoiceMethod(vm.accountId)']")).click();
    //verify dropdown presence
    expect(element(by.xpath("//span[@class='dropdown-text pull-left']")).isDisplayed()).toBe(true);
    element(by.xpath("//button[@ng-click = 'vm.cancel()']")).click();
    //verify account security settings
    element(by.xpath("//button[@ng-click='vm.securitySettings(vm.accountId)']")).click();
    browser.sleep(2000);
    //verify dropdown icon
    expect(element(by.xpath("//button[@id='dropdownMenu2']")).isDisplayed()).toBe(true);
    element(by.xpath("//button[@ng-click = 'vm.cancel()']")).click();




    });
});