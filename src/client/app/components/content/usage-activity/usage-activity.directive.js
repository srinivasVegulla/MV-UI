(function() {
  'use strict';

  angular
    .module('app.usage-activity')
    .directive('ecbUsageActivity', Directive);

  Directive.inject = [
    '$parse',
    '$window',
    'logger',
    '$filter',
    'filterService',
    'usageActivityService'
  ];

  function Directive(
    $parse,
    $window,
    logger,
    $filter,
    filterService,
    usageActivityService
  ) {
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/components/content/usage-activity/usage-activity.html',
      controller: 'usageActivityController',
      controllerAs: 'ua',
      scope: {
        configGetterFn: '&'
      },
      link: function(scope, element) {
        scope.accountId = scope.configGetterFn({widgetName: 'ecbUsageActivity', attributeName: 'accountId'});
        element.on('$destroy', function() {
          scope.$destroy();
        });
      }
    };
    return directive;
  }
})();
