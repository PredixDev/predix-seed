/*
 * Copyright (c) 2013 GE Global Research. All rights reserved.
 *
 * The copyright to the computer software herein is the property of
 * GE Global Research. The software may be used and/or copied only
 * with the written permission of GE Global Research or in accordance
 * with the terms and conditions stipulated in the agreement/contract
 * under which the software has been supplied.
 */

'use strict';

define(['jquery'], function ($) {

    var _registeredPlugins = {};

    return {

        /**
         * Polyfill for the OO goodness of Object.create() if not present (js < 1.8.5, i.e. ie < 9, chrome < 5, Firefox < 4)
         * Allows prototypal inheritance, i.e. create an object based on another object. Uses base js Object.create,
         * but our version allows a simple object to be passed as the 2nd argument...does not need to be contain property descriptor
         * objects
         *
         * if a propertiesObject is passed, for each overridden property provides a pointer to the original implementation
         * on the "protoChain" of the instance which can be accessed, similar to a call to "super".  For example, for
         * instance "MyInstance" which overrides function "myFunction", the original definition of "myFunction" can be called
         * as MyInstance.protoChain.myFunction.call(this, [arg1, arg2, ... argN]);
         *
         * Usage: var newObject = ooUtils.create(oldObject, extraPropertiesForNewObject);
         * @see official docs: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/create
         *
         * @param Object proto The object to instance
         * @param [Object] propertiesObject An object that defines members to add or override from the base. In our version, does not need to be property descriptor objects
         */
        create: function (proto, propertiesObject) {
            var instance, propName, overridden, descriptor, PolyfillConstructor;

            // If the proto is a function then we need to convert it into the proto object.
            if (typeof proto === 'function') {
                proto = proto.prototype;
            }

            //the meat of the issue...create an instance
            if (Object.create) {
                instance = Object.create(proto);
            }
            else {
                PolyfillConstructor = function() {};
                PolyfillConstructor.prototype = proto;
                instance = new PolyfillConstructor();
            }

            if (propertiesObject) {
                var hasOverriddenFields = false;

                //Determine support for Object.getOwnPropertyDescriptor
                var supportsGetOwnPropertyDescriptor = typeof(Object.getOwnPropertyDescriptor !== "undefined");

                for (propName in propertiesObject) {
                    if (propertiesObject.hasOwnProperty(propName)) {
                        if (supportsGetOwnPropertyDescriptor) {
                            try {
                                descriptor = typeof propertiesObject[propName].enumerable === "undefined" ? Object.getOwnPropertyDescriptor(propertiesObject, propName) : propertiesObject[propName];
                                Object.defineProperty(instance, propName, descriptor);
                            }
                            catch (e) {
                                //IE < 9 or in Quirks mode does not handle Object.getOwnPropertyDescriptor correctly (only works for DOM objects)..handled below
                                supportsGetOwnPropertyDescriptor = false;
                            }
                        }

                        if (!supportsGetOwnPropertyDescriptor) {//could be an "else" condition, but boolean may have been reset in the catch clause above
                            descriptor = propertiesObject[propName];
                            if (descriptor && descriptor.value) {
                                instance[propName] = descriptor.value;
                            }
                            else {
                                instance[propName] = descriptor;
                            }
                        }

                        //set up "super" functionality via a "protoChain" member
                        if (proto[propName]) {
                            if (!hasOverriddenFields) {
                                hasOverriddenFields = true;
                                instance.protoChain = {};
                            }
                            instance.protoChain[propName] = proto[propName];
                        }
                    }
                }
            }
            return instance;
        },

        /**
         * Makes a jQuery plugin using the prototype of a given object
         * Usage:
         * ooUtils.makePlugin('myPluginName', myPluginObject);
         *
         * and then...
         * <ul>
         *     <li>Instance the new plugin on '#myElem': $('#elem').myPluginName();</li>
         *     <li>Pass options when creating an instance: $('#elem').myPluginName({name: "John"});</li>
         *     <li>Operate on an instance:
         *          <ul>
         *              <li>$('#elem').data('myPluginName').myFunction();</li>
         *              <li>$('#elem').myPluginName().myFunction();</li>
         *              <li>$('#elem').myPluginName('myFunction');</li>
         *          </ul>
         *      </li>
         * </ul>
         *
         * @param {String} pluginName
         * @param {Object} prototype the plugin object
         */
        makePlugin: function (pluginName, prototype) {
            _registeredPlugins[pluginName] = prototype;
            var dxUtils = this;
            $.fn[pluginName] = function (arg) {
                var opts = typeof arg === 'object' ? arg : null, //did we pass in an 'options' object, or are we calling a function?
                    internalReturn; //if calling a function with a return value, provide a local variable to store that value while in the 'each' loop below
                this.each(function () {
                    var instance, fn, dataKey, wrappedInstance;

                    //get or create instance
                    instance = $.data(this, pluginName); //have we already instanced / attached one of these to the element?
                    if (!instance) {
                        instance = dxUtils.create(prototype); //make an instance
                        $.data(this, pluginName, instance); //attach the instance
                        instance.init(opts, this);
                    }
                    internalReturn = instance; // we want to return the last instanced object

                    // function call
                    if (typeof arg === 'string') {
                        if (instance[arg] && typeof instance[arg] === "function") { // function call on top-level plugin object
                            fn = instance[arg];
                        }
                        else if (instance.wrappedPluginDataKeys) { // pass-through function call on a wrapped plug-in (assumes wrapped plugins register themselves on the "data" of the element
                            for (var i=0; i<instance.wrappedPluginDataKeys; i++) {
                                dataKey = instance.wrappedPluginDataKeys[i];
                                wrappedInstance = $.data(this, dataKey);
                                if (wrappedInstance && wrappedInstance[arg] && typeof wrappedInstance[arg] === "function") {
                                    fn = wrappedInstance[arg];
                                    break;
                                }
                            }
                        }

                        if (!fn) {
                            $.error('Function ' + arg + ' does not exist on ' + pluginName + "' or any wrapped plugin"); // function call attempt on non-existent function
                        }
                        else {
                            internalReturn = fn.apply(this, Array.prototype.slice.call(arguments, 1));
                            if (typeof internalReturn !== 'undefined') {
                                return false; // if we called a function with a return value, break out of 'each' loop...can only call a function on a single instance
                            }
                        }
                    }
                });
                return internalReturn; // returns function return value or last instanced object
            };
        },

        /**
         * Returns the prototype of a plugin object previously registered via makePlugin().  Useful for extending a
         * plugin to make a new one.  For example:
         *
         * ooUtils.makePlugin("aPlugin", obj);
         *
         * and then, sometime later, in a different class...
         *
         * var originalPlugin = ooUtils.getPlugin("aPlugin"); //get the original, which was defined elsewhere
         * var myOtherPlugin = ooUtils.create(originalPlugin, anotherObj); // extend
         * ooUtils.makePlugin("anotherPlugin", myOtherPlugin); // register the extended object
         *
         * @param pluginName
         * @returns {Object} the plugin object currently registered under the given name
         */
        getPlugin: function(pluginName) {
            return _registeredPlugins[pluginName];
        }
    };
});