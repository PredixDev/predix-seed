/**
 * Created by 212342050 on 3/17/14.
 */
'use strict';

define(['node_modules/test-dependencies/src/js/unit/karma/fixtures', 'jquery', 'module'], function (fixtures, $, module) {
    var $$;
    before(function(done) {
        this.timeout(15000);
        var modbase = module.uri.substr(0, module.uri.indexOf("/test") );

        fixtures.path = modbase + '/test/fixtures';
        fixtures.load('spinner.html', function() {
            $('#' + fixtures.containerId).width('100%');
            $('#' + fixtures.containerId).height('100%');
            $('#' + fixtures.containerId).css({ opacity: 1 });
            // wait for require dependencies
            setTimeout(function(){
                $$ = fixtures.window().$;
                done();
            }, 100);
        });
    });

    after(function(){
        // remove cleanup if you'd like to debug
        fixtures.cleanUp();
        fixtures.clearCache();
    });


    describe('Provides a customizable "spin" interface', function(){
        before(function() {
            $$('.spinner').spin({length: 28, top: 60, left: 150, lines: 25});
        });

        it('Should be spinning', function() {
            expect( $$('.spinner .spinner div:nth-child(2)').css('-webkit-animation-name') ).to.not.be.undefined;
        });

        it('Should contain 25 +1 elements when we set the number of lines to 25', function() {
            expect($$('.spinner').children().length).to.equal(25 +1);
        });
    });

    describe('Provides a stop method', function(){
        before(function() {
            $$('.spinner').spin(false);
        });

        it('Should not have inner elements because its been torn down', function() {
            expect( $$('.spinner').children().length).to.equal(0);
        });
    });

    describe('Provides an interface that does not need options passed in', function(){
        before(function() {
            $$('.spinner').spin();
        });

        it('Should contain 11 elements (10 lines) by default', function() {
            expect($$('.spinner').children().length).to.equal(10 +1);
        });

        it('Should be spinning', function() {
            expect( $$('.spinner .spinner div:nth-child(2)').css('-webkit-animation-name') ).to.not.be.undefined;
        });
    });

});
