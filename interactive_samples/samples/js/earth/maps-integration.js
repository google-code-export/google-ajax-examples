var map;
var ge;

google.load("maps", "2.x");

function init() {
  map = new GMap2(document.getElementById('map3d'));
  map.setCenter(new GLatLng(37, -122), 12);

  var mapui = map.getDefaultUI();
  mapui.maptypes.physical = false;
  map.setUI(mapui);

  // add 'Earth' as one of the map types
  map.addMapType(G_SATELLITE_3D_MAP);

  // create a marker
  var marker = new GMarker(new GLatLng(37, -122));
  GEvent.addListener(marker, "click", function() {
    var html = '<div style="width: 210px; padding-right: 10px">Hello world!</div>';
    marker.openInfoWindowHtml(html);
  });

  map.addOverlay(marker);
  google.maps.Event.trigger(marker, "click");

  // create a polyline (LineString Placemark in KML)
  var polyline = new GPolyline([
      new GLatLng(37.04, -122.04),
      new GLatLng(37.02, -122.02),
      new GLatLng(37.03, -122.01),
      new GLatLng(37.01, -121.99)
    ], "#ff0000", 10);

  map.addOverlay(polyline);

  // do stuff with Earth when the user switches to it
  GEvent.addListener(map, 'maptypechanged', function() {
    if (ge)
      return;

    map.getEarthInstance(function(pluginInstance) {
      ge = pluginInstance;
      doStuffWithEarth();
    });
  });
}

function doStuffWithEarth() {
  document.getElementById('installed-plugin-version').innerHTML =
    ge.getPluginVersion().toString();
}
