(function(module) {
    'use strict';

    module.config(function ($stateProvider) {
        $stateProvider.state('<%= name %>', {
            url: '/<%= subPath %>/<%= lowerModuleName %>',
            views: {
                "main": {
                    controller: '<%= capitalModuleName %>Controller as model',
                    templateUrl: '<%= subPath %>/<%= name %>/<%= name %>.tpl.html'
                }
            },
            data:{ pageTitle: '<%= capitalModuleName %>' }
        });
    });

}(angular.module("<%= moduleName %>", [
    'ui.router'
])));
