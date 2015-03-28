///<reference path="app.ts" />
///<reference path="../../typings/jasmine/jasmine.d.ts" />

describe("<%= projectName %>.app.AppController", () => {
    describe("isCurrentUrl", () => {
        var scope, appCtrl;
        beforeEach(angular.mock.inject(($rootScope) => {
            scope = $rootScope.$new();
            appCtrl = new <%= projectName %>.app.AppController(scope);
        }));

        /* Example of some more mocking tests */
        //beforeEach(angular.mock.module('module'));
        //beforeEach(angular.mock.inject(($rootScope, $http, $location, $timeout, configService) => {
        //    scope = $rootScope.$new();
        //    http = $http;
        //    location = $location;
        //    timeout = $timeout;
        //    configServiceFake = configService;
        //
        //    configCtrl = new game.ConfigCtrl(scope, http, location, timeout, configServiceFake);
        //}));
        //

        it('should pass a dummy test', inject(function () {
            expect(appCtrl).toBeTruthy();
        }));
    });
});
