///<reference path="../../../typings/jasmine/jasmine.d.ts" />
///<reference path="../../../typings/angularjs/angular-mocks.d.ts" />
///<reference path="index.ctrl.ts" />
///<reference path="index.module.ts" />

/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating 'src' and 'test' directories. Additionally, the
 * build process will exclude all '.spec.js' files from the build
 * automatically.
 */
describe("index section", () => {
    beforeEach(angular.mock.module('<%= projectName %>.app.index'));

    it("should have a dummy test", inject(() => {
        expect(true).toBeTruthy();
    }));
});
