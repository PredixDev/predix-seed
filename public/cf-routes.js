'use strict';
/**
 *  Never ever include this file in the build, this file will be created automatically for you by the static build pack.
 */
(function () {
    var VCAP_SERVICES = {
        'View Service Free': [{
            'credentials': {'url': 'dev-dashboard-server.grc-apps.svc.ice.ge.com'},
            'label': 'View Service Free',
            'name': 'viewPersistence',
            'plan': 'Free View Service',
            'syslog_drain_url': '',
            'tags': []
        }]
    };


    window.getCfRoute = function (serviceName) {
        for (var serviceId in VCAP_SERVICES) {
            var service = VCAP_SERVICES[serviceId];
            for (var instanceIndex in service) {
                var instance = service[instanceIndex];
                if (instance.name === serviceName) {
                    return location.protocol + '//' + instance.credentials.url;
                }
            }
        }
        window.logger.error('Could not find a url for the service name ' + serviceName);
        return serviceName;
    };

    window.getRoutes = function () {
        var routes = {};
        for (var serviceId in VCAP_SERVICES) {
            var service = VCAP_SERVICES[serviceId];
            for (var instanceIndex in service) {
                var instance = service[instanceIndex];
                routes[instance.name] = location.protocol + '//' + instance.credentials.url;
            }
        }
        return routes;
    };

})();


