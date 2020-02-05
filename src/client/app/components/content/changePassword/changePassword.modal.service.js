(function() {
  'use strict';

  angular
    .module('app.changePassword')
    .factory('changePasswordModalService', Service);

  Service.$inject = [
    'logger',
    '$uibModal',
    '$aside',
    '$http',
    '$httpParamSerializer',    
    'userService'
  ];

  /* @ngInject */
  function Service(logger, $uibModal, $aside, $http, $httpParamSerializer, userService) {
    // Public API
    var service = {
      open: open,
      changePassword : changePassword
    };

    return service;

    function open(accountId) {

      var modalInstance = $aside.open({
        placement: 'right',
        animation: false,
        templateUrl: 'app/components/content/changePassword/changePassword-modal.html',
        controller: 'changePasswordModalController',
        controllerAs: 'vm',
        bindToController: true,
        resolve: {
          accountId: function() {
            return accountId;
          }
        },
        windowClass: 'ecb-changePasswordView ecb-aside-modal',
        backdrop: 'static',
        keyboard: false,
      });
    }
    
    function changePassword(changePasswordData) {
	    var amendPasswordData = {
	      userName: changePasswordData.userName,
	      oldPassword: changePasswordData.oldPassword,
	      newPassword: changePasswordData.newPassword,
	      conPassword: changePasswordData.conPassword,
	      nameSpace: userService.getNamespace()
	    };	    
	    var request = {
	      method: 'POST',
	      url: 'api/registration/changePassword',
	      headers: {
	        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
	      },
	      data: $httpParamSerializer(amendPasswordData),
	    };
	    return $http(request)
	      .then(function (response) {
	        var status = response.data.message;
	        return status;
	      });	      
	}
  }
}());
