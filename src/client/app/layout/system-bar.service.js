(function() {
  'use strict';
  angular
    .module('app.layout')
    .factory('systemBarService', Service);

  Service.$inject = [
    '$http',
    'logger'
  ];


  /* @ngInject */
  function Service($http, logger) {

    // Public API
    var service = {
      getSiteSettings: getSiteSettings,
    };

    return service;

    function getSiteSettings(siteSettingId) {
      var request = {
        method: 'GET',
        url: 'api/sitebillsetting/sitesetting/'+siteSettingId,
        params: {},
      };

      return $http(request)
        .then(function(response) {
          var siteSettings = response.data;
          return siteSettings;
        })
        .catch(function(error) {
          logger.log('Error retrieving siteSettings.');
        });
    }    
  }
}());
