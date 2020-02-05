(function() {
  'use strict';

  angular
    .module('app.sinceLastBill')
    .directive('ecbSinceLastBill', Directive);

  function Directive() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/components/content/sinceLastBill/sinceLastBill.html',
      controller: 'sinceLastBillController',
      controllerAs: 'vm',
      scope: {
        configGetterFn: '&'
      },
      link: function(scope, element) {
        scope.accountId = scope.configGetterFn({widgetName: 'ecbSinceLastBill', attributeName: 'accountId'});
        element.on('$destroy', function() {
          scope.$destroy();
        });
      }
    };
    return directive;
  }
})();
