describe('expiredPasswordController', function() {
  var expect = chai.expect,
    expiredPasswordController,
    $rootScope,
    $controller,
    $scope,
    expiredPasswordService,
    authenticationService,
    userService,
    createController;

  beforeEach(function() {
    module('app.expiredPassword');
  });

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _expiredPasswordService_,
    _authenticationService_,
    _userService_) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    expiredPasswordService = _expiredPasswordService_;
    authenticationService = _authenticationService_;
    userService = _userService_;

    updatePassword = sinon.stub(expiredPasswordService, 'updatePassword');

    authenticateForm = sinon.stub(authenticationService, 'authenticateForm');
    authenticateForm.returnsPromise().resolves({});

    createController = function() {
      return $controller('expiredPasswordController', {
        '$scope': $scope
      });
    }

  }));

  // afterEach(function() {
  //   stubbed services needs to be restored here
  // });

  it('should be defined', function() {
    expiredPasswordController = createController();
    expect(expiredPasswordController).to.exist;
  });

  it('should call userName', function() {
    expiredPasswordController = createController();
    expiredPasswordController.userName();
  });

  it('should call cancel', function() {
    expiredPasswordController = createController();
    expiredPasswordController.cancel();
  });

  it('should call changePassword success', function() {
    expiredPasswordController = createController();
    updatePassword.returnsPromise().resolves({});
    expiredPasswordController.changePassword();
  });

  it('should call changePassword rejects', function() {
    expiredPasswordController = createController();
    updatePassword.returnsPromise().rejects({data: {message: "old password"}});
    updatePassword.returnsPromise().rejects({data: {message: "new password does not meet security requirements"}});
    updatePassword.returnsPromise().rejects({data: {message: "account has been locked"}});
    updatePassword.returnsPromise().rejects({data: {message: "not strong enough"}});
    updatePassword.returnsPromise().rejects({data: {message: "used before"}});
    updatePassword.returnsPromise().rejects({data: {exception: "HttpHostConnectException"}});
    expiredPasswordController.changePassword();
  });

  it('should call checkValidity', function() {
    expiredPasswordController.checkValidity('keshab', 'keshab', 'dummy');
  });

  it('should call setForminput', function() {
    expiredPasswordController.setForminput();
  });
  
});
