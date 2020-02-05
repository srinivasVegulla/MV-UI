(function () {
  'use strict';

  angular
    .module('app.layout')
    .controller('shellController', Controller);

  Controller.$inject = [
    'logger',
    'translatorHelper',
    'authenticationService',
    'accountService'
  ];

  /* @ngInject */
  function Controller(logger, translatorHelper, authenticationService, account) {
    /* jshint validthis:true */
    var vm = this;
    vm.changeLanguage = translatorHelper.changeLanguage;
    vm.isAuthenticated = isAuthenticated;
    vm.accountId = getAccountId;
    vm.account = {
      info: account.info,
    };

    function isAuthenticated() {
      return authenticationService.isAuthenticated();
    }

    function getAccountId() {
      return authenticationService.authentication().userInfo.accountId;
    }
  }
})();
