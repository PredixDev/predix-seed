/* ========================================================================
 * Slider: slider.js v1.0
 * ========================================================================
 * Copyright 2013 General Electric, Inc.
 * ======================================================================== */
define(['jquery'], function ($) {

  (function ($) {

    "use strict"; // jshint ;_;

    // SLIDER CLASS DEFINITION
    // =======================
    var Slider = function (element, options) {

      this.diff;
      this.position = 0;
      this.settings = options;
      this.valueIndex = 0;

      // Element handles
      this.$body = $('body');
      this.$source = $(element);
      this.$target = $(Slider.TEMPLATE);
      this.$track = this.$target.find('.track');
      this.$thumb = this.$target.find('.thumb');
      this.$buttons = this.$target.find('.slider-button');
      this.$buttonLess = this.$target.find('.less button');
      this.$buttonMore = this.$target.find('.more button');
      this.$label = this.$target.find('label');
      this.$highlight = this.$target.find('.highlight');
      this.$trackAndThumb = this.$target.find('.track-and-thumb');
      this.$tickmarks = this.$target.find('.tickmarks');
      this.$scale = this.$target.find('.scale');
      this.$sliderContent = this.$target.find('.slider-content');

      // Copy class names from source to preserve style
      this.$target.addClass(this.$source.prop('className'));

      // Hide source input element
      this.$source.hide();

      // insert new element
      this.$source.after(this.$target);

      // ensure modernizer
      if (typeof Modernizr !== 'undefined' && Modernizr.touch) {
        this.touchCapable = true;
      };

      // Option settings
      // maintaint order in which the following methods are invoked

      this.setLabelPosition();
      this.setThumbDisplay();
      this.setButtons();
      this.drawButtonPosition();
      this.setThumbOffset();

      this.setDiff();
      this.setSteps();
      this.setStep();
      this.setScaleStep();
      this.setValues();
      this.setScaleValues();

      this.drawLabelWidth();

      this.setPositions();
      this.setScalePositions();

      // setup events
      this.initializeEvents();
      
      // Numeric scale markers
      if(this.settings.scale > 0) {
        this.drawScale();
      }

      this.setValue(this.settings.value,true);
      this.onCreate();
    };

    Slider.DEFAULTS = {
      highlight: '#009ae1',
      buttons: true,
      buttonPosition: 'apart',
      tickmarks: 0,
      scale: 0,
      labelPosition: 'outside',
      labelInterval: 20,
      labelValue: '',
      labelPrefix: '',
      labelSuffix: '',
      snap: false,
      steps: 0,
      round: 0,
      onChange: null,
      onCreate: null,
      onSlide: null,
      onStart: null,
      onStop: null
    };

    Slider.TEMPLATE = ''+
      '<div class="slider">'+
        '<div class="slider-container">'+
          '<div class="slider-ui">'+
            '<div class="slider-button less">'+
              '<button>'+
                '<i class="icon-minus"></i>'+
              '</button>'+
            '</div>'+
            '<div class="slider-content">'+
              '<div class="interactive">'+
                '<label>Label</label>'+
                '<div class="track-and-thumb">'+
                  '<div class="track-positioner">'+
                    '<div class="track"></div>'+
                    '<div class="highlight"></div>'+
                    '<button class="thumb"></button>'+
                    '<div class="scale"></div>'+
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="slider-button more">'+
              '<button>'+
                '<i class="icon-plus"></i>'+
              '</button>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>';

    Slider.prototype = {

      onCreate: function() {
        if($.isFunction(this.settings.onCreate)) {
          this.settings.onCreate.apply(this,[this.value]);
        }
      },

      onChange: function(silent) {
        if($.isFunction(this.settings.onChange) && 
          silent != true) {
            this.settings.onChange.apply(this,[this.value]);
        }
      },

      onSlide: function() {
        if($.isFunction(this.settings.onSlide)) {
          this.settings.onSlide.apply(this,[this.value]);
        }
      },

      onStart: function() {
        if($.isFunction(this.settings.onStart)) {
          this.settings.onStart.apply(this,[this.value]);
        }
      },

      onStop: function() {
        if($.isFunction(this.settings.onStop)) {
          this.settings.onStop.apply(this,[this.value]);
        }
      },
      
      setButtons: function () {
        if(this.settings.buttons == true) {
          this.$buttons.show();
          this.$target.addClass('with-buttons');
        } else {
          this.$buttons.hide();
        }
      },

      setButtonPosition: function(position) {
        if(this.settings.buttonPosition !== position) {
          this.settings.buttonPosition = position;
          this.drawButtonPosition();
        }
      },

      drawButtonPosition: function() {
        if(this.settings.buttonPosition == 'together') {
          this.$target
            .addClass('buttons-together')
            .find('.slider-button.less')
            .detach()
            .insertAfter(this.$target.find('.slider-content'));
        }
      },

      setDiff: function () {
        this.diff = this.settings.max - this.settings.min;
      },

      setSteps: function() {
        // default step to 1
        if(this.settings.steps<=0) {
          this.settings.steps = this.diff;
        }
      },

      setStep: function() {
        // interval step for each snap step
        this.step = this.diff / this.settings.steps;
      },

      setScaleStep: function() {
        // interval step for each numeric scale label 
        this.scaleStep = this.diff / this.settings.scale;
      },

      setValues: function() {
        // set array of allowed values for snap steps
        this.values=[this.settings.min];
        for(var i=1;i<this.settings.steps;i++) {
          this.values.push( (this.step*i) + this.settings.min);
        }
        this.values.push(this.settings.max);
      
      },

      setScaleValues: function() {
        // set array of allowed values for scale labels
        this.scaleValues=[this.settings.min];
        for(var i=1;i<this.settings.scale;i++) {
          this.scaleValues.push(this.scaleStep*i);
        }
        this.scaleValues.push(this.settings.max);
      },

      setPositions: function() {
        // set array of left percentage positions that match values
        // these are the 'steps' used when snap is set to true
        this.valuesInterval = 100 / this.settings.steps;
        this.positions = [0];
        for(var i=1, l=this.values.length-1; i<l; i++) {
          this.positions.push(this.valuesInterval*i);
        }
        this.positions.push(100);
        /*
        for(i=0;i<this.positions.length;i++) {
          this.$track.append($('<span style="position:absolute;left:'+this.positions[i]+'%">|</span>'));
        }
        */
        
      },

      setScalePositions: function() {
        // set array of left positions that match scale label values
        this.scaleInterval = 100 / this.settings.scale;
        this.scalePositions = [0];
        for(var i=1, l=this.scaleValues.length-1; i<l; i++) {
          this.scalePositions.push(this.scaleInterval*i);
        }
        this.scalePositions.push(100)
        /*
        for(i=0,l=this.scalePositions.length; i<l; i++) {
          this.$track.append($('<span style="position:absolute;left:'+this.scalePositions[i]+'%">|</span>'));
        }
        */
      },

      setLabelPosition: function () {
        // inside || outside
        if (this.settings.labelPosition == 'outside') {
          this.$label.detach();
          this.$label.prependTo(this.$target);
        } else {
          this.$sliderContent.css('padding-left','0');
        }
      },

      drawLabelWidth: function() {
        
        // find longest possible label string
        // use it to predict maximum necessary width of label
        var length =
          this.values.length,
          longestValue = '',
          newWidth,
          value;

        for(var i=0;i<length;i++) {
          value = this.values[i].toString();
          if(value.length > longestValue.length) {
            longestValue = value;
          }
        }

        // fill the label with longest possible text
        this.$label.html(
            '<span class="prefix">' + this.settings.labelPrefix + '</span>' + this.round(longestValue)
                + '<span class="suffix">' + this.settings.labelSuffix + '</span>'
        );

        // set width of label element
        newWidth = (this.$label.width() + 40) + 'px';
        this.$label.css('min-width', newWidth);
        this.$label.css('width', newWidth);

      },

      setThumbOffset: function () {
        this.thumbOffsetPixels = parseInt(
          this.$thumb.css('left').split('px')[0], 10);
        this.thumbOffset = this.thumbOffsetPixels / this.$track.width() * 100;
      },

      setThumbDisplay: function () {
        if(this.settings.scale > 0) {
          this.$thumb.addClass('pointy');
        } else {
          this.$thumb.addClass('square');
        }
      },

      initializeEvents: function () {

        // attach click events for track, thumb and highlight
        this.$trackAndThumb.on({
          mousedown: $.proxy(this.trackDown, this),
          touchstart: $.proxy(this.trackDown, this)
        });

        // increment
        this.$buttonMore.on({
          mousedown: $.proxy(this.incrementValue, this)
        });

        // decrement
        this.$buttonLess.on({
          mousedown: $.proxy(this.decrementValue, this)
        });

      },

      trackDown: function (e) {
        // ensure mouse click or touch
        if (e.which === 1) {
          
          if(e.target.setCapture) { e.target.setCapture(); }

          // track move and mouseup need to be on body
          var that = this;
          document.onmousemove = function(e) {
            that.trackMove(e);
          };
          document.ontouchmove = function(e) {
            that.trackMove(e);
          };
          document.onmouseup = function(e) {
            that.trackUp(e);
          };
          document.ontouchend = function(e) {
            that.trackUp(e);
          };

          this.dragging = true;
          this.dragPosition(e);
          this.onStart();
        };
        return false;
      },

      trackMove: function (e) {
        if(this.dragging === true) {
          // throttle mousemove events using timeout
          if(typeof(this.moveTimeout) != 'undefined') {
            clearInterval(this.moveTimeout);
          }
          var that = this;
          this.moveTimeout = setTimeout(function(){ 
            that.dragPosition(e);
            that.onSlide();
          }, 10);
        };
        return false;
      },

      trackUp: function (e) {
        // ensure mouse click or touch
        if (e.which === 1 && this.dragging == true) {
          
          if(e.target.releaseCapture) {
            e.target.releaseCapture(); 
          }
          
          this.dragging = false;
          this.dragPosition(e);

          // track move and mouseup need to be on body
          var that = this;
          document.onmousemove = null;
          document.ontouchmove = null;
          document.onmouseup = null;
          document.ontouchend = null;

          this.onStop();
        };
        return false;
      },

      dragPosition: function (e) {
        // find relative x coordinate
        var parentOffset = this.$trackAndThumb.offset();
        var xPos = e.clientX || e.originalEvent.touches[0].clientX || e.originalEvent.changedTouches[0].clientX;
        var pixelPosition = xPos - parentOffset.left;
        var position = pixelPosition / this.$track.width() * 100;
        if(position !== this.position) {
          if(position <= 0 ) { position = 0; };
          if(position >= 100) { position = 100; };
          this.setPosition(position);
        }
      },

      setPosition: function (position) {
        if(this.position != position) {
          if(this.settings.snap == true) {
            this.position = this.nearestPosition(position);
          } else {
            this.position = position;
          }
          this.changedPosition();
        }
      },

      changedPosition: function () {
        this.setRatio( this.position / 100 );
        this.setValue( this.getValueFromRatio(this.ratio) );
        this.updateDOM();
      },

      getRatioFromValue: function(value) {
        var index = this.values.indexOf(value);
        return Math.abs( index / this.values.length );
      },

      getPositionFromRatio: function(ratio) {
        this.trackWidth = this.$track.width();
        return ratio * this.trackWidth;
      },

      getPositionFromValue: function(value) {
        // given a value tell me it's x coordinate
        var index = this.values.indexOf(value);
        return this.positions[index];
      },

      setValue: function(value,silent) {
        if(this.value !== value) {
          this.valueIndex = this.values.indexOf(value);
          if(this.valueIndex === -1) {
            // value not found in possibilities
            // approxiate to nearest in allowed values
            this.value = this.nearestValueFromValue(value);
            this.valueIndex = this.values.indexOf(this.value);
          } else {
            this.value = value;
          }
          this.changedValue(silent);
        }
      },

      changedValue: function(silent) {
        if(this.dragging !== true) { 
          this.setPosition( this.positions[this.valueIndex] );
        }
        this.setRatio( this.position / this.trackWidth );
        this.updateDOM();
        this.onChange(silent);
      },

      updateDOM: function () {

        // update thumb position
        this.$thumb.css({
          left: (this.position + this.thumbOffset) + '%'
        });
        
        // update highlight width and color
        this.$highlight.css({
          'background-color': this.settings.highlight,
          'width': this.position + '%'
        });
        
        // update value attribute on input
        this.$source.attr('value', this.value);

        // update label value
        if(this.settings.labelValue === '') {
          this.$label.html(
              '<span class="prefix">' + this.settings.labelPrefix + '</span>' +
              this.round(this.value) +
              '<span class="suffix">' + this.settings.labelSuffix + '</span>'
          );
        } else {
          this.$label.html(this.settings.labelValue);
        }

      },

      nearestInSet: function(value,set) {
        
        var i,
          candidate,
          nearest = set[0],
          l = set.length,
          diffA,
          diffB;

        for(i=0;i<l;i++) {
          candidate = set[i];
          diffA = Math.abs(candidate - value);
          diffB = Math.abs(nearest - value);
          if(diffB >= diffA ) {
            nearest = candidate;
          }
        }

        return nearest;

      },

      nearestPosition: function(position) {

        return this.nearestInSet(position,this.positions);
      
      },

      nearestValueFromValue: function(value) {

        return this.nearestInSet(value,this.values);

      },

      nearestValueFromRatio: function () {
        
        // derive correct value from set of possible values 
        var i,
          candidateRatio,
          valueSet = this.values,
          nearestRatio = 100, 
          nearestValue = this.values[0],
          length = this.values.length,
          diffA,
          diffB;

        for(i=0;i<length;i++) {
          candidateRatio = (valueSet[i] - this.settings.min) / this.diff;
          diffA = Math.abs(candidateRatio - this.ratio);
          diffB = Math.abs(nearestRatio - this.ratio);
          if(diffB >= diffA) {
            nearestRatio = candidateRatio;
            nearestValue = valueSet[i];
          }
        }

        return nearestValue;
      
      },

      setRatio: function(ratio) {
        // position between 0 and 1
        if(this.ratio != ratio) {
          this.ratio = ratio;
        }
      },

      getValueFromRatio: function(ratio) {
        switch(ratio) {
          case 1:
            return this.settings.max;
            break;
          case 0:
            return this.settings.min;
            break;
          default:
            return this.nearestValueFromRatio();
        }
      },

      incrementValue: function () {
        var newIndex = this.valueIndex+1;
        if(newIndex < this.values.length) {
          this.valueIndex = newIndex;
          var newValue = this.values[newIndex];
          this.setValue(newValue);
        }
      },

      decrementValue: function () {
        var newIndex = this.valueIndex-1;
        if(newIndex >= 0) {
          this.valueIndex = newIndex;
          var newValue = this.values[newIndex];
          this.setValue(newValue);
        }
      },

      round: function(value) {
        var divisor = Math.pow(10,this.settings.round);
        return parseInt((value * divisor), 10) / divisor;
      },

      drawScale: function () {

        var scale =
          this.settings.scale,
          tickmarks = 
          this.settings.tickmarks,
          html = '',
          scaleValueInterval = this.diff / scale,
          tickInterval = this.scaleInterval / tickmarks;

        for(var i=0, l=this.scalePositions.length;i<l;i++) {
          html += '<div style="left:'+ (this.scalePositions[i]) +'%">'+
            '<span>'+this.scaleValues[i]+'</span></div>';
          if(tickmarks>0) {
            html += '<span class="tick double" style="left:'+
              this.scalePositions[i]+'%"></span>';
            if(i<l-1) {
              for(var j=1;j<tickmarks;j++) {
                var tickPosition = this.scalePositions[i]+(tickInterval*j);
                html += '<span class="tick" style="left:'+
                  tickPosition+'%"></span>';
              }
            }
          }
        }
        
        this.$target.addClass('with-scale');
        
        if(tickmarks > 0) {
          this.$target.addClass('with-tickmarks');
        }

        this.$scale.html(html);
        this.$scale.show();
      
      }

    };

    // add to jquery
    $.fn.slider = function (option, val) {

      return this.each(function () {

        var $this = $(this);

        var elementAttributes = {
          value: Number($this.val()),
          min: Number($this.attr('min')),
          max: Number($this.attr('max'))
        };
 
        var dataOptions = $this.data();
        var reformedOptions = {};
        var key;
        // convert names and types
        for (key in dataOptions) {
          if (dataOptions.hasOwnProperty(key)) {
            // extract keyname
            var keyname = key.charAt(6).toLowerCase() + key.slice(7);
            // convert type
            var type = typeof( Slider.DEFAULTS[keyname] );
            switch(type) {
              case 'boolean':
                reformedOptions[keyname] = Boolean(dataOptions[key]);
                break;
              case 'number':
                reformedOptions[keyname] = Number(dataOptions[key]);
                break;
              case 'object':
                reformedOptions[keyname] = Object(dataOptions[key]);
                break;
              default:
                reformedOptions[keyname] = String(dataOptions[key]);
            }
          }
        }

        var data = $this.data('slider-object');

        // merge options
        var options = $.extend(
          {}, 
          Slider.DEFAULTS, 
          reformedOptions,
          elementAttributes,
          typeof option == 'object' && option
        );

        // avoid duplication
        if(!data) {
          $this.data('slider-object', (data = new Slider(this, options)));
        };

      });

    };

  })(window.jQuery);

});






















