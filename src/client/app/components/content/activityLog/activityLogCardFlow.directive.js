(function() {
  'use strict';

  angular
    .module('app.activityLog')
    .directive('ecbActivityCardOverflow', ActivityLogCardHeightDirective);
  
  function ActivityLogCardHeightDirective(){
    var defaultHeight = 150;
    var directive = {
      restrict: 'A',
      link : function(scope, ele, attrs){
        scope.$watch('activityLoad', function (val) {
          var toggle = ele.attr("toggle");
          if(toggle != 1){
            var tableHeight = ele.find("section").height();
            if(tableHeight > defaultHeight){
              ele.find("div:last-child").show();
              ele.find("div:first-child").height(defaultHeight - ele.find("div:last-child").innerHeight());
            }else{
              ele.find("div:last-child").hide();
              ele.find("div:first-child").height(defaultHeight);
            }
          }
          //Change color code after box loading
          setTimeout(function(){
            ele.removeClass("success-ecbActivityBox").removeClass("error-ecbActivityBox");
            if(ele.attr("isfailure") == "false")
              ele.addClass("success-ecbActivityBox").attr("eventStatus", "success-ecbActivityBox");
            else
              ele.addClass("error-ecbActivityBox").attr("eventStatus", "error-ecbActivityBox");
          }, 300);
        });
      }
    };
    return directive;
  }
})();
