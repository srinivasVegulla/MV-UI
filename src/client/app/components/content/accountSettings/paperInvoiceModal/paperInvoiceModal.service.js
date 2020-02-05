(function() {
  'use strict';

  angular
    .module('app.accountSettings')
    .factory('paperInvoiceModalService', Service);

  Service.$inject = [
    '$http',
    'logger',
    '$uibModal',
    '$aside',
    'localStorageService',
    'utilityService'
  ];

  /* @ngInject */
  function Service($http, logger, $uibModal, $aside, localStorageService, utilityService) {
    // Public API
    var service = {
      open: open,
      getInvoiceMethods: getInvoiceMethods,
      update: updateInvoiceMethod,
    };

    var invoiceMethods;

    return service;

    function open(accountId) {

      var modalInstance = $aside.open({
        placement: 'right',
        animation: false,
        templateUrl: 'app/components/content/accountSettings/paperInvoiceModal/paperInvoiceModal.html',
        controller: 'paperInvoiceModalController',
        controllerAs: 'vm',
        bindToController: true,
        resolve: {
          accountId: function() {
            return accountId;
          }
        },
        windowClass: 'paperInvoiceModal ecb-aside-modal',
        backdrop: 'static',
        keyboard: false,
      });
    }

    function getInvoiceMethods(accountId) {
      var request = {
        method: 'GET',
        url: 'api/accounts/invoicemethod/' + accountId,
        params: {
          lang: localStorageService.get('i18n').currentMetraNetLocale,
          namespace: utilityService.getNameSpace(),
         },
      };

      return $http(request)
        .then(function (response) {
          invoiceMethods = response.data;
          return invoiceMethods;
        });
    }

    function updateInvoiceMethod(invoiceMethodInfo, accountId) {
      var params = {
        lang: localStorageService.get('i18n').currentMetraNetLocale,
        namespace: utilityService.getNameSpace(),
      };
      var request = {
        method: 'PUT',
        url: 'api/accounts/invoicemethod/' + accountId,
        params: params,
        data: invoiceMethodInfo
      };

      return $http(request)
        .then(function(response) {
          return invoiceMethodInfo;
        });
    }
  }
}());
