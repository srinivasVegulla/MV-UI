describe('paymentsReceivedModalService', function() {
  var expect = chai.expect,
    paymentsReceivedModalService,
    $httpBackend,
    $http,
    $aside,
    localStorageService,
    utilityService,
    langData = mockData.localStorageData().i18n;

  beforeEach(function() {
    module('app.payments-credits-adjustments');
  });

  beforeEach(inject(function(
    _paymentsReceivedModalService_,
    _$httpBackend_,
    _translatorHelper_,
    _$aside_,
    _localStorageService_,
    _utilityService_) {

    paymentsReceivedModalService = _paymentsReceivedModalService_;
    $httpBackend = _$httpBackend_;
    $aside = _$aside_;
    localStorageService = _localStorageService_;
    utilityService = _utilityService_;

    sandbox = sinon.sandbox.create();
    sandbox.stub(localStorageService, 'get', function () {
      return langData;
    });
    
    $httpBackend
      .when('GET', 'app/core/404.html')
      .respond({});

  }));

  afterEach(function() {
    sandbox.restore();
  });

  it('paymentsReceivedModalService should be defined', function() {
    expect(paymentsReceivedModalService).to.exist;
  });

  it('should call open', function() {
    paymentsReceivedModalService.open();
  });

  it('should call getPayments', function() {
    $httpBackend.expectGET('/static/default/i18n/common/locale-en.json')
    .respond({});
    $httpBackend
    .when('GET', 'api/paymentmethods/paymentdetails/123/123456?ecbarStatus=aa&lang=us&namespace=mt')
    .respond({'paymentdetails': {}});    
    paymentsReceivedModalService.getPayments('123', '123456')
    .then(function(res) {
      // res can be compared here
    });
    $httpBackend.flush();
  });

});
