var ge;

var placemark;

google.load("earth", "1");

function init() {
  google.earth.createInstance('map3d', initCallback, failureCallback);

  addSampleButton('Give the Placemark a StyleMap!', buttonClick);
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

  document.getElementById('installed-plugin-version').innerHTML =
    ge.getPluginVersion().toString();
}

function failureCallback(errorCode) {
}

function buttonClick() {
  var styleMap = ge.createStyleMap('');

  // Create normal style for style map
  var normalStyle = ge.createStyle('');
  var normalIcon = ge.createIcon('');
  normalIcon.setHref('http://maps.google.com/mapfiles/kml/shapes/triangle.png');
  normalStyle.getIconStyle().setIcon(normalIcon);

  // Create highlight style for style map
  var highlightStyle = ge.createStyle('');
  var highlightIcon = ge.createIcon('');
  highlightIcon.setHref('http://maps.google.com/mapfiles/kml/shapes/square.png');
  highlightStyle.getIconStyle().setIcon(highlightIcon);

  styleMap.setNormalStyle(normalStyle);
  styleMap.setHighlightStyle(highlightStyle);

  // Apply stylemap to a placemark
  placemark.setStyleSelector(styleMap);
}
