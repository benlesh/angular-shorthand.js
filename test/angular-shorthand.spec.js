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

        beforeEach(function () {
            arg = 'my super sweet constant';
            ng('myApp', "UPPER_CASE", arg);
        });

        it('should call module.constant("UPPER_CASE", arg)', function () {
            expect(mockModule.constant).toHaveBeenCalledWith('UPPER_CASE', arg);
        });
    });

    describe('ng("myApp", "UpperCamel", arg) /* non-controller */', function () {
        var arg;

        beforeEach(function () {
            arg = function () {
            };
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

    describe('ng("myApp", "| filterName", arg)', function () {
        describe('when arg is a Function', function () {
            var arg;

            beforeEach(function () {
                arg = function () {
                };
                ng('myApp', '| filterName', arg);
            });

            it('should call module.filter("filterName", x) where `x` is a function wrapping `arg` into a simple' +
                'filter', function () {
                expect(mockModule.filter).toHaveBeenCalled();
                expect(mockModule.filter.mostRecentCall.args[0]).toBe('filterName');
                var secondArg = mockModule.filter.mostRecentCall.args[1];
                expect(typeof secondArg).toBe('function');
                expect(secondArg()).toBe(arg);
            });
        });

        describe('when arg is an Array', function () {
            var arg;

            beforeEach(function () {
                arg = [];
                ng('myApp', '| filterName', arg);
            });

            it('should call module.filter("filterName", arg)', function () {
                expect(mockModule.filter).toHaveBeenCalledWith('filterName', arg);
            });
        });
    });

    describe('ng("myApp") return value', function () {
        var shorthand;

        beforeEach(function () {
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

    describe('ng("myApp", "someProvider", arg)', function () {
        var arg;

        describe('when arg is an Array', function () {
            beforeEach(function () {
                arg = [];
                ng('myApp', 'someProvider', arg);
            });

            it('should call module.provider("some", arg)', function () {
                expect(mockModule.provider).toHaveBeenCalledWith('some', arg);
            });
        });

        describe('when arg is a Function', function () {
            beforeEach(function () {
                arg = function () {
                };
                ng('myApp', 'someProvider', arg);
            });

            it('should call module.provider("some", arg)', function () {
                expect(mockModule.provider).toHaveBeenCalledWith('some', arg);
            });
        });
    });

    describe('ng("myApp", "<!-- directiveName -->", arg)', function () {
        var arg;

        describe('when arg is a function', function () {
            beforeEach(function () {
                arg = function () {
                };
                ng("myApp", "<!-- directiveName -->", arg);
            });

            it('should call module.directive("directiveName", x) where `x` is a function that returns a directive ' +
                'configuration object with `arg` as the link function, an "A" as a restriction', function () {
                expect(mockModule.directive).toHaveBeenCalled();
                expect(mockModule.directive.mostRecentCall.args[0]).toBe('directiveName');
                var secondArg = mockModule.directive.mostRecentCall.args[1];
                expect(typeof secondArg).toBe('function');
                var config = secondArg();
                expect(config.restrict).toBe("M");
                expect(config.link).toBe(arg);
            });
        });

        describe('when arg is an Array', function () {
            beforeEach(function () {
                arg = [];
                ng("myApp", "<!-- directiveName -->", arg);
            });
        });

        describe('when arg is an Object', function () {
            beforeEach(function () {
                arg = {};
                ng("myApp", "<!-- directiveName -->", arg);
            });
        });
    });

    describe('ng("myApp", "[directive-name]", arg)', function () {
        var arg;

        describe('when arg is a function', function () {
            beforeEach(function () {
                arg = function () {
                };
                ng("myApp", "[directive-name]", arg);
            });

            it('should call module.directive("directiveName", x) where `x` is a function that returns a directive ' +
                'configuration object with `arg` as the link function, an "A" as a restriction', function () {
                expect(mockModule.directive).toHaveBeenCalled();
                expect(mockModule.directive.mostRecentCall.args[0]).toBe('directiveName');
                var secondArg = mockModule.directive.mostRecentCall.args[1];
                expect(typeof secondArg).toBe('function');
                var config = secondArg();
                expect(config.restrict).toBe("A");
                expect(config.link).toBe(arg);
            });
        });

        describe('when arg is an Array', function () {
            beforeEach(function () {
                arg = [];
                ng("myApp", "[directive-name]", arg);
            });
        });

        describe('when arg is an Object', function () {
            beforeEach(function () {
                arg = {};
                ng("myApp", "[directive-name]", arg);
            });
        });
    });

    describe('ng("myApp", "<directive-name>", arg)', function () {
        var arg;

        describe('when arg is a function', function () {
            beforeEach(function () {
                arg = function () {
                };
                ng("myApp", "<directive-name>", arg);
            });

            it('should call module.directive("directiveName", x) where `x` is a function that returns a directive ' +
                'configuration object with `arg` as the link function, an "E" as a restriction', function () {
                expect(mockModule.directive).toHaveBeenCalled();
                expect(mockModule.directive.mostRecentCall.args[0]).toBe('directiveName');
                var secondArg = mockModule.directive.mostRecentCall.args[1];
                expect(typeof secondArg).toBe('function');
                var config = secondArg();
                expect(config.restrict).toBe("E");
                expect(config.link).toBe(arg);
            });
        });

        describe('when arg is an Array', function () {
            beforeEach(function () {
                arg = [];
                ng("myApp", "<directive-name>", arg);
            });
        });

        describe('when arg is an Object', function () {
            beforeEach(function () {
                arg = {};
                ng("myApp", "<directive-name>", arg);
            });
        });
    });
});