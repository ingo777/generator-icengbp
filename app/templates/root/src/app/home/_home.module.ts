///<reference path="../../../typings/angularjs/angular.d.ts"/>
///<reference path="../../../vendor/angular-ui-router/api/angular-ui-router.d.ts"/>
///<reference path="home.ctrl.ts"/>
module <%= projectName %>.app.home
{
  "use strict";

  export class HomeModule
  {
    static $injector = ["$stateProvider"];

    constructor(private $stateProvider: angular.ui.IStateProvider)
    {
      this.init();
    }

    private init(): void
    {
      this.$stateProvider.state("home", <angular.ui.IState>
      {
        url: "/home",
        views:
        {
          "main":
          {
            controller: HomeController,
            controllerAs: "vm",
            templateUrl: "home/home.tpl.html"
          }
        },
        data: {pageTitle: "Home"}
      });
    }
  }
  angular.module("<%= projectName %>.app.home", ["ui.router"])
    .config(["$stateProvider", ($stateProvider: angular.ui.IStateProvider) => {
      return new HomeModule($stateProvider);
    }]);
}

