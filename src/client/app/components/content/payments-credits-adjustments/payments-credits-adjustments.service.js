(function() {
  'use strict';
  angular
    .module('app.payments-credits-adjustments')
    .factory('paymentsCreditsAdjustmentsService', Service);

  Service.$inject = [
    '$http',
    'logger',
    'localStorageService',
    'utilityService'
  ];


  /* @ngInject */
  function Service($http, logger, localStorageService, utilityService) {

    // Public API
    var service = {
      getPayCreditAdjust: getPayCreditAdjust,
      exportPostBillAdjustments: exportPostBillAdjustments
    };

    return service;

    function getPayCreditAdjust(idInterval, accountId, invoiceNumber) {
      var authdata = localStorageService.get('authorizationData');
      var request = {
        method: 'GET',
        url: 'api/billing/invoiceReport/' + accountId + '/' + idInterval,
        params: {
          lang: localStorageService.get('i18n').currentMetraNetLocale,
          namespace: utilityService.getNameSpace(),
          inlineVatTaxes: (authdata.userInfo.InlineTax === 'F') ? 'false' : 'true',
          invoicenumber: invoiceNumber,
          userType: localStorageService.get("userType"),
          ecbarStatus: localStorageService.get("ecbarStatus")
          /*idInterval: idInterval,*/
        },
      };
      return $http(request)
        .then(function(response) {
          return response;
        })
        .catch(function(error) {
          logger.log('Error retrieving PaymentsCreditsAdjustments.');
        });
    }

    function exportPostBillAdjustments(idInterval, accountId) {
      var payerId = accountId;
      var params = {
        lang: localStorageService.get('i18n').currentMetraNetLocale,
        namespace: utilityService.getNameSpace(),
        ecbarStatus: localStorageService.get("ecbarStatus")
      }
      var request = {
        method: 'GET',
        url: 'api/billing/' + accountId + '/' + idInterval + '/' + 'adjustmentdetails' + '?isPostbill=true&accountslice=payer/' + payerId,
        params: params
      };

      return $http(request)
        .then(function(response) {
          return response;
        });
    }

  }
}());
