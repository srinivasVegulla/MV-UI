(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name app
   * @description
   * # app
   *
   * Main module of the MetraView application.
  */
  angular.module('app', [
      'app.core',
      'app.layout',
      'app.filter',
      'app.dashboard',
      'app.charges',
      'app.offer-charge-summary',
      'app.payment-methods',
      'app.payments-credits-adjustments',
      'app.total-amount-due',
      'app.invoice',
      'app.layout.card',
      'app.layout.payment-setup',
      'app.account',
      'app.nowcast',
      'app.infinite-scroller',
      'app.signUp',
      'app.subscriptions',
      'app.expiredPassword',
      'app.total-bill-amount',
      'app.viewSelector',
      'app.changePassword',
      'app.billing-activity',
      'app.forgotPasswordInstruction',
      'app.payModal',
      'app.activityLog',
      'app.resetPassword',
      'app.billAdjustmentPopup',
      'app.asideModal',
      'app.utility',
      'app.accountSettings',
      'app.accountsManager',
      'app.usage-activity',
      'app.sinceLastBill',
      'app.payer.subscriptions',
      'app.modalDialog'
    ])
  .config(Config)
  .run(Run);

  Config.$inject = [
    '$logProvider',
  ];

  /* @ngInject */
  function Config($logProvider) {
    // ToDo: Implement setting this dynamically at run-time, or from an evironment variable.
    $logProvider.debugEnabled(true);
  }

  Run.$inject = [
    'logger',
    '$rootScope',
    '$timeout',
  ];

  /* @ngInject */
  function Run(logger, $rootScope, $timeout) {
    logger.log('app.Run():', {
      '$rootScope': $rootScope,
    });

    function hideSplash() {
      // Force a 1 second delay so we can see the splash.
      $timeout(function () {
        $rootScope.showSplash = false;
      }, 1000);
    }
  }
})();
