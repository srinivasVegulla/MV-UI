(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('layoutController', Controller);

  Controller.$inject = [
    '$scope',
    'userService',
    'logger'
  ];

  function Controller($scope, userService, logger) {
    var vm = this;
    vm.siteName = getSiteName;
    vm.faviconName = getFaviconName;
    vm.userSettings = userService.userSettings;

    function getSiteName() {
      var validSiteName = userService.getSiteName();
      if (!validSiteName) {
        validSiteName = 'default';
      }
      return validSiteName;
    }

    function getFaviconName() {
      return userService.getUserSettings()
        .then(function (result) {
          return result.settings.theme.faviconName;
        });
    }

    // Todo : themPath should be fetched from backend
//    $scope.$watch(function() {
//      return userService.getUserSettings();
//    }, function(siteInfo) {
//      // layout.themePath = constructThemePath(siteInfo.settings.site.physicalPath, siteInfo.settings.site.theme);
//      layout.themePath = '/static/'+siteInfo.namespace+'/theme.css';
//    }, true);

//   function constructThemePath(physicalPath, themeFileName) {
//     return physicalPath + '\\styles\\' + themeFileName + '.css';
//   }
  }
})();
