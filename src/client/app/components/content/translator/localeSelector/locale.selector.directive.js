(function () {
    'use strict';

    /**
     * @ngdoc overview
     * @name ecb language locale selector
     * @description
     * # ecb language locale selector
     *
     * Language Locale Selector directive.
     * 
     * usage: <ecb-locale-selector></ecb-locale-selector>
    */
    angular
      .module('blocks.translator')
      .directive('ecbLocaleSelector', Directive);

    Directive.$inject = [
    ];

    /* @ngInject */
    function Directive() {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {},
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: 'app/components/content/translator/localeSelector/locale-selector.html',
        };
        return directive;
    }

    Controller.$inject = [
      'logger',
      'translatorHelper',
      'localeSelectorService',
      'userService'
    ];

    function Controller(logger, translatorHelper, localeSelectorService, userService) {
        /* jshint validthis: true */
        var vm = this;
        vm.changeLocale = translatorHelper.changeLanguage;
        vm.isSelected = isSelected;
        vm.checkIfEnterKeyWasPressed = checkIfEnterKeyWasPressed;
        vm.getFlagData = getFlagData;
        vm.siteName = getSiteName;
        vm.firstElement = true;

        activate();

        function activate() {
            var siteName = vm.siteName();
            vm.getFlagData(siteName);
        }

        function isSelected(localeKey, langDirection) {
          if(vm.firstElement){
            vm.firstElement = false;
            vm.changeLocale(localeKey, langDirection)
            return (localeKey === translatorHelper.currentLanguage());
          }
          else
            return (localeKey === translatorHelper.currentLanguage());
        }

      function checkIfEnterKeyWasPressed($event, language, langDirection) {
          var keyCode = $event.which || $event.keyCode;
          if (keyCode === 13) {
            vm.changeLocale(language, langDirection);
          }
        }

        function getFlagData(siteName) {
          localeSelectorService.getLocaleFlagsData(siteName).then(function(response) {
            vm.localeFlagData = angular.copy(response.data);
            vm.flagLocationFolder = siteName;
          }).catch(function(err) {
            if (err.status === 404) {
              getFlagData('default');
              logger.log('blocks.translator.LocaleSelector.Controller.getFlagData():', {
                error: err
            });
            }
          });
        }

        function getSiteName() {
          var validSiteName = userService.getSiteName();
          if (!validSiteName) {
           validSiteName = 'default';
          }
          return validSiteName;
        }
    }
})();
