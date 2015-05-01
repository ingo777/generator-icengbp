/**
 * Each module has a <moduleName>.module.js file.  This file contains the angular module declaration -
 * angular.module("moduleName", []);
 * The build system ensures that all the *.module.js files get included prior to any other .js files, which
 * ensures that all module declarations occur before any module references.
 */
(function(module) {

    module.config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider.state('home', {
            url: '/home',
            views: {
                'main': {
                    controller: '<%= projectName %>.app.home.HomeController as home',
                    templateUrl: '/src/app/home/home.tpl.html'
                }
            },
            data: {pageTitle: 'Home'}
        });
    }

    // The name of the module, followed by its dependencies (at the bottom to facilitate enclosure)
}(angular.module('<%= projectName %>.app.home', [
    'ui.router'
])));
