define([
  'jquery'
], function ($) {
  'use strict';

	$('.collapsible-list-parent').click(function(e) {
		e.preventDefault();
		$(this).next().slideToggle('fast');
		if ($(this).parent().hasClass('open')) {
      $(this).parent().removeClass('open');
    } else {
      $(this).parent().addClass('open');
    }
	});

  return $;

});
