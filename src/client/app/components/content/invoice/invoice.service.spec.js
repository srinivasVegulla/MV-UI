describe('InvoiceService', function() {
  var expect = chai.expect,
    invoiceService,
    $httpBackend,
    utilityService,
    invoiceResponse = mockData.invoice().invoiceList,
    statementResponse = mockData.invoice().statementsList,
    creditNoteResponse = mockData.invoice().creditNotesList,
    authData = mockData.authentication().userInfo;

  beforeEach(function() {
    module('app.invoice');
  });

  beforeEach(inject(function(
    _invoiceService_,
    _logger_,
    _utilityService_,
    _$httpBackend_) {

    invoiceService = _invoiceService_;
    utilityService = _utilityService_;
    $httpBackend = _$httpBackend_;

    sandbox = sinon.sandbox.create();
    sandbox.stub(utilityService, 'getNameSpace', function () {
      return 'mt';
    });

    $httpBackend
      .when('GET', '/static/default/i18n/security/locale-en.json')
      .respond({});

    $httpBackend
      .when('GET', '/static/default/i18n/common/locale-en.json')
      .respond({});

    $httpBackend
      .when('GET', '/static/default/i18n/resetPassword/locale-en.json')
      .respond({});

    $httpBackend
      .when('GET', 'app/core/404.html')
      .respond({});

    $httpBackend
      .when('GET', 'api/downloadReports/12345/67890?namespace=mt')
      .respond(invoiceResponse);

    $httpBackend
      .when('GET', 'api/downloadReports/download/12345/67890?fileName=invoiceFileName')
      .respond(invoiceResponse);

    $httpBackend
      .when('GET', 'api/downloadReports/quote/67890?startdate=10&enddate=12')
      .respond(statementResponse);

    $httpBackend
      .when('GET', 'api/downloadReports/download/quote/67890?fileName=invoiceFileName')
      .respond(statementResponse);   

    $httpBackend
      .when('GET', 'api/downloadReports/creditnote/67890?startdate=10&enddate=12&namespace=mt')
      .respond(creditNoteResponse);

    $httpBackend
      .when('GET', 'api/downloadReports/download/creditnote/67890?fileName=invoiceFileName')
      .respond(creditNoteResponse);       
  }));

  afterEach(function() {
    sandbox.restore();
  });

  it('invoiceService should be defined', function() {
    expect(invoiceService).to.exist;
  });

  it('invoiceService should call  getStatements', function () {
    $httpBackend.expectGET('api/downloadReports/quote/67890')
      .respond(statementResponse);
    invoiceService.getStatements('67890').then(function(res) {
      expect(res).to.be.defined;
    });
    $httpBackend.flush();
  });

  it('invoiceService should call getDebitNotes', function () {
    $httpBackend.expectGET('api/paymentmethods/ecbarpayments/getarcreditdebitdetails?startdate=10&enddate=12&namespace=mt')
      .respond(statementResponse);
    invoiceService.getDebitNotes('67890','12345', true,  10, 12).then(function (res) {
      expect(res).to.be.defined;
    });
    $httpBackend.flush();
  });

  it('invoiceService should call downloadDebitNotes', function () {
    $httpBackend.expectGET('api/downloadReports/download?fileName=invoiceFileName')
      .respond(statementResponse);
    invoiceService.downloadDebitNotes('api/filePath', 'invoiceFileName').then(function (res) {
      expect(res).to.be.defined;
    });
    $httpBackend.flush();
  });


  it('invoiceService should call getQuotes', function () {
    $httpBackend.expectGET('api/downloadReports/quote/67890?startdate=10&enddate=12&namespace=mt')
      .respond(statementResponse);
    invoiceService.getQuotes('67890', 10, 12 ).then(function (res) {
      expect(res).to.be.defined;
    });
    $httpBackend.flush();
  });

  it('invoiceService should call getQuotesPDF', function () {
    $httpBackend.expectGET('api/downloadReports/quote/67890')
      .respond(statementResponse);
    invoiceService.getQuotesPDF('invoiceFileName', '67890').then(function (res) {
      expect(res).to.be.defined;
    });
    $httpBackend.flush();
  });

  it('invoiceService should call getStatementPDF', function () {
    $httpBackend.expectGET('api/downloadReports/quote/67890')
      .respond(statementResponse);
    invoiceService.getStatementPDF('invoiceFileName','67890').then(function(res) {
      expect(res).to.be.defined;
    });
    $httpBackend.flush();
  });

  it('invoiceService should call getInvoices', function () {
    $httpBackend.expectGET('api/downloadReports/12345/67890?namespace=mt')
      .respond(invoiceResponse);
    invoiceService.getInvoices('12345', '67890').then(function(res) {   
      expect(res).to.be.defined;  
    });
    $httpBackend.flush();
  });

  it('invoiceService should call getPDF', function () {
    $httpBackend.expectGET('api/downloadReports/12345/67890')
      .respond(invoiceResponse);
    invoiceService.getPDF('invoiceFileName', '12345', '67890').then(function(res) {
      expect(res).to.be.defined;
    });
    $httpBackend.flush();
  });

  it('invoiceService should call getCreditNotes', function () {
    $httpBackend.expectGET('api/downloadReports/creditnote/67890?startdate=10&enddate=12&namespace=mt')
      .respond(creditNoteResponse);
    invoiceService.getCreditNotes('67890', 10, 12).then(function(res) { 
      expect(res).to.be.defined;     
    });
    $httpBackend.flush();
  });

  it('invoiceService should call getCreditNotePDF', function () {
    $httpBackend.expectGET('api/downloadReports/creditnote/67890?fileName=invoiceFileName')
      .respond(creditNoteResponse);
    invoiceService.getCreditNotePDF('invoiceFileName','67890').then(function(res) { 
      expect(res).to.be.defined;    
    }); 
    $httpBackend.flush();  
  });
});
