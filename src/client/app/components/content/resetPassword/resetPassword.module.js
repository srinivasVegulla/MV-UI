(function() {
  'use strict';

  angular
    .module('app.resetPassword',[
      'app.core',
      'ngSanitize',
      'app.account',
      'app.total-amount-due'
    ]).run(appRun);

  appRun.$inject = [
    'translatorHelper',
  ];

  function appRun(translatorHelper) {
    translatorHelper.addPart('resetPassword');
  }
})();
