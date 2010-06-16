//Demonstration of setting the rate of play
var ge;
var gex;
google.load('earth','1');


function initCallback(instance) {
  base_setup(instance);
  
  addPlacemark([37.7755,-122.4242], '1988');
  addPlacemark([37.7792,-122.4226], '1995');
  addPlacemark([37.7792,-122.4210], '2012');

  //add buttons and textbox
  jumpHtml = '<input type="text" id="clockRate" value="60*60*24*365">';
  document.getElementById('sample-ui').innerHTML += jumpHtml;
  addSampleButton('Set rate', setRate);

  var la = ge.createLookAt('');
  la.set(37.77433, -122.420725, 0, ge.ALTITUDE_RELATIVE_TO_GROUND, 29, 35, 3500 );
  ge.getView().setAbstractView(la);
}

function addPlacemark(latLon, selectedTime){
  //create placemark using extension library
  pm = gex.dom.addPointPlacemark( latLon, { name: selectedTime});
  //create timestamp and set time primitive on placemark
  ts = ge.createTimeStamp('');
  ts.getWhen().set(selectedTime);
  pm.setTimePrimitive(ts);
}

function setRate(rate){
  var rate = document.getElementById('clockRate').value;
  ge.getTime().setRate(eval(rate));
  }

  
function base_setup(instance){
  ge = instance;
  ge.getWindow().setVisibility(true);
  gex = new GEarthExtensions(ge);
  document.getElementById('installed-plugin-version').innerHTML = ge.getPluginVersion().toString();
}

function init() {
  google.earth.createInstance('map3d', initCallback, failureCallback);
}

function failureCallback(errorCode) {}


