(function() {
  'use strict';

  angular
    .module('app.accountSettings')
    .directive('ecbAccountSettings', Directive);

  //Directive.$inject = [];

  /* @ngInject */
  function Directive() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/content/accountSettings/accountSettings.html',
      controller: 'accountSettingsController',
      controllerAs: 'vm',
      scope: {
        accountId: '@'
      }
    };

    return directive;
  }
})();
