(function() {
  'use strict';

  angular
    .module('blocks.logger', ['app.core'])
    .config(Config);

  Config.$inject = [
    '$logProvider',
    '$provide',
  ];

  /* @ngInject */
  function Config($logProvider, $provide) {
    // Overriding the default $log behavior to use $logProvider.debugEnabled() value.
    $provide.decorator('$log', function($delegate) {
      // Original methods.
      var origInfo = $delegate.info,
        origLog = $delegate.log,
        origError = $delegate.error,
        origWarn = $delegate.warn;

      // Overrides
      $delegate.info = function() {
        if ($logProvider.debugEnabled()) {
          origInfo.apply(null, arguments);
        }
      };

      $delegate.log = function() {
        if ($logProvider.debugEnabled()) {
          origLog.apply(null, arguments);
        }
      };

      $delegate.error = function() {
        if ($logProvider.debugEnabled()) {
          origError.apply(null, arguments);
        }
      };

      $delegate.warn = function() {
        if ($logProvider.debugEnabled()) {
          origWarn.apply(null, arguments);
        }
      };

      ['log', 'debug', 'info', 'warn', 'error'].forEach(function(o) {
        $delegate[o].logs = []; // this keeps angular-mocks happy
      });

      return $delegate;
    });
  };
})();
