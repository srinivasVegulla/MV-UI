describe('accountSettingsController', function() {
  var expect = chai.expect,
    accountSettingsController,
    accountSettingsService,
    paymentSetupModalService,
    accountSecurityModalService,
    paperInvoiceModalService,
    paymentSetup,
    securitySettings,
    invoiceMethod,
    filter,
    localStorageService,
    createController;

  beforeEach(function() {
    module('app.accountSettings');
  });

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _accountSettingsService_,
    _paymentSetupModalService_,
    _accountSecurityModalService_,
    _paperInvoiceModalService_,
    _$filter_,
    _localStorageService_) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    accountSettingsService = _accountSettingsService_;
    paymentSetupModalService = _paymentSetupModalService_;
    accountSecurityModalService = _accountSecurityModalService_;
    paperInvoiceModalService = _paperInvoiceModalService_;
    filter = _$filter_;
    localStorageService = _localStorageService_;

     paymentSetup = sinon.stub(paymentSetupModalService, 'open');

    //securitySettings = sinon.stub(accountSecurityModalService, 'getSecuritySettings');

    invoiceMethod = sinon.stub(paperInvoiceModalService, 'getInvoiceMethods'); 

    createController = function() {
      return $controller('accountSettingsController', {
        '$scope': $scope
      });
    }

  }));

   afterEach(function() {
   // sinon.restore(accountSettingsService.getUserTimeZone);
    sinon.restore(accountSecurityModalService.getPayment);
   // sinon.restore(paymentSetupModalService.getSecuritySettings);
    sinon.restore(paperInvoiceModalService.getInvoiceMethod);
  });

  it('accountSettingsController should be defined', function() {
    accountSettingsController = createController();
    expect(accountSettingsController).to.exist;
  });

  it('accountSettingsController should be activate', function () {
     accountSettingsController = createController();
    accountSettingsController.activate();
   });

   it('accountSettingsController should be paymentSetup', function () {
     accountSettingsController = createController();
    accountSettingsController.paymentSetup();
   });

   it('accountSettingsController should be securitySettings', function () {
     accountSettingsController = createController();
     accountSettingsController.securitySettings();
   });

   it('accountSettingsController should be invoiceMethod', function () {
     accountSettingsController = createController();
     accountSettingsController.invoiceMethod();
   });

  /* it('accountSettingsController should call getUserTimeZone', function () {
    accountSettingsController = createController();
    accountSettingsController.getUserTimeZone('123456');
  });   */

});
