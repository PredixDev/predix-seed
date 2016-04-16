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
    // 'unloaded' -> 'loading' -> 'loaded' || 'failed' -> 'attached' -> 'hidden' || 'shown'
    status: {
      type: String,
      value: 'unloaded',
      notify: true,
      reflectToAttribute: true
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

    display: {
      type: String,
      value: "block"
    },

    _load: {
      type: Boolean,
      computed: '_computeLoad(elementHref, elementTagName, active, preload)'
    }

  },

  observers: [
    '_checkStatus(status, active, preload, elementTagName, elementHref, display)'
  ],

  viewElement: null, // Reference to the loaded view DOM element

  _computeLoad: function() {
    return (this.active || this.preload);
  },

  // 'unloaded' -> 'loading' -> 'loaded' || 'failed' -> 'attached' -> 'hidden' || 'shown'
  _checkStatus: function() {
    switch (this.status) {
      case 'unloaded':
        if (this._load) {
          this._loadElement();
        };
        break;
      case 'loading':
        break;
      case 'loaded':
        if (this.active) {
          this._attachElement();
        };
        break;
      case 'attached':
        var newStatus = this.active ? 'shown' : 'hidden';
        this.set('status', newStatus);
        break;
      case 'shown':
        if (this.active) {
          this.viewElement.style.display = this.display;
        } else {
          this.set('status', 'hidden');
        }
        break;
      case 'hidden':
        if (!this.active) {
          this.viewElement.style.display = 'none';
        } else {
          this.set('status', 'shown');
        }
        break;
      default:
        console.log('px-view status has entered unknown state: ', this.status);
    };
  },

  _attachElement: function() {
    this.viewElement = document.createElement(this.elementTagName);
    this.appendChild(this.viewElement);
    this.set('status', 'attached');
  },

  _loadElement: function() {
    this.importHref(this.elementHref, function(e) {
      this.set('status', 'loaded');
    }, function(e) {
      console.log('Failure to load ' + this.elementHref);
      this.set('status', 'failed');
    });
    this.set('status', 'loading');
  }

});
