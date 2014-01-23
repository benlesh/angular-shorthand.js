/*
 angular-shorthand.js 0.0.1
 (c) 2014 Ben Lesh - http://www.benlesh.com
 MIT License
 */

(function(window, angular) {
  var isArray = angular.isArray,
      isObject = angular.isObject,
      forEach = angular.forEach,
      isString = angular.isString,
      isFunction = angular.isFunction;
  
  var declarationTypeMatchers = {
      'provider': /^([a-z][A-Za-z0-9_]*)Provider$/,
      'service': /^[a-z][A-Za-z0-9_]*(?!Provider)$/,
      'controller': /^[A-Z][A-Za-z0-9_]*Ctrl$/,
      'constant': /^[A-Z][A-Z_0-9]*$/,
      'element': /^<([a-z]([a-z]|\-{0,1}[a-z])*)>$/,
      'attribute': /^\[([a-z]([a-z]|\-{0,1}[a-z])*)\]$/,
      'comment': /^<!--\s*([a-z]([a-z]|\-{0,1}[a-z])*)\s*-->$/
  };
  
  var declarationTypeHandlers = {
    'provider': function(module, name, args) {
      var regexp = declarationTypeMatchers.provider;
      regexp.lastIndex = 0;
      var provName = regexp.exec(name)[1];
      module.provider(provName, args);
    },
    'service': function(module, name, args) {
      if(isArray(args) || isFunction(args)) {
        module.factory(name, args);
      } else {
        module.value(name, args);
      }
    },
    'controller': function(module, name, args) {
      module.controller(name, args);
    },
    'constant': function(module, name, args) {
      module.constant(name, args);
    },
    'element': directiveType('E', declarationTypeMatchers.element),
    'attribute': directiveType('A', declarationTypeMatchers.attribute),
    'comment': directiveType('M', declarationTypeMatchers.comment)
  };
  
  function directiveType(restriction, regex) {
    return function(module, name, args) {
      regex.lastIndex = 0
      console.log(name);
      var dirName = regex.exec(name)[1];
      
      if(isArray(args)) {
        module.directive(dirName, args);
      } else if(isFunction(args)) {
        module.directive(dirName, function (){
          return {
            restrict: restriction,
            link: args
          };
        });
      } else if(isObject(args)) {
        args.restrict = restriction;
        module.directive(dirName, function() {
          return args;
        });
      }
    }
  }
  
  function getDeclarationType(name) {
    for(var type in declarationTypeMatchers) {
      if(declarationTypeMatchers.hasOwnProperty(type) 
        && declarationTypeMatchers[type].test(name)) {
        return type;
      }
    }
    throw new Error('invalid name: ' + name);
  }
  
  function createNg(module) {
    return function(name, args) {
      var all = {};
      if(isObject(name)) {
        all = name;
      } else {
        all[name] = args;
      }
      forEach(all, function (args, name) {
        var decType = getDeclarationType(name);
        declarationTypeHandlers[decType](module, name, args);
      });
    }
  }
  
  window.ng = function(moduleName, arg2) {
    var module = isArray(arg2) ? angular.module(moduleName, arg2) :
          angular.module(moduleName);
    var ng = createNg(module);
    
    if(isObject(arg2) && !isArray(arg2)) {
      ng(arg2);
    }
    
    if(isString(arg2)) {
      var args = [].slice.call(arguments,1);
      ng.apply(null, args);
    }
    return ng;
  };
}(window, window.angular));
