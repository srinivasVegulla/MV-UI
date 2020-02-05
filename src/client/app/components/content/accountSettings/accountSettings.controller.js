(function() {
  'use strict';

  angular
    .module('app.accountSettings')
    .controller('accountSettingsController', Controller);

  Controller.$inject = [
    'logger',
    'accountSettingsService',
    'paymentSetupModalService',
    'accountSecurityModalService',
    'paperInvoiceModalService',
    '$rootScope',
    '$filter',
    '$scope',
    'localStorageService'
  ];

  /* @ngInject */
  function Controller(logger, accountSettings, paymentSetupModalService, accountSecurityModalService, paperInvoiceModalService, $rootScope, $filter, $scope, localStorageService) {
    /* jshint validthis: true */
    var vm = this, _payeeSubscriber;
    vm.paymentSetup = paymentSetupModalService.open;
    vm.securitySettings = accountSecurityModalService.open;
    vm.invoiceMethod = paperInvoiceModalService.open;

    $scope.$watch('accountId', function(acctId){
      if (!acctId)return;
      vm.accountId = acctId;
      vm.activate();
    });

    vm.activate = function() {
      vm.loading = true;
      accountSettings.getUserTimeZone(vm.accountId).then(function (response) {
        vm.userTimeZone = response;
      })
      .catch(function (error) {
        logger.log('Could not fetch user timezone', {
          error: error,
        });
      });

      _payeeSubscriber = localStorageService.get("payeeSubscriber");
      if(_payeeSubscriber ===  true){
        vm.autoPayoff = false;
        vm.paperInvoiceOff = false;
      }else{
        vm.autoPayoff = true;
        vm.paperInvoiceOff = true;
      }

      paymentSetupModalService.getAutoPay(vm.accountId).then(function(result) {
        if (result) {
          if (result.data.autopay === 1) {
            vm.autoPayStatus = $filter('translate')('TEXT_AUTOPAY_ON');
          }
          else {
            vm.autoPayStatus = $filter('translate')('TEXT_AUTOPAY_OFF');
          }
        }
      }).catch(handleError)
      .finally(function(){
        vm.loading = false;
      });

      paperInvoiceModalService.getInvoiceMethods(vm.accountId).then(function (response) {
        if (response.SelectedMethod === null) {
          vm.invoiceMethodName = null;
        }
        else {
          vm.invoiceMethodName = response.SelectedMethod.invoiceMethodName;
        }
      }).catch(handleError);

      $rootScope.$on('invoiceMethodName', function(event, data) {
        vm.invoiceMethodName = data;
      });

      $rootScope.$on('autoPayStatus', function(event, data) {
          if (data === 1) {
            vm.autoPayStatus = $filter('translate')('TEXT_AUTOPAY_ON');
          }
          else {
            vm.autoPayStatus = $filter('translate')('TEXT_AUTOPAY_OFF');
          }
      });

    }

    function handleError(error) {
      logger.log('Error retrieving data.Please contact customer support.', error);
    }
}
})();
