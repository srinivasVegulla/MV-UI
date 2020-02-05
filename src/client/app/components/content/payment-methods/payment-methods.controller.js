/* jslint maxlen: 250 */
(function() {
  'use strict';

  angular
    .module('app.payment-methods')
    .controller('paymentMethodsController', Controller);

  Controller.$inject = [
    '$scope',
    'paymentMethodsService',
    'translatorHelper',
    '$timeout',
    '$sce',
    'payService',
    'logger',
    '$rootScope',
    'localStorageService',
    '$filter',
    '$document',
    'amountDueService',
    '$window',
    'utilityService'
  ];

  /* @ngInject */
  function Controller(
    $scope,
    paymentMethodsService,
    translatorHelper,
    $timeout,
    $sce,
    payService,
    logger,
    $rootScope,
    localStorageService,
    $filter,
    $document,
    amountDueService,
    $window,
    utilityService) {
    var vm = this,
      _transactionCheck,
      COMPONENT_NAME = 'Payment Methods',
      currentDate = new Date(),
      allowOnlinePayment,
      autoPaySetUp,
      sortKeyFilter;
    vm.isActive = false;
    vm.nodata = false;
    vm.activeToggle = function() {
      vm.isActive = !vm.isActive;
    };
    vm.paymentCardState = 'collapsed';
    vm.makePayment = payService.open;
    vm.getCreditMethods = getCreditMethods;
    vm.getUpdateCreditMethods = getUpdateCreditMethods;
    vm.getDeleteCreditMethods = getDeleteCreditMethods;
    vm.getPaymentDetails = getPaymentDetails;
    vm.paymentClose = false;
    vm.dismissRemoveErrorBox = dismissRemoveErrorBox;
    vm.dismissDeleteErrorBox = dismissDeleteErrorBox;
    vm.openPay = openPay;
    vm.openAch = openAch;
    vm.handleCyberGateError = handleCyberGateError;
    vm.isPaymentMethodActive = [];
    vm.deletePaymentScheduled = [];
    vm.cardActivePaymentScheduled = [];
    vm.activePaymentMethods = 0;
    var unregisterPaymentMethodEvents = [];
    vm.editButton = [];
    vm.setTabularView = setTabularView;
    vm.paymentMethodsList = [];
    vm.paymentMethodsListHeader = [];
    vm.gridColMinWidth = 140;
    vm.gridActionColMinWidth = 360;
    vm.isTabularViewSettings = false;
    vm.checkboxSelection = [];
    vm.checkboxSelectionTemp = [];
    vm.freezeColumnsTemp = [];
    vm.freezeColumns = [];
    vm.paymentsDisplayName = [];
    vm.deleteThisCard = [];
    vm.keys = [];
    vm.allowPaymentMethods = true;
    vm.getCurrency = getCurrency;
    vm.invoiceList = [];
    vm.loading = true;
    vm.limit= 2;
    vm.selectedFilters = {};
    vm.selectedSortKey = null;
    vm.getPaymentMethods = getPaymentMethods;

    $scope.$watch('accountId', function(acctId){
      if (!acctId) return;
      vm.accountId = acctId;
      vm.activate();
    });

    function getCurrency(){
      amountDueService.getDuePayment(vm.accountId)
        .then(function(response) {
          vm.currency = response.data.PaymentInfo.currency;
        })
        .catch(function(error) {
          logger.log('Error retrieving Currency in Payment Methods.');
        });
    }

    vm.activate = function() {
      autoPaySetUp = $rootScope.$on('autopaySetupDone', function(event, data) {
        getPaymentMethods();
        $timeout(function() {
          vm.setGridOptions();
        }, 1500);
      });
  
      allowOnlinePayment = $rootScope.$on('allowOnlinePayment', function(event, data) {
          vm.allowPaymentMethods = (data === 'F') ? false : true;
        });
  
      sortKeyFilter = $rootScope.$on('filter_criteria_event', function(event, sortKey, filterItems) {
        if(vm.widgetOpen){
          vm.sortOrder = (vm.selectedSortKey == sortKey && vm.sortOrder == 'desc') ? 'asc' : 'desc';
          vm.selectedFilters = {};
          vm.selectedSortKey = null;
          if(sortKey) vm.selectedSortKey = sortKey;
          if(filterItems) vm.selectedFilters = filterItems;
          if(vm.tabularView == true) vm.applyPaymentsCancelSettings(true);
        }
      });
  
      unregisterPaymentMethodEvents.push(autoPaySetUp);
      unregisterPaymentMethodEvents.push(allowOnlinePayment);
      unregisterPaymentMethodEvents.push(sortKeyFilter);

      getCurrency();
      getPaymentMethods();

      vm.i18n = translatorHelper.loadFromStorage();
      vm.className = 'absolute-text';
      vm.layoutLeftDirection = 'left';
      vm.layoutRightDirection = 'right';
      vm.isRTL = false;
      if (vm.i18n.languageDirection == 'RTL') {
        vm.layoutLeftDirection = 'right';
        vm.layoutRightDirection = 'left';
        vm.className = 'RTL-absolute-text';
        vm.isRTL = true;
      }
    }

    angular.element($window).on('resize', function () {
      if (vm.widgetOpen) {
        vm.viewAllBodyHeight();
        vm.getSettingsHeight();
        setTabularView(false);
      }
    });

    function setTabularView(isInitialCall) {
      var width = $window.innerWidth;
      if (isInitialCall) {
        (width > 991) ? (vm.showTabularView()) : (vm.showCardView());
      } else {
        if (width < 768) {
          vm.tabularView ? vm.showCardView() : '';
        }
      }
    }
    function getDeleteCreditMethods(idPaymentInstrument) {
      vm.addError = false;
      paymentMethodsService.getDelete(vm.accountId, idPaymentInstrument)
        .then(function(response) {
          vm.deleteInfo = response.data;
          $timeout(function() {
            getPaymentMethods();
            vm.setGridOptions();
          }, 500);
        })
        .catch(function(error) {
          logger.log('Error occured in app.payment-methods.paymentMethodsController.getDeleteCreditMethods()', {
            error: error
          });
          switch (error.status) {
            case 500:
              handleCyberGateError();
              vm.cyberAddError = true;
              vm.nodata = false;
              break;
            case 400:
            case 404:
            case 412:
            case 403:
            case 405:
              handleCyberGateError();
              vm.cyberRemoveError = true;
              vm.nodata = false;
              break;
          }
        });
      vm.payItem = -1;
      vm.payAch = -1;
    }

    function dismissDeleteErrorBox() {
      vm.payItem = -1;
      vm.hideDeleteConfirmationBox = false;
    }

    function openPay($index, idPaymentInstrument) {
      vm.payItem = $index;
    }

    function openAch($index, idPaymentInstrument){
      vm.payAch = $index;
    }

    function dismissRemoveErrorBox(){
      vm.payAch = -1;
      vm.hideDeleteConfirmationBox = false;
    }

    function getPaymentDetails() {
      amountDueService.getPayment()
        .then(function(response) {
          if (response) {
            vm.payment = response.data;
            vm.conformationNo = vm.payment.ConfirmationNumber;
          }
        })
        .catch(function(error) {
          logger.log('Error occured in app.payment-methods.paymentMethodsController.getPaymentDetails()', {
            error: error
          });
        });
    }

    function getUpdateCreditMethods(idPaymentInstrument) {
      paymentMethodsService.getUpdate(vm.accountId, vm.currency, idPaymentInstrument)
        .then(function(response) {
          vm.updateInfo = response.data;
          vm.updateDetails = vm.updateInfo.Html;
          vm.template = $sce.trustAsHtml(vm.updateDetails);
          $timeout(function() {
            angular.element(document).ready(function() {
              document.getElementById('hiddenForm').submit();
            }, 1000);
          });
        })
        .catch(function(error) {
          logger.log('Error occured in app.payment-methods.paymentMethodsController.getUpdateCreditMethods()', {
            error: error
          });
          switch (error.status) {
            case 500:
              handleCyberGateError();
              vm.cyberAddError = true;
              vm.nodata = false;
              break;
            case 400:
            case 404:
            case 412:
            case 403:
            case 405:
              handleCyberGateError();
              vm.cyberUpdateError = true;
              vm.nodata = false;
              break;
          }
        });
    }

    function getCreditMethods() {
      paymentMethodsService.getCredit(vm.accountId, vm.currency,vm.invoiceList)
        .then(function(response) {
          vm.addError = false;
          vm.cyberError = false;
          vm.creditInfo = response.data;
          vm.details = vm.creditInfo.Html;
          vm.template = $sce.trustAsHtml(vm.details);
          $timeout(function() {
            angular.element(document).ready(function() {
              document.getElementById('hiddenForm').submit();
            }, 1000);
          });
        })
        .catch(function(error) {
          logger.log('Error occured in app.payment-methods.paymentMethodsController.getPaymentMethods()', {
            error: error
          });
          switch (error.status) {
            case 500:
              handleCyberGateError();
              vm.cyberAddError = true;
              vm.nodata = false;
              break;
            case 400:
            case 404:
              handleCyberGateError();
              vm.cyberSaveError = true;
              vm.nodata = false;
              break;
            case 412:
            case 403:
            case 405:
              handleCyberGateError();
              vm.cyberError = true;
              vm.nodata = false;
              break;
          }
        });
    }

    function handleCyberGateError() {
      vm.addError = true;
      vm.tabularView = false;
      angular.element(document).ready(function() {
        $('#hide-payments').modal('hide');
      }, 1000);
    }

    vm.resetGridData = function(){
      if(vm.gridOptions){
        vm.gridOptions.data = vm.paymentMethods;
      }
    };

    function getPaymentMethods() {
      vm.loading = true;
      vm.isPaymentMethodActive = [];
      vm.activePaymentMethods = 0;
      paymentMethodsService.getPayment(vm.accountId)
        .then(function(response) {
        vm.paymentMethodsLength = response.data.PaymentMethods.length;
          if (vm.paymentMethodsLength) {
            vm.nodata = false;
            var lang = translatorHelper.currentLanguage();
            if (lang != 'en') { vm.title = false; } else { vm.title = true; }
            for (var i = 0; i < response.data.length; i++) {
              if (response.data[i].nameCreditcardType === '' ||
                response.data[i].nameCreditcardType === null ||
                response.data[i].nameCreditcardType === 'None' ||
                response.data[i].nameCreditcardType === 'null') {
                response.data[i].nameCreditcardType = 'N/A';
              }
            }
            vm.paymentMethods = response.data.PaymentMethods;
            vm.noOfPaymentMethods = response.data.PaymentMethods.length;
            vm.resetGridData();
            vm.paymentMethods.forEach(function(paymentMethod, iterator) {
            vm.disableEditButton = paymentMethod.paymentScheduled;
              if (paymentMethod.expDate !== null) {
                var expiryDate = paymentMethod.expDate.split("/");
                switch(true){
                  case currentDate.getFullYear() > expiryDate[1]:
                    vm.isPaymentMethodActive[iterator] = false;
                    break;
                  case currentDate.getFullYear() < expiryDate[1] && vm.disableEditButton == 'false' && vm.paymentMethodsLength > 1:
                    vm.isPaymentMethodActive[iterator] = false;
                    vm.activePaymentMethods++;
                    break;
                  case (currentDate.getMonth() + 1) <= expiryDate[0] && vm.disableEditButton == 'false' && vm.paymentMethodsLength > 1:
                    vm.isPaymentMethodActive[iterator] = false;
                    vm.activePaymentMethods++;
                    break;
                  case currentDate.getFullYear() < expiryDate[1] && vm.disableEditButton == 'false' && vm.paymentMethodsLength == 1:
                    vm.isPaymentMethodActive[iterator] = true;
                    vm.cardActivePaymentScheduled[iterator] = false;
                    vm.deletePaymentScheduled[iterator] = false;
                    vm.activePaymentMethods++;
                    break;
                  case (currentDate.getMonth() + 1) <= expiryDate[0] && vm.disableEditButton == 'false' && vm.paymentMethodsLength == 1:
                    vm.isPaymentMethodActive[iterator] = true;
                    vm.cardActivePaymentScheduled[iterator] = false;
                    vm.deletePaymentScheduled[iterator] = false;
                    vm.activePaymentMethods++;
                    break;
                  case (currentDate.getFullYear() < expiryDate[1] && vm.disableEditButton == 'true' && vm.paymentMethodsLength > 1):
                    vm.deletePaymentScheduled[iterator] = true;
                    vm.cardActivePaymentScheduled[iterator] = false;
                    vm.isPaymentMethodActive[iterator] = false;
                    break;
                  case (currentDate.getMonth() + 1) <= expiryDate[0] && vm.disableEditButton == 'true' && vm.paymentMethodsLength > 1:
                    vm.deletePaymentScheduled[iterator] = true;
                    vm.cardActivePaymentScheduled[iterator] = false;
                    vm.isPaymentMethodActive[iterator] = false;
                    break;
                  case currentDate.getFullYear() < expiryDate[1] && vm.disableEditButton == 'true' && vm.paymentMethodsLength == 1:
                    vm.cardActivePaymentScheduled[iterator] = true;
                    vm.deletePaymentScheduled[iterator] = false;
                    vm.isPaymentMethodActive[iterator] = false;
                  break;
                  case (currentDate.getMonth() + 1) <= expiryDate[0] && vm.disableEditButton == 'true' && vm.paymentMethodsLength == 1:
                    vm.cardActivePaymentScheduled[iterator] = true;
                    vm.deletePaymentScheduled[iterator] = false;
                    vm.isPaymentMethodActive[iterator] = false;
                  break;
                }
              }
              else if(paymentMethod.expDate == null && vm.disableEditButton == 'true' && vm.paymentMethodsLength > 1) {
                vm.deletePaymentScheduled[iterator] = true;
                vm.isPaymentMethodActive[iterator] = false;
                vm.cardActivePaymentScheduled[iterator] = false;
              }
              else if(paymentMethod.expDate == null && vm.disableEditButton == 'true'  && vm.paymentMethodsLength == 1){
                vm.cardActivePaymentScheduled[iterator] = true;
                vm.deletePaymentScheduled[iterator] = false;
                vm.isPaymentMethodActive[iterator] = false;
              }else if(paymentMethod.expDate == null && vm.disableEditButton == 'false'  && vm.paymentMethodsLength == 1){
                vm.cardActivePaymentScheduled[iterator] = false;
                vm.deletePaymentScheduled[iterator] = false;
                vm.isPaymentMethodActive[iterator] = true;
                vm.activePaymentMethods++;
              }
            });
            if (vm.paymentMethods) {
              utilityService.getResponseConfigJson('PaymentMethods').then(function (response) {
                var configFields = response.data.columns.fields;
                if (configFields) {
                  var configInfo = utilityService.processExternalConfigJson(vm.paymentMethods, configFields);
                  vm.paymentMethodsList = configInfo["isColumnDataList"];
                  vm.paymentMethodsListHeader = utilityService.getKeysForDataList(vm.paymentMethodsList);
                  vm.paymentsDisplayName = configInfo["displayableNames"];
                  vm.paymentsDisplayNameHeader = configInfo["isColumnDisplayableNames"];
                  vm.paymentsSortKeys = configInfo["sortableKeys"];
                  vm.paymentsFilterKeys = configInfo["filterableKeys"];
                  vm.paymentsDefaultColumnKeys = configInfo["defaultColumnKeys"];
                  vm.paymentsConfigs = configInfo["configFields"];
                }
              }).catch(function (error) {
                logger.log('Error occured in app.paymentMethods.Controller.getResponseConfigJson()', {
                  error: error
                });
              });
            }
          } else {
            vm.paymentMethods = [];
            vm.nodata = true;
          }
        }).catch(function(error) {
          logger.log('Error occured in app.payment-methods.paymentMethodsController.getPaymentMethods()', {
            error: error
          });
          vm.paymentMethods = [];
          switch (error.status) {
            case 500:
              handleCyberGateError();
              vm.cyberError = true;
              vm.nodata = false;
              break;
            case 400:
            case 404:
              handleCyberGateError();
              vm.cyberSaveError = true;
              vm.nodata = false;
              break;
            case 412:
            case 403:
            case 405:
              handleCyberGateError();
              vm.cyberAddError = true;
              vm.nodata = false;
              break;
          }
        })
        .finally(function () {
          vm.loading= false;
        });
      _transactionCheck = localStorageService.get('transactionFailure');
      if (_transactionCheck) {
        handleCyberGateError();
        vm.cyberError = true;
        localStorageService.set('transactionFailure', false);
      }
    }

    vm.checkIsACH = function (nameCreditcardType) {
      return nameCreditcardType === null ? true : false;
    };

    vm.widgetOpen = false;
    vm.togglePaymentCardState = function() {
      vm.paymentCardState = 'expanded';
      $scope.$emit('expanded', vm.paymentCardState, COMPONENT_NAME);
      vm.widgetOpen = true;
      vm.paymentClose = true;
      vm.limit = vm.paymentMethods.length;
      if ( vm.limit > 0) {
        vm.paymentMethodsListHeader = Object.keys(vm.paymentMethodsList[0]);
        var storageTabulardata = utilityService.gridSettingsStorageData(COMPONENT_NAME);
        var columnKeys = (storageTabulardata.activeColumns && (storageTabulardata.activeColumns).length > 0) ? storageTabulardata.activeColumns : vm.paymentsDefaultColumnKeys;
        vm.checkboxSelection = vm.checkboxSelectionTemp = columnKeys;
        vm.freezeColumns = vm.freezeColumnsTemp = storageTabulardata.freezeColumns;
      }
      vm.viewAllBodyHeight();
      var prop = { "period": false, "sortable": true, "filterable": true, sortKeys: vm.paymentsSortKeys, filterKeys: vm.paymentsFilterKeys, displayNames: vm.paymentsDisplayName };
      $scope.$emit('widgetFilter', prop);
      setTabularView(true);
      return vm.paymentCardState;
    };

    vm.closePaymentViewAll = function() {
      vm.paymentCardState = 'collapsed';
      vm.paymentClose = false;
      vm.selectedFilters = {};
      vm.selectedSortKey = null;
      $scope.$emit('expanded', vm.paymentCardState, COMPONENT_NAME);
      $scope.$emit('widgetFilter', {});
      vm.widgetOpen = false;
      vm.tabularView = false;
      vm.limit = 2;
      angular.element(document).ready(function() {
        $timeout(function() {
          $(".widget-content-list").scrollTop(0);
        }, 1000);
      });
    };

    vm.errorClose = function(){
      vm.addError = false;
      if(vm.paymentMethodsLength <= 0){
        vm.nodata = true;
      }
    }

    vm.editConfirmPopup = function(idPaymentInstrument){
      vm.idPaymentInstrument = idPaymentInstrument;
      angular.element(document).ready(function(){
        angular.element("#confirmPopup").appendTo("body").modal();
      });
      vm.addPaymentConfirm = false;
      vm.editPaymentConfirm = true;
      vm.hideDeleteConfirmationBox = false;
    }

     vm.showConfirmationBox = function(index,idPaymentInstrument){
      vm.idPaymentInstrumentr = idPaymentInstrument;
      angular.element(document).ready(function(){
        angular.element("#removePopup").appendTo("body").modal();
      });
     vm.index = index;
     vm.hideDeleteConfirmationBox = true;
     vm.addPaymentConfirm = false;
      vm.editPaymentConfirm = false;
     for(var i=0;i<vm.paymentMethods.length;i++){
      if(vm.paymentMethods[i].idPaymentInstrument ==  vm.idPaymentInstrumentr){
        vm.deleteThisCard = vm.paymentMethods[i];
        break;
      }
     }
    }

    vm.addConfirmPopup = function(){
      angular.element(document).ready(function(){
        angular.element("#confirmPopup").appendTo("body").modal();
      });
      vm.addPaymentConfirm = true;
      vm.editPaymentConfirm = false;
    }

    $scope.$on('$destroy', function () {
      for(var i = 0; i < unregisterPaymentMethodEvents.length; i++){
        unregisterPaymentMethodEvents[i]();
      }
    });

    vm.editPaymentMouseOver = function(){
      vm.paymentMethods.forEach(function(paymentMethod, iterator) {
        if(paymentMethod.paymentScheduled == 'true'){
          vm.editButton[iterator] = 1;
        }else{
        vm.editButton[iterator] = 0;
        }
      });
    }

    vm.editPaymentMouseLeave = function(){
      vm.paymentMethods.forEach(function(paymentMethod, iterator) {
      vm.editButton[iterator] = 0;
    });
  }

  $document.on('click', function(event) {
    var deletePopupConfirmation = angular.element(".payment-method");
      if(deletePopupConfirmation !== event.target  && !deletePopupConfirmation.has(event.target).length){
        dismissDeleteErrorBox();
        dismissRemoveErrorBox();
      }
  });

  vm.showTabularView = function() {
      vm.tabularView = true;
      vm.setGridOptions();
      vm.viewAllBodyHeight();
    }

    vm.showCardView = function() {
      vm.tabularView = false;
      vm.isTabularViewSettings = false;
      vm.viewAllBodyHeight();
    }

    vm.getActiveViewStyle = function(view) {
      return view == 'card' ? (vm.tabularView ? "ecb-cardTabularActiveView" : "ecb-cardTabularFadeView") : (!vm.tabularView ? "ecb-cardTabularActiveView" : "ecb-cardTabularFadeView");
    }

    vm.isExpandTabularView = function() {
      return vm.widgetOpen && vm.tabularView;
    }

    vm.showPaymentSettings = function() {
      return vm.widgetOpen && vm.tabularView;
    }

    vm.isPaymentsSettings = function() {
      return vm.widgetOpen && vm.tabularView && vm.isTabularViewSettings;
    }

    vm.applyPaymentsCancelSettings = function(isApply) {
      if(isApply) {
        vm.checkboxSelection = angular.copy(vm.checkboxSelectionTemp);
        vm.freezeColumns = angular.copy(vm.freezeColumnsTemp);
        utilityService.gridSettingsStorageData(COMPONENT_NAME, vm.checkboxSelection, vm.freezeColumns);
        vm.gridOptions.columnDefs = vm.getPaymentsDeifinitions();
      }
      vm.isTabularViewSettings = false;
    }

    vm.togglePaymentsSelectAll = function(isAll) {
      vm.checkboxSelectionTemp = isAll == 1 ? angular.copy(vm.paymentMethodsListHeader) : angular.copy(vm.freezeColumns);
    }

    vm.isAllColumnDeselected = function(){
      var chkBoxLen = 0;
      for(var i in vm.checkboxSelectionTemp){
        chkBoxLen = (vm.freezeColumns).indexOf(vm.checkboxSelectionTemp[i]) == -1 ? chkBoxLen + 1 : chkBoxLen;
      }
      return chkBoxLen == 0 ? true : false;
    }

    vm.togglePaymentsTabularViewSettings = function() {
      vm.isTabularViewSettings = vm.isTabularViewSettings ? false : true;
      vm.checkboxSelectionTemp = angular.copy(vm.checkboxSelection);
    }

    vm.togglePaymentsHeaderSelection = function(header) {
      var idx = vm.checkboxSelectionTemp.indexOf(header);
      if (idx > -1)
        vm.checkboxSelectionTemp.splice(idx, 1);
      else
        vm.checkboxSelectionTemp.push(header);
    }

    vm.setGridOptions = function() {
      vm.gridOptions = {
        data: vm.paymentMethods,
        columnDefs : vm.getPaymentsDeifinitions(),
        rowHeight : 32,
        enableColumnResizing : true,
        enableSorting: true,
        appScopeProvider : vm,
        enableColumnMenus: false,
        showGridFooter: false,
        cellTooltip: true,
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
      if(vm.tabularGridApi)
        vm.tabularGridApi.core.refresh();
    };
    vm.getPaymentsDeifinitions = function() {
      var columnDefinitions = [];
      var columnDefinitionActions = { "field": 'Actions', displayName: "", minWidth: vm.gridActionColMinWidth, pinnedLeft: !vm.isRTL, pinnedRight: vm.isRTL};
      var edit = ($filter('translate')('TEXT_EDIT'));
      var makePayment = ($filter('translate')('TEXT_MAKE_PAYMENT'));
      var remove = ($filter('translate')('TEXT_REMOVE'));

      columnDefinitionActions.cellTemplate = '<ul class="list-inline text-center ">'
                 +'<li ng-mouseover="vm.editPaymentMouseOver()" ng-mouseleave="vm.editPaymentMouseLeave()" class="ecb-paymentCardHoverList">'
                 +'<button class="btn ebBtn btn-sm  ebBtn_small  ecb-paymentOption" ng-disabled = "{{grid.appScope.paymentMethods[rowRenderIndex].paymentScheduled}}"  ng-click="grid.appScope.editConfirmPopup(grid.appScope.paymentMethods[rowRenderIndex].idPaymentInstrument)">'
                 +' <i class="fa fa-pencil ebIcon"></i>'
                 +'<span>'+edit+'</span></button></li>'
                 +'<li class="ecb-paymentCardHoverList"><button class="btn ebBtn btn-sm  ecb-paymentOption" ng-click="grid.appScope.processMakePayment(rowRenderIndex)">'
                 +' <i class="fa fa-check ebIcon" aria-hidden="true"></i>'
                 +' <span data-toggle="modal">'+ makePayment +'</span></button></li>'
                 +'<li class="ecb-paymentCardHoverList"><button class="btn ebBtn btn-sm  ebBtn_small  ecb-paymentOption" ng-click="grid.appScope.showConfirmationBox(rowRenderIndex,grid.appScope.paymentMethods[rowRenderIndex].idPaymentInstrument)"><i class="fa fa-trash-o ebIcon"></i>'
                 +'<span>'+remove+'</span></button></li>';

      columnDefinitions.push(columnDefinitionActions);
      var definitions = utilityService.setColumnDefinitions({columnKeys: vm.paymentMethodsListHeader, 
      selectedFilters: vm.selectedFilters, 
      configs: vm.paymentsConfigs, 
      checkboxSelection: vm.checkboxSelection, 
      dispNameKeyMap: vm.paymentsDisplayName, 
      freezeColumns: vm.freezeColumns, 
      sortKeys: vm.paymentsSortKeys, 
      selectedSortKey: vm.selectedSortKey,
      sortOrder: vm.sortOrder });
      return columnDefinitions.concat(definitions);
    }

    vm.unFreezeColumnsList = function(columnList) {
      var unFreezeColumns = [];
      for(var i in columnList){
        if(vm.freezeColumns.indexOf(columnList[i]) == -1)
          unFreezeColumns.push(columnList[i]);
      }
      return unFreezeColumns;
    }

    vm.toggleFreezingColumns = function(header, unfreezeColumns) {
      if((unfreezeColumns && vm.checkboxSelectionTemp.indexOf(header) == -1) || header == 'Actions') return;
      var columnIndex = vm.freezeColumnsTemp.indexOf(header);
      if (columnIndex > -1)
        vm.freezeColumnsTemp.splice(columnIndex, 1);
      else
        vm.freezeColumnsTemp.push(header);
    }

    vm.showMidLine = function(columnList) {
      return vm.freezeColumns.length > 0 && vm.freezeColumns.length < columnList.length;
    }

    vm.paymentHeaderKey = function(key) {
      return vm.paymentsDisplayName[key] ? vm.paymentsDisplayName[key] : key;
    }

    vm.processMakePayment = function(rowRenderIndex){
      var idPaymentInstrument = vm.paymentMethods[rowRenderIndex].idPaymentInstrument;
      vm.makePayment(vm.accountId, vm.currency, idPaymentInstrument);
    }

    vm.getSettingsHeight = function() {
      var height = $window.innerHeight;
      var systembarHeight = $document.find(".systemBar").height();
      var settingsHeader = $document.find(".ecb-settingsHeader").height();
      var settingsCheckboxHeader = $document.find(".ecb-settingsCheckboxHeader").height();
      if (height) return { "height": (height - (systembarHeight + settingsHeader + settingsCheckboxHeader + 40)) + "px" };
    }

    vm.viewAllBodyHeight = function() {
      angular.element(".ecb-expandPaymentsMethodBody").ready(function() {
        vm.getViewAllBodyHeight();
      });
    }

    vm.getViewAllBodyHeight = function() {
      return utilityService.manageViewAllBodyHeight("ecb-paymentMethodsExpandMain", "ecb-expandPaymentsMethodBody");
    }

    vm.deletePaymentDefaultMessage = function($index) {
       return (!((vm.isPaymentMethodActive[$index] == true) && (vm.activePaymentMethods == 1)) && !(vm.cardActivePaymentScheduled[$index] == true) && !(vm.deletePaymentScheduled[$index] == true))
    }
    vm.getSortByColumn = function(defaultKey) {
      return vm.selectedSortKey ? vm.selectedSortKey : defaultKey;
    }
  }
})();
