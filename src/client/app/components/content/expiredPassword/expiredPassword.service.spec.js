describe('expiredPasswordService', function() {
  var expect = chai.expect,
    expiredPasswordService,
    $httpBackend,
    accountInfo = mockData.account().accountInfo;

  beforeEach(function() {
    module('app.expiredPassword');
  });

  beforeEach(inject(function(
    _expiredPasswordService_,
    _logger_,
    _$httpBackend_) {

    expiredPasswordService = _expiredPasswordService_;
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
      .when('GET', 'api/downloadReports/12345/67890?lang=us')
      .respond({});

    $httpBackend
      .when('PUT', 'api/registration/changePassword')
      .respond({});

  }));

  afterEach(function() {
    sandbox.restore();
    // $httpBackend.verifyNoOutstandingRequest();
    // $httpBackend.verifyNoOutstandingExpectation();
  });

  it('expiredPasswordService should be defined', function() {
    expect(expiredPasswordService).to.exist;
  });

  it('should call getInvoices', function() {
    $httpBackend.expectGET('/static/default/i18n/expiredPassword/locale-en.json')
      .respond({});
    expiredPasswordService.updatePassword({}).then(function(res) {
      // console.log(res);
    });

    $httpBackend.flush();
  });

});
