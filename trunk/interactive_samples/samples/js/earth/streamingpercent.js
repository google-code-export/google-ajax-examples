var ge;

var placemark;

google.load("earth", "1");

function init() {
  google.earth.createInstance('map3d', initCallback, failureCallback);

  addSampleUIHtml(
    '<style type="text/css">' +
    '  #progress-container { width: 250px; height: 10px; border: 1px solid #ccc; }' +
    '  #progress-bar { width: 0; height: 10px; }' +
    '</style>' +
    'Data Streaming Progress:' +
    '<div id="progress-container">' +
    '  <div id="progress-bar"></div>' +
    '</div><br/>'
  );
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
  // Update streaming progress every 100ms
  setInterval(function() {
    var streamingPercent = ge.getStreamingPercent();
    var progressBar = document.getElementById('progress-bar');
    if (streamingPercent == 100) {
      // streaming complete, hide the progress bar
      progressBar.style.backgroundColor = '#0a0';
      progressBar.style.width = '250px';
    } else {
      // show the progress bar, max width is 250 as per the stylesheet
      progressBar.style.backgroundColor = '#00f';
      progressBar.style.width = (250 * streamingPercent / 100) + 'px';
    }
  }, 100);

  // Fly to the Grand Canyon
  var la = ge.createLookAt('');
  la.set(36.291068, -112.4981896, 0, ge.ALTITUDE_RELATIVE_TO_GROUND,
         0, 80, 20000);
  ge.getView().setAbstractView(la);

  document.getElementById('installed-plugin-version').innerHTML =
    ge.getPluginVersion().toString();
}

function failureCallback(errorCode) {
}
