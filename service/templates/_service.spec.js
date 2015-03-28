describe('<%= camelModuleName %> section', function () {
    beforeEach(module('<%= fullModuleName %>'));

    it('should have a dummy test', inject(function() {
        expect(true).toBeTruthy();
    }));
});
