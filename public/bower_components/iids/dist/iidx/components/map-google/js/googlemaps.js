
// convert Google Maps into an AMD module
define(['map-google-component/googlemaps-loader!'],
function GoogleMaps() {
  // return the gmaps namespace
  return window.google;
});
