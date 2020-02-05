describe('accountService', function() {
  var expect = chai.expect,
    accountService,
    $httpBackend,
    localStorageService,
    utilityService,
    authData = mockData.authentication().userInfo,
    accountInfo = mockData.account().accountInfo,
    currencyResponse = mockData.currency().JSON;

  beforeEach(function() {
    module('app.account');
  });

  beforeEach(inject(function(
    _accountService_,
    _$httpBackend_,
    _localStorageService_,
    _utilityService_) {

    accountService = _accountService_;
    $httpBackend = _$httpBackend_;
    localStorageService = _localStorageService_;
    utilityService = _utilityService_;

    sandbox = sinon.sandbox.create();
    sandbox.stub(localStorageService, 'get', function () {
      return authData;
    });
    /*sandbox1 = sinon.sandbox.create();
    sandbox1.stub(utilityService, 'get', function () {
      return authData;
    });
*/
    $httpBackend
      .when('GET', '/static/default/i18n/security/locale-en.json')
      .respond(accountInfo);

    $httpBackend
      .when('GET', 'app/core/404.html')
      .respond(accountInfo);

    $httpBackend
      .when('PUT', 'api/accounts/11216951', accountInfo)
      .respond(accountInfo);

  }));

  afterEach(function() {
    sandbox.restore();
    //sandbox1.restore();
    // $httpBackend.verifyNoOutstandingRequest();
    // $httpBackend.verifyNoOutstandingExpectation();
  });

  it('accountService should be defined', function() {
    expect(accountService).to.exist;
  });

  it('should call load', function() {

    $httpBackend
      .when('GET', 'api/accounts/123456?lang=us&namespace=mt')
      .respond(accountInfo);

    $httpBackend
      .expectGET('/static/default/i18n/common/locale-en.json')
      .respond(accountInfo);

    accountService.load('123456').then(function(res) {
      // console.log(res);
    });

    $httpBackend.flush();

  });

  it('should reject load', function() {

    $httpBackend
      .when('GET', 'api/accounts/123456?lang=us&namespace=mt')
      .respond(400);

    $httpBackend
      .expectGET('/static/default/i18n/common/locale-en.json')
      .respond(accountInfo);

    accountService.load('123456').then(function(res) {
      // console.log(res);
    });

    $httpBackend.flush();

  });

  it('should call locale file', function() {

    $httpBackend
      .expectGET('/static/default/i18n/common/locale-en.json')
      .respond(accountInfo);
    $httpBackend.flush();

  });

  it('should call update', function() {

    $httpBackend
      .when('PUT', 'api/accounts/123456?lang=us&namespace=mt')
      .respond(accountInfo);

    $httpBackend
      .expectGET('/static/default/i18n/common/locale-en.json')
      .respond(accountInfo);

    accountService.update(accountInfo).then(function(res) {
      // console.log(res);
    });

    $httpBackend.flush();

  });
  it('should call buildAccountInfoModel', function() {
    accountService.buildAccountInfoModel(null);
    accountService.buildAccountInfoModel({"idAcc": 123});
  });
  
});
