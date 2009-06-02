var ge;

google.load("earth", "1");
google.load("maps", "2");

function init() {
  google.earth.createInstance('map3d', initCallback, failureCallback);

  addSampleUIHtml(
    '<input id="location" type="text" value="San Francisco, CA"/>'
  );

  addSampleButton('Fly Here!', buttonClick)
}

function initCallback(instance) {
  ge = instance;
  ge.getWindow().setVisibility(true);

  // add a navigation control
  ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);

  // add some layers
  ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
  ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);

  document.getElementById('installed-plugin-version').innerHTML =
    ge.getPluginVersion().toString();
}

function failureCallback(errorCode) {
}

function buttonClick() {
  var geocodeLocation = document.getElementById('location').value;

  var geocoder = new google.maps.ClientGeocoder();
  geocoder.getLatLng(geocodeLocation, function(point) {
    if (point) {
      var lookAt = ge.createLookAt('');
      lookAt.set(point.y, point.x, 10, ge.ALTITUDE_RELATIVE_TO_GROUND,
                 0, 60, 20000);
      ge.getView().setAbstractView(lookAt);
    }
  });
}
