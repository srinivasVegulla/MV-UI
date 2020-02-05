/**
 * COPYRIGHT (c) Ericsson AB 2016. The copyright to the computer program(s) herein is the property
 * of Ericsson Inc. The programs may be used and/or copied only with written permission from
 * Ericsson Inc. or in accordance with the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */
(function() {
    'use strict';

    angular
        .module('app.infinite-scroller', [])
        .controller('infiniteScrollController', Controller);

    Controller.$inject = [
        '$scope',
        '$rootScope',
        '$attrs',
        '$log',
        '$filter',
        '$timeout',
        '$element',
        '$parse',
        '$window',
        '$document'
    ];

    /* @ngInject */
    function Controller($scope, $rootScope, $attrs, logger, $filter, $timeout, $element, $parse, $window, $document) {
        /* jshint validthis: true */
        var SCROLL_UP = 'up';
        var SCROLL_DOWN = 'down';
        var BUFFER_THRESHOLD = 60;
        var BUFFER_SIZE = 120;
//      const SCROLL_UP = 'up';
//      const SCROLL_DOWN = 'down';
//      const BUFFER_THRESHOLD = 60;
//      const BUFFER_SIZE = 120;
        $scope.visibleEventQueue = [];
        $scope.dataBuffer = [];

        var vms = this;
        var registeredScrollEvents = [];
        var scrollFilterInterval;
        var visibleEventQueueWatch;

        vms.paginationInProgress = false;
        vms.scrollPageSize = $attrs.scrollPageSize;
        vms.getMoreData = $parse($attrs.scrollGetMoreFn);
        vms.scrollItemActionFn = $attrs.scrollItemActionFn;
        vms.localizeContentFn = $attrs.localizeContentFn;
        vms.currentIndex = 0;
        vms.lastScrollTop = 0;
        vms.element = $element;
        vms.scrollDirection = SCROLL_DOWN;
        vms.getContentHeight =  getContentHeight;

        // Beginning of Buffer and End of Buffer flags.
        vms.BOB = true;
        vms.EOB = false;

        function activate() {
            //unregisterEvents.push(filterInterval);
            angular.element('#scrollViewPort').bind("scroll", function(evt) {
                setTimeout(function() {
                   vms.handleScrollEvent();
                }, 0);
                return false;
            });
            logger.debug('scrollPageSize: ' + vms.scrollPageSize);
            vms.datasource.get(0, BUFFER_THRESHOLD, SCROLL_DOWN);
        }


        /**
         * This watch keeps track of the elements changing visibility state and marks
         * each item in the corresponding model appropriately.  This information is utilized
         * in making determination if more data needs to be fetched.
         */
        visibleEventQueueWatch = $scope.$watch('visibleEventQueue', function () {
            try {
                var event = $scope.visibleEventQueue.shift();
                if (event) {
                    var eventTargetIndex = binarySearch(event.index, $scope.dataBuffer);
                    //logger.log('eventTargetIndex: ' + eventTargetIndex + ' event.index: ' + event.index + ' scrollindex: ' + $scope.dataBuffer[eventTargetIndex].scrollindex);
                    $scope.dataBuffer[eventTargetIndex].visible = event.isVisible;
                }
            } catch (err) {
                logger.error('ERROR in visibleEventQueue watch: ' + err);
            }

        }, true);

        function binarySearch(searchIndex, collection) {
            'use strict';
            var minIndex = 0;
            var maxIndex = collection.length - 1;
            var currentIndex;
            var currentElement;
            var ctr = 0;

            while (minIndex <= maxIndex) {
                ctr++;
                currentIndex = (minIndex + maxIndex) / 2 | 0;
                currentElement = collection[currentIndex];

                if (currentElement.scrollindex < searchIndex) {
                    minIndex = ++currentIndex;
                } else if (currentElement.scrollindex > searchIndex) {
                    maxIndex = --currentIndex;
                } else {
                    return currentIndex;
                }
            }
            return ~maxIndex;
        }

        if (vms.getMoreData === undefined){
            logger.error('*********************************************************************')
            logger.error('$scope.get function undefined in ecb-scroller element');
            logger.error('*********************************************************************')
        }

        /**
         * Updates infinite scroll buffer with new data page.  Takes different logic path based on
         * scroll direction.
         * @param data
         * @param scrollDirection
         */
        vms.updateDataBuffer = function(data, scrollDirection) {
            logger.debug('updateDataBuffer ----->');
            var updateDataBufferStart = getTimeDelta();
            if (data.length == 0) {
                vms.paginationInProgress = false;
                return;
            }

            if (scrollDirection === SCROLL_DOWN){
                $timeout(function() {
                    try{
                        /*
                         Set scrollIndex attribute on each data element.  This is used in
                         identifying client-provided elements during scrolling transition.
                         */
                        for (var i = 0; i < data.length; i++) {
                            data[i].scrollindex = vms.currentIndex++;
                        }
                        var scrollViewPort = $('#scrollViewPort');
                        //var displayIndex = getCurrentDisplayIndex(scrollDirection);
                        if ($scope.dataBuffer.length >= BUFFER_SIZE) {
                            $scope.dataBuffer.splice(0, data.length);
                            var displayIndex = getCurrentDisplayIndex(scrollDirection);
                            logger.debug('updateDataBuffer - dataBuffer.length after splice: ' + $scope.dataBuffer.length);
                            var applyStart = getTimeDelta();
                            $scope.$apply();
                            logger.debug('updateDataBuffer - after apply '  + getTimeDelta(applyStart));
                            if (displayIndex >= 0) {
                                //scrollToView(displayIndex);
                            }
                        }
                        try {
                            Array.prototype.push.apply($scope.dataBuffer, data);
                        } catch (err){
                            logger.error('ERROR pushing to dataBuffer ' + err);
                        }
                    } catch (ERR) {
                        logger.error('updataBuffer error: ' + ERR);
                    } finally {
                        vms.paginationInProgress = false;
                        //logger.debug('dataBuffer.length after concatenate: ' + $scope.dataBuffer.length);
                        logger.debug('updateDataBuffer <----- ' + getTimeDelta(updateDataBufferStart) );
                    }
                }, 0);

            } else {
                $timeout(function() {
                    try {
                        /*
                         Set scrollIndex attribute on each data element.  This is used in
                         identifying client-provided elements during scrolling transition.
                         */
                        var initialIndex = $scope.dataBuffer[0].scrollindex - 1;
                        for (var i = (data.length - 1); i >= 0; i--) {
                            data[i].scrollindex = initialIndex--;
                        }

                        if (vms.currentIndex > 0) {
                            //var displayIndex = getCurrentDisplayIndex();
                            //Array.prototype.push.apply(data, $scope.dataBuffer);
                            Array.prototype.unshift.apply($scope.dataBuffer, data);
                            if ($scope.dataBuffer.length >= BUFFER_SIZE) {
                                vms.currentIndex -= data.length;
                                $scope.dataBuffer.splice(-vms.scrollPageSize, vms.scrollPageSize);
                            }
                            $scope.$apply();
//                            if (displayIndex > 0) {
//                                logger.log('displayIndex > 0 calling scrollToView()...');
//                                scrollToView(displayIndex);
//                            } else {
//                                logger.log('displayIndex <= 0 NOT calling scrollToView()...');
//                            }

                            if (vms.currentIndex < 0) {
                                vms.currentIndex = 0;
                            }
                        }
                    } catch (ERR) {
                        logger.log('updataBuffer error: ' + ERR);
                    } finally {
                        vms.paginationInProgress = false;
                        logger.debug('updateDataBuffer <----- ' + getTimeDelta(updateDataBufferStart) );
                    }

                }, 0);
            }


        }

         /**
         * Scrolls item marked with displayIndex into view within scrollViewport container.
         * This is useful when updating underlying data buffer while scrolling is in progress.
         * @param displayIndex
         */
        function scrollToView(displayIndex){
            var scrollContainer = $(vms.element[0]);
            var displayElement;
            scrollContainer.find("div[transcope][scrollindex='" + displayIndex + "']").each(function() {
                    displayElement = this;
                    //logger.log('scrollToPosition: ' + scrollToPosition + ' - index: ' + displayIndex);
                    return false;
            }).first();
            if (displayElement) {
                displayElement.scrollIntoView();
                vms.lastScrollTop = $( "#scrollViewPort" ).scrollTop();
            } else {
                logger.debug('###########  displayElement not found, skipping scrollIntoView   #######################');
            }
        }

        /**
         * Utility function, returns index of the first element visible on top of the scrollViewPort
         * container.
         * @returns {number}
         */
        function getCurrentDisplayIndex(scrollDirection) {
            var displayIndex = -1;
            var scrollContainer = $(vms.element[0]);
            switch (scrollDirection)
            {
                case SCROLL_UP:
                    for (var i =( $scope.dataBuffer.length - 1); i >= 0; i--) {
                        logger.debug(' $scope.dataBuffer[i].scrollindex: ' +  $scope.dataBuffer[i].scrollindex + " - " + thresholdIndex);
                        if ($scope.dataBuffer[i].visible === true) {
                            logger.debug('currentDisplayIndex: ' + $scope.dataBuffer[i].scrollindex );
                            return $scope.dataBuffer[i].scrollindex;
                        }
                    }
                    break;

                case SCROLL_DOWN:
                    for (var i = 0; i < $scope.dataBuffer.length; i++) {
                        //logger.debug(' $scope.dataBuffer[i].scrollindex: ' +  $scope.dataBuffer[i].scrollindex + " - " + thresholdIndex);
                        if ($scope.dataBuffer[i].visible === true) {
                            logger.debug('currentDisplayIndex: ' + $scope.dataBuffer[i].scrollindex );
                            return $scope.dataBuffer[i].scrollindex;
                        }
                    }
                    break;
                default:
                    return -1;
            }

        }

        /**
         * Utility function for obtaining time delta.
         * @param startTime
         * @returns {number}
         */
        function getTimeDelta(startTime){
            if (startTime) {
                return new Date().getTime() - startTime;
            } else {
                return new Date().getTime();
            }
        }

        /**
         * Mark internal data buffer with visibility attribute.  Loops through all transcoped elements
         * in the scrollViewPort to determine their visibility state.
         */
        vms.watchVisibility = function(){
            var scrollContainer = $(vms.element[0]);""
            scrollContainer.find("div[transcope]").each(function() {
                var $elem = $(this);
                var visible = vms.isVisible($elem.find(">:first-child"));
                var eventTargetIndex = binarySearch($elem.attr("scrollindex"), $scope.dataBuffer);
                //logger.log('index: ' + eventTargetIndex + ' visible: ' + visible);
                $scope.dataBuffer[eventTargetIndex].visible = visible;
            });
        }

        /**
         * Determines if element is visible in viewport.
         * @param elem
         * @returns {boolean}
         */
        vms.isVisible = function(elem){
            var elementTop = elem.position().top;
            if(elementTop == 0){
                elementTop = elem.parent().position().top;
            }
            //logger.log('isVisible fn - elementTop: ' + elementTop + ', $( "#scrollViewPort").height(): ' + $( "#scrollViewPort").height());
            return elementTop > 0 && (elementTop < $( "#scrollViewPort").height());
        }

        /**
         * Main scroll event handler function.  When minimum scroll distance is detected, detremination of scroll
         * direction is made, and if there is no other pagination event in progress datasource function provided
         * by the client is called to fetch more data.
         */
        vms.handleScrollEvent = function(){
            var st = $( "#scrollViewPort" ).scrollTop();
            var scrollDistance = st - vms.lastScrollTop;

            if(Math.abs(scrollDistance) > 0){
                vms.watchVisibility();
            }

            if(Math.abs(scrollDistance) > 1) {
                if (!vms.paginationInProgress) {
                    if (scrollDistance > 0) {
                        logger.debug('SCROLL_DOWN');
                        // check for change of scroll direction and skip first time after change

                        if(vms.scrollDirection === SCROLL_DOWN && !vms.EOB){
                            var thresholdIndex = vms.currentIndex - BUFFER_THRESHOLD;
                            for (var i = $scope.dataBuffer.length - 1; i > -1; i--) {
                                //logger.debug('scrollindex: ' +  $scope.dataBuffer[i].scrollindex + ' - ' + thresholdIndex + ' visible: ' + $scope.dataBuffer[i].visible) ;
                                if ($scope.dataBuffer[i].visible === true &&
                                    $scope.dataBuffer[i].scrollindex >= thresholdIndex) {
                                    setTimeout(function() {}, 0);
                                    vms.datasource.get(vms.currentIndex, vms.scrollPageSize, SCROLL_DOWN);
                                    break;
                                } else if($scope.dataBuffer[i].scrollindex < thresholdIndex){
                                    //logger.debug('scrollindex <= thresholdIndex');
                                    break;
                                }
                            }
                        }
                        vms.scrollDirection = SCROLL_DOWN;
                    } else if (!vms.BOB) {
                        logger.debug('SCROLL_UP');
                        // check for change of scroll direction and skip first time after change
                        if (vms.scrollDirection === SCROLL_UP) {
                            var thresholdIndex = parseInt($scope.dataBuffer[0].scrollindex) + BUFFER_THRESHOLD;
                            //logger.debug('thresholdIndex: ' + thresholdIndex + ' = ' + $scope.dataBuffer[0].scrollindex + ' + '  + vms.scrollPageSize);
                            if ($scope.dataBuffer[0].scrollindex !== 0) {
                                for (var i = 0; i < $scope.dataBuffer.length; i++) {

                                    if ($scope.dataBuffer[i].visible === true) {
                                        logger.debug('thresholdIndex: ' + thresholdIndex + ' = ' + $scope.dataBuffer[i].scrollindex);
                                        if ($scope.dataBuffer[i].scrollindex <= thresholdIndex) {
                                            //logger.debug('index: ' + i + ' scrollIndex: ' + $scope.dataBuffer[i].scrollindex + ' thresholdIndex: ' + thresholdIndex);
                                            //logger.debug('calling datasource.get(' + ($scope.dataBuffer[0].scrollindex - vms.scrollPageSize) + ')');
                                            var offset = $scope.dataBuffer[0].scrollindex - vms.scrollPageSize;
                                            var pageSize = vms.scrollPageSize;

                                            // if offset index goes negative reset it to 0 and reduce the page size by
                                            // the size of the deficit.
                                            if (offset < 0){
                                              pageSize = pageSize - Math.abs(offset);
                                              offset = 0;
                                            }
                                            vms.datasource.get(offset, pageSize, SCROLL_UP);
                                            break;
                                        } else if ($scope.dataBuffer[i].scrollindex >= thresholdIndex) {
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        vms.scrollDirection = SCROLL_UP;
                    }
                }
                vms.lastScrollTop = st;
            } else {
                //logger.log('insufficient delta: ' + scrollDistance);
            }
        }

         /**
         * Filter function for blocking display of metadata fields in scroll item
         * @param key
         * @returns {boolean}
         */
        $scope.isMetaData = function(key){
            switch(key){
                case "scrollindex":
                case "visible":
                    return true;
                default:
                    return false;
            }
        }

        /**
         * Wrapper function for calling client-provided getMoreData function, which fetches
         * next data page.
         * @type {{get: get}}
         */
        vms.datasource  = {
            get: function (index, count, scrollDirection) {
                logger.debug('************************************');
                logger.log('*** datasource.get -> index: ' + index);
                logger.debug('************************************');
                if (vms.paginationInProgress) {
                    return;
                }

                if(index < 0) {
                    logger.debug('index < 0, currentIndex: ' + vms.currentIndex);
                    //vms.updateDataBuffer([], scrollDirection);
                    vms.paginationInProgress = false;
                    vms.BOB = true;
                    return;
                }

                if (index === undefined){
                    logger.error('******************************************************');
                    logger.error('bad index passed to datasource.get() function');
                    vms.paginationInProgress = false;
                    //vms.updateDataBuffer([], scrollDirection);
                    return;
                }

                vms.paginationInProgress = true;
                if (vms.getMoreData === undefined){
                    logger.error('vms.getMoreData function undefined');
                    return;
                }
                vms.getMoreData($scope, {index: index, count: count})
                    .then(function(scrollData) {
                        if (scrollData !== undefined) {
                            switch (scrollDirection){
                                case SCROLL_DOWN:
                                    if(scrollData.length < count){
                                        vms.EOB = true;
                                    } else {
                                        vms.EOB = false;
                                        vms.BOB = false;
                                    }
                                    break;
                                case SCROLL_UP:
                                    if(scrollData.length < count){
                                        vms.BOB = true;
                                    } else {
                                        vms.BOB = false;
                                        vms.EOB = false;
                                    }
                                    break;
                            }
                            vms.updateDataBuffer(scrollData, scrollDirection);
                        } else {
                            vms.paginationInProgress = false;
                            //vms.updateDataBuffer([], scrollDirection);
                        }
                    }).catch(function (error) {
                        logger.error('Error occured in app.scrollerPaginator.scrollPageontroller.getDataFunction()', {
                            error: error
                        });
                        vms.paginationInProgress = false;
                        //vms.updateDataBuffer([], scrollDirection);
                    });
            }
        };

       scrollFilterInterval = $rootScope.$on('initiate_infinite_scroll', function(event, data) {
            vms.refreshScrollData();
       });

       vms.refreshScrollData = function(){
           $scope.dataBuffer = [];
           vms.paginationInProgress = false;
           vms.currentIndex = 0;
           vms.datasource.get(0, BUFFER_THRESHOLD, SCROLL_DOWN);
       }

       function getContentHeight() {
        var systembarHeight = $document.find(".systemBar").height();
        var navHeight = $document.find(".ebMetraviewContainer").height();
        var headerHeight = $document.find(".widget.card-expanded").find(".header").height();
        var ebHorizontalBar = $document.find(".ebHorizontalBar").height();
         var contentHeight = $document.height() - (systembarHeight + navHeight + headerHeight + ebHorizontalBar);
        return {"height" : (contentHeight-30) + "px"};
       }

       angular.element($window).on('resize', function () {
            vms.getContentHeight();
        });

        registeredScrollEvents.push(scrollFilterInterval);
        registeredScrollEvents.push(visibleEventQueueWatch);

        $scope.$on('$destroy', function () {
            for(var i = 0; i < registeredScrollEvents.length; i++){
                registeredScrollEvents[i]();
            }
        });

        activate();
    }

})();
