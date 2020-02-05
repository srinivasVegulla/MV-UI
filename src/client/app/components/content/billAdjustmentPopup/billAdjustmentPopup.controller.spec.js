describe('billAdjustmentPopupController', function() {
  var expect = chai.expect,    
  billAdjustmentPopupController,  
  $rootScope,
  $controller,
  $scope,
  createController,
  adjsutResponsibleMisc= {
    "componentName": "MiscAdjustments",
    "dataList": [
      {"amount": 123},
      {"amount": 345}
    ]
  };

  beforeEach(function() {
    module('app.billAdjustmentPopup');
  });

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_
  ) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    
    createController = function() {
      return $controller('billAdjustmentPopupController', {
        '$scope': $scope
      });
    }
  }));

  it('should be defined', function() {
    billAdjustmentPopupController = createController();
    expect(billAdjustmentPopupController).to.exist;
  });

  it('should emit events', function() {
    createController();
    $scope.$emit('billAdjustmentPopupData', true);
  });

  it('should call setbillAdjustmentData', function() {
    billAdjustmentPopupController = createController();
    billAdjustmentPopupController.setbillAdjustmentData({"componentName": "PaymentsReceived"});
    billAdjustmentPopupController.setbillAdjustmentData({"componentName": "Payments History"});
    billAdjustmentPopupController.setbillAdjustmentData({"componentName": "NonStandardCharges"});
    billAdjustmentPopupController.setbillAdjustmentData(adjsutResponsibleMisc);
  });

  it('should call closePopup', function() {
    billAdjustmentPopupController = createController();
    billAdjustmentPopupController.closePopup();
  });

  it('should call showExpandView', function() {
    billAdjustmentPopupController = createController();
    billAdjustmentPopupController.showExpandView();    
  });
  it('should call getCurrencySign ', function() {
    billAdjustmentPopupController = createController();
    billAdjustmentPopupController.getCurrencySign ();
  });
  it('should call currencyFormatter ', function() {
    billAdjustmentPopupController = createController();
    billAdjustmentPopupController.currencyFormatter();
  });
 });
