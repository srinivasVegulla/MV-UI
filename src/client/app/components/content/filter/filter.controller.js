(function() {
  'use strict';
  angular
    .module('app.filter')
    .controller('filterDataController', Controller);
  Controller.$inject = [
    '$http',
    '$scope',
    '$rootScope',
    '$filter',
    'filterService',
    'logger',
    '$moment',
    'localStorageService',
    'utilityService',
    'dateFilter',
    '$timeout',
    'translatorHelper'
  ];
  /* @ngInject */
  function Controller(
    $http,
    $scope,
    $rootScope,
    $filter,
    filterService,
    logger,
    $moment,
    localStorageService,
    utilityService,
    dateFilter,
    $timeout,
    translatorHelper) {
    var vm = this,
      w = window,
      temp,
      _exisitingIndex = 0,
      COMPONENT_NAME = 'Filter',
      intervalsIndexMap = {},
      intervalChange,
      widgetModeInterval,
      filterInterval,
      filterSelected,
      currentIndex,
      sortKeyFilter,
      showFilterStatus,
      paymentStatusFilters,
      setSelectViewOn,
      setSortKeyEvent,
      transactionWidget;
    vm.dateRangeValues = {};
    vm.nodata = false;
    vm.billPeriodTypeSelectedIndex = 0;
    vm.calendarDateFormat = vm.localizeDateFormat = utilityService.dateFormat;
    vm.filterFields = {};
    var selectedInterval;
    var unregisterFilterEvents = [];
    vm.getDocumentDetails = getDocumentDetails;
    vm.cardsAvailable = [];
    vm.billPeriodDisplayCards = [];
    vm.dateRangeCards = [];
    vm.toggleCardsSelection = toggleCardsSelection;
    vm.checkboxSelection = checkboxSelection;
    vm.checkFilterStatus = checkFilterStatus;
    vm.paymentsHistoryFilters = ["PENDING", "REJECTED"];
    vm.paymentsHistoryFiltersTemp = vm.paymentsHistoryFilters;
    vm.toggleFilterSelection = toggleFilterSelection;
    vm.widgetFilter = {};
    vm.showSelectBilingFilter = false;
    vm.downloadCardsFileName = "downloadCards.json";
    vm.filterTrigger = false;
    vm.ecbARValue = localStorageService.get('ecbarStatus');
    vm.ecbARCheck = false;
    vm.getFilterData = getFilterData;

    activate();

    function activate(){
      if(vm.ecbARValue === '0'){
        vm.ecbARCheck = true;
      } else {
        vm.ecbARCheck = false;
      }
      utilityService.getLocaleDateFormatter().then(function () {
        vm.localizeDateFormat = vm.getDateFormatByLang();
        vm.localizePickDateFormat = utilityService.convertPickDateFormat(vm.localizeDateFormat);
        vm.maxDateLimit = $moment().format(vm.localizeDateFormat);
      });
    }

    getDocumentDetails();
    function toggleCardsSelection(header) {
      var columnIndex = vm.selecetdCards.indexOf(header);
      if (columnIndex > -1) {
        vm.selecetdCards.splice(columnIndex, 1);
      } else {
        vm.selecetdCards.push(header);
      }
    }

    var i18n = translatorHelper.loadFromStorage();
      vm.layoutLeftDirection = 'left';
      vm.layoutRightDirection = 'right';
      if(i18n.languageDirection == 'RTL') {
        vm.layoutLeftDirection = 'right';
        vm.layoutRightDirection = 'left';
      }

    function toggleFilterSelection(filter) {
      var filterIndex = vm.paymentsHistoryFiltersTemp.indexOf(filter);
      if(filterIndex > -1) {
        vm.paymentsHistoryFiltersTemp.splice(filterIndex, 1);
      } else {
        vm.paymentsHistoryFiltersTemp.push(filter);
      }
    }

    function checkboxSelection(card) {
      return (vm.selecetdCards.indexOf(card) > -1);
    }

    $scope.$on('hardClosedIntervals_editAccountInfo', function(event, data) {
      var hardInterval = (data === 'F') ? false : true;
      // After getting hardClosedinterval status call filterdata service for one time.
      if(vm.hardClosedIntervals == undefined || vm.hardClosedIntervals == null){
        vm.hardClosedIntervals = hardInterval;
        vm.getFilterData();
      }
      vm.hardClosedIntervals = hardInterval;
    });
    intervalChange = $rootScope.$on('intervalsChanged', function(event, data) {
      //var x = intervalsIndexMap[data];
      vm.setChoiceIndex(data);
    });
    currentIndex = $rootScope.$on('selected_index', function(event, data){
      _exisitingIndex = data;
    });

    paymentStatusFilters = $rootScope.$on('paymentStatusFilters', function(event, data) {
      vm.statusFiltersAvailable = data;
    });

    showFilterStatus = $rootScope.$on('show_filter_status', function(event, data) {
      var updatedFilters = data;
      var filtersListTemp = [];
      for(var item in updatedFilters) {
        if(updatedFilters[item] === true) {
          filtersListTemp.push(item);
        }
      }
      //vm.statusFiltersAvailable = filtersListTemp;
      vm.paymentsHistoryFiltersTemp = filtersListTemp;
      vm.paymentsHistoryFilters = filtersListTemp;
    });

    setSelectViewOn = $rootScope.$on('setSelectedViewOn', function(event, data) {
        vm.showSelectBilingFilter = (data == 'bills' ? true : false);
    });

    setSortKeyEvent = $rootScope.$on('setSortKey', function(event, key) {
        if(key)
          vm.setSortKey(key);
    });

    widgetModeInterval = $rootScope.$on('widgetFilter', function(event, data) {
        //vm.expandedState = data == 'expanded' ? true : false;
        //data.filterable;data.sortable;data.calendar;
        vm.filterFields = {};
        vm.widgetFilter = angular.copy(data);
        vm.billPeriodTypeSelectedIndex = 0;
        if(vm.widgetFilter.statusFilter)
          vm.statusFiltersAvailable = vm.widgetFilter.statusFiltersList;
        if(vm.widgetFilter.calendar == true)
          vm.billPeriodTypeSelectedIndex =  vm.showSelectBilingFilter ? 0 : 1;
        else if(vm.widgetFilter.calendar == 'unchange-1'){
          vm.widgetFilter.calendar = true
        }else{
          vm.billPeriodTypeSelectedIndex = 0;
        }
        $timeout(function() {
            vm.setInterValData(vm.getSelectedInterval());
        })
    });

    transactionWidget = $rootScope.$on('expandTransactionPopup', function(event,data) {
      vm.expandTransactionPopup = data;
    });

    $rootScope.$on('userTypeData', function(event,data) {
      vm.hasUserType = data;
    });

    vm.showMillerWidgetPopup = function(){
      $rootScope.$emit('showMillerWidgetPopup', true);
    }

    function checkFilterStatus(filter) {
      return (vm.paymentsHistoryFiltersTemp.indexOf(filter) > -1)
    }

    // filter interval will either contain interval or calendar param
    filterInterval = $scope.$on('show_filter_intervals', function(event, idInterval, data, calendarParam, sortKey, filterItems) {
      vm.setInterValData(data, calendarParam, true);
      if(utilityService.isInfiniteScrollActivated())
        setSortAndFilterKeys(sortKey, filterItems);
    });

    sortKeyFilter = $rootScope.$on('filter_criteria_event', function(event, sortKey, filterItems) {
      setSortAndFilterKeys(sortKey, filterItems);
    });

    $rootScope.$on('userTypeData', function(event, value) {
      if(vm.filterTrigger == true)
        vm.getFilterData();
    });

    w.onresize = function() {
      var x = w.innerWidth;
      if (x > 768) {
        angular.element(document.getElementById('filterModal')).modal('hide');
      }
    };

    $scope.$watch("vm.accountId", function handleFooChange( newValue ) {
        vm.getFilterData();
        vm.formatBillingPeriodInterval = formatBillingPeriodInterval;
      }
    );

    function setSortAndFilterKeys(sortKey, filterItems){
      if(vm.widgetFilter) vm.widgetFilter.sortKey = sortKey;
    }

    function getFilterData() {
      vm.filterTrigger = true;
      filterService.getFilter(vm.accountId)
        .then(function(response) {
          if(localStorageService.get("userType")) vm.filterTrigger = false;
          if (response && response.data) {
            var sinceLastBillDate = null;
            vm.accountIntervals = response.data.accountIntervals;
            vm.minDate = vm.accountIntervals[vm.accountIntervals.length-1].startDateAsString;
            vm.minDateLimit = $moment(vm.minDate, vm.calendarDateFormat).format(vm.localizeDateFormat);
            if (vm.accountIntervals.length) {
              vm.hardClosedIntervalsList = [];
              for (var i in vm.accountIntervals) {
                if (vm.accountIntervals[i].statusCode == "H"){
                  vm.hardClosedIntervalsList.push(vm.accountIntervals[i]);
                }
              }
              if(!sinceLastBillDate)
                sinceLastBillDate = (vm.accountIntervals[0].startDate).getTime();

              localStorageService.set("sinceLastBillDate", sinceLastBillDate);

            var hardClosedIntervals = vm.hardClosedIntervals,
                isEmptyHardclosedIntervalsList = !vm.hardClosedIntervalsList.length,
                isEmptyAccountIntervalsList = !vm.accountIntervals.length;
            if (hardClosedIntervals) {
              if (isEmptyAccountIntervalsList) {
                vm.nodata = true;
              } else {
              if (isEmptyHardclosedIntervalsList) {
                vm.nodata = true;
              }}
            } else {
              if (isEmptyAccountIntervalsList) {
                vm.nodata = true;
                var indexValue = 0;
                vm.accountIntervals.forEach(function(node) {
                  intervalsIndexMap[node.idInterval] = indexValue;
                  indexValue++;
                });
              } else {
                var indexValue = 0;
                vm.hardClosedIntervalsList.forEach(function(node) {
                  intervalsIndexMap[node.idInterval] = indexValue;
                  indexValue++;
                });
              }
            }
              angular.forEach(vm.accountIntervals, function(value) {
                value.startDate = value.startDateAsString;
                value.endDate = value.endDateAsString;
              });
              var i = 0,
                n = response.data.accountIntervals.length;
              if (vm.hardClosedIntervals == true && vm.hardClosedIntervalsList.length) {
                $rootScope.$emit('filter_account_intervals', vm.hardClosedIntervalsList, 0);
                buildIndexMap(vm.hardClosedIntervalsList);
              } else {
                $rootScope.$emit('filter_account_intervals', vm.accountIntervals, 0);
                buildIndexMap(vm.accountIntervals);
              }
            }
          }
        })
        .catch(handleError);
    }

    function buildIndexMap(array) {
      var indexValue = 0;
      array.forEach(function(node) {
        intervalsIndexMap[node.idInterval] = indexValue;
        indexValue++;
      });
    }

    vm.getSelectedInterval = function(){
      return vm.hardClosedIntervals == true ? vm.hardClosedIntervalsList[vm.index] : vm.accountIntervals[vm.index];
    }

    vm.onDateRangeChanged = function(y) {
      var filterVals = angular.copy(vm.filterFields);
      Object.keys(filterVals).forEach(function(fieldKey) {
        var isDate = false;
        vm.widgetFilter.filterKeys.forEach(function(item) {
          isDate = item.key == fieldKey && vm.isDateType(item.dataType) && item.isGridFilter == false? true : isDate;
        });
        if(filterVals[fieldKey].length === 0)
          delete filterVals[fieldKey];
        else if(isDate){
          filterVals[fieldKey] = $moment(filterVals[fieldKey], vm.localizeDateFormat).format(vm.calendarDateFormat);
        }
      });

      utilityService.getOrSetSelectedCards(vm.selecetdCards);
      $scope.$broadcast('show_filter_selectedby', vm.billPeriodTypeSelectedIndex);
      if(vm.widgetFilter.statusFilter) {
        utilityService.getOrSetSelectedCards(vm.paymentsHistoryFiltersTemp);
        vm.paymentsHistoryFilters = vm.paymentsHistoryFiltersTemp;
        $rootScope.$emit('show_filter_paymentsHistory', angular.copy(vm.paymentsHistoryFiltersTemp));
      }
      if(vm.widgetFilter)
        $rootScope.$emit('filter_criteria_event', angular.copy(vm.widgetFilter.sortKey), filterVals);
      // if previous filter was calendar, then after swithcing to bill get interval data
      if(vm.billPeriodTypeSelectedIndex == 1){
        var startDate = $moment(vm.filterStartDate, vm.localizeDateFormat).format(vm.calendarDateFormat);
        var endDate = $moment(vm.filterEndDate, vm.localizeDateFormat).format(vm.calendarDateFormat);
        var params = {
          "startDate" : startDate,
          "endDate" : endDate
        }
        $rootScope.$emit("triggerInterval", null, null, params, false, angular.copy(vm.widgetFilter.sortKey), filterVals);
        vm.isInterValRefresh = true;
      }else {
        vm.dateRangeValues.startDate = y.startDate;
        vm.dateRangeValues.endDate = y.endDate;
        localStorageService.set("selectedTimeInterval", y);
        selectedInterval = localStorageService.get("selectedTimeInterval");
        $rootScope.$emit("triggerInterval", selectedInterval.idInterval, vm.dateRangeValues, null, (vm.isInterValRefresh || utilityService.isInfiniteScrollActivated()), angular.copy(vm.widgetFilter.sortKey), filterVals);
        vm.isInterValRefresh = false;
      }
    };
    vm.restoreInterval = function() {
      vm.paymentsHistoryFiltersTemp = vm.paymentsHistoryFilters;
      if(_exisitingIndex)
        vm.index = _exisitingIndex;
    }
    vm.changeDropdown = function(y) {
     vm.selectedDateRange = y;
    };
    vm.setChoiceIndex = function(x) {
      _exisitingIndex = vm.index;
      vm.index = x;
    };

    vm.isCalendarView = function() {
      return vm.widgetFilter && vm.widgetFilter.calendar && vm.billPeriodTypeSelectedIndex == 1;
    }

    vm.isCalendarOption = function() {
      return vm.widgetFilter && vm.widgetFilter.calendar;
    }

    vm.changeBillPeriodType = function(index){
      vm.isInterValRefresh = true;
      vm.billPeriodTypeSelectedIndex = index;
      if(index != 0 && vm.intervalData) {
        vm.filterStartDate = $moment(vm.intervalData.startDate, vm.calendarDateFormat).format(vm.localizeDateFormat);
        vm.filterEndDate = $moment(vm.intervalData.endDate, vm.calendarDateFormat).format(vm.localizeDateFormat);
      }
      vm.cardsAvailable = getCardsAsPerbillPeriod(vm.billPeriodTypeSelectedIndex);
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
    }

    filterSelected = $rootScope.$on('filter_icon_selected', function(event,data) {
      vm.cardsAvailable = getCardsAsPerbillPeriod(vm.billPeriodTypeSelectedIndex);
      vm.selecetdCards = utilityService.getOrSetSelectedCards();
    });

    function getDocumentDetails() {
      utilityService.getExtConfigFile(vm.downloadCardsFileName).then(function(response) {
        vm.documents = response.data.columns.cardNames;
        if (!vm.ecbARCheck) {
          for (var index in vm.documents) {
            if (vm.documents[index].name == 'debitNotes') {
              vm.documents.splice(index, 1);
            }
          }
        }
        processCards();
        vm.selecetdCards = utilityService.getOrSetSelectedCards();
      }).catch(function(error) {
        logger.log('Error retrieving cards data. Please contact customer support.', error);
      });
    }

    function getCardsAsPerbillPeriod(cardIndex){
      var cardNames = [];
      for(var i in vm.documents){
        var doc = vm.documents[i];
        if(doc.billPeriodDisplay && cardIndex == 0 || doc.dateRangeDisplay && cardIndex == 1)
          cardNames.push(vm.documents[i].name)
      }
      return cardNames;
    }

    function processCards(){
      vm.bilPeriodCards = {};
      for(var i in vm.documents){
        var doc = vm.documents[i];
          vm.bilPeriodCards[doc.name] = doc;
      }
    }

    vm.selectDate = function (clsName) {
      angular.element(document).ready(function () {
        document.getElementById(clsName).focus();
      }, 100);
    }

    vm.isDateRange = function(){
      return (vm.filterStartDate && vm.filterEndDate) || (vm.billPeriodTypeSelectedIndex == 0);
    }

    vm.getTodayDate = function(){
      return new Date().toString();
    }

    function handleError(error) {
      logger.log('Error retrieving data. Please contact customer support.', error, COMPONENT_NAME);
    }
    vm.getDateFormatByLang = function() {
      var dateFormat = utilityService.getDateFormatterByLang()['dateFormat'];
      return utilityService.isObject(dateFormat) ? dateFormat : vm.calendarDateFormat;
    }

    function formatBillingPeriodInterval(interval) {
      var startDate = $moment(interval.startDate, vm.calendarDateFormat).format(vm.localizeDateFormat);
      var endDate = $moment(interval.endDate, vm.calendarDateFormat).format(vm.localizeDateFormat);
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

    vm.selectedSortKey = function(){
      return vm.widgetFilter && vm.widgetFilter.sortKey ? vm.widgetFilter.sortKey : $filter('translate')('TEXT_NONE');
    }

    vm.getSortKeyDisplayName = function(key){
      if(vm.widgetFilter && vm.widgetFilter.displayNames) {
        var columnName = vm.widgetFilter.displayNames[key];
        return columnName ?  columnName : key;
      }
      return key;
    }

    vm.setSortKey = function(key){
      vm.widgetFilter.sortKey = (key == $filter('translate')('TEXT_NONE') ? null : key);
    }

    vm.isDateType = function(dataType) {
      if(!dataType) return false;
      var dataType = dataType.toLowerCase();
      return dataType == 'date' || dataType == 'datetime' || dataType == 'timestamp';
    }
    vm.setToDefFormat = function(dateStr) {
      return $moment(dateStr, vm.localizeDateFormat).format(vm.calendarDateFormat);
    }
    vm.updateEndDate = function() {
      if($moment(vm.filterStartDate, vm.localizeDateFormat).isAfter(
        $moment(vm.filterEndDate, vm.localizeDateFormat))) {
        vm.filterEndDate = vm.filterStartDate;
      }
    }

    unregisterFilterEvents.push(intervalChange);
    unregisterFilterEvents.push(currentIndex);
    unregisterFilterEvents.push(widgetModeInterval);
    unregisterFilterEvents.push(filterInterval);
    unregisterFilterEvents.push(sortKeyFilter);
    unregisterFilterEvents.push(filterSelected);
    unregisterFilterEvents.push(showFilterStatus);
    unregisterFilterEvents.push(paymentStatusFilters);
    unregisterFilterEvents.push(setSelectViewOn);
    unregisterFilterEvents.push(transactionWidget);
    unregisterFilterEvents.push(setSortKeyEvent);

    $scope.$on('$destroy', function () {
      utilityService.cleanUpListners(unregisterFilterEvents);
    });
  }
})();
