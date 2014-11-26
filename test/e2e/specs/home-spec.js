var Home = require('../models/home.js'),
	_view = new Home();

describe('Given a Home', function() {
	it('should have a title', function() {
		_view.get().then(function(){
			browser.debugger();
			expect(_view.page.title.getText()).toEqual('Home');
		});
	});
});
