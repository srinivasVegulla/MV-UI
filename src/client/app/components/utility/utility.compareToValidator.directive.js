(function() {
  'use strict';

    angular
      .module('app.utility')
      .directive('compareTo', Directive);

    Directive.$inject = [
      'logger'
    ];

    function Directive(logger){
    return {
      require: "ngModel",
      scope: {
        otherModelValue: "=compareTo"
      },
      link: function(scope, element, attributes, ngModel) {

        ngModel.$validators.compareTo = function(modelValue) {
          return (modelValue === scope.otherModelValue.$viewValue);
        };

        scope.$watch("otherModelValue", function() {
          ngModel.$validate();
        });
      }
    };
 }
})();
