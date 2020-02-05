(function() {
  'use strict';

  angular
    .module('app.layout')
    .directive('ecbSystemBar', Directive);

  /* @ngInject */
  function Directive() {
    var directive = {
      bindToController: true,
      controller: 'systemBarController',
      controllerAs: 'vm',
      restrict: 'EA',
      scope: {
        firstName: '@',
        lastName: '@',
        accountId: '@'
      },
      templateUrl: 'app/layout/system-bar.html',
      link: function(scope, ele, attr) {
        var body = angular.element('body');
        body.on('click', function(e) {
          if ($(e.target).is('i')) {} else if (((($(e.target).is('button') || $(e.target).is('a')) &&
                $(e.target.closest('.nav-collapse')).hasClass('in')) ||
              !$(e.target).is('span')
            )) {
            $('.nav-collapse').removeClass('in');
          }
        });
        ele.on('$destroy', function() {
          scope.$destroy();
        });
      }
    };
    return directive;
  }
})();
