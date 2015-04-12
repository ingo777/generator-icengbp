/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating 'src' and 'test' directories. Additionally, the
 * build process will exclude all '.spec.js' files from the build
 * automatically.
 */
///<reference path="<%= folderAndFileName %>.srv.ts" />
///<reference path="<%= folderAndFileName %>.module.ts" />
///<reference path="<%= pathBackToRoot %>typings/jasmine/jasmine.d.ts" />
///<reference path="<%= pathBackToRoot %>typings/angularjs/angular-mocks.d.ts" />

describe("<%= camelModuleName %> section", () => {
    describe("isCurrentUrl", () => {
        var element, scope, compile;

        beforeEach(module("<%= fullModuleName %>"));

        beforeEach(inject(($compile, $rootScope) => {
            scope = $rootScope.$new();
            compile = $compile;
        }));

        it("should have a dummy test", inject(() => {
            expect(true).toBeTruthy();
        }));

        // Example of some directive tests
        //    function compileDirective(tpl) {
        //        // function to compile a fresh directive with the given template, or a default one
        //        // compile the tpl with the $rootScope created above
        //        // wrap our directive inside a form to be able to test
        //        // that our form integration works well (via ngModelController)
        //        // our directive instance is then put in the global 'element' variable for further tests
        //        if (!tpl) tpl = '<div rn-stepper ng-model="testModel"></div></form>';
        //        tpl = '<form name="form">' + tpl + '</tpl>';
        //        // inject allows you to use AngularJS dependency injection
        //        // to retrieve and use other services
        //        inject(function($compile) {
        //            var form = $compile(tpl)(scope);
        //            element = form.find('div');
        //        });
        //        // $digest is necessary to finalize the directive generation
        //        scope.$digest();
        //    }
        //
        //    describe('initialisation', function() {
        //        // before each test in this block, generates a fresh directive
        //        beforeEach(function() {
        //            compileDirective();
        //        });
        //        // a single test example, check the produced DOM
        //        it('should produce 2 buttons and a div', function() {
        //            expect(element.find('button').length).toEqual(2);
        //            expect(element.find('div').length).toEqual(1);
        //        });
        //        it('should check validity on init', function() {
        //            expect(scope.form.$valid).toBeTruthy();
        //        });
        //    });
        //
        //    it('should update form validity initialy', function() {
        //        // test with a min attribute that is out of bounds
        //        // first set the min value
        //        scope.testMin = 45;
        //        // then produce our directive using it
        //        compileDirective('<div rn-stepper min="testMin" ng-model="testModel"></div>');
        //        // this should impact the form validity
        //        expect(scope.form.$valid).toBeFalsy();
        //    });
        //
        //    it('decrease button should be disabled when min reached', function() {
        //        // test the initial button status
        //        compileDirective('<div rn-stepper min="40" ng-model="testModel"></div>');
        //        expect(element.find('button').attr('disabled')).not.toBeDefined();
        //        // update the scope model value
        //        scope.testModel = 40;
        //        // force model change propagation
        //        scope.$digest();
        //        // validate it has updated the button status
        //        expect(element.find('button').attr('disabled')).toEqual('disabled');
        //    });
    });
});
