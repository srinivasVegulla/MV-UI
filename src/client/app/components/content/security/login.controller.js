(function() {
  'use strict';

  angular
    .module('app.security')
    .controller('loginController', Controller);

  Controller.$inject = [
    'logger',
    '$location',
    'authenticationService',
    '$state',
    '$rootScope',
    'userService',
    'localStorageService',
    '$scope',
    '$q',
    'utilityService'
  ];

  /* @ngInject */
  function Controller(logger, $location, authenticationService, $state, $rootScope, userService, localStorageService, $scope, $q, utilityService) {
    /* jshint validthis:true */
    var vm = this,
        loginForm;
    vm.login = login;
    vm.forgotPassword = forgotPassword;
    vm.loginProcessing = false;
    vm.isSignUp = false;
    vm.applicationName = '';
    vm.showLoginForm = true;
    vm.closeExpiredLink = closeExpiredLink;
    vm.resetLinkExpiredCheck = localStorageService.get('resetPassword');
    vm.resetPasswordError = localStorageService.get('resetPasswordError');
    var unregisterLoginEvents = [];
    formInitiate();
    vm.patternFileValidatorFile = "regexValidator.json";
    vm.siteName = localStorageService.get("user.settings").settings.siteName;

    function formInitiate(){
       vm.loginData = {
        userName: null,
        password: null
      };
      vm.showError = false;
      vm.errorMessage = 0;
    }

    activate();

    loginForm = $rootScope.$on('showLoginForm', function (event, data) {
      vm.showLoginForm = data;
    });

    unregisterLoginEvents.push(loginForm);

    function activate() {
      userService.getUserSettings()
        .then(function(user) {
          vm.isSignUp = user.settings.isSignUpEnable;
          vm.applicationName = user.settings.theme.applicationName;
        })
        .catch(function(error) {
        });
        getRegexPatternFile();
    }

    function getRegexPatternFile() {
      utilityService.getOffersImageFile(vm.patternFileValidatorFile, vm.siteName).then(function (response) {
        vm.loginInputPattern = response.data.Login.username;
      }).catch(function (error) {
        vm.siteName= 'default';
        getRegexPatternFile();
      });
    }

    function login(form) {
      vm.showError = false;
      vm.loginProcessing = true;
      vm.errorMessage = 0;
      var siteName = userService.getSiteName();
      userService.loadSiteSettings(siteName).then(function(response) {
        vm.namespace = response.settings.site.nameSpace;
        authenticationService.authenticateForm(vm.loginData, vm.namespace, siteName)
          .then(function(result) {
            if ($rootScope.returnState && $rootScope.returnState.indexOf('login') === -1) {
              $location.path($rootScope.returnState);
            } else {
              localStorageService.set('normalFlow', true);
              $state.go('dashboard');
            }
          })
          .catch(function(error) {
            vm.showError = true;
            vm.loginProcessing = false;
            vm.err_desc = error.data.error_description;
            vm.loginData.userName = null;
            vm.loginData.password = null;
            form.$setPristine();
            form.$setUntouched();
            if (vm.err_desc.toLowerCase().indexOf('invalid username') > 0) {
              vm.errorMessage = 1;
            } else if (vm.err_desc.toLowerCase().indexOf('your account is locked out') > 0) {
              vm.errorMessage = 2;
            } else if (vm.err_desc.toLowerCase().indexOf('your account does not have permissions') > 0) {
              vm.errorMessage = 3;
            } else if (vm.err_desc.toLowerCase().indexOf('login failed. password expired.') > 0) {
              vm.showError = false;
              $state.go('expiredPassword');
            } else if (vm.err_desc.toLowerCase().indexOf('are not allowed to perform this operation') > 0) {
              vm.errorMessage = 4;
            } else {
              vm.showError = true;
              vm.errorMessage = 5;
            }
          })
          .finally(function() {
            vm.loginProcessing= false;
          });
      }).catch(function(error){
        if (error.status === 404 || error.status === 400) {
          $state.go('404');
        }
        return $q.reject(error);
      });    
    }

    function forgotPassword(form) {
      vm.showLoginForm = false;
      formInitiate();
      form.$setPristine();
      form.$setUntouched();
      $rootScope.$emit('showLoginForm', vm.showLoginForm);
      localStorageService.set('resetPasswordError', false);
      localStorageService.set('resetPassword', false);
      vm.resetPasswordError = false;
      vm.resetLinkExpiredCheck = false;

    }

    function closeExpiredLink(){
      localStorageService.set('resetPassword', false);
    }

    $scope.$on('$destroy', function () {
      for(var i = 0; i < unregisterLoginEvents.length; i++){
        unregisterLoginEvents[i]();
      }
    });
  };
}());

