var ge;

var placemark;

google.load("earth", "1");

function init() {
  google.earth.createInstance('map3d', initCallback, failureCallback);

  addSampleButton('Show an HTML Div Balloon!', buttonClick);
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

function buttonClick() {
  var balloon = ge.createHtmlDivBalloon('');
  balloon.setFeature(placemark); // optional
  balloon.setMaxWidth(800);

  // create the <div>
  var div = document.createElement('DIV');
  div.innerHTML =
          '<img src="//www.google.com/googlegulp/images/logo.gif"><br>'
          + '<a href="http://www.google.com/googlegulp/">Google Gulp</a>';
  balloon.setContentDiv(div);

  ge.setBalloon(balloon);
}
