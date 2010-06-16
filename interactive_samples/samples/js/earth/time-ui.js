//Demonstrating access to Historical Imagery
//set some global variables
var ge;
var gex;
google.load("earth", "1");

function initCallback(instance) {
  base_setup(instance);
  
  addPlacemark([37.7755,-122.4242], '1988');
  addPlacemark([37.7792,-122.4226], '1995');
  addPlacemark([37.7792,-122.4210], '2012');

  //add buttons and textbox
  jumpHtml = '<input id="inputTime" type="text">';
  document.getElementById('sample-ui').innerHTML += jumpHtml;
  addSampleButton('Set time', setTime);
  addSampleButton('Set current time', setCurrentTime);
  //add Time Machine buttons
  addSampleButton('Enable TM', enableTimeMachine);
  addSampleButton('Disable TM', disableTimeMachine);
  //add UI buttons
  addSampleButton('Enable UI', enableUI);
  addSampleButton('Disable UI', disableUI);

  enableTimeMachine();

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

function setTime(){
  var timeText = document.getElementById('inputTime').value;
  var gts = ge.createTimeStamp('');
  gts.getWhen().set(timeText);
  ge.getTime().setTimePrimitive(gts);
}

function setCurrentTime(){
  var gts = ge.getTime().getSystemTime();
  ge.getTime().setTimePrimitive(gts);
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


function enableTimeMachine(){
  ge.getTime().setHistoricalImageryEnabled(true);
}

function disableTimeMachine(){
  ge.getTime().setHistoricalImageryEnabled(false);
}

function enableUI(){
  ge.getTime().getControl().setVisibility(true);
}

function disableUI(){
  ge.getTime().getControl().setVisibility(false);
}
