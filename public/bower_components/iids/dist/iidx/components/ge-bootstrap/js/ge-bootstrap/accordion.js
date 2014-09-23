define([
  'jquery',
  'bootstrap/bootstrap-collapse'
], function($) {
  'use strict';

  function toggleAccordionToggle(event) {
    var $target = $(event.target);
    var $toggle = $target.parent('.accordion-group').find('.accordion-toggle');
    if (event.type === 'show' || (event.type === 'load' && $target.hasClass('in'))) {
      $toggle.addClass('in');
    } else if (event.type === 'hide') {
      $toggle.removeClass('in');
    }
  }

  // Make accordion carets animate and initialize them on page load.
  $('.accordion .collapse')
    .on('show hide load', toggleAccordionToggle)
    .trigger('load');
});
