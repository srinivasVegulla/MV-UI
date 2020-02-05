(function () {
  'use strict';

  angular
  .module('app.payer.subscriptions')
  .directive('ecbPayerSubscriptions', Directive);

  function Directive() {
    var directive = {
      //bindToController: true,
      restrict: 'E',
      templateUrl: 'app/components/content/payer-subscriptions/payer-subscriptions.html',
      controller: 'payerSubscriptionsController',
      controllerAs: 'vm',
      scope: {
        configGetterFn: '&'
      },
      link: function(scope, element) {
        scope.accountId = scope.configGetterFn({widgetName: 'ecbPayerSubscriptions', attributeName: 'accountId'});
        element.on('$destroy', function() {
          scope.$destroy();
        });
      }
    };
    return directive;
  }
})();
