(function() {
  'use strict';

  angular
    .module('app.asideModal')
    .directive('ecbAsideModal',['$window', Directive ]);

  function Directive($window) {
    var directive = {      
      restrict: 'A',      
      link : function(scope, ele, attrs) {
        angular.element(ele).ready(function() {
          resizeModal(ele, $window);
        });        
        angular.element($window).bind('resize', function(){
          resizeModal(ele, $window);
        });
      }
    };
    return directive;
  }

  function resizeModal(ele, $window){
    if(ele){
      var eleHeight = ele.height();
      if(eleHeight > 0){
        var windowHeight = angular.element($window).height();
        var top = $(".ecb-aside-modal .modal-dialog").css("top");
        top = !top ? 0 : parseInt(top.split("px")[0]);
        var modalHeder = ele.find(".modal-header").outerHeight();
        var modalBody = ele.find(".modal-body").height();
        var modalEtraHeight = ele.find(".modal-body").outerHeight() - modalBody;
        var modalFooter = ele.find(".modal-footer").outerHeight();
        var contentHeight = (windowHeight - (top+modalHeder+( !modalFooter ? 0 : modalFooter )));
        ele.find(".modal-body").css({"overflow-y" : "auto", "overflow-x" : "hidden",
         "height" : ((contentHeight - modalEtraHeight) + 20 )+"px"});
      }
    }
  }
})();
