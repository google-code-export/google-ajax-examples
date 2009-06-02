var ge;

var placemark;

google.load("earth", "1");

function init() {
  google.earth.createInstance('map3d', initCallback, failureCallback);

  addSampleButton('Enable Click Listener', enableListenerClick);
  addSampleButton('Disable Click Listener', disableListenerClick);
}

function initCallback(instance) {
  ge = instance;
  ge.getWindow().setVisibility(true);

  // add a navigation control
  ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);

  // add some layers
  ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
  ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);

  // create the placemark
  placemark = ge.createPlacemark('');

  var point = ge.createPoint('');
  point.setLatitude(37);
  point.setLongitude(-122);
  placemark.setGeometry(point);

  // add the placemark to the earth DOM
  ge.getFeatures().appendChild(placemark);

  // look at the placemark we created
  var la = ge.createLookAt('');
  la.set(37, -122,
    0, // altitude
    ge.ALTITUDE_RELATIVE_TO_GROUND,
    0, // heading
    0, // straight-down tilt
    5000 // range (inverse of zoom)
    );
  ge.getView().setAbstractView(la);

  // just for debugging purposes
  document.getElementById('installed-plugin-version').innerHTML =
    ge.getPluginVersion().toString();
}

function failureCallback(errorCode) {
}

// global state
var eventListenerActive;

function enableListenerClick() {
  if (!eventListenerActive) {
    google.earth.addEventListener(placemark, 'click', myEventHandler);
    eventListenerActive = true;
  }
}

function disableListenerClick() {
  if (eventListenerActive) {
    google.earth.removeEventListener(placemark, 'click', myEventHandler);
    eventListenerActive = false;
  }
}

function myEventHandler(event) {
  // wrap alerts in API callbacks and event handlers
  // in a setTimeout to prevent deadlock in some browsers
  setTimeout(function() {
    alert('You clicked the placemark!');
  }, 0);
}
