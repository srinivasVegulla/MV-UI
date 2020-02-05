describe('welcomeModalService', function() {
  var expect = chai.expect,
    welcomeModalService,
    $httpBackend,
    $aside;

  beforeEach(function() {
    module('app.signUp');
  });

  beforeEach(inject(function(
    _welcomeModalService_,
    _$aside_) {

    welcomeModalService = _welcomeModalService_;
    $aside = _$aside_;

  }));

  it('welcomeModalService should be defined', function() {
    expect(welcomeModalService).to.exist;
  });

  it('should call open', function() {
    welcomeModalService.open('123456');
  });

});
