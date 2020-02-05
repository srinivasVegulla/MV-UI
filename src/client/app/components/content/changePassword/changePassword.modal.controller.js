(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name Change Password modal controller
   * @description
   * # Change Password modal controller
   *
   * Change Password modal controller.
   */
  angular
    .module('app.changePassword')
    .controller('changePasswordModalController', Controller);

  Controller.$inject = [
    'logger',
    '$uibModalInstance',    
    'authenticationService',
    'userService',
    'changePasswordModalService',
    'translatorHelper',
    '$filter'
  ];

  /* @ngInject */
  function Controller(logger, $uibModalInstance, authenticationService, userService, changePasswordModalService, translatorHelper, $filter) {
    /* jshint validthis: true */
    var vm = this;
    vm.userName = getUserName;

    vm.changePasswordData = {
      userName: null,
      oldPassword: null,
      newPassword: null,
      conPassword: null,
      nameSpace: null
    };

    vm.showError = false;
    vm.save = save;
    vm.cancel = cancel;
    vm.checkValidity = checkValidity;
    vm.setForminput = setForminput;
    vm.placeHolder;
    vm.isInValidInput = false;
    activate();

    var i18n = translatorHelper.loadFromStorage();
    vm.layoutLeftDirection = 'left';
    vm.layoutRightDirection = 'right';
    if (i18n.languageDirection == 'RTL') {
      vm.layoutLeftDirection = 'right';
      vm.layoutRightDirection = 'left';
    }

    function getUserName() {
      return authenticationService.authentication().userName;
    }

    function activate() {
      vm.changePasswordData.userName = authenticationService.authentication().userName;
      vm.changePasswordData.nameSpace = authenticationService.authentication().namespace;
    }

    function save(form) {
      vm.success = false;
      vm.setErrorMessage = '';
      vm.errorMessage = 0;
      vm.loading = true;
      vm.isSaving = true;
      vm.showError = false;
      
      vm.changePasswordData.oldPassword = vm.oldPassword;
      vm.changePasswordData.newPassword = vm.newPassword;
      vm.changePasswordData.conPassword = vm.verifyPassword;
      var passwordUpdated = ($filter('translate')('TEXT_PASSWORD_UPDATE_SUCCESSFUL'));
      changePasswordModalService.changePassword(vm.changePasswordData)
      .then(function (result) {
        vm.success= true;
        logger.success(passwordUpdated);
        vm.cancel();
      })
      .catch(function (error) {
        vm.showError = true;
        vm.errDesc = error.data.message.toLowerCase();        
        if (vm.errDesc.indexOf('old password') > 0) {
          vm.errorMessage = 1;
        } else if (vm.errDesc.indexOf('new password does not meet security requirements') > 0) {
          vm.errorMessage = 2;
        } else if (vm.errDesc.indexOf('account has been locked') > 0) {
          vm.errorMessage = 3;
        } else if (vm.errDesc.indexOf('not strong enough') > 0) {
          vm.errorMessage = 4;
        } else if (vm.errDesc.indexOf('used before') > 0) {
          vm.errorMessage = 5;
        } else if (error.data.exception) {
          vm.errorMessage = (error.data.exception.indexOf('HttpHostConnectException') > -1) ? 6 : 7;
        } else {
          vm.errorMessage = 7;
        }
      })
      .finally(function () {
         vm.loading = false;
         vm.isSaving = false;
      });
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function checkValidity(newPassword, verifyPassword, value) {
      if (newPassword && verifyPassword) {
        vm.placeHolder = value;
        vm.isInValidInput = (vm.verifyPassword !== vm.newPassword) ? true : false;
      }
    }

    function setForminput() {
      vm.placeHolder = '';
      vm.isInValidInput = false;
    }
  }
})();
