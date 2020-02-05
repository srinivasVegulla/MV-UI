/* jslint maxlen: 250 */
//jscs:disable maximumLineLength
(function() {
  'use strict';

  angular
    .module('app.viewSelector')
    .controller('viewSelectorController', Controller);

  Controller.$inject = [
    'logger',
    '$rootScope',
    '$filter',
    'userService'
  ];
  /* @ngInject */
  function Controller(logger, $rootScope, $filter, userService) {
    var xm = this,
      dashboard, bills, offerStore, myAccount;
    xm.layoutManagerSettings = {};
    xm.selectView = selectView;
    /* TODO - Currently Navigation flow UX is in discussion, after the final outcome, we can either activate or consider
    this code a dead and remove view-selector.html.*/
    xm.navigationBar = false;

    activate();

    function activate() {

      userService.layoutManagerSettings().then(function(response) {
        xm.layoutManagerSettings = angular.copy(response);
        if (xm.layoutManagerSettings === undefined || xm.layoutManagerSettings.views === undefined){
          logger.log('ERROR: ****************************************************');
          logger.log('ERROR: selectViewsController layoutManager settings missing');
          logger.log('ERROR: ****************************************************');
          return;
        }

        xm.data = {
          availableOptions: []
        };
        for(var i = 0; i < xm.layoutManagerSettings.views.length; i++){
          xm.layoutManagerSettings.views[i].displayName = $filter('translate')(xm.layoutManagerSettings.views[i].localeResourceKey);
          var view = {};
          view.id = xm.layoutManagerSettings.views[i].name;
          view.name = xm.layoutManagerSettings.views[i].displayName;
          view.isDefaultView = xm.layoutManagerSettings.views[i].defaultView || false;
          xm.data.availableOptions.push(view);
        }
        xm.data.selectedOption = xm.data.availableOptions[0];
        $rootScope.$emit("navigationLinksChanged", xm.data.availableOptions);
        xm.selectView(xm.data.selectedOption.id);
      });
    }

    $rootScope.$on('callSelectedPage', function(event, viewId) {
       selectView(viewId);
    });

    function selectView(viewId) {
      if (xm.layoutManagerSettings.views === undefined || xm.layoutManagerSettings.views.length == 0){
        logger.log('ERROR: ****************************************************');
        logger.log('ERROR: selectViewsController layoutManager settings missing');
        logger.log('ERROR: ****************************************************');
        return;
      }
      var isMatchingViewFound = false;
      for(var i = 0; i < xm.layoutManagerSettings.views.length; i++){
        if (xm.layoutManagerSettings.views[i].name === viewId){
          $rootScope.$broadcast('selectedViewFromDropdown', xm.layoutManagerSettings.views[i]);
          isMatchingViewFound = true;
          break;
        }
      }

      if (!isMatchingViewFound) {
        $rootScope.$broadcast('selectedViewFromDropdown', xm.layoutManagerSettings.views[0]);
      }
    }
  }
}());
