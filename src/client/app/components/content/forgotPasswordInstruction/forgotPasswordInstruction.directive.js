(function() {
  'use strict';

  angular
    .module('app.forgotPasswordInstruction')
    .directive('ecbForgotPasswordInstruction', Directive);

  function Directive() {
    var directive = {
      bindToController: true,
      restrict: 'EA',
      templateUrl: 'app/components/content/forgotPasswordInstruction/forgotPasswordInstruction.html',
      controller: 'forgotPasswordInstructionController',
      controllerAs: 'sm',
      scope: {
        accountId: '@'
      }
    };
    return directive;
  }
})();
