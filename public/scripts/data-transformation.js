'use strict';

define([], function() {

    function makePoint(item) {
        if (item && item.length === 2){
            return {x: item[0], y: item[1]};
        }
        throw new Error('Invalid time series point format');
    }

    function makeSeries(result) {
        if(result.name && result.values && result.values.constructor === Array) {
            var values = result.values;
            var data = values.map(makePoint);
            return {name: result.name, data: data};
        }
        throw new Error('Invalid time series data format');
    }

    function transform(rawData) {
        if (rawData && rawData.constructor === Array && rawData.length > 0 && rawData[0].results && rawData[0].results.constructor === Array){
            return rawData[0].results.map(makeSeries);
        }
        throw new Error('Invalid time series data format');
    }

    return {
        transform: transform
    };

});