
/*
 * Define Angular app.services module
 */
define(['angular'], function (angular) {
    
    var module =  angular.module('app.services', []);
	
    module.config(['$provide',function($provide){
	
        module._service = module.service;
        module._factory = module.factory;
        module._value = module.value;
	
        module.service = function( name, constructor ) {
	
            $provide.service( name, constructor );
            return( this );
	
        };
	
        module.factory = function( name, factory ) {
	
            $provide.factory( name, factory );
            return( this );
	
        };
	
        module.value = function( name, value ) {
	
            $provide.value( name, value );
            return( this );
	
        };
    }]);
  	

	return module;	
});