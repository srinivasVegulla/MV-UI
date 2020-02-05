(function() {
  'use strict';
  angular
    .module('app.accountSettings')
    .controller('accountSecurityModalController', Controller);

  Controller.$inject = [
    'logger',
    '$uibModalInstance',
    'accountSecurityModalService',
    'accountId',
    '$scope',
    'translatorHelper',
    '$filter'
  ];

  /* @ngInject */
  function Controller(logger, $uibModalInstance, accountSecurityModalService, accountId, $scope, translatorHelper, $filter) {
    /* jshint validthis: true */
    var vm = this, selectedQuestionCode = '', selectedSecurityAnswer = '';
    vm.save = save;
    vm.cancel = cancel;
    vm.securityInfo = {};
    vm.updateSecurityQuestion = updateSecurityQuestion;
    vm.checkForOptionNone = checkForOptionNone;
    vm.error = '';

    activate();

    function activate() {
      getSecurityQuestions();
      var i18n = translatorHelper.loadFromStorage();
      vm.layoutLeftDirection = 'left';
      vm.layoutRightDirection = 'right';
      if (i18n.languageDirection == 'RTL') {
        vm.layoutLeftDirection = 'right';
        vm.layoutRightDirection = 'left';
      }
    }

    function save() {
      vm.loading = true;
      var updatedSecurityMethod = ($filter('translate')('TEXT_ACCOUNT_SECURITY_UPDATE_SUCCESSFUL'));
      var updateSecurityFailed = ($filter('translate')('TEXT_ACCOUNT_SECURITY_UPDATE_FAIL'));
      accountSecurityModalService.update(vm.securityInfo, accountId)
        .then(function (result) {
          logger.success(updatedSecurityMethod, {
            result: result,
          });
          $uibModalInstance.close(vm.securityInfo);
        })
        .catch(function (error) {
          if (error.status !== 304) {
            vm.error = error.data;
            if (vm.error.exception) {
              vm.errorMessage = (vm.error.exception.indexOf('HttpHostConnectException') > -1) ? 1 : '';
            } else {
              vm.errorMessage = 2;
            }
          }
          else {
            logger.success(updatedSecurityMethod, {
            });
            $uibModalInstance.close(vm.securityInfo);
          }
        }).finally(function () {
          vm.loading = false;
        });
    }

    function getSecurityQuestions() {
      vm.loading = true;
      accountSecurityModalService.getSecurityQuestions(accountId).then(function (response) {
          vm.securityQuestions = response.Questions;
          if (response.SelectedQuestion){
            vm.selectedQuestion = response.SelectedQuestion.securityQuestion;
            selectedQuestionCode = response.SelectedQuestion.securityQuestionCode;
            selectedSecurityAnswer = response.SelectedQuestion.securityAnswer;
            vm.securityInfo.securityQuestionId = response.SelectedQuestion.securityQuestionId;
            vm.securityInfo.securityQuestion = response.SelectedQuestion.securityQuestion;
            vm.securityInfo.customSecurityQuestion = response.SelectedQuestion.customSecurityQuestion;
            vm.securityInfo.securityAnswer = response.SelectedQuestion.securityAnswer;
            vm.securityInfo.securityQuestionCode = response.SelectedQuestion.securityQuestionCode;
          }
        })
        .catch(function (error) {
          vm.error = error.data;
          vm.errorMessage = 3;
        }).finally(function () {
          vm.loading = false;
        });
    }

    function updateSecurityQuestion(index) {
      /*Set the securityInfo object while selecting a question from sEcurity Question dropdown*/
      vm.securityInfo.securityQuestionId = vm.securityQuestions[index].securityQuestionId;
      vm.securityInfo.securityQuestion = vm.securityQuestions[index].securityQuestion;
      vm.securityInfo.customSecurityQuestion = vm.securityQuestions[index].customSecurityQuestion;
      vm.securityInfo.securityQuestionCode = vm.securityQuestions[index].securityQuestionCode;
      if(vm.securityInfo.securityQuestionCode === selectedQuestionCode) {
        vm.securityInfo.securityAnswer = selectedSecurityAnswer;
      }
      else {
        vm.securityInfo.securityAnswer = vm.securityQuestions[index].securityAnswer;
      }
      vm.selectedQuestion = vm.securityQuestions[index].securityQuestion;
    }

    function checkForOptionNone() {
      if (vm.securityInfo.securityQuestionCode == 'None')
        return true;
      else
        return false;
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }
  }
})();
