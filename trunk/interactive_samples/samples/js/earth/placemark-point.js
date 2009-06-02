var ge;

var counter = 0;

google.load("earth", "1");

function init() {
  google.earth.createInstance('map3d', initCallback, failureCallback);

  addSampleButton('Create a Placemark!', buttonClick);
}

function initCallback(instance) {
  ge = instance;
  ge.getWindow().setVisibility(true);

  // add a navigation control
  ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);

  // add some layers
  ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
  ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);

  var la = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
  la.setRange(100000);
  ge.getView().setAbstractView(la);

  createPlacemark();

  document.getElementById('installed-plugin-version').innerHTML =
    ge.getPluginVersion().toString();
}

function failureCallback(errorCode) {
}

function createPlacemark() {
  var placemark = ge.createPlacemark('');
  placemark.setName("placemark" + counter);
  ge.getFeatures().appendChild(placemark);

  // Create style map for placemark
  var icon = ge.createIcon('');
  icon.setHref('http://maps.google.com/mapfiles/kml/paddle/red-circle.png');
  var style = ge.createStyle('');
  style.getIconStyle().setIcon(icon);
  placemark.setStyleSelector(style);

  // Create point
  var la = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
  var point = ge.createPoint('');
  point.setLatitude(la.getLatitude());
  point.setLongitude(la.getLongitude());
  placemark.setGeometry(point);

  counter++;
}

function buttonClick() {
  createPlacemark();
}
