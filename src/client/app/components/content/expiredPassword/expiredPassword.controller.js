/* jslint maxlen: 250 */
//jscs:disable maximumLineLength
(function(){
  'use strict';

  angular
    .module('app.expiredPassword')
    .controller('expiredPasswordController', Controller);

  Controller.$inject = [
    'logger',
    '$rootScope',
    '$location',
    '$state',
    'expiredPasswordService',
    'authenticationService',
    'localStorageService',
    'userService',
    'translatorHelper'
  ];
  /* @ngInject */
  function Controller(logger, $rootScope, $location, $state, expiredPasswordService, authenticationService, localStorageService, userService, translatorHelper, username) {
    var vm = this;
    vm.userName = getUserName;

    function getUserName() {
      return authenticationService.authentication().userName;
    }

    vm.expiredPasswordData = {
      userName: null,
      oldPassword: null,
      newPassword: null,
      conPassword: null
    };

    vm.showError = false;
    vm.changePassword = changePassword;
    vm.cancel = cancel;
    vm.checkValidity = checkValidity;
    vm.setForminput = setForminput;
    vm.placeHolder;
    vm.isInValidInput = false;
    activate();

    function activate() {
      vm.expiredPasswordData.userName = authenticationService.authentication().userName;
      var nameSpace = userService.getNamespace();
      if(nameSpace.length === 0 || nameSpace === undefined) {
        $state.go('404');
      }
      var i18n = translatorHelper.loadFromStorage();
      vm.layoutLeftDirection = 'left';
      vm.layoutRightDirection = 'right';
      if (i18n) {
        angular.element("body").attr("dir", i18n.languageDirection);
        if (i18n.languageDirection == 'RTL') {
          vm.layoutLeftDirection = 'right';
          vm.layoutRightDirection = 'left';
        }
      } else {
        angular.element("body").attr("dir", "LTR");
      }
    }

    function changePassword(form) {
      vm.success = false;
      vm.showError = false;
      vm.errorMessage = 0;
      vm.isLocked = true;
      vm.loading = true;
      vm.isSaving = true;
      vm.loginData = {
        userName: null,
        password: null
      };

      expiredPasswordService.updatePassword(vm.expiredPasswordData)
        .then(function (result) {
           vm.success= true;
           vm.loginData.userName = authenticationService.authentication().userName;
           vm.loginData.password = vm.expiredPasswordData.newPassword;
           var namespace = userService.getNamespace();
           var siteName = userService.getSiteName();
           authenticationService.authenticateForm(vm.loginData, namespace, siteName)
             .then( function (result) {
              if ($rootScope.redirectUrl && $rootScope.redirectUrl.indexOf('login') === -1) {
                $location.path($rootScope.redirectUrl);
              }
              else {
                localStorageService.set('normalFlow', true);
                $state.go('dashboard');
              }
          });
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
          }else if (vm.errDesc.indexOf('used before') > 0) {
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
      $state.go('login');
      angular.element("body").attr("dir", "LTR");
    }

    function checkValidity(newPassword, verifyPassword, value) {
      if (newPassword && verifyPassword) {
        vm.placeHolder = value;
        vm.isInValidInput = (vm.expiredPasswordData.conPassword !== vm.expiredPasswordData.newPassword) ? true : false;
      }
    }

    function setForminput() {
      vm.placeHolder = '';
      vm.isInValidInput = false;
    }

  }
}());
