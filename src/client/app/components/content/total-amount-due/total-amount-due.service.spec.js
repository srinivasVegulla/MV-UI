describe('amountDueService', function() {
  var expect = chai.expect,
    amountDueService,
    $httpBackend,
    duePaymentResponse = mockData.billAmount().duePayment,
    langData = mockData.localStorageData(),
    utilityService,
    currencyJsonResponse = mockData.currency().JSON,
    paymentsHistory = mockData.billAmount().paymentsHistory;

  beforeEach(function() {
    module('app.total-amount-due');
  });

  beforeEach(inject(function(
    _amountDueService_,
    _logger_,
    _localStorageService_,
    _utilityService_,
    _$httpBackend_) {

    amountDueService = _amountDueService_;
    localStorageService = _localStorageService_;
    utilityService = _utilityService_;
    $httpBackend = _$httpBackend_;

    sandbox = sinon.sandbox.create();
    sandbox.stub(localStorageService, 'get', function() {
      return langData;
    });

    sandbox1 = sinon.sandbox.create();
    sandbox1.stub(utilityService, 'getNameSpace', function () {
      return 'mt';
    });

    $httpBackend
      .when('GET', '/static/default/i18n/security/locale-en.json')
      .respond(duePaymentResponse);

    $httpBackend
      .when('POST', '/static/default/i18n/security/locale-en.json')
      .respond(duePaymentResponse);

    $httpBackend
      .when('GET', '/static/default/i18n/common/locale-en.json')
      .respond(duePaymentResponse);

    $httpBackend
      .when('GET', '/static/default/i18n/resetPassword/locale-en.json')
      .respond({});

    $httpBackend
      .when('GET', 'app/core/404.html')
      .respond(duePaymentResponse);

    $httpBackend
      .when('GET', 'api/billing/paymentinfo/123456?lang=us&ecbarStatus=0&namespace=mt')
      .respond(duePaymentResponse);

    $httpBackend
      .when('POST', 'api/paymentmethods/makepayment')
      .respond({});

    $httpBackend
      .when('GET', 'api/paymentmethods/paymenthistory/123456?lang=us&intervalid=12345678')
      .respond(duePaymentResponse);

      $httpBackend
        .when('GET', 'api/paymentmethods/ecbARPayments/GetOpenInvoices/123456?namespace=mt')
        .respond(duePaymentResponse);
  }));

  afterEach(function() {
    sandbox.restore();
    sandbox1.restore();
    // $httpBackend.verifyNoOutstandingRequest();
    // $httpBackend.verifyNoOutstandingExpectation();
  });

  it('amountDueService should be defined', function() {
    expect(amountDueService).to.exist;
  });

  it('amountDueService should resolve getDuePayment', function () {

    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
      .respond(duePaymentResponse);
   var params = '?lang=us&ecbarStatus=0&namespace=mt';
    amountDueService.getDuePayment('123456').then(function(res) {
      expect(res).to.be.defined;
    });

    $httpBackend.flush();
  });

  /* it('amountDueService should resolve getCurrency', function () {

    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
      .respond(duePaymentResponse);

    amountDueService.getCurrency().then(function(res) {
      expect(res).to.be.defined;
    });

    $httpBackend.flush();
  }); */

  it('amountDueService should resolve getPayment', function () {
    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
      .respond(duePaymentResponse);

    amountDueService.getPayment('123456', '798', '101112', '22121891').then(function(res) {
      expect(res).to.be.defined;
    });

    $httpBackend.flush();
  });

  it('amountDueService should resolve getPaymentStatus', function () {
    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
      .respond(duePaymentResponse);

    amountDueService.getPaymentStatus('123456', '22121891').then(function(res) {
      expect(res).to.be.defined;
    });

    $httpBackend.flush();
  });

  it('amountDueService should resolve getInvoices', function () {
    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
      .respond(duePaymentResponse);

    amountDueService.getInvoices('123456').then(function (res) {
      expect(res).to.be.defined;
    });

    $httpBackend.flush();
  });



});
