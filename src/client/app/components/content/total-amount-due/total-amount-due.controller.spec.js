describe('totalAmountDueController', function() {
  var expect = chai.expect,
    totalAmountDueController,
    amountDueService,
    accountService,
    getCurrency,
    $rootScope,
    $controller,
    $scope,
    duePaymentResponse = mockData.billAmount().duePayment,
    paymentMethodsResponse = mockData.payment().paymentMethods,
    currencyJsonResponse = mockData.currency().JSON,
    invoice = mockData.invoice().invoiceList,
    langData = mockData.localStorageData(),
    paymentMethodsService,
    getPayment,
    paymentSetupModalService,
    getAutoPay,
    createController,
    payService,
    translatorHelper,
    localStorageService,
    moment,
    timeout,
    filter,
    document,
    window,
    sce,
    authenticationService,
    http,
    paymentsHistoryJson = mockData.billAmount().paymentsHistoryJson,
    paymentsHistory = mockData.billAmount().paymentsHistory,
    getInvoice;

  beforeEach(function() {
    module('app.total-amount-due');
  });

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _amountDueService_,
    _accountService_,
    _payService_,
    _paymentMethodsService_,
    _translatorHelper_,
    _paymentSetupModalService_,
    _$moment_,
    _localStorageService_,
    _authenticationService_,
    _$timeout_,
    _$filter_,
    _utilityService_,
    _$document_,
    _$window_,
    _$sce_,
    _$http_) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    amountDueService = _amountDueService_;
    accountService = _accountService_;
    payService = _payService_;
    paymentMethodsService = _paymentMethodsService_;
    translatorHelper = _translatorHelper_;
    paymentSetupModalService = _paymentSetupModalService_;
    moment = _$moment_;
    localStorageService = _localStorageService_;
    authenticationService = _authenticationService_;
    timeout = _$timeout_;
    filter = _$filter_;
    utilityService = _utilityService_;
    document = _$document_;
    window = _$window_;
    sce = _$sce_;
    http = _$http_;

    sandbox = sinon.sandbox.create();
    sandbox.stub(localStorageService, 'get', function() {
      return langData;
    });

     getDuePayment = sinon.stub(amountDueService, 'getDuePayment');

    getUtilityService = sinon.stub(utilityService, 'getCurrency');
    getUtilityService.returnsPromise().resolves(currencyJsonResponse);

    getPaymentsHistoryJson = sinon.stub(utilityService, 'getResponseConfigJson');

    getPaymentStatus = sinon.stub(amountDueService, 'getPaymentStatus');

    getPayment = sinon.stub(paymentMethodsService, 'getPayment');

    getAutoPay = sinon.stub(paymentSetupModalService, 'getAutoPay'); 
    getInvoice = sinon.stub(amountDueService, 'getInvoices'); 

    createController = function() {
      return $controller('totalAmountDueController', {
        '$scope': $scope
      });
    }

  }));

  afterEach(function() {
    sinon.restore(amountDueService.getDuePayment);
    sinon.restore(amountDueService.getPaymentStatus);
    sinon.restore(paymentMethodsService.getPayment);
    sinon.restore(paymentSetupModalService.getAutoPay);
    sinon.restore(utilityService.getCurrency);
    sinon.restore(utilityService.getResponseConfigJson); 
  });


  it('totalAmountDueController should be defined', function () {
    totalAmountDueController = createController();
    expect(totalAmountDueController).to.exist;
  });

  it('totalAmountDueController should call getPaymentStatus', function () {
    totalAmountDueController = createController();
    totalAmountDueController.paymentHistory = [];
    getPaymentStatus.returnsPromise().resolves(paymentMethodsResponse);
    totalAmountDueController.addInvoiceNoAndAmountCols([{"invoices": {"InvoiceString": 'p', "ClosedAmt": 100}}]);
    totalAmountDueController.getPaymentStatus({"isColumnDataList": true});
  });
  it('totalAmountDueController should call getPaymentStatus reject', function () {
    totalAmountDueController = createController();
    getPaymentStatus.returnsPromise().rejects({});
    totalAmountDueController.getPaymentStatus();
  });
  it('totalAmountDueController should call filterByStatus pending', function () {
    totalAmountDueController = createController();
    totalAmountDueController.filterByStatus({"status": "PENDING"});
  });
  it('totalAmountDueController should call filterByStatus success', function () {
    totalAmountDueController = createController();
    totalAmountDueController.filterByStatus({"status": "SUCCESS"});
  });
  it('totalAmountDueController should call activate', function () {
    totalAmountDueController = createController();
    getDuePayment.returnsPromise().resolves(duePaymentResponse);
    getPayment.returnsPromise().resolves(paymentMethodsResponse);
    getAutoPay.returnsPromise().resolves(paymentMethodsResponse);
    getPaymentsHistoryJson.returnsPromise().resolves(paymentsHistoryJson);
    totalAmountDueController.getPaymentsHistoryJson();
    totalAmountDueController.activate();
  });

  it('totalAmountDueController should call showInvoicePastDue', function () {
    totalAmountDueController = createController();
    getInvoice.returnsPromise().resolves(invoice);
    totalAmountDueController.showInvoicePastDue();
  });
  
  it('totalAmountDueController should call getPaymentStatusFilters', function () {
    totalAmountDueController = createController();
    totalAmountDueController.filterResult = [];
    totalAmountDueController.getPaymentStatusFilters();
  });
  it('totalAmountDueController should call setOrUpdatePaymentsHistoryGridData', function () {
    totalAmountDueController = createController();
    totalAmountDueController.setOrUpdatePaymentsHistoryGridData();
  });
  it('totalAmountDueController should call showPaymentHistoryPopup', function () {
    totalAmountDueController = createController();
    totalAmountDueController.showPaymentHistoryPopup({});
  });
  it('totalAmountDueController should call positionElement', function () {
    totalAmountDueController = createController();
    totalAmountDueController.positionElement(21, 32);
  });
  it('totalAmountDueController should call setCardLayOutDetails', function () {
    totalAmountDueController = createController();
    totalAmountDueController.setCardLayOutDetails();
  });
  it('totalAmountDueController should call showPaymentsHistoryExpandedView', function () {
    totalAmountDueController = createController();
    totalAmountDueController.adjustmentDetailsArray = [{"name": "keshab"}];
    totalAmountDueController.showPaymentsHistoryExpandedView();
  });
  it('totalAmountDueController should call setbillAdjustmentDataPaymentsHistory', function () {
    totalAmountDueController = createController();
    totalAmountDueController.setbillAdjustmentDataPaymentsHistory({"dataList": [{"aa": 11}]});
  });
  it('totalAmountDueController should call isAllColumnDeselected ', function () {
    totalAmountDueController = createController();
    totalAmountDueController.checkboxSelectionTemp = ["name"];
    totalAmountDueController.isAllColumnDeselected();
  });
  it('totalAmountDueController should call toggleSelectAll', function () {
    totalAmountDueController = createController();
    totalAmountDueController.widgetOpen = true;
    totalAmountDueController.toggleSelectAll(0);
    totalAmountDueController.toggleSelectAll(1);
  });
  it('totalAmountDueController should call isPaymentsReceived', function () {
    totalAmountDueController = createController();
    totalAmountDueController.isPaymentsReceived();
  });
  it('totalAmountDueController should call isPaymentsHistory', function () {
    totalAmountDueController = createController();
    totalAmountDueController.isPaymentsHistory();
  });
  it('totalAmountDueController should call paymentsHistoryExpandedStateClose', function () {
    totalAmountDueController = createController();
    totalAmountDueController.paymentsHistoryExpandedStateClose();
  });
  it('totalAmountDueController should call getPaymentsHistoryActiveViewStyle', function () {
    totalAmountDueController = createController();
    totalAmountDueController.getPaymentsHistoryActiveViewStyle('card');
  });
  it('totalAmountDueController should call getPaymentsHistoryHeaderKey', function () {
    totalAmountDueController = createController();
    totalAmountDueController.getPaymentsHistoryHeaderKey();
  });
  it('totalAmountDueController should call getPaymentsHistoryColumnDefinition', function () {
    totalAmountDueController = createController();
    totalAmountDueController.displayablePaymentsHistoryHeader = ["Action"];
    totalAmountDueController.getPaymentsHistoryColumnDefinition();
  }); 
  it('totalAmountDueController should call statusGridFilter', function () {
    totalAmountDueController = createController();
    totalAmountDueController.statusGridFilter();
  }); 
  it('totalAmountDueController should call showPaymentsHistoryTabularCardView', function () {
    totalAmountDueController = createController();
    totalAmountDueController.showPaymentsHistoryTabularCardView('card');
    totalAmountDueController.showPaymentsHistoryTabularCardView('table');
  }); 
  it('totalAmountDueController should call removeInvoicesHeader', function () {
    totalAmountDueController = createController();
    totalAmountDueController.displayablePaymentsHistoryHeader = ["Action"];
    totalAmountDueController.removeInvoicesHeader();
  });  
  it('totalAmountDueController should call showMidLine', function () {
    totalAmountDueController = createController();
    totalAmountDueController.showMidLine();
  });
  it('totalAmountDueController should call toggleFreezingColumns', function () {
    totalAmountDueController = createController();
    totalAmountDueController.toggleFreezingColumns('name', ['name']);
    totalAmountDueController.toggleFreezingColumns('name', null);
    totalAmountDueController.freezeColumnsTemp = ['dispName'];
    totalAmountDueController.toggleFreezingColumns('dispName', null);
  });
  it('totalAmountDueController should call showPaymentsHistorySettings', function () {
    totalAmountDueController = createController();
    totalAmountDueController.showPaymentsHistorySettings();
  });
  it('totalAmountDueController should call isPaymentsHistoryCardView ', function () {
    totalAmountDueController = createController();
    totalAmountDueController.isPaymentsHistoryCardView();
  });
  it('totalAmountDueController should call isPaymentsHistoryExpandCardView ', function () {
    totalAmountDueController = createController();
    totalAmountDueController.isPaymentsHistoryExpandCardView();
  });
  it('totalAmountDueController should call isPaymentsHistoryExpandTabularView', function () {
    totalAmountDueController = createController();
    totalAmountDueController.isPaymentsHistoryExpandTabularView();
  });
  it('totalAmountDueController should call toggleHeaderSelection', function () {
    totalAmountDueController = createController();
    totalAmountDueController.checkboxSelectionTemp = ['name'];
    totalAmountDueController.toggleHeaderSelection('name');
  });
  it('totalAmountDueController should call getSortByColumn', function () {
    totalAmountDueController = createController();
    totalAmountDueController.getSortByColumn('name');
  });
  it('totalAmountDueController should call removeinvoiceCols ', function () {
    totalAmountDueController = createController();
    totalAmountDueController.removeinvoiceCols('name');
  });
  it('totalAmountDueController should call getCurrencySign ', function () {
    totalAmountDueController = createController();
    totalAmountDueController.getCurrencySign('USD');
  });
  it('totalAmountDueController should call currencyFormatter', function () {
    totalAmountDueController = createController();
    totalAmountDueController.currencyFormatter();
  });
  it('totalAmountDueController should call showHideBillPopup', function () {
    totalAmountDueController = createController();
    totalAmountDueController.showHideBillPopup([{"key": "name"}], {});
  });
  it('totalAmountDueController should call getDateFormatByLang', function () {
    totalAmountDueController = createController();
    totalAmountDueController.getDateFormatByLang();
  });
  it('totalAmountDueController should call setTabularView true', function () {
    totalAmountDueController = createController();
    totalAmountDueController.getDateFormatByLang(true);
  });
  it('totalAmountDueController should call setTabularView false', function () {
    totalAmountDueController = createController();
    totalAmountDueController.getDateFormatByLang();
  });
  it('totalAmountDueController should call togglePaymentsHistoryTabularViewSettings ', function () {
    totalAmountDueController = createController();
    totalAmountDueController.togglePaymentsHistoryTabularViewSettings();
  });
  it('totalAmountDueController should call setCardIndex', function () {
    totalAmountDueController = createController();
    totalAmountDueController.setCardIndex (1);
  });
  it('totalAmountDueController should call unFreezeColumnsList', function () {
    totalAmountDueController = createController();
    totalAmountDueController.unFreezeColumnsList(['name']);
  });
   
});
