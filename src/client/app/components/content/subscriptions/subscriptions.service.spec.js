describe('subscriptionsServices', function() {
  var expect = chai.expect,
    subscriptionsServices,
    translatorHelper,
    $httpBackend,
    localStorageService,
    utilityService,
    authData = mockData.authentication().userInfo,
    currencyJsonResponse = mockData.currency().JSON,
    subscriptionsResponse = mockData.subscriptions().subscriptionsData,
    cancelSubscriptionData = mockData.subscriptions().cancelSubscriptionData,
    eligibleOffersRespone = mockData.subscriptions().getEligibleOffersData;
    addSubscriptionsRespone = mockData.subscriptions().addSubscriptions;

  beforeEach(function() {
    module('app.subscriptions');
  });

  beforeEach(inject(function(
    _subscriptionsServices_,
    _logger_,
    _$httpBackend_,
    _localStorageService_,
    _utilityService_,
    _translatorHelper_) {

    subscriptionsServices = _subscriptionsServices_;
    $httpBackend = _$httpBackend_;
    localStorageService = _localStorageService_;
    utilityService = _utilityService_;
    translatorHelper = _translatorHelper_;

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
      .when('GET', 'api/subscriptions/123456/78910?lang=us&namespace=mt')
      .respond(subscriptionsResponse);

    $httpBackend
      .when('PUT', 'api/subscriptions/123456?lang=us&isBundle=0&namespace=mt')
      .respond({});

    $httpBackend
      .when('GET', 'api/subscriptions/eligibleoffers/123456?lang=us&namespace=mt')
      .respond({});

  }));

  afterEach(function() {
    sandbox.restore();
    sandbox1.restore();
    // $httpBackend.verifyNoOutstandingRequest();
    // $httpBackend.verifyNoOutstandingExpectation();
  });

  it('subscriptionsServices should be defined', function() {
    expect(subscriptionsServices).to.exist;
  });

  it('subscriptionsServices should call getSubscriptions', function () {

    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
      .respond(subscriptionsResponse);

    subscriptionsServices.getSubscriptions('123456', '78910')
      .then(function(res) {
        // res can be compared here
      });

    $httpBackend.flush();
  });

  it('subscriptionsServices should call cancelSubscriptions', function () {

    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
      .respond({});

    subscriptionsServices.cancelSubscriptions('123456', cancelSubscriptionData)
      .then(function(res) {
        // res can be compared here
      });

    $httpBackend.flush();
  });

  it('subscriptionsServices should call getEligibleOffers', function () {

    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
      .respond({});
    var currentLocale = 'en';
    subscriptionsServices.getEligibleOffers('123456', eligibleOffersRespone)
      .then(function(res) {
        // res can be compared here
      });

    $httpBackend.flush();
  });

  it('subscriptionsServices should call addSubscriptions', function () {

    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
      .respond({});

    subscriptionsServices.addSubscriptions('123456', addSubscriptionsRespone)
      .then(function(res) {
        // res can be compared here
      });

    $httpBackend.flush();
  });

});
