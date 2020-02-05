(function() {
  'use strict';

  angular
    .module('app.security', [
      'app.core',
      'LocalStorageModule',
      'ngIdle'
    ])
    .config(Config)
    .run(Run);

  Config.$inject = [
    '$httpProvider',
    'localStorageServiceProvider',
    'IdleProvider'
  ];

  /* @ngInject */
  function Config($httpProvider, localStorageServiceProvider, IdleProvider) {
    $httpProvider.interceptors.push('authenticationInterceptorService');

    localStorageServiceProvider
      .setPrefix('ecb.metraview')
      .setStorageType('sessionStorage')
      .setNotify(true, true);

    // User idle configuration.
    IdleProvider.idle(1200); // in seconds
    IdleProvider.timeout(false);
    IdleProvider.autoResume('notIdle');
    IdleProvider.keepalive(false);
  }

  Run.$inject = [
    '$rootScope',
    'authenticationService',
    'translatorHelper',
  ];

  /* @ngInject */
  function Run($rootScope, authentication, translator) {
    $rootScope.$on('$stateChangeStart', authentication.onStateChangeStartHandler);
    translator.addPart('security');
  }
})();
