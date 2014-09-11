
/*
 * Define Angular controllers module
 */
define(['angular', 'vruntime'], function (angular) {

    var module =  angular.module('app.controllers', ['vRuntime.services']);

    module.config(['$controllerProvider',function($controllerProvider){

        module._controller = module.controller;
	
        module.controller = function(name, constructor) {
            $controllerProvider.register(name, constructor);
        };
	
    }]);

    return module;	
});