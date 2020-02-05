describe('offerChargeSummaryController', function() {
  var expect = chai.expect,
    offerChargeSummaryController,
    $rootScope,
    $controller,
    $scope,
    offerChargeService,
    filter,
    translatorHelper,
    window,
    timeout,
    moment,
    utilityService,
    document,
    attrs,
    logger,
    localStorageService,
    ecbModalService,
    userDetailsResponse = mockData.billing().reportData,
    offerchargeXmlData = mockData.billing().offerchargeXmlData,
    idInterval = '123456',
    createController;

  beforeEach(function() {
    module('app.offer-charge-summary');
     module.sharedInjector();
  });

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _offerChargeService_,
    _$filter_,
    _translatorHelper_,
    _$window_,
    _$timeout_,
    _$moment_,
    _utilityService_,
    _$document_,
    _$attrs_,
    _logger_,
    _localStorageService_,
    _ecbModalService_) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    offerChargeService = _offerChargeService_;
    filter = _$filter_;
    translatorHelper = _translatorHelper_;
    $window = _$window_;
    $timeout = _$timeout_;
    $moment = _$moment_;
    utilityService = _utilityService_;
    $document = _$document_;
    attrs = _$attrs_.new();
    logger = _logger_.new();
    localStorageService = _localStorageService_;
    ecbModalService = _ecbModalService_;

    

    /* userDetails = sinon.stub(offerChargeService, 'userDetails');
    userDetails.returnsPromise().resolves(userDetailsResponse);

    exportCharges = sinon.stub(offerChargeService, 'exportCharges');
    exportCharges.returnsPromise().resolves(userDetailsResponse);

    productViewDetails = sinon.stub(offerChargeService, 'productViewDetails');
    productViewDetails.returnsPromise().resolves(offerchargeXmlData); */

    createController = function() {
      return $controller('offerChargeSummaryController', {
        '$scope': $scope,
        '$attrs': attrs,
        'logger': logger
      });
    }

  }));

  afterEach(function() {
   // sinon.restore(offerChargeService.userDetails);
  });

  /* it('should resolve productViewDetails', function() {
    productViewDetails.returnsPromise().resolves(offerchargeXmlData);
    createController();
  });

  it('should resolve exportCharges', function() {
    exportCharges.returnsPromise().resolves(userDetailsResponse);
    createController();
  }); */

  it('offerChargeSummaryController should be defined', function() {
    offerChargeSummaryController = createController();
    expect(offerChargeSummaryController).to.exist;
    /* $scope.$emit('show_filter_intervals', '123', '2345'); */
  });

  /* it('should call toggleOfferCardState', function() {
    offerChargeSummaryController.toggleOfferCardState();
  });

  it('should call closeOfferViewAll', function() {
    offerChargeSummaryController.closeOfferViewAll();
  });

  it('should call back', function() {
    offerChargeSummaryController.back();
  });

  it('should call nav', function() {
    offerChargeSummaryController.nav(389);
  });

  it('should call elementLoad', function() {
    offerChargeSummaryController.elementLoad('1', '1', '1', '1');
  });

  it('should call expandedView', function() {
    offerChargeSummaryController.expandedView('1', 'name');
  });

  it('should call showCompleteDetails with limit Infinity', function() {
    offerChargeSummaryController.showCompleteDetails({ limit: Infinity });
  });

  it('should call showCompleteDetails', function() {
    offerChargeSummaryController.showCompleteDetails({ limit: '' });
  });

  it('should call isProductOfferDataExpandState', function() {
    offerChargeSummaryController.isProductOfferDataExpandState();
  });

  it('should call setGridOptions', function() {
    offerChargeSummaryController.setGridOptions();
  });

  it('should call showCardView', function() {
    offerChargeSummaryController.showCardView();
  });

  it('should call showTabularView ', function() {
    offerChargeSummaryController.showTabularView ();
  });

  it('should call isExpandCardView ', function() {
    offerChargeSummaryController.isExpandCardView ();
  });

  it('should call toggleTabularViewSettings', function() {
    offerChargeSummaryController.toggleTabularViewSettings();
  });

  it('should call isSettings', function() {
    offerChargeSummaryController.isSettings();
  });

  it('should call isExpandTabularView', function() {
    offerChargeSummaryController.isExpandTabularView();
  });

  it('should call toggleHeaderSelection', function() {
    offerChargeSummaryController.toggleHeaderSelection();
  });

  it('should call toggleSelectAll', function() {
    offerChargeSummaryController.toggleSelectAll();
  });

  it('should call applyCancelSettings', function() {
    offerChargeSummaryController.applyCancelSettings(true);
    offerChargeSummaryController.applyCancelSettings(false);
  });

  it('should call getActiveViewStyle', function() {
    offerChargeSummaryController.getActiveViewStyle('card');
  });

  it('should call getGridHeight', function() {
    var domValues = '<div class="ecb-offerChargeCardExpanded" style="height:90px"></div>';
    document.body.insertAdjacentHTML('afterbegin', domValues);
    offerChargeSummaryController.getGridHeight();
  });

  it('should call isCheckboxSelection', function() {
    offerChargeSummaryController.isCheckboxSelection('xxxx');
  });

  it('should call checkProductOfferingLength', function() {
    offerChargeSummaryController.checkProductOfferingLength();
  });

  it('should call getXmlJson', function() {
    offerChargeSummaryController = createController();
    offerChargeSummaryController.getXmlJson('abc','12');
  });

  it('should call getLocalizationValueForKey', function() {
    offerChargeSummaryController.getLocalizationValueForKey('123');
  });

  it('should call cardLayoutDisplay', function() {
    offerChargeSummaryController.cardLayoutDisplay('1', '12', '123');
  });

  it('should call applyCancelSettings', function() {
    offerChargeSummaryController.applyCancelSettings(true);
  });

  it('should call getLocaleHeaderName', function() {
    offerChargeSummaryController.getLocaleHeaderName('abc');
  });

  it('should call handleChargeDetailsError', function() {
    offerChargeSummaryController.handleChargeDetailsError();
  });

  it('should call showChargesTabularCardView', function() {
    offerChargeSummaryController.showChargesTabularCardView('card');
    offerChargeSummaryController.showChargesTabularCardView('table');
  });

  it('should call getSettingsHeight', function() {    
    offerChargeSummaryController.getSettingsHeight();
  });

  it('should call setCardIndex', function() {    
    offerChargeSummaryController.setCardIndex(1);
  }); */
});
