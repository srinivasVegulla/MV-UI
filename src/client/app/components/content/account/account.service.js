(function () {
  'use strict';

  angular
    .module('app.account')
    .factory('accountService', Service);

  Service.$inject = [
    'logger',
    '$http',
    '$httpParamSerializer',
    '$q',
    'translatorHelper',
    'localStorageService',
    '$rootScope',
    'utilityService'
  ];

  /* @ngInject */
  function Service(logger, $http, $httpParamSerializer, $q, translatorHelper, localStorageService, $rootScope, utilityService) {
    var _accountInfo = {
      idAcc: 0,
      contactType: '',
      firstName: '',
      middleInitial: '',
      lastName: '',
      email: '',
      address1: '',
      address2: '',
      address3: '',
      phoneNumber: '',
      company: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      enumName: '',
      enumId: ''
   };
    // Public API
    var service = {
      info: _accountInfo,
      load: loadAccountInfo,
      update: updateAccount,
      buildAccountInfoModel: buildAccountInfoModel
    };

    return service;

    function updateAccount(accountInfo) {
      return $http.put('api/accounts/' + accountInfo.idAcc + '?lang=' + translatorHelper.currentMetraNetLocale() + '&namespace=' + utilityService.getNameSpace(), accountInfo)
        .then(function (response) {
          buildAccountInfoModel(accountInfo);
          return _accountInfo;
        });
    }

    function loadAccountInfo(accountId) {
      var request = {
        method: 'GET',
        url: 'api/accounts/' + accountId,
        params: {
          lang: localStorageService.get('i18n').currentMetraNetLocale,
          namespace: utilityService.getNameSpace(),
        },
      };

      return $http(request)
        .then(function (response) {
          buildAccountInfoModel(response.data.accountInfo);
          return _accountInfo;
        })
        .catch(function (error) {
          buildAccountInfoModel();
          return $q.reject(error);
        });
    }

    function buildAccountInfoModel(data) {
      if (!data) {
        _accountInfo ={
            idAcc: 0,
            contactType: '',
            firstName: '',
            middleInitial: '',
            lastName: '',
            email: '',
            address1: '',
            address2: '',
            address3: '',
            phoneNumber: '',
            company: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            enumName: '',
            enumId: '',
            userName: ''
         }
      } else {
        _accountInfo.idAcc = data.idAcc;
        _accountInfo.contactType = data.contactType;
        _accountInfo.firstName = data.firstName;
        _accountInfo.middleInitial = data.middleInitial;
        _accountInfo.lastName = data.lastName;
        _accountInfo.email = data.email;
        _accountInfo.address1 = data.address1;
        _accountInfo.address2 = data.address2;
        _accountInfo.address3 = data.address3;
        _accountInfo.phoneNumber = data.phoneNumber;
        _accountInfo.company = data.company;
        _accountInfo.city = data.city;
        _accountInfo.state = data.state;
        _accountInfo.zip = data.zip;
        _accountInfo.country = data.country;
        _accountInfo.enumName = data.enumName;
        _accountInfo.enumId = data.enumId;
        _accountInfo.userName = data.userName;
      }

      if(_accountInfo.email)
        _accountInfo.email = decodeURIComponent(_accountInfo.email);
      localStorageService.set('accountInformationData', _accountInfo);
      $rootScope.$broadcast('accountInformationData', true);
    }
  }
}());
