define(["jquery", "vruntime", "declarative-visualizations"], function ($, vRuntime, d3) {
    /**
     * I am the base widget class for several of the IIDS widgets,
     * such as gauge, message list, paragraph, and bar.
     *
     * @class IIDSWidget
     * @module Common.Views
     * @extends BaseWidget
     * @uses ko.applyBindings
     * @requires $, ko, d3, BaseWidget
     */
    var IIDSWidget = vRuntime.widget.BaseWidget.extend({
        /**
         * I initialize the IIDSWidget class, creating the view model
         * from the schema.
         * @method init
         * @constructor
         */
        init: function () {
            this._super.apply(this, arguments);
            this._createViewModelFromSchema.call(this);
        },
        /**
         * I initialize and render a widget.  Subclasses should
         * implement _initComponent() to initialize the component (bar, gauge, donut, etc.)
         * @method render
         * @param options {Object} The options to pass to the widget during the render method.
         * @returns {IIDSWidget}
         */
        render: function (options) {
            var self = this;

            ko.applyBindings(this, this.$view.get(0).children[0]);
            //for D3 to work, dom must be visible on page
            this.show();
            //initialize IIDS component, e.g. bar, gauge, donut....
            this._initComponent();
            //call update once to update VM to have static values input from settings
            this.update({});
            return this;
        },
        /**
         * I update the widget with the given data for any widget settings fields
         * which are set to $ref.
         *
         * @method update
         * @param data {Object} The data to pass to the widget for updating.
         * @returns {IIDSWidget}
         */
        update: function (data) {
            this._updateViewModelWithData(this._transformData(data));
            this.getComponent().update(this.$view.get(0).children[0]);
            return this;
        }
    });

    return IIDSWidget;
});