/**
 * RequireJS build Config
 * This is configuration for the entire application.
 */
define('text', {load: function() {
}});
require.config({
    enforceDefine: false,
    xhtml: false,
    paths: {
        /*
         * Predix V modules paths
         */
		'px-oauth': 'empty:',
        'px-dashboard': 'empty:',

        'bower_components': '../bower_components',
        directives: 'empty:',
        vruntime: 'empty:',

        //NAMED REFERENCES
        config: 'config',
        iids: 'empty:',

        //Angular App Modules
        'widgets-module': './widget-module',
        'sample-module': './sample-module',


        //angularjs + modules
        angular: 'empty:',
        'angular-resource': 'empty:',
        'angular-route': 'empty:',
        'angular-bootstrap': 'empty:',
        'angular-mocks': 'empty:',

        //angular ui + modules
        'angular-ui-router': 'empty:',

        //Required libs
        'jqueryui': 'empty:',
        jquery: 'empty:',
        lodash: 'empty:',

        // Require JS Plugins
        text: '../bower_components/requirejs-plugins/lib/text',
        order: '../bower_components/requirejs-plugins/src/order',
        async: '../bower_components/requirejs-plugins/src/async',
        depend: '../bower_components/requirejs-plugins/src/depend',
        font: '../bower_components/requirejs-plugins/src/font',
        goog: '../bower_components/requirejs-plugins/src/goog',
        image: '../bower_components/requirejs-plugins/src/image',
        json: '../bower_components/requirejs-plugins/src/json',
        mdown: '../bower_components/requirejs-plugins/src/mdown',
        noext: '../bower_components/requirejs-plugins/src/noext',
        propertyParser: '../bower_components/requirejs-plugins/src/propertyParser',
        Markdown: '../bower_components/requirejs-plugins/lib/Markdown.Converter',
        css: '../bower_components/require-css/css',
        'css-builder': '../bower_components/require-css/css-builder',
        normalize: '../bower_components/require-css/normalize',
        /*
         * IIDx 2.1.0
         * To map IIDx to workbench, please modify path, map and shim section of this require js
         * The following section is copied from iidx require.config.js and path are re-mapped to bower_components/iids folder
         */
        brandkit: 'empty:',
        'cascading-list': 'empty:',
        charts: 'empty:',
        'charts-theme': 'empty:',
        'collapsible-list': 'empty:',
        'datatables-colreorder': 'empty:',
        'datatables-scroller': 'empty:',
        contextmenu: 'empty:',
        'd3-amd': 'empty:',
        datagrids: 'empty:',
        datatables: 'empty:',
        datepicker: 'empty:',
        'declarative-visualizations': 'empty:',
        'ge-bootstrap': 'empty:',
        'iids-navbar': 'empty:',
        'jquery-csv': 'empty:',
        'jqueryui-sortable-amd': 'empty:',
        'jQuery-contextMenu': 'empty:',
        modernizr: 'empty:',
        jumpnav: 'empty:',
        modules: 'empty:',
        prettify: 'empty:',
        respond: 'empty:',
        'responsive-emitter': 'empty:',
        'responsive-tables': 'empty:',
        spinner: 'empty:',
        trays: 'empty:',
        spin: 'empty:',
        highcharts: 'empty:',
        highstock: 'empty:',
        'highcharts-more': 'empty:',
        'bootstrap-datepicker': 'empty:',
        'jquery-ui-touch-punch': 'empty:',
        'multi-step-navigation': 'empty:',
        'twitter-bootstrap-wizard': 'empty:',
        requirejs: 'empty:',
        videoplayer: 'empty:',
        videojs: 'empty:',
        'map-core-component': 'empty:',
        'map-core': 'empty:',
        'map-loader': 'empty:',
        'map-cluster-component': 'empty:',
        'map-cluster': 'empty:',
        'map-street-view': 'empty:',
        'map-layer-list': 'empty:',
        'map-geolocate': 'empty:',
        'map-google-component': 'empty:',
        'map-google': 'empty:',
        'map-markers-component': 'empty:',
        'map-markers': 'empty:',
        'map-popovers': 'empty:',
        'map-search-component': 'empty:',
        'map-search': 'empty:',
        'map-zoom': 'empty:',
        'hogan': 'empty:',
        'underscore': 'empty:',
        OpenLayers: 'empty:',
        'map-layerlist': 'empty:',
        navbar: 'empty:',
        'highcharts.src': 'empty:',
        'highstock.src': 'empty:',
        'highcharts-more.src': 'empty:',
        'bootstrap-switch': 'empty:',
        'oo-utils': 'empty:',
        'toggle-switch': 'empty:',
        'moment': 'empty:',
        'bootstrap-timepicker': 'empty:',
        'timepicker': 'empty:',
        'slider': 'empty:',
        'bootstrap': 'empty:',

        // IIDx additions
        'accordion': 'empty:',
        'bootstrap-affix': 'empty:',
        'bootstrap-alert': 'empty:',
        'bootstrap-button': 'empty:',
        'bootstrap-carousel': 'empty:',
        'bootstrap-collapse': 'empty:',
        'bootstrap-dropdown': 'empty:',
        'bootstrap-modal': 'empty:',
        'bootstrap-popover': 'empty:',
        'bootstrap-scrollspy': 'empty:',
        'bootstrap-tab': 'empty:',
        'bootstrap-tooltip': 'empty:',
        'bootstrap-transition': 'empty:',
        'bootstrap-typeahead': 'empty:',

        'bar-declarative-visualizations': 'empty:',
        'donut-declarative-visualizations': 'empty:',
        'guagedeclarative-visualizations': 'empty:',
        'spiderweb-declarative-visualizations': 'empty:',
        'sortable': 'empty:',

        // Invididual chart modules so we don't load all the charts at once
        'area-chart': 'empty:',
        'area-stacked-chart': 'empty:',
        'bar-chart': 'empty:',
        'bar-stacked-chart': 'empty:',
        'column-chart': 'empty:',
        'column-stacked-chart': 'empty:',
        'donut-chart': 'empty:',
        'line-chart': 'empty:',
        'pie-chart': 'empty:',
        'scatter-chart': 'empty:',
        'spiderweb-chart': 'empty:',
        'spiderweb-comparison-chart': 'empty:',
        'spiderweb-tiny-chart': 'empty:',
        'stock-chart': 'empty:'

        /*
         * End of IIDx path re-map
         */

    },
    /*
     * IIDx use ge-bootstrap internally in their system
     * The follow section use ge-bootstrap map to remap ge-bootstrap path to the path alias above
     * Therefore all IIDx internal ge-bootstrap reference link will not be broken
     */
    map: {
        'ge-bootstrap': {
            'bootstrap/bootstrap-affix': 'bootstrap-affix',
            'bootstrap/bootstrap-alert': 'bootstrap-alert',
            'bootstrap/bootstrap-button': 'bootstrap-button',
            'bootstrap/bootstrap-carousel': 'bootstrap-carousel',
            'bootstrap/bootstrap-collapse': 'bootstrap-collapse',
            'bootstrap/bootstrap-dropdown': 'bootstrap-dropdown',
            'bootstrap/bootstrap-modal': 'bootstrap-modal',
            'bootstrap/bootstrap-popover': 'bootstrap-popover',
            'bootstrap/bootstrap-scrollspy': 'bootstrap-scrollspy',
            'bootstrap/bootstrap-tab': 'bootstrap-tab',
            'bootstrap/bootstrap-tooltip': 'bootstrap-tooltip',
            'bootstrap/bootstrap-transition': 'bootstrap-transition',
            'bootstrap/bootstrap-typeahead': 'bootstrap-typeahead'
        }
    },
    shim: {
        vruntime: {
            deps: ['jquery', 'angular']
        },
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'angular-route': ['angular'],
        'angular-bootstrap': {
            deps: ['angular']
        },
        'angular-resource': ['angular', 'angular-route', 'angular-ui-router'],
        'angular-mocks': {
            deps: ['angular', 'angular-route', 'angular-resource', 'angular-ui-router'],
            exports: 'mock'
        },
        'directives/v-runtime.directives': {
            deps: ['angular']
        },
        'angular-ui-router': ['angular'],
        underscore: {
            exports: '_'
        },

        /*
         * IIDx shim
         * This section shim require for IIDx
         */
        OpenLayers: {
            exports: 'OpenLayers'
        },
        'jquery-csv': [
            'jquery'
        ],
        'bootstrap-switch': ['jquery'],
        'bootstrap-timepicker': ['jquery'],
        'col-reorder-amd': {
            deps: ['jquery', 'datatables']
        },
        'datagrids/datagrids-col-vis': {
            deps: ['jquery', 'datatables']
        },
        'bootstrap-transition': {
            deps: [ 'jquery' ],
            exports: 'bootstrap-transition'
        },
        'bootstrap-affix': [ 'jquery' ],
        'bootstrap-alert': [ 'jquery' ],
        'bootstrap-button': [ 'jquery' ],
        'bootstrap-carousel': [ 'jquery', 'bootstrap-transition' ],
        'bootstrap-collapse': [ 'jquery', 'bootstrap-transition' ],
        'bootstrap-dropdown': [ 'jquery' ],
        'bootstrap-modal': {
            deps: [ 'jquery', 'bootstrap-transition' ],
            exports: '$.fn.modal'
        },
        'bootstrap-popover': [ 'jquery', 'bootstrap-tooltip' ],
        'bootstrap-scrollspy': [ 'jquery' ],
        'bootstrap-tab': [ 'jquery' ],
        'bootstrap-typeahead': [ 'jquery' ],
        'bootstrap-tooltip': {
            deps: [ 'jquery', 'bootstrap-transition' ],
            exports: 'tooltip'
        }
    }
});
