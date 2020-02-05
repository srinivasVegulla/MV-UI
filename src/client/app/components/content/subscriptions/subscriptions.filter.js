(function() {
  'use strict';
  angular
    .module('app.subscriptions')
    .filter('showEllipse', Filter);

  Filter.$inject = [];
  
  function Filter() {
    return function(value) {
      if(value != undefined && value != null) {
		    var descriptionText = value;
		    if(descriptionText.length > 133) {
          descriptionText = descriptionText.substring(0, 133) + '...';
		    }
		    return descriptionText;
      } else {
    	   return '';
      }    		
    }
  }

}());
