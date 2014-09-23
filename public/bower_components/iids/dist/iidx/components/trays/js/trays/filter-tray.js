define([
  'jquery',
  'ge-bootstrap'
], function($) {
  'use strict';

  var animDuration = 200;

  var makeFilterRule = function(tray) {
    var group = tray.find('.filter-rule-group');
    // http://bugs.jquery.com/ticket/13223
    var newRule = $($.trim($('#filter-rule-template').html()));
    $(newRule).appendTo(group);
  };

  var removeFilterRule = function(ruleContainer) {
    ruleContainer.animate({height:0},animDuration,function(){
      ruleContainer.remove();
    });
  };

  $.fn.iidsFilterTray = function(opts) {
    return this.each(function() {
      var tray = $(this);

      // create initial rule
      makeFilterRule(tray);

      tray.find('.filter-rule select')
          .first().val('highlight')
          .next().val('median')
          .next().val('<')
          .next().val('60');

      tray.find('[data-toggle="filter-rule-add"]').click(function(e) {
        e.preventDefault();
        makeFilterRule(tray);
      });

      // Find the toggle for this filter and position the arrow relative to it.
      $('.tray-toggle').each(function(i,el) {
        var $el = $(el);
        if (tray.filter($el.data('target'))) {
          tray.append($('<span class="arrow"></span>').css(((tray.hasClass('top')||tray.hasClass('bottom')) ? 'left' : 'top'), (($el.outerWidth() / 2) - 6)));
        }
      });

      tray.on('click', '[data-toggle="filter-rule-remove"]', function(e) {
        e.preventDefault();
        removeFilterRule( $(this).closest('.filter-rule') );
      });
    })
    .on('shown', function () {
        $(this).addClass('shown');
    })
    .on('hide', function () {
        $(this).removeClass('shown');
    });
  };

  return $;
});
