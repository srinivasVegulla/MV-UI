(function() {
  'use strict';
  angular
    .module('app.utility')
    .filter('currencyFilter', Filter);

  Filter.$inject = ['localStorageService', 'utilityService', '$filter'];
  
  function Filter(localStorageService, utilityService, $filter) {
    return function (value, scope) {
      if(!value) return value;
      var record = null;
      if(scope.$parent.$parent.card) {
        record = scope.$parent.$parent.card;
      }else if(scope.$parent.$parent.row) {
        record = scope.$parent.$parent.row.entity;
      }
      if(record) {
        var currencyCode = record['hidden_row-currency'];
        value = utilityService.currencyFormatter(value, currencyCode);
      }
      return value;
    };
  }
}());
