describe('signUpController', function() {
  var expect = chai.expect,
    signUpController,
    $rootScope,
    $controller,
    $scope,
    authenticationService,
    createController,
    signUpService;

  beforeEach(function() {
    module('app.signUp');
  });

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _authenticationService_,
    _signUpService_) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    authenticationService = _authenticationService_;
    signUpService = _signUpService_;

    createAccount = sinon.stub(signUpService, 'createAccount');

    authenticateForm = sinon.stub(authenticationService, 'authenticateForm');

    createController = function() {
      return $controller('signUpController', {
        '$scope': $scope
      });
    }

  }));

  afterEach(function() {
    sinon.restore(authenticationService.authenticateForm);
    sinon.restore(signUpService.createAccount);
  });

  it('should resolve createAccount', function() {
    createAccount.returnsPromise().resolves({});
    authenticateForm.returnsPromise().resolves({});
    signUpController = createController();
    signUpController.signUpClick();
  });

  it('should reject createAccount with name already exists message', function() {
    createAccount.returnsPromise().rejects({
      data: {
        message: 'message: name already exists.'
      }
    });
    authenticateForm.returnsPromise().resolves({});
    signUpController = createController();
    signUpController.signUpClick();
  });

  it('should reject createAccount', function() {
    signUpController = createController();
    createAccount.returnsPromise().rejects({
      data: {
        message: ''
      }
    });
    authenticateForm.returnsPromise().resolves({});
    signUpController.signUpClick();
  });

  it('should be defined', function() {
    expect(signUpController).to.exist;
  });

  it('should call signUpClick', function() {
    signUpController.signUpClick();
  });

  it('should call cancel', function() {
    signUpController.cancel();
  });


});
