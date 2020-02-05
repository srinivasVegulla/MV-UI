(function() {
  'use strict';
  angular
    .module('app.subscriptions')
    .factory('subscriptionsServices', Service);

  Service.$inject = [
    '$http',
    'logger',
    'translatorHelper',
    'localStorageService',
    'utilityService'
  ];


  /* @ngInject */
  function Service($http, logger, translatorHelper, localStorageService, utilityService) {
    // Public API
    var service = {
      getSubscriptions: getSubscriptions,
      cancelSubscriptions: cancelSubscriptions,
      //getResponseConfigJson : getResponseConfigJson,
      getEligibleOffers: getEligibleOffers,
      addSubscriptions: addSubscriptions
    };

    return service;

    function getSubscriptions(accountId, idInterval) {
      var request = {
        method: 'GET',
        url: 'api/subscriptions/' + accountId + '/' + idInterval,
        params: {
          lang: localStorageService.get('i18n').currentMetraNetLocale,
          namespace: utilityService.getNameSpace()
         },
      };

      return $http(request).then(function(response) {
          if (response) {
            var mySubscriptionsResponse = response.data.Subscriptions;
            mySubscriptionsResponse.forEach(function(subscription, iterator) {
              subscription.startDateAsString = new Date(Date.parse(subscription.startDateAsString));
              subscription.endDateAsString = new Date(Date.parse(subscription.endDateAsString));
            });
            return mySubscriptionsResponse;
          }
        });
   }

    function cancelSubscriptions(accountId, cancelSubscriptionInfo, isBundle) {
      var request = {
        method: 'PUT',
        url: 'api/subscriptions/' + accountId,
        data: cancelSubscriptionInfo,
        params: {
          lang: localStorageService.get('i18n').currentMetraNetLocale,
          isBundle: isBundle,
          namespace: utilityService.getNameSpace()
        }
      };
      return $http(request).then(function(response) {
          return response.data.subscriptionUpdateStatus;
        });
    }

    /*function getResponseConfigJson(filename) {
      var request = {
        method: 'GET',
        url: '/static/default/charges/' +filename+'.json'
      };
      return $http(request)
        .then(function (response) {
          return response;
        });
    }*/

    function getEligibleOffers(accountId, localeError) {
      var currentLocale;
      if(localeError) {
        currentLocale = 'en';
      } else {
        currentLocale = translatorHelper.currentMetraNetLocale();
      }
      switch (currentLocale) {
              case 'en':
                currentLocale = 'us';
                break;
              case 'ja':
                currentLocale = 'jp';
                break;
              case 'en-gb':
                currentLocale = 'gb';
                break;
              case 'se':
                currentLocale = 'us';
                break;
              case 'he':
                currentLocale = 'us';
                break;
              case 'ar':
                currentLocale = 'us';
              case 'es-mx':
                currentLocale = 'es-MX';
            }
      var request = {
        method: 'GET',
        url: 'api/subscriptions/eligibleoffers/' + accountId,
        params: {
          lang: currentLocale,
          namespace: utilityService.getNameSpace()
        }
      };
      return $http(request).then(function(response){
        return response.data.EligibleOffers;
      });
    }

    function addSubscriptions(accountId, requestObj, isBundle) {
      var request = {
        method: 'POST',
        url: 'api/subscriptions/' + accountId,
        params: {
          lang: translatorHelper.currentMetraNetLocale(),
          isBundle: isBundle,
          namespace: utilityService.getNameSpace()
        },
        data: requestObj
      };
      return $http(request).then(function(response){
        return response.data;
      });
    }
  }
}());
