(function() {
  'use strict';

  angular
    .module('app.viewSelector', [
      'app.core',
      'app.layout'
    ])
    .run(appRun);

  appRun.$inject = [
    'translatorHelper',
  ];
  /* @ngInject */
  function appRun(translatorHelper) {
    translatorHelper.addPart('viewSelector');
  }
})();
