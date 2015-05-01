(function() {
    'use strict';

    angular.module('<%= projectName %>')
        .controller('<%= projectName %>.app.AppController', App);

    App.$inject = ['$scope'];

    /* @ngInject */
    function App($scope) { }
})();
