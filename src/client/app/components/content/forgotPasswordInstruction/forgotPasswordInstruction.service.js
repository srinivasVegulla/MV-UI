(function() {
  'use strict';

  angular
    .module('app.forgotPasswordInstruction')
    .factory('forgotPasswordInstructionService', Service);
  
 Service.$inject = [
    'logger',
    '$http',    
    'userService',
  ];

  /* @ngInject */
  function Service(logger, $http, userService) {

    // Public API
    var service = {
      sendForgotPassword: sendForgotPassword
    };

    return service;

    function sendForgotPassword(data, namespace) {      
     
      var request = {
        method: 'POST',
        url: 'api/accounts/password',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
            username: data.userName,        
            namespace: namespace
        }
      };
      return $http(request)
        .then(function (response) {
          var status = response.data.message;  
          return status;
        });       
    }
  }
}());
