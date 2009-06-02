var ge;

google.load("earth", "1");

function init() {
  google.earth.createInstance('map3d', initCallback, failureCallback);

  addSampleButton('Create a Screen Overlay', createScreenOverlay);
}

function initCallback(instance) {
  ge = instance;
  ge.getWindow().setVisibility(true);

  // add a navigation control
  ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);

  // add some layers
  ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
  ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);

  // just for debugging purposes
  document.getElementById('installed-plugin-version').innerHTML =
    ge.getPluginVersion().toString();
}

function failureCallback(errorCode) {
}

function createScreenOverlay() {
  var screenOverlay = ge.createScreenOverlay('');
  screenOverlay.setIcon(ge.createIcon(''));
  screenOverlay.getIcon().
    setHref("http://www.google.com/intl/en_ALL/images/logo.gif");

  // Set the point inside the overlay that is used as the positioning
  // anchor point.
  screenOverlay.getOverlayXY().setXUnits(ge.UNITS_FRACTION);
  screenOverlay.getOverlayXY().setYUnits(ge.UNITS_FRACTION);
  screenOverlay.getOverlayXY().setX(.5);
  screenOverlay.getOverlayXY().setY(.5);

  // Set screen position in fractions.
  screenOverlay.getScreenXY().setXUnits(ge.UNITS_FRACTION);
  screenOverlay.getScreenXY().setYUnits(ge.UNITS_FRACTION);
  screenOverlay.getScreenXY().setX(Math.random());  // Random x.
  screenOverlay.getScreenXY().setY(Math.random());  // Random y.

  // Rotate around object's center point.
  screenOverlay.getRotationXY().setXUnits(ge.UNITS_FRACTION);
  screenOverlay.getRotationXY().setYUnits(ge.UNITS_FRACTION);
  screenOverlay.getRotationXY().setX(0.5);
  screenOverlay.getRotationXY().setY(0.5);

  // Set object's size in pixels.
  screenOverlay.getSize().setXUnits(ge.UNITS_PIXELS);
  screenOverlay.getSize().setYUnits(ge.UNITS_PIXELS);
  screenOverlay.getSize().setX(300);
  screenOverlay.getSize().setY(90);

  // Rotate by a random number of degrees.
  screenOverlay.setRotation(Math.random() * 360);

  ge.getFeatures().appendChild(screenOverlay);
}