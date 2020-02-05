(function() {
  'use strict';
  angular
    .module('app.accountsManager')
    .directive('ecbAccountsManager', Directive);

  function Directive() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/components/content/accountsManager/accountsManager.html',
      controller: 'accountsManagerController',
      controllerAs: 'vm',
      scope: {
        configGetterFn: '&'
      },
      link: function(scope) {
        scope.accountId = scope.configGetterFn({widgetName: 'ecbAccountsManager', attributeName: 'accountId'});
      }
    };
    return directive;
  }
})();
