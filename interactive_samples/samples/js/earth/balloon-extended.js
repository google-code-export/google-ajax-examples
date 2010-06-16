var ge;
var kml;
google.load('earth','1');

function initCallback(instance) {
  base_setup(instance);
  
  var la = ge.createLookAt('');
  la.set(37.77433, -122.420725, 0, ge.ALTITUDE_RELATIVE_TO_GROUND, 29, 35, 3500 );
  ge.getView().setAbstractView(la);

  
     kml = ge.parseKml(
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<kml xmlns="http://www.opengis.net/kml/2.2">' +
    '  <Document>' +
    '    <Style id="bstyle">' +
    '      <BalloonStyle>' +
    '        <text>' +
    '          <![CDATA[' +
    '            Species is $[species]<br>' +
    '            Age is: $[age]' +
    '          ]]>' +
    '        </text>' +
    '      </BalloonStyle>' +
    '    </Style>' +
    '    <Placemark>' +
    '      <styleUrl>#bstyle</styleUrl>' +
    '      <name>Placemark 1</name>' +
    '      <description>' +
    '        <![CDATA[<a href="#" onclick="alert(\'Running some JavaScript!\');"> Alert! </a><br>]]>' +
    '      </description>' +
    '      <ExtendedData>' +
    '        <Data name="species">' +
    '          <value>Badger</value>' +
    '        </Data>' +
    '        <Data name="age">' +
    '          <value><![CDATA[<a href="#" onclick="alert(3);"> Click to see</a><br>]]></value>' +
    '        </Data>' +
    '      </ExtendedData>' +
    '      <Point>' +
    '        <coordinates>-122.4226,37.7792,0</coordinates>' +
    '      </Point>' +
    '    </Placemark>' +
    '  </Document>' +
    '</kml>');

  ge.getFeatures().appendChild(kml);
  
  //set a click listener that affects all placemarks
  google.earth.addEventListener(
    ge.getGlobe(), 'click', function(event) {
    var obj = event.getTarget();
    if (obj.getType() == 'KmlPlacemark'){
      event.preventDefault();
      var placemark = obj;
      var placemark_name = placemark.getName();
      //get the full balloon html
      var placemark_desc_active = placemark.getBalloonHtmlUnsafe();
      //same as above, except with 'active' content like JS stripped out
      var placemark_desc = placemark.getBalloonHtml();
      //create new balloon with rendered content
      var balloon = ge.createHtmlStringBalloon('');
        //balloon.setFeature(placemark);
      balloon.setMaxWidth(300);
      balloon.setContentString('<h3>' + placemark_name + '</h3>' + placemark_desc_active);
      ge.setBalloon(balloon);
    }
  });
}

  
function base_setup(instance){
  ge = instance;
  ge.getWindow().setVisibility(true);
  document.getElementById('installed-plugin-version').innerHTML = ge.getPluginVersion().toString();
}

function init() {
  google.earth.createInstance('map3d', initCallback, failureCallback);
}

function failureCallback(errorCode) {}
