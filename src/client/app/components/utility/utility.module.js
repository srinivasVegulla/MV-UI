(function() {
  'use strict';

  angular
    .module('app.utility', ['angular-momentjs', 'ngSanitize'
    ])
    .config(Config)
    .run(Run);
  
  Config.$inject = [
  ];
  
  /* @ngInject */
  function Config() {
  }
  
  Run.$inject = [
  ];
  
  /* @ngInject */
  function Run() {
  }
})();
