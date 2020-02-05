describe('billingActivityController', function() {
  var expect = chai.expect,
    billingActivityController,
    $rootScope,
    $controller,
    $scope,
    billingActivityService,
    accountService,
    filterService,
    currencyJsonResponse = mockData.currency().JSON,
    billingActivityResponse = mockData.billingActivity().billingActivityData,
    createController,
    window,
    filter,
    getCommonConfigFile,
    localStorageService,
    utilityService,
    userService,
    intervalsResponse = mockData.account().dataIintervals;

  beforeEach(function() {
    module('app.billing-activity');
  });

  beforeEach(inject(function(_$rootScope_,
    _$controller_,
    _billingActivityService_,
    _accountService_,
    _filterService_,
    _$moment_,
    _dateFilter_,
    _$filter_,
    _localStorageService_,
    _utilityService_,
    _userService_,
    _$window_
    ) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    billingActivityService = _billingActivityService_;
    accountService = _accountService_;
    filterService = _filterService_;
    $moment = _$moment_;
    dateFilter = _dateFilter_;
    filter = _$filter_;
    localStorageService = _localStorageService_;
    utilityService = _utilityService_;
    userService = _userService_;
    window = _$window_;

    getBillingActivity = sinon.stub(billingActivityService, 'getActivity');

    getUtilityService = sinon.stub(utilityService, 'getCurrency');

    getFilter = sinon.stub(filterService, 'getFilter');
    getFilter.returnsPromise().resolves(intervalsResponse);

    getLocalStorageService = sinon.stub(localStorageService, 'get');
    getLocalStorageService.returnsPromise().resolves({"currency": 'USD'});

    getCommonConfigFile = sinon.stub(userService, 'getCommonConfigFile');
    getCommonConfigFile.returnsPromise().resolves({
      "BillingActivity": {billCount: 5}
    });

    createController = function() {
      return $controller('billingActivityController', {
        '$scope': $scope
      });
    }
  }));

   afterEach(function() {
    sinon.restore(billingActivityService.getActivity);
    sinon.restore(utilityService.getCurrency);
    sinon.restore(filterService.getFilter);
    sinon.restore(localStorageService.get);
   });

     it('billingActivityController should be defined', function() {
       billingActivityController = createController();
       expect(billingActivityController).to.exist;
     });

     it('billingActivityController should call activate', function () {
       billingActivityController = createController();
       billingActivityController.activate();
     });

    it('billingActivityController should call createSVG', function () {
      billingActivityController = createController();
      billingActivityController.createSVG();
    });

    it('billingActivityController should call generateBarChart', function () {
      billingActivityController = createController();
      billingActivityController.generateBarChart();
    });

    it('billingActivityController should call clearChart', function () {
      billingActivityController = createController();
      billingActivityController.clearChart();
    });


    it('billingActivityController should call showgraph', function () {
      billingActivityController = createController();
      billingActivityController.showgraph();
    });

    it('billingActivityController should call clickClose', function () {
      billingActivityController = createController();
      billingActivityController.clickClose();
    });

    it('billingActivityController should call currencyFormatter', function () {
      billingActivityController = createController();
      billingActivityController.currencyFormatter();
    });

    it('billingActivityController should call getDateFormatByLang', function () {
      billingActivityController = createController();
      billingActivityController.getDateFormatByLang();
    });

    it('billingActivityController should call billingActivityResponse rejects 404', function () {
      billingActivityController = createController();
      getBillingActivity.returnsPromise().rejects({status: 404});
      billingActivityController.getBillingActivity();
    });

    it('billingActivityController should call billingActivityResponse rejects 500', function () {
      billingActivityController = createController();
      getBillingActivity.returnsPromise().rejects({status: 500});
      billingActivityController.getBillingActivity();
    });
    it('billingActivityController should call getBillingActivity with currecncy success', function () {
      billingActivityController = createController();
      getBillingActivity.returnsPromise().resolves(billingActivityResponse);
      getUtilityService.returnsPromise().resolves(currencyJsonResponse);
      billingActivityController.getBillingActivity();
    });
     it('billingActivityController should call getBillingActivity with currecncy fail', function () {
      billingActivityController = createController();
      getBillingActivity.returnsPromise().resolves(billingActivityResponse);
      getUtilityService.returnsPromise().rejects({});
      billingActivityController.getBillingActivity();
    });
    it('billingActivityController should reject getBillingActivity', function () {
      billingActivityController = createController();
      getBillingActivity.returnsPromise().rejects({status: 404});
      billingActivityController.getBillingActivity();
    });
    it('billingActivityController should reject getBillingActivity', function () {
      billingActivityController = createController();
      getBillingActivity.returnsPromise().rejects({status: 500});
      billingActivityController.getBillingActivity();
    });

});
