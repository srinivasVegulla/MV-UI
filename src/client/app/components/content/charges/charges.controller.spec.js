describe('chargesController', function() {
  var expect = chai.expect,
    sandbox,
    $rootScope,
    $controller,
    $scope,
    $q,
    $http,
    $httpBackend,
    chargesController,
    authenticationService,
    chargesService,
    accountService,
    userInfo = mockData.authentication().userInfo,
    settingsResponse = mockData.settings().settings,
    reportResponse = mockData.billing().reportData,
    currencyJsonResponse = mockData.currency().JSON,
    nonStandardChargesResponse = mockData.nonStandardCharges(),
    preBillAdjustmentsResponse = mockData.adjustmentDetails(),
    getSettings,
    getReport,
    exportPreBillAdjustments,
    getNonStandardCharges;

  beforeEach(function() {
    module('app.charges');
  });

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _$q_,
    _$http_,
    _$httpBackend_,
    _authenticationService_,
    _chargesService_,
    _accountService_){

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    $q = _$q_;
    $http = _$http_;
    $httpBackend = _$httpBackend_;
    authenticationService = _authenticationService_;
    chargesService = _chargesService_;
    accountService = _accountService_;

    sandbox = sinon.sandbox.create();
    sandbox.stub(authenticationService, 'authentication', function() {
      return userInfo;
    });

    getSettings = sinon.stub(chargesService, 'getSettings');
    getSettings.returnsPromise().resolves(settingsResponse);

    getReport = sinon.stub(chargesService, 'getReport');
    getReport.returnsPromise().resolves(reportResponse);

    exportPreBillAdjustments = sinon.stub(chargesService, 'exportPreBillAdjustments');
    exportPreBillAdjustments.returnsPromise().resolves(preBillAdjustmentsResponse);

    getNonStandardCharges = sinon.stub(chargesService, 'getNonStandardCharges');
    getNonStandardCharges.returnsPromise().resolves(nonStandardChargesResponse);

    getCurrency = sinon.stub(accountService, 'getCurrency');
    getCurrency.returnsPromise().resolves(currencyJsonResponse);

    $httpBackend.expectGET('/static/default/i18n/common/locale-en.json')
      .respond(currencyJsonResponse);
    $httpBackend.expectGET('/static/default/i18n/security/locale-en.json')
      .respond(currencyJsonResponse);
    $httpBackend.expectGET('app/core/404.html')
      .respond(currencyJsonResponse);

    chargesController = $controller('chargesController', {
      '$scope': $scope
    });

    $scope.$emit('show_filter_intervals', '123', '2345');
    $scope.$emit('isBillAdjustmentPopup', '123','true');
    $scope.$emit('billAdjustmentViewAllClick','123','Charges');
    $scope.$emit('nscPopupData','123','true');
    $scope.$emit('allowSelfCare_editAccountInfo','123','true');
    $scope.$broadcast('hardClosedIntervals_editAccountInfo','123','1234');
    $scope.$emit('showBillAdjustmentPopup', 'true');
    $scope.$emit('billAdjustmentPopupData', 'true');
    $scope.$emit('expanded', 'true');

    $httpBackend.flush();
  }));

  afterEach(function() {
    sandbox.restore();
    sinon.restore(chargesService.getSettings);
    sinon.restore(chargesService.getReport);
    sinon.restore(accountService.getCurrency);
    sinon.restore(accountService.exportPreBillAdjustments);
    sinon.restore(accountService.getNonStandardCharges);
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('chargesController should be defined', function() {
    expect(chargesController).to.exist;
  });

  it('should set nodata flag to false by default', function() {
    expect(chargesController.nodata).to.be.false;
  });

  it('should set isBillAdjustmentPopup flag to false by default', function() {
    expect(chargesController.isBillAdjustmentPopup).to.be.false;
  });

  it('vm.user should be assigned correctly', function() {
    expect(JSON.stringify(chargesController.user)).to.equal(JSON.stringify(userInfo.userInfo));
  });

  it('should resolve chargesService.getSettings()', function() {
    getSettings.returnsPromise().resolves(settingsResponse);
  });

  it('should reject chargesService.getSettings()', function() {
    getSettings.returnsPromise().rejects('a reason');
  });

  it('should resolve chargesService.getReport()', function() {
    getReport.returnsPromise().resolves(reportResponse);
  });

  it('should reject chargesService.getReport()', function() {
    getReport.returnsPromise().rejects('a reason');
    expect(chargesService.exportError).to.be.true;
  });

  it('should resolve chargesService.getCurrency()', function() {
    getCurrency.returnsPromise().resolves(currencyJsonResponse);
  });

  it('should reject chargesService.getCurrency()', function() {
    getCurrency.returnsPromise().rejects('a reason');
    expect(chargesService.currency).to.equal('');
  });

  it('should resolve chargesService.exportPreBillAdjustments()', function() {
    exportPreBillAdjustments.returnsPromise().resolves(preBillAdjustmentsResponse);
  });

  it('should reject chargesService.exportPreBillAdjustments()', function() {
    exportPreBillAdjustments.returnsPromise().rejects('a reason');
  });

  it('should resolve chargesService.getNonStandardCharges()', function() {
    getNonStandardCharges.returnsPromise().resolves(nonStandardChargesResponse);
    expect(chargesController.nscDetailsArray).to.have.length.above(0);
    expect(chargesController.isNscExist).to.be.true;

  });

  it('should reject chargesService.getNonStandardCharges()', function() {
    getNonStandardCharges.returnsPromise().rejects('a reason');
  });

  it('should call showBillAdjustmentPopup', function() {
    chargesController.showBillAdjustmentPopup(null, true);
  });

  it('should call positionElement', function() {
    chargesController.positionElement(10, 15);
  });

  it('should call setCardLayOutDetails', function() {
    chargesController.setCardLayOutDetails();
  });

  it('should call handleExportError', function() {
    chargesController.handleExportError();
  });

  it('should call chargesExpandedStateclose', function() {
    chargesController.chargesExpandedStateclose();
  });

  it('should call setbillAdjustmentDataCharges', function() {
    chargesController.setbillAdjustmentDataCharges();
  });

  it('should call showChargesExpandView', function() {
    chargesController.showChargesExpandView();
  });

  it('should call chargesData', function() {
    chargesController.chargesData();
  });

  it('should call chargesError', function() {
    chargesController.chargesError();
  });

  it('should call showChargesCompleteDetails', function() {
    chargesController.showChargesCompleteDetails({ limit: '' });
  });

  it('should call chargesDownArrow', function() {
    chargesController.chargesDownArrow(10);
  });

  it('should call chargesUpArrow', function() {
    chargesController.chargesUpArrow(15);
  });

  it('should call displayChargesAdjustmentDetails', function() {
    chargesController.displayChargesAdjustmentDetails(8);
  });

  it('should call chargesAdjustmentDetails', function() {
    chargesController.chargesAdjustmentDetails(15);
  });

  it('should call setChargesGridOptions', function() {
    chargesController.setChargesGridOptions();
  });

  it('should call showChargesCardView', function() {
    chargesController.showChargesCardView();
  });

  it('should call showChargesTabularView ', function() {
    chargesController.showChargesTabularView ();
  });

  it('should call isChargesExpandCardView ', function() {
    chargesController.isChargesExpandCardView ();
  });

  it('should call toggleChargesTabularViewSettings', function() {
    chargesController.toggleChargesTabularViewSettings();
  });

  it('should call isChargesSettings', function() {
    chargesController.isChargesSettings();
  });

  it('should call isChargesExpandTabularView', function() {
    chargesController.isChargesExpandTabularView();
  });

  it('should call toggleChargesHeaderSelection', function() {
    chargesController.toggleChargesHeaderSelection();
  });

  it('should call toggleChargesSelectAll', function() {
    chargesController.toggleChargesSelectAll();
  });

  it('should call applyChargesCancelSettings', function() {
    chargesController.applyChargesCancelSettings();
  });

   it('should call getChargesActiveViewStyle', function() {
    chargesController.getChargesActiveViewStyle('card');
  });

  it('should call getChargesGridHeight', function() {
    chargesController.getChargesGridHeight();
  });

  it('should call handleNscError', function() {
    chargesController.handleNscError();
    expect(chargesController.isNscExist).to.be.false;
  });
});
