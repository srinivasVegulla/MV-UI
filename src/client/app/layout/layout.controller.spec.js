/* jshint -W117, -W030 */
describe('layoutController', function() {
  var expect = chai.expect,
    layoutController,
    $rootScope,
    $controller,
    $scope,
    userDetailsResponse = mockData.billing().reportData,
    mockInterval = mockData.account().interval,
    userService,
    createController,
    getFaviconName;

  beforeEach(function() {
    module('app.layout');
  });

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _userService_) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    userService = _userService_;

    sandbox = sinon.sandbox.create();

    getNamespace = sinon.stub(userService, 'getNamespace');
    getNamespace.returnsPromise().resolves('mt');

    getUserSettings = sinon.stub(userService, 'getUserSettings');
    getUserSettings.returnsPromise().resolves({
      settings: {
        theme: {
          faviconName: 'mt-favicon'
        }
      }
    });

    createController = function() {
      return $controller('layoutController', {
        '$scope': $scope
      });
    };

  }));

  afterEach(function() {
    // stubbed services needs to be restored here
  });

  it('layoutController should be defined', function() {
    layoutController = createController();
    expect(layoutController).to.exist;
  });

  it('should call getSiteName methods', function () {
    layoutController = createController();
    layoutController.siteName();
  });

  it('should call faviconName methods', function() {
    layoutController = createController();
    layoutController.faviconName();
  });

});
