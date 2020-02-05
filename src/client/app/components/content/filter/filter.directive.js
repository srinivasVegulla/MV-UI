(function() {
  'use strict';

  angular
    .module('app.filter')
    .directive('ecbFilter', Directive);
  /* @ngInject */
  function Directive() {
    var directive = {
      bindToController: true,
      restrict: 'EA',
      templateUrl: 'app/components/content/filter/filter.html',
      controller: 'filterDataController',
      controllerAs: 'vm',
      scope: {
        accountId: '@',
        index: '='
      },
      link: function(scope, element) {
        element.on('$destroy', function() {
          scope.$destroy();
        });
      }
    };
    return directive;
  }
})();
