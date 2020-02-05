(function() {
  'use strict';

  angular
    .module('app.payment-methods')
    .directive('ecbPaymentMethods', Directive);

  function Directive() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/components/content/payment-methods/payment-methods.html',
      controller: 'paymentMethodsController',
      controllerAs: 'vm',
      scope: {
        configGetterFn: '&'
      },
      link: function(scope, element) {
        scope.currency = scope.configGetterFn({widgetName: 'ecbPaymentMethods', attributeName: 'currency'});
        scope.accountId = scope.configGetterFn({widgetName: 'ecbPaymentMethods', attributeName: 'accountId'});
        element.on('$destroy', function() {
          scope.$destroy();
        });
      }
    };
    return directive;
  }
})();
