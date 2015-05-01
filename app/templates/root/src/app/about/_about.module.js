(function(module) {
    module.config(config);

    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider.state('about', {
            url: '/about',
            views: {
                'main': {
                    controller: '<%= projectName %>.app.about.AboutController as about',
                    templateUrl: '/src/app/about/about.tpl.html'
                }
            },
            data: {pageTitle: 'About'}
        });
    }
}(angular.module('<%= projectName %>.app.about', [
    'ui.router'
])));
