describe('totalBillAmountService', function() {
  var expect = chai.expect,
    totalBillAmountService,
    $httpBackend,
    totalBillAmountResponse = mockData.billAmount().amount,
    authData = mockData.authentication().userInfo;

  beforeEach(function() {
    module('app.total-bill-amount');
  });

  beforeEach(inject(function(
    _totalBillAmountService_,
    _localStorageService_,
    _$httpBackend_) {

    totalBillAmountService = _totalBillAmountService_;
    localStorageService = _localStorageService_;
    $httpBackend = _$httpBackend_;

    sandbox = sinon.sandbox.create();
    sandbox.stub(localStorageService, 'get', function() {
      return authData;
    });

    $httpBackend
      .when('GET', '/static/default/i18n/security/locale-en.json')
      .respond({});

    $httpBackend
      .when('GET', '/static/default/i18n/common/locale-en.json')
      .respond({});

    $httpBackend
      .when('GET', 'app/core/404.html')
      .respond({});
  }));

  afterEach(function() {
    sandbox.restore();
    $httpBackend.verifyNoOutstandingRequest();
    $httpBackend.verifyNoOutstandingExpectation();
  });


  it('totalBillAmountService should be defined', function() {
    expect(totalBillAmountService).to.exist;
  });

  it('should resolve gettotalBillAmount', function() {
    var urlParams = '?inlineAdj=true&inlineVatTaxes=true&lang=us&reportView=ONLINEBILL&secondPass=true';
    $httpBackend
      .expectGET('api/billing/totalamount/12345/67890'+urlParams)
      .respond(totalBillAmountResponse);

    totalBillAmountService.gettotalBillAmount('12345', '67890').then(function(res) {
      expect(res).to.be.defined;
    });

    $httpBackend.flush();
  });

  it('should reject gettotalBillAmount', function() {
    var urlParams = '?inlineAdj=true&inlineVatTaxes=true&lang=us&reportView=ONLINEBILL&secondPass=true';
    $httpBackend
      .expectGET('api/billing/totalamount/12345/67890'+urlParams)
      .respond(500);

    totalBillAmountService.gettotalBillAmount('12345', '67890').then(function(res) {
      expect(res).to.be.equal(undefined);
    });

    $httpBackend.flush();
  });

});
