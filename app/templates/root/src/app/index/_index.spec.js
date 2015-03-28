describe('index section', function () {
    describe('isCurrentUrl', function () {
        var IndexCtrl, $scope;

        beforeEach(module('<%= projectName %>.app.index'));

        beforeEach(inject(function ($controller, $rootScope) {
            $scope = $rootScope.$new();
            IndexCtrl = $controller('<%= projectName %>.app.index.IndexController', {$scope: $scope});
        }));

        it('should have a dummy test', inject(function () {
            expect(IndexCtrl).toBeTruthy();
        }));
    });
});
