(function() {
  'use strict';

  angular
    .module('app.changePassword',[
      'app.core',
      'app.asideModal'
    ]).run(appRun);

  appRun.$inject = [
    'translatorHelper',
  ];

  function appRun(translatorHelper) {
    translatorHelper.addPart('changePassword');
  }
})();
