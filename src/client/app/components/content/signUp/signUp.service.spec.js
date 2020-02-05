describe('signUpService', function() {
  var expect = chai.expect,
    signUpService,
    $httpBackend,
    $location,
    paymentMethodResponse = mockData.payment().paymentMethods,
    authData = mockData.authentication().userInfo,
    currencyJsonResponse = mockData.currency().JSON;
  //paymentConfirmationResponse = mockData.payment().paymentResponse;

  beforeEach(function() {
    module('app.signUp');
  });

  beforeEach(inject(function(
    _signUpService_,
    _$location_,
    _$httpBackend_,
    _localStorageService_) {

    signUpService = _signUpService_;
    $httpBackend = _$httpBackend_;
    localStorageService = _localStorageService_;

    sandbox = sinon.sandbox.create();
    sandbox.stub(localStorageService, 'get', function() {
      return authData;
    });

  }));

  afterEach(function() {
    sandbox.restore();
    // $httpBackend.verifyNoOutstandingRequest();
    // $httpBackend.verifyNoOutstandingExpectation();
  });

  it('signUpService should be defined', function() {
    expect(signUpService).to.exist;
  });

  it('should call createAccount', function() {

    $httpBackend
      .when('POST', 'api/registration/registerUser')
      .respond({
        data: {
          message: 'message'
        }
      });


    $httpBackend.expectGET('/static/default/i18n/common/locale-en.json')
      .respond({});

    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
      .respond({});

    $httpBackend.expectGET('/static/default/i18n/signUp/locale-en.json')
      .respond({});

    $httpBackend.when('GET', 'app/core/404.html')
      .respond({});

    signUpService.createAccount({ signUpData: 'data' })
      .then(function(res) {
        // console.log(res);
      });

    $httpBackend.flush();
  });

});
