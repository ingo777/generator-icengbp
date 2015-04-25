/* jshint -W117, -W030 */
describe('<%= camelModuleName %> section', function () {
    describe('isCurrentUrl', function () {
        var <%= capitalModuleName %>Drv, $scope;

        beforeEach(function() {
            bard.appModule('<%= fullModuleName %>');
            bard.inject('$compile', '$rootScope');
        });

        beforeEach(function() {
            $scope = $rootScope.$new();
        });

        it('should have a dummy test', function () {
            expect(true).to.be.ok;
        });
    });
});
