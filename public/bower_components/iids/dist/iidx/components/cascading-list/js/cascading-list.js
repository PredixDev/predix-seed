define([
  'ge-bootstrap',
], function($) {
  'use strict';
  /* COLLAPSE CONTAINER PUBLIC CLASS DEFINITION
  * =============================== */
  var Cascading = function(element) {
    this.$element = $(element);
    this.$moduleHeader = this.$element.find('.cascading-list-header');
    this.$moduleBody = this.$element.find('.cascaging-list-sublist');
    this.init('Cascading', element);
  };
  Cascading.prototype = {
    constructor: Cascading,
    init: function(type, element) {
      this.type = type;
      this.$moduleHeader.prepend('<i class="module-arrow"></i>');
      this.$moduleArrow = this.$element.find('.module-arrow');
      if (this.$moduleBody.hasClass('in')) {
        this.$moduleArrow.addClass('icon-chevron-down');
      } else {
        this.$moduleArrow.addClass('icon-chevron-right');
      }
    },
    toggle: function() {
      this.$element.trigger($.Event('toggle'));
      if (this.$moduleBody.hasClass('in')) {
        this.hide();
      } else {
        this.show();
      }
    },
    show: function () {
      this.$moduleBody.collapse('show');
      this.$moduleArrow.removeClass('icon-chevron-right').addClass('icon-chevron-down');
    },
    hide: function() {
      this.$moduleBody.collapse('hide');
      this.$moduleArrow.removeClass('icon-chevron-down').addClass('icon-chevron-right');
    }
  };
  /* Cascading PLUGIN DEFINITION
  * ========================= */
  $.fn.Cascading = function() {
    return this.each(function () {
      var cascadingList = new Cascading(this);
      cascadingList.$moduleHeader.bind('click', function(){
        cascadingList.toggle();
      });
    });
  };
  $.fn.Cascading.Constructor = Cascading;
  return $;
});
