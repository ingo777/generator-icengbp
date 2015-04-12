(function(module) {
    'use strict';

    module.config(function ($stateProvider) {
        $stateProvider.state('index', {
            url: '/',
            views: {
                'main': {
                    controller: '<%= projectName %>.app.index.IndexController as indexViewModel'
                    //templateUrl: 'index/index.tpl.html'
                }
            },
            data: {pageTitle: 'Index'}
        });
    });

}(angular.module('<%= projectName %>.app.index', [
    'ui.router'
])));
