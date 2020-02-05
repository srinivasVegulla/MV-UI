describe('accountSecurityModalController', function() {
  var expect = chai.expect,
    accountSecurityModalController,
    $rootScope,
    $controller,
    $scope,
    accountSecurityModalService,
    createController,
    localStorageService,
    filter,
    update,
    getSecurityQuestions,
    langData = mockData.localStorageData(),
    modalInstance = mockData.modalInstance();
    securitySettings = mockData.securitySettings();

  beforeEach(function() {
    module('app.accountSettings');
  });

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _accountSecurityModalService_,
    _localStorageService_,
    _translatorHelper_,
    _$filter_) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    accountSecurityModalService = _accountSecurityModalService_;
    translatorHelper = _translatorHelper_;
    filter = _$filter_;
    localStorageService = _localStorageService_

    sandbox = sinon.sandbox.create();
    sandbox.stub(localStorageService, 'get', function () {
      return langData;
    });

    createController = function() {
      return $controller('accountSecurityModalController', {
        '$scope': $scope,
        $uibModalInstance: modalInstance,
        accountId: '12345'
      });
    };

    update = sinon.stub(accountSecurityModalService, 'update');
    //getSecurityQuestions = sinon.stub(accountSecurityModalService, 'getSecurityQuestions');

  }));

  afterEach(function() {
    sandbox.restore();
    update.restore();
  });

  it('accountSecurityModalController should be defined', function() {
    accountSecurityModalController = createController();
    expect(accountSecurityModalController).to.exist;
  });

  it('accountSecurityModalController  should call save success', function() {
    accountSecurityModalController = createController();
    update.returnsPromise().resolves({});
    accountSecurityModalController.save();
  });
  it('accountSecurityModalController  should call save reject 304', function() {
    accountSecurityModalController = createController();
    update.returnsPromise().rejects({status: 304});
    accountSecurityModalController.save();
  });
  it('accountSecurityModalController  should call save rejcet 200', function() {
    accountSecurityModalController = createController();
    update.returnsPromise().rejects({status: 200, data: {exception: "HttpHostConnectException"}});
    update.returnsPromise().rejects({status: 200, data: {exception: null}});
    accountSecurityModalController.save();
  });

 /* it('accountSecurityModalController should call getSecurityQuestions success', function () {
    accountSecurityModalController = createController();
    getSecurityQuestions.returnsPromise().resolves({Questions: {SelectedQuestion: {}}});
    accountSecurityModalController.getSecurityQuestions();
  });
  
  it('accountSecurityModalController should call getSecurityQuestions fail', function () {
    accountSecurityModalController = createController();
    getSecurityQuestions.returnsPromise().rejects({});
    accountSecurityModalController.getSecurityQuestions();
  });
*/
  it('accountSecurityModalController should call updateSecurityQuestion', function () {
    accountSecurityModalController = createController();
    accountSecurityModalController.securityInfo = {};
    accountSecurityModalController.securityQuestions = securitySettings.data.Questions;
    accountSecurityModalController.updateSecurityQuestion(1);
  });

  it('accountSecurityModalController should call cancel', function () {
    accountSecurityModalController = createController();
    accountSecurityModalController.cancel();
  });
  it('accountSecurityModalController should call checkForOptionNone code None', function () {
    accountSecurityModalController = createController();
    accountSecurityModalController.securityInfo = {securityQuestionCode: "None"};
    accountSecurityModalController.checkForOptionNone();
  });
  it('accountSecurityModalController should call checkForOptionNone code not None', function () {
    accountSecurityModalController = createController();
    accountSecurityModalController.securityInfo = {securityQuestionCode : 'kk'};
    accountSecurityModalController.checkForOptionNone();
  });

});
