(function() {
  'use strict';
  angular
    .module('app.accountsManager')
    .directive('ecbAccountsManagerDropdown', Directive);

  function Directive() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/components/content/accountsManager/accountsManagerDropdown.html',
      controller: 'accountsManagerController',
      controllerAs: 'vmad',
      scope: {
        accountId: '@'
      }
    };
    return directive;
  }
})();
