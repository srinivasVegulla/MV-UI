describe('filterService', function() {
  var expect = chai.expect,
    filterService,
    $httpBackend,
    intervalsResponse = mockData.account().intervals,
    authData = mockData.authentication().userInfo;

  beforeEach(function() {
    module('app.filter');
  });

  beforeEach(inject(function(
    _filterService_,
    _logger_,
    _localStorageService_,
    _$httpBackend_) {

    filterService = _filterService_;
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

    $httpBackend
      .when('GET', 'api/downloadReports/download/12345/67890?fileName=invoiceFileName')
      .respond(intervalsResponse);

  }));

  afterEach(function() {
    sandbox.restore();
    // $httpBackend.verifyNoOutstandingRequest();
    // $httpBackend.verifyNoOutstandingExpectation();
  });

  it('filterService should be defined', function() {
    expect(filterService).to.exist;
  });

  it('should call getFilter', function() {
    $httpBackend
      .when('GET', 'api/billing/accountInterval/123456?lang=us')
      .respond(intervalsResponse);

    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
      .respond(intervalsResponse);

    filterService.getFilter('123456').then(function(res) {
      // console.log(res);
    });

    $httpBackend.flush();
  });

});
