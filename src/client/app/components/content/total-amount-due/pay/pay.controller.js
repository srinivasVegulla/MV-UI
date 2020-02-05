(function() {
    'use strict';

    angular
        .module('app.payModal')
        .controller('payModalController', Controller);

    Controller.$inject = [
        'logger',
        '$uibModalInstance',
        'accountService',
        'accountId',
        'paymentMethodsService',
        'amountDueService',
        '$filter',
        '$scope',
        'totalBillAmountService',
        '$rootScope',
        '$moment',
        '$timeout',
        'currency',
        '$sce',
        'localStorageService',
        'payService',
        'idPaymentInstrument',
        'authenticationService',
        'translatorHelper',
        'utilityService'
    ];

    function Controller(
        logger,
        $uibModalInstance,
        accountService,
        accountId,
        paymentMethodsService,
        amountDueService,
        $filter,
        $scope,
        totalBillAmountService,
        $rootScope,
        $moment,
        $timeout,
        currency,
        $sce,
        localStorageService,
        payService,
        idPaymentInstrument,
        authenticationService,
        translatorHelper,
        utilityService) {
        /* jshint validthis: true */
        var vm = this,
            COMPONENT_NAME = 'Pay Now',
            _transactionCheck,
            _amountPayable,
            _addCardPayNow,
            _errorCheck,
            _addCardPayNowDate,
            _oneTimeCheck;
        vm.getPaymentDetails = getPaymentDetails;
        vm.getPayUsing = getPayUsing;
        vm.cancel = cancel;
        vm.payNowWidget = payNowWidget;
        vm.schedulePayment = schedulePayment;
        vm.addCardNowPayNow = addCardNowPayNow;
        vm.caldendarCheck = caldendarCheck;
        vm.displayCalender = displayCalender;
        vm.selectedCardId;
        vm.selectedCardCreated = '';
        vm.currencySymbol = '';
        vm.uncheckAuthorization = uncheckAuthorization;
        vm.enablePayButton = enablePayButton;
        vm.getInvoicesDetails = getInvoicesDetails;
        vm.payNow = true;
        vm.saveCard = false;
        vm.addPayNowCheck = false;
        vm.newPaymentMethod = true;
        vm.saveChecked = true;
        vm.addPayNowConfirm = false;
        vm.amtDueServCalled = false;
        vm.isRTL = false;
        vm.ecbARValue = localStorageService.get('ecbarStatus');
        vm.amountDueCheck = amountDueCheck;
        vm.ecbARCheck = false;
        vm.invoiceList = [];
        vm.finalInvoiceList = [];
        vm.oneTimePayment;
        vm.storeInvoiceList;
        vm.invoicePaymentDetails = [];
        vm.oneTimeInvoiceList;
        vm.invoiceError = false;
        vm.invoiceIndex;
        vm.accountPastDue;
        vm.showPastDue = showPastDue;
        vm.totalInvoiceAmount = totalInvoiceAmount;
        vm.calendarDateFormat = vm.localizeDateFormat = utilityService.dateFormat;

        activate();

        $scope.$watch('vm.duePaymentAmountPayable',function(amountDue){
            if(amountDue){
                amountDueCheck();
            }
        });

        function activate() {
            getPaymentDetails();
            getDuePaymentAmount();
            //getPayUsing();
            getCurrency();
            var i18n = translatorHelper.loadFromStorage();
            vm.layoutLeftDirection = 'left';
            vm.layoutRightDirection = 'right';
            if(i18n.languageDirection == 'RTL'){
                vm.layoutLeftDirection = 'right';
                vm.layoutRightDirection = 'left';
                vm.isRTL = true;
            }
            if(vm.ecbARValue === '0'){
                vm.ecbARCheck = true;
                getInvoicesDetails();
            } else {
                vm.ecbARCheck = false;
            }
            vm.duePaymentAmountPayable = 0;
            utilityService.getLocaleDateFormatter().then(function () {
                vm.localizeDateFormat = vm.getDateFormatByLang();
                vm.localizePickDateFormat = utilityService.convertPickDateFormat(vm.localizeDateFormat);
                vm.maxDateLimit = $moment().add(1, 'year').format(vm.localizeDateFormat);
                vm.currentDate = $moment().format(vm.localizeDateFormat);
            });
        }

        function amountDueCheck(){
           if(vm.duePaymentAmount.amount <= 0){
             return true;
           } else if(vm.duePaymentAmountPayable > vm.duePaymentAmount.amount) {
             return true;
           } else {
            return false;
           }
        }

        function getPayUsing(){
          payService.getPayUsing()
            .then(function(result){
              vm.payUsing = result.data.payUsing;
              if(vm.paymentMethodsLength === 0){
                vm.payUsing.splice(0,1);
                vm.payUsingMethod = vm.payUsing[0];
              } else{
                vm.payUsingMethod = vm.payUsing[0];
              }
            })
            .catch(function(error) {
                handleError(error);
            });
        }

        function getInvoicesDetails(){
            vm.invoiceList = [];
            vm.duePaymentAmountPayable = 0;
            amountDueService.getInvoices(accountId)
                .then(function(result) {
                vm.invoiceList = result.data.openInvoices.m_Items;
                vm.invoiceList.forEach(function(invoice){
                    invoice['OpenAmtAsNum'] = invoice.OpenAmt;
                });
                var invoiceListLength = vm.invoiceList.length;
                vm.totalInvoiceAmount();
            }).catch(function(error){
                handleError(error);
                vm.invoiceError = true;
            }).finally(function(){
              vm.loading= false;
            });
        }

      function totalInvoiceAmount(){
          var amount = 0.00;
          if(vm.invoiceList !== undefined && vm.invoiceList !== null) {
            for(var i=0; i<vm.invoiceList.length; i++){
                amount += parseFloat(vm.invoiceList[i].OpenAmt === null ? 0 : vm.invoiceList[i].OpenAmt);
            }
          }
          if(amount !== undefined && amount !== null && !isNaN(amount)){
            localStorageService.set("totalInvoiceAmount", amount.toFixed(2));
            vm.amountPayable = amount.toFixed(2);
          }
        }

        function showPastDue(invoice,index){
            var invoiceDate = Date.parse(invoice);
            var currentDate = new Date();
            var currentMillisecondDate = Date.parse(currentDate);
            if(invoiceDate <= currentMillisecondDate){
                vm.invoiceIndex = index;
                vm.accountPastDue = true;
                //$scope.$emit('show_past_due', vm.accountPastDue);
                return true;
            }else {
                return false;
            }
        }

        function getDuePaymentAmount() {
          vm.loading = true;
            amountDueService.getDuePayment(accountId)
                .then(function(result) {
                    if (result.data) {
                        vm.addError = false;
                        vm.nodata = false;
                        vm.duePaymentAmount = result.data.PaymentInfo;
                        vm.amountLength = (vm.duePaymentAmount.amount).length;
                        amountDueCheck();
                        if (vm.paymentMethodsLength <= 0){
                        vm.newPaymentMethod = false;
                        //vm.payUsingMethod = vm.payUsing[1];
                        if(!vm.ecbARCheck){
                            vm.loading = false;
                        }
                        vm.saveCard = true;
                        vm.paymentMethodsLength = 0;
                        vm.addNowPayNow = true;
                        vm.addNowScheduleNow = false;
                        vm.payNow = false;
                        vm.authorizeCheck = true;
                        vm.payReview = false;
                        vm.addPayNowReview = true;
                        }else{
                        vm.newPaymentMethod = true;
                        //vm.payUsingMethod = vm.payUsing[0];
                        if(!vm.ecbARCheck){
                            vm.loading = false;
                        }
                        vm.payNow = true;
                        vm.payReview = true;
                        }
                    } else {
                        vm.addError = true;
                        vm.nodata = true;
                    }
                })
                .catch(function(error) {
                    logger.log('Error retrieving data.<br />Please contact customer support.', error, COMPONENT_NAME, {
                        error: error
                    });
                    switch (error.status) {
                        case 500:
                            handleCyberGateError();
                            vm.cyberAddError = true;
                            break;
                        case 412:
                        case 403:
                        case 405:
                        case 400:
                        case 404:
                            handleCyberGateError();
                            vm.cyberError = true;
                            break;
                    }
                }).finally(function(){
                  vm.loading = false;
                });;
        }

        function getPaymentDetails() {
            vm.payNowWidgetContent = 1;
            _oneTimeCheck = localStorageService.get('oneTimePayment');
           if(_oneTimeCheck){
               payNowWidget(4);
               localStorageService.set('oneTimePayment', false);
            }
            vm.loading = true;
            vm.isTransactionSuccessPage = false;
            _transactionCheck = localStorageService.get('transactionSuccess');
            if (_transactionCheck) vm.isTransactionSuccessPage = true;
            paymentMethodsService.getPayment(accountId)
                .then(function(response) {
                vm.paymentMethodsLength = response.data.PaymentMethods.length;
                getPayUsing();
                    if (vm.paymentMethodsLength) {
                        vm.paymentMethods = response.data.PaymentMethods;
                        for(var i=0; i<vm.paymentMethodsLength; i++) {
                            if (vm.paymentMethods[i].idPaymentInstrument === idPaymentInstrument) {
                                vm.cardSelected = vm.paymentMethods[i];
                                break;
                            } else {
                                vm.cardSelected = vm.paymentMethods[0];
                            }
                        }
                        if (_transactionCheck) {
                            payNowWidget(3);
                            localStorageService.remove('transactionSuccess');
                        }
                    }else{
                        vm.isTransactionSuccessPage = false;
                    }
                }).catch(function(error) {
                    vm.isTransactionSuccessPage = false;
                    vm.paymentMethods = '';
                    handleError(error);
                }).finally(function(){
                  vm.loading = false;
                });

            amountDueService.getDuePayment(accountId)
                .then(function(result) {
                    vm.amtDueServCalled = true;
                    vm.duePaymentAmount = result.data.PaymentInfo;
                    vm.duePaymentPayable = parseFloat(vm.duePaymentAmount.amount);
                    if (vm.duePaymentPayable > 0) {
                        vm.duePaymentAmountPayable = vm.duePaymentPayable;
                    } else {
                        vm.duePaymentAmountPayable = '';
                    }
                })
                .catch(function(error) {
                    handleError(error);
                });

            vm.setPayUsing = function(x) {
                vm.payUsingMethod = x;
                switch (true) {
                    //Schedule Now
                    case vm.payUsingMethod == 'Existing Payment Method' && vm.currentDate !== vm.selectedDatepicker:
                        vm.saveCard = false;  //Save for Future use
                        vm.schedulePay = true; //Schedule Now Button
                        vm.scheduleConfirm = true; //Schedule in Confirmation Tab
                        vm.payConfirm = false; //Pay in Confirmation Tab
                        vm.payReview = false; // Pay in Review Tab
                        vm.scheduleReview = true; // Schedule in Review Tab
                        vm.addPayNowReview = false; // addNowPayNow in Review Tab
                        vm.addScheduleNowReview = false; // addNowScheduleNow in Review Tab
                        vm.payNow = false; // Pay Now Button
                        vm.authorizeCheck = true; // disable button
                        vm.addNowScheduleNow = false; // addNowPayLater Button
                        vm.addNowPayNow = false;// AddNowPayNow Button
                        vm.newPaymentMethod = true;
                        vm.saveChecked = true;//save for future use
                        break;
                        //Add Now Pay Now
                    case vm.payUsingMethod == 'New Payment Method' && vm.currentDate === vm.selectedDatepicker:
                        vm.saveCard = true;
                        vm.schedulePay = false;
                        vm.scheduleConfirm = false;
                        vm.payConfirm = true;
                        vm.payNow = false;
                        vm.payReview = false;
                        vm.scheduleReview = false;
                        vm.addPayNowReview = true;
                        vm.addScheduleNowReview = false;
                        vm.authorizeCheck = true;
                        vm.addNowScheduleNow = false;
                        vm.addNowPayNow = true;
                        vm.newPaymentMethod = false;
                        break;
                        //Add Now Pay Later
                    case vm.payUsingMethod == 'New Payment Method' && vm.currentDate !== vm.selectedDatepicker:
                        vm.saveCard = true;
                        vm.schedulePay = false;
                        vm.scheduleConfirm = true;
                        vm.payConfirm = false;
                        vm.payNow = false;
                        vm.payReview = false;
                        vm.scheduleReview = false;
                        vm.addPayNowReview = false;
                        vm.addScheduleNowReview = true;
                        vm.authorizeCheck = true;
                        vm.addNowScheduleNow = true;
                        vm.addNowPayNow = false;
                        vm.newPaymentMethod = false;
                        break;
                        //Pay Now
                    default:
                        vm.saveCard = false;
                        vm.schedulePay = false;
                        vm.payNow = true;
                        vm.payConfirm = true;
                        vm.payReview = true;
                        vm.addPayNowReview = false;
                        vm.scheduleReview = false;
                        vm.addScheduleNowReview = false;
                        vm.scheduleConfirm = false;
                        vm.authorizeCheck = true;
                        vm.addNowScheduleNow = false;
                        vm.addNowPayNow = false;
                        vm.newPaymentMethod = true;
                        vm.saveChecked = true;
                }

                switch (true) {
                    case vm.paymentMethodsLength <= 0 && vm.payUsingMethod == 'New Payment Method' && vm.currentDate === vm.selectedDatepicker:
                        vm.newPaymentMethod = false;
                        vm.payUsingMethod = vm.payUsing[0];
                        vm.saveCard = true;
                        vm.paymentMethodsLength = 0;
                        vm.addNowPayNow = true;
                        vm.addNowScheduleNow = false;
                        vm.payNow = false;
                        vm.authorizeCheck = true;
                        break;
                    case vm.paymentMethodsLength <= 0 && vm.payUsingMethod == 'New Payment Method' && vm.currentDate !== vm.selectedDatepicker:
                        vm.newPaymentMethod = false;
                        vm.payUsingMethod = vm.payUsing[0];
                        vm.saveCard = true;
                        vm.paymentMethodsLength = 0;
                        vm.addNowPayNow = false;
                        vm.addNowScheduleNow = true;
                        vm.payNow = false;
                        vm.authorizeCheck = true;
                        break;
                    case vm.paymentMethodsLength >= 0 && vm.payUsingMethod == 'New Payment Method' && vm.currentDate === vm.selectedDatepicker:
                        vm.newPaymentMethod = false;
                        vm.payUsingMethod = vm.payUsing[1];
                        vm.saveCard = true;
                        vm.paymentMethodsLength = 1;
                        vm.addNowPayNow = true;
                        vm.addNowScheduleNow = false;
                        vm.payNow = false;
                        break;
                    case vm.paymentMethodsLength >= 0 && vm.payUsingMethod == 'New Payment Method' && vm.currentDate !== vm.selectedDatepicker:
                        vm.newPaymentMethod = false;
                        vm.payUsingMethod = vm.payUsing[1];
                        vm.saveCard = true;
                        vm.paymentMethodsLength = 1;
                        vm.addNowPayNow = false;
                        vm.addNowScheduleNow = true;
                        vm.payNow = false;
                        break;
                    case vm.paymentMethodsLength >= 0 && vm.payUsingMethod == 'Existing Payment Method'  && vm.currentDate == vm.selectedDatepicker:
                        vm.newPaymentMethod = true;
                        vm.payUsingMethod = vm.payUsing[0];
                        vm.saveCard = false;
                        if(vm.paymentMethods){
                        vm.paymentMethodsLength = 1;
                        }else{
                        vm.paymentMethodsLength = 0;
                        }
                        vm.addNowPayNow = false;
                        vm.addNowScheduleNow = false;
                        vm.schedulePay = false;
                        vm.payNow = true;
                        vm.authorizeCheck = false;
                        vm.saveChecked = true;
                        break;
                    case vm.paymentMethodsLength >= 0 && vm.payUsingMethod == 'Existing Payment Method' && vm.currentDate !== vm.selectedDatepicker:
                        vm.newPaymentMethod = true;
                        vm.payUsingMethod = vm.payUsing[0];
                        vm.saveCard = false;
                        if(vm.paymentMethods){
                        vm.paymentMethodsLength = 1;
                        }else{
                        vm.paymentMethodsLength = 0;
                        }
                        vm.addNowPayNow = false;
                        vm.addNowScheduleNow = false;
                        vm.schedulePay = true;
                        vm.payNow = false;
                        vm.authorizeCheck = false;
                        vm.saveChecked = true;
                        break;
                    case vm.paymentMethodsLength <= 0 && vm.payUsingMethod == 'Existing Payment Method' :
                        vm.newPaymentMethod = true;
                        vm.payUsingMethod = vm.payUsing[0];
                        vm.saveCard = false;
                        vm.paymentMethodsLength = 0;
                        vm.addNowPayNow = false;
                        vm.payNow = true;
                        vm.authorizeCheck = false;
                        vm.saveChecked = true;
                        break;
                    default:
                        vm.newPaymentMethod = true;
                        vm.saveCard = false;
                        vm.paymentMethodsLength = 0;
                        vm.addNowPayNow = false;
                        vm.payNow = true;
                        vm.authorizeCheck = false;
                }
            }

            vm.setSelected = function(y) {
                vm.cardSelected = y;
            };
        }

        function schedulePayment() {
            vm.selectedDatepicker = document.getElementById("dateId").value;
            switch (true) {
                //Schedule Now
                case vm.currentDate !== vm.selectedDatepicker && vm.payUsingMethod == 'Existing Payment Method':
                    vm.saveCard = false;
                    vm.schedulePay = true;
                    vm.scheduleConfirm = true;
                    vm.payConfirm = false;
                    vm.payReview = false;
                    vm.scheduleReview = true;
                    vm.addPayNowReview = false;
                    vm.addScheduleNowReview = false;
                    vm.payNow = false;
                    vm.authorizeCheck = true;
                    vm.addNowScheduleNow = false;
                    vm.addNowPayNow = false;
                    vm.newPaymentMethod = true;
                    vm.disableSavingCard = false;
                    break;
                    //Add Now Pay Now
                case vm.currentDate === vm.selectedDatepicker && vm.payUsingMethod == 'New Payment Method':
                    vm.saveCard = true;
                    vm.schedulePay = false;
                    vm.scheduleConfirm = false;
                    vm.payConfirm = true;
                    vm.payNow = false;
                    vm.payReview = false;
                    vm.scheduleReview = false;
                    vm.addPayNowReview = true;
                    vm.addScheduleNowReview = false;
                    vm.authorizeCheck = true;
                    vm.addNowScheduleNow = false;
                    vm.addNowPayNow = true;
                    vm.newPaymentMethod = false;
                    vm.disableSavingCard = false;
                    break;
                    //Add Now Pay Later
                case vm.currentDate !== vm.selectedDatepicker && vm.payUsingMethod == 'New Payment Method':
                    vm.saveCard = true;
                    vm.schedulePay = false;
                    vm.scheduleConfirm = true;
                    vm.payConfirm = false;
                    vm.payNow = false;
                    vm.payReview = false;
                    vm.scheduleReview = false;
                    vm.addPayNowReview = false;
                    vm.addScheduleNowReview = true;
                    vm.authorizeCheck = true;
                    vm.addNowPayNow = false;
                    vm.addNowScheduleNow = true;
                    vm.newPaymentMethod = false;
                    vm.disableSavingCard = true;
                    break;
                    // Pay Now
                default:
                    vm.saveCard = false;
                    vm.schedulePay = false;
                    vm.payNow = true;
                    vm.payReview = true;
                    vm.scheduleReview = false;
                    vm.addPayNowReview = false;
                    vm.addScheduleNowReview = false;
                    vm.scheduleConfirm = false;
                    vm.payConfirm = true;
                    vm.authorizeCheck = true;
                    vm.addNowScheduleNow = false;
                    vm.addNowPayNow = false;
                    vm.newPaymentMethod = true;
                    vm.disableSavingCard = false;
            }
        }

        function payNowWidget(widget) {
            vm.payNowWidgetContent = widget;
          if (vm.paymentMethodsLength > 0 && vm.cardSelected){
                if (vm.cardSelected.paymentMethodTypeEnumName == 'metratech.com/paymentserver/PaymentType/ACH') {
                    vm.authorizeUser = true;
                    vm.authorizeCheck = false;
                    vm.disclaimerError = false;
                    $timeout(function() {
                     var disclaimerCheck = document.getElementsByClassName("disclaimerCheck");
                     for(var i=0; i<disclaimerCheck.length; i++){
                        var disclaimerAuthorizeCheck = disclaimerCheck[i].innerHTML;
                         if(disclaimerAuthorizeCheck.indexOf('TEXT') >= 0){
                            vm.authorizeUser = false;
                            vm.authorizeCheck = false;
                            vm.disclaimerError = true;
                         }
                     }
                    },10);
                } else {
                    vm.authorizeUser = false;
                    vm.authorizeCheck = true;
                    vm.disclaimerError = false;
                }
            }
            if(widget === 2){
                if(vm.paymentMethodsLength >= 0 && vm.payUsingMethod == 'New Payment Method'){
                    vm.authorizeUser = false;
                    vm.authorizeCheck = true;
                }
            }
            if (widget === 3) {
              vm.loading= true;
                _addCardPayNow = localStorageService.get("addCardPayNow");
                _addCardPayNowDate = localStorageService.get("addCardPayNowDate");
              if (vm.cardSelected){
                vm.selectedCardId = vm.cardSelected.idPaymentInstrument;
              }
                if(vm.ecbARCheck){
                    _amountPayable = localStorageService.get("totalInvoiceAmount");
                    vm.finalInvoiceList = [];
                    vm.oneTimePayment = false;
                    vm.invoicePaymentDetails = [];
                    angular.forEach(vm.invoiceList, function(value){
                        var list = {
                            "invoiceNum": value.InvoiceString,
                            "amountToPay": (value.OpenAmt === null ? 0 : (value.OpenAmt).toFixed(2)),
                            "invoiceDate": $moment.tz(value.IssueDt, "Europe/London").format('L')
                        }
                        vm.finalInvoiceList.push(list);
                    });
                    if(_addCardPayNow == 'true'){
                        vm.payNowBtn = _addCardPayNow;
                        vm.payConfirm = true;
                        vm.amountPayable = _amountPayable;
                        vm.currentDateSigned = $moment(_addCardPayNowDate, vm.localizeDateFormat).format(vm.calendarDateFormat);
                        //vm.currentDateSigned = $moment.tz(_addCardPayNowDate, "Europe/London").format('L');
                        vm.finalInvoiceList = localStorageService.get('invoicesLists');
                    } else if(_addCardPayNow == null){
                        vm.payNowBtn = document.getElementById("payNow").value;
                        vm.amountPayable = _amountPayable;
                        vm.currentDateSigned = $moment(vm.datePicker, vm.localizeDateFormat).format(vm.calendarDateFormat);
                        //vm.currentDateSigned = $moment.tz(vm.datePicker, "Europe/London").format('L');
                    } else{
                        vm.payNowBtn = _addCardPayNow;
                        vm.amountPayable = _amountPayable;
                        vm.currentDateSigned = $moment(_addCardPayNowDate, vm.localizeDateFormat).format(vm.calendarDateFormat);
                        //vm.currentDateSigned = $moment.tz(_addCardPayNowDate, "Europe/London").format('L');
                        vm.payConfirm = false;
                        vm.scheduleConfirm = true;
                        vm.finalInvoiceList = localStorageService.get('invoicesLists');
                    }
                    amountDueService.getPaymentInvoiceDetails(accountId, vm.amountPayable,vm.selectedCardId,vm.finalInvoiceList,vm.payNowBtn,vm.oneTimePayment,vm.currentDateSigned)
                    .then(function(response) {
                        authenticationService.removeLocalStorage();
                        vm.payment = response.data.ARpaymentDetails;
                        vm.invoicePaymentDetails = vm.payment.Invoices;
                        vm.confirmationNo = vm.payment.ConfirmationNumber;
                        $timeout(function() {
                            $rootScope.$emit('paymentDone');
                            $rootScope.$emit('autopaySetupDone');
                        }, 2000);
                    })
                    .catch(function(error) {
                        logger.log('Error retrieving data.<br />Please contact customer support.', error, COMPONENT_NAME, {
                            error: error
                        });
                        switch (error.status) {
                            case 500:
                                handleCyberGateError();
                                vm.cyberError = true;
                                authenticationService.removeLocalStorage();
                                break;
                            case 412:
                            case 403:
                            case 405:
                            case 400:
                            case 404:
                                handleCyberGateError();
                                if (vm.payNowBtn == 'true') {
                                    vm.cyberMakePaymentError = true;
                                } else {
                                    vm.cyberScheduleError = true;
                                }
                                authenticationService.removeLocalStorage();
                                break;
                        }
                    }).finally(function(){
                      vm.loading= false;
                    });
                } else {
                    _amountPayable = localStorageService.get("amountPayable");
                if(_addCardPayNow == 'true'){
                    vm.payNowBtn = _addCardPayNow;
                    vm.payConfirm = true;
                    vm.amountPayable = _amountPayable;
                    //vm.currentDateSigned = $moment.tz(_addCardPayNowDate, "Europe/London").format('L');
                    vm.currentDateSigned = $moment(_addCardPayNowDate, vm.localizeDateFormat).format(vm.calendarDateFormat);
                } else if(_addCardPayNow == null){
                    vm.payNowBtn = document.getElementById("payNow").value;
                    vm.amountPayable = vm.duePaymentAmountPayable;
                    //vm.currentDateSigned = $moment.tz(vm.datePicker, "Europe/London").format('L');
                    vm.currentDateSigned = $moment(vm.datePicker, vm.localizeDateFormat).format(vm.calendarDateFormat);
                } else{
                    vm.payNowBtn = _addCardPayNow;
                    vm.amountPayable = _amountPayable;
                    //vm.currentDateSigned = $moment.tz(_addCardPayNowDate, "Europe/London").format('L');
                    vm.currentDateSigned = $moment(_addCardPayNowDate, vm.localizeDateFormat).format(vm.calendarDateFormat);
                    vm.payConfirm = false;
                    vm.scheduleConfirm = true;
                }
                amountDueService.getPayment(accountId, vm.selectedCardId, vm.amountPayable , vm.currentDateSigned, vm.payNowBtn)
                    .then(function(response) {
                        authenticationService.removeLocalStorage();
                        vm.payment = response.data;
                        vm.confirmationNo = vm.payment.ConfirmationNumber;
                        $timeout(function() {
                            $rootScope.$emit('paymentDone');
                            $rootScope.$emit('autopaySetupDone');
                        }, 2000);
                    })
                    .catch(function(error) {
                        logger.log('Error retrieving data.<br />Please contact customer support.', error, COMPONENT_NAME, {
                            error: error
                        });
                        switch (error.status) {
                            case 500:
                                handleCyberGateError();
                                vm.cyberError = true;
                                authenticationService.removeLocalStorage();
                                break;
                            case 412:
                            case 403:
                            case 405:
                            case 400:
                            case 404:
                                handleCyberGateError();
                                if (vm.payNowBtn == 'true') {
                                    vm.cyberMakePaymentError = true;
                                } else {
                                    vm.cyberScheduleError = true;
                                }
                                authenticationService.removeLocalStorage();
                                break;
                        }
                      $rootScope.$emit('autopaySetupDone');
                    }).finally(function(){
                      vm.loading= false;
                    });
            }
        }
            if(widget === 4){
                vm.confirmationNo = localStorageService.get("oneTimeConfirmation");
                vm.amountPayable = localStorageService.get("amountPayable");
                vm.currentDateSigned = localStorageService.get("oneTimePaymentDate");
                vm.oneTimeCardType = localStorageService.get("oneTimeCardType");
                vm.oneTimeInvoiceList = localStorageService.get("invoicesLists");
                $rootScope.$emit('paymentDone');
                authenticationService.removeLocalStorage();
            }
        }
        function getCurrency() {
          amountDueService.getDuePayment(accountId)
            .then(function (response) {
              vm.currency = response.data.PaymentInfo.currency;
            })
            .catch(function (error) {
              vm.currency = 'USD';
              logger.log('Error retrieving Currency in Pay  controller.');
            });
        }
        function addCardNowPayNow(){
            vm.storeInvoiceList = [];
            if(vm.saveChecked){
                if(vm.ecbARCheck){
                    angular.forEach(vm.invoiceList, function(value){
                        var list = {
                            "invoiceNum": value.InvoiceString,
                            "amountToPay": (value.OpenAmt === null ? 0 : (value.OpenAmt).toFixed(2)),
                            "invoiceDate": $moment.tz(value.IssueDt, "Europe/London").format('L')
                        }
                        vm.storeInvoiceList.push(list);
                      });
                      localStorageService.set('invoicesLists',vm.storeInvoiceList);
                }else{
                    vm.storeInvoiceList = [];
                }
            paymentMethodsService.getCredit(accountId, vm.currency, vm.storeInvoiceList)
                .then(function(response) {
                  vm.creditInfo = response.data;
                  vm.details = vm.creditInfo.Html;
                  vm.template = $sce.trustAsHtml(vm.details);
                  $timeout(function() {
                    angular.element(document).ready(function() {
                      document.getElementById('hiddenForm').submit();
                    }, 900000000);
                  });
                  vm.payNowBtn = document.getElementById("payNow").value;
                  localStorageService.set("amountPayable",vm.duePaymentAmountPayable);
                  localStorageService.set("addCardPayNow",vm.payNowBtn);
                  localStorageService.set("addCardPayNowDate",vm.datePicker);
                  localStorageService.set('invoicesLists',vm.storeInvoiceList);
                })
                .catch(function(error) {
                  logger.log('Error occured in app.account.payModalController.addCardNowPayNow()', {
                    error: error
                  });
                  switch (error.status) {
                    case 500:
                      handleCyberGateError();
                      vm.cyberAddError = true;
                      vm.authorizeCheck = false;
                      authenticationService.removeLocalStorage();
                      vm.closePayPopup();
                      break;
                    case 400:
                    case 404:
                      handleCyberGateError();
                      vm.cyberAddPayNowError = true;
                      vm.authorizeCheck = false;
                      authenticationService.removeLocalStorage();
                      vm.closePayPopup();
                      break;
                    case 412:
                    case 403:
                    case 405:
                      handleCyberGateError();
                      vm.cyberError = true;
                      vm.authorizeCheck = false;
                      authenticationService.removeLocalStorage();
                      vm.closePayPopup();
                      break;
                  }
                });
            } else {
                if(vm.ecbARCheck){
                    angular.forEach(vm.invoiceList, function(value){
                        var list = {
                            "invoiceNum": value.InvoiceString,
                            "amountToPay": (value.OpenAmt === null ? 0 : (value.OpenAmt).toFixed(2)),
                            "invoiceDate": value.IssueDt
                        }
                        vm.finalInvoiceList.push(list);
                        vm.amountPayable = localStorageService.get("totalInvoiceAmount");
                    });
                } else{
                    vm.finalInvoiceList = [];
                    vm.amountPayable = vm.duePaymentAmountPayable;
                }
                    vm.currentDateSigned = $moment(vm.datePicker, vm.localizeDateFormat).format(vm.calendarDateFormat);
                    //vm.currentDateSigned = $moment.tz(vm.datePicker, "Europe/London").format('L');
                    vm.oneTimePayment = true;
                    amountDueService.getOneTimePayment(accountId, vm.amountPayable, vm.currentDateSigned, vm.finalInvoiceList)
                    .then(function(response) {
                  vm.creditInfo = response.data;
                  vm.details = vm.creditInfo.Html;
                  vm.template = $sce.trustAsHtml(vm.details);
                  $timeout(function() {
                    angular.element(document).ready(function() {
                      document.getElementById('hiddenForm').submit();
                    }, 1000);
                  });
                  localStorageService.set("saveChecked", true);
                  localStorageService.set("amountPayable",vm.amountPayable);
                  localStorageService.set("oneTimePaymentDate",vm.datePicker);
                  localStorageService.set("invoicesLists",vm.finalInvoiceList);
              }).catch(function(error) {
                  logger.log('Error occured in app.account.payModalController.addCardNowPayNow()', {
                    error: error
                  });
              switch (error.status) {
                    case 500:
                      handleCyberGateError();
                      vm.cyberAddError = true;
                      vm.authorizeCheck = false;
                      authenticationService.removeLocalStorage();
                      vm.closePayPopup();
                      break;
                    case 400:
                    case 404:
                      handleCyberGateError();
                      vm.cyberAddPayNowError = true;
                      vm.authorizeCheck = false;
                      authenticationService.removeLocalStorage();
                      vm.closePayPopup();
                      break;
                    case 412:
                    case 403:
                    case 405: 
                      handleCyberGateError();
                      vm.cyberError = true;
                      vm.authorizeCheck = false;
                      localStorageService.remove("oneTimeConfirmation");
                      authenticationService.removeLocalStorage();
                      vm.closePayPopup();
                      break;
                  }
                });
            }
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function handleCyberGateError() {
            vm.addError = true;
            angular.element(document).ready(function() {
                $('#hide-pay').modal('hide');
            }, 1000);
        }

        function handleError(error) {
            logger.log('Error retrieving data.<br />Please contact customer support.', error, COMPONENT_NAME);
        }

        function uncheckAuthorization() {
            vm.authorizeCheck = false;
            vm.addError = false;
            _errorCheck = localStorageService.get("addCardPayNow");
            if(_errorCheck){
                vm.authorizeCheck = false;
            }
        }

        function caldendarCheck(){
             if(vm.saveChecked){
                return '';
             }else{
                return 'ecb-calendarCheck';
             }
        }

        function displayCalender(){
            document.getElementById("dateId").focus();
        }

        vm.addPayNowPopup = function(){
            vm.addPayNowConfirm = true;
            angular.element(document).ready(function(){
                angular.element("#payConfirmPopup").appendTo("body").modal();
                angular.element(".pay-modal .modal-content").attr('style', 'background-color: #D0D0D0;');
            });
        }

        vm.closePayPopup = function(){
            vm.addPayNowConfirm = false;
            angular.element(document).ready(function(){
                angular.element(".pay-modal .modal-content").attr('style', 'background-color: none;');
                angular.element('#payConfirmPopup').modal('hide');
            });
        }

        function enablePayButton(){
            if(vm.amtDueServCalled == false){
                return true;
            }
            // else if(vm.duePaymentAmountPayable <= 0 || vm.paymentMethodsLength <= 0){         
            else if(vm.duePaymentAmountPayable <= 0){
                return true;
            }else{
                return false;
            }
        }

        vm.closeDisclaimerError = function(){
            vm.disclaimerError = false;
        }
        vm.getCurrencySign = function(code) {
            return utilityService.getCurrencySign(code);
        }
        vm.currencyFormatter = function(value, code, isSymbol) {
            return utilityService.currencyFormatter(value, code, isSymbol);
        }
        vm.getDateFormatByLang = function() {
            var dateFormat = utilityService.getDateFormatterByLang()['dateFormat'];
            return utilityService.isObject(dateFormat) ? dateFormat : vm.calendarDateFormat;
        }
    }
})();
