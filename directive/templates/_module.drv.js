(function(module) {
    'use strict';

    module.directive('<%= camelModuleName %>', ['$parse', function ($parse) {
        return {
            restrict: 'EA',
            templateUrl: '<%= subPath %><%= name %>/<%= name %>.tpl.html',
            replace: true,
            link: function (scope, element, attrs) {

            },
            controller: function ($scope, $element) {
                var model = this;
            }
        };
    }]);
}(angular.module("<%= moduleName %>")));
