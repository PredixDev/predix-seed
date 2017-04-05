# Create the app shell

## Understand SPA and App shell

An *application shell* is the minimal HTML, CSS, and JavaScript powering a user interface. The application shell should:

* The main entry-point `_index.html` of the seed app is served from every valid route. This file should be very small, since it will be served from different URLs therefore be cached multiple times. All resource URLs in the entry-point need to be absolute, since it may be served from non-top-level URLs.
* The shell or app-shell `loader.html`, which includes the top-level app logic, router, and so on.
* Lazily loaded fragments of the app. A fragment can represent the code for a particular view, or other code that can be loaded lazily, for example, parts of the main app not required for first paint, like menus that aren't displayed until a user interacts with the app, like various other views, cards, components in the seed app.

The shell is responsible for dynamically importing the fragments as needed. An application shell shall be reliably good in performance. Think of your app's shell like the bundle of code you'd publish to an app store if you were building a native app. It's the load needed to get off the ground, it pulls in content dynamically through API.

## Seed app shell files
The following parts of the seed are considered essential and composting the app shell for the seed app:

* The `index.html` file
* Favicon file
* `index-inline.scss`file for the first-screen CSS before any actual page content get loaded;
* `_index-inline-loading-script` which load web components polyfill on-demand and check if all web components are loaded;
* `loader.html` file where Polymer HTML file, it serves as our web components runtime and app toolkit;
* Browser shims/polyfills `fetch.js` and `es6-shim.js`that are features we used later on in our application modules;
* Document-wide custom styles `px-(dark)-theme-styles` that are considering generally as application “theme”.

### Web components loading script

The Polymer library is a lightweight sugaring layer on top of the  [Web Components APIs](http://webcomponents.org/articles/why-web-components/), for broad web components support, Polymer uses the polyfills from webcomponents.org. They're lightweight, work well, and provide the feature support Polymer requires.

```
bower install -S webcomponents/webcomponentsjs
```

In seed app we conditionally load the polyfills in our application, feature-detecting on the client whether the browser supports web components natively, and then only loading the polyfills if it doesn’t. Here’s a simplified version of this script:

```js
(function() {
  if ('registerElement' in document
      && 'import' in document.createElement('link')
      && 'content' in document.createElement('template')) {
    // platform is good!
  } else {
    // polyfill the platform!
    var e = document.createElement('script');
    e.src = '/bower_components/webcomponentsjs/webcomponents-lite.min.js';
    document.body.appendChild(e);
  }
})();
```

### Load app dependencies with HTML Import

Include an import on your page by declaring a `<link rel="import">`:
```html
<head>
  <link rel="import" href="/path/to/imports/stuff.html">
</head>
```

The browser's taking care of **de-dupes** all requests from the same URL. This means that imports that reference the same URL are only retrieved once. No matter how many times an import at the same location is loaded, it only executes once.

With HTML Import, using only one URL, you can package together a single relocatable bundle of web goodness for others to consume. The `<link>` element fires a load event when an import is loaded successfully and onerror when the attempt fails (e.g. if the resource 404s).

```html
<script>
  function handleLoad(e) {
    console.log('Loaded import: ' + e.target.href);
  }
  function handleError(e) {
    console.log('Error loading import: ' + e.target.href);
  }
</script>

<link rel="import" href="file.html"
      onload="handleLoad(event)" onerror="handleError(event)">
```

In our `index.html` file,  we use HTML Import to load application dependencies `loader.html`bundle with the *async* attribute, this allows for non-blocking loading for the rest of the page:

```html
  <!-- Async HTML Imports do not block rending. Benefit of keeping it declarative(instead of dynamically loading it later in JS) is that the parser can go pre-fetching resources, etc. -->

<link id="main-element-import" rel="import" href="loader.html" async>
```

The loader script is checking when the HTML bundle of the main application bundle has successfully loaded:

```js
// Wait for async loading of loader.html bundle
function onWebComponentsLoaded() {
  var mainElementLink = document.querySelector('#main-element-import');
  if (mainElementLink.import && mainElementLink.import.readyState === 'complete') {
    onMainElementLoaded();
  } else {
    mainElementLink.addEventListener('load', onMainElementLoaded);
  }
};

```

### Loading CSS styles

Typically you won’t expect we load CSS with a `<link rel="stylesheet" type="text/css">`element, the new way how stylesheet work in web component is a bit different.

Polymer provides a `<style is="custom-style">` custom element for defining styles in the main document that can take advantage of several special features of Polymer's styling system:

* Document styles defined in a custom-style are shimmed to ensure they do not leak into local DOM.
* [Custom properties](https://www.polymer-project.org/1.0/docs/devguide/styling#custom-css-properties) used by Polymer’s shim for cross-scope styling may be defined in an custom-style.

To share style declarations between elements, you can package a set of style declarations inside a `<dom-module>` element. In this section, it holds styles is called a style module for convenience.

A style module declares a named set of style rules that can be imported into an element definition, or into a `custom-style` element.

In seed app we created style modules for each every type of styles, including component and document-level styles, within `index.html` this applies rules within `index-inline.scss`to the main document.

```html
  <link rel="import" href="index-inline-styles.html">
  <style include="index-inline-styles" is="custom-style"></style>
```