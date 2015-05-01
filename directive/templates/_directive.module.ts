 ///<reference path="<%= pathBackToRoot %>typings/angularjs/angular.d.ts"/>
///<reference path="<%= pathBackToRoot %>vendor/angular-ui-router/api/angular-ui-router.d.ts"/>
///<reference path="<%= folderAndFileName %>.drv.ts"/>

module <%= fullModuleName %>
{
    "use strict";

    export class <%= capitalModuleName %>Module
    {
        static $inject /*:angular.auto.IInjectorService */ = ["$stateProvider", "$parse"];

        constructor(private $stateProvider: angular.ui.IStateProvider, $parse: angular.IParseProvider)
        {
            this.init();
        }

        private init(): void
        {
            this.$stateProvider.state("<%= folderAndFileName %>", <angular.ui.IState>
            {
            });
        }
    }
    angular.module("<%= fullModuleName %>", ["ui.router"])
        .config(["$stateProvider", ($stateProvider: angular.ui.IStateProvider, $parse: angular.IParseProvider) => {
            return new <%= capitalModuleName %>Module($stateProvider, $parse);
        }]);
}
