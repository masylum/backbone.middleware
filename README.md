<<<<<<< HEAD
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
=======
backbone.middleware
===================

Backbone.middleware
>>>>>>> 3a6dedfeaa4f41c77b44ff5b7a5540596ebd8063
