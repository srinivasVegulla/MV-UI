(function() {
    'use strict';
    angular
        .module('app.billing-activity')
        .controller('billingActivityController', Controller);
    Controller.$inject = [
        '$scope',
        'billingActivityService',
        'logger',
        '$filter',
        'filterService',
        '$rootScope',
        'accountService',
        '$moment',
        'dateFilter',
        'localStorageService',
        'utilityService',
        '$window',
        'userService'
    ];
    /* @ngInject */
    function Controller(
        $scope,
        billingActivityService,
        logger,
        $filter,
        filterService,
        $rootScope,
        accountService,
        $moment,
        dateFilter,
        localStorageService,
        utilityService,
        $window,
        userService) {
        var vm = this,
            COMPONENT_NAME = 'Billing Activity',
            filterInterval,
            viewBoxWidth,
            viewBoxHeight;
        vm.nodata = false;
        vm.connectionError = false;
        vm.currency = '';
        vm.isFirstLogin = true;
        var svg = '';
        vm.close = false;
        vm.createSVG = createSVG;
        vm.getBillingActivity = getBillingActivity;
        vm.generateBarChart = generateBarChart;
        vm.clearChart = clearChart;
        vm.isIEbrowser = false;
        var unregisterBillingActivityEvents = [];
        vm.calendarDateFormat = vm.localizeDateFormat = utilityService.dateFormat;
        vm.activate = activate;

        if($window.innerWidth < 370) {
            viewBoxWidth = 550,
            viewBoxHeight = 500;
        } else if($window.innerWidth > 370 && $window.innerWidth < 450) {
            viewBoxWidth = 550,
            viewBoxHeight = 550;
        } else {
            viewBoxWidth = 600,
            viewBoxHeight = 550;
        }

        var margin = { top: 20, right: 50, bottom: 20, left: 25 },
        width = 500 - margin.left - margin.right,
        height = 370 - margin.top - margin.bottom;
        var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
        var y = d3.scaleLinear()
            .range([height, 0]);

        var _accountIntervals = [],
            _intervalsMap = {};

        var appDirection = d3.select("body").attr("dir");

        filterInterval = $scope.$on('show_filter_intervals', function(event, idInterval, data) {
            if(!utilityService.cardState.expand) {
                vm.initiateWidgetService();
            }
        });
        unregisterBillingActivityEvents.push(filterInterval);

        $scope.$watch('accountId', function(acctId){
          if (!acctId) return;
          vm.accountId = acctId;
          activate();
        });

        function activate() {
            utilityService.getLocaleDateFormatter().then(function () {
                vm.localizeDateFormat = vm.getDateFormatByLang();
            });
            vm.initiateWidgetService();
        }

        vm.initiateWidgetService = function() {
          vm.loading = true;
          if(_accountIntervals.length > 0 && vm.billCount){
              vm.getBillingActivity(vm.billCount);
          }else{
              getPreDataForBillingActivities();
          }
          if (navigator.msSaveBlob) {
           vm.isIEbrowser = true;
          }
        }

        function getPreDataForBillingActivities(){
            userService.getCommonConfigFile().then(function (configResponse) {
            vm.billCount = configResponse.BillingActivity.billCount;
            filterService.getFilter(vm.accountId)
            .then(function(response) {
                _accountIntervals = response.data.accountIntervals;
                angular.forEach(_accountIntervals, function(value, index) {
                value.startDate = $moment(value.startDateAsString, vm.calendarDateFormat).format(vm.localizeDateFormat);
                value.endDate = $moment(value.endDateAsString, vm.calendarDateFormat).format(vm.localizeDateFormat);
                });
                _intervalsMap = _accountIntervals.reduce(function(map, node) {
                    map[node.idInterval] = node;
                    return map;
                }, {});
                vm.getBillingActivity(vm.billCount);
            })
            .catch(function(err) {
            });
         });
        }

        function createSVG() {
            vm.clearChart();
            d3.select(".eaColumnChart-rCharts-columnChart")
                .append("div")
                .attr("class", "ecb-billingactivity-svg")

            svg = d3.select(".ecb-billingactivity-svg").append("svg")
                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", "0 0 " + viewBoxWidth + " " + viewBoxHeight)
                .classed("ecb-billingsvg-contentresponsive", true)
                .append("g")
                .attr("transform",
                    "scale(1,0.9) translate(30,20)");
        }

        function getBillingActivity(billingCount) {
            var idInterval = utilityService.getOrSetSelectedTimeInterVal().idInterval;
            billingActivityService.getActivity(vm.accountId, idInterval, billingCount).then(function(response) {
                if (response.data) {
                    vm.connectionError = false;
                    vm.nodata = false;
                    vm.billingActivities = response.data.BillActDetails;
                    utilityService.getCurrency().then(function() {
                      vm.currency = localStorageService.get('currency');
                      vm.generateBarChart();
                    }).catch(function(error) {
                        handleError(error);
                    });
                }
            }).catch(function(err) {
                if (err.status === 404) {
                    vm.nodata = true;
                    vm.connectionError = false;
                }
                if (err.status === 500) {
                    vm.clearChart();
                    vm.connectionError = true;
                }
            }).finally(function () {
              vm.loading = false;
            });
        }

        function getSelectedInterVal(idInterVal, invoiceNumber){
            for(var i = 0; i < _accountIntervals.length; i++){
                if(_accountIntervals[i].idInterval == idInterVal && (!invoiceNumber || (invoiceNumber && invoiceNumber == _accountIntervals[i].invoiceNumber))){
                    return { interval : _accountIntervals[i], index : i };
                } 
            }
        }

        function generateBarChart() {
            vm.createSVG();
            angular.forEach(vm.billingActivities, function(d) {
                d.invoiceAmount = +d.invoiceAmount;
                d.intervalId = +d.intervalId;
            });

            angular.forEach(vm.billingActivities, function(value, index) {
                value.endDate = $moment(value.endDateAsString, vm.calendarDateFormat).format(vm.localizeDateFormat);
                var accountInterval = getSelectedInterVal(value.intervalId, value.itemDesc);
                if(accountInterval && accountInterval.interval.onDemandInterval == true && value.transcDate){
                    value.invoiceDate = $moment(value.invoiceDateAsString, vm.calendarDateFormat).format(vm.localizeDateFormat);
                }else{
                    value.invoiceDate = value.endDate;
                }
            });

            x.domain(vm.billingActivities.map(function(d) {
                return d.invoiceDate;
            }));
            var min = d3.min(vm.billingActivities, function (d) {
              return d.invoiceAmount;
            })
            var max = d3.max(vm.billingActivities, function (d) {
              return d.invoiceAmount;
            });
            y.domain([(min > 0) ? 0 : min , (max > 0) ? max : 0]);
            svg.selectAll(".bar")
                .data(vm.billingActivities)
                .enter().append("rect")
                .attr("class", function (d) {
                  if (d.invoiceAmount < 0) {
                    return "negativeBar";
                  } else {
                    return "bar";
                  }
                })
                .attr("x", function(d) {
                    return x(d.invoiceDate);
                })
                .attr("width", x.bandwidth())
                .attr("y", function(d) {
                    if (d.invoiceAmount > 0) {
                      return y(d.invoiceAmount);
                    } else {
                      return y(0);
                    }
                })
                .attr("height", function(d) {
                    return Math.abs(y(d.invoiceAmount) - y(0));
                })
                .on("click", function(d) {
                    var selectedIntervalId = d.intervalId;
                    var selectedInterval = getSelectedInterVal(selectedIntervalId, d.itemDesc);
                    $rootScope.$emit('intervalsChanged', selectedInterval.index);
                    $rootScope.$emit("billingTriggerInterval", selectedIntervalId, selectedInterval.interval);
                });

            // add the x Axis
            svg.append("g")
                .attr("class", "xAxis")
                .attr("transform", "scale(1,1) translate(0," + height + ")")
                .call(d3.axisBottom().scale(x))
                .selectAll("text")
                .style("text-anchor", "end")
                .style("font-size", "1.6rem")
                .attr("transform", "rotate(-30)")
                .attr("y",  function() {
                 if (appDirection == 'LTR') { return 15}
                 else { return (vm.isIEbrowser ? 1 : 30) }
                ;})
                .attr("dx", function(){
                 if (appDirection == 'LTR') { return ""}
                 else { return (vm.isIEbrowser ? "-1em" : "-3.2em")  }
                ;});

            svg.append("text")
                .attr("class", "xAxisLabel")
                .attr("x", width / 2)
                .attr("y", 80)
                .style("text-anchor", "middle")
                .attr("transform", "translate(0," + (height + 15) + ")")
                .text($filter('translate')('TEXT_INVOICE_DATE'));

            svg.append("g")
              .attr("class", "x axis")
              .append("line")
              .attr("y1", y(0))
              .attr("y2", y(0))
              .attr("x2", width);

            svg.selectAll(".text")
                .data(vm.billingActivities)
                .enter().append("text")
                .attr("x", function(d) {
                    return x(d.invoiceDate);
                })
                .attr("y", function(d) {
                  if (d.invoiceAmount >= 0) {
                    return y(d.invoiceAmount) + 10;
                  } else {
                     return y(0) + 10;
                  }
                })
                .style("font-size", "1.6rem")
                .style("cursor","pointer")
                .attr("transform", function(){
                  if (appDirection == 'LTR' || vm.isIEbrowser) { return "translate(0, -18)"}
                 else { return "translate(" + x.bandwidth() +", -18)" }
                    ;})
                .text(function(d) {
                    return vm.currencyFormatter(d.invoiceAmount, d.currency, false);  })
                .on("click", function(d) {
                    if(d.invoiceAmount > 0) {
                        var selectedIntervalId = d.intervalId;
                        var selectedInterval = getSelectedInterVal(selectedIntervalId, d.itemDesc);
                        $rootScope.$emit('intervalsChanged', selectedInterval.index);
                        $rootScope.$emit("billingTriggerInterval", selectedIntervalId, selectedInterval.interval);
                    }
                })

            // add the y Axis
            svg.append("g")
                .attr("class", "yAxis");

            svg.append("text")
                .attr("class", "yAxisLabel")
                .attr("x", -height / 2)
                .attr("y", -10)
                .style("text-anchor", "middle")
                .attr("transform", "rotate(-90)")
                .text(function() {
                    return $filter('translate')('TEXT_BILL_AMOUNT') + "(" + utilityService.getCurrencySign(vm.currency) + ")";
                })
        }

        vm.showgraph = function() {
          return (!vm.nodata && !vm.connectionError && !vm.close && !vm.loading);
        }

        function handleError(error) {
            vm.generateBarChart();
            logger.log('Error retrieving data. Please contact customer support.', error, COMPONENT_NAME);
        }

        function clearChart() {
            if (angular.element(".ecb-billingactivity-svg").length) {
                d3.selectAll(".ecb-billingactivity-svg").remove();
            }
        }

        vm.clickClose = function() {
            vm.close = true;
            vm.connectionError = false;
        }

        vm.currencyFormatter = function(value, code, isSymbol) {
            return utilityService.currencyFormatter(value, code, isSymbol);
        }
        vm.getDateFormatByLang = function() {
            var dateFormat = utilityService.getDateFormatterByLang()['dateFormat'];
            return utilityService.isObject(dateFormat) ? dateFormat : vm.calendarDateFormat;
        }

        $scope.$on('$destroy', function() {
            utilityService.cleanUpListners(unregisterBillingActivityEvents);
        });
    }
})();
