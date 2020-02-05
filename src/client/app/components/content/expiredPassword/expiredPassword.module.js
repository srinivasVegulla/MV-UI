(function() {
  'use strict';

  angular
    .module('app.expiredPassword',[
      'app.core'
    ]).run(appRun);

  appRun.$inject = [
    'translatorHelper',
  ];

  function appRun(translatorHelper) {
    translatorHelper.addPart('expiredPassword');
  }
})();
