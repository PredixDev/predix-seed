module.exports = (predixConfig) => {   
    return (req, res, next) => {
        const response = {"appMode": "default", "services": {} };
        if (predixConfig.isUaaConfigured()) {
            response.services.uaa = true;
        }
        if (predixConfig.isAssetConfigured()) {
            response.services.asset = true;
        }
        if (predixConfig.isTimeSeriesConfigured()) {
            response.services.timeseries = true;
        }
        res.send(response);
        next();
    };
};