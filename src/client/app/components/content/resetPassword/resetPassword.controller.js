/* jslint maxlen: 250 */
//jscs:disable maximumLineLength
(function(){
  'use strict';

  angular
    .module('app.resetPassword')
    .controller('resetPasswordController', Controller);

  Controller.$inject = [
    'logger',
    '$rootScope',
    '$location',
    '$state',
    'resetPasswordService',
    'userService',
    '$stateParams',
    'localStorageService',
    'authenticationService'
  ];
  /* @ngInject */
  function Controller(logger, $rootScope, $location, $state, resetPasswordService, userService, $stateParams, localStorageService, authenticationService) {
    var vm = this;

    vm.showError = false;
    vm.resetPasswordClick = resetPasswordClick;
    vm.cancel = cancel;
    vm.parameters = $stateParams.parameters;
    vm.lang = $stateParams.lang;
    vm.userName = localStorageService.get('resetPasswordUsername');
    vm.checkValidity = checkValidity;
    vm.setForminput = setForminput;
    vm.placeHolder;
    vm.isInValidInput = false;

    activate();

    function activate() {
      var nameSpace = userService.getNamespace();
    }

    function resetPasswordClick() {
      vm.success = false;
      vm.setErrorMessage = '';
      vm.errorMessage = 0;
      vm.loading = true;
      vm.isSaving = true;
      vm.usedPasswordError = false;
      vm.loginData = {
        userName: null,
        password: null
      };

      resetPasswordService.resetAccountPassword(vm.resetPassword,vm.parameters,vm.userName)
        .then(function (result) {
           vm.success = true;
           vm.loginData.userName = vm.userName;
           vm.loginData.password = vm.resetPassword;
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
          vm.error = error.data.Error;
          switch (error.status) {
            case 400:
              if(vm.error == "Password has been used before."){
                  vm.usedPasswordError = true;
              }else{
                  localStorageService.set('resetPasswordError', true);
                  $state.go('login');
              }
              break;
            case 500:
            case 412:
            localStorageService.set('resetPasswordError', true);
              $state.go('login');
              break;
          }
        })
        .finally(function () {
           vm.loading = false;
           vm.isSaving = false;
        });
    }

    function cancel() {
      $state.go('login');
    }

    function checkValidity(newPassword, verifyPassword, value) {
      if (newPassword && verifyPassword) {
        vm.placeHolder = value;
        vm.isInValidInput = (vm.resetPassword !== vm.resetConfirmPassword) ? true : false;
      }
    }

    function setForminput() {
      vm.placeHolder = '';
      vm.isInValidInput = false;
    }

  }
}());
