(function() {
  'use strict';

  angular
    .module('app.security')
    .factory('authenticationInterceptorService', Service);

  Service.$inject = [
    '$q',
    '$location',
    'localStorageService',
    '$rootScope',
    'logger',
    '$injector'
  ];


  /* @ngInject */
  function Service($q, $location, localStorageService, $rootScope, logger, $injector) {
    var service = {
      request: request,
      responseError: responseError,
    };


    return service;
    function request(config) {
      config.headers = config.headers || {};
      var authData = localStorageService.get('authorizationData');
      if (authData) {
        // ToDo: Pre-check that the token hasn't expired, if so then use refresh token. This logic should be in it's own function for re-use.
        config.headers.Authorization = 'Bearer ' + authData.accessToken;
        config.headers['Strict-Transport-Security'] = 'Strict-Transport-Security: max-age=63072000; includeSubDomains; preload';
      }

      /*logger.log('app.security.authenticationInterceptorService.request():', {
        authData: authData,
        config: config,
      });*/

      return config;
    }

    function responseError(rejection) {
      /*logger.log('app.security.authenticationInterceptorService.responseError():', {
        rejection: rejection,
      });*/
      // ToDo: Implement 403 checking when we start checking roles at the API level.
      var querystringParams = $location.search();
      if (rejection.status === 401 && rejection.config.url !== 'api/registration/changePassword') {
        if ('uti' in querystringParams) {
          $location.$$search = {};
          $location.path('/401');
        } else {
          $rootScope.returnState = $location.url();
          $location.path('/login');
        }
      }
      if(rejection.status === 404 && (rejection.config.url.indexOf('resetPassword') > -1)){
        var resetPasswordParams = querystringParams.parameters;
        if(resetPasswordParams){
          $injector.get("resetPasswordService").verifyResetPasswordLink(resetPasswordParams)
            .then(function(result){
                var resetPasswordExpiredCheck = result.data.Expired;
                if(resetPasswordExpiredCheck == 'true'){
                  localStorageService.set('resetPassword', true);
                  $location.path('/login');
                }else{
                  localStorageService.set('resetPassword', false);
                  $location.path('/setpassword');
                }
            });
          }
        }

      return $q.reject(rejection);
    }
  };
}());
