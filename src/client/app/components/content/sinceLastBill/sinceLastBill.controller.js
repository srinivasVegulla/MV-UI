(function() {
  'use strict';
  angular
    .module('app.sinceLastBill')
    .controller('sinceLastBillController', Controller);

  Controller.$inject = [
    '$scope',
    '$window',
    '$http',
    '$rootScope',
    'sinceLastBillService',
    '$moment',
    'localStorageService',
    '$filter',
    'utilityService'
  ];

  function Controller($scope, $window, $http, $rootScope, sinceLastBillService, $moment, localStorageService, $filter, utilityService) {
    /* jshint validthis:true */
    var vm = this,
          filterInterval;
    vm.sinceLastBillCardState = 'collapsed';
    vm.widgetOpen = false;
    vm.quotesLength = 0;
    vm.transactionsCount = 0;
    vm.openInvoiceWidget = openInvoiceWidget;
    vm.getTransactionsCount = getTransactionsCount;
    vm.openTransactions = openTransactions;
    vm.closeTransactions = closeTransactions;
    vm.quotes = ($filter('translate')('TEXT_QUOTES'));
    var unregisterEvents = [];

    $scope.$watch('accountId', function(acctId){
      if (!acctId) return;
      vm.accountId = acctId;
      activate();
    }); 

    function activate() {
      filterInterval = $scope.$on('show_filter_intervals', function(event, idInterval, data) {
        if(!utilityService.cardState.expand) {
          vm.invoices = data;
          vm.initiateWidgetService();
        }
      });
      utilityService.getLocaleDateFormatter().then(function () {
        vm.localizeDateFormat = vm.getDateFormatByLang();
      });
      vm.initiateWidgetService();
    }

    vm.initiateWidgetService = function() {
      vm.loading = true;
      var idInterval = utilityService.getOrSetSelectedTimeInterVal().idInterval;
      vm.sinceLastBillFromDate = localStorageService.get("sinceLastBillDate");
      vm.sinceLastBillToDate = new Date().getTime();
      getQuotesCount(vm.accountId);
      getTransactionsCount(idInterval, vm.accountId);
    }  

    function getQuotesCount(accountId) {
      sinceLastBillService.getQuotesCount(vm.accountId, vm.sinceLastBillFromDate, vm.sinceLastBillToDate, utilityService.getNameSpace()).then(function(response) {        if (response) {
          vm.quotesLength = response.data.QuotesCount;
        }
      }).catch(function(error) {
        handleErrorQuotes();
      }).finally(function () {
        vm.loading = false;
      });     
    }

    function getTransactionsCount(idInterval, accountId) {
      sinceLastBillService.getTransactionsCount(vm.accountId, vm.sinceLastBillFromDate, vm.sinceLastBillToDate, utilityService.getNameSpace()).then(function(response) {
        if(response){
          vm.transactionsCount = response.data.transactionsCount;
        }
      }).catch(function(error) {  
          handleErrorTranscationCount();
      }).finally(function () {
        vm.loading = false;
      });
    }

    function openInvoiceWidget() {      
      $rootScope.$emit('quotes',vm.quotes);
    }

    function openTransactions() {
      //if(vm.transactionsCount == 0) return;
      $rootScope.$emit('expandTransactionPopup', true);
    }

    function closeTransactions() {
      vm.sinceLastBillCardState = 'collapsed';
      vm.widgetOpen = false;
      $scope.$emit('expanded', vm.sinceLastBillCardState);
      $scope.$emit('widgetFilter', {});
    }

    function handleErrorQuotes() {
      vm.noQuotes = true;
      vm.quotesLength = 0;
    };

    function handleErrorTranscationCount() {
      vm.transactionsCount = 0;
    }

    vm.showLocalizeDate = function(date) {
      return $moment(date).format(vm.localizeDateFormat);
    }
    vm.getDateFormatByLang = function() {
      var dateFormat = utilityService.getDateFormatterByLang()['dateFormat'];
      return utilityService.isObject(dateFormat) ? dateFormat : vm.calendarDateFormat;
    }

    unregisterEvents.push(filterInterval);

    $scope.$on('$destroy', function () {
      utilityService.cleanUpListners(unregisterEvents);
    });
  }  
})();
