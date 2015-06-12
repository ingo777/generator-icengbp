/* jshint -W117, -W030 */
describe('AppController', function () {
    describe('isCurrentUrl', function () {
        var AppCtrl, $location, $scope;

        beforeEach(function() {
            bard.appModule('<%= projectName %>', 'blocks.logger');
            bard.inject('$controller', '$location', '$rootScope', 'logger');
        });

        beforeEach(function() {
            $scope = $rootScope.$new();
            AppCtrl = $controller('<%= projectName %>.app.AppController', {$location: $location, $scope: $scope});
        });

        it('should pass a dummy test', function() {
            expect(AppCtrl).to.be.ok;
        });
    });
});
