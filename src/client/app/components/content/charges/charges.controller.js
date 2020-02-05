/* jslint maxlen: 250 */
//jscs:disable maximumLineLength
(function() {
  'use strict';
  angular
    .module('app.charges')
    .controller('chargesController', Controller);
  Controller.$inject = [
    '$scope',
    '$rootScope',
    'chargesService',
    'authenticationService',
    'logger',
    '$filter',
    '$timeout',
    'localStorageService',
    '$window',
    'utilityService',
    '$document',
    'translatorHelper',
    '$attrs'
  ];
  /* @ngInject */
  function Controller(
    $scope,
    $rootScope,
    chargesService,
    authenticationService,
    logger,
    $filter,
    $timeout,
    localStorageService,
    $window,
    utilityService,
    $document,
    translatorHelper,
    $attrs) {
    var vm = this,
      _idInterval,
      COMPONENT_NAME = 'Charges',
      filterInterval,
      expandCharge,
      showMillerWidgetPopup,
      showChargesDetail,
      COMPONENT_NAME_NSC = 'NonStandardCharges',
      chargesBillAdjustmentPopup,
      chargesBillAdjustmentViewAll,
      chargesBillAdjustmentPopupData,
      adjustmentAmount = 0,
      sortKeyFilter,
      COMPONENT_NAME_MISCADJUST = 'MiscAdjustments',
      userSettings;
    vm.nodata = false;
    vm.exportToCSV = false;
    vm.adjustmentDetailsResponse = [];
    vm.exportError = false;
    vm.handleExportError = handleExportError;
    vm.showBillAdjustmentPopup = showBillAdjustmentPopup;
    vm.isBillAdjustmentPopup = false;
    vm.showNSCPopup = showNSCPopup;
    vm.isNSCPopup = false;
    vm.nscWidgetOpen = false;
    vm.showNscData = false;
    vm.positionElement = positionElement;
    vm.setCardLayOutDetails = setCardLayOutDetails;
    vm.setNSCCardLayoutDetails = setNSCCardLayoutDetails;
    vm.itemsPerCard = 10;
    vm.widgetOpen = false;
    vm.chargesWidgetOpen = false;
    vm.showChargesData = false;
    vm.chargesCardState = 'collapsed';
    $scope.cardLayoutChanged = true;
    $scope.cardLayoutIndex = null;
    vm.billAdjustmentData = null;
    vm.showChargesExpandView = showChargesExpandView;
    vm.showNscExpandView = showNscExpandView;
    vm.chargesExpandedStateclose = chargesExpandedStateclose;
    vm.setbillAdjustmentDataCharges = setbillAdjustmentDataCharges;
    vm.chargesData = chargesData;
    vm.chargesError = chargesError;
    vm.user = authenticationService.authentication().userInfo;
    vm.showChargesSettings = showChargesSettings;
    vm.tabularView = false;
    vm.isTabularViewSettings = false;
    vm.gridOptions = {};
    vm.miscGridOptions = {};
    vm.nscGridOptions = {};
    vm.adjustmentDetailsArrayHeader = [];
    vm.adjustmentDetailsArray = [];
    vm.nonStandardCharges = [];
    vm.nonStandardChargesHeader = [];
    vm.checkboxSelection = [];
    vm.checkboxSelectionTemp = [];
    vm.gridColMinWidth = 140;
    var unregisterChargesEvents = [];
    vm.freezeColumnsTemp = [];
    vm.freezeColumns = [];
    vm.nscFileName = "NonstandardCharges";
    vm.displayableNSC = [];
    vm.processNSCDetails = processNSCDetails;
    vm.nscDisplayableNameMap = [];
    vm.prebillFileName = "PreBill";
    vm.displayableAdjustments = [];
    vm.processAdjustmentDetails = processAdjustmentDetails;
    vm.adjustmentDisplayableNameMap = [];
    vm.selectedSortKey =  null;
    vm.selectedFilters = {};
    vm.widgetState = 'minimal';
    vm.setBillsView = setBillsView;
    vm.miscAdjFileName = "MiscAdjustment";
    vm.processMiscAdjustDetails = processMiscAdjustDetails;
    vm.showMiscAdjustPopup = showMiscAdjustPopup;
    vm.setTabularView = setTabularView;
    vm.loading = true;
    vm.noMiscAdjustments;
    vm.ecbARValue = localStorageService.get('ecbarStatus');
    vm.ecbARCheck = false;
    vm.parentDirective = $attrs.parentDr;
    vm.sortOrder = null;

    $scope.$watch('accountId', function(acctId){
      if (!acctId)return;
      vm.accountId = acctId;
      vm.widgetState = $scope.ecbWidgetState;
      activate();
    });

    expandCharge = $rootScope.$on('expandCharge', function (event, data, accountId, type, isViewAllActivated, loadComplete) {
      if(data == true && vm.parentDirective !== 'self') {
        vm.subscriberAccountId = accountId;
        if(vm.parentDirective !== 'self') {
          vm.initiateWidgetService(function() {
            $scope.$emit('dependentDirectiveViewChange', true, "ecb-charges");
            if(typeof loadComplete == 'function') loadComplete();
            vm.isViewAllActivated = isViewAllActivated;
            vm.expandDpendentChargePopup(type);
          }, type);
        }
      }
    });

    showMillerWidgetPopup = $rootScope.$on('showMillerWidgetPopup', function (event, data) {
      if (data == 'Charges') {
        chargesExpandedStateclose();
        $rootScope.$emit('expandTransactionPopup', true);
      }
    });

    showChargesDetail = $rootScope.$on('showChargesDetail', function (event, data) {
      if (data == 'Charges') {
        chargesExpandedStateclose();
      }
    });

    function activate() {
      userSettings = localStorageService.get("user.settings");
      vm.subscriberAccountId = null;
      filterInterval = $scope.$on('show_filter_intervals', function(event, idInterval, data, calendarParam) {
        if(!isWidgetActive()) return;
        var cardState = utilityService.cardState;
        if((cardState.expand == vm.widgetOpen) || (cardState.expand != vm.widgetOpen && cardState.widget == COMPONENT_NAME)) {
          vm.calendarStartDate = null;vm.calendarEndDate = null;
          if(calendarParam){
            var calendarDates = utilityService.setStartAndEndOfDay(calendarParam);
            vm.calendarStartDate = calendarDates.startDate;
            vm.calendarEndDate = calendarDates.endDate;
          }
          vm.initiateWidgetService();
        }
      });

      chargesBillAdjustmentPopup = $rootScope.$on('isBillAdjustmentPopup', function(event, data) {
        vm.isBillAdjustmentPopup = data;
      });

      chargesBillAdjustmentViewAll = $rootScope.$on('billAdjustmentViewAllClick', function(event, data) {
        if(data == COMPONENT_NAME){
          vm.showChargesExpandView();
        }
        if(data == COMPONENT_NAME_NSC){
          vm.showNscExpandView();
        }
        if(data == COMPONENT_NAME_MISCADJUST){
          showMiscAdjustExpandView();
        }
      });

      chargesBillAdjustmentPopupData = $rootScope.$on('billAdjustmentPopupData', function(event, data) {
          vm.setbillAdjustmentDataCharges(data);
      });

      sortKeyFilter = $rootScope.$on('filter_criteria_event', function(event, sortKey, filterItems) {
        if(!isWidgetActive()) return;
        if(vm.widgetOpen){
          vm.sortOrder = (vm.selectedSortKey == sortKey && vm.sortOrder == 'desc') ? 'asc' : 'desc';
          vm.selectedFilters = {};
          vm.selectedSortKey = null;
          if(sortKey) vm.selectedSortKey = sortKey;
          if(filterItems) vm.selectedFilters = filterItems;
          if(vm.tabularView == true) vm.applyChargesCancelSettings(true);
        }
      });

      if(vm.parentDirective == 'self') {
        vm.initiateWidgetService();
      }
      vm.i18n = translatorHelper.loadFromStorage();
      vm.layoutLeftDirection = 'left';
      vm.layoutRightDirection = 'right';
      vm.isRTL = false;
      if (vm.i18n.languageDirection == 'RTL') {
        vm.layoutLeftDirection = 'right';
        vm.layoutRightDirection = 'left';
        vm.isRTL = true;
      }

      angular.element($window).on('resize', function () {
        if(vm.widgetOpen){
          vm.viewAllBodyHeight();
          vm.getSettingsHeight();
          setTabularView(false);
        }
      });

      unregisterChargesEvents.push(filterInterval);
      unregisterChargesEvents.push(chargesBillAdjustmentPopup);
      unregisterChargesEvents.push(chargesBillAdjustmentViewAll);
      unregisterChargesEvents.push(chargesBillAdjustmentPopupData);
      unregisterChargesEvents.push(sortKeyFilter);
      unregisterChargesEvents.push(expandCharge);
      unregisterChargesEvents.push(showMillerWidgetPopup);
      unregisterChargesEvents.push(showChargesDetail); 
      if(vm.ecbARValue === '0'){
        vm.ecbARCheck = true;
      } else {
        vm.ecbARCheck = false;
      }
    }

    function isWidgetActive() {
      var isDWidgetVisible = angular.element('.dependency .ecb-chargesExpandMain').is(':visible');
      return (isDWidgetVisible && vm.parentDirective != 'self') || (!isDWidgetVisible && vm.parentDirective == 'self') ? true : false;
    }

    function setTabularView(isInitialCall) {
      var width = $window.innerWidth;
      if (isInitialCall) {
        (width > 991) ? (vm.showChargesTabularCardView('table')) : (vm.showChargesTabularCardView('card'));
      } else {
        if (width < 768) {
          vm.tabularView ? vm.showChargesTabularCardView('card') : '';
        }
      }
    }
    
    vm.initiateWidgetService = function(callback, type){
      vm.loading = true;
      vm.isCurrentBillingPeriod = utilityService.isCurrentBillingPeriod();
      var interval = utilityService.getOrSetSelectedTimeInterVal();
      vm.onDemandInterval = interval && interval.dateRange ? interval.dateRange.onDemandInterval : '';
      vm.invoiceNumber = interval && interval.dateRange ? interval.dateRange.invoiceNumber : '';
      if(!type || type == 'NonStandardCharge')
        getNonStandardChargesSettings(callback);
      getBillSettings(vm.user.billSettingId);
      if(!type || type == 'MiscAdjustment')
        getMiscAdjustSettings(callback);
    }


    /* widgetState is now configured via layoutManagerProperties file */
//    $rootScope.$on('dashboardViewSelected', function(event, data) {
//      if(data === true) {
//        vm.widgetState = 'minimal';
//      } else {
//        vm.widgetState = 'detail';
//      }
//    });


    function getProductReport() {
      vm.loading = true;
      var idInterval = utilityService.getOrSetSelectedTimeInterVal().idInterval;
      chargesService.getReport(idInterval, vm.accountId, vm.inlineAdjustments, vm.inlineTax, vm.invoiceNumber, vm.onDemandInterval)
        .then(function(response) {
          if (response) {
            vm.resetAdjustments();
            vm.nodata = false;
            if(response.data.Report)
              response.data.Report.amount = response.data.Report.displayAmount ? response.data.Report.displayAmount : response.data.Report.amount;
            vm.chargesResponse = response.data;
            vm.chargesReport = response.data.Report;
            vm.chargesReportLength = vm.chargesReport.productOfferings.length;
            vm.output = $filter('filter')(vm.chargesReport.productOfferings,
              function(d) {
                return d.id != null;
              });
            vm.chargesReportTotal = 0;
            for(var i=0; i<vm.output.length; i++) {
              vm.output[i].amount = vm.output[i].displayAmount ? vm.output[i].displayAmount : vm.output[i].amount;
              vm.chargesReportTotal += parseFloat(vm.output[i].amount);
            }
            adjustmentAmount = parseInt(vm.chargesResponse.Report.preBillAdjustmentDisplayAmount);
            if (adjustmentAmount !== 0) {
              getAdjustmentDetails(idInterval);
            }
            else {
              vm.exportToCSV = false;
            }
          }else {
            vm.nodata = true;
          }
        }).catch(function(err) {
          vm.resetAdjustments();
          if (err.status === 404) {
            vm.nodata = true;
          }
        }).finally( function(){
          vm.loading = false;
        });
    }

    vm.resetAdjustments = function(){
      vm.nodata = true;
      vm.displayableAdjustments = vm.displayableAdjustmentsHeader = vm.exportableAdjustments = vm.exportableAdjustmentsDisplayKeys = [];
      vm.setOrUpdatePcaGridData();
    }

    function getBillSettings(billSettingId) {
      chargesService.getSettings(billSettingId)
        .then(function(response) {
          if (response) {
            vm.inlineAdjustments = response.data.billConfigs.inlineAdjustments;
            vm.inlineTax = response.data.billConfigs.inlineTax;
            vm.inlineAdjustments = (response.data.billConfigs.inlineAdjustments === 'F') ? 'false' : 'true';
            vm.inlineTax = (response.data.billConfigs.inlineTax === 'F') ? 'false' : 'true';
            vm.allowSelfCare = response.data.billConfigs.allowSelfCare;
            vm.hardClosedIntervals = response.data.billConfigs.hardClosedIntervals;
            $rootScope.$emit('allowSelfCare_editAccountInfo', vm.allowSelfCare);
            if($scope && $scope.$parent)
              $scope.$parent.$broadcast('hardClosedIntervals_editAccountInfo', vm.hardClosedIntervals);
            getProductReport();
          }
        })
        .catch(handleError);
    }

    function handleError(error) {
      logger.log('Error retrieving data. Please contact customer support.', error, COMPONENT_NAME);
    }

    function handleExportError() {
      angular.element(document).ready(function() {
        $('#hide-charges').hide();
      }, 1000);
    }

    function handleNscError(error) {
      logger.log('app.charges.chargesService.getNonStandardCharges():',
                  error );
      vm.isNscExist = false;
    }

    function showBillAdjustmentPopup($event) {
      if(vm.exportToCSV){
        if(!vm.isBillAdjustmentPopup){
          $scope.$emit('showBillAdjustmentPopup', true);
          if($event){
            var ele = angular.element($event.currentTarget).parent().prevObject;
            var xPos = ele.offset().top + angular.element(".ebMainContainer").scrollTop();
            var yPos = ele.offset().left;
            $timeout(function(){
              vm.positionElement(xPos, yPos);
              vm.setCardLayOutDetails();
            }, 10);
          }
        }
      }
    }

    function positionElement(xPos, yPos){
      var ele = angular.element('.ecb-billAdjustmentPopup');
      ele.show().css({'top' : (xPos - 40)+"px", 'left' : (yPos - (vm.isRTL? 25 : 120))+"px"});
      $timeout(function(){ele.trigger("click")}, 5);
    }

    function setCardLayOutDetails() {
      var billAdjustmentPopupData = {
        "componentName" : COMPONENT_NAME,
        "header" : ($filter('translate')('TEXT_PREBILL_ADJUSTMENTS')),
        "filename" : "PreviousBillAdjustments.csv",
        "currency" : 'currency',
        "dataList" : vm.adjustmentDetailsResponse,
        "exportList" : vm.exportableAdjustments,
        "exportListKeys" : vm.exportableAdjustmentsDisplayKeys
      };
      $scope.$emit('billAdjustmentPopupData', billAdjustmentPopupData);
    }

      function showNSCPopup($event) {
        if(!vm.isNSCPopup){
          $scope.$emit('showBillAdjustmentPopup', true);
          if($event){
            var element = angular.element($event.currentTarget).parent().prevObject;
            var xPosition = element.offset().top + angular.element(".ebMainContainer").scrollTop();
            var yPosition = element.offset().left;
            $timeout(function(){
              vm.positionElement(xPosition, yPosition);
              vm.setNSCCardLayoutDetails();
            }, 10);
          }
        }
      }
      function setNSCCardLayoutDetails() {
        var nscPopupData = {
          "componentName" : COMPONENT_NAME_NSC,
          "header" : ($filter('translate')('TEXT_NON_STANDARD_CHARGES')),
          "filename" : vm.nscFileName+".csv",
          "currency" : 'chargeCurrency',
          "dataList" : vm.nonStandardCharges,
          "exportList" : vm.exportableNsc,
          "exportListKeys" : vm.exportableNscDisplayKeys
        };
        $scope.$emit('nscPopupData', nscPopupData);
      }

    function showChargesExpandView() {
      if (vm.adjustmentDetailsArray) {
        closeWidgetExpandView();
        vm.chargesCardState = 'expanded';
        $scope.$emit('expanded', vm.chargesCardState, COMPONENT_NAME);
        vm.widgetOpen = true;
        vm.chargesWidgetOpen = true;
        if (vm.adjustmentDetailsArray.length > 0) {
          vm.adjustmentDetailsArrayHeader = Object.keys(vm.adjustmentDetailsArray[0]);
          var storageTabulardata = utilityService.gridSettingsStorageData(COMPONENT_NAME);
          var columnKeys = (storageTabulardata.activeColumns && (storageTabulardata.activeColumns).length > 0) ? storageTabulardata.activeColumns : vm.adjustmentDefaultColumnKeys;
          vm.checkboxSelection = vm.checkboxSelectionTemp = columnKeys;
          vm.freezeColumns = vm.freezeColumnsTemp = storageTabulardata.freezeColumns;
        }
        $scope.cardLayoutIndex = null;
        vm.viewAllBodyHeight();
        var prop = { "sortable": true, "filterable": true, sortKeys: vm.adjustmentSortKeys, filterKeys: vm.adjustmentFilterKeys, displayNames: vm.adjustmentDisplayableNameMap };
        $scope.$emit('widgetFilter', prop);
        setTabularView(true);
      }
    }

    function showNscExpandView() {
      if (vm.nonStandardCharges){
        closeWidgetExpandView();
        vm.chargesCardState = 'expanded';
        $scope.$emit('expanded', vm.chargesCardState, COMPONENT_NAME);
        vm.widgetOpen = true;
        vm.nscWidgetOpen = true;
        $scope.cardLayoutIndex = null;
        vm.viewAllBodyHeight();
        var prop = {
          "widget": "ecb-charges",
          "calendar": true,
          "sortable": true,
          "filterable": true,
          sortKeys: vm.nscSortKeys,
          filterKeys: vm.nscFilterKeys,
          displayNames: vm.nscDisplayableNameMap
        };
        $scope.$emit('widgetFilter', prop);
        setTabularView(true);
      }
    }

    function chargesExpandedStateclose() {
      vm.selectedFilters = {};
      vm.selectedSortKey = null;
      vm.chargesCardState = 'collapsed';
      closeWidgetExpandView();
      $scope.$emit('widgetFilter', {calendar : true});
      if (vm.isViewAllActivated) {
        $scope.emit('openChargeSummaryViewAll');
      }
      $scope.$emit('expanded', vm.chargesCardState, COMPONENT_NAME);
      $scope.$emit('dependentDirectiveViewChange', false, "ecb-charges");
    }

    function closeWidgetExpandView() {
      vm.widgetOpen = false;
      $scope.cardLayoutIndex = null;
      vm.isTabularViewSettings = false;
      vm.tabularView = false;
      vm.chargesWidgetOpen = false;
      vm.nscWidgetOpen = false;
      vm.miscAdjustWidgetOpen = false;
      vm.nscGridOptions = {};
      vm.gridOptions = {};
      vm.miscGridOptions = {};
    }

    function setbillAdjustmentDataCharges(data) {
      vm.billAdjustmentData = data;
      vm.adjustmentDetailsArray = [];
      vm.adjustmentDetailsLength = vm.billAdjustmentData.dataList.length;
      if(vm.adjustmentDetailsLength > 0){
        for(var i=0; i < vm.adjustmentDetailsLength; i++){
          if(vm.billAdjustmentData.dataList[i])
            vm.adjustmentDetailsArray.push(vm.billAdjustmentData.dataList[i]);
        }
      }
    }

    function chargesData(){
      return (!vm.nodata && !vm.widgetOpen) ? true : false;
    }

    function chargesError(){
      return (vm.exportError && !vm.widgetOpen) ? true : false;
    }

    function showChargesSettings() {
      return vm.widgetOpen && vm.tabularView;
    }

    vm.showChargesTabularCardView = function(view) {
      if(view == 'card'){
        vm.tabularView = false;
        vm.isTabularViewSettings = false;
      }else{
        vm.tabularView = true;
        if(vm.chargesWidgetOpen)
          vm.setChargesGridOptions();
        else if(vm.nscWidgetOpen)
          vm.setNscGridOptions();
        else if(vm.miscAdjustWidgetOpen)
          vm.setMiscAdjustGridOptions();
        vm.applyChargesCancelSettings(true);
      }
      $scope.cardLayoutIndex = null;
      vm.viewAllBodyHeight();
    }

    vm.getChargesActiveViewStyle = function(view) {
      return view == 'card' ? (vm.tabularView ? "ecb-cardTabularActiveView" : "ecb-cardTabularFadeView") : (!vm.tabularView ? "ecb-cardTabularActiveView" : "ecb-cardTabularFadeView");
    }

    vm.toggleChargesTabularViewSettings = function() {
      vm.isTabularViewSettings = vm.isTabularViewSettings ? false : true;
      vm.checkboxSelectionTemp = angular.copy(vm.checkboxSelection);
      vm.freezeColumnsTemp = angular.copy(vm.freezeColumns);
    }

    vm.isChargesSettings = function() {
      return vm.widgetOpen && vm.tabularView && vm.isTabularViewSettings;
    }

    vm.isChargesExpandCardView = function() {
      return vm.widgetOpen && !vm.tabularView && vm.chargesWidgetOpen;
    }

    vm.isNscExpandCardView = function() {
      return vm.widgetOpen && !vm.tabularView && vm.nscWidgetOpen;
    }

    vm.isChargesExpandTabularView = function() {
      return vm.widgetOpen && vm.tabularView && vm.chargesWidgetOpen;
    }

    vm.isNscExpandTabularView = function() {
      return vm.widgetOpen && vm.tabularView && vm.nscWidgetOpen;
    }

    vm.toggleChargesHeaderSelection = function(header) {
      var columnIndex = vm.checkboxSelectionTemp.indexOf(header);
      if (columnIndex > -1)
        vm.checkboxSelectionTemp.splice(columnIndex, 1);
      else
        vm.checkboxSelectionTemp.push(header);
    }

    vm.toggleChargesSelectAll = function(isAll) {
      if(vm.tabularView){
        var dataHeader = vm.chargesWidgetOpen ? angular.copy(vm.adjustmentDetailsArrayHeader) : (vm.nscWidgetOpen ? angular.copy(vm.nonStandardChargesHeader) : (vm.miscAdjustWidgetOpen ? angular.copy(vm.miscAdjustHeader) : []));
        vm.checkboxSelectionTemp = isAll == 1 ? dataHeader : angular.copy(vm.freezeColumns);
      }
    }

    vm.isAllColumnDeselected = function(){
      var chkBoxLen = 0;
      for(var i in vm.checkboxSelectionTemp){
        chkBoxLen = (vm.freezeColumns).indexOf(vm.checkboxSelectionTemp[i]) == -1 ? chkBoxLen + 1 : chkBoxLen;
      }
      return chkBoxLen == 0 ? true : false;
    }

    vm.applyChargesCancelSettings = function(isApply) {
      if (isApply) {
        vm.checkboxSelection = angular.copy(vm.checkboxSelectionTemp);
        vm.freezeColumns = angular.copy(vm.freezeColumnsTemp);
        if (vm.chargesWidgetOpen){
          vm.gridOptions.columnDefs = vm.getAdjustColumnDefinition();
        } else if (vm.nscWidgetOpen) {
          vm.nscGridOptions.columnDefs = vm.getNscColumnDefinition();
        } else if (vm.miscAdjustWidgetOpen){
          vm.miscGridOptions.columnDefs = vm.getMiscAdjustColumnDefinition();
        }
        var compName = vm.tabularView && vm.chargesWidgetOpen ? COMPONENT_NAME : (vm.tabularView && vm.nscWidgetOpen ? COMPONENT_NAME_NSC : null);
        utilityService.gridSettingsStorageData(compName, vm.checkboxSelection, vm.freezeColumns);
      }
      vm.isTabularViewSettings = false;
    }

    vm.getAdjustColumnDefinition = function() {
      return utilityService.setColumnDefinitions({columnKeys: vm.displayableAdjustmentsHeader, 
      selectedFilters: vm.selectedFilters, 
      configs: vm.adjustConfigs, 
      checkboxSelection: vm.checkboxSelection, 
      dispNameKeyMap: vm.adjustmentDisplayableNameMap, 
      freezeColumns: vm.freezeColumns, 
      sortKeys: vm.adjustmentSortKeys, 
      selectedSortKey: vm.selectedSortKey,
      sortOrder: vm.sortOrder });
    }

    vm.getNscColumnDefinition = function() {
      return utilityService.setColumnDefinitions({columnKeys: vm.displayableNSCHeader, 
      selectedFilters: vm.selectedFilters, 
      configs: vm.nscConfigs, 
      checkboxSelection: vm.checkboxSelection, 
      dispNameKeyMap: vm.nscDisplayableNameMap, 
      freezeColumns: vm.freezeColumns, 
      sortKeys: vm.nscSortKeys, 
      selectedSortKey: vm.selectedSortKey,
      sortOrder: vm.sortOrder });
    }
    vm.setChargesGridOptions = function() {
      vm.gridOptions = {
        data: vm.displayableAdjustments,
        columnDefs : vm.getAdjustColumnDefinition(),
        rowHeight : 32,
        enableColumnResizing : true,
        enableSorting: true,
        enableFiltering: true,
        appScopeProvider : vm,
        enableColumnMenus: false,
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
      vm.setOrUpdatePcaGridData();
    };

    vm.setOrUpdatePcaGridData = function() {
      if(!vm.gridOptions) return;
      vm.gridOptions.data = vm.displayableAdjustments;
      vm.gridOptions.columnDefs = vm.getAdjustColumnDefinition();
      if(vm.tabularGridApi) vm.tabularGridApi.core.refresh();
    }

    vm.viewAllBodyHeight = function(ele) {
      angular.element(".ecb-expandBody").ready(function() {
        vm.getViewAllBodyHeight();
      });
    }

    vm.getViewAllBodyHeight = function() {
      return utilityService.manageViewAllBodyHeight("ecb-chargesExpandMain.card-expanded");
    }

    vm.getSettingsHeight = function() {
      var height = $window.innerHeight;
      var systembarHeight = $document.find(".systemBar").height();
      var settingsHeader = $document.find(".ecb-settingsHeader").height();
      var settingsCheckboxHeader = $document.find(".ecb-settingsCheckboxHeader").height();
      if (height) return { "height": (height - (systembarHeight + settingsHeader + settingsCheckboxHeader + 40)) + "px" };
    }

    vm.setCardIndex = function(index){
      $scope.cardLayoutIndex = index;
      $scope.cardLayoutChanged = ($scope.cardLayoutChanged === true) ? false : true;
    }
    vm.setNscGridOptions = function() {
      vm.nscGridOptions = {
        data: vm.displayableNSC,
        columnDefs : vm.getNscColumnDefinition(),
        rowHeight : 32,
        enableColumnResizing : true,
        enableSorting: true,
        enableFiltering: true,
        appScopeProvider : vm,
        enableColumnMenus: false,
        showGridFooter: false,
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
      vm.setOrUpdateNscGridData();
    };

    vm.setOrUpdateNscGridData = function() {
      if(!vm.nscGridOptions) return;
      vm.nscGridOptions.data = vm.displayableNSC;
      vm.nscGridOptions.columnDefs = vm.getNscColumnDefinition();
      if(vm.tabularGridApi) vm.tabularGridApi.core.refresh();
    }

    vm.isChargesDetailsView = function(){
      return (vm.widgetOpen && vm.chargesWidgetOpen) ? true : false;
    }

    vm.isNscDetailsView = function(){
      return (vm.widgetOpen && vm.nscWidgetOpen) ? true : false;
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
      if(unfreezeColumns && vm.checkboxSelectionTemp.indexOf(header) == -1) return;
      var columnIndex = vm.freezeColumnsTemp.indexOf(header);
      if (columnIndex > -1)
        vm.freezeColumnsTemp.splice(columnIndex, 1);
      else
        vm.freezeColumnsTemp.push(header);
    }

    function getNonStandardChargesSettings(callback) {
      utilityService.getResponseConfigJson(vm.nscFileName)
        .then(function(response) {
          var fileds = response.data.columns.fields;
          vm.processNSCDetails(fileds, callback);
      }).catch(function(error) {
        vm.processNSCDetails(null, callback);
      });
    }

    vm.getNscDisplayName = function(key) {
      return vm.nscDisplayableNameMap[key] ? vm.nscDisplayableNameMap[key] : key;
    }

    //TO DO : get data by passing subscriber account id instead of filter with subAcctId. Service need to update
    function filterSubscriberRecord(response, type, details, subAcctId, amount) {
      if(response) {
        var records = [];
        var resRecords = response[type][details];
        response[type].totalCharge = 0;
        for(var index in resRecords) {
          if(!utilityService.isObject(vm.subscriberAccountId) || resRecords[index][subAcctId] === vm.subscriberAccountId) {
            records.push(resRecords[index]);
            response[type].totalCharge += resRecords[index][amount];
          }
        }
        response[type][details] = records;
      }
      return response;
    }

    function processNSCDetails(configFields, callback){
      var idInterval = utilityService.getOrSetSelectedTimeInterVal().idInterval;
      chargesService.getNonStandardCharges(idInterval, vm.accountId, vm.calendarStartDate, vm.calendarEndDate)
        .then(function(response) {
          if (response) {
            response.data = filterSubscriberRecord(response.data, 'nscDetails', 'nonStandardCharges',
              'subscriberAccountId', 'chargeAmount');
            var nonStandardChargesData = response.data;
            vm.nscAmount = parseInt(nonStandardChargesData.nscDetails.totalCharge) || 0;
            vm.nscCurrency = '';
              vm.nonStandardCharges = nonStandardChargesData.nscDetails.nonStandardCharges;
              vm.isNscExist = (vm.nscAmount !== 0) ? true : false;
              if (vm.nonStandardCharges && vm.nonStandardCharges.length > 0 && configFields) {
                vm.nscCurrency = vm.nonStandardCharges[0].chargeCurrency;
                var configInfo = utilityService.processExternalConfigJson(vm.nonStandardCharges, configFields);
                  vm.displayableNSC = configInfo["isColumnDataList"];
                  vm.nscDisplayableNameMap = configInfo["displayableNames"];
                  vm.nscDisplayableNameMapHeader = configInfo["isColumnDisplayableNames"];
                  vm.displayableNSCHeader = utilityService.getKeysForDataList(vm.displayableNSC);
                  vm.nscSortKeys = configInfo["sortableKeys"];
                  vm.nscFilterKeys = configInfo["filterableKeys"];
                  vm.nscDefaultColumnKeys = configInfo["defaultColumnKeys"];
                  vm.nscConfigs = configInfo["configFields"];
                  vm.exportableNsc = configInfo["exportableDataList"];
                  vm.exportableNscDisplayKeys = configInfo["exportableDataListDisplayKeys"];
                  vm.nonStandardChargesHeader = Object.keys(vm.nonStandardCharges[0]);
                  var storageTabulardata = utilityService.gridSettingsStorageData(COMPONENT_NAME_NSC);
                  var columnKeys = (storageTabulardata.activeColumns && (storageTabulardata.activeColumns).length > 0) ? storageTabulardata.activeColumns : vm.displayableNSCHeader;
                  vm.checkboxSelection = vm.checkboxSelectionTemp = columnKeys;
                  vm.freezeColumns = vm.freezeColumnsTemp = storageTabulardata.freezeColumns;
              }else{
                vm.resetNscData();
              }
            vm.setOrUpdateNscGridData();
          }
          if(typeof callback == 'function') callback();
        }).catch(function(error) {
          vm.resetNscData();
          switch (error.status) {
            case 500:
            case 400:
            case 404:
            case 412:
            case 403:
            case 405:
              handleNscError(error);
              break;
          }
          if(typeof callback == 'function') callback();
        });
    }

    vm.resetNscData = function(){
      vm.displayableNSC = vm.displayableNSCHeader = [];
      vm.setOrUpdateNscGridData();
    }

    function getAdjustmentDetails(idInterval) {
      utilityService.getResponseConfigJson(vm.prebillFileName)
        .then(function(response) {
          var fileds = response.data.columns.fields;
          vm.processAdjustmentDetails(idInterval, fileds);
      }).catch(function(error) {
        vm.processAdjustmentDetails(idInterval, null);
      });
    }

    vm.getAdjustmentDisplayName = function(key) {
      return vm.adjustmentDisplayableNameMap[key] ? vm.adjustmentDisplayableNameMap[key] : key;
    }

    function processAdjustmentDetails(idInterval, configFields) {
      vm.exportToCSV = true;
      chargesService.exportPreBillAdjustments(idInterval, vm.accountId)
        .then(function(response) {
          if (response) {
            vm.adjustmentDetailsResponse = response.data.adjustmentDetails;
            if (vm.adjustmentDetailsResponse && vm.adjustmentDetailsResponse.length > 0 && configFields) {
              var configInfo = utilityService.processExternalConfigJson(vm.adjustmentDetailsResponse, configFields);
              vm.displayableAdjustments = configInfo["isColumnDataList"];
              vm.exportableAdjustments = configInfo["exportableDataList"];
              vm.exportableAdjustmentsDisplayKeys = configInfo["exportableDataListDisplayKeys"];
              vm.adjustmentDisplayableNameMap = configInfo["displayableNames"];
              //vm.adjustmentDisplayableNameHeader = configInfo["isColumnDisplayableNames"];
              vm.displayableAdjustmentsHeader = utilityService.getKeysForDataList(vm.displayableAdjustments);
              vm.adjustmentSortKeys = configInfo["sortableKeys"];
              vm.adjustmentFilterKeys = configInfo["filterableKeys"];
              vm.adjustmentDefaultColumnKeys = configInfo["defaultColumnKeys"];
              vm.adjustConfigs = configInfo["configFields"];
            }
          }
          vm.setOrUpdatePcaGridData();
          vm.setCardLayOutDetails();
        }).catch(function(error) {
        switch (error.status) {
          case 500:
          case 400:
          case 404:
          case 412:
          case 403:
          case 405:
            vm.exportError = true;
            handleExportError();
            break;
        }
      });
    }

    vm.getSortByColumn = function(defaultKey) {
      return vm.selectedSortKey ? vm.selectedSortKey : defaultKey;
    }

    function setBillsView() {
      $rootScope.$emit('setSelectedViewOn', 'bills');
    }

    function getMiscAdjustSettings(callback) {
          utilityService.getResponseConfigJson(vm.miscAdjFileName)
          .then(function(response) {
            var fileds = response.data.columns.fields;
            vm.processMiscAdjustDetails(fileds, callback);
        }).catch(function(error) {
          vm.processMiscAdjustDetails(null, callback);
        });
    }

    function processMiscAdjustDetails(configFields, callback){
      var idInterval = utilityService.getOrSetSelectedTimeInterVal().idInterval;
      vm.isMiscAdjustExist = false;
      chargesService.getMiscAdjustDetails(idInterval, vm.calendarStartDate, vm.calendarEndDate, vm.accountId)
        .then(function(response) {
          if (response) {
            if(response.data && response.data.miscAdjDetail && userSettings.settings.billing.inlineTax == 'T') {
              response.data['miscAdjDetail']['miscAdjDetails'].forEach(function(record) {
                record.amount = record.c_creditamount;
              });
            }
            response.data = filterSubscriberRecord(response.data, 'miscAdjDetail', 'miscAdjDetails',
              'c_subscriberaccountid', 'amount');
            var miscellaneousAdjustData = response.data;
            if(miscellaneousAdjustData.miscAdjDetail)
              vm.miscAdjustTotalAmount = parseFloat((miscellaneousAdjustData.miscAdjDetail.totalAmount) || 0.00);
              vm.mscCurrency = '';
              vm.miscellaneousAdjustments = miscellaneousAdjustData.miscAdjDetail.miscAdjDetails;
              vm.isMiscAdjustExist = vm.miscAdjustTotalAmount !== 0 ? true : false;
              if(vm.miscellaneousAdjustments && vm.miscellaneousAdjustments.length > 0){
                vm.mscCurrency = vm.miscellaneousAdjustments[0].currency;
                vm.noMiscAdjustments = false;
                if (configFields) {
                    var configInfo = utilityService.processExternalConfigJson(vm.miscellaneousAdjustments, configFields);
                    vm.displayableMiscAdjust = configInfo["isColumnDataList"];
                    vm.miscAdjustDisplayableNameMap = configInfo["displayableNames"];
                    vm.miscAdjustDisplayableNameMapHeader = configInfo["isColumnDisplayableNames"];
                    vm.miscAdjustDisplayableHeader = utilityService.getKeysForDataList(vm.displayableMiscAdjust);
                    vm.miscAdjustSortKeys = configInfo["sortableKeys"];
                    vm.miscAdjustFilterKeys = configInfo["filterableKeys"];
                    vm.miscAdjustDefaultColumnKeys = configInfo["defaultColumnKeys"];
                    vm.miscAdjustConfigs = configInfo["configFields"];
                    vm.exportableMiscAdjust = configInfo["exportableDataList"];
                    vm.exportableMiscAdjustDisplayKeys = configInfo["exportableDataListDisplayKeys"];
                    vm.miscAdjustHeader = Object.keys(vm.miscellaneousAdjustments[0]);
                    var storageTabulardata = utilityService.gridSettingsStorageData(COMPONENT_NAME_MISCADJUST);
                    var columnKeys = (storageTabulardata.activeColumns && (storageTabulardata.activeColumns).length > 0) ? storageTabulardata.activeColumns : vm.miscAdjustSortKeys;
                    vm.checkboxSelection = vm.checkboxSelectionTemp = columnKeys;
                    vm.freezeColumns = vm.freezeColumnsTemp = storageTabulardata.freezeColumns;
                }
              }else{
                vm.noMiscAdjustments = true;
                vm.resetMiscAdjustData();
              }
            vm.setOrUpdateMiscAdjustGridData();
          }
          if(typeof callback == 'function') callback();
        }).catch(function(error) {
          switch (error.status) {
            case 500:
            case 400:
            case 404:
            case 412:
            case 403:
            case 405:
              handleMiscAdjustError(error);
              break;
          }
          if(typeof callback == 'function') callback();
        }).finally(function(){
          vm.loading = false;
        });
    }

    vm.resetMiscAdjustData = function(){
      vm.displayableMiscAdjust = vm.miscAdjustDisplayableHeader = [];
      vm.setOrUpdateMiscAdjustGridData();
    }

    function handleMiscAdjustError(error) {
      logger.log('app.charges.chargesService.getMiscAdjustDetails():',
                  error );
      vm.isMiscAdjustExist = false;
    }

    function showMiscAdjustPopup($event) {
      $scope.$emit('showBillAdjustmentPopup', true);
      if($event){
        var element = angular.element($event.currentTarget).parent().prevObject;
        var xPosition = element.offset().top + angular.element(".ebMainContainer").scrollTop();
        var yPosition = element.offset().left;
        $timeout(function(){
          vm.positionElement(xPosition, yPosition);
          setMiscAdjustLayoutDetails();
        }, 10);
      }
    }
    function setMiscAdjustLayoutDetails() {
      var miscAdjustPopupData = {
        "componentName" : COMPONENT_NAME_MISCADJUST,
        "header" : ($filter('translate')('TEXT_MISC_ADJUSTMENTS')),
        "filename" : vm.miscAdjFileName+".csv",
        "currency" : 'currency',
        "accountId" : vm.accountId,
        "dataList" : vm.miscellaneousAdjustments,
        "exportList" : vm.exportableMiscAdjust,
        "exportListKeys" : vm.exportableMiscAdjustDisplayKeys
      };
      $scope.$emit('miscAdjustPopupData', miscAdjustPopupData);
    }

    function showMiscAdjustExpandView() {
      if (vm.miscellaneousAdjustments){
        closeWidgetExpandView();
        vm.chargesCardState = 'expanded';
        $scope.$emit('expanded', vm.chargesCardState, COMPONENT_NAME);
        vm.widgetOpen = true;
        vm.miscAdjustWidgetOpen = true;
        $scope.cardLayoutIndex = null;
        vm.viewAllBodyHeight();
        var prop = {
          "widget": "ecb-charges",
          "calendar": true,
          "sortable": true,
          "filterable": true,
          sortKeys: vm.miscAdjustSortKeys,
          filterKeys: vm.miscAdjustFilterKeys,
          displayNames: vm.miscAdjustDisplayableNameMap
        };
        $scope.$emit('widgetFilter', prop);
        setTabularView(true);
      }
    }

    vm.setMiscAdjustGridOptions = function() {
      vm.miscGridOptions = {
        data: vm.displayableMiscAdjust,
        columnDefs : vm.getMiscAdjustColumnDefinition(),
        rowHeight : 32,
        enableColumnResizing : true,
        enableSorting: true,
        enableFiltering: true,
        appScopeProvider : vm,
        enableColumnMenus: false,
        showGridFooter: false,
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
      vm.setOrUpdateMiscAdjustGridData();
    };

    vm.getMiscAdjustColumnDefinition = function() {
      return utilityService.setColumnDefinitions({columnKeys: vm.miscAdjustDisplayableHeader, 
      selectedFilters: vm.selectedFilters, 
      configs: vm.miscAdjustConfigs, 
      checkboxSelection: vm.checkboxSelection, 
      dispNameKeyMap: vm.miscAdjustDisplayableNameMap, 
      freezeColumns: vm.freezeColumns, 
      sortKeys: vm.miscAdjustSortKeys, 
      selectedSortKey: vm.selectedSortKey,
      sortOrder: vm.sortOrder });
    }

    vm.setOrUpdateMiscAdjustGridData = function() {
      if(!vm.miscGridOptions) return;
      vm.miscGridOptions.data = vm.displayableMiscAdjust;
      vm.miscGridOptions.columnDefs = vm.getMiscAdjustColumnDefinition();
      if(vm.tabularGridApi) vm.tabularGridApi.core.refresh();
    }

    vm.getMiscAdjustDisplayName = function(key) {
      return vm.miscAdjustDisplayableNameMap[key] ? vm.miscAdjustDisplayableNameMap[key] : key;
    }

    vm.isMiscAdjustDetailsView = function(){
      return (vm.widgetOpen && vm.miscAdjustWidgetOpen) ? true : false;
    }

    vm.isMiscAdjustExpandCardView = function() {
      return vm.widgetOpen && !vm.tabularView && vm.miscAdjustWidgetOpen;
    }

    vm.isMiscAdjustExpandTabularView = function() {
      return vm.widgetOpen && vm.tabularView && vm.miscAdjustWidgetOpen;
    }

    vm.expandDpendentChargePopup = function(type){
      if(type == 'MiscAdjustment') {
        showMiscAdjustExpandView();
      }else {
        showNscExpandView();
      }
    }

    vm.showHideBillPopup = function(data, $event, type) {
      if(data == false && vm.popupTimer) {
        clearTimeout(vm.popupTimer);
      }else {
        vm.popupTimer = setTimeout(function() {
          clearTimeout(vm.popupTimer);
          if(type == 'misc')
            vm.showMiscAdjustPopup($event);
          else if(type == 'nsc')
            vm.showNSCPopup($event);
          else if(type == 'adjust')
            vm.showBillAdjustmentPopup($event);
        }, utilityService.hoverDelay);
      }
    }

    vm.getCurrencySign = function(code) {
      return utilityService.getCurrencySign(code);
    }

    vm.getDataAsPerView = function() {
      if(vm.isChargesDetailsView()) return {data: vm.exportableAdjustments, header : vm.exportableAdjustmentsDisplayKeys, fileName: vm.prebillFileName+".csv"};
      else if(vm.isMiscAdjustDetailsView()) return {data: vm.exportableMiscAdjust, header : vm.exportableMiscAdjustDisplayKeys, fileName: vm.miscAdjFileName+".csv"};
      else if(vm.isNscDetailsView()) return {data: vm.exportableNsc, header : vm.exportableNscDisplayKeys, fileName: vm.nscFileName+".csv"};
    }

    vm.currencyFormatter = function(value, code, isSymbol) {
      return utilityService.currencyFormatter(value, code, isSymbol);
    }

    $scope.$on('$destroy',function() {
      utilityService.cleanUpListners(unregisterChargesEvents);
    });
  }
})();
