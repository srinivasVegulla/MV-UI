describe('totalBillAmountController', function() {
  var expect = chai.expect,
    totalBillAmountController,
    $rootScope,
    $controller,
    $scope,
    totalBillAmountService,
    accountService,
    logger,
    localStorageService,
    utilityService,
    gettotalBillAmount,
    totalBillAmountResponse = mockData.billAmount().amount,
    langData = mockData.localStorageData().i18n,
    siteSettingsResponse = mockData.localStorageData().settings,
    createController;

  beforeEach(function() {
    module('app.total-bill-amount');
  });

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _totalBillAmountService_,
    _accountService_,
    _logger_,
    _localStorageService_,
    _utilityService_) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    totalBillAmountService = _totalBillAmountService_;
    accountService = _accountService_;
    logger = _logger_;
    localStorageService = _localStorageService_;
    utilityService = _utilityService_;

    gettotalBillAmount = sinon.stub(totalBillAmountService, 'gettotalBillAmount');

    sandbox = sinon.sandbox.create();
    sandbox.stub(localStorageService, 'get', function () {
      return langData;
    });
    sandbox1 = sinon.sandbox.create();
    sandbox1.stub(utilityService, 'getNameSpace', function () {
      return siteSettingsResponse;
    });
    sandbox2 = sinon.sandbox.create();
    sandbox2.stub(utilityService, 'getOrSetSelectedTimeInterVal', function () {
      return {
        idInterval: 123
      };
    });
    createController = function() {
      return $controller('totalBillAmountController', {
        '$scope': $scope
      });
    };

  }));

  afterEach(function() {
    sinon.restore(totalBillAmountService.gettotalBillAmount);
    sandbox.restore();
    sandbox1.restore();
    sandbox2.restore();
  });

  it('should be defined', function() {
    totalBillAmountController = createController();
    expect(totalBillAmountController).to.exist;
  });

  it('should call initiateWidgetService', function() {
    totalBillAmountController = createController();
    gettotalBillAmount.returnsPromise().resolves(totalBillAmountResponse);
    totalBillAmountController.initiateWidgetService();
  });
  it('should call initiateWidgetService with no invoice number', function() {
    totalBillAmountController = createController();
    totalBillAmountController.invoiceNumber = null;
    gettotalBillAmount.returnsPromise().resolves(null);
    totalBillAmountController.initiateWidgetService();
  });

  it('should reject gettotalBillAmount', function() {
    totalBillAmountController = createController();
    gettotalBillAmount.returnsPromise().rejects({status: 404});
    totalBillAmountController.gettotalBillAmount();
  });

   it('should be defined', function () {
     totalBillAmountController = createController();
     totalBillAmountController.getCurrencySign();
   });

    it('should be defined', function () {
      totalBillAmountController = createController();
      totalBillAmountController.currencyFormatter();
    });

});
