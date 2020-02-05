describe('filterDataController', function() {
  var expect = chai.expect,
    filterDataController,
    $rootScope,
    $controller,
    $scope,
    createController,
    filterService,
    getFilter,
    logger,
    moment,
    localStorageService,
    utilityService,
    dateFilter,
    timeout,
    translatorHelper
    langData = mockData.localStorageData().i18n,
    siteSettingsResponse = mockData.localStorageData().settings,
    SetSelectedCards = ['x', 'y', 'z'],
    intervalsResponse = mockData.account().dataIintervals;

  beforeEach(function() {
    module('app.filter');
  });

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _filterService_,
    _logger_,
    _$moment_,
    _localStorageService_,
    _utilityService_,
    _dateFilter_,
    _$timeout_,
    _translatorHelper_) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    filterService = _filterService_;
    logger = _logger_;
    moment = _$moment_;
    localStorageService = _localStorageService_;
    utilityService = _utilityService_;
    dateFilter = _dateFilter_;
    timeout = _$timeout_;
    translatorHelper = _translatorHelper_;

    getFilter = sinon.stub(filterService, 'getFilter');

    getExtConfigFile = sinon.stub(utilityService, 'getExtConfigFile');
    getExtConfigFile.returnsPromise().resolves(intervalsResponse);

    getOrSetSelectedCards = sinon.stub(utilityService, 'getOrSetSelectedCards');
    getOrSetSelectedCards.returnsPromise().resolves(SetSelectedCards);

    sandbox = sinon.sandbox.create();
    sandbox.stub(localStorageService, 'get', function () {
      return langData;
    });
    sandbox1 = sinon.sandbox.create();
    sandbox1.stub(utilityService, 'getNameSpace', function () {
      return siteSettingsResponse;
    });

    sandbox2 = sinon.sandbox.create();
    sandbox2.stub(localStorageService, 'set');

    createController = function() {
      return $controller('filterDataController', {
        '$scope': $scope,
        selecetdCards: ['x', 'y'],
      });
    }

  }));

  afterEach(function () {
    sandbox.restore();
    sandbox1.restore();
    sandbox2.restore();
  });

  it('filterDataController should be defined', function() {
    filterDataController = createController();
    expect(filterDataController).to.exist;
  });

  it('filterDataController should call getDocumentDetails method', function () {
    filterDataController = createController();
    filterDataController.ecbARCheck =  false;
    filterDataController.documents = [{"name": "keshab"}];
    filterDataController.getDocumentDetails();
  });

  it('filterDataController should call toggleCardsSelection method', function () {
    filterDataController = createController();
    filterDataController.selecetdCards = ['x', 'y'];
    filterDataController.toggleCardsSelection('x');
  });

  it('filterDataController should call checkboxSelection method', function () {
    filterDataController = createController();
    filterDataController.selecetdCards = ['x', 'y'];
    filterDataController.checkboxSelection('x');
  });

  it('filterDataController should call checkFilterStatus method', function () {
    filterDataController = createController();
    filterDataController.checkFilterStatus();
  });

  it('filterDataController should call toggleFilterSelection method', function () {
    filterDataController = createController();
    filterDataController.toggleFilterSelection();
  });

  it('filterDataController should call getSelectedInterval method', function () {
    filterDataController = createController();
    filterDataController.accountIntervals = intervalsResponse;
    filterDataController.getSelectedInterval();
  });

  it('filterDataController should call onDateRangeChanged method', function () {
    filterDataController = createController();
    filterDataController.filterFields = ['ff'];
    filterDataController.widgetFilter = {statusFilter: true, filterKeys: ['ff']};
    filterDataController.billPeriodTypeSelectedIndex = 1;
    filterDataController.onDateRangeChanged();
  });
  it('filterDataController should call onDateRangeChanged billPeriodTypeSelectedIndex 2', function () {
    filterDataController = createController();
    filterDataController.billPeriodTypeSelectedIndex = 2;
    filterDataController.onDateRangeChanged({"startDate": "1/1/1999", "endDate": "1/1/1999"});
  });

  it('filterDataController should call restoreInterval method', function () {
    filterDataController = createController();
    filterDataController.index = 1;
    filterDataController.restoreInterval();
  });

  it('filterDataController should call changeDropdown method', function () {
    filterDataController = createController();
    filterDataController.changeDropdown();
  });

  it('filterDataController should call setChoiceIndex method', function () {
    filterDataController = createController();
    filterDataController.setChoiceIndex(1);
  });

  it('filterDataController should call isCalendarView method', function () {
    filterDataController = createController();
    filterDataController.isCalendarView();
  });

  it('filterDataController should call isCalendarOption method', function () {
    filterDataController = createController();
    filterDataController.isCalendarOption();
  });

  it('filterDataController should call changeBillPeriodType method', function () {
    filterDataController = createController();
    filterDataController.intervalData = intervalsResponse;
    filterDataController.documents = [{"dateRangeDisplay": true}];
    filterDataController.changeBillPeriodType(1);
  });

  it('filterDataController should call setInterValData method', function () {
    filterDataController = createController();
    filterDataController.setInterValData(null, {"startDate": "1/1/1999", "endDate": "1/1/1999"}, true);
    filterDataController.setInterValData({"startDate": "1/1/1999", "endDate": "1/1/1999"}, {"startDate": "1/1/1999", "endDate": "1/1/1999"}, true);
  });

  it('filterDataController should call isDateRange method', function () {
    filterDataController = createController();
    filterDataController.isDateRange();
  });

  it('filterDataController should call getTodayDate method', function () {
    filterDataController = createController();
    filterDataController.getTodayDate();
  });

  it('filterDataController should call getDateFormatByLang method', function () {
    filterDataController = createController();
    filterDataController.getDateFormatByLang();
  });

  it('filterDataController should call selectedSortKey method', function () {
    filterDataController = createController();
    filterDataController.selectedSortKey();
  });

  it('filterDataController should call getSortKeyDisplayName method', function () {
    filterDataController = createController();
    filterDataController.widgetFilter.displayNames = ['x', 'y']
    filterDataController.getSortKeyDisplayName();
  });

  it('filterDataController should call setSortKey method', function () {
    filterDataController = createController();
    filterDataController.setSortKey();
  });

  it('filterDataController should call isDateType method', function () {
    filterDataController = createController();
    filterDataController.isDateType('date');
    filterDataController.isDateType('datetime');
    filterDataController.isDateType('timestamp');
  });

  it('filterDataController should call selectDate method', function () {
    filterDataController = createController();
    filterDataController.selectDate('xyz');
  });
  it('filterDataController should call buildIndexMap', function () {
    filterDataController = createController();
    filterDataController.buildIndexMap(['xyz']);
  });

  it('filterDataController should call formatBillingPeriodInterval method', function () {
    filterDataController = createController();
    filterDataController.formatBillingPeriodInterval({"startDate": "1/1/1999", "endDate": "1/1/1999"});
  });

  it('filterDataController should call getFilterData method', function () {
    filterDataController = createController();
    filterDataController.hardClosedIntervals = intervalsResponse;
    getFilter.returnsPromise().resolves(intervalsResponse);
    filterDataController.getFilterData();
  });

  it('filterDataController should call getDocumentDetails', function () {
    filterDataController = createController();
    filterDataController.ecbARCheck = false;
    filterDataController.getDocumentDetails();
  });

  it('filterDataController should call selectDate', function () {
    filterDataController = createController();
    filterDataController.selectDate('s');
  });

  it('filterDataController should call processCards', function () {
    filterDataController = createController();
    filterDataController.processCards();
  });

});
