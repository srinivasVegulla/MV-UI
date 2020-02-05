(function() {
  'use strict';
  angular
    .module('app.usage-activity')
    .factory('usageActivityService', Service);

  Service.$inject = [
    '$http',
    'localStorageService',
    'utilityService'
  ];


  /* @ngInject */
  function Service($http, localStorageService, utilityService) {

    // Public API
    var service = {
      getActivity: getUsageActivity,
      };

    return service;

     function getUsageActivity(accountId, intervalId, billCount) {
      var authdata = localStorageService.get('authorizationData');
      var request = {
        method: 'GET',
        url: 'api/billing/usageactivity/' + accountId + '/' + intervalId,
        params: {
          secondPass: (authdata.userInfo.secondPassData === 'F') ? 'false' : 'true',
          limit: billCount,
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
