#&nbsp;
##Slider

---

#### About Slider

Sliders are streamlined and flexible data entry assistants with the minimum required functionality and smart defaults.

---
#### Examples

###### Default Example

A horizontal slider with the default settings.

###### Another example

---

### Usage

######Via data attributes
Activate a slider without writing JavaScript. Set data-slider="true" on an input element with type "range" to activate the slider input.

	<input type="range" data-slider="horizontal" />

######Via Javascript

Call a slider with id mySlider with a single line of JavaScript:

	$('#mySlider').modal(options)
	
---
####Options
Options can be passed via data attributes or JavaScript. For data attributes, append the option name to data-, as in data-orientation="".


|Name | type | default | description |
| --- | --- | --- | --- |
| min | number | 0 | Minimum value
| max | number | 100 | Maximum value
| value | number | 0 | Initial value of the slider
| highlight | string | '#009ae1' | Color of highlight bar which indicates position. Set to 'transparent' to disable.
| buttons | boolean | true | Toggle "+" and "-" button visibility
| buttonPosition | string | 'apart' | Set the position of the buttons - together | apart
| label | string | '' | Set label text. Leave null or empty for automatic update from current value.
| labelPosition | string | 'outside' | Set the label position - inside | outside
| labelPrefix | string | '' | A prefix to appear before label value when live update is enabled.
| labelSuffix | string | '' | A suffix to appear after label value when live update is enabled.
| steps | number | 1.0 | Determines the size or amount of each interval or step the slider takes between the min and max. The full specified value range of the slider (max - min) should be evenly divisible by the step.
| snap | boolean | false | Snap slider thumb to exact position of step vales only.
| scale | boolean | false | Number of numeric scale markers.
| tickmarks | integer | 0 | Number of tickmarks to appear between each scale marker. 

---
####Not Implemented
|Name | type | default | description |
| --- | --- | --- | --- |
| orientation | string | 'horizontal' | Set the slider orientation - horizontal | vertical
| tooltip | boolean | false | Set tooltip to appear above thumb when pressed
| dragEdit | boolean | false | Enable “Edited not aplied” state
| dragLocked | boolean | false | Set to “Locked, inspection only” state
| dragGhost | boolean | false | Enable “Ghost of previous value” state
| keyboardEntry | boolean | false | enable


---

####Methods

######.slider(options)

Activates your content as a slider. Accepts an optional options object.

	$('#mySlider').slider({
		oreintation: 'horizontal'
	});

####Not Implemented


######.slider('toggle')

Manually toggles visibility of a slider.

	$('#mySlider').slider('toggle');

######.slider('show')

Manually shows a slider.

	$('#mySlider').slider('show');
	
######.slider('hide')

Manually hides a slider.
	
	$('#mySlider').slider('hide');

######.slider('destroy')

Manually destroys a slider and returns to native DOM state.
	
	$('#mySlider').slider('destroy');


---

####Events

| name | arguments | description  |
| --- | --- |
| change | (event,value) | Triggered after the user slides a handle, if the value has changed; or if the value is changed programmatically via the value method.
| create | (event,value) | Triggered when the slider is created.
| slide | (event,value) | Triggered on every mouse move during slide. 
| start | (event,value) | Triggered when the user starts sliding.
| stop | (event,value) | Triggered after the user slides a handle.


---

<br/>
<br/>
<br/>

