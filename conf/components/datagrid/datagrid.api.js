define([ "jquery", "vruntime", "datagrids", "json!./datagrid.schema.json", "text!./datagrid.tmpl"], function($, vRuntime, DataGrids, Schema, Template) {
    
    var DataGridWidget = vRuntime.widget.BaseWidget.extend({
        schema: Schema,
        template: Template,
        _datagridOptions: {},
        
        init: function() {
            this._super.apply(this, arguments);
            this._createViewModelFromSchema();
            
            this.koShowSearchField = ko.computed(function() {
                return this.showSearchField() === "true";
            }, this);
            
            // Stops datatables from using a javascript alert for its error messages, and throws them instead. This would cause the table not to render at all if there are any missing data points.
            // $.fn.dataTableExt.sErrMode = "throw";
        },
        
        /*
         * Create the widget and put it on the screen
         */
        render: function(widgetOptions) {
            this.update();

            this.show();
        },
        
        /*
         * Update the view model with data from the property editor
         */
        update: function(data) {
            // Disable the datatables javascript alert when there is missing data. There is no option in datatables to disable it, so I override the window.alert() function before the table is rendered
            // and reset window.alert() once the table finishes rendering.
            var __alert = window.alert;
            window.alert = function() {};
            
            this._updateViewModelWithData(this._transformData(data));
            this._datagridOptions = _compileDatagridOptions.call(this);
            
            // Make sure that a new event handler is not set for the chart each time render is called
            this.$view.find(".datagrid-widget-filter").off("submit").on("submit", function() {
                return false;
            });
            
            ko.applyBindings(this, this.$view.find(".datagrid-widget")[0]);
            
            if (this.getComponent() == null) {
                this._initComponent();
            } else {
                this._component.fnClearTable();
                this._replaceColumnNames();
                this._component.fnAddData(this._datagridOptions.aaData);
            }
            
            window.alert = __alert;
        },
        
        _initComponent: function() {
            //Datatables will break if the length of the column titles is different than the length of the row data, so don't render the chart if thats the case
            if (this._datagridOptions.aoColumns.length != 0 && this._datagridOptions.aaData.length != 0) {
                this.$view.find(".datagrid-widget > table").iidsBasicDataGrid(this._datagridOptions);
                this._component = this.$view.find('table').dataTable();
            }
        },
        
        _replaceColumnNames: function() {
            var $headers = this.$view.find("thead > tr > th");
            for (var i = 0; i < this.columnNames().length; i++) {
                $($headers.get(i)).text(this.columnNames()[i]);
            }
        }
    });
    
             
    var _compileDatagridOptions = function() {
        var options = {
            useFloater: false,
            aoColumns: _getColumnData.call(this),
            aaData: _getRowData.call(this)
        };
        
        if (this.paginate() === "false") {
            $.extend(options, {
                bPaginate: false,
                bLengthChange: false,
                bInfo: false
            });
        }
        
        return options;
    };
             
    var _getColumnData = function() {
        var columns = [];
        
        //The length of the header row and the length of the data rows must be equal,
        //or else Datatables will break.
        
        if (this.columnNames().length == 0) {
            var rowLength = 0;
            if (this.data().length) {
                rowLength = Object.keys(this.data()[0]).length;
            }
            
            for (var i = 0; i < rowLength; i++) {
                columns.push(null);
            }
        } else {        
            for (var i = 0; i < this.columnNames().length; i++) {
                var columnDataTablesObj = {
                    'sTitle': this.columnNames()[i]
                };
                columns.push(columnDataTablesObj);
            }
        }
        
        return columns;
    };
    
    var _getRowData = function() {
        var rows = [];
        for (var i = 0; i < this.data().length; i++) {
            var rowData = [];
            var dataPoint = this.data()[i];
            for (var j = 0; j < this.columnKeys().length; j++) {
                var columnData = dataPoint[this.columnKeys()[j]];
                rowData.push(columnData);
            }
            rows.push(rowData);
        }
        
        return rows;
    };
    
    return DataGridWidget;
});