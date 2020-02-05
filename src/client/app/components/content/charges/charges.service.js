(function() {
  'use strict';
  angular
    .module('app.charges')
    .factory('chargesService', Service);

  Service.$inject = [
    '$http',
    'logger',
    'localStorageService',
    'utilityService'
  ];


  /* @ngInject */
  function Service($http, logger, localStorageService, utilityService) {
    var _miscUrl;
    // Public API
    var service = {
      getReport: getProductReport,
      getSettings: getBillSettings,
      exportPreBillAdjustments: exportPreBillAdjustments,
      getNonStandardCharges: getNonStandardCharges,
      getMiscAdjustDetails: getMiscAdjustDetails
    };

    return service;

    function getProductReport(idInterval, accountId, inlineAdj, inlineTax, invoiceNumber, onDemandInterval) {
      var authdata = localStorageService.get('authorizationData');
      var request = {
        method: 'GET',
        url: 'api/billing/productreport/' + accountId,
        params: {
           lang: localStorageService.get('i18n').currentMetraNetLocale, //TODO : pass lang as an argument when API support is provided on master.
           inlineVat: inlineTax,
           inlineAdj: inlineAdj,
           reportView: 'ONLINEBILL',
           secondPass: (authdata.userInfo.SecondPassData === 'F') ? 'false' : 'true',
           invoicenumber: invoiceNumber != undefined ? invoiceNumber : 0,
           ondemandinterval: onDemandInterval != undefined ? onDemandInterval : false,
           intervalid : idInterval,
           userType: localStorageService.get("userType"),
          namespace: utilityService.getNameSpace(),
        },
      };

      return $http(request)
        .then(function(response) {
          var chargesResponse = response;
          return chargesResponse;
        })
        .catch(function(error) {
          logger.log('app.charges.chargesService.getProductReport():', {
            error: error
          });

          logger.log('Error retrieving productreport.');
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
          logger.log('app.charges.chargesService.getBillSettings():', {
            error: error
          });

          logger.log('Error retrieving BillSettings.');
        });
    }

    function exportPreBillAdjustments(idInterval, accountId) {
      var payerId = accountId;
      var request = {
        method: 'GET',
        url: 'api/billing/' + accountId + '/' + idInterval + '/' + 'adjustmentdetails?lang=' + localStorageService.get('i18n').currentMetraNetLocale + '&isPostbill=false&accountslice=payer/' + payerId + '&namespace=' + utilityService.getNameSpace(),
      };

      return $http(request)
        .then(function(response) {
          var exportCharges = response;
          return exportCharges;
        });

    }

    function getNonStandardCharges(idInterval, accountId, startDate, endDate) {
      var params = {
        lang: localStorageService.get('i18n').currentMetraNetLocale,
        namespace: utilityService.getNameSpace(),
        userType: localStorageService.get("userType")
      };
      if(startDate || endDate){
        params.startdate = startDate;
        params.enddate = endDate
      }else {
        params.intervalid = idInterval;
      }
      var request = {
        method: 'GET',
        url: 'api/billing/nonstandardcharges/' + accountId,
        params: params
      };
      return $http(request)
        .then(function(response) {
          var nonStandardCharges = response;
          return nonStandardCharges;
        });
    }

    function getMiscAdjustDetails(idInterval, startDate, endDate, accountId) {
      var params = {
        lang: localStorageService.get('i18n').currentMetraNetLocale,
        namespace: utilityService.getNameSpace(),
        userType: localStorageService.get("userType")
      };
      var ecbARCheck = localStorageService.get("ecbarStatus");
      if(startDate || endDate){
        params.startdate = startDate;
        params.enddate = endDate
      }else {
        params.intervalid = idInterval;
      }
      if(ecbARCheck === '0'){
        _miscUrl = 'api/billing/miscadjustments/' + accountId + '?ecbarStatus=' + localStorageService.get("ecbarStatus");
      } else {
        _miscUrl = 'api/billing/miscadjustments/' + accountId;
      }
      var request = {
        method: 'GET',
        url: _miscUrl,
        params: params
      };

      return $http(request)
        .then(function(response) {
          return response;
        });
    }

  }
}());
