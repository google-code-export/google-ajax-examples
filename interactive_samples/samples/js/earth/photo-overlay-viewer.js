var ge;

var photoOverlay = null;

google.load("earth", "1");

function init() {
  google.earth.createInstance('map3d', initCallback, failureCallback);

  addSampleButton('Enter Photo Overlay', enterPhotoOverlay);
  addSampleButton('Exit Photo Overlay', exitPhotoOverlay);
}

function initCallback(instance) {
  ge = instance;
  ge.getWindow().setVisibility(true);

  // add a navigation control
  ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);

  // add some layers
  ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
  ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);

  // create the photo overlay by fetching it out of a KML file
  var href = 'http://earth-api-samples.googlecode.com/svn/trunk/examples/' +
             'static/spaceneedle_photooverlay.kml';

  google.earth.fetchKml(ge, href, function(kmlObject) {
    if (!kmlObject) {
      // wrap alerts in API callbacks and event handlers
      // in a setTimeout to prevent deadlock in some browsers
      setTimeout(function() {
        alert('Bad or null KML.');
      }, 0);
      return;
    }

    // Show the entire KML file in the plugin.
    ge.getFeatures().appendChild(kmlObject);

    // Walk the DOM looking for a KmlPhotoOverlay
    walkKmlDom(kmlObject, function() {
      if (this.getType() == 'KmlPhotoOverlay') {
        photoOverlay = this;
        return false; // stop the DOM walk here.
      }
    });
  });

  document.getElementById('installed-plugin-version').innerHTML =
    ge.getPluginVersion().toString();
}

function failureCallback(errorCode) {
}

function enterPhotoOverlay() {
  if (!photoOverlay) {
    alert('No photo overlay found!');
    return;
  }

  ge.getPhotoOverlayViewer().setPhotoOverlay(photoOverlay);
}

function exitPhotoOverlay() {
  // just like setBalloon(null)
  ge.getPhotoOverlayViewer().setPhotoOverlay(null);
}
