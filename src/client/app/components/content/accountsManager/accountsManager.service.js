(function() {
  'use strict';
  angular
    .module('app.accountsManager')
    .factory('accountsManagerService', Service);

  Service.$inject = [
    '$http'
  ];

  /* @ngInject */
  function Service($http) {

    // Public API
    var service = {
      userCapabilities: userCapabilities,
      userAccountHierarchy: userAccountHierarchy
    };

    return service;

    function userCapabilities(activeUserName, activeUsernamespace){
      var request = {
        method: 'GET',
        url: 'api/accounts/'+ activeUserName +'/capabilities?',
        params: {
          namespace: activeUsernamespace,
        },
      };

      return $http(request)
        .then(function(response) {
          var userCapabilities = response;
          return userCapabilities;
        });
    }

    function userAccountHierarchy(activeUserAccountId, locale){
      var request = {
        method: 'GET',
        url: 'api/accounts/'+ activeUserAccountId +'/managedaccounts',
        params: {
          lang: locale,
        }
      };

      return $http(request)
        .then(function(response) {
          var manageAccounts = response;
          return manageAccounts;
        });
    }
  }
}());
