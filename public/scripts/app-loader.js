// Grab a reference to our auto-binding template and give it some initial binding values
var app = document.querySelector('#app');

// Sets app default base URL
app.baseUrl = '/';

// Listen for dom change and set app.tabs
app.addEventListener('dom-change', function() {
    console.log('dom-change event');
    app.tabs = [
        {
            "path": "", "icon": "fa-warning", "label": "Alerts",
            "subitems": [
                {"label": "Sub Category 1"},
                {"label": "Sub Category 2"}
            ]
        }, {
            "path": "tab2", "icon": "fa-briefcase", "label": "Cases"
        }
    ];
});

//Global application object
app.global = {
    version: '1.0',
    name: 'Predix Seed',
    session: {}
};


app.loadWebComponents = function() {

    // load webcomponents.js
    var script = document.createElement('script');
    script.async = true;
    script.src = 'bower_components/webcomponentsjs/webcomponents-lite.min.js';
    script.onload = function(){
        // Wait for elements.html async load
        var elements = document.querySelector('#elements');
        if (elements.import && elements.import.readyState === 'complete') {
            onImportLoaded();
        } else {
            elements.addEventListener('load', onImportLoaded);
        };
    };
    document.head.appendChild(script);

    // listen for WebComponentsReady event and set flag
    window.addEventListener('WebComponentsReady', function() {
      app.webComponentsReady = true;
    });

    var onImportLoaded = function() {
        // Fade splash screen, then remove.
        var splashEl = document.getElementById('splash');
        splashEl.addEventListener('transitionend', splashEl.remove);
        document.body.classList.remove('loading');
        // App is visible and ready to load some data!
    };



};

app.loadWebComponents();
