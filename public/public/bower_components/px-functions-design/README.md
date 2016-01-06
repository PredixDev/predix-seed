# Functions

The Predix Experience Functions module—like the Mixins module—contains a few Sass functions that are **required** for using virtually all Predix Experience and inuitcss modules.



## Dependency

Px's Functions module depends on one other inuitcss module:

* [inuit-functions](https://github.com/inuitcss/tools.functions)

## Installation

Install this module and its dependency using bower:

    bower install --save https://github.com/PredixDev/px-functions-design.git

Once installed, `@import` into your project's Sass file in its Tools layer:

    @import "px-functions-design/_tools.functions.scss";

## Usage

The following Sass functions are provided:

* `calculateRem($size)`: Convert a pixel into a rem
* `quarter|halve|double|quadruple|third|triple($inuit-number)`: Quarter, halve, third, double, triple, and quadruple numbers, returning rounded integers
