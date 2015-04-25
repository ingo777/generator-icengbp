/* jshint -W117, -W030 */
describe('<%= camelModuleName %> section', function () {
    describe('isCurrentUrl', function () {
        var <%= capitalModuleName %>Ctrl, $scope;

        beforeEach(function() {
            bard.appModule('<%= fullModuleName %>');
            bard.inject('$controller', '$rootScope');
        });

        beforeEach(function() {
            $scope = $rootScope.$new();
            <%= capitalModuleName %>Ctrl = $controller('<%= fullModuleName %>.<%= capitalModuleName %>Controller', {$scope: $scope});
        });

        it('should have a dummy test', function () {
            expect(<%= capitalModuleName %>Ctrl).to.be.ok;
        });
    });
});
