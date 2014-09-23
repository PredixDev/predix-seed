/*
 */

define(['jquery', 'datatables', 'ge-bootstrap'], function($) {

    var RowGrouping = function( oDTSettings, resolvedOptions ) {


        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
         * Public class variables
         * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


        this.options = resolvedOptions;

        /* Store global reference */
        RowGrouping.aInstances.push( this );

        /* Constructor logic */
        this.dt = oDTSettings;
        this.init();
        return this;
    };



    RowGrouping.prototype = {

        /**
         * Wrapper for the button and anchor container
         *
         *  @default  defined by options.rowGroupingDropdownSelector
         */
        $groupingDropdownContainer: null,

        /**
         * Which column the table is currently grouped by
         *
         *  @default  per options
         */
        groupingCol: null,

        /**
         * All of anchors in the gourping dropdown
         *
         *  @default
         */
        groupingAnchors: [],

        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
         * Public methods
         * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

        /**
         * Rebuild the list of buttons for this instance (i.e. if there is a column header update)
         *  @method  fnRebuild
         *  @returns void
         */
        fnRebuild: function () {
            /* Remove the old anchors */
            for ( var i=this.groupingAnchors.length-1 ; i>=0 ; i-- )
            {
                if ( this.groupingAnchors[i] !== null )
                {
                    this.dom.collection.removeChild( this.groupingAnchors[i] );
                }
            }
            this.groupingAnchors.splice( 0, this.groupingAnchors.length );

            /* Re-add them (this is not the optimal way of doing this, it is fast and effective) */
            this._addAnchors();

            /* Update the row grouping */
            this._groupRows(this.groupingCol);
        },



        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
         * Private methods (they are of course public in JS, but recommended as private)
         * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

        /**
         * Constructor logic
         *  @method  init
         *  @returns void
         *  @private
         */
        init: function () {

            var _this = this,
                i,
                iLen;

            this.initialRenderGrouping = this.options.defaultGroupingCol;

            this.$groupingDropdownContainer = this._buildDropdownContainer();

            /* Update on each draw */
            this.dt.aoDrawCallback.push( {
                "fn": function () {
                    if ($(_this.dt.nTable).find('tbody td[class!="dataTables_empty"]').length > 0) {
                        _this._groupRows.call(_this, _this.initialRenderGrouping || _this.groupingCol);
                        _this.initialRenderGrouping = null; // null out, only used for first pass.
                    }
                },
                "sName": "RowGrouping"
            } );

            /* If columns are reordered, then we need to update our group list and
             * rebuild the displayed list
             */
            $(this.dt.oInstance).bind( 'column-reorder', function ( e, oSettings, oReorder ) {
                for ( i=0, iLen=_this.options.aiExclude.length ; i<iLen ; i++ ) {
                    _this.options.aiExclude[i] = oReorder.aiInvertMapping[ _this.options.aiExclude[i] ];
                }

                _this.fnRebuild();
            } );
        },

        _groupRows: function(newGroupingCol) {
            var dt = this.dt,
                _this = this,
                i,
                colName,
                colIdx;

            if (dt.aiDisplay.length == 0 || newGroupingCol === this.groupingCol) {
                return;
            }

            if (this.groupingCol) {
                //find existing grouping rows and remove
                $(dt.nTable).find('tr[data-grouping-row]').remove();
                $(dt.nTable).find('tr.row-group-member-collapsed').removeClass('row-group-member-collapsed');
            }

            for (i = 0; i < dt.aoColumns.length; i++) {
                colName = dt.aoColumns[i].mData;
                if (newGroupingCol === colName) {
                    //hide column to be hidden via grouping
                    dt.oInstance.fnSetColumnVis( i, /*show*/false, /*redraw*/false );
                    colIdx = i;
                }
                else if (this.groupingCol === colName) {
                    //show column previously hidden via grouping
                    dt.oInstance.fnSetColumnVis( i, /*show*/true, /*redraw*/false );
                }
            }

            dt.oInstance.fnAdjustColumnSizing(/*redraw*/false);

            this.groupingCol = newGroupingCol;

            if (newGroupingCol) {
                dt.oInstance.fnSort([[colIdx,'asc']]);
                var $trs = $(dt.nTable).find('tbody tr');
                var numCols = $trs[0].getElementsByTagName('td').length;
                var lastGroupName = "";
                var $row;
                for (i = 0; i < $trs.length; i++) {
                    var displayIdx = dt._iDisplayStart + i;
                    var groupName = dt.aoData[ dt.aiDisplay[displayIdx] ]._aData[this.groupingCol];
                    $row = $trs.eq(i);
                    if (groupName && groupName !== lastGroupName) {
                        var $groupRow = $('<tr class="groupingRow collapsed" data-grouping-row="' + groupName + '"><td colspan="' + numCols + '"><i class="icon-chevron-right"></i> ' + groupName + '</td></tr>');
                        $groupRow.insertBefore($row);
                        $groupRow.click(function(evt) {
                            _this.toggleGroupVisibility($(this), $(this).hasClass('collapsed'), $(dt.nTable).find('tr[data-grouping-row]'));
                        });
                        lastGroupName = groupName;
                    }
                    $row.toggleClass("row-group-member-collapsed");
                }

                //show the expand/collapse all buttons
                this._syncToggleButtons($(dt.nTable).find('tr[data-grouping-row]'));
                this.$groupingDropdownContainer.children('button[data-grouping-toggle-all]').show();
            }
            else {
                //hide the expand/collapse all buttons
                this.$groupingDropdownContainer.children('button[data-grouping-toggle-all]').hide();
            }

            this.$groupingDropdownContainer.find('a').each(function(idx) {
                var $anchor = $(this);
                if ($anchor.attr('data-col') === _this.groupingCol) {
                    $anchor.addClass('selected');
                }
                else if ($anchor.hasClass('clearGrouping')) {
                    if (_this.groupingCol !== null) {
                        $anchor.removeClass('disabled');
                        $anchor.prop('disabled', false);
                    }
                    else {
                        $anchor.addClass('disabled');
                        $anchor.prop('disabled', true);
                    }
                }
                else {
                    $anchor.removeClass('selected');
                }
            });

            if (this.options.fnStateChange){
                this.options.fnStateChange.call(this, this.groupingCol);
            }
        },

        toggleGroupVisibility: function($groupingRow, expand, $allGroupingRows) {
            $groupingRow.toggleClass('collapsed', !expand);
            $groupingRow.find('i').toggleClass('icon-chevron-right', !expand).toggleClass('icon-chevron-down', expand);
            $groupingRow.nextUntil('[data-grouping-row]').each(function(idx, el) {
                $(el).toggleClass("row-group-member-collapsed", !expand);
            });
            this._syncToggleButtons($allGroupingRows);
        },

        _syncToggleButtons: function($allGroupingRows) {
            //status check
            var numCollapsed = $allGroupingRows.filter('.collapsed').length;
            var numExpanded = $allGroupingRows.length - numCollapsed;
            var $collapseAllButton = this.$groupingDropdownContainer.children('button[data-grouping-toggle-all="false"]');
            var $expandAllButton = this.$groupingDropdownContainer.children('button[data-grouping-toggle-all="true"]');
            if (numExpanded === 0) { //handle all have been collapsed
                $collapseAllButton.prop('disabled', true).addClass('disabled');
                $expandAllButton.prop('disabled', false).removeClass('disabled');
            }
            else if (numCollapsed === 0) { //handle all have been expanded
                $collapseAllButton.prop('disabled', false).removeClass('disabled');
                $expandAllButton.prop('disabled', true).addClass('disabled');
            }
            else { //handle in between, enable both buttons
                $collapseAllButton.prop('disabled', false).removeClass('disabled');
                $expandAllButton.prop('disabled', false).removeClass('disabled');
            }
        },

        _buildDropdownContainer: function() {
            var $groupingDropdownContainer, $anchorContainer, _this = this;

            if (this.options.rowGroupingDropdownSelector) {
                $groupingDropdownContainer = $(this.options.rowGroupingDropdownSelector);
                if ($groupingDropdownContainer.length === 0) {
                    throw new Error("Tried to attach row grouping control to element with selector " +
                        this.options.rowGroupingDropdownSelector + " but no element found with that selector");
                }
            }
            else {
                throw new Error("You must specify a valid 'rowGroupingDropdownSelector' for the datagrids-row-grouping plugin.");
            }

            $groupingDropdownContainer.addClass('RowGrouping').addClass('btn-group');

            $groupingDropdownContainer.html('<button class="RowGrouping_dropdown btn dropdown-toggle" data-toggle="dropdown">' + this.options.buttonText + '</button> ' +
                                            '<button class="btn" data-grouping-toggle-all="false">Collapse All</button> '+
                                            '<button class="btn" data-grouping-toggle-all="true">Expand All</button>');

            $groupingDropdownContainer.children('.dropdown-toggle').dropdown();

            $groupingDropdownContainer.children('button[data-grouping-toggle-all]').hide().click(function (evt) {
                var $allGroupingRows = $(_this.dt.nTable).find('tr[data-grouping-row]');
                var $btn = $(this);
                $allGroupingRows.each(function(idx, groupingRow) {
                    _this.toggleGroupVisibility($(groupingRow), $btn.attr('data-grouping-toggle-all') == 'true', $allGroupingRows);
                });
            });

            $anchorContainer = $('<ul class="RowGrouping_collection dropdown-menu"></ul>');

            this._addAnchors($anchorContainer);

            $groupingDropdownContainer.append($anchorContainer);

            return $groupingDropdownContainer;
        },

        _addAnchors: function ($anchorContainer) {
            var $colLi,
                oColumn,
                sExclude = ","+this.options.aiExclude.join(',')+",";

            if ( $.inArray( 'all', this.options.aiExclude ) === -1 ) {
                for ( var i=0, iLen=this.dt.aoColumns.length ; i<iLen ; i++ ) {
                    oColumn = this.dt.aoColumns[i];
                    if ( sExclude.indexOf( ","+oColumn.mData+"," ) === -1 ) {
                        this._fnAddColLi(oColumn, $anchorContainer);
                    }
                }
                var $nLiClear,
                    _this = this;

                $nLiClear = $('<li class="divider"></li><li><a href="#" class="clearGrouping disabled" disabled="true">Clear Grouping</a></li>');

                $nLiClear.find('a').click(function (evt) {
                    var $anchor = $(this);
                    _this._groupRows(null);
                    evt.stopPropagation(); //prevent anchor href "#" from getting into location
                    $anchor.parents('.btn-group').children('.dropdown-toggle').dropdown('toggle'); //because of the above, force the dropdown to close

                    $anchor.addClass('disabled').prop('disabled', true);

                    return false;
                });

                $anchorContainer.append($nLiClear);
            }
        },

        /**
         * Create the DOM for a li entry in the row grouping dropdown
         *
         *  @param {String} data name for the column in question
         *  @private
         */
        _fnAddColLi: function (oColumn, $anchorContainer) {
            var $nLi,
                _this = this;

            $nLi = $('<li><a href="#" data-col="' + oColumn.mData + '"><i class="icon-ok"></i> ' + oColumn.sTitle + '</a></li>');

            $nLi.find('a').click(function (evt) {
                var $anchor = $(this);
                var ungroup = $anchor.hasClass('selected');
                var groupBy = ungroup ? null : $anchor.attr("data-col");
                _this._groupRows(groupBy);
                evt.stopPropagation(); //prevent anchor href "#" from getting into location
                $anchor.parents('.btn-group').children('.dropdown-toggle').dropdown('toggle'); //because of the above, force the dropdown to close

                if (ungroup) {
                    $anchor.removeClass('selected');
                }

                return false;
            });

            $anchorContainer.append($nLi);
        }

    };





    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Static object methods
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    /**
     * Rebuild the collection for a given table, or all tables if no parameter given
     *  @method  RowGrouping.fnRebuild
     *  @static
     *  @param   object oTable DataTable instance to consider - optional
     *  @returns void
     */
    RowGrouping.fnRebuild = function ( oTable )
    {
        var nTable = null;
        if ( typeof oTable != 'undefined' )
        {
            nTable = oTable.fnSettings().nTable;
        }

        for ( var i=0, iLen=RowGrouping.aInstances.length ; i<iLen ; i++ )
        {
            if ( typeof oTable == 'undefined' || nTable == RowGrouping.aInstances[i].dt.nTable )
            {
                RowGrouping.aInstances[i].fnRebuild();
            }
        }
    };





    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Static object properties
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    /**
     * Collection of all RowGrouping instances
     *  @property RowGrouping.aInstances
     *  @static
     *  @type     Array
     *  @default  []
     */
    RowGrouping.aInstances = [];

    RowGrouping.defaultOptions = {
        /**
         * Callback function to tell the user when the state has changed
         *
         *  @default  null
         */
        fnStateChange: null,

        /**
         * Text used for the button
         *
         *  @default  "Group"
         */
        buttonText: "Group by <i class='icon-chevron-down'></i>",

        /**
         * List of column data names which should be excluded from the grouping list
         *
         *  @default  []
         */
        aiExclude: [],

        /**
         * Default column (mData) to group by
         *
         *  @default  null
         */
        defaultGroupingCol: null
    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Initialisation
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    /*
     * Register a new feature with DataTables
     */
    $.fn.dataTableExt.aoFeatures.push( {
        "fnInit": function( oDTSettings ) {
            //force pagination off
            var options = (typeof oDTSettings.oInit.rowGrouping == 'undefined') ? {} : oDTSettings.oInit.rowGrouping;
            var resolvedOptions = $.extend(RowGrouping.defaultOptions, options);
            var plugin = new RowGrouping(oDTSettings, resolvedOptions);
            //plugin.init();
            return null;
        },
        "cFeature": "G",
        "sFeature": "rowGrouping"
    } );


    // Make plugin accessible from the DataTables instance
    $.fn.dataTable.rowGrouping = RowGrouping;
});
