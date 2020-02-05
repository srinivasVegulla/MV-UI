(function() {
  'use strict';

  angular
    .module('app.resetPassword')
    .run(appRun);

  appRun.$inject = [
    'routerHelper'
  ];

  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'setpassword',
        config: {
          url: '/setpassword?parameters&lang',
          bindToController: true,
          templateUrl: 'app/components/content/resetPassword/resetPassword.html',
          controller: 'resetPasswordController',
          controllerAs: 'vm',
          title: 'Customer Reset Password'
        }
      }
    ];
  }
})();
