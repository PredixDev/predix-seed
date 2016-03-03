Polymer({

  is: 'px-view',

  properties: {

    preload: {
      type: Boolean,
      value: false
    },

    status: {
      type: String,
      observer: '_checkStatus',
      value: 'unloaded'
      // unloaded -> loading -> loaded -> attached -> visible / invisible
    },

    visible: {
      type: Boolean,
      computed: '_computeVisible(route, match, status)',
      observer: '_checkVisible'
    },

    route: {
      type: String,
      value: "",
      observer: '_checkRoute'
    },

    match: {
      type: String,
      value: ""
    },

    tag: {
      type: String,
      value: ""
    },

    url: {
      type: String,
      value: ""
    }

  },

  viewElement: null, // reference to the loaded view element

  ready: function() {
    this._initializeView();
  },

  _initializeView: function() {
    if (this.tag) {
      this._checkStatus(this.status);
    } else {
      // call back when tag value is set
      this.async(function() {
        this._initializeView();
      }, null, 500);
    };
  },

  _attachConditions: function() {
    console.log('match: ', this.match, ', route: ', this.route);
    return (this.route === this.match);
  },

  _loadConditions: function() {
    return (this.url && this.tag && (this._attachConditions() || this.preload));
  },

  // unloaded -> loading -> loaded -> attached
  _checkStatus: function(newValue) {
    switch (newValue) {
      case 'unloaded':
        if(this._loadConditions()) {
          this._loadElement();
        };
        break;
      case 'loading':
        break;
      case 'loaded':
        if (this._attachConditions()) {
          this._attachElement();
        };
        break;
      case 'attached':
        break;
      default:
    };
  },

  _checkRoute: function(newValue) {
    // this route is route
    if (this.match === newValue) {
      this._checkStatus(this.status);
    };
  },

  _computeVisible: function(route, match, status) {
    return (route !== '' &&
            match !== '' &&
            route === match &&
            status === 'attached');
  },

  // observer to visible, set style.display of viewElement
  _checkVisible: function() {
    if(this.viewElement) {
      this.viewElement.style.display = this.visible ? "block" : "none";
    };
  },

  _attachElement: function() {
    this.viewElement = document.createElement(this.tag);
    this.appendChild(this.viewElement);
    this.status = 'attached';
  },

  _loadElement: function() {
    if (this.status === 'unloaded' && typeof this.url !== 'undefined') {
      this.importHref(this.url, function(e) {
        this.status = 'loaded';
      }, function(e) {
        console.log('failure to load ' + this.url, e);
      });
      this.status = 'loading';
    };

  }

});
