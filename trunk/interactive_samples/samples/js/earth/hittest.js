var ge;

var globePlacemark = null;
var terrainPlacemark = null;
var buildingsPlacemark = null;

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

  var la = ge.createLookAt('');
  la.set(37.8018, -122.4060, 0, ge.ALTITUDE_RELATIVE_TO_GROUND, 15, 53, 227);
  ge.getView().setAbstractView(la);

  ge.getLayerRoot().enableLayerById(ge.LAYER_TERRAIN, true);
  ge.getLayerRoot().enableLayerById(ge.LAYER_BUILDINGS, true);

  google.earth.addEventListener(ge.getGlobe(), 'click', function(evt) {
    if (evt.getButton() != 0)
      return;

    // remove old placemarks
    if (globePlacemark)
      ge.getFeatures().removeChild(globePlacemark);
    if (terrainPlacemark)
      ge.getFeatures().removeChild(terrainPlacemark);
    if (buildingsPlacemark)
      ge.getFeatures().removeChild(buildingsPlacemark);

    // hit test and create new placemarks
    var hitTestResult = ge.getView().hitTest(evt.getClientX(), ge.UNITS_PIXELS, evt.getClientY(), ge.UNITS_PIXELS, ge.HIT_TEST_GLOBE);
    if (hitTestResult) {
      globePlacemark = makePlacemark(hitTestResult.getLatitude(), hitTestResult.getLongitude(),
          hitTestResult.getAltitude(), ge.ALTITUDE_ABSOLUTE, 'G');
      ge.getFeatures().appendChild(globePlacemark);
    }

    hitTestResult = ge.getView().hitTest(evt.getClientX(), ge.UNITS_PIXELS, evt.getClientY(), ge.UNITS_PIXELS, ge.HIT_TEST_TERRAIN);
    if (hitTestResult) {
      terrainPlacemark = makePlacemark(hitTestResult.getLatitude(), hitTestResult.getLongitude(),
          hitTestResult.getAltitude(), ge.ALTITUDE_ABSOLUTE, 'T');
      ge.getFeatures().appendChild(terrainPlacemark);
    }

    hitTestResult = ge.getView().hitTest(evt.getClientX(), ge.UNITS_PIXELS, evt.getClientY(), ge.UNITS_PIXELS, ge.HIT_TEST_BUILDINGS);
    if (hitTestResult) {
      buildingsPlacemark = makePlacemark(hitTestResult.getLatitude(), hitTestResult.getLongitude(),
          hitTestResult.getAltitude(), ge.ALTITUDE_ABSOLUTE, 'B');
      ge.getFeatures().appendChild(buildingsPlacemark);
    }
  });

  document.getElementById('installed-plugin-version').innerHTML =
    ge.getPluginVersion().toString();
}

function failureCallback(errorCode) {
}

function makePlacemark(lat, lng, alt, altMode, iconStr) {
  var icon = ge.createIcon('');
  icon.setHref('http://maps.google.com/mapfiles/kml/paddle/' + iconStr + '.png');

  var style = ge.createStyle('');
  style.getIconStyle().setIcon(icon);
  style.getIconStyle().getHotSpot().set(0.5, ge.UNITS_FRACTION, 0, ge.UNITS_FRACTION);

  var pt = ge.createPoint('');
  pt.set(lat, lng, alt, altMode, false, false);

  var pm = ge.createPlacemark('');
  pm.setGeometry(pt);
  pm.setStyleSelector(style);

  return pm;
}
