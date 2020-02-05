(function() {
  'use strict';

  angular
    .module('app.viewSelector')
    .directive('ecbViewSelector', Directive);

  function Directive() {
    var directive = {
      bindToController: true,
      restrict: 'EA',
      templateUrl: 'app/layout/view-selector/view-selector.html',
      controller: 'viewSelectorController',
      controllerAs: 'xm'
    };
    return directive;
  }
})();
