/* jslint maxlen: 250 */
(function() {
  'use strict';
  angular
    .module('app.activityLog')
    .controller('activityLogController', Controller);
  Controller.$inject = [
    '$scope',
    'activityLogService',
    'logger',
    '$moment',
    'utilityService',
    '$window',
    'translatorHelper'
  ];

  /* @ngInject */
  function Controller(
    $scope,
    activityLogService,
    logger,
    $moment,
    utilityService,
    $window,
    translatorHelper) {

    var vm = this,
        filterInterval,
        COMPONENT_NAME = 'activityLog',
        configFieldProcessFlag = false;

    vm.activityLogSummaryList = [];
    vm.manipulateActivities = manipulateActivities;
    vm.showAllActivities = showAllActivities;
    vm.closeAllActivities = closeAllActivities;
    vm.daysBetween = daysBetween;
    vm.toggleActivityLoad = toggleActivityLoad;
    $scope.showCompleteDetails = showCompleteDetails;
    vm.formatActivityDate = formatActivityDate;
    vm.checkTimeLineday = checkTimeLineday;
    vm.checkExpandState = checkExpandState;
    vm.isContains = isContains;
    vm.getClassAsperActivityType = getClassAsperActivityType;

    vm.showError = false;
    vm.success = false;
    vm.expandedState = false;
    vm.activityLogList = null;
    vm.dashboardActivityLogLimit = 5;
    vm.activityCount = 0;
    vm.activityLogState = 'collapsed';
    vm.allActivities = {};
    $scope.activityLoad = false;
    $scope.activityCardLayoutChanged = true;
    $scope.activityCardlayoutIndex = null;
    vm.calendarStartDate = vm.calendarEndDate = null;
    vm.activityFileName = "ActivityLog";
    vm.defaultSortKey = "time";
    // TODO : As we are not getting event status from service, Color code will show as per word pattern matching
    vm.failWordsArray = ["fail", "denied"];
    var unregisterActivityLogEvents = [];
    vm.loading = true;
    vm.calendarDateFormat = vm.localizeDateFormat = utilityService.dateFormat;

    $scope.$watch('accountId', function(acctId){
      if (!acctId) return;
      vm.accountId = acctId;
      activate();
    });

    function activate() {
      utilityService.getLocaleDateFormatter().then(function () {
        vm.localizeDateFormat = utilityService.getDateFormatterByLang()['dateFormat'];
        vm.localizeDateTimeFormat = utilityService.getDateFormatterByLang()['dateAndTimeFormat'];
      });
      vm.getstaticFiles( function(){
        vm.initiateWidgetService();
        filterInterval = $scope.$on('show_filter_intervals', function(event, idInterval, data, calendarParam, sortKey, filterItems) {
          var cardState = utilityService.cardState;
          if((cardState.expand == vm.widgetOpen) || (cardState.expand != vm.widgetOpen && cardState.widget == COMPONENT_NAME)) {
            vm.selectedFilters = {};
            vm.selectedSortKey = null;
            if(vm.expandedState){
              vm.selectedSortKey = sortKey == null || sortKey == undefined ? vm.defaultSortKey : sortKey;
              if(filterItems) vm.selectedFilters = filterItems;
              vm.calendarStartDate = null;vm.calendarEndDate = null;
              if(calendarParam){
                var calendarDates = utilityService.setStartAndEndOfDay(calendarParam);
                vm.calendarStartDate = calendarDates.startDate;
                vm.calendarEndDate = calendarDates.endDate;
              }
            }
            if(idInterval || (calendarParam && vm.expandedState))
              refreshWidget();
          }
        });
        unregisterActivityLogEvents.push(filterInterval);
      });
      var i18n = translatorHelper.loadFromStorage();
      vm.layoutLeftDirection = 'left';
      vm.layoutRightDirection = 'right';
      if(i18n.languageDirection == 'RTL') {
        vm.layoutLeftDirection = 'right';
        vm.layoutRightDirection = 'left';
      }
    };

    function refreshWidget(){
      if(!vm.expandedState) {
        vm.initiateWidgetService();
      }else {
        $scope.$emit('initiate_infinite_scroll', true);
      }
    }

    vm.isDefaultSort = function() {
      return !vm.selectedSortKey && vm.selectedSortKey == undefined || vm.selectedSortKey == vm.defaultSortKey ? true : false;
    }

    vm.initiateWidgetService = function() {
      vm.loading = true;
      vm.getMoreData(0, 20).then(function (results){
        if(vm.activityLogList) {
          if (vm.activityLogList.length >= vm.dashboardActivityLogLimit) {
            vm.activityLogSummaryList = vm.activityLogList.slice(0, vm.dashboardActivityLogLimit);
          } else {
            vm.activityLogSummaryList = vm.activityLogList.slice();
          }
        } else {
          vm.activityLogSummaryList = [];
        }
      });
    }

    vm.getMoreData = function(index, count){
      vm.loading = true;
      var idInterval = utilityService.getOrSetSelectedTimeInterVal().idInterval;
      return activityLogService.allActivityLogByPage(vm.accountId, idInterval, vm.calendarStartDate, vm.calendarEndDate, vm.selectedSortKey, vm.selectedFilters, index, count)
          .then(function (result) {
              vm.success = true;
              if(result){
                  /** Gettings filter configs **/
                  if(!configFieldProcessFlag){
                    var configFields = vm.filterConfigFile.data.columns.fields;
                    var configInfo = utilityService.processExternalConfigJson(result.activityLogDetails, configFields);
                    vm.sortKeys = configInfo["sortableKeys"];
                    vm.filterKeys = configInfo["filterableKeys"];
                    vm.displayableNameMap = configInfo["displayableNames"];
                    configFieldProcessFlag = true;
                  }
                  /** end **/
                  $scope.activityCardlayoutIndex = null;
                  vm.toggleActivityLoad();
                  return vm.manipulateActivities(result);
              } else {
                  return [];
              }
          })
          .catch(function (error) {
              vm.showError = true;
              vm.activityLogList = null;
              vm.activityCount = 0;
              vm.allActivities = {};
              vm.toggleActivityLoad();
              return [];
          }).finally(function () {
            vm.loading = false;
          });
    }

    function manipulateActivities(result){
      vm.activityLogList = result.activityLogDetails;
      vm.activityCount = result.activityLogDetails.length;
      var isPreviousDay = null;
      if(vm.activityCount > 0){
        for (var i = 0; i < vm.activityLogList.length; i++) {
          vm.activityLogList[i]['localeTime'] = $moment(vm.activityLogList[i].time).format(vm.localizeDateTimeFormat);
          vm.activityLogList[i].activitydate = vm.formatActivityDate(vm.activityLogList[i].time);
          vm.activityLogList[i].toggle = 0;
          // check isPrevious day
          var isSameDay = isPreviousDay == vm.activityLogList[i].activitydate ? true : false;
          vm.activityLogList[i].isPreviousDay = isSameDay;
          vm.activityLogList[i].isfailure = vm.isContains(vm.activityLogList[i].eventname, vm.failWordsArray);
          isPreviousDay = vm.activityLogList[i].activitydate;
        }
        //vm.expandLatestDay();
      }
      return vm.activityLogList;
    }

    vm.expandLatestDay = function(){
      angular.element(document).ready(function(){
        var ele = angular.element(".ecb-dayTimeHeader:first");
        var isActive = ele.attr("active");
        if(!isActive || isActive == "false"){
          ele.trigger("click");
        }
      });
    }

    function isContains(str, arryOfWords){
      if(str){
        str = str.toLowerCase();
        for(var i in arryOfWords){
          if (str.indexOf(arryOfWords[i].toLowerCase()) > -1)
            return true;
        }
      }
      return false;
    }

    function formatActivityDate(millisecond){
      var daysBetween = vm.daysBetween(millisecond);
      if(daysBetween == 0)
         return 'd0';
      else if(daysBetween == 1)
        return 'd1';
      else{
        return $moment(millisecond).format(vm.localizeDateFormat);
      }
    }

    function daysBetween(millisecond) {
      var today = $moment($moment().format('L'), 'L');
      var paramDay = $moment($moment(millisecond).format('L'), 'L');
      return today.diff(paramDay, 'days');
    }

    function showAllActivities(){
        vm.activityLogState = 'expanded';
        vm.expandedState = true;
        $scope.$emit('expanded', vm.activityLogState, COMPONENT_NAME);
        var prop = {"calendar" : true, "sortable" : true, "filterable" : true, sortKeys : vm.sortKeys, filterKeys : vm.filterKeys, displayNames : vm.displayableNameMap};
        $scope.$emit('widgetFilter', prop);
        utilityService.isInfiniteScrollActivated(true);
      vm.viewAllBodyHeight();
    }

    function closeAllActivities(){
        vm.activityLogState = 'collapsed';
        vm.expandedState = false;
        $scope.$emit('expanded', vm.activityLogState, COMPONENT_NAME);
        $scope.activityCardlayoutIndex = null;
        $scope.$emit('widgetFilter', {});
        utilityService.isInfiniteScrollActivated(false);
        resetWidget();
    }

    function resetWidget() {
      vm.calendarStartDate = vm.calendarEndDate = vm.selectedSortKey = null;
      vm.selectedFilters = {};
      refreshWidget();
    }

    function toggleActivityLoad(){
      $scope.activityLoad = $scope.activityLoad == true ? false : true;
    }

    function showCompleteDetails(item){
      if(item){
        item.toggle = item.toggle == 1 ? 0 : 1;
        $scope.activityCardlayoutIndex = item.id_audit;
        $scope.activityCardLayoutChanged = $scope.activityCardLayoutChanged == true ? false : true;
      }
    }

    function checkTimeLineday(item, index){
      return item.timeline != 'd0' && item.timeline != 'd1' ? true : false;
    }

    function checkExpandState(toggle){
      return (parseInt(toggle) == 1) ? true : false;
    }

    function getClassAsperActivityType(item, index){
      return item.isfailure ? 'error-ecbActivityBox' : 'success-ecbActivityBox';
    }

    vm.getstaticFiles = function(init) {
      vm.getFilterConfigFiles(function(){
        init();
      })
    }

    vm.getFilterConfigFiles = function(staticMethod) {
      vm.filterConfigFile = null;
      utilityService.getResponseConfigJson(vm.activityFileName).then(function(response) {
        vm.filterConfigFile = response;
        staticMethod();
      }).catch(function(error) {
        logger.log('Error occured in app.activityLogController.getFilterConfigFiles()');
        staticMethod();
      });
    }

    angular.element($window).on('resize', function () {
      if (vm.expandedState) {
        vm.viewAllBodyHeight();
      }
    });

    vm.viewAllBodyHeight = function (ele) {
      angular.element(".ecb-expandBody").ready(function () {
        return utilityService.manageViewAllBodyHeight("ecb-activityLogDetail", "ecb-expandBody", 15);
      });
    }

    $scope.$on('$destroy', function() {
      for(var i = 0; i < unregisterActivityLogEvents.length; i++){
        unregisterActivityLogEvents[i]();
      }
    });
  }
})();
