var ge;

var vceCount = 0;

google.load("earth", "1");

function init() {
  google.earth.createInstance('map3d', initCallback, failureCallback);

  addSampleUIHtml(
    '<span id="vc-indicator" style="background-color: #a00; color: #fff; font-weight: bold; visibility: hidden;">View changed!</span><br/>' +
    '<code>viewchangeend</code> Count: <span style="font-weight: bold;" id="vce-counter">0</span>'
  );
}

function initCallback(instance) {
  ge = instance;
  ge.getWindow().setVisibility(true);

  // add a navigation control
  ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);

  // add some layers
  ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
  ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);

  var vcTimeout = null;

  google.earth.addEventListener(ge.getView(), 'viewchange', function() {
    document.getElementById('vc-indicator').style.visibility = 'visible';

    if (vcTimeout !== null)
      window.clearTimeout(vcTimeout);

    // hide the 'view changed' message after 250 ms of
    // inactivity
    vcTimeout = window.setTimeout(function() {
      document.getElementById('vc-indicator').style.visibility = 'hidden';
      vcTimeout = null;
    }, 250);
  });

  google.earth.addEventListener(ge.getView(), 'viewchangeend', function() {
    vceCount++;
    document.getElementById('vce-counter').innerHTML = vceCount;
  });

  document.getElementById('installed-plugin-version').innerHTML =
    ge.getPluginVersion().toString();
}

function failureCallback(errorCode) {
}
