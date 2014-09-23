/*

  AMD wrapped version based on:

  jQuery pub/sub plugin by Peter Higgins (dante@dojotoolkit.org)

  Loosely based on Dojo publish/subscribe API, limited in scope. Rewritten blindly.

  Original is (c) Dojo Foundation 2004-2010. Released under either AFL or new BSD, see:
  http://dojofoundation.org/license for more information.

*/
'use strict';
define(['jquery'],
  function (d) {

    var cache = {};
    d.publish = function(/* String */topic, /* Array? */args) {
      try{
        //only publish if something is listening
        if(cache[topic] !== undefined) {
          d.each(cache[topic], function() {
            this.apply(d, args || []);
          });
        }
      } catch (err) {
        // handle this error
        console.log("Error caught in pubsub.js:")
        console.log(err.stack);
      }
    },
    d.subscribe = function(/* String */topic, /* Function */callback) {
      if(!cache[topic]) {
        cache[topic] = [];
      }
      cache[topic].push(callback);
      return [topic, callback]; // Array
    },
    d.unsubscribe = function(/* Array */handle) {
      var t = handle[0];
      cache[t] && d.each(cache[t], function(idx) {
        if(this === handle[1]) {
          cache[t].splice(idx, 1);
        }
      });
    },
    d.pubsublisteners = function() {
      return cache;
    };

  }
);
