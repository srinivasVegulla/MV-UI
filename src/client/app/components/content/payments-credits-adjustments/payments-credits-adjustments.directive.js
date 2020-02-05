(function() {
  'use strict';

  angular
    .module('app.payments-credits-adjustments')
    .directive('ecbPaymentsCreditsAdjustments', Directive);

  function Directive() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/components/content/payments-credits-adjustments/payments-credits-adjustments.html',
      controller: 'paymentsCreditsAdjustmentsController',
      controllerAs: 'vm',
      scope: {
        configGetterFn: '&'
      },
      link: function(scope, element) {
        scope.accountId = scope.configGetterFn({widgetName: 'ecbPaymentsCreditsAdjustments', attributeName: 'accountId'});
        element.on('$destroy', function() {
          scope.$destroy();
        });
      }
    };
    return directive;
  }
})();
