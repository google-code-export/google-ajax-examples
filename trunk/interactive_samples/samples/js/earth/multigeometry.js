var ge;

google.load("earth", "1");

function init() {
  google.earth.createInstance('map3d', initCallback, failureCallback);

  addSampleButton('Create a Multi Geometry!', buttonClick);
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
  la.setRange(400000);
  ge.getView().setAbstractView(la);

  createMultiGeometry();

  document.getElementById('installed-plugin-version').innerHTML =
    ge.getPluginVersion().toString();
}

function failureCallback(errorCode) {
}

function createMultiGeometry() {
  function makeCircle(radius, x, y) {
    var center = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
    var ring = ge.createLinearRing('');
    var steps = 25;
    var pi2 = Math.PI * 2;
    for (var i = 0; i < steps; i++) {
      var lat = center.getLatitude() + x + radius * Math.cos(i / steps * pi2);
      var lng = center.getLongitude() + y + radius * Math.sin(i / steps * pi2);
      ring.getCoordinates().pushLatLngAlt(lat, lng, 0);
    }
    return ring;
  }

  var multGeoPlacemark = ge.createPlacemark('');
  multGeoPlacemark.setGeometry(ge.createMultiGeometry(''));
  var geoms = multGeoPlacemark.getGeometry().getGeometries();
  geoms.appendChild(makeCircle(.25, 0, 0));
  geoms.appendChild(makeCircle(.55, 0, 0));
  geoms.appendChild(makeCircle(.85, 0, 0));
  geoms.appendChild(makeCircle(1.15, 0, 0));
  ge.getFeatures().appendChild(multGeoPlacemark);
}

function buttonClick() {
  createMultiGeometry();
}
