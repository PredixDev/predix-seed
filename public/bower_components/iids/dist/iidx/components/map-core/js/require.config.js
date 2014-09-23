require.config({
  baseUrl: './',
  paths: {
    bootstrap: 'components/bootstrap/docs/assets/js/bootstrap',
    brandkit: 'components/brandkit/js/brandkit',
    'font-awesome': 'components/font-awesome',
    'ge-bootstrap': 'components/ge-bootstrap/js/ge-bootstrap',
    hogan: 'components/hogan/index',
    'iids-navbar': 'components/iids-navbar/js/iids-navbar',
    jquery: 'components/jquery/jquery',
    'jquery-csv': 'components/jquery-csv/src/jquery.csv',
    'map-core': './js/map-core',
    'map-loader': './js/map-loader',
    'map-core-component': './js',
    'map-search-component': 'components/map-search/js',
    'map-layer-list': 'components/map-layerlist/js/map-layer-list',
    'map-geolocate': 'components/map-geolocate/js/map-geolocate',
    'map-google-component': 'components/map-google/js',
    'map-zoom': 'components/map-zoom/js/map-zoom',
    'map-markers-component': 'components/map-markers/js',
    'map-markers': 'components/map-markers/js/map-markers',
    'map-cluster-component': 'components/map-cluster/js',
    'map-popovers': 'components/map-popovers/js/map-popovers',
    'message-list': 'components/message-list/less/message-list.less',
    modernizr: 'components/modernizr/modernizr',
    OpenLayers: 'components/open-layers/dist/OpenLayers',
    prettify: 'components/prettify/prettify',
    respond: 'components/respond/respond.src',
    'd3-amd': 'components/d3-amd/d3',
    'underscore': 'components/underscore-amd/index'
  },
  shim: {
    OpenLayers: {
      exports: 'OpenLayers'
    },
    'jquery-csv': ['jquery']
  }
});
