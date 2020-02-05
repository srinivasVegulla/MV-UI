(function() {
  'use strict';

  angular
    .module('app.payment-methods')
    .factory('paymentMethodsService', Service);

  Service.$inject = [
    '$http',
    'logger',
    '$location',
    'localStorageService',
    'utilityService'
  ];

  function Service($http, logger, $location, localStorageService, utilityService) {
    var paymentMethods = {},
      creditMethods = {},
      updateMethods = {},
      deleteMethods = {};
    var paymentType = "card";
    var locale = "us";
    var password = "Password";
    var hostName = $location.protocol() + '://' + $location.host() + ':' + $location.port();
    var hostPath = $location.protocol() + '://' + $location.host();
    var receiptPageUrl = hostName + "/payment/receipt";
    var cancelPageUrl = hostName + "/payment/receipt";

    var service = {
      getPayment: getPaymentMethods,
      getCredit: getCreditMethods,
      getUpdate: getUpdatedCreditMethods,
      getDelete: getDeleteCreditMethods
    };

    return service;

    function getPaymentMethods(accountId) {
      var request = {
        method: 'GET',
        url: 'api/paymentmethods/' + accountId,
        params: {
          lang: localStorageService.get('i18n').currentMetraNetLocale,
          namespace: utilityService.getNameSpace()
        },
      };

      return $http(request)
        .then(function(response) {
          return response;
        });
    }

    function getCreditMethods(accountId, currency, invoiceList) {
      var request = {
        method: 'POST',
        url: 'api/paymentmethods/createcybersourceform',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          accountId: accountId,
          currency: currency,
          locale: locale,
          receiptPageUrl: receiptPageUrl,
          cancelPageUrl: cancelPageUrl,
          password: password,
          invoiceList: invoiceList
        }
      };
      return $http(request)
        .then(function(response) {
          return response;
        });
    }

    function getUpdatedCreditMethods(accountId, currency, idPaymentInstrument) {
      var request = {
        method: 'POST',
        url: 'api/paymentmethods/createcybersourceformforupdate',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          paymentMethod: paymentType,
          accountId: accountId,
          currency: currency,
          locale: locale,
          receiptPageUrl: receiptPageUrl,
          idPaymentInstrument: idPaymentInstrument,
          password: password
        }
      };
      return $http(request).then(function(response) {
        return response;
      });

    }

    function getDeleteCreditMethods(accountId, idPaymentInstrument) {
      var request = {
        method: "POST",
        url: "api/paymentmethods/deletepaymentmethod/" + accountId,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          paymentInstrumentId: idPaymentInstrument
        },
      };
      return $http(request).then(function(response) {
        return response;
      });
    }
  }
}());
