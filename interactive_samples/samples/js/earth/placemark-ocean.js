var ge;

google.load("earth", "1");

function init() {
  google.earth.createInstance('map3d', initCallback, failureCallback);
}

function initCallback(instance) {
  ge = instance;
  ge.getWindow().setVisibility(true);

  // add a navigation control
  ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);

  // add some layers
  ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
  ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);

  // Dive underwater
  var lookAt = ge.createLookAt('');
  lookAt.setAltitudeMode(ge.ALTITUDE_RELATIVE_TO_SEA_FLOOR);
  lookAt.setLatitude(26.5);
  lookAt.setLongitude(-44.1);
  lookAt.setTilt(70);
  lookAt.setRange(1500);
  lookAt.setHeading(0);
  ge.getView().setAbstractView(lookAt);

  // Create the placemark
  var placemark = ge.createPlacemark('');
  placemark.setName('Underwater Placemark');
  ge.getFeatures().appendChild(placemark);

  // Create style for placemark
  var icon = ge.createIcon('');
  icon.setHref('http://maps.google.com/mapfiles/kml/shapes/water.png');
  var style = ge.createStyle('');
  style.getIconStyle().setIcon(icon);
  placemark.setStyleSelector(style);

  // Create point
  var point = ge.createPoint('');
  point.setLatitude(lookAt.getLatitude());
  point.setLongitude(lookAt.getLongitude());
  point.setAltitude(100);
  point.setAltitudeMode(ge.ALTITUDE_RELATIVE_TO_SEA_FLOOR);
  placemark.setGeometry(point);

  document.getElementById('installed-plugin-version').innerHTML =
    ge.getPluginVersion().toString();
}

function failureCallback(errorCode) {
}
