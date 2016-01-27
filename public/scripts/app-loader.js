'use strict';

// Grab a reference to our auto-binding template and give it some initial binding values
var app = document.querySelector('#app');
app.tabs = [
    {
        'path': '',
        'icon': 'fa-warning',
        'label': 'Alerts',
        'subitems': [
            {
                'label': 'Sub Category 1'
            }, {
                'label': 'Sub Category 2'
            }
        ]
    },
    {
        'path': 'tab2',
        'icon': 'fa-briefcase',
        'label': 'Cases'
    }
];
// Sets app default base URL
app.baseUrl = '/';
app.isEqual = function(a, b) {
    return a === b;
}

// Listen for dom change and set app.tabs
app.addEventListener('dom-change', function() {
    console.log('dom-change event');
});

//Global application object
app.global = {
  version: '1.0',
  name: 'Predix Seed',
  session: {}
};

var loadWebComponents = function() {
  // load webcomponents.js
  var script = document.createElement('script');
  script.async = true;
  script.src = 'bower_components/webcomponentsjs/webcomponents-lite.min.js';
  script.onload = onWebComponentsLoaded;
  document.head.appendChild(script);
};

var onWebComponentsLoaded = function() {
  // Wait for elements.html async load, then fire onImportLoaded
  var elements = document.querySelector('#elements');
  if (elements.import && elements.import.readyState === 'complete') {
    onImportLoaded();
  } else {
    elements.addEventListener('load', onImportLoaded);
  }
};

var onImportLoaded = function() {
  // Fade splash screen, then remove.
  var splashEl = document.getElementById('splash');
  splashEl.addEventListener('transitionend', function() {
    splashEl.parentNode.removeChild(splashEl); // IE 10 doesn't support el.remove()
  });
  document.body.classList.remove('loading');
  onAppLoaded();
};

var onAppLoaded = function() {
  // App is visible and ready to load some data!
  console.log('onAppLoaded');
};

// listen for WebComponentsReady event and set flag
window.addEventListener('WebComponentsReady', function() {
    app.webComponentsReady = true;
});
