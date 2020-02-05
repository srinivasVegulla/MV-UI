describe('paymentSetupModalService', function() {
  var expect = chai.expect,
    paymentSetupModalService,
    $aside,
    logger,
    $uibModal,
    localStorageService,
    utilityService,
    $httpBackend;

  beforeEach(function() {
    module('app.layout.payment-setup');
  });

  beforeEach(inject(function(
    _paymentSetupModalService_,
    _$aside_,
    _$httpBackend_,
    _logger_,
    _$uibModal_,
    _localStorageService_,
    _utilityService_) {

    paymentSetupModalService = _paymentSetupModalService_;
    $aside = _$aside_;
    $httpBackend = _$httpBackend_;
    logger = _logger_;
    $uibModal = _$uibModal_;
    localStorageService = _localStorageService_;
    utilityService = _utilityService_;


    $httpBackend
      .when('GET', '/static/default/i18n/security/locale-en.json')
      .respond({});

    $httpBackend
      .when('GET', '/static/default/i18n/common/locale-en.json')
      .respond({});

    $httpBackend
      .when('GET', 'app/core/404.html')
      .respond({});

  }));

  it('paymentSetupModalService should be defined', function() {
    expect(paymentSetupModalService).to.exist;
  });

  it('should call open', function() {
    paymentSetupModalService.open('123456', '7891011');
  });

  it('should call update', function() {
    $httpBackend
      .when('PUT', 'api/paymentmethods/updateautopay/123456?lang=us&namespace=mt')
      .respond({ data: 'data' });

    $httpBackend
      .expectGET('/static/default/i18n/common/locale-en.json')
      .respond({});

    paymentSetupModalService.update('123456', '7891011', '').then(function(res) {
      // console.log(res);
    });

    $httpBackend.flush();
  });

  it('should call getAutoPay', function() {

    $httpBackend
      .when('GET', 'api/paymentmethods/autopaystatus/123456?lang=us&namespace=mt')
      .respond({ data: 'data' });

    $httpBackend
      .expectGET('/static/default/i18n/common/locale-en.json')
      .respond({});

    paymentSetupModalService.getAutoPay('123456').then(function(res) {
      // console.log(res);
    });

    $httpBackend.flush();
  });

});
