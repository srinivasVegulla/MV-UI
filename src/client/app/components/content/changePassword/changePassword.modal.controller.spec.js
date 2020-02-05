describe('changePasswordModalController', function() {
  var expect = chai.expect,    
  changePasswordModalController,
  $rootScope,
  $controller,  
  $scope,
  modalInstance = mockData.modalInstance(),
  authenticationService,
  userService,
  changePasswordModalService,
  translatorHelper,
  localStorageService,
  createController;

  beforeEach(function() {
    module('app.changePassword');
  });

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _authenticationService_,    
    _userService_,
    _changePasswordModalService_,
    _translatorHelper_,
    _localStorageService_
  ) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    userService = _userService_;
    changePasswordModalService = _changePasswordModalService_;
    authenticationService = _authenticationService_;
    translatorHelper = _translatorHelper_;
    localStorageService = _localStorageService_;

    sandbox = sinon.sandbox.create();
    sandbox.stub(localStorageService, 'get', function () {
      return authData;
    });


    createController = function() {
      return $controller('changePasswordModalController', {
        '$scope': $scope,
        $uibModalInstance: modalInstance
      });
    }

  save = sinon.stub(changePasswordModalService, 'changePassword');
  save.returnsPromise().resolves({});

  }));

  afterEach(function() {
    sinon.restore(changePasswordModalService.save);
    sandbox.restore();
  });

  it('changePasswordModalController should be defined', function() {
    changePasswordModalController = createController();
    expect(changePasswordModalController).to.exist;
  });
  

  it('should call save', function() {
    createController();
    changePasswordModalController.save();
  });

  it('should call cancel', function() {
    changePasswordModalController.cancel();
    createController();
  });

  it('should call userName', function() {
    createController();
    changePasswordModalController.userName();
  });

  it('should reject changePassword method with error oldpassword', function() {
    save.returnsPromise().rejects({
      data: {
        message: 'old password'
      }
    });
    changePasswordModalController = createController();
    changePasswordModalController.save();
  });

  it('should reject changePassword method with error message new password security requirements', function() {
    save.returnsPromise().rejects({
      data: {
        message: 'new password does not meet security requirements'
      }
    });
    changePasswordModalController = createController();
    changePasswordModalController.save();
  });

   it('should reject changePassword method with error message account has been locked', function() {
    save.returnsPromise().rejects({
      data: {
        message: 'account has been locked'
      }
    });
    changePasswordModalController = createController();
    changePasswordModalController.save();
  });

   it('should reject changePassword method with error message not strong enough', function() {    
    save.returnsPromise().rejects({
      data: {
        message: 'not strong enough'
      }
    });
    changePasswordModalController = createController();
    changePasswordModalController.save();
  });

   it('should reject changePassword method with error message used before', function() {
    save.returnsPromise().rejects({
      data: {
        message: 'used before'
      }
    });
    changePasswordModalController = createController();
    changePasswordModalController.save();
  });

  it('should reject changePassword method with error message blank', function() {
    save.returnsPromise().rejects({
      data: {
        message: ''
      }
    });
    changePasswordModalController = createController();
    changePasswordModalController.save();
  });


 });
