(function() {
  'use strict';

  angular
    .module('app.layout.payment-setup')
    .directive('ecbLayoutPaymentSetup', Directive);

  Directive.$inject = [];

  /* @ngInject */
  function Directive() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/layout/payment-setup/payment-setup-modal.html',
      controller: 'paymentSetupModalController',
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        accountId: '@',
      }
    };
    return directive;
  }
});
