/***view-selector.controller.spec.js***/
describe('viewSelectorController', function() {
  var expect = chai.expect,
    viewSelectorController,
    $rootScope,
    $controller,
    //systemBarViewResponse = mockData.viewJSON(),
    systemBarViewResponse = {},
    $scope,
    systemBarService,
    userService,
    createController;

  beforeEach(function() {
    module('app.viewSelector');
  });

  beforeEach(inject(function (_$rootScope_, _$controller_, _userService_) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    userService = _userService_;

    layoutManagerSettings = sinon.stub(userService, 'layoutManagerSettings');
    layoutManagerSettings.returnsPromise().resolves(systemBarViewResponse);

    createController = function() {
      return $controller('viewSelectorController', {
        '$scope': $scope
      });
    }

  }));

  afterEach(function() {
    sinon.restore(userService.layoutManagerSettings);
  });

  it('should be defined', function() {
    viewSelectorController = createController();
    expect(viewSelectorController).to.exist;
  });

  it('should call selectedView', function() {
    viewSelectorController = createController();
    viewSelectorController.selectView(1);
    viewSelectorController.selectView(2);
    viewSelectorController.selectView(3);
    viewSelectorController.selectView(4);
    viewSelectorController.selectView();

  });
});
