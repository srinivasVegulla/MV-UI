(function() {
  'use strict';

  angular
    .module('app.layout.card')
    .directive('ecbLayoutCard', Directive);

  Directive.$inject = [];

  /* @ngInject */
  function Directive() {
    var directive = {
      restrict: 'E',
      transclude: {
        actions: '?button',
        content: 'div',
      },
      replace: true,
      scope: {
        headerText: '@',
        contentCssClass: '@',
      },
      controller: Controller,
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: 'app/components/layout/card/layout-card.html',
    };
    return directive;
  }

  Controller.$inject = [
    'logger',
  ];

  function Controller(logger) {
    /* jshint validthis: true */
    var vm = this;

    activate();

    function activate() {

      logger.log('app.layout.card.Controller.activate():', {
        vm: vm,
      });
    }
  }
})();
