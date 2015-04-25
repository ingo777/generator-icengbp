/* jshint -W117, -W030 */
describe('<%= camelModuleName %> section', function () {
    beforeEach(function() {
        bard.appModule('<%= fullModuleName %>');
        bard.inject('$http', '$q');
    });

    it('should have a dummy test', function () {
        expect(true).to.be.ok;
    });
});
