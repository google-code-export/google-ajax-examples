var ge;

google.load("earth", "1");

function init() {
  google.earth.createInstance('map3d', initCallback, failureCallback);

  addSampleUIHtml(
    '<textarea id="kml-box" rows="14" cols="50" wrap="off" style="font-family: monospace; font-size: small">' +
    '&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;\n' +
    '&lt;kml xmlns=&quot;http://www.opengis.net/kml/2.2&quot;&gt;\n' +
    '  &lt;Placemark&gt;\n' +
    '    &lt;name&gt;Test Placemark&lt;/name&gt;\n' +
    '    &lt;Point&gt;\n' +
    '      &lt;coordinates&gt;\n' +
    '        -122,37,0\n' +
    '      &lt;/coordinates&gt;\n' +
    '    &lt;/Point&gt;\n' +
    '  &lt;/Placemark&gt;\n' +
    '&lt;/kml&gt;</textarea><br/>'
  );

  addSampleButton('Parse and Add this KML!', buttonClick);
}

function initCallback(instance) {
  ge = instance;
  ge.getWindow().setVisibility(true);

  // add a navigation control
  ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);

  // add some layers
  ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
  ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);

  // look at the San Francisco
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

var currentKmlObject = null;

function parseKmlFromTextarea() {
  // remove the old parsed KML object if one exists
  if (currentKmlObject)
    ge.getFeatures().removeChild(currentKmlObject);

  var kmlBox = document.getElementById('kml-box');
  var kmlString = kmlBox.value;

  // parse the text in the box and add it to Earth
  try {
    currentKmlObject = ge.parseKml(kmlString);
    ge.getFeatures().appendChild(currentKmlObject);
  } catch (ex) {
    alert('Parse error');
  }
}

function buttonClick() {
  parseKmlFromTextarea();
}
