describe('paymentsCreditsAdjustmentsController', function() {
  var expect = chai.expect,
    paymentsCreditsAdjustmentsController,
    $rootScope,
    $controller,
    $scope,
    createController,
    paymentsCreditsAdjustmentsService,
    paymentsReceivedModalService,
    getResponseConfigJson,
    accountService,
    logger,
    filter,
    timeout,
    localStorageService,
    window,
    utilityService,
    getPayCreditAdjust,
    document,
    translatorHelper,
    langData = mockData.localStorageData().i18n,
    siteSettingsResponse = mockData.localStorageData().settings,
    //authData = mockData.authentication().userInfo,
    invoiceReportResponse = mockData.invoice().invoiceReport,
    currencyJsonResponse = mockData.currency().JSON;
    adjustmentDetails = mockData.adjustmentDetails;

  beforeEach(function() {
    module('app.payments-credits-adjustments');
  });

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _paymentsCreditsAdjustmentsService_,
    _paymentsReceivedModalService_,
    _accountService_,
    _logger_,
    _$filter_,
    _$timeout_,
    _localStorageService_,
    _$window_,
    _utilityService_,
    _$document_,
    _translatorHelper_) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    paymentsCreditsAdjustmentsService = _paymentsCreditsAdjustmentsService_;
    paymentsReceivedModalService = _paymentsReceivedModalService_;
    accountService = _accountService_;
    logger = _logger_;
    filter = _$filter_;
    timeout = _$timeout_;
    localStorageService = _localStorageService_;
    window = _$window_;
    utilityService = _utilityService_;
    document = _$document_;
    translatorHelper = _translatorHelper_;

    getPayCreditAdjust = sinon.stub(paymentsCreditsAdjustmentsService, 'getPayCreditAdjust');
    getPayments = sinon.stub(paymentsReceivedModalService, 'getPayments');
    exportPostBillAdjustments = sinon.stub(paymentsCreditsAdjustmentsService, 'exportPostBillAdjustments');
    getResponseConfigJson = sinon.stub(utilityService, 'getResponseConfigJson');

    sandbox = sinon.sandbox.create();
    sandbox.stub(localStorageService, 'get', function () {
      return langData;
    });
    sandbox1 = sinon.sandbox.create();
    sandbox1.stub(utilityService, 'getNameSpace', function () {
      return siteSettingsResponse;
    });
    /* sandbox2 = sinon.sandbox.create();
    sandbox2.stub(localStorageService, 'get', function () {
      return authData;
    }); */

    createController = function() {
      return $controller('paymentsCreditsAdjustmentsController', {
        '$scope': $scope,
      });
    }

    paymentsCreditsAdjustmentsController = $controller('paymentsCreditsAdjustmentsController', {
      '$scope': $scope,
    });
  }));

  afterEach(function () {
    sinon.restore(paymentsCreditsAdjustmentsService.getPayCreditAdjust);
    sinon.restore(paymentsCreditsAdjustmentsService.exportPostBillAdjustments);
    sinon.restore(paymentsReceivedModalService.getPayments);
    sandbox.restore();
    sandbox1.restore();
    //sandbox2.restore();
  });

  it('paymentsCreditsAdjustmentsController should be defined', function () {
    expect(paymentsCreditsAdjustmentsController).to.exist;
  });

  it('paymentsCreditsAdjustmentsController should call initiateWidgetServices method', function () {
    paymentsCreditsAdjustmentsController.initiateWidgetServices();
  });

  it('paymentsCreditsAdjustmentsController should call setTabularView method', function () {
    paymentsCreditsAdjustmentsController.setTabularView();
  });

  it('paymentsCreditsAdjustmentsController should call getAdjustmentDetailsHeaderKey method', function () {
    paymentsCreditsAdjustmentsController.getAdjustmentDetailsHeaderKey('key');
  });

  it('paymentsCreditsAdjustmentsController should call resetAdjustments method', function () {
    paymentsCreditsAdjustmentsController.resetAdjustments();
  });


  it('paymentsCreditsAdjustmentsController should call getPaymentReceivedHeaderKey method', function () {
    paymentsCreditsAdjustmentsController.getPaymentReceivedHeaderKey();
  });

  it('paymentsCreditsAdjustmentsController should call resetPaymentData method', function () {
    paymentsCreditsAdjustmentsController.resetPaymentData();
  });

  it('paymentsCreditsAdjustmentsController should call getPcaActiveViewStyle method', function () {
    paymentsCreditsAdjustmentsController.getPcaActiveViewStyle();
  });

  it('paymentsCreditsAdjustmentsController should call togglePcaTabularViewSettings method', function () {
    paymentsCreditsAdjustmentsController.togglePcaTabularViewSettings();
  });

  it('paymentsCreditsAdjustmentsController should call isPcaSettings method', function () {
    paymentsCreditsAdjustmentsController.isPcaSettings();
  });


  it('paymentsCreditsAdjustmentsController should call isPcaExpandCardView method', function () {
    paymentsCreditsAdjustmentsController.isPcaExpandCardView();
  });

  it('paymentsCreditsAdjustmentsController should call isPaymentsReceivedExpandCardView method', function () {
    paymentsCreditsAdjustmentsController.isPaymentsReceivedExpandCardView();
  });

  it('paymentsCreditsAdjustmentsController should call isPcaExpandTabularView method', function () {
    paymentsCreditsAdjustmentsController.isPcaExpandTabularView();
  });

  it('paymentsCreditsAdjustmentsController should call isPaymentsReceivedExpandTabularView method', function () {
    paymentsCreditsAdjustmentsController.isPaymentsReceivedExpandTabularView();
  });

  it('paymentsCreditsAdjustmentsController should call togglePcaHeaderSelection method', function () {
    paymentsCreditsAdjustmentsController.togglePcaHeaderSelection();
  });

  it('should call togglePcaSelectAll method', function () {
    paymentsCreditsAdjustmentsController.widgetOpen = true;
    paymentsCreditsAdjustmentsController.pcaWidgetOpen = true;
    paymentsCreditsAdjustmentsController.togglePcaSelectAll(true);
  });

  it('should call togglePcaSelectAll method widget collapsed', function () {
    paymentsCreditsAdjustmentsController.widgetOpen = true;
    paymentsCreditsAdjustmentsController.pcaWidgetOpen = false;
    paymentsCreditsAdjustmentsController.togglePcaSelectAll(true);
  });

  it('paymentsCreditsAdjustmentsController should call isAllColumnDeselected method', function () {
    paymentsCreditsAdjustmentsController.isAllColumnDeselected();
  });

  it('paymentsCreditsAdjustmentsController should call applyPcaCancelSettings method', function () {
    paymentsCreditsAdjustmentsController.pcaWidgetOpen = true;
    paymentsCreditsAdjustmentsController.applyPcaCancelSettings(true);
  });

  it('paymentsCreditsAdjustmentsController should call setPcaGridOptions method', function () {
    paymentsCreditsAdjustmentsController.setPcaGridOptions();
  });

  it('paymentsCreditsAdjustmentsController should call setOrUpdatePcaGridData method', function () {
    paymentsCreditsAdjustmentsController.setOrUpdatePcaGridData();
  });


  it('paymentsCreditsAdjustmentsController should call setPaymentsReceivedGridOptions method', function () {
    paymentsCreditsAdjustmentsController.setPaymentsReceivedGridOptions();
  });

  it('paymentsCreditsAdjustmentsController should call setPaymentsReceivedGridData method', function () {
    paymentsCreditsAdjustmentsController.setPaymentsReceivedGridData();
  });

  it('paymentsCreditsAdjustmentsController should call viewAllBodyHeight method', function () {
    paymentsCreditsAdjustmentsController.viewAllBodyHeight();
  });

  it('paymentsCreditsAdjustmentsController should call getViewAllBodyHeight method', function () {
    paymentsCreditsAdjustmentsController.getViewAllBodyHeight();
  });


  it('paymentsCreditsAdjustmentsController should call getSettingsHeight method', function () {
    paymentsCreditsAdjustmentsController.getSettingsHeight();
  });

  it('paymentsCreditsAdjustmentsController should call postBillWidgetOpen method', function () {
    paymentsCreditsAdjustmentsController.postBillWidgetOpen();
  });

  it('paymentsCreditsAdjustmentsController should call isPaymentsReceivedWidgetOpen method', function () {
    paymentsCreditsAdjustmentsController.isPaymentsReceivedWidgetOpen();
  });

  it('paymentsCreditsAdjustmentsController should call setCardIndex method', function () {
    paymentsCreditsAdjustmentsController.setCardIndex(1);
  });


  it('paymentsCreditsAdjustmentsController should call unFreezeColumnsList method', function () {
    paymentsCreditsAdjustmentsController.unFreezeColumnsList();
  });

  it('paymentsCreditsAdjustmentsController should call showMidLine method', function () {
    paymentsCreditsAdjustmentsController.showMidLine();
  });

  it('paymentsCreditsAdjustmentsController should call toggleFreezingColumns header displayname', function () {
    paymentsCreditsAdjustmentsController = createController();
    paymentsCreditsAdjustmentsController.toggleFreezingColumns('displayname', ["name"]);
  });
  it('paymentsCreditsAdjustmentsController should call toggleFreezingColumns other headers', function () {
    paymentsCreditsAdjustmentsController = createController();
    paymentsCreditsAdjustmentsController.freezeColumnsTemp = ["name"]
    paymentsCreditsAdjustmentsController.toggleFreezingColumns('name', null);
  });
  it('paymentsCreditsAdjustmentsController should call toggleFreezingColumns column not freezed', function () {
    paymentsCreditsAdjustmentsController = createController();
    paymentsCreditsAdjustmentsController.freezeColumnsTemp = ["name"]
    paymentsCreditsAdjustmentsController.toggleFreezingColumns('payyname', null);
  });

  it('paymentsCreditsAdjustmentsController should call getSortByColumn method', function () {
    paymentsCreditsAdjustmentsController.getSortByColumn();
  });

  it('paymentsCreditsAdjustmentsController should call getCurrencySign method', function () {
    paymentsCreditsAdjustmentsController.getCurrencySign();
  });


  it('paymentsCreditsAdjustmentsController should call currencyFormatter method', function () {
    paymentsCreditsAdjustmentsController.currencyFormatter();
  });

  it('paymentsCreditsAdjustmentsController should call showHideBillPopup method', function () {
    paymentsCreditsAdjustmentsController.showHideBillPopup();
  });

  it('paymentsCreditsAdjustmentsController should call showPcaChargesTabularCardView method', function () {
    paymentsCreditsAdjustmentsController.showPcaChargesTabularCardView();
  });

  it('paymentsCreditsAdjustmentsController should call pcaExpandedStateclose method', function () {
    paymentsCreditsAdjustmentsController.pcaExpandedStateclose();
  });


  it('paymentsCreditsAdjustmentsController should call setbillAdjustmentDataPca method', function () {
    paymentsCreditsAdjustmentsController = createController();
    paymentsCreditsAdjustmentsController.setbillAdjustmentDataPca({dataList: [{"name": "keshab"}]});
  });

  it('paymentsCreditsAdjustmentsController should call paymentsCreditAdjustmentData method', function () {
    paymentsCreditsAdjustmentsController.paymentsCreditAdjustmentData();
  });

  it('paymentsCreditsAdjustmentsController should call pcaError method', function () {
    paymentsCreditsAdjustmentsController.pcaError();
  });

  it('paymentsCreditsAdjustmentsController should call pcaFlexdirection method', function () {
    paymentsCreditsAdjustmentsController.pcaFlexdirection();
  });

  it('paymentsCreditsAdjustmentsController should call showPcaChargesSettings method', function () {
    paymentsCreditsAdjustmentsController.showPcaChargesSettings();
  });

  it('paymentsCreditsAdjustmentsController should call paymentsReceivedExpandedView method', function () {
    paymentsCreditsAdjustmentsController.paymentsReceivedExpandedView();
  });

  it('paymentsCreditsAdjustmentsController should call paymentsCreditsAdjustmentsExpandedView method', function () {
    paymentsCreditsAdjustmentsController.adjustmentDetailsArray = [adjustmentDetails];
    paymentsCreditsAdjustmentsController.paymentsCreditsAdjustmentsExpandedView();
  });

  it('paymentsCreditsAdjustmentsController should call handleExportError method', function () {
    paymentsCreditsAdjustmentsController.handleExportError();
  });

  it('paymentsCreditsAdjustmentsController should call showBillAdjustmentPopup method', function () {
    paymentsCreditsAdjustmentsController.exportToCSV = true;
    paymentsCreditsAdjustmentsController.showBillAdjustmentPopup({currentTarget: {}});
  });

  it('paymentsCreditsAdjustmentsController should call positionElement method', function () {
    paymentsCreditsAdjustmentsController.positionElement();
  });

  it('paymentsCreditsAdjustmentsController should call setCardLayOutDetails method', function () {
    paymentsCreditsAdjustmentsController.setCardLayOutDetails();
  });

  it('paymentsCreditsAdjustmentsController should call getAdjustmentDetails method', function () {
    paymentsCreditsAdjustmentsController.getAdjustmentDetails();
  });

  it('paymentsCreditsAdjustmentsController should call processAdjustmentDetails method', function () {
    paymentsCreditsAdjustmentsController.processAdjustmentDetails();
  });

  it('paymentsCreditsAdjustmentsController should call getPaymentReceivedDetails method', function () {
    paymentsCreditsAdjustmentsController.getPaymentReceivedDetails();
  });

  it('paymentsCreditsAdjustmentsController should call setPaymentsReceivedCardLayoutDetails method', function () {
    paymentsCreditsAdjustmentsController.setPaymentsReceivedCardLayoutDetails();
  });

  it('paymentsCreditsAdjustmentsController should call processPaymentReceivedDetails method', function () {
    paymentsCreditsAdjustmentsController.processPaymentReceivedDetails();
  });

  it('paymentsCreditsAdjustmentsController should call showPaymentsReceivedPopup method', function () {
    paymentsCreditsAdjustmentsController.totalPaymentsReceived = 100;
    paymentsCreditsAdjustmentsController.showPaymentsReceivedPopup({currentTarget: {}});
  });

  it('paymentsCreditsAdjustmentsController should call getPayCreditAdjust', function () {
    paymentsCreditsAdjustmentsController = createController();
    getPayCreditAdjust.returnsPromise().resolves(invoiceReportResponse);
    paymentsCreditsAdjustmentsController.getPayCreditAdjust();
  });

  it('paymentsCreditsAdjustmentsController should call getPayCreditAdjust', function () {
    paymentsCreditsAdjustmentsController = createController();
    response = invoiceReportResponse.totalPayment = 100;
    response = invoiceReportResponse.totalpostBillAdjustments = 100;
    getPayCreditAdjust.returnsPromise().resolves(response);
    paymentsCreditsAdjustmentsController.getPayCreditAdjust();
  });

  it('paymentsCreditsAdjustmentsController should reject getPayCreditAdjust', function () {
    paymentsCreditsAdjustmentsController = createController();
    getPayCreditAdjust.returnsPromise().rejects({status: 404});
    paymentsCreditsAdjustmentsController.getPayCreditAdjust();
  });

  it('should getAdjustmentDetails success', function () {
    paymentsCreditsAdjustmentsController = createController();
    getResponseConfigJson.returnsPromise().resolves({data: {columns: { fields: ['name']}}});
    paymentsCreditsAdjustmentsController.getAdjustmentDetails();
  });
  it('should getAdjustmentDetails fail', function () {
    paymentsCreditsAdjustmentsController = createController();
    getResponseConfigJson.returnsPromise().rejects({})
    paymentsCreditsAdjustmentsController.getAdjustmentDetails();
  });

  it('should getPaymentReceivedDetails success', function () {
    paymentsCreditsAdjustmentsController = createController();
    getResponseConfigJson.returnsPromise().resolves({data: {columns: { fields: ['name']}}});
    paymentsCreditsAdjustmentsController.getPaymentReceivedDetails();
  });
  it('should getPaymentReceivedDetails fail', function () {
    paymentsCreditsAdjustmentsController = createController();
    getResponseConfigJson.returnsPromise().rejects({})
    paymentsCreditsAdjustmentsController.getPaymentReceivedDetails();
  });
  
  it('should processAdjustmentDetails success', function () {
    paymentsCreditsAdjustmentsController = createController();
    exportPostBillAdjustments.returnsPromise().resolves({data: {adjustmentDetails: adjustmentDetails}});
    paymentsCreditsAdjustmentsController.processAdjustmentDetails({"isColumnDataList": []});
  });
  it('should processAdjustmentDetails success utility fail', function () {
    paymentsCreditsAdjustmentsController = createController();
    exportPostBillAdjustments.returnsPromise().rejects({status: 405});
    paymentsCreditsAdjustmentsController.processAdjustmentDetails();
  });

  it('processPaymentReceivedDetails should success getPayments', function () {
    paymentsCreditsAdjustmentsController = createController();
    getPayments.returnsPromise().resolves({"payments": [{"id": 1}]});
    paymentsCreditsAdjustmentsController.processPaymentReceivedDetails({"isColumnDataList": []});
  });
  it('processPaymentReceivedDetails should success getPayments without payments', function () {
    paymentsCreditsAdjustmentsController = createController();
    getPayments.returnsPromise().resolves({"payments": [{"id": 1}]});
    paymentsCreditsAdjustmentsController.processPaymentReceivedDetails(null);
  });
  it('processPaymentReceivedDetails should reject getPayments', function () {
    paymentsCreditsAdjustmentsController = createController();
    getPayments.returnsPromise().rejects({});
    paymentsCreditsAdjustmentsController.processPaymentReceivedDetails();
  });
  it('should call togglePcaHeaderSelection method', function () {
    paymentsCreditsAdjustmentsController = createController();
    paymentsCreditsAdjustmentsController.togglePcaHeaderSelection();
  });

  it('should call unFreezeColumnsList method', function () {
    paymentsCreditsAdjustmentsController = createController();
    paymentsCreditsAdjustmentsController.freezeColumns = ["payer"];
    paymentsCreditsAdjustmentsController.unFreezeColumnsList (["name", "amount"]);
  }); 

  it('paymentMethodsController should call isAllColumnDeselected method', function () {
    paymentsCreditsAdjustmentsController = createController();
    paymentsCreditsAdjustmentsController.checkboxSelectionTemp = ["name"];
    paymentsCreditsAdjustmentsController.freezeColumns = ['displayName'];
    paymentsCreditsAdjustmentsController.isAllColumnDeselected();
  });

});
