/*jshint multistr:true, quotmark:false*/

define([
  'jquery',
  'datatables',
  'ge-bootstrap'
],

function($) {
  'use strict';

  return function(settings, $el) {
    var $floater = $('<div class="btn-group btn-datatables-floater">\
                        <button class="btn dropdown-toggle btn-mini" data-toggle="dropdown"><i class="icon-chevron-down"></i></button>\
                        <ul class="dropdown-menu dropdown-datatables-floater pull-right">\
                          <li><a href="#">Show Only</a></li>\
                          <li><a href="#">Hide</a></li>\
                          <li><a href="#">Highlight</a></li>\
                          <li class="divider"></li>\
                          <li><a href="#">Share this</a></li>\
                        </ul>\
                      </div>');

    var hideFloater = function() {
      $floater.css('display', 'none');
    };

    var showFloater = function() {
      var isActive = $('.dropdown-menu').parent().hasClass('open');
      if( isActive ) return;

      $floater.css('display', 'block');
      var pos = $(this).offset();
      pos.left += $(this).innerWidth() - $floater.width() - 4;
      pos.top += ( ( $(this).innerHeight() - $floater.height() ) / 2 ) + 5;
      $floater.offset( pos );
    };

    // Start off in a hidden state
    hideFloater();

    $.extend(settings, {
      // Show/hide the floater on mouesenter
      "fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        $('td:not(.selector)', nRow).mouseenter(showFloater);
        $('td.selector', nRow).mouseenter(hideFloater);
      },
      // Add the floater to the table
      "fnInitComplete": function() {
        $('.dataTables_wrapper').append( $floater ).mouseleave( hideFloater );
      }
    });
  };
});
