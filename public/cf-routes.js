'use strict';

(function(){
    var VCAP_SERVICES = { 'View Service Free': [ { 'credentials': { 'url': 'dev-dashboard-server.grc-apps.svc.ice.ge.com' }, 'label': 'View Service Free', 'name': 'view_persistence', 'plan': 'Free View Service', 'syslog_drain_url': '', 'tags': [] } ] };


    window.getCfRoute = function(serviceName) {
        for (var serviceId in VCAP_SERVICES) {
            var service = VCAP_SERVICES[serviceId];
            for (var instanceIndex in service) {
                var instance = service[instanceIndex];
                if (instance.name === serviceName) {
                    return location.protocol+'//'+instance.credentials.url;
                }
            }
        }
        window.logger.error('Could not find a url for the service name ' + serviceName);
        return serviceName;
    };
})();


