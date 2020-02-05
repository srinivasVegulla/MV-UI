(function() {
  'use strict';

  angular
    .module('app.payModal')
    .directive('ecbPayModal', Directive);

  Directive.$inject = [];

  /* @ngInject */
  function Directive() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/content/total-amount-due/pay/pay-modal.html',
      controller: 'payModalController',
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        accountId: '@',
        currency: '@'
      }
    };
    return directive;
  }
});
