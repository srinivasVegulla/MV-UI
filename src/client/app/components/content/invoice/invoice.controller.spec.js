describe('invoiceController', function() {
  var expect = chai.expect,
    invoiceController,
    $rootScope,
    $controller,
    $scope,
    invoiceService,
    utilityService,
    filter,
    logger,
    window,
    translatorHelper,
    localStorageService,
    invoiceResponse = mockData.invoice().invoiceList,
    statementResponse = mockData.invoice().statementsList,
    creditNoteResponse = mockData.invoice().creditNotesList,
    createController;

  beforeEach(function() {
    module('app.invoice');
  });

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _invoiceService_,
    _utilityService_,
    _$filter_,
    _logger_,
    _$window_,
    _translatorHelper_,
    _localStorageService_) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    invoiceService = _invoiceService_;
    utilityService = _utilityService_;
    filter = _$filter_;
    logger = _logger_;
    window = _$window_;
    translatorHelper = _translatorHelper_;
    localStorageService = _localStorageService_;

    getPDF = sinon.stub(invoiceService, 'getPDF');
    getPDF.returnsPromise().resolves(invoiceResponse);

    getQuotesPDF = sinon.stub(invoiceService, 'getQuotesPDF');
    getQuotesPDF.returnsPromise().resolves(statementResponse);

    getCreditNotePDF = sinon.stub(invoiceService, 'getCreditNotePDF');
    getCreditNotePDF.returnsPromise().resolves(creditNoteResponse);

    getInvoices = sinon.stub(invoiceService, 'getInvoices');
    getInvoices.returnsPromise().resolves(invoiceResponse);
    getQuotes = sinon.stub(invoiceService, 'getQuotes'); 
    getQuotes.returnsPromise().resolves(statementResponse);
    getCreditNotes = sinon.stub(invoiceService, 'getCreditNotes');
    getCreditNotes.returnsPromise().resolves(creditNoteResponse);

    createController = function() {
      return $controller('invoiceController', {
        '$scope': $scope
      });
    }
  }));

  afterEach(function() {
    sinon.restore(invoiceService.getInvoices);
    sinon.restore(invoiceService.getQuotes);
    sinon.restore(invoiceService.getCreditNotes);
    sinon.restore(invoiceService.getPDF);
    sinon.restore(invoiceService.getQuotesPDF);
    sinon.restore(invoiceService.getCreditNotePDF);
  });

  it('invoiceController should be defined', function () {
    invoiceController = createController();
    expect(invoiceController).to.exist;
  });

  /* it('should call savePDF', function() {
    invoiceController = createController();   
    invoiceController.savePDF('invoiceFileName');
    getPDF.returnsPromise().resolves(invoiceResponse);    
  });

  it('should call saveStatementPDF', function() {
    invoiceController = createController();    
    invoiceController.saveStatementPDF('invoiceFileName');
    getQuotesPDF.returnsPromise().resolves(statementResponse);   
  });

  it('should call saveCreditNotePDF', function() {
    invoiceController = createController();    
    invoiceController.saveCreditNotePDF('invoiceFileName');
    getCreditNotePDF.returnsPromise().resolves(creditNoteResponse);    
  });

  it('should call toggleInvoiceCardState', function() {
    invoiceController = createController();
    invoiceController.toggleInvoiceCardState();
  });


  it('should call countOfOne', function() {
    invoiceController = createController();
    invoiceController.countOfOne("1");
  });

  it('should call countOfTwo', function() {
    invoiceController = createController();
    invoiceController.countOfTwo("2");
  });

  it('should call showViewAll', function() {
    invoiceController = createController();
    invoiceController.showViewAll(1,2,3);
  });

  it('should call closeInvoiceViewAll ', function() {
    invoiceController = createController();
    invoiceController.closeInvoiceViewAll();
  });

  it('should resolve getQuotes', function() {
    getQuotes.returnsPromise().resolves(statementResponse);
    invoiceController = createController();
    $scope.$emit('show_filter_intervals',  '2345');
  });

  it('should reject getQuotes', function() {
    getQuotes.returnsPromise().rejects({ error: 'error' });
    invoiceController = createController();
    $scope.$emit('show_filter_intervals', '2345');
  });

  it('should resolve getInvoices', function() {
    getInvoices.returnsPromise().resolves(invoiceResponse);
    invoiceController = createController();
    $scope.$emit('show_filter_intervals', '123', '2345');
  });

  it('should reject getInvoices', function() {
    getInvoices.returnsPromise().rejects({ error: 'error' });
    invoiceController = createController();
    $scope.$emit('show_filter_intervals', '123', '2345');
  });

  it('should resolve getCreditNotes', function() {
    getCreditNotes.returnsPromise().resolves(creditNoteResponse);
    invoiceController = createController();
    $scope.$emit('show_filter_intervals','2345');
  });

  it('should reject getCreditNotes', function() {
    getCreditNotes.returnsPromise().rejects({ error: 'error' });
    invoiceController = createController();
    $scope.$emit('show_filter_intervals', '2345');
  }); */
});
