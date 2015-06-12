///<reference path="../../../typings/angularjs/angular.d.ts"/>
///<reference path="../../../vendor/angular-ui-router/api/angular-ui-router.d.ts"/>
///<reference path="home.ctrl.ts"/>
module <%= projectName %>.app.home {
    "use strict";

    export class HomeModule {
        static $inject: Array<string> = ["$stateProvider"];

        /* @ngInject */
        constructor(private $stateProvider:angular.ui.IStateProvider) {
            this.init();
        }

        private init():void {
            this.$stateProvider.state("home", <angular.ui.IState> {
                url: "/home",
                views: {
                    "main": {
                        controller: HomeController,
                        controllerAs: "home",
                        templateUrl: "/src/app/home/home.tpl.html"
                    }
                },
                data: {pageTitle: "Home"}
            });
        }
    }
    angular.module("<%= projectName %>.app.home", ["ui.router"])
        .config(["$stateProvider", ($stateProvider:angular.ui.IStateProvider) => { /* @ngInject */
            return new HomeModule($stateProvider);
        }]);
}

