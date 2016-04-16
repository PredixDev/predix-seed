Polymer({

  is: 'px-view',

  properties: {

    // Boolean: true: preload component html file. false: lazy-load component html on demand

    /**
     *
     * Set the 'preload' attribute on the <px-view> element and the components will be
     * loaded immediately or
     * lazy-loaded on demand. Lazy-loading is on by default to avoid unnecessary HTTP requests.
     *
     * @attribute preload
     * @type Boolean
     * @default false
     */
    preload: {
      type: Boolean,
      value: false
    },

    // public
    // track status of component over lifecycle
    // 'unloaded' -> 'loading' -> 'loaded' -> 'attached' -> 'visible' / 'invisible'
    status: {
      type: String,
      observer: '_checkStatus',
      value: 'unloaded'
    },

    route: {
      type: String,
      value: "",
      observer: '_checkRoute'
    },

    // Pattern - Type: String - Exposure: Public - Required
    // Defines string that must match route value in order to attach and display element
    pattern: {
      type: String,
      value: ""
    },

    // Tag - Type: string - Exposure: public - Required
    // defines tag name of web component element
    elementTagName: {
      type: String,
      value: ""
    },

    // public - required
    // defines URL of element web component html file
    elementHref: {
      type: String,
      value: ""
    },

    // private
    // defines element visibility
    _visible: {
      type: Boolean,
      computed: '_computeVisible(route, pattern, status)',
      observer: '_checkVisible'
    },

    display: {
      type: String,
      value: "block"
    }

  },

  viewElement: null, // reference to the loaded view element

  ready: function() {
    this._initializeView();
  },

  _initializeView: function() {
    if (this.elementTagName) {
      this._checkStatus(this.status);
    } else {
      // call back when tag value is set
      this.async(function() {
        this._initializeView();
      }, null, 500);
    };
  },

  _routeMatches: function() {
    return (this.route === this.pattern);
  },

  _loadConditions: function() {
    return (this.elementHref &&
      this.elementTagName && (
        this._routeMatches() ||
        this.preload
      ));
  },

  // unloaded -> loading -> loaded -> attached
  _checkStatus: function(newValue) {
    switch (newValue) {
      case 'unloaded':
        if (this._loadConditions()) {
          this._loadElement();
        };
        break;
      case 'loading':
        break;
      case 'loaded':
        if (this._routeMatches()) {
          this._attachElement();
        };
        break;
      case 'attached':
        break;
      default:
    };
  },

  _checkRoute: function(newValue) {
    this.route = newValue;
    if (this.pattern === newValue) {
      this._checkStatus(this.status);
    };
  },

  _computeVisible: function(route, pattern, status) {
    return (route !== '' &&
      pattern !== '' &&
      route === pattern &&
      status === 'attached');
  },

  // observer to visible, set style.display of viewElement
  _checkVisible: function() {
    if (this.viewElement) {
      this.viewElement.style.display = this._visible ? this.display : "none";
    };
  },

  _attachElement: function() {
    this.viewElement = document.createElement(this.elementTagName);
    this.appendChild(this.viewElement);
    this.status = 'attached';
  },

  _loadElement: function() {
    if (this.status === 'unloaded' && typeof this.elementHref !== 'undefined') {
      this.importHref(this.elementHref, function(e) {
        this.status = 'loaded';
      }, function(e) {
        console.log('failure to load ' + this.elementHref, e);
      });
      this.status = 'loading';
    };

  }

});
