/**
 * Renders all the widgets on the tab and triggers the datasources that are used by the widgets.
 * Customize your widgets by:
 *  - Overriding or extending widget API methods
 *  - Changing widget settings or options
 */
/* jshint unused: false */
define(['angular',
    'sample-module',
    'vruntime'
], function(angular, controllers) {
    'use strict';

    function getDetails(entity) {
        var details = [];

        switch (entity.specification) {
            case '/classification/2A64A9C59F1543C4A79CB752B40F9469':
                details.push({label: entity.attributes.Name.value[0]});
                break;
            case '/classification/B4A12244105845BAA34D4C2E4F1CF1A0':
                details.push({label: entity.attributes.QualifiedName.value[0]});
                details.push({label: entity.attributes.EquipmentId.value[0]});
                details.push({label: entity.attributes['Central Historian Name'].value[0]});
                break;
            case '/classification/B3199526966745C6B655E668589296D2':
                details.push({label: entity.attributes.QualifiedName.value[0]});
                details.push({label: entity.attributes['Connection Type'].value[0]});
                details.push({label: entity.attributes['Default Gateway'].value[0]});
                break;
            case '/classification/D4A018A2C587477792152CF520CB1C5A':
                details.push({label: entity.attributes.QualifiedName.value[0]});
                details.push({label: entity.attributes.AreaID.value[0]});
                details.push({label: entity.attributes['Bently Enabled'].value[0]});
                details.push({label: entity.attributes['Equipment Type'].value[0]});
                break;
            case '/classification/2B4B14F45D974459B99FDB92BD0E8F44':
                details.push({label: entity.attributes.EquipmentId.value[0]});
                details.push({label: entity.attributes.AreaID.value[0]});
                details.push({label: entity.attributes.City.value[0]});
                break;
            case '/classification/01554CA88109412B9CC527057B88D27F':
                details.push({label: entity.attributes.QualifiedName.value[0]});
                details.push({label: entity.attributes.displayName.value[0]});
                break;
            case '/classification/B4A12244105845BAA34D4C2E4F1CF1A0':
                details.push({label: entity.attributes.QualifiedName.value[0]});
                details.push({label: entity.attributes['Central Historian Name'].value[0]});
                details.push({label: entity.attributes['Connection Type'].value[0]});
                break;
            case '/classification/DDCD4E3A7DE844AFAB48F1E43AB5ACDD':
                details.push({label: entity.attributes.QualifiedName.value[0]});
                details.push({label: entity.attributes.EquipmentId.value[0]});
                details.push({label: entity.attributes.AreaID.value[0]});
                break;
            case '/classification/E58832552CFF40C28DDC28C719A0A0CB':
                details.push({label: entity.attributes.QualifiedName.value[0]});
                details.push({label: entity.attributes.EquipmentId.value[0]});
                details.push({label: entity.attributes.AreaID.value[0]});
                break;
        }

        return details;
    }

    // Controller definition
    controllers.controller('DashboardCtrl', ['$scope', function($scope) {

        $scope.contextSelectorConfig = {
            baseUrl: '/services', // the base uri where your asset instance is
            rootEntityId: null, // the root of the context browser
            onOpenContext: function(contextDetails) { // callback when the open button is hit in the context browser
                $scope.context = contextDetails;
            },
            transformSelectedEntityDetails: function(entity) { // configure key value pairs to show in the entity info panel in the context browser (the selected entity)
                return getDetails(entity[0]); // asset returns a list of the object (so need to get [0] here)

                //return [
                //    {label: entity.attributes.Name.value[0]},  // (ex: {label: entity.attributes['Customer Name'].value})
                //    {label: '12/24/2001'},
                //    {label: 'Williamsburg Contract'},
                //    {label: 'Serial Number', value: '345hwfher2wh3f8h47f'}
                //];
            },
            transformPinnedEntityDetails: function(entity) { // configure key value pairs to show in the entity info panel in dashboard (the pinned entity)
                return getDetails(entity[0]);

                //
                //if(entity.classification ==) {
                //
                //}
                //
                //return [
                //    {label: 'John Doe'},  // (ex: {label: entity.attributes['Customer Name'].value})
                //    {label: '12/24/2001'},
                //    {label: 'Williamsburg Contract'},
                //    {label: 'Serial Number', value: '345hwfher2wh3f8h47f'},
                //    {label: 'Part Number', value: 32434},
                //    {label: 'Part', value: '34wtefh8cdx'}
                //];
            }
        };

        // optional, can pass disabled attribute to context browser to disable it
        //$scope.disabled = true;

        // ** Additional Configuration Options (not required) ** //
//        $scope.contextSelectorConfig = {
//            baseUrl: '/services', // the base uri where your asset instance is
//            rootEntityId: null, // the root of the context browser
//            onOpenContext: function(contextDetails) { // callback when the open button is hit in the context browser
//                $scope.context = contextDetails;
//            },
//            transformChildren: function(entity) { // transform your entity to context browser entity format
//                return {
//                    name: entity.assetId,
//                    id: entity.uri,
//                    parentId: entity.parent,
//                    classification: entity.specification,
//                    isOpenable: !(entity.attributes && entity.attributes.isNotOpenable)
//                };
//            },
//            getEntityChildrenUrl: function(parentEntityId) { // url to fetch the child entity
//                return this.baseUrl + '/asset?filter=parent=' + parentEntityId;
//            },
//            getEntityDetailUrl: function(entityId){ //url to fetch the entity details
//                return this.baseUrl + entityId;
//            },
//            transformSelectedEntityDetails: function(entity) { // configure key value pairs to show in the entity info panel in the context browser (the selected entity)
//                return [
//                    {label: 'John Doe'},  // (ex: {label: entity.attributes['Customer Name'].value})
//                    {label: '12/24/2001'},
//                    {label: 'Williamsburg Contract'},
//                    {label: 'Serial Number', value: '345hwfher2wh3f8h47f'}
//                ];
//            },
//            transformPinnedEntityDetails: function(entity) { // configure key value pairs to show in the entity info panel in dashboard (the pinned entity)
//                return [
//                    {label: 'John Doe'},  // (ex: {label: entity.attributes['Customer Name'].value})
//                    {label: '12/24/2001'},
//                    {label: 'Williamsburg Contract'},
//                    {label: 'Serial Number', value: '345hwfher2wh3f8h47f'},
//                    {label: 'Part Number', value: 32434},
//                    {label: 'Part', value: '34wtefh8cdx'}
//                ];
//            }
//        };

//        //additional optional configs (if not using asset, want additional details displayed, etc.)


    }]);
});
