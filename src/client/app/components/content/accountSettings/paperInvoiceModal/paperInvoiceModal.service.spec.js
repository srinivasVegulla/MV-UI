describe('paperInvoiceModalService', function() {
  var expect = chai.expect,
    paperInvoiceModalService,
    translatorHelper,
    $httpBackend,
    $uibModal,
    $aside,
    localStorageService,
    utilityService,
    paperInvoiceResponse = mockData.invoiceMethod().invoiceMethodDate,
    langData = mockData.localStorageData();

  beforeEach(function() {
    module('app.accountSettings');
  });

  beforeEach(inject(function(
    _paperInvoiceModalService_,
    _logger_,
    _$httpBackend_,
    _translatorHelper_,
    _$uibModal_,
    _$aside_,
    _localStorageService_,
    _utilityService_) {

    paperInvoiceModalService = _paperInvoiceModalService_;
    $httpBackend = _$httpBackend_;
    translatorHelper = _translatorHelper_;
    $uibModal = _$uibModal_;
    $aside = _$aside_;
    localStorageService = _localStorageService_;
    utilityService = _utilityService_;

    sandbox = sinon.sandbox.create();
    sandbox.stub(localStorageService, 'get', function () {
      return langData;
    });
    
    $httpBackend
      .when('GET', 'app/core/404.html')
      .respond(paperInvoiceResponse);
    
  }));

  afterEach(function() {
    sandbox.restore();
    sandbox1.restore();
    // $httpBackend.verifyNoOutstandingRequest();
    // $httpBackend.verifyNoOutstandingExpectation();
  });

  it('paperInvoiceModalService should be defined', function() {
    expect(paperInvoiceModalService).to.exist;
  });

  it('should call getInvoiceMethods', function() {

    $httpBackend
      .when('GET', 'api/accounts/invoicemethod/123456?lang=us&namespace=mt')
      .respond(paperInvoiceResponse);

    paperInvoiceModalService.getInvoiceMethods('123456')
      .then(function(res) {
        // res can be compared here
      });

    $httpBackend.flush();
  });

  it('should call updateInvoiceMethod', function() {    
    $httpBackend
    .when('PUT', 'api/accounts/invoicemethod/123456?lang=us&namespace=mt', paperInvoiceResponse.InvoiceMethods)
    .respond(paperInvoiceResponse);

    paperInvoiceModalService.update(paperInvoiceResponse.InvoiceMethods, '123')
      .then(function(res) {
        // res can be compared here
      });

    $httpBackend.flush();
  });

});
