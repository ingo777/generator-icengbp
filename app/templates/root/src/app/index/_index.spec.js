/* jshint -W117, -W030 */
describe('index section', function () {
    describe('isCurrentUrl', function () {
        var IndexCtrl, $scope;

        beforeEach(function() {
            bard.appModule('<%= projectName %>.app.index');
            bard.inject('$controller', '$rootScope');
        });

        beforeEach(function() {
            $scope = $rootScope.$new();
            IndexCtrl = $controller('<%= projectName %>.app.index.IndexController', {$scope: $scope});
        });

        it('should have a dummy test', function() {
            expect(IndexCtrl).to.be.ok;
        });
    });
});
