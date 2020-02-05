describe('sinceLastBillService', function() {
  var expect = chai.expect,
    sinceLastBillService,
    $httpBackend,
    param = 'startdate=13/07/1987&enddate=13/07/1987&namespace=a';

  beforeEach(function() {
    module('app.sinceLastBill');
  });

  beforeEach(inject(function(
    _sinceLastBillService_,
    _$httpBackend_) {

    sinceLastBillService = _sinceLastBillService_;
    $httpBackend = _$httpBackend_;
    
    $httpBackend
      .when('GET', 'app/core/404.html')
      .respond({});
    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
    .respond({});
    $httpBackend
    .when('GET', 'api/billing/transactions/123?'+param)
    .respond({});  
    $httpBackend
    .when('GET', 'api/downloadReports/quotecount/123?'+param)
    .respond({});

  }));

  afterEach(function() {
    //sandbox.restore();
  });

  it('sinceLastBillService should be defined', function() {
    expect(sinceLastBillService).to.exist;
  });

  it('should call getTransactionsCount', function() {
    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
    .respond({});
    $httpBackend
    .when('GET', 'api/billing/transactions/123?'+param)
    .respond({});    
    sinceLastBillService.getTransactionsCount('123', '12/07/1987', '12/07/1988')
    .then(function(res) {
      // res can be compared here
    });
    $httpBackend.flush();
  });

  it('should call getQuotesCount', function() {
    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
    .respond({});
    $httpBackend
    .when('GET', 'api/downloadReports/quotecount/123?'+param)
    .respond({});
    sinceLastBillService.getQuotesCount('123', '12/07/1987', '12/07/1988')
      .then(function(res) {
        // res can be compared here
      });

    $httpBackend.flush();
  });

});
