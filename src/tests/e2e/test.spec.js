/* jshint -W117, -W030 */
describe('UI Baseline App', function() {
  it('should have a title', function() {
    browser.get('http://localhost:3000/');
    expect(browser.getTitle()).toEqual('MetraTech Ericsson SPA UI: Welcome');
  });
});
