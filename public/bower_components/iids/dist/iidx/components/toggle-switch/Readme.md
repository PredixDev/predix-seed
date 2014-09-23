Toggle Switch
==========

Toggle switch implementation based on bootstrap-switch found at https://github.com/nostalgiaz/bootstrap-switch and http://www.bootstrap-switch.org.

# Introduction

Toggle switch provides an alternative UI to a single checkbox or binary choice radio buttons

# Basic Usage

When the toggle-switch.js and dependencies are on the page, any <input type="checkbox" data-toggle-switch="true"/> elements are turned into toggle-switch elements automatically

```html
    <label class="checkbox">
        <input type="checkbox" data-toggle-switch="true" name="nm" value="vl"/>
        My toggle switch
    </label>
```

The underlying "toggleSwitch" plugin will turn all checkbox elements matched by the selector into toggle buttons.

Alternatively, instance a toggle-switch via JavaScript with custom options:

<input type="checkbox" class="some-class"/>

```javascript
$('input.some-class').toggleSwitch();
```

When a toggle switch is created, the checked state of the checkbox will be connected to the state of the toggle switch.  As with any other checkbox in an HTML form, the "value" attribute will be submitted with the HTML form only if its "checked" state is true.

## Options

All options documented in the bootstrap-switch API are supported, including the size variations via CSS class names on the container:

```html
    <label class="checkbox">
        <input type="checkbox" data-toggle-switch="true" class="switch-large" name="nm" value="vl"/>
        Large
    </label>
    <label class="checkbox">
        <input type="checkbox" data-toggle-switch="true" class="switch-small" name="nm" value="vl"/>
        Small
    </label>
    <label class="checkbox">
        <input type="checkbox" data-toggle-switch="true" class="switch-mini" name="nm" value="vl"/>
        Mini
    </label>
```

## Function calls

The toggle-switch exposes the toggleState() and setState() functions from the underlying bootstrap-switch plugin. See those docs for usage.

## Extending styles

The visual design of the toggle-switch is much different from the visual design of the underlying bootstrap-switch component. Therefore, none of the underlying project's CSS is used.  The toggle-switch.less file (which is compiled into CSS via the Less compiler) does rely on the same selectors.

## Extending behavior

Since the toggle switch plugin is created using oo-utils.makePlugin(), The toggleSwitch plugin prototype itself is registered and accessible via ooUtils.getPlugin(). See the Readme file for oo-utils at https://devcloud.sw.ge.com/source/projects/DT/repos/oo-utils/browse
