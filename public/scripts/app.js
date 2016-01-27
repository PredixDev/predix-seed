// Grab a reference to our auto-binding template and give it some initial binding values
var app = document.querySelector('#app');

//Global application object
app.global = {
  version: '1.0',
  name: 'Predix Seed',
  session: {}
};

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

// Listen for dom change and set app.tabs
app.addEventListener('dom-change', function() {
    // console.log('dom-change event');
});

// listen for WebComponentsReady event and set flag
window.addEventListener('WebComponentsReady', function() {
    app.webComponentsReady = true;
});
