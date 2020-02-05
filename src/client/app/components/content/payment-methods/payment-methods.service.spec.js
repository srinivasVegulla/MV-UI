describe('paymentMethodsService', function() {
  var expect = chai.expect,
    paymentMethodsService,
    $httpBackend,
    $location,
    localStorageService,
    paymentMethodResponse = mockData.payment().paymentMethods,
    langData = mockData.localStorageData();

  beforeEach(function() {
    module('app.payment-methods');
  });

  beforeEach(inject(function(
    _paymentMethodsService_,
    _logger_,
    _$location_,
    _$httpBackend_,
    _localStorageService_) {

    paymentMethodsService = _paymentMethodsService_;
    $httpBackend = _$httpBackend_;
    localStorageService = _localStorageService_;


    sandbox = sinon.sandbox.create();
    sandbox.stub(localStorageService, 'get', function() {
      return langData;
    });

    $httpBackend
      .when('GET', 'api/paymentmethods/12345?lang=us&namespace=mt')
      .respond(paymentMethodResponse);
    $httpBackend
      .when('POST', 'api/paymentmethods/createcybersourceform')
      .respond(paymentMethodResponse);
    $httpBackend
      .when('POST', 'api/paymentmethods/createcybersourceformforupdate')
      .respond(paymentMethodResponse);
    $httpBackend
      .when('POST', 'api/paymentmethods/deletepaymentmethod/12345')
      .respond(paymentMethodResponse);

  }));

  afterEach(function() {
    sandbox.restore();
    // $httpBackend.verifyNoOutstandingRequest();
    // $httpBackend.verifyNoOutstandingExpectation();
  });

  it('paymentMethodsService should be defined', function() {
    expect(paymentMethodsService).to.exist;
  });

  it('should call getPayment', function() {

    $httpBackend.expectGET('/static/default/i18n/common/locale-en.json')
      .respond(paymentMethodResponse);

    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
      .respond(paymentMethodResponse);

    $httpBackend.when('GET', 'app/core/404.html')
      .respond(paymentMethodResponse);

    paymentMethodsService.getPayment('12345').then(function(res) {
      //console.log(res);
    });

    $httpBackend.flush();
  });

  it('should call getCredit', function() {

    $httpBackend.expectGET('/static/default/i18n/common/locale-en.json')
      .respond(paymentMethodResponse);

    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
      .respond(paymentMethodResponse);

    $httpBackend.when('GET', 'app/core/404.html')
      .respond(paymentMethodResponse);

    paymentMethodsService.getCredit('12345', 'usd').then(function(res) {
      //console.log(res);
    });

    $httpBackend.flush();
  });

  it('should call getUpdate', function() {

    $httpBackend.expectGET('/static/default/i18n/common/locale-en.json')
      .respond(paymentMethodResponse);

    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
      .respond(paymentMethodResponse);

    $httpBackend.when('GET', 'app/core/404.html')
      .respond(paymentMethodResponse);

    paymentMethodsService.getUpdate('12345', 'usd', '123456').then(function(res) {
      //console.log(res);
    });

    $httpBackend.flush();
  });

  it('should call getDelete', function() {

    $httpBackend.expectGET('/static/default/i18n/common/locale-en.json')
      .respond(paymentMethodResponse);

    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
      .respond(paymentMethodResponse);

    $httpBackend.when('GET', 'app/core/404.html')
      .respond(paymentMethodResponse);

    paymentMethodsService.getDelete('12345', '123456').then(function(res) {
      //console.log(res);
    });

    $httpBackend.flush();
  });

  it('should call getOneTimePayment', function() {

    $httpBackend.expectGET('/static/default/i18n/common/locale-en.json')
      .respond(paymentMethodResponse);

    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
      .respond(paymentMethodResponse);

    $httpBackend.when('GET', 'app/core/404.html')
      .respond(paymentMethodResponse);

    paymentMethodsService.getOneTimePayment('12345', 'USD', '10', '12/4/16').then(function(res) {
    });

    $httpBackend.flush();
  });
});
