// Grab a reference to our auto-binding template and give it some initial binding values
var app = document.querySelector('#app');

//Global application object
app.global = {
  version: '1.0',
  name: 'Predix Seed',
  session: {}
};

app.navItems = [{
  "label": "Dashboards",
  "path": "dashboards",
  "icon": "fa-tachometer"
}, {
  "label": "Blank Page",
  "path": "blankpage",
  "icon": "fa-file-o",
  "subitems": [{
    "label": "Blank Sub Page",
    "path": "blankpage/subpage"
  }]
}, {
  "label": "Angular",
  "path": "angular",
  "icon": "fa-briefcase"
}];

app.pxLoginMenuItems = [{
  "url": "/system-preferences",
  "label": "System Preferences"
}, {
  "url": "/group-preferences",
  "label": "Group Preferences"
}, {
  "url": "/user-preferences",
  "label": "User Preferences"
}];

app.footerLinks = [{
  "label": "Privacy",
  "href": "http://www.ge.com/privacy",
  "target": "_blank"
}, {
  "label": "Terms",
  "href": "http://www.ge.com/terms",
  "target": "_blank"
}];

// Sets app default base URL for client-side routing
app.pathPrefix = '#/';

// Listen for dom change and set app.tabs
app.addEventListener('dom-change', function() {
  // console.log('dom-change event');
});

app.addEventListener('route-change', function() {
  console.log('route-change event!');
});

// listen for WebComponentsReady event and set flag
window.addEventListener('WebComponentsReady', function() {
  app.webComponentsReady = true;
});
