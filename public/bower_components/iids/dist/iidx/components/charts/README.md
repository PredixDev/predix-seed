# Charts

# Using Themes

Two options are available when setting a theme within the DS

* theme.js - "Light" Theme (default)
* theme-dark.js - "Dark" Theme

To switch themes include the appropriate theme in your require block and activate it.

        define([
          'charts/theme-dark',
          'highstock'
        ], function (theme) {
            Highcharts.setOptions(theme);
        });

# Caveats

Note that due to the nature of the highcharts library only one theme can be applied on a page at a time. If you try to set multiple themes the LAST theme set will apply to all chart objects on the page.        