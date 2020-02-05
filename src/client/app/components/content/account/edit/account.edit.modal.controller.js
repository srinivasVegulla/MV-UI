(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name ecb account edit modal controller
   * @description
   * # ecb account edit modal controller
   *
   * Account edit modal controller.
   */
  angular
    .module('app.account')
    .controller('accountEditModalController', Controller);

  Controller.$inject = [
    'logger',
    '$uibModalInstance',
    'accountService',
    'countryService',
    'translatorHelper',
    '$filter'
  ];

  /* @ngInject */
  function Controller(logger, $uibModalInstance, account, countryService, translatorHelper, $filter) {
    /* jshint validthis: true */
    var vm = this;
    vm.accountInfo = {};
    vm.countries = [];
    vm.save = save;
    vm.cancel = cancel;
    vm.getCountry = getCountry;
    vm.countryDropdownIsvalid = countryDropdownIsvalid;

    activate();

    function activate() {
      vm.accountInfo = angular.copy(account.info);
      getCountries()
        .then(function (countries) {
          vm.countries = countries;
          if (vm.accountInfo.enumId) {
              vm.selectedCountry = vm.getCountry(vm.accountInfo.enumId);
          } else {
              vm.selectedCountry = null;
          }
        });
    }

    var i18n = translatorHelper.loadFromStorage();
      vm.layoutLeftDirection = 'left';
      vm.layoutRightDirection = 'right';
      if(i18n && i18n.languageDirection == 'RTL') {
        vm.layoutLeftDirection = 'right';
        vm.layoutRightDirection = 'left';
      }

    function save() {
      vm.loading = true;
      account.update(vm.accountInfo)
        .then(function(result) {
          var updateSuccess = ($filter('translate')('TEXT_ACCOUNT_UPDATE_SUCCESSFUL'));
          logger.success(updateSuccess);
          $uibModalInstance.close(vm.accountInfo);
        })
        .catch(function (error) {
          vm.error = error.data;
          if (vm.error.exception) {
            vm.errorMessage = (vm.error.exception.indexOf('HttpHostConnectException') > -1) ? 1 : 2;
          }
        }).finally(function (){
          vm.loading = false;
        });
    }
    vm.updateEnumName = function() {
      if(vm.selectedCountry){
        vm.accountInfo.enumId = vm.selectedCountry.enumId;
        vm.accountInfo.enumName = vm.selectedCountry.enumName;
      }
    }

    function getCountry(enumId) {
      // ToDo: Look into using lodash's find/filter/etc. function.
      for (var i in vm.countries) {
        if (vm.countries[i].enumId == enumId)
          return vm.countries[i];
      }
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function countryDropdownIsvalid(accountEditForm) {
      if (!vm.selectedCountry) {
        accountEditForm.countryDropdown.$setValidity('required', false);
        return false;
      } else {
        accountEditForm.countryDropdown.$setValidity('required', true);
        return true;
      }
    }

    function getCountries() {
      var enumName = 'Global/CountryName';
      return countryService.getMetadata(enumName)
        .then(function (result) {
          return result;
        })
        .catch(function (error) {
          logger.log('app.account.accountEditModalController.getCountries(): Error!', {
            error: error,
          });
          return null;
        });
    }
  }
})();
