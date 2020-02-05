describe('countryService', function() {
  var expect = chai.expect,
    countryService,
    $httpBackend;

  beforeEach(function() {
    module('app.core');
  });

  beforeEach(inject(function(
    _countryService_,
    _$httpBackend_) {

    countryService = _countryService_;
    $httpBackend = _$httpBackend_;

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

  it('countryService should be defined', function() {
    expect(countryService).to.exist;
  });

  it('should call getMetadata with enumName', function() {

    $httpBackend
      .when('GET', 'api/metadata/us?enum_name=enumName')
      .respond({});

    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
      .respond({});

    countryService.getMetadata('enumName').then(function(res) {
      // res can be compared here
    });

    $httpBackend.flush();
  });

  it('should reject getMetadata', function() {

    $httpBackend.when('GET', 'api/metadata/us?enum_name=enumName')
      .respond(500);

    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
      .respond({});

    countryService.getMetadata('enumName').then(function(res) {
      // res can be compared here
    });

    $httpBackend.flush();
  });

});
