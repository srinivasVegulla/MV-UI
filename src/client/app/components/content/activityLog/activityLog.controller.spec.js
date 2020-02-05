describe('activityLogController', function() {
  var expect = chai.expect,
  activityLogController,
  $scope,
  activityLogService,
  $rootScope,
  $controller,
  moment,
  logger,
  utilityService,
  $window,
  translatorHelper,
  activityLogResponse = mockData.activityLogs(),
  langData = mockData.localStorageData().i18n,
  siteSettingsResponse = mockData.localStorageData().settings,
  createController;

  beforeEach(function() {
    module('app.activityLog');
  });

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _$moment_,
    _activityLogService_,
    _logger_,
    _utilityService_,
    _$window_,
    _translatorHelper_) {


    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    moment = _$moment_;
    activityLogService = _activityLogService_;
    logger = _logger_;
    utilityService = _utilityService_;
    $window = _$window_;
    translatorHelper = _translatorHelper_;
    
    sandbox1 = sinon.sandbox.create();
    sandbox1.stub(utilityService, 'getNameSpace', function () {
      return siteSettingsResponse;
    });

    createController = function() {
      return $controller('activityLogController', {
        '$scope': $scope
      });
    }
  }));

  afterEach(function () {
    sandbox1.restore();
  });

  it('activityLogController should be defined', function () {
    activityLogController = createController();
    expect(activityLogController).to.exist;
  });

  it('activityLogController should call manipulateActivities', function () {
    activityLogController = createController();
    activityLogController.manipulateActivities(activityLogResponse);
  });

  it('activityLogController should call isDefaultSort', function () {
    activityLogController = createController();
    activityLogController.isDefaultSort();
  });

  it('activityLogController should call initiateWidgetService', function () {
    activityLogController = createController();
    activityLogController.initiateWidgetService();
  });

  it('activityLogController should call getMoreData', function () {
    activityLogController = createController();
    activityLogController.getMoreData(1, 10);
  });

  it('activityLogController should call expandLatestDay', function () {
    activityLogController = createController();
    activityLogController.expandLatestDay();
  });

  it('activityLogController should call showAllActivities', function () {
    activityLogController = createController();
    activityLogController.showAllActivities();
  });

  it('activityLogController should call closeAllActivities', function () {
    activityLogController = createController();
    activityLogController.closeAllActivities();
  });

  it('activityLogController should call daysBetween', function () {
    activityLogController = createController();
    activityLogController.daysBetween();
  });

  it('activityLogController should call toggleActivityLoad', function () {
    activityLogController = createController();
    activityLogController.toggleActivityLoad();
  });

  it('activityLogController should call formatActivityDate', function () {
    activityLogController = createController();
    activityLogController.formatActivityDate();
  });

  it('activityLogController should call checkTimeLineday', function () {
    activityLogController = createController();
    activityLogController.checkTimeLineday({
      timeline : 'd0'
    }, 1);
  });

  it('activityLogController should call checkExpandState', function () {
    activityLogController = createController();
    activityLogController.checkExpandState();
  });

   it('activityLogController should call isContains', function () {
     activityLogController = createController();
     activityLogController.isContains();
   });

   it('activityLogController should call getClassAsperActivityType', function () {
     activityLogController = createController();
     activityLogController.getClassAsperActivityType({
       isfailure: true
     }, 1);
   });

   it('activityLogController should call getstaticFiles', function () {
     activityLogController = createController();
     activityLogController.getstaticFiles();
   });

   it('activityLogController should call getFilterConfigFiles', function () {
     activityLogController = createController();
     activityLogController.getFilterConfigFiles();
   });
 });
