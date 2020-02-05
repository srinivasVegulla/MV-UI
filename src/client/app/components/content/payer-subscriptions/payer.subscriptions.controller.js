/* jslint maxlen: 250 */
(function() {
  'use strict';
  angular
    .module('app.payer.subscriptions')
    .controller('payerSubscriptionsController', Controller);

  Controller.$inject = [
    'logger',
    '$scope',
    '$rootScope',
    'localStorageService',
    'payerSubscriptionsService',
    'utilityService',
    '$timeout',
    '$window',
    '$filter',
    '$document',
    'translatorHelper',
    '$moment'
  ];

  /* @ngInject */
  function Controller(
    logger,
    $scope,
    $rootScope,
    localStorageService,
    payerSubscriptionsService,
    utilityService,
    $timeout,
    $window,
    $filter,
    $document,
    translatorHelper,
    $moment) {
    /*jshint validthis: true */
    var vm = this,
        _idInterval,
        _intervalEndDate,
        currentDate = new Date(),
        filterInterval,
        sortKeyFilter,
        COMPONENT_NAME = 'payeeSubscriptions',
        unregisterSubscriptionEvents = [];
    vm.subscriptionCardState = 'collapsed';
    vm.subscriptionClose = false;
    vm.widgetOpen = false;
    vm.subscriptionsMessage = false;
    vm.subscriptionsError = false;
    vm.tabularView = false;
    vm.setTabularView = setTabularView;
    vm.isTabularViewSettings = false;
    vm.gridColMinWidth = 140;
    vm.subscriptionsDisplayArray = null;
    vm.subscriptionsDisplayArrayHeader = null;
    vm.payeeSubscriptionsFile = "PayerSubscriptions";
    vm.displayableSubscriptions = null;
    vm.displayableSubscriptionsHeader = null;
    vm.subscriptionsDisplayName = [];
    vm.checkboxSelectionTemp = [];
    vm.getAllPayeeSubscriptions = getAllPayeeSubscriptions;
    vm.toggleSubscriptionCardState = toggleSubscriptionCardState;
    vm.closeSubscriptionViewAll = closeSubscriptionViewAll;
    vm.viewAllBodyHeight = viewAllBodyHeight;
    vm.getViewAllBodyHeight = getViewAllBodyHeight;
    vm.getOfferImageFile = getOfferImageFile;
    vm.getSubscriptionsJson = getSubscriptionsJson;
    vm.selectedSortKey =  null;
    vm.selectedFilters = {};
    vm.dateRangeStartDate = "";
    vm.dateRangeEndDate = "";
    vm.getOfferImage = getOfferImage;
    vm.productOfferImages = {};
    vm.loading = true;
    vm.isDefault = false;
    vm.limit = 2;
    vm.sortOrder = null;
    vm.calendarDateFormat = vm.localizeDateFormat = utilityService.dateFormat;

    $scope.$watch('accountId', function(acctId){
      if (!acctId)return;
      vm.accountId = acctId;
      activate();
    });

    function activate() {
      filterInterval = $scope.$on('show_filter_intervals', function(event, idInterval, data) {
        var cardState = utilityService.cardState;
        if((cardState.expand == vm.widgetOpen) || (cardState.expand != vm.widgetOpen && cardState.widget == COMPONENT_NAME)) {
          vm.initiateWidgetService();
        }
      });
      var userSettings = localStorageService.get("user.settings");
      vm.siteName = userSettings.settings.siteName;

      vm.initiateWidgetService();

      sortKeyFilter = $rootScope.$on('filter_criteria_event', function(event, sortKey, filterItems) {
        if(vm.widgetOpen){
          vm.sortOrder = (vm.selectedSortKey == sortKey && vm.sortOrder == 'desc') ? 'asc' : 'desc';
          vm.selectedFilters = {};
          vm.selectedSortKey = null;
          if(sortKey) vm.selectedSortKey = sortKey;
          if(filterItems) vm.selectedFilters = filterItems;
          if(vm.widgetOpen == true) vm.applyCancelSettings(true);
        }
      });

    } // End of activate function

    /* Initial widget service calls to reflect both at load, reload and change in intervals */
    vm.initiateWidgetService = function() {
      vm.localizeDateFormat = utilityService.getDateFormatterByLang()['dateFormat'];
      vm.loading = true;
      getSubscriptionsJson();
      var selectedDateRange = utilityService.getOrSetSelectedTimeInterVal();
      vm.dateRangeStartDate = $moment(selectedDateRange.dateRange.startDate, vm.calendarDateFormat).format(vm.localizeDateFormat);
      vm.dateRangeEndDate = $moment(selectedDateRange.dateRange.endDate, vm.calendarDateFormat).format(vm.localizeDateFormat);
      getOfferImageFile();

      vm.i18n = translatorHelper.loadFromStorage();
      vm.layoutLeftDirection = 'left';
      vm.layoutRightDirection = 'right';
      if (vm.i18n.languageDirection == 'RTL') {
        vm.layoutLeftDirection = 'right';
        vm.layoutRightDirection = 'left';
      }
    };

    unregisterSubscriptionEvents.push(filterInterval);
    unregisterSubscriptionEvents.push(sortKeyFilter);

    function getOfferImageFile() {
      utilityService.getOffersImageFile('offeringImages/ProductOfferImages.json', vm.siteName)
        .then(function (response) {
          vm.productOfferImages = response.data;
        }).catch(function (error) {
          vm.siteName = 'default';
          getOfferImageFile();
        });
    }

    function getSubscriptionsJson() {
      var idInterval = utilityService.getOrSetSelectedTimeInterVal().idInterval;
      utilityService.getResponseConfigJson(vm.payeeSubscriptionsFile)
        .then(function(response) {
          var fields = response.data.columns.fields;
          vm.getAllPayeeSubscriptions(idInterval, fields);
      }).catch(function(error) {
        logger.log('Error occured in app.subscriptions.Controller.getResponseConfigJson()', {
          error: error
        });
        vm.getAllPayeeSubscriptions(idInterval, null);
      });
    }
    function setTabularView(isInitialCall) {
      var width = $window.innerWidth;
      if (isInitialCall) {
        (width > 991) ? (vm.tabularView = true, vm.showTabularView()) : (vm.tabularView = false);
      } else {
        if (width < 768) {
          vm.tabularView ? vm.showCardView() : '';
        }
      }
    }
    function getAllPayeeSubscriptions(idInterval, configFields) {
      vm.loading = true;
      payerSubscriptionsService.getPayeeSubscriptions(idInterval, vm.accountId)
        .then(function(response) {
          vm.payeeSubscriptions = angular.copy(response);
          vm.limit = vm.widgetOpen ? vm.payeeSubscriptions.length : 2;
          if(vm.payeeSubscriptions) {
            if(configFields) {
              var configInfo = utilityService.processExternalConfigJson(vm.payeeSubscriptions, configFields);
              vm.displayableSubscriptions = configInfo["isColumnDataList"];
              vm.subscriptionsDisplayName = configInfo["displayableNames"];
              vm.subscriptionDisplayableNameHeader = configInfo["isColumnDisplayableNames"];
              vm.displayableSubscriptionsHeader = utilityService.getKeysForDataList(vm.displayableSubscriptions);
              vm.subscriptionSortKeys = configInfo["sortableKeys"];
              vm.subscriptionFilterKeys = configInfo["filterableKeys"];
              vm.subscriptionDefaultColumnKeys = configInfo["defaultColumnKeys"];
              vm.subscriptionConfigs = configInfo["configFields"];
              vm.setOrUpdateSubscriptionGridData();
            } else {
              vm.subscriptionsDisplayArray = angular.copy(vm.payeeSubscriptions);
              vm.subscriptionsDisplayArrayHeader = Object.keys(vm.payeeSubscriptions[0]);
            }
          }
          vm.subscriptionsError = false;
          vm.subscriptionsCount = vm.payeeSubscriptions.length;
          if (vm.subscriptionsCount) {
            vm.subscriptionsMessage = false;
          } else {
            vm.subscriptionsMessage = true;
          }
        }).catch(function(error) {
        logger.log('Error occured in app.payer.subscriptions.payerSubscriptionsController.getAllPayeeSubscriptions()', {
          error: error
        });
        switch (error.status) {
            case 500:
            case 400:
            case 412:
            case 403:
            case 405:
             vm.subscriptionsError = true;
             vm.subscriptionClose = true;
              break;
            case 404:
              vm.subscriptionsMessage = true;
              vm.payeeSubscriptions = vm.displayableSubscriptions = [];
              vm.setOrUpdateSubscriptionGridData();
              break;
          }

      }).finally(function() {
        vm.loading = false;
      });
    }

    function toggleSubscriptionCardState() {
      vm.subscriptionCardState = 'expanded';
      vm.widgetOpen = true;
      vm.subscriptionClose = true;
      $scope.$emit('expanded', vm.subscriptionCardState, COMPONENT_NAME);
      vm.limit = vm.payeeSubscriptions.length;
      if(vm.payeeSubscriptions) {
        var keys = Object.keys(vm.displayableSubscriptions[0]);
        utilityService.gridSettingsStorageData(COMPONENT_NAME, null, ["displayname"]);
        var storageTabulardata = utilityService.gridSettingsStorageData(COMPONENT_NAME);
        var columnKeys = (storageTabulardata.activeColumns && (storageTabulardata.activeColumns).length > 0) ? storageTabulardata.activeColumns : keys;
        vm.checkboxSelection = vm.checkboxSelectionTemp = vm.displayableSubscriptionsHeader = columnKeys;
        vm.freezeColumns = vm.freezeColumnsTemp = storageTabulardata.freezeColumns;
        vm.viewAllBodyHeight();
        var prop = {"sortable" : true, "filterable" : true, sortKeys : vm.subscriptionSortKeys, filterKeys : vm.subscriptionFilterKeys, displayNames : vm.subscriptionsDisplayName};
        $scope.$emit('widgetFilter', prop);
        setTabularView(true);
      }
      vm.setGridOptions();
      vm.applyCancelSettings(true);
    }

    function viewAllBodyHeight() {
      angular.element(".ecb-payerSubscriptionBody").ready(function() {
        vm.getViewAllBodyHeight();
      });
    }

    function getViewAllBodyHeight() {
      return utilityService.manageViewAllBodyHeight("ecb-payerSubscriptionsExpandMain", "ecb-payerSubscriptionBody");
    }

    function closeSubscriptionViewAll() {
      vm.selectedFilters = {};
      vm.selectedSortKey = null;
      vm.subscriptionCardState = 'collapsed';
      vm.subscriptionClose = false;
      vm.widgetOpen = false;
      vm.tabularView = false;
      vm.isTabularViewSettings = false;
      $scope.$emit('expanded', vm.subscriptionCardState, COMPONENT_NAME);
      $scope.$emit('widgetFilter', {});
      vm.limit = 2;
      angular.element(document).ready(function() {
        $timeout(function() {
          $(".widget-content-list").scrollTop(0);
        }, 1000);
      });
    };

    vm.getSettingsHeight = function () {
      var height = $window.innerHeight;
      var systembarHeight = $document.find(".systemBar").height();
      var settingsHeader = $document.find(".ecb-settingsHeader").height();
      var settingsCheckboxHeader = $document.find(".ecb-settingsCheckboxHeader").height();
      if (height) return { "height": (height - (systembarHeight + settingsHeader + settingsCheckboxHeader + 40)) + "px" };
    }

    vm.setGridOptions = function() {
      //var subscriptions = angular.copy(vm.payeeSubscriptions);
      //var displayableSubscriptions = angular.copy(vm.displayableSubscriptions);
      //var displayableSubscriptionsHeader = Object.keys(vm.displayableSubscriptions[0]);
      vm.gridOptions = {
        data: vm.displayableSubscriptions,
        columnDefs : vm.getSubscriptionColumnDefinition,
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
            if(sortColumns.length > 0){
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
      var columnDefinitionImages = [];
      var columnDefinitionImage = {"field" : 'image', displayName:"", minWidth : vm.gridColMinWidth, enableSorting: false};
      columnDefinitionImage.cellTemplate = '<img class="ecb-subscriptionsImage-tabularView" ng-src="{{grid.appScope.getOfferImage(row.entity.productofferid)}}" >';
      columnDefinitionImages.push(columnDefinitionImage);
      var definitions = utilityService.setColumnDefinitions({columnKeys: vm.displayableSubscriptionsHeader, 
      selectedFilters: vm.selectedFilters, 
      configs: vm.subscriptionConfigs, 
      checkboxSelection: vm.checkboxSelection, 
      dispNameKeyMap: vm.subscriptionsDisplayName, 
      freezeColumns: vm.freezeColumns, 
      sortKeys: vm.subscriptionSortKeys, 
      selectedSortKey: vm.selectedSortKey,
      sortOrder: vm.sortOrder });
      return columnDefinitionImages.concat(definitions)
    }

    vm.subscriptionHeaderKey = function(key) {
      return vm.subscriptionsDisplayName[key] ? vm.subscriptionsDisplayName[key] : key;
    }

    vm.getActiveViewStyle = function(view) {
      return view == 'card' ? (vm.tabularView ? "ecb-cardTabularActiveView" : "ecb-cardTabularFadeView") : (!vm.tabularView ? "ecb-cardTabularActiveView" : "ecb-cardTabularFadeView");
    }

    vm.setOrUpdateSubscriptionGridData = function() {
      if(!vm.gridOptions) return;
          vm.gridOptions.data = vm.displayableSubscriptions;
          if(vm.tabularGridApi) vm.tabularGridApi.core.refresh();
    }

    vm.showCardView = function() {
      vm.tabularView = false;
      vm.isTabularViewSettings = false;
      vm.openCancelDialogue = false;
      vm.viewAllBodyHeight();
    }

    vm.showTabularView = function() {
      vm.tabularView = true;
      vm.viewAllBodyHeight();
    }

    vm.toggleTabularViewSettings = function() {
      vm.isTabularViewSettings = vm.isTabularViewSettings ? false : true;
      vm.checkboxSelectionTemp = angular.copy(vm.checkboxSelection);
      vm.freezeColumnsTemp = angular.copy(vm.freezeColumns);
    }

    vm.isExpandCardView = function() {
      return vm.widgetOpen && !vm.tabularView;
    }

    vm.isExpandTabularView = function() {
      return vm.widgetOpen && vm.tabularView;
    }

    vm.isSettings = function() {
      return vm.widgetOpen && vm.tabularView && vm.isTabularViewSettings;
    }

    vm.unFreezeColumnsList = function(columnList) {
      var unFreezeColumns = [];
      for(var i in columnList){
        if(vm.freezeColumns.indexOf(columnList[i]) == -1 && (columnList[i] != '$$hashKey'))
          unFreezeColumns.push(columnList[i]);
      }
      return unFreezeColumns;
    }

    vm.showMidLine = function(columnList) {
      return vm.freezeColumns.length > 0 && vm.freezeColumns.length < columnList.length;
    }

    vm.toggleSelectAll = function(isAll) {
      if(isAll == 0 && vm.freezeColumns.length == vm.checkboxSelection.length) return;
      vm.checkboxSelectionTemp = isAll == 1 ? angular.copy(vm.displayableSubscriptionsHeader) : angular.copy(vm.freezeColumns);
    }

    vm.isAllColumnDeselected = function(){
      var chkBoxLen = 0;
      for(var i in vm.checkboxSelectionTemp){
        chkBoxLen = (vm.freezeColumns).indexOf(vm.checkboxSelectionTemp[i]) == -1 ? chkBoxLen + 1 : chkBoxLen;
      }
      return chkBoxLen == 0 ? true : false;
    }

    vm.toggleHeaderSelection = function(header) {
      var columnIndex = vm.checkboxSelectionTemp.indexOf(header);
      if (columnIndex > -1)
        vm.checkboxSelectionTemp.splice(columnIndex, 1);
      else
        vm.checkboxSelectionTemp.push(header);
    }

    vm.toggleFreezingColumns = function(header, unfreezeColumns) {
      if((unfreezeColumns && vm.checkboxSelectionTemp.indexOf(header) == -1) || header == 'displayname') return;
      var columnIndex = vm.freezeColumnsTemp.indexOf(header);
      if (columnIndex > -1)
        vm.freezeColumnsTemp.splice(columnIndex, 1);
      else
        vm.freezeColumnsTemp.push(header);
    }

    vm.getSortByColumn = function(defaultKey) {
      return vm.selectedSortKey ? vm.selectedSortKey : defaultKey;
    }

    $scope.$on('$destroy', function () {
      utilityService.cleanUpListners(unregisterSubscriptionEvents);
    });

    angular.element($window).on('resize', function () {
      if(vm.widgetOpen){
        vm.viewAllBodyHeight();
        vm.getSettingsHeight();
        setTabularView(false);
      }
    });

    function getOfferImage(offerID) {
      var offerId = "PO" + offerID;
      var offerImageKeys = Object.keys(vm.productOfferImages);
      if (offerImageKeys.indexOf(offerId) != -1) {
        var offerImageName = vm.productOfferImages[offerId];
        return "/static/" + vm.siteName + "/offeringImages/" + offerImageName;
      } else {
        return "/static/" + vm.siteName + "/offeringImages/Offer.png";
      }
    }

  } // End of controller function

})();
