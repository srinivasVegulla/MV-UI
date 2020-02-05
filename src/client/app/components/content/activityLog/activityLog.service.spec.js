describe('activityLogService', function() {
  var expect = chai.expect,
  activityLogService,  
  activityLogResponse,
  logger, 
  authData = mockData.authentication().userInfo,
  utilityService,
  localStorageService,
  $httpBackend;

  beforeEach(function() {
    module('app.activityLog');
  });

  beforeEach(inject(function(
    _activityLogService_,  
    _$httpBackend_,
    _utilityService_,
    _localStorageService_) {

    activityLogService = _activityLogService_;
    $httpBackend = _$httpBackend_;
    utilityService = _utilityService_;
    localStorageService = _localStorageService_;

    sandbox = sinon.sandbox.create();
    sandbox.stub(localStorageService, 'get', function () {
      return authData;
    });
    sandbox1 = sinon.sandbox.create();
    sandbox1.stub(utilityService, 'get', function () {
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

    $httpBackend
      .when('GET', 'api/audit/1234?intervalid=345&namespace=mt')
      .respond(activityLogResponse);
  }));

  afterEach(function () {
    sandbox.restore();
    sandbox1.restore();
    // $httpBackend.verifyNoOutstandingRequest();
    // $httpBackend.verifyNoOutstandingExpectation();
  });

  it('activityLogService should be defined', function() {
    expect(activityLogService).to.exist;
  });

 it('should call getAllActivityLogs', function() {   

    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
      .respond({});
    
    activityLogService.allActivityLog('123', '345').then(function(res) {
      // res can be compared here
    });
    $httpBackend.flush();
  });

  it('should reject getAllActivityLogs', function() {   

    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
      .respond({});

    activityLogService.allActivityLog('123', '345').then(function(res) {
      // res can be compared here
    });
    $httpBackend.flush();
  });
});
