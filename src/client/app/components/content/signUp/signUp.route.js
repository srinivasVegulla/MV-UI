(function() {
  'use strict';

  angular
    .module('app.signUp')
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
        state: 'signUp',
        config: {
          url: '/customer/sign-up',
          bindToController: true,
          templateUrl: 'app/components/content/signUp/sign-up.html',
          controller: 'signUpController',
          controllerAs: 'vm',
          title: 'Customer Sign Up',
        }
      }
    ];
  }
})();
