'use strict';
define(['jquery', 'module'], function MapDSConfig($, module) {

  var mapds = {};
  $.ajax({
    dataType: 'json',
    url : module.config().configFileName,
    async : false
  }).done(function(data) {
    mapds = data;
  });
  return mapds;
});
