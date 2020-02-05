(function() {
  'use strict';

  angular
    .module('app.forgotPasswordInstruction',[
      'app.core'
    ]).run(appRun);

  appRun.$inject = [
    'translatorHelper',
  ];

  function appRun(translatorHelper) {
    translatorHelper.addPart('forgotPasswordInstruction');
  }
})();
