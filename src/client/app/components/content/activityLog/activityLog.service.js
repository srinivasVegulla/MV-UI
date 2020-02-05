(function() {
  'use strict';

  angular
    .module('app.activityLog')
    .factory('activityLogService', Service);

  Service.$inject = [
    'logger',
    '$http',
    'utilityService'
  ];

  function Service(logger, $http, utilityService) {
    var service = {
      allActivityLog : getAllActivityLogs,
      allActivityLogByPage : getActivityLogByPage,
    };
    return service;

    function getAllActivityLogs(accountId, idInterval) {
      logger.log('app.activityLog.activityService.activityLog(): Activity Service!!');
      var request = {
        method: 'GET',
        url: 'api/audit/'+accountId,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
        params: {
          intervalid : idInterval,
          namespace: utilityService.getNameSpace()
        }       
      };
      return $http(request)
        .then(function (response) {
          return response.data;
      });
    }

    function getActivityLogByPage(accountId, idInterval, startDate, endDate, sortKey, filterItems, offset, pageSize){
        logger.log('app.activityLog.activityService.getActivityLogByPage');
        logger.log('activityLog.service.js::getActivityLogByPage');
        var columns = "";
        var filters = "";
        for (var key in filterItems) {
           columns += key +",";
           filters += key +"==%" + filterItems[key] + "%;" ;
        }
        var params = {
            offset: offset,
            pagesize: pageSize,
            namespace: utilityService.getNameSpace()
          };
        if(startDate || endDate){
          params.startdate = startDate;
          params.enddate = endDate
        }else {
          params.intervalid = idInterval;
        }
        if(filters){
          params.columns = columns.substring(0, columns.length - 1);
          params.filter = filters.substring(0, filters.length - 1);
        }
        if(sortKey && sortKey != undefined){
          params.sort = sortKey;
          params.order = "desc";
        }
        var request = {
            method: 'GET',
            url: 'api/audit/activities/'+accountId,
            params: params
        };
        return $http(request)
            .then(function (response) {
                return response.data;
            });
    }
  }
}());
