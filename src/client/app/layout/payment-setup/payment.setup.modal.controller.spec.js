describe('paymentSetupModalController', function() {
  var expect = chai.expect,
    paymentSetupModalController,
    $rootScope,
    $controller,
    $scope,
    createController,
    modalInstance = mockData.modalInstance(),
    mockInterval = mockData.account().interval,
    paymentMethodsService,
    getPayment,
    paymentMethodsResponse,
    getAutoPay,
    update,
    amountDueService,
    logger,
    translatorHelper,
    $state,
    $filter,
    localStorageService,
    utilityService,
    langData = mockData.localStorageData().i18n,
    siteSettingsResponse = mockData.localStorageData().settings,
    $translate,
    duePaymentResponse = mockData.billAmount().duePayment;

  beforeEach(function() {
    module('app.layout.payment-setup');
  });

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _paymentMethodsService_,
    _paymentSetupModalService_,
    _amountDueService_,
    _logger_,
    _translatorHelper_,
    _localStorageService_,
    _utilityService_,
    _$state_,
    _$filter_,
    _$translate_) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    paymentMethodsService = _paymentMethodsService_;
    paymentSetupModalService = _paymentSetupModalService_;
    amountDueService = _amountDueService_;
    logger = _logger_;
    translatorHelper = _translatorHelper_;
    localStorageService = _localStorageService_;
    utilityService = _utilityService_;
    $state = _$state_;
    $filter = _$filter_;
    $translate = _$translate_;

    getPayment = sinon.stub(paymentMethodsService, 'getPayment');
    getPayment.returnsPromise().resolves(paymentMethodsResponse);

    //getDuePayment = sinon.stub(amountDueService, 'getDuePayment');

    getAutoPay = sinon.stub(paymentSetupModalService, 'getAutoPay');
    getAutoPay.returnsPromise().resolves('ach');

    update = sinon.stub(paymentSetupModalService, 'update');
    update.returnsPromise().resolves({}); 

    sandbox = sinon.sandbox.create();
    sandbox.stub(localStorageService, 'get', function () {
      return langData;
    });
    sandbox1 = sinon.sandbox.create();
    sandbox1.stub(utilityService, 'getNameSpace', function () {
      return siteSettingsResponse;
    });

    createController = function() {
      return $controller('paymentSetupModalController', {
        '$scope': $scope,
        $uibModalInstance: modalInstance,
        accountId: '123456'
      });
    };

  }));

  afterEach(function() {
    sandbox.restore();
    sandbox1.restore();
    sinon.restore(paymentMethodsService.getPayment);
    sinon.restore(paymentSetupModalService.getAutoPay);
  });

  it('should call getDuePayment', function() {
    //getDuePayment.returnsPromise().resolves(duePaymentResponse);
    paymentSetupModalController = createController();
    $scope.$emit('$locationChangeSuccess');
  }); 

  it('paymentSetupModalController should be defined', function() {
    paymentSetupModalController = createController();
    expect(paymentSetupModalController).to.exist;
  });

  it('should call setSelected function', function() {
    paymentSetupModalController = createController();
    paymentSetupModalController.setSelected(mockInterval);
  });

  it('should call dropDownDisabled function', function() {
    paymentSetupModalController = createController();
    paymentSetupModalController.dropDownDisabled();
  });

  it('should call cancel function', function() {
    paymentSetupModalController.cancel();
  });

  it('should call save function', function() {
    paymentSetupModalController.save();
  });

  it('should call setPayType function', function() {
    paymentSetupModalController.setPayType('ach');
  });

});
