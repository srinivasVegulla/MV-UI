/* jslint maxlen: 250 */
//jscs:disable maximumLineLength
(function() {
  'use strict';
  angular
    .module('app.invoice')
    .controller('invoiceController', Controller);

  Controller.$inject = [
    '$scope',
    '$rootScope',
    'invoiceService',
    'utilityService',
    '$filter',
    'logger',
    '$window',
    'translatorHelper',
    'localStorageService',
    '$attrs'
  ];

  /* @ngInject */
  function Controller($scope, $rootScope, invoiceService, utilityService, $filter, logger, $window, translatorHelper,localStorageService, $attrs) {
    /* jshint validthis:true */
    var vm = this,
      intervalForSave,
      quotesListener,
      billPeriodType,
      checkboxFilter,
      offerStoreSelected,
      filterInterval,
      COMPONENT_NAME = 'invoice';
    vm.invoiceCardState = 'collapsed';
    vm.invoiceClose = false;
    vm.widgetOpen = false;
    vm.countOfOne =  countOfOne;
    vm.countOfTwo = countOfTwo;
    vm.showViewAll = showViewAll;
    vm.savePDF = savePDF;
    vm.saveCreditNotePDF = saveCreditNotePDF;
    vm.saveDebitNotePDF = saveDebitNotePDF;
    vm.saveQuotesPDF = saveQuotesPDF;
    vm.getDocumentDetails = getDocumentDetails;
    vm.checkboxSelection = checkboxSelection;
    vm.toggleCardsSelection = toggleCardsSelection;
    vm.getCreditNotes = getCreditNotes;
    vm.cardsAvailable = [];
    vm.billPeriodDisplayCards = [];
    vm.dateRangeCards = [];
    vm.selecetdCards = [];
    vm.listOfInvoices = [];
    vm.listOfStatements = [];
    vm.quotesOn = false;
    vm.downloadsFileName = "Downloads";
    vm.downloadCardsFileName = "downloadCards.json";
    vm.selectedSortKey = null;
    vm.downloadsDisplayName = [];
    vm.downloadsSortKeys = [];
    vm.invoicesIntervalData = utilityService.getOrSetSelectedTimeInterVal().dateRange;
    vm.billStartDate;
    vm.billEndDate;
    vm.initialDateRange = true;
    var unregisterInvoiceEvents = [];
    vm.getDebitNotes = getDebitNotes;
    vm.loading = true;
    vm.getEcbarCreditNotes = getEcbarCreditNotes;
    vm.ecbARValue = localStorageService.get('ecbarStatus');
    vm.ecbARCheck;
    vm.intervalOrDateCheck;
    vm.dateChanges = dateChanges;
    vm.parentDirective = $attrs.parentDr;

    $scope.$watch('accountId', function(acctId){
      if (!acctId) {
        return;
      }
      vm.accountId = acctId;
      activate();
    });

    function activate() {
      intervalForSave = utilityService.getOrSetSelectedTimeInterVal().idInterval;
      filterInterval = $scope.$on('show_filter_intervals', function(event, idInterval, data, calendarParam) {
        if(!isWidgetActive()) return;
        var cardState = utilityService.cardState;
        if((cardState.expand == vm.widgetOpen) || (cardState.expand != vm.widgetOpen && cardState.widget == COMPONENT_NAME)) {
          calendarParam ? vm.invoicesIntervalData = calendarParam : vm.invoicesIntervalData = utilityService.getOrSetSelectedTimeInterVal().dateRange;
          intervalForSave = utilityService.getOrSetSelectedTimeInterVal().idInterval;
          vm.initialDateRange = false;
          vm.loading = true;
          if(calendarParam){
            vm.intervalOrDateCheck = false;
              var calendarDates = utilityService.setStartAndEndOfDay(calendarParam);
              vm.calendarStartDate = calendarDates.startDate;vm.billStartDate = calendarDates.startDate;
              vm.calendarEndDate = calendarDates.endDate;vm.billEndDate = calendarDates.endDate;
          }else if(data){
            vm.intervalOrDateCheck = true;
            var calendarDates = utilityService.setStartAndEndOfDay(data);
            vm.billStartDate = calendarDates.startDate;
            vm.billEndDate = calendarDates.endDate;
          }
          vm.initiateWidgetService();
        }
      });      
      if(vm.initialDateRange){
        vm.invoicesIntervalData = utilityService.getOrSetSelectedTimeInterVal().dateRange;
        if (vm.invoicesIntervalData){
          var calendarDates = utilityService.setStartAndEndOfDay(vm.invoicesIntervalData);
          vm.invoicesIntervalStartDate = vm.invoicesIntervalData.startDate;
          vm.invoicesIntervalEndDate = vm.invoicesIntervalData.endDate;
          vm.calendarStartDate = calendarDates.startDate;vm.billStartDate = calendarDates.startDate;
          vm.calendarEndDate = calendarDates.endDate;vm.billEndDate = calendarDates.endDate;
        }
        vm.initiateWidgetService();
      }
      getDocumentDetails();
      var i18n = translatorHelper.loadFromStorage();
      vm.layoutLeftDirection = 'left';
      vm.layoutRightDirection = 'right';
      if(i18n.languageDirection == 'RTL') {
        vm.layoutLeftDirection = 'right';
        vm.layoutRightDirection = 'left';
      }
    }

    vm.initiateWidgetService = function() {
      getInvoices();
      getQuotes();
        if(vm.ecbARValue === '0'){
          vm.ecbARCheck = true;
          getEcbarCreditNotes();
          getDebitNotes();
        } else {
          vm.ecbARCheck = false;
          getCreditNotes();
        }
    }

    angular.element($window).on('resize', function () {
      if(vm.widgetOpen) {
        vm.viewAllBodyHeight();
      }
    });

    offerStoreSelected = $scope.$on('offerStoreSelected', function (event, data) {
      if(!isWidgetActive()) return;
      if (data) {
        vm.closeInvoiceViewAll();
      }
    });

    vm.viewAllBodyHeight = function(ele) {
      angular.element(".ecb-invoiceExpandBody").ready(function() {
        vm.getViewAllBodyHeight();
      });
    }

    vm.getViewAllBodyHeight = function() {
      return utilityService.manageViewAllBodyHeight("ecb-invoiceExpandMain","ecb-invoiceExpandBody");
    }

    quotesListener = $rootScope.$on('quotes',function(event, data) {
      if(vm.parentDirective !== 'self') {
        utilityService.getOrSetSelectedCards(['quotes']);
        vm.selecetdCards = utilityService.getOrSetSelectedCards();
        vm.quotesOn = true;
        vm.toggleInvoiceCardState();
      }
    });

    function isWidgetActive() {
      var isDWidgetVisible = angular.element('.dependency .ecb-invoiceExpandMain').is(':visible');
      return (isDWidgetVisible && vm.parentDirective != 'self') || (!isDWidgetVisible && vm.parentDirective == 'self') ? true : false;
    }

    function toggleCardsSelection(header) {
      var columnIndex = vm.selecetdCards.indexOf(header);
      if (columnIndex > -1) {
        vm.selecetdCards.splice(columnIndex, 1);
      } else {
        vm.selecetdCards.push(header);
      }
      utilityService.getOrSetSelectedCards(vm.selecetdCards);
    }

    vm.selectedCards = function(cardsSelected) {
      return utilityService.getOrSetSelectedCards(cardsSelected);
    }

    checkboxFilter = $rootScope.$on('show_filter_checkBox',function(event,data) {
      if(!isWidgetActive()) return;
      vm.selecetdCards = data;
    });

    vm.isCardVisible = function (card) {
      var cardAvailable = vm.cardsAvailable.indexOf(card);
      var selectedCards = (utilityService.getOrSetSelectedCards()).indexOf(card);
      if(cardAvailable > -1 && selectedCards > -1){
        return true;
      } else{
        return false;
      }
    }

    billPeriodType = $scope.$on('show_filter_selectedby',function(event,selectByIndex) {
      if(!isWidgetActive()) return;
      if(selectByIndex == 0 && vm.quotesOn && !vm.cardsForQuotesInBillPeriod){
        var storedCards = utilityService.getOrSetSelectedCards();
        var billCards = getCardsAsPerbillPeriod(0);
        for(var i in storedCards){
          billCards.push(storedCards[i]);
        }
        utilityService.getOrSetSelectedCards(billCards);
        vm.cardsForQuotesInBillPeriod = true;
      }
      vm.selecetdCards = utilityService.getOrSetSelectedCards();
      vm.cardsAvailable = getCardsAsPerbillPeriod(selectByIndex);
    });

    function getQuotes() {
      invoiceService.getQuotes(vm.accountId,vm.calendarStartDate,vm.calendarEndDate).then(function(response) {
        if (response) {
          vm.listOfQuotes = response.data.QuotesList;
          vm.quotesLength = vm.listOfQuotes.length;
          vm.getSortableValues(vm.listOfQuotes,vm.configFields);
        }
      }).catch(function(error) {
          handleErrorQuotes();
      }).finally(function () {
        vm.loading = false;
      });
    }

    function saveQuotesPDF(invoiceFileName) {
      var a = document.createElement("a");
      invoiceService.getQuotesPDF(invoiceFileName,vm.accountId).then(function(response) {
          var file = new Blob([response.data], {type: 'application/pdf'});
          if (navigator.msSaveBlob) {
              navigator.msSaveBlob(file, invoiceFileName);
          } else {
             var fileURL = URL.createObjectURL(file);
             a.href = fileURL;
             a.download = invoiceFileName;
             document.body.appendChild(a);
             a.click();
             document.body.removeChild(a);
         }
      });
    };

    function getInvoices() {
      var idInterval = utilityService.getOrSetSelectedTimeInterVal().idInterval;
      invoiceService.getInvoices(idInterval, vm.accountId).then(function(response) {
        if(response){
          vm.listOfInvoices = [];
          vm.listOfStatements = [];
          vm.invoiceResponse = response.data.InvoiceList;
          angular.forEach(vm.invoiceResponse, function(item) {
            item.fileName.indexOf('Proforma') >= 0 ? vm.listOfStatements.push(item) :  vm.listOfInvoices.push(item);
          });
          vm.statementsLength = vm.listOfStatements.length;
          vm.invoicesLength = vm.listOfInvoices.length;
          vm.getSortableValues(vm.listOfStatements,vm.configFields);
          vm.getSortableValues(vm.listOfInvoices,vm.configFields);
        }
      }).catch(function(error) {
          handleErrorInvoices();
      }).finally(function () {
        vm.loading = false;
      });
    }

   function savePDF(invoiceFileName) {
      var a = document.createElement("a");
      document.body.appendChild(a);
      invoiceService.getPDF(invoiceFileName, intervalForSave, vm.accountId).then(function(response) {
          var file = new Blob([response.data], {type: 'application/pdf'});
          if(navigator.msSaveBlob) {
            navigator.msSaveBlob(file, invoiceFileName);
          } else {
             var fileURL = URL.createObjectURL(file);
             a.href = fileURL;
             a.download = invoiceFileName;
             document.body.appendChild(a);
             a.click();
             document.body.removeChild(a);
         }
      });
    };

    function getCreditNotes() {
      invoiceService.getCreditNotes(vm.accountId,vm.billStartDate,vm.billEndDate).then(function(response) {
        if (response) {
          vm.listOfCreditNotes = response.data.CreditNotesList;
          vm.creditNotesLength = vm.listOfCreditNotes.length;
          vm.getSortableValues(vm.listOfCreditNotes,vm.configFields);
        }
      }).catch(function(error) {
          handleErrorCreditNotes();
      }).finally(function () {
          vm.loading = false;
      });
    }

    function dateChanges(dateFormat){
      var now = new Date(dateFormat);
      var year = "" + now.getFullYear();
      var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
      var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
      var hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
      var minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
      var second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
      var milliseconds = "" + now.getMilliseconds(); if (milliseconds.length == 1) { milliseconds = "0" + milliseconds; }
      return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second + "." + milliseconds;
    }

    function getDebitNotes(){
      var creditOrDebit = 'Debit';
      if(vm.intervalOrDateCheck){
        var idInterval = utilityService.getOrSetSelectedTimeInterVal().idInterval;
      }
      var changedStartDate = vm.dateChanges(vm.billStartDate);
      var changedEndDate = vm.dateChanges(vm.billEndDate);
      invoiceService.getDebitNotes(vm.accountId,idInterval,creditOrDebit,changedStartDate,changedEndDate).then(function(response) {
        if (response) {
         vm.listOfDebitNotes =  response.data.ARCreditDebitDetails;
         vm.debitNotesLength = vm.listOfDebitNotes.length;
         vm.getSortableValues(vm.listOfDebitNotes,vm.configFields);
        }
      }).catch(function(error) {
        handleErrorDebitNotes();
      });
    }

    function getEcbarCreditNotes(){
      var creditOrDebit = 'Credit'; 
      if(vm.intervalOrDateCheck){
        var idInterval = utilityService.getOrSetSelectedTimeInterVal().idInterval;
      }
      var changedStartDate = vm.dateChanges(vm.billStartDate);
      var changedEndDate = vm.dateChanges(vm.billEndDate);
      invoiceService.getDebitNotes(vm.accountId,idInterval,creditOrDebit,changedStartDate,changedEndDate).then(function(response) {
        if (response) {
         vm.listOfCreditNotes =  response.data.ARCreditDebitDetails;
         vm.creditNotesLength = vm.listOfCreditNotes.length;
         vm.getSortableValues(vm.listOfCreditNotes,vm.configFields);
        }
      }).catch(function(error) {
          handleErrorCreditNotes();
      });
    }

    function saveDebitNotePDF(invoiceFullPath,invoiceFileName){
      var a = document.createElement("a");
      document.body.appendChild(a);
      invoiceService.downloadDebitNotes(invoiceFullPath,invoiceFileName).then(function(response) {
        var file = new Blob([response.data], {type: 'application/pdf'});
          if (navigator.msSaveBlob) {
            navigator.msSaveBlob(file, invoiceFileName);
         } else {
          var fileURL = URL.createObjectURL(file);
          a.href = fileURL;
          a.download = invoiceFileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      });
    }

    function saveCreditNotePDF(invoiceFileName) {
      var a = document.createElement("a");
      document.body.appendChild(a);
      invoiceService.getCreditNotePDF(invoiceFileName,vm.accountId).then(function(response) {
        var file = new Blob([response.data], {type: 'application/pdf'});
        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(file, invoiceFileName);
        } else {
           var fileURL = URL.createObjectURL(file);
           a.href = fileURL;
           a.download = invoiceFileName;
           document.body.appendChild(a);
           a.click();
           document.body.removeChild(a);
        }
      });
    };

    function countOfOne(listLength) {
      return listLength == 1 ? true : false;
    };

    function countOfTwo(listLength) {
      return listLength >= 2 ? true : false;
    };

    function showViewAll(StatementsLength,InvoicesLength,CreditNotesLength,DebitNotesLength) {
      if(vm.ecbARCheck){
        return ((StatementsLength > 0 || InvoicesLength > 0 || CreditNotesLength > 0 || DebitNotesLength > 0)  && (!vm.widgetOpen)) ? true : false;
      }else{
        return ((StatementsLength > 0 || InvoicesLength > 0 || CreditNotesLength > 0)  && (!vm.widgetOpen)) ? true : false;
      }
    };

    vm.toggleInvoiceCardState = function() {
      var isCalendar = vm.widgetOpen ? 'unchange-1' : true;
      vm.invoiceCardState = 'expanded';
      vm.invoiceClose = true;
      vm.widgetOpen = true;
      $scope.$emit('dependentDirectiveViewChange', true, "ecb-invoice");
      $scope.$emit('showBillPeriod', true, 'Downloads_or_Quotes');
      vm.cardsAvailable = getCardsAsPerbillPeriod(vm.quotesOn ? 1 : 0);
      var prop = {"sortBy" : true, "filter" : true, "calendar" : isCalendar, "checkBox" : true, "sortable" : true, sortKeys : vm.downloadsSortKeys, displayNames : vm.downloadsDisplayName };
      $scope.$emit('widgetFilter', prop);
      $scope.$emit('expanded', vm.invoiceCardState, COMPONENT_NAME);
      vm.viewAllBodyHeight();
      return vm.invoiceCardState;
    };

    vm.closeInvoiceViewAll = function() {
      vm.invoiceCardState = 'collapsed';
      vm.invoiceClose = false;
      $scope.$emit('dependentDirectiveViewChange', false, "ecb-invoice");
      $scope.$emit('expanded', vm.invoiceCardState, COMPONENT_NAME);
      vm.widgetOpen = false;
      vm.selecetdCards = [];
      $scope.$emit('widgetFilter', {});
      $scope.$emit('showBillPeriod', false, 'Downloads_or_Quotes');
      vm.quotesOn = false;
      vm.selectedSortKey = null;
      vm.cardsForQuotesInBillPeriod = null;
    };

    function handleErrorStatements() {
      vm.noStatements = true;
      vm.statementsLength = 0;
    };

    function handleErrorInvoices() {
      vm.noInvoices = true;
      vm.invoicesLength = 0;
      vm.listOfInvoices = [];
      vm.listOfStatements = [];
    };

     function handleErrorCreditNotes() {
      vm.noCreditNotes = true;
      vm.creditNotesLength = 0;
    };

    function handleErrorDebitNotes() {
      vm.debitNotesLength = 0;
    };

    function handleErrorQuotes() {
      vm.noQuotes = true;
      vm.quotesLength = 0;
    };

    function checkboxSelection(card) {
      return (vm.selecetdCards.indexOf(card) > -1);
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

        utilityService.getOrSetSelectedCards(doc.name);
      }
    }

    function getCardsNames(billPeriods){
      var cardNames = [];
      for(var i in billPeriods){
        cardNames.push(billPeriods[i].name)
      }
      return cardNames;
    }

    function getDocumentDetails() {
      utilityService.getExtConfigFile(vm.downloadCardsFileName).then(function(response) {
          vm.documents = response.data.columns.cardNames;
          if (!vm.ecbARCheck) {
            for(var index in vm.documents){
              if (vm.documents[index].name == 'debitNotes'){
                vm.documents.splice(index, 1);
              }
            }
          }
          processCards();
          utilityService.getOrSetSelectedCards(getCardsAsPerbillPeriod(0));
          vm.selecetdCards = utilityService.getOrSetSelectedCards();
      }).catch(function(error) {
        logger.log('Error retrieving cards data. Please contact customer support.', error);
      });

      utilityService.getResponseConfigJson(vm.downloadsFileName).then(function(response) {
        if(response){
          vm.configFields = response.data.columns.fields;
          vm.initiateWidgetService();
        }
      }).catch(function(error) {
        logger.log('Error retrieving config feilds in Downloads. Please contact customer support.', error);
      });

    }

    vm.getSortableValues = function(list, configFields) {
      if(configFields && list) {
          var configInfo = utilityService.processExternalConfigJson(list, configFields);
          vm.downloadsDisplayName = configInfo["displayableNames"];
          vm.downloadsSortKeys = configInfo["sortableKeys"];
          if(vm.widgetOpen){
            var prop = {"sortBy" : true, "filter" : true, "calendar" : 'unchange-1', "checkBox" : true, "sortable" : true, sortKeys : vm.downloadsSortKeys, displayNames : vm.downloadsDisplayName };
            $scope.$emit('widgetFilter', prop);
          }
      }
    }

    $rootScope.$on('filter_criteria_event', function(event, sortKey, filterItems) {
      if(!isWidgetActive()) return;
        if(vm.widgetOpen){
          vm.selectedSortKey = null;
          if(sortKey) vm.selectedSortKey = sortKey;
        }
      });

    vm.getSortByColumn = function(defaultKey) {
      return vm.selectedSortKey ? vm.selectedSortKey : defaultKey;
    }

    vm.getInvoiceDate = function(time) {
      return utilityService.getUtcDateByMilliSec(time);
    }

    unregisterInvoiceEvents.push(filterInterval);
    unregisterInvoiceEvents.push(quotesListener);
    unregisterInvoiceEvents.push(billPeriodType);
    unregisterInvoiceEvents.push(checkboxFilter);
    unregisterInvoiceEvents.push(offerStoreSelected);

    $scope.$on('$destroy', function () {
      utilityService.cleanUpListners(unregisterInvoiceEvents);
    });
  }
})();
