var ge;

google.load("earth", "1");

function init() {
  google.earth.createInstance('map3d', initCallback, failureCallback);

  addSampleButton('Create a 3D Model!', buttonClick);
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

  create3dModel();

  document.getElementById('installed-plugin-version').innerHTML =
    ge.getPluginVersion().toString();
}

function failureCallback(errorCode) {
}

function create3dModel() {
  // Create a 3D model, initialize it from a Collada file, and place it
  // in the world.

  var placemark = ge.createPlacemark('');
  placemark.setName('model');
  var model = ge.createModel('');
  ge.getFeatures().appendChild(placemark);
  var loc = ge.createLocation('');
  model.setLocation(loc);
  var link = ge.createLink('');

  // A textured model created in Sketchup and exported as Collada.
  link.setHref('http://earth-api-samples.googlecode.com/svn/trunk/examples/' +
               'static/splotchy_box.dae');
  model.setLink(link);

  var la = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
  loc.setLatitude(la.getLatitude());
  loc.setLongitude(la.getLongitude());

  placemark.setGeometry(model);

  la.setRange(300);
  la.setTilt(45);
  ge.getView().setAbstractView(la);
}

function buttonClick() {
  create3dModel();
}
