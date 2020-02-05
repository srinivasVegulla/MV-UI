(function() {
  'use strict';
  angular
    .module('app.total-bill-amount')
    .factory('totalBillAmountService', Service);

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
      gettotalBillAmount: gettotalBillAmount
    };

    return service;

    function gettotalBillAmount(accountId, idInterval, invoiceNumber, onDemandInterval) {
      var authdata = localStorageService.get('authorizationData');
      var request = {
        method: 'GET',
        url: 'api/billing/totalamount/' + accountId + '/' + idInterval,

        params: {
           lang: localStorageService.get('i18n').currentMetraNetLocale, //TODO : pass lang as an argument when API support is provided on master.
           inlineVatTaxes: (authdata.userInfo.InlineTax === 'F') ? 'false' : 'true',
           inlineAdj: (authdata.userInfo.InlineAdjustments === 'F') ? 'false' : 'true',
           reportView: 'ONLINEBILL',
           secondPass: (authdata.userInfo.SecondPassData === 'F') ? 'false' : 'true',
           invoicenumber: invoiceNumber,
           ondemandinterval: onDemandInterval,
           ecbarStatus: localStorageService.get("ecbarStatus"),
           namespace: utilityService.getNameSpace(),
          /*accountId: accountId,*/
        },
      };

      return $http(request).then(function(response) {
          var duePaymentResponse = response;
          return duePaymentResponse;
        })
        .catch(function(error) {
          logger.log('app.total-bill-amount.totalBillAmountServices.gettotalBillAmount():', {
            error: error,
          });

        });
    }
  }
}());
