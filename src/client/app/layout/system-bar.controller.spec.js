describe('systemBarController', function() {
  var expect = chai.expect,
    systemBarController,
    $rootScope,
    $controller,
    $scope,
    authService,
    $state,
    accountEdit,
    paymentSetup,
    userService,
    logger,
    localStorageService,
    $scope,
    $filter,
    $timeout,
    utilityService,
    $document,
    $window,
    translatorHelper,
    mockInterval = mockData.account().interval,
    createController,
    authData = mockData.authentication().userInfo,
    userSettings = mockData.settings().settings;

  beforeEach(function() {
    module('app.layout');
  });

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _userService_,
    _authenticationService_,
    _$state_,
    _accountEditModalService_,
    _paymentSetupModalService_,
    _logger_,
    _localStorageService_,
    _$filter_,
    _$timeout_,
    _utilityService_,
    _$document_,
    _$window_,
    _translatorHelper_) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    userService = _userService_;
    authService = _authenticationService_;
    $state = _$state_;
    accountEdit = _accountEditModalService_;
    paymentSetup = _paymentSetupModalService_;
    logger = _logger_;
    localStorageService = _localStorageService_;
    $filter = _$filter_;
    $timeout = _$timeout_;
    utilityService = _utilityService_;
    $document = _$document_;
    $window = _$window_;
    translatorHelper = _translatorHelper_;

    sandbox = sinon.sandbox.create();

    getUserSettings = sinon.stub(userService, 'getUserSettings');
    getUserSettings.returnsPromise().resolves(userSettings);

    sandbox = sinon.sandbox.create();
    sandbox.stub(localStorageService, 'get', function () {
      return authData;
    });

    createController = function() {
      return $controller('systemBarController', {
        '$scope': $scope
      });
    };



    // $scope.$emit('show_filter_intervals', '123', '2345');

  }));

  afterEach(function () {
    sandbox.restore();
    // $httpBackend.verifyNoOutstandingRequest();
    // $httpBackend.verifyNoOutstandingExpectation();
  });

  it('systemBarController should be defined', function() {
    systemBarController = createController();
    expect(systemBarController).to.exist;
  });

  it('should emit allowSelfCare_editAccountInfo', function() {
   systemBarController = createController();
    $scope.$emit('allowSelfCare_editAccountInfo','F')
  });

  it('should emit show_filter_intervals', function() {
   systemBarController = createController();
    $scope.$emit('show_filter_intervals',mockInterval)
  });

  it('should call logout', function() {
    systemBarController.logout();
  });

  it('should call isCardExpanded', function() {
    systemBarController.isCardExpanded();
  });

  it('should call closeNavigationPanel', function() {
    systemBarController.closeNavigationPanel();
  });

  it('should call showMobileNavigationPanel', function() {
    systemBarController.showMobileNavigationPanel();
  });

  it('should call highlightLink', function() {
    systemBarController.highlightLink();
  });

  it('should call showDashboard', function() {
    systemBarController.showDashboard();
  });

  it('should call showView', function () {
    systemBarController.showView();
  });

  it('should call  navigationLink', function () {
    systemBarController.navigationLink();
  });

  it('should call  checkWidgetVisible', function () {
    systemBarController.checkWidgetVisible();
  });
  
  it('should call  editAccountDisabled', function () {
    systemBarController.editAccountDisabled();
  });

  it('should call  showBillFilterBar', function () {
    systemBarController.showBillFilterBar();
  });
  it('should call  handleFilter', function () {
    systemBarController.handleFilter();
  });
  

});
