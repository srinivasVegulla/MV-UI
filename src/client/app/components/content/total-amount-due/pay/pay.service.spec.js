describe('payService', function() {
  var expect = chai.expect,
    payService,
    $httpBackend,
    $aside;

  beforeEach(function() {
    module('app.payModal');
  });

  beforeEach(inject(function(
    _payService_,
    _$httpBackend_,
    _$aside_) {

    payService = _payService_;
    $aside = _$aside_;
    $httpBackend = _$httpBackend_;

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

  it('payService should be defined', function() {
    expect(payService).to.exist;
  });

  it('should call open', function() {
    payService.open('123456','USD');
  });

  it('should call getPayUsing', function() {

    $httpBackend
      .when('GET', 'api/paymentmethods/payusingtypes')
      .respond({ data: 'data' });

    payService.getPayUsing('123456').then(function(res) {
    });

    $httpBackend.flush();
  });

});
