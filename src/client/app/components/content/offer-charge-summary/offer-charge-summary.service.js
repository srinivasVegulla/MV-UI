/* jshint maxlen: 300 */
//jscs:disable maximumLineLength
(function() {
  'use strict';
  angular
    .module('app.offer-charge-summary')
    .factory('offerChargeService', Service);

  Service.$inject = [
    '$http',
    'logger',
    'localStorageService',
    '$q',
    'utilityService'
  ];

  /* @ngInject */
  function Service($http, logger, localStorageService, $q, utilityService) {
      var userInfo = {},
          exportCharges = {};

      var _cachedData = {};
      var Service = {
          userDetails: fetchUserDetails,
          offerSummaryCharges: getOfferSummaryCharges,
          productViewDetails: getProductViewDetails,
          getXmlLocale: getXmlLocale,
          parentAccountDetails: fetchParentAccountDetails,
          childAccountDetails: fetchChildAccountDetails,
          getFileAsStream: getStream
      };

      return Service;

      function fetchUserDetails(idInterval, accountId, invoiceNumber, onDemandInterval, startDate, endDate) {
        try {
          var authdata = localStorageService.get('authorizationData');
        } catch (err) {
          console.log('error calling localStorageService: ' + err);
        }
        var params = {
          lang: localStorageService.get('i18n').currentMetraNetLocale, //TODO : pass lang as an argument when API support is provided on master.
          inlineVat: (authdata.userInfo.inlineTax === 'F') ? 'false' : 'true',
          inlineAdj: (authdata.userInfo.inlineAdjustments === 'F') ? 'false' : 'true',
          reportView: 'ONLINEBILL',
          secondPass: (authdata.userInfo.secondPassData === 'F') ? 'false' : 'true',
          userType: localStorageService.get("userType"),
          paysForOthers: localStorageService.get("paysForOthers"),
          namespace: utilityService.getNameSpace(),
        };
        if(startDate || endDate){
          params.startdate = "'"+startDate+"'";
          params.enddate = "'"+endDate+"'";
        }else {
          params.intervalid = idInterval;
          params.invoicenumber = (invoiceNumber != undefined ? invoiceNumber : 0);
          params.ondemandinterval = (onDemandInterval != undefined ? onDemandInterval : false);
        }
        var request = {
          method: 'GET',
          url: 'api/billing/productreport/' + accountId,
          params: params,
          cache: true
        };        return $http(request)
          .then(function (response) {
            userInfo = response;
            return userInfo;
          })
          .catch(function (error) {
            logger.log('app.offer-charge-summary.offerChargeService.fetchUserDetails():', {
              error: error
            });

            logger.log('Error retrieving UserDetails.');
          });

      }

      function getProductViewDetails(filename) {
          var request = {
              method: 'GET',
              url: '/static/default/productViewConfig/' + filename + '.json',
              params: {
                  lang: 'us',
              },
          };
          return $http(request)
              .then(function (response) {
                  _cachedData = response;
                  return _cachedData;
              });
      }

      function getXmlLocale(filename, userLocale) {
        var request = {
            method: 'GET',
            url: '/static/default/i18n/productViews/' + filename + '_' + userLocale + '.json',
        };
        return $http(request)
            .then(function (response) {
                _cachedData = response;
                return _cachedData;
            });
      }

      function removeAsStringFromKey(key) {
        var index = key.toLowerCase().indexOf('asstring');
        return index > -1 ? key.substring(0, index) : key;
      }

      function getOfferSummaryCharges(idInterval,startDate, endDate, instanceIds, viewIds, accountId, invoiceNumber,
       onDemandInterval, sortKey, filterItems, offset, count, payeeAccountId, viewLabel, sortOrder, chargeType, hasSubcharge, parentSessionId) {
        var columns = "";
        var filters = "";
        for (var key in filterItems) {
          var keyTypes = key.split('|');
          var isDate = ['timestamp', 'date', 'datetime'].indexOf(keyTypes[1].toLowerCase()) >= 0 ? true : false;
          //var isNumber = ['integer', 'number', 'numeric', 'decimal', 'double'].indexOf(keyTypes[1].toLowerCase()) >= 0 ? true : false;
          var colKey = removeAsStringFromKey(keyTypes[0]);
          columns += colKey +",";
          if(isDate) {
            filters += "("+ colKey +"> '" + filterItems[key].prev + "' and "+ colKey +"< '" + filterItems[key].next+ "');";
          }
          /*else if(isNumber) {
            filters += keyTypes[0] +"==" + filterItems[key] + ";";
          }
          */else {
            filters += colKey +"==%" + filterItems[key] + "%;";
          }
        }
        var params = {
            lang: localStorageService.get('i18n').currentMetraNetLocale,
            namespace: utilityService.getNameSpace(),
            productslice : (chargeType == 'individualPI' ? 'Template/' : 'instance/') + instanceIds + '/' + viewIds,
            offset: offset,
            pagesize: count
          };
        if(startDate || endDate){
          params.startdate = "'"+startDate+"'";
          params.enddate = "'"+endDate+"'";
          params.accountslice = 'ancestor/' + accountId;
        }else {
          params.intervalId = idInterval;
          params.accountslice = 'payer/' + accountId;
          params.invoicenumber = (invoiceNumber != undefined ? invoiceNumber : 0);
          params.ondemandinterval = (onDemandInterval != undefined ? onDemandInterval : false);
        }
        if(payeeAccountId && viewLabel == "account"){
          params.accountslice = 'payerpayee/' + accountId + '/' +payeeAccountId;
        } else if(localStorageService.get('userType') == "subscriber"){
          params.accountslice = 'payerpayee/' + localStorageService.get('payeePayerId') + '/' + accountId;
        }
        if(filters){
          params.columns = columns.substring(0, columns.length - 1);
          params.filter = filters.substring(0, filters.length - 1);
        }
        if(sortKey && sortKey != undefined){
          params.sort = removeAsStringFromKey(sortKey);
          params.order = sortOrder && sortOrder != undefined ? sortOrder : "desc";
        }
        if(hasSubcharge) {
          params.compchildsumm = true;
        }
        if(parentSessionId) {
          params.parentSessionId = parentSessionId;
        }
        var request = {
          method: 'GET',
          url: 'api/billing/charges/' + accountId + '/usagedetails',
          params: params,
      };

      return $http(request)
      .then(function(response) {
          return response.data;
      });
    }

    function fetchParentAccountDetails(offset, pagesize, idInterval, accountId, invoiceNumber, onDemandInterval, startDate, endDate) {
          var authdata = localStorageService.get('authorizationData');
          var params = {
            lang: localStorageService.get('i18n').currentMetraNetLocale,
            namespace: utilityService.getNameSpace(),
            inlineVat: (authdata.userInfo.inlineTax === 'F') ? 'false' : 'true',
            inlineAdj: (authdata.userInfo.inlineAdjustments === 'F') ? 'false' : 'true',
            reportView: 'ONLINEBILL',
            secondPass: (authdata.userInfo.secondPassData === 'F') ? 'false' : 'true',
            offset: offset, 
            pagesize: pagesize
          }
          if(startDate || endDate){
            params.startdate = "'"+startDate+"'";
            params.enddate = "'"+endDate+"'";
          }else {
            params.intervalid = idInterval;
          }
          if(invoiceNumber != undefined && invoiceNumber != null) {
            params.invoicenumber = invoiceNumber;
            params.ondemandinterval = (onDemandInterval != undefined ? onDemandInterval : false);
          }
          var request = {
              method: 'GET',
              url: 'api/billing/folderreport/' + accountId,
              params: params,
              cache: true
          };
          return $http(request)
          .then(function (response) {
              userInfo = response;
              return userInfo;
          });
      }

    function fetchChildAccountDetails(offset, pagesize, idInterval, accountId, currency, ancestorId, begin, end,
       invoiceNumber, onDemandInterval, chAccNameFilter, startDate, endDate) {
          var authdata = localStorageService.get('authorizationData');
          var params = {
            lang: localStorageService.get('i18n').currentMetraNetLocale,
            namespace: utilityService.getNameSpace(),
            inlineVat: (authdata.userInfo.inlineTax === 'F') ? 'false' : 'true',
            inlineAdj: (authdata.userInfo.inlineAdjustments === 'F') ? 'false' : 'true',
            reportView: 'ONLINEBILL',
            secondPass: (authdata.userInfo.secondPassData === 'F') ? 'false' : 'true',
            currency: currency,
            folderId: ancestorId,
            begin: begin,
            end: end,
            offset: offset, 
            pagesize: pagesize
          }
          if(startDate || endDate){
            params.startdate = "'"+startDate+"'";
            params.enddate = "'"+endDate+"'";
          }else {
            params.intervalid = idInterval;
          }
          if(!utilityService.isEmpty(chAccNameFilter)) {
            params.columns = 'AccountName';
            params.filter = 'AccountName==%'+chAccNameFilter+'%';
            params.isReport = false;
          }
          if(invoiceNumber != undefined && invoiceNumber != null) {
            params.invoicenumber = invoiceNumber;
            params.ondemandinterval = (onDemandInterval != undefined ? onDemandInterval : false);
          }
          var request = {
              method: 'GET',
              url: 'api/billing/folderreport/' + accountId,
              params: params,
              cache: true
          };
          return $http(request)
          .then(function (response) {
              userInfo = response;
              return userInfo;
          });
      }

      function getStream(idInterval, startDate, endDate, instanceIds, viewIds, accountId, invoiceNumber, onDemandInterval, exportColumns, 
        exportLocalization, chargeType, payeeAccountId, viewLabel, parentSessionId){
        var deferred = $q.defer();
        var url = 'api/billing/charges/' + accountId + '/usagedetails/download';
        var params = {
            lang : 'us',
            productslice : (chargeType == 'individualPI' ? 'Template/' : 'instance/') + instanceIds + '/' + viewIds,
            periodCount : 100,
            columns : exportColumns.join(),
            localizedcolumns : exportLocalization.join(),
            namespace: utilityService.getNameSpace()
          };
        if(startDate || endDate){
          params.startdate = "'"+startDate+"'";
          params.enddate = "'"+endDate+"'";
          params.accountslice = 'ancestor/' + accountId;
        }else {
          params.intervalid = idInterval;
          params.accountslice = 'payer/' + accountId;
          params.invoicenumber = (invoiceNumber != undefined ? invoiceNumber : 0);
          params.ondemandinterval = (onDemandInterval != undefined ? onDemandInterval : false);
        }
        if(payeeAccountId && viewLabel == "account"){
          params.accountslice = 'payerpayee/' + accountId + '/' +payeeAccountId;
        } else if(localStorageService.get('userType') == "subscriber"){
          params.accountslice = 'payerpayee/' + localStorageService.get('payeePayerId') + '/' + accountId;
        }
        if(parentSessionId) {
          params.parentSessionId = parentSessionId;
        }
        $http({
          url: url,
          method:"GET",//you can use also GET or POST
          params: params,
          contentType : 'text/csv',
          responseType: 'arraybuffer'
        }).success(function (data) {
            console.debug("SUCCESS");
            deferred.resolve(data);
          }).error(function (data) {
            console.error("ERROR");
            deferred.reject(data);
          });
        return deferred.promise;
    };
  }
})();
