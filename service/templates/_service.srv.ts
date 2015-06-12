/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * 'src/app/home', however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a 'note' section could have the submodules 'note.create',
 * 'note.delete', 'note.edit', etc.
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

    export interface I<%= capitalModuleName %> {
        test: string;
        testing(): void;
    }

    export class <%= capitalModuleName %> {
        noOfTests: number;
        test: string;

        static $inject: Array<string> = ["$parse", "$http", "$location"];

        /* @ngInject */
        constructor(private $parse:angular.IParseProvider, private $http: angular.IHttpService, private $location: angular.ILocationService) {
            this.noOfTests = 0;
            this.test = "Never tested";
        }

        private init(): void { }

        testing(): void {
            this.noOfTests++;
            this.test = "Tested " + this.noOfTests + " times!";
        }


        public static Factory() {
            var factory = (
                $parse: angular.IParseProvider,
                $http: angular.IHttpService,
                $location: angular.ILocationService) => {

                /* @ngInject */
                return new <%= capitalModuleName %>($parse, $http, $location);
            };

            factory["$inject"] = ["$parse", "$http", "$location"];

            return factory;
        }

        private destruct():void {
        }
    }

    angular.module("<%= fullModuleName %>")
        .factory("<%= camelModuleName %>", <%= capitalModuleName %>.Factory());
}
