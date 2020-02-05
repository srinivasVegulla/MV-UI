(function() {
  'use strict';
  angular
    .module('app.filter')
    .factory('filterService', Service);

  Service.$inject = [
    '$http',
    'logger',
    '$q',
    'localStorageService',
    'utilityService'
  ];


  /* @ngInject */
  function Service($http, logger, $q, localStorageService, utilityService) {

    // Public API
    var service = {
      getFilter: getFilterData
    };

    return service;

    function getFilterData(accountId) {
      var userType = localStorageService.get("userType");
      var deferred = $q.defer();
      var accountFilters = localStorageService.get('accountFilterData');
      if(accountFilters && accountFilters[accountId]){
        deferred.resolve(getFiltersWithDateObject(accountFilters[accountId]));
        return deferred.promise;
      }
      if(!userType){
        deferred.resolve(null);
        return deferred.promise;
      }

      var request = {
        method: 'GET',
        url: 'api/billing/accountInterval/' + accountId,
        params: {
          lang: localStorageService.get('i18n').currentMetraNetLocale,
          userType : userType,
          namespace: utilityService.getNameSpace()
        }
      };

      return $http(request).then(function(response) {
        var accountFilters = localStorageService.get('accountFilterData');
        if(!accountFilters) accountFilters = {};
        accountFilters[accountId] = response;
        localStorageService.set('accountFilterData', accountFilters);
        return getFiltersWithDateObject(response);
      });
    }

    function getFiltersWithDateObject(filters){
      angular.forEach(filters.data.accountIntervals, function(value, index) {
        value.startDate = new Date(value.startDate);
        value.endDate = new Date(value.endDate);
      });
      return filters;
    }
  }
}());
