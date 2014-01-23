describe('module creation', function () {

    var mockModule;

    beforeEach(function () {
        mockModule = jasmine.createSpyObj('module', ['controller', 'service', 'factory', 'provider',
            'filter', 'directive', 'value', 'constant', 'run', 'config']);

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

        describe('when arg is an Object', function () {
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

    describe('ng("myApp", "UpperCamelNameCtrl", arg)', function () {
        describe('when arg is a function', function () {
            var arg;

            beforeEach(function () {
                arg = function () {
                };
                ng('myApp', 'UpperCamelNameCtrl', arg);
            });

            it('should call module.controller("UpperCamelNameCtrl", arg)', function () {
                expect(mockModule.controller).toHaveBeenCalledWith('UpperCamelNameCtrl', arg);
            });
        });

        describe('when arg is an Array', function () {
            var arg;

            beforeEach(function () {
                arg = [];
                ng('myApp', 'UpperCamelNameCtrl', arg);
            });

            it('should call module.controller("UpperCamelNameCtrl", arg)', function () {
                expect(mockModule.controller).toHaveBeenCalledWith('UpperCamelNameCtrl', arg);
            });
        });
    });

    describe('ng("myApp", "UPPER_CASE", arg)', function () {
        var arg;

        beforeEach(function() {
            arg = 'my super sweet constant';
            ng('myApp', "UPPER_CASE", arg);
        });

        it('should call module.constant("UPPER_CASE", arg)', function () {
            expect(mockModule.constant).toHaveBeenCalledWith('UPPER_CASE', arg);
        });
    });

    describe('ng("myApp", "UpperCamel", arg) /* non-controller */', function () {
        var arg;

        beforeEach(function() {
            arg = function(){};
            ng('myApp', "UpperCamel", arg);
        });

        it('should call module.factory("UpperCamel", x), where `x` is a function that returns a ctor of the function' +
            'in `arg`', function () {
            expect(mockModule.factory).toHaveBeenCalled();
            expect(mockModule.factory.mostRecentCall.args[0]).toBe('UpperCamel');
            var secondArg = mockModule.factory.mostRecentCall.args[1];
            expect(typeof secondArg).toBe('function');
            expect(secondArg()).toBe(arg);
        });
    });

    describe('ng("myApp") return value', function () {
        var shorthand;

        beforeEach(function (){
            shorthand = ng('myApp');
        });

        it('should be extended with the module\'s functions', function () {
            expect(shorthand.controller).toBe(mockModule.controller);
            expect(shorthand.service).toBe(mockModule.service);
            expect(shorthand.filter).toBe(mockModule.filter);
            expect(shorthand.provider).toBe(mockModule.provider);
            expect(shorthand.constant).toBe(mockModule.constant);
            expect(shorthand.value).toBe(mockModule.value);
            expect(shorthand.directive).toBe(mockModule.directive);
            expect(shorthand.run).toBe(mockModule.run);
            expect(shorthand.config).toBe(mockModule.config);
        });
    });
});