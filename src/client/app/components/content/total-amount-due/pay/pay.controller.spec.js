describe('payModalController', function() {
  var expect = chai.expect,
    payModalController,
    $rootScope,
    $controller,
    $scope,
    createController,
    amountDueService,
    amountDueService,
    accountService,
    paymentMethodsService,
    getPaymentOnPaymentService,
    getPaymentOnDueAmountService,
    payService,
    localStorageService,
    filter,
    totalBillAmountService,
    moment,
    timeout,
    sce,
    authenticationService,
    translatorHelper,
    utilityService,
    modalInstance = mockData.modalInstance(),
    duePaymentResponse = mockData.billAmount().duePaymentData,
    currencyJsonResponse = mockData.currency().JSON,
    paymentMethodsResponse = mockData.payment().paymentMethods,
    paymentResponse = mockData.payment().paymentResponse,
    creditMethodsResponse = mockData.payment().paymentMethods,
    langData = mockData.localStorageData().i18n,
    siteSettingsResponse = mockData.localStorageData().settings,
    getInvoicesResponse = mockData.invoice().invoiceList,
    paymentUsingResponse = mockData.payment().payUsingResponse;

  beforeEach(function() {
    module('app.payModal');

    var payDomValues = '<div id="payDomValues"><input id="dateId" type="text">' +
      '<input id="payNow" type="text">' +
      'Result: <span id="result" />' +
      '<div id="hiddenForm"></div></div>';

    document.body.insertAdjacentHTML(
      'afterbegin',
      payDomValues);
  });

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _amountDueService_,
    _accountService_,
    _paymentMethodsService_,
    _payService_,
    _localStorageService_,
    _$filter_,
    _totalBillAmountService_,
    _$moment_,
    _$timeout_,
    _$sce_,
    _authenticationService_,
    _translatorHelper_,
    _utilityService_) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    amountDueService = _amountDueService_;
    accountService = _accountService_;
    paymentMethodsService = _paymentMethodsService_;
    payService = _payService_;
    localStorageService = _localStorageService_;
    filter = _$filter_;
    totalBillAmountService = _totalBillAmountService_;
    moment = _$moment_;
    timeout = _$timeout_;
    sce = _$sce_;
    authenticationService = _authenticationService_;
    translatorHelper = _translatorHelper_;
    utilityService = _utilityService_;

    /* sandbox = sinon.sandbox.create();
    sandbox.stub(localStorageService, 'get', function() {
      return {
       transactionSuccess: true,
     };
    }); */

    getDuePayment = sinon.stub(amountDueService, 'getDuePayment');
    getDuePayment.returnsPromise().resolves(duePaymentResponse);

    getPaymentOnPaymentService = sinon.stub(paymentMethodsService, 'getPayment');
    getPaymentOnPaymentService.returnsPromise().resolves(paymentMethodsResponse);

    getPaymentOnDueAmountService = sinon.stub(amountDueService, 'getPayment');
    getPaymentOnDueAmountService.returnsPromise().resolves(paymentMethodsResponse);

    getCredit = sinon.stub(paymentMethodsService, 'getCredit');
    getCredit.returnsPromise().resolves(creditMethodsResponse);

    getOneTimePayment = sinon.stub(amountDueService, 'getOneTimePayment');
    getOneTimePayment.returnsPromise().resolves(creditMethodsResponse);

    getPayUsing = sinon.stub(payService, 'getPayUsing');
    getPayUsing.returnsPromise().resolves(paymentUsingResponse);

    getInvoices = sinon.stub(amountDueService, 'getInvoices');
    
    sandbox = sinon.sandbox.create();
    sandbox.stub(localStorageService, 'get', function () {
      return langData;
    });
    sandbox1 = sinon.sandbox.create();
    sandbox1.stub(utilityService, 'getNameSpace', function () {
      return siteSettingsResponse;
    });

    createController = function() {
      return $controller('payModalController', {
        '$scope': $scope,
        $uibModalInstance: modalInstance,
        currency: 'USD',
        accountId: '123456',
        selectedCardId: '24rwesd5w',
        idPaymentInstrument: '24rwesd5gf',
        cardSelected: 'Payment Method',
        amountPayable: '12',
        currentDateSigned: '12/05/16',
        payNowBtn: true,
        transactionSuccess: true,
        saveChecked: true,
        _addCardPayNow: true,
        saveCard: true,
        schedulePay: false,
        scheduleConfirm: false,
        payConfirm: true,
        payNow: false,
        payReview: false,
        scheduleReview: false,
        addPayNowReview: true,
        addScheduleNowReview: false,
        authorizeCheck: true,
        addNowScheduleNow: false,
        addNowPayNow: true,
        newPaymentMethod: false,
        paymentMethodsLength: 3,
        invoiceIndex: 0,
        newPaymentMethod: true,
        disableSavingCard: false,
      });
    };


  }));

  afterEach(function() {
   /*document.body.removeChild(document.getElementById('payDomValues')); */
    sinon.restore(amountDueService.getDuePayment);
    sinon.restore(amountDueService.getDuePayment);
    sinon.restore(amountDueService.getOneTimePayment);
    sinon.restore(amountDueService.getInvoices);
    sinon.restore(paymentMethodsService.getPayment);
    sinon.restore(paymentMethodsService.getCredit);
    sinon.restore(payService.getPayUsing);
    sandbox.restore();
    sandbox1.restore();
  });

  it('payModalController should be defined', function() {
    payModalController = createController();
    expect(payModalController).to.exist;
  });

  it('payModalController should call getPaymentDetails', function () {
    payModalController = createController();
    payModalController.getPaymentDetails();
  });

  it('payModalController should call getPayUsing', function () {
    payModalController = createController();
    payModalController.getPayUsing();
  });

  it('payModalController should call cancel', function () {
    payModalController = createController();
    payModalController.cancel();
  });

   it('should resolve getPayUsing', function() {
    payModalController = createController();
    getPayUsing.returnsPromise().resolves(paymentUsingResponse);
  });


  it('payModalController should call payNowWidget', function () {
    payModalController = createController();
    payModalController.payNowWidget();
  });

  it('payModalController should call schedulePayment', function () {
    payModalController = createController();
    payModalController.schedulePayment();
  });

  it('payModalController should call addCardNowPayNow', function () {
    payModalController = createController();
    payModalController.addCardNowPayNow();
  });

  it('payModalController should call closePayPopup', function () {
    payModalController = createController();
    payModalController.closePayPopup();
  });

  it('payModalController should call closeDisclaimerError', function () {
    payModalController = createController();
    payModalController.closeDisclaimerError();
  });

  it('payModalController should call getCurrencySign', function () {
    payModalController = createController();
    payModalController.getCurrencySign();
  });

  it('payModalController should call currencyFormatter', function () {
    payModalController = createController();
    payModalController.currencyFormatter();
  });


  it('payModalController should call getDateFormatByLang', function () {
    payModalController = createController();
    payModalController.getDateFormatByLang();
  });

  it('payModalController should call addPayNowPopup', function () {
    payModalController = createController();
    payModalController.addPayNowPopup();
  });

  it('payModalController should call displayCalender', function () {
    payModalController = createController();
    payModalController.displayCalender();
  });

  it('payModalController should call caldendarCheck method ', function () {
    payModalController = createController();
    payModalController.caldendarCheck();
  });

  it('payModalController should call uncheckAuthorization', function () {
    payModalController = createController();
    payModalController.uncheckAuthorization();
  });

  it('payModalController should call enablePayButton method ', function () {
    payModalController = createController();
    payModalController.enablePayButton();
  });

  it('payModalController should call amountDueCheck method ', function () {
    payModalController = createController();
    payModalController.amountDueCheck();
  });

  it('payModalController should call showPastDue method ', function () {
    payModalController = createController();
    payModalController.showPastDue();
  });

  it('payModalController should call totalInvoiceAmount method ', function () {
    payModalController = createController();
    payModalController.invoiceList = getInvoicesResponse.data.InvoiceList;
    payModalController.totalInvoiceAmount();
  });

  it('payModalController should call setSelected method ', function () {
    payModalController = createController();
    payModalController.setSelected(1);
  });

  it('payModalController should call setPayUsing method ', function () {
    payModalController = createController();
    payModalController.setPayUsing('New Payment Method');
    payModalController.setPayUsing('Existing Payment Method');
  });

  it('payModalController should call setPayUsing method ', function () {
    payModalController = createController();
    payModalController.paymentMethodsLength = 0;
    payModalController.setPayUsing('New Payment Method');
    payModalController.setPayUsing('Existing Payment Method');
  });

  it('payModalController should call setPayUsing method ', function () {
    payModalController = createController();
    payModalController.paymentMethodsLength = 6;
    payModalController.currentDate = "21";
    payModalController.selectedDatepicker = "22";
    payModalController.setPayUsing('New Payment Method');
    payModalController.setPayUsing('Existing Payment Method');
     payModalController.setPayUsing();
  });

  it('payModalController should call setPayUsing method ', function () {
    payModalController = createController();
    payModalController.paymentMethodsLength = 0;
    payModalController.currentDate = "21";
    payModalController.selectedDatepicker = "22";
    payModalController.setPayUsing('New Payment Method');
    payModalController.setPayUsing();
  });

   it('payModalController should call setPayUsing method ', function () {
     payModalController = createController();
     payModalController.paymentMethodsLength = 0;
     payModalController.currentDate = "21";
     payModalController.selectedDatepicker = "22";
     payModalController.setPayUsing('Existing Payment Method');
     payModalController.setPayUsing();
   });

    it('payModalController should call setPayUsing method ', function () {
      payModalController = createController();
      payModalController.paymentMethodsLength = 0;
      payModalController.currentDate = "21";
      payModalController.selectedDatepicker = "21";
      payModalController.setPayUsing('New Payment Method');
      payModalController.setPayUsing();
    });

    it('payModalController should call setPayUsing method ', function () {
      payModalController = createController();
      payModalController.paymentMethodsLength = 0;
      payModalController.currentDate = "21";
      payModalController.selectedDatepicker = "21";
      payModalController.setPayUsing('Existing Payment Method');
      payModalController.setPayUsing();
    });

    it('payModalController should call setPayUsing method ', function () {
      payModalController = createController();
      payModalController.paymentMethodsLength = 0;
      payModalController.schedulePayment('Existing Payment Method');
      payModalController.schedulePayment();
    });

    it('payModalController should call setPayUsing method ', function () {
      payModalController = createController();
      payModalController.paymentMethodsLength = 0;
      payModalController.currentDate = "21";
      payModalController.selectedDatepicker = "21";
      payModalController.schedulePayment('New Payment Method');
      payModalController.schedulePayment();
    });
    

  it('should resolve getDuePaymentAmount and getCurrency and getPaymentDetails', function () {
    payModalController = createController();
    getDuePayment.returnsPromise().resolves(duePaymentResponse);
    getPaymentOnPaymentService.returnsPromise().resolves(paymentMethodsResponse);
    payModalController.paymentMethodsLength = 0;
  });

  it('should call addCardNowPayNow method for else case OneTimePayment', function () {
    payModalController.saveChecked = false;
    getOneTimePayment.returnsPromise().resolves(creditMethodsResponse);
    payModalController.addCardNowPayNow();
  });

  it('should reject addCardNowPayNow method with status 500 for else case OneTimePayment', function () {
    payModalController = createController();
    payModalController.saveChecked = false;
    getOneTimePayment.returnsPromise().rejects({
      status: 500
    });
    payModalController.addCardNowPayNow();
  });

  it('should reject addCardNowPayNow method with status 400 for else case OneTimePayment', function () {
    payModalController = createController();
    payModalController.saveChecked = false;
    getOneTimePayment.returnsPromise().rejects({
      status: 400
    });
    payModalController.addCardNowPayNow();
  });

  it('should reject addCardNowPayNow method with status 412 for else case OneTimePayment', function () {
    payModalController = createController();
    payModalController.saveChecked = false;
    getOneTimePayment.returnsPromise().rejects({
      status: 412
    });
    payModalController.addCardNowPayNow();
  });
  
  it('should resolve getDuePaymentAmount with empty data', function () {
    getDuePayment.returnsPromise().resolves({});
    getPaymentOnPaymentService.returnsPromise().resolves(paymentMethodsResponse);
    payModalController = createController();
  });

  it('should reject getDuePaymentAmount with status 500', function () {
    payModalController = createController();
    getDuePayment.returnsPromise().rejects({
      status: 500
    });
    payModalController.paymentMethodsLength = 0;
    expect(payModalController.paymentMethodsLength).to.be.zero;
  });

  it('should reject getDuePaymentAmount with status 400', function () {
    payModalController = createController();
    getDuePayment.returnsPromise().rejects({
      status: 400
    });
  });

  it('should resolve getPaymentDetails', function () {
    getPaymentOnPaymentService.returnsPromise().resolves(paymentMethodsResponse);
    getDuePayment.returnsPromise().resolves(duePaymentResponse);
    payModalController.duePaymentAmountPayable = '';
    payModalController = createController();
  });

  it('should reject getPaymentDetails method with status 500', function () {
    getPaymentOnPaymentService.returnsPromise().rejects({
      status: 500
    });
    getDuePayment.returnsPromise().resolves(duePaymentResponse);
    payModalController = createController();
  });

  it('should reject getPaymentDetails method with status 400', function () {
    getPaymentOnPaymentService.returnsPromise().rejects({
      status: 412
    });
    getDuePayment.returnsPromise().resolves(duePaymentResponse);
    payModalController = createController();
  });
  it('should success getInvoicesDetails method with status 400', function () {
    payModalController = createController();
    getInvoices.returnsPromise().resolves(getInvoicesResponse);
    payModalController.getInvoicesDetails();
  });
  it('should reject getInvoicesDetails method with status 400', function () {
    payModalController = createController();
    getInvoices.returnsPromise().rejects({});
    payModalController.getInvoicesDetails();
  });
});
