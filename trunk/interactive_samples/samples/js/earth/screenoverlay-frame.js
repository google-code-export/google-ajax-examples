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

  var screenOverlay = ge.createScreenOverlay('');

  // Set the visibility to false while we construct the overlay.
  screenOverlay.setVisibility(false);

  var icon = ge.createIcon('');
  icon.setHref('http://earth-api-samples.googlecode.com/svn/trunk/examples/' +
               'static/frame.png');  // Loads an gilded picture frame.
  screenOverlay.setIcon(icon);

  // Position the overlay.  ScreenXY(0,0) is mapped to OverlayXY(0,0)
  var screenXY = screenOverlay.getScreenXY();
  screenXY.setXUnits(ge.UNITS_PIXELS);
  screenXY.setYUnits(ge.UNITS_PIXELS);
  screenXY.setX(0);
  screenXY.setY(0);

  var overlayXY = screenOverlay.getOverlayXY();
  overlayXY.setXUnits(ge.UNITS_PIXELS);
  overlayXY.setYUnits(ge.UNITS_PIXELS);
  overlayXY.setX(0);
  overlayXY.setY(0);

  // Set object's size in fractions of the 3d view window.  By setting
  // to (1, 1), this image will cover the entire Earth window.
  var overlaySize = screenOverlay.getSize()
  overlaySize.setXUnits(ge.UNITS_FRACTION);
  overlaySize.setYUnits(ge.UNITS_FRACTION);
  overlaySize.setX(1);
  overlaySize.setY(1);

  screenOverlay.setVisibility(true);

  ge.getFeatures().appendChild(screenOverlay);

  document.getElementById('installed-plugin-version').innerHTML =
    ge.getPluginVersion().toString();
}

function failureCallback(errorCode) {
}
