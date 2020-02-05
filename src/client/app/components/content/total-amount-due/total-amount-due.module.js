(function() {
  'use strict';

  angular
  // ToDo: This should be refactored to app.amountDue
    .module('app.total-amount-due', [
    'app.account',
    'app.payment-methods',
    'app.layout.payment-setup',
    'angular-momentjs',
    'app.payModal'
  ]);
})();
