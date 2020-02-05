(function() {
  'use strict';

  angular
    .module('blocks.translator', [
      'blocks.logger',
      'pascalprecht.translate',
      'ngCookies',
      'tmh.dynamicLocale',
    ])
    .config(config)
    .run(appRun);

  config.$inject = [
    '$translateProvider',
    'tmhDynamicLocaleProvider',
    //'$animate'
  ];
  /* @ngInject */
  function config($translateProvider, tmhDynamicLocaleProvider) {
    $translateProvider
      .useLoader('$translatePartialLoader', {
        urlTemplate: '/static/default/i18n/{part}/locale-{lang}.json' // ToDo: Add namespace.
      })
      .preferredLanguage('en')
      .fallbackLanguage('en')
      .forceAsyncReload(true)
      .addInterpolation('$translateMessageFormatInterpolation')
      .useLocalStorage()
      .useSanitizeValueStrategy('escape')
      .useLoaderCache(true);

    tmhDynamicLocaleProvider
      .localeLocationPattern('/static/default/i18n/angular-i18n/angular-locale_{{locale}}.js');

    //$animate.enabled(false);
  }

  appRun.$inject = [
    '$rootScope',
    '$translate',
  ];
  /* @ngInject */
  function appRun($rootScope, $translate) {
    $rootScope.$on('$translatePartialLoaderStructureChanged', function () {
      $translate.refresh();
    });
  }
})();
