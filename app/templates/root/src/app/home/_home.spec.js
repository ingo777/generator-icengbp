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
            // How to load additional modules with services, directives, etc
            //bard.appModule('<%= projectName %>.app.home', '<%= projectName %>.common.services.service1');

            bard.inject('$controller', '$rootScope', 'logger');
            // How to inject above service
            //bard.inject('$controller', '$rootScope', 'service1');
            sinon.spy(logger, 'info');
        });

        beforeEach(function() {
            $scope = $rootScope.$new();
            HomeCtrl = $controller('<%= projectName %>.app.home.HomeController', {logger: logger});
            // How to inject service above into a controller
            //HomeCtrl = $controller('<%= projectName %>.app.home.HomeController', {service1: service1});
        });

        it('should have called logger.info', function() {
            expect(logger.info).to.have.been.calledOnce;
        });

        it('should have a dummy test', function() {
            expect(HomeCtrl).to.be.ok;
        });
    });
});
