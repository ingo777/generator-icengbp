(function() {
    'use strict';

    angular.module('<%= fullModuleName %>')
        .factory('<%= camelModuleName %>', <%= camelModuleName %>);

    <%= camelModuleName %>.$inject = ['$http'];

    /* @ngInject */
    function <%= camelModuleName %>($http) {
        var noOfTests = 0;

        var service = {
            test: 'Never tested',
            testing: testing
        };

        return service;

        /**
         * Here comes the function definitions
         */
        function testing() {
            noOfTests++;
            service.test = 'Tested ' + noOfTests + ' times!';
        }
    }
})();
