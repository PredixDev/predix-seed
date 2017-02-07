(function(){
  // Define window-level utility function for fetching the URL parameter
  function getURLParameter(theParameter) {
    var params = window.location.search.substr(1).split('&');

    for (var i = 0; i < params.length; i++) {
      var p=params[i].split('=');
      if (p[0] == theParameter) {
        return decodeURIComponent(p[1]);
      }
    }
    return false;
  }

  // If URL flag for developer coaching is found,
  // then create and show path guide (attach to <body> element)
  var coaching = getURLParameter('coach');

  if (coaching === 'true') {
    // Polymer.importHref(['/elements/dev-coach/dev-coach.html'], function(){});
    var link = document.createElement('link');
    link.setAttribute('rel', 'import');
    link.setAttribute('href', '/elements/dev-coach/dev-coach.html');
    document.body.appendChild(link);
  }
}());
