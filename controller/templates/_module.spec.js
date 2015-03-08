describe('<%= camelModuleName %> section', function () {
    beforeEach(module('<%= moduleName %>'));

    it('should have a dummy test', inject(function() {
        expect(true).toBeTruthy();
    }));
});
