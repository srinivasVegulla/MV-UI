describe('resetPasswordService', function() {
  var expect = chai.expect,
    resetPasswordService,
    $httpBackend;
    resetPasswordDetails = mockData.resetPassword().getResetAccountPassword;

  beforeEach(function() {
    module('app.resetPassword');
  });

  beforeEach(inject(function(
    _resetPasswordService_,
    _logger_,
    _$httpBackend_) {

    resetPasswordService = _resetPasswordService_;
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
      .when('PUT', 'api/accounts/password')
      .respond(resetPasswordDetails);

    $httpBackend
      .when('GET', 'api/accounts/password/verifylink?parameters=IDMld0sp-vjuUOgD-T2BuACAIIwyU6gKpZQ_B_u0js8')
      .respond(resetPasswordDetails);

  }));

  afterEach(function() {
    sandbox.restore();
    // $httpBackend.verifyNoOutstandingRequest();
    // $httpBackend.verifyNoOutstandingExpectation();
  });

  it('resetPasswordService should be defined', function() {
    expect(resetPasswordService).to.exist;
  });

  it('should call resetAccountPassword', function() {
    $httpBackend.expectGET('/static/default/i18n/resetPassword/locale-en.json')
      .respond({});
    resetPasswordService.resetAccountPassword('MetraTech1','IDMld0sp-vjuUOgD-T2BuACAIIwyU6gKpZQ_B_u0js8','miller').then(function(res) {
      // console.log(res);
    });

    $httpBackend.flush();
  });

  it('should call verifyResetPasswordLink', function() {
    $httpBackend.expectGET('/static/default/i18n/resetPassword/locale-en.json')
      .respond({});
    resetPasswordService.verifyResetPasswordLink('IDMld0sp-vjuUOgD-T2BuACAIIwyU6gKpZQ_B_u0js8').then(function(res) {
      // console.log(res);
    });

    $httpBackend.flush();
  });

});
