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

  var tiltCamera = function(count) {
    var idealTilt = 80;  // all angles in the API are in degrees.
    var c0 = 0.90;
    var la = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);

    var tilt = la.getTilt();
    tilt = c0 * tilt + (1 - c0) * idealTilt;
    la.setTilt(tilt);
    ge.getView().setAbstractView(la);

    if (count < 60) {
      setTimeout(function() {
        tiltCamera(count + 1);
      }, 33);
    }
  }

  tiltCamera(0);

  // just for debugging purposes
  document.getElementById('installed-plugin-version').innerHTML =
    ge.getPluginVersion().toString();
}

function failureCallback(errorCode) {
}
