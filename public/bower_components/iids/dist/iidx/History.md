For a complete history please see the [IIDx JIRA page](https://devcloud.swcoe.ge.com/jira03/browse/IIDS).

2.0.3 / 2014-03-19
===================
* Update ge-bootstrap and maps components to be more portable -- use relative paths to dependency js files rather than assuming "components/..."
* More distribution size reduction optimization, shaved another 3.5 Mb off distribution zip file size
* Fix for slider component issue to addresses problems with minimum values set above zero causing breaking of increment and decrement functionality


2.0.2 / 2014-02-14
===================
* Optimization: Use bower-optimized dependencies to reduce overall size of code. This is a backward compatible change within the IIDx, though requirejs mappings have changed in some cases.
* In the course of the above, the "Bootstrap" 3rd party library no longer contains the full built version of bootstrap.js, which was previously available under components/bootstrap/docs/assets. Use of the full bootstrap.js library is an anti-pattern, and causes instability if the 'ge-bootstap' library is also loaded (see https://devcloud.swcoe.ge.com/jira03/browse/IIDS-527). Use individual js libraries from Bootstrap instead or components/ge-bootstrap/ge-bootstrap.js to pull them all in


2.0.1 / 2014-01-16
==================
* Bugfix: Jumpnav, under very specific content and window heights will jump quickly between scroll positions when the user scrolls
* Bugfix: Spinner regressed in 2.0.0, such that it no longer listened to any configuration object passed in
* Bugfix: Spin.js released 1.3.3 which changed the folder structure - IIDX targets 1.3.2, specifically, to avoid this change
* Bugfix: Declarative Visualization meter cutoff text when the label width was greater than the right margin width and the component was horizontally laid out
* Bugfix: Declarative Visualization meter gradient was the wrong direction
* Bugfix: Slider, Firefox CSS fix, updated thumb graphic, button spacing, extra window dragging fix
* Documentation: Removed breadcrumbs from documentation
* Documentation: Added padding and horizontal meter (in addition to the vertically oriented one) to D3 meter component section
* Documentation: Noted API change around removal of Navbar bottom margin
* Documentation links fixed


2.0.0 / 2014-01-03
===================

* Renamed IIDS to IIDx. It is officially now a subest of the larger GE Design System (GEDS)
* Prevent access to the 'bStateSave' flag in the underlying datatables project due to XSS vulnerability (found in Checkmarx scan)
* Fixed custom fonts do not load on Firefox local
* Fixed sixth column in DataTable goes out of the placeholder
* Fixed module headers using h1 have incorrect line height.
* Fixed spinner doesn't stop
* Fixed datatables XSS vulnerabilities - failing Checkmarx scan
* Fixed typeahead on Dropdowns
* Get rid of Navbar Margin
* Added a time picker component
* Added a jump navigation component (pulled over from MDx)
* Added a secondary navigation component
* Improved the radial gauge component
* Added vertical and horizontal meter (gauge) components
* Added an iOS-style toggle switch component
* Added a slider component
* Added footer components
* Added an HTML5 video player component
* Added a collection of mapping components
* New feature of row grouping for datagrids
* New feature of column filtering in datagrids
* New feature of column hiding for datagrids
* New feature of datagrids filter tray improvements
* Added momentjs utility library

Details are available in [JIRA](https://devcloud.swcoe.ge.com/jira03/secure/ReleaseNote.jspa?projectId=12608&version=30311)



1.1.0 / 2013-10-03
===================
* Boilerplates are back
* Placeholder links in the components tearsheet removed to improve UX
* Improve carousel tearsheet examples
* Upgrade D3 to 3.2.11
* Update all components' node config to remove shorthand_resolver
* Update all components' bower config to remove shorthand_resolver
* Fixed typos in tearsheets
* Mobile select boxes styled improperly
* Mobile Font Awesome icons are cut off in tearsheets
* Datagrids getting clipped
* Faceted search getting clipped
* Input-append appearance odd in responsive mode
* IE8 - datatable column divider gets lost during hover
* Tooltip does not dismiss when clicked
* Filter button controls are misaligned in components tearsheet
* Filter button controls are misaligned in button toolbars
* Single Asset Monitoring example: events page has wrong nav pill highlight
* Tables with the .responsive class disappear if they don't have .essential or .optional headers
* Responsive datagrids and responsive-tables in class name conflict
* Remove use of "responsive-tables" from code examples
* Hide pagination when there's only one page
* Nested collapsible lists responding to click on parent list
* IE9 issue with D3 donut chart legend text overlap

1.0.0 / 2013-07-18
===================
* Added responsive support for mobile platforms (smartphones and tablets)
* Upgraded Twitter Bootstrap to 2.3.2
* Replaced require-jquery. Now using require.js 2.1.8 and jQuery 1.10.2
* Upgraded to LESS 1.4. Replaced instances of @import-once with @import
* Upgraded d3 to 3.2.3
* Upgraded Highcharts to 3.0.2
* Upgraded Highstock to 1.3.2
* Added Context Menu component
* Added Datepicker component
* Added Highcharts/Highstock dark theme
* Added Collapsible-List component
* Added Multi-Step-Navigation component
* Added Responsive Tables component
* Added Two-Pane View screen
* Added Basic Asset Monitoring: Asset Dashboard screen
* Added Basic Asset Monitoring: Fleet Overview screen
* Added Basic Asset Monitoring: Single Asset Events screen
* Added Basic Insights: Dashboard screen
* Added Case Management: Dashboard screen
* Renamed Analytics Dashboard: Dashboard View to Analytics Dashboard
* Renamed Basic Asset Monitoring: Asset Data to Single Asset Data
* Renamed Core Template to Kitchen Sink
* Renamed Application Patterns section to Common Patterns
* Renamed Reference Screens section to Application Patterns
* Removed Basic Application boilerplate
* Removed Multipage Application boilerplate

0.10.1 / 2013-06-12
===================
* Versioned up datagrids to 0.2.6 to fix IIDS-234

0.10.0 / 2013-05-29
===================
* Removed vendor folder and replaced with components
* Updated README for 0.10
* Improve support for responsiveness with iids-navbar 0.3.0
* Highcharts documentation update to warn of axis labels being clipped - hint use maxPadding
* Fix: IIDS007 x-axis data label cut off
* updated watch task
* added d3/svg warning to analytics dashboard
* Fix: IIDS004: IE 8: Spinner loading icon does not appear in tearsheets/components/components.html.
* Fix: IIDS001: IE 8: Datagrids page throws error
* Fix: Account for different browser implementations of <input class="input-file" type="file">?
* MDS-114: renaming config.js to require.config.js
* Renamed require-jquery name with jquery

0.9.2 / 2013-03-25
==================
* Updated d3 to version 3.
* Updated require-jquery to latest version. jQuery is now 1.9.1 and requireJS is 2.1.5
* Renamed release/libs to release/components
* Gave DataTables floaters their own classes of .btn-datatables-floater and .dropdown-datatables-floater
* Fixed issues with DataTables paging related to IIDS-99 & IIDS-86
* Fixed an issue with the d3 bar chart not rendering properly in IE9
* Moved all uses of 'use strict' inside of the AMD module functions to prevent non-strict code from breaking
  during concatenation.
* Improved documentation around the IIDSBasicDataGrids `selected` event.
* Added GE favicon. Balance restored to universe.
* Added favicon folder
* Added apple touch icons
* Added charts-more.js which includes the new spider graph chart.
* Added collapsible containers
* Added Event Queue example
* Removed TableTools.
* Removed `hasSelectedRows` class from IIDSBasicDataGrid click functionality and datatables.less.
* Removed the excessive amount of SVG icons in the img/vector folder. Ping us if you need them :)

0.9.1 / 2013-01-18
==================
* Renamed code/ folder to release/
* Added an index.html to the release folder to help people get started
* Added a basic boilerplate project
* Updated Font Awesome to 3.0.1
* Added bootstrap-affix and removed bootstrap-togglenav to compy with 2.2.2
* JSHinting all GE js now
* Remove focus outline from navbar buttons
* Fix broken megadropdown in IE8
* Fixed an issue where the navbar was wrapping the search field
* Calling `$(target).spin(false)` should stop the spinner now
* Fixed an issue where rolling over secondary nav items with tooltips caused a 1px shift

0.9.0 / 2012-28-12
==================
* replace changelog.txt with History.md
* added design-templates to release
* move libs folder out of less and into root
* updated DataTables to 1.9.4
* updated TableTools to 2.1.4
* updated ColReorder to 1.0.8
* updated Highstock to 1.2.5
* added core/responsive-1200px-min.less
* added core/responsive-768px-979px.less
* added core/responsive-767px-max.less
* added themes/iids/responsive-1200px-min.less
* added themes/iids/responsive-768px-979px.less
* added themes/iids/responsive-767px-max.less
* added iids.js to take the place of the old iids-main.js
* added documentation.js to drive our docs.
* new datatables plugin in js/ge/datatables.js
* new datatables floater plugin in js/ge/datatables-floater.js
* new navbar plugin in js/ge/iids-navbar.js
* removed responsive-navbar.less, moved styles into the appropriate responsive less files
* stripped padding-left and padding-right out of .navbar-inner. if we're going to
  force the navbar to be the same width as the content when we turn off breakpoints
  then we can't pad in this fashion or .container's will break the navbar
* improved 480px responsive styles for dashboard
* removed visualization-bar from datatables because D3 is not supported in IE8
* upgraded to bootstrap 2.2.2
    * fixed modal header padding
    * fixed workspace navigation horizontal and vertical padding issues
    * fixed popover styles
    * fixed search box background color
    * fixed notification font sizes and margins off
    * fixed more-assets font sizes off
    * fixed Tom Edison font sizes off
    * fixed notifications top arrow missing
    * fixed notificaions messages active state too dark
    * fixed page-header margin/padding off
    * fixed core view modal isn't animating in
    * fixed popover 1px white border
    * fixed example help text wrong color in ui elements
    * fixed helper text and inlnie helper text wrong colors in ui elements
    * fixed h3 margins off in ui elements
    * fixed .module example is squished in ui elements
    * fixed icons example is squished in ui elements
    * fixed navigation examples are squished in components
    * fixed highcharts section is squished in components
    * fixed d3 section is squished in components
    * fixed .btn-large through .btn-small font sizes
    * fixed disabled default button color
    * fixed search icon & button rollover
    * fixed border-radius on pager buttons
    * fixed button group missing spaces
    * fixed thumbnail label color
    * fixed dropdown button horizontal padding
    * fixed vertically squished message lists
    * fixed select missing 1px grey border in ui elements
    * fixed select boxes span sizes are wrong. they aren't wrong, the previous documentation had a bug
    * fixed faceted search results floating over navbar in documentation
    * fixed alert header color
    * fixed .btn-small line-height
    * fixed btn-icons shouldn't have borders
    * fixed tab colors are screwed up in components
    * fixed nav-tab colors are screwed up in components
    * fixed tabs with dropdowns colors are screwed up in components
    * fixed tabbables colors are screwed up in components
    * fixed pagination width and colors are screwed up in components
    * fixed pager padding off
    * fixed carousel is just all kinds of screwed up in components
    * fixed basic progress bars missing gradient in components
    * fixed animating progress bars aren't animating in components -- won't work while less debugging is on
    * fixed datatables saved filter colors are off
    * fixed datatables 'show x entries' missing border
    * fixed datatables pagination styles are off
    * fixed mega-dropdown broken in 2.2
    * fixed datatables search field

0.8.7 / 2012-11-29
==================
* added multipage IIDS boilerplate example
* fix IIDS-28: updated Highstock to latest version. Hopefully fixes issues with ajax load
* fix IIDS-26: dashed outlines around .brand and .nav-tab styles in FF fixed
* fix IIDS-20: navbar now works with btn-success, btn-info, btn-warning and btn-danger
* fix IIDS-24: import of font awesome now occurs in base.less. bootstrap sprites.less no longer imported
* fixed an issue with the less imports which prevented compiling because of a missing Font-Awesome folder
* input-prepend and input-append styles should have the same margin-bottom as other input elements
* iids-navbar should only require 3 bootstrap scripts instead of the entire bootstrap library
* fixed various focus outline issues for a few browsers
* added common.js file to help out with require.js configuration
* added max-width: none to table.dataTable style to fix a bug in FF and IE with horizontally scrolling tables

0.8.6 / 2012-10-21
==================
* added reference screen: Analytics Dashboard Overview (see docs/reference-screens/analytics-overview.html)
* added reference screen: Analytics Dashboard Detail (see docs/reference-screens/analytics-detail.html)
* added modernizr & respond.js for feature detection, html5 shimming and responsiveness in IE8
* cleaned up some IE8 header bugs
* added snapshot module styles (seen in GE_UXCoE_IIDS_AnalyticsDashboard_2.0_Overview)
* add .group class to themes for more semantic clearfixing
* .module-group for joining vertical modules similar to .btn-group
* improved chromeless accordion styles
* moved fonts, images and data folders out of assets/ and into project root
* consolidated /images and /assets/iids/img into one folder called img
* consolidated 3rd party javascript into a js/vendor folder
* consolidated all examples into a docs/ folder
* now including minified and unminifed css for themes
* removed r.js optimized code in favor of uncompressed js
* LESS files are now available
* Removed D3.js dependency from ge/datatables.js to prevent IE8 errors
