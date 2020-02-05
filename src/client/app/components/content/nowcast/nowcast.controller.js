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
        .controller('nowCastController', Controller);

    Controller.$inject = [
        '$scope',
        '$rootScope',
        'logger',
        '$filter',
        'nowCastService',
        'utilityService',
        '$window',
        'translatorHelper'
    ];

    /* @ngInject */
    function Controller($scope, $rootScope, logger, $filter, nowCastService, utilityService, $window, translatorHelper) {
        /* jshint validthis: true */
        var vm = this,
            filterInterval,
            COMPONENT_NAME = 'nowcast';
        vm.data;
        vm.decisionData;
        vm.nowCastCardState = 'collapsed';
        vm.nowCastClose = false;
        vm.widgetOpen = false;
        vm.limitDecisions = 2;
        var unregisterNowcastEvents = [];
        vm.noDecisionsFound = $filter('translate')('TEXT_NO_DECISIONS_FOUND');
        vm.showViewAllLink = false;

        $scope.$watch('accountId', function(acctId){
          if (!acctId)return;
          vm.accountId = acctId;
          activate();
        });

        function activate() {
            filterInterval = $scope.$on('show_filter_intervals', function(event, idInterval, data) {
                var cardState = utilityService.cardState;
                if((cardState.expand == vm.widgetOpen) || (cardState.expand != vm.widgetOpen && cardState.widget == COMPONENT_NAME)) {
                    vm.initiateWidgetService();
                }
            });
            vm.initiateWidgetService();
            unregisterNowcastEvents.push(filterInterval);
            var i18n = translatorHelper.loadFromStorage();
            vm.layoutLeftDirection = 'left';
            vm.layoutRightDirection = 'right';
            if(i18n.languageDirection == 'RTL') {
               vm.layoutLeftDirection = 'right';
               vm.layoutRightDirection = 'left';
            }
        }

        angular.element($window).on('resize', function () {
            if(vm.widgetOpen){
              vm.getViewAllBodyHeight();
            }
        });

        vm.getViewAllBodyHeight = function() {
          angular.element(".ecb-nowcastBody").ready(function() {
            return utilityService.manageViewAllBodyHeight("ecb-nowcast", "ecb-nowcastBody");
          });
        }

        vm.initiateWidgetService = function() {
            getData();
        }

        function getData() {
          vm.loading = true;
            vm.intervalId = utilityService.getOrSetSelectedTimeInterVal().idInterval;
            nowCastService.loadNowCast(vm.accountId, vm.intervalId, vm.limitDecisions)
                .then(function (data) {
                    logger.log('app.nowcast.Controller.activate() - returned from nowCastService');
                    if (data) {
                        logger.log('app.nowcast.Controller.activate() - decision data found');
                        vm.data = data;
                        if (vm.nowCastCardState === 'expanded'){
                            vm.decisionData = data;
                        } else {
                            vm.decisionData = data.slice(0, data.length >= vm.limitDecisions ? vm.limitDecisions : data.length);
                            if(vm.data.length > 0) {
                                vm.showViewAllLink = true;
                            }
                        }
                        //console.log(JSON.stringify(data));
                    } else {
                        logger.log('app.nowcast.Controller.activate() - decision data NOT found');
                    }
                    return vm.decisionData;
                })
                .catch(function (error) {
                    logger.log('app.nowcast.Controller.activate(): Error!', {
                        error: error
                    });
                    vm.decisionData = null;
                    vm.data = null;
                }).finally(function(){
                  vm.loading = false;
                });
        }

        vm.widgetOpen = false;
        vm.toggleNowCastCardState = function() {
            vm.nowCastCardState = 'expanded';
            vm.nowCastClose = true;
            vm.showViewAllLink = false;
            vm.widgetOpen = true;
            vm.limitDecisions = vm.decisionData.length;
            vm.decisionData = vm.data;
            $('#nowcast-body').css("overflow-y", "scroll");
            $scope.$emit('expanded', vm.nowCastCardState, COMPONENT_NAME);
            return vm.nowCastCardState;
        };

        vm.closeNowCastViewAll = function() {
            vm.nowCastCardState = 'collapsed';
            vm.nowCastClose = false;
            vm.limitDecisions = 2;
            vm.showViewAllLink = true;
            vm.decisionData = vm.data.slice(0, vm.data.length >= vm.limitDecisions? vm.limitDecisions : vm.data.length);
            $('#nowcast-body').css("overflow-y", "hidden");
            $scope.$emit('expanded', vm.nowCastCardState, COMPONENT_NAME);
            vm.widgetOpen = false;
            vm.limitDecisions = 2;
        };

        $scope.$on('$destroy', function () {
            utilityService.cleanUpListners(unregisterNowcastEvents);
        });
    }
})();
