describe('accountSettingsService', function() {
  var expect = chai.expect,
    accountSettingsService,
    logger,
    $httpBackend,
    utilityService,
    accountsecurityResponse = mockData.securitySettings().data,
    accountInfo = mockData.account().accountInfo,
    langData = mockData.localStorageData();

  beforeEach(function() {
    module('app.accountSettings');
  });

  beforeEach(inject(function(
    _accountSettingsService_,
    _logger_,
    _$httpBackend_,
    _utilityService_,
    _localStorageService_) {

    accountSettingsService = _accountSettingsService_;
    logger = _logger_;
    $httpBackend = _$httpBackend_;
    utilityService = _utilityService_,
    localStorageService = _localStorageService_;
    
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
    // $httpBackend.verifyNoOutstandingRequest();
    // $httpBackend.verifyNoOutstandingExpectation();
  });

  it('accountSettingsService should be defined', function() {
    expect(accountSettingsService).to.exist;
  });

  it('should call getUserTimeZone', function() {

    $httpBackend
      .when('GET', 'api/accounts/regionalsetting/123456?namespace=mt')
      .respond(accountsecurityResponse);

    $httpBackend
      .expectGET('/static/default/i18n/common/locale-en.json')
      .respond({});

    accountSettingsService.getUserTimeZone('123456').then(function(res) {
        // res can be compared here
      });

    $httpBackend.flush();
  });

});
