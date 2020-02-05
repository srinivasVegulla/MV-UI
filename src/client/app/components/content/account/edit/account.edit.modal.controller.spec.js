describe('accountEditModalController', function() {
  var expect = chai.expect,
    accountEditModalController,
    $rootScope,
    $controller,
    $scope,
    authenticationService,
    createController,
    modalInstance = mockData.modalInstance(),
    account,
    accountInfo = mockData.account().accountInfo,
    countryService,
    translatorHelper,
    $uibModalInstance,
    filter,
    metaDataResponse = mockData.metaData().data.metadataInfo,
    accountEditForm = document.createElement('FORM'),
    countryDropdown = document.createElement('select');
    accountEditForm.setAttribute('name','accountEditForm');
    countryDropdown.setAttribute('name','countryDropdown');
    accountEditForm.appendChild(countryDropdown);
    //console.log(accountEditForm.countryDropdown);

  beforeEach(function() {
    module('app.account');
  });

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _accountService_,
    _countryService_,
    _translatorHelper_,
    _$filter_) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    account = _accountService_;
    countryService = _countryService_;
    translatorHelper = _translatorHelper_;
    //$uibModalInstance = _$uibModalInstance_;
    filter = _$filter_;

    sandbox = sinon.sandbox.create();
    sandbox.stub(account, 'info', function() {
      return accountInfo;
    });

    update = sinon.stub(account, 'update');

    getMetadata = sinon.stub(countryService, 'getMetadata');
    getMetadata.returnsPromise().resolves(metaDataResponse);

    createController = function() {
      return $controller('accountEditModalController', {
        '$scope': $scope,
        $uibModalInstance: modalInstance,
      });
    }

  }));

  afterEach(function() {
    sandbox.restore();
    // sinon.restore(account.update);
    sinon.restore(countryService.getMetadata);
  });

  it('accountEditModalController should be defined', function () {
    accountEditModalController = createController();
    expect(accountEditModalController).to.exist;
  });

  it('accountEditModalController should call activate', function () {
    accountEditModalController = createController();
    accountEditModalController.activate();
  });

  it('accountEditModalController should call countryDropdownIsvalid', function () {
    accountEditModalController = createController();
    accountEditModalController.countryDropdownIsvalid(accountEditForm);
  });
  it('accountEditModalController should execute countryDropdownIsvalid with Country Select', function () {
    accountEditModalController = createController();
    accountEditModalController.selectedCountry = "India";
    accountEditModalController.countryDropdownIsvalid(accountEditForm);
  });

  it('accountEditModalController should call save', function () {
    accountEditModalController = createController();
    update.returnsPromise().resolves(accountInfo);
    update.returnsPromise().rejects({"data": {"exception": "Fail"}});
    accountEditModalController.save();
  });

  it('accountEditModalController should call cancel', function () {
    accountEditModalController = createController();
    accountEditModalController.cancel();
  });

  it('accountEditModalController should call getCountry', function () {
    accountEditModalController = createController();
    accountEditModalController.getCountry();
  });

  it('accountEditModalController should call updateEnumName', function () {
    accountEditModalController = createController();
    accountEditModalController.selectedCountry = {
      enumId
    : 1, enumName
    : 'INDIA'}
    accountEditModalController.updateEnumName();
  });

  /* it('should call updateEnumName', function() {
    accountEditModalController = createController();
    accountEditModalController.updateEnumName();
  });

  it('should call getCountry', function() {
    accountEditModalController = createController();
    accountEditModalController.getCountry();
  });

  it('should call updateCountry', function() {
    accountEditModalController = createController();
    accountEditModalController.updateCountry(2);
  });

  it('should call save', function() {
    accountEditModalController = createController();
    accountEditModalController.save('1');
  }); */

});
