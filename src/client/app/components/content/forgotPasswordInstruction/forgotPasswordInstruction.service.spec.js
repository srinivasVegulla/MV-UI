describe('forgotPasswordInstructionService', function() {
  var expect = chai.expect,
  forgotPasswordInstructionService,
  localStorageService,
  forgotPasswordResponse,
  authData = mockData.authentication().userInfo,
  $httpBackend;

  beforeEach(function() {
    module('app.forgotPasswordInstruction');
  });

  beforeEach(inject(function(
    _forgotPasswordInstructionService_,
    _logger_,
    _localStorageService_,
    _$httpBackend_) {

    forgotPasswordInstructionService = _forgotPasswordInstructionService_;
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
      .when('GET', '/static/default/i18n/forgotPasswordInstruction/locale-en.json')
      .respond({});

    $httpBackend
      .when('GET', 'app/core/404.html')
      .respond({});

    $httpBackend
      .when('POST', 'api/accounts/password')
      .respond(forgotPasswordResponse);

  }));

  it('forgotPasswordInstructionService should be defined', function() {
    expect(forgotPasswordInstructionService).to.exist;
  });


 it('should call sendForgotPassword', function() {

    $httpBackend
      .when('GET', 'api/accounts/password')
      .respond(forgotPasswordResponse);

    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
      .respond({});

    var data = {username : 'dummy'};
    forgotPasswordInstructionService.sendForgotPassword(data).then(function(res) {
      // res can be compared here
    });

    $httpBackend.flush();
  });

  it('should reject sendForgotPassword', function() {

    $httpBackend
      .when('GET', 'api/accounts/password')
      .respond(400);

    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
      .respond({});

    var data = {username : 'dummy'};
    forgotPasswordInstructionService.sendForgotPassword(data).then(function(res) {
      // res can be compared here
    });

    $httpBackend.flush();
  });

  afterEach(function() {
    sandbox.restore();
  }); 

});
