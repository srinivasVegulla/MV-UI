describe('offerChargeService', function() {
  var expect = chai.expect,
    offerChargeService,
    $httpBackend,
    invoiceResponse = mockData.invoice().invoiceList,
    authData = mockData.authentication().userInfo,
    productReportUrlParams = '?intervalId=1234&inlineAdj=true&inlineVat=true&lang=us&reportView=ONLINEBILL&secondPass=true',
    exportDataUrlParams = '?lang=us&productslice=instance/327/425&accountslice=payer/123456',
    productReportResponse,
    exportDataResponse = mockData.billing().UsageDetails;

  beforeEach(function() {
    module('app.offer-charge-summary');
  });

  beforeEach(inject(function(
    _offerChargeService_,
    _logger_,
    _localStorageService_,
    _$httpBackend_) {


    offerChargeService = _offerChargeService_;
    localStorageService = _localStorageService_;
    $httpBackend = _$httpBackend_;

    sandbox = sinon.sandbox.create();
    sandbox.stub(localStorageService, 'get', function() {
      return authData;
    });

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

  afterEach(function() {
    sandbox.restore();
    // $httpBackend.verifyNoOutstandingRequest();
    // $httpBackend.verifyNoOutstandingExpectation();
  });

  it('offerChargeService should be defined', function() {
    expect(offerChargeService).to.exist;
  });

  it('should call userDetails', function() {

    $httpBackend
      .when('GET', 'api/billing/productreport/123456' + productReportUrlParams)
      .respond(productReportResponse);

    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
      .respond({});

    offerChargeService.userDetails('78910', '123456').then(function(res) {
      // res can be compared here
    });

    $httpBackend.flush();
  });

  it('should reject userDetails', function() {

    $httpBackend
      .when('GET', 'api/billing/productreport/123456' + productReportUrlParams)
      .respond(400);

    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
      .respond({});

    offerChargeService.userDetails('78910', '123456').then(function(res) {
      // res can be compared here
    });

    $httpBackend.flush();
  });

  it('should call exportCharges', function() {

    $httpBackend
      .when('GET', 'api/billing/productreport/123456/78910/usagedetails' + exportDataUrlParams)
      .respond(exportDataResponse);

    offerChargeService.exportCharges('78910', 327, 425, '123456').then(function(res) {
      // res can be compared here
    });

    $httpBackend.flush();

  });

  it('should reject exportChargeswith error status 400', function() {

    $httpBackend
      .when('GET', 'api/billing/productreport/123456/78910/usagedetails' + exportDataUrlParams)
      .respond(400);

    offerChargeService.exportCharges('78910', 327, 425, '123456').then(function(res) {
      // res can be compared here
    });

    $httpBackend.flush();

  });

  it('should call getProductViewDetails', function() {

    $httpBackend.expectGET('/static/default/i18n/productView/productViewLayouts/Compute.json?lang=us')
      .respond({});

    offerChargeService.productViewDetails('Compute').then(function(res) {
      // res can be compared here
    });

    $httpBackend.flush();

  });

  it('should call getXmlLocale', function() {

    $httpBackend.expectGET('/static/default/i18n/productView/localization/Compute_undefined.json')
      .respond({});

    offerChargeService.getXmlLocale('Compute').then(function(res) {
      // res can be compared here
    });

    $httpBackend.flush();

  });

});
