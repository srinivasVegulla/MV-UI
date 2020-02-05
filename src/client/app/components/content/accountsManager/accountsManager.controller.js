/* jslint maxlen: 250 */
(function() {
  'use strict';
  angular
    .module('app.accountsManager')
    .controller('accountsManagerController', Controller);
  Controller.$inject = [
    '$scope',
    '$rootScope',
    'accountsManagerService',
    'logger',
    'localStorageService',
    'changePasswordModalService',
    '$window',
    '$timeout',
    'translatorHelper',
    'utilityService',
    'userService'
  ];

  /* @ngInject */
  function Controller($scope, $rootScope, accountsManagerService, logger, localStorageService, changePassword, $window, $timeout, translatorHelper, utilityService, userService) {
    /* jshint validthis:true */
    var vm = this,
      COMPONENT_NAME = 'Accounts Manager',
      accountInformationData,
      _accountManager,
      _accountManagerUser,
      myAccountView = "myAccount";
      vm.accountsCardState = 'collapsed';
      vm.manageUserAccountsHierarchy = manageUserAccountsHierarchy;
      vm.makeUserActive = makeUserActive;
      vm.makeUserDeactive = makeUserDeactive;
      vm.changePassword = changePassword.open;
      vm.impersonateUser = false;
      vm.billableCapability = false;
      vm.accountsClose = false;
      vm.nodata = false;
      vm.showMoreAccounts = false;
      vm.hideWidget = true;
      vm.limit = 4;

    $scope.$watch('accountId', function(acctId){
      if (!acctId) return;
      vm.accountId = acctId;
      activate();
    });

    function activate() {
      vm.loading= true;
      manageUserAccountsHierarchy();
      accountInformationData = $scope.$on('accountInformationData', function(event,data) {
        vm.accountInfo = localStorageService.get('accountInformationData');
        userService.getCommonConfigFile().then(function (response) {
          if (response) {
            vm.accountNameinDropdown = response.displayName.rule.accountNameinDropdown;
            vm.billManagedAccountsFeilds = response.displayName.rule.billManagedAccounts;
            vm.userDisplayName = utilityService.getDisplayName(vm.accountNameinDropdown, vm.accountInfo);
          }
        });
      });

      var i18n = translatorHelper.loadFromStorage();
      vm.layoutLeftDirection = 'left';
      vm.layoutRightDirection = 'right';
      if(i18n.languageDirection == 'RTL') {
        vm.layoutLeftDirection = 'right';
        vm.layoutRightDirection = 'left';
      }
      angular.element($window).on('resize', function () {
        if (vm.accountsClose) {
          vm.viewAllBodyHeight();
        }
      });
    }
    vm.viewAllBodyHeight = function () {
      angular.element(".ecb-accountManagerBody").ready(function () {
        return utilityService.manageViewAllBodyHeight("ecb-accountManagerMain", "ecb-accountManagerBody");
      });
    }

    function manageUserAccountsHierarchy(){
      var authData = localStorageService.get('authorizationData');
      vm.activeUserNamespace = authData.userInfo.authenticationNamespace;
      _accountManager = localStorageService.get('accountManagerAccountId');
      _accountManagerUser = localStorageService.get('accountManagerName');
      vm.activeUserId = authData.userInfo.accountId;
      if(vm.activeUserId === _accountManager || _accountManager === null){
        vm.isBillManager = true;
      }else{
        vm.isBillManager = false;
      }
      if(_accountManager){
        vm.activeUserName = _accountManagerUser;
        vm.activeUserAccountId = _accountManager;
      }else{
        vm.activeUserName = authData.userName;
        vm.activeUserAccountId = authData.userInfo.accountId;
      }
      accountsManagerService.userCapabilities(vm.activeUserName, vm.activeUserNamespace).then(function(response){
        vm.capabilities = response.data.capabilities;
        for(var i=0; i<vm.capabilities.length; i++){
          if(vm.capabilities[i].capabilityProgId == 'MetraTech.MTImpersonateUserCapability'){
            vm.impersonateUser = true;
          }
          if (vm.capabilities[i].capabilityProgId == 'Metratech.MTManageBillableCapability'){
            vm.billableCapability = true;
          }
        }
        if(vm.impersonateUser && vm.billableCapability && vm.isBillManager){
          accountsManagerService.userAccountHierarchy(vm.activeUserAccountId, translatorHelper.currentMetraNetLocale()).then(function(result){
            vm.billManagerUsers = result.data.billManagees;
            vm.billManagerUsersLength = result.data.billManagees.length;
            if(vm.billManagerUsersLength > 3 && vm.accountsClose == false){
                vm.showMoreAccounts = true;
            }else if(vm.billManagerUsersLength == 0){
              vm.nodata = true;
            }
          })
            .catch(function(error) {
            logger.log('Error occured in app.accountsManager.accountsManagerController.manageUserAccountsHierarchy()', {
              error: error,
            });
            switch (error.status) {
              case 500:
              case 400:
              case 404:
              case 412:
              case 403:
              case 405:
                vm.addError = true;
                vm.capabilitiesError = false;
                vm.accountsError = true;
                vm.nodata = false;
                break;
              }
            });
          }else{
            vm.nodata = true;
            vm.hideWidget = false;
          }
      })
      .catch(function(error) {
          logger.log('Error occured in app.accountsManager.accountsManagerController.manageUserAccountsHierarchy()', {
            error: error,
          });
          switch (error.status) {
            case 500:
            case 400:
            case 404:
            case 412:
            case 403:
            case 405:
              vm.addError = true;
              vm.accountsError = false;
              vm.capabilitiesError = true;
              vm.nodata = false;
              break;
          }
        }).finally(function(){
          vm.loading= false;
        });
    }

    vm.getUserDisplayName = function(billUser){
       return utilityService.getDisplayName(vm.billManagedAccountsFeilds, billUser);
    }
    function makeUserActive(index, userName, accountId){
      vm.activeUserName = userName;
      vm.activeUserAccountId = accountId;
      vm.billManager = true;
      localStorageService.set("accountManagerAccountId", vm.activeUserAccountId);
      localStorageService.set("accountManagerName", vm.activeUserName);
      $window.location.reload();
    }

    function makeUserDeactive(){
      vm.billManager = false;
      vm.activeUserAccountId = vm.billManagerUsers.accountId;
      vm.activeUser = vm.billManagerUsers.userName;
    }

    vm.openAccountsCardState = function() {
      $scope.$emit('dependentDirectiveViewChange', true, "ecb-accounts-manager");
      vm.accountsCardState = 'expanded';
      vm.accountsClose = true;
      vm.showMoreAccounts = false;
      $scope.$emit('expanded', vm.accountsCardState, COMPONENT_NAME, true);
      vm.viewAllBodyHeight();
      vm.limit = vm.billManagerUsers.length;
      return vm.paymentCardState;
    };

    vm.openAccountDetails = function(){
      $timeout(function(){angular.element(".ecb-accountsViewAll").trigger("click")});
    }

    vm.closeAccountsCardState = function() {
      vm.accountsCardState = 'collapsed';
      if(vm.billManagerUsersLength > 3){
        vm.showMoreAccounts = true;
      }else{
        vm.showMoreAccounts = false;
      }
      $scope.$emit('expanded', vm.accountsCardState, COMPONENT_NAME, false);
      vm.limit = 4;
      $scope.$emit('dependentDirectiveViewChange', false, "ecb-accounts-manager");
      vm.accountsClose = false;
    };

    vm.myAccountRoute = function() {
      $scope.$emit('setSelectedViewOn', myAccountView);
    }

    vm.billManagerUserList = function(){
      if(vm.billManagerUsersLength > 3){
        return 'ecb-userListRows';
      }else{
        return 'ecb-userListNoRows';
      }
    }
  }
})();
