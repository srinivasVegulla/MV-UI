(function() {
  'use strict';
  angular
    .module('app.offer-charge-summary', ['app.infinite-scroller', 'ui.grid.infiniteScroll', 'angularLoad'])
    .controller('offerChargeSummaryController', Controller);
  Controller.$inject = [
    '$scope',
    '$filter',
    '$log',
    'offerChargeService',
    '$rootScope',
    'translatorHelper',
    '$window',
    '$timeout',
    '$moment',
    'utilityService',
    '$document',
    '$attrs',
    'localStorageService',
    'ecbModalService',
    'infiniteScrollUtil',
    'userService',
    'angularLoad'
  ];

  /* @ngInject */
  function Controller(
    $scope,
    $filter,
    log,
    offerChargeService,
    $rootScope,
    translatorHelper,
    $window,
    $timeout,
    $moment,
    utilityService,
    $document,
    $attrs,
    localStorageService,
    ecbModalService,
    infiniteSroll,
    userService,
    angularLoad) {

    var vm = this,
        COMPONENT_NAME = 'OfferChargeSummary',
        filterInterval,
        filterCriteriaInterval,
        transactionWidget,
        offerStoreSelected,
        showChargesDetail,
        depDirViewChange,
        unregisterChargeSummaryEvents = [],
        userLocale = null,
        userSettings,
        gridContainer = '.ecb-offerCharge-body .ui-grid-render-container-body .ui-grid-viewport',
        cardContainer = '.ecb-offerCharge-body',
        defaultConfigFile = "DefaultProductViewLayout",
        defaultConfigLocalizeFile = "DefaultProductView",
        defaultViewMode = 'offer',
        inlineTaxUsageColumnMap = { "amount": "amountwithtax", "displayamount": "amountwithtax" };
    vm.widgetInfo = $attrs.widgetInfo;
    vm.utilityService = utilityService;
    vm.loading = false;
    vm.isSubscriber = false;
    vm.widgetOpen = false;
    vm.selectedFilters = {};
    vm.selectedSortKey = null;
    vm.prop = null;
    vm.activeHierarchy = {};
    vm.activeMillerPage = {records: [], amount: 0};
    vm.openNodes = {};
    vm.defLocalizeCols = {};
    vm.calendarDateFormat = utilityService.dateFormat;
    vm.calendarDateTimeFormat = utilityService.dateTimeFormat;
    vm.selectedItem = [];
    vm.subCharge = null;
    vm.timeouts = [];
    vm.filterPageNumber = {};

    $scope.$watch('accountId', function(acctId){
      if (!acctId)return;
      vm.accountId = acctId;
      activate();
      initiateListeners();
      initiateWidgetService();
    });
    $scope.$watch('selectSubCharge', function(isSelect){
      vm.subCharge = utilityService.parentCharge;
      if(isSelect && utilityService.isObject(vm.subCharge) && vm.subCharge !== '') {
        COMPONENT_NAME = 'OfferChargeSummary-child',
        vm.accountId = vm.subCharge.accountId;
        vm.invoiceNumber = vm.subCharge.invoiceNumber;
        vm.onDemandInterval = vm.subCharge.onDemandInterval;
        vm.calendarStartDate = vm.subCharge.calendarStartDate;
        vm.calendarEndDate = vm.subCharge.calendarEndDate;
        //vm.subCharge.node.name = vm.subCharge.parentNode.displayName + ' / ' + vm.subCharge.node.name;
        activate();
        initiateWidgetService();
      }
    });
    angular.element($window).on('resize', function () {
      vm.setViewAll();
      vm.viewAllBodyHeight();
      if(vm.widgetOpen) {
        setTabularView(false);
        vm.getSettingsHeight();
      }
    });

    function activate () {
      vm.timeouts = [];
      vm.viewMode = defaultViewMode;
      userSettings = localStorageService.get("user.settings");
      userLocale = localStorageService.get('i18n');
      userLocale = utilityService.isObject(userLocale) ? userLocale.currentLanguage : 'en';
      if(localStorageService.get('userType') === "subscriber"){
        vm.isSubscriber = true;
      }
      vm.layoutLeftDirection = 'left';
      vm.layoutRightDirection = 'right';
      vm.i18n = translatorHelper.loadFromStorage();
      if(vm.i18n.languageDirection == 'RTL'){
        vm.layoutLeftDirection = 'right';
        vm.layoutRightDirection = 'left';
      }
      userService.getCommonConfigFile().then(function (response) {
        var chAccPageSize = response && response.childAccount && response.childAccount.pageSize ? response.childAccount.pageSize : 30;
        vm.chAccBufferSize = chAccPageSize * (response && response.childAccount && response.childAccount.bufferSize ? response.childAccount.bufferSize : 3);
        vm.noOfSibilingNodesCanOpen = response && response.childAccount && response.childAccount.nodeAtaTimeCanOpen ? response.childAccount.nodeAtaTimeCanOpen : 20;
      });
    }
    function initiateListeners() {
      filterInterval = $scope.$on('show_filter_intervals', function(event, idInterval, data, calendarParam, sortKey, filterItems) {
        vm.isPeriodChanged = true;
        loadDataOnChange(idInterval, data, calendarParam, sortKey, filterItems);
      });
      filterCriteriaInterval = $scope.$on('infscroll_filter_criteria_event', function(event, idInterval, data, calendarParam, sortKey, filterItems) {
        loadDataOnChange(idInterval, data, calendarParam, sortKey, filterItems);
      });
      offerStoreSelected = $scope.$on('offerStoreSelected', function (event, data) {
        if (data) {
          vm.closeExpandView();
        }
      });
      transactionWidget = $rootScope.$on('expandTransactionPopup', function(event,data) {
        if(data == true) {
          vm.transactionWidget = data;
          $scope.$emit('dependentDirectiveViewChange', true, "ecb-offer-charge-summary");
          vm.viewMode = defaultViewMode;
          openTransactionPopup(true);
        }
      });
      showChargesDetail = $rootScope.$on('openChargeSummaryViewAll', function (evevnt, data) {
          processPostCloseActivity();
          vm.openExpandView('viewall');
      });
      depDirViewChange = $rootScope.$on('dependentDirectiveViewChange', function(event, data, widgetName) {
        if(data == false && widgetName == 'ecb-charges' && vm.widgetOpen == true) {
          vm.closeExpandView();
        }
      });
      
      unregisterChargeSummaryEvents = [];
      unregisterChargeSummaryEvents.push(filterInterval);
      unregisterChargeSummaryEvents.push(filterCriteriaInterval);
      unregisterChargeSummaryEvents.push(offerStoreSelected);
      unregisterChargeSummaryEvents.push(transactionWidget);
      unregisterChargeSummaryEvents.push(showChargesDetail);
      unregisterChargeSummaryEvents.push(depDirViewChange);
    }
    function openTransactionPopup(isTransactionWidget) {
      // Reset calendar param while opening the transaction widget popup.
      if(isTransactionWidget == true && !vm.dataCurr) {
        vm.dataCurr = utilityService.getOrSetSelectedTimeInterVal().dateRange;
        vm.calendarParamCurr = null;
      }
      // Set calendar param from interval.
      var calendarParam = vm.calendarParamCurr;
      if(!vm.calendarParamCurr && vm.dataCurr) {
        calendarParam = {endDate: vm.dataCurr.endDate, startDate: vm.dataCurr.startDate};
        vm.calendarParamCurr = calendarParam;
      }
      setCalendarParam(calendarParam);
      $scope.$emit('widgetFilter', {calendar : true, isTransactionWidget: isTransactionWidget});
      initiateWidgetService();
      vm.openExpandView('viewall');
    }
    function initiateWidgetService() {
      var interval = utilityService.getOrSetSelectedTimeInterVal();
      vm.onDemandInterval = interval &&  interval.dateRange ? interval.dateRange.onDemandInterval : '';
      vm.invoiceNumber = interval &&  interval.dateRange ? interval.dateRange.invoiceNumber : '';
      vm.activeHierarchy = {};
      vm.productReports = null;
      vm.accountReports = null;
      vm.widgetDataStatus = null;
      vm.openNodes = {};
      vm.activeMillerPage = {records: [], amount: 0};
      vm.prItemsInfo = {};
      vm.isViewAll = false;
      vm.usageDetails = [];
      vm.freezeColumnsTemp = [];
      vm.freezeColumns = [];
      vm.checkboxSelection = [];
      vm.checkboxSelectionTemp = [];
      vm.currency = null;
      vm.showSubscharge = false;
      vm.filtering = false;
      vm.childAccloading = false;
      //subcharges
      if($scope.chargeType == 'subCharge') {
        vm.loading = true;
        setPvLayout(vm.subCharge.node, function() {
          vm.loading = false;
          setLayoutConfigs(vm.subCharge.node);
          initiateExpandMode();
        });
      }else {
        if(vm.viewMode == 'offer') {
          vm.selectOfferView();
        }else if(vm.viewMode == 'account') {
          vm.selectAccountView();
        }
      }
    }
    function refreshWidget(){
      if(!vm.widgetOpen || vm.widgetOpenType == 'viewall') {
        initiateWidgetService();
      }else if(vm.widgetOpenType == 'usage') {
        vm.getFirstUsagePage();
      }
    }
    function loadDataOnChange(idInterval, data, calendarParam, sortKey, filterItems) {
      if(vm.selectedSortKey && sortKey && sortKey == vm.selectedSortKey) {
        vm.sortOrder = vm.sortOrder && vm.sortOrder == 'desc' ? 'asc' : 'desc';
      }else if(sortKey){
        vm.sortOrder = 'desc';
      }
      vm.selectedFilters = {};
      vm.selectedSortKey = null;
      vm.calendarStartDate = null;
      vm.calendarEndDate = null;
      if(vm.widgetOpen){
        vm.selectedSortKey = utilityService.isObject(sortKey) ? sortKey : null;
        if(filterItems) {
          if(vm.prop) {
            for(var key in filterItems) {
              for(var propKey in vm.prop.filterKeys){
                var dateKey = vm.prop.filterKeys[propKey];
                if(key == dateKey.key) {
                  var value = filterItems[key];
                  var isDate = ['timestamp', 'date', 'datetime'].indexOf(dateKey.dataType.toLowerCase()) >= 0 ? true : false;
                  if(isDate) {
                    value = {
                      date: value,
                      next: $moment(value, vm.calendarDateFormat).add(1, 'days').format(vm.calendarDateFormat) + ' 00:00:00',
                      prev: $moment(value, vm.calendarDateFormat).add(-1, 'days').format(vm.calendarDateFormat) + ' 23:59:59'
                    }
                  }
                  vm.selectedFilters[key+'|'+dateKey.dataType] = value;
                }
              }
            }
          }else{
            vm.selectedFilters = filterItems;
          }
        }
        setCalendarParam(calendarParam);
      }
      if(idInterval || (calendarParam && vm.widgetOpen))
        refreshWidget();
      vm.idIntervalCurr = idInterval;
      vm.dataCurr = data;
      vm.calendarParamCurr = calendarParam;
    }
    function setCalendarParam(calendarParam) {
      vm.calendarStartDate = null;
      vm.calendarEndDate = null;
      if(calendarParam){
        var calendarDates = utilityService.setStartAndEndOfDayFormat(calendarParam);
        vm.calendarStartDate = calendarDates.startDate;
        vm.calendarEndDate = calendarDates.endDate;
      }
    }
    vm.selectOfferView = function() {
      vm.viewMode = 'offer';
      vm.openNodes[vm.viewMode] = !utilityService.isObject(vm.openNodes[vm.viewMode]) ? [] : vm.openNodes[vm.viewMode];
      if(vm.productReports == null) {
        getProductReport();
      }else {
        setPageData();
      }
    }
    vm.selectAccountView = function() {
      vm.viewMode = 'account';
      vm.filterAccounts = {};
      //vm.filterPageNumber = {};
      vm.openNodes[vm.viewMode] = !utilityService.isObject(vm.openNodes[vm.viewMode]) ? [] : vm.openNodes[vm.viewMode];
      if(vm.accountReports == null) {
        getAccountReports();
      }else {
        setPageData();
      }
    }
    vm.storeNodes = function(hierarchy) {
      if(vm.openNodes[vm.viewMode].indexOf(hierarchy) == -1) {
        vm.openNodes[vm.viewMode].push(hierarchy);

        if (vm.noOfSibilingNodesCanOpen < vm.openNodes[vm.viewMode].length) {
         var sibblingsArray = vm.openNodes[vm.viewMode].filter(function (value) {
           return (value.length == hierarchy.length) ? true : false;
          });
          if (sibblingsArray.length > vm.noOfSibilingNodesCanOpen) {
            removeElementInStoreOpen(sibblingsArray[0]);
          }
        }
        return true;
      }else {
       removeElementInStoreOpen(hierarchy);
       return false;
      }
    }
    function removeElementInStoreOpen(hierarchy) {
      vm.openNodes[vm.viewMode].splice(vm.openNodes[vm.viewMode].indexOf(hierarchy), 1);
      vm.openNodes[vm.viewMode] = vm.openNodes[vm.viewMode].filter(function (val) {
        return (val.includes(hierarchy + '-')) ? false : true;
      });
    }
    vm.setWidgetDataStatus = function() {
      vm.widgetDataStatus = vm.viewMode == 'offer' && vm.productReports.length == 0 ? 'noOffer' :
      (vm.viewMode == 'account' && vm.accountReports.length == 0 ? 'noAccount' : 'data')
    }
    vm.hasHierarchy = function() {
      return utilityService.isObject(vm.activeHierarchy[vm.viewMode]);
    }
    vm.getTotalChargeAmount = function() {
      var reports = vm.viewMode == 'offer' ? vm.productReports : vm.accountReports;
      var totalAmount = 0;
      for(var i in reports) {
        totalAmount += parseFloat(reports[i].amount);
      }
      return totalAmount;
    }
    vm.setActiveMillerPage = function() {
      vm.activeMillerPage = {records: [], amount: 0};
      var reportRecords = vm.viewMode == 'offer' ? vm.productReports : vm.accountReports;
      var activePageRecords = vm.viewMode == 'offer' ? vm.productReports : vm.accountReports;
      vm.parentRecord = null;
      if(vm.hasHierarchy()) {
        var levels = (vm.activeHierarchy[vm.viewMode]+"").split('-');
        var parent = null;
        levels.forEach(function(value, index) {
          parent = index == 0 ? reportRecords : vm.parentRecord.childNodes;
          vm.parentRecord = parent[parseInt(value)];
        });
        if(vm.parentRecord) {
          activePageRecords = vm.parentRecord.childNodes;
        }
      }
      vm.activeMillerPage.records = activePageRecords;
      for(var i in activePageRecords) {
        vm.activeMillerPage.amount += parseFloat(activePageRecords[i].amount);
      }
      vm.setViewAll();
    }
    function getProductReport() {
      vm.loading = true;
      vm.productReports = [];
      var idInterval = utilityService.getOrSetSelectedTimeInterVal().idInterval;
      offerChargeService.userDetails(idInterval, vm.accountId, vm.invoiceNumber, vm.onDemandInterval, vm.calendarStartDate, vm.calendarEndDate)
      .then(function(response) {
        vm.productReports = [];
        if (response) {
          var report = response.data.Report;
          vm.productReports = processProductReport(report);
          if(utilityService.isObject(report)) vm.currency = report.currency;
        }
        setPageData();
      }).catch(function(error) {
        vm.productReports = [];
        setPageData();
      });
    }
    function processProductReport(report, phierarchy) {
      var reports = [];
      for(var i in report.productOfferings) {
        var offer = report.productOfferings[i];
        offer.amount = offer.displayAmount ? offer.displayAmount : offer.amount;
        var accountId = report.folderSlice.payeeAccountId ? report.folderSlice.payeeAccountId.accountId : report.folderSlice.payerId.accountId;
        if(utilityService.isObject(offer.offeringsInBundle) && offer.offeringsInBundle.length > 0){
          offer.offeringsInBundle.forEach(function (pOffer) {
            pOffer.nodeType = 'PO';
            pOffer.nodeAccountId = accountId;
          });
          offer.nodeType = 'BUNDLE';
        }else {
          offer.nodeType = 'PO';
          offer.nodeAccountId = accountId;
        }
        if(utilityService.isObject(phierarchy)) {
          offer.phierarchy = phierarchy;
        }
        reports.push(offer);
      }
      var charges = getCharges(report);
      charges.records.forEach(function (charge) {
        reports.push(charge);
      });
      return reports;
    }
    function getAccountReports() {
      vm.loading = true;
      vm.accountReports = [];
      var idInterval = utilityService.getOrSetSelectedTimeInterVal().idInterval;
      offerChargeService.parentAccountDetails(0, 1000, idInterval, vm.accountId, vm.invoiceNumber, vm.onDemandInterval, vm.calendarStartDate, vm.calendarEndDate)
      .then(function(response) {
        vm.accountReports = [];
        if (response) {
          var report = response.data.Report;
          if(utilityService.isObject(report)) vm.currency = report.currency;
          if(report.name != null) {
            report.amount = report.displayAmount ? report.displayAmount : report.amount;
            vm.accountReports.push(report);
            report.nodeType = 'parentAccount';
            report.accountId = report.folderSlice.payerAccountId.acountId;
          }
        }
        setPageData();
      }).catch(function(error) {
        vm.accountReports = [];
        setPageData();
      });
    }
    function getChildAccountsDetails(accountId, currency, ancestorId, begin, end, chAccNameFilter, chAccPageFilter, callback) {
      vm.childAccloading = true;
      var idInterval = utilityService.getOrSetSelectedTimeInterVal().idInterval;
      var offset = (chAccPageFilter > 0) ? ((chAccPageFilter -1) * vm.chAccBufferSize) : 0;
      offerChargeService.childAccountDetails(offset, vm.chAccBufferSize, idInterval, accountId, currency, ancestorId, begin, end,
         vm.invoiceNumber, null, chAccNameFilter, vm.calendarStartDate, vm.calendarEndDate)
      .then(function(accountresponse) {
        vm.childAccloading = false;
        if(accountresponse){
          callback(accountresponse.data.Report, accountresponse.data.Children);
        }
      });
    }
    function setPageData() {
      vm.loading= false;
      vm.setActiveMillerPage();
      vm.setWidgetDataStatus();
    }
    function getCharges(report) {
      var additionalCharges = report.charges;
      var accountId = report.folderSlice.payeeAccountId ? report.folderSlice.payeeAccountId.accountId : report.folderSlice.payerId.accountId;
      var charges = { records: [], amount : 0};
      var piIndex = 0;
      if(additionalCharges) {
        additionalCharges.forEach(function (charge) {
          var chargeViewName = charge.en_ViewName? charge.en_ViewName : charge.displayName;
          if(chargeViewName == 'Miscellaneous Adjustments') {
            charge.nodeType = 'MiscAdjustment';
            charge.displayName = $filter('translate')('TEXT_MISC_ADJUSTMENTS');
          }else if(chargeViewName == 'NonStandard Charges') {
            charge.nodeType = 'NonStandardCharge';
            charge.displayName = $filter('translate')('TEXT_NON_STANDARD_CHARGES');
          }else {
            charge.nodeType = 'PI';
            charge.recordType = 'individualPI';
            charge.piIndex = piIndex;
            piIndex++;
          }
          charge.nodeAccountId = accountId;
          charges.records.push(charge);
          charge.amount = charge.displayAmount ? charge.displayAmount : charge.amount;
          charges.amount += parseFloat(charge.amount);
          charge.name = charge.displayName;
          if(charge.nodeType == 'PI') {
            setPvLayout(charge);
          }
        });
      }
      return charges;
    }
    function updateHierarchyOnNodeClick(record, type, index) {
      if(!utilityService.isObject(record.hierarchy)) {
        record.hierarchy = utilityService.isObject(record.phierarchy) ? record.phierarchy + "-" + index : (index + ''); 
      }
      vm.activeHierarchy[vm.viewMode] = record.hierarchy;
      // Update the tree open status
      if(type == 'tree') {
        var isOpen = vm.storeNodes(record.hierarchy);
        if(!isOpen)
          vm.activeHierarchy[vm.viewMode] = utilityService.isObject(record.phierarchy) ? record.phierarchy : null;
      }else {
        updateHierarchyForMiller();
      }
      /*end*/
    }
    function updateHierarchyForMiller() {
      if(utilityService.isObject(vm.activeHierarchy[vm.viewMode])) {
        var hierarchies = vm.activeHierarchy[vm.viewMode].split("-");
        var apHrch = null;
        vm.openNodes[vm.viewMode] = [];
        angular.forEach(hierarchies, function(nodeIndx){
          apHrch = apHrch == null ? (nodeIndx + '') : (apHrch + "-" + nodeIndx);
          vm.openNodes[vm.viewMode].push(apHrch);
        });
      }
    }
    vm.showNextNodes = function($event, record, type, index) {
      if(vm.childAccloading) return;
      $event.preventDefault();
      $event.stopPropagation();
      if(record.nodeType == 'PO' || record.nodeType == 'BUNDLE') {
        updateHierarchyOnNodeClick(record, type, index);
        var childNodes = record.charges;
        if(childNodes != null && !utilityService.isObject(record.childNodes)) {
          angular.forEach(childNodes, function(cRec){
            cRec.nodeType = 'PI';
            cRec.nodeAccountId = record.nodeAccountId;
            cRec.name = cRec.displayName;
            cRec.amount = cRec.displayAmount ? cRec.displayAmount : cRec.amount;
            cRec.phierarchy = record.hierarchy;
            setPvLayout(cRec);
          });
          if(record.nodeType == 'BUNDLE') {
            childNodes = childNodes.concat(record.offeringsInBundle);
            record.offeringsInBundle.forEach(function(pOffers){
              pOffers.phierarchy = record.hierarchy;
            });
          }
          record.childNodes = childNodes;
        }
        vm.setActiveMillerPage();
      }else if(record.nodeType == 'parentAccount' || record.nodeType == 'childAccount') {
        vm.loadChildAccountDetail(record, type, index, true);
      }else if(record.nodeType == 'PI') {
        setLayoutConfigs(record);
        initiateExpandMode();
      }else if(['MiscAdjustment', 'NonStandardCharge'].indexOf(record.nodeType) >= 0) {
        openChargeWidget(record);
      }
    }
    vm.loadChildAccountDetail = function(record, type, index, isNodeExpand) {
      var isOpening = !record.hierarchy || vm.openNodes[vm.viewMode].indexOf(record.hierarchy) == -1;
      var chAccNameFilter = null;
      var chAccPageFilter = 1;
      if(!isOpening  && isNodeExpand) { // Closing node with event
        updateHierarchyOnNodeClick(record, type, index);
        vm.setActiveMillerPage();
        return;
      }else if(isNodeExpand){ // opening node with event
        if(record.hierarchy) {
          vm.filterAccounts[record.hierarchy] = "";
          vm.filterPageNumber[record.hierarchy] = 1;
        }
      }else { // Refreshing child nodes with filter texts
        chAccNameFilter = vm.filterAccounts[record.hierarchy];
        if (isNaN(vm.filterPageNumber[record.hierarchy])) {
          vm.filterPageNumber[record.hierarchy] = 1;
        } else {
          if (parseInt(vm.filterPageNumber[record.hierarchy]) < 1) {
            chAccPageFilter = vm.filterPageNumber[record.hierarchy] = 1;
          } else if (parseInt(vm.filterPageNumber[record.hierarchy]) < parseInt(record.totalPages)) {
            chAccPageFilter = parseInt(vm.filterPageNumber[record.hierarchy]);
          } else {
            chAccPageFilter = vm.filterPageNumber[record.hierarchy] = parseInt(record.totalPages);
          }
        }
      }
      getChildAccountsDetails(record.id, record.currency, record.folderSlice.payeeAccountId.accountId,
      record.accountEffectiveDate.begin, record.accountEffectiveDate.end, chAccNameFilter, chAccPageFilter,function(childReport, children) {
        var childAccounts = children.childDetails;
          updateHierarchyOnNodeClick(record, type, index);
          var report = [];
          if(isNodeExpand) {
            report = processProductReport(childReport, record.hierarchy);
            record.childReports = JSON.parse(JSON.stringify(report));
            if(record.hierarchy) {
              vm.filterAccounts[record.hierarchy] = "";
              vm.filterPageNumber[record.hierarchy] = 1;
            }
          } else {
            report = JSON.parse(JSON.stringify(record.childReports));
          }
          childAccounts.forEach(function (account) {
            account.amount = account.displayAmount ? account.displayAmount : account.amount;
            account.nodeType = 'childAccount';
            report.push(account);
            account.phierarchy = record.hierarchy;
          });
          record.childNodes = report;
          record.childAccountsCount = children.childCount;
          record.accountsBeenShown = children.filterCount;
          record.childAccountsTotalCount = children.totalCount;
          record.totalPages = children.totalPages;;
          record.isFilterOutput = !utilityService.isEmpty(chAccNameFilter);
          vm.setActiveMillerPage();
        if(!isNodeExpand) {
          var timeout = $timeout(function() {
            angular.element('#filterAccounts-'+vm.activeFilterMode+"-"+record.hierarchy).focus();
          }, 300);
          vm.timeouts.push(timeout);
        }
      });
    }
  
    vm.filterChildAccounts = function(event, record, activeFilterMode, isResetPage) {
      vm.activeFilterMode = activeFilterMode;
      isResetPage ? (vm.filterPageNumber[record.hierarchy] = 1) : '';
      if (vm.filtering == false) {
        vm.filtering = true;
        var timeout = $timeout(function() {
          vm.filtering = false;
          vm.loadChildAccountDetail(record);
        }, 1000);
        vm.timeouts.push(timeout);
      }
    }
    vm.back = function() {
      var heirarchy = vm.activeHierarchy[vm.viewMode] + "";
      var index = heirarchy.lastIndexOf("-");
      vm.activeHierarchy[vm.viewMode] = index == -1 ? null  : heirarchy.substr(0, index);
      updateHierarchyForMiller();
      vm.setActiveMillerPage();
    }
    function initiateExpandMode() {
      vm.openExpandView('usage');
      var activeNode = vm.prItemsInfo[vm.prItemsInfo.activeNode];
      var isColumnKeys = activeNode.config.isColumns;
      var gridLayout = activeNode.gridLayout;
      var fileName = gridLayout['CustomImplementationFilePath'];
      fileName = (fileName.substring(fileName.lastIndexOf('/') + 1, fileName.length)).split(".")[0];
      vm.isCustomImplementation = fileName ? true : false;
      vm.tabularView = true;
      setTabularView(true);
      if(isColumnKeys.length > 0) {
        utilityService.gridSettingsStorageData(COMPONENT_NAME, null, []);
        var storageTabulardata = utilityService.gridSettingsStorageData(COMPONENT_NAME);
        var columnKeys = (storageTabulardata.activeColumns && (storageTabulardata.activeColumns).length > 0) ? 
        storageTabulardata.activeColumns : activeNode.config.defaultColumns;
        vm.checkboxSelection = vm.checkboxSelectionTemp = columnKeys;
        vm.freezeColumns = vm.freezeColumnsTemp = storageTabulardata.freezeColumns;
      }
      vm.prop = { "calendar": true, "sortable" : true, "filterable" : true, sortKeys : [$filter('translate')('TEXT_NONE')], 
      filterKeys : activeNode.config.filterables,
      displayNames : activeNode.localizedColumns};
      vm.prop.sortKeys = vm.prop.sortKeys.concat(activeNode.config.sortables);
      if($scope.chargeType != 'subCharge')
        $scope.$emit('widgetFilter', vm.prop);
    }
    function openChargeWidget(charge) {
      vm.chargeWidgetLoading = true;
      var accountId = vm.viewMode == 'account' ? charge.nodeAccountId : null;
      utilityService.isInfiniteScrollActivated(false);
      $rootScope.$emit('expandCharge', true, accountId, charge.nodeType, vm.widgetViewAllOpen,
      function() {
        vm.chargeWidgetLoading = false;
      });
    }
    vm.getChargeData = function() {
      var report = vm.viewMode == 'offer' ? vm.productReports : vm.accountReports;
      return report ? report : [];
    }
    vm.hasChild = function(nodeType) {
      return ['BUNDLE', 'PO', 'parentAccount', 'childAccount'].indexOf(nodeType) >= 0;
    }
    vm.getClassByNode = function(nodeType) {
      return nodeType=='PO' ? 'ecb-productCharges' : 
      (nodeType=='childAccount' || nodeType=='parentAccount' ? 'ecb-accountCharges' :
      (nodeType=='MiscAdjustment' || nodeType=='NonStandardCharge' ? 'ecb-nonofferingCharges' : 
      (nodeType=='PI' ? 'ecb-priceableitemCharges' : '')))
    }

    function setPvLayout(node, layoutLoaded) {
      var fileName = node.productSlice.viewId.pcName;
      var viewId = node.productSlice.viewId.pcId;
      if(!utilityService.isObject(vm.prItemsInfo[viewId+"-"+node.id])) {
        if(utilityService.isObject(fileName)) {
          fileName = fileName.substring(fileName.lastIndexOf('/') + 1, fileName.length);
        }
        var idInterval = utilityService.getOrSetSelectedTimeInterVal().idInterval;
        vm.prItemsInfo[viewId+"-"+node.id] = { loading: true, pvLayout: {}, currencyFields: [], localizedColumns: {}, usage: []};
        var parentSessionId = $scope.chargeType == 'subCharge' ? vm.subCharge.record['sessionid'] : null;
        offerChargeService.offerSummaryCharges(idInterval, vm.calendarStartDate, vm.calendarEndDate, 
          node.id, viewId, vm.accountId, vm.invoiceNumber, vm.onDemandInterval, null, null, 
          0, 1, node.nodeAccountId, vm.viewMode, vm.sortOrder, node.recordType, vm.hasSubCharge(node), parentSessionId)
          .then(function (response) {
            if (response) {
              vm.prItemsInfo[viewId+"-"+node.id].usage = response.usageDetails;
              getDefaultLocalizeFile(viewId, node.id, userLocale, function() {
                getLayoutFile(defaultConfigFile, fileName, viewId, node.id, layoutLoaded);
              });
            }
          })
        .catch (function(error) {
          vm.prItemsInfo[viewId+"-"+node.id].loading = false;
          if(typeof layoutLoaded == 'function') layoutLoaded();
        });
      }
    }
    function getLayoutFile(dFileName, fileName, viewId, instanceId, layoutLoaded) {
      if(utilityService.isObject(fileName)) {
        offerChargeService.productViewDetails(fileName).then(function(response) {
          vm.isConfigFile = true;
          vm.prItemsInfo[viewId+"-"+instanceId].gridLayout = response.data.GridLayout;
          var pvLayout = response.data.GridLayout.Elements.Element;
          vm.prItemsInfo[viewId+"-"+instanceId].currencyFields = [];
          for (var i = 0; i < pvLayout.length; i++) {
            var columnName = (pvLayout[i].ID).toLowerCase();
            vm.prItemsInfo[viewId+"-"+instanceId].pvLayout[columnName] = pvLayout[i];
            if(!utilityService.isEmpty(vm.defLocalizedCols) && utilityService.isObject(vm.defLocalizedCols[columnName])) {
              vm.prItemsInfo[viewId+"-"+instanceId].localizedColumns[columnName] = vm.defLocalizedCols[columnName];
            }else {
              vm.prItemsInfo[viewId+"-"+instanceId].localizedColumns[columnName] = pvLayout[i].DataIndex ? pvLayout[i].DataIndex : pvLayout[i].ID;
            }
            if(['CurrencyFormatter', 'CurrencyRenderer', 'ARCurrencyRenderer'].indexOf(pvLayout[i].Formatter) >= 0) {
              vm.prItemsInfo[viewId+"-"+instanceId].currencyFields.push(columnName);
            }
          }
          getLayoutLocalizeFile(fileName, viewId, instanceId, userLocale, layoutLoaded);
        })
        .catch(function(error) {
          if (fileName.toLowerCase() != (defaultConfigFile).toLowerCase()) {
            getLayoutFile(dFileName, dFileName, viewId, instanceId, layoutLoaded);
          }else {
            vm.prItemsInfo[viewId+"-"+instanceId].loading = false;
            if(typeof layoutLoaded == 'function') layoutLoaded();
          }
        });
      }else {
         vm.prItemsInfo[viewId+"-"+instanceId].loading = false;
         if(typeof layoutLoaded == 'function') layoutLoaded();
      }
    }
    function getLayoutLocalizeFile(fileName, viewId, instanceId, userLocale, layoutLoaded) {
      var localizefileName = fileName == defaultConfigFile ? defaultConfigLocalizeFile : fileName;
      offerChargeService.getXmlLocale(localizefileName, userLocale).then(function(response){
        var localeHeaders = response.data.mt_config.locale_space.locale_entry;
        for(var i = 0; i < localeHeaders.length; i++){
          var localHeaderName = localeHeaders[i].Name;
          localHeaderName = (localHeaderName.substring(localHeaderName.lastIndexOf('/') + 1, localHeaderName.length)).toLowerCase();
          vm.prItemsInfo[viewId+"-"+instanceId].localizedColumns[localHeaderName] = localeHeaders[i].Value;
        }
        vm.prItemsInfo[viewId+"-"+instanceId].loading = false;
        if(typeof layoutLoaded == 'function') layoutLoaded();
      })
      .catch(function(error) {
        if (userLocale !== 'en') {
          getLayoutLocalizeFile(fileName, viewId, instanceId, 'en', layoutLoaded);
        }else {
          vm.prItemsInfo[viewId+"-"+instanceId].loading = false;
          if(typeof layoutLoaded == 'function') layoutLoaded();
        }  
      });
    }
    function getDefaultLocalizeFile(viewId, instanceId, userLocale, callback) {
      vm.defLocalizedCols = {};
      offerChargeService.getXmlLocale(defaultConfigLocalizeFile, userLocale).then(function(response){
        var localeHeaders = response.data.mt_config.locale_space.locale_entry;
        for(var i = 0; i < localeHeaders.length; i++){
          var localHeaderName = localeHeaders[i].Name;
          localHeaderName = (localHeaderName.substring(localHeaderName.lastIndexOf('/') + 1, localHeaderName.length)).toLowerCase();
          vm.defLocalizedCols[localHeaderName] = localeHeaders[i].Value;
        }
        callback();
      })
      .catch(function(error) {
        if (userLocale !== 'en') {
          getDefaultLocalizeFile(viewId, instanceId, 'en', callback);
        }
        callback();
      });
    }
    vm.islayoutLoading = function(node) {
      return node.nodeType == 'PI' && vm.prItemsInfo[node.productSlice.viewId.pcId+"-"+node.id].loading;
    }
    function setExportColumns(id) {
      if(!utilityService.isObject(vm.prItemsInfo[id]['exportColumns'])) {
        vm.prItemsInfo[id]['exportColumns'] = []; vm.prItemsInfo[id]['exportLocale'] = [];
        if(vm.prItemsInfo[id].usage.length > 0) {
          var usageCols = [];
          Object.keys(vm.prItemsInfo[id].usage[0]).forEach(function(col) {
            usageCols.push(col.toLowerCase());
          });
         // usageCols = usageCols.map(v => v.toLowerCase());
          var config = vm.prItemsInfo[id].pvLayout;
          if(!utilityService.isEmpty(config)) {
            Object.keys(config).forEach(function(col) {
              col = col.toLowerCase();
              if(usageCols.indexOf(col) > -1 && utilityService.isObject(config[col]) && config[col].Exportable){
                var localizeColumn = vm.prItemsInfo[id].localizedColumns[col];
                vm.prItemsInfo[id]['exportColumns'].push(col);
                vm.prItemsInfo[id]['exportLocale'].push(localizeColumn ? localizeColumn : vm.prItemsInfo[id].pvLayout[col].ID);
              }
            });
          }else {
            vm.prItemsInfo[id].exportColumns = vm.prItemsInfo[id].exportLocale = usageCols;
          }
        }
      }
    }
    vm.getUsageDetailFile = function(node) {
      var id = node.productSlice.viewId.pcId+"-"+node.id;
      vm.prItemsInfo[id]['usagesFile'] = {};
      setExportColumns(id);
      var idInterval = utilityService.getOrSetSelectedTimeInterVal().idInterval;
      var parentSessionId = $scope.chargeType == 'subCharge' ? vm.subCharge.record['sessionid'] : null;
      offerChargeService.getFileAsStream(idInterval, vm.calendarStartDate, vm.calendarEndDate, node.id,
      node.productSlice.viewId.pcId, vm.accountId, vm.invoiceNumber, vm.onDemandInterval, 
      vm.prItemsInfo[id]['exportColumns'], vm.prItemsInfo[id]['exportLocale'], node.recordType, node.nodeAccountId, vm.viewMode, parentSessionId)
      .then(function(data){//is important that the data was returned as Aray Buffer
        vm.prItemsInfo[id]['usagesFile']= {type: new Blob([data],{ type:'text/csv'}), complete: true };
      },function(fail){
        vm.prItemsInfo[id]['usagesFile']= {type: new Blob([{}],{ type:'text/csv'}), complete: true };
      });
    }
    vm.downloadUsageFile = function(node) {
      if(utilityService.isObject(node)) {
        var id = node.productSlice.viewId.pcId+"-"+node.id;
        var usageFile = vm.prItemsInfo[id]['usagesFile'];
        if(usageFile && usageFile.complete && usageFile.type) {
          vm.prItemsInfo[id]['usagesFile'] = {};
          return usageFile.type;
        }
      }
    }
    // End of Tree and miller view code
    function getScrollContainer() {
      return vm.tabularView ? gridContainer : cardContainer;
    }
    vm.setViewAll = function() {
      var timeout = $timeout(function() {
        var viewEle = angular.element('#ecbOfferContentMiller').is(':visible') ? 'ecbOfferContentMiller' : 'ecbOfferContentTree';
        var isViewAll = angular.element('#'+viewEle+' ul:first-child').innerHeight() > angular.element('#'+viewEle).innerHeight();
        $scope.$apply(function(){vm.isViewAll = isViewAll });
      }, 400);
      vm.timeouts.push(timeout);
    }
    vm.openExpandView = function(type) {
      vm.widgetOpen = true;
      vm.widgetOpenType = type;
      vm.isPeriodChanged = false;
      $scope.$emit('expanded', 'expanded', COMPONENT_NAME);
      $scope.$emit('showBillPeriod', true);
      utilityService.isInfiniteScrollActivated(true);
      utilityService.gridSettingsStorageData(COMPONENT_NAME, null, []);
      vm.viewAllBodyHeight();
     // $scope.$emit('expandUsageWidget', true);
     if (type == 'viewall') {
      vm.widgetViewAllOpen = true;
     }
      $scope.$emit('widgetFilter', {calendar : true});
    }
    vm.closeExpandView = function() {
      vm.widgetOpen = false;
      $scope.$emit('expanded', 'collapsed');
      $scope.$emit('showBillPeriod', false);
      if(vm.transactionWidget) {
        $scope.$emit('expandTransactionPopup', false);
        $scope.$emit('dependentDirectiveViewChange', false, "ecb-offer-charge-summary");
      }
     // $scope.$emit('expandUsageWidget', false);
      vm.widgetViewAllOpen = false;
      utilityService.isInfiniteScrollActivated(false);
      processPostCloseActivity();
      vm.widgetOpenType = null;
    };
    vm.closeUsageData = function () {
      processPostCloseActivity();
      //initiateWidgetService();
      vm.openExpandView('viewall');
    };

    function processPostCloseActivity() {
      vm.setViewAll();
      resetUsageDetail();
      $scope.$emit('widgetFilter', {});
      if(vm.isPeriodChanged) {
        initiateWidgetService();
      }
    }
    function resetUsageDetail() {
      utilityService.gridSettingsStorageData(COMPONENT_NAME, null, []);
      vm.freezeColumns = [];
      vm.freezeColumnsTemp = [];
      vm.selectedSortKey = null;
      vm.calendarStartDate = null;
      vm.calendarEndDate = null;
      vm.selectedSortKey = null;
      vm.selectedFilters = {};
      vm.isTabularViewSettings = false;
    }
    vm.viewAllBodyHeight = function(ele) {
      angular.element(".ecb-expandBody").ready(function() {
        vm.getViewAllBodyHeight();
      });
    }
    vm.getViewAllBodyHeight = function(){
      return utilityService.manageViewAllBodyHeight("ecb-offercharge", "ecb-expandBody", 15);
    }
    // End of View All functionality code
    function setLayoutConfigs(node) {
      var id = node.productSlice.viewId.pcId+"-"+node.id;
      vm.prItemsInfo.activeNode = id;
      vm.prItemsInfo[id].node = node;
      if(utilityService.isEmpty(vm.prItemsInfo[id].config)) {
        vm.prItemsInfo[id].config = {isColumns: [], sortables: [], filterables: [], defaultColumns: []};
        if(vm.prItemsInfo[id].usage.length > 0) {
            var usageCols = [];
          Object.keys(vm.prItemsInfo[id].usage[0]).forEach(function(col) {
            usageCols.push(col.toLowerCase());
          });
            var config = vm.prItemsInfo[id].pvLayout;
            if(!utilityService.isEmpty(config)) {
              Object.keys(config).forEach(function(col) {
                col = col.toLowerCase();
                if(usageCols.indexOf(col) > -1 && utilityService.isObject(config[col]) && config[col].IsColumn){
                  if(col == 'timestamp') config[col].DataType = 'DateTime';
                  vm.prItemsInfo[id].config.isColumns.push(col);
                  if(config[col].DefaultColumn) vm.prItemsInfo[id].config.defaultColumns.push(col);
                  if(config[col].Sortable) vm.prItemsInfo[id].config.sortables.push(col);
                  if(config[col].Filterable) vm.prItemsInfo[id].config.filterables.push({'key': col, 'dataType': config[col].DataType, isGridFilter: false});
                }
              });
            }else {
              usageCols.forEach(function(col) {
                vm.prItemsInfo[id].config.isColumns.push(col);
                vm.prItemsInfo[id].config.defaultColumns.push(col); 
                vm.prItemsInfo[id].config.sortables.push(col);
                vm.prItemsInfo[id].config.filterables.push({'key': col, 'dataType': null});
              });
            }
          }
        }
      vm.checkboxSelection = vm.prItemsInfo[id].config.isColumns;
      vm.checkboxSelectionTemp = vm.prItemsInfo[id].config.isColumns;
    }
    vm.getSettingsHeight = function() {
      var height = $window.innerHeight;
      var systembarHeight = $document.find(".systemBar").height();
      var settingsHeader = $document.find(".ecb-settingsHeader").height();
      var settingsCheckboxHeader = $document.find(".ecb-settingsCheckboxHeader").height();
      if (height) return { "height": (height - (systembarHeight + settingsHeader + settingsCheckboxHeader + 40)) + "px" };
    }
    vm.showChargesTabularCardView = function(view) {
      if(view == 'card'){
        vm.tabularView = false;
        vm.isTabularViewSettings = false;
      }else{
        vm.tabularView = true;
      }
      vm.getFirstUsagePage();
      vm.viewAllBodyHeight();
    }
    function setTabularView(isInitialCall) {
      var width = $window.innerWidth;
      (width < 768) ? (vm.isMobile = true) : (vm.isMobile = false);
      if(vm.isMobile && (vm.tabularView == true || isInitialCall)){
        if(vm.isCustomImplementation){ vm.closeModal('ecb-prorate'); }
        vm.showChargesTabularCardView('card');
      }else if(!vm.isMobile && isInitialCall) {
        vm.showChargesTabularCardView('table');
      }
    }
    vm.isCheckboxSelection = function(header){
      return vm.checkboxSelectionTemp.indexOf(header) > -1;
    }
    vm.getActiveViewStyle = function(view) {
      return view == 'card' ? (vm.tabularView ? "ecb-cardTabularActiveView" : "ecb-cardTabularFadeView") : (!vm.tabularView ? "ecb-cardTabularActiveView" : "ecb-cardTabularFadeView");
    }
    vm.toggleTabularViewSettings = function(){
      vm.isTabularViewSettings = vm.isTabularViewSettings ? false : true;
      vm.checkboxSelectionTemp = angular.copy(vm.checkboxSelection);
      vm.freezeColumnsTemp = angular.copy(vm.freezeColumns);
    }
    vm.toggleHeaderSelection = function(header){
      var idx = vm.checkboxSelectionTemp.indexOf(header);
      idx > -1 ? vm.checkboxSelectionTemp.splice(idx, 1) : vm.checkboxSelectionTemp.push(header);
    }
    vm.toggleSelectAll = function(isAll){
      if(isAll == 0 && vm.freezeColumns.length == vm.checkboxSelection.length) return;
      vm.checkboxSelectionTemp = isAll == 1 ? angular.copy(vm.prItemsInfo[vm.prItemsInfo.activeNode].config.isColumns) : [];
    }
    vm.isAllColumnDeselected = function(){
      return (vm.checkboxSelectionTemp).length == 0 ? true : false;
    }
    vm.applyCancelSettings = function(isApply){
      if(isApply){
        vm.checkboxSelection = angular.copy(vm.checkboxSelectionTemp);
        vm.freezeColumns = angular.copy(vm.freezeColumnsTemp);
        //Not caching beacuse columns are dynamic for PI
        //utilityService.gridSettingsStorageData(COMPONENT_NAME, vm.checkboxSelection, vm.freezeColumns);
        vm.gridOptions.columnDefs = getColumnDefinitions();
      }
      vm.isTabularViewSettings = false;
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
    vm.getSortByColumn = function(defaultKey) {
      return vm.selectedSortKey ? vm.selectedSortKey : (defaultKey ? defaultKey : null);
    }
    vm.toggleFreezingColumns = function(header, unfreezeColumns) {
      if((unfreezeColumns && vm.checkboxSelectionTemp.indexOf(header) == -1)) return;
      var columnIndex = vm.freezeColumnsTemp.indexOf(header);
      if (columnIndex > -1)
        vm.freezeColumnsTemp.splice(columnIndex, 1);
      else
        vm.freezeColumnsTemp.push(header);
    }
    vm.usageScollInputs = function() {
      return {
        bufferSize: vm.tabularView ? 3 : 1,
        scrollContainer: getScrollContainer,
        getRecords: vm.getUsageDetails,
        loader: function(status){
          vm.loading = status;
        },
        updateDataSource: function(scrollData, isBuffer) {
          if(utilityService.isObject(scrollData) && scrollData.length > 0) {
            vm.usageDetails = scrollData;
            if(vm.tabularView) {
              vm.gridOptions.data = scrollData;
              var timeout = $timeout(function() {
                  vm.tabularGridApi.core.refresh();
                  if(isBuffer)
                    vm.tabularGridApi.infiniteScroll.resetScroll(true, true);
              });
              vm.timeouts.push(timeout);
            }
          }
        }
      }
    }
    vm.getFirstUsagePage = function() {
      vm.usageDetails = [];
      infiniteSroll.start(vm.usageScollInputs());
      if(vm.tabularView)
        vm.setGridOptions();
      else
        infiniteSroll.createScrollEvent();
    };
    vm.setGridOptions = function(callback){
      vm.gridOptions = {
        data: vm.usageDetails,
        infiniteScrollRowsFromEnd: 40,
        infiniteScrollUp: true,
        infiniteScrollDown: true,
        columnDefs : getColumnDefinitions(),
        rowHeight : 32,
        enableColumnResizing : true,
        enableSorting: true,
        enableColumnMenus: false,
        enableColumnMoving: true,
        appScopeProvider : vm,
        onRegisterApi : function(gridApi){
          infiniteSroll.createScrollEvent();
          vm.tabularGridApi = gridApi;
          if(typeof callback == 'function') callback();
          vm.tabularGridApi.core.on.sortChanged( $scope, function( grid, sortColumns ) {
            var sortKey = sortColumns.length > 0 ? sortColumns[0].field : null;
            if(!vm.idIntervalCurr && !vm.dataCurr && !vm.calendarParamCurr) {
              vm.idIntervalCurr = utilityService.getOrSetSelectedTimeInterVal().idInterval;
            }
            loadDataOnChange(vm.idIntervalCurr, vm.dataCurr, vm.calendarParamCurr, sortKey, vm.selectedFilters);
            if($scope.chargeType != 'subCharge') {
              $rootScope.$emit('setSortKey', vm.selectedSortKey);
            }
          });
        }
      };
    };
    vm.hideProperties = function(records){
      if(utilityService.isObject(records) && records.length > 0) {
        var keys = Object.keys(records[0]);
        var isColumnKeys = vm.prItemsInfo[vm.prItemsInfo.activeNode].config.isColumns;
        var hideKeys = utilityService.arrayDifference(isColumnKeys, keys);
        records.forEach(function(record) {
          hideKeys.forEach(function(key) {
            record['hidden_'+key] = angular.copy(record[key]);
            delete record[key];
          });
        });
      }
      return records;
    }
    vm.isHidden = function(key){
      var pattern = /^hidden_/i
      return pattern.test(key);
    }
    vm.getLocaleHeaderName = function(header){
      var localizeHeader = vm.prItemsInfo[vm.prItemsInfo.activeNode].localizedColumns[header];
      return utilityService.isObject(localizeHeader) ? localizeHeader : header;
    }
    vm.hasSubCharge = function(node) {
      var activeNode = node ? node : (vm.prItemsInfo && vm.prItemsInfo.activeNode ? vm.prItemsInfo[vm.prItemsInfo.activeNode].node : null);
      return activeNode ? $scope.chargeType != 'subCharge' && (activeNode.hasChildren == true && activeNode.hasChildren >= 1) : false;
    }
    vm.showProrateMessage = function(row) {
      vm.prorateMessage = '';
      var usageDetail = removeHiddenProperties(row);
      var gridLayout = vm.prItemsInfo[vm.prItemsInfo.activeNode].gridLayout;
      var fileName = gridLayout['CustomImplementationFilePath'];
      fileName = (fileName.substring(fileName.lastIndexOf('/') + 1, fileName.length)).split(".")[0];
      var fileURL = '/static/' + utilityService.getSiteName() + '/js/' + fileName+'.js';
      angularLoad.loadScript(fileURL).then(function () {
        processProrateMessage(usageDetail);
      }).catch(function () {
        fileURL = '/static/default/js/' + fileName + '.js';
        angularLoad.loadScript(fileURL).then(function () {
          processProrateMessage(usageDetail);
        }).catch(function () {
          vm.prorateMessage = $filter('translate')('TEXT_CUSTOM_FILE_NOT_THERE_ERROR') + fileName;
          vm.openModal('ecb-prorate');
        });
      });
    }
    function processProrateMessage(usageDetail) {
      vm.prorateMessage = onExpand(usageDetail, $filter, $moment, utilityService);
      vm.openModal('ecb-prorate');
    }
    function getColumnDefinitions(){
      var columnDefs = [];
      var activeNode = vm.prItemsInfo[vm.prItemsInfo.activeNode];
      var columns = activeNode.config.isColumns;
      if(vm.isCustomImplementation) {
        var more = $filter('translate')('TEXT_MORE');
        columnDefs.push({ "field": 'Actions', displayName: $filter('translate')('TEXT_ACTIONS'), minWidth: 160, pinnedLeft: !vm.isRTL, pinnedRight: vm.isRTL, enableSorting: false,
        cellTemplate: '<button class="btn ebBtn ebColor_textLinkBlue ecb-ProtBn" ng-click="grid.appScope.showProrateMessage(row.entity)">' + 
        more + '</button>'
        });
      }
      if(vm.hasSubCharge()) {
        var defaultOption = $filter('translate')('TEXT_SELECT_MULTIPOINTS');
        columnDefs.push({"field": 'subCharge', displayName: $filter('translate')('TEXT_MULTIPOINT'), minWidth: 170, enableSorting: false, pinnedLeft: !vm.isRTL, pinnedRight: vm.isRTL,
        cellTemplate: '<select ng-if="row.entity.hidden_subChargeRecords != null" class="form-control subcharge-dropdown" ' +
          'ng-model="grid.appScope.selectedItem[row.entity.hidden_index]" ng-change="grid.appScope.showSubcharge(row.entity.hidden_index)" ng-options="x as x.viewname for x in row.entity.hidden_subChargeRecords">' +
          '<option value="" disabled>'+defaultOption+'</option></select>'});
        // Sub Charges Total
        columnDefs.push({"field": 'subChargeTotal', displayName: $filter('translate')('TEXT_MULTIPOINTS_TOTAL'), minWidth: 80, enableSorting: false, pinnedLeft: !vm.isRTL, pinnedRight: vm.isRTL,
        cellTemplate: '<div class="ui-grid-cell-contents">{{ row.entity.hidden_subChargeRecordsTotal }}</div>',cellClass: 'text-right' });
      }
      columns.forEach(function(column) {
        column = column.toLowerCase();
        var isVisible = vm.checkboxSelection.indexOf(column) > -1 ? true : false;
        var columnDefinition = {"field" : column, displayName : vm.getLocaleHeaderName(column), 
        visible : isVisible, minWidth : 140};
        if(vm.freezeColumns.indexOf(column) > -1)
          columnDefinition.pinnedLeft = true;
        if(!utilityService.isEmpty(activeNode.pvLayout) && ((activeNode.currencyFields.indexOf(column) > -1) || (activeNode.pvLayout[column] && ['Numeric', 'Decimal'].indexOf(activeNode.pvLayout[column]['DataType']) > -1)))
          columnDefinition.cellClass = 'text-right';
        columnDefinition.enableSorting = activeNode.config.sortables.indexOf(columnDefinition.field) > -1 ? true : false;
        columnDefinition.sort = {ignoreSort: true};
        columnDefinition.suppressRemoveSort = true;
        if(vm.selectedSortKey == columnDefinition.field)
            columnDefinition.sort.direction = vm.sortOrder ? vm.sortOrder : 'desc';
        columnDefs.push(columnDefinition);
      });
      return columnDefs;
    }
    /**
     * Primary pagination function for obtaining offer charges.
     * @param index
     * @param count
     * @returns {*}
     */
    vm.getUsageDetails = function(index, count) {
      log.log('offerChargeSummary.getMoreData -> index: ' + index + ' count: ' + count);
      index = !utilityService.isObject(index) ? 0 : index;
      var viewInstanceId = vm.prItemsInfo.activeNode.split("-");
      var idInterval = utilityService.getOrSetSelectedTimeInterVal().idInterval;
      var node = vm.prItemsInfo[vm.prItemsInfo.activeNode].node;
      var parentSessionId = $scope.chargeType == 'subCharge' ? vm.subCharge.record['sessionid'] : null;
      return offerChargeService.offerSummaryCharges(idInterval, vm.calendarStartDate, vm.calendarEndDate, viewInstanceId[1], viewInstanceId[0], vm.accountId, vm.invoiceNumber, 
      vm.onDemandInterval, vm.selectedSortKey, vm.selectedFilters, index, count, node.nodeAccountId, vm.viewMode, vm.sortOrder, node.recordType, vm.hasSubCharge(), parentSessionId)
      .then(function(response) {
        vm.loading = false;
        var usageDetails = [];
        if (utilityService.isObject(response)) {
          var usageDetails = angular.copy(response.usageDetails);
          usageDetails = vm.manipulateUsageDetail(usageDetails);
        }
        return vm.hideProperties(usageDetails);
      }).catch(function (error) {
        return [];
      });
    };
    vm.manipulateUsageDetail = function(usageDetails){
      if (!utilityService.isEmpty(usageDetails)) {
        var dateFormat = utilityService.getDateFormatterByLang()['dateAndTimeFormat'];
        dateFormat = utilityService.isObject(dateFormat) ? dateFormat : vm.calendarDateFormat;
        var pvLaout = vm.prItemsInfo[vm.prItemsInfo.activeNode].pvLayout;
        var dateTypeCols = [];
        Object.keys(pvLaout).forEach(function(col) {
          if(pvLaout[col]['DataType'] == 'Date' || pvLaout[col]['DataType'] == 'DateTime' || col == 'timestamp') {
            dateTypeCols.push(col);
          }
        });
        var activeNode = vm.prItemsInfo[vm.prItemsInfo.activeNode];
        usageDetails.forEach(function(record, recIndex) {
          record.index = recIndex;
          //Adding currency Symbol
          activeNode.currencyFields.forEach(function(column) {
            record[column] = vm.currencyFormatter(record[column], record['currency']);
          });
          // Date Format
          try {
            dateTypeCols.forEach(function(column) {
              var date = $moment(record[column], vm.calendarDateTimeFormat).format(dateFormat);
              record[column] = date;
            });
          }catch(e) {}
          //add default Sub charge
          record.subChargeRecordsTotal = null;
          if(record.subChargeRecords != null) {
            var subChargeTotal = 0;
            var currencySymbol = null;
            record.subChargeRecords.forEach(function(subcharge) {
              subcharge.productSlice = {
                viewId: {pcId: subcharge.viewid, pcName: subcharge.pcname}
              }
              subcharge.id = subcharge.priceableiteminstanceid;
              if(utilityService.isObject(subcharge.amount))
                subChargeTotal += parseFloat(subcharge.amount);
              currencySymbol = subcharge['currency'];
              subcharge.name = subcharge.viewname;
              if(vm.i18n.languageDirection == 'RTL'){
                subcharge.viewname = vm.currencyFormatter(subcharge.amount, currencySymbol) + ' | ' + subcharge.viewname;
              }else {
                subcharge.viewname = subcharge.viewname + ' | ' + vm.currencyFormatter(subcharge.amount, currencySymbol);
              }
              
            });
            record.subChargeRecordsTotal = vm.currencyFormatter(subChargeTotal, currencySymbol);;
          }
          if(userSettings.settings.billing.inlineTax == 'T') {
            angular.forEach(inlineTaxUsageColumnMap, function(mapCol, col) {
              record[col] = record[mapCol];
            });
          }
          record
        });
      }
      return usageDetails;
    }

    vm.getCurrencySign = function (code) {
      return utilityService.getCurrencySign(code);
    }

    vm.currencyFormatter = function (value, code, isSymbol) {
      return utilityService.currencyFormatter(value, code, isSymbol);
    }
    vm.getChevronClass = function(node) {
      if(vm.openNodes[vm.viewMode].indexOf(node.hierarchy) >= 0)
        return 'down';
      else if(vm.openNodes[vm.viewMode].indexOf(node.hierarchy) == -1)
        return vm.i18n.languageDirection == 'RTL' ? 'left' : 'right';
      return '';
    }
    function removeHiddenProperties(usageDetail){
      var usageDetailWHidden = angular.copy(usageDetail);
      if(utilityService.isObject(usageDetail)) {
        var keys = Object.keys(usageDetail);
        keys.forEach(function(key) {
          if(vm.isHidden(key)) {
            var originalKey = key.split('hidden_')[1];
            usageDetailWHidden[originalKey] = usageDetailWHidden[key];
            delete usageDetailWHidden[key];
          }
        });
      }
      return usageDetailWHidden;
    }

    vm.showSubcharge = function(rowIndex) {
      if(!utilityService.isObject(vm.selectedItem[rowIndex])) return;
      vm.openModal('ecb-subCharge');
      var usageDetail = removeHiddenProperties(vm.usageDetails[rowIndex]);
      vm.selectSubCharge = true;
      utilityService.parentCharge = {
        record: usageDetail,
        idInterval: utilityService.getOrSetSelectedTimeInterVal().idInterval, 
        accountId: vm.accountId, 
        invoiceNumber: vm.invoiceNumber, 
        onDemandInterval: vm.onDemandInterval,
        calendarStartDate: vm.calendarStartDate, 
        calendarEndDate: vm.calendarEndDate,
        parentNode: vm.prItemsInfo[vm.prItemsInfo.activeNode].node,
        node: vm.selectedItem[rowIndex]
      }
      vm.selectedItem[rowIndex] = null;
    }
    vm.openModal = function(id){
      ecbModalService.open(id);
    }
    vm.closeModal = function(id){
      if(id == 'ecb-subCharge') {
        vm.selectSubCharge = false;
        utilityService.parentCharge = null;
      }
      ecbModalService.close(id);
    }
    vm.isAccFilterInput = function(node) {
      return node.childAccountsTotalCount > node.childAccountsCount || node.isFilterOutput;
    }
    vm.focusOnFilter = function(hierarchy, type) {
      angular.element('#filterAccounts-'+type+"-"+hierarchy).focus();
    }
    vm.isNodeFilter = function(node) {
      return vm.filterAccounts[node.hierarchy] && vm.filterAccounts[node.hierarchy].length > 0;
    }
    $scope.$on('$destroy', function () {
      utilityService.cleanUpListners(unregisterChargeSummaryEvents);
      vm.timeouts.forEach(function(pull) {
        $timeout.cancel(pull);
      });
    });
  }
})();

