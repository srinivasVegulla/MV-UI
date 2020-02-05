(function() {
  'use strict';
  angular
    .module('app.utility')
    .filter('showEllipsis', Filter)
    .directive('ecbEllipsis', ecbEllipsis);
  Filter.$inject = ['$window'];
  
  function Filter() {
    return function(value, maxCharCount) {
      if(value != undefined && value != null) {
		    var descriptionText = value;
		    if(descriptionText.length > maxCharCount) {
          descriptionText = descriptionText.substring(0, maxCharCount-3) + '...';
		    }
		    return descriptionText;
      } else {
    	   return '';
      }    		
    }
  }

  function ecbEllipsis($window) {
    var directive = {
      restrict: 'A',
      link : function(scope, ele, attrs) {
        function checkEllipsis() {
          var isIE = (navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true);
          setTimeout(function() {
            ele.find('table tr td').each(function(i) {
              var element = $(this)
                              .clone()
                              .css({display: 'inline', width: 'auto', visibility: 'hidden'})
                              .appendTo('body');
              if( element.width() > $(this).width() ) {
                var text = $(this).text();
                $(this).css({'overflow': 'hidden', 'text-overflow': 'ellipsis'}).attr({'title': text});
                if(isIE) {
                  $(this).attr('alt', text);
                }
              }else {
                $(this).removeAttr( "title" )
                if(isIE) $(this).removeAttr( "alt" )
              }
              element.remove();
          });
          }, 700);
        }
        checkEllipsis();
        angular.element($window).on('resize', function () {
          checkEllipsis();
        });
      }
    };
    return directive;
  }
}());
