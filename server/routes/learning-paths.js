module.exports = (predixConfig) => {
  return (req, res, next) => {
    const response = {
      "appMode": "default",
      "learningSequence": ['base', 'uaa', 'asset', 'timeseries'], // sequence of learning features
      "services": {}
    };
    response.services.base = true,
    response.services.uaa = predixConfig.isUaaConfigured();
    response.services.asset = predixConfig.isAssetConfigured();
    response.services.timeseries = predixConfig.isTimeSeriesConfigured();
    res.send(response);
    next();
  };
};
