/**
* Faceted Search wrapper of Bootstrap Typeahead plugin
*
* Returns faceted search results, implemented for map search.
*
**/

define(['jquery', 'map-search-component/indexer', 'map-core-component/pubsub', 'bootstrap/bootstrap-typeahead'],

function FacetedSearch($, indexr){
  'use strict';

  var searchBoxSelector = ".map input.search-query",
      $searchBox = $(searchBoxSelector);

  var eventSubscribe = function eventSubscribe() {
    $.subscribe('mapHasFocus', function(mapElementSelector){
      // check that the map is in the same container as our search box
      var selectorString = "[data-map-name='"+mapElementSelector.attr('data-map-name') + "']"
      if( $searchBox.parents(selectorString).length == 1 ) {
        loseFocus();
      }
    });
  };

  var loseFocus = function loseFocus() {
    //force search box loosing focus
    //forceToggleFocus = true;
    $searchBox.blur();
  };

  eventSubscribe();

  var FacetedTypeahead = function FacetedTypeahead(element, opts) {
    this.options = $.extend({}, $.fn.facetedTypeahead.defaults, opts);

    this.$element = $(element);
    this.matcher = this.options.matcher || this.matcher;
    this.sorter = this.options.sorter || this.sorter;
    this.highlighter = this.options.highlighter || this.highlighter;
    this.updater = this.options.updater || this.updater;
    this.source = this.options.source;
    this.facet = this.options.facet;
    this.viewAll = false; //View all results should not be used
    this.topResultLabel = this.options.topResultLabel;
    this.isFaceted = this.options.isFaceted;
    if ((!this.isFaceted) && (!opts.menu)) {
        this.$menu = $($.fn.typeahead.defaults.menu);
    } else {
        this.$menu = $(this.options.menu);
    }
    if (null !== this.options.positionElementID) {
    this.$positionElement = $('#' + this.options.positionElementID);
    }
    this.offsetPosY = this.options.offsetPosY;
    this.viewAllCallback = this.options.viewAllCallback;
    this.viewItemCallback = this.options.viewItemCallback;
    this.listen();
  };

  // inherit
  var FacetedTypeaheadBaseClass = $.fn.typeahead.Constructor.prototype;

  FacetedTypeahead.prototype = Object.create(FacetedTypeaheadBaseClass);

  // overrides
  FacetedTypeahead.prototype.select = function select() {
    var val = this.$menu.find('.active').attr('data-value');
    var id = this.$menu.find('.active').attr('data-id');

    if (!this.isFaceted) {
      FacetedTypeaheadBaseClass.select.call(this);
    } else {
      if ((val.toLowerCase() === 'all') && ((this.viewAllCallback) && (typeof(this.viewAllCallback) === 'function'))) {
        this.viewAllCallback();
      } else {
        this.$element
          .val(this.updater(val))
          .change();
        this.hide();
      }
    }
    this.viewItemCallback(val, id, this);
    loseFocus();
  };


  FacetedTypeahead.prototype.show = function show() {
    if ((!this.isFaceted) && (this.$positionElement.length === 0)) {
      FacetedTypeaheadBaseClass.show.call(this);
    } else {
      var $targetEl = this.$positionElement ? this.$positionElement : this.$element;
      var pos = $.extend({}, $targetEl.position(), {
          height: this.$element[0].offsetHeight
      });

      this.$menu
        .insertAfter(this.$element)
        .css({
            top: pos.height + this.offsetPosY,
            left: pos.left
        })
        .show();

        this.shown = true;
      return this;
    }
  };

  FacetedTypeahead.prototype.matcher = function matcher(item){
    if (!this.isFaceted) {
      return FacetedTypeaheadBaseClass.matcher.call(this, item);
    } else {
      var v = item.value;
      if(!v){
        v = '';
      }
      return ~v.toLowerCase().indexOf(this.query.toLowerCase());
    }
  };

  FacetedTypeahead.prototype.sorter = function sorter(items) {
    // Don't sort anything. Google doesn't allow it and the asset search
    // orders by relevance.
    return items;
  };

  FacetedTypeahead.prototype.highlighter = function highlighter(item) {
    if (!this.isFaceted) {
      return FacetedTypeaheadBaseClass.highlighter.call(this, item);
    } else {
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
      return item.value.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
        return '<strong>' + match + '</strong>';
      });
    }
  };

  FacetedTypeahead.prototype.render =function render(items) {
    if (!this.isFaceted) {
      return FacetedTypeaheadBaseClass.render.call(this, items);
    } else {
      var that = this;
      var curFacet, curFacetEl, curFacetULEl;
      var facetName;
      var secondaryInfo;

      // clear old menu
      this.$menu.find('ul').html('');

      // check for new items
      $.each(items, function(i, item) {
        var itemEl = $(that.options.item);
        //itemEl.attr('data-facet', item.facet);
        itemEl.attr('data-value', item.value);
        itemEl.attr('data-id', item.id);

        if (i===0) {
          facetName = that.topResultLabel;
          secondaryInfo = item.facet + ', ' + item.location;
        } else {
          facetName = item.facet;
          secondaryInfo = item.location;
        }

        itemEl.find('a').html(that.highlighter(item) + ' (' + secondaryInfo + ')');

        if (curFacet !== facetName) {
          curFacetEl = $(that.facet);
          curFacetEl.find('div.facet-name').html(facetName);
          curFacetULEl = curFacetEl.find('ul.facet-results');
          curFacetULEl.append(itemEl[0]);

          // append prior facet html
          that.$menu.find('> ul').append(curFacetEl[0]);
          curFacet = facetName;

        } else {
          curFacetULEl.append(itemEl[0]);
        }
      });

      if (items.length > 0) {
        // need view all item at bottom for proper layout
        this.$menu.find('>ul').append(that.viewAll);
        // set the first one active
        this.$menu.find('li[data-value]').first().addClass('active');
      }

      return this;
    }
  };

  FacetedTypeahead.prototype.next = function next(event) {
    if (!this.isFaceted) {
      FacetedTypeaheadBaseClass.next.call(this, event);
    } else {
      var active = this.$menu.find('.active').removeClass('active'),
          next = active.next();

      // step down list through hierarchy by facet to View All
      if (!next.length) {
        // see if facet has next
        var nextFacet = active.closest('.facet').next();
        if (!nextFacet.length) {
          // no more facets, start at top
          next = $(this.$menu.find('[data-value]')[0]);
        } else {
          // first item in next facet
          next = nextFacet.find('[data-value]:first-child');
          if (!next.length) {
            if (nextFacet.is('[data-value]')) {
              // view all link
              next = nextFacet;
            } else {
              // start at top again
              next = $(this.$menu.find('[data-value]')[0]);
            }
          }
        }
      }
      // add the active class
      next.addClass('active');
    }
  };

  FacetedTypeahead.prototype.prev = function prev(event) {
    if (!this.isFaceted) {
      FacetedTypeaheadBaseClass.prev.call(this, event);
    } else {
      var active = this.$menu.find('.active').removeClass('active');
      var prev = (active.hasClass('last')) ? active.prev().find('[data-value]:last-child') : active.prev();

      // step up through hierachy by facet
      if (!prev.length) {
        // see if facet has previous
        var prevFacet = active.closest('.facet').prev();
        if (!prevFacet.length) {
          // no more facets, start at bottom
          prev = this.$menu.find('.last');
        } else {
          // last item in next facet
          prev = prevFacet.find('[data-value]:last-child');
          if (!prev.length) {
            // no more facets, start at bottom
            prev = this.$menu.find('.last');
          }
        }
      }

      prev.addClass('active');
    }
  };

  FacetedTypeahead.prototype.listen = function listen() {
    if (!this.isFaceted) {
      FacetedTypeaheadBaseClass.listen.call(this);
    } else {
      this.$element
        .on('focus',    $.proxy(this.focus, this))
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this));

      if (this.eventSupported('keydown')) {
        this.$element.on('keydown', $.proxy(this.keydown, this));
      }
    }
  };

  FacetedTypeahead.prototype.mouseenter = function mouseenter(e) {
    if (!this.isFaceted) {
      FacetedTypeaheadBaseClass.mouseenter.call(this, e);
    } else {
      this.mousedover = true;
      this.$menu.find('.active').removeClass('active');
      $(e.currentTarget).addClass('active');
    }
  };

  FacetedTypeahead.prototype.click = function click(e) {
    e.stopPropagation();
    e.preventDefault();
    this.select();
    //this.$element.focus()
  };

  //FACETEDTYPEAHEAD PLUGIN DEFINITION
  $.fn.facetedTypeahead = function facetedTypeahead(options) {
    return this.each(function () {
              var $this = $(this),
                  facetedTypeahead = new FacetedTypeahead(this, options);

              $this.data('facetedtypeahead', facetedTypeahead);
    });
  };

  $.fn.setTypeaheadOptions = function setTypeaheadOptions(options) {
    return this.each(function () {
            var $this = $(this),
                facetedTypeahead = $this.data('facetedtypeahead');
            if (facetedTypeahead){
              facetedTypeahead.source = options.source;
              facetedTypeahead.isFaceted = options.isFaceted;
              facetedTypeahead.viewItemCallback = options.viewItemCallback;
              if(!facetedTypeahead.isFaceted){
                  facetedTypeahead.$menu = $($.fn.typeahead.defaults.menu);
              } else {
                  facetedTypeahead.$menu = $(facetedTypeahead.options.menu);
              }

              facetedTypeahead.$menu
                .on('click', $.proxy(facetedTypeahead.click, facetedTypeahead))
                .on('mouseenter', 'li[data-value]', $.proxy(facetedTypeahead.mouseenter, facetedTypeahead))
                .on('mouseleave', 'li[data-value]', $.proxy(facetedTypeahead.mouseleave, facetedTypeahead));
            }
          });
  };


  $.fn.facetedTypeahead.defaults = {
    source: [],
    items: 8,
    facet: '<li class="facet"><div class="facet-name"></div><ul class="facet-results unstyled"></ul></li>',
    menu: '<div class="typeahead typeahead-faceted dropdown-menu"><ul class="unstyled"></ul></div>',
    item: '<li><a href="#"></a></li>',
    viewAll: '<li class="last" data-value="all"><a>View All Results</a></li>',
    topResultLabel: 'Top Result',
    minLength: 1,
    isFaceted: true,
    positionElementID: null,
    offsetPosY: 0,
    viewAllCallback: null,
    viewItemCallback: null
  };

  $.fn.facetedTypeahead.Constructor = FacetedTypeahead;

  return {
    FacetedTypeahead: FacetedTypeahead
  };

});
