'use strict';
/**
*  Never ever include this file in the build, this file will be created automatically for you by the static build pack.
*/
(function () {
    var VCAP_SERVICES = {
        "View Service Free": [
            {
                "credentials": {
                    "uri": "dev-dashboard-server.grc-apps.svc.ice.ge.com"
                },
                "label": "View Service Free",
                "name": "viewPersistenceService",
                "plan": "Free View Service",
                "syslog_drain_url": "",
                "tags": []
            }
        ],
        "predix-asset": [
            {
                "credentials": {
                    "uri": "predix-asset-mvp2-no-api.grc-apps.svc.ice.ge.com"
                },
                "label": "predix-asset",
                "name": "predixAssetExp2",
                "plan": "Basic",
                "tags": []
            }
        ]
    };

    window.getRoutes = function () {
        var routes = {};
        for (var serviceId in VCAP_SERVICES) {
            var service = VCAP_SERVICES[serviceId];
            for (var instanceIndex in service) {
                var instance = service[instanceIndex];
                routes[instance.name] = location.protocol + '//' + instance.credentials.uri;
            }
        }
        return routes;
    };

})();


