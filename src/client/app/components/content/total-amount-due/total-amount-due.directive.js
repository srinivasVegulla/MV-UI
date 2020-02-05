(function() {
  'use strict';

  angular
    .module('app.total-amount-due')
    .directive('ecbTotalAmountDue', Directive);

  function Directive() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/content/total-amount-due/total-amount-due.html',
      controller: 'totalAmountDueController',
      controllerAs: 'vm',
      scope: {
        configGetterFn: '&',
        ecbWidgetState: '@'
      },
      link: function(scope, element) {
        scope.currency = scope.configGetterFn({widgetName: 'ecbTotalAmountDue', attributeName: 'currency'});
        scope.idPaymentInstrument = scope.configGetterFn({widgetName: 'ecbTotalAmountDue', attributeName: 'idPaymentInstrument'});
        scope.accountId = scope.configGetterFn({widgetName: 'ecbTotalAmountDue', attributeName: 'accountId'});
        element.on('$destroy', function() {
          scope.$destroy();
        });
      }
    };

    return directive;
  }
})();
