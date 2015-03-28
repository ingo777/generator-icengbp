(function(app) {

    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
    });

    app.run(function () {});

    app.controller('<%= projectName %>.app.AppController', function ($scope) {

    });

}(angular.module("<%= projectName %>", [
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

])));
