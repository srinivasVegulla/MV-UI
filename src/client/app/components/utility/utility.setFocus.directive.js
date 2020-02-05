(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name ecb utility set focus directive
   * @description
   * # ecb utility set focus directive
   *
   * Set Focus directive.
   * 
   * usage: <any ecb-set-focus="{bool}"></any>
  */
  angular
    .module('app.utility')
    .directive('ecbSetFocus', Directive);
  
  Directive.$inject = [
    '$timeout',
    '$parse',
  ];

  /* @ngInject */
  function Directive($timeout, $parse) {
    var directive = {
      restrict: 'A',
      scope: true,
      link: function (scope, element, attrs) {
        var model = $parse(attrs.ecbSetFocus);
        scope.$watch(model, function (value) {
          if (value === true) { 
            $timeout(function() {
              element[0].focus(); 
            }, 500);
          }
        });
        //element.bind('blur', function () {
        //    scope.$apply(model.assign(scope, false));
        //});
      },
    };
    return directive;
  }
})();
