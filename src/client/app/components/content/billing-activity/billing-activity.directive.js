(function() {
  'use strict';

  angular
    .module('app.billing-activity')
    .directive('ecbBillingActivity', Directive);

  Directive.inject = [
    '$parse',
    '$window',
    'logger',
    '$filter',
    'filterService',
    'billingActivityService'
  ];

  function Directive(
    $parse,
    $window,
    logger,
    $filter,
    filterService,
    billingActivityService
  ) {
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/components/content/billing-activity/billing-activity.html',
      controller: 'billingActivityController',
      controllerAs: 'vm',
      scope: {
        configGetterFn: '&'
      },
      link: function(scope, element) {
        scope.accountId = scope.configGetterFn({widgetName: 'ecbBillingActivity', attributeName: 'accountId'});
        element.on('$destroy', function() {
          scope.$destroy();
        });
      }
    };
    return directive;
  }
})();
