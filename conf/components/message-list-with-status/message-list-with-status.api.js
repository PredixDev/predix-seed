define(["widgets/common/iids-widget", "json!./message.list.status.schema.json", "text!./message.list.status.tmpl"], function (IIDSWidget, Schema, Template) {
	'use strict';
	return IIDSWidget.extend({
		schema: Schema,
		template: Template,
		update: function (data) {
			this._updateViewModelWithData(this._transformData(data));
			return this;
		}
	});
});