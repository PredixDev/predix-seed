/* global matchMedia */

define([
  'jquery'
], function($) {
  'use strict';

    /*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */

    window.matchMedia || (window.matchMedia = function() {
        "use strict";

        // For browsers that support matchMedium api such as IE 9 and webkit
        var styleMedia = (window.styleMedia || window.media);

        // For those that don't support matchMedium
        if (!styleMedia) {
            var style       = document.createElement('style'),
                script      = document.getElementsByTagName('script')[0],
                info        = null;

            style.type  = 'text/css';
            style.id    = 'matchmediajs-test';

            script.parentNode.insertBefore(style, script);

            // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
            info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

            styleMedia = {
                matchMedium: function(media) {
                    var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                    // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                    if (style.styleSheet) {
                        style.styleSheet.cssText = text;
                    } else {
                        style.textContent = text;
                    }

                    // Test if media query is true or false
                    return info.width === '1px';
                }
            };
        }

        return function(media) {
            return {
                matches: styleMedia.matchMedium(media || 'all'),
                media: media || 'all'
            };
        };
    }());

  var QueryHandler = function(query) {
    this.query = query;
    this.isMatched = false;
    this.listeners = [];

    this.match();
  };

  // Check if the query matches the page size and if
  // this is our first time matching.
  // When the query handle gets a match it should execute
  // all of its callbacks.
  QueryHandler.prototype.match = function() {
    var matchedBefore = this.isMatched;
    this.isMatched = matchMedia(this.query).matches;

    if (this.isMatched && !matchedBefore) {
      this.run();
    }

    return this.isMatched;
  };

  QueryHandler.prototype.addListener = function(callback) {
    this.listeners.push(callback);
    // If we've already matched for this size go ahead and run
    // the callback.
    if (this.isMatched) {
      callback();
    }
  };

  QueryHandler.prototype.removeListener = function(callback) {
    // TODO
  };

  QueryHandler.prototype.run = function() {
    $.each(this.listeners, function(i, listener) {
      listener();
    });
  };

  return QueryHandler;
});
