(function() {
  'use strict';
  angular
    .module('app.sinceLastBill')
    .factory('sinceLastBillService', Service);

  Service.$inject = [
    '$http'
  ];
  /* @ngInject */
  function Service($http) {
  	var service = {
      getTransactionsCount: getTransactionsCount,
      getQuotesCount : getQuotesCount
    };

    return service;
    
    function getTransactionsCount(accountId, startDate, endDate, namespace) {
      var request = {
        method: 'GET',
        url: 'api/billing/transactions/' + accountId,
        params: {
          startdate: startDate,
          enddate: endDate,
          namespace: namespace
        }
      };
      return $http(request)
        .then(function(response) {
          return response;
      });
    }

    function getQuotesCount(accountId, startDate, endDate, namespace) {
      var request = {
        method: 'GET',
        url: 'api/downloadReports/quotecount/' + accountId,
        params: {
          startdate: startDate,
          enddate: endDate,
          namespace: namespace
        }
      };
      return $http(request)
        .then(function(response) {
          return response;
      });
    }
  }
}());
