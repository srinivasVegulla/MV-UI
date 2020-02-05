/**
 * COPYRIGHT (c) Ericsson AB 2016. The copyright to the computer program(s) herein is the property
 * of Ericsson Inc. The programs may be used and/or copied only with written permission from
 * Ericsson Inc. or in accordance with the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */
(function() {
    'use strict';

    angular
        .module('app.infinite-scroller')
        .directive('ecbInfiniteScroller', ScrollerPaginatorDirective)
        .directive( 'transcope', function($compile) {
            return {
                restrict: 'A',
                link: function( $scope, $element, $attrs, controller, $transclude ) {
                    if ( !$transclude ) {
                        throw minErr( 'ngTransclude' )( 'orphan',
                                'Illegal use of transcope directive in the template! ' +
                                'No parent directive that requires a transclusion found. ' +
                                'Element: {0}',
                            startingTag( $element ));
                    }
                    var parentScope = $scope.$new();


                    $transclude($scope, function( clone ) {
//                    $transclude(parentScope, function( clone, transcludedScope ) {
//                        if(innerScope.itemsPerCard === undefined){
//                            console.log('itemsPerCard undefined');
//                        } else {
//                            console.log('itemsPerCard: ' + innerScope.itemsPerCard);
//                        }
//                        if (parentScope === innerScope){
//                            console.log('innerScope is parentScope');
//                        }
                        //parentScope = angular.extend(parentScope, innerScope);
                        $element.empty();
                        //$element.append( $compile(clone)(transcludedScope) );
                        $element.append( clone );
//                        $element.on( '$destroy', function() {
//                            transcludedScope.$destroy();
//                        });
                    });
                }
            };
    });

    ScrollerPaginatorDirective.$inject = [
        '$window',
        'logger',
        '$parse',
    ];

    /* @ngInject */
    function ScrollerPaginatorDirective($window, logger, $parse) {
        var getTemplate = function(customContent){
            var template = '<div class="ecb-scroller" ng-style="vms.getContentHeight()" style=" min-height: 100%;">' +
                           '<div viewport id="scrollViewPort" style="max-height: 100%; min-height: 100%; z-index: 200;">' +
                              '<div ng-if="!vms.paginationInProgress"><div  ng-repeat="item in dataBuffer track by item.scrollindex" index={{item.scrollindex}} scrollindex={{item.scrollindex}} '+ customContent + ' transcope>' +
                              '</div></div>' +
                              '<div ng-if="vms.paginationInProgress" class="ecbRelativeClass">' +
                                '<div class="ebLoader"><div class="ebLoader-Holder"><span class="ebLoader-Dots ebLoader-Dots_color_paleBlue"></span></div></div>' +
                              '</div>' +
                           '</div>' +
                         '</div>'
            return template;
        };

        var directive = {
            restrict: 'A',
            //templateUrl: 'app/components/content/infinite-scroller/infinite-scroll.html',
            template: function(element, attr) {
                return getTemplate(attr.customAttributes);
            },
            controller: 'infiniteScrollController',
            controllerAs: 'vms',
            transclude: true,
            scope: true,
//            bindToController: true,
//            scope: {
//                scrollGetMoreFn: '&',
//                scrollItemActionFn: '&',
//                localizeContentFn: '&',
//                scrollBufferSize: '@scrollBufferSize',
//                customAttributes: '@customAttributes'
//            },
//             link: function ($scope, $element, $attrs, control, transclude) {

//                scope.get({index: 0, count: 20});
//                angular.element(document).ready(function() {
//
//                });
//                transclude(scope, function(clone, transScope) {
//                    transScope.item = scope.item;
//                    element.append('<span>Hello World!</span>');
////                    element.append(clone);
////
//                });
//                console.log('linker...')
//                console.log('Attr customAttributes: ' + attrs.customAttributes);
//                element.html(getTemplate(attrs.customAttributes)).show();
//                $compile(element.contents())(scope);
//            }
        };

        return directive;
    }
})();