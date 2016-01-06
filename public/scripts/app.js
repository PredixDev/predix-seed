// Grab a reference to our auto-binding template
// and give it some initial binding values
// Learn more about auto-binding templates at http://goo.gl/Dx1u2g
var app = document.querySelector('#app');

// Sets app default base URL
app.baseUrl = '/';

// load webcomponents.js
var script = document.createElement('script');
script.async = true;
script.src = 'bower_components/webcomponentsjs/webcomponents-lite.min.js';
script.onload = finishLazyLoading;
document.head.appendChild(script);

function finishLazyLoading() {

  // Fade splash screen, then remove.
  var onImportLoaded = function() {
    var splashEl = document.getElementById('splash');
    splashEl.addEventListener('transitionend', splashEl.remove);
    document.body.classList.remove('loading');
    // App is visible and ready to load some data!
  };

  // 5. Go if the async Import loaded quickly. Otherwise wait for it.
  var elements = document.querySelector('#elements');
  if (elements.import && elements.import.readyState === 'complete') {
    onImportLoaded();
  } else {
    elements.addEventListener('load', onImportLoaded);
  };

};

window.addEventListener('WebComponentsReady', function() {
  app.webComponentsReady = true;
});
