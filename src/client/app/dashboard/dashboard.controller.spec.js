describe('dashboardController', function() {
  var expect = chai.expect,
    dashboardController,
    $rootScope,
    $controller,
    $scope,
    createController,
    logger,
    authenticationService,
    accountEditModalService,
    dateFilter,
    $filter,
    $moment,
    systemBarService,
    localStorageService,
    utilityService,
    intervals,
    widgets,
    translatorHelper,
    $document,
    userService,
    $timeout,
    $window,
    $compile,
    accountService,
    userDetailsResponse = {
      data: {
        Report: {}
      }
    },
    systemBarService,
    paymentMethodsService,
    amountDueService,
    idInterval = mockData.account().interval,
    layoutResponse = mockData.layout().settings
    getPaymentResponse = mockData.payment().paymentMethods,
    langData = mockData.localStorageData().i18n,
    siteSettingsResponse = mockData.localStorageData().settings,
    accountInfo = mockData.account().accountInfo,
    intervals = mockData.account().intervals,
    widgets = mockData.widgets();
    duePaymentResponse = mockData.billAmount().duePaymentData;

  beforeEach(function() {
    module('app.dashboard');
  });


  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _systemBarService_,
    _logger_,
    _authenticationService_,
    _accountEditModalService_,
    _amountDueService_,
    _paymentMethodsService_,
    _dateFilter_,
    _$filter_,
    _$moment_,
    _systemBarService_,
    _localStorageService_,
    _utilityService_,
    _translatorHelper_,
    _$document_,
    _userService_,
    _$timeout_,
    _$window_,
    _$compile_,
    _accountService_) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    logger = _logger_;
    authenticationService = _authenticationService_;
    accountEditModalService = _accountEditModalService_;
    amountDueService = _amountDueService_;
    paymentMethodsService = _paymentMethodsService_;
    dateFilter = _dateFilter_;
    $filter = _$filter_;
    $moment = _$moment_;
    systemBarService = _systemBarService_;
    localStorageService = _localStorageService_;
    utilityService = _utilityService_;
    translatorHelper = _translatorHelper_;
    $document = _$document_;
    userService = _userService_;
    $timeout = _$timeout_;
    $window = _$window_;
    $compile = _$compile_;
    accountService = _accountService_;

    sandbox = sinon.sandbox.create();

    //ToDo karma test cases coverage for Viewselector
    //layoutManagerSettings = sinon.stub(systemBarService, 'layoutManagerSettings');
    //layoutManagerSettings.returnsPromise().resolves(layoutResponse);

    getPayment = sinon.stub(paymentMethodsService, 'getPayment');
    getPayment.returnsPromise().resolves(getPaymentResponse);

    getDuePayment = sinon.stub(amountDueService, 'getDuePayment');
    getDuePayment.returnsPromise().resolves(duePaymentResponse);

    getDuePayment = sinon.stub(authenticationService, 'getPayeeDetails');
    getDuePayment.returnsPromise().resolves(accountInfo);

    sandbox = sinon.sandbox.create();
    sandbox.stub(localStorageService, 'get', function () {
      return langData;
    });
    sandbox1 = sinon.sandbox.create();
    sandbox1.stub(utilityService, 'getNameSpace', function () {
      return siteSettingsResponse;
    });

    createController = function() {
      controller =  $controller('dashboardController', {
        '$scope': $scope,
        accountId: '123456',
        idPaymentInstrument: '24rwesd5w',
        currency: 'USD',
        activeDependencyDirectives: ['x', 'y', 'z'],
      });
      controller.navigationLinks = [{"id": "0", isDefaultView: true}];
      controller.accountIntervals = intervals.accountIntervals;
      controller.widgetFilter = {"calendar": true};
      return controller;
    }
    sinon.spy($rootScope, "$broadcast");
    sinon.spy($rootScope, "$emit");
  }));

  afterEach(function() {
    //ToDo karma test cases coverage for Viewselector
    //sinon.restore(systemBarService.layoutManagerSettings);
    sinon.restore(paymentMethodsService.getPayment);
    sinon.restore(amountDueService.getDuePayment);
    sinon.restore(authenticationService.getPayeeDetails);
    sandbox.restore();
    sandbox1.restore();
  });

  it('dashboardController should be defined', function() {
    dashboardController = createController();
    expect(dashboardController).to.exist;
  });

  it('should emit events', function() {
    createController();
    $scope.$emit('show_filter_intervals', '123', '2345');
    $scope.$emit('allowSelfCare_editAccountInfo', 'F');
    $scope.$emit('filter_account_intervals', mockData.account().intervals, '1');
    $scope.$emit('expanded', 'data');
    $scope.$emit('show_filter_dates', true);
    $scope.$emit('hardClosedIntervals_editAccountInfo', 'F');
    $rootScope.$emit('dashboardViewSelected', true);
    $rootScope.$emit('callSelectedPage', 'Dashboard');
    $rootScope.$broadcast('offerStoreSelected', true);
  });

  it('should call onDateRangeChanged', function() {
    dashboardController = createController();
    dashboardController.onDateRangeChanged(idInterval);
  });

  it('should call activate', function() {
    dashboardController = createController();
    dashboardController.userName = "keshab";
    dashboardController.activate();
  });

  it('dashboardController should call showBillFilterBar', function () {
    dashboardController = createController();
    dashboardController.showBillFilterBar();
  });

  it('dashboardController should call highlightLink', function () {
    dashboardController = createController();
    dashboardController.highlightLink(1);
  });

  it('dashboardController should call changeBillPeriodType ', function () {
    dashboardController = createController();
    dashboardController.changeBillPeriodType (1);
  });

  it('dashboardController should call isQuotesOrDownload  ', function () {
    dashboardController = createController();
    dashboardController.isQuotesOrDownload ();
  });

  it('dashboardController should call isEbBreadcrumbsItem   ', function () {
    dashboardController = createController();
    dashboardController.isEbBreadcrumbsItem ();
  });

  it('dashboardController should call filter   ', function () {
    dashboardController = createController();
    dashboardController.filter();
  });

  it('dashboardController should call selectByBill   ', function () {
    dashboardController = createController();
    dashboardController.selectByBill(1);
  });

  it('dashboardController should call selectDate   ', function () {
    dashboardController = createController();
    dashboardController.selectDate('xyz');
  });

  it('dashboardController should call isDateRange   ', function () {
    dashboardController = createController();
    dashboardController.isDateRange();
  });

  it('dashboardController should call isDependencyWidgetActive   ', function () {
    dashboardController = createController();
    dashboardController.isDependencyWidgetActive('x');
  });

  it('dashboardController should call isCalendarView   ', function () {
    dashboardController = createController();
    dashboardController.isCalendarView();
  });

  it('dashboardController should call isCalendarOption   ', function () {
    dashboardController = createController();
    dashboardController.isCalendarOption();
  });

  it('dashboardController should call getTodayDate   ', function () {
    dashboardController = createController();
    dashboardController.getTodayDate();
  });

  it('dashboardController should call isDashboardViewSelected   ', function () {
    dashboardController = createController();
    dashboardController.isDashboardViewSelected();
  });

  it('dashboardController should call selectedSortKey   ', function () {
    dashboardController = createController();
    dashboardController.selectedSortKey();
  });

  it('dashboardController should call getSortKeyDisplayName   ', function () {
    dashboardController = createController();
    dashboardController.getSortKeyDisplayName('xyz');
  });

  it('dashboardController should call setSortKey   ', function () {
    dashboardController = createController();
    dashboardController.setSortKey('xyz');
  });
  
  it('dashboardController should call setSelectedSortKey   ', function () {
    dashboardController = createController();
    dashboardController.setSelectedSortKey('xyz');
  });

  it('dashboardController should call getCardState   ', function () {
    dashboardController = createController();
    dashboardController.getCardState();
  });

  it('should call changeDropdown', function() {
    dashboardController = createController();
    dashboardController.changeDropdown(idInterval);
  });

  it('should call setChoiceIndex', function() {
    dashboardController = createController();
    dashboardController.setChoiceIndex('1');
  });

  it('should call checkWidgetVisible', function() {
    dashboardController = createController();
    dashboardController.checkWidgetVisible('charges');
  });

  it('should call formatBillingPeriodInterval', function() {
    dashboardController = createController();
    dashboardController.formatBillingPeriodInterval(idInterval);
  });

  it('should call showDashboard', function() {
    dashboardController = createController();
    dashboardController.showDashboard();
  });

  it('should call showView Dashboard', function() {
    dashboardController = createController();
    dashboardController.navigationLinks = [{"id": "Dashboard"}]
    dashboardController.showView("Dashboard", 0);
  });

  it('should call showView bills', function() {
    dashboardController = createController();
    dashboardController.showView("bills", 0);
  });

  it('should call showView offerStore', function() {
    dashboardController = createController();
    dashboardController.showView("offerStore", 0);
  });

  it('should call showNavigationList', function() {
    dashboardController = createController();
    dashboardController.showNavigationList();
  });

  it('should call hideNavigationList', function() {
    dashboardController = createController();
    dashboardController.hideNavigationList();
  });

  it("should catch the broadcasted event", function() {
    dashboardController = createController();
    expect($rootScope.$emit.toHaveBeenCalledWith("setSelectedViewOn", 'bills'));
  }); 
  it("should call showMillerWidgetPopup", function() {
    dashboardController = createController();
    dashboardController.showMillerWidgetPopup();
  }); 
  it("should call showChargesDetail ", function() {
    dashboardController = createController();
    dashboardController.showChargesDetail();
  });
  it("should call getSelectedInterval ", function() {
    dashboardController = createController();
    dashboardController.hardClosedIntervalsList = [{id: 1}];
    dashboardController.accountIntervals = [{id: 1}];
    dashboardController.getSelectedInterval();
  });
  it("should call renderDashboardView ", function() {
    dashboardController = createController();
    dashboardController.barNavigation = false;
    dashboardController.index = 0;
    dashboardController.viewConfigSettings = widgets;
    dashboardController.renderDashboardView();
  });
  it("should call renderDashboardView ecb-account-info", function() {
    dashboardController = createController();
    dashboardController.viewConfigSettings = [{"widgetName": "ecb-account-info", "visible": true}];
    dashboardController.renderDashboardView();
  });
  it("should call renderDashboardView ecb-account-settings", function() {
    dashboardController = createController();
    dashboardController.viewConfigSettings = [{"widgetName": "ecb-account-settings", "visible": true}];
    dashboardController.renderDashboardView();
  });
  it("should call renderDashboardView widgetname array", function() {
    dashboardController = createController();
    dashboardController.viewConfigSettings = [{"widgetName": ["ecb-account-settings", "ecb-account-info"], "visible": true}];
    dashboardController.renderDashboardView();
  });
  it("should call checkBillAdjustmentPopup ", function() {
    dashboardController = createController();
    dashboardController.checkBillAdjustmentPopup({id: 1}, {id: 1});
  });
  it("should call checkBillAdjustmentPopupMe ", function() {
    dashboardController = createController();
    dashboardController.showBillAdjustmentPopup = true;
    dashboardController.checkBillAdjustmentPopupMe({id: 1}, {id: 1});
  });
  it("should call setToDefFormat ", function() {
    dashboardController = createController();
    dashboardController.setToDefFormat("11/11/2011");
  });
  it("should call updateEndDate ", function() {
    dashboardController = createController();
    dashboardController.updateEndDate();
  });
  it("should call configProvider ecbBillingActivity and attribute futureAttributeName", function() {
    dashboardController = createController();
    dashboardController.configProvider.get('ecbBillingActivity', 'futureAttributeName');
  });
  it("should call configProvider ecbBillingActivity and attribute accountId", function() {
    dashboardController = createController();
    dashboardController.configProvider.get('ecbBillingActivity', 'accountId');
  });
  it("should call configProvider ecbBillingActivity and attribute currency", function() {
    dashboardController = createController();
    dashboardController.configProvider.get('ecbBillingActivity', 'currency');
  });
  it("should call configProvider default and attribute default", function() {
    dashboardController = createController();
    dashboardController.configProvider.get('default', 'default');
  });
  
});
