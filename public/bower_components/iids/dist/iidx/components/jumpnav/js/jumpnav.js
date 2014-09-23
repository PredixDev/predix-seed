'use strict';

define([
  'jquery',
  'ge-bootstrap'
],

function($) {

  /* JUMPNAV PUBLIC CLASS DEFINITION
  * =============================== */

  var JumpNav = function(element, options) {
    this.init('jumpnav', element, options);
  };

    JumpNav.prototype = {
        constructor: JumpNav,

        init: function(type, element, options) {
            // the initial offset of the jumpnav from the top of the page
            var jumpNavStartPosition = $(".jumpnav").position();

            this.$jumpOffsetTop = jumpNavStartPosition.top;
            this.$jumpMarginTop = $(".jumpnav").css("margin-top");

            // upon clicking a jumpnav link, this is the top offset applied to the target section
            // so that it lands in the right place relative to the jumpnav
            this.$scrollOffset = $(".jumpnav").outerHeight(true); // + parseInt($(".jumpcontent .block").css("padding-top")); //
             // Enabled ScrollSpy on jumpnav.
            $('body').scrollspy({
                offset: this.$scrollOffset*2,
                target: '.jumpnav'
            });

            $( window ).on('scroll', $.proxy(this.updateJumpScroll, this));
            $( window ).on('hashchange', $.proxy(this.jumpScrollHashChange, this));
            $( window ).on('load', $.proxy(this.initJumpScroll, this));

            $('.jumpnav a').on('click', $.proxy(function( event ) {
                if (!$(event.currentTarget).hasClass("brand")) {
                    event.preventDefault();
                    this.jumpScrollGoTo($(event.currentTarget).attr('href'), true);
                }
            }, this));
        },
        updateJumpScroll: function() {
            var navheight = $( ".jumpnav" ).outerHeight(true);
            var displayHeight = $(document).height() - $(window).height();
            if ($(window).scrollTop() > this.$jumpOffsetTop &&
                displayHeight - this.$jumpOffsetTop - navheight > 0) {
                $( ".jumpnav" ).addClass("fixed").css({top:0, 'margin-top': 0});
            } else {
                $( ".jumpnav" ).removeClass("fixed");
                $(".jumpnav").css({"margin-top": this.$jumpMarginTop});
            }
        },
        initJumpScroll: function() {
            if(window.location.hash && $(window.location.hash).offset().top >= this.$jumpOffsetTop) {
                $( ".jumpnav" ).addClass("fixed").css({top:0, 'margin-top': 0});
                // the +2 is a little extra push to get it over the hump
                this.jumpScrollGoTo(window.location.hash, false);
            }
        },
        jumpScrollHashChange: function(event) {
            event.preventDefault();
            this.jumpScrollGoTo($(window.location.hash), false);
        },
        jumpScrollGoTo: function(selector, animate) {
            var delta = this.$scrollOffset;
            if($(window).scrollTop() >= this.$jumpOffsetTop) {
                delta = 0;
            }

            var offset = $(selector).offset();
            if(animate) {
                // the +2 is a little extra push to get it over the hump
                $( 'html, body' ).animate( { scrollTop: offset.top - this.$scrollOffset - delta + 2 }, 1000);
            }
            else {
                // the +2 is a little extra push to get it over the hump
                $( 'html, body' ).scrollTop(offset.top - this.$scrollOffset - delta + 2);
            }

        }
    };

    /* JUMPNAV PLUGIN DEFINITION
  * ========================= */

  $.fn.jumpnav = function(option) {
    return this.each(function () {
      var $this = $(this),
          data = $this.data('jumpnav'),
          options = typeof option === 'object' && option;

      if (!data) $this.data( 'jumpnav', ( data = new JumpNav(this, options) ) );
      if (typeof option === 'string') data[option]();
    });
  };

  $.fn.jumpnav.Constructor = JumpNav;

  $.fn.jumpnav.defaults = {
    excludes: {
      tablet: false,
      phone: false
    }
  };

  $(function () {
    $('.jumpnav').each(function() {
      $(this).jumpnav();
    });
  });

});
