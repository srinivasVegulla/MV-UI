/* jslint maxlen: 250 */
//jscs:disable maximumLineLength
(function(){
  'use strict';

  angular
    .module('app.signUp')
    .controller('signUpController', Controller);

  Controller.$inject = [
    'logger',
    '$rootScope',
    '$location',
    '$state',
    'signUpService',
    'authenticationService',
    'welcomeModalService',
    'userService',
    'utilityService',
    'translatorHelper',
    'localStorageService'
  ];
  /* @ngInject */
  function Controller(logger, $rootScope, $location, $state, signUpService, authenticationService, welcomeModal, userService, utilityService, translatorHelper, localStorageService) {
    var vm = this;
    vm.signUpData = {
      userName: null,
      password: null,
      conPassword: null,
      email: null
    };

    vm.showError = false;
    vm.signUpClick = signUpClick;
    vm.cancel = cancel;
    vm.patternFileValidatorFile = "regexValidator.json";
    vm.checkValidity = checkValidity;
    vm.setForminput = setForminput;
    vm.placeHolder;
    vm.isInValidInput = false;
    activate();

    function activate() {
      var nameSpace = userService.getSiteName();
      if(nameSpace.length === 0 || nameSpace === undefined) {
        $state.go('404');
      }
      vm.sitename = userService.getSiteName();
      getRegexPatternFile();
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

    function getRegexPatternFile() {
      utilityService.getOffersImageFile(vm.patternFileValidatorFile, vm.sitename).then(function (response) {
        vm.signupData = response.data.SignUp;

      }).catch(function (error) {
        vm.sitename = 'default';
        getRegexPatternFile();
      });
    }

    function signUpClick(form) {
      vm.success = false;
      vm.setErrorMessage = '';
      vm.errorMessage = 0;
      vm.loading = true;
      vm.isSaving = true;
      vm.showError = false;

      vm.loginData = {
        userName: null,
        password: null
      };

      signUpService.createAccount(vm.signUpData).then(function (result) {
        vm.success = true;
        vm.loginData.userName = vm.signUpData.userName;
        vm.loginData.password = vm.signUpData.password;
        var nameSpace = userService.getNamespace();
        var siteName = userService.getSiteName();
        authenticationService.authenticateForm(vm.loginData, nameSpace, siteName, true)
          .then(function (result) {
            var stateName = 'dashboard';
            localStorageService.set('normalFlow', true);
            if ($rootScope.returnState && $rootScope.returnState.indexOf('login') === -1) {
              stateName = $rootScope.returnState;
            }
            $state.go(stateName)
              .then(function () {
                welcomeModal.open(result.userInfo.accountId);
              });
          }).catch(function (error) {
            if (error.data.error_description.toLowerCase().indexOf('login failed. password expired.') > 0) {
              $state.go('expiredPassword');
            }
          });
        })
        .catch(function (error) {
          vm.showError = true;
          vm.setErrorMessage = error.data.message;
          if (vm.setErrorMessage.toLowerCase().indexOf('name already exists.') > 0) {
            vm.errorMessage = 1;
          } else {
            vm.errorMessage = 2;
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
        vm.isInValidInput = (vm.signUpData.conPassword !== vm.signUpData.password) ? true : false;
      }
    }

    function setForminput() {
      vm.placeHolder = '';
      vm.isInValidInput = false;
    }

  }
}());
