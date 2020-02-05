(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name ecb welcome modal service
   * @description
   * # welcome modal service
   *
   * Welcome modal service.
  */
  angular
    .module('app.signUp')
    .factory('welcomeModalService', Service);

  Service.$inject = [
    'logger',
    '$uibModal',
  ];

  /* @ngInject */
  function Service(logger, $uibModal) {
    // Public API
    var service = {
      open: open,
    };

    return service;

    function open(accountId) {

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/components/content/signUp/welcome.html',
        controller: 'welcomeModalController',
        controllerAs: 'vm',
        bindToController: true,
        windowClass: 'center-modal',
        resolve: {
          accountId: function() {
            return accountId;
          }
        },
      });
    }
  }
}());
