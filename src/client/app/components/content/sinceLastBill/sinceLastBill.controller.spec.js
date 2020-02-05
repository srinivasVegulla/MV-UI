describe('sinceLastBillController', function () {
  var expect = chai.expect,
    sinceLastBillController,
    scope,
    $controller,
    window,
    sinceLastBillService,
    localStorageService,
    moment,
    filter,
    utilityService,
    langData = mockData.localStorageData();

  beforeEach(function () {
    module('app.sinceLastBill');
  });

  

  beforeEach(inject(function (
    _$rootScope_,
    _$controller_,
    _$window_,
    _$http_,
    _localStorageService_,
    _sinceLastBillService_,
    _$moment_,
    _$filter_,
    _utilityService_) {

    scope = _$rootScope_.$new();
    $controller = _$controller_;
    window = _$window_;
    sinceLastBillService = _sinceLastBillService_;
    localStorageService  = _localStorageService_;
    moment = _moment_;
    filter = _filter_;
    utilityService = _utilityService_;

    createController = function () {
      return $controller('sinceLastBillController', {
        '$scope': scope,
        '$window': window,
        '$http': http,
        '$rootScope': scope,
        'sinceLastBillService': sinceLastBillService,
        '$moment': moment,
        'localStorageService': localStorageService,
        '$filter': filter,
        'utilityService': utilityService
      });
    }
  }));

  afterEach(function () {
    //sandbox.restore();
    //sandbox1.restore();
  });

  it('sinceLastBillController should be defined', function () {
    sinceLastBillController = createController();
    expect(sinceLastBillController).to.exist;
  });

  /* it('sinceLastBillController should call getUsageActivity', function () {
    sinceLastBillController = createController();
    sinceLastBillController.getUsageActivity();
  }); */


  

});
