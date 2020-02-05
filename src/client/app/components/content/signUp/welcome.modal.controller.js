/* jslint maxlen: 250 */
//jscs:disable maximumLineLength
(function () {
  'use strict';

  angular
    .module('app.signUp')
    .controller('welcomeModalController', Controller);

  /* @ngInject */
  Controller.$inject = [
    'logger',
    '$scope',
    '$uibModalInstance',
    'welcomeModalService',
    'authenticationService',
    'accountEditModalService',
    'amountDueService',
    'paymentMethodsService',
    'accountId',
    '$sce',
    '$timeout'
  ];
  /* @ngInject */
  function Controller(logger,
    $scope,
    $uibModalInstance,
    welcomeModalService,
    authenticationService,
    accountEditModalService,
    amountDueService,
    paymentMethodsService,
    accountId,
    $sce,
    $timeout) {
    var vm = this;
    vm.user = {};
    vm.userName = getUserName;
    vm.selfCareEnabled = selfCareEnabled;
    vm.editAccount = accountEditModalService.open;
    vm.getCreditMethods = getCreditMethods;
    vm.handleCyberGateError = handleCyberGateError;
    var _currency = '';
    var _accountId = accountId;

    activate();

    function activate() {
      $scope.user = authenticationService.authentication().userInfo;
      vm.user = authenticationService.authentication().userInfo;

      amountDueService.getDuePayment(vm.user.accountId)
        .then(function(response) {
          _currency = response.data.PaymentInfo.currency;
        })
        .catch(function(error) {
          logger.log('Error retrieving Currency.');
        });
    }

    vm.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };

    function selfCareEnabled() {
      return true;
    }

    $scope.$on('hardClosedIntervals_editAccountInfo', function (event, data) {
      $scope.hardClosedIntervals = (data === 'F') ? 'false' : 'true';
    });

    function getUserName() {
      return authenticationService.authentication().userName;
    }

    function getCreditMethods() {
      paymentMethodsService.getCredit(_accountId, _currency)
        .then(function(response) {
          vm.addError = false;
          vm.cyberError = false;
          vm.creditInfo = response.data;
          vm.details = vm.creditInfo.Html;
          vm.template = $sce.trustAsHtml(vm.details);
          $timeout(function() {
            angular.element(document).ready(function() {
              document.getElementById('hiddenForm').submit();
            }, 1000);
          });
        })
        .catch(function(error) {
          if (error.status === 500) {
            handleCyberGateError();
            vm.addError = true;
            vm.cyberError = true;
          } else if (error.status == 400) {
            handleCyberGateError();
            vm.addError = true;
            vm.cyberError = true;
          } else if (error.status == 412 || error.status == 403) {
            handleCyberGateError();
            vm.addError = true;
            vm.nodata = true;
          }
        });
    }

    function handleCyberGateError() {
      vm.addError = true;
      vm.cyberError = true;
      angular.element(document).ready(function() {
        $('#test').modal('hide');
      }, 1000);
    }

  }
})();
