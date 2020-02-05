(function() {
  'use strict';

  angular.module('app.dashboard', [
      'app.core',
      'app.account',
      'app.total-amount-due',
      'app.layout',
      'app.billAdjustmentPopup',
      'app.utility'
    ])
    .run(appRun);

  appRun.$inject = [
    'translatorHelper',
  ];

  function appRun(translatorHelper) {
    translatorHelper.addPart('dashboard');
  }
})();
