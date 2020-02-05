(function () {
  'use strict';

  angular
    .module('app.accountSettings')
    .factory('accountSettingsService', Service);

  Service.$inject = [
    '$http', 'utilityService'
  ];

  /* @ngInject */
  function Service($http, utilityService) {
    
    var service = {
      getUserTimeZone : getUserTimeZone,
    };
    var userTimeZone = {};
    return service;

    function getUserTimeZone(accountId) {
      var params = {
        namespace: utilityService.getNameSpace(),
      };
      var request = {
        method: 'GET',
        url: 'api/accounts/regionalsetting/' + accountId,
        params: params
      };

      return $http(request)
        .then(function (response) {
          userTimeZone = response.data.SelectedSetting.timeZone;
          return userTimeZone;
        });
    }
  }
}());
