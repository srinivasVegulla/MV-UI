describe('paymentsReceivedModalController', function () {
  var expect = chai.expect,
    paymentsReceivedModalController,
    $rootScope,
    $controller,
    $scope,
    createController,
    logger,
    paymentsReceivedModalService,
    moment,
    getPayments,
    modalInstance = mockData.modalInstance(),
    utilityService,
    langData = mockData.localStorageData(),
    siteSettingsResponse = mockData.localStorageData().settings,
    //authData = mockData.authentication().userInfo,
    invoiceReportResponse = mockData.invoice().invoiceReport,
    currencyJsonResponse = mockData.currency().JSON;

  beforeEach(function () {
    module('app.payments-credits-adjustments');
  });

  beforeEach(inject(function (
    _$rootScope_,
    _$controller_,
    _logger_,
    _paymentsReceivedModalService_,
    _localStorageService_,
    _$moment_,
    _dateFilter_,
    _utilityService_) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    logger = _logger_;
    paymentsReceivedModalService = _paymentsReceivedModalService_;
    moment = _$moment_;
    utilityService = _utilityService_;

    sandbox = sinon.sandbox.create();
    sandbox.stub(localStorageService, 'get', function () {
      return langData;
    });
    sandbox1 = sinon.sandbox.create();
    sandbox1.stub(utilityService, 'getNameSpace', function () {
      return siteSettingsResponse;
    });

    //getPayments = sinon.stub(paymentsReceivedModalService, 'getPayments');

    createController = function () {
      return $controller('paymentsReceivedModalController', {
        '$scope': $scope,
        'accountId': 12345,
        '$uibModalInstance' : modalInstance
      });
    }
  }));

  afterEach(function () {
    sandbox.restore();
    sandbox1.restore();
    //getPayments.restore();
  });

  it('paymentsReceivedModalController should be defined', function () {
    paymentsReceivedModalController = createController();
    expect(paymentsReceivedModalController).to.exist;
  });

  it('paymentsReceivedModalController should call closepaymentsReceived method', function () {
    paymentsReceivedModalController = createController();
    paymentsReceivedModalController.closepaymentsReceived();
  });

  it('paymentsReceivedModalController should call getDateFormatByLang', function () {
    paymentsReceivedModalController = createController();
    paymentsReceivedModalController.getDateFormatByLang ();
  });
  /*it('paymentsReceivedModalController should success getPayments', function () {
    paymentsReceivedModalController = createController();
    getPayments.returnsPromise().resolves({"payments": [{"id": 1}]});
    paymentsReceivedModalController.getPayments();
  });
  it('paymentsReceivedModalController should reject getPayments', function () {
    paymentsReceivedModalController = createController();
    getPayments.returnsPromise().rejects({});
    paymentsReceivedModalController.getPayments();
  });*/
  it('paymentsReceivedModalController should call getCurrencySign', function () {
    paymentsReceivedModalController = createController();
    paymentsReceivedModalController.getCurrencySign('USD');
  }); 
  it('paymentsReceivedModalController should call currencyFormatter', function () {
    paymentsReceivedModalController = createController();
    paymentsReceivedModalController.currencyFormatter(10, 'USD', false);
  });
});
