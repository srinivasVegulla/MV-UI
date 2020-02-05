/* jslint maxlen: 250 */
//jscs:disable maximumLineLength
(function() {
  'use strict';
  angular
    .module('app.payments-credits-adjustments')
    .controller('paymentsCreditsAdjustmentsController', Controller);
  Controller.$inject = [
    '$scope',
    '$rootScope',
    'paymentsCreditsAdjustmentsService',
    'accountService',
    'paymentsReceivedModalService',
    'logger',
    '$filter',
    '$timeout',
    'localStorageService',
    '$window',
    'utilityService',
    '$document',
    'translatorHelper'
  ];

  /* @ngInject */
  function Controller(
    $scope,
    $rootScope,
    paymentsCreditsAdjustmentsService,
    accountService,
    paymentsReceivedModalService,
    logger,
    $filter,
    $timeout,
    localStorageService,
    $window,
    utilityService,
    $document,
    translatorHelper) {
    var vm = this,
      COMPONENT_NAME = 'PaymentsCreditsAdjustments',
      COMPONENT_NAME_PR = 'PaymentsReceived',
      filterInterval,
      pcaPayments,
      pcaBillAdjustmentPopup,
      pcaBillAdjustmentViewAll,
      pcaBillAdjustmentPopupData,
      adjustmentAmount = 0,
      sortKeyFilter;
    vm.invoiceResp = '';
    vm.nodata = false;
    vm.exportToCSV = false;
    vm.getAdjustmentDetailsHeader = [];
    vm.adjustmentDetailsResponse = [];
    vm.exportError = false;
    vm.handleExportError = handleExportError;
    vm.totalPaymentsReceived = false;
    vm.viewPaymentTransactions = paymentsReceivedModalService.open;
    vm.showBillAdjustmentPopup = showBillAdjustmentPopup;
    vm.isBillAdjustmentPopup = false;
    vm.positionElement = positionElement;
    vm.setCardLayOutDetails = setCardLayOutDetails;
    vm.paymentsCreditsAdjustmentsExpandedView = paymentsCreditsAdjustmentsExpandedView;
    vm.pcaCardState = 'collapsed';
    vm.pcaClose = false;
    vm.pcaWidgetOpen = false;
    vm.billAdjustmentData = null;
    vm.itemsPerCard = 10;
    vm.pcaExpandedStateclose = pcaExpandedStateclose;
    vm.setbillAdjustmentDataPca = setbillAdjustmentDataPca;
    vm.paymentsCreditAdjustmentData = paymentsCreditAdjustmentData;
    vm.pcaError = pcaError;
    $scope.cardLayoutChanged = true;
    $scope.cardLayoutIndex = null;
    vm.pcaFlexdirection = pcaFlexdirection;
    vm.showPcaChargesSettings = showPcaChargesSettings;
    vm.tabularView = false;
    vm.isTabularViewSettings = false;
    vm.gridOptions = {};
    vm.paymentGridOptions = {};
    vm.adjustmentDetailsArrayHeader = [];
    vm.payReceivedDetailsHeader = [];
    vm.adjustmentDetailsArray = [];
    vm.checkboxSelection = [];
    vm.checkboxSelectionTemp = [];
    vm.gridColMinWidth = 140;
    var unregisterPcaEvents = [];
    vm.showPaymentsReceivedPopup = showPaymentsReceivedPopup;
    vm.isPaymentsReceivedPopup = false;
    vm.payReceivedDetails = [];
    vm.paymentsReceivedExpandedView = paymentsReceivedExpandedView;
    vm.getPaymentReceivedDetails = getPaymentReceivedDetails;
    vm.setPaymentsReceivedCardLayoutDetails = setPaymentsReceivedCardLayoutDetails;
    vm.paymentsReceivedWidgetOpen = false;
    vm.adjustmentDetailsFileName = "PostBill";
    vm.getAdjustmentDetails = getAdjustmentDetails;
    vm.processAdjustmentDetails = processAdjustmentDetails;
    vm.adjustmentDisplayableNameMap = [];
    vm.displayableAdjustments = null;
    vm.displayableAdjustmentsHeader = null;
    vm.displayablePayReceived = null;
    vm.displayablePayReceivedHeader = null;
    vm.paymentReceivedFileName = "PaymentReceived";
    vm.processPaymentReceivedDetails = processPaymentReceivedDetails;
    vm.payReceivedDisplayableNameMap = [];
    vm.freezeColumnsTemp = [];
    vm.freezeColumns = [];
    vm.selectedSortKey =  null;
    vm.selectedFilters = {};
    vm.setTabularView = setTabularView;
    vm.sortOrder = null;
    vm.widgetOpen = false;
    vm.getPayCreditAdjust = getPayCreditAdjust;

    $scope.$watch('accountId', function(acctId){
      if (!acctId){
        return;
      }
      vm.accountId = acctId;
      activate();
    });

    function activate() {
      filterInterval = $scope.$on('show_filter_intervals', function(event, idInterval, data) {
        var cardState = utilityService.cardState;
        if((cardState.expand == vm.widgetOpen) || (cardState.expand != vm.widgetOpen && cardState.widget == COMPONENT_NAME)) {
          vm.initiateWidgetServices();
        }
      });
      vm.initiateWidgetServices();
      pcaPayments = $rootScope.$on('paymentDone', function() {
        getPayCreditAdjust();
      });

      pcaBillAdjustmentPopup = $rootScope.$on('isBillAdjustmentPopup', function(event, data) {
        vm.isBillAdjustmentPopup = data;
      });

      pcaBillAdjustmentViewAll = $rootScope.$on('billAdjustmentViewAllClick', function(event, data) {
        if(data == COMPONENT_NAME) {
          vm.paymentsCreditsAdjustmentsExpandedView();
        }
      });

      pcaBillAdjustmentPopupData = $rootScope.$on('billAdjustmentPopupData', function(event, data) {
        vm.setbillAdjustmentDataPca(data);
      });

      sortKeyFilter = $rootScope.$on('filter_criteria_event', function(event, sortKey, filterItems) {
        if(vm.widgetOpen){
          vm.sortOrder = (vm.selectedSortKey == sortKey && vm.sortOrder == 'desc') ? 'asc' : 'desc';
          vm.selectedFilters = {};
          vm.selectedSortKey = null;
          if(sortKey) vm.selectedSortKey = sortKey;
          if(filterItems) vm.selectedFilters = filterItems;
          if(vm.tabularView == true) vm.applyPcaCancelSettings(true);
        }
      });

      angular.element($window).on('resize', function () {
        if(vm.widgetOpen){
          vm.viewAllBodyHeight();
          vm.getSettingsHeight();
          setTabularView(false);
        }
      });

      unregisterPcaEvents.push(filterInterval);
      unregisterPcaEvents.push(pcaPayments);
      unregisterPcaEvents.push(pcaBillAdjustmentPopup);
      unregisterPcaEvents.push(pcaBillAdjustmentViewAll);
      unregisterPcaEvents.push(pcaBillAdjustmentPopupData);
      unregisterPcaEvents.push(sortKeyFilter);
    }

    vm.initiateWidgetServices = function() {
      vm.loading = true;
      var interval = utilityService.getOrSetSelectedTimeInterVal();
      vm.invoiceNumber = (interval && interval.dateRange && interval.dateRange.invoiceNumber)? interval.dateRange.invoiceNumber : '';
      vm.onDemandInterval = interval && interval.dateRange ? interval.dateRange.onDemandInterval : '';
      getPayCreditAdjust();
      getPaymentReceivedDetails();
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

    function setTabularView(isInitialCall) {
      var width = $window.innerWidth;
      if (isInitialCall) {
        (width > 991) ? (vm.showPcaChargesTabularCardView('table')) : (vm.showPcaChargesTabularCardView('card'));
      } else {
        if (width < 768) {
          vm.tabularView ? vm.showPcaChargesTabularCardView('card') : '';
        }
      }
    }

    function getPayCreditAdjust() {
      vm.loading = true;
      var idInterval = utilityService.getOrSetSelectedTimeInterVal().idInterval;
     paymentsCreditsAdjustmentsService.getPayCreditAdjust(idInterval, vm.accountId, vm.invoiceNumber)
        .then(function(response) {
          if (response) {
            vm.resetAdjustments();
            vm.invoiceResp = response.data.invoiceReport;
            adjustmentAmount = parseInt(vm.invoiceResp.totalpostBillAdjustments);
            vm.previousbalance = vm.invoiceResp.previousBalances;
            var paymentsReceived = parseInt(vm.invoiceResp.totalPayment);
            if(paymentsReceived === 0) {
              vm.totalPaymentsReceived = false;
            } else {
              vm.totalPaymentsReceived = true;
            }
            vm.nodata = false;
            vm.flexDirection = (vm.previousbalance.previousBalance.toString().length > 13);
            if (adjustmentAmount !== 0) {
              vm.exportToCSV = true;
              vm.getAdjustmentDetails();
            }
            else {
              vm.exportToCSV = false;
            }
          }
        }).catch(function(err) {
          vm.resetAdjustments();
          if (err.status === 404) {
            vm.nodata = true;
          }
        }).finally(function () {
         vm.loading = false;
       });
    }

    function getAdjustmentDetails() {
      utilityService.getResponseConfigJson(vm.adjustmentDetailsFileName)
        .then(function(response) {
          var fileds = response.data.columns.fields;
          vm.processAdjustmentDetails(fileds);
      }).catch(function(error) {
        logger.log('Error occured in app.payments-received.getResponseConfigJson()', {
          error: error
        });
        vm.processAdjustmentDetails(null);
      });
    }

    vm.getAdjustmentDetailsHeaderKey = function(key) {
      return vm.adjustmentDisplayableNameMap[key] ? vm.adjustmentDisplayableNameMap[key] : key;
    }

    function processAdjustmentDetails(configFields) {
      var idInterval = utilityService.getOrSetSelectedTimeInterVal().idInterval;
      paymentsCreditsAdjustmentsService.exportPostBillAdjustments(idInterval, vm.accountId)
      .then(function(response) {
        if (response) {
          vm.adjustmentDetailsResponse = response.data.adjustmentDetails;
          if (vm.adjustmentDetailsResponse && vm.adjustmentDetailsResponse.length > 0 && configFields) {
            vm.nodata = false;
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
          vm.setOrUpdatePcaGridData();
        }
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
          vm.resetAdjustments();
          break;
      }
    });
  }
    vm.resetAdjustments = function(){
      vm.nodata = true;
      vm.displayableAdjustments = vm.displayableAdjustmentsHeader = vm.exportableAdjustments = vm.exportableAdjustmentsDisplayKeys = [];
      vm.setOrUpdatePcaGridData();
    }

    function getPaymentReceivedDetails() {
      utilityService.getResponseConfigJson(vm.paymentReceivedFileName)
        .then(function(response) {
          var fileds = response.data.columns.fields;
          vm.processPaymentReceivedDetails(fileds);
      }).catch(function(error) {
        logger.log('Error occured in app.payments-received.getResponseConfigJson()', {
          error: error
        });
        vm.processPaymentReceivedDetails(null);
      });
    }

    vm.getPaymentReceivedHeaderKey = function(key) {
      return vm.payReceivedDisplayableNameMap[key] ? vm.payReceivedDisplayableNameMap[key] : key;
    }

    function processPaymentReceivedDetails(configFields) {
      var idInterval = utilityService.getOrSetSelectedTimeInterVal().idInterval;
      paymentsReceivedModalService.getPayments(vm.accountId, idInterval)
        .then(function(response) {
          if(response) {
            var payReceivedResponse = angular.copy(response);
            if(payReceivedResponse.payments && payReceivedResponse.payments.length > 0 && configFields) {
              vm.payReceivedDetails = payReceivedResponse.payments;
              vm.payReceivedDetailsHeader = Object.keys(payReceivedResponse.payments[0]);
              var configInfo = utilityService.processExternalConfigJson(payReceivedResponse.payments, configFields);
              vm.displayablePayReceived = configInfo["isColumnDataList"];
              vm.payReceivedDisplayableNameMap = configInfo["displayableNames"];
              vm.payReceivedDisplayableNameHeader = configInfo["isColumnDisplayableNames"];
              vm.displayablePayReceivedHeader = utilityService.getKeysForDataList(vm.displayablePayReceived);
              vm.payReceivedSortKeys = configInfo["sortableKeys"];
              vm.payReceivedFilterKeys = configInfo["filterableKeys"];
              vm.payReceivedDefaultColumnKeys = configInfo["defaultColumnKeys"];
              vm.payReceivedConfigs = configInfo["configFields"];
              vm.exportablePayReceived = configInfo["exportableDataList"];
              vm.exportablePayReceivedDisplayKeys = configInfo["exportableDataListDisplayKeys"];
            }else{
              vm.resetPaymentData();
            }
          }
          vm.setPaymentsReceivedGridData();
        }).catch(function(error) {
          vm.resetPaymentData();
          logger.log('Error occured in app.payments-received.getPayments()', {
            error: error
          });
        });
    }

    vm.resetPaymentData = function(){
      vm.displayablePayReceived = vm.displayablePayReceivedHeader = [];
      vm.setPaymentsReceivedGridData();
    }

    function handleExportError(error, accountId) {
      angular.element(document).ready(function() {
        $('#hide-previousPeriodBalance').hide();
      }, 1000);
    }

    function showBillAdjustmentPopup($event) {
      if(vm.exportToCSV) {
        if(!vm.isBillAdjustmentPopup) {
          $scope.$emit('showBillAdjustmentPopup', true);
          if($event) {
            var ele = angular.element($event.currentTarget).parent().prevObject;
            var xPos = ele.offset().top + angular.element(".ebMainContainer").scrollTop();
            var yPos = ele.offset().left;
            $timeout(function() {
              vm.positionElement(xPos, yPos);
              vm.setCardLayOutDetails();
            }, 10);
          }
        }
      }
    }

    function showPaymentsReceivedPopup($event) {
      if(vm.totalPaymentsReceived) {
        if(!vm.isPaymentsReceivedPopup) {
          $scope.$emit('showBillAdjustmentPopup', true);
          if($event) {
            var element = angular.element($event.currentTarget).parent().prevObject;
            var xPosition = element.offset().top + angular.element(".ebMainContainer").scrollTop();
            var yPosition = element.offset().left;
            $timeout(function() {
              vm.positionElement(xPosition, yPosition);
              vm.setPaymentsReceivedCardLayoutDetails();
            }, 10);
          }
        }
      }
    }

    function positionElement(xPos, yPos) {
      var ele = angular.element('.ecb-billAdjustmentPopup');
      ele.show().css({'top' : (xPos - 40)+"px", 'left' : (yPos - (vm.isRTL? 25 : 120))+"px"});
      $timeout(function() {ele.trigger("click")}, 5);
    }

    function setCardLayOutDetails() {
      var billAdjustmentPopupData = {
        "componentName" : COMPONENT_NAME,
        "header" : ($filter('translate')('TEXT_POSTBILL_ADJUSTMENTS')),
        "filename" : "PostBillAdjustments.csv",
        "currency" : 'currency',
        "dataList" : vm.adjustmentDetailsResponse,
        "exportList" : vm.exportableAdjustments,
        "exportListKeys" : vm.exportableAdjustmentsDisplayKeys
      };
      $scope.$emit('billAdjustmentPopupData', billAdjustmentPopupData);
    }

    function setPaymentsReceivedCardLayoutDetails() {
      var billAdjustmentPopupData = {
        "componentName" : COMPONENT_NAME_PR,
        "header" : ($filter('translate')('TEXT_PAYMENTS_RECEIVED')),
        "filename" : "PaymentsReceived.csv",
        "currency" : 'currency',
        "dataList" : vm.payReceivedDetails,
        "exportList" : vm.exportablePayReceived,
        "exportListKeys" : vm.exportablePayReceivedDisplayKeys
      };
      $scope.$emit('billAdjustmentPopupData', billAdjustmentPopupData);
    }

    function paymentsCreditsAdjustmentsExpandedView() {
      if (vm.adjustmentDetailsArray) {
        closeWidgetExpandView();
        vm.pcaCardState = 'expanded';
        vm.pcaClose = true;
        $scope.$emit('expanded', vm.pcaCardState, COMPONENT_NAME);
        vm.widgetOpen = true;
        vm.pcaWidgetOpen = true;
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

    function paymentsReceivedExpandedView() {
      closeWidgetExpandView();
      vm.pcaCardState = 'expanded';
      vm.pcaClose = true;
      $scope.$emit('expanded', vm.pcaCardState, COMPONENT_NAME);
      vm.widgetOpen = true;
      vm.paymentsReceivedWidgetOpen = true;
      if(vm.payReceivedDetails) {
        //vm.payReceivedDetailsHeader = Object.keys(vm.payReceivedDetails[0]);
        var storageTabulardata = utilityService.gridSettingsStorageData(COMPONENT_NAME_PR);
        var columnKeys = (storageTabulardata.activeColumns && (storageTabulardata.activeColumns).length > 0) ? storageTabulardata.activeColumns : vm.payReceivedDefaultColumnKeys;
        vm.checkboxSelection = vm.checkboxSelectionTemp = columnKeys;
        vm.freezeColumns = vm.freezeColumnsTemp = storageTabulardata.freezeColumns;
      }
      $scope.cardLayoutIndex = null;
      vm.viewAllBodyHeight();
      var prop = {"sortable" : true, "filterable" : true, sortKeys : vm.payReceivedSortKeys, filterKeys : vm.payReceivedFilterKeys, displayNames : vm.payReceivedDisplayableNameMap};
      $scope.$emit('widgetFilter', prop);
      setTabularView(true);
    }

    function pcaExpandedStateclose() {
      vm.selectedFilters = {};
      vm.selectedSortKey = null;
      vm.pcaCardState = 'collapsed';
      vm.pcaClose = false;
      closeWidgetExpandView();
      $scope.$emit('expanded', vm.pcaCardState, COMPONENT_NAME);
      $scope.$emit('widgetFilter', {});
    }

    function closeWidgetExpandView() {
      vm.widgetOpen = false;
      $scope.cardLayoutIndex = null;
      vm.isTabularViewSettings = false;
      vm.tabularView = false;
      vm.paymentsReceivedWidgetOpen = false;
      vm.pcaWidgetOpen = false;
      vm.gridOptions = {};
      vm.paymentGridOptions = {};
    }

    function setbillAdjustmentDataPca(data) {
      vm.billAdjustmentData = data;
      vm.adjustmentDetailsArray = [];
      vm.adjustmentDetailsLength = vm.billAdjustmentData.dataList.length;
      if(vm.adjustmentDetailsLength > 0) {
        for(var i=0; i < vm.adjustmentDetailsLength; i++) {
          if(vm.billAdjustmentData.dataList[i])
            vm.adjustmentDetailsArray.push(vm.billAdjustmentData.dataList[i]);
        }
      }
      if (vm.adjustmentDetailsArray) {
        vm.setStorageTableDataFile = vm.billAdjustmentData.componentName;
        var keys = Object.keys(vm.adjustmentDetailsArray[0]);
        var storageTabulardata = utilityService.gridSettingsStorageData(vm.setStorageTableDataFile);
        var columnKeys = (storageTabulardata.activeColumns && (storageTabulardata.activeColumns).length > 0) ? storageTabulardata.activeColumns : keys;
        vm.checkboxSelection = vm.checkboxSelectionTemp = vm.adjustmentDetailsArrayHeader = columnKeys;
        vm.freezeColumns = vm.freezeColumnsTemp = storageTabulardata.freezeColumns;
      }
    }

    function paymentsCreditAdjustmentData() {
      return (!vm.nodata && !vm.widgetOpen) ? true : false;
    }

    function pcaError() {
      return (vm.exportError && !vm.widgetOpen) ? true : false;
    }

    function pcaFlexdirection() {
     return (vm.flexDirection == true) ? 'flex-column' : ''
    }

    function showPcaChargesSettings() {
      return vm.widgetOpen && vm.tabularView;
    }

    vm.showPcaChargesTabularCardView = function(view) {
      if(view == 'card') {
        vm.tabularView = false;
        vm.isTabularViewSettings = false;
      }else{
        vm.tabularView = true;

        if(vm.pcaWidgetOpen)
          vm.setPcaGridOptions();
        else
          vm.setPaymentsReceivedGridOptions();
        vm.applyPcaCancelSettings(true);
      }
      $scope.cardLayoutIndex = null;
      vm.viewAllBodyHeight();
    }

    vm.getPcaActiveViewStyle = function(view) {
      return view == 'card' ? (vm.tabularView ? "ecb-cardTabularActiveView" : "ecb-cardTabularFadeView") : (!vm.tabularView ? "ecb-cardTabularActiveView" : "ecb-cardTabularFadeView");
    }

    vm.togglePcaTabularViewSettings = function() {
      vm.isTabularViewSettings = vm.isTabularViewSettings ? false : true;
      vm.checkboxSelectionTemp = angular.copy(vm.checkboxSelection);
      vm.freezeColumnsTemp = angular.copy(vm.freezeColumns);
    }

    vm.isPcaSettings = function() {
      return vm.widgetOpen && vm.tabularView && vm.isTabularViewSettings;
    }

    vm.isPcaExpandCardView = function() {
      return vm.widgetOpen && !vm.tabularView && vm.pcaWidgetOpen;
    }

    vm.isPaymentsReceivedExpandCardView = function() {
      return vm.widgetOpen && !vm.tabularView && vm.paymentsReceivedWidgetOpen;
    }

    vm.isPcaExpandTabularView = function() {
      return vm.widgetOpen && vm.tabularView && vm.pcaWidgetOpen;
    }

    vm.isPaymentsReceivedExpandTabularView = function() {
      return vm.widgetOpen && vm.tabularView && vm.paymentsReceivedWidgetOpen;
    }

    vm.togglePcaHeaderSelection = function(header) {
      var columnIndex = vm.checkboxSelectionTemp.indexOf(header);
      if (columnIndex > -1)
        vm.checkboxSelectionTemp.splice(columnIndex, 1);
      else
        vm.checkboxSelectionTemp.push(header);
    }

    vm.togglePcaSelectAll = function(isAll) {
      if(vm.widgetOpen && vm.pcaWidgetOpen) {
        vm.checkboxSelectionTemp = isAll == 1 ? angular.copy(vm.adjustmentDetailsArrayHeader) : angular.copy(vm.freezeColumns);
      } else {
        vm.checkboxSelectionTemp = isAll == 1 ? angular.copy(vm.payReceivedDetailsHeader) : angular.copy(vm.freezeColumns);
      }
    }

    vm.isAllColumnDeselected = function(){
      var chkBoxLen = 0;
      for(var i in vm.checkboxSelectionTemp){
        chkBoxLen = (vm.freezeColumns).indexOf(vm.checkboxSelectionTemp[i]) == -1 ? chkBoxLen + 1 : chkBoxLen;
      }
      return chkBoxLen == 0 ? true : false;
    }

    vm.applyPcaCancelSettings = function(isApply) {
      if (isApply) {
        vm.checkboxSelection = angular.copy(vm.checkboxSelectionTemp);
        vm.freezeColumns = angular.copy(vm.freezeColumnsTemp);
        if (vm.pcaWidgetOpen){
          vm.gridOptions.columnDefs = vm.getAdjustColumnDefinition();
        } else {
          vm.paymentGridOptions.columnDefs = vm.getPaymentColumnDefinition();
        }
        var compName = vm.widgetOpen && vm.pcaWidgetOpen ? COMPONENT_NAME : COMPONENT_NAME_PR;
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

    vm.getPaymentColumnDefinition = function() {
      return utilityService.setColumnDefinitions({columnKeys: vm.displayablePayReceivedHeader, 
      selectedFilters: vm.selectedFilters, 
      configs: vm.payReceivedConfigs, 
      checkboxSelection: vm.checkboxSelection, 
      dispNameKeyMap: vm.payReceivedDisplayableNameMap, 
      freezeColumns: vm.freezeColumns, 
      sortKeys: vm.payReceivedSortKeys, 
      selectedSortKey: vm.selectedSortKey,
      sortOrder: vm.sortOrder });
    }

    vm.setPcaGridOptions = function() {
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

    vm.setPaymentsReceivedGridOptions = function() {
      vm.paymentGridOptions = {
        data: vm.displayablePayReceived,
        columnDefs : vm.getPaymentColumnDefinition(),
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
      vm.setPaymentsReceivedGridData();
    };

    vm.setPaymentsReceivedGridData = function(){
      if(!vm.paymentGridOptions) return;
      vm.paymentGridOptions.data = vm.displayablePayReceived;
      vm.paymentGridOptions.columnDefs = vm.getPaymentColumnDefinition();
      if(vm.tabularGridApi) vm.tabularGridApi.core.refresh();
    }

    vm.viewAllBodyHeight = function(ele) {
      angular.element(".ecb-expandBody").ready(function() {
        vm.getViewAllBodyHeight();
      });
    }

    vm.getViewAllBodyHeight = function() {
      return utilityService.manageViewAllBodyHeight("ecb-paymentCreditsExpandMain");
    }

    vm.getSettingsHeight = function() {
      var height = $window.innerHeight;
      var systembarHeight = $document.find(".systemBar").height();
      var settingsHeader = $document.find(".ecb-settingsHeader").height();
      var settingsCheckboxHeader = $document.find(".ecb-settingsCheckboxHeader").height();
      if (height) return { "height": (height - (systembarHeight + settingsHeader + settingsCheckboxHeader + 40)) + "px" };
    }

    vm.postBillWidgetOpen = function() {
      return vm.widgetOpen && vm.pcaWidgetOpen;
    }

    vm.isPaymentsReceivedWidgetOpen = function() {
      return vm.widgetOpen && vm.paymentsReceivedWidgetOpen;
    }

    vm.setCardIndex = function(index) {
      $scope.cardLayoutIndex = index;
      $scope.cardLayoutChanged = ($scope.cardLayoutChanged === true) ? false : true;
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

    vm.getSortByColumn = function(defaultKey) {
      return vm.selectedSortKey ? vm.selectedSortKey : defaultKey;
    }
    vm.getCurrencySign = function(code) {
      return utilityService.getCurrencySign(code);
    }
    vm.currencyFormatter = function(value, code, isSymbol) {
      return utilityService.currencyFormatter(value, code, isSymbol);
    }
    vm.showHideBillPopup = function(data, $event, type) {
      if(data == false && vm.popupTimer) {
        clearTimeout(vm.popupTimer);
      }else {
        vm.popupTimer = setTimeout(function() {
          clearTimeout(vm.popupTimer);
          if(type == 'payRcvd')
            vm.showPaymentsReceivedPopup($event);
          else if(type == 'adjust')
            vm.showBillAdjustmentPopup($event);
          
        }, utilityService.hoverDelay);
      }
    }

    $scope.$on('$destroy', function () {
      utilityService.cleanUpListners(unregisterPcaEvents);
    });
  }
})();
