(function (module) {
    'use strict';

    module.config(function ($stateProvider) {
        //$stateProvider.state('<%= folderAndFileName %>', {
        //    url: '/<%= subPath %><%= folderAndFileName %>',
        //    views: {
        //        'main': {
        //            controller: '<%= fullModuleName %>.<%= capitalModuleName %>Controller as <%= camelModuleName %>',
        //            templateUrl: '<%= modulePath %>/<%= folderAndFileName %>.tpl.html'
        //        }
        //    },
        //    data: {pageTitle: '<%= capitalModuleName %>'}
        //});
    });

}(angular.module('<%= fullModuleName %>', [
    'ui.router'
])));
