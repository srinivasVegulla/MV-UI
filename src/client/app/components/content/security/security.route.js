(function() {
  'use strict';

  angular
    .module('app.security')
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
        state: 'login',
        config: {
          url: '/login',
          templateUrl: 'app/components/content/security/login.html',
          controller: 'loginController',
          controllerAs: 'vm',
          bindToController: true,
          title: 'Login',
          // ToDo: Implement role based security.
          //isSecured: false,
          //requiredRoles: [
          //  'user',
          //  'admin',
          //],
        }
      }
    ];
  }
})();
