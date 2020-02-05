describe('payerSubscriptionsService', function() {
  var expect = chai.expect,
    payerSubscriptionsService,
    $httpBackend,
    localStorageService,
    utilityService,
    authData = mockData.authentication().userInfo,
    subscriptionsResponse = mockData.subscriptions().subscriptionsData;

  beforeEach(function() {
    module('app.payer.subscriptions');
  });

  beforeEach(inject(function(
    _payerSubscriptionsService_,
    _logger_,
    _$httpBackend_,
    _localStorageService_,
    _utilityService_) {

    payerSubscriptionsService = _payerSubscriptionsService_;
    $httpBackend = _$httpBackend_;
    localStorageService = _localStorageService_;
    utilityService = _utilityService_;

    sandbox = sinon.sandbox.create();
    sandbox.stub(localStorageService, 'get', function () {
      return authData;
    });

    sandbox1 = sinon.sandbox.create();
    sandbox1.stub(utilityService, 'getNameSpace', function () {
      return 'mt';
    });

    $httpBackend
      .when('GET', '/static/default/i18n/security/locale-en.json')
      .respond(subscriptionsResponse);

    $httpBackend
      .when('POST', '/static/default/i18n/security/locale-en.json')
      .respond(subscriptionsResponse);

    $httpBackend
      .when('GET', '/static/default/i18n/common/locale-en.json')
      .respond(subscriptionsResponse);

    $httpBackend
      .when('GET', '/static/default/i18n/resetPassword/locale-en.json')
      .respond({});

    $httpBackend
      .when('GET', 'app/core/404.html')
      .respond(subscriptionsResponse);

    $httpBackend
      .when('GET', 'api/subscriptions/payees/123456/?intervalid=78910&lang=us&namespace=mt')
      .respond(subscriptionsResponse);

  }));

  afterEach(function() {
    sandbox.restore();
    sandbox1.restore();
    // $httpBackend.verifyNoOutstandingRequest();
    // $httpBackend.verifyNoOutstandingExpectation();
  });

  it('payerSubscriptionsService should be defined', function() {
    expect(payerSubscriptionsService).to.exist;
  });

  it('payerSubscriptionsService should call getPayeeSubscriptions', function () {

    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
      .respond(subscriptionsResponse);

    payerSubscriptionsService.getPayeeSubscriptions('123456', '78910')
      .then(function(res) {
        // res can be compared here
      });

    $httpBackend.flush();
  });

});
