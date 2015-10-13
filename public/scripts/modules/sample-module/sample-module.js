define(['angular'], function(angular) {
    'use strict';

    var module = angular.module('sample.module', []);

    module.config(['$controllerProvider', function($controllerProvider) {
        module._controller = module.controller;
        module.controller = function(name, constructor) {
            $controllerProvider.register(name, constructor);
        };
    }]);

    module.config(['$compileProvider', function($compileProvider) {
        module._directive = module.directive;
        module.directive = function(name, factory) {
            $compileProvider.directive(name, factory);
            return this;
        };
    }]);

    module.config(['$provide', function($provide) {
        module._service = module.service;
        module._factory = module.factory;
        module._value = module.value;

        module.service = function(name, constructor) {
            $provide.service(name, constructor);
            return this;
        };

        module.factory = function(name, factory) {
            $provide.factory(name, factory);
            return this;
        };

        module.value = function(name, value) {
            $provide.value(name, value);
            return this;
        };
    }]);

    module.config(['$filterProvider', function($filterProvider) {
        module._filter = module.filter;
        module.filter = function(name, filter) {
            $filterProvider.register(name, filter);
        };
    }]);

    return module;
});
