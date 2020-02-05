(function() {
  'use strict';

  angular
    .module('app.billAdjustmentPopup')
    .directive('ecbBilladjustmentPopup', Directive)
    .directive('ecbCardLayoutsHeight', cardLayoutDirective);

  function Directive() {
    var directive = {
      bindToController: true,
      restrict: 'EA',
      templateUrl: 'app/components/content/billAdjustmentPopup/billAdjustmentPopup.html',
      controller: 'billAdjustmentPopupController',
      controllerAs: 'bm',
      scope: {
        accountId: '@'
      }
    };
    return directive;
  }

  function cardLayoutDirective() {
    var noOfCard = 2;
    var expandedCards = 0;
    var expandClass = "ecb-cardLayoutExpand";
    var directive = {
      restrict: 'A',
      link : function(scope, ele, attrs) {
        var boxHeight = 110;
        // 8px for box-shadow. To be update once box-shadow css updated.
        var bottomArrowHeight = (ele.find(".ecb-cardDetailHandlerCollapse").outerHeight() - 8);
        scope.$watch('cardLayoutChanged', function (val) {
          setTimeout(function() {
            var index = ele.attr("index");
            if(index == scope.cardLayoutIndex) {
              boxHeight = ele.find(".ecb-cardLayoutBox").outerHeight() + 10;
              var eleHeight = ele.find(".ecb-cardLayoutBottomBox").height();
              if(!ele.hasClass(expandClass)) {
                ele.addClass(expandClass).css({"height" : boxHeight, "z-index" : 1});
                ele.find(".ecb-cardLayoutBottomBox").show().addBack().find(".ecb-cardDetailHandlerCollapse").show().addBack()
                .find(".ecb-cardDetailHandlerExpand").hide();
                var cardHeightCount = parseInt(eleHeight / boxHeight);
                cardHeightCount = (eleHeight % boxHeight == 0) ? cardHeightCount : cardHeightCount + 1;
                var height = (boxHeight * (cardHeightCount > noOfCard ? noOfCard : cardHeightCount)) - bottomArrowHeight;
                ele.find(".ecb-cardLayoutBottomBox").height(height);
              } else {
                ele.find(".ecb-cardLayoutBottomBox").hide().addBack().find(".ecb-cardDetailHandlerCollapse").hide().addBack()
                .find(".ecb-cardDetailHandlerExpand").show();
                ele.removeClass(expandClass).css({"height" : '', "z-index" : ''});
              }
            }
            var exapndedCardLength = angular.element("."+expandClass).length;
            if(index == 0) expandedCards = 0;
            if(ele.hasClass(expandClass)){
              ele.css({"z-index" : ((exapndedCardLength + 10) - expandedCards)})
              expandedCards = expandedCards + 1;
            }
          }, 700);
        });
      }
    };
    return directive;
  }
})();
