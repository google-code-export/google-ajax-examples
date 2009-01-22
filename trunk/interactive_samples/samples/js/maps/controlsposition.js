function loadMap() {
  if (GBrowserIsCompatible()) {
    alert('Double click to change control position.');
    var map = new GMap2(document.getElementById("content"));
    map.setCenter(new GLatLng(37.4419, -122.1419), 13);
    var mapTypeControl = new GMapTypeControl();
    var topRight = new GControlPosition(G_ANCHOR_TOP_RIGHT, new GSize(10,10));
    var bottomRight = new GControlPosition(G_ANCHOR_BOTTOM_RIGHT, new GSize(10,10));
    map.addControl(mapTypeControl, topRight);
    GEvent.addListener(map, "dblclick", function() {
      map.removeControl(mapTypeControl);
      map.addControl(new GMapTypeControl(), bottomRight);
    });
    map.addControl(new GSmallMapControl());
  }
}