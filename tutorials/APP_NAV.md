# App Navigation
In this tutorial we will be focus on create page navigation and enable URL based routing of seed app pages. You shall have some basic understanding of Polymer data binding and we will be using the following Predix UI elements in this tutorial:

* `<px-app-nav>`
* `<px-view>`
* `<app-route>`
* `<app-location>`

## App Nav Sidebar
The side navigation is the highest level of navigation, for navigating between major sections of the application. Navigation items can be nested, with sub-items. Each major navigation item should have a unique and descriptive icon.  Predix provides `px-app-nav`element to render the list of side-nav items, here’s how we use that in `app-main.html`

```html
<px-app-nav
  class="navbar"
  nav-items="[[navItems]]">
</px-app-nav>
```

The nav items comes from data binding path `navItems` which is a list of label items we defined as component property, one label item shall have the following properties:
* label - Text label of the nav item, it will auto-hide when the nav-bar is collapsed
* icon - font-awesome icon name of the nav item
* path - The URL to which it shall navigate on click

```js
navItems: {
  type: Array,
  value: function() {
    return [{
      "label": "Dashboards",
      "path": "dashboards",
      "icon": "fa-tachometer"
    }, {
      "label": "Blank Page",
      "path": "blankpage",
      "icon": "fa-file"
    },
      {
      "label": "Simple Asset",
      "path": "simple-asset",
      "icon": "fa-sitemap"
    },
      {
      "label": "Wind Data",
      "path": "winddata",
      "icon": "fa-line-chart"
    }
    ]
  }
},
```

## Add URL routes
<app-route> and <app-location> provide a modular routing system for Polymer apps. With these elements:

Routing is decentralized. An element can handle just the part of the URL it's interested in, and delegate parts of the URL space to other elements.
Routing elements can be composed into larger applications.

Route changes can trigger loading of data, using data binding,  here we’re flowing the routed data into `routeData`object so the current matched page in the URL will be reflected on the object.

```html
<!-- app-location captures url and assigns _route value -->
<app-location
  id="carbonLocation"
  route="{{_route}}">
</app-location>

<!-- app-route extracts url segments to object data-binding -->
<app-route
  route="[[_route]]"
  pattern="/:page"
  data="{{routeData}}">
</app-route>
```

The <app-location> element is simply a proxy for window.location that provides two-way data binding. A single <app-location> element binds the top-level <app-route> element to the state of the URL bar.

The <app-route> element matches the current *route* against a *pattern* (where `:page` represents a parameter). If the pattern matches, the route is active and any URL parameters are added to the data object. For example, when user visit `/dashboards`, `routeData.page` will be string `'dashboards'`.


In order to make page routing to work, we will be creating a list of **page views** which maps each route name to each of our Seed app page’s root element:

```js
_routePages: {
  type: Array,
  readOnly: true,
  value: [
    {
      page: 'dashboards',
      elementHref: '/elements/views/dashboards-view.html'
    },
    {
      page: 'simple-asset',
      elementHref: '/elements/views/simple-asset-view.html'
    },
    {
      page: 'winddata',
      elementHref: '/elements/views/winddata-view.html'
    },
    {
      page: 'blankpage',
      elementHref: '/elements/views/blankpage-view.html'
    }
  ]
},
```

Predix provides `px-view` to help you conditionally load any element into view when the element’s  `active` property is set, and later on when this property is unset, elements inside will become hidden, the lifecycle of a page view element looks like below:

> unloaded -> loading -> loaded/failed -> attached -> hidden/shown

Finally we can hook up the display of page view by iteratively create page view and make it’s `active`  property matching up to one route’s match:
```html
<template is="dom-repeat" items="[[_routePages]]">
  <px-view
    active="[[_equals(routeData.page, item.page)]]"
    element-href="[[item.elementHref]]">
  </px-view>
</template>
```

## Summary

When user visit `/dashboards`:

- *app-route* will handle the url change, and set `routeData.page` to be String `'dashboards'`
- *px-view* will compare `routeData.page` with `item.page` and select the view which has the same `page` to render.
