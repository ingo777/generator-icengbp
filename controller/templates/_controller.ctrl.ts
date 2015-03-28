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
 */
///<reference path="<%= pathBackToRoot %>typings/angularjs/angular.d.ts"/>

module <%= fullModuleName %>
{
    'use strict';

    export interface I<%= capitalModuleName %>Scope extends angular.IScope
    {

    }

    export class <%= capitalModuleName %>Controller
    {
        static $injector = ["$scope"];

        constructor(private $scope: I<%= capitalModuleName %>Scope)
        {
            this.init();
        }

        private init(): void
        {
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            // writing any code outside of this function that executes immediately.
        }
    }

    angular.module("<%= fullModuleName %>")
        .controller("<%= fullModuleName %>.<%= capitalModuleName %>Controller", <%= capitalModuleName %>Controller);
}
