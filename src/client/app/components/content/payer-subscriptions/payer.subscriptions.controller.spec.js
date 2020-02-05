describe('payerSubscriptionsController', function() {
  var expect = chai.expect,
    payerSubscriptionsController,
    $rootScope,
    $controller,
    $scope,
    createController,
    mockInterval = mockData.account().interval,
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
    gridSettingsStorageData,
    document,
    localStorageService,
    payerSubscriptionsService,
    langData = mockData.localStorageData().i18n,
    siteSettingsResponse = mockData.localStorageData().settings,
    eligibleOffersRespone = mockData.subscriptions().getEligibleOffersData,
    addSubscriptionsRespone = mockData.subscriptions().addSubscriptions;

  beforeEach(function() {
    module('app.payer.subscriptions');
  });

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _$filter_,
    _$moment_,
    _dateFilter_,
    _$timeout_,
    _translatorHelper_,
    _$window_,
    _utilityService_,
    _$document_,
    _localStorageService_,
    _payerSubscriptionsService_) {

    $scope = _$rootScope_.$new();
    $controller = _$controller_;
    filter = _$filter_;
    moment  = _$moment_;
    dateFilter  = _dateFilter_;
    timeout  = _$timeout_;
    translatorHelper = _translatorHelper_;
    window = _$window_;
    utilityService = _utilityService_;
    document = _$document_;
    localStorageService = _localStorageService_;
    payerSubscriptionsService = _payerSubscriptionsService_;

   /*  cancelSubscriptions = sinon.stub(subscriptionsServices, 'cancelSubscriptions');

    getSubscriptions = sinon.stub(subscriptionsServices, 'getSubscriptions'); */
    getLocaleDateFormatter = sinon.stub(utilityService, 'getOrSetSelectedTimeInterVal');
    getLocaleDateFormatter = sinon.stub(utilityService, 'getLocaleDateFormatter');
    getPayeeSubscriptions = sinon.stub(payerSubscriptionsService, 'getPayeeSubscriptions');
    getResponseConfigJson = sinon.stub(utilityService, 'getResponseConfigJson');
    getOffersImageFile = sinon.stub(utilityService, 'getOffersImageFile');
    gridSettingsStorageData = sinon.stub(utilityService, 'gridSettingsStorageData');

    sandbox = sinon.sandbox.create();
    sandbox.stub(localStorageService, 'get', function () {
      return langData;
    });
    sandbox1 = sinon.sandbox.create();
    sandbox1.stub(utilityService, 'getNameSpace', function () {
      return siteSettingsResponse;
    });

    createController = function() {
      return $controller('payerSubscriptionsController', {
        '$scope': $scope,
         limit: 2,
         sortOrder: null,
         siteName: 'metraview'
      });
    };
  }));

  afterEach(function() {
     sinon.restore(utilityService.getOrSetSelectedTimeInterVal);
     sinon.restore(utilityService.getLocaleDateFormatter);
     sinon.restore(payerSubscriptionsService.getPayeeSubscriptions);
     sinon.restore(utilityService.getResponseConfigJson);
     sinon.restore(utilityService.getOffersImageFile);
     sinon.restore(payerSubscriptionsService.gridSettingsStorageData);
     sandbox.restore();
     sandbox1.restore();
  });

  it('payerSubscriptionsController should be defined', function () {
    payerSubscriptionsController = createController();
    expect(payerSubscriptionsController).to.exist;
  });

  it('payerSubscriptionsController should call initiateWidgetService', function () {
    payerSubscriptionsController = createController();
    payerSubscriptionsController.initiateWidgetService();
  });

   it('payerSubscriptionsController should call getAllPayeeSubscriptions', function () {
     payerSubscriptionsController = createController();
     payerSubscriptionsController.getAllPayeeSubscriptions(12345, 123);
   });

   it('payerSubscriptionsController should call toggleSubscriptionCardState', function () {
     payerSubscriptionsController = createController();
     payerSubscriptionsController.displayableSubscriptions = ["name"];
     payerSubscriptionsController.payeeSubscriptions = [{"name": "dummy"}, {"name": "dummy1"}];
     payerSubscriptionsController.toggleSubscriptionCardState();
   });

   it('payerSubscriptionsController should call closeSubscriptionViewAll', function () {
     payerSubscriptionsController = createController();
     payerSubscriptionsController.closeSubscriptionViewAll();
   });

   it('payerSubscriptionsController should call viewAllBodyHeight', function () {
     payerSubscriptionsController = createController();
     payerSubscriptionsController.viewAllBodyHeight();
   });

   it('payerSubscriptionsController should call getViewAllBodyHeight', function () {
     payerSubscriptionsController = createController();
     payerSubscriptionsController.getViewAllBodyHeight();
   });

   it('payerSubscriptionsController should call setGridOptions', function () {
     payerSubscriptionsController = createController();
     payerSubscriptionsController.setGridOptions();
   });

   it('payerSubscriptionsController should call applyCancelSettings', function () {
     payerSubscriptionsController = createController();
     payerSubscriptionsController.applyCancelSettings(true);
   });

   it('payerSubscriptionsController should call getSubscriptionColumnDefinition', function () {
     payerSubscriptionsController = createController();
     payerSubscriptionsController.getSubscriptionColumnDefinition();
   });

   it('payerSubscriptionsController should call subscriptionHeaderKey', function () {
     payerSubscriptionsController = createController();
     payerSubscriptionsController.subscriptionHeaderKey();
   });

   it('payerSubscriptionsController should call getActiveViewStyle', function () {
     payerSubscriptionsController = createController();
     payerSubscriptionsController.getActiveViewStyle();
   });

   it('payerSubscriptionsController should call setOrUpdateSubscriptionGridData', function () {
     payerSubscriptionsController = createController();
     payerSubscriptionsController.setOrUpdateSubscriptionGridData();
   });

   it('payerSubscriptionsController should call showCardView', function () {
     payerSubscriptionsController = createController();
     payerSubscriptionsController.showCardView(true);
   });

   it('payerSubscriptionsController should call showTabularView', function () {
     payerSubscriptionsController = createController();
     payerSubscriptionsController.showTabularView();
   });

   it('payerSubscriptionsController should call toggleTabularViewSettings', function () {
     payerSubscriptionsController = createController();
     payerSubscriptionsController.toggleTabularViewSettings();
   });

   it('payerSubscriptionsController should call isExpandCardView', function () {
     payerSubscriptionsController = createController();
     payerSubscriptionsController.isExpandCardView();
   });

   it('payerSubscriptionsController should call isExpandTabularView', function () {
     payerSubscriptionsController = createController();
     payerSubscriptionsController.isExpandTabularView();
   });

   it('payerSubscriptionsController should call isSettings', function () {
     payerSubscriptionsController = createController();
     payerSubscriptionsController.isSettings();
   });

   it('payerSubscriptionsController should call unFreezeColumnsList', function () {
     payerSubscriptionsController = createController();
     payerSubscriptionsController.unFreezeColumnsList(true);
   });

   it('payerSubscriptionsController should call showMidLine', function () {
     payerSubscriptionsController = createController();
     payerSubscriptionsController.freezeColumns = ["name"];
     payerSubscriptionsController.showMidLine(["name", "displayName"]);
   });

   it('payerSubscriptionsController should call toggleSelectAll', function () {
     payerSubscriptionsController = createController();
     payerSubscriptionsController.toggleSelectAll();
   });

   it('payerSubscriptionsController should call isAllColumnDeselected', function () {
     payerSubscriptionsController = createController();
     payerSubscriptionsController.checkboxSelectionTemp = ["name"];
     payerSubscriptionsController.freezeColumns = ['displayName'];
     payerSubscriptionsController.isAllColumnDeselected();
   });

   it('payerSubscriptionsController should call toggleHeaderSelection different hidder', function () {
     payerSubscriptionsController = createController();
     payerSubscriptionsController.checkboxSelectionTemp = ["name"];
     payerSubscriptionsController.toggleHeaderSelection("displayAmount");
   });
   it('payerSubscriptionsController should call toggleHeaderSelection same header', function () {
    payerSubscriptionsController = createController();
    payerSubscriptionsController.checkboxSelectionTemp = ["name"];
    payerSubscriptionsController.toggleHeaderSelection("name");
  });

   it('payerSubscriptionsController should call toggleFreezingColumns header displayname', function () {
     payerSubscriptionsController = createController();
     payerSubscriptionsController.toggleFreezingColumns('displayname', ["name"]);
   });
   it('payerSubscriptionsController should call toggleFreezingColumns other headers', function () {
    payerSubscriptionsController = createController();
    payerSubscriptionsController.freezeColumnsTemp = ["name"]
    payerSubscriptionsController.toggleFreezingColumns('name', null);
   });
   it('payerSubscriptionsController should call toggleFreezingColumns column not freezed', function () {
    payerSubscriptionsController = createController();
    payerSubscriptionsController.freezeColumnsTemp = ["name"]
    payerSubscriptionsController.toggleFreezingColumns('payyname', null);
   });

   it('payerSubscriptionsController should call getSortByColumn', function () {
     payerSubscriptionsController = createController();
     payerSubscriptionsController.getSortByColumn('key');
   });

   it('payerSubscriptionsController should call getOfferImage', function () {
     payerSubscriptionsController = createController();
     payerSubscriptionsController.productOfferImages = {0: "offer.png"};
     payerSubscriptionsController.getOfferImage(0);
   });
   it('payerSubscriptionsController should call getSubscriptionsJson success', function () {
    payerSubscriptionsController = createController();
    getResponseConfigJson.returnsPromise().resolves({data: {columns: { fields: ['name']}}});
    payerSubscriptionsController.getSubscriptionsJson("PayerSubcription");
  });
  it('payerSubscriptionsController should call getSubscriptionsJson rejects', function () {
    payerSubscriptionsController = createController();
    getResponseConfigJson.returnsPromise().rejects({});
    payerSubscriptionsController.getSubscriptionsJson("PayerSubcription");
  });
  it('payerSubscriptionsController should call getAllPayeeSubscriptions success', function () {
    payerSubscriptionsController = createController();
    payerSubscriptionsController.subscriptionsCount = null;
    getPayeeSubscriptions.returnsPromise().resolves([{"name": "dummy"}, {"name": "dummy1"}]);
    payerSubscriptionsController.getAllPayeeSubscriptions(12345, {"isColumnDataList": []});
  });
  it('payerSubscriptionsController should call getAllPayeeSubscriptions success', function () {
    payerSubscriptionsController = createController();
    payerSubscriptionsController.widgetOpen = true;
    payerSubscriptionsController.subscriptionsCount = 2;
    getPayeeSubscriptions.returnsPromise().resolves([{"name": "dummy"}, {"name": "dummy1"}]);
    payerSubscriptionsController.getAllPayeeSubscriptions(12345, null);
  });
  it('payerSubscriptionsController should call getAllPayeeSubscriptions rejects', function () {
    payerSubscriptionsController = createController();
    getPayeeSubscriptions.returnsPromise().rejects({status: 500})
    payerSubscriptionsController.getAllPayeeSubscriptions();
  });
  it('payerSubscriptionsController should call getAllPayeeSubscriptions rejects 400', function () {
    payerSubscriptionsController = createController();
    getPayeeSubscriptions.returnsPromise().rejects({status: 400})
    payerSubscriptionsController.getAllPayeeSubscriptions();
  });
  it('payerSubscriptionsController should call getAllPayeeSubscriptions rejects 412', function () {
    payerSubscriptionsController = createController();
    getPayeeSubscriptions.returnsPromise().rejects({status: 412})
    payerSubscriptionsController.getAllPayeeSubscriptions();
  });
  it('payerSubscriptionsController should call getAllPayeeSubscriptions rejects 403', function () {
    payerSubscriptionsController = createController();
    getPayeeSubscriptions.returnsPromise().rejects({status: 403})
    payerSubscriptionsController.getAllPayeeSubscriptions();
  });
  it('payerSubscriptionsController should call getAllPayeeSubscriptions rejects 405', function () {
    payerSubscriptionsController = createController();
    getPayeeSubscriptions.returnsPromise().rejects({status: 405})
    payerSubscriptionsController.getAllPayeeSubscriptions();
  });
  it('payerSubscriptionsController should call getAllPayeeSubscriptions rejects 404', function () {
    payerSubscriptionsController = createController();
    getPayeeSubscriptions.returnsPromise().rejects({status: 404})
    payerSubscriptionsController.getAllPayeeSubscriptions();
  });
  it('payerSubscriptionsController should call setOrUpdateSubscriptionGridData gridOptions false', function () {
    payerSubscriptionsController = createController();
    payerSubscriptionsController.gridOptions = null;
    payerSubscriptionsController.setOrUpdateSubscriptionGridData();
  });
  it('payerSubscriptionsController should call setOrUpdateSubscriptionGridData gridOptions true', function () {
    payerSubscriptionsController = createController();
    payerSubscriptionsController.gridOptions = {};
    payerSubscriptionsController.tabularGridApi = { core: { refresh: function(){}}};
    payerSubscriptionsController.setOrUpdateSubscriptionGridData();
  });
  it('payerSubscriptionsController should call unFreezeColumnsList', function () {
    payerSubscriptionsController = createController();
    payerSubscriptionsController.freezeColumns = ["payer"];
    payerSubscriptionsController.unFreezeColumnsList (["name", "amount"]);
  });
  it('payerSubscriptionsController should call setTabularView true', function () {
    payerSubscriptionsController = createController();
    payerSubscriptionsController.setTabularView(true);
  });
  it('payerSubscriptionsController should call setTabularView false', function () {
    payerSubscriptionsController = createController();
    payerSubscriptionsController.setTabularView(false);
  });
  it('payerSubscriptionsController should call getOfferImageFile success', function () {
    payerSubscriptionsController = createController();
    getOffersImageFile.returnsPromise().resolves({});
    payerSubscriptionsController.getOfferImageFile(false);
  });
  it('payerSubscriptionsController should call getOfferImageFile reject', function () {
    payerSubscriptionsController = createController();
    getOffersImageFile.returnsPromise().rejects({});
    payerSubscriptionsController.getOfferImageFile(false);
  });
  
});
