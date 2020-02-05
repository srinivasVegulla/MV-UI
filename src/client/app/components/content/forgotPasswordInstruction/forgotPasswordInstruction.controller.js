/* jslint maxlen: 250 */
(function() {
  'use strict';

  angular
    .module('app.forgotPasswordInstruction')
    .controller('forgotPasswordInstructionController', Controller);

  Controller.$inject = [
    'logger',
    '$rootScope',
    'userService',
    'forgotPasswordInstructionService'
  ];


  /* @ngInject */
  function Controller(
    logger,
    $rootScope,
    userService,
    forgotPasswordInstructionService
    ) {

    var sm = this;
    sm.sendForgotPassword = sendForgotPassword;
    sm.backtoLoginForm = backtoLoginForm;
    sm.formInitiate = formInitiate;

    sm.formInitiate();

    function formInitiate(){
      sm.forgotPasswordUsername = null;
      sm.forgotPasswordShowError = false;
      sm.forgotPasswordErrorMessage = 0;
      sm.forgotPasswordSuccess = false;
      sm.forgotPasswordData = null;
      sm.showForgotPasswordForm = false;
    }

    function sendForgotPassword(){
      sm.loading= true
      sm.forgotPasswordData = {
        userName : sm.forgotPasswordUsername
      };
      sm.forgotPasswordShowError = false;
      sm.forgotPasswordErrorMessage = 0;
      sm.forgotPasswordSuccess = false;
      var namespace = userService.getNamespace();

      forgotPasswordInstructionService.sendForgotPassword(sm.forgotPasswordData, namespace)
      .then(function (result) {
         sm.forgotPasswordSuccess= true;
      })
      .catch(function (error) {
        sm.forgotPasswordShowError = true;
        switch (error.status) {
            case 400:
            case 404:
              sm.forgotPasswordErrorMessage = 1;
              break;
            case 500:
              sm.forgotPasswordErrorMessage = 2;
              break;
            default:
              sm.forgotPasswordErrorMessage = 3;
              break;
        }
      })
      .finally(function () {
        sm.loading= false;
      });
    }

    function backtoLoginForm(form){
      sm.formInitiate();
      form.$setPristine();
      form.$setUntouched();
      $rootScope.$emit("showLoginForm", true);

    }
  }

})();
