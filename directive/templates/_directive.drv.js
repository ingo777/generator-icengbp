(function(module) {
    'use strict';

    module.directive('<%= camelModuleName %>', ['$parse', function ($parse) {
        return {
            scope: { // Isolated scopes
                // test: '@', one-way binding from a parent scope to the isolated scope. If parent changes the isolated scope will reflect that change but not the other way around
                // attribute: '=info': two-way binding between the attribute 'attribute' and the property 'info'
                // '&onClose': bind to an expression like a function call or something
            },
            restrict: 'EAC', // Element, Attribute, Class
            templateUrl: '<%= subPath %><%= folderAndFileName %>/<%= folderAndFileName %>.tpl.html',
            replace: true, // the content of the directive template will replace the element that the directive is declared on
            transclude: false, // does the directive contain other
            require: "", // or ["^myTabs", "^ngModel"] where the ^ means it looks for the controller on the parents, without it looks for the controller on just its own element
            link: function (scope, element, attrs) {

            },
            controller: function ($scope, $element) {

            }
        };
    }]);
}(angular.module("<%= fullModuleName %>")));
