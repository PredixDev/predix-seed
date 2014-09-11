define(["widgets/common/iids-widget","declarative-visualizations","json!./bar.schema.json","text!./bar.tmpl"], function(IIDSWidget, d3, Schema, Template) {
    var Bar = IIDSWidget.extend({
        schema: Schema,
        template: Template,
        _initComponent:function(){
            if (this._component === null){
                this._component = d3.bar(this.$view.get(0).children[0]);    
            }
        }
    });
    return  Bar; 
});