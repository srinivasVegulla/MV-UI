(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('countryService', Service);

  Service.$inject = ['logger' , '$q', '$http', 'translatorHelper'];

  function Service(logger, $q, $http, translatorHelper) {
    var _countryMetaDataInfo = {
          language : '' ,
          data : []
        };
    var service = {
          getMetadata : getMetadata
        };
    return service;

    function getMetadata (enumName) {
      var language =  translatorHelper.currentMetraNetLocale();
      if (enumName != undefined) {
        enumName = enumName;
      }
      var config = {params : { enum_name : enumName}};

      if (language != _countryMetaDataInfo.language) {
        var request = {
          method: 'GET',
          url: 'api/metadata/' + language,
          params : {
            enum_name: enumName,
          }
        }

        return $http(request).then(function (response) {
          _countryMetaDataInfo.language = language;
          _countryMetaDataInfo.language = language;
          _countryMetaDataInfo.data = response.data.metadataInfo;
          return _countryMetaDataInfo.data;
        })
        .catch(function (error){
          logger.log('app.core.countryService.getMetadata():', {
          error: error,
        });
       });
      } else {
        var deferred = $q.defer();
        deferred.resolve(_countryMetaDataInfo.data);
        return deferred.promise;
      }
    }
  }
 })();
