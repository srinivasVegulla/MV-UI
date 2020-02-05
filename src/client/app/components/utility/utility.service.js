(function() {
  'use strict';
  angular
    .module('app.utility')
    .factory('utilityService', Service);

  Service.$inject = [
    '$http',
    '$moment',
    '$filter',
    '$q',
    '$sce',
    'localStorageService'
  ];


  /* @ngInject */
  function Service($http, $moment, $filter, $q, $sce, localStorageService) {

    // Public API
    var service = {
      gridSettingsStorageData : getorSetTabularSettingsStorageData,
      processExternalConfigJson : processExternalConfigJson,
      manageViewAllBodyHeight : manageViewAllBodyHeight,
      getResponseConfigJson : getResponseConfigJson,
      getExtConfigFile : getExtConfigFile,
      getOffersImageFile: getOffersImageFile,
      getCurrency : getCurrencyJson,
      getCurrencyInfo: getCurrencyInfo,
      getCurrencySign : getCurrencySign,
      getOrSetSelectedTimeInterVal : getOrSetSelectedTimeInterVal,
      getKeyNameByJsonList : getKeyNameByJsonList,
      getValueFromMap : getValueFromMap,
      getOrSetSelectedCards : getOrSetSelectedCards,
      getorSetStatusFiltersList : getorSetStatusFiltersList,
      isInfiniteScrollActivated : isInfiniteScrollActivated,
      setStartAndEndOfDay : setStartAndEndOfDay,
      isCurrentBillingPeriod : isCurrentBillingPeriod,
      getLocaleFile : getLocaleFile,
      getConfigFieldDataType : getConfigFieldDataType,
      cleanUpListners : cleanUpListners,
      getNotificationHTML : getNotificationHTML,
      capitalizeFirstLetter: capitalizeFirstLetter,
      getNameSpace: getNameSpace,
      getSiteName: getSiteName,
      getUtcDateByMilliSec: getUtcDateByMilliSec,
      unSortMultiCols: unSortMultiCols,
      getKeysForDataList: getKeysForDataList,
      setColumnDefinitions: setColumnDefinitions,
      setStartAndEndOfDayFormat: setStartAndEndOfDayFormat,
      arrayDifference: arrayDifference,
      isObject: isObject,
      isEmpty: isEmpty,
      currencyFormatter: currencyFormatter,
      getNumberFormatter: getNumberFormatterJson,
      formatNumber: formatNumber,
      getLocaleDateFormatter: getLocaleDateFormatter,
      getDateFormatterByLang: getDateFormatterByLang,
      convertPickDateFormat: convertPickDateFormat,
      getDisplayName: getDisplayName,
      processJsontoJsCondtionalMsg: processJsontoJsCondtionalMsg
    };

    service.dateFormat = "MM/DD/YYYY";
    service.dateTimeFormat = service.dateFormat + " h:mm:ss A";
    service.cardState = { expand: false, widget: null, hideFilterBar: false};
    service.hoverDelay = 500;
    service.parentCharge = null;

    var staticData = {
      'viewConfig': {},
      'localization': {}
    },
    _decisionMessageConfigResponse = null;
    
    return service;

    function getorSetTabularSettingsStorageData(componentName, activeColumns, freezeColumns) {
      var tabularSettingsStorageData = localStorageService.get('tabularSettings');
      if(!tabularSettingsStorageData) {
        localStorageService.set('tabularSettings', {});
        tabularSettingsStorageData = localStorageService.get('tabularSettings');
      }
      if(!tabularSettingsStorageData[componentName]){
        tabularSettingsStorageData[componentName] = {"activeColumns" : [], "freezeColumns" : []};
        localStorageService.set("tabularSettings", tabularSettingsStorageData);
      }
      if(activeColumns)
        tabularSettingsStorageData[componentName]["activeColumns"] = activeColumns;
      if(freezeColumns)
        tabularSettingsStorageData[componentName]["freezeColumns"] = freezeColumns;

      localStorageService.set("tabularSettings", tabularSettingsStorageData);
      return localStorageService.get('tabularSettings')[componentName];
    }

    function processExternalConfigJson(dataList, configFields) {
      var none = $filter('translate')('TEXT_NONE');
      var list = angular.copy(dataList);
      var displayNameList = {};
      var nonDisplayableKeys = [];
      var nonExportableKeys = [];
      var sortableKeys = [none];
      var filterableKeys = [];
      var defaultColumnKeys = [];
      var exportbleDataListKeys = [];
      var fileConfigFields = {};
      var currencies = {};
      var invoiceList = [];
      var currencyField = null;
      if(list && list.length > 0){
        var dataColumnHeader = getKeyNameByJsonList(list);
        var dataObject = list[0];

        angular.forEach(configFields, function(configField, index) {
          displayNameList[configField.Key] = configField.DisplayName;
          fileConfigFields[configField.Key] = configField;
          if(configField.IsColumn == false) {
            nonDisplayableKeys.push(configField.Key);
          }
          if(configField.Sortable != false && configField.IsColumn != false){
            sortableKeys.push(configField.Key);
          }
          if(configField.Filterable != false && configField.IsColumn != false){
            filterableKeys.push({'key': configField.Key, 'dataType': configField.DataType});
          }
          if(configField.DefaultColumn != false && configField.IsColumn != false){
            defaultColumnKeys.push(configField.Key);
          }
          if(configField.Exportable == false) {
            nonExportableKeys.push(configField.Key);
          }
          if(configField.IsCurrency == true) {
            currencyField = configField.CurrencySymbol;
          }
          if(configField.IsCurrency == true)
            currencies[configField.Key] = dataObject[configField.CurrencySymbol];
        });
        var localeDateFormat = getDateFormatterByLang()['dateFormat'];
        localeDateFormat = isObject(localeDateFormat) ? localeDateFormat : service.dateFormat;
        var localeDateTimeFormat = getDateFormatterByLang()['dateAndTimeFormat'];
        localeDateTimeFormat = isObject(localeDateTimeFormat) ? localeDateTimeFormat : service.dateTimeFormat;
        for(var i = 0; i < list.length; i++) {
          var jsonObj = list[i];
          for(var key in jsonObj){
            var configObject = fileConfigFields[key];
            try{
              if(list[i][key]){
                var dataType = configObject ? configObject["DataType"] : null;
                if(dataType){
                  if(dataType == "Date"){
                    list[i][key] = $moment(list[i][key]).format(service.dateFormat);
                    try {
                      list[i][key] = $moment(list[i][key], service.dateFormat).format(localeDateFormat);
                    }catch(err) {}
                  }else if(dataType == "DateTime"){
                    list[i][key] = $moment(list[i][key]).format(service.dateTimeFormat);
                    try {
                      list[i][key] = $moment(list[i][key], service.dateTimeFormat).format(localeDateTimeFormat);
                    }catch(err) {}
                  }
                  if(['Numeric', 'Integer', 'Decimal', 'Number'].indexOf(dataType) > -1){
                    if((list[i][key]+'').indexOf(".") >= 0){
                      var decimalNum = def.configs[column]["hasDecimalValue"] && numFormatterConfig ? numFormatterConfig.decimal_places : null;
                      fileConfigFields[key]['hasDecimalValue'] = true;
                      if(decimalNum)
                        list[i][key] = parseFloat(parseFloat(list[i][key]).toFixed(decimalNum));
                    }
                  }
                }
              }
            }catch(e){
              //console.log("error while parsing");
            }
          }
        }
        var isColumnDataList = angular.copy(list);
        var exportbleDataList = angular.copy(list);
        for(var i = 0; i < list.length; i++) {
          if(currencyField){
            isColumnDataList[i]['hidden_row-currency'] = isColumnDataList[i][currencyField];
          }
          for(var curKey in currencies) {
            exportbleDataList[i][curKey] = currencyFormatter(list[i][curKey], currencies[curKey]);
          }
          for(var j = 0; j < nonDisplayableKeys.length; j++) {
            delete isColumnDataList[i][nonDisplayableKeys[j]];
          }
          for(var k = 0; k < nonExportableKeys.length; k++) {
            delete exportbleDataList[i][nonExportableKeys[k]];
          }
        }
        var exportbleDataListHeader = getKeyNameByJsonList(exportbleDataList);
        for(var i=0; i < exportbleDataListHeader.length; i++) {
          var key = exportbleDataListHeader[i];
          exportbleDataListKeys.push(displayNameList[key] ? displayNameList[key] : key)
        }
      }
      var displayList = angular.copy(isColumnDataList);
      var exportList = angular.copy(exportbleDataList);
      return {
        "isColumnDataList" : displayList,
        "exportableDataList" : exportList,
        "exportableDataListDisplayKeys" : exportbleDataListKeys,
        //"isColumnDisplayableNames" : getKeyNameByJsonList(dataList),
        "displayableNames" : displayNameList,
        "sortableKeys" : sortableKeys,
        "filterableKeys" : filterableKeys,
        "defaultColumnKeys" : defaultColumnKeys,
        "configFields" : fileConfigFields
      }
    }

    function manageViewAllBodyHeight(containerClass, contentBodyClass, adjustHeight) {
      var ele = angular.element("."+containerClass);
      if(ele) {
        var calcheight = 0;
        var containerHeight = ele.height();
        if (containerHeight && containerHeight > 0) {
          var headerHeight = ele.find(".header").outerHeight();
          var footerHeight = ele.find(".ecb-expandFooter").outerHeight();
          var elePos = ele.offset();
          var top = elePos && elePos != undefined ? elePos.top : 0;
          var bodyHeight = ((containerHeight - top) - headerHeight) - 5;
          bodyHeight = footerHeight ? bodyHeight - footerHeight : bodyHeight;
          ele.find("." + (contentBodyClass ? contentBodyClass : "ecb-expandBody")).css({ "height": bodyHeight + "px" });
          calcheight = bodyHeight - (adjustHeight ? adjustHeight : 0);
        }
        return { "height": calcheight ? calcheight : 0 + "px" };
      }
    }

    function getOrSetSelectedTimeInterVal(idInterval, dateRange) {
      var intervalObject = localStorageService.get("timeInterVal");
      if(!intervalObject)intervalObject = {};
      if(typeof intervalObject == 'string')intervalObject = JSON.parse(intervalObject);
      if(idInterval) intervalObject.idInterval = idInterval;
      if(dateRange) intervalObject.dateRange = dateRange;
      localStorageService.set("timeInterVal", intervalObject);
      return localStorageService.get("timeInterVal");
    }

    function setStartAndEndOfDay(calendarDates) {
      var calendarParam = angular.copy(calendarDates);
      if(isObject(calendarParam.startDate))
        calendarParam.startDate =  $moment(calendarParam.startDate, service.dateFormat).startOf('day').valueOf();
      if(isObject(calendarParam.endDate))
        calendarParam.endDate = $moment(calendarParam.endDate, service.dateFormat).endOf('day').valueOf(); 
      return calendarParam;
    }

    function setStartAndEndOfDayFormat(calendarDates) {
      var calendarParam = angular.copy(calendarDates);
      if(isObject(calendarParam.startDate))
        calendarParam.startDate =  $moment(calendarParam.startDate, service.dateFormat).startOf("day").format(service.dateFormat+ " HH:mm:ss");
      if(isObject(calendarParam.endDate))
        calendarParam.endDate = $moment(calendarParam.endDate, service.dateFormat).endOf("day").format(service.dateFormat+" HH:mm:ss");
      return calendarParam;
    }
    

    function getResponseConfigJson(fileName) {
      var fileConfig = staticData.viewConfig[fileName];
      if(fileConfig){
        var deferred = $q.defer();
        var result = getLocaleFileAndUpate(fileName, fileConfig);
        result =  result ? result : fileConfig;
        deferred.resolve(result)
        return deferred.promise;
      }
      var request = {
        method: 'GET',
        url: '/static/default/viewConfig/' +fileName+'.json'
      };
      return $http(request)
        .then(function (response) {
          staticData.viewConfig[fileName] = response;
          var data = getLocaleFileAndUpate(fileName, response);
          return data ? data : response;
        });
    }

    function getExtConfigFile(fileName,siteName) {
      var fileConfig = staticData[fileName];
      if(fileConfig){
        var deferred = $q.defer();
        deferred.resolve(fileConfig);
        return deferred.promise;
      }
      var request = {
        method: 'GET',
        url: '/static/'+ (siteName ? siteName : "default") +'/' +fileName
      };
      return $http(request)
        .then(function (response) {
          staticData[fileName] = response;
          return response;
        });
    }

    function getOffersImageFile(fileName, siteName) {
        var request = {
          method: 'GET',
          url: '/static/' + siteName + '/' + fileName
        };
        return $http(request)
          .then(function (response) {
            return response;
          });
    }

    function updateLocaleDataForConfigFile(localeFileData, configFileData){
      if(localeFileData && configFileData){
        var configFields = configFileData.data.columns.fields;
        var localeFields = localeFileData.data.columns.fields;
        for(var i=0; i< configFields.length; i++) {
          for(var j=0; j< localeFields.length; j++){
            if(localeFields[j]["Name"] == configFields[i]["Key"]){
              configFileData.data.columns.fields[i]["DisplayName"] = localeFields[j]["Value"];
            }
          }
        }
      }
      return configFileData;
    }

    function getNumberFormatterJson() {
      var deferred = $q.defer();
      var numFormatterConfig = localStorageService.get('numFormatterConfig');
      if(numFormatterConfig){
        deferred.resolve(numFormatterConfig);
        return deferred.promise;
      }
      var request = {
        method: 'GET',
        url: 'static/default/i18n/common/NumberFormatter.json',
        params: {
        },
      };
      return $http(request)
        .then(function(response) {
          localStorageService.set('numFormatterConfig', response.data);
          return response;
        })
        .catch(function(error) {
          console.log('app.utilityService.getNumberFormatterJson(): '+ error);
        });
    }

    function getCurrencyJson() {
      var deferred = $q.defer();
      var currencyConfig = localStorageService.get('currencyConfig');
      if(currencyConfig){
        deferred.resolve(currencyConfig);
        return deferred.promise;
      }
      var request = {
        method: 'GET',
        url: 'static/default/i18n/common/LocaleCurrency.json',
        params: {
        },
      };
      return $http(request)
        .then(function(response) {
          localStorageService.set('currencyConfig', response.data);
          return response.data;
        })
        .catch(function(error) {
          console.log('app.utilityService.getCurrencyJson():'+ error);
        });
    }

    function getCurrencyInfo(currencyCode) {
      var currencyConfig = localStorageService.get('currencyConfig');
      var currency = {};
      for(var i in currencyConfig) {
        if(currencyConfig[i].currency_code == currencyCode) currency = currencyConfig[i];
      }
      return currency;
    }

    function getCurrencySign(currencyCode){
      if(!isObject(currencyCode)) return '';
      var currencyConfig = getCurrencyInfo(currencyCode);
      return currencyConfig.currency_symbol ? currencyConfig.currency_symbol : currencyCode;
    }

    function getConfigFieldDataType(configs, key){
      if(key && configs[key] && configs[key]["DataType"]){
        var dataType = configs[key]["DataType"];
        if(['Numeric', 'Integer', 'Decimal', 'Number'].indexOf(dataType) > -1)
          return 'number';
        else if(['Date', 'DateTime', 'TimeStamp'].indexOf(dataType) > -1)
          return 'date';
        else if(['Boolean'].indexOf(dataType) > -1)
          return 'boolean';
        else if(['String', 'Text'].indexOf(dataType) > -1)
          return 'text';
      }
      return 'text';
    }

    function getKeyNameByJsonList(array){
      if(array && array.length > 0){
        return Object.keys(array[0]);
      }
      return [];
    }

    function getKeysForDataList(array) {
      var keys = getKeyNameByJsonList(array);
      if (keys.indexOf('hidden_row-currency') > -1){
        keys.splice(keys.indexOf('hidden_row-currency'), 1);
      }
      return keys;
    }

    function getValueFromMap(map, key) {
      if(map == null) return key;
      return map[key] ? map[key] : key;
    }

    function getOrSetSelectedCards(selectedCards) {
      if (selectedCards != null) {
       localStorageService.set('selectedCards', selectedCards);
      }
      return localStorageService.get('selectedCards');
    }

    function getorSetStatusFiltersList(filtersList) {
      if(filtersList != null) {
        localStorageService.set('filtersList', filtersList);
      }
      return localStorageService.get('filtersList');
    }

    function isInfiniteScrollActivated(isActive) {
      var isScrollActivated = localStorageService.get('isInfiniteScrollActivated');
      if(!isScrollActivated || isScrollActivated == undefined)
        localStorageService.set('isInfiniteScrollActivated', false);
      if(isActive != undefined)
        localStorageService.set('isInfiniteScrollActivated', isActive);
      return localStorageService.get('isInfiniteScrollActivated');
    }

    function getLocaleFileAndUpate(fileName, configData){
      var userLocale = 'en';
        if (localStorageService.get('i18n'))
            userLocale = (localStorageService.get('i18n')).currentLanguage;
      var fileConfigLocalize = staticData.localization[fileName + '_' + userLocale];
      if(fileConfigLocalize){
        var deferred = $q.defer();
        var result = updateLocaleDataForConfigFile(fileConfigLocalize, configData);
        deferred.resolve(result);
        return deferred.promise;
      }
      var path = 'viewConfig/Localization';
      if(fileName){
        var request = {
            method: 'GET',
            url: '/static/default/'+ path +'/' + fileName + '_' + userLocale + '.json',
        };
        return $http(request)
        .then(function (response) {
            staticData.localization[fileName + '_' + userLocale] = response;
            return updateLocaleDataForConfigFile(response, configData);
        })
        .catch(function(error) {
          return configData;
        });
      }
    }

    function getLocaleFile(path, fileName) {
      var userLocale = 'en';
      if (localStorageService.get('i18n'))
          userLocale = (localStorageService.get('i18n')).currentLanguage;
      var request = {
          method: 'GET',
          url: '/static/default/'+ path +'/' + fileName + '_' + userLocale + '.json',
      };
      return $http(request)
        .then(function (response) {
            return response;
        });
    }

    function isCurrentBillingPeriod(){
      var billPeriod = getOrSetSelectedTimeInterVal();
      if(billPeriod && billPeriod.dateRange){
        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var firstDay = $moment(new Date(y, m, 1)).format(service.dateFormat);
        var s = $moment(billPeriod.dateRange.startDate, service.dateFormat).diff($moment(firstDay, service.dateFormat), 'days') == 0 ? true : false;
        return s;
      }
      return false;
    }

    function cleanUpListners(unregisterChargesEvents){
      for(var i = 0; i<unregisterChargesEvents.length; i++){
        if(typeof unregisterChargesEvents[i] == 'function')
          unregisterChargesEvents[i]();
      }
    }

    function getNotificationHTML(type, isCloseButton, text) {
      //default type is error - red
      text = $filter('translate')(text);
      var boxColor = type == 'info' ? 'paleBlue' : ('warning' ? 'yellow' : ('ok' ? 'green' : 'red'));
      var closeHTML = '<span class="ebNotification-close">'
                          +'<i class="ebIcon ebIcon_close_'+boxColor+'" ebIcon_interactive"></i>'
                      +'</span>';
      return $sce.trustAsHtml('<div class="ebNotification ebNotification_color_'+boxColor+'" style="max-width:400px">'
              +'<div class="ebNotification-content">'
                  +'<span class="ebNotification-label">'+text+'</span>'+ (isCloseButton ? closeHTML : '')
              +'</div>'
          +'</div>');
    }

    function capitalizeFirstLetter(string) {
      if(string !== null && string !== undefined)
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function getUtcDateByMilliSec(milliSec) {
      return $moment.utc(milliSec).format(service.dateFormat);
    }

    function getNameSpace() {
      var userSettings = localStorageService.get("user.settings").settings;
      return userSettings.site.nameSpace;
    }
    function  getSiteName() {
      var userSettings = localStorageService.get("user.settings").settings;
      return userSettings.siteName;
    }
    function unSortMultiCols(grid, sortColumns) {
      var column = null;
      for (var j = 0; j < grid.columns.length; j++) {
          if (grid.columns[j].name === sortColumns[0].field) {
              column = grid.columns[j];
              break;
          }
       }
       if (column && sortColumns[1]) {
         sortColumns[1].sort.priority = 1;
         column.unsort();
      }
    }
    function setColumnDefinitions(def) {
      var filterKeys = Object.keys(def.selectedFilters);
      var columnDefinitions = [];
      if(def.columnKeys && def.columnKeys.length > 0){
        for(var i in def.columnKeys) {
          var column = def.columnKeys[i];
          if(column !== 'hidden_row-currency') {
            var displayName = getValueFromMap(def.dispNameKeyMap, column);
            var configFieldType = getConfigFieldDataType(def.configs, column);
            var isVisible = def.checkboxSelection.indexOf(column) > -1 ? true : false;
            var columnDefinition = {field : column, visible : isVisible, minWidth : 140, displayName : displayName};
            if(def.freezeColumns.indexOf(column) > -1) {
              ((localStorageService.get('i18n')).languageDirection == 'RTL') ? columnDefinition.pinnedRight = true : columnDefinition.pinnedLeft = true;
            }
            columnDefinition.enableSorting = def.sortKeys && def.sortKeys.indexOf(columnDefinition.field) > -1 ? true : false;
            columnDefinition.suppressRemoveSort = true;
            if(def.selectedSortKey == columnDefinition.field)
              columnDefinition.sort = { direction: def.sortOrder ? def.sortOrder : 'desc'};
            if(filterKeys.indexOf(columnDefinition.field) > -1)
              columnDefinition.filter = {term : def.selectedFilters[columnDefinition.field]};
            if(configFieldType == 'number') {
              var numFormatterConfig = localStorageService.get('numFormatterConfig');
              var decimalNum = def.configs[column]["hasDecimalValue"] && numFormatterConfig ? numFormatterConfig.decimal_places : null;
              if(def.configs[column].IsCurrency) {
                columnDefinition.cellFilter = 'currencyFilter:this';
              }else if(decimalNum){
                columnDefinition.cellFilter = 'number: ' + decimalNum;
              }
              ((localStorageService.get('i18n')).languageDirection == 'RTL') ? columnDefinition.cellClass = 'text-left' : columnDefinition.cellClass = 'text-right';                   
              columnDefinition.type = configFieldType;
            }
            columnDefinitions.push(columnDefinition);
          }
        }
      }
      return columnDefinitions;
    }
    function arrayDifference(a1, a2) {
      var result = [];
      a1.forEach(function(el) {
        if (a2.indexOf(el) === -1) {
          result.push(el);
        }
      })
      a2.forEach(function(el) {
        if (a1.indexOf(el) === -1) {
          result.push(el);
        }
      })
      return result;
    }


    function isObject(object) {
      return object !== null && object !== 'null'  && object !== 'undefined' && object !== undefined;
    }
    function isEmpty(object) {
      if (isObject(object)) {
        return (typeof(object) === 'string' && object.trim() === ''
        || typeof(object) === 'object' && (object.length === 0 || Object.keys(object).length === 0) ) ? true : false;
      }
      return true;
    }
    function formatNumber(value, thousands_delimiter, fraction_delimiter, decimal_places) {
      if(!isObject(value)) return '';
      value = parseFloat(value + '');
      if(decimal_places) 
        value = value.toFixed(decimal_places);
      var parts = value.toString().split(".");
      if(thousands_delimiter)
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_delimiter);
      value = parts.join(fraction_delimiter ? fraction_delimiter : '.');
      return value;
    }
    function currencyFormatter(value, currencyCode, isSymbol) {
      if(!isObject(value)) return '';
      isSymbol = isSymbol == false ? false : true;
      value = parseFloat(value + '');
      var currency = getCurrencyInfo(currencyCode);
      if(isEmpty(currency)) 
       return ((isObject(currencyCode) && isSymbol) ? currencyCode : '') + ' ' + value;
      var symbol = getCurrencySign(currencyCode);
      value = formatNumber(value, currency.currency_thousands_delimiter, currency.currency_fraction_delimiter, currency.currency_decimal_places);
      var before = currency.currency_symbol_position != 1 ? true : false;
      return isSymbol && symbol ? (before ? symbol +' '+ value : value +' '+ symbol) : value;
    }

    function getLocaleDateFormatter() {
      var deferred = $q.defer();
      var dateFormatter = localStorageService.get('LocaleDateFormatter');
      if(dateFormatter){
        deferred.resolve(dateFormatter);
        return deferred.promise;
      }
      var request = {
        method: 'GET',
        url: 'static/default/i18n/common/LocaleDateFormatter.json',
        params: {
        },
      };
      return $http(request)
        .then(function(response) {
          localStorageService.set('LocaleDateFormatter', response.data);
          return response.data;
        })
        .catch(function(error) {
          console.log('app.utilityService.getLocaleDateFormatter():'+ error);
        });
    }
    function getDateFormatterByLang(langCode) {
      var dateFormatter = localStorageService.get('LocaleDateFormatter');
      langCode = isObject(langCode) ? langCode : localStorageService.get('i18n').currentLanguage;
      if(isObject(dateFormatter) && dateFormatter[langCode]) {
        return dateFormatter[langCode];
      }
      return {};
    }
    function convertPickDateFormat(date) {
      return date.replace("DD", "dd").replace("YY", "yy").replace("YY", "yy");
    }
    function getDisplayName(displayNameFeilds, accountInfo) {
      var name = '';
      angular.forEach(displayNameFeilds, function (feild, index) {
        if(!name) {
          for (var i = 0; i < feild.length; i++) {
            if (accountInfo[feild[i]]) {
              name = name + " " + accountInfo[feild[i]];
            } else {
              name = '';
              break
            }
          }
        }
      });
      if (!name) {
        name = accountInfo["userName"];
      }
      return name;
    }
    function processJsontoJsCondtionalMsg(message, data) {
      var msg = message;
      msg = $filter('translate')(msg);
      msg = replaceAll(msg, '&amp;lt;', "<");
      msg = replaceAll(msg, '&amp;gt;', ">");
      var matches = msg.match(/\[.*?\]/g);
      if (matches){
        matches.forEach(function (element) {
          var value = data[(element.replace(/[\[\]']/g, '')).toLowerCase()];
          msg = msg.replace(element, !value ? '' : value);
        });
      }
      return msg;
    }
    function replaceAll(str, find, replace) {
      return str.replace(new RegExp(find, 'g'), replace);
    }
  }
}());
