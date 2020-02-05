(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('userService', Service);

  Service.$inject = [
    'logger',
    '$http',
    'localStorageService',
    '$q',
    '$state'
  ];

  function Service(logger, $http, localStorageService, $q, $state) {
    var _namespace = '',
        _siteName = '',
        _commonConfigResponse = '',
      _user = {
        firstName: '',
        lastName: '',
        settings: {
          siteName: '',
          isSignUpEnable: false,
          site: {},
          billing: {
            billSettingId: '',
            inlineAdjustments: '',
            inlineTax: ''
          },
          theme: {},
        },
      };
    var _siteSettingsLoaded = false;
    var USER_SETTINGS_STORAGE_KEY = 'user.settings';
    var SERVICE_NAME = 'app.core.userService.';
    var service = {
      loadSiteSettings: loadSiteSettings,
      getUserSettings: getUserSettings,
      getNamespace: getNamespace,
      getSiteName: getSiteName,
      loadFromStorage: loadFromStorage,
      userSettings: _user.settings,
      layoutManagerSettings: layoutManagerSettings,
      getCommonConfigFile: getCommonConfigFile
    };

    return service;

    function loadSiteSettings(siteName) {
      _siteName = siteName;
      var request = {
        method: 'GET',
        url: 'api/metadata/sitesetting/' + siteName,
      };
      _siteSettingsLoaded = false;
      localStorageService.remove('authorizationData'); // Hack! This ensures that when the namespace changes that we clear any auth data in local storage. Which was causing an issue if the user was logged in and at the bashboard view, then changes the namespace in the url.
      return $http(request)
        .then(function (response) {
          var data = response.data.sitedata;
          // ToDo: Set language? Any issues with this, most likely, being a MetraNet locale value?
          // translatorHelper.changeLanguage(data.Culture);
          _user.settings.billing = {
            billSettingId: data.billSettingId,
            inlineAdjustments: data.inlineAdjustments,
            inlineTax: data.inlineTax,
          };
          _user.settings.site = {
            siteId: data.siteId,
            siteName: data.siteName,
            nameSpace: data.authenticationNamespace,
            isSiteDownForMaintenance: data.isSiteDownForMaintenance,
            logoImage: data.logoImage,
            physicalPath: data.physicalPath,
            theme: data.Theme,
          };
          _user.settings.isSignUpEnable = response.data.signupenable ? response.data.signupenable : false;
          _user.settings.siteName = _siteName;
          localStorageService.set(USER_SETTINGS_STORAGE_KEY, _user);
          _namespace = _user.settings.site.nameSpace;
          _siteSettingsLoaded = true;
          // Retreive theme properties json file from EXT-DATA.
          return $http.get('static/' + _siteName + '/branding/theme.properties.json')
            .then(function (response) {
              return setTheme(response.data);
            })
            .catch(function (error) {
              // Fallback to getting the default json file.
              return $http.get('static/default/branding/theme.properties.json')
                .then(function (response) {
                  return setTheme(response.data);
                })
                .catch(function (error) {
                  logger.log(SERVICE_NAME + 'loadSiteSettings(): Error getting DEFAULT theme properties json file!', {
                    error: error,
                  });
                  // Oh boy, if we made it this far then EXT-DATA is not setup correctly.
                  return setTheme({
                    applicationName: 'MetraView v2',
                    faviconName: 'ecb-favicon.ico',
                  });
                });
            });
        })
        .catch(function (error) {
          logger.log(SERVICE_NAME + 'loadSiteSettings(): Error!', {
            error: error,
          });
          if (error.status === 404 || error.status === 400) {
            $state.go('404');
          }
          return $q.reject(error);
        });
    }

    function getUserSettings() {
      if (_siteSettingsLoaded) {
        return returnPromise();
      } else {
        return loadSiteSettings(_siteName)
          .then(function (user) {
            return user;
          });
      }
    }

    function returnPromise() {
      var deferred = $q.defer();
      deferred.resolve(_user);
      return deferred.promise;
    }

    function getNamespace() {
      return _namespace;
    }

    function getSiteName() {
      return _siteName;
    }

    function layoutManagerSettings() {
      var layoutManagerResponse;
      return $http.get('static/' + _siteName + '/layoutManager/layoutManagerProperties.json')
        .then(function (response) {
          layoutManagerResponse = response.data;
         return layoutManagerResponse;
        }) .catch(function (error) {
              logger.log(SERVICE_NAME + 'layoutManagerSettings(): Error getting layout manager properties json file!', {
                error: error,
              });
              // Fallback to getting the default json file.
              return $http.get('static/default/layoutManager/layoutManagerProperties.json')
                .then(function (response) {
                  layoutManagerResponse = response.data;
                  return layoutManagerResponse;
                  })
                .catch(function (error) {
                  logger.log(SERVICE_NAME + 'layoutManagerSettings(): Error getting DEFAULT layout manager properties json file!', {
                    error: error,
                  });
                });
            });
    }

    function loadFromStorage() {
      if (_siteSettingsLoaded) {
        return;
      }
      _user = localStorageService.get(USER_SETTINGS_STORAGE_KEY);
      if (_user) {
        _siteName = _user.settings.siteName;
        _siteSettingsLoaded = true;
      }
      return _user;
    }

    function setTheme(data) {
      _user.settings.theme = {
        applicationName: data.applicationName,
        faviconName: data.faviconName,
      };
      localStorageService.set(USER_SETTINGS_STORAGE_KEY, _user);
      return _user;
    }
    function getCommonConfigFile() {
      if(_commonConfigResponse){
        var deferred = $q.defer();
        deferred.resolve(_commonConfigResponse);
        return deferred.promise;
      }
      return $http.get('static/' + _siteName + '/commonConfig.json')
        .then(function (response) {
          _commonConfigResponse = response.data;
          return _commonConfigResponse;
        }).catch(function (error) {
          logger.log(SERVICE_NAME + 'getCommonConfigFile(): Error getting commonConfig json file!', {
            error: error,
          });
          // Fallback to getting the default json file.
          return $http.get('static/default/commonConfig.json')
            .then(function (response) {
              _commonConfigResponse = response.data;
              return _commonConfigResponse;
            })
            .catch(function (error) {
              logger.log(SERVICE_NAME + 'getCommonConfigFile(): Error getting DEFAULT commonConfig json file!', {
                error: error,
              });
            });
        });
    }
  }
})();
