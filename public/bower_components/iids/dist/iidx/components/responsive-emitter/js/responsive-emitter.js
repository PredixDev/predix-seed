define([
  'jquery',
  'responsive-emitter/query-handler'
],

function($, QueryHandler) {
  'use strict';

  var ResponsiveEmitter = {

    queryHandlers: {},
    queries: [
      '(max-width: 480px)',
      '(min-width: 481px) and (max-width: 767px)',
      '(min-width: 768px) and (max-width: 979px)',
      '(min-width: 980px) and (max-width: 1199px)',
      '(min-width: 1200px)'
    ],

    init: function() {
      this.$emitter = $(this);

      // Convert built-in queries to QueryHandlers
      $.each(this.queries, $.proxy(function(i, query) {
        this.queryHandlers[query] = new QueryHandler(query);
      }, this));

      // Attach the responsive evaluator to window resizing.
      $(window).resize($.proxy(this.evaluate, this));

      // Attach the responive evaluator to document load.
      $(document).ready($.proxy(this.evaluate, this));

      return this;
    },

    evaluate: function() {
      // Determine if any query handlers match. If they do their callbacks
      // will be executed.
      $.each(this.queryHandlers, function(i, queryHandler) {
        queryHandler.match();
      });
    },

    register: function(queries, callback) {
      // Allow the user to pass in a single query or multiple queries
      // If they passed in a single query conver it to an Array so we can
      // parse everything in the same fashion.
      if (!$.isArray(queries)) {
        queries = [queries];
      }

      $.each(queries, $.proxy(function(i, query) {
        // Register callbacks for media-queries. If the QueryHandler object
        // already exists in our list just push the new listener. Otherwise
        // create a new QueryHandler object.
        var queryHandler = this.queryHandlers[query] || new QueryHandler(query);
        queryHandler.addListener(callback);
        this.queryHandlers[query] = queryHandler;
      }, this));
    }
  };

  ResponsiveEmitter.init();
  return ResponsiveEmitter;

});
