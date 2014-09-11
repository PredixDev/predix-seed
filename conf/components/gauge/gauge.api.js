define(["widgets/common/iids-widget", "declarative-visualizations", "json!./gauge.schema.json", "text!./gauge.tmpl"], 
        function(IIDSWidget, d3, Schema, Template) {
            var Gauge =  IIDSWidget.extend({
                schema: Schema,
                template: Template,
                _initComponent:function(){
                    if (this._component === null){
                        this._component = d3.gauge(this.$view.get(0).children[0]);    
                    }
                }
            });

    return  Gauge; 
});