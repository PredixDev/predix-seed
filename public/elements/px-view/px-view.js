Polymer({

  is: 'px-view',

  properties: {

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


    /**
     *
     * Status tracks a px-view component over it's lifecycle
     * Steps: 'unloaded' -> 'loading' -> 'loaded' || 'failed' -> 'attached' -> 'hidden' || 'shown'
     *
     * @attribute status
     * @type String
     * @readonly
     * @access public
     */
    status: {
      type: String,
      value: 'unloaded',
      notify: true,
      reflectToAttribute: true
    },

    /**
     *
     * elementTagName sets the name of the tag to attach to the DOM which must match component name
     *
     * @attribute elementTagName
     * @type String
     * @access public
     */
    elementTagName: {
      type: String,
      value: ""
    },

    /**
     *
     * elementHref defines relative URL path of web component html file
     *
     * @attribute elementHref
     * @type String
     * @access public
     */
    elementHref: {
      type: String,
      value: ""
    },

    /**
     *
     * The display property defines the value of the component's display property when view is shown
     *
     * @attribute elementHref
     * @type String
     * @access public
     * @default 'block'
     */
    display: {
      type: String,
      value: "block"
    }

  },

  observers: [
    '_checkStatus(status, active, preload, elementTagName, elementHref, display)'
  ],

  viewElement: null, // Reference to the loaded view DOM element

  // 'unloaded' -> 'loading' -> 'loaded' || 'failed' -> 'attached' -> 'hidden' || 'shown'
  _checkStatus: function() {
    switch (this.status) {
      case 'unloaded':
        if (this.active || this.preload) {
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
