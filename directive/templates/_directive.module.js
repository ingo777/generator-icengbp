(function (module) {
    'use strict';

    module.config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
    }

}(angular.module('<%= fullModuleName %>', [
    'ui.router'
])));
