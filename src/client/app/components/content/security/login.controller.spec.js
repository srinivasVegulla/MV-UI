describe('loginController', function() {
  var expect = chai.expect,
    loginController,
    $rootScope,
    $controller,
    $scope,
    authenticationService,
    createController,
    modalInstance = mockData.modalInstance(),
    langData = mockData.localStorageData(),
    userService;

  beforeEach(function() {
    module('app.security');
  });

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _authenticationService_,
    _localStorageService_,
    _userService_) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    authenticationService = _authenticationService_;
    userService = _userService_;
    localStorageService = _localStorageService_;

    sandbox = sinon.sandbox.create();
    sandbox.stub(localStorageService, 'get', function () {
      return langData;
    });

    getUserSettings = sinon.stub(userService, 'getUserSettings');

    authenticateForm = sinon.stub(authenticationService, 'authenticateForm');

    createController = function() {
      return $controller('loginController', {
        '$scope': $scope
      });
    }

  }));

  afterEach(function() {
    sinon.restore(userService.getUserSettings);
    sinon.restore(authenticationService.authenticateForm);
  });
  it('should resolve getUserSettings', function() {
    getUserSettings.returnsPromise().resolves({
      settings: {
        isSignUpEnable: true,
        theme: {
          applicationName: 'appName'
        }
      }
    });
    loginController = createController();
  });

  it('should reject getUserSettings', function() {
    getUserSettings.returnsPromise().rejects({ error: 'error' });
    loginController = createController();
  });

  it('should be defined', function() {
    expect(loginController).to.exist;
  });

  it('should call forgotPassword', function() {
    loginController.forgotPassword();
  });

  it('should resolve login', function() {
    getUserSettings.returnsPromise().resolves({
      settings: {
        isSignUpEnable: true,
        theme: {
          applicationName: 'appName'
        }
      }
    });
    authenticateForm.returnsPromise().resolves({});
    loginController = createController()
    loginController.login();
  });

  it('should reject login with message invalid username', function() {
    getUserSettings.returnsPromise().resolves({
      settings: {
        isSignUpEnable: true,
        theme: {
          applicationName: 'appName'
        }
      }
    });

    authenticateForm.returnsPromise().rejects({
      data: {
        error_description: 'message invalid username'
      }
    });
    loginController = createController()
    loginController.login();
  });

  it('should reject login with message your account is locked out', function() {
    getUserSettings.returnsPromise().resolves({
      settings: {
        isSignUpEnable: true,
        theme: {
          applicationName: 'appName'
        }
      }
    });

    authenticateForm.returnsPromise().rejects({
      data: {
        error_description: 'message your account is locked out'
      }
    });
    loginController = createController()
    loginController.login();
  });

  it('should reject login with message your account does not have permissions', function() {
    getUserSettings.returnsPromise().resolves({
      settings: {
        isSignUpEnable: true,
        theme: {
          applicationName: 'appName'
        }
      }
    });

    authenticateForm.returnsPromise().rejects({
      data: {
        error_description: 'message your account does not have permissions'
      }
    });
    loginController = createController()
    loginController.login();
  });

  it('should reject login with message login failed. password expired.', function() {
    getUserSettings.returnsPromise().resolves({
      settings: {
        isSignUpEnable: true,
        theme: {
          applicationName: 'appName'
        }
      }
    });

    authenticateForm.returnsPromise().rejects({
      data: {
        error_description: 'message login failed. password expired.'
      }
    });
    loginController = createController()
    loginController.login();
  });

  it('should reject login', function() {
    getUserSettings.returnsPromise().resolves({
      settings: {
        isSignUpEnable: true,
        theme: {
          applicationName: 'appName'
        }
      }
    });

    authenticateForm.returnsPromise().rejects({
      data: {
        error_description: 'message'
      }
    });
    loginController = createController()
    loginController.login();
  });

});
