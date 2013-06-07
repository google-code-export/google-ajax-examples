var ge;

var placemark;

google.load("earth", "1");

function init() {
  google.earth.createInstance('map3d', initCallback, failureCallback);

  addSampleButton('Show a balloon!', buttonClick1);
  addSampleButton('Change its content!', buttonClick2);
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

function buttonClick1() {
  var balloon = ge.createHtmlStringBalloon('');
  balloon.setFeature(placemark); // optional
  balloon.setMaxWidth(300);

  // Google logo.
  balloon.setContentString(
      '<img src="//www.google.com/intl/en_ALL/images/logo.gif"><br>'
      + '<font size=20>Earth Plugin</font><br><font size=-2>sample info '
      + 'window</font>');

  ge.setBalloon(balloon);
}

function buttonClick2() {
  // Change the context of the current balloon.
  var balloon = ge.getBalloon();
  if (balloon) {
    // Pigeon Rank
    var content =
      '<img src="//www.google.com/technology/pigeon_system.jpg">' +
      '<br>PigeonRank&#153; Technology';
    balloon.setFeature(placemark); // optional
    balloon.setMaxWidth(800);

    if (balloon.getType() == 'GEHtmlStringBalloon') {
      balloon.setContentString(content);
    } else if (balloon.getType() == 'GEHtmlDivBalloon') {
      var div = document.createElement('DIV');
      div.innerHTML = content;
      balloon.setContentDiv(div);
    } else if (balloon.getType() == 'GEFeatureBalloon') {
      placemark.setDescription(content);
    }
  }
}
