(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name app
   * @description
   * # app
   *
   * Main module of the application.
  */
  angular
    .module('app.layout.card', [
      'app.core',
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
