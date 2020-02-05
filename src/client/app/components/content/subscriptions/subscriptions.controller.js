/* jslint maxlen: 250 */
(function() {
  'use strict';
  angular
    .module('app.subscriptions')
    .controller('subscriptionsController', Controller);

  Controller.$inject = [
    'logger',
    '$scope',
    '$rootScope',
    '$filter',
    'subscriptionsServices',
    '$moment',
    'dateFilter',
    '$timeout',
    'translatorHelper',
    '$window',
    'utilityService',
    '$document',
    'localStorageService'
  ];

  /* @ngInject */
  function Controller(
    logger,
    $scope,
    $rootScope,
    $filter,
    subscriptionsServices,
    $moment,
    dateFilter,
    $timeout,
    translatorHelper,
    $window,
    utilityService,
    $document,
    localStorageService) {
    /*jshint validthis: true */
    var vm = this,
      _idInterval,
      _intervalEndDate,
      _accountManager,
      COMPONENT_NAME = 'Subscriptions',
      currentDate = new Date(),
      filterInterval,
      callOfferStore,
      offerStoreSelected,
      selfCareEditAccount,
      sortKeyFilter,
      cancelLinkToBeDisabled = true,
      isLocaleError = false;
    vm.cancelStatus = false;
    vm.activeCancel = false;
    vm.subscriptionCardState = 'collapsed';
    vm.subscriptionClose = false;
    vm.greaterEndDate = false;
    vm.itemDisabled = [];
    vm.selectEndDate = selectEndDate;
    vm.selectEndDateTabular = selectEndDateTabular;
    vm.minimumEndDate = [];
    vm.datePicker = [];
    var unregisterSubscriptionEvents = [];
    vm.setTabularView = setTabularView;
    vm.gridOptions = null;
    vm.isTabularViewSettings = false;
    vm.subscriptions = [];
    vm.subscriptionsHeader = [];
    vm.checkboxSelection = [];
    vm.checkboxSelectionTemp = [];
    vm.gridColMinWidth = 140;
    vm.isSettingsOpen = false;
    vm.isGridButtonVisible = false;
    vm.openCancelDialogue = false;
    vm.subscriptionFileName = "Subscriptions";
    vm.getSubscriptionDetails = getSubscriptionDetails;
    vm.subscriptionsDisplayName = [];
    vm.displayableSubscriptions = null;
    vm.displayableSubscriptionsHeader = null;
    vm.openStoreOverlay = openStoreOverlay;
    vm.subscriptionStoreState = 'collapsed';
    vm.isStoreOpen = false;
    vm.closeStore = false;
    vm.myEligibleOffers = [];
    vm.showOfferDetails = showOfferDetails;
    vm.cancelOfferSubscription = cancelOfferSubscription;
    vm.getMySubscriptions = getMySubscriptions;
    vm.getMyEligibleOffers = getMyEligibleOffers;
    vm.getOfferImageFile = getOfferImageFile;
    vm.isOfferDetails;
    vm.offerEffectiveDate = [];
    vm.offerDate = [];
    vm.selectEffectiveStartDate = selectEffectiveStartDate;
    vm.getOffersContentHeight = getOffersContentHeight;
    vm.addSubscription = addSubscription;
    vm.searchText = "";
    vm.filterValue = "";
    vm.filterOffers = filterOffers;
    vm.isOffersAvailable = true;
    vm.showAddSubscription = showAddSubscription;
    vm.showOfferTooltip = showOfferTooltip;
    vm.closeOfferTooltip = closeOfferTooltip;
    vm.freezeColumnsTemp = [];
    vm.freezeColumns = [];
    vm.getOfferImage = getOfferImage;
    vm.selectedSortKey =  '';
    vm.selectedFilters = {};
    vm.widgetOpen = false;
    vm.selfCareEnabled = true;
    vm.subscriptionsLength = false;
    vm.count = 1;
    vm.activeRouteBar = false;
    vm.routeToActiveUser = routeToActiveUser;
    vm.limit = 2;
    vm.productOfferImages = {};
    vm.sortOrder = null;
    vm.calendarDateFormat = vm.localizeDateFormat = utilityService.dateFormat;

    $scope.$watch('accountId', function(acctId){
      if (!acctId){
        return;
      }
      vm.accountId = acctId;
      activate();
    });
    
    _accountManager = localStorageService.get('accountManagerAccountId');
      if(_accountManager){
        vm.userName = localStorageService.get('accountManagerName');
        vm.activeRouteBar = true;
      }else{
       vm.activeRouteBar = false;
      }

    function activate() {
      filterInterval = $scope.$on('show_filter_intervals', function(event, idInterval, data) {
        var cardState = utilityService.cardState;
        if((cardState.expand == vm.widgetOpen) || (cardState.expand != vm.widgetOpen && cardState.widget == COMPONENT_NAME)) {
          vm.initiateWidgetService();
        }
      });

      vm.initiateWidgetService();
      vm.i18n = translatorHelper.loadFromStorage();
      vm.layoutLeftDirection = 'left';
      vm.layoutRightDirection = 'right';
      vm.isRTL = false;
      if (vm.i18n.languageDirection == 'RTL') {
        vm.layoutLeftDirection = 'right';
        vm.layoutRightDirection = 'left';
        vm.isRTL = true;
      }
      selfCareEditAccount = $rootScope.$on('allowSelfCare_editAccountInfo', function(event, data) {
        vm.selfCareEnabled = (data === 'F') ? false : true;
      });

      sortKeyFilter = $rootScope.$on('filter_criteria_event', function(event, sortKey, filterItems) {
        if(vm.widgetOpen){
          vm.item = -1;
          vm.sortOrder = (vm.selectedSortKey == sortKey && vm.sortOrder == 'desc') ? 'asc' : 'desc';
          vm.selectedFilters = {};
          vm.selectedSortKey = null;
          if(sortKey) vm.selectedSortKey = sortKey;
          if(filterItems) vm.selectedFilters = filterItems;
          if(vm.tabularView == true) vm.applyCancelSettings(true);
        }
      });

      angular.element($window).on('resize', function () {
        if(vm.widgetOpen){
          vm.viewAllBodyHeight();
          vm.getSettingsHeight();
          setTabularView(false);
        }
        if(vm.isStoreOpen) {
          vm.getOffersContentHeight();
          $scope.$apply();
        }
      });
      utilityService.getLocaleDateFormatter().then(function () {
        vm.localizeDateFormat = vm.getDateFormatByLang();
        vm.localizePickDateFormat = utilityService.convertPickDateFormat(vm.localizeDateFormat);
      });
    }

    vm.initiateWidgetService = function() {
      var userSettings = localStorageService.get("user.settings");
      if(vm.siteName !== 'default') {
        vm.siteName = userSettings.settings.siteName;
      }
      getMySubscriptions();
      getMyEligibleOffers(isLocaleError);
      vm.loading = true;
      vm.openCancelDialogue = false;
      getOfferImageFile();
    }

    callOfferStore = $rootScope.$on('callOfferStore', function(event, data) {
      if(data == 'offerStore') {
        vm.openStoreOverlay();
      }
    });

    unregisterSubscriptionEvents.push(filterInterval);
    unregisterSubscriptionEvents.push(selfCareEditAccount);
    unregisterSubscriptionEvents.push(sortKeyFilter);
    unregisterSubscriptionEvents.push(callOfferStore);

    function selectEndDate(index) {
      angular.element(".dateId"+index).trigger('click').focus();
      //vm.minimumEndDate[index] = $filter('date')(vm.minimumEndDate[index], 'MM/dd/yyyy');
    }

    function selectEndDateTabular(clsName) {
      document.getElementById(clsName).focus();
    }

    vm.openCancelSubscriptionDialog = function(subscription, openDialogue) {
      vm.item = subscription['productOfferingId'];
      vm.openCancelDialogue = openDialogue;
       if(openDialogue) {
         vm.subscriptions.forEach(function (subscriptionObject, iterator) {
           if (subscriptionObject['productOfferingId'] == vm.item) {
             vm.selectedSubscription = subscriptionObject;
           }
         });
       } else {
         vm.selectedSubscription = subscription;
       }
    };

    function setTabularView(isInitialCall) {
      var width = $window.innerWidth;
      if (isInitialCall) {
        (width > 991) ? (vm.tabularView = true, vm.showTabularView()) : (vm.tabularView = false);
      } else {
        if (width < 768) {
          vm.tabularView ? vm.showCardView(): '';
        }
      }
    }

    vm.subscriptionHeaderKey = function(key) {
      return vm.subscriptionsDisplayName[key] ? vm.subscriptionsDisplayName[key] : key;
    }

    function getMySubscriptions() {
      var idInterval = utilityService.getOrSetSelectedTimeInterVal().idInterval;
      utilityService.getResponseConfigJson(vm.subscriptionFileName)
        .then(function(response) {
          var fileds = response.data.columns.fields;
          vm.getSubscriptionDetails(idInterval, fileds);
      }).catch(function(error) {
        vm.getSubscriptionDetails(idInterval, null);
      });
    }

    function getSubscriptionDetails(idInterval, configFields) {
      vm.item = -1;
      vm.subError = false;
      subscriptionsServices.getSubscriptions(vm.accountId, idInterval).then(function(response) {
        vm.subscriptions = angular.copy(response);
        vm.limit = vm.widgetOpen ? vm.subscriptions.length : 2;
        if (vm.subscriptions) {
          if(configFields) {
            var configInfo = utilityService.processExternalConfigJson(vm.subscriptions, configFields);
            vm.displayableSubscriptions = configInfo["isColumnDataList"];
            vm.subscriptionsDisplayName = configInfo["displayableNames"];
            vm.subscriptionDisplayableNameHeader = configInfo["isColumnDisplayableNames"];
            vm.displayableSubscriptionsHeader = utilityService.getKeysForDataList(vm.displayableSubscriptions);
            vm.subscriptionSortKeys = configInfo["sortableKeys"];
            vm.subscriptionFilterKeys = configInfo["filterableKeys"];
            vm.subscriptionDefaultColumnKeys = configInfo["defaultColumnKeys"];
            vm.subscriptionConfigs = configInfo["configFields"];
            vm.setOrUpdateSubscriptionGridData();
          }
          vm.subscriptions.forEach(function(subscription, iterator) {
            var _intervalEndDate = utilityService.getOrSetSelectedTimeInterVal().idInterval;
            var accountFilters = localStorageService.get('accountFilterData');
            vm.minimumEndDate[subscription.productOfferingId] = (subscription.startDateAsString > currentDate) ? subscription.startDateAsString : currentDate;
            //vm.minimumEndDate[subscription.productOfferingId] = $filter('date')(vm.minimumEndDate[subscription.productOfferingId], 'MM/dd/yyyy');
            vm.minimumEndDate[subscription.productOfferingId] = $moment(vm.minimumEndDate[subscription.productOfferingId]).format(vm.localizeDateFormat);
            vm.datePicker[subscription.productOfferingId] =  vm.minimumEndDate[subscription.productOfferingId];
            subscription.dateRange = $moment(subscription.startDateAsString).format(vm.localizeDateFormat) + '   -   ' + $moment(subscription.endDateAsString).format(vm.localizeDateFormat);
            // Condition as per grid init
            vm.itemDisabled[subscription.productOfferingId] = subscription.userUnsubscribe === true ? false : true;
            //Disabled condtion for cancelToSubscription button
            cancelLinkToBeDisabled = true;
            if ((subscription.userUnsubscribe === true) && (subscription.expired === false)) {
               if (accountFilters[vm.accountId].data.accountIntervals[0].idInterval == _intervalEndDate){
                  cancelLinkToBeDisabled = false;
               }
            } else if ((subscription.userUnsubscribe === true) && (subscription.expired === true)) {
              subscription.dateRange = subscription.dateRange + ' ' + '(' + $filter('translate')('TEXT_CANCELED') + ')';
            }
            if(vm.isCancelButton(subscription)){
              vm.itemDisabled[subscription.productOfferingId] = cancelLinkToBeDisabled;
            }
          });
        }
        if (response !== undefined) {
          vm.subscriptionsLength = response.length;
          vm.cancelSubscriptions = true;
        } else {
          vm.subscriptionsLength = true;
          vm.cancelSubscriptions = false;
        }
      }).catch(function(error) {
        logger.log('Error occured in app.subscriptions.subscriptionsController.getMySubscriptions()', {
          error: error
        });
        switch (error.status) {
          case 500:
          case 412:
          case 403:
          case 405:
          case 409:
            handleCyberGateError();
            vm.errorSubscriptions = true;
            vm.subscriptionsLength = false;
            break;
          case 400:
          case 404:
            handleCyberGateError();
            vm.errorSubscriptions = false;
            vm.subscriptionsLength = true;
            vm.subscriptions = vm.displayableSubscriptions = [];
            vm.setOrUpdateSubscriptionGridData();
            break;
        }
      })
      .finally(function () {
        vm.loading = false;
      });

    }

    vm.isCancelButton = function(subscriptionObject){
      return subscriptionObject.userUnsubscribe && vm.selfCareEnabled;
    }
    vm.isCallCancelButton = function(subscriptionObject){
      return !subscriptionObject.userUnsubscribe && vm.selfCareEnabled;
    }
    vm.isContactCustomerCancelButton = function(subscriptionObject){
      return !vm.selfCareEnabled && !subscriptionObject.expired;
    }

    function getMyEligibleOffers(isLocaleError) {
      vm.loading = true;
      subscriptionsServices.getEligibleOffers(vm.accountId, isLocaleError).then(function(response) {
        vm.myEligibleOffers = response;
        if(vm.myEligibleOffers.length > 0 && vm.myEligibleOffers !== undefined && vm.myEligibleOffers !== null) {
          vm.myEligibleOffers.forEach( function(offer, index) {
            var offerEffectiveDateObj = (offer.ta_dt_start > currentDate) ? offer.ta_dt_start : currentDate;
            //vm.offerEffectiveDate[index] = $filter('date')(vm.offerEffectiveDate[index], 'MM/dd/yyyy');
            vm.offerEffectiveDate[offer.id_po] = $moment(offerEffectiveDateObj).format(vm.localizeDateFormat);
            vm.offerDate[offer.id_po] = vm.offerEffectiveDate[offer.id_po];
          });
        } else {
          vm.isOffersAvailable = false;
        }
      }).catch(function(error) {
        eligibleOffersErrorHandler(error);
      }).finally(function () {
        vm.loading = false;
      });
    }

    function eligibleOffersErrorHandler(error) {
      if(vm.count > 0) {
        vm.count = 0;
        isLocaleError = true;
        getMyEligibleOffers(isLocaleError);
      } else {
        logger.log('Error occured in app.subscriptions.subscriptionsController.getMyEligibleOffers()', {
          error: error
        });
        vm.isOffersAvailable = false;
      }
    }

    function getOfferImageFile() {
      utilityService.getOffersImageFile('offeringImages/ProductOfferImages.json', vm.siteName)
        .then(function (response) {
          vm.productOfferImages = response.data;
        }).catch(function (error) {
          vm.siteName = 'default';
          getOfferImageFile();
        });
    }

    function getOffersContentHeight() {
      var systembarHeight = $document.find(".systemBar").height();
      var navHeight = $document.find(".ebMetraviewContainer").height();
      var pageTitleHeight = $document.find(".page-title").height();
      var ecbhorizontalBarRoute = 0;
      if (vm.activeRouteBar){
        var ecbhorizontalBarRoute = $document.find(".ecb-horizontalBarRoute").outerHeight() + 15;
      }
      var contentHeight = $document.height() - (systembarHeight + navHeight + pageTitleHeight + ecbhorizontalBarRoute);
      var contentWidth = $document.width();
      if (contentWidth < 992) {
        return { "height": (contentHeight - 70) + "px" };
      } else {
        return { "height": (contentHeight - 25) + "px" };
      }
    }

    function selectEffectiveStartDate(offerId) {
      angular.element(".offerDateId" + offerId).trigger('click').focus();
      //vm.minimumEndDate[index] = $filter('date')(vm.offerEffectiveDate[index], 'MM/dd/yyyy');
      vm.minimumEndDate[offerId] = vm.offerEffectiveDate[offerId];
    }

    function handleCyberGateError() {
      vm.subError = true;
      vm.cancelSubscriptions = false;
    }

    vm.toggleSubscriptionCardState = function() {
      vm.subscriptionCardState = 'expanded';
      vm.widgetOpen = true;
      vm.subscriptionClose = true;
      $scope.$emit('expanded', vm.subscriptionCardState, COMPONENT_NAME);
      if(vm.subscriptions) {
        vm.subscriptionsHeader = Object.keys(vm.subscriptions[0]);
        utilityService.gridSettingsStorageData(COMPONENT_NAME, null, ["subscriptionName","Actions"]);
        var storageTabulardata = utilityService.gridSettingsStorageData(COMPONENT_NAME);
        var columnKeys = (storageTabulardata.activeColumns && (storageTabulardata.activeColumns).length > 0) ? storageTabulardata.activeColumns : vm.subscriptionDefaultColumnKeys;
        vm.checkboxSelection = vm.checkboxSelectionTemp = columnKeys;
        vm.freezeColumns = vm.freezeColumnsTemp = storageTabulardata.freezeColumns;
        setTabularView(true);
      }
      vm.viewAllBodyHeight();
      if (!vm.isStoreOpen) {
      var prop = {"sortable" : true, "filterable" : true, sortKeys : vm.subscriptionSortKeys, filterKeys : vm.subscriptionFilterKeys, displayNames : vm.subscriptionsDisplayName};
      $scope.$emit('widgetFilter', prop);
      }
      vm.limit = vm.subscriptions.length;
      vm.item = -1;
      return vm.subscriptionCardState;
    };
    vm.closeSubscriptionViewAll = function() {
      vm.selectedFilters = {};
      vm.selectedSortKey = null;
      vm.subscriptionCardState = 'collapsed';
      vm.subscriptionClose = false;
      vm.widgetOpen = false;
      vm.isTabularViewSettings = false;
      vm.subscriptionStoreState = 'collapsed';
      vm.isStoreOpen = false;
      vm.closeStore = false;
      vm.limit = 2;
      vm.item = -1;
      $scope.$emit('expanded', vm.subscriptionCardState, COMPONENT_NAME);
      $scope.$emit('widgetFilter', {});
      angular.element(document).ready(function() {
        $timeout(function() {
          $(".widget-content-list").scrollTop(0);
        }, 1000);
      });
    };

    offerStoreSelected = $scope.$on('offerStoreSelected', function(event, data) {
      if(data == false) {
        vm.closeSubscriptionViewAll();
      }
    });

    unregisterSubscriptionEvents.push(offerStoreSelected);

    vm.showCloseButton = function() {
      return vm.widgetOpen || vm.isStoreOpen;
    };
    vm.closeCancelSubscription = function(index) {
      vm.item = -1;
      vm.openCancelDialogue = false;
    };
    vm.subErrorMessage = function() {
      vm.subError = false;
      vm.cancelSubscriptions = true;
      getMySubscriptions();
    }
    vm.submitCancelSubscription = function(cancelData, selectedEndDate, index) {
      vm.item = -1;
      vm.openCancelDialogue = false;
      var startDate = cancelData.startDate;
      var endDate = Date.parse(selectedEndDate);
      var cancelSubscriptionInfo = {
        subscriptionId: cancelData.subscriptionId,
        productOfferingId: cancelData.productOfferingId,
        startDate: startDate,
        endDate: endDate,
        udrcValues: [],
        quoteBatchId: "",
        characteristicValues: []
      };
      vm.itemDisabled[index] = true;
      subscriptionsServices
        .cancelSubscriptions(vm.accountId, cancelSubscriptionInfo, cancelData.isBundle)
        .then(function(response) {
          if (response !== undefined) {
            vm.activeCancel = false;
            getMySubscriptions();
          } else {
            vm.cancelSubscriptions = false;
            vm.errorSubscriptions = true;
          }
        }).catch(function(error) {
          logger.log('Error occured in app.subscriptions.subscriptionsController.getMySubscriptions()', {
            error: error
          });
          switch (error.status) {
            case 304:
            case 500:
            case 412:
            case 403:
            case 405:
            case 409:
              handleCyberGateError();
              vm.errorSubscriptions = true;
              vm.subscriptionsLength = false;
              break;
            case 400:
            case 404:
              handleCyberGateError();
              vm.errorSubscriptions = false;
              vm.subscriptionsLength = true;
              break;
          }
        });
    };

    vm.closeError = function() {
      vm.cancelSubscriptions = false;
    };

    $scope.$on('$destroy', function () {
      utilityService.cleanUpListners(unregisterSubscriptionEvents);
    });

    vm.setGridOptions = function() {
      vm.gridOptions = {
        data: vm.displayableSubscriptions,
        columnDefs : vm.getSubscriptionColumnDefinition(),
        rowHeight : 60,
        enableColumnResizing : true,
        enableSorting: true,
        enableFiltering: true,
        appScopeProvider : vm,
        enableColumnMenus: false,
        showGridFooter: false,
        cellTooltip: true,
        enableRowSelection: true,
        enableColumnMoving: true,
        onRegisterApi : function(gridApi) {
          vm.tabularGridApi = gridApi;
          vm.tabularGridApi.core.on.sortChanged( $scope, function( grid, sortColumns ) {
            if (sortColumns.length > 0) {
              utilityService.unSortMultiCols(grid, sortColumns);
              vm.selectedSortKey = sortColumns[sortColumns.length - 1].field;
              vm.sortOrder = sortColumns[sortColumns.length - 1].sort.direction;
              $rootScope.$emit('setSortKey', vm.selectedSortKey);
            }  
          });
        }
      };
      vm.setOrUpdateSubscriptionGridData();
    };

    vm.setOrUpdateSubscriptionGridData = function() {
      if(!vm.gridOptions) return;
          vm.gridOptions.data = vm.displayableSubscriptions;
      if(vm.tabularGridApi) vm.tabularGridApi.core.refresh();
    }

    vm.showCardView = function() {
      vm.tabularView = false;
      vm.isTabularViewSettings = false;
      vm.openCancelDialogue = false;
      vm.item = -1;
      vm.viewAllBodyHeight();
    }

    vm.showTabularView = function() {
      vm.tabularView = true;
      vm.setGridOptions();
      vm.applyCancelSettings(true);
      vm.viewAllBodyHeight();
    }

    vm.toggleTabularViewSettings = function() {
      vm.isTabularViewSettings = vm.isTabularViewSettings ? false : true;
      vm.checkboxSelectionTemp = angular.copy(vm.checkboxSelection);
      vm.freezeColumnsTemp = angular.copy(vm.freezeColumns);
    }

    vm.isSettings = function() {
      return vm.widgetOpen && vm.tabularView && vm.isTabularViewSettings;
    }

    vm.isExpandCardView = function() {
      return vm.widgetOpen && !vm.tabularView;
    }

    vm.isExpandTabularView = function() {
      return vm.widgetOpen && vm.tabularView;
    }

    vm.toggleHeaderSelection = function(header) {
      var columnIndex = vm.checkboxSelectionTemp.indexOf(header);
      if (columnIndex > -1)
        vm.checkboxSelectionTemp.splice(columnIndex, 1);
      else
        vm.checkboxSelectionTemp.push(header);
    }

    vm.toggleSelectAll = function(isAll) {
      if(isAll == 0 && vm.freezeColumns.length == vm.checkboxSelection.length) return;
      vm.checkboxSelectionTemp = isAll == 1 ? angular.copy(vm.subscriptionsHeader) : angular.copy(vm.freezeColumns);
    }

    vm.isAllColumnDeselected = function(){
      var chkBoxLen = 0;
      for(var i in vm.checkboxSelectionTemp){
        chkBoxLen = (vm.freezeColumns).indexOf(vm.checkboxSelectionTemp[i]) == -1 ? chkBoxLen + 1 : chkBoxLen;
      }
      return chkBoxLen == 0 ? true : false;
    }

    vm.applyCancelSettings = function(isApply) {
      if(isApply) {
        vm.checkboxSelection = angular.copy(vm.checkboxSelectionTemp);
        vm.freezeColumns = angular.copy(vm.freezeColumnsTemp);
        utilityService.gridSettingsStorageData(COMPONENT_NAME, vm.checkboxSelection, vm.freezeColumns);
        vm.gridOptions.columnDefs = vm.getSubscriptionColumnDefinition();
      }
      vm.isTabularViewSettings = false;
    }

    vm.getSubscriptionColumnDefinition = function() {
      if(vm.displayableSubscriptions && vm.displayableSubscriptions.length > 0) {
        var columnDefinitions = [];
        var columnDefinitionActions = { "field": 'Actions', displayName: "", minWidth: 160, pinnedLeft: !vm.isRTL, pinnedRight: vm.isRTL, enableSorting: false};
        var cancelSubscriptionText = ($filter('translate')('TEXT_CANCEL_SUBSCRIPTION'));
        var callToCancelSubscriptionText = ($filter('translate')('TEXT_CALL_CANCEL_SUBSCRIPTION'));
        var contactToCancelSubscriptionText = ($filter('translate')('TEXT_CONTACT_CUSTOMERCARE_CANCEL_SUBSCRIPTION'));
        columnDefinitionActions.cellTemplate = '<button  class="btn ebBtn btn-sm ebBtn_small ebColor_textLinkBlue ecb-subscriptionsCancelTabularView" ng-if="grid.appScope.isCancelButton(row.entity)" ng-click="(grid.appScope.itemDisabled[row.entity.productOfferingId] === true) || grid.appScope.openCancelSubscriptionDialog(row.entity, true)" ng-class="{disabled:grid.appScope.itemDisabled[row.entity.productOfferingId] == true}">'
              +' <i class="fa fa-times ecb-subscriptionIconSpace" aria-hidden="true"></i> <span class="ebColor_textLinkBlue">'+cancelSubscriptionText+'</span></button>'
              +' <button class="btn ebBtn btn-sm ebBtn_small ebColor_textLinkBlue ecb-subscriptionsCancelTabularView" ng-if="grid.appScope.isCallCancelButton(row.entity)" ng-class="{disabled:grid.appScope.itemDisabled[row.entity.productOfferingId] == true}">'
              +' <span>'+ callToCancelSubscriptionText  +'</span></button>'
              +' <button class="btn ebBtn btn-sm ebBtn_small ebColor_textLinkBlue ecb-subscriptionsCancelTabularView" ng-if="grid.appScope.isContactCustomerCancelButton(row.entity)" ng-class="{disabled:!grid.appScope.selfCareEnabled}">'
              +' <span>'+ contactToCancelSubscriptionText  +'</span></button>';
        columnDefinitions.push(columnDefinitionActions);
        var columnDefinitionImage = {"field" : " ", minWidth : 140, enableSorting: false};
        columnDefinitionImage.cellTemplate = ' <img class="ecb-subscriptionsImage-tabularView" ng-src="{{grid.appScope.getOfferImage(row.entity.productOfferingId)}}" >';
        columnDefinitions.push(columnDefinitionImage);
        var definitions = utilityService.setColumnDefinitions({columnKeys: vm.displayableSubscriptionsHeader, 
        selectedFilters: vm.selectedFilters, 
        configs: vm.subscriptionConfigs, 
        checkboxSelection: vm.checkboxSelection, 
        dispNameKeyMap: vm.subscriptionsDisplayName, 
        freezeColumns: vm.freezeColumns, 
        sortKeys: vm.subscriptionSortKeys, 
        selectedSortKey: vm.selectedSortKey,
        sortOrder: vm.sortOrder });
        return columnDefinitions.concat(definitions);
      }
      return [];
    }

    vm.getActiveViewStyle = function(view) {
      return view == 'card' ? (vm.tabularView ? "ecb-cardTabularActiveView" : "ecb-cardTabularFadeView") : (!vm.tabularView ? "ecb-cardTabularActiveView" : "ecb-cardTabularFadeView");
    }

    vm.isCheckboxSelection = function(header) {
      return vm.checkboxSelectionTemp.indexOf(header) > -1;
    }

    vm.checkCancelHover = function(hoverCancel) {
      if(!vm.activeCancel && hoverCancel) {
        return true;
      } else {
          return false;
        }
    }
    vm.viewAllBodyHeight = function() {
      angular.element(".ecb-expandSubscriptionBody").ready(function() {
        vm.getViewAllBodyHeight();
      });
    }

    vm.getViewAllBodyHeight = function() {
      return utilityService.manageViewAllBodyHeight("ecb-subscriptionsExpandMain", "ecb-expandSubscriptionBody");
    }

    vm.getSettingsHeight = function() {
      var height = $window.innerHeight;
      var systembarHeight = $document.find(".systemBar").height();
      var settingsHeader = $document.find(".ecb-settingsHeader").height();
      var settingsCheckboxHeader = $document.find(".ecb-settingsCheckboxHeader").height();
      if (height) return { "height": (height - (systembarHeight + settingsHeader + settingsCheckboxHeader + 40)) + "px" };
    }

    function openStoreOverlay() {
      vm.subscriptionStoreState = 'expanded';
      vm.isStoreOpen = true;
      vm.closeStore = true;
      $scope.$emit('expanded', vm.subscriptionStoreState, COMPONENT_NAME);
      $scope.$emit('offerStoreSelected', true);
      $scope.$emit('widgetFilter', {});
    }

    function showOfferDetails(offerId) {
      vm.isOfferDetails = offerId;
    }

    function cancelOfferSubscription(offerId) {
      vm.isOfferDetails = -1;
    }

    var formatDateString = function(dateInput, isFormat) {
        if(dateInput) {
          if(isFormat) {
            return $moment(dateInput, vm.localizeDateFormat).format("YYYY-MM-DD");
          } else {
            return $filter('date')(dateInput, "yyyy-MM-dd");
          }
        } 
        return "";
    }

    function filterOffers() {
     vm.filterValue = vm.searchText;
     vm.isOfferDetails = -1;
    }

    function showAddSubscription() {
      return !vm.widgetOpen && !vm.isStoreOpen && vm.selfCareEnabled;
    }

    function addSubscription(offer, offerId) {
      if(offer) {
        var requestObj = {};
        offer.te_dt_start = formatDateString(vm.offerDate[offerId], true);
        offer.te_dt_end = formatDateString(offer.te_dt_end);
        requestObj = {
          "productOfferingId": offer.id_po,
          "subscriptionName": offer.nm_name,
          "startDate": offer.te_dt_start,
          "endDate": offer.te_dt_end,
          "quoteBatchId": "",
          "characteristicValues": [],
          "udrcValues": []
        }
        var offerAdded = ($filter('translate')('TEXT_OFFER_ADDED_SUCCESSFUL'));
        var addingOfferError = ($filter('translate')('TEXT_OFFER_ADDING_ERROR'));
        subscriptionsServices.addSubscriptions(vm.accountId, requestObj, offer.b_bundle)
          .then(function(response) {
            logger.success(offerAdded);
            getMySubscriptions();
            getMyEligibleOffers(isLocaleError);
          })
          .catch(function(error) {
            logger.log('Error occured in app.subscriptions.subscriptionsController.addSubscription()', {
              error: error
            });
            switch (error.status) {
              case 304:
              case 500:
              case 412:
              case 403:
              case 405:
              case 409:
              case 400:
              case 404:
                logger.warning(addingOfferError);
                break;
              }
          });
        vm.isOfferDetails = -1;
      }
    }

    function showOfferTooltip(showOfferTooltip) {
      vm.showOfferTooltip[showOfferTooltip] = true;
    }

    function closeOfferTooltip(showOfferTooltip) {
      vm.showOfferTooltip[showOfferTooltip] = false;
    }

    vm.unFreezeColumnsList = function(columnList) {
      var unFreezeColumns = [];
      for(var i in columnList){
        if(vm.freezeColumns.indexOf(columnList[i]) == -1)
          unFreezeColumns.push(columnList[i]);
      }
      return unFreezeColumns;
    }

    vm.showMidLine = function(columnList) {
      return vm.freezeColumns.length > 0 && vm.freezeColumns.length < columnList.length;
    }

    vm.toggleFreezingColumns = function(header, unfreezeColumns) {
      if((unfreezeColumns && vm.checkboxSelectionTemp.indexOf(header) == -1) || header == 'subscriptionName' || header == 'Actions' ) return;
      var columnIndex = vm.freezeColumnsTemp.indexOf(header);
      if (columnIndex > -1)
        vm.freezeColumnsTemp.splice(columnIndex, 1);
      else
        vm.freezeColumnsTemp.push(header);
    }

    function getOfferImage(OfferID) {
      var offerId = "PO" + OfferID;
      var offerImageKeys = Object.keys(vm.productOfferImages);
      if(offerImageKeys.indexOf(offerId) != -1) {
        var offerImageName = vm.productOfferImages[offerId];
        return "/static/" + vm.siteName + "/offeringImages/" + offerImageName;
      } else {
        return "/static/" + vm.siteName + "/offeringImages/Offer.png";
      }
    }

    vm.getSortByColumn = function(defaultKey) {
      return vm.selectedSortKey ? vm.selectedSortKey : defaultKey;
    }

    function routeToActiveUser(){
      localStorageService.remove('accountManagerAccountId');
      $window.location.reload();
    }

    vm.getDateFormatByLang = function() {
      var dateFormat = utilityService.getDateFormatterByLang()['dateFormat'];
      return utilityService.isObject(dateFormat) ? dateFormat : vm.calendarDateFormat;
    }

    vm.showLocalizedDateFormat = function(date) {
      return $moment(date).format(vm.localizeDateFormat);
    }

  }
})();
