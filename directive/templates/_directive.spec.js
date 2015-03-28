describe('<%= camelModuleName %> section', function () {
    describe('isCurrentUrl', function () {
        var <%= capitalModuleName %>Drv, $scope;

        beforeEach(module('<%= fullModuleName %>'));

        beforeEach(inject(function ($compile, $rootScope) {
            $scope = $rootScope.$new();
        }));

        it('should have a dummy test', inject(function () {
            expect(true).toBeTruthy();
        }));
    });
});
