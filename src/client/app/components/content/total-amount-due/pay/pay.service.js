(function() {
  'use strict';

  angular
    .module('app.payModal')
    .factory('payService', Service);

  Service.$inject = [
    'logger',
    '$uibModal',
    '$aside',
    '$http'
  ];

  /* @ngInject */
  function Service(
    logger,
    $uibModal,
    $aside,
    $http) {
    // Public API
    var service = {
      open: open,
      getPayUsing: getPayUsing
    };

    return service;

    function open(accountId, currency, idPaymentInstrument) {
      var modalInstance = $aside.open({
        placement: 'right',
        animation: false,
        templateUrl: 'app/components/content/total-amount-due/pay/pay-modal.html',
        controller: 'payModalController',
        controllerAs: 'vm',
        bindToController: true,
        resolve: {
          accountId: function() {
            return accountId;
          },
          currency: function() {
            return currency;
          },
          idPaymentInstrument: function() {
            return idPaymentInstrument;
          }
        },
        windowClass: 'pay-modal ecb-aside-modal',
        backdrop: 'static',
        keyboard: false,
      });
    }

     function getPayUsing() {
      var request = {
        method: 'GET',
        url: 'api/paymentmethods/payusingtypes',
      };

      return $http(request)
        .then(function(response) {
          return response;
        });
    }
  }
}());
