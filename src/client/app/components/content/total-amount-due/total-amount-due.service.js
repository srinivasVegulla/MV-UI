(function() {
  'use strict';

  angular
    .module('app.total-amount-due')
    .factory('amountDueService', Service);

  Service.$inject = [
    '$http',
    'logger',
    '$location',
    'localStorageService',
    'utilityService'
  ];

  /* @ngInject */
  function Service($http, logger, $location, localStorageService, utilityService) {
    var _cachedData = {},
          _currency,
          _mainUrl = '',
          _method = '',
          invoiceData= {};
    var locale = "us";
    var password = "Password";
    var hostName = $location.protocol() + '://' + $location.host() + ':' + $location.port();
    var hostPath = $location.protocol() + '://' + $location.host();
    var receiptPageUrl = hostName + "/payment/receipt";
    var cancelPageUrl = hostName + "/payment/receipt";
    // Public API
    var service = {
      getDuePayment: getDuePaymentAmount,
      getPayment: getPaymentDetails,
      getPaymentStatus: getPaymentStatus,
      getInvoices: getInvoices,
      getPaymentInvoiceDetails: getPaymentInvoiceDetails,
      getOneTimePayment: getOneTimePayment,
      getSettings: getBillSettings
    };

    return service;

    function getDuePaymentAmount(accountId) {
      var request = {
        method: 'GET',
        url: 'api/billing/paymentinfo/' + accountId,
        params: {
          lang: localStorageService.get('i18n').currentMetraNetLocale,
          ecbarStatus : localStorageService.get("ecbarStatus"),
          namespace: utilityService.getNameSpace(),
        },
      };

      return $http(request)
        .then(function(response) {
          response.data.PaymentInfo.dueDate = new Date(response.data.PaymentInfo.dueDate);
          _currency = response.data.PaymentInfo.currency;
          _cachedData = response;
          return _cachedData;
        });
    }

    function getPaymentDetails(accountId, idPaymentInstrument, amount, date, payNow) {
      var hostPath = $location.protocol() + '://' + $location.host();
      var requestData = {
        "ecbPaymentData": {
          PaymentInstrumentId: idPaymentInstrument,
          InvoiceNum: "",
          InvoiceDate: date,
          Amount: amount,
          Currency: _currency,
          PayNow: payNow,
          schedulePaymentDate: date
        }
      };
      var request = {
        method: 'POST',
        url: 'api/paymentmethods/makepayment',
        data: JSON.stringify(requestData),
      };

      return $http(request)
        .then(function(response) {
          _cachedData = response;
          return _cachedData;
        });
    }

    function getPaymentInvoiceDetails(accountId,amountPayable,selectedCardId,finalInvoiceList,payNowBtn,oneTimePayment,currentDateSigned) {
      var hostPath = $location.protocol() + '://' + $location.host();
      var requestData = {
        id_Acc: accountId,
        "MakePaymentDataAR" : {
          Amount:  amountPayable,
          PaymentInstrumentId: selectedCardId,
          Invoices: finalInvoiceList,
          Currency: _currency,
          PayNow: payNowBtn,
          IsOneTimePayment : oneTimePayment,
          SchedulePaymentDate: currentDateSigned
        }
      };
      var request = {
        method: 'POST',
        url: 'api/paymentmethods/makearpayment',
        data: JSON.stringify(requestData),
      };

      return $http(request)
        .then(function(response) {
          _cachedData = response;
          return _cachedData;
        });
    }

    function getPaymentStatus(accountId, intervalId, ecbARCheck) {
      var params = {
        intervalId: intervalId,
        lang: localStorageService.get('i18n').currentMetraNetLocale,
        namespace: utilityService.getNameSpace(),
      }
      if(ecbARCheck === '0'){
        _method = 'POST';
       _mainUrl = 'api/paymentmethods/ecbarpayments/getarpaymenthistory/' + accountId
      } else {
        _method = 'GET';
       _mainUrl = 'api/paymentmethods/paymenthistory/' + accountId +'?&ecbarStatus=' + localStorageService.get("ecbarStatus")
      }
      var request = {
        method: _method,
        url: _mainUrl,
        params: params
      };

      return $http(request)
        .then(function(response) {
          _cachedData = response.data.paymentHistory;
          return _cachedData;
        });
    }

    
    function getOneTimePayment(accountId, amount, date, invoiceList) {
      var request = {
        method: 'POST',
        url: 'api/paymentmethods/createcybersourceform',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          accountId: accountId,
          currency: _currency,
          locale: locale,
          receiptPageUrl: receiptPageUrl,
          cancelPageUrl: cancelPageUrl,
          password: password,
          oneTimePayment: true,
          amount : amount,
          invoiceDate: date,
          invoiceList: invoiceList
        }
      };
      return $http(request)
        .then(function(response) {
          _cachedData = response;
          return _cachedData;
        });
    }

    function getInvoices(accountId) {
      var request = {
        method: 'GET',
        url: 'api/paymentmethods/ecbARPayments/GetOpenInvoices/' + accountId,
        params: {
          namespace: utilityService.getNameSpace()
        }
      };

      return $http(request)
        .then(function(response) {
          invoiceData = response;
          return response;
        });
    }

    function getBillSettings(billSettingId) {
      var request = {
        method: 'GET',
        url: 'api/sitebillsetting/billsetting/' + billSettingId,
        params: {
          /*idInterval: idInterval,*/
        },
      };

      return $http(request)
        .then(function(response) {
          var settingsResponse = response;
          return settingsResponse;
        })
        .catch(function(error) {
          console.log('Error retrieving BillSettings.');
        });
    }

  }

})();
