(function(app) {
    var AboutViewModel = {
        test: "Test string from AboutViewModel"
    };

    app.controller('<%= projectName %>.app.about.AboutController', function ($scope) {
        var vm = this;
        vm.time = new Date().toTimeString();
        vm.someObject = AboutViewModel;
        this.time = new Date().toTimeString();

        init();

        function init() {
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            //  writing any code outside of this function that executes immediately.
            $scope.foobar = "Yada yada";
        }

    });
}(angular.module("<%= projectName %>.app.about")));
