var ge;

/* If connecting to a private Google Earth Enterprise virtual server
 * or an Earth Builder layer that requires authentication,
 * you will need to specify your Google Maps Premier client id, as
 * documented at
 * http://code.google.com/apis/maps/documentation/premier/guide.html#EarthAPI
*/

// Set optional premier parameters
// var params = {"other_params":"client=gme-yourKey&sensor=false"};
var params = {};

google.load("earth", "1", params);

function init() {
  google.earth.createInstance('map3d', initCB, failureCB);
}

function initCB(instance) {
  ge = instance;
  ge.getWindow().setVisibility(true);

  // Call the function which loads a secondary GEE virtual server
  // so users automatically see data from both servers.
  addSideDatabase();

  // Add controls for the window
  ge.getOptions().setStatusBarVisibility(true);
  ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);

  // Add Google Earth layers
  ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
  ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);

  // Update the view in Google Earth
  var lookAt = ge.createLookAt('');
  lookAt.setLatitude(41.26);
  lookAt.setLongitude(-100.00);
  lookAt.setRange(800000.0); //default is 0.0
  ge.getView().setAbstractView(lookAt);
  }

  function failureCB(errorCode) {
    alert(errorCode);
  }

  function sideDatabaseSuccess(db) {
    sideDatabase = db;
    db.setDrawOrder(2);
  }

  function sideDatabaseFail() {
      alert('ALERT! Failed to add side database connection!');
  }

  /** Add the secondary GEE virtual server. 
  *     This function operates similarly to the File => Add Database feature
  *     in Google Earth EC.
  */
  function addSideDatabase() {
    window.google.earth.addSideDatabase(
      ge, "https://earthbuilder.google.com/08112974690991164587-14021399993526185904-4/kh/",
      sideDatabaseSuccess,
      sideDatabaseFail,
      {
        userName: '',
        password: '' 
      }
    );
  }

