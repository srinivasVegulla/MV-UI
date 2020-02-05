(function() {
  'use strict';

  angular
    .module('app.expiredPassword')
    .factory('expiredPasswordService', Service);

  Service.$inject = [
    'logger',
    '$http',
    '$httpParamSerializer',
    'userService',
  ];

  /* @ngInject */
  function Service(logger, $http, $httpParamSerializer, userService) {

    // Public API
    var service = {
      updatePassword: updatePassword,
    };

    return service;

    function updatePassword(expiredPasswordData) {
      var updatePasswordData = {
        userName: expiredPasswordData.userName,
        oldPassword: expiredPasswordData.oldPassword,
        newPassword: expiredPasswordData.newPassword,
        conPassword: expiredPasswordData.conPassword,
        nameSpace: userService.getNamespace(),
      };
      var request = {
        method: 'POST',
        url: 'api/registration/changePassword',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                  },
        data: $httpParamSerializer(updatePasswordData),
      };

      return $http(request)
        .then(function (response) {
          var status = response.data.message;
          return status;
        });
      }
    }
}());
