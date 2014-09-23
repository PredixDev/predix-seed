'use strict';
define(['jquery'],
function GoogleMapsLoader($) {
  return{
    load : function(name, req, onLoad, config) {

      if (config.isBuild) {
        onLoad(null);
      }
      else{
        require(['map-loader'], function(mapConfig){

            var clientID = '&client=' + mapConfig.Google.googleClientID,
                channelID = '&channel=' + mapConfig.Google.googleChannelID,
                otherParams = 'sensor=true&libraries=places' + clientID + channelID;

          $.getScript('https://www.google.com/jsapi', function()
          {
            google.load('maps', '3.11.17', { other_params: otherParams, callback: function()
            {
              // Callback code here
              onLoad();
            }});
          });
        });
      }
    }
  };
});
