(function() {
  'use strict';

  angular
    .module('app.core', [
      //'ngAnimate',
      'ngSanitize',
      'blocks.logger',
      'blocks.router',
      'blocks.translator',
      'ui.router',
      'ngplus',
      'app.security',
      'pascalprecht.translate',
      'tmh.dynamicLocale',
      'ui.bootstrap',
      'ngAside',
      'app.utility',
      'ngMessages',
    ]);
})();
