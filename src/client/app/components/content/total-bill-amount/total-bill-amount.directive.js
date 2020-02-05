(function() {
  'use strict';
  angular
    .module('app.total-bill-amount')
    .directive('ecbTotalBillAmount', Directive);

  function Directive() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/components/content/total-bill-amount/total-bill-amount.html',
      controller: 'totalBillAmountController',
      controllerAs: 'vm',
      scope: {
        configGetterFn: '&'
      },
      link: function(scope, element) {
        scope.accountId = scope.configGetterFn({widgetName: 'ecbTotalBillAmount', attributeName: 'accountId'});
        element.on('$destroy', function() {
          scope.$destroy();
        });
      }
    };
    return directive;
  }
})();
