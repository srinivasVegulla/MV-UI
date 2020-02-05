describe('subscriptionsController', function() {
  var expect = chai.expect,
    subscriptionsController,
    $rootScope,
    $controller,
    $scope,
    createController,
    mockInterval = mockData.account().interval,
    subscriptionsServices,
    subscriptionsResponse = mockData.subscriptions().subscriptionsData,
    getSubscriptions,
    cancelSubscriptions,
    filter,
    moment,
    dateFilter,
    timeout,
    translatorHelper,
    window,
    utilityService,
    getResponseConfigJson,
    getOffersImageFile,
    addSubscriptions,
    document,
    localStorageService,
    langData = mockData.localStorageData().i18n,
    siteSettingsResponse = mockData.localStorageData().settings,
    eligibleOffersRespone = mockData.subscriptions().getEligibleOffersData,
    addSubscriptionsRespone = mockData.subscriptions().addSubscriptions;

  beforeEach(function() {
    module('app.subscriptions');
  });

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _subscriptionsServices_,
    _$filter_,
    _$moment_,
    _dateFilter_,
    _$timeout_,
    _translatorHelper_,
    _$window_,
    _utilityService_,
    _$document_,
    _localStorageService_) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    subscriptionsServices = _subscriptionsServices_;
    filter = _$filter_;
    moment  = _$moment_;
    dateFilter  = _dateFilter_;
    timeout  = _$timeout_;
    translatorHelper = _translatorHelper_;
    window = _$window_;
    utilityService = _utilityService_;
    document = _$document_;
    localStorageService = _localStorageService_;

    cancelSubscriptions = sinon.stub(subscriptionsServices, 'cancelSubscriptions');

    getSubscriptions = sinon.stub(subscriptionsServices, 'getSubscriptions');

    getLocaleDateFormatter = sinon.stub(utilityService, 'getLocaleDateFormatter');
    getLocaleDateFormatter.returnsPromise().resolves();

    getResponseConfigJson = sinon.stub(utilityService, 'getResponseConfigJson');

    getEligibleOffers = sinon.stub(subscriptionsServices, 'getEligibleOffers');

    getOffersImageFile = sinon.stub(utilityService, 'getOffersImageFile');

    addSubscriptions = sinon.stub(subscriptionsServices, 'addSubscriptions');

    sandbox = sinon.sandbox.create();
    sandbox.stub(localStorageService, 'get', function () {
      return langData;
    });
    sandbox1 = sinon.sandbox.create();
    sandbox1.stub(utilityService, 'getNameSpace', function () {
      return siteSettingsResponse;
    });

    createController = function() {
      return $controller('subscriptionsController', {
        '$scope': $scope,
         limit: 2,
         sortOrder: null,
         siteName: 'metraview'
      });
    };
  }));

  afterEach(function() {
     sinon.restore(subscriptionsServices.getSubscriptions);
     sinon.restore(subscriptionsServices.cancelSubscriptions);
     sinon.restore(utilityService.getLocaleDateFormatter);
     sandbox.restore();
     sandbox1.restore();
  });

  it('subscriptionsController should be defined', function () {
    subscriptionsController = createController();
    expect(subscriptionsController).to.exist;
  });

  it('subscriptionsController should call initiateWidgetService', function () {
    subscriptionsController = createController();
    subscriptionsController.initiateWidgetService();
  });
  
  it('subscriptionsController should call setTabularView', function () {
    subscriptionsController = createController();
    subscriptionsController.setTabularView();
  });

  it('subscriptionsController should call selectEndDate', function () {
    subscriptionsController = createController();
    subscriptionsController.selectEndDate();
  });
  
  it('subscriptionsController should call getSubscriptionDetails', function () {
    subscriptionsController = createController();
    getSubscriptions.returnsPromise().resolves(subscriptionsResponse);
    subscriptionsController.getSubscriptionDetails(1, {});
  });

  it('subscriptionsController should call getSubscriptionDetails 409', function () {
    subscriptionsController = createController();
    getSubscriptions.returnsPromise().rejects({status: 409});
    subscriptionsController.getSubscriptionDetails(1, {});
  });

  it('subscriptionsController should call getSubscriptionDetails 404', function () {
    subscriptionsController = createController();
    getSubscriptions.returnsPromise().rejects({status: 404});
    subscriptionsController.getSubscriptionDetails(1, {});
  });

  it('subscriptionsController should call openStoreOverlay', function () {
    subscriptionsController = createController();
    subscriptionsController.openStoreOverlay();
  });

  it('subscriptionsController should call showOfferDetails', function () {
    subscriptionsController = createController();
    subscriptionsController.showOfferDetails();
  });

  it('subscriptionsController should call cancelOfferSubscription', function () {
    subscriptionsController = createController();
    subscriptionsController.cancelOfferSubscription();
  });

  it('subscriptionsController should call selectEffectiveStartDate', function () {
    subscriptionsController = createController();
    subscriptionsController.selectEffectiveStartDate();
  });

  it('subscriptionsController should call getOffersContentHeight', function () {
    subscriptionsController = createController();
    subscriptionsController.getOffersContentHeight();
  });
  it('should getMySubscriptions success', function () {
    subscriptionsController = createController();
    getResponseConfigJson.returnsPromise().resolves({data: {columns: { fields: ['name']}}});
    subscriptionsController.getMySubscriptions();
  });
  it('should getMySubscriptions success utility fail', function () {
    subscriptionsController = createController();
    getResponseConfigJson.returnsPromise().rejects({})
    subscriptionsController.getMySubscriptions();
  });

   it('subscriptionsController should call addSubscription', function () {
     subscriptionsController = createController();
     subscriptionsController.offerDate = {"0": "11/11/2011"}
     addSubscriptions.returnsPromise().resolves(addSubscriptionsRespone);
     subscriptionsController.addSubscription({"name": "keshab"}, 0);
   });

   it('subscriptionsController should call addSubscription fail', function () {
    subscriptionsController = createController();
    addSubscriptions.returnsPromise().rejects({status: 404});
    subscriptionsController.addSubscription({"name": "keshab"}, 0);
  });

   it('subscriptionsController should call filterOffers', function () {
     subscriptionsController = createController();
     subscriptionsController.filterOffers();
   });

   it('subscriptionsController should call showAddSubscription', function () {
     subscriptionsController = createController();
     subscriptionsController.showAddSubscription();
   });

   it('subscriptionsController should call closeOfferTooltip', function () {
     subscriptionsController = createController();
     subscriptionsController.closeOfferTooltip(1);
   });

   it('subscriptionsController should call showOfferTooltip', function () {
     subscriptionsController = createController();
     subscriptionsController.showOfferTooltip(1);
   });

   it('subscriptionsController should call getOfferImage', function () {
    subscriptionsController = createController();
    subscriptionsController.productOfferImages = {0: "offer.png"};
    subscriptionsController.getOfferImage(0);
  });

   it('subscriptionsController should call getOfferImage else', function () {
     subscriptionsController = createController();
     subscriptionsController.getOfferImage();
   });

   it('subscriptionsController should call openCancelSubscriptionDialog', function () {
     subscriptionsController = createController();
     subscriptionsController.openCancelSubscriptionDialog(1, true);
   });

   it('subscriptionsController should call closeSubscriptionViewAll', function () {
     subscriptionsController = createController();
     subscriptionsController.closeSubscriptionViewAll();
   });

   it('subscriptionsController should call showCloseButton', function () {
     subscriptionsController = createController();
     subscriptionsController.showCloseButton();
   });

   it('subscriptionsController should call closeCancelSubscription', function () {
     subscriptionsController = createController();
     subscriptionsController.closeCancelSubscription(1);
   });

   it('subscriptionsController should call subErrorMessage', function () {
     subscriptionsController = createController();
     subscriptionsController.subErrorMessage();
   });

   it('subscriptionsController should call closeSubscriptionViewAll', function () {
     subscriptionsController = createController();
     subscriptionsController.closeSubscriptionViewAll();
   });

   it('subscriptionsController should call closeError', function () {
     subscriptionsController = createController();
     subscriptionsController.closeError();
   });

   it('subscriptionsController should call setGridOptions', function () {
     subscriptionsController = createController();
     subscriptionsController.setGridOptions();
   });

   it('should resolve cancelSubscriptions', function () {
     getSubscriptions.returnsPromise().resolves(subscriptionsResponse);
     cancelSubscriptions.returnsPromise().resolves({});
     subscriptionsController = createController();
     subscriptionsController.submitCancelSubscription({
       startDate: '22-12-1980',
       endDate: '31-12-1990'
     }, '2');
   });

   it('should resolve cancelSubscriptions to undefined', function () {
     getSubscriptions.returnsPromise().resolves(subscriptionsResponse);
     cancelSubscriptions.returnsPromise().resolves(undefined);
     subscriptionsController = createController();
     subscriptionsController.submitCancelSubscription({
       startDate: '22-12-1980',
       endDate: '31-12-1990'
     }, '2');
   });

   it('should reject cancelSubscriptions with status 304', function () {
     getSubscriptions.returnsPromise().resolves(subscriptionsResponse);
     cancelSubscriptions.returnsPromise().rejects({
       status: 304
     });
     subscriptionsController = createController();
     subscriptionsController.submitCancelSubscription({
       startDate: '22-12-1980',
       endDate: '31-12-1990'
     }, '2');
   });

   it('should reject cancelSubscriptions with status 400', function () {
     getSubscriptions.returnsPromise().resolves(subscriptionsResponse);
     cancelSubscriptions.returnsPromise().rejects({
       status: 400
     });
     subscriptionsController = createController();
     subscriptionsController.submitCancelSubscription({
       startDate: '22-12-1980',
       endDate: '31-12-1990'
     }, '2');
   });

   it('subscriptionsController should call showCardView', function () {
     subscriptionsController = createController();
     subscriptionsController.showCardView();
   });

   it('subscriptionsController should call showTabularView', function () {
     subscriptionsController = createController();
     subscriptionsController.showTabularView();
   });

   it('subscriptionsController should call toggleTabularViewSettings', function () {
     subscriptionsController = createController();
     subscriptionsController.toggleTabularViewSettings();
   });

   it('subscriptionsController should call isSettings', function () {
     subscriptionsController = createController();
     subscriptionsController.isSettings();
   });

   it('subscriptionsController should call isExpandCardView', function () {
     subscriptionsController = createController();
     subscriptionsController.isExpandCardView();
   });

   it('subscriptionsController should call isExpandTabularView', function () {
     subscriptionsController = createController();
     subscriptionsController.isExpandTabularView();
   });

   it('subscriptionsController should call toggleHeaderSelection', function () {
     subscriptionsController = createController();
     subscriptionsController.toggleHeaderSelection('XYZ');
   });

   it('subscriptionsController should call toggleSelectAll', function () {
     subscriptionsController = createController();
     subscriptionsController.toggleSelectAll(1);
   });

   it('subscriptionsController should call isAllColumnDeselected', function () {
     subscriptionsController = createController();
     subscriptionsController.isAllColumnDeselected();
   });

   it('subscriptionsController should call getActiveViewStyle', function () {
     subscriptionsController = createController();
     subscriptionsController.getActiveViewStyle('card');
   });

    it('subscriptionsController should call checkCancelHover', function () {
      subscriptionsController = createController();
      subscriptionsController.checkCancelHover(true);
    });

    it('subscriptionsController should call isCheckboxSelection', function () {
      subscriptionsController = createController();
      subscriptionsController.isCheckboxSelection(1);
    });

    it('subscriptionsController should call getSettingsHeight', function () {
      subscriptionsController = createController();
      subscriptionsController.getSettingsHeight();
    });

    it('subscriptionsController should call getSortByColumn', function () {
      subscriptionsController = createController();
      subscriptionsController.getSortByColumn();
    });

    it('subscriptionsController should call getDateFormatByLang', function () {
      subscriptionsController = createController();
      subscriptionsController.getDateFormatByLang();
    });

    it('subscriptionsController should call showLocalizedDateFormat', function () {
      subscriptionsController = createController();
      subscriptionsController.showLocalizedDateFormat();
    });

    it('subscriptionsController should call showMidLine', function () {
      subscriptionsController = createController();
      subscriptionsController.showMidLine();
    });

    it('subscriptionsController should call formatDateString', function () {
      subscriptionsController = createController();
      subscriptionsController.formatDateString('12/01/1994', true);
    });

    it('subscriptionsController should call toggleSubscriptionCardState', function () {
      subscriptionsController = createController();
      subscriptionsController.toggleSubscriptionCardState();
    });

    it('subscriptionsController should call isCancelButton', function () {
      subscriptionsController = createController();
      subscriptionsController.isCancelButton(1);
    });

    it('subscriptionsController should call isCallCancelButton', function () {
      subscriptionsController = createController();
      subscriptionsController.isCallCancelButton(1);
    });

    it('subscriptionsController should call isContactCustomerCancelButton', function () {
      subscriptionsController = createController();
      subscriptionsController.isContactCustomerCancelButton(1);
    });

    it('subscriptionsController should call subscriptionHeaderKey', function () {
      subscriptionsController = createController();
      subscriptionsController.subscriptionHeaderKey();
    });

    it('subscriptionsController should call getMyEligibleOffers success', function () {
      subscriptionsController = createController();
      getEligibleOffers.returnsPromise().resolves(eligibleOffersRespone.EligibleOffers);
      subscriptionsController.getMyEligibleOffers();
    });

    it('subscriptionsController should call getMyEligibleOffers fail', function () {
      subscriptionsController = createController();
      getEligibleOffers.returnsPromise().rejects({});
      subscriptionsController.getMyEligibleOffers();
    });
    it('should getOfferImageFile success', function () {
      subscriptionsController = createController();
      getOffersImageFile.returnsPromise().resolves({data: {columns: { fields: ['name']}}});
      subscriptionsController.getOfferImageFile();
    });
    it('should getOfferImageFile fail', function () {
      subscriptionsController = createController();
      getOffersImageFile.returnsPromise().rejects({})
      subscriptionsController.getOfferImageFile();
    });
    it('subscriptionsController should call subscriptionHeaderKey', function () {
      subscriptionsController = createController();
      subscriptionsController.displayableSubscriptions  = [{"name": "keshab"}];
      subscriptionsController.getSubscriptionColumnDefinition();
    });
    it('paymentMethodsController should call unFreezeColumnsList method', function () {
      paymentMethodsController = createController();
      paymentMethodsController.freezeColumns = ["payer"];
      paymentMethodsController.unFreezeColumnsList (["name", "amount"]);
    });
    it('paymentMethodsController should call toggleFreezingColumns header subscriptionName', function () {
      paymentMethodsController = createController();
      paymentMethodsController.toggleFreezingColumns('subscriptionName', ["name"]);
    });
    it('paymentMethodsController should call toggleFreezingColumns other headers', function () {
      paymentMethodsController = createController();
      paymentMethodsController.freezeColumnsTemp = ["name"]
     paymentMethodsController.toggleFreezingColumns('name', null);
    });
    it('paymentMethodsController should call toggleFreezingColumns column not freezed', function () {
      paymentMethodsController = createController();
      paymentMethodsController.freezeColumnsTemp = ["name"]
      paymentMethodsController.toggleFreezingColumns('payyname', null);
    });
});
