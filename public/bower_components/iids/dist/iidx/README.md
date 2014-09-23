Industrial Internet Design Extension (IIDx) README
========================================

This implementation of the Industrial Internet Design Extension (IIDx) consists of:

- [**Twitter Bootstrap**](http://twitter.github.com/bootstrap/) for the overall page layout, scaffolding, and basic components
- [**GE Bootstrap**](http://3.39.74.92:7990/projects/DXC/repos/ge-bootstrap), an extension of Twitter Bootstrap supporting GE's brand
- [**Modernizr**](http://modernizr.com/) to detect HTML5 and CSS3 features in the user's browser
- [**jQuery**](http://jquery.com/) for DOM manipulation and general front-end utility use
- [**RequireJS+jQuery**](https://github.com/jrburke/require-jquery) for Javascript code modularity.
- [**OpenLayers**](http://openlayers.org/) powering mapping (geospatial) components
- [**Highcharts**](http://highcharts.com/) as commercially licensed software for charts and graphs
- [**More**](http://gesdh.com/industrial-internet/developer) libraries you can learn about at the Software Desig Hub

License
-------

The IIDx incorporates both open source and commercial software. It is licensed under the GE Limited Availability Software Development License Agreement.

All of the GE Design System extensions are made available “as-is” with no warranty or stated service level agreement. Please ensure that you review and agree to the [GE Software End user license agreement (EULA)](http://gesdh.com/industrial-internet/license
) before using the code.

Read more about the IIDx license including details on Highcharts and Google Maps at the [Software Design Hub](http://gesdh.com/industrial-internet/license
).

Support
-------

There is no stated service level agreement (SLA) for IIDx, however the GE Software CoE is heere to help!

- Visit our website, the [Software Design Hub](http://gesdh.com/industrial-internet) for articles and examples.
- Connect to your peers by joining our [Colab](http://gesdh.com/industrial-internet/community) canvas. This is also where release announcements take place.
- Send an email to the team via <sdh@ge.com>.

Release Distribution
--------------------
The IIDx release distribution includes the following:

- `docs` contains all assets used by the IIDx documentation pages
- `less` contains the IIDx stylesheets, in LESS format
- `js` contains the master IIDx application JavaScript and the configuration file used by RequireJquery

## Structure

- **README.md** — A starter readme file in Markdown format.
- **History.md** — A starter history/changelog file, also in Markdown format.
- **package.json** — An [npm](https://npmjs.org/) package file for specifying information and dependencies.
- **bower.json** — A [Bower](http://bower.io/) package file for specifying information and dependencies.
- **.bowerrc** — A configuration file for Bower which tells it to look for modules on our Stash server.
- **.jshintrc** — [JSHint](http://www.jshint.com/) configuration file for managing JavaScript code quality.
- **.editorconfig** — [EditorConfig](http://editorconfig.org/) configuration file for managing coding styles within IDEs.
- **docs/**- This folder contains documentation and examples of IIDx layouts, elements, and components.
- **js/** — This folder contains a [RequireJS](http://requirejs.org/) config file.
- **less/** — This folder contains [LESS](http://lesscss.org/) stylesheets for basic and responsive styles. It also includes some variables.

## Migrating from 1.x to 2.0

IIDX 2.0 has no major architectural differences from v1.1, so your applications should not require any refactoring or architectural
changes when upgrading.

There is one minor change, however. The navbar no longer has a bottom margin. This change enables full screen layouts where the content
comes right up next to the navbar.

As a result, the developer may experience no padding between the navbar and the content after upgrading. To help with this, we've added the "content" class to be used with the "container" class.
This new "content" class will add the desired margin on your container

<div class="container content">
    My content
</div>

## Migrating from 0.9.x/0.10.x to 1.0.0

This guide is also available on [the IIDx Confluence Page.](https://devcloud.swcoe.ge.com/devspace/pages/viewpage.action?pageId=50172400)

- Update script and link tags to point at the components folders. Consult `/docs/examples/` or the examples in the tearsheets for models on how to use the components.

- Make sure RespondJS is at the bottom of the page, just before</body>:

```
      <script src="./components/respond/respond.src.js"></script>
```

- In IIDS 1.0.0, common.js was renamed to require.config.js

- Note that the markup for the masthead has changed in subtle ways:

```
     <div class="navbar navbar-static-top">
          <div class="navbar-inner">
             <div class="container">...
            </div>
        </div>
     </div>
```

Refer to the sample code under "Navigation >Masthead & Navigation Bar" in `/docs/tearsheets/components.html` for a full example.

- It should be simpler to use RequireJS now. To initialize, do the following. Make sure the paths to the js and components folders are correct:

```
  <script src="./components/requirejs/require.js"></script>
  <script src="./js/require.config.js"></script>
  <script>
  require(['...'], function(...) { /* your app logic */ });
  </script>
```

## Developing the IIDx

Documentation regarding how to develop the IIDx and contribute to the project can be found at the following link:

- [Developing the IIDx](https://devcloud.swcoe.ge.com/devspace/display/IIDS/Developing+the+IIDS)

- To log a bug or request a feature please see the [IIDx JIRA page](https://devcloud.swcoe.ge.com/tracker/browse/IIDS).

© General Electric