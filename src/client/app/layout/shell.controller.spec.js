/* jshint -W117, -W030 */
describe('shellController', function() {
  var expect = chai.expect,
    shellController,
    $rootScope,
    $controller,
    $scope,
    idInterval = '123456';

  beforeEach(function() {
    module('app.layout');
  });

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;

    createController = function () {
      return $controller('shellController', {
        '$scope': $scope
      });
    }

  }));

  it('shellController should be defined', function() {
    shellController = createController();
    expect(shellController).to.exist;
  });

  it('shellController isAuthenticated function', function () {
    shellController = createController();
    shellController.isAuthenticated();
  });

  it('shellController getAccountId function', function () {
    shellController = createController();
    shellController.accountId();
  });

});
