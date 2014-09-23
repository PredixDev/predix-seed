define([
  'jquery',
  'responsive-emitter',
  'ge-bootstrap'
], function($, ResponsiveEmitter) {
  'use strict';

  // NAVBAR PUBLIC CLASS DEFINITION
  // ==============================

  var Navbar = function(element, options) {
    this.element = element;
    this.init('navbar', element, options);
  };

  Navbar.prototype.constructor = Navbar;

  Navbar.prototype.init = function(type, element, options) {
    this.type = type;
    this.$element = $(element);
    this.$megaDropdown = this.$element.find('.mega-dropdown');
    this.settings = this.getOptions(options);

    // navbar tooltips
    this.$element.find('a[rel="tooltip"]').tooltip({ placement: 'bottom' });

    // Reposition elements on window resize
    $(window).on('resize', $.proxy(this.resize, this));
    // Make sure the mega dropdown is ready
    this.extendMegaDropdown();
    // Force a resize to kick things off
    this.resize();

    // Responsive
    if (this.settings.isResponsive) {
      this.addResponsiveListeners();
    }
  };

  Navbar.prototype.getOptions = function(options) {
    options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data());
    return options;
  };

  Navbar.prototype.extendMegaDropdown = function() {
    // Make "mega" dropdowns extend the full width of the screen.
    this.$megaDropdown.each(function() {
      var $this = $(this),
          $toggle = $this.prev('.dropdown-toggle'),
          $arrow = $('<span class="arrow"></span>');

      $this
        .append($arrow)
        .parent('.dropdown').css('position','static');
    });
  };

  Navbar.prototype.resize = function() {
    // Resize mega-dropdowns
    this.$megaDropdown.each(function() {
      var $this = $(this),
          $toggle = $this.prev('.dropdown-toggle'),
          $arrow = $this.find('.arrow'),
          w = $this.parents('.primary-navbar .container').width();

      $this.css({ 'width': w, 'max-width': w });
      $arrow.css('left', $toggle.position().left + $toggle.width() / 2);
    });
  };

  Navbar.prototype.addResponsiveListeners = function() {
    ResponsiveEmitter.register([
      '(min-width: 481px) and (max-width: 767px)',      // portrait tablet/landscape phone
      '(max-width: 480px)'                              // portrait phone
    ], $.proxy(this.respondPhone, this));

    // Attach listeners to the next range up to undo any collapsable elements.
    ResponsiveEmitter.register([
      '(min-width: 768px) and (max-width: 979px)'       // landscape tablet
    ], $.proxy(this.respondTablet, this));

    // Add event listeners to size/position the navigation dropdowns based
    // on the available screen space so that they do not appear offscreen.
    ResponsiveEmitter.register([
      '(min-width: 1200px)',                            // large desktop
      '(min-width: 980px) and (max-width: 1199px)'      // desktop
    ], $.proxy(this.respondDesktop, this));
  };

  Navbar.prototype.respondPhone = function( event ) {
    // Verify that isResponsive is enabled and phones are not excluded
    if (this.settings.isResponsive && !this.settings.excludes.phone) {
      // Move navbar elements (search field, user dropdown, etc) into a hidden
      // responsive-elements container
      this.addResponsiveElements();

      // Turn mega dropdown menu into an accordion
      this.addMegaAccordion();
    }
  };

  Navbar.prototype.respondTablet = function( event ) {
    // Verify that isResponsive is enabled and tablets are not excluded
    if (this.settings.isResponsive && !this.settings.excludes.tablet) {
      // Turn mega dropdown menu into an accordion
      this.addMegaAccordion();

      // Move navbar elements (search field, user dropdown, etc) out of the
      // hidden responsive-elements container so they're visible again
      this.removeResponsiveElements();
    }
  };

  Navbar.prototype.respondDesktop = function( event ) {
    // Move navbar elements (search field, user dropdown, etc) out of the
    // hidden responsive-elements container so they're visible again
    this.removeResponsiveElements();

    // Turn mega dropdown menu back into dropdowns
    this.removeMegaAccordion();
  };

  Navbar.prototype.addResponsiveElements = function() {
    // Fetch the navbar, but as .container since that's where the magic
    // happens within this construct.
    var $navbar = $( '.navbar-inner > .container', this.element );
    // Grab all of the components from navbar (except brand and the collapse
    // button) so that we can move them to primary navbar.
    var $items = $navbar.children('.pull-right').children(':not(.btn[data-toggle="collapse"])');
    // Get the new wrapper element.
    var $target = $( '.primary-navbar > .container > .responsive-elements', this.element );
    // Verify the target exists; if not, create it.
    if ( !$target.size() ) {
      $( '.primary-navbar > .container', this.element ).prepend( $( '<div class="responsive-elements"></div>' ) );
      $target = $( '.primary-navbar > .container > .responsive-elements', this.element );
    }
    // Append the items before any contents of the primary navbar.
    $target.append($items);
  };

  Navbar.prototype.removeResponsiveElements = function() {
    // Fetch the navbar, but as .container since that's where the magic
    // happens within this construct.
    var $navbar = $( '.navbar-inner > .container', this.element );
    // Get the responsive items that were moved to the primary-navbar.
    var $items = $( '.primary-navbar > .container > .responsive-elements', this.element ).children();
    // Move the found items back to the original navbar position.
    $navbar.find( '.pull-right' ).prepend( $items );
    // Remove the responsive elements wrapper.
    $( '.responsive-elements', this.element ).remove();
    // Float search field
    $( '.navbar-search', this.element ).css({ 'float': 'left' });
    // Reset any styles appended to search elements.
    // NOTE: delay ensures event is off/unbound before firing.
    setTimeout( this.resetSearchQuery, 10 );
  };

  Navbar.prototype.addMegaAccordion = function() {
    if (this.$megaDropdown.hasClass('mega-accordion')) return;

    this.$megaDropdown.addClass('mega-accordion');

    // Turn nav header's into triggers for collapsible lists
    this.$megaDropdown.find('.nav-header a').each(function(i, el) {
      var $el = $(el);
      $el.attr('data-target', '.mega' + i);
      // Namespace the click event so it can be easily removed later
      // http://api.jquery.com/on/#event-names
      $el.on('click.mega-accordion', function(e) {
        e.preventDefault();
        e.stopPropagation(); // prevent bootstrap dropdown listeners which are on $(document)
        $($el.attr('data-target')).toggleClass('in');
        $el.parent().toggleClass('open');
      });
    });

    // Collapse dropdown lists
    this.$megaDropdown.find('.mega-list').each(function(i, el) {
      var $el = $(el);
      $el.addClass('collapse').addClass('mega' + i);
    });

    this.$megaDropdown.find('.arrow').addClass('hide');
  };

  Navbar.prototype.removeMegaAccordion = function() {
    if (!this.$megaDropdown.hasClass('mega-accordion')) return;

    this.$megaDropdown.removeClass('mega-accordion');

    this.$megaDropdown.find('.nav-header a').each(function(i, el) {
      var $el = $(el);
      $el.attr('data-target', '');
      // Remove namespaced click event
      // http://api.jquery.com/on/#event-names/
      $el.off('click.mega-accordion');
    });

    this.$megaDropdown.find('.mega-list').each(function(i, el) {
      var $el = $(el);
      $el.removeClass('collapse').removeClass('mega' + i);
    });

    this.$megaDropdown.find('.arrow').removeClass('hide');
  };

  // Remove styles appended to items from above function.
  Navbar.prototype.resetSearchQuery = function() {
    var $form      = $( '.navbar-search' );
    var $field     = $form.find( '.search-query' );
    var $wrapper   = $form.parent();
    $field.removeAttr( 'style' );
    $wrapper.removeAttr( 'style' );
  };

  // NAVBAR PLUGIN DEFINITION
  // ========================

  $.fn.navbar = function(option) {
    return this.each(function () {
      var $this = $(this),
          data = $this.data('navbar'),
          options = typeof option === 'object' && option;

      if (!data) $this.data('navbar', (data = new Navbar(this, options)));
      if (typeof option === 'string') data[option]();
    });
  };

  $.fn.navbar.Constructor = Navbar;

  $.fn.navbar.defaults = {
    isResponsive: true,
    excludes: {
      tablet: false,
      phone: false
    }
  };

  return $;

});
