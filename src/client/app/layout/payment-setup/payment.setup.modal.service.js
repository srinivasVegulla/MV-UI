(function() {
  'use strict';

  angular
    .module('app.layout.payment-setup')
    .factory('paymentSetupModalService', Service);

  Service.$inject = [
    'logger',
    '$uibModal',
    '$aside',
    '$http',
    'localStorageService',
    'utilityService'
  ];

  /* @ngInject */
  function Service(logger, $uibModal, $aside, $http, localStorageService, utilityService) {
    // Public API
    var service = {
      open: open,
      update: updateAccount,
      getAutoPay: getAutoPay
    };

    return service;

    function open(accountId) {
      var modalInstance = $aside.open({
        placement: 'right',
        animation: false,
        templateUrl: 'app/layout/payment-setup/payment-setup-modal.html',
        controller: 'paymentSetupModalController',
        controllerAs: 'vm',
        bindToController: true,
        resolve: {
          accountId: function() {
            return accountId;
          }
        },
        windowClass: 'payment-setup-modal ecb-aside-modal',
        backdrop: 'static',
        keyboard: false,
      });
    }

    function updateAccount(accountId, idPaymentInstrument, payType) {
      var cardIdPaymnentInstrument = '';
      var priority = 0;

      if (payType == 'metratech.com/accountcreation/PaymentMethod/CreditOrACH' || payType == '') {
        cardIdPaymnentInstrument = idPaymentInstrument;
        priority = 1;
      }
      var params = '{\"idPaymentInstrument\" : \"' + cardIdPaymnentInstrument + '\", \"autoPay\": \"' + payType + '\", \"idPriority\":' + priority + '}';


      return $http.put('api/paymentmethods/updateautopay/' + accountId + '?lang=' + localStorageService.get('i18n').currentMetraNetLocale + '&namespace=' + utilityService.getNameSpace(), params)
        .then(function(response) {

          return accountId;
        });
    }

    function getAutoPay(accountId) {

      var request = {
        method: 'GET',
        url: 'api/paymentmethods/autopaystatus/' + accountId,
        params: {
          lang: localStorageService.get('i18n').currentMetraNetLocale,
          namespace: utilityService.getNameSpace()
        },
      };

      return $http(request)
        .then(function(response) {
          return response;
        });
    }
  }
}());
