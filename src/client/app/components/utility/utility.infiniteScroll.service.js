/**
 * @Author: Keshab.g
 * Infinite scroll
 */
(function() {
  'use strict';
  angular
    .module('app.utility')
    .factory('infiniteScrollUtil', Service);

  Service.$inject = [
    'utilityService',
    '$timeout'
  ];


  /* @ngInject */
  function Service(utilityService, $timeout) {

    // Public API
    var vm = {
      init: init,
      start: start,
      createScrollEvent: createScrollEvent,
      getBufferData: getBufferData,
      getMoreData: getMoreData,
      getMoreDataUp: getMoreDataUp,
      getMoreDataDown: getMoreDataDown
    };
    return vm;
    
    function init(dataSource) {
      vm.dataSource = dataSource;
      vm.pageSize = dataSource.pageSize ? dataSource.pageSize : 30;
      vm.BUFFER_SIZE = vm.pageSize * (dataSource.bufferSize ? dataSource.bufferSize : 3);
      vm.scrollZone = 12;
      vm.loading = false;
      vm.scrollAdjusting = false;
      vm.timeouts = [];
      var scrollStatusInit = {
        currentGridIndex: 0,
        records: [],
        lastPageDataInfo: {}
      }
      vm.scrollStatus = scrollStatusInit;
      if(dataSource.scrollEvent) {
        createScrollEvent();
      }
    }
    function start(dataSource){
      init(dataSource);
      getBufferData();
    }
    function createScrollEvent() {
      var timeout = $timeout(function(){
        var container = angular.element(document.querySelector(vm.dataSource.scrollContainer()));
        container.bind('scroll', function(){
          var element = container[0];
          if(!vm.loading && !vm.scrollAdjusting) {
            var scrollBottom = element.scrollHeight - element.scrollTop - element.clientHeight;
            var scrollZoneHeight = ((element.scrollTop + scrollBottom) / 100) * vm.scrollZone;
            if(element.scrollTop < scrollZoneHeight) {
              getMoreDataUp();
            }else if(scrollBottom < scrollZoneHeight) {
              getMoreDataDown();
            }
          }
        });
      }, 100);
      vm.timeouts.push(timeout);
    }

    function updateLoader(status) {
      vm.loading = status;
      vm.dataSource.loader(status);
    }

    function getMoreData(index, count, success) {
      updateLoader(true);
      vm.scrollStatus.lastPageDataInfo = {index: index, count: count, output: 0};
      vm.dataSource.getRecords(index, count).then(function(scrollData) {
        var records = [];
        if(utilityService.isObject(scrollData) && scrollData.length > 0) {
          records = scrollData;
          vm.scrollStatus.lastPageDataInfo.output = scrollData.length;
        }
        success(records);
        updateLoader(false);
      });
    }

    function getBufferData() {
      vm.scrollStatus.records = [];
      vm.scrollStatus.currentGridIndex = 0;
      getMoreData(0, vm.BUFFER_SIZE, function(scrollData) {
        if(utilityService.isObject(scrollData) && scrollData.length > 0) {
          vm.scrollStatus.records = scrollData;
          vm.scrollStatus.currentGridIndex = vm.scrollStatus.records.length;
        }
        vm.dataSource.updateDataSource(vm.scrollStatus.records, true);
      });
    };

    function getMoreDataUp() {
      var offset = (vm.scrollStatus.currentGridIndex > vm.BUFFER_SIZE)? (vm.scrollStatus.currentGridIndex - vm.BUFFER_SIZE - vm.pageSize ) : 0;
      if(vm.scrollStatus.currentGridIndex <= vm.BUFFER_SIZE) return;
      getMoreData(offset, vm.pageSize, function(scrollData) {
        if(utilityService.isObject(scrollData) && scrollData.length > 0 && vm.scrollStatus.currentGridIndex > 0) {
          vm.scrollAdjusting = true;
          var lastPageCount = vm.scrollStatus.records.length % vm.pageSize;
          vm.scrollStatus.records = vm.scrollStatus.records.slice(0, -(lastPageCount == 0 ? vm.pageSize : lastPageCount));
          Array.prototype.unshift.apply(vm.scrollStatus.records, scrollData);
          vm.scrollStatus.currentGridIndex -= vm.pageSize;
          vm.dataSource.updateDataSource(vm.scrollStatus.records);
          // Adjust Scroll
          var container = angular.element(vm.dataSource.scrollContainer());
          var element = container[0];
          var scrollBottom = element.scrollHeight - element.scrollTop - element.clientHeight;
          var scrollInZoneHeight = ((element.scrollTop + scrollBottom) / 100) * (vm.scrollZone + 10);
          container.animate({
            scrollTop: scrollInZoneHeight
          }, 10, function() {
            var timeout = $timeout(function(){ vm.scrollAdjusting = false;}, 50);
            vm.timeouts.push(timeout);
          });
        }
      });
    }

    function getMoreDataDown() {
      if (vm.scrollStatus.lastPageDataInfo && vm.scrollStatus.lastPageDataInfo.output < vm.scrollStatus.lastPageDataInfo.count)
        return;
      getMoreData(vm.scrollStatus.currentGridIndex, vm.pageSize, function(scrollData) {
        if(utilityService.isObject(scrollData) && scrollData.length > 0) {
          vm.scrollAdjusting = true;
          vm.scrollStatus.records = vm.scrollStatus.records.slice(vm.pageSize);
          Array.prototype.push.apply(vm.scrollStatus.records, scrollData);
          vm.scrollStatus.currentGridIndex += vm.pageSize;
          vm.dataSource.updateDataSource(vm.scrollStatus.records);
          // Adjust Scroll
          var container = angular.element(vm.dataSource.scrollContainer());
          var element = container[0];
          var scrollBottom = element.scrollHeight - element.scrollTop - element.clientHeight;
          var scrollInZoneHeight = ((element.scrollTop + scrollBottom) / 100) * (vm.scrollZone + 10);
          var scrollbarHeight = element.scrollHeight - (element.scrollTop + scrollBottom);
          container.animate({
            scrollTop: element.scrollHeight - (scrollbarHeight + scrollInZoneHeight)
          }, 10, function() {
            var timeout = $timeout(function(){ vm.scrollAdjusting = false;}, 50);
            vm.timeouts.push(timeout);
          });
        }
      });
    }
  }
}());
