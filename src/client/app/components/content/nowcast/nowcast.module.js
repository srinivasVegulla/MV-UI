/**
 * COPYRIGHT (c) Ericsson AB 2016. The copyright to the computer program(s) herein is the property
 * of Ericsson Inc. The programs may be used and/or copied only with written permission from
 * Ericsson Inc. or in accordance with the terms and conditions stipulated in the agreement/contract
 * under which the program(s) have been supplied.
 */
(function() {
    'use strict';

    /**
     * @ngdoc overview
     * @name ecb nowcast
     * @description
     * # decision state display
     *
     */
    angular
        .module('app.nowcast', [
            'app.core',
        ])
        .config(Config)
        .run(appRun);

    Config.$inject = [
        '$compileProvider',
    ];

    /* @ngInject */
    function Config($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|chrome-extension):/);
    };

    appRun.$inject = [
        'translatorHelper',
    ];

    function appRun(translatorHelper) {
        translatorHelper.addPart('nowCast');
    }

})();
