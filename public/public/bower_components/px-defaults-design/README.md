# Defaults

The Predix Experience `defaults` module contains a few variables and settings that are **required** for using any of the rest of the framework.



## Dependency

Px's Defaults module depends on one other Px module:

* [px-functions-design](https://github.com/PredixDev/px-functions-design)

## Installation

Install this module and its dependency using bower:

    bower install --save https://github.com/PredixDev/px-defaults-design.git

Once installed, `@import` into your project's Sass file in its Settings layer:

    @import "px-defaults-design/_settings.defaults.scss";