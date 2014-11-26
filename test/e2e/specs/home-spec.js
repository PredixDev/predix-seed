'use strict';
var Home = require('../models/home-model.js'),
	_view = new Home();

describe('Given a Home', function () {
	it('should have a title', function () {
		_view.get().then(function () {
			browser.debugger();
			expect(_view.name.getText()).toEqual('home');
		});
	});
});
