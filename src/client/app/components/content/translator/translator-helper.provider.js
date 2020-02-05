(function() {
  'use strict';

  angular
    .module('blocks.translator')
    .provider('translatorHelper', translatorHelperProvider);

  translatorHelperProvider.$inject = [
    '$translateProvider',
    '$translatePartialLoaderProvider',
  ];

  /* @ngInject */
  function translatorHelperProvider($translateProvider, $translatePartialLoaderProvider) {
    /* jshint validthis:true */
    var config = {};

    this.configure = function(cfg) {
      angular.extend(config, cfg);
    };

    this.$get = TranslatorHelper;

    TranslatorHelper.$inject = [
      'logger',
      '$translate',
      '$translatePartialLoader',
      'tmhDynamicLocale',
      '$rootScope',
      'localStorageService',
    ];

    /* @ngInject */
    function TranslatorHelper(logger, $translate, $translatePartialLoader, tmhDynamicLocale, $rootScope, localStorageService) {
      var _currentLanguage = 'en',
        _currentMetraNetLocale = 'us',
        _langDirection = 'LTR';
      var I18N_STORAGE_KEY = 'i18n';
      // Public API
      var service = {
        addPart: addPart,
        changeLanguage: changeLanguage,
        currentLanguage: currentLanguage,
        currentMetraNetLocale: currentMetraNetLocale,
        loadFromStorage: loadFromStorage,
        changedefaultLanguage: changedefaultLanguage,
      };

      init();

      return service;

      ///////////////

      function init() {
        changeLanguage(_currentLanguage, _langDirection);
      }

      function addPart(part) {
        $translatePartialLoader.addPart(part);
      }

      function changedefaultLanguage(langKey, langDirection) {
        _currentLanguage = langKey;
        _langDirection = langDirection;
        changeLanguage(_currentLanguage, _langDirection);
      }
      function changeLanguage(langKey, langDirection) {
        _currentLanguage = langKey;
        _currentMetraNetLocale = langKey;
        _langDirection = langDirection;
        $translate.use(_currentLanguage);
        tmhDynamicLocale.set(_currentLanguage)
          .then(function(result) {
            // Todo: update the MetraNet database lang_code names for 2 countries ('us' should be updated to 'en' and 'jp' to 'ja')
            switch (_currentLanguage) {
              case 'en':
                _currentMetraNetLocale = 'us';
                break;
              case 'ja':
                _currentMetraNetLocale = 'jp';
                break;
              case 'en-gb':
                _currentMetraNetLocale = 'gb';
              case 'se':
                _currentMetraNetLocale = 'us';
              case 'ar':
                _currentMetraNetLocale = 'us';
              case 'he':
                _currentMetraNetLocale = 'us';
            }
            changeDirection(_currentLanguage);
            localStorageService.set(I18N_STORAGE_KEY, {
              currentLanguage: _currentLanguage,
              currentMetraNetLocale: _currentMetraNetLocale,
              languageDirection: _langDirection,
            });
          });
      }

      function currentLanguage() {
        return _currentLanguage;
      }

      function currentMetraNetLocale() {
        return _currentMetraNetLocale;
      }

      function loadFromStorage() {
        var i18n = localStorageService.get(I18N_STORAGE_KEY);
        if (i18n) {
          changeLanguage(i18n.currentLanguage, i18n.languageDirection);
          return i18n;
        }
      }

      function changeDirection(_currentLanguage) {
        var username = document.getElementById('username');
        var password = document.getElementById('password');
        var forgotPasswordUsername = document.getElementById('forgotPasswordUsername');
        if ((username !== undefined && password !== undefined && forgotPasswordUsername !== undefined) && (username !== null && password !== null && forgotPasswordUsername !== null)) {
          if (_currentLanguage == 'ar' || _currentLanguage == 'he') {
            username.style.direction = 'rtl';
            password.style.direction = 'rtl';
            forgotPasswordUsername.style.direction = 'rtl';
          } else {
            username.style.direction = 'ltr';
            password.style.direction = 'ltr';
          }
        }
      }
    }
  }
})();
