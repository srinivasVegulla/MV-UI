describe('changePasswordModalService', function() {
  var expect = chai.expect,
  changePasswordModalService,
  userService,
  changePasswordResponse,
  $httpBackend,
  localStorageService,
  $aside;

  beforeEach(function() {
    module('app.changePassword');
  });

  beforeEach(inject(function(
    _changePasswordModalService_,
    _logger_,
    _$aside_,
    _userService_,
    _$httpBackend_,
    _localStorageService_) {

    changePasswordModalService = _changePasswordModalService_;
    userService = _userService_;
    $aside = _$aside_;
    $httpBackend = _$httpBackend_;
    localStorageService = _localStorageService_;

    sandbox = sinon.sandbox.create();
    sandbox.stub(localStorageService, 'get', function () {
      return authData;
    });

    $httpBackend
      .when('POST', 'api/registration/changePassword')
      .respond(changePasswordResponse);

  }));

  it('changePasswordModalService should be defined', function() {
    expect(changePasswordModalService).to.exist;
  });

  it('should call open', function() {
    changePasswordModalService.open('123456');
  });

  it('should call changePassword', function() {

    $httpBackend.expectGET('/static/default/i18n/common/locale-en.json')
      .respond(changePasswordResponse);

    $httpBackend.expectGET('/static/default/i18n/changePassword/locale-en.json')
      .respond(changePasswordResponse);

    $httpBackend.when('GET', 'app/core/404.html')
      .respond(changePasswordResponse);

    var data = {username : 'dummy', oldPassword : '123', newPassword : '1234', conPassword : '1234'};
    changePasswordModalService.changePassword(data).then(function(res) {
      //console.log(res);
    });

    $httpBackend.flush();
  });

  afterEach(function() {
    sandbox.restore();
  }); 

});
