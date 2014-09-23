define([
    'jquery',
    'ge-bootstrap'
    ],

function ($) {
  'use strict';

  var ResponsiveTable = {
    addResponsiveClasses: function(element){
      // element is a table?
      // count the columns to be marked as optional and essential
      // apply style based on index
      var $element = $(element);
      var $cols = $element.find('th');
      $cols.each(function(i, val){
        var $th = $(this),
        selector = 'td:nth-child(' + (i+1) + ')',
        headerClass = $th.attr('class');
        // apply the class on TH to TDs with the same row position
        $element.find(selector).addClass(headerClass);
      });
    }
  };

$(function(){
    $('table.table-responsive').each(function(){
      ResponsiveTable.addResponsiveClasses(this);
    });
  });
});
