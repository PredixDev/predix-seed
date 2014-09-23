'use strict';

/*
 * Copyright (c) 2013 GE Global Research. All rights reserved.
 *
 * The copyright to the computer software herein is the property of
 * GE Global Research. The software may be used and/or copied only
 * with the written permission of GE Global Research or in accordance
 * with the terms and conditions stipulated in the agreement/contract
 * under which the software has been supplied.
 */

/**
 * @class Unit test spec for toggle-switch.
 *
 * Use any Mocha (http://visionmedia.github.io/mocha/), Chai (http://chaijs.com/), or Sinon (http://sinonjs.org/) statements here
 *
 * @author Jeff Reichenberg
 *
 */
define(['jquery', 'toggle-switch'], function ($) {

    describe('Provides a JQuery plugin', function(){

        it('should load the bootstrap-switch plugin', function(){
            expect($('*').bootstrapSwitch).not.to.be.null;
        });

        it('should expose a toggleSwitch JQuery plugin', function(){
            expect($('*').toggleSwitch).not.to.be.null;
        });
    });

});