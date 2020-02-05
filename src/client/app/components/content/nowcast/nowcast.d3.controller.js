'use strict';

d3.chart = d3.chart || {};
var chart, svg;
var margin = { top: 20, right: 50, bottom: 20, left: 25 },
  width,
  height = 70 - margin.top - margin.bottom;

$(document).ready(function () {
  var isIE = (navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true);
  d3.chart.bullet = function () {
    var ctr = 0;
    var appDirection = d3.select("body").attr("dir");
    //        if ( $('.widget').length ) {
    //            width = $('.widget').width() - margin.left - margin.right;
    //        } else {
    width = 500 - margin.left - margin.right;
    //       }

    function createChart() {
      //chart = d3.bullet();
    }

    function clearChart() {
      d3.select("#nowcast-svg").remove();
      d3.select("#nowcast-body").select("text").remove();
    }


    d3.chart.updateChart = function (decisionData, noDecisionsFound, intervalId) {
      clearChart();

      var chart = d3.bullet();  //.width(width).height(height);

      if ((typeof decisionData === 'undefined') || decisionData === undefined ||
        decisionData == null || decisionData.length == 0) {
        d3.select("#nowcast-body")
          .append("text")
          .text(noDecisionsFound);
        return;
      }

      var svg = d3.select("#nowcast-body")
        .append("div")
        .attr("id", "nowcast-svg")
        //.attr("fill", "none")
        //.style("pointer-events", "none")
        .classed("svg-container", true).selectAll("svg")
        .data(decisionData)
        .enter().append("svg")
        .attr("margin-top", "0px")
        .attr("dy", "50")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", "0 0 500 " + 130)
        //class to make it responsive
        .classed("svg-content-responsive", true)
        .attr("class", "bullet");

      svg = svg.append("g")
        .attr("width", "100%")
        .attr("display", "block")
        .attr("margin", "0 auto")
        .attr("transform", "translate(" + margin.left + "," + (margin.top + 40) + ")")
        .call(chart);

      var title = svg.append("g")
        .attr("transform", function () {
          if (appDirection == 'LTR') { return "translate(-6, 5)" }
          else { return "translate(400, 5)" }
        });

      title.append("text")
        .attr("class", "title")
        .attr("dx", "0em")
        .attr("dy", "-3.0em")
        .attr("text-anchor", appDirection == 'LTR' ? "start" : "end")
        .text(function (d) {
          return d.title;
        });

      title.append("text")
        .attr("class", "subtitle")
        .attr("dx", "0em")
        .attr("dy", "-2.8em")
        .attr("text-anchor", appDirection == 'LTR' ? "start" : "end")
        .text(function (d) {
          var inBound = d.enums.metratechEnumerationsCloudCommonTrafficdirectionInbound;
          var outBound = d.enums.metratechEnumerationsCloudCommonTrafficdirectionOutbound;
          if (inBound) {
            return d.subTitle + inBound;
          } else if (outBound) {
            return d.subTitle + outBound;
          } else {
            return d.subTitle;
          }
        });

      //var x = d3.scaleLinear().domain([0, data.length]).range([0, width]);

      title.append("text")
        .attr("class", "decisionDates")
        .attr("dx", function (d, i) {
          if (appDirection == 'LTR') {
            var svgWidth = $('.bullet')[0].getBBox().width;
            return isIE ? 430 : svgWidth * 1.9;
          } else {
            //return isIE ? "-23em" : "-36em";
            return "-36em";
          }
        })
        .attr("dy", "-4.0em")
        .attr("text-anchor", appDirection == 'LTR' ? "end" : "start")
        .text(function (d) {
          return d.datesLabel;
        })
        .append("svg:title")
          .text(function(d, i) { return "Interval " + intervalId });

    }
    return createChart();
  }
});
