(function() {
  'use strict';

  angular
    .module('app.account')
    .directive('ecbAccountInfo', Directive);

  Directive.$inject = [];

  /* @ngInject */
  function Directive() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/content/account/account-info.html',
      controller: 'accountInfoController',
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        accountId: '@',
      },
    };

    return directive;
  }
})();
