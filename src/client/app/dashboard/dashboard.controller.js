(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('dashboardController', Controller);

  Controller.$inject = [
    'logger',
    '$scope',
    '$rootScope',
    'authenticationService',
    'accountEditModalService',
    'amountDueService',
    'paymentMethodsService',
    'dateFilter',
    '$filter',
    '$moment',
    'systemBarService',
    'localStorageService',
    'utilityService',
    'translatorHelper',
    '$document',
    'userService',
    '$timeout',
    '$window',
    '$compile',
    'accountService'
  ];

  /* @ngInject */
  function Controller(
    logger,
    $scope,
    $rootScope,
    authenticationService,
    accountEditModalService,
    amountDueService,
    paymentMethodsService,
    dateFilter,
    $filter,
    $moment,
    systemBarService,
    localStorageService,
    utilityService,
    translatorHelper,
    $document,
    userService,
    $timeout,
    $window,
    $compile,
    accountService) {

    /* jshint validthis: true */
    var vm = this,
      intervalsIndexMap = {},
      selfCareEditAccount,
      filterAccountInterval,
      intervalChange,
      selectedDropDownViewForm,
      billAdjustmentPopup,
      filterDates,
      offerStoreIndex,
      viewIndex,
      selectedView,
      dashboardIndex,
      expandedStateInterval,
      offerStoreSelected,
      setSelectViewOn,
      setSortKeyEvent,
      downloadsOrQuotesEvent,
      navigationLinksChanged,
      filterInterval,
      sortKeyFilter,
      dependentDirectiveViewChange,
      _accountManager,
      transactionWidgetInterval,
      triggerInterval,
      billingTriggerInterval,
      accountInformationData,
      resetIntervalScope;
    vm.title = $filter('translate')('SELECT_VIEWS_DASHBOARD'); // ToDo: Translate.
    vm.user = {};
    vm.currency;
    vm.idPaymentInstrument;
    vm.editAccount = accountEditModalService.open;
    vm.formatBillingPeriodInterval = formatBillingPeriodInterval;
    vm.viewConfigSettings = {};
    vm.nodata = false;
    vm.showBillAdjustmentPopup = false;
    vm.activeRouteBar = false;
    vm.checkBillAdjustmentPopup = checkBillAdjustmentPopup;
    vm.checkBillAdjustmentPopupMe = checkBillAdjustmentPopupMe;
    var selectedInterval;
    var unregisterDashboardEvents = [];
    vm.showDashboard = showDashboard;
    vm.showView = showView;
    vm.showNavigationList = showNavigationList;
    vm.isDashboardOn = true;
    vm.hideNavigationList = hideNavigationList;
    vm.calendarDateInterval = false;
    vm.billPeriodTypeSelectedIndex = 0;
    vm.calendarDateFormat = vm.localizeDateFormat = utilityService.dateFormat;
    vm.isFilterIcon = false;
    vm.isQuotes = false;
    vm.isDownloads = false;
    vm.isWelcomeUserDisplay = true;
    vm.navigationLink = false;
    vm.isNavigationLinkVisible = false;
    vm.activeDependencyDirectives = [];
    vm.widgetFilter = {};
    vm.barNavigation = false;
    vm.isBillPageOn = false;
    vm.activate = activate;
    vm.renderDashboardView = renderDashboardView;
    angular.element('#databaseDownPopup').modal({ show: false});

    activate();

    function activate() {
      $scope.$on('IdleStart', authenticationService.idleTimeoutHandler);
      selfCareEditAccount = $rootScope.$on('allowSelfCare_editAccountInfo', function(event, data) {
        vm.selfCareEnabled = (data === 'F') ? false : true;
      });

      // ToDo: Refactor intervals to be a directive and use a service.
      filterAccountInterval = $rootScope.$on('filter_account_intervals', accountIntervalsHandler);
      intervalChange = $rootScope.$on('intervalsChanged', function(event, data) {
        //var x = intervalsIndexMap[data];
        vm.setChoiceIndex(data);
      });
      dependentDirectiveViewChange = $rootScope.$on('dependentDirectiveViewChange', function(event, isVisible, directiveName) {
        if(isVisible && vm.activeDependencyDirectives.indexOf(directiveName) == -1)
          vm.activeDependencyDirectives.push(directiveName);
        else if(!isVisible){
          var index = vm.activeDependencyDirectives.indexOf(directiveName);
          if(index > -1) vm.activeDependencyDirectives.splice(index, 1);
        }
      });
      _accountManager = localStorageService.get('accountManagerAccountId');
      vm.activeUserNamespace = authenticationService.authentication().namespace;
      if(_accountManager){
       vm.user = authenticationService.authentication().userInfo;
       vm.userName = localStorageService.get('accountManagerName');
       vm.user.accountId = _accountManager;
       vm.activeRouteBar = true;
      } else {
        vm.user = authenticationService.authentication().userInfo;
        vm.user.accountId = authenticationService.authentication().userInfo.accountId;
        vm.userName = authenticationService.authentication().userName;
        localStorageService.set('accountManagerName',vm.userName);
      }

      paymentMethodsService.getPayment(vm.user.accountId)
        .then(function(response) {
          if (response.data.PaymentMethods.length) {
            vm.resp = response.data.PaymentMethods;
            vm.idPaymentInstrument = vm.resp[0].idPaymentInstrument;
          }
        })
        .catch(function(error) {
          logger.log('Error retrieving idPaymentInstrument.', error);
        });

      amountDueService.getDuePayment(vm.user.accountId)
        .then(function(response) {
          vm.currency = response.data.PaymentInfo.currency;
          localStorageService.set("currency", vm.currency);
        })
        .catch(function(error) {
          logger.log('Error retrieving Currency.');
        });

      authenticationService.getPayeeDetails(vm.user.accountId,vm.activeUserNamespace).then(function(response){
        var loginUser  = (vm.userName).toLowerCase();
        vm.payerUserName = response.data.payerUserName;
        var payerUser = (vm.payerUserName).toLowerCase();
        vm.paysForOthers = response.data.paysForOthers;
        localStorageService.remove("payeePayerId");
        localStorageService.set("paysForOthers", vm.paysForOthers);
        if((payerUser === loginUser) && (vm.paysForOthers === true)){
          vm.userType = "payer";
          localStorageService.set("userType", "payer");
          localStorageService.remove("payeeSubscriber");
        }else if((payerUser !== loginUser) && (vm.paysForOthers === false)){
          vm.userType = "subscriber";
          localStorageService.set("userType", "subscriber");
          localStorageService.set("payeeSubscriber",true);
          localStorageService.set("payeePayerId", response.data.payerAccountId);
        }else if((payerUser === loginUser) && (vm.paysForOthers === false)){
          vm.userType = "individual";
          localStorageService.set("userType", "individual");
          localStorageService.remove("payeeSubscriber");
        }else{
          vm.userType = "payer";
          localStorageService.set("userType", "payer");
          localStorageService.remove("payeeSubscriber");
        }

        vm.hasUserType = true;
        $scope.$emit('userTypeData', true);
      }).catch(function(error) {
          switch (error.status) {
              case 500:
              case 412:
              case 403:
              case 405:
              case 400:
              case 404:
                angular.element('#databaseDownPopup').modal('show');
              break;
          }
      });
      utilityService.getCurrency();
      utilityService.getNumberFormatter();
      userService.getCommonConfigFile();
      utilityService.getLocaleDateFormatter().then(function () {
        vm.localizeDateFormat = utilityService.getDateFormatterByLang()['dateFormat'];
        vm.localizePickDateFormat = utilityService.convertPickDateFormat(vm.localizeDateFormat);
        vm.maxDateLimit = $moment().format(vm.localizeDateFormat);
      });

      accountService.load(vm.user.accountId);
      accountInformationData = $scope.$on('accountInformationData', function(event,data) {
        vm.accountInfo = localStorageService.get('accountInformationData');
        userService.getCommonConfigFile().then(function (response) {
          vm.displayNameFeilds = response.displayName.rule.welcomeName;
          vm.userDisplayName = utilityService.getDisplayName(vm.displayNameFeilds, vm.accountInfo);
        });
      });
      
      logger.log('app.dashboard.dashboardController.activate():', {
        scope: $scope
      });

      selectedDropDownViewForm = $rootScope.$on('selectedViewFromDropdown', function(event, data) {
        vm.viewConfigSettings = data.widgets;
          $timeout(function () {
            renderDashboardView();
          }, 1000);
      });

      billAdjustmentPopup = $rootScope.$on('showBillAdjustmentPopup', function (event, data) {
        if(vm.showBillAdjustmentPopup != data)
          $timeout(function(){vm.showBillAdjustmentPopup = data;});
      });

      setSortKeyEvent = $rootScope.$on('setSortKey', function(event, key) {
        if(key)
          vm.setSelectedSortKey(key);
      });

      setSelectViewOn = $rootScope.$on('setSelectedViewOn', function(event, data) {
        if(data) {
          selectedView = data;
          for(var i = 0; i < vm.navigationLinks.length; i++){
            if(vm.navigationLinks[i].id == selectedView) {
               viewIndex = i;
               showView(selectedView, viewIndex);
            }
          }
        }
      });
      resetIntervalScope = $rootScope.$on('resetInterval', function() {
        resetInterval();
      });
      

      transactionWidgetInterval = $rootScope.$on('expandTransactionPopup', function(event,data) {
        vm.expandTransactionPopup = data;
      });
      transactionWidgetInterval = $rootScope.$on('expandUsageWidget', function(event,data) {
        vm.expandUsageWidget = data;
      });

      var i18n = translatorHelper.loadFromStorage();
      vm.layoutLeftDirection = 'left';
      vm.layoutRightDirection = 'right';
      if (i18n) {
        angular.element("body").attr("dir", i18n.languageDirection);
        if (i18n.languageDirection == 'RTL') {
          vm.layoutLeftDirection = 'right';
          vm.layoutRightDirection = 'left';
        }
      } else {
        angular.element("body").attr("dir", "LTR");
      }

      expandedStateInterval = $rootScope.$on('widgetFilter', function(event, data) {
        vm.isTransactionWidget = data.isTransactionWidget;
        vm.widgetFilter = data;
        vm.isFilterIcon = data.filterable || data.sortable || (utilityService.isObject(data.period) && data.period != false) ? true : false;
        if(vm.widgetFilter && vm.widgetFilter.calendar == true) {
          vm.billPeriodTypeSelectedIndex = vm.isBillPageOn ? 0 : 1;
          // In transaction widget calendar filter should call
          if(vm.expandTransactionPopup && data.widget == 'ecb-charges') {
            $timeout(function() {
              vm.selectByDateRange();
            }, 100);
          }
          if(vm.expandTransactionPopup && !vm.isTransactionWidget) return;
          $timeout(function() {
            vm.setInterValData(vm.getSelectedInterval());
          });
        }else if(vm.widgetFilter.calendar == 'unchange-1'){
          vm.widgetFilter.calendar = true;
        }else{
          vm.billPeriodTypeSelectedIndex = 0;
        }
      });

      filterInterval = $scope.$on('show_filter_intervals', function(event, idInterval, data, calendarParam, sortKey, filterItems) {
        vm.setInterValData(data, calendarParam, true);
        if(utilityService.isInfiniteScrollActivated())
          setSortAndFilterKeys(sortKey, filterItems, utilityService.cardState);
      });

      sortKeyFilter = $rootScope.$on('filter_criteria_event', function(event, sortKey, filterItems) {
        setSortAndFilterKeys(sortKey, filterItems);
      });
    }

    navigationLinksChanged = $rootScope.$on("navigationLinksChanged", function(event, data) {
      var navigationLinks = data;
      for(var i = 0; i < navigationLinks.length; i++){
        if(navigationLinks[i].isDefaultView) {
          dashboardIndex = i;
          $timeout(function() {
            vm.highlightLink(dashboardIndex);
            vm.selectedNavLink = navigationLinks[dashboardIndex].name;
          }, 2000);
        }
      }
      vm.navigationLinks = navigationLinks;
    });

    offerStoreSelected = $scope.$on("offerStoreSelected", function(event, data) {
      if(data == true) {
        var navLink = getNavLinkById('offerStore');
        vm.selectedNavLink = navLink.id;
        vm.isDashboardOn = false;
        vm.selectedNavLinkDisplay =($filter('translate')('MV_VIEW_OFFER_STORE'));
        for(var i = 0; i < vm.navigationLinks.length; i++){
          if(vm.navigationLinks[i].id == 'offerStore') {
            offerStoreIndex = i;
          }
        }
        vm.highlightLink(offerStoreIndex);
        vm.hideNavigationList();
      }
    });

    function setSortAndFilterKeys(sortKey, filterItems){
      if(vm.widgetFilter) vm.widgetFilter.sortKey = sortKey;
    }

    function getNavLinkById(navLinkId){
      for(var i = 0; i < vm.navigationLinks.length; i++){
        if(vm.navigationLinks[i].id == navLinkId) {
          return vm.navigationLinks[i];
        }
      }
    }

    vm.showBillFilterBar = function(){
      if($scope.cardState == 'collapsed' && vm.isBillPageOn)
        return true;
      else if($scope.cardState == 'expanded' && !utilityService.cardState.hideFilterBar && !vm.isOfferStore)
        return true;
      return false;
    }
    function resetInterval() {
      vm.resetIntervalInvoke = true;
      vm.index = 0;
      var interval = vm.getSelectedInterval();
      utilityService.getOrSetSelectedTimeInterVal(interval.idInterval, interval);
      setTimeout(function(){ vm.resetIntervalInvoke = false; }, 100);
    }
    function showView(item, index) {
      resetInterval();
      utilityService.cardState = {expand: false, widget: null, hideFilterBar: false};
      var navLink = getNavLinkById(item);
      vm.expandTransactionPopup = false;
      vm.isOfferStore = false;
      if (item == 'bills') {
        vm.isBillPageOn = true;
      } else {
        vm.isBillPageOn = false;
      }
      if(item == 'offerStore') {
        $scope.$emit('dependentDirectiveViewChange', true, "ecb-subscriptions");
        $rootScope.$broadcast('offerStoreSelected', true);
        $rootScope.$emit('callOfferStore', item);
        vm.isOfferStore = true;
      } else {
        $rootScope.$broadcast('offerStoreSelected', false);
        $rootScope.$emit('callSelectedPage', item);
        if(navLink.isDefaultView === true) {
          $rootScope.$emit('dashboardViewSelected', true);
          vm.isDashboardOn = true;
          vm.isWelcomeUserDisplay = true;
        } else {
          $rootScope.$emit('dashboardViewSelected', false);
          vm.isDashboardOn = false;
        }
      }

      // TODO: all of the "*Selected" events should be collapsed into
      // a single event parametrized with view name and possibly state
      var showViewEvent = {};
      showViewEvent.viewName = item;
      $rootScope.$emit('viewSelected', showViewEvent);
      vm.selectedNavLink = navLink.id;
      vm.selectedNavLinkDisplay = navLink.name;
      vm.highlightLink(index);
      vm.hideNavigationList();
    }

    function showNavigationList() {
      angular.element(".ecb-navigation .ebBreadcrumbs-list").addClass("ecb-navOn");
    }

    function hideNavigationList() {
      angular.element(".ecb-navigation .ebBreadcrumbs-list").removeClass("ecb-navOn");
    }

    vm.highlightLink = function(index) {
      angular.element(".ecb-navigation .ebBreadcrumbs-list ul li").removeClass("ebComponentList-item_selected");
      var selectedLink = ".ecb-navigation .ebBreadcrumbs-list ul li:eq(" + index + ")";
      angular.element(selectedLink).addClass("ebComponentList-item_selected");
    }

    function showDashboard() {
      resetInterval();
      utilityService.cardState = {expand: false, widget: null, hideFilterBar: false};
      $rootScope.$broadcast('offerStoreSelected', false);
      var defaultDashboardView = getDefaultDashboardView();
      vm.selectedNavLink = defaultDashboardView.id;
      vm.selectedNavLinkDisplay = defaultDashboardView.name;
      $rootScope.$emit('callSelectedPage', defaultDashboardView.id);
      vm.isDashboardOn = true;
      vm.isOfferStore = false;
      vm.hideNavigationList();
      vm.highlightLink(dashboardIndex);
      $rootScope.$emit('dashboardViewSelected', true);
      $scope.$emit('widgetFilter', {});
      vm.isBillPageOn = false;
      vm.expandTransactionPopup = false;
      var showViewEvent = {};
      showViewEvent.viewName = 'dashboard';
      $rootScope.$emit('viewSelected', showViewEvent);
    }
    /**
     * Utility function, returns default dashboard view as configured
     * in layout manager configuration file.
     * @returns {*}
     */
    function getDefaultDashboardView(){
      for(var i = 0; i < vm.navigationLinks.length; i++){
        if(vm.navigationLinks[i].isDefaultView == true) {
          return vm.navigationLinks[i];
        }
      }
    }

    vm.setInterValData = function(data, calendarParam, changeBillType) {
      var startDate, endDate = null;
      if(calendarParam && !data){
        startDate = calendarParam.startDate;
        endDate = calendarParam.endDate;
        if(changeBillType) vm.billPeriodTypeSelectedIndex = 1;
      }else if(data){
        startDate = data.startDate;
        endDate = data.endDate;
        if(changeBillType) vm.billPeriodTypeSelectedIndex = 0;
      }
      vm.filterStartDate = $moment(startDate, vm.calendarDateFormat).format(vm.localizeDateFormat);
      vm.filterEndDate = $moment(endDate, vm.calendarDateFormat).format(vm.localizeDateFormat);
      setCardsAvailableType();
    }

    vm.getSelectedInterval = function(){
      if(vm.hardClosedIntervalsList == undefined && vm.accountIntervals == undefined) return [];
      return vm.hardClosedIntervals == true ? vm.hardClosedIntervalsList[vm.index] : vm.accountIntervals[vm.index];
    }

    function accountIntervalsHandler(event, data, index) {
      vm.accountIntervals = data;
      vm.minDate = vm.accountIntervals[vm.accountIntervals.length-1].startDateAsString;
      vm.minDateLimit = $moment(vm.minDate, vm.calendarDateFormat).format(vm.localizeDateFormat);
      if(localStorageService.get("selectedIndex")) {
        vm.index = localStorageService.get("selectedIndex");
      } else {
        vm.index = index;
      }
      vm.hardClosedIntervalsList = [];
      for (var i in vm.accountIntervals) {
        if (vm.accountIntervals[i].statusCode == "H")
          vm.hardClosedIntervalsList.push(vm.accountIntervals[i]);
      }
      var hardClosedIntervals = vm.hardClosedIntervals,
          isEmptyHardclosedIntervalsList = !vm.hardClosedIntervalsList.length,
          isEmptyAccountIntervalsList = !vm.accountIntervals.length;
            if (hardClosedIntervals) {
              if (isEmptyAccountIntervalsList) {
                vm.nodata = true;
              } else {
              if (isEmptyHardclosedIntervalsList) {
                vm.nodata = true;
              }
            }
            } else {
              if (isEmptyAccountIntervalsList) {
                vm.nodata = true;
            }
          buildIndexMap(vm.accountIntervals);
      }
      // Added to resolve the bug : triggering first interval after login to the system
      triggerIntervalId(data[vm.index].idInterval, data[vm.index]);
    }

    function buildIndexMap(array) {
        var indexValue = 0;
        array.forEach(function(node) {
          intervalsIndexMap[node.idInterval] = indexValue;
          indexValue++;
        });
    }

    function resetDashboardView(){
      vm.downloadOrQuotes = false;
      //Disable infinite scroll once page is reset
      utilityService.isInfiniteScrollActivated(false);
      //Remove selected billnig period interval
      localStorageService.remove("selectedIndex");
      if(vm.barNavigation == false)
        vm.index = 0;
      vm.barNavigation = false;
      if (vm.accountIntervals && vm.index) {
        triggerIntervalId(vm.accountIntervals[vm.index].idInterval, vm.accountIntervals[vm.index]);
      }
    }
    /**
     * Main dashboard content construction function. Reads layoutManager settings and generates
     * dashboard content dynamically.  Once the content has been assembled $compile function is
     * called to create angularJS element to be injected to dashboard container.
     */
    function renderDashboardView(){
      resetDashboardView();
      var dashboardContainer = angular.element("#dashboardContainer");
      dashboardContainer.empty();
      var widgets = vm.viewConfigSettings;
      var dashboardContents = dashboardContainer.html();

      vm.activeDependencyDirectives = [];
      if(widgets){
        // Load All Widgets
        for(var i in widgets) {
          dashboardContents += getWidgetDirective(widgets[i], null);
        }
        // Load All Dependency Widgets
        dashboardContents += loadDependecyWidgets(widgets);
        var el = $compile( dashboardContents )( $scope );
        dashboardContainer.append( el );
      }
      loadAccountWidget();
    }

    function loadDependecyWidgets(widgets) {
      var directiveDom = ''
      for(var i in widgets) {
        var dependencyWidgets = widgets[i].dependency;
        if(dependencyWidgets !== undefined) {
          for(var j in dependencyWidgets) {
            directiveDom += getWidgetDirective(dependencyWidgets[j], widgets[i].widgetName);
            //load Child Dependency
            var childDependencyWidgets = dependencyWidgets[j].dependency;
            if(childDependencyWidgets !== undefined) {
              for(var k in childDependencyWidgets) {
                directiveDom += getWidgetDirective(childDependencyWidgets[k], dependencyWidgets[j].widgetName);
              }
            }
          }
        }
      }
      return directiveDom;
    }

    function getWidgetDirective(widget, parentDirective) {
      var widgetName = widget.widgetName;
      var widgetState = widget.state || '';
      var userType = widget.userType || [];
      var userTypeIndex = userType.length == 0 || (userType.indexOf(vm.userType) > -1);
      if ((widget.visible && userTypeIndex) || parentDirective) {
        if (isArray(widgetName)) {
          return createDirectiveGroupElement(widgetName, widgetState, parentDirective, widget.widgetInfo);
        } else {
          if (widgetName === 'ecb-account-info') {
            // TODO: replace this hack with proper encapsulation of the ecb-account-info widget
            return createEcbAccountInfoWidget(parentDirective);
          } else if(widgetName === 'ecb-account-settings'){
            // TODO: replace this hack with proper encapsulation of the ecb-account-settings widget
            return createEcbAccountSettingsWidget(parentDirective);
          } else {
            return createDirectiveElement(widgetName, widgetState, parentDirective, widget.widgetInfo);
          }
        }
      }
      return "";
    }

   /**
    * Utility function, creates single card element containing group of widget elements.
    * @param directiveNames
    * @returns {string}
    */
    function createDirectiveGroupElement(directiveNames, directiveState, parentDirective, widgetInfo){
      var parent = parentDirective ? parentDirective: 'self';
      var dClass = parent == 'self' ? '' : "class=dependency";
      var directive = '<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 widget-directive-group">';
      for(var i in directiveNames) {
        directive = directive + '<' + directiveNames[i] + 
        ' config-getter-fn="vm.configProvider.get(widgetName, attributeName)" ecb-widget-state='+ directiveState +' '+dClass+' parent-dr="'+ parent +'" widget-info="'+ widgetInfo +'">' +
        '</' + directiveNames[i] + '>';
      }
      directive = directive + '</div>';
      return directive;
    }

    /**
     * Utility function, creates single card element containing single widget element.
     * @param directiveName
     * @returns {string}
     */
    function createDirectiveElement(directiveName, directiveState, parentDirective, widgetInfo){
      var parent = parentDirective ? parentDirective: 'self';
      var dClass = parent == 'self' ? '' : "dependency";
      var directive = '<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12" '+showDependencyWidget(parent != 'self', directiveName)+'>' +
          '<' + directiveName + ' class="widget-directive '+dClass+'" config-getter-fn="vm.configProvider.get(widgetName, attributeName)" parent-dr="'+ parent +'" widget-info="'+ widgetInfo +'" ecb-widget-state='+ directiveState +'></' + directiveName + '>' +
          '</div>';
      return directive;
    }

    /**
     * This function is a hack enabling creation of a non-standard widget, which requires additional button
     * and card layout encapsulation.  This must be replaced by refactoring ecb-account-info control.
     * @returns {string}
     */
    function createEcbAccountInfoWidget(parentDirective){
      var parent = parentDirective ? parentDirective: 'self';
      var dClass = parent == 'self' ? '' : "dependency";
      var directive = '<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12" '+showDependencyWidget(parent != 'self', "ecb-layout-card")+'>' +
        '<ecb-layout-card class="widget-directive '+dClass+'" header-text="{{ \'TEXT_ACCOUNT_INFORMATION\' | translate }}" parent-dr="'+ parent +'" content-css-class="account-information">' +
          '<button class="btn ebBtn btn-sm btn-link ebColor_textLinkBlue pull-right" ng-if="vm.selfCareEnabled" ng-click="vm.editAccount(vm.user.accountId)">' +
            '<i class="fa fa-pencil ebIcon account-info-edit-icon" aria-hidden="true"></i>{{\'TEXT_EDIT\' | translate }}' +
          '</button>' +
          '<div><ecb-account-info account-id="{{ vm.user.accountId }}"></ecb-account-info></div>' +
        '</ecb-layout-card>' +
      '</div>';
      return directive;
    }

    /**
     * This function is a hack enabling creation of a non-standard widget, which requires additional
     * card layout encapsulation.  This must be replaced by refactoring ecb-account-settings control.
     * @returns {string}
     */
    function createEcbAccountSettingsWidget(parentDirective){
      var parent = parentDirective ? parentDirective: 'self';
      var dClass = parent == 'self' ? '' : "dependency";
      var directive =
        '<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12" '+showDependencyWidget(parent != 'self', "ecb-layout-card")+'>' +
          '<ecb-layout-card class="widget-directive '+dClass+'" header-text="{{ \'TEXT_ACCOUNT_SETTINGS\' | translate }}" parent-dr="'+ parent +'">' +
            '<div><ecb-account-settings account-id="{{ vm.user.accountId }}"></ecb-account-settings></div>' +
          '</ecb-layout-card>' +
        '</div>';
      return directive;
    }

   /**
    * Utility function, checks if object is of type Array
    * @param what
    * @returns {boolean}
    */
    function isArray(what) {
        return Object.prototype.toString.call(what) === '[object Array]';
    }

    /**
     * This Function will create ng-show attribute
     * @param isCreate
     * @returns {string}
    **/
    function showDependencyWidget(isCreate, directiveName) {
      return isCreate ? 'ng-show = "vm.isDependencyWidgetActive(\''+directiveName+'\')"' : '';
    }

    vm.isDependencyWidgetActive = function(directiveName) {
      return vm.activeDependencyDirectives.indexOf(directiveName) > -1 ? true : false;
    }

    function formatBillingPeriodInterval(interval) {
      var startDate = $moment(interval.startDateAsString, vm.calendarDateFormat).format(vm.localizeDateFormat);
      var endDate = $moment(interval.endDateAsString, vm.calendarDateFormat).format(vm.localizeDateFormat);
      var userType = localStorageService.get("userType");
      var formattedInterval = '';
      if (interval) {
        formattedInterval = startDate + ' - ' + endDate;
        if (interval.invoiceNumber) {
          formattedInterval += ' #' + $filter('translate')('TEXT_INVOICE_FOR') + ': ';
          formattedInterval += interval.invoiceNumber;
        }
        if (interval.onDemandInterval === true) {
          formattedInterval += '(' + $filter('translate')('TEXT_ON_DEMAND_INVOICE') + ')';
        }else if(userType === 'subscriber' && interval.statusCode === 'H'){
          formattedInterval += '(' + interval.status + ')';
        }
      }
      return formattedInterval;
    }

    function checkBillAdjustmentPopup($event, data){
      $scope.$emit('showBillAdjustmentPopup', data);
      $scope.$emit('isBillAdjustmentPopup', data);
    }

     function checkBillAdjustmentPopupMe($event, data) {
       if (vm.showBillAdjustmentPopup){
        $scope.$emit('showBillAdjustmentPopup', vm.showBillAdjustmentPopup);
        $scope.$emit('isBillAdjustmentPopup', vm.showBillAdjustmentPopup);
      }
    }
    // ToDo: All of the below code needs to be refactored to not use $scope, $emit, and $on. Bill pay period/date range selection should be in a directive.
    vm.changeDropdown = function(y) {
      localStorageService.set("selectedTimeInterval", y);
      selectedInterval = localStorageService.get("selectedTimeInterval");
      vm.selectedDateRange = selectedInterval;
      triggerIntervalId(y ? y.idInterval: null, vm.selectedDateRange, null, false, vm.widgetFilter.sortKey, vm.widgetFilter.filterItems);
    };
    vm.setChoiceIndex = function(x) {
      vm.index = x;
      localStorageService.set("selectedIndex", x);
      $rootScope.$emit('selected_index', vm.index);
    };

    vm.checkWidgetVisible = function(widgetName) {
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

    vm.routeToActiveUser = function(){
      localStorageService.remove('accountManagerAccountId');
      $window.location.reload();
    }

    vm.isCalendarView = function() {
      return vm.widgetFilter && vm.widgetFilter.calendar && vm.billPeriodTypeSelectedIndex == 1;
    }

    vm.isCalendarOption = function() {
      return vm.widgetFilter && vm.widgetFilter.calendar;
    }

    vm.changeBillPeriodType = function(index) {
      if(vm.billPeriodTypeSelectedIndex != index) {
        vm.billPeriodTypeSelectedIndex = index;
        if(index == 0)
          vm.selectByBill();
        if(index == 1) {
          vm.selectByDateRange();
        }
      }
      setCardsAvailableType();
    }

    function setCardsAvailableType(){
      //vm.cardsAvailable = vm.billPeriodTypeSelectedIndex == 0 ? vm.billPeriodDisplayCards : vm.dateRangeCards;
      $scope.$broadcast('show_filter_selectedby', vm.billPeriodTypeSelectedIndex);
    }

    downloadsOrQuotesEvent = $rootScope.$on('showBillPeriod',function(event, data, widgetName) {
       if(widgetName == "Downloads_or_Quotes")
          vm.downloadOrQuotes = data;
    });

    vm.isQuotesOrDownload = function () {
      vm.checkboxSelectionTemp = utilityService.getOrSetSelectedCards();
      if (vm.checkboxSelectionTemp) {
        vm.isQuotes = (vm.checkboxSelectionTemp.length == 1) && (vm.checkboxSelectionTemp[0] == 'quotes') && (vm.downloadOrQuotes);
        vm.isDownloads = ((vm.checkboxSelectionTemp.length > 1 || vm.checkboxSelectionTemp[0] != 'quotes') && vm.downloadOrQuotes );
      }
      if(vm.selectedNavLinkDisplay == ($filter('translate')('MV_VIEW_DASHBOARD'))){
          vm.navigationLink = false;
          vm.isWelcomeUserDisplay = true;
        }
        if(vm.selectedNavLinkDisplay==($filter('translate')('MV_VIEW_BILLS')) || vm.selectedNavLinkDisplay==($filter('translate')('MV_VIEW_OFFER_STORE')) || vm.selectedNavLinkDisplay==($filter('translate')('MV_VIEW_MY_ACCOUNT'))){
          vm.isWelcomeUserDisplay = false;
          vm.navigationLink = true;
        }
        if(vm.isQuotes || vm.isDownloads || vm.expandTransactionPopup){
          vm.navigationLink = false;
        }
    }

    vm.isEbBreadcrumbsItem = function() {
      vm.isQuotesOrDownload();
      return (!vm.isDashboardOn || vm.isQuotes || vm.isDownloads || vm.expandTransactionPopup);
    }

    vm.filter = function() {
      $scope.$emit('filter_icon_selected', true);
    }

    vm.selectByDateRange = function(sortFilterEvent) {
      var startDate = $moment(vm.filterStartDate, vm.localizeDateFormat).format(vm.calendarDateFormat);
      var endDate = $moment(vm.filterEndDate, vm.localizeDateFormat).format(vm.calendarDateFormat);
      var params = {
        "startDate" : startDate,
        "endDate" : endDate
      }
      triggerIntervalId(null, null, params, true, vm.widgetFilter.sortKey, vm.widgetFilter.filterItems, sortFilterEvent);
    };

    vm.selectByBill = function(sortFilterEvent) {
      triggerIntervalId(null, null, null, true, vm.widgetFilter.sortKey, vm.widgetFilter.filterItems, sortFilterEvent);
    };

    vm.selectDate = function(clsName){
     // angular.element("."+clsName).trigger('click').focus();
      angular.element(document).ready(function () {
        document.getElementById(clsName).focus();
      }, 100);
    }

    vm.isDateRange = function() {
      return (vm.filterStartDate && vm.filterEndDate);
    }

    vm.getTodayDate = function() {
      return new Date().toString();
    }

    vm.isDashboardViewSelected = function(){

    }

    vm.selectedSortKey = function(){
      return vm.widgetFilter.sortKey ? vm.widgetFilter.sortKey : $filter('translate')('TEXT_NONE');
    }

    vm.getSortKeyDisplayName = function(key){
      if(vm.widgetFilter && vm.widgetFilter.displayNames) {
        var columnName = vm.widgetFilter.displayNames[key];
        return columnName ?  columnName : key;
      }
      return key;
    }

    vm.setSortKey = function(key){
      vm.setSelectedSortKey(key);
      if(utilityService.isInfiniteScrollActivated()){
        var event = 'infscroll_filter_criteria_event';
        if(vm.billPeriodTypeSelectedIndex == 1) vm.selectByDateRange(event);
        else vm.selectByBill(event);
      }else{
        $rootScope.$emit('filter_criteria_event', vm.widgetFilter.sortKey, vm.widgetFilter.filterItems);
      }
    }

    vm.setSelectedSortKey = function(key) {
      vm.widgetFilter.sortKey = (key == $filter('translate')('TEXT_NONE') ? null : key);
    }

    function loadAccountWidget(){
      $timeout(function(){
        var accouWidgetCount = angular.element("#accountManagerMain").length;
        if(!accouWidgetCount || accouWidgetCount == 0){
          var el = $compile( createDirectiveElement('ecb-accounts-manager', 'detail', true) )( $scope );
          angular.element("#dashboardContainer").append(el);
        }
      }, 500);
    }

    billingTriggerInterval = $rootScope.$on('billingTriggerInterval', function(event, intervalId, dateRange, calendarParam, refresh, sortKeys, filterItems) {
      if(!vm.isBillPageOn){
        vm.barNavigation = true;
        $rootScope.$emit('setSelectedViewOn', 'bills');
        triggerIntervalId(intervalId, dateRange);
      }else{
        triggerIntervalId(intervalId, dateRange);
      }
    });

    triggerInterval = $rootScope.$on('triggerInterval', function(event, intervalId, dateRange, calendarParam, refresh, sortKeys, filterItems) {
        triggerIntervalId(intervalId, dateRange, calendarParam, refresh, sortKeys, filterItems);
    });
    
    function triggerIntervalId(intervalId, dateRange, calendarParam, refresh, sortKeys, filterItems, eventName) {
      eventName = eventName ? eventName : 'show_filter_intervals';
      var intervalObject = localStorageService.get("timeInterVal");
      /** Sequence of params for show_filter_intervals event : intervalId, dateRange, calendarParam , sortKeys, filterItems**/
      if(calendarParam)
        $scope.$broadcast(eventName, null, null, calendarParam, sortKeys, filterItems);
      
      //Default trigger retrive from localstorage
      else if(!intervalId && intervalObject)
        $scope.$broadcast(eventName, intervalObject.idInterval, intervalObject.dateRange, null, sortKeys, filterItems);
      else{
        var existInterval = null;
        if(intervalObject) existInterval = intervalObject.idInterval;
        //refresh is true when previous selcetion is calendar
        //if((existInterval != intervalId) || refresh){
          utilityService.getOrSetSelectedTimeInterVal(intervalId, dateRange);
          $scope.$broadcast(eventName, intervalId, dateRange, null, sortKeys, filterItems);
        //}
      }
    }

    $scope.$on('hardClosedIntervals_editAccountInfo', function(event, data) {
      vm.hardClosedIntervals = (data === 'F') ? false : true;
    });

    filterDates = $rootScope.$on('show_filter_dates', function(event, data) {
      $scope.showOption = true;
    });

    unregisterDashboardEvents.push(selfCareEditAccount);
    unregisterDashboardEvents.push(filterAccountInterval);
    unregisterDashboardEvents.push(intervalChange);
    unregisterDashboardEvents.push(selectedDropDownViewForm);
    unregisterDashboardEvents.push(accountInformationData);
    unregisterDashboardEvents.push(billAdjustmentPopup);
    unregisterDashboardEvents.push(filterDates);
    unregisterDashboardEvents.push(expandedStateInterval);
    unregisterDashboardEvents.push(filterInterval);
    unregisterDashboardEvents.push(downloadsOrQuotesEvent);
    unregisterDashboardEvents.push(offerStoreSelected);
    unregisterDashboardEvents.push(setSelectViewOn);
    unregisterDashboardEvents.push(setSortKeyEvent);
    unregisterDashboardEvents.push(navigationLinksChanged);
    unregisterDashboardEvents.push(sortKeyFilter);
    unregisterDashboardEvents.push(dependentDirectiveViewChange);
    unregisterDashboardEvents.push(transactionWidgetInterval);
    unregisterDashboardEvents.push(triggerInterval);
    unregisterDashboardEvents.push(billingTriggerInterval);
    unregisterDashboardEvents.push(resetIntervalScope);

      // ToDo: The expanding of layout cards should be within an attribute directive. e.g. ecb-card-expander or something
    $scope.$on('expanded', function(event, data, widget, hideFilterBar) {
      if(data == 'expanded') {
        vm.intervalIndexOnExpand = vm.index;
        utilityService.cardState = {expand: true, widget: widget, hideFilterBar: hideFilterBar};
      }else{
        vm.billPeriodTypeSelectedIndex = 0;
      }
      $scope.cardState = data;
      //$rootScope.$emit('expanded', data);
      
      //reset dashboard if interval changes
      if(data == 'collapsed' && vm.resetIntervalInvoke != true) {
        if (utilityService.isObject(vm.intervalIndexOnExpand) && (vm.intervalIndexOnExpand != vm.index)) {
          vm.setChoiceIndex(vm.intervalIndexOnExpand);
          vm.changeDropdown(vm.getSelectedInterval());
        }
        $timeout(function () {
          utilityService.cardState = {expand: false, widget: null, hideFilterBar: false};
        }, 200);
      }
      $timeout(function() {
        if(vm.isQuotes || (vm.expandTransactionPopup && widget == 'OfferChargeSummary')){
          vm.selectByDateRange();
        }
      }, 20);
    });

    $document.on('click', function(event) {
      var navDropdown = angular.element(".ebBreadcrumbs-list");
      var navDownArrow = angular.element(".ebBreadcrumbs-arrow");
      if(navDropdown.hasClass("ecb-navOn")) {
        if(navDropdown !== event.target
            && navDownArrow !== event.target
            && !navDropdown.has(event.target).length
            && !navDownArrow.has(event.target).length) {
          navDropdown.removeClass("ecb-navOn");
        }
      }
    });
    vm.setToDefFormat = function(dateStr) {
      return $moment(dateStr, vm.localizeDateFormat).format(vm.calendarDateFormat);
    }
    vm.updateEndDate = function() {
      if($moment(vm.filterStartDate, vm.localizeDateFormat).isAfter(
        $moment(vm.filterEndDate, vm.localizeDateFormat))) {
        vm.filterEndDate = vm.filterStartDate;
      }
    }

    $scope.$on('$destroy', function () {
      utilityService.cleanUpListners(unregisterDashboardEvents);
    });

    /**
     * Widget configuration provider, supplies widget configuration parameters required
     * by each widget.  Widgets are injected with the reference to the configProvider
     * during dynamic widget creation process, and each widget obtains its configuration
     * parameters via callback to getConfig() function.
     *
     * @type {{getConfig: getConfig, getCommonConfig: getCommonConfig}}
     */
    vm.configProvider  = {
      get: function (widgetName, attributeName) {
        switch (widgetName) {
          case 'ecbBillingActivity':
            switch (attributeName) {
              case 'futureAttributeName':  // example of handling new custom attribute
                return 'unimplemented';
              default:
                return this.getCommonConfig(attributeName);
            }
            break;

          case 'ecbTotalAmountDue':
            switch (attributeName) {
              case 'idPaymentInstrument':
                return vm.idPaymentInstrument;
              default:
                return this.getCommonConfig(attributeName);
            }
            break;

          default:
            return this.getCommonConfig(attributeName);
        }
      },

      /**
       * Provides values for common widget configuration attributes
       * @param attributeName
       * @returns {*}
       */
      getCommonConfig: function(attributeName){
        var configValue;
        switch(attributeName){
          case 'accountId':
            configValue = vm.user.accountId;
            break;
          case 'currency':
            configValue = vm.currency;
            break;
          default:
            logger.log('Unsupported configuration parameter: ' + widgetName + '.' + attributeName);
            break;

        }
        return configValue;
      }
    };
  }
})();
