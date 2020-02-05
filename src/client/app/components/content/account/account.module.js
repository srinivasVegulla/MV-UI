(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name ecb account
   * @description
   * # account content/feature componentent module
   *
   * Account content/feature componentent module.
   */
  angular
    .module('app.account', [
      'app.core',
      '720kb.datepicker',
      'blocks.logger',
      'app.payment-methods',
      'app.total-bill-amount',
      'app.asideModal'
    ])
    .config(Config)
    .run(Run);

  Config.$inject = [
    '$compileProvider',
  ];

  /* @ngInject */
  function Config($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|chrome-extension):/);
  };

  Run.$inject = [];

  /* @ngInject */
  function Run() { };
})();
