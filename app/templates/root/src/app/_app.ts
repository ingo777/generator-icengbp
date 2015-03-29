///<reference path="../../typings/angularjs/angular.d.ts"/>
///<reference path="../../vendor/angular-ui-router/api/angular-ui-router.d.ts"/>
module <%= projectName %>.app {
    'use strict';

    export class AppConfig {
        static $injector = ["$stateProvider", "$urlRouterProvider"];

        constructor(private $stateProvider:angular.ui.IStateProvider,
                    private $urlRouterProvider:angular.ui.IUrlRouterProvider) {
            $urlRouterProvider.otherwise('/home');
        }
    }

    export class AppRun {
        foo:string;

        constructor() {
            this.foo = "Yada";
        }
    }

    export class AppController {
        static $injector = ["$scope"];
        vm = this;

        constructor($scope:angular.IScope) {

        }
    }

    angular.module("<%= projectName %>", [
        'templates-app',
        'templates-common',
        'ui.router.state',
        'ui.router',
        'ui.bootstrap',
        'ngMessages',
        'ngResource',
        '<%= projectName %>.app.home',
        '<%= projectName %>.app.about',
        '<%= projectName %>.app.index',
    ]).config(["$stateProvider", "$urlRouterProvider", ($stateProvider:angular.ui.IStateProvider,
                                                        $urlRouterProvider:angular.ui.IUrlRouterProvider) => {
        return new AppConfig($stateProvider, $urlRouterProvider);
    }]).run(() => {
        return new AppRun();
    }).controller("<%= projectName %>.app.AppController", AppController);
}
