(function() {
  'use strict';

  angular
  .module('app.payModal', [
    'app.security',
    'app.payment-methods',
    'app.total-amount-due',
    'ngSanitize',
    'app.asideModal'
  ]);
})();
