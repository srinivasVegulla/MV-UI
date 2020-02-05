(function() {
  'use strict';
  angular
    .module('app.invoice')
    .factory('invoiceService', Service);

  Service.$inject = [
    '$http',
    'logger',
    'utilityService'
  ];
  /* @ngInject */
  function Service($http, logger, utilityService) {
    var service = {
      getQuotes: getQuotes,
      getQuotesPDF: saveQuotesPdf,
      getInvoices: getInvoices,
      getPDF: savePdf,
      getCreditNotes:getCreditNotes,
      getCreditNotePDF: saveCreditNotePdf,
      getDebitNotes: getDebitNotes,
      downloadDebitNotes: downloadDebitNotes
    };

    return service;

    function getQuotes(accountId,calendarStartDate,calendarEndDate) {
      var params = {
        namespace: utilityService.getNameSpace()
      }
      var request = {
        method: 'GET',
        url: 'api/downloadReports/quote/' +accountId +'?startdate=' +calendarStartDate+'&enddate='+calendarEndDate,
        params: params
      };
      return $http(request)
        .then(function(response) {
          return response;
      });
    }

    function saveQuotesPdf(invoiceFileName,accountId) {
      var params = {
       // namespace: utilityService.getNameSpace()
      }
      var request = {
        method: 'GET',
        url: 'api/downloadReports/download/quote/'+ accountId + '?fileName=' + invoiceFileName,
        responseType:'arraybuffer',
        params: params
      };
      return $http(request)
        .then(function(response) {
          return response;
     });
    }

    function getInvoices(idInterval,accountId) {
      var params = {
        namespace: utilityService.getNameSpace()
      }
      var request = {
        method: 'GET',
        url: 'api/downloadReports/' + idInterval + '/' + accountId,
        params: params
      };
      return $http(request)
        .then(function(response) {
          return response;
      });
    }

    function savePdf(invoiceFileName,idInterval,accountId) {
      var params = {
      //  namespace: utilityService.getNameSpace()
      }
        var request = {
        method: 'GET',
        url: 'api/downloadReports/download/' + idInterval +'/'+ accountId+ '?fileName=' + invoiceFileName,
        responseType:'arraybuffer',
        params: params
      };
      return $http(request)
        .then(function(response) {
          return response;
     });
    }

    function getCreditNotes(accountId,calendarStartDate,calendarEndDate) {
      var params = {
        namespace: utilityService.getNameSpace()
      }
      var request = {
        method: 'GET',
        url: 'api/downloadReports/creditnote/' + accountId + '?startdate='+ calendarStartDate +'&enddate='+ calendarEndDate,
        params: params
      };
      return $http(request)
        .then(function(response) {
          return response;
      });
    }

    function getDebitNotes(accountId,idInterval,creditOrDebit,startDate,enddate) {
      if(startDate || endDate){
        var requestData = {
          id_Acc:accountId,
          start_dt:startDate,
          end_dt:enddate,
          id_interval: '',
          creditOrDebit : creditOrDebit
        };
      }else {
        var requestData = {
          id_Acc:accountId,
          id_interval:idInterval,
          creditOrDebit : creditOrDebit
        };
      }
      var request = {
        method: 'POST',
        url: 'api/paymentmethods/ecbarpayments/getarcreditdebitdetails',
        data: JSON.stringify(requestData),
      };
      return $http(request)
        .then(function(response) {
          return response;
      });
    }

    function downloadDebitNotes(filePath,fileName) {
      var params = {
       // namespace: utilityService.getNameSpace()
      }
      var requestData = {
        "fileUrl": filePath
      };
      var request = {
        method: 'POST',
        url: 'api/downloadReports/download',
        data: JSON.stringify(requestData),
        responseType:'arraybuffer',
        params: params
      };
      return $http(request)
        .then(function(response) {
          return response;
      });
    }

    function saveCreditNotePdf(invoiceFileName,accountId) {
      var params = {
       // namespace: utilityService.getNameSpace()
      }
      var request = {
        method: 'GET',
        url: 'api/downloadReports/download/creditnote/'+ accountId+ '?fileName=' + invoiceFileName,
        responseType:'arraybuffer',
        params: params
      };
      return $http(request)
        .then(function(response) {
          return response;
     });
    }
  }
}());
