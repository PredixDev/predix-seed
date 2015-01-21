/*
 * Define Angular app.directives module
 */
define(['angular','angular-bootstrap'], function (angular) {
	'use strict';
	var module = angular.module('predix.widgets', ['ui.bootstrap.pagination']);
	module.config(['$compileProvider', function ($compileProvider) {
		module._directive = module.directive;
		module.directive = function (name, factory) {
			$compileProvider.directive(name, factory);
			return this;
		};
	}]);
	return module;
});
