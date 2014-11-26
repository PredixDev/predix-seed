'use strict';
var About = require('../models/about-model.js'),
	_view = new About();

describe('Given a About', function () {
	it('should have a title', function () {
		_view.get().then(function () {
			browser.debugger();
			expect(_view.name.getText()).toEqual('about');
		});
	});
});
