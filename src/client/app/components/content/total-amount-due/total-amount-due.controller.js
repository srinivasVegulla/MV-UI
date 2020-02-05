(function() {
  'use strict';

  angular
    .module('app.total-amount-due')
    .controller('totalAmountDueController', Controller);

  Controller.$inject = [
    '$scope',
    'amountDueService',
    'logger',
    'accountService',
    'payService',
    'paymentMethodsService',
    'translatorHelper',
    'paymentSetupModalService',
    '$rootScope',
    '$moment',
    'localStorageService',
    'authenticationService',
    '$timeout',
    '$filter',
    'utilityService',
    '$document',
    '$window',
    '$sce'
  ];

  /* @ngInject */
  function Controller(
    $scope,
    amountDueService,
    logger,
    accountService,
    payService,
    paymentMethodsService,
    translatorHelper,
    paymentSetupModalService,
    $rootScope,
    $moment,
    localStorageService,
    authenticationService,
    $timeout,
    $filter,
    utilityService,
    $document,
    $window,
    $sce) {
    var COMPONENT_NAME = 'Total Amount Due', COMPONENT_NAME_PAYMENTS_HISTORY = 'Payments History', COMPONENT_NAME_PR = 'PaymentsReceived';
    /* jshint validthis:true */
    var vm = this,
    filterInterval,
    _initatePayment,
    _initateOneTimePayment,
    savePayment,
    autoPaySetUp,
    showPastDue,
    allowOnlinePayment,
    paymentAccomplishment,
    paymentsHistoryBillAdjustmentPopup,
    paymentsHistoryPopupViewAll,
    paymentsHistoryPopupData,
    _idInterval,
    sortKeyFilter,
    showPaymentsHistoryFilter,
    paymentStatusList = [];
    vm.duePaymentAmount = {};
    vm.makePayment = payService.open;
    vm.autopay = '';
    vm.nodata = false;
    vm.paymentSetup = paymentSetupModalService.open;
    vm.user = authenticationService.authentication().userInfo;
    var unregisterTotalAmountDueEvents = [];
    vm.setBillsView = setBillsView;
    vm.getPaymentStatus = getPaymentStatus;
    vm.paymentHistory = {};
    vm.pendingStatusCount = 0;
    vm.successStatusCount = 0;
    vm.rejectedStatusCount = 0;
    vm.showPaymentHistoryPopup = showPaymentHistoryPopup;
    vm.isBillAdjustmentPopup = false;
    vm.showPaymentsHistoryExpandedView = showPaymentsHistoryExpandedView;
    vm.setbillAdjustmentDataPaymentsHistory = setbillAdjustmentDataPaymentsHistory;
    vm.positionElement = positionElement;
    vm.setCardLayOutDetails = setCardLayOutDetails;
    vm.widgetOpen = false;
    vm.paymentsHistorywidgetOpen = false;
    vm.paymentsHistoryExpandedStateClose = paymentsHistoryExpandedStateClose;
    vm.paymentsHistoryClose = false;
    vm.setTabularView = setTabularView;
    vm.isTabularViewSettings = false;
    vm.gridOptions = null;
    vm.checkboxSelection = [];
    vm.checkboxSelectionTemp = [];
    vm.gridColMinWidth = 140;
    var unregisterChargesEvents = [];
    vm.freezeColumnsTemp = [];
    vm.freezeColumns = [];
    vm.showPaymentsHistorySettings = showPaymentsHistorySettings;
    vm.getPaymentsHistoryJson = getPaymentsHistoryJson;
    vm.paymentsHistoryFile = 'PaymentsHistory';
    vm.selectedFilters = {};
    vm.displayableHistoryInfo = null;
    vm.displayablePaymentsHistoryHeader = null;
    $scope.cardLayoutChanged = true;
    $scope.cardLayoutIndex = null;
    vm.adjustmentDetailsArrayHeader = [];
    vm.adjustmentDetailsArray = [];
    vm.paymentsHistoryDisplayName = [];
    vm.getPaymentStatusFilters = getPaymentStatusFilters;
    vm.filterByStatus = filterByStatus;
    vm.statusFilter = {};
    vm.filterResult = [];
    vm.displayFiltersList = [];
    vm.paymentStatusFiltersList = [];
    vm.selectedSortKey =  null;
    vm.pendingRejectedPaymentsHistory = [];
    vm.gridFiltersList = ["SUCCESS","PENDING", "REJECTED"];
    vm.updateGrid = updateGrid;
    vm.transactionLinkDisable = false;
    vm.loading = true;
    vm.ecbARValue = localStorageService.get('ecbarStatus');
    vm.ecbARCheck;
    vm.ecbARPaymentsHistoryHeader;
    vm.showPastDue;
    vm.showInvoicePastDue = showInvoicePastDue;
    vm.invoiceData;
    vm.setStorageTableDataFile;
    vm.sortOrder = null;
    vm.maxValuesinInvoice = 0;
    vm.calendarDateFormat = vm.localizeDateFormat = utilityService.dateFormat;

    $scope.$watch('accountId', function(acctId){
      if (!acctId) return;
      vm.accountId = acctId;
      vm.currency = $scope.currency;
      vm.idPaymentInstrument = $scope.idPaymentInstrument;
      vm.widgetState = $scope.ecbWidgetState;
      vm.activate();
    });

    paymentAccomplishment = $rootScope.$on('paymentDone', function() {
      vm.activate();
    });

    autoPaySetUp = $rootScope.$on('autopaySetupDone', function() {
      vm.activate();
    });

    savePayment = $rootScope.$on('save_selected_payment', function(event, data) {
      vm.defaultPaymentMethod = data;
    });

    vm.initiateWidgetService = function() {
      vm.getPaymentsHistoryJson();
    }

    sortKeyFilter = $rootScope.$on('filter_criteria_event', function(event, sortKey, filterItems) {
        if(vm.widgetOpen){
          vm.sortOrder = (vm.selectedSortKey == sortKey && vm.sortOrder == 'desc') ? 'asc' : 'desc';
          vm.selectedFilters = {};
          vm.selectedSortKey = null;
          if(sortKey) vm.selectedSortKey = sortKey;
          if(filterItems) vm.selectedFilters = filterItems;
          if(vm.tabularView == true) vm.applyCancelSettings(true);
        }
      });

    showPaymentsHistoryFilter = $rootScope.$on('show_filter_paymentsHistory', function(event, data) {
      var globalFilterData = data;
      vm.statusFilter = {};
      for(var i=0; i<globalFilterData.length; i++) {
        vm.statusFilter[globalFilterData[i]] = true;
      }
      vm.updateGrid();
    });

    vm.activate = function() {
      filterInterval = $scope.$on('show_filter_intervals', function(event, idInterval, data) {
        var cardState = utilityService.cardState;
        if((cardState.expand == vm.widgetOpen) || (cardState.expand != vm.widgetOpen && cardState.widget == COMPONENT_NAME)) {
          vm.initiateWidgetService();
        }
      });
      vm.loading = true;
      vm.initiateWidgetService();
      getDuePaymentAmount();
      getPaymentMethods();
      getAutoPay();
      getBillSettings(vm.user.billSettingId);
      vm.i18n = translatorHelper.loadFromStorage();
      vm.layoutLeftDirection = 'left';
      vm.layoutRightDirection = 'right';
      vm.isRTL = false;
      if (vm.i18n.languageDirection == 'RTL'){
        vm.layoutLeftDirection = 'right';
        vm.layoutRightDirection = 'left';
        vm.isRTL = true;
      }
      if(vm.ecbARValue === '0'){
        vm.ecbARCheck = true;
        showInvoicePastDue();
      } else {
        vm.ecbARCheck = false;
      }
    }

    allowOnlinePayment = $rootScope.$on('allowOnlinePayment', function(event, data) {
        vm.allowMakePayment = (data === 'F') ? false : true;
    });

    paymentsHistoryBillAdjustmentPopup = $rootScope.$on('isBillAdjustmentPopup', function(event, data) {
        vm.isBillAdjustmentPopup = data;
      });
    paymentsHistoryPopupViewAll = $rootScope.$on('billAdjustmentViewAllClick', function(event, data) {
      vm.statusFilter = {};
      vm.setStorageTableDataFile = data;
        if(data == COMPONENT_NAME_PAYMENTS_HISTORY) {
          for(var item = 0; item < vm.filterResult.length; item++) {
            if(vm.filterResult[item].visibility === true) {
              vm.statusFilter[$filter('translate')(vm.filterResult[item].localeResourceKey)] = true;
            }
          }
          vm.showPaymentsHistoryExpandedView();
        }
        if(data == COMPONENT_NAME_PR){
          for(var item = 0; item < vm.filterResult.length; item++) {
            if(vm.filterResult[item].visibility === false) {
              vm.statusFilter[$filter('translate')(vm.filterResult[item].localeResourceKey)] = true;
            }
          }
          vm.showPaymentsHistoryExpandedView();
        }
      });
    paymentsHistoryPopupData = $rootScope.$on('billAdjustmentPopupData', function(event, data) {
      vm.setbillAdjustmentDataPaymentsHistory(data);
    });

    unregisterTotalAmountDueEvents.push(savePayment);
    unregisterTotalAmountDueEvents.push(allowOnlinePayment);
    unregisterTotalAmountDueEvents.push(paymentAccomplishment);
    unregisterTotalAmountDueEvents.push(autoPaySetUp);
    unregisterTotalAmountDueEvents.push(sortKeyFilter);
    unregisterTotalAmountDueEvents.push(showPaymentsHistoryFilter);
    unregisterTotalAmountDueEvents.push(showPastDue);

    function getBillSettings(billSettingId) {
      amountDueService.getSettings(billSettingId)
        .then(function(response) {
          if (response) {
            vm.allowOnlinePayment = response.data.billConfigs.allowOnlinePayments;
            $rootScope.$emit('allowOnlinePayment', vm.allowOnlinePayment);
          }
        })
        .catch(handleError);
    }

    function showInvoicePastDue(){
      amountDueService.getInvoices(vm.accountId).then(function(result) {
        vm.invoiceData = result.data.openInvoices.m_Items;
      for(var i=0;i<vm.invoiceData.length;i++){
        if(vm.invoiceData[i].DueDt !== null || vm.invoiceData[i].DueDt !== undefined){
          vm.invoiceDate = Date.parse(vm.invoiceData[i].DueDt);
          var currentDate = new Date();
          var currentMillisecondDate = Date.parse(currentDate);
          if(vm.invoiceDate <= currentMillisecondDate){
              vm.showPastDue = true;
          }
        }
      } 
    }).catch(handleError);
    }

    function getDuePaymentAmount() {
      amountDueService.getDuePayment(vm.accountId)
        .then(function(result) {
          if (result) {
            vm.nodata = false;
            vm.duePaymentAmount = result.data.PaymentInfo;
            vm.duePaymentAmount.dueDate = $moment(vm.duePaymentAmount.dueDate).format();
            //vm.duePaymentAmount.dueDate = $moment.tz(vm.duePaymentAmount.dueDate, "Europe/London").format();
          }
        })
        .catch(function(err) {
          if (err.status === 404) {
            vm.nodata = true;
          } else {
            handleError(err);
          }
        }).finally(function(){
          vm.loading= false;
        });
    }

    function getPaymentMethods() {
      paymentMethodsService.getPayment(vm.accountId)
        .then(function(response) {
          if (response.data) {
            var lang = translatorHelper.currentLanguage();
            if (lang != 'en') { vm.title = false; } else { vm.title = true; }
            vm.paymentMethods = response.data.PaymentMethods;
            vm.defaultPaymentMethod = vm.paymentMethods[0];
          }
          _initatePayment = localStorageService.get('transactionSuccess');
          _initateOneTimePayment = localStorageService.get('oneTimePayment');
          if(_initatePayment || _initateOneTimePayment){
            $timeout(function() {
            angular.element('#makePaymentMinimal').triggerHandler('click');
            angular.element('#makePayment').triggerHandler('click');
          },1000);
          }
        })
        .catch(handleError);
    }

    function getAutoPay() {
      paymentSetupModalService.getAutoPay(vm.accountId)
        .then(function(result) {
          if (result.data)
            vm.autopay = result.data.autopay;
        })
        .catch(handleError);
    }

    function handleError(error) {
      logger.log('Error retrieving data. Please contact customer support.', error, COMPONENT_NAME);
    }

    function setBillsView() {
      $rootScope.$emit('setSelectedViewOn', 'bills');
    }

    $scope.$on('$destroy', function () {
      utilityService.cleanUpListners(unregisterTotalAmountDueEvents);
    });

    function getPaymentsHistoryJson() {
      vm.loading = true;
      utilityService.getResponseConfigJson(vm.paymentsHistoryFile)
        .then(function(response) {
          var fields = response.data.columns.fields;
          vm.filterResult = response.data.filters;
          vm.getPaymentStatus(fields);
      }).catch(function(error) {
        logger.log('Error occured in app.total-amount-due.Controller.getResponseConfigJson()', {
          error: error
        });
        vm.getPaymentStatus(null);
      });
    }

    function getPaymentStatus(configFields) {
      var idInterval = utilityService.getOrSetSelectedTimeInterVal().idInterval;
        amountDueService.getPaymentStatus(vm.accountId, idInterval, vm.ecbARValue)
        .then(function(result) {
          vm.pendingStatusCount = 0;
          vm.successStatusCount = 0;
          vm.rejectedStatusCount = 0;
          vm.pendingRejectedPaymentsHistory = [];
          vm.displayableHistoryInfo = vm.paymentsHistoryDisplayArrayHeader = [];
          vm.addInvoiceNoAndAmountCols(result);
          vm.paymentsHistory = angular.copy(result);
          if (vm.paymentsHistory && vm.paymentsHistory.length > 0) {
            vm.paymentsHistoryHeader = Object.keys(vm.paymentsHistory[0]);
            vm.paymentsHistory.forEach(function (paymentHistory, iterator) {
              if (paymentHistory.status === 'PENDING' || paymentHistory.status === 'RECEIVED_REQUEST') {
                vm.pendingStatusCount++;
                vm.pendingRejectedPaymentsHistory.push(paymentHistory);
              } else if (paymentHistory.status === 'SUCCESS') {
                vm.successStatusCount++;
              } else if (paymentHistory.status === 'REJECTED' || paymentHistory.status === 'REVERSED' || paymentHistory.status === 'FAILURE') {
                vm.rejectedStatusCount++;
                vm.pendingRejectedPaymentsHistory.push(paymentHistory);
              } else {
                vm.pendingStatusCount++;
                vm.pendingRejectedPaymentsHistory.push(paymentHistory);
              }
            });
            if(configFields) {
              var configInfo = utilityService.processExternalConfigJson(vm.paymentsHistory, configFields);
              vm.displayableHistoryInfo = configInfo["isColumnDataList"];
              vm.paymentsHistoryDisplayName = configInfo["displayableNames"];
              vm.paymentsHistoryDisplayableNameHeader = configInfo["isColumnDisplayableNames"];
              vm.exportableHistoryInfo = configInfo["exportableDataList"];
              vm.exportableDisplayKeys = configInfo["exportableDataListDisplayKeys"];
              vm.displayablePaymentsHistoryHeader = utilityService.getKeysForDataList(vm.displayableHistoryInfo);
              if(!vm.ecbARCheck){
                vm.ecbARPaymentsHistoryHeader = ['invoiceAmount','invoiceString'];
                for(var i = 0; i < vm.ecbARPaymentsHistoryHeader.length; i++){
                  vm.ecbARPaymentsIndex = vm.displayablePaymentsHistoryHeader.indexOf(vm.ecbARPaymentsHistoryHeader[i]);
                  vm.displayablePaymentsHistoryHeader.splice(vm.ecbARPaymentsIndex,1);
                }
              }
              vm.paymentsHistorySortKeys = configInfo["sortableKeys"];
              vm.paymentsHistoryFilterKeys = configInfo["filterableKeys"];
              vm.paymentsHistoryDefaultColumnKeys = configInfo["defaultColumnKeys"];
              vm.paymentsHistoryConfigs = configInfo["configFields"];
              vm.setOrUpdatePaymentsHistoryGridData();
            } else {
              vm.paymentsHistoryDisplayArray = angular.copy(vm.paymentsHistory);
              vm.paymentsHistoryDisplayArrayHeader = Object.keys(vm.paymentsHistory[0]);
            }
            vm.getPaymentStatusFilters();
          }

          if(vm.pendingStatusCount > 0 || vm.rejectedStatusCount > 0){
              vm.transactionLinkDisable = false;
            }else{
              vm.transactionLinkDisable = true;
            }
        })
        .catch(function (error) {
          logger.log('Could not fetch payment status or history', {
            error: error,
          });
          vm.transactionLinkDisable = true;
          vm.pendingStatusCount = 0;
          vm.successStatusCount = 0;
          vm.rejectedStatusCount = 0;
          vm.displayableHistoryInfo = vm.paymentsHistoryDisplayArrayHeader = [];
        }).finally(function() {
          vm.loading = false;
        });
    }

    vm.addInvoiceNoAndAmountCols = function(result) {
      for(var index in result){
        var invoiceList = result[index].invoices;
        var invoiceString = [];
        var invoiceAmount = [];
        for(var i in invoiceList) {
          invoiceString.push(invoiceList[i].InvoiceString);
          invoiceAmount.push(vm.currencyFormatter(invoiceList[i].ClosedAmt, result[index].currency, true));
        }
        result[index]['invoiceString'] = invoiceString;
        result[index]['invoiceAmount'] = invoiceAmount;
        var invoiceAmountLength = invoiceAmount.length;
        if(invoiceAmountLength > 0){
          if(vm.maxValuesinInvoice < invoiceAmountLength){
            vm.maxValuesinInvoice = invoiceAmountLength;
          }
        }
      }
    };

    function getPaymentStatusFilters() {
      var filtersList = (vm.paymentsHistory || [])
                          .map(function (payment) {
                            return $filter('translate')(payment.status); })
                          .filter(function (item, index, paymentStatusList) {
                            return paymentStatusList.indexOf(item) === index;
                          });
      if(vm.filterResult) {
        for(var i=0;i<vm.filterResult.length;i++) {
          var name = vm.filterResult[i].name;
          vm.displayFiltersList[i] = ($filter('translate')(vm.filterResult[i].localeResourceKey));
          if(filtersList.indexOf(name) > -1)
            filtersList[filtersList.indexOf(name)] = ($filter('translate')(vm.filterResult[i].localeResourceKey));
        }
        vm.paymentStatusFiltersList = filtersList;
        utilityService.getorSetStatusFiltersList(vm.paymentStatusFiltersList);
      } else {
        vm.paymentStatusFiltersList = vm.displayFiltersList;
      }
      for(var i=0; i<vm.displayFiltersList.length; i++) {
        if(vm.displayFiltersList[i] == null || vm.displayFiltersList[i] == undefined || vm.displayFiltersList[i] == "") {
          vm.displayFiltersList.splice(i, 1);
        }
      }
      $rootScope.$emit("paymentStatusFilters", vm.displayFiltersList);
      return vm.displayFiltersList;
    }

    function updateGrid() {
      if(vm.statusFilter) {
        vm.gridFiltersList = [];
        for(var property in vm.statusFilter) {
          if(property === $filter('translate')('TEXT_STATUS_PENDING') || property === 'RECEIVED_REQUEST') {
            if (vm.statusFilter[$filter('translate')('TEXT_STATUS_PENDING')] === true) {
              vm.gridFiltersList.push("PENDING");
            }
          } else {
            if (vm.statusFilter[property] === true && property !== "") {
              (property == $filter('translate')('TEXT_STATUS_SUCCESS') ) ? vm.gridFiltersList.push("SUCCESS") : vm.gridFiltersList.push("REJECTED");
            }
          }
        }
      }
      vm.setGridOptions();
      $rootScope.$emit('show_filter_status', vm.statusFilter);
    }

    function filterByStatus(card) {
      if(card.status === 'PENDING' || card.status === 'RECEIVED_REQUEST') {
        return vm.statusFilter[$filter('translate')('TEXT_STATUS_PENDING')];
      } else {
        return (card.status == "SUCCESS") ? vm.statusFilter[$filter('translate')('TEXT_STATUS_SUCCESS')] : vm.statusFilter[$filter('translate')('TEXT_STATUS_REJECTED')];
      }
    }

    vm.setOrUpdatePaymentsHistoryGridData = function() {
      if(!vm.gridOptions) return;
      vm.gridOptions.data = vm.displayableHistoryInfo;
      vm.gridOptions.columnDefs = vm.getPaymentsHistoryColumnDefinition();
/*       vm.gridOptions.showGridFooter = true;
      vm.gridOptions.gridFooterTemplate = '<div class="text-center ecb-tabularViewBtnMain"><button class="btn ebBtn ebBtn-default" '
          + ' ng-csv="grid.appScope.exportableAdjustments" lazy-load="true" filename="PaymentsHistory.csv" '
          + ' add-bom="true" charset="UTF-8" csv-header="grid.appScope.exportableDisplayKeys" field-separator=" , ">'
          + ' <span><i class="fa fa-download"></i></span><span>Download</span></button></div>'; */
      if(vm.tabularGridApi) vm.tabularGridApi.core.refresh();
    }

    function showPaymentHistoryPopup($event) {
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

    function positionElement(xPos, yPos){
      var ele = angular.element('.ecb-billAdjustmentPopup');
      ele.show().css({'top' : (xPos - 40)+"px", 'left' : (yPos - (vm.isRTL? 25 : 120))+"px"});
      $timeout(function(){ele.trigger("mouseover")}, 5);
    }

    function setCardLayOutDetails() {
      var billAdjustmentPopupData = {
        "componentName" : COMPONENT_NAME_PAYMENTS_HISTORY,
        "header" : ($filter('translate')('TEXT_PAYMENTS_HISTORY')),
        "filename" : "PaymentsHistory.csv",
        "currency" : 'currency',
        "dataList" : vm.pendingRejectedPaymentsHistory,
        "exportList" : vm.exportableHistoryInfo,
        "exportListKeys" : vm.exportableDisplayKeys
      };
      $scope.$emit('billAdjustmentPopupData', billAdjustmentPopupData);
    }

    function showPaymentsHistoryExpandedView() {
      if (vm.adjustmentDetailsArray) {
        vm.paymentsCardState = 'expanded';
        vm.widgetOpen = true;
        //vm.tabularView = true;
        vm.paymentsHistoryClose = true;
        $scope.$emit('expanded', vm.paymentsCardState, COMPONENT_NAME);
        vm.paymentsHistorywidgetOpen = true;
        if (vm.adjustmentDetailsArray.length > 0) {
          var keys = Object.keys(vm.adjustmentDetailsArray[0]);
          var storageTabulardata = utilityService.gridSettingsStorageData(vm.setStorageTableDataFile);
          var columnKeys = (storageTabulardata.activeColumns && (storageTabulardata.activeColumns).length > 0) ? storageTabulardata.activeColumns : vm.displayablePaymentsHistoryHeader;
          vm.checkboxSelection = vm.checkboxSelectionTemp = vm.adjustmentDetailsArrayHeader = columnKeys;
          vm.freezeColumns = vm.freezeColumnsTemp = storageTabulardata.freezeColumns;
          setTabularView(true);
        }
        $scope.cardLayoutIndex = null;
        var prop = { "sortable": true, "filterable": true, "statusFilter": true, "statusFiltersList": vm.displayFiltersList, sortKeys: vm.paymentsHistorySortKeys, filterKeys: vm.paymentsHistoryFilterKeys, displayNames: vm.paymentsHistoryDisplayName };
        $scope.$emit('widgetFilter', prop);
      }
    }

    function setbillAdjustmentDataPaymentsHistory(data) {
      vm.billAdjustmentData = data;
      vm.adjustmentDetailsArray = [];
      vm.adjustmentDetailsLength = vm.billAdjustmentData.dataList.length;
      if(vm.adjustmentDetailsLength > 0) {
        for(var i=0; i < vm.adjustmentDetailsLength; i++) {
          if(vm.billAdjustmentData.dataList[i])
            vm.adjustmentDetailsArray.push(vm.billAdjustmentData.dataList[i]);
        }
      }
      vm.addInvoiceNoAndAmountCols(vm.adjustmentDetailsArray);
      if(vm.adjustmentDetailsArray){
        var keys = Object.keys(vm.adjustmentDetailsArray[0]);
        var storageTabulardata = utilityService.gridSettingsStorageData(vm.setStorageTableDataFile);
        var columnKeys = (storageTabulardata.activeColumns && (storageTabulardata.activeColumns).length > 0) ? storageTabulardata.activeColumns : keys;
        vm.checkboxSelection = vm.checkboxSelectionTemp = vm.adjustmentDetailsArrayHeader = columnKeys;
        vm.freezeColumns = vm.freezeColumnsTemp = storageTabulardata.freezeColumns;
      }
    }

    vm.isPaymentsReceived = function(){
      return ((vm.widgetOpen && vm.paymentsHistorywidgetOpen) && ((vm.statusFilter[$filter('translate')('TEXT_STATUS_SUCCESS')]) && (!(vm.statusFilter[$filter('translate')('TEXT_STATUS_PENDING')] || vm.statusFilter[$filter('translate')('TEXT_STATUS_REJECTED')])))) ? true : false;
    }

    vm.isPaymentsHistory  = function(){
      return ((vm.widgetOpen && vm.paymentsHistorywidgetOpen) && (!vm.isPaymentsReceived())) ? true : false;
    }

    function paymentsHistoryExpandedStateClose() {
      vm.paymentsCardState = 'collapsed';
      vm.paymentsHistoryClose = false;
      $scope.$emit('expanded', vm.paymentsCardState, COMPONENT_NAME);
      $scope.$emit('widgetFilter', {});
      vm.selectedSortKey = null;
      vm.widgetOpen = false;
      $scope.cardLayoutIndex = null;
      vm.isTabularViewSettings = false;
      vm.tabularView = false;
      vm.paymentsHistorywidgetOpen = false;
    }

    vm.getPaymentsHistoryActiveViewStyle = function(view) {
      return view == 'card' ? (vm.tabularView ? "ecb-cardTabularActiveView" : "ecb-cardTabularFadeView") : (!vm.tabularView ? "ecb-cardTabularActiveView" : "ecb-cardTabularFadeView");
    }

    vm.getPaymentsHistoryHeaderKey = function(key) {
      return vm.paymentsHistoryDisplayName[key] ? vm.paymentsHistoryDisplayName[key] : key;
    }

    vm.getPaymentsHistoryColumnDefinition = function() {
      vm.removeInvoicesHeader();
      if(vm.displayablePaymentsHistoryHeader && vm.displayablePaymentsHistoryHeader.length > 0) {
        var definitions = utilityService.setColumnDefinitions({columnKeys: vm.displayablePaymentsHistoryHeader, 
        selectedFilters: vm.selectedFilters, 
        configs: vm.paymentsHistoryConfigs, 
        checkboxSelection: vm.checkboxSelection, 
        dispNameKeyMap: vm.paymentsHistoryDisplayName, 
        freezeColumns: vm.freezeColumns, 
        sortKeys: vm.paymentsHistorySortKeys, 
        selectedSortKey: vm.selectedSortKey,
        sortOrder: vm.sortOrder });
        for(var i in definitions) {
          if(definitions[i].field == 'invoiceString') {
            definitions[i].cellTemplate = '<div style="padding: 10px;" ng-repeat="item in row.entity[col.field] track by $index">{{item}}</div>';
          }else if(definitions[i].field == 'invoiceAmount') {
            definitions[i].cellTemplate = '<div style="padding: 10px;" ng-repeat="item in row.entity[col.field] track by $index">{{item}}</div>';
            (vm.i18n.languageDirection == 'RTL') ? definitions[i].cellClass = 'text-left' : definitions[i].cellClass = 'text-right';
          }
        }
        return definitions;
      }
      return [];
    }

    vm.removeInvoicesHeader = function() {
      for( var index in vm.displayablePaymentsHistoryHeader) {
        if(vm.displayablePaymentsHistoryHeader[index] == 'invoices')
          delete vm.displayablePaymentsHistoryHeader[index];
      }
    }

    vm.showPaymentsHistoryTabularCardView = function(view) {
      if(view == 'card'){
        vm.tabularView = false;
        vm.isTabularViewSettings = false;
      }else if(view == 'table'){
        vm.tabularView = true;
        vm.setGridOptions();
        vm.applyCancelSettings(true);
      }
      $scope.cardLayoutIndex = null;
      vm.viewAllBodyHeight();
      vm.updateGrid();
    }

    /*vm.getRowHeight = function(){
      alert("hitting");
      console.log("vm.displayableHistoryInfo",vm.displayableHistoryInfo);
    }*/

    vm.setGridOptions = function() {
      vm.gridOptions = {
        data: vm.displayableHistoryInfo,
        columnDefs : vm.getPaymentsHistoryColumnDefinition(),
        rowHeight: vm.ecbARCheck ? ((vm.maxValuesinInvoice > 0) ? (vm.maxValuesinInvoice*32) : 32) : 32,
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
          vm.tabularGridApi.grid.registerRowsProcessor( vm.statusGridFilter, 200 );
        }
      };
      vm.setOrUpdatePaymentsHistoryGridData();
    };

    vm.statusGridFilter = function( renderableRows ){
      renderableRows.forEach( function( row ) {
        var match = false;
        [ 'status' ].forEach(function( field ){
          for(var i=0; i<vm.gridFiltersList.length; i++) {
            var matcher = new RegExp(vm.gridFiltersList[i]);
            if ( row.entity[field].match(matcher) ){
              match = true;
              break;
            } else if (vm.gridFiltersList[i] === 'REJECTED' && (row.entity[field] === 'REVERSED' || row.entity[field] === 'FAILURE')) {
              match = true;
              break;
            }
            else if (vm.gridFiltersList[i] === 'PENDING' && row.entity[field] === 'RECEIVED_REQUEST') {
              match = true;
              break;
            }
          }
        });
        if ( !match ){
          row.visible = false;
        }
      });
      return renderableRows;
    };

    vm.toggleSelectAll = function(isAll) {
      if(vm.widgetOpen) {
        if(isAll == 0 && vm.freezeColumns.length == vm.checkboxSelection.length) return;
        vm.checkboxSelectionTemp = isAll == 1 ? angular.copy(vm.displayablePaymentsHistoryHeader) : angular.copy(vm.freezeColumns);
      }
    }

    vm.isAllColumnDeselected = function(){
      var chkBoxLen = 0;
      for(var i in vm.checkboxSelectionTemp){
        chkBoxLen = (vm.freezeColumns).indexOf(vm.checkboxSelectionTemp[i]) == -1 ? chkBoxLen + 1 : chkBoxLen;
      }
      return chkBoxLen == 0 ? true : false;
    }

    vm.applyCancelSettings = function(isApply) {
      if (isApply) {
        vm.checkboxSelection = angular.copy(vm.checkboxSelectionTemp);
        vm.freezeColumns = angular.copy(vm.freezeColumnsTemp);
        vm.gridOptions.columnDefs = vm.getPaymentsHistoryColumnDefinition();
        utilityService.gridSettingsStorageData(vm.setStorageTableDataFile, vm.checkboxSelection, vm.freezeColumns);
      }
      vm.isTabularViewSettings = false;
    }

    vm.togglePaymentsHistoryTabularViewSettings = function() {
      vm.isTabularViewSettings = vm.isTabularViewSettings ? false : true;
      vm.checkboxSelectionTemp = angular.copy(vm.checkboxSelection);
      vm.freezeColumnsTemp = angular.copy(vm.freezeColumns);
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

    function showPaymentsHistorySettings() {
      return vm.widgetOpen && vm.tabularView;
    }

    vm.isPaymentsHistoryCardView = function() {
      return vm.widgetOpen && !vm.tabularView;
    }

    vm.isPaymentsHistoryExpandCardView = function() {
      return vm.widgetOpen && !vm.tabularView;
    }

    vm.isPaymentsHistoryExpandTabularView = function() {
      return vm.widgetOpen && vm.tabularView;
    }

    vm.toggleHeaderSelection = function(header) {
      var columnIndex = vm.checkboxSelectionTemp.indexOf(header);
      if (columnIndex > -1)
        vm.checkboxSelectionTemp.splice(columnIndex, 1);
      else
        vm.checkboxSelectionTemp.push(header);
    }

    vm.viewAllBodyHeight = function(ele) {
      angular.element(".ecb-expandTADBody").ready(function() {
        vm.getViewAllBodyHeight();
      });
    }

    vm.getViewAllBodyHeight = function() {
      return utilityService.manageViewAllBodyHeight("ecb-paymentsHistoryExpandMain", "ecb-expandTADBody", 30);
    }

    vm.getSettingsHeight = function() {
      var height = $window.innerHeight;
      var systembarHeight = $document.find(".systemBar").height();
      var settingsHeader = $document.find(".ecb-settingsHeader").height();
      var settingsCheckboxHeader = $document.find(".ecb-settingsCheckboxHeader").height();
      if (height) return { "height": (height - (systembarHeight + settingsHeader + settingsCheckboxHeader + 40)) + "px" };
    }

    vm.getSortByColumn = function(defaultKey) {
      return vm.selectedSortKey ? vm.selectedSortKey : defaultKey;
    }

    vm.removeinvoiceCols = function(key) {
      return key !== 'invoiceString' && key !== 'invoiceAmount';
    }

    vm.getCurrencySign = function(code) {
      return utilityService.getCurrencySign(code);
    }

    vm.currencyFormatter = function(value, code, isSymbol) {
      return utilityService.currencyFormatter(value, code, isSymbol);
    }
    vm.showHideBillPopup = function(data, $event) {
      if(data == false && vm.popupTimer) {
        clearTimeout(vm.popupTimer);
      }else {
        vm.popupTimer = setTimeout(function() {
          clearTimeout(vm.popupTimer);
          vm.showPaymentHistoryPopup($event);
        }, utilityService.hoverDelay);
      }
    }

    angular.element($window).on('resize', function () {
        if(vm.widgetOpen){
          vm.viewAllBodyHeight();
          vm.getSettingsHeight();
          setTabularView(false);
        }
      });

    function setTabularView(isInitialCall) {
      var width = $window.innerWidth;
      if (isInitialCall) {
        (width > 991) ? (vm.showPaymentsHistoryTabularCardView('table')) : (vm.showPaymentsHistoryTabularCardView('card'));
      } else {
        if (width < 768) {
          vm.tabularView ? vm.showPaymentsHistoryTabularCardView('card') : '';
        }
      }
    }
    vm.getDateFormatByLang = function() {
      var dateFormat = utilityService.getDateFormatterByLang()['dateFormat'];
      return utilityService.isObject(dateFormat) ? dateFormat : vm.calendarDateFormat;
  }
  }
})();
