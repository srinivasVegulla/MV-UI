describe('systemBarService', function() {
  var expect = chai.expect,
    systemBarService,
    logger,
    $httpBackend,
    siteSettingsResponse = mockData.settings().settings;

  beforeEach(function() {
    module('app.layout');
  });

  beforeEach(inject(function(
    _systemBarService_,
    _logger_,
    _$httpBackend_) {

    systemBarService = _systemBarService_;
    $httpBackend = _$httpBackend_;
    logger = _logger_;

    $httpBackend
      .when('GET', '/static/default/i18n/common/locale-en.json')
      .respond({});

    $httpBackend
    .when('GET', '/static/default/i18n/security/locale-en.json')
    .respond({});

    $httpBackend.expectGET('/static/default/i18n/resetPassword/locale-en.json')
    .respond({});

    $httpBackend.expectGET('/static/default/i18n/changePassword/locale-en.json')
    .respond({});

    $httpBackend
      .when('GET', 'app/core/404.html')
      .respond({});
    $httpBackend
      .when('GET', 'api/sitebillsetting/sitesetting/1234567', authData)
      .respond(siteSettingsResponse);

  }));

  afterEach(function() {
    sandbox.restore();
  });

  it('systemBarService should be defined', function() {
    expect(systemBarService).to.exist;
  });

  it('should call getSiteSettings', function() {

    $httpBackend
      .when('GET', 'api/sitebillsetting/sitesetting/1234567')
      .respond(siteSettingsResponse);
    systemBarService.getSiteSettings('1234567').then(function(res) {
      // res can be compared heer
    });

    $httpBackend.flush();
  });

  it('should reject getSiteSettings', function() {

    $httpBackend
      .when('GET', 'api/sitebillsetting/sitesetting/1234567')
      .respond(400);
    systemBarService.getSiteSettings('1234567').then(function(res) {
      logger.log('Error retrieving siteSettings.');
    });

    $httpBackend.flush();
  });
});
