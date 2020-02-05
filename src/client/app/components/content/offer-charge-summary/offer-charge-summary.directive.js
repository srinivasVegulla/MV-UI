(function() {
  'use strict';

  angular
    .module('app.offer-charge-summary')
    .directive('ecbOfferChargeSummary', Directive)
    .directive('ecbcardLayoutHeight', cardLayoutDirective)
    .filter('trustHtml', trustHtml);

  function Directive() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/components/content/offer-charge-summary/offer-charge-summary.html',
      controller: 'offerChargeSummaryController',
      controllerAs: 'vm',
      scope: {
        configGetterFn: '&'
      },
      link: function(scope, element, attributes) {
        scope.accountId = scope.configGetterFn({widgetName: 'ecbOfferChargeSummary', attributeName: 'accountId'});
        scope.chargeType = attributes.chargeType;
        attributes.$observe('selectSubCharge', function(value){
          scope.selectSubCharge = value;
        });
        element.on('$destroy', function() {
          scope.$destroy();
        });
      }
    };
    return directive;
  }

  function cardLayoutDirective() {
    var directive = {     
      restrict: 'A',
      link : function(scope, ele, attrs) {
        var height = 340;
        scope.$watch('cardLayoutChanged', function (val) {
          setTimeout(function() {
          var index = ele.attr("index");
            if(index == scope.cardLayoutIndex) {
              var toggle = ele.attr("toggle");
              var eleHeight = ele.height();
              if(toggle == 0) {
                var extraHeight = 0;
                if(eleHeight <= height) extraHeight = height - eleHeight;
                else{
                  extraHeight = (height - (eleHeight % height)) + (40 * parseInt(eleHeight / height));
                }
                ele.css({"height" : (eleHeight + extraHeight)+"px"});
                ele.attr("toggle", 1);
              } else {
                ele.css({"height" : height+"px"});
                ele.attr("toggle", 0);
              }
            }
          }, 700);
        });
      }
    };
    return directive;
  }
  function trustHtml($sce) {
    return function(html){
      return $sce.trustAsHtml(html)
    }
  }
})();
