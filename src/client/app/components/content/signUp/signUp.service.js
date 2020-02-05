(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name ecb sign-up service
   * @description
   * # sign-up service
   *
   * SignUp service.
  */
  angular
    .module('app.signUp')
    .factory('signUpService', Service);

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
      createAccount: createAccount,
    };

    return service;

    function createAccount(signUpData) {
      var createAccountData = {
        userName: signUpData.userName,
        email: signUpData.email,
        password: signUpData.password,
        conPassword: signUpData.conPassword,
        nameSpace: userService.getNamespace(),
      };

      var request = {
        method: 'POST',
        url: 'api/registration/registerUser',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
        data: $httpParamSerializer(createAccountData),
      };

      return $http(request)
        .then(function (response) {
          var status = response.data.message;

          return status;
        });
      }
    }
}());
