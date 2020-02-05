(function() {
  'use strict';

  var core = angular.module('app.core');

  /*core.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  }]);*/

  core.config(toastrConfig);

  toastrConfig.$inject = [
    'toastr',
  ];
  /* @ngInject */
  function toastrConfig(toastr) {
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';
  }

  // ToDo: Use this value more?
  var config = {
    appErrorPrefix: '[UI Error] ',
    appTitle: 'Ericsson Enterprise and Cloud Billing'
  };

  core.value('config', config);

  core.config(configure);

  configure.$inject = [
    '$logProvider',
    'routerHelperProvider',
  ];
  /* @ngInject */
  function configure($logProvider, routerHelperProvider) {
    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }
    routerHelperProvider.configure({
      docTitle: config.appTitle + ': ',
    });
  }
})();
