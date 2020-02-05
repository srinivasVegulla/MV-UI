(function() {
  'use strict';
  angular
    .module('app.billing-activity')
    .factory('billingActivityService', Service);

  Service.$inject = [
    '$http',
    'utilityService'
  ];


  /* @ngInject */
  function Service($http, utilityService) {

    // Public API
    var service = {
      getActivity: getBillingActivity,
      };

    return service;

     function getBillingActivity(accountId, intervalId, billCount) {

      var request = {
        method: 'GET',
        url: 'api/billing/billingactivity/' + accountId + '/' + intervalId,
        params: {
          periodCount: billCount,
          namespace: utilityService.getNameSpace(),
        }
      };
      return $http(request)
        .then(function(response) {
          return response;
        });
    }
      }
}());
