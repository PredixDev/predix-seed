// Grab a reference to our auto-binding template and give it some initial binding values
var app = document.querySelector('#app');

//Global application object
app.global = {
  version: '1.0',
  name: 'Predix Seed',
  session: {}
};

app.tabs = [{
  'label': 'Dashboards',
  'path': 'dashboards',
  'icon': 'fa-tachometer'
}, {
  'label': 'Blank Page',
  'path': 'blankpage',
  'icon': 'fa-file-o',
  'subitems': [{
    'label': 'Blank Sub Page',
    'path': 'blanksubpage'
  }]
}, {
  'label': 'Angular',
  'path': 'angular',
  'icon': 'fa-briefcase'
}];

// Sets app default base URL
app.baseUrl = '#!';
// routing.html page.js requires slash at the beginning
app.routingBaseUrl = '/' + app.baseUrl;
// px-app-nav requires slash at the end
app.pathPrefixUrl = app.baseUrl + '/';

// Listen for dom change and set app.tabs
app.addEventListener('dom-change', function() {
  // console.log('dom-change event');
});

// listen for WebComponentsReady event and set flag
window.addEventListener('WebComponentsReady', function() {
  app.webComponentsReady = true;
});
