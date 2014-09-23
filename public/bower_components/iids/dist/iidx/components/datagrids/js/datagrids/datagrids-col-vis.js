/*
 * GE FORKED FROM:
 * File:        ColVis.js
 * Version:     1.1.0-dev
 * CVS:         $Id$
 * Description: Controls for column visiblity in DataTables
 * Author:      Allan Jardine (www.sprymedia.co.uk)
 * Created:     Wed Sep 15 18:23:29 BST 2010
 * Modified:    $Date$ by $Author$
 * Language:    Javascript
 * License:     GPL v2 or BSD 3 point style
 * Project:     Just a little bit of fun :-)
 * Contact:     www.sprymedia.co.uk/contact
 *
 * Copyright 2010-2011 Allan Jardine, all rights reserved.
 *
 * This source file is free software, under either the GPL v2 license or a
 * BSD style license, available at:
 *   http://datatables.net/license_gpl2
 *   http://datatables.net/license_bsd
 *
 *
 *   WHY DID GE FORK THIS?
 *
 *   The base impl constructs some really nasty DOM for what should be a relatively simple interaction. It also has some
 *   interactions bugs resulting from the over-complication.  TODO: pull request on the base repo with our changes.
 */

define(['jquery', 'datatables', 'ge-bootstrap'], function($) {

    /**
     * ColVis provides column visiblity control for DataTables
     * @class ColVis
     * @constructor
     * @param {object} DataTables settings object
     */
    var ColVis = function( oDTSettings, oInit )
    {
        /* Santiy check that we are a new instance */
        if ( !this.CLASS || this.CLASS != "ColVis" )
        {
            alert( "Warning: ColVis must be initialised with the keyword 'new'" );
        }

        if ( typeof oInit == 'undefined' )
        {
            oInit = {};
        }


        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
         * Public class variables
         * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

        /**
         * @namespace Settings object which contains customisable information for ColVis instance
         */
        this.s = {
            /**
             * DataTables settings object
             *  @property dt
             *  @type     Object
             *  @default  null
             */
            "dt": null,

            /**
             * Customisation object
             *  @property oInit
             *  @type     Object
             *  @default  passed in
             */
            "oInit": oInit,

            /**
             * Callback function to tell the user when the state has changed
             *  @property fnStateChange
             *  @type     function
             *  @default  null
             */
            "fnStateChange": null,

            /**
             * Text used for the button
             *  @property buttonText
             *  @type     String
             *  @default  Show/Hide columns <i class='icon-chevron-down'></i>
             */
            "buttonText": "Show/Hide columns <i class='icon-chevron-down'></i>",

            /**
             * List of columns (integers) which should be excluded from the list
             *  @property aiExclude
             *  @type     Array
             *  @default  []
             */
            "aiExclude": [],

            /**
             * Store the original viisbility settings so they could be restored
             *  @property abOriginal
             *  @type     Array
             *  @default  []
             */
            "abOriginal": []
        };


        /**
         * @namespace Common and useful DOM elements for the class instance
         */
        this.dom = {
            /**
             * Wrapper for the button - given back to DataTables as the node to insert
             *  @property wrapper
             *  @type     Node
             *  @default  null
             */
            "wrapper": null,

            /**
             * Activation button
             *  @property button
             *  @type     Node
             *  @default  null
             */
            "button": null,

            /**
             * Collection list node
             *  @property collection
             *  @type     Node
             *  @default  null
             */
            "collection": null,

            /**
             * List of button elements
             *  @property buttons
             *  @type     Array
             *  @default  []
             */
            "buttons": []
        };

        /* Store global reference */
        ColVis.aInstances.push( this );

        /* Constructor logic */
        this.s.dt = oDTSettings;
        this._fnConstruct();
        return this;
    };



    ColVis.prototype = {
        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
         * Public methods
         * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

        /**
         * Rebuild the list of buttons for this instance (i.e. if there is a column header update)
         *  @method  fnRebuild
         *  @returns void
         */
        "fnRebuild": function ()
        {
            /* Remove the old buttons */
            for ( var i=this.dom.buttons.length-1 ; i>=0 ; i-- )
            {
                if ( this.dom.buttons[i] !== null )
                {
                    this.dom.collection.removeChild( this.dom.buttons[i] );
                }
            }
            this.dom.buttons.splice( 0, this.dom.buttons.length );

            /* Re-add them (this is not the optimal way of doing this, it is fast and effective) */
            this._fnAddCheckboxes();

            /* Update the checkboxes */
            this._fnDrawCallback();
        },



        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
         * Private methods (they are of course public in JS, but recommended as private)
         * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

        /**
         * Constructor logic
         *  @method  _fnConstruct
         *  @returns void
         *  @private
         */
        "_fnConstruct": function ()
        {
            this._fnApplyCustomisation();

            var that = this;
            var i, iLen, $dropdownMenu;

            if (this.s.colVisDropdownSelector) {
                $dropdownMenu = $(this.s.colVisDropdownSelector);
                if ($dropdownMenu.length === 0) {
                    throw new Error("Tried to attach column visibility control to element with selector " +
                        this.s.colVisDropdownSelector + " but no element found with that selector");
                }
            }
            else {
                throw new Error("You must specify a valid 'colVisDropdownSelector' for the datagrids-col-vis plugin.");
            }

            $dropdownMenu.addClass('ColVis').addClass('btn-group');

            $dropdownMenu.html('<button class="ColVis_dropdown btn dropdown-toggle">' + this.s.buttonText + '</button>');

            $dropdownMenu.children('.dropdown-toggle').dropdown();

            this.dom.wrapper = $dropdownMenu.get(0);

            this.dom.collection = this._fnDomCollection();

            this._fnAddCheckboxes();

            /* Store the original visbility information */
            for ( i=0, iLen=this.s.dt.aoColumns.length ; i<iLen ; i++ )
            {
                this.s.abOriginal.push( this.s.dt.aoColumns[i].bVisible );
            }

            /* Update on each draw */
            this.s.dt.aoDrawCallback.push( {
                "fn": function () {
                    that._fnDrawCallback.call( that );
                },
                "sName": "ColVis"
            } );

            /* If columns are reordered, then we need to update our exclude list and
             * rebuild the displayed list
             */
            $(this.s.dt.oInstance).bind( 'column-reorder', function ( e, oSettings, oReorder ) {
                for ( i=0, iLen=that.s.aiExclude.length ; i<iLen ; i++ ) {
                    that.s.aiExclude[i] = oReorder.aiInvertMapping[ that.s.aiExclude[i] ];
                }

                var mStore = that.s.abOriginal.splice( oReorder.iFrom, 1 )[0];
                that.s.abOriginal.splice( oReorder.iTo, 0, mStore );

                that.fnRebuild();
            } );
            this.dom.collection = this.dom.wrapper.appendChild( this.dom.collection );
        },


        /**
         * Apply any customisation to the settings from the DataTables initialisation
         *  @method  _fnApplyCustomisation
         *  @returns void
         *  @private
         */
        "_fnApplyCustomisation": function ()
        {
            var oConfig = this.s.oInit;

            if ( typeof oConfig.activate != 'undefined' )
            {
                this.s.activate = oConfig.activate;
            }

            if ( typeof oConfig.buttonText != 'undefined' )
            {
                this.s.buttonText = oConfig.buttonText;
            }

            if ( typeof oConfig.aiExclude != 'undefined' )
            {
                this.s.aiExclude = oConfig.aiExclude;
            }

            if ( typeof oConfig.fnStateChange != 'undefined' )
            {
                this.s.fnStateChange = oConfig.fnStateChange;
            }

            if ( typeof oConfig.colVisDropdownSelector != 'undefined' )
            {
                this.s.colVisDropdownSelector = oConfig.colVisDropdownSelector;
            }
        },


        /**
         * On each table draw, check the visibility checkboxes as needed. This allows any process to
         * update the table's column visibility and ColVis will still be accurate.
         *  @method  _fnDrawCallback
         *  @returns void
         *  @private
         */
        "_fnDrawCallback": function ()
        {
            var columns = this.s.dt.aoColumns;
            var buttons = this.dom.buttons;

            for ( var i=0, iLen=columns.length ; i<iLen ; i++ )
            {
                if ( buttons[i] !== null )
                {
                    $('input', buttons[i]).prop( 'checked', columns[i].bVisible );
                }
            }

            var allVisible = function ( columnIndeces ) {
                for ( var k=0, kLen=columnIndeces.length ; k<kLen ; k++ )
                {
                    if (  columns[columnIndeces[k]].bVisible === false ) { return false; }
                }
                return true;
            };
            var allHidden = function ( columnIndeces ) {
                for ( var m=0 , mLen=columnIndeces.length ; m<mLen ; m++ )
                {
                    if ( columns[columnIndeces[m]].bVisible === true ) { return false; }
                }
                return true;
            };
        },

        /**
         * Loop through the columns in the table and as a new button for each one.
         *  @method  _fnAddCheckboxes
         *  @returns void
         *  @private
         */
        "_fnAddCheckboxes": function ()
        {
            var
                colLi,
                sExclude = ","+this.s.aiExclude.join(',')+",";

            if ( $.inArray( 'all', this.s.aiExclude ) === -1 ) {
                for ( var i=0, iLen=this.s.dt.aoColumns.length ; i<iLen ; i++ )
                {
                    if ( sExclude.indexOf( ","+i+"," ) == -1 )
                    {
                        colLi = this._fnDomColLi( i );
                        this.dom.buttons.push( colLi );
                        this.dom.collection.appendChild( colLi );
                    }
                    else
                    {
                        this.dom.buttons.push( null );
                    }
                }
            }
        },

        /**
         * Create the DOM for a show / hide li entry in the col vis dropdown
         *  @method  _fnDomColLi
         *  @param {int} i Column in question
         *  @returns {Node} Created li
         *  @private
         */
        "_fnDomColLi": function ( i )
        {
            var oColumn = this.s.dt.aoColumns[i],
                nLi = document.createElement('li'),
                $nLi = $(nLi),
                _this = this,
                dt = this.s.dt;

            var sTitle = oColumn.sTitle;
            $nLi.html('<label><input type="checkbox"/> ' + sTitle + '</label>');

            $nLi.click(function(evt) {
                evt.stopPropagation();//prevent bootstrap dropdown from auto-closing
            });

            $nLi.find('input').change(function (evt) {
                var show = $(this).is(":checked");

                /* Need to consider the case where the initialiser created more than one table - change the
                 * API index that DataTables is using
                 */
                var oldIndex = $.fn.dataTableExt.iApiIndex;
                $.fn.dataTableExt.iApiIndex = _this._fnDataTablesApiIndex.call(_this);

                // Optimisation for server-side processing when scrolling - don't do a full redraw
                if ( dt.oFeatures.bServerSide && (dt.oScroll.sX !== "" || dt.oScroll.sY !== "" ) )
                {
                    dt.oInstance.fnSetColumnVis( i, show, false );
                    dt.oInstance.fnAdjustColumnSizing( false );
                    dt.oInstance.oApi._fnScrollDraw( dt );
                    _this._fnDrawCallback();
                }
                else
                {
                    dt.oInstance.fnSetColumnVis( i, show );
                }

                $.fn.dataTableExt.iApiIndex = oldIndex; /* Restore */

                if ( _this.s.fnStateChange !== null )
                {
                    _this.s.fnStateChange.call( _this, i, show );
                }
            });
            return nLi;
        },


        /**
         * Get the position in the DataTables instance array of the table for this instance of ColVis
         *  @method  _fnDataTablesApiIndex
         *  @returns {int} Index
         *  @private
         */
        "_fnDataTablesApiIndex": function ()
        {
            for ( var i=0, iLen=this.s.dt.oInstance.length ; i<iLen ; i++ )
            {
                if ( this.s.dt.oInstance[i] == this.s.dt.nTable )
                {
                    return i;
                }
            }
            return 0;
        },


        /**
         * Create the element used to contain list the columns (it is shown and hidden as needed)
         *  @method  _fnDomCollection
         *  @returns {Node} div container for the collection
         *  @private
         */
        "_fnDomCollection": function ()
        {
            var ul = document.createElement('ul');
            ul.className = "ColVis_collection dropdown-menu";
            return ul;
        },

        /**
         * Alter the colspan on any fnOpen rows
         */
        "_fnAdjustOpenRows": function ()
        {
            var aoOpen = this.s.dt.aoOpenRows;
            var iVisible = this.s.dt.oApi._fnVisbleColumns( this.s.dt );

            for ( var i=0, iLen=aoOpen.length ; i<iLen ; i++ ) {
                aoOpen[i].nTr.getElementsByTagName('td')[0].colSpan = iVisible;
            }
        }
    };





    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Static object methods
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    /**
     * Rebuild the collection for a given table, or all tables if no parameter given
     *  @method  ColVis.fnRebuild
     *  @static
     *  @param   object oTable DataTable instance to consider - optional
     *  @returns void
     */
    ColVis.fnRebuild = function ( oTable )
    {
        var nTable = null;
        if ( typeof oTable != 'undefined' )
        {
            nTable = oTable.fnSettings().nTable;
        }

        for ( var i=0, iLen=ColVis.aInstances.length ; i<iLen ; i++ )
        {
            if ( typeof oTable == 'undefined' || nTable == ColVis.aInstances[i].s.dt.nTable )
            {
                ColVis.aInstances[i].fnRebuild();
            }
        }
    };





    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Static object properties
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    /**
     * Collection of all ColVis instances
     *  @property ColVis.aInstances
     *  @static
     *  @type     Array
     *  @default  []
     */
    ColVis.aInstances = [];


    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Constants
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    /**
     * Name of this class
     *  @constant CLASS
     *  @type     String
     *  @default  ColVis
     */
    ColVis.prototype.CLASS = "ColVis";


    /**
     * ColVis version
     *  @constant  VERSION
     *  @type      String
     *  @default   See code
     */
    ColVis.VERSION = "1.1.0-dev-ge";
    ColVis.prototype.VERSION = ColVis.VERSION;


    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Initialisation
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    /*
     * Register a new feature with DataTables
     */
    $.fn.dataTableExt.aoFeatures.push( {
            "fnInit": function( oDTSettings ) {
                var init = (typeof oDTSettings.oInit.oColVis == 'undefined') ?
                {} : oDTSettings.oInit.oColVis;
                var oColvis = new ColVis( oDTSettings, init );
                return null;
            },
            "cFeature": "C",
            "sFeature": "ColVis"
        } );


// Make ColVis accessible from the DataTables instance
    $.fn.dataTable.ColVis = ColVis;

});
