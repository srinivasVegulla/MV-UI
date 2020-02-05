/* jslint maxlen: 250 */
(function() {
  'use strict';
  angular
    .module('app.total-bill-amount')
    .controller('totalBillAmountController', Controller);
  Controller.$inject = [
    '$rootScope',
    'totalBillAmountService',
    'accountService',
    'logger',
    'localStorageService',
    '$scope',
    'utilityService'
  ];

  /* @ngInject */
  function Controller($rootScope, totalBillAmountService, accountService, logger, localStorageService, $scope, utilityService) {
    /* jshint validthis:true */
    var vm = this,
      _idInterval,
      COMPONENT_NAME = 'Total bill amount',
      filterInterval,
      paymentAccomplishment;
    vm.totalBillAmount = {};
    vm.billAmount = '';
    vm.billCharges = ' ';
    vm.nodata = false;
    vm.gettotalBillAmount = gettotalBillAmount;
    vm.currency = '';
    var unregisterTotalBillAmountEvents = [];
    vm.loading = true;

    $scope.$watch('accountId', function(acctId){
      if (!acctId)return;
      vm.accountId = acctId;
      activate();
    });

    function activate() {
      filterInterval = $scope.$on('show_filter_intervals', function(event, idInterval, data) {
        if(!utilityService.cardState.expand) {
          vm.initiateWidgetService();
        }
      });
      vm.initiateWidgetService();
      unregisterTotalBillAmountEvents.push(filterInterval);
    }

    vm.initiateWidgetService = function() {
      vm.loading = true;
      vm.isCurrentBillingPeriod = utilityService.isCurrentBillingPeriod();
      var interval = utilityService.getOrSetSelectedTimeInterVal();
      vm.onDemandInterval = interval &&  interval.dateRange ? interval.dateRange.onDemandInterval : '';
      vm.invoiceNumber = interval &&  interval.dateRange ? interval.dateRange.invoiceNumber : '';
      if(vm.invoiceNumber === null){
        vm.invoiceNumber = '';
      }else{
        vm.invoiceNumber = interval &&  interval.dateRange ? interval.dateRange.invoiceNumber : '';
      }
      gettotalBillAmount();
    };

    paymentAccomplishment = $rootScope.$on('paymentDone', function() {
      gettotalBillAmount();
    });

    unregisterTotalBillAmountEvents.push(paymentAccomplishment);

    function gettotalBillAmount() {
      vm.loading = true;
      var idInterval = utilityService.getOrSetSelectedTimeInterVal().idInterval;
      if (idInterval) {
        totalBillAmountService.gettotalBillAmount(vm.accountId, idInterval, vm.invoiceNumber, vm.onDemandInterval)
          .then(function(response) {
            if (response) {
              vm.nodata = false;
              vm.billChargesRespdata = response.data;
              vm.nodata = false;
              vm.billCharges = vm.billChargesRespdata.totalChargedAmount;
              vm.totalBillAmount = vm.billChargesRespdata.totalAmount;
              vm.billAmount = vm.billChargesRespdata.totalReportAmount;
            } else {
              vm.nodata = true;
            }
          }).catch(function(err) {
            if (err.status === 404) {
              vm.nodata = true;
            }
          }).finally(function() {
            vm.loading = false;
          });
      }
    }
    vm.getCurrencySign = function(code) {
      return utilityService.getCurrencySign(code);
    }

    vm.currencyFormatter = function(value, code, isSymbol) {
      return utilityService.currencyFormatter(value, code, isSymbol);
    }

    function handleError(error) {
      logger.log('Error retrieving data. Please contact customer support.', error, COMPONENT_NAME);
    }

    $scope.$on('$destroy',function(){
      utilityService.cleanUpListners(unregisterTotalBillAmountEvents);
    });
  }
})();
