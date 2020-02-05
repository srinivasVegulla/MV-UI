(function() {
  'use strict';
  angular
    .module('blocks.translator')
    .factory('localeSelectorService', Service);

  Service.$inject = [
    '$http'
  ];

  /* @ngInject */
  function Service($http) {
    // Public API
    var service = {
      getLocaleFlagsData: getLocaleFlagsData
    };

    return service;

    function getLocaleFlagsData(siteName) {
      var request = {
        method: 'GET',
        url: '/static/' + siteName + '/localeConfig/localeSelector.json' + '?v=' + Math.random(),
      };

      return $http(request).then(function(response) {
          var localeFlagsDataResponse = response;
          return localeFlagsDataResponse;
        });
    }
  }
}());
