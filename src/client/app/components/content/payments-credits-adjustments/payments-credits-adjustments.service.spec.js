describe('paymentsCreditsAdjustmentsService', function() {
  var expect = chai.expect,
    paymentsCreditsAdjustmentsService,
    $httpBackend,
    $location,
    paymentMethodResponse = mockData.payment().paymentMethods,
    authData = mockData.authentication().userInfo,
    currencyJsonResponse = mockData.currency().JSON;

  beforeEach(function() {
    module('app.payments-credits-adjustments');
  });

  beforeEach(inject(function(
    _paymentsCreditsAdjustmentsService_,
    _$location_,
    _$httpBackend_,
    _utilityService_,
    _localStorageService_) {

    paymentsCreditsAdjustmentsService = _paymentsCreditsAdjustmentsService_;
    $httpBackend = _$httpBackend_;
    utilityService = _utilityService_;
    localStorageService = _localStorageService_;

    sandbox = sinon.sandbox.create();
    sandbox.stub(localStorageService, 'get', function() {
      return authData;
    });

    sandbox1 = sinon.sandbox.create();
    sandbox1.stub(utilityService, 'getNameSpace', function () {
      return 'mt';
    });

  }));

  afterEach(function() {
    sandbox.restore();
    sandbox1.restore();
    // $httpBackend.verifyNoOutstandingRequest();
    // $httpBackend.verifyNoOutstandingExpectation();
  });

  it('paymentsCreditsAdjustmentsService should be defined', function() {
    expect(paymentsCreditsAdjustmentsService).to.exist;
  });

  it('should call getPayCreditAdjust', function() {

    $httpBackend
      .when('GET', 'api/billing/invoiceReport/12345/78910?inlineVatTaxes=true&lang=us&namespace=mt&invoicenumber=98765&userType=payer&ecbarStatus=0')
      .respond(paymentMethodResponse);

    $httpBackend.expectGET('/static/default/i18n/common/locale-en.json')
      .respond({});

    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
      .respond({});

    $httpBackend.when('GET', 'app/core/404.html')
      .respond({});

    paymentsCreditsAdjustmentsService.getPayCreditAdjust('78910', '12345')
      .then(function(res) {
        // res can be compared here
      });

    $httpBackend.flush();
  });

  it('paymentsCreditsAdjustmentsService should reject getPayCreditAdjust', function () {

    $httpBackend
      .when('GET', 'api/billing/invoiceReport/12345/78910?inlineVatTaxes=true&lang=us&namespace=mt&invoicenumber=98765&userType=payer&ecbarStatus=0')
      .respond(400);

    $httpBackend.expectGET('/static/default/i18n/common/locale-en.json')
      .respond({});

    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
      .respond({});

    $httpBackend.when('GET', 'app/core/404.html')
      .respond({});

    paymentsCreditsAdjustmentsService.getPayCreditAdjust('78910', '12345')
      .then(function(res) {
        // res can be compared here
      });

    $httpBackend.flush();
  });

  /* it('paymentsCreditsAdjustmentsService should call getCurrencyJson', function () {

    $httpBackend.expectGET('/static/default/i18n/common/locale-en.json')
      .respond({});

    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
      .respond({});

    $httpBackend.when('GET', 'app/core/404.html')
      .respond({});

    paymentsCreditsAdjustmentsService.getCurrencyJson().then(function(res) {
      //res can be compared here
    });

    $httpBackend.flush();
  });

  it('should reject getCurrencyJson', function() {

    $httpBackend.expectGET('/static/default/i18n/common/locale-en.json')
      .respond({});

    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
      .respond({});

    $httpBackend.when('GET', 'app/core/404.html')
      .respond({});

    paymentsCreditsAdjustmentsService.getCurrencyJson().then(function(res) {
      //res can be compared here
    });

    $httpBackend.flush();
  }); */

  it('paymentsCreditsAdjustmentsService should call exportPostBillAdjustments', function () {

    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
      .respond({});
    
    paymentsCreditsAdjustmentsService.exportPostBillAdjustments('123', '345').then(function(paymentMethodResponse) {
      // res can be compared here
    });
    $httpBackend.flush();
  });
});
