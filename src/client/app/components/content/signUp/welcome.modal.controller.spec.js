describe('welcomeModalController', function() {
  var expect = chai.expect,
    welcomeModalController,
    $rootScope,
    $controller,
    $scope,
    authenticationService,
    createController,
    modalInstance = mockData.modalInstance(),
    amountDueService,
    getDuePayment,
    duePaymentResponse = mockData.billAmount().duePayment,
    creditMethodsResponse = mockData.payment().paymentMethods,
    paymentMethodsService,
    getCredit;

  beforeEach(function() {
    module('app.signUp');
  });

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _authenticationService_,
    _amountDueService_,
    _paymentMethodsService_) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    authenticationService = _authenticationService_;
    amountDueService = _amountDueService_;
    paymentMethodsService = _paymentMethodsService_;

    getDuePayment = sinon.stub(amountDueService, 'getDuePayment');

    getCredit = sinon.stub(paymentMethodsService, 'getCredit');

    createController = function() {
      return $controller('welcomeModalController', {
        '$scope': $scope,
        $uibModalInstance: modalInstance,
        accountId: '123456'
      });
    }

  }));

  afterEach(function() {
    sinon.restore(amountDueService.getDuePayment);
    sinon.restore(paymentMethodsService.getCredit);
  });

  it('should listen to hardClosedIntervals_editAccountInfo', function() {
    getDuePayment.returnsPromise().resolves(duePaymentResponse);
    getCredit.returnsPromise().resolves(creditMethodsResponse);
    createController();
    $scope.$emit('hardClosedIntervals_editAccountInfo', 'F');
  });

  it('should resolve getDuePayment', function() {
    getDuePayment.returnsPromise().resolves(duePaymentResponse);
    welcomeModalController = createController();
  });


  it('should reject getDuePayment', function() {
    getDuePayment.returnsPromise().rejects({ error: 'error' });
    welcomeModalController = createController();
  });

  it('should resolve getCreditMethods', function() {
    getDuePayment.returnsPromise().resolves(duePaymentResponse);
    getCredit.returnsPromise().resolves(creditMethodsResponse);
    welcomeModalController = createController();
    welcomeModalController.getCreditMethods();
  });

  it('should reject getCreditMethods with status 500', function() {
    getDuePayment.returnsPromise().resolves(duePaymentResponse);
    getCredit.returnsPromise().rejects({ status: 500 });
    welcomeModalController = createController();
    welcomeModalController.getCreditMethods();
  });

  it('should reject getCreditMethods with status 400', function() {
    getDuePayment.returnsPromise().resolves(duePaymentResponse);
    getCredit.returnsPromise().rejects({ status: 400 });
    welcomeModalController = createController();
    welcomeModalController.getCreditMethods();
  });

  it('should reject getCreditMethods with status 412', function() {
    getDuePayment.returnsPromise().resolves(duePaymentResponse);
    getCredit.returnsPromise().rejects({ status: 412 });
    welcomeModalController = createController();
    welcomeModalController.getCreditMethods();

  });

  it('should be defined', function() {
    expect(welcomeModalController).to.exist;
  });

  it('should call selfCareEnabled', function() {
    welcomeModalController.selfCareEnabled();
  });

  it('should call cancel', function() {
    welcomeModalController.cancel();
  });

  it('should call userName', function() {
    welcomeModalController.userName();
  });


  it('should call selfCareEnabled', function() {
    welcomeModalController.selfCareEnabled();
  });

  it('should call getCreditMethods', function() {
    welcomeModalController.getCreditMethods();
  });
});
