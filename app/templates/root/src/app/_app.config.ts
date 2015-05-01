///<reference path="../../typings/angularjs/angular.d.ts"/>
module <%= projectName %>.app
{
    "use strict";

    export class AppConfig
    {
        static $inject = ["$stateProvider", "$urlRouterProvider"];

        constructor(private $stateProvider:angular.ui.IStateProvider,
                    private $urlRouterProvider:angular.ui.IUrlRouterProvider) {
            $urlRouterProvider.otherwise("/home");
        }
    }
    angular.module("<%= projectName %>")
        .config(["$stateProvider", "$urlRouterProvider", ($stateProvider:angular.ui.IStateProvider,
                                                        $urlRouterProvider:angular.ui.IUrlRouterProvider) => {
        return new AppConfig($stateProvider, $urlRouterProvider);
    }]);
}
