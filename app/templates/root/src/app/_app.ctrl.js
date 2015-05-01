(function(app) {
    'use strict';

    app.controller('<%= projectName %>.app.AppController', App);

    App.$inject = ['$scope'];
    /* @ngInject */
    function App($scope) { }

}(angular.module('<%= projectName %>')));
