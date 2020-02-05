(function() {
  'use strict';
  angular
    .module('app.payer.subscriptions')
    .factory('payerSubscriptionsService', Service);

  Service.$inject = [
    '$http',
    'logger',
    'utilityService',
    'localStorageService'
  ];


  /* @ngInject */
  function Service($http, logger, utilityService, localStorageService) {
    // Public API
    var service = {
      getPayeeSubscriptions: getPayeeSubscriptions
    };

    return service;

    function getPayeeSubscriptions(idInterval, accountId) {
      var request = {
        method: 'GET',
        url: 'api/subscriptions/payees/' + accountId,
        params: {
          intervalid: idInterval,
          lang: localStorageService.get('i18n').currentMetraNetLocale,
          namespace: utilityService.getNameSpace(),
         },
      };

      return $http(request).then(function(response) {
          if (response) {
            return response.data.payeesubscriptionDetails;
          }
        });
   }

  }
}());
