var ge;

var map = null;

google.load("earth", "1");
google.load("maps", "2");

function init() {
  google.earth.createInstance('map3d', initCallback, failureCallback);
  map = new GMap2(document.getElementById('map'));
  map.setCenter(new GLatLng(0, 0), 0);
}

function initCallback(instance) {
  ge = instance;
  ge.getWindow().setVisibility(true);

  // add a navigation control
  ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);

  // add some layers
  ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
  ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);

  var la = ge.createLookAt('');
  la.set(37, -122, 0, ge.ALTITUDE_RELATIVE_TO_GROUND, 0 , 0, 100000);
  ge.getView().setAbstractView(la);
  // just for comparison
  ge.getOptions().setOverviewMapVisibility(true);

  google.earth.addEventListener(ge.getView(), 'viewchange', function(evt) {
    map.clearOverlays();

    var totalBounds = new GLatLngBounds();

    // get the globe bounds (method 1)
    var globeBounds = ge.getView().getViewportGlobeBounds();
    var fakeBoundsCenter = null;

    if (globeBounds) {
      globeBounds.setNorth(Math.min(globeBounds.getNorth(), 85));
      globeBounds.setSouth(Math.max(globeBounds.getSouth(), -85));

      if (globeBounds.getEast() == 180 && globeBounds.getWest() == -180) {
        fakeBoundsCenter = new GLatLng(0, 0);
        var globeBoundsPolygon = new GPolygon([
            new GLatLng(globeBounds.getNorth(), -179),
            new GLatLng(globeBounds.getNorth(), 0),
            new GLatLng(globeBounds.getNorth(), 179),
            new GLatLng(globeBounds.getSouth(), 179),
            new GLatLng(globeBounds.getSouth(), 0),
            new GLatLng(globeBounds.getSouth(), -179),
            new GLatLng(globeBounds.getNorth(), -179)],
            '#0000ff', 2, 1.00,
            '#0000ff',    0.25,
            { clickable: false });
      } else {
        var globeBoundsPolygon = new GPolygon([
            new GLatLng(globeBounds.getNorth(), globeBounds.getWest()),
            new GLatLng(globeBounds.getNorth(), globeBounds.getEast()),
            new GLatLng(globeBounds.getSouth(), globeBounds.getEast()),
            new GLatLng(globeBounds.getSouth(), globeBounds.getWest()),
            new GLatLng(globeBounds.getNorth(), globeBounds.getWest())],
            '#0000ff', 2, 1.00,
            '#0000ff',    0.25,
            { clickable: false });
      }

      map.addOverlay(globeBoundsPolygon);

      var polyBounds = globeBoundsPolygon.getBounds();
      totalBounds.extend(polyBounds.getNorthEast());
      totalBounds.extend(polyBounds.getSouthWest());
    }

    // hit test the corners (method 2)
    var hitTestTL = ge.getView().hitTest(0, ge.UNITS_FRACTION, 0, ge.UNITS_FRACTION, ge.HIT_TEST_GLOBE);
    var hitTestTR = ge.getView().hitTest(1, ge.UNITS_FRACTION, 0, ge.UNITS_FRACTION, ge.HIT_TEST_GLOBE);
    var hitTestBR = ge.getView().hitTest(1, ge.UNITS_FRACTION, 1, ge.UNITS_FRACTION, ge.HIT_TEST_GLOBE);
    var hitTestBL = ge.getView().hitTest(0, ge.UNITS_FRACTION, 1, ge.UNITS_FRACTION, ge.HIT_TEST_GLOBE);

    // ensure that all hit tests succeeded (i.e. the viewport is 2d-mappable)
    if (hitTestTL && hitTestTR && hitTestBL && hitTestBR) {
      var hitTestBoundsPolygon = new GPolygon([
          new GLatLng(hitTestTL.getLatitude(), hitTestTL.getLongitude()),
          new GLatLng(hitTestTR.getLatitude(), hitTestTR.getLongitude()),
          new GLatLng(hitTestBR.getLatitude(), hitTestBR.getLongitude()),
          new GLatLng(hitTestBL.getLatitude(), hitTestBL.getLongitude()),
          new GLatLng(hitTestTL.getLatitude(), hitTestTL.getLongitude())],
          '#ff0000', 2, 1.00,
          '#ff0000',    0.25,
          { clickable: false });
      map.addOverlay(hitTestBoundsPolygon);

      var polyBounds = hitTestBoundsPolygon.getBounds();
      totalBounds.extend(polyBounds.getNorthEast());
      totalBounds.extend(polyBounds.getSouthWest());
    }

    if (!totalBounds.isEmpty()) {
      map.setCenter(fakeBoundsCenter ? fakeBoundsCenter : totalBounds.getCenter(),
          map.getBoundsZoomLevel(totalBounds));
    }
  });

  document.getElementById('installed-plugin-version').innerHTML =
    ge.getPluginVersion().toString();
}

function failureCallback(errorCode) {
}

/*
<span style="color: #00f">Bounding Box via getViewportGlobeBounds()</span><br/>
<span style="color: #f00">Bounding Box via hitTest()<br/>
&nbsp;&nbsp;&nbsp;<small>Note: if either of the four plugin corners return a null hitTest, the red polygon won't appear.</small></span><br/>
<div id="map" style="width: 250px; height: 250px;"></div>

*/
