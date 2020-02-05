(function() {
  'use strict';
  angular
    .module('app.accountSettings')
    .controller('paperInvoiceModalController', Controller);

  Controller.$inject = [
    'logger',
    '$uibModalInstance',
    'paperInvoiceModalService',
    'accountId',
    '$filter',
    '$rootScope',
    '$scope',
    'translatorHelper'
  ];

  /* @ngInject */
  function Controller(logger, $uibModalInstance, paperInvoiceModalService, accountId, $filter, $rootScope, $scope, translatorHelper) {
    /* jshint validthis: true */
    var vm = this;
    vm.invoiceMethodError = false;
    vm.save = save;
    vm.cancel = cancel;
    vm.invoiceMethodInfo = {};
    vm.updateInvoiceMethod = updateInvoiceMethod;

    activate();

    function activate() {
      getInvoiceMethods();
      var i18n = translatorHelper.loadFromStorage();
      vm.layoutLeftDirection = 'left';
      vm.layoutRightDirection = 'right';
      if (i18n.languageDirection == 'RTL') {
        vm.layoutLeftDirection = 'right';
        vm.layoutRightDirection = 'left';
      }
    }

    function save() {
      vm.loading = true;
      var invoiceMethodUpdated = ($filter('translate')('TEXT_INVOICE_METHOD_UPDATE_SUCCESSFUL'));
      var invoiceMethodUpdateError = ($filter('translate')('TEXT_INVOICE_METHOD_UPDATE_FAIL'));
      paperInvoiceModalService.update(vm.invoiceMethodInfo, accountId)
        .then(function(result) {
          logger.success(invoiceMethodUpdated, {
            result : result,
          });
          $rootScope.$emit('invoiceMethodName', vm.invoiceMethodInfo.invoiceMethodName);
          $uibModalInstance.close(vm.invoiceMethodInfo);
        })
        .catch(function (error) {
          if(error.status !== 304) {
            vm.error = error.data;
            if (vm.error.exception) {
              vm.errorMessage = (vm.error.exception.indexOf('HttpHostConnectException') > -1) ? 1 : '';
            } else {
              vm.errorMessage = 2;
            }
          }
          else {
            logger.success(invoiceMethodUpdated, {
            });
            $rootScope.$emit('invoiceMethodName', vm.invoiceMethodInfo.invoiceMethodName);
            $uibModalInstance.close(vm.invoiceMethodInfo);
          }
        }).finally(function () {
          vm.loading = false;
        });
     }

    function getInvoiceMethods() {
      paperInvoiceModalService.getInvoiceMethods(accountId).then(function (response) {
        vm.invoiceMethods = response.InvoiceMethods;
        
        if (response.SelectedMethod === null) {
          vm.invoiceMethodInfo.invoiceMethodId = null;
          vm.invoiceMethodInfo.invoiceMethodName = null;
          vm.selectedMethod = $filter('translate')('TEXT_NONE');
        }
        else {
          vm.invoiceMethodInfo.invoiceMethodId = response.SelectedMethod.invoiceMethodId;
          vm.invoiceMethodInfo.invoiceMethodName = response.SelectedMethod.invoiceMethodName;
          vm.selectedMethod = response.SelectedMethod.invoiceMethodName;
          $rootScope.$emit('invoiceMethodName', response.SelectedMethod.invoiceMethodName);
        }
      })
      .catch(function (error) {
        vm.error = error.data;
        vm.errorMessage = 3;
      });
    }

    function updateInvoiceMethod(index) {
      vm.invoiceMethodInfo.invoiceMethodId = vm.invoiceMethods[index].invoiceMethodId;
      vm.invoiceMethodInfo.invoiceMethodName = vm.invoiceMethods[index].invoiceMethodName;
      vm.selectedMethod = vm.invoiceMethods[index].invoiceMethodName;
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
})();
