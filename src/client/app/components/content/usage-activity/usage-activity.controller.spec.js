describe('usageActivityController', function() {
  var expect = chai.expect,
    usageActivityController,
    $rootScope,
    $controller,
    $scope,
    usageActivityService,
    billingActivityService,
    accountService,
    filterService,
    filter,
    moment,
    dateFilter,
    localStorageService,
    utilityService,
    userService,
    getCommonConfigFile,
    currencyJsonResponse = mockData.currency().JSON,
    usageActivityResponse = mockData.usageActivity().usageActivityData,
    createController,
    intervalsResponse = mockData.account().dataIintervals;

  beforeEach(function() {
    module('app.usage-activity');
  });

        localStorageService,
        utilityService,
        userService

  beforeEach(inject(function(_$rootScope_,
    _$controller_,
    _usageActivityService_,
    _accountService_,
    _filterService_,
    _$filter_,
    _$moment_,
    _dateFilter_,
    _localStorageService_,
    _utilityService_,
    _userService_) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    usageActivityService = _usageActivityService_;
    accountService = _accountService_;
    filterService = _filterService_;
    filter = _$filter_;
    moment = _$moment_;
    dateFilter = _dateFilter_;
    localStorageService = _localStorageService_;
    utilityService = _utilityService_;
    userService = _userService_;

    getUsageActivity = sinon.stub(usageActivityService, 'getActivity');

    getUtilityService = sinon.stub(utilityService, 'getCurrency');

    getFilter = sinon.stub(filterService, 'getFilter');
    
    getLocalStorageService = sinon.stub(localStorageService, 'get');
    getLocalStorageService.returnsPromise().resolves({"currency" : 'USD'});

    getCommonConfigFile = sinon.stub(userService, 'getCommonConfigFile');

    createController = function() {
      return $controller('usageActivityController', {
        '$scope': $scope
      });
    }
  }));

   afterEach(function() {
    sinon.restore(usageActivityService.getActivity);
    sinon.restore(utilityService.getCurrency);
    sinon.restore(filterService.getFilter);
    sinon.restore(localStorageService.get);
   });

     it('usageActivityController should be defined', function() {
       usageActivityController = createController();
       expect(usageActivityController).to.exist;
     });

     
     it('usageActivityController should call initiateWidgetService', function () {
      usageActivityController = createController();
      usageActivityController.billCount = 5;
      getCommonConfigFile.returnsPromise().resolves({
        "UsageActivity": {billCount: 5}
      });
      getFilter.returnsPromise().resolves(intervalsResponse);
      usageActivityController.initiateWidgetService();
    });

     it('usageActivityController should call generateBarChart', function () {
       usageActivityController = createController();
       usageActivityController.generateBarChart();
     });

     it('usageActivityController should call clearChart', function () {
       usageActivityController = createController();
       usageActivityController.clearChart();
     });

     it('usageActivityController should call showGraph', function () {
       usageActivityController = createController();
       usageActivityController.showGraph();
     });

     it('usageActivityController should call clickClose', function () {
       usageActivityController = createController();
       usageActivityController.clickClose();
     });

     it('usageActivityController should call currencyFormatter', function () {
       usageActivityController = createController();
       usageActivityController.currencyFormatter();
     });

     it('usageActivityController should call getDateFormatByLang', function () {
       usageActivityController = createController();
       usageActivityController.getDateFormatByLang();
     });
     it('usageActivityController should call getUsageActivity with currecncy success', function () {
      usageActivityController = createController();
      getUsageActivity.returnsPromise().resolves(usageActivityResponse);
      getUtilityService.returnsPromise().resolves(currencyJsonResponse);
      usageActivityController.getUsageActivity();
    });
     it('usageActivityController should call getUsageActivity with currecncy fail', function () {
      usageActivityController = createController();
      getUsageActivity.returnsPromise().resolves(usageActivityResponse);
      getUtilityService.returnsPromise().rejects({});
      usageActivityController.getUsageActivity();
    });
    it('usageActivityController should reject getUsageActivity', function () {
      usageActivityController = createController();
      getUsageActivity.returnsPromise().rejects({status: 404});
      usageActivityController.getUsageActivity();
    });
    it('usageActivityController should reject getUsageActivity', function () {
      usageActivityController = createController();
      getUsageActivity.returnsPromise().rejects({status: 500});
      usageActivityController.getUsageActivity();
    });


});
