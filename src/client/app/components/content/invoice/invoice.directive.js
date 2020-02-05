(function() {
  'use strict';

  angular
    .module('app.invoice')
    .directive('ecbInvoice', Directive);

  function Directive() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/components/content/invoice/invoice.html',
      controller: 'invoiceController',
      controllerAs: 'vm',
      scope: {
        configGetterFn: '&'
      },
      link: function(scope, element) {
        scope.accountId = scope.configGetterFn({widgetName: 'ecbInvoice', attributeName: 'accountId'});
        element.on('$destroy', function() {
          scope.$destroy();
        });
      }
    };
    return directive;
  }
})();
