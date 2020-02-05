/* jslint maxlen: 250 */
(function() {
  'use strict';

  angular
    .module('app.billAdjustmentPopup')
    .controller('billAdjustmentPopupController', Controller);

  Controller.$inject = [
    'logger',
    '$rootScope',
    '$scope',
    '$timeout',
    'utilityService',
    '$document'
  ];

  function Controller(
    logger,
    $rootScope,
    $scope,
    $timeout,
    utilityService,
    $document
    ) {

    var vm = this,
        billAdjustmentPopupData,
        nscPopupData,
        miscAdjustPopupData,
        billAdjustmentPopup;
    vm.setbillAdjustmentData = setbillAdjustmentData;    
    vm.showExpandView = showExpandView;
    vm.billAdjustmentData = null;
    vm.cardLayoutLimit = 2;
    vm.closePopup = closePopup;
    vm.isViewAll = false;
    vm.isDownloadBtn = true;
    vm.dataListArray = new Array();
    vm.nodata = true;
    var unregisterBillAdjustmentPopupEvents = [];
    vm.hoverPopupType = null;
    vm.showBillAdjustmentPopup = false;

    activate();

    function activate(){
      billAdjustmentPopupData = $rootScope.$on('billAdjustmentPopupData', function(event, data) {
          vm.isViewAll = false;
          vm.setbillAdjustmentData(data);
      });
      nscPopupData = $rootScope.$on('nscPopupData', function(event, data) {
          vm.isViewAll = false;
          vm.setbillAdjustmentData(data);
      });
      miscAdjustPopupData = $rootScope.$on('miscAdjustPopupData', function(event, data) {
          vm.isViewAll = false;
          vm.setbillAdjustmentData(data);
      });
      billAdjustmentPopup = $rootScope.$on('showBillAdjustmentPopup', function (event, data) {
        if(vm.showBillAdjustmentPopup != data)
          $timeout(function(){vm.showBillAdjustmentPopup = data; });
      });
      $document.on("keydown", function(event) {
        if(event.keyCode == 27 && vm.showBillAdjustmentPopup) {
          vm.closePopup();
        }
      });
      unregisterBillAdjustmentPopupEvents.push(billAdjustmentPopupData);
      unregisterBillAdjustmentPopupEvents.push(nscPopupData);
      unregisterBillAdjustmentPopupEvents.push(miscAdjustPopupData);
      unregisterBillAdjustmentPopupEvents.push(billAdjustmentPopup);
    }

    // header, filename, currency, dataList, dataListHeader
    function setbillAdjustmentData(data){
      if(data.componentName == "PaymentsReceived"){
        vm.hoverPopupType = "PaymentsReceived";
        vm.isDownloadBtn = false;
      } else if (data.componentName == "Payments History") {
        vm.hoverPopupType = "PaymentsHistoryDetails";
        vm.isDownloadBtn = false;
      } else if (data.componentName == "NonStandardCharges") {
        vm.hoverPopupType = "nonStandardCharges";
        vm.isDownloadBtn = true;
      } else if (data.componentName == "MiscAdjustments") {
        vm.hoverPopupType = "MiscAdjustments";
        vm.isDownloadBtn = true;
      } else{
        vm.hoverPopupType = "billAdjustment";
        vm.isDownloadBtn = true;
      }
      vm.billAdjustmentData = data;
      vm.dataListArray = new Array();
      if(data.dataList){
        if(data.dataList.length > 0){
          for(var i=0; i < vm.cardLayoutLimit; i++){
            if(data.dataList[i])
              vm.dataListArray.push(data.dataList[i]);
          }
        }
        vm.nodata = data.dataList.length == 0 ? true : false;
        //vm.isViewAll = data.dataList.length > vm.cardLayoutLimit ? true : false;
        vm.isViewAll = data.dataList.length > 0 ? true : false;;
      }
    }
    
    function closePopup(){
      angular.element('.ecb-billAdjustmentPopup').hide();
      $timeout(function(){
        $scope.$emit('showBillAdjustmentPopup', false);
        $scope.$emit('isBillAdjustmentPopup', false);
      }, 10);
    }

    function showExpandView(){
      $timeout(function(){
        vm.closePopup();
        $scope.$emit('billAdjustmentViewAllClick', vm.billAdjustmentData.componentName);
      }, 0);
    }

    vm.getCurrencySign = function(code) {
      return utilityService.getCurrencySign(code);
    }

    vm.currencyFormatter = function(value, code, isSymbol) {
      return utilityService.currencyFormatter(value, code, isSymbol);
    }

    $scope.$on('$destroy',function(){
      for(var i = 0; i < unregisterBillAdjustmentPopupEvents.length; i++){
        unregisterBillAdjustmentPopupEvents[i]();
      }
    });
  }
})();
