describe('<%= camelModuleName %> section', function () {
    describe('isCurrentUrl', function () {
        var <%= capitalModuleName %>Ctrl, $scope;

        beforeEach(module('<%= fullModuleName %>'));

        beforeEach(inject(function ($controller, $rootScope) {
            $scope = $rootScope.$new();
            <%= capitalModuleName %>Ctrl = $controller('<%= fullModuleName %>.<%= capitalModuleName %>Controller', {$scope: $scope});
        }));

        it('should have a dummy test', inject(function () {
            expect(<%= capitalModuleName %>Ctrl).toBeTruthy();
        }));
    });
});
