(function () {
  'use strict';

  angular
  .module('app.subscriptions')
  .directive('ecbSubscriptions', Directive);

  function Directive() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/content/subscriptions/subscriptions.html',
      controller: 'subscriptionsController',
      controllerAs: 'vm',
      scope: {
        configGetterFn: '&'
      },
      link: function(scope, element) {
        scope.accountId = scope.configGetterFn({widgetName: 'ecbSubscriptions', attributeName: 'accountId'});
        element.on('$destroy', function() {
          scope.$destroy();
        });
      }
    };
    return directive;
  }
})();
