///<reference path="../../../typings/angularjs/angular.d.ts"/>
///<reference path="../../../vendor/angular-ui-router/api/angular-ui-router.d.ts"/>
///<reference path="index.ctrl.ts"/>

module <%= projectName %>.app.index
{
    "use strict";

    export class IndexModule
    {
        static $injector = ["$stateProvider"];

        constructor(private $stateProvider: angular.ui.IStateProvider)
        {
            this.init();
        }

        private init(): void
        {
            this.$stateProvider.state("index", <angular.ui.IState>
            {
                url: "/index",
                views:
                {
                    "main":
                    {
                        controller: IndexController,
                        controllerAs: "index"
                        //templateUrl: "/src/app/index/index.tpl.html"
                    }
                },
                data: {pageTitle: "Index"}
            });
        }
    }
    angular.module("<%= projectName %>.app.index", ["ui.router"])
        .config(["$stateProvider", ($stateProvider: angular.ui.IStateProvider) => {
            return new IndexModule($stateProvider);
        }]);
}
