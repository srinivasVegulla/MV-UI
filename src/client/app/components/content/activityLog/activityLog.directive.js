(function() {
  'use strict';

  angular
    .module('app.activityLog')
    .directive('ecbActivityLog', Directive);

  function Directive() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/components/content/activityLog/activityLog.html',
      controller: 'activityLogController',
      controllerAs: 'vm',
      scope: {
        configGetterFn: '&'
      },
      link: function(scope, element){
        scope.accountId = scope.configGetterFn({widgetName: 'ecbActivityLog', attributeName: 'accountId'});
        element.on('$destroy', function() {
          scope.$destroy();
        });
      }
    };
    return directive;
  }
})();
