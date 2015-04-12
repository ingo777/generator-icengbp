/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating 'src' and 'test' directories. Additionally, the
 * build process will exclude all '.spec.js' files from the build
 * automatically.
 */
///<reference path="<%= folderAndFileName %>.ctrl.ts" />
///<reference path="<%= folderAndFileName %>.module.ts" />
///<reference path="<%= pathBackToRoot %>typings/jasmine/jasmine.d.ts" />
///<reference path="<%= pathBackToRoot %>typings/angularjs/angular-mocks.d.ts" />

describe("<%= camelModuleName %> section", () => {
    describe("isCurrentUrl", () => {
        var <%= capitalModuleName %>Ctrl, $scope;

        beforeEach(module("<%= fullModuleName %>"));

        beforeEach(inject(($controller, $rootScope) => {
            $scope = $rootScope.$new();
            <%= capitalModuleName %>Ctrl = $controller("<%= fullModuleName %>.<%= capitalModuleName %>Controller", {$scope: $scope});
        }));

        it("should have a dummy test", inject(function () {
            expect(<%= capitalModuleName %>Ctrl).toBeTruthy();
        }));

        it("should have a dummy test", inject(() => {
            expect(true).toBeTruthy();
        }));
    });
});
