describe('forgotPasswordInstructionController', function() {
  var expect = chai.expect,    
  forgotPasswordInstructionController,
  $rootScope,
  $controller,
  $scope,
  userService,
  forgotPasswordInstructionService,
  createController;

  beforeEach(function() {
    module('app.forgotPasswordInstruction');
  });

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _userService_,
    _forgotPasswordInstructionService_
  ) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    userService = _userService_;
    forgotPasswordInstructionService = _forgotPasswordInstructionService_;

    sendForgotPassword = sinon.stub(forgotPasswordInstructionService, 'sendForgotPassword');
    sendForgotPassword.returnsPromise().resolves({});
    
    createController = function() {
      return $controller('forgotPasswordInstructionController', {
        '$scope': $scope
      });
    }

  }));

  it('should be defined', function() {
    forgotPasswordInstructionController = createController();
    expect(forgotPasswordInstructionController).to.exist;
  });

  it('should call backtoLoginForm', function() {
    forgotPasswordInstructionController = createController();
    forgotPasswordInstructionController.backtoLoginForm();   
  });

  it('should call formInitiate', function() {
    forgotPasswordInstructionController = createController();
    forgotPasswordInstructionController.formInitiate();
  });

  it('should call sendForgotPassword', function() {
    forgotPasswordInstructionController = createController();
    forgotPasswordInstructionController.sendForgotPassword();
  });

  it('should reject sendForgotPassword with status 500', function() {
    sendForgotPassword.returnsPromise().rejects({ status: 500 });
    forgotPasswordInstructionController = createController(); 
    forgotPasswordInstructionController.sendForgotPassword();
  });

  it('should reject sendForgotPassword with status 400', function() {
    sendForgotPassword.returnsPromise().rejects({ status: 400 });
    forgotPasswordInstructionController = createController();
    forgotPasswordInstructionController.sendForgotPassword();   
  });

  it('should reject sendForgotPassword with status 404', function() {
    sendForgotPassword.returnsPromise().rejects({ status: 404 });
    forgotPasswordInstructionController = createController();
    forgotPasswordInstructionController.sendForgotPassword();   
  });

  it('should reject sendForgotPassword with status blank', function() {
    sendForgotPassword.returnsPromise().rejects({ status: '' });
    forgotPasswordInstructionController = createController();
    forgotPasswordInstructionController.sendForgotPassword();   
  });



  afterEach(function() {
    sinon.restore(forgotPasswordInstructionService.sendForgotPassword);
  });

 });
