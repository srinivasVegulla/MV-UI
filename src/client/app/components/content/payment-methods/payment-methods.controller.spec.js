describe('paymentMethodsController', function() {
  var expect = chai.expect,
    paymentMethodsController,
    $rootScope,
    $controller,
    $scope,
    createController,
    paymentMethodsService,
    localStorageService,
    translatorHelper,
    $timeout,
    $sce,
    payService,
    logger,
    $rootScope,
    filter,
    document,
    subscriptionsServices,
    window,
    utilityService,
    getPaymentDetails,
    paymentMethodsResponse = mockData.payment().paymentMethods,
    deletePaymentsResponse = mockData.payment().paymentMethods,
    updatePaymentsResponse = mockData.payment().paymentMethods,
    creditMethodsResponse = mockData.payment().paymentMethods,
    getResponseConfigJson,
    langData = mockData.localStorageData(),
    amountDueService,
    paymentResponse = mockData.payment().paymentResponse;

  beforeEach(function() {
    module('app.payment-methods');
  });

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _paymentMethodsService_,
    _amountDueService_,
    _localStorageService_,
    _translatorHelper_,
    _$timeout_,
    _$sce_,
    _payService_,
    _logger_,
    _$filter_,
    _$document_,
    _$window_,
    _utilityService_) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    paymentMethodsService = _paymentMethodsService_;
    amountDueService = _amountDueService_;
    localStorageService = _localStorageService_;
    translatorHelper = _translatorHelper_;
    timeout = _$timeout_;
    sce = _$sce_;
    payService = _payService_;
    logger = _logger_;
    filter = _$filter_;
    document = _$document_;
    window = _$window_;
    utilityService = _utilityService_;

    sandbox = sinon.sandbox.create();
    sandbox.stub(localStorageService, 'get', function() {
      return langData;
    });

    sinon.spy($scope, "$broadcast");
    sinon.spy($scope, "$emit");

    getDelete = sinon.stub(paymentMethodsService, 'getDelete');

    getPayment = sinon.stub(paymentMethodsService, 'getPayment');

    getUpdate = sinon.stub(paymentMethodsService, 'getUpdate');

    getCredit = sinon.stub(paymentMethodsService, 'getCredit');

    getPaymentDetails = sinon.stub(amountDueService, 'getPayment');

    getResponseConfigJson = sinon.stub(utilityService, 'getResponseConfigJson');

    createController = function() {
      paymentMethodsController = $controller('paymentMethodsController', {
        '$scope': $scope
      });
      paymentMethodsController.paymentMethods = paymentMethodsResponse;
      return paymentMethodsController;
    }
  }));

  afterEach(function() {
    sinon.restore(paymentMethodsService.getPayment);
    sinon.restore(paymentMethodsService.getDelete);
    sinon.restore(paymentMethodsService.getUpdate);
    sinon.restore(paymentMethodsService.getCredit);
    sinon.restore(paymentMethodsService.getPaymentDetails);
  });

  it('paymentMethodsController should be defined', function() {
    paymentMethodsController = createController();
    expect(paymentMethodsController).to.exist;
  });

  it('paymentMethodsController should call setTabularView method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.setTabularView();
  });

  it('paymentMethodsController should call activate', function () {
    paymentMethodsController = createController();
    paymentMethodsController.activate();
  });
  
  it('paymentMethodsController should call getCreditMethods method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.getCreditMethods();
  });

  it('paymentMethodsController should call getUpdateCreditMethods method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.getUpdateCreditMethods();
  });

  it('paymentMethodsController should call getDeleteCreditMethods method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.getDeleteCreditMethods();
  });

  it('paymentMethodsController should call getPaymentDetails method', function () {
    paymentMethodsController = createController();
    getPaymentDetails.payment = {};
    getPaymentDetails.returnsPromise().resolves({});
    paymentMethodsController.getPaymentDetails();
  });

  it('paymentMethodsController should call dismissRemoveErrorBox method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.dismissRemoveErrorBox();
  });

  it('paymentMethodsController should call dismissDeleteErrorBox method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.dismissDeleteErrorBox();
  });

  it('paymentMethodsController should call openPay method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.openPay();
  });

  it('paymentMethodsController should call openAch method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.openAch();
  });

  it('paymentMethodsController should call handleCyberGateError method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.handleCyberGateError();
  });

  it('paymentMethodsController should call resetGridData method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.gridOptions = {};
    paymentMethodsController.resetGridData();
  });

  it('paymentMethodsController should call checkIsACH method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.checkIsACH();
  });

  it('paymentMethodsController should call togglePaymentCardState method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.limit = 2;
    paymentMethodsController.paymentMethodsList = paymentMethodsResponse;
    paymentMethodsController.togglePaymentCardState();
  });

  it('paymentMethodsController should call closePaymentViewAll method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.closePaymentViewAll();
  });

  it('paymentMethodsController should call errorClose method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.paymentMethodsLength = 0;
    paymentMethodsController.errorClose();
  });

  it('paymentMethodsController should call editConfirmPopup method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.editConfirmPopup(0);
  });

  it('paymentMethodsController should call showConfirmationBox method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.paymentMethods = [{"idPaymentInstrument": 1}];
    paymentMethodsController.idPaymentInstrumentr = 1;
    paymentMethodsController.showConfirmationBox(0, 0);
  });

  it('paymentMethodsController should call editPaymentMouseOver method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.editPaymentMouseOver();
  });

  it('paymentMethodsController should call editPaymentMouseLeave method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.editPaymentMouseLeave();
  });

  it('paymentMethodsController should call showTabularView method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.showTabularView();
  });

  it('paymentMethodsController should call showCardView method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.showCardView();
  });

  it('paymentMethodsController should call getActiveViewStyle method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.getActiveViewStyle('card');
  });

  it('paymentMethodsController should call isExpandTabularView method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.isExpandTabularView();
  });

  it('paymentMethodsController should call showPaymentSettings method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.showPaymentSettings();
  });

  it('paymentMethodsController should call isPaymentsSettings method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.isPaymentsSettings();
  });

  it('paymentMethodsController should call applyPaymentsCancelSettings method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.applyPaymentsCancelSettings('card');
  });

  it('paymentMethodsController should call isAllColumnDeselected method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.checkboxSelectionTemp = ["name"];
    paymentMethodsController.freezeColumns = ['displayName'];
    paymentMethodsController.isAllColumnDeselected();
  });

  it('paymentMethodsController should call togglePaymentsSelectAll method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.togglePaymentsSelectAll();
  });

  it('paymentMethodsController should call togglePaymentsTabularViewSettings method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.togglePaymentsTabularViewSettings();
  });

  it('paymentMethodsController should call togglePaymentsHeaderSelection method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.togglePaymentsHeaderSelection();
  });

  it('paymentMethodsController should call unFreezeColumnsList method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.freezeColumns = ["payer"];
    paymentMethodsController.unFreezeColumnsList (["name", "amount"]);
  });

  it('paymentMethodsController should call showMidLine method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.showMidLine();
  });

  it('paymentMethodsController should call paymentHeaderKey method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.paymentHeaderKey();
  });

  it('paymentMethodsController should call processMakePayment method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.processMakePayment(1);
  });

  it('paymentMethodsController should call deletePaymentDefaultMessage method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.deletePaymentDefaultMessage(1);
  });

  it('paymentMethodsController should call getSortByColumn method', function () {
    paymentMethodsController = createController();
    paymentMethodsController.getSortByColumn();
  });

  it('paymentMethodsController should call toggleFreezingColumns header displayname', function () {
    paymentMethodsController = createController();
    paymentMethodsController.toggleFreezingColumns('displayname', ["name"]);
  });
  it('paymentMethodsController should call toggleFreezingColumns other headers', function () {
    paymentMethodsController = createController();
    paymentMethodsController.freezeColumnsTemp = ["name"]
   paymentMethodsController.toggleFreezingColumns('name', null);
  });
  it('paymentMethodsController should call toggleFreezingColumns column not freezed', function () {
    paymentMethodsController = createController();
    paymentMethodsController.freezeColumnsTemp = ["name"]
    paymentMethodsController.toggleFreezingColumns('payyname', null);
  });

  it('should call getCreditMethods method', function () {
    getCredit.returnsPromise().resolves(creditMethodsResponse);
    paymentMethodsController = createController();
    paymentMethodsController.getCreditMethods();
  });

  it('should reject getCreditMethods method with status 500', function () {
    getCredit.returnsPromise().rejects({
      status: 500
    });
    paymentMethodsController = createController();
    paymentMethodsController.getCreditMethods();
  });

  it('should reject getCreditMethods method with status 400', function () {
    getCredit.returnsPromise().rejects({
      status: 400
    });
    paymentMethodsController = createController();
    paymentMethodsController.getCreditMethods();
  });

  it('should reject getCreditMethods method with status 412', function () {
    getCredit.returnsPromise().rejects({
      status: 412
    });
    paymentMethodsController = createController();
    paymentMethodsController.getCreditMethods();
  }); 
  
  it('should call getDeleteCreditMethods method', function () {
    getDelete.returnsPromise().resolves(creditMethodsResponse);
    paymentMethodsController = createController();
    paymentMethodsController.getDeleteCreditMethods();
  });

  it('should reject getDeleteCreditMethods method with status 500', function () {
    getDelete.returnsPromise().rejects({
      status: 500
    });
    paymentMethodsController = createController();
    paymentMethodsController.getDeleteCreditMethods();
  });

  it('should reject getDeleteCreditMethods method with status 405', function () {
    getDelete.returnsPromise().rejects({
      status: 405
    });
    paymentMethodsController = createController();
    paymentMethodsController.getDeleteCreditMethods();
  });
  it('should call getUpdateCreditMethods method', function () {
    getUpdate.returnsPromise().resolves(creditMethodsResponse);
    paymentMethodsController = createController();
    paymentMethodsController.getUpdateCreditMethods();
  });

  it('should reject getUpdateCreditMethods method with status 500', function () {
    getUpdate.returnsPromise().rejects({
      status: 500
    });
    paymentMethodsController = createController();
    paymentMethodsController.getUpdateCreditMethods();
  });

  it('should reject getUpdateCreditMethods method with status 405', function () {
    getUpdate.returnsPromise().rejects({
      status: 405
    });
    paymentMethodsController = createController();
    paymentMethodsController.getUpdateCreditMethods();
  });
  it('should getPaymentMethods success', function () {
    paymentMethodsController = createController();
    getPayment.returnsPromise().resolves(paymentMethodsResponse);
    getResponseConfigJson.returnsPromise().resolves({data: {columns: { fields: ['name']}}});
    paymentMethodsController.getPaymentMethods();
  });
  it('should getPaymentMethods success utility fail', function () {
    paymentMethodsController = createController();
    getPayment.returnsPromise().resolves(paymentMethodsResponse);
    getResponseConfigJson.returnsPromise().rejects({})
    paymentMethodsController.getPaymentMethods();
  });
  it('should reject getPaymentMethods method with status 500', function () {
    paymentMethodsController = createController();
    getPayment.returnsPromise().rejects({status: 500});
    paymentMethodsController.getPaymentMethods();
  });
  it('should reject getPaymentMethods method with status 404', function () {
    paymentMethodsController = createController();
    getPayment.returnsPromise().rejects({status: 404});
    paymentMethodsController.getPaymentMethods();
  });
  it('should reject getPaymentMethods method with status 405', function () {
    paymentMethodsController = createController();
    getPayment.returnsPromise().rejects({status: 405});
    paymentMethodsController.getPaymentMethods();
  });
 
});
