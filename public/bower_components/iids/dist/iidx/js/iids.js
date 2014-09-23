/*
 * Copyright (c) 2013 GE Global Research. All rights reserved.
 *
 * The copyright to the computer software herein is the property of
 * GE Global Research. The software may be used and/or copied only
 * with the written permission of GE Global Research or in accordance
 * with the terms and conditions stipulated in the agreement/contract
 * under which the software has been supplied.
 */


'use strict';

/*
This file is a good starting point when you're first developing
with the IIDS. It enables all of the bootstrap plugins, the IIDS navbar,
and jquery UI's sortable module. By no means is iids.js a required file,
it's just here so you can start coding right away. If you would like to
define your own application files which pull in pieces of the IIDS à la carte
that's strongly encouraged. For instance, if you're not using jQuery UI you can
delete it from the section below.
*/

define([
  'jquery',
  'responsive-emitter',
  'ge-bootstrap',
  'jumpnav',
  'iids-navbar'
], function($, ResponsiveEmitter) {

  var isTouchDevice = 'ontouchstart' in document.documentElement;

  // Register tooltips but only on non-mobile devices
  if (!isTouchDevice) {
    $('[rel=tooltip]').tooltip({ container: 'body' });
  }

  // Register popovers. Trigger on click.
  $('[rel=popover]').popover({ trigger: 'click' }).on('click', function(e) {
    e.preventDefault();
  });

  // Clicking outside the popover should close it
  // http://stackoverflow.com/questions/11703093/how-to-dismiss-a-twitter-bootstrap-popover-by-clicking-outside
  $('body').on('click touchstart', function (e) {
    $('[rel=popover], [rel=rich-popover]').each(function () {
      //the 'is' for buttons that trigger popups
      //the 'has' for icons within a button that triggers a popup
      if (!$(this).is(e.target) &&
          $(this).has(e.target).length === 0 &&
          $('.popover').has(e.target).length === 0) {
            $(this).popover('hide');
      }
    });
  });

  // Fix #4550 in bootstrap-dropdown.js
  // https://github.com/twitter/bootstrap/issues/4550
  if (isTouchDevice) {
    $('.primary-navbar .dropdown-toggle').click(function(e) {
      e.preventDefault();
      setTimeout($.proxy(function() {
        $(this).siblings('.dropdown-backdrop').off().remove();
      }, this), 0);
    });
  }

  // Remove pagination if only one page is present
  $('.pagination ul').each(function() {
    if ($(this).children().length <= 1) {
      $(this).hide();
    }
  });

  // Initialize navbars.
  $('.navbar').navbar();

});
