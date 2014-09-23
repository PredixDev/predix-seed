'use strict';
define(['jquery',
    'OpenLayers',
    'hogan'],


  function MapPopup($, OpenLayers, hogan) {
    var map,
      layer,

      hoverTemplate = hogan.compile( '<div id="{{id}}" class="popover fade top in">'
                                      + '<div class="arrow"></div>'
                                      + '<h3 id="{{id}}_title" class="popover-title" style="white-space: nowrap;">'
                                        + '<span>{{title}}</span>'
                                        + '<div class="clearfix"></div>'
                                      + '</h3>'
                                      + '<div id="{{id}}_content" class="popover-content">'
                                        + '<div style="white-space: nowrap;">'
                                          + '{{#attribs}}'
                                            + '{{key}}: {{value}}<br>'
                                          + '{{/attribs}}'
                                        + '</div>'
                                      + '</div>'
                                    + '</div>'),

      persistentTemplate = hogan.compile( '<div id="{{id}}" class="popover fade top in">'
                                          + '<div class="arrow"></div>'
                                          + '<h3 id="{{id}}_title" class="popover-title" style="white-space: nowrap;">'
                                            + '<button id="{{id}}_button" class="close">&times;</button>'
                                            + '<span>{{title}}</span>'
                                            + '<div class="clearfix"></div>'
                                          + '</h3>'
                                          + '<div id="{{id}}_content" class="popover-content">'
                                            + '<div style="white-space: nowrap;">'
                                              + '{{#attribs}}'
                                                + '{{key}}: {{value}}<br>'
                                              + '{{/attribs}}'
                                            + '</div>'
                                          + '</div>'
                                        + '</div>'),
      pointOffsetVertical = -6,
      pointOffsetHorizontal = 0;

    var addHoverPopup = function(mapDSMap, overlay, popupTitle) {
      map = mapDSMap;
      layer = overlay;

      var hoverSelectControl = new OpenLayers.Control.SelectFeature(
            layer.getOlOverlay(), {
              hover: true,
              highlightOnly: true,
              eventListeners: {
                featurehighlighted:  function(e){
                      var data = {
                        id: '__popover',
                        feature: e.feature,
                        template: hoverTemplate,
                        panMap: false,
                        title: popupTitle
                      }

                      e.feature.popup = new OpenLayers.Popup.Popover(data);
                      map.olMap().addPopup(e.feature.popup, true);
                   },
                featureunhighlighted: function(e){
                      map.olMap().removePopup(e.feature.popup);
                    }
              }
            }
          );
      map.olMap().addControl(hoverSelectControl);
      hoverSelectControl.activate();

      return this;
    };

    var addPersistentPopup = function(mapDSMap, overlay, popupTitle) {
      map = mapDSMap;
      layer = overlay;

      var clickControl = new OpenLayers.Control.SelectFeature(
            layer.getOlOverlay(), {
              hover: false,
              highlightOnly: true,
              eventListeners: {
                featurehighlighted: function(e){
                    var data = {
                      id: '__popover',
                      feature: e.feature,
                      template: persistentTemplate,
                      panMap: true,
                      title: popupTitle
                    }

                    var p = new OpenLayers.Popup.Popover(data);
                    map.olMap().addPopup(p, true);

                    var $buttonSelector = $('#' + p.id + '_button');
                    if($buttonSelector){
                      $buttonSelector.click(function(e){
                        map.olMap().removePopup(p);
                      });
                    }
                  }
              }
            }
          );
      map.olMap().addControl(clickControl);
      clickControl.activate();

      return this;
    };


    // =====================================================================
    // Subclass for the Openlayers popup to use the bootstrap css
    // =====================================================================
    OpenLayers.Popup.Popover =
      OpenLayers.Class(OpenLayers.Popup.Framed, {

      panMapIfOutOfView: true,
      title: '',
      renderedContent: '',
      feature: null,
      size: new OpenLayers.Size(0,0),
      popoverSize: new OpenLayers.Size(0,0),

      initialize: function(data) {
        this.feature = data.feature;
        this.panMapIfOutOfView = data.panMap;
        this.title = data.title;

        var g = this.feature.geometry;

        if(!g.x){
          g = g.getBounds().getCenterPixel();
        }

        var position = new OpenLayers.LonLat(g.x,g.y);

        var contentData = [];
        $.each(this.feature.attributes, function(k, v){
            contentData.push({key: k, value: v});
        });

        this.renderedContent = data.template.render({ id: data.id,
                                                      title: this.title,
                                                      attribs: contentData });

        var args = [
          data.id, position, this.size, this.renderedContent, null, false, true
        ];
        OpenLayers.Popup.Framed.prototype.initialize.apply(this, args);
      },

      draw: function(px) {

        if (px == null) {
          if ((this.lonlat != null) && (this.map != null)) {
            px = this.map.getLayerPxFromLonLat(this.lonlat);
          }
        }

        var p = $(this.renderedContent);
        this.resizePopover(p);
        this.setPopoverPosition(px, p);

        p.css({
          'width': this.popoverSize.w,
          'position:': 'absolute',
          'z-index': '1',
          'display': 'block'
        });

        this.div = p[0];

        if (this.panMapIfOutOfView) {
          this.panIntoView();
        }

        return this.div;
      },

      processTextNodes: function(node) {
        var max = '', no = 0;
        if (node.nodeType === 3) {
          max = node.nodeValue;
          no = 1;
        } else {
          for (var i = 0, len = node.childNodes.length; i < len; ++i) {
            var child = this.processTextNodes(node.childNodes[i]);
            no = no + child.noTextNodes;
            if(child.longestString.length > max.length){
              max = child.longestString;
            }
          }
        }
        return {longestString: max, noTextNodes: no};
      },


      moveTo: function(px){
        this.setPopoverPosition(px, $('#'+this.id));

        if (this.panMapIfOutOfView) {
          this.panIntoView();
        }
      },

      setPopoverPosition: function(px, $popover){
        var t = (px.y - this.popoverSize.h + pointOffsetVertical) + 'px',
            l = (px.x - Math.ceil(this.popoverSize.w/2) + pointOffsetHorizontal) + 'px';

        $popover.css({
          'top': t,
          'left': l,
        });
      },

      resizePopover: function($popover){
        var d = this.processTextNodes($popover[0]),
            maxContentString = d.longestString,
            textLines = d.noTextNodes,
            canvas = document.createElement('canvas'),
            ctx = canvas.getContext("2d");

        $(this.renderedContent).css({top: -999999, left: -99999}).appendTo('body');

        var id = '#'+this.id,
            $titleSelector = $(id+'_title'),
            $buttonSelector = $(id+'_button'),
            $contentSelector = $(id+'_content');

        ctx.font = $contentSelector.css('font');
        var w = ctx.measureText(maxContentString).width + this.widthPadding($contentSelector);

        if(this.title){
          ctx.font = $titleSelector.css('font');
          var titleWidthPadding = this.widthPadding($titleSelector);
          var titleWidth = ctx.measureText(this.title).width + titleWidthPadding;
          if($buttonSelector[0]){
            var buttonWidth = ctx.measureText($buttonSelector[0].innerText).width;
            titleWidth = titleWidth + buttonWidth + titleWidthPadding/2;
          }
          if(titleWidth > w){
            w = titleWidth;
          }
        }

        // Just get the height: it doesn't need calculating
        var h = $(id).outerHeight();
        $(id).remove();

        this.popoverSize = new OpenLayers.Size(w, h);
      },

      widthPadding: function($selector){
        return ((parseInt($selector.css('padding-left'), 10)) * 2)
      },

      CLASS_NAME: "OpenLayers.Popup.Popover"
    });
    // =====================================================================

    return({
      addHoverPopup:      addHoverPopup,
      addPersistentPopup: addPersistentPopup,
    });

  });
