(function() {
  'use strict';

  angular
    .module('app.expiredPassword')
    .run(appRun);

  appRun.$inject = [
    'routerHelper',
  ];

  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'expiredPassword',
        config: {
          url: '/change-password',
          bindToController: true,
          templateUrl: 'app/components/content/expiredPassword/expired-password.html',
          controller: 'expiredPasswordController',
          controllerAs: 'vm',
          title: 'Expired Password',
        }
      }
    ];
  }
})();
