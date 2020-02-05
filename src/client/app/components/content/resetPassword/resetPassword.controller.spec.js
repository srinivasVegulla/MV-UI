describe('resetPasswordController', function() {
  var expect = chai.expect,
    resetPasswordController,
    $rootScope,
    $controller,
    $scope,
    authenticationService,
    createController,
    resetPasswordService,
    userService;

  beforeEach(function() {
    module('app.resetPassword');
  });

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _authenticationService_,
    _resetPasswordService_,
    _userService_) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    authenticationService = _authenticationService_;
    resetPasswordService = _resetPasswordService_;
    userService = _userService_;

    resetAccountPassword = sinon.stub(resetPasswordService, 'resetAccountPassword');

    authenticateForm = sinon.stub(authenticationService, 'authenticateForm');

    createController = function() {
      return $controller('resetPasswordController', {
        '$scope': $scope,
        resetPassword: 'MetraTech1',
        parameters: 'IDMld0sp-vjuUOgD-T2BuACAIIwyU6gKpZQ_B_u0js8',
        userName: 'miller'
      });
    }

  }));

  afterEach(function() {
    sinon.restore(authenticationService.authenticateForm);
    sinon.restore(resetPasswordService.createAccount);
    sinon.restore(userService.getNamespace);
    sinon.restore(userService.getSiteName);
  });

  it('should be defined', function() {
    resetPasswordController = createController();
    expect(resetPasswordController).to.exist;
  });

  it('should call resetPasswordClick', function() {
    resetPasswordController = createController();
    resetPasswordController.resetPasswordClick('MetraTech1','IDMld0sp-vjuUOgD-T2BuACAIIwyU6gKpZQ_B_u0js8','miller');
  });

  it('should resolve resetPasswordClick', function() {
    resetAccountPassword.returnsPromise().resolves({});
    authenticateForm.returnsPromise().resolves({});
    resetPasswordController = createController();
    resetPasswordController.resetPasswordClick();
  });

  it('should reject resetPasswordClick with name already exists message', function() {
    resetAccountPassword.returnsPromise().rejects({
      data: {
        message: 'message: name already exists.'
      }
    });
    authenticateForm.returnsPromise().resolves({});
    resetPasswordController = createController();
    resetPasswordController.resetPasswordClick();
  });

  it('should reject resetPasswordClick', function() {
    resetPasswordController = createController();
    resetAccountPassword.returnsPromise().rejects({
      data: {
        message: ''
      }
    });
    authenticateForm.returnsPromise().resolves({});
    resetPasswordController.resetPasswordClick();
  });

  it('should reject resetPasswordClick with 400 error', function() {
    resetPasswordController = createController();
    resetAccountPassword.returnsPromise().rejects({ status: 400 });
    authenticateForm.returnsPromise().resolves({});
    resetPasswordController.resetPasswordClick();
  });

  it('should reject resetPasswordClick with 500 error', function() {
    resetPasswordController = createController();
    resetAccountPassword.returnsPromise().rejects({ status: 500 });
    authenticateForm.returnsPromise().resolves({});
    resetPasswordController.resetPasswordClick();
  });

  it('should call cancel', function() {
    resetPasswordController.cancel();
  });

});
