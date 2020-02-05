(function() {
  'use strict';

  angular
    .module('app.account')
    .controller('accountInfoController', Controller);

  Controller.$inject = [
    '$scope',
    'logger',
    'accountService',
  ];

  /* @ngInject */
  function Controller($scope, logger, account) {
    /* jshint validthis: true */
    var vm = this;
    vm.account = {
      info: account.info,
    };
    vm.formattedAddress = formattedAddress;
    vm.formattedLocation = formattedLocation;
    vm.loading = true;

    $scope.$watch('vm.accountId', function(acctId){
      activate();
    });

    function activate() {
      account.load(vm.accountId)
        .then(function(result) {
          logger.log('app.account.info.Controller.activate(): Success!', {
            result: result,
          });
        })
        .catch(function (error){
           logger.log('app.account.info.Controller.activate(): Error!', {
              error: error,
            });
        })
        .finally(function (){
          vm.loading = false;
        });
    }

    function formattedAddress() {
      var info = vm.account.info;
      var address = '';
      address += info.address1 ? info.address1 : '';
      address += info.address2 ? ', ' + info.address2 : '';
      address += info.address3 ? ', ' + info.address3 : '';
      return address;
    }

    function formattedLocation() {
      var info = vm.account.info;
      var location = '';
      location += info.city ? info.city + ', ' : '';
      location += info.state ? info.state + ', ' : '';
      location += info.zip ? info.zip + ', ' : '';
      location += info.enumName ? info.enumName : '';
      return location;
    }
  }
})();
