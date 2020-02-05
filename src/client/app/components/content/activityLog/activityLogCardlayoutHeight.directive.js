(function() {
  'use strict';

  angular
    .module('app.activityLog')
    .directive('ecbActivityCardlayoutHeight', ActivityCardLayoutDirective);

  function ActivityCardLayoutDirective(){
    var directive = {     
      restrict: 'A',
      link : function(scope, ele, attrs){
        var height = 150;
        scope.$watch('activityCardLayoutChanged', function (val) {
          setTimeout(function(){
            var index = ele.attr("cardindex");
            if(index == scope.activityCardlayoutIndex){
              var toggle = ele.attr("toggle");
              var secondChild = ele.find("div:last-child");
              var arrowHeight = secondChild.innerHeight();
              var eleHeight = ele.find("section").height();
              var firstChild = ele.find("div:first-child");
              var eventStatusCls = ele.attr("eventStatus");
              if(toggle == 0){
                var extraHeight = 0;
                if(eleHeight <= height) {
                    extraHeight = height;
                } else {
                  extraHeight = eleHeight + 12;
                }
                firstChild.css({"height" : extraHeight +"px"});
                /*Avoid white space issue : here adding to height 4 for border*/
                ele.parent().css("z-index", 1);
                ele.css("height", (height + 3)+"px").removeClass(eventStatusCls);
                firstChild.addClass("ecb-expandActivityContent").addClass(eventStatusCls);
                secondChild.addClass("ecb-expandActivityBoxHandler").addClass(eventStatusCls);
                /**end**/

                ele.attr("toggle", 1);
              }else{                
                firstChild.css({"height" : (height - arrowHeight) +"px"});
                /*Avoid white space issue */
                ele.parent().css("z-index", '');
                ele.css("height", "auto").addClass(eventStatusCls);
                firstChild.removeClass("ecb-expandActivityContent").removeClass(eventStatusCls);
                secondChild.removeClass("ecb-expandActivityBoxHandler").removeClass(eventStatusCls);
                /**end**/
                ele.attr("toggle", 0);
              }
            }
          }, 700);          
        });
      }
    };
    return directive;
  }
})();
