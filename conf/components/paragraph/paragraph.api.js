define(["widgets/common/iids-widget", "json!./paragraph.schema.json", "text!./paragraph.tmpl"], function(IIDSWidget, Schema, Template) {
    var Paragraph =  IIDSWidget.extend({
    		schema: Schema,
    		template: Template,
        update:function(data){
            this._updateViewModelWithData(this._transformData(data));
            return this;
        }                
    });

   return  Paragraph; 
});
