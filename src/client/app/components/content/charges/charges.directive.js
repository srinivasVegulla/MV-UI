(function() {
  'use strict';

  angular
    .module('app.charges')
    .directive('ecbCharges', Directive);

  function Directive() {
    var directive = {
      //bindToController: true,
      restrict: 'EA',
      templateUrl: 'app/components/content/charges/charges.html',
      controller: 'chargesController',
      controllerAs: 'vm',
      scope: {
        configGetterFn: '&',
        ecbWidgetState: '@'
      },
      link: function(scope, element) {
        scope.accountId = scope.configGetterFn({widgetName: 'ecbCharges', attributeName: 'accountId'});
        element.on('$destroy', function() {
          scope.$destroy();
        });
      }
    };
    return directive;
  }
})();
