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

  function eventHandler(event) {
    var text = 'Click:';

    function addToMessage(append1, append2) {
      text += ' ' + append1 + ': ' + append2 + '\n' ;
    }

    addToMessage('target type', event.getTarget().getType());
    addToMessage('currentTarget type', event.getCurrentTarget().getType());
    addToMessage('button', event.getButton());
    addToMessage('clientX', event.getClientX());
    addToMessage('clientY', event.getClientY());
    addToMessage('screenX', event.getScreenX());
    addToMessage('screenY', event.getScreenY());
    addToMessage('latitude', event.getLatitude());
    addToMessage('longitude', event.getLongitude());
    addToMessage('altitude', event.getAltitude());
    addToMessage('didHitGlobe', event.getDidHitGlobe());
    addToMessage('altKey', event.getAltKey());
    addToMessage('ctrlKey', event.getCtrlKey());
    addToMessage('shiftKey', event.getShiftKey());
    addToMessage('timeStamp', event.getTimeStamp());

    // Prevent default balloon from popping up for marker placemarks
    event.preventDefault();

    // wrap alerts in API callbacks and event handlers
    // in a setTimeout to prevent deadlock in some browsers
    setTimeout(function() {
      alert(text);
    }, 0);
  }

  // listen to the click event on the globe and window
  google.earth.addEventListener(ge.getGlobe(), 'click', eventHandler);
  google.earth.addEventListener(ge.getWindow(), 'click', eventHandler);

  // just for debugging purposes
  document.getElementById('installed-plugin-version').innerHTML =
    ge.getPluginVersion().toString();
}

function failureCallback(errorCode) {
}
