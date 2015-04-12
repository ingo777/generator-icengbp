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
        private noOfClicks: number;

        // Directive setup
        public templateUrl = "<%= subPath %><%= folderAndFileName %>/<%= folderAndFileName %>.tpl.html";
        public scope = { // Isolated scopes
            // test: "@", one-way binding from a parent scope to the isolated scope. If parent changes the isolated scope will reflect that change but not the other way around
            // attribute: "=info": two-way binding between the attribute 'attribute' and the property 'info'.
            // "&onClose": bind to an expression like a function call or something
        };
        public replace = true; // the content of the directive template will replace the element that the directive is declared on
        public restrict = "EAC"; // Restrict to Element, Attribute, Class
        public transclude = false; // enables you to write other HTML stuff inside of the directive. Use with ng-transclude in the tag
        public require = ""; // or ["^myTabs", "^ngModel"] where the ^ means it looks for the controller on the parents, without it looks for the controller on just its own element

        public link: (scope: I<%= capitalModuleName %>Scope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes) => void;

        constructor(private $parse:angular.IParseProvider)
        {
            this.noOfClicks = 0;

            this.link = (scope: I<%= capitalModuleName %>Scope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes) =>
            {
                scope.test = "Testing, testing";

                scope.testing = () =>
                {
                    scope.test = "Has tested " + ++this.noOfClicks + " times!";
                };

                scope.$on("$destroy", this.destruct);
            };
        }

        public static Factory()
        {
            var directive = ($parse) =>
            {
                return new <%= capitalModuleName %>($parse);
            };

            directive["$inject"] = ["$parse"];

            return directive;
        }

        private destruct():void
        {
        }
    }

    angular.module("<%= fullModuleName %>")
        .directive("<%= camelModuleName %>", <%= capitalModuleName %>.Factory());
}
