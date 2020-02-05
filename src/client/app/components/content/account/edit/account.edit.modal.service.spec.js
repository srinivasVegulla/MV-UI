describe('accountEditModalService', function() {
  var expect = chai.expect,
    accountEditModalService,
    $httpBackend,
    $aside;

  beforeEach(function() {
    module('app.account');
  });

  beforeEach(inject(function(
    _accountEditModalService_,
    _$aside_) {

    accountEditModalService = _accountEditModalService_;
    $aside = _$aside_;

  }));

  it('accountEditModalService should be defined', function() {
    expect(accountEditModalService).to.exist;
  });

  it('should call open', function() {
    accountEditModalService.open('123456');
  });

});
