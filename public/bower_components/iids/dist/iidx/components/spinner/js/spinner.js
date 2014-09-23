define([
  'jquery',
  'brandkit',
  'spin'
], function ($, brandkit, Spinner) {
  // extend jquery to use spinner
  $.fn.spin = function(opts) {
    var options = {
      lines: 10, // The number of lines to draw
      length: 4, // The length of each line
      width: 2, // The line thickness
      radius: 4, // The radius of the inner circle
      rotate: 0, // The rotation offset
      color: brandkit.monochromePalette.grayDarker, // #rgb or #rrggbb
      speed: 1.2, // Rounds per second
      trail: 60, // Afterglow percentage
      shadow: false, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 1038, // The z-index (defaults to 2000000000) thread the needle between fixed header and modal at 1038
      top: 'auto', // Top position relative to parent in px
      left: 'auto' // Left position relative to parent in px
    };

    // map missing values with default values from options
    if (opts && opts !== false) {
        for (var c in options) {
            if (!opts[c]) {
                opts[c] = options[c];
            }
        }
    } else if (opts !== false) { opts = options; }

    this.each(function() {
      var $this = $(this), data = $this.data();
      if (data.spinner) {
        data.spinner.stop();
        delete data.spinner;
      }
      if (opts !== false) {
        data.spinner = new Spinner(opts).spin(this);
      }
    });
    return this;
  };
  // return Spinner object for manual initialization
  return Spinner;
});