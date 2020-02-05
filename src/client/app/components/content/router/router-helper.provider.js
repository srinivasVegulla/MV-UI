/* Help configure the state-base ui.router */
(function () {
  'use strict';

  angular
    .module('blocks.router')
    .provider('routerHelper', routerHelperProvider);

  routerHelperProvider.$inject = [
    '$locationProvider',
    '$stateProvider',
    '$urlRouterProvider'
  ];

  /* @ngInject */
  function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
    /* jshint validthis:true */
    var config = {
      docTitle: undefined,
      resolveAlways: {}
    };
    if (!(window.history && window.history.pushState)) {
      window.location.hash = '/';
    }

    $locationProvider.html5Mode(true);
    // Setting the catch-all route to our custom route rule for invalid routes, namespacing, and ticketing.
    $urlRouterProvider.otherwise(InvalidRoutesRule);

    this.configure = function (cfg) {
      angular.extend(config, cfg);
    };

    ////////////

    this.$get = RouterHelper;

    RouterHelper.$inject = [
      '$location',
      '$rootScope',
      '$state',
      'logger',
      'userService',
      'translatorHelper',
      '$uibModalStack'
    ];

    /* @ngInject */
    function RouterHelper($location, $rootScope, $state, logger, userService, translatorHelper, $uibModalStack) {
      var handlingStateChangeError = false;
      var hasOtherwise = false;
      var stateCounts = {
        errors: 0,
        changes: 0
      };

      var service = {
        configureStates: configureStates,
        getStates: getStates,
        stateCounts: stateCounts
      };

      init();

      return service;

      ///////////////
      function configureStates(states, otherwisePath) {
        states.forEach(function (state) {
          state.config.resolve =
            angular.extend(state.config.resolve || {}, config.resolveAlways);
          $stateProvider.state(state.state, state.config);
        });
        if (otherwisePath && !hasOtherwise) {
          hasOtherwise = true;
          $urlRouterProvider.otherwise(otherwisePath);
        }
      }

      function handleRoutingErrors() {
        // Route cancellation:
        // On routing error, go to the dashboard.
        // Provide an exit clause if it tries to do it twice.
        $rootScope.$on('$stateChangeError',
          function (event, toState, toParams, fromState, fromParams, error) {
            if (handlingStateChangeError) {
              return;
            }
            stateCounts.errors++;
            handlingStateChangeError = true;
            var destination = (toState &&
                (toState.title || toState.name || toState.loadedTemplateUrl)) ||
              'unknown target';
            var msg = 'Error routing to ' + destination + '. ' +
              (error.data || '') + '. <br/>' + (error.statusText || '') +
              ': ' + (error.status || '');
            logger.warning(msg, [toState]);
            $location.path('/404');
          }
        );
      }

      function init() {
        handleRoutingErrors();
        handleStateChangeSucess();
        handleRouteRedirect();
        handleRefresh();
      }

      function getStates() {
        return $state.get();
      }

      function handleStateChangeSucess() {
        $rootScope.$on('$stateChangeSuccess',
          function (event, toState, toParams, fromState, fromParams) {
            stateCounts.changes++;
            handlingStateChangeError = false;
            var title = config.docTitle + ' ' + (toState.title || '');
            $rootScope.title = title; // data bind to <title>
            $uibModalStack.dismissAll();
          }
        );
      }

      function handleRouteRedirect() {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
          if (toState.redirectTo) {
            event.preventDefault();
            $state.go(toState.redirectTo, toParams, { location: 'replace' });
          }
        });
      }

      function handleRefresh() {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
          // ToDo: Research a better way of identifying a real refresh event.
          // ToDo: MVIEW-836
          if (fromState.url === '^'
              && toState.name != 'signUp'
              && toState.name != 'expiredPassword'
              && toState.name != 'setpassword'
              ) {
            var userSettings = userService.loadFromStorage();
            var i18n = translatorHelper.loadFromStorage();
            if (userSettings) {
              config.docTitle = userSettings.settings.theme.applicationName + ' :';
            }
          }
        });
      }
    }

    // MVIEW-421 -- Begin

    // ToDo: Move this into it's own service. e.g. blocks.router.routeRulesServer.
    //
    // Custom Route Rule
    //   1. Get namespace value from url path.
    //   3. Load site settings data.
    //   2. If no namespace found or is the root path then navigate to login view.
    //   4. Get ticket number and username from querystring parameters.
    //   5. Authenticate ticket and username.
    //   6. Navigate to dashboard view.
    //
    function InvalidRoutesRule(injector, location) {
      var userService = injector.get('userService');
      var authenticationService = injector.get('authenticationService');
      var localStorageService = injector.get('localStorageService');
      var logger = injector.get('logger');
      var translatorHelper = injector.get('translatorHelper');
      var resetPasswordService = injector.get('resetPasswordService');
      var url = location.url();
      var path = location.path();
      var siteName = path.split('/')[1];
      if (!siteName) {
        var userSettings = userService.loadFromStorage();
        if (userSettings && userSettings.settings.namespace) {
          config.docTitle = userSettings.settings.theme.applicationName + ' :';
          location.path('/login');
          return;
        }
      }
      if (url === '/') {
        location.path('/404');
        return;
      }
      if (url === '/metraview/setpassword'){
        location.path('/setpassword');
        return;
      }
      if (url != '/404') {
        userService.loadSiteSettings(siteName)
          .then(function (result) {
            if (path && path != '/') {
              config.docTitle = result.settings.theme.applicationName + ' :';
              var nameSpace = result.settings.site.nameSpace;
              var querystringParams = location.search();
              var ticket = querystringParams.uti;
              var username = querystringParams.uui;
              if (querystringParams.lang) {
                var languageCode = (querystringParams.lang).toLowerCase();
                if (languageCode != 'en-gb' && languageCode != 'pt-br' && languageCode != 'es-mx'){
                  var langs = [];
                  langs = languageCode.split('-');
                  languageCode = langs[0];
                }
                var languageDirection = 'LTR';
                if (languageCode == 'ar' || languageCode == 'he') {
                  languageDirection = 'RTL';
                }
                translatorHelper.changedefaultLanguage(languageCode, languageDirection);
              }
              localStorageService.set('resetPasswordError', false);
              localStorageService.set('resetPassword', false);
              localStorageService.remove('resetPasswordUsername');
              if (ticket && username) {
                authenticationService.authenticateTicket(ticket, nameSpace, siteName, username)
                  .then(function (response) {
                    localStorageService.set('normalFlow',false);
                    location.path('/dashboard');
                  })
                  .catch(function (error) {
                    location.search('');
                    location.path('/401');
                  });
              } else if(querystringParams.parameters){
                resetPasswordService.verifyResetPasswordLink(querystringParams.parameters)
                  .then(function(result){
                    var resetPasswordExpiredCheck = result.data.Expired;
                    localStorageService.set('resetPasswordUsername', result.data.Username);
                      if(resetPasswordExpiredCheck == 'true'){
                        localStorageService.set('resetPassword', true);
                        location.path('/login');
                      }else{
                        localStorageService.set('resetPassword', false);
                        location.path('/setpassword');
                      }
                    });
              } else {
                location.path('/login');
              }
            }
          })
          .catch(function (error) {
            logger.log('blocks.router.routerHelper.InvalidRoutesRule(): Invalid Site Settings!', {
              error: error,
            });
          });
      }
    }
    // MVIEW-421 -- End
  }
})();
