/*
predix-workbench - 14.1.0 - Tuesday, August 26th, 2014, 7:42:11 PM 

Copyright © 2012-2014 General Electric Company. All rights reserved. 
The copyright to the computer software herein is the property of General Electric Company. The software may be used and/or copied only 
with the written permission of General Electric Company or in accordance with the terms and conditions stipulated in the agreement/contract under which the software has been supplied.
*/

/** 
Masking the error W030 reported by JSHint on the angular watch expression
*/
/*jshint -W030 */

define([ "angular", "workbench-vruntime-module", "bootstrap" ], function(angular, vruntime) {
    "use strict";
    return vruntime.factory("vModuleService", function($moduleSet, $rootScope) {
        return {
            init: function(scope, element, attrs, controller) {
                scope.moduleActions = [], attrs.editable && "true" === attrs.editable && element.addClass("draggable"), 
                controller && controller.addModule(element), "true" === scope.editable && (scope.moduleActions = [], 
                $moduleSet.safeApply(function() {
                    scope.moduleActions.push({
                        label: "Delete Module",
                        name: "delete_module"
                    });
                }));
            },
            addDynamicIds: function(el, type, element) {
                if (el instanceof jQuery) return el.attr("id", element.attr("id") + type).attr("data-modal", element.attr("data-uuid") + "-modal").attr("data-uuid", element.attr("data-uuid")).attr("data-module", element.attr("id"));
                throw new Error("vModuleService.addDynamicIds() - Must pass valid jQuery object as first param.");
            },
            addWidgetActions: function(scope) {
                scope.moduleActions = [], $moduleSet.safeApply(function() {
                    scope.moduleActions.push({
                        label: "Delete Module",
                        name: "delete_module"
                    }), scope.moduleActions.unshift({
                        label: "Delete Widget",
                        name: "delete_widget"
                    }), scope.moduleActions.unshift({
                        label: "Edit Widget",
                        name: "edit_widget"
                    });
                });
            },
            addModuleActions: function(scope) {
                scope.moduleActions = [], $moduleSet.safeApply(function() {
                    scope.moduleActions.push({
                        label: "Delete Module",
                        name: "delete_module"
                    });
                });
            },
            setupModule: function(scope, element) {
                var self = this, id = element.attr("id");
                self.addDynamicIds(element.find(".module-header"), "-header", element), self.addDynamicIds(element.find(".module-body"), "-body", element), 
                self.addDynamicIds(element.find(".modal"), "-modal", element), element.children(".module-content").children().length && scope.moduleActions && self.addWidgetActions(scope), 
                scope.moduleActions && (element.find('[data-toggle="dropdown"]').dropdown(), element.find(".actions").on("click", ".action-link", function(e) {
                    e.preventDefault();
                    var data = angular.element(e.currentTarget).data(), action = data.action;
                    return data.id = void 0 !== id ? id : element.attr("id"), $rootScope.$emit("module:action:" + action + ":click", data), 
                    (scope.actionCallback || angular.noop)(action, e);
                }));
            },
            doubleClickHandler: function(e) {
                $rootScope.$emit("module:action:dblclick", $(e.currentTarget));
            },
            domSubtreeHandler: function(e, scope) {
                var self = this, el = $(e.currentTarget);
                el.find(".module-content").children().length > 0 ? self.addWidgetActions(scope) : self.addModuleActions(scope);
            }
        };
    }), vruntime.directive("vModule", function($timeout, $rootScope, $moduleSet, vModuleService) {
        return {
            restrict: "EA",
            transclude: !0,
            replace: !0,
            require: "?^vModuleSet",
            scope: {
                moduleTitle: "@title",
                moduleSize: "@size",
                moduleIndex: "@index",
                moduleWidget: "=widget",
                moduleDisabled: "=disabled",
                moduleCollapsable: "=collapsable",
                actionCallback: "&callback",
                actions: "@",
                uuid: "@",
                index: "@",
                editable: "@"
            },
            template: '<section class="module draggable span{{moduleSize}}" data-id="module-{{$id}}" data-index="{{moduleIndex}}" data-module="module-{{$id}}">    <header class="module-header module-contextmenu">        <h3 class="voice voice-brand pull-left">{{moduleTitle}}</h3>        <div class="module-widget-controls pull-right"><div class="btn-group pull-right module-controls" data-ng-show="editable">            <button class="btn dropdown-toggle btn-mini" data-toggle="dropdown">                <i class="icon-chevron-down"></i>\n            </button>\n            <ul class="dropdown-menu actions">\n                <li class="action" data-ng-repeat="action in moduleActions">\n                    <a href="" class="action-link" data-moduleid="module-{{$id}}" data-moduleindex="{{moduleIndex}}" data-action="{{action.name}}">{{action.label}}</a>\n                </li>\n            </ul>\n        </div>\n    </div>\n    </header>\n    <div class="module-body" name="placeholder-{{index}}" data-uuid="{{uuid}}"\n             data-widgettype="{{moduleWidget.type}}"\n             data-widgetid="{{moduleWidget.id}}"\n             data-widgetuuid="{{moduleWidget.uuid}}"> <div class="module-content" data-ng-transclude></div></div>\n    <footer class="module-footer"></footer>\n</section>',
            link: {
                post: function(scope, element, attrs, controller) {
                    var timeoutId = $timeout(function() {
                        vModuleService.setupModule(scope, element);
                    }, 150);
                    element.bind("$destroy", function() {
                        $timeout.cancel(timeoutId);
                    }), element.find(".module-body").bind("DOMSubtreeModified", function(e) {
                        vModuleService.domSubtreeHandler(e, scope);
                    }), element.bind("dblclick", vModuleService.doubleClickHandler), vModuleService.addModuleActions(scope), 
                    vModuleService.init(scope, element, attrs, controller);
                }
            }
        };
    });
});