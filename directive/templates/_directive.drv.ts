/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * "src/app/home", however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a "note" section could have the submodules "note.create",
 * "note.delete", "note.edit", etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * This solution is based on Aaron Holmes great article at:
 * http://aholmes.azurewebsites.net/writing-angularjs-directives-as-typescript-classes/
 */
///<reference path="<%= pathBackToRoot %>typings/angularjs/angular.d.ts"/>

module <%= fullModuleName %> {
    "use strict";

    export interface I<%= capitalModuleName %>Scope extends angular.IScope
    {
        test: string;
        testing(): void;
    }

    export class <%= capitalModuleName %>
    {
        private test: string;
        private noOfClicks: number;
        private testing: Function;

        public scope = { // Isolated scopes
            // test: "@", one-way binding from a parent scope to the isolated scope.
            // If parent changes the isolated scope will reflect that change but not the other way around
            // attribute: "=info": two-way binding between the attribute 'attribute' and the property 'info'.
            // "&onClose": bind to an expression like a function call or something
        };
        // Restrict to Element, Attribute, Class
        public restrict = "EAC";
        // Directive setup
        public templateUrl = "<%= moduleUrlPath %>/<%= folderAndFileName %>.tpl.html";
        // the content of the directive template will replace the element that the directive is declared on
        public replace = true;
        // enables you to write other HTML stuff inside of the directive. Use with ng-transclude in the tag
        public transclude = false;
        // or ["^myTabs", "^ngModel"] where the ^ means it looks for the controller on the parents, without
        // it looks for the controller on just its own element
        public require = "";
        // use the "controller as" syntax
        public controllerAs = "vm";
        // true if it's a isolated scope
        public bindToController = false;

        constructor(private $parse:angular.IParseProvider)
        {
        }

        // Use fat arrow to get "this" object to work
        link = (scope: I<%= capitalModuleName %>Scope,
                element: angular.IAugmentedJQuery,
                attrs: angular.IAttributes,
                ctrl: angular.IControllerService) =>
        {
            element.on("mouseenter", this.mouseEnter);
            scope.$on("$destroy", this.destruct);
        };

        // No fat arrow here because we want a new "this" object for the controller
        controller(): void
        {
            var vm = this;
            vm.test = "Directive link never tested";
            vm.noOfClicks = 0;

            vm.testing = function ()
            {
                vm.noOfClicks++;
                vm.test = "Directive link tested " + vm.noOfClicks + " times";
            };
        }

        public static Factory()
        {
            var directive = ($parse: angular.IParseProvider) =>
            {
                return new <%= capitalModuleName %>($parse);
            };

            directive["$inject"] = ["$parse"];

            return directive;
        }

        private mouseEnter(): void
        {
            console.log("mouseenter");
        }

        private destruct(): void
        {
            console.log("destruct");
        }
    }

    angular.module("<%= fullModuleName %>")
        .directive("<%= camelModuleName %>", <%= capitalModuleName %>.Factory());
}
