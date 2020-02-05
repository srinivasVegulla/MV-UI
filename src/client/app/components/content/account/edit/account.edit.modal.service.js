(function() {
  'use strict';

  angular
    .module('app.account')
    .factory('accountEditModalService', Service);

  Service.$inject = [
    'logger',
    '$uibModal',
    '$aside',
  ];

  /* @ngInject */
  function Service(logger, $uibModal, $aside) {
    // Public API
    var service = {
      open: open,
    };

    return service;

    function open(accountId) {

      var modalInstance = $aside.open({
        placement: 'right',
        animation: false,
        templateUrl: 'app/components/content/account/edit/account-edit-modal.html',
        controller: 'accountEditModalController',
        controllerAs: 'vm',
        bindToController: true,
        resolve: {
          accountId: function() {
            return accountId;
          }
        },
        windowClass: 'account-edit-modal ecb-aside-modal',
        backdrop: 'static',
        keyboard: false,
      });
    }
  }
}());
