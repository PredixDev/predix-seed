var expect = chai.expect;

define([ 'jquery', 'spinner'], function ($) {

    describe('Provides a JQuery plugin', function(){
        it('should expose the spinner jQuery plugin', function() {
            expect($('*').spin).not.to.be.undefined;
        });
    });
});
