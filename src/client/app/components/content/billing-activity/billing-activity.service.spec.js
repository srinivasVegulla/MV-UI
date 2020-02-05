describe('billingActivityService', function() {
  var expect = chai.expect,
    billingActivityService,
    $httpBackend,
    billingActivityResponse = mockData.billingActivity().getBillingActivityDetails;

  beforeEach(function() {
    module('app.billing-activity');
  });

  beforeEach(inject(function(
    _billingActivityService_,
    _$httpBackend_) {

    billingActivityService = _billingActivityService_;
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
      .respond(billingActivityResponse);

    $httpBackend
      .when('GET', 'static/default/billingActivity.json')
      .respond(billingActivityResponse);   

  }));

  afterEach(function() {
     $httpBackend.verifyNoOutstandingRequest();
     $httpBackend.verifyNoOutstandingExpectation();
  });

  describe('billingActivityService getBillingActivity', function () {
    it('billingActivityService should be defined', function() {
      expect(billingActivityService).to.exist;
    });

    it('billingActivityService should call getBillingActivity', function () {
      var params = '?periodCount=2';
      billingActivityService.getActivity('12345', '67890' + params).then(function(res) {
        expect(res).to.be.defined;
      });
      $httpBackend.flush();
    });
  });
});
