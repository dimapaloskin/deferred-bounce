# deferred-bounce

> Call reject-function after expiration of timeout if resolve-function was not called.

## Installation

```
  npm i deferred-bounce
```

## Usage

> deferredBound(resolveFunction, rejectFunction, scope, delay);

```js
  var db = require('deferred-bounce');
  
  var resolve = function(err, response) {
    if (err) return;
    console.log(response);
  };
  
  var reject = function() {
    console.log('no 2 seconds response');
  };
  
  var deferred = db(resolve, reject, this, 2000);
  
  anyAsyncFunction(deferred);
```

## Arguments
- `resolveFunction` - function which will be called if deferred instance will called
- `rejectFunction` - function which will be called after expiration of delay and if deferred instance will not called
- `scope` - (optional) - bind scope to resolve and reject functions
- `delay` - timeout

## Examples

```js
  var db = require('deferred-bounce');
  
  var resolve = function() {
    console.log('resolve');
  };
  
  var reject = function() {
    console.log('no 2 seconds response');
  };
  
  var deferred = db(resolve, reject, this, 2000);
  
  deferred();
  // will call resolve function. reject function  will not be called ever
```

```js
  var db = require('deferred-bounce');
  
  var resolve = function() {
    console.log('resolve');
  };
  
  var reject = function() {
    console.log('no 2 seconds response');
  };
  
  var deferred = db(resolve, reject, this, 2000);
  
  setTimout(function() {
    deferred();
  }, 3000);
  
  // reject function will be called. resolve will not be called ever
```

## License

WTFPL © [Dmitry Pavlovsky](http://paloskin.me)
