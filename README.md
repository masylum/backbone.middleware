# Backbone middleware

Routers are fine, but sometime you need moar.

## Usage

Backbone middleware is very easy to use.
Just pass around data on the `this` object, and use named
functions to call `next` or `error` (sorry coffescript... no, not really).

## API

Backbone middleware chain functions that transport data with the `this` object.
With `fn.next()` you can call to the next middleware.
With `fn.error()` you stop your middleware chain and
calls `Backbone.Middleware.handleError` (left to you to implement).

### Middleware

Composes a set of middlewares and returns a function.

```javascript
var middleware = Backbone.Middleware.middleware;

  function authenticateMiddleware(user_id) {
    if (user_id === 1) {
      authenticateMiddleware.next();
    } else {
      $('body').html('<h1>Authentication error!</h1>');
      authenticateMiddleware.error();
    }
  }

  Controller.index = middleware(authenticateMiddleware, function (user_id) {
    alert('Welcome! ' + user_id);
  });
```

### Params

Middleware to extract the parameters and populate a `this.params` objects.
This should be built-in Backbone!

```javascript
var middleware = Backbone.Middleware.middleware;
  , params = Backbone.Middleware.params;

  function authenticateMiddleware() {
    if (this.params.user_id === 1) {
      authenticateMiddleware.next();
    } else {
      $('body').html('<h1>Authentication error!</h1>');
      authenticateMiddleware.error();
    }
  }

  Controller.index = middleware(params(['user_id']), authenticateMiddleware, function () {
    alert('Welcome! ' + this.params.user_id);
  });
```

### Stack

Similar to `middleware` but accepts arrays of functions.
Really useful for building your middleware stacks to be reused.

```javascript
var middleware = Backbone.Middleware.middleware;
  , params = Backbone.Middleware.params;

  function authenticateMiddleware() {
    if (this.params.user_id === 1) {
      authenticateMiddleware.next();
    } else {
      $('body').html('<h1>Authentication error!</h1>');
      authenticateMiddleware.error();
    }
  }

  function authenticateStack() {
    var args = _.toArray(arguments);

    return BackboneMiddleware.stack(
      BackboneMiddleware.params.apply(this, args[0])
    , authenticateMiddleware
    , args.slice(1)
    );
  }

  Controller.index = authenticateStack(['user_id'], function () {
    alert('Welcome! ' + this.params.user_id);
  });
```

## Tests

Not yet, sorry

## License

(The MIT License)

Copyright (c) 2013 Pau Ramon <masylum@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
