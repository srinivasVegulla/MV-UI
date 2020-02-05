describe('paperInvoiceModalController', function() {
  var expect = chai.expect,
    paperInvoiceModalController,
    $rootScope,
    $controller,
    $scope,
    paperInvoiceModalService,
    createController,
    uibModalInstance,
    accountId,
    filter,
    translatorHelper,
    localStorageService,
    update,
    invoiceMethods,
    modalInstance = mockData.modalInstance(),
    langData = mockData.localStorageData(),
    invoiceResponse = {
      "SelectedMethod": "Standard",
      "InvoiceMethods": [{
          "invoiceMethodId": 767,
          "invoiceMethodName": "Detailed"
        },
        {
          "invoiceMethodId": 768,
          "invoiceMethodName": "None"
        },
        {
          "invoiceMethodId": 769,
          "invoiceMethodName": "Paper Invoice"
        },
        {
          "invoiceMethodId": 770,
          "invoiceMethodName": "Standard"
        },
        {
          "invoiceMethodId": 771,
          "invoiceMethodName": "StandardWithBillMessages"
        }
      ],
      "No of records": 5
    },
    paymentMethodsResponse = mockData.payment().paymentMethods;

  beforeEach(function() {
    module('app.accountSettings');
  });

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _paperInvoiceModalService_,
    _$filter_,
    _translatorHelper_,
    _localStorageService_) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    paperInvoiceModalService = _paperInvoiceModalService_;
    filter = _$filter_;
    translatorHelper = _translatorHelper_;
    localStorageService = _localStorageService_;

    sandbox = sinon.sandbox.create();
    sandbox.stub(localStorageService, 'get', function () {
      return langData;
    });
    update = sinon.stub(paperInvoiceModalService, 'update');
   // invoiceMethods = sinon.stub(paperInvoiceModalService, 'getInvoiceMethods');
    
    createController = function() {
      return $controller('paperInvoiceModalController', {
        '$scope': $scope,
        $uibModalInstance: modalInstance,
        accountId: '123456'
      });
    };

  }));

  afterEach(function() {
    sandbox.restore();
  });

  it('paperInvoiceModalController should be defined', function() {
    paperInvoiceModalController = createController();
    expect(paperInvoiceModalController).to.exist;
  });

  it('paperInvoiceModalController should call save', function () {
    paperInvoiceModalController = createController();
    update.returnsPromise().resolves({});
    paperInvoiceModalController.save();
  });

  it('paperInvoiceModalController should call save rejects 304', function () {
    paperInvoiceModalController = createController();
    update.returnsPromise().rejects({status: 304});
    paperInvoiceModalController.save();
  });

  it('paperInvoiceModalController should call save rejects 200', function () {
    paperInvoiceModalController = createController();
    update.returnsPromise().rejects({status: 200, data: {exception: "HttpHostConnectException"}});
    update.returnsPromise().rejects({status: 200, data: {exception: null}});
    paperInvoiceModalController.save();
  });
/*
  it('paperInvoiceModalController should call getInvoiceMethods', function () {
    paperInvoiceModalController = createController();
    invoiceMethods.returnsPromise().resolves({});
    paperInvoiceModalController.getInvoiceMethods();
  });
*/
  it('paperInvoiceModalController should call cancel', function () {
    paperInvoiceModalController = createController();
    paperInvoiceModalController.cancel();
  });

  it('paperInvoiceModalController should call updateInvoiceMethod', function () {
    paperInvoiceModalController = createController();
    paperInvoiceModalController.invoiceMethodInfo = {};
    paperInvoiceModalController.invoiceMethods = invoiceResponse.InvoiceMethods;
    paperInvoiceModalController.updateInvoiceMethod(0);
  });

});
