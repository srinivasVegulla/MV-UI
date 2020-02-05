(function() {
  'use strict';

  angular
    .module('app.layout.payment-setup')
    .controller('paymentSetupModalController', Controller);

  Controller.$inject = [
    'logger',
    '$uibModalInstance',
    '$rootScope',
    'accountId',
    'paymentMethodsService',
    'amountDueService',
    'translatorHelper',
    'paymentSetupModalService',
    '$state',
    '$scope',
    '$filter'
  ];

  function Controller(
    logger,
    $uibModalInstance,
    $rootScope,
    accountId,
    paymentMethodsService,
    amountDueService,
    translatorHelper,
    paymentSetupModalService,
    $state,
    $scope,
    $filter) {
    /* jshint validthis: true */
    var vm = this;
    vm.save = save;
    vm.cancel = cancel;
    vm.defaultPaymentMethod = {};
    vm.autopay = true;
    vm.nocard = false;
    vm.idPaymentInstrument = '';
    vm.payType = '';
    vm.loading = true;

    $rootScope.$on('$locationChangeSuccess', function() {
      $uibModalInstance.dismiss('cancel');
    });

      activate();

    function activate() {
      vm.loading = true;
      getPaymentMethods();
      getDuePaymentAmount();
      getAutoPay();
      var i18n = translatorHelper.loadFromStorage();
      vm.layoutLeftDirection = 'left';
      vm.layoutRightDirection = 'right';
      if(i18n.languageDirection == 'RTL'){
        vm.layoutLeftDirection = 'right';
        vm.layoutRightDirection = 'left';
      }
    }

    vm.setSelected = function(y) {
      vm.defaultPaymentMethod = y;
      vm.nocard = false;
      vm.idPaymentInstrument = y.idPaymentInstrument;
      vm.payType = 'metratech.com/accountcreation/PaymentMethod/CreditOrACH';
    };

    vm.dropDownDisabled = function(){
      return ((!vm.autopay && (vm.payType !='metratech.com/accountcreation/PaymentMethod/CreditOrACH')) || (vm.payType =='metratech.com/accountcreation/PaymentMethod/CashOrCheck') || (vm.nocard));
    }
    vm.isDropDownDisabled = function(){
      return vm.nocard;
    }
    function getPaymentMethods() {
      paymentMethodsService.getPayment(accountId).then(function(response) {
        if (response.data.PaymentMethods.length) {
          var lang = translatorHelper.currentLanguage();
          if (lang != 'en') {
            vm.title = false
          } else vm.title = true;
          vm.paymentMethods = response.data.PaymentMethods;
          vm.defaultPaymentMethod = vm.paymentMethods[0];
          vm.idPaymentInstrument = vm.paymentMethods[0].idPaymentInstrument;
          vm.nocard = false;
        } else {
          vm.nocard = true;
        }
      });
    }

    function getDuePaymentAmount() {
      amountDueService.getDuePayment(accountId)
        .then(function(result) {
          if (result) {
            vm.duePaymentAmount = result.data.PaymentInfo;
          }
        })
        .catch(handleError);
    }

    function getAutoPay() {
      paymentSetupModalService.getAutoPay(accountId)
        .then(function(result) {
          if (result) {
            vm.autopay = result.data.autopay;
            $rootScope.$emit('autoPayStatus', vm.autopay);
          }
        })
        .catch(handleError)
        .finally(function(){
          vm.loading = false;
        });
    }

    vm.setPayType = function(payType) {
      if(!vm.nocard){
      vm.payType = payType;
    }
    }

    function save() {
      var updatePaymentInfo = ($filter('translate')('TEXT_PAYMENT_INFO_UPDATE_SUCCESSFUL'));
      var updateInfoFailed = ($filter('translate')('TEXT_PAYMENT_INFO_UPDATE_FAIL'));
      if (vm.defaultPaymentMethod && !vm.nocard) {
        paymentSetupModalService.update(accountId, vm.idPaymentInstrument, vm.payType)
          .then(function(result) {
            $rootScope.$emit('autopaySetupDone');
            logger.success(updatePaymentInfo);
            if(vm.payType == 'metratech.com/accountcreation/PaymentMethod/CreditOrACH') {
              $rootScope.$emit('autoPayStatus', 1);
            } else {
              $rootScope.$emit('autoPayStatus', 0);
            }
            $uibModalInstance.close(vm.accountInfo);
          })
          .catch(function(error) {
            logger.warning(updateInfoFailed, {
              error: error,
            });

          });
      }
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function handleError(error) {
      logger.log('Error retrieving data.Please contact customer support.', error);
    }
  }
})();
