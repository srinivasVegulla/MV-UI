(function() {
  'use strict';

  angular
    .module('app.security')
    .factory('authenticationService', Service);

  Service.$inject = [
    'logger',
    '$filter',
    '$http',
    'localStorageService',
    '$state',
    '$httpParamSerializer',
    '$location',
    'Idle'
  ];

  /* @ngInject */
  function Service(logger, $filter, $http, localStorageService, $state, $httpParamSerializer, $location, Idle) {
    var _authentication = {
        isAuthenticated: false,
        accessToken: '',
        refreshToken: '',
        userName: '',
        tokenExpireDate: null,
        userInfo: {},
        namespace: '',
      },
      _path, _querystringParams, _addPayNowCheck,_saveChecked;
    // Public API
    var service = {
      isAuthenticated: isAuthenticated,
      authentication: getAuthentication,
      onStateChangeStartHandler: onStateChangeStartHandler,
      authenticateForm: authenticateForm,
      authenticateTicket: authenticateTicket,
      revoke: revokeAuthentication,
      showWelcomeMessage: true,
      idleTimeoutHandler: idleTimeoutHandler,
      removeLocalStorage: removeLocalStorage,
      getPayeeDetails: getPayeeDetails
    };

    return service;

    function getAuthentication() {
      return _authentication;
    }

    function isAuthenticated() {
      return _authentication.isAuthenticated;
    }

    function fillAuthData() {
      var authData = localStorageService.get('authorizationData');
      if (authData) {
        _authentication = {
          isAuthenticated: true,
          accessToken: authData.accessToken,
          refreshToken: authData.refreshToken,
          userName: authData.userName,
          tokenExpireDate: authData.tokenExpireDate,
          userInfo: authData.userInfo,
          namespace: authData.namespace,
        };
        Idle.watch();
      }
    }

    function onStateChangeStartHandler(event, toState, toParams, fromState, fromParams, options) {

      // Check storage for auth data.
      if (!_authentication.isAuthenticated) {
        fillAuthData();
      }

      if ((toState.name != 'login' && toState.name != 'signUp' && toState.name != 'expiredPassword' && toState.name != 'setpassword' && toState.name != '401' && toState.name != '404') && !_authentication.isAuthenticated) {
        // ToDo: Check if access token has expired. If so, then use refresh token get to a new access token.
        event.preventDefault();
        // ToDo: Add fromState.name to a returnState property.
        $state.go('login');
      }
      if (_authentication.isAuthenticated) {
        if (toState.name == 'login' || toState.name == 'signUp') {
          event.preventDefault();
          $state.go('dashboard');
        }else if(toState.name == 'setpassword'){
          event.preventDefault();
          $state.go('setpassword');
        }
        _path = $location.path();
        if (_path && _path != '/') {
          _querystringParams = $location.search();
          if (_querystringParams.decision == 'success') {
            logger.success('Transaction Success.');
            _addPayNowCheck = localStorageService.get("addCardPayNow");
            _saveChecked = localStorageService.get("saveChecked");
            if(_addPayNowCheck){
                localStorageService.set('transactionSuccess', true);
            }else if(_saveChecked){
              localStorageService.set('oneTimePayment', true);
              var oneTimeConfirmation = _querystringParams[';confirmationnumber'];
              var oneTimeCardType = _querystringParams[';method'];
              localStorageService.set('oneTimeConfirmation', oneTimeConfirmation);
              localStorageService.set('oneTimeCardType', oneTimeCardType);
            }
            $location.url($location.path());
          } else if (_querystringParams.decision == 'failure') {
            logger.warning('Please check the account details.');
            localStorageService.set('transactionFailure', true);
            removeLocalStorage();
            $location.url($location.path());
          } else if (_querystringParams.decision == 'cancelorder') {
            removeLocalStorage();
            logger.info(_querystringParams[';message']);
            removeLocalStorage();
            $location.url($location.path());
          }
        }
      }
    }

    function getAccountId(username,namespace) {
      var request = {
        method: 'GET',
        url: 'api/accounts/accountbyname',
        params: {
          username: username,
          namespace: namespace
        }
      }
      return $http(request)
        .then(function(response) {
          localStorageService.set("ecbarStatus", response.data.ecbarStatus);
          return response.data.accountId;
        })
        .catch(function(error) {
          logger.log('Error getting account Id.');
        });
    }

    function getMetraNetUserInfo(userName, siteName) {
      var request = {
        method: 'GET',
        url: 'api/metadata/sitesetting/' + siteName,
      };
      return $http(request)
        .then(function(response) {
          return response.data.sitedata;
        })
        .catch(function(error) {
          logger.log('Error getting user info.');
        });
    }


    function prepareAuthenticationRequestParameters(username, password) {
      return {
        client_id: 'clientapp', // ToDo: Make this dynamic.
        grant_type: 'password',
        username: username,
        password: password,
      };
    }

    function authenticateForm(formData, namespace, siteName) {
      _authentication.userName = formData.userName;
      var overiddenUsername = _.join(['normal', namespace, formData.userName], '/');
      var parameters = prepareAuthenticationRequestParameters(overiddenUsername, formData.password);
      return authenticate(parameters, namespace, siteName);
    };

    function authenticateTicket(ticketNumber, namespace, siteName, username) {
      _authentication.userName = username;
      var overiddenUsername = _.join(['ticket', namespace, username], '/');
      var parameters = prepareAuthenticationRequestParameters(overiddenUsername, ticketNumber);
      return authenticate(parameters, namespace, siteName);
    }

    function authenticate(requestParameters, namespace, siteName) {
      var request = {
        method: 'POST',
        url: 'oauth/token',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
        data: $httpParamSerializer(requestParameters),
      };
      return $http(request)
        .then(function(response) {
          localStorageService.set('authorizationData', {
            userName: _authentication.userName,
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            tokenExpireDate: new Date(new Date().getTime() + (1000 * response.data.expires_in)),
            userInfo: {},
            namespace: namespace,
          });

          return getMetraNetUserInfo(_authentication.userName, siteName)
            .then(function(result) {
              // ToDo: Need to clean up, multiple storage set calls.
              var authData = localStorageService.get('authorizationData');
              if (authData) {
                authData.userInfo = result;
                localStorageService.set('authorizationData', authData);
              }

              return getAccountId(_authentication.userName,namespace)
                .then(function(result) {
                  var authData = localStorageService.get('authorizationData');

                  if (authData) {
                    authData.userInfo.accountId = result;
                    localStorageService.set('authorizationData', authData);
                  }
                  fillAuthData();
                  return _authentication;
                })
                .catch(function (error) {
                  return _authentication;
                });
            });
        });
    }

    function revokeAuthentication() {
      // ToDo: Call revoke/logout endpoint on auth service.
      localStorageService.remove('authorizationData');
      localStorageService.remove('tabularSettings');
      localStorageService.remove('currencyConfig');
      localStorageService.remove('accountFilterData');
      localStorageService.remove('accountInformationData');
      _authentication = {
        isAuthenticated: false,
        accessToken: '',
        refreshToken: '',
        userName: "",
        tokenExpireDate: null,
        userInfo: {},
        namespace: '',
      };
    }

    function idleTimeoutHandler() {
      revokeAuthentication();
      removeLocalStorage();
      angular.element("body").attr("dir", "LTR");
      $state.go('login');
    };

    function removeLocalStorage(){
      localStorageService.remove('addCardPayNow');
      localStorageService.remove('addCardPayNowDate');
      localStorageService.remove('transactionSuccess');
      localStorageService.remove('oneTimePayment');
      localStorageService.remove('oneTimeConfirmation');
      localStorageService.remove('oneTimePaymentDate');
      localStorageService.remove('oneTimeCardType');
      localStorageService.remove('amountPayable');
      localStorageService.remove("saveChecked");
      localStorageService.remove("transactionFailure");
      localStorageService.remove("accountManagerAccountId");
      localStorageService.remove("accountManagerName");
      localStorageService.remove("selectedTimeInterval");
      localStorageService.remove("selectedIndex");
      localStorageService.remove("payeeSubscriber");
      localStorageService.remove('selectedCards');
      localStorageService.remove('userType');
      localStorageService.remove('currency');
      localStorageService.remove('invoicesLista');
      localStorageService.remove('totalInvoiceAmount');
      }

      function getPayeeDetails(accountId, activeUsernamespace) {
      var request = {
        method: 'GET',
        url: 'api/accounts/'+ accountId +'/payerandpayees?',
        params: {
          namespace: activeUsernamespace,
        },
      };
      return $http(request)
        .then(function(response) {
          return response;
        });
      }
  }
}());
