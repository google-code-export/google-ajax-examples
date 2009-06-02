var ge;

google.load("earth", "1");

function init() {
  google.earth.createInstance('map3d', initCallback, failureCallback);

  addSampleButton('Create a Line String!', buttonClick);
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
  la.setRange(1000000);
  ge.getView().setAbstractView(la);

  createLinestring();

  document.getElementById('installed-plugin-version').innerHTML =
    ge.getPluginVersion().toString();
}

function failureCallback(errorCode) {
}

function createLinestring() {
  function addToLineString(lineString, lat, lng, latOffset, lngOffset) {
    var altitude = 1.0; // give it some altitude
    lineString.getCoordinates().
      pushLatLngAlt(lat + latOffset, lng + lngOffset, altitude);
  }

  var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
  var lat = lookAt.getLatitude();
  var lng = lookAt.getLongitude();

  // create the line string placemark
  var lineStringPlacemark = ge.createPlacemark('');

  // create the line string geometry
  var lineString = ge.createLineString('');
  lineStringPlacemark.setGeometry(lineString);

  // tessellate (i.e. conform to ground elevation)
  lineString.setTessellate(true);

  // add the the points to the line string geometry
  addToLineString(lineString, lat, lng,   0,   0, 0);
  addToLineString(lineString, lat, lng, 1.5,  .5, 0);
  addToLineString(lineString, lat, lng,   0, 1.0, 0);
  addToLineString(lineString, lat, lng, 1.5, 1.5, 0);
  addToLineString(lineString, lat, lng,   0, 2.0, 0);
  addToLineString(lineString, lat, lng, 1.5, 2.5, 0);
  addToLineString(lineString, lat, lng,   0, 3.0, 0);
  addToLineString(lineString, lat, lng, 1.5, 3.5, 0);
  addToLineString(lineString, lat, lng,   0, 4.0, 0);
  addToLineString(lineString, lat, lng, 1.5, 4.5, 0);

  ge.getFeatures().appendChild(lineStringPlacemark);
}

function buttonClick() {
  createLinestring();
}
