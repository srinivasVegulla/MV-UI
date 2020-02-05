(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('systemBarController', Controller);

  Controller.$inject = [
    '$rootScope',
    'authenticationService',
    '$state',
    'accountEditModalService',
    'paymentSetupModalService',
    'userService',
    'logger',
    'localStorageService',
    '$scope',
    '$filter',
    '$timeout',
    'utilityService',
    '$document',
    '$window',
    'translatorHelper'
  ];

  /* @ngInject */
  function Controller($rootScope,
    authService,
    $state,
    accountEdit,
    paymentSetup,
    userService,
    logger,
    localStorageService,
    $scope,
    $filter,
    $timeout,
    utilityService,
    $document,
    $window,
    translatorHelper) {
    /* jshint validthis: true */
    var vm = this,
        selectedDropDownViewForm,
        widgetState,
        filterInterval,
        selfCareEditAccount,
        allowOnlinePayment,
        _accountManager,
        offerStoreIndex,
        selectedView,
        viewIndex,
        downloadsOrQuotesEvent,
        offerStoreSelected,
        transactionWidgetInterval,
        accountInformationData;
    vm.logout = logout;
    vm.editAccount = accountEdit.open;
    vm.paymentSetup = paymentSetup.open;
    vm.selfCareEnabled = false;
    vm.showFilter = true;
    vm.applicationName = '';
    vm.logoutVisibility = localStorageService.get('normalFlow');
    vm.viewConfigSettings = {};
    vm.editAccountDisabled = editAccountDisabled;
    vm.checkWidgetVisible = checkWidgetVisible;
    vm.cardState = null;
    vm.isCardExpanded = isCardExpanded;
    vm.closeNavigationPanel = closeNavigationPanel;
    vm.showView = showView;
    var unregisterSystemBarEvents = [];
    vm.showMobileNavigationPanel = showMobileNavigationPanel;
    vm.highlightLink = highlightLink;
    vm.showDashboard = showDashboard;
    vm.isNavigationPanelOpen = false;
    vm.selectedNavLinkDisplay;
    vm.isBillPageOn = false;
    vm.isQuotes = false;
    vm.isDownloads = false;
    vm.userName = localStorageService.get('accountManagerName');
    vm.isOfferStore = false;
    activate();

    function activate() {
      $rootScope.$emit('showFilter_Account_Info', vm.showFilter);
      vm.activeAccountId = authService.authentication().userInfo;
      allowOnlinePayment = $rootScope.$on('allowOnlinePayment', function(event, data) {
        vm.allowAutoPaySetup = (data === 'F') ? false : true;
      });

      accountInformationData = $scope.$on('accountInformationData', function(event,data) {
        vm.accountInfo = localStorageService.get('accountInformationData');
        vm.userName = localStorageService.get('accountManagerName');
        userService.getCommonConfigFile().then(function (response) {
          if (response) {
            vm.displayNameFeilds = response.displayName.rule.systemBarName;
            vm.userDisplayName = utilityService.getDisplayName(vm.displayNameFeilds, vm.accountInfo);
          }
        });
      });

      selectedDropDownViewForm = $rootScope.$on('selectedViewFromDropdown', function(event, data) {
        vm.viewConfigSettings = data.widgets;
      });

      transactionWidgetInterval = $rootScope.$on('expandTransactionPopup', function(event,data) {
        vm.expandTransactionPopup = data;
      });

      userService.getUserSettings()
        .then(function(user) {
          vm.applicationName = user.settings.theme.applicationName;
        })
        .catch(function(error) {
        });

      widgetState = $rootScope.$on('expanded', function(event, data) {
        vm.cardState = data;
      });

    $rootScope.$on("navigationLinksChanged", function(event, data) {
      vm.mobileNavigationLinks = data;
      $timeout(function() {
        vm.showDashboard();
        vm.highlightLink(0);
      }, 3000)
    });

    $rootScope.$on('viewSelected', function(event, eventData) {
      setNavigationContext(eventData.viewName);
    });

    $rootScope.$on('setSelectedViewOn', function(event, data) {
        if(data && mobileViewActive()) {
          selectedView = data;
          for(var i = 0; i < vm.mobileNavigationLinks.length; i++){
            if(vm.mobileNavigationLinks[i].id == selectedView) {
               viewIndex = i;
               showView(selectedView, viewIndex, false);
            }
          }
        }
      });

    _accountManager = localStorageService.get('accountManagerAccountId');
      if(_accountManager){
      vm.activeUserName = localStorageService.get('accountManagerName');
      }
      else{
      vm.activeUserName = authService.authentication().userName;
      }

      var i18n = translatorHelper.loadFromStorage();
      vm.layoutLeftDirection = 'left';
      vm.layoutRightDirection = 'right';
      if (i18n.languageDirection == 'RTL') {
        vm.layoutLeftDirection = 'right';
        vm.layoutRightDirection = 'left';
      }
    }

    //Resoultion less than small device;
    function mobileViewActive(){
      var height = $window.innerHeight;
      var width = $window.innerWidth;
      if(height < 768 && width < 1024)
        return true;
      return false;
    }

    function showView(item, index, isClick) {
      $rootScope.$emit('resetInterval', true);
      utilityService.cardState = {expand: false, widget: null};
      if (item === 'offerStore') {
        $scope.$emit('dependentDirectiveViewChange', true, "ecb-subscriptions");
        $rootScope.$broadcast('offerStoreSelected', true);
        $rootScope.$emit('callOfferStore', item);
        vm.isBillPageOn = false;
        vm.isOfferStore = true;
      } else {
        vm.isOfferStore = false;
        $rootScope.$broadcast('offerStoreSelected', false);
        $rootScope.$emit('callSelectedPage', item);
        if (item === 'bills') {
          vm.isBillPageOn = true;
        }
        if (item === 'dashboard') {
          vm.isBillPageOn = false;
          $rootScope.$emit('dashboardViewSelected', true);
        }
        if (item === 'myAccount') {
          $rootScope.$emit('dashboardViewSelected', false);
          vm.isBillPageOn = false;
        }
      }
      if(isClick) {
        $rootScope.$emit('setSelectedViewOn', item);
      }
      setNavigationContext(item);
      vm.highlightLink(index);
      vm.closeNavigationPanel();
      vm.downloadOrQuotes = false;
      vm.expandTransactionPopup = false;
    }

    downloadsOrQuotesEvent = $rootScope.$on('showBillPeriod',function(event, data, widgetName) {
       if(widgetName == "Downloads_or_Quotes")
          vm.downloadOrQuotes = data;
    });

    vm.navigationLink = function() {
      vm.checkboxSelectionTemp = utilityService.getOrSetSelectedCards();
      if (vm.checkboxSelectionTemp) {
        vm.isQuotes = (vm.checkboxSelectionTemp.length == 1) && (vm.checkboxSelectionTemp[0] == 'quotes') && (vm.downloadOrQuotes);
        vm.isDownloads = ((vm.checkboxSelectionTemp.length > 1 || vm.checkboxSelectionTemp[0] != 'quotes') && vm.downloadOrQuotes );
      }
      return (!vm.isQuotes && !vm.isDownloads && !vm.expandTransactionPopup);
    }

    function highlightLink(index) {
      var element = angular.element(".ebBreadcrumbs-list ul.ecb-mobileNavigation li");
      angular.element(".ebBreadcrumbs-list ul.ecb-mobileNavigation li").removeClass("ebComponentList-item_selected");
      var selectedLink = ".ebBreadcrumbs-list ul.ecb-mobileNavigation li:eq(" + index + ")";
      angular.element(selectedLink).addClass("ebComponentList-item_selected");
    }

    function showDashboard() {
      $rootScope.$emit('resetInterval', true);
      utilityService.cardState = {expand: false, widget: null};
      vm.highlightLink(0);
      setNavigationContext('dashboard');
    }

    /**
     * Utility function sets navigation context and highlights corresponding
     * nav link
     * @param viewId
     */
    function setNavigationContext(viewId){
      vm.selectedNavLink = viewId;
      if (viewId === 'bills') {
        vm.isBillPageOn = true;
      } else if (viewId === 'offerStore') {
        vm.isOfferStore = true;
        vm.isBillPageOn = false;
      } else {
        vm.isBillPageOn = false;
        vm.isOfferStore = false;
      }
      var navLink = getNavLinkById(vm.selectedNavLink);
      if (navLink) {
        vm.selectedNavLinkDisplay = navLink.name;
      }
      if(vm.mobileNavigationLinks) {
        for (var i = 0; i < vm.mobileNavigationLinks.length; i++) {
          if (vm.mobileNavigationLinks[i].id == vm.selectedNavLink) {
            vm.highlightLink(i);
          }
        }
      }
    }

    offerStoreSelected = $rootScope.$on("offerStoreSelected", function(event, data) {
      if(data == true) {
        vm.isOfferStore = true;
        vm.isBillPageOn = false;
        var navLink = getNavLinkById('offerStore');
        if (navLink) {
          vm.selectedNavLinkDisplay = navLink.name;
        }
        if(vm.mobileNavigationLinks) {
        for (var i = 0; i < vm.mobileNavigationLinks.length; i++) {
          if (vm.mobileNavigationLinks[i].id == 'offerStore') {
            vm.highlightLink(i);
            offerStoreIndex = i;
          }
        }
      }
        vm.highlightLink(offerStoreIndex);
      }
    });

    function logout() {
      authService.revoke();
      authService.removeLocalStorage();
      angular.element("body").attr("dir", "LTR");
      $state.go('login');
    }

    function getNavLinkById(navLinkId) {
      if (vm.mobileNavigationLinks !== undefined) {
        for (var i = 0; i < vm.mobileNavigationLinks.length; i++) {
          if (vm.mobileNavigationLinks[i].id == navLinkId) {
            return vm.mobileNavigationLinks[i];
          }
        }
      }
      return null;
    }

    filterInterval = $scope.$on('show_filter_intervals', function(event, idInterval, data) {
      vm.dateInterval = data;
    });

    selfCareEditAccount = $rootScope.$on('allowSelfCare_editAccountInfo', function(event, data) {
      vm.selfCareEnabled = (data === 'F') ? false : true;
    });

    unregisterSystemBarEvents.push(selectedDropDownViewForm);
    unregisterSystemBarEvents.push(widgetState);
    unregisterSystemBarEvents.push(filterInterval);
    unregisterSystemBarEvents.push(selfCareEditAccount);
    unregisterSystemBarEvents.push(allowOnlinePayment);
    unregisterSystemBarEvents.push(downloadsOrQuotesEvent);
    unregisterSystemBarEvents.push(transactionWidgetInterval);
    unregisterSystemBarEvents.push(accountInformationData);

    vm.handleFilter = function () {
      $rootScope.$emit('filter_icon_selected', true);
    }

    function checkWidgetVisible(widgetName) {
      if (widgetName && widgetName !== undefined){
        for(var i = 0; i < vm.viewConfigSettings.length; i++){
          if(vm.viewConfigSettings[i].widgetName === widgetName &&
            vm.viewConfigSettings[i].visible){
            return true;
          }
        }
      }
      return false;
    }

    function editAccountDisabled(){
      var editCheck;
      editCheck = (!vm.selfCareEnabled || !checkWidgetVisible('accountInfo'));
      return editCheck;
    }

    function isCardExpanded(){
      if (vm.isOfferStore){
        return false;
      } else {
        return vm.cardState == 'expanded' ? true : false;
      }
    }

    function showMobileNavigationPanel() {
      angular.element("#nav-collapse").addClass("in");
      updateNavigationPanelOpen();
    }

    function closeNavigationPanel() {
      angular.element("#nav-collapse").removeClass("in");
      updateNavigationPanelOpen();
    }

    vm.showBillFilterBar = function(){
      if(!vm.isCardExpanded() && vm.isBillPageOn)
        return true;
      else if(vm.isCardExpanded() && !utilityService.cardState.hideFilterBar)
        return true;
      return false;
    }

    function updateNavigationPanelOpen() {
      var mobileNavPanel = angular.element("#nav-collapse").hasClass("in");
      vm.isNavigationPanelOpen = mobileNavPanel;
      setTimeout(function() {
        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
          $scope.$apply(function() {
            vm.isNavigationPanelOpen = mobileNavPanel;
          });
        }
      }, 50);
    }

    angular.element(document).ready(function() {
      vm.showDashboard();
    });

    $document.on('click', function(event) {
      var mobileNavPanel = angular.element("#nav-collapse");
      var mobileNavIcon = angular.element(".ebSystemBarLogo");
      if(mobileNavPanel.hasClass("in")) {
        if(mobileNavIcon !== event.target
            && !mobileNavIcon.has(event.target).length) {
            closeNavigationPanel();
        }
      }else {
        updateNavigationPanelOpen();
      }
    });

    angular.element($window).on('resize', function () {
      var width = $window.innerWidth;
      if (width > 991 && vm.isNavigationPanelOpen) {
        closeNavigationPanel();
      }
    });

    $scope.$on('$destroy', function () {
      utilityService.cleanUpListners(unregisterSystemBarEvents);
    });
  }
})();
