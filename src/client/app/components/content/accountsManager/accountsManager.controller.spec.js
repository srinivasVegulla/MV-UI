describe('accountsManagerController', function () {
  var expect = chai.expect,
    accountsManagerController,
    $scope,
    $controller,
    localStorageService, 
    activityLogResponse = mockData.activityLogs(),
    langData = mockData.localStorageData(),
    createController;

  beforeEach(function () {
    module('app.accountsManager');
  });


  beforeEach(inject(function (
    _$rootScope_,
    _$controller_,
    _accountsManagerService_,
    _localStorageService_,
    _changePasswordModalService_) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    accountsManagerService = _accountsManagerService_;
    localStorageService = _localStorageService_;

    sandbox = sinon.sandbox.create();
    sandbox.stub(localStorageService, 'get', function () {
      return langData;
    });

    createController = function () {
      return $controller('accountsManagerController', {
        '$scope': $scope
      });
    };
  }));

  afterEach(function () {
    sandbox.restore();
  });

  it('accountsManagerController should be defined', function () {
    accountsManagerController = createController();
    expect(accountsManagerController).to.exist;
  });

  it('accountsManagerController should call manipulateActivities', function () {
    accountsManagerController = createController();
    accountsManagerController.manipulateActivities(activityLogResponse);
  });
});
