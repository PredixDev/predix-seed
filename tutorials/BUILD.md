# Create project build
In previous series you’ve learnt the basis of Predix Seed components, in this tutorial you will dive into the build system of Seed app and use various  [gulp](http://gulpjs.com/) tasks to compile source files into the destination formats.

## Understand Gulp
[Gulp](https://github.com/gulpjs/gulp) is a streaming build system, by using node’s streams file manipulation is all done in memory, and a file isn’t written until you tell it to do so. Gulp is as well a javascript task runner. Gulp prefers code over configuration. Being that your tasks are written in code. A typical `gulpfile.js` file looks [this](https://github.com/gulpjs/gulp/tree/4.0#sample-gulpfilejs) .

## Build goals
In seed app we need gulp to achieve the following build tasks:
* Generating index HTML by inlining small bootstrapping stylesheet and scripts
* Compiling our app stylesheet from Sass to CSS modules
* Transpile ES6 to cross-browser-compatible ES5 code
* Code lint and validation
* Minifying HTML, JS and CSS
* Spinning an express web server for local development

Each of those tasks will be defined in the `tasks` directory as a separate file, they will be assembled in the main `gulpfile.js` file.

## Compile index.html
Our index file `_index.html` contains a certain `<script inline>` and `<style inline>` special element which will be processed in gulp task `compile.index.js` which basically helps us to inline them in the HTML document, this helps the page to load faster by saving the need for sending our additional requests to deliver the minimal of the initial screen.

```js
'use strict';

// -------------------------------------
//   Task: Compile: Inline Index Source
// -------------------------------------
const inlinesource = require('gulp-inline-source');
const rename = require('gulp-rename');

module.exports = function(gulp) {
  return function() {
    return gulp.src('./_index.html')
      .pipe(inlinesource())
      .pipe(rename('index.html'))
      .pipe(gulp.dest('.'));
  };
};
```

## Compile Sass
Since we use [Sass lang](http://sass-lang.com/) as the source language for all seed app styles,  this will be compiled into vanilla CSS files, or HTML style modules for direct consumption in each element, the following task is for this transpiling:

```js
gulp.src([
        'elements/**/*.scss'
      ])
      .pipe(plugins.sass(sassOptions)
        .on('error', plugins.sass.logError))
      .pipe(autoprefixer())
      .pipe(cssmin())
      .pipe(stylemod({
        // All files will be named 'styles.html'
        filename: function(file) {
          return getName(file) + '-styles';
        },
        // Use '-css' suffix instead of '-styles' for module ids
        moduleId: function(file) {
          return getName(file) + '-styles';
        }
      }))
      .pipe(gulp.dest(styleModuleDest));
```

In the above task of transpiling we piped several gulp plugins to transform our component styles written in SASS into that’s consumable by the [Polymer element](https://www.polymer-project.org/1.0/docs/devguide/styling) :

* gulp-style-modules
* gulp-sass
* gulp-cssmin
* gulp-autoprefixer

## Create app bundle
In our seed app we use HTML Import to load different pieces of the UI components from each individual HTML document where a component is defined, this works fine but when it comes to a slow network or limited bandwidth, too much roundtrips is a problem, in this task we will bundle the HTML documents with [polymer-build](https://github.com/Polymer/polymer-build) - a tool provided by Polymer to analyze the dependencies of your app modules and create HTML bundles that are loaded on-demand.

Based on seed app structure, we create a `polymer.json` file to categorize our modules, according to Polymer build [definition](https://www.polymer-project.org/2.0/docs/tools/polymer-json):

```
{
  "entrypoint": "index.html",
  “shell”: "loader.html",
  "fragments": [
    "elements/views/blankpage-view.html",
    "elements/views/dashboards-view.html",
    "elements/views/simple-asset-view.html",
    "elements/views/winddata-view.html",
    "elements/seed-intro-card/seed-intro-card.html",
    "elements/data-table-card/data-table-card.html",
    "elements/three-widgets-card/three-widgets-card.html",
    "bower_components/px-polymer-font-awesome/font-awesome-icons.html",
    "elements/time-series-card/time-series-card.html",
    "bower_components/px-vis-timeseries/px-vis-timeseries.html",
    "bower_components/px-data-table/px-data-table.html"
  ],
  "source": [
    "elements/**/*",
    "images/**/*"
  ],
  "includeDependencies": [
    "bower_components/webcomponentsjs/webcomponents-lite.min.js",
    "bower_components/px-typography-design/type/*",
    "bower_components/font-awesome/fonts/*"
  ]
}
```

We have intentionally defined the HTML fragments that are functionally separated, like a card or a view,  or a relatively complex component like chart, so those elements will be loaded on demand, with the common deps of them extracted into a shell bundle.

This [gulp task](tasks/compile.bundle.js) will specifically works on creating those bundles.

## Spin off the web server and watch for changes
Eventually we have to start the web server, in either **dist** or **dev** mode, which works for the following scenarios:

* `node_modules/.bin/gulp`: serve files from the *root directory* and used for local development purpose - all resources are loaded individually
* `node_modules/.bin/gulp —-dist` serve files from the *dist* directory with optimized result, some HTML files will be in one major bundle file.

Open your web browser on http://localhost:5000/ shall give you the seed app dashboard screen.