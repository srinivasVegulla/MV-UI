describe('userService', function() {
  var expect = chai.expect,
    userService,
    $httpBackend,
    localStorageService,
    langData = mockData.localStorageData(),
    siteSettingsResponse = mockData.settings().settings;

  beforeEach(function() {
    module('app.core');
  });

  beforeEach(inject(function(
    _userService_,
    _localStorageService_,
    _$httpBackend_) {

    userService = _userService_;
    localStorageService = _localStorageService_;
    $httpBackend = _$httpBackend_;

    sandbox = sinon.sandbox.create();
    sandbox.stub(localStorageService, 'get', function () {
      return langData;
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

  it('userService should be defined', function() {
    expect(userService).to.exist;
  });

  it('should call loadSiteSettings with namepsace', function() {

    $httpBackend
      .when('GET', 'api/metadata/sitesetting/mt')
      .respond(siteSettingsResponse);

    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
      .respond({});

    userService.loadSiteSettings('mt').then(function(res) {
      // res can be compared here
    });

  });

  it('should call getUserSettings', function() {

    $httpBackend
      .when('GET', 'api/metadata/sitesetting/')
      .respond(siteSettingsResponse);

    $httpBackend
      .expectGET('api/metadata/sitesetting/')
      .respond(siteSettingsResponse);

    userService.getUserSettings().then(function(res) {
      // res can be compared here
    });

  });

});
