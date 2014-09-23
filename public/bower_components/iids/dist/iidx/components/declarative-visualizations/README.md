
# Declarative Visualizations

Declarative data visualizations are graphs and other diagrams which invoke SVG images from the D3 library using simple, declarative HTML.

To invoke visualizations, first use a `<div></div>` element with the `data-visualization` attribute set to the appropriate visualization type. Additional `data-` attributes are used by each type to declare the values for rendering.

`<div data-visualization="bar"></div>`

To initialize the visualization, first require the declarative visualizations module to import the necessary code libraries.

```
require(['declarative-visualizations'], function(visualizations) {
  ...
});
```

In the require callback, invoke the visualization method on each of the matched elements and apply any additional functionality as needed.

```
$('div[data-visualization="gauge"]').each(function(i, element) {
  var gauge = visualizations.gauge(element);
});
```

By changing the `data-` attributes on the tag and then calling `update` you can redraw the visualization.

```
var gauge = visualizations.gauge(element);

// ... change data-* attributes ...

gauge.update();
```

## Bar

A bar chart visualization.

Sample HTML:

<pre><code>&lt;div data-visualization="bar" data-max="5000" data-value="3965.20" data-threshold="1000"&gt;&lt;/div&gt;
</code></pre>

Data API:

<table>
  <tr>
    <th>Attribute</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>data-duration</code></td>
    <td>Animation speed in milliseconds of visualization for initial render and subsequent updates. <i>(optional)</i></td>
  </tr>
  <tr>
    <td><code>data-max</code></td>
    <td>Maximum value.</td>
  </tr>
  <tr>
    <td><code>data-min</code></td>
    <td>Minimum value. Defaults to <code>0</code>. <i>(optional)</i></td>
  </tr>
  <tr>
    <td><code>data-target</code></td>
    <td>Target URL for optional JSON source. Will ignore other `data-` attributes if specified. <i>(optional)</i></td>
  </tr>
  <tr>
    <td><code>data-threshold</code></td>
    <td>Threshold value. Defines the position of the white marker on the visualization. <i>(optional)</i></td>
  </tr>
  <tr>
    <td><code>data-value</code></td>
    <td>Current value. Defines the size of the colored area.</td>
  </tr>
  <tr>
    <td><code>data-visualization</code></td>
    <td>Type of visualization: <code>bar</code>.</td>
  </tr>
</table>

## Donut

A donut chart visualization.

Sample HTML:

<pre><code>&lt;div data-visualization="donut" data-source='[["Fuel", 70.3], ["Capital Allocation", 19.5], ["Operations &amp; Maintenance", 10.2]]'&gt;&lt;/div&gt;
</code></pre>

Data API:

<table>
  <tr>
    <th>Attribute</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>data-duration</code></td>
    <td>Animation speed in milliseconds of visualization for initial render and subsequent updates. <i>(optional)</i></td>
  </tr>
  <tr>
    <td><code>data-labelhidden</code></td>
    <td>Boolean toggle for visibility of labels. Defaults to <code>false</code>. <i>(optional)</i></td>
  </tr>
  <tr>
    <td><code>data-labelwrap</code></td>
    <td>Minimum width of containing element before labels should wrap underneath. Can be disabled with a value of <code>false</code>. Defaults to <code>300</code>. <i>(optional)</i></td>
  </tr>
  <tr>
    <td><code>data-source</code></td>
    <td>Data for the visualization. A JSON array, where each element is an array of <code>[label, value]</code>.</td>
  </tr>
  <tr>
    <td><code>data-target</code></td>
    <td>Target URL for optional JSON source. Will ignore other `data-` attributes if specified. <i>(optional)</i></td>
  </tr>
  <tr>
    <td><code>data-visualization</code></td>
    <td>Type of visualization: <code>donut</code>.</td>
  </tr>
</table>

## Gauge

A semicircular gauge visualization.

Sample HTML:

<pre><code>&lt;div data-visualization="gauge" data-value="23" data-max="100" data-threshold="50" data-label-min="0" data-label-max="16mm"&gt;&lt;/div&gt;
</code></pre>

Data API:

<table>
  <tr>
    <th>Attribute</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>data-duration</code></td>
    <td>Animation speed in milliseconds of visualization for initial render and subsequent updates. <i>(optional)</i></td>
  </tr>
  <tr>
    <td><code>data-label-max</code></td>
    <td>Text for the label at the right end of the gauge. <i>(optional)</i></td>
  </tr>
  <tr>
    <td><code>data-label-min</code></td>
    <td>Text for the label at the left end of the gauge. <i>(optional)</i></td>
  </tr>
  <tr>
    <td><code>data-max</code></td>
    <td>Maximum value.</td>
  </tr>
  <tr>
    <td><code>data-min</code></td>
    <td>Minimum value. Defaults to <code>0</code>. <i>(optional)</i></td>
  </tr>
  <tr>
    <td><code>data-target</code></td>
    <td>Target URL for optional JSON source. Will ignore other `data-` attributes if specified. <i>(optional)</i></td>
  </tr>
  <tr>
    <td><code>data-threshold</code></td>
    <td>Threshold value. Defines the position of the white marker on the visualization. <i>(optional)</i></td>
  </tr>
  <tr>
    <td><code>data-value</code></td>
    <td>Current value. Defines the position of the needle.</td>
  </tr>
  <tr>
    <td><code>data-visualization</code></td>
    <td>Type of visualization: <code>gauge</code>.</td>
  </tr>
</table>

## Spiderweb

A spiderweb visualization.

Sample HTML:

<pre><code>&lt;div data-visualization="spiderweb" data-max="80000" data-source='[30000, 39000, 62000, 41000, 36000, 64000, 27000, 49000, 51000]'&gt;&lt;/div&gt;
</code></pre>

Data API:

<table>
  <tr>
    <th>Attribute</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>data-duration</code></td>
    <td>Animation speed in milliseconds of visualization for initial render and subsequent updates. <i>(optional)</i></td>
  </tr>
  <tr>
    <td><code>data-max</code></td>
    <td>Maximum value. Determines the radius of the spiderweb inside the visualization.</td>
  </tr>
  <tr>
    <td><code>data-source</code></td>
    <td>An array of data points to plot on the spiderweb.</td>
  </tr>
  <tr>
    <td><code>data-target</code></td>
    <td>Target URL for optional JSON source. Will ignore other `data-` attributes if specified. <i>(optional)</i></td>
  </tr>
  <tr>
    <td><code>data-visualization</code></td>
    <td>Type of visualization: <code>spiderweb</code>.</td>
  </tr>
</table>
