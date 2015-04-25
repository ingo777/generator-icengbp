///<reference path="../../../typings/angularjs/angular.d.ts"/>
///<reference path="../../../vendor/angular-ui-router/api/angular-ui-router.d.ts"/>
///<reference path="about.ctrl.ts"/>

module <%= projectName %>.app.about
{
  "use strict";

  export class AboutModule
  {
    static $injector = ["$stateProvider"];

    constructor(private $stateProvider: angular.ui.IStateProvider)
    {
      this.init();
    }

    private init(): void
    {
      this.$stateProvider.state("about", <angular.ui.IState>
      {
        url: "/about",
        views:
        {
          "main":
          {
            controller: AboutController,
            controllerAs: "about",
            templateUrl: "/src/app/about/about.tpl.html"
          }
        },
        data: {pageTitle: "About"}
      });
    }
  }
  angular.module("<%= projectName %>.app.about", ["ui.router"])
    .config(["$stateProvider", ($stateProvider: angular.ui.IStateProvider) => {
      return new AboutModule($stateProvider);
    }]);
}
