var ge;

google.load("earth", "1");

function init() {
  google.earth.createInstance('map3d', initCallback, failureCallback);

  addSampleButton('Show buildings', showBuildingsClick);
  addSampleButton('Hide buildings', hideBuildingsClick);
  addSampleButton('Are Buildings Visible?', areBuildingsVisibleClick);
}

function initCallback(instance) {
  ge = instance;
  ge.getWindow().setVisibility(true);

  // add a navigation control
  ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);

  // add some layers
  ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
  ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);

  // fly to San Francisco to see some 3D buildings
  var la = ge.createLookAt('');
  la.set(37.79333, -122.40, 0, ge.ALTITUDE_RELATIVE_TO_GROUND, 0, 70, 1000);
  ge.getView().setAbstractView(la);

  // just for debugging purposes
  document.getElementById('installed-plugin-version').innerHTML =
    ge.getPluginVersion().toString();
}

function failureCallback(errorCode) {
}

function showBuildingsClick() {
  ge.getLayerRoot().enableLayerById(ge.LAYER_BUILDINGS, true);

  // NOTE: you can use LAYER_BUILDINGS_LOW_RESOLUTION for gray buildings

  setTimeout(function() {
               var la = ge.createLookAt('');
               la.set(37.79333, -122.40, 0, ge.ALTITUDE_RELATIVE_TO_GROUND,
                      180, 50, 1000);
               ge.getView().setAbstractView(la);
             }, 10000);
}

function hideBuildingsClick() {
  ge.getLayerRoot().enableLayerById(ge.LAYER_BUILDINGS, false);
}

function areBuildingsVisibleClick() {
  alert(getInheritedVisibility(
    ge.getLayerRoot().getLayerById(ge.LAYER_BUILDINGS)) ?
      'Buildings are visible' : 'Buildings are NOT visible');
}

function getInheritedVisibility(layer) {
  if (!layer.getVisibility()) {
    return false;
  } else {
    var parent = layer.getParentNode();
    if (!parent)
      return true;

    return getInheritedVisibility(parent);
  }
}
