(function () {
    'use strict';

    angular.module('<%= fullModuleName %>', ['ui.router'])
        .config(config);

    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) { }
})();
