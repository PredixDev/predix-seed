# Responsive Tables
===============

A JavaScript/CSS plugin to enable small-screen-friendly, alternate views of HTML `table` elements. Works in conjunction with HTML `class` attributes to show or hide content at appropriate breakpoints.

## Structure

- **Readme.md** — this document
- **History.md** — history/changelog file
- **package.json** — An [npm](https://npmjs.org/) package file specifying information and dependencies
- **Gruntfile.js** — A build file for the [Grunt](http://gruntjs.com/) task runner.
- **bower.json** — A [Bower](http://bower.io/) package file for specifying information and dependencies
- **.bowerrc** — A configuration file for Bower which tells it to look for modules on GE's Stash server
- **.jshintrc** — [JSHint](http://www.jshint.com/) configuration file for managing JavaScript code quality
- **.editorconfig** — [EditorConfig](http://editorconfig.org/) configuration file for managing coding styles within IDEs.
- **js/** — this component's `.js` file and a [RequireJS](http://requirejs.org/) config file
- **less/** —  [LESS](http://lesscss.org/) stylesheets for basic and responsive styles
- **test/** — This folder contains a test page demonstrating the Responsive Tables component.

## Getting Started
`responsive-tables` works by searching for the classes `essential` and `optional` on a table's `th` elements, if that table has the class `table-responsive`.  JavaScript then adds these classes to subsequent `td`s with the same row positions.

By default `responsive-tables` hides all `th` and `td` elements on the smallest screen sizes (phone, both portrait and landscape orientations). Adding a class of `essential` to `th` ensures the associated table column will display on even the smallest screens. Adding the class `optional` ensures the associated table column will display on bigger, though constrained, screens, such as tablets.

## Using
- Determine which table columns you want to show at appropriate breakpoints (phone portrait/landscape, tablet portrait/landscape, desktop, large desktop).
- Add the class `table-responsive` to each `table` you want to have this treatment.
- Add the class `essential` to the `th` leading the column(s) you want to display in all screen sizes.
- Add the class `optional` to the `th` leading the columns(s) you want to display in all but the smallest screen sizes.
- If you want support for IE8, you must use the RespondJS polyfill to force the browser to recognize CSS media queries. Use this link to the script in your HTML:

> `<script src="../components/respond/respond.src.js"></script>`

## Note
This component does not function on tables combining cells and rows with colspan and rowspan.

## Customizing
You can redefine the breakpoints for `.essential`  and `.optional`  in your own LESS or CSS files.

