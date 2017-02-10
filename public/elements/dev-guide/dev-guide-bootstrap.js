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

  // Define window-level function that checks if string value
  // is the name of a defined custom element
  String.prototype.isRegistered = function() {
    switch(document.createElement(this).constructor) {
      case HTMLElement: return false;
      case HTMLUnknownElement: return undefined;
    }
    return true;
  }

  // If URL flag for developer coaching is found,
  // then create and show path guide (attach to <body> element)
  var coaching = getURLParameter('coach');

  function onMainElementLoaded() {
    // Polymer.importHref(['/elements/dev-coach/dev-coach.html'], function(){});
    var link = document.createElement('link');
    link.setAttribute('rel', 'import');
    link.setAttribute('href', '/elements/dev-guide/dev-guide-imports.html');
    link.onload = setTimeout(onCoachingLoaded, 2000);
    document.head.appendChild(link);
  }

  function tourFeature(event) {
    var tourID = event.payload.id;
    if (window.predix.isTouring) {
      window.predix.hopscotch.endTour(false);
      window.predix.isTouring = false;
    }
    window.predix.hopscotch.startTour(window.predix.hopscotchTour['tour' + tourID]);
    window.predix.isTouring = true;
  }

  function onCoachingLoaded() {
    // if "px-path-guide" was registered
    if ( 'px-path-guide'.isRegistered() ) {
      // create a px-path-guide custom element,
      // configure it and attach it to the <body> element
      window.predix = window.predix || {};
      var pathGuideEl = document.createElement('px-path-guide');

      var configProps = ['id', 'completedStepIcon', 'currentStepIcon', 'stepClickEventName'];

      pathGuideEl.id = "path-guide";
      pathGuideEl.completedStepIcon = "fa-check";
      pathGuideEl.currentStepIcon = "fa-circle";
      pathGuideEl.stepClickEventName = window.predix.featureTourEventName;

      for (var i=0; i < configProps.length; i++) {
        pathGuideEl[configProps[i]] = window.predix.pathGuideConfig[configProps[i]] || pathGuideEl[configProps[i]];
      }

      pathGuideEl.pathState =
      {
        name: 'Seed Development',
        steps:
        [
          { id: 1, label: "Basic App", started: true, completed: true, current: false},
          { id: 2, label: "UAA", started: true, completed: true, current: false},
          { id: 3, label: "Asset Data", started: false, completed: false, current: true},
          { id: 4, label: "Analytics", started: false, completed: false, current: false}
        ]
      };
      pathGuideEl.style.position = 'absolute';
      var width = pathGuideEl.clientWidth;
      var halfWidth = width / 2;
      pathGuideEl.style.left = "50%";
      pathGuideEl.style.marginLeft = "-" + halfWidth + "px";
      pathGuideEl.style.marginLeft = "-130px"; // <-------- temporary code
      pathGuideEl.style.top = '10px';

      // pathGuideEl.customStyle['--px-path-guide-step-diameter'] = '20px';
      // pathGuideEl.customStyle['--px-path-guide-step-radius'] = '10px';
      // pathGuideEl.customStyle['--px-path-guide-line-color'] = '#fff';
      // pathGuideEl.customStyle['--px-path-guide-fill-color'] = '#888';
      // pathGuideEl.customStyle['--px-path-guide-font-color'] = '#fff';
      // pathGuideEl.customStyle['--px-path-guide-connector-length'] = '100px';
      // pathGuideEl.customStyle['--px-path-guide-current-step-diameter'] = '24px';
      // pathGuideEl.customStyle['--px-path-guide-current-step-radius'] = '12px';
      // pathGuideEl.customStyle['--px-path-guide-current-step-fill-color'] = '#fff';
      // pathGuideEl.customStyle['--px-path-guide-current-step-line-color'] = '#fff';
      // pathGuideEl.customStyle['--px-path-guide-current-step-font-color'] = '#888';
      // pathGuideEl.customStyle['--px-path-guide-current-step-font-weight'] = 'bold';
      // pathGuideEl.updateStyles();


      window.predix.pathGuideElement = pathGuideEl;
      document.body.appendChild(pathGuideEl);

      window.addEventListener(window.predix.featureTourEventName, tourFeature);
    }
  }

  if (coaching === 'true') {
    var mainElement = document.querySelector('#main-element-import');
    if (mainElement.import && mainElement.import.readyState === 'complete') {
      onMainElementLoaded();
    } else {
      mainElement.addEventListener('load', onMainElementLoaded);
    }
  }
}());
