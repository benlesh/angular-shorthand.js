describe('module creation', function () {

    var mockModule;

    beforeEach(function () {
        mockModule = {
            factory: jasmine.createSpy('module.factory'),
            provider: jasmine.createSpy('module.provider'),
            value: jasmine.createSpy('module.value'),
            constant: jasmine.createSpy('module.constant'),
            directive: jasmine.createSpy('module.directive'),
            filter: jasmine.createSpy('module.filter')
        };

        spyOn(angular, 'module').andReturn(mockModule);
    });

    describe('when ng("myApp", ["dependency"]) is called', function () {
        var mod;

        beforeEach(function () {
            mod = ng('myApp', ["dependency"]);
        });

        it('should call angular.module("myApp", ["dependency"])', function () {
            expect(angular.module).toHaveBeenCalledWith('myApp', ['dependency']);
        });

        it('should return a shorthand function', function () {
            expect(typeof mod).toBe('function');
        });
    });

    describe('when ng("myApp") is called', function () {
        var mod;

        beforeEach(function () {
            mod = ng('myApp');
        });

        it('should call angular.module("myApp")', function () {
            expect(angular.module).toHaveBeenCalledWith('myApp');
        });

        it('should return a shorthand function', function () {
            expect(typeof mod).toBe('function');
        });
    });

    describe('ng("myApp", "lowerCamelName", arg)', function () {
        describe('when arg is a function', function () {
            var arg;

            beforeEach(function () {
                arg = function () {
                };
                ng('myApp', 'lowerCamelName', arg);
            });

            it('should call module.factory("lowerCamelName", arg)', function () {
                expect(mockModule.factory).toHaveBeenCalledWith('lowerCamelName', arg);
            });
        });

        describe('when arg is an Array', function () {
            var arg;

            beforeEach(function () {
                arg = [];
                ng('myApp', 'lowerCamelName', arg);
            });

            it('should call module.factory("lowerCamelName", arg)', function () {
                expect(mockModule.factory).toHaveBeenCalledWith('lowerCamelName', arg);
            });
        });

        describe('when arg is an Object', function (){
            var arg;

            beforeEach(function () {
                arg = {};
                ng('myApp', 'lowerCamelName', arg);
            });

            it('should call module.value("lowerCamelName", arg)', function () {
                expect(mockModule.value).toHaveBeenCalledWith('lowerCamelName', arg);
            });
        });
    });
});