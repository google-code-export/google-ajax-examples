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

  // Sample KML taken from
  //   http://code.google.com/apis/kml/documentation/kml_tut.html#polygons
  var timeAwareDoc = ge.parseKml(
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<kml xmlns="http://www.opengis.net/kml/2.2">' +
    '  <Document>' +
    '    <Placemark>' +
    '      <name>Placemark 1</name>' +
    '      <TimeSpan>' +
    '        <begin>2007-01-14T21:05:02Z</begin>' +
    '        <end>2007-01-14T21:05:20Z</end>' +
    '      </TimeSpan>' +
    '      <Point>' +
    '        <coordinates>-122.536226,37.86047,0</coordinates>' +
    '      </Point>' +
    '    </Placemark>' +
    '    <Placemark>' +
    '      <name>Placemark 2</name>' +
    '      <TimeSpan>' +
    '        <begin>2007-01-14T21:05:20Z</begin>' +
    '        <end>2007-01-14T21:05:43Z</end>' +
    '      </TimeSpan>' +
    '      <Point>' +
    '        <coordinates>-122.536422,37.860303,0</coordinates>' +
    '      </Point>' +
    '    </Placemark>' +
    '    <Placemark>' +
    '      <name>Placemark 3</name>' +
    '      <TimeSpan>' +
    '        <begin>2007-01-14T21:05:43Z</begin>' +
    '        <end>2007-01-14T21:06:04Z</end>' +
    '      </TimeSpan>' +
    '      <Point>' +
    '        <coordinates>-122.536688,37.860072,0</coordinates>' +
    '      </Point>' +
    '    </Placemark>' +
    '  </Document>' +
    '</kml>');

  ge.getFeatures().appendChild(timeAwareDoc);

  // Fly to the Pentagon
  var la = ge.createLookAt('');
  la.set(37.860303, -122.536422, 0, ge.ALTITUDE_RELATIVE_TO_GROUND, 0, 45, 75);
  ge.getView().setAbstractView(la);

  document.getElementById('installed-plugin-version').innerHTML =
    ge.getPluginVersion().toString();
}

function failureCallback(errorCode) {
}
