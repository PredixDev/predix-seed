# iidx-timepicker

![Mou icon](http://mouapp.com/Mou_128.png)

## Overview

**timepicker**, is a simple component to select a time with an overlay on top of a plain html input box.

### Syntax

<div class="input-append bootstrap-timepicker">
	<input id="timepicker1" type="text" class="input-small">
	<span class="add-on"><i class="icon-time"></i></span>
</div>

<script src="../lib/requirejs/require.js"></script>
<script src="../src/js/require.config.js"></script>

<script type="text/javascript">
	require.config({
		baseUrl: '../src'
	});

	require([
		'jquery',
		'timepicker'
	], function ($) {
	
		console.log("debug:test:timepicker.ready()");
        $('#timepicker1').timepicker();

	});
</script>
