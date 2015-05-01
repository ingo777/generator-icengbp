(function() {
    'use strict';

    angular.module('<%= fullModuleName %>')
        .directive('<%= camelModuleName %>', <%= camelModuleName %>);

    <%= camelModuleName %>.$inject = ['$parse'];

    /* @ngInject */
    function <%= camelModuleName %>($parse) {
        var directive = {
            // Isolated scopes
            scope: {
                // test: '@', one-way binding from a parent scope to the isolated scope.
                // If parent changes the isolated scope will reflect that change but not the other way around
                // attribute: '=info': two-way binding between the attribute 'attribute' and the property 'info'
                // '&onClose': bind to an expression like a function call or something
            },
            // Element, Attribute, Class
            restrict: 'EAC',
            templateUrl: '<%= moduleUrlPath %>/<%= folderAndFileName %>.tpl.html',
            // the content of the directive template will replace the element that the directive is declared on
            replace: true,
            // does the directive contain other
            transclude: false,
            // or ['^myTabs', '^ngModel'] where the ^ means it looks for the controller
            // on the parents, without it looks for the controller on just its own element
            require: '',
            bindToController: false, // true if it's a isolated scope
            controllerAs: 'vm', // use the "controller as" syntax

            link: linkFunc,
            controller: <%= capitalModuleName %>Controller
        };

        /**
         * Here comes the function definitions
         */
        function linkFunc(scope, element, attrs, vm) {
            // Because we use the "controller as" syntax, all scope
            // properties are located in "scope.vm", or use can use the
            // "vm" parameter directly
            element.on('mouseenter', mouseEnter);
            scope.$on('$destroy', destruct);
            element.on('mouseleave', mouseLeave);

            function mouseEnter() {
                console.log('mouseenter');
            }
            function mouseLeave() {
                console.log('vm from link function: ' + vm.test);
            }
            function destruct() {
                console.log('destruct');
            }
        }

        return directive;
    }

    /**
     * Note: Note that the directive's controller is outside the directive's closure.
     * This style eliminates issues where the injection gets created as unreachable code after a return.
     */
    <%= capitalModuleName %>Controller.$inject = ['$scope', '$element', '$attrs'];

    /* @ngInject */
    function <%= capitalModuleName %>Controller($scope, $element, $attrs) {
        var vm = this;

        vm.test = 'Directive link never tested';
        vm.noOfClicks = 0;
        vm.testing = testing;

        function testing() {
            vm.noOfClicks++;
            vm.test = 'Directive link tested ' + vm.noOfClicks + ' times';
        }
    }
})();
