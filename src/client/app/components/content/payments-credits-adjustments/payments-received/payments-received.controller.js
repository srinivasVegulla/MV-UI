(function() {
  'use strict';

  angular
    .module('app.payments-credits-adjustments')
    .controller('paymentsReceivedModalController', Controller);  
   Controller.$inject = [
    '$http',
    '$scope',
    '$rootScope',
    '$uibModalInstance',
    'logger',
    'accountId',
    'paymentsReceivedModalService',
    '$moment',
    'utilityService'
  ];

  /* @ngInject */
  function Controller($http, 
    $scope, 
    $rootScope, 
    $uibModalInstance, 
    logger, 
    accountId, 
    paymentsReceivedModalService, 
    $moment, 
    utilityService) {
    
    var vm = this;
    vm.totalPaymentAmount = 0;
    vm.paymentsReceivedError = false;
    vm.closepaymentsReceived = closepaymentsReceived;
    vm.calendarDateFormat = vm.localizeDateFormat = utilityService.dateFormat;
    vm.getPayments = getPayments;
    activate();

    function activate() {
      utilityService.getLocaleDateFormatter().then(function () {
        vm.localizeDateFormat = vm.getDateFormatByLang();
      });
      getPayments();
    }
    
    function getPayments() {
      var idInterval = utilityService.getOrSetSelectedTimeInterVal().idInterval;
      paymentsReceivedModalService.getPayments(accountId, idInterval).then(function(response) {
        var paymentsReceivedResponse = angular.copy(response);
        vm.paymentsReceived = paymentsReceivedResponse.payments;
        vm.totalPaymentAmount = Math.abs(paymentsReceivedResponse.totalPayment);
        if(vm.paymentsReceived) {
          vm.paymentsReceived.forEach(function(payment) {
            payment.amount = Math.abs(payment.amount);
            payment.paymentDateString = $moment(payment.paymentDateString, vm.calendarDateFormat).format(vm.localizeDateFormat);
            //payment.paymentDateString = $moment.tz(payment.paymentDateString, "Europe/London").format('L');
            //payment.paymentDateString = dateFilter(new Date(payment.paymentDateString), 'shortDate');
          });
        }
      }).catch(function(error) {
          logger.log('Error occured in app.payments-received.paymentsReceivedController.getPayments()', {
            error: error
          });
          vm.paymentsReceivedError = true;
        });
    }
    vm.getCurrencySign = function(code) {
      return utilityService.getCurrencySign(code);
    }
    vm.currencyFormatter = function(value, code, isSymbol) {
      return utilityService.currencyFormatter(value, code, isSymbol);
    }

    function closepaymentsReceived () {
      $uibModalInstance.dismiss('cancel');
    }
    vm.getDateFormatByLang = function() {
      var dateFormat = utilityService.getDateFormatterByLang()['dateFormat'];
      return utilityService.isObject(dateFormat) ? dateFormat : vm.calendarDateFormat;
    }
  }

})();
