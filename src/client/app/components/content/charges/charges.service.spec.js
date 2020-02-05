describe('chargesService', function() {
  var expect = chai.expect,
    chargesService,
    $httpBackend,
    utilityService,
    localStorageService,
    productReportUrlParams = '?inlineAdj=T&inlineVat=F&lang=us&reportView=ONLINEBILL&secondPass=true&invoicenumber=0&ondemandinterval=true&intervalid=1&userType=a&namespace=m',
    productReportUrl = 'api/billing/productreport/56789'+productReportUrlParams,
    nonStandardChargesUrl = 'api/billing/nonstandardcharges/56789/12345',
    preBillAdjustmentsUrl = 'api/billing/12345/45879/adjustmentdetails?lang=us&isPostbill=false&accountslice=payer/56789',
    miscUrlEcb = 'api/billing/miscadjustments/123',
    settingsResponse = mockData.settings().settings,
    reportResponse = mockData.billing().reportData,
    nonStandardChargesResponse = mockData.nonStandardCharges(),
    preBillAdjustmentsResponse = mockData.adjustmentDetails();
    langData = mockData.localStorageData(),
    authData = mockData.authentication().userInfo;

  beforeEach(function() {
    module('app.charges');
  });

  beforeEach(inject(function(
    _chargesService_,
    _logger_,
    _$httpBackend_,
    _utilityService_,
    _localStorageService_){

    chargesService = _chargesService_;
    $httpBackend = _$httpBackend_;
    localStorageService = _localStorageService_;
    utilityService = _utilityService_;

    sandbox = sinon.sandbox.create();
    sandbox.stub(localStorageService, 'get', function() {
      return langData;
    });

    $httpBackend
      .when('GET', '/static/default/i18n/security/locale-en.json')
      .respond(reportResponse);

    $httpBackend
      .when('GET', 'app/core/404.html')
      .respond(reportResponse);

    $httpBackend
      .when('GET', 'api/billing/nonstandardcharges/56789/12345')
      .respond(nonStandardChargesResponse);

    $httpBackend
      .when('GET', 'api/billing/12345/45879/adjustmentdetails?lang=us&isPostbill=false&accountslice=payer/56789')
      .respond(preBillAdjustmentsResponse);

  }));

  afterEach(function() {
    sandbox.restore();
    // $httpBackend.verifyNoOutstandingRequest();
    // $httpBackend.verifyNoOutstandingExpectation();
  });

  it('chargesService should be defined', function() {
    expect(chargesService).to.exist;
  });

  it('should call settings', function() {

    $httpBackend
      .when('GET', 'api/sitebillsetting/billsetting/1234234')
      .respond(settingsResponse);

    $httpBackend
      .expectGET('/static/default/i18n/common/locale-en.json')
      .respond(reportResponse);

    // $httpBackend
    //   .expectGET('api/sitebillsetting/billsetting/1234234')
    //   .respond(settingsResponse);

    chargesService.getSettings('1234234').then(function(res) {
      // response needs to be compared here
    });

    $httpBackend.flush();
  });

  it('should reject settings', function() {

    $httpBackend
      .when('GET', 'api/sitebillsetting/billsetting/1234234')
      .respond(400);

    $httpBackend
      .expectGET('/static/default/i18n/common/locale-en.json')
      .respond(reportResponse);

    // $httpBackend
    //   .expectGET('api/sitebillsetting/billsetting/1234234')
    //   .respond(settingsResponse);

    chargesService.getSettings('1234234').then(function(res) {
      // console.log(res);
    });

    $httpBackend.flush();
  });

  it('should call productreport', function() {

    $httpBackend
      .when('GET', productReportUrl)
      .respond(reportResponse);

    $httpBackend
      .expectGET('/static/default/i18n/common/locale-en.json')
      .respond({});

    chargesService.getReport('12345', '56789', 'T', 'F').then(function(res) {
      // console.log(res);
    });

    $httpBackend.flush();
  });

  it('should reject productreport', function() {

    $httpBackend
      .when('GET', productReportUrl)
      .respond(400);

    $httpBackend
      .expectGET('/static/default/i18n/common/locale-en.json')
      .respond({});

    chargesService.getReport('12345', '56789', 'T', 'F').then(function(res) {
      // console.log(res);
    });

    $httpBackend.flush();
  });

  it('should call nonStandardCharges', function() {

    $httpBackend
      .when('GET', nonStandardChargesUrl)
      .respond(nonStandardChargesResponse);

    $httpBackend
      .expectGET('/static/default/i18n/common/locale-en.json')
      .respond({});
    chargesService.getNonStandardCharges('12345', '56789', '12/07/1987', '13/07/1987').then(function(res) {
      // console.log(res);
    });
    $httpBackend.flush();
  });

  it('should call exportPreBillAdjustments', function() {

    $httpBackend
      .when('GET', preBillAdjustmentsUrl)
      .respond(preBillAdjustmentsResponse);

    $httpBackend
      .expectGET('/static/default/i18n/common/locale-en.json')
      .respond({});
    
      chargesService.exportPreBillAdjustments('12345', '56789').then(function(res) {
        // console.log(res);
      });
      

    $httpBackend.flush();
  });

  it('should call getMiscAdjustDetails', function() {

    $httpBackend
      .when('GET', miscUrlEcb)
      .respond({});

    $httpBackend
      .expectGET('/static/default/i18n/common/locale-en.json')
      .respond({});
    
      chargesService.getMiscAdjustDetails('12345', '12/07/1987', '13/07/1987', '56789').then(function(res) {
        // console.log(res);
      });
      

    $httpBackend.flush();
  });

});
