VideoPlayer Component
---------------------

Heavily based on VideoJS, this video player uses the out of the box configuration for VideoJS and lightly alters
it's default themed LESS file with a couple GE Bootstrap/Brandkit variable definitions.

From there, we heavily override what we don't like in the theme with dx-vjs.less. This LESS file is intended to be THE
custom style definition for the project. As the video player grows up, we might see some variation on the design systems used.
If heavy variation, it is suggested to clone for each design system keeping dx-vjs as a common baseline if possible