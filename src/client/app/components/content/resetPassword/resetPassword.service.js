(function() {
  'use strict';
  /**
   * @ngdoc overview
   * @name ecb sign-up service
   * @description
   * # sign-up service
   *
   * ResetPassword service.
  */
  angular
    .module('app.resetPassword')
    .factory('resetPasswordService', Service);

  Service.$inject = [
    'logger',
    '$http',
    '$httpParamSerializer',
    '$q',
    'userService'
  ];

  /* @ngInject */
  function Service(logger, $http, $httpParamSerializer, $q, userService) {
    // Public API
    var service = {
      resetAccountPassword: resetAccountPassword,
      verifyResetPasswordLink: verifyResetPasswordLink
    };

    return service;

    function resetAccountPassword(resetPassword, parameters, username) {
        var request = {
          method: 'PUT',
          url: 'api/accounts/password',
          headers: {
            'Content-type': 'application/json'
          },
          data: {
            username: username,
            parameters: parameters,
            newPassword: resetPassword
          }
        };
      return $http(request)
        .then(function (response) {
          var status = response;
          return status;
        });
      }

      function verifyResetPasswordLink(parameters){
        var request = {
          method: 'GET',
          url: 'api/accounts/password/verifylink?parameters=' + parameters,
          headers: {
            'Content-type': 'application/json'
          },
        };
        return $http(request)
          .then(function (response) {
            var status = response;
            return status;
          });
      }
    }
}());
