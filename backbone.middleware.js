(function () {
  var Middleware = {};

  /**
   * Chains middlewares
   *
   * @param {Array<Function>} fns
   */
  function handleMiddleware(self, fns) {
    return function () {

      // if last middleware
      if (!fns.length) {
        return;
      }

      var fn = fns.shift()
        , params = _.toArray(arguments);

      fn.next = function () {
        handleMiddleware(self, fns).apply({}, params);
      };

      fn.error = function () {
        if (self.handleError) {
          self.handleError();
        }

        if (Backbone.Middleware.handleError) {
          Backbone.Middleware.handleError();
        }
      };

      fn.apply(self, params);
    };
  }

  /**
   * Composes middlewares
   *
   * @param {Function} fn1
   * @param {Function} fn2
   * @param {Function} ...
   * @return {Function}
   */
  Middleware.middleware = function () {
    return handleMiddleware(this, _.toArray(arguments));
  };

  /**
   * Interface to be implemented
   * Handler on a failing middleware
   */
  Middleware.handleError = function () {
    console.log('error');
  };

  /**
   * Returns a composed stack of middlewares
   *
   * @param {Function} fn1
   * @param {Function} fn2
   * @param {Function} ...
   * @return {Function}
   */
  Middleware.stack = function () {
    var params = _.toArray(arguments);

    return function () {
      Middleware.middleware
        .apply(this, _.flatten(params))
        .apply(this, arguments);
    };
  };

  /**
   * Removes the queryparams from the fragment
   *
   * @param  {String} fragment
   * @return {String}
   */
  function removeQueryParams(frm) {
    return frm.replace(/(\?(.*))?$/, '');
  }

  /**
   * Populates a params object
   *
   * @return {Function}
   */
  Middleware.params = function () {
    var parameters = _.toArray(arguments);
    return function params() {
      var args = _.map(_.compact(_.toArray(arguments)), removeQueryParams);
      this.params = _.object(parameters, args);
      params.next();
    };
  };

  Backbone.Middleware = Middleware;
}());
