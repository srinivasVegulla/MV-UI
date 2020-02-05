/**
 * COPYRIGHT (c) Ericsson AB 2016. The copyright to the computer program(s) herein is the property
 * of Ericsson Inc. The programs may be used and/or copied only with written permission from
 * Ericsson Inc. or in accordance with the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */
(function() {
    'use strict';

    angular
        .module('app.nowcast')
        .directive('ecbNowCast', NowCastDirective);

    NowCastDirective.$inject = [
        '$window',
        'logger'
    ];

    /* @ngInject */
    function NowCastDirective($window, logger) {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/content/nowcast/nowcast.html',
            controller: 'nowCastController',
            controllerAs: 'vm',
            scope: {
              configGetterFn: '&'
            },
            link: function (scope, element) {
              scope.accountId = scope.configGetterFn({widgetName: 'ecbNowCast', attributeName: 'accountId'});
              angular.element(document).ready(function() {
                var d3 = $window.d3;
                var chart = d3.chart.bullet();

                scope.$watch("vm.decisionData", function(data) {
                  if (typeof (data) === 'undefined') {
                      return;
                  }
                  d3.chart.updateChart(scope.vm.decisionData, scope.vm.noDecisionsFound, scope.vm.intervalId);
                });
              });
              element.on('$destroy', function() {
                scope.$destroy();
              });
            }
        };

        return directive;
    }
})();