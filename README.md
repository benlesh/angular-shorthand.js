angular-shorthand.js
====================

Shorthand wrapper for AngularJS

[Example](http://plnkr.co/edit/qv2QpsN2lveKUQYxldcX?p=preview)

This library is a "plugin" of sorts for Angular that allows for more fluid declaration of angular components such as modules, services, directives, providers, controllers, etc.

The goal of this library is to help developers:

1. Keep uniform naming conventions for their Angular components.
2. Create a more terse, more readable api for Angular.
3. Make directive declarations more self explanatory.
4. Type a **lot** less.

### A Quick Example

```javascript
    ng('myModule', []);
    
    ng('myModule', 'MyCtrl', function($scope) {
      $scope.foo = 'bar';
    });
```

which is equivalent to:

```javascript
    angular.module('myModule', []);
    
    angular.module('myModule').controller('MyController', function($scope) {
      $scope.foo = 'bar';
    });
```

### How it works

In the statement `ng('moduleName', componentName, args)` does the following:

1. Gets the module named `'moduleName'`.
2. Examines `componentName` to see if it's a directive, service, constant, value, provider, etc.
3. Examines the `args` passed to help shorten the declarations that need to be made.


# Usage

### Controllers

Controllers are defined as having a **capitalized first letter** and **ending in "Ctrl"**:

```javascript
    ng('myApp', 'MainCtrl', function($scope) { });
    
    ng('myApp', 'MainCtrl', ['$scope', function($scope) { }]);
```
    
### Services

Services are defined as having a lower-camelcase name that does not end in "Provider". Services that are passed an object actually become values (see below).

```javascript
    ng('myApp', 'fooService', function($http) {
      return {
         foo: function (x) { }
      };
    });
    
    ng('myApp', 'fooService', ['$http', function($http) {
      return {
         foo: function (x) { }
      };
    }]);
```

### Values

Values are declared the same way as services but the last argument is *not a function or an array*:

```javascript
    ng('myApp', 'someValue', 'this is a value');
   
    ng('myApp', 'someOtherValue', {
      foo: 'bar'
    });
```

### Constants

Constants are declared with ALL_CAPS names, in other words, in a constant name, only capital letters and underscores are allowed:

```javascript
    ng('myApp', 'THIS_IS_PI', 3.14);
```   

### Providers

Providers are declared with a name that begins lowercase and ends with "Provider":

```javascript
    ng('myApp', 'somethingProvider', function () {
      this.$get = function () { };
    });
```   

# Directives!


Directives have been seperated up into different types of directives, as is most common in the majority of Angular projects.

## Names are mapped as follows:

- `"<some-name>"` : element directive named `"someName"`
- `"[my-attribute]"`: attribute directive named `"myAttribute"`
- `"<!-- commentThing -->"`: comment directive named `"commentThing"`


### Declarations

All directive types can be wired up in the same manner, just substitute `'<tag-name>'` for `'[attr-name]'` or `'<!-- comment name -->'` below:

```javascript
    ng('myApp', '<tag-name>', function(scope, elem, attrs) {
    
    });
    
    // or
    
    ng('myApp', '<tag-name>', [function (){
      return function(scope, elem, attrs) {
    
      };
    });
    
    // or
    
    ng('myApp', '<tag-name>', {
      template: '',
      scope: {},
      link: function(scope, elem) { }
    });
```   
    
# More to come

- Filters.
- Non-standard directives.
- Multiple restriction directives.
- Transcluded directive shorthand for element types ?
    
