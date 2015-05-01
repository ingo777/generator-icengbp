(function () {
    'use strict';

    angular.module('<%= fullModuleName %>', ['ui.router'])
        .config(config);

    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config($stateProvider) {
        $stateProvider.state('<%= folderAndFileName %>', {
            url: '/<%= subPath %><%= folderAndFileName %>',
            views: {
                'main': {
                    controller: '<%= fullModuleName %>.<%= capitalModuleName %>Controller as <%= camelModuleName %>',
                    templateUrl: '<%= moduleUrlPath %>/<%= folderAndFileName %>.tpl.html'
                }
            },
            data: {
                pageTitle: '<%= capitalModuleName %>'
            },
            resolve: {
                // You the need to inject the greeting and promiseObj into the controller to get
                // access to the data.
                // More info on https://github.com/angular-ui/ui-router/wiki#resolve
                //greeting: greeting,
                //promiseObj: promiseObj
            }
        });

        // Example showing returning of custom made promise.
        greeting.$inject = ['$q', '$timeout'];
        /* @ngInject */
        function greeting($q, $timeout) {
            var deferred = $q.defer();

            $timeout(function() {
                deferred.resolve('Hello!');
            }, 1000);

            return deferred.promise;
        }

        // Another promise example. If you need to do some
        // processing of the result, use .then, and your
        // promise is chained in for free. This is another
        // typical use case of resolve.
        promiseObj.$inject = ['$http'];
        /* @ngInject */
        function promiseObj($http) {
            return $http({method: 'GET', url: '/someUrl'})
                .then(function (data) {
                    return doSomeStuffFirst(data);
                });
        }
        function doSomeStuffFirst(data) {

        }
    }
})();
