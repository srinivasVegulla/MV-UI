(function() {
  'use strict';

  angular
    .module('app.layout', [
      'app.core',
      'ui.bootstrap.collapse',
      'app.account',
      'app.layout.payment-setup',
      'blocks.logger',
      'app.security',
      'app.changePassword',
      'app.accountsManager'
    ])
    .run(appRun);

  appRun.$inject = [
    'translatorHelper',
  ];
  /* @ngInject */
  function appRun(translatorHelper) {
    //translatorHelper.addPart('shell');
  }
})();
