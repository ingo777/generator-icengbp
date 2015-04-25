(function(module) {
    'use strict';

    module.controller('<%= projectName %>.app.index.IndexController', function ($scope) {
        var index = this;
        var date = new Date();

        index.testValue = 'Testing value!';
        index.year = date.getFullYear();

        init();

        function init() {

        }

        index.test = function() {
            alert('Testing!');
        };
    });

}(angular.module('<%= projectName %>.app.index')));
