(function() {
  'use strict';

  angular
    .module('app.accountSettings')
    .factory('accountSecurityModalService', Service);

  Service.$inject = [
    '$http',
    'logger',
    '$uibModal',
    '$aside',
    'localStorageService',
    'utilityService'
  ];

  /* @ngInject */
  function Service($http, logger, $uibModal, $aside, localStorageService, utilityService) {
    // Public API
    var service = {
      open: open,
      getSecurityQuestions: getSecurityQuestions,
      update: updateSecurityQuestion,
    };

    var securityQuestions;

    return service;

    function open(accountId) {
      var modalInstance = $aside.open({
        placement: 'right',
        animation: false,
        templateUrl: 'app/components/content/accountSettings/accountSecurityModal/accountSecurityModal.html',
        controller: 'accountSecurityModalController',
        controllerAs: 'vm',
        bindToController: true,
        resolve: {
          accountId: function() {
            return accountId;
          }
        },
        windowClass: 'accountSecurityModal ecb-aside-modal',
        backdrop: 'static',
        keyboard: false,
      });
    }

    function getSecurityQuestions(accountId) {
      var params = {
        lang: localStorageService.get('i18n').currentMetraNetLocale,
        namespace: utilityService.getNameSpace(),
      };
      var request = {
        method: 'GET',
        url: 'api/accounts/accountsecurity/' + accountId,
        params: params
      };

      return $http(request)
        .then(function (response) {
          securityQuestions = response.data;
          return securityQuestions;
        });
    }

    function updateSecurityQuestion(securityInfo, accountId) {
      var params = {
        lang: localStorageService.get('i18n').currentMetraNetLocale,
        namespace: utilityService.getNameSpace(),
      };
      var request = {
        method: 'PUT',
        url: 'api/accounts/accountsecurity/' + accountId,
        params: params,
        data: securityInfo
      };
      return $http(request)
        .then(function(response) {
          return securityInfo;
        });
    }
  }
}());
