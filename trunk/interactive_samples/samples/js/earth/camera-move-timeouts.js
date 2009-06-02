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

  // move the camera on a timeout
  var oldFlyToSpeed = ge.getOptions().getFlyToSpeed();
  ge.getOptions().setFlyToSpeed(ge.SPEED_TELEPORT);

  var moveCamera = function(count) {
    var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
    lookAt.setLatitude(lookAt.getLatitude() + .1);
    lookAt.setLongitude(lookAt.getLongitude() + 5);
    ge.getView().setAbstractView(lookAt);

    if (count < 40) {
      setTimeout(function() {
        moveCamera(count + 1);
      }, 50);
    } else {
      // restore old flyTo speed
      ge.getOptions().setFlyToSpeed(oldFlyToSpeed);
    }
  };

  moveCamera(0);

  // just for debugging purposes
  document.getElementById('installed-plugin-version').innerHTML =
    ge.getPluginVersion().toString();
}

function failureCallback(errorCode) {
}
