/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating 'src' and 'test' directories. Additionally, the
 * build process will exclude all '.spec.js' files from the build
 * automatically.
 */
/* jshint -W117, -W030 */
describe('home section', function () {
    describe('isCurrentUrl', function () {
        var HomeCtrl, $scope;

        beforeEach(function() {
            bard.appModule('<%= projectName %>.app.home');
            bard.inject('$controller', '$rootScope');
        });

        beforeEach(function() {
            $scope = $rootScope.$new();
            HomeCtrl = $controller('<%= projectName %>.app.home.HomeController', {$scope: $scope});
        });

        it('should have a dummy test', function() {
            expect(HomeCtrl).to.be.ok;
        });
    });
});
