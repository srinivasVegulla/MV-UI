describe('accountsManagerService', function() {
  var expect = chai.expect,
    accountsManagerService,
    logger,
    $httpBackend;
  beforeEach(function() {
    module('app.accountsManager');
  });

  beforeEach(inject(function(
    _accountsManagerService_,
    _$httpBackend_) {

    accountsManagerService = _accountsManagerService_;
    $httpBackend = _$httpBackend_;
    $httpBackend
    .when('GET', '/static/default/i18n/security/locale-en.json')
    .respond({});
    $httpBackend
      .when('GET', 'app/core/404.html')
      .respond({});
 
  }));

  afterEach(function() {
    sandbox.restore();
  });

  it('accountsManagerService should be defined', function() {
    expect(accountsManagerService).to.exist;
  });

  it('should call userCapabilities', function() {
    $httpBackend
    .when('GET', 'api/accounts/corppayer/capabilities?namespace=metraview')
    .respond({});
    $httpBackend.expectGET('/static/default/i18n/resetPassword/locale-en.json')
    .respond({});
    $httpBackend.expectGET('/static/default/i18n/changePassword/locale-en.json')
    .respond({});

    accountsManagerService.userCapabilities('1234567').then(function(res) {
      // res can be compared heer
    });

    $httpBackend.flush();
  });

  it('should call userAccountHierarchy', function() {
    $httpBackend
    .when('GET', 'api/accounts/123/managedaccounts?lang=us')
    .respond({});
    $httpBackend.expectGET('/static/default/i18n/resetPassword/locale-en.json')
    .respond({});
    $httpBackend.expectGET('/static/default/i18n/changePassword/locale-en.json')
    .respond({});

    accountsManagerService.userAccountHierarchy('1234567', 'us').then(function(res) {
      // res can be compared heer
    });

    $httpBackend.flush();
  });


});
