(function() {
  'use strict';

  angular
    .module('app.payments-credits-adjustments')
    .factory('paymentsReceivedModalService', Service);

  Service.$inject = [
    '$http',
    '$aside',
    'localStorageService',
    'utilityService'
  ];

  /* @ngInject */
  function Service(
    $http,
    $aside,
    localStorageService,
    utilityService) {
    // Public API
    var service = {
      open: open,
      getPayments: getPayments
    };

    return service;

    function open(accountId, idInterval) {

      var modalInstance = $aside.open({
        placement: 'right',
        animation: false,
        templateUrl: 'app/components/content/payments-credits-adjustments/payments-received/payments-received-modal.html',
        controller: 'paymentsReceivedModalController',
        controllerAs: 'vm',
        bindToController: true,
        resolve: {
          accountId: function() {
            return accountId;
          },
          idInterval: function() {
            return idInterval;
          }
        },
        windowClass: 'payments-received-modal ecb-aside-modal',
        backdrop: 'static',
        keyboard: false,
      });
    }

    function getPayments(accountId, idInterval) {
      var request = {
        method: 'GET',
        url: 'api/paymentmethods/paymentdetails/' + accountId + '/' + idInterval,
        params: {
          lang: localStorageService.get('i18n').currentMetraNetLocale,
          ecbarStatus : localStorageService.get("ecbarStatus"),
          namespace: utilityService.getNameSpace()
        },
      };

      return $http(request).then(function(response) {
        if (response) {
          return response.data.paymentdetails;
        }
      });
    }

  }
}());
