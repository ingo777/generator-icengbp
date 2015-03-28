/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating 'src' and 'test' directories. Additionally, the
 * build process will exclude all '.spec.js' files from the build
 * automatically.
 */
describe('home section', function () {
    describe('isCurrentUrl', function () {
        var HomeCtrl, $scope;

        beforeEach(module('<%= projectName %>.app.home %>'));

        beforeEach(inject(function ($controller, $rootScope) {
            $scope = $rootScope.$new();
            HomeCtrl = $controller('<%= projectName %>.app.home.HomeController %>', {$scope: $scope});
        }));

        it('should have a dummy test', inject(function () {
            expect(HomeCtrl).toBeTruthy();
        }));
    });
});
