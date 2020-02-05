describe('usageActivityService', function() {
  var expect = chai.expect,
    usageActivityService,
    $httpBackend,
    usageActivityResponse = mockData.usageActivity().getUsageActivityDetails;

  beforeEach(function() {
    module('app.usage-activity');
  });

  beforeEach(inject(function(
    _usageActivityService_,
    _$httpBackend_) {

    usageActivityService = _usageActivityService_;
    $httpBackend = _$httpBackend_;

    $httpBackend
      .when('GET', '/static/default/i18n/common/locale-en.json')
      .respond({});

    $httpBackend
      .when('GET', '/static/default/i18n/security/locale-en.json')
      .respond({});

    $httpBackend
      .when('GET', '/static/default/i18n/resetPassword/locale-en.json')
      .respond({});

    $httpBackend
      .when('GET', 'app/core/404.html')
      .respond({});

    $httpBackend
      .when('GET', 'api/billing/billingactivity/12345/67890?periodCount=2')
      .respond(usageActivityResponse);

  }));

  afterEach(function() {
     $httpBackend.verifyNoOutstandingRequest();
     $httpBackend.verifyNoOutstandingExpectation();
  });

  describe ('getUsageActivity', function() {
    it('usageActivityService usageActivityService should be defined', function () {
      expect(usageActivityService).to.exist;
    });

    it('usageActivityService should call getUsageActivity', function () {
      var params = '?periodCount=2';
      usageActivityService.getActivity('12345', '67890' + params).then(function(res) {
        expect(res).to.be.defined;
      });
      $httpBackend.flush();
    });
  });
});
