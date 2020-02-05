describe('accountInfoController', function() {
  var expect = chai.expect,
    accountInfoController,
    $rootScope,
    $controller,
    $scope,
    account,
    sandbox,
    createController,
    accountInfo = mockData.account().accountInfo;

  beforeEach(function() {
    module('app.account');
  });

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _accountService_) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    account = _accountService_;
    sandbox = sinon.sandbox.create();

    sandbox.stub(account, 'info', function() {
      return accountInfo;
    });

    load = sinon.stub(account, 'load');
    load.returnsPromise().resolves(accountInfo);

    createController = function() {
      return $controller('accountInfoController', {
        '$scope': $scope
      });
    };

  }));

  afterEach(function() {
    sandbox.restore();
  });

  it('accountInfoController should be defined', function() {
    accountInfoController = createController();
    expect(accountInfoController).to.exist;
  });

  it('should call formattedAddress', function() {
    accountInfoController.formattedAddress();
  });

  it('should call formattedLocation', function() {
    accountInfoController.formattedLocation();
  });

});
