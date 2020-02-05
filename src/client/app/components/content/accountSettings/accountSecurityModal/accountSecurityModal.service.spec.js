describe('accountSecurityModalService', function() {
  var expect = chai.expect,
    accountSecurityModalService,
    translatorHelper,
    $httpBackend,
    $uibModal,
    $aside,
    localStorageService,
    utilityService,
    langData = mockData.localStorageData(),
    accountsecurityResponse = mockData.securitySettings().data

  beforeEach(function() {
    module('app.accountSettings');
  });

  beforeEach(inject(function(
    _accountSecurityModalService_,
    _logger_,
    _$httpBackend_,
    _translatorHelper_,
    _$uibModal_,
    _$aside_,
    _localStorageService_,
    _utilityService_) {

    accountSecurityModalService = _accountSecurityModalService_;
    $httpBackend = _$httpBackend_;
    translatorHelper = _translatorHelper_;
    $uibModal = _$uibModal_;
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

  it('accountSecurityModalService should be defined', function() {
    expect(accountSecurityModalService).to.exist;
  });

  it('should call getSecurityQuestions', function() {
    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
    .respond({});
    $httpBackend
    .when('GET', 'api/accounts/accountsecurity/123456?lang=us&namespace=mt')
    .respond(accountsecurityResponse);    
    accountSecurityModalService.getSecurityQuestions('123456')
    .then(function(res) {
      // res can be compared here
    });
    $httpBackend.flush();
  });

  it('should call updateSecurityQuestion', function() {
    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
    .respond({});
    $httpBackend
    .when('PUT', 'api/accounts/accountsecurity/123456?lang=us&namespace=mt', accountsecurityResponse.SelectedQuestion)
    .respond(accountsecurityResponse);
    accountSecurityModalService.update(accountsecurityResponse.SelectedQuestion, '123')
      .then(function(res) {
        // res can be compared here
      });

    $httpBackend.flush();
  });

});
