var ge;

google.load("earth", "1");

function init() {
  google.earth.createInstance('map3d', initCallback, failureCallback);

  addSampleButton('Create a Network Link!', buttonClick);
}

function initCallback(instance) {
  ge = instance;
  ge.getWindow().setVisibility(true);

  // add a navigation control
  ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);

  // add some layers
  ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
  ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);

  createNetworkLink();

  document.getElementById('installed-plugin-version').innerHTML =
    ge.getPluginVersion().toString();
}

function failureCallback(errorCode) {
}

function createNetworkLink() {
  var networkLink = ge.createNetworkLink("");
  networkLink.setDescription("NetworkLink open to fetched content");
  networkLink.setName("Open NetworkLink");
  networkLink.setFlyToView(true);

  // create a Link object
  var link = ge.createLink("");
  link.setHref("http://kml-samples.googlecode.com" +
               "/svn/trunk/kml/NetworkLink/placemark.kml");

  // attach the Link to the NetworkLink
  networkLink.setLink(link);

  // add the NetworkLink feature to Earth
  ge.getFeatures().appendChild(networkLink);
}

function buttonClick() {
  createNetworkLink();
}
