(function() {
    'use strict';
    angular
        .module('app.usage-activity')
        .controller('usageActivityController', Controller);
    Controller.$inject = [
        '$scope',
        'usageActivityService',
        'logger',
        '$filter',
        'filterService',
        '$rootScope',
        'accountService',
        '$moment',
        'dateFilter',
        'localStorageService',
        'utilityService',
        'userService'
    ];
    /* @ngInject */
    function Controller(
        $scope,
        usageActivityService,
        logger,
        $filter,
        filterService,
        $rootScope,
        accountService,
        $moment,
        dateFilter,
        localStorageService,
        utilityService,
        userService) {
        var ua = this,
            COMPONENT_NAME = 'Usage Activity',
            filterInterval;
        ua.noData = false;
        ua.connectionError = false;
        ua.currency = '';
        ua.isFirstLogin = true;
        var svg = '';
        ua.close = false;
        ua.createSVG = createSVG;
        ua.getUsageActivity = getUsageActivity;
        ua.generateBarChart = generateBarChart;
        ua.clearChart = clearChart;
        var unregisterUsageActivityEvents = [];
        ua.calendarDateFormat = ua.localizeDateFormat = utilityService.dateFormat;

        $scope.$watch('accountId', function(acctId){
          if (!acctId)return;
          ua.accountId = acctId;
          activate();
        });

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

        filterInterval = $scope.$on('show_filter_intervals', function(event, idInterval, data) {
            if(!utilityService.cardState.expand) {
                ua.initiateWidgetService();
            }
        });

        unregisterUsageActivityEvents.push(filterInterval);

        function activate() {
            ua.initiateWidgetService();
        }

        ua.initiateWidgetService = function() {
          ua.loading= true;
            if(_accountIntervals.length > 0 && ua.billCount){
                ua.getUsageActivity(ua.billCount);
            }else{
                getPreDataForUsageActivities();
            }
        }

        function getPreDataForUsageActivities(){
            userService.getCommonConfigFile().then(function (configResponse) {
            ua.billCount = configResponse.UsageActivity.usageCount;
            filterService.getFilter(ua.accountId)
            .then(function(response) {
                _accountIntervals = response.data.accountIntervals;
                angular.forEach(_accountIntervals, function(value, index) {
                    value.startDate = $moment(value.startDateAsString, ua.calendarDateFormat).format(ua.localizeDateFormat);
                    value.endDate = $moment(value.endDateAsString, ua.calendarDateFormat).format(ua.localizeDateFormat);
                });
                ua.latestIntervalId = _accountIntervals[0].idInterval;
                _intervalsMap = _accountIntervals.reduce(function(map, node) {
                    map[node.idInterval] = node;
                    return map;
                }, {});
                ua.getUsageActivity(ua.billCount);
            })
            .catch(function(err) {
            }); 
          });           
        }

        function createSVG() {
            ua.clearChart();
            d3.select(".usageActivity-eaColumnChart-rCharts-columnChart")
                .append("div")
                .attr("class", "ecb-usageActivity-Svg")

            svg = d3.select(".ecb-usageActivity-Svg").append("svg")
                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", "0 0 600 550")
                .classed("ecb-usageSvg-contentResponsive", true)
                .append("g")
                .attr("transform",
                    "scale(1,0.9) translate(30,20)");
        }

        function getUsageActivity(billingCount) {
            var idInterval = utilityService.getOrSetSelectedTimeInterVal().idInterval;
            usageActivityService.getActivity(ua.accountId, idInterval, billingCount).then(function(response) {
                if (response.data) {
                    ua.connectionError = false;
                    ua.noData = false;
                    ua.usageActivities = response.data.UsageActivity;
                    utilityService.getCurrency().then(function() {
                      ua.currency = localStorageService.get('currency');
                        ua.generateBarChart();
                    }).catch(function(error) {
                        handleError(error);
                    });
                }
            }).catch(function(err) {
                if (err.status === 404) {
                    ua.noData = true;
                    ua.connectionError = false;
                }
                if (err.status === 500) {
                    ua.clearChart();
                    ua.connectionError = true;
                }
            }).finally(function () {
              ua.loading = false;
            });
        }

        function getSelectedInterVal(idInterVal, invoiceNumber){
            for(var i = 0; i < _accountIntervals.length; i++){
                if(_accountIntervals[i].idInterval == idInterVal){
                    return { interval : _accountIntervals[i], index : i };
                }
            }
        }

        function generateBarChart() {
            ua.createSVG();

            angular.forEach(ua.usageActivities, function(d) {
                d.usageAmount = +d.usageAmount;
                d.intervalId = +d.intervalId;
            });

            angular.forEach(ua.usageActivities, function(value, index) {
                value.endDate = $moment(value.endDate, ua.calendarDateFormat).format(ua.localizeDateFormat);
                var accountInterval = getSelectedInterVal(value.intervalId, value.itemDesc);
                if(accountInterval && accountInterval.interval.onDemandInterval == true && value.invoiceDate){
                    value.invoiceDate = $moment(value.invoiceDate, ua.calendarDateFormat).format(ua.localizeDateFormat);
                }else{
                    value.invoiceDate = value.endDate;
                }
            });

            x.domain(ua.usageActivities.map(function(d) {
                return d.invoiceDate;
            }));
            var min = d3.min(ua.usageActivities, function (d) {
              return d.usageAmount;
            });
            var max = d3.max(ua.usageActivities, function (d) {
              return d.usageAmount;
            });
            y.domain([(min > 0) ? 0 : min , (max > 0) ? max : 0]);

            svg.selectAll(".bar")
                .data(ua.usageActivities)
                .enter().append("rect")
                .attr("class", function(d){
                    if(ua.latestIntervalId == d.intervalId)
                        return (d.usageAmount > 0) ? "currentMonth" : "negativeBar";
                    else {
                      return (d.usageAmount > 0) ? "bar" : "negativeBar";
                    }
                })
                .attr("x", function(d) {
                    return x(d.invoiceDate);
                })
                .attr("width", x.bandwidth())
                .attr("y", function(d) {
                    if (d.usageAmount >= 0) {
                      return y(d.usageAmount);
                    } else {
                      return y(0);
                    }
                })
                .attr("height", function(d) {
                    return Math.abs(y(d.usageAmount) - y(0));
                })
                .on("click", function(d) {
                    var selectedIntervalId = d.intervalId;
                    var selectedInterval = getSelectedInterVal(selectedIntervalId, d.itemDesc);
                    $rootScope.$emit('intervalsChanged', selectedInterval.index);
                    $rootScope.$emit("billingTriggerInterval", selectedIntervalId, selectedInterval.interval);
                })
            // add the x Axis
            svg.append("g")
                .attr("class", "xAxis")
                .attr("transform", "scale(1,1) translate(0," + height + ")")
                .call(d3.axisBottom().scale(x))
                .selectAll("text")
                .style("text-anchor", "end")
                .style("font-size", "1.6rem")
                .attr("transform", "rotate(-30)")
                .attr("y", 15);

            svg.append("g")
              .attr("class", "x axis")
              .append("line")
              .attr("y1", y(0))
              .attr("y2", y(0))
              .attr("x2", width);

            svg.append("text")
                .attr("class", "xAxisLabel")
                .attr("x", width / 2)
                .attr("y", 80)
                .style("text-anchor", "middle")
                .style("font-size", "2.2rem")                
                .attr("transform", "translate(0," + (height + 15) + ")")
                .text($filter('translate')('TEXT_BILL_DATE'));

            svg.selectAll(".text")
                .data(ua.usageActivities)
                .enter().append("text")
                .attr("x", function(d) {
                    return x(d.invoiceDate);
                })
                .attr("y", function(d) {
                    if (d.usageAmount >= 0) {
                      return y(d.usageAmount) + 10;
                    } else {
                      return y(0) + 10;
                    }
                })
                .style("font-size", "1.6rem")
                .style("cursor","pointer")
                .attr("transform", "translate(0, -18)")
                .text(function(d) {
                    return ua.currencyFormatter(d.usageAmount, ua.currency, false);
                })
                .on("click", function(d) {
                    if(d.usageAmount > 0) {
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
                .style("font-size", "2.2rem")               
                .attr("transform", "rotate(-90)")
                .text(function() {
                    return $filter('translate')('TEXT_USAGE_CHARGES') + "(" + utilityService.getCurrencySign(ua.currency) + ")";
                });
        }

        ua.showGraph = function() {
            return (!ua.noData && !ua.connectionError && !ua.close && !ua.loading);
        }

        function handleError(error) {
            ua.generateBarChart();
            logger.log('Error retrieving data. Please contact customer support.', error, COMPONENT_NAME);
        }

        function clearChart() {
            if (angular.element(".ecb-usageActivity-Svg").length) {
                d3.selectAll(".ecb-usageActivity-Svg").remove();
            }
        }

        ua.clickClose = function() {
            ua.close = true;
            ua.connectionError = false;
        }

        ua.currencyFormatter = function(value, code, isSymbol) {
          return utilityService.currencyFormatter(value, code, isSymbol);
        }
        ua.getDateFormatByLang = function() {
            var dateFormat = utilityService.getDateFormatterByLang()['dateFormat'];
            return utilityService.isObject(dateFormat) ? dateFormat : ua.calendarDateFormat;
        }

        $scope.$on('$destroy', function() {
            utilityService.cleanUpListners(unregisterUsageActivityEvents);
        });
    }
})();
