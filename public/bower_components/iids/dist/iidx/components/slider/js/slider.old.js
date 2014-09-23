define(['jquery'], function ($) {
  'use strict';
  $.fn.slider = function () {
    return this
      .each(function () {

        // We hide the input element trigger and insert
        // the necessary markup
        var $source = $(this);

        if ($source.data('slider')) {
          return;
        }

        $source.data('slider', true);

        var $parent = $source.parent(),
          $target = $('<div>' +
            '<button class="less slider-button"><i class="icon-minus"></i></button>' +
            '<div class="center">' +
            '<div class="content">' +
            '<label></label>' +
            '<div class="interactive">' +
            '<div class="track-and-thumb">' +
            '<div class="track"></div>' +
            '<button class="thumb">' +
            '<i class="icon-chevron-left"></i>' +
            '<i class="icon-chevron-right"></i>' +
            '</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<button class="more slider-button"><i class="icon-plus"></i></button>' +
            '</div>'),
          $thumb = $target
            .find('.thumb'),
          $sliderButtons = $target
            .find('.slider-button');

        // If the source <input> is wrapped in a label, then
        // grab that text and put it into the right spot in
        // the new markup
        if ($parent.is('label')) {
          var label = $parent.text();
          $target.find('label').text(label);
          $parent.hide();
          $parent = $parent.parent();
        }
        else {
          $target.find('label').hide();
          $source.hide();
        }

        // Make sure the new element gets all the classes
        // of the old one (like span#, for instance).
        $target.addClass($source.prop('className')).appendTo($parent);

        // Set up thumb position range and tracking (%)
        var trackWidth = $target.find('.track').width();
        var thumbPosition = {
          maxPX: trackWidth - $thumb.width()
        };
        thumbPosition.max = thumbPosition.maxPX / trackWidth;

        // Set up value range and tracking
        var value = {
          min: parseFloat($source.attr('min')) || 0,
          max: parseFloat($source.attr('max')) || 1,
          current: parseFloat($source.val())
        };
        value.stepSize = Math.abs(value.max - value.min) / (trackWidth / 4);

        // Moves the thumb to correspond with the current
        // value of the source element
        var updateThumbPosition = function () {
          value.current = parseFloat($source.val());
          thumbPosition.current = value.current / value.max * thumbPosition.max;
          $thumb.css('left', thumbPosition.current * 100 + '%');
        };

        updateThumbPosition();

        var updateValue = function (newValue) {
          newValue = Math.max(Math.min(newValue, value.max), value.min);
          $source.val(newValue);
          $source.trigger('change', [newValue, newValue / (value.max - value.min) * 100, value.min, value.max]);
        };

        // Slider buttons jump the slider by a small step
        // every N ms while held down.
        // If held down long enough, the interval decreases

        var stepInterval = null,
          baseInterval = 150,
          i = 0,
          shouldIncreaseRate = true,
          $document = $(document);

        var increaseRate = function (step) {
          i++;

          if (shouldIncreaseRate && i > 5) {
            shouldIncreaseRate = false;
            clearInterval(stepInterval);
            stepInterval = setInterval(step, baseInterval / 2);
          }
        };

        var stepMore = function () {
          updateValue(value.current + value.stepSize);
          increaseRate(stepMore);
        };

        var stepLess = function () {
          updateValue(value.current - value.stepSize);
          increaseRate(stepLess);
        };

        var cancelStepping = function () {
          clearInterval(stepInterval);
          shouldIncreaseRate = true;
          i = 0;
        };

        /*
         * CUSTOM EVENTS
         */
        $(document).on('change', $source, updateThumbPosition);

        /*
         * BUTTON DATA-API ===============
         */
        $sliderButtons.on('mousedown', function (e) {
          cancelStepping();
          var step = $(this).is('.more') ? stepMore : stepLess;
          step();
          stepInterval = setInterval(step, baseInterval);

          $target.addClass('active');
        });

        $(document).on('mouseup', function (e) {
          cancelStepping();
          $target.removeClass('active');
        });

        /*
         * MOUSE & TOUCH DATA-API ===============
         */
        // The thumb can also be dragged
        var draginfo = {
          startS: false,
        };

        $thumb.on('mousedown touchstart', function (e) {
          draginfo = {
            startS: true,
            startX: e.clientX || e.originalEvent.touches[0].clientX || e.originalEvent.changedTouches[0].clientX,
            startL: $thumb.position().left
          };

          $target.addClass('active');
        });

        $(document).on('mousemove touchmove', function (e) {

          if (draginfo.startS) {
            e.preventDefault();
            var touchClientX = e.clientX || e.originalEvent.touches[0].clientX || e.originalEvent.changedTouches[0].clientX;
            var newPos = Math.max(Math.min(draginfo.startL + (touchClientX - draginfo.startX), thumbPosition.maxPX), 0),
              newValue = newPos / thumbPosition.maxPX * value.max;

            updateValue(newValue);
          }
        });

        $(document).on('mouseup touchend', function (e) {
          if (draginfo.startS) {
            $target.removeClass('active');

            draginfo.startS = false;
          }

        });

      });
  };

  $(function () {
    $('input[type=range].slider').slider();
  });
});
