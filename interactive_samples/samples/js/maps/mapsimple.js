function loadMap() {
  if (GBrowserIsCompatible()) {
    var map = new GMap2(document.getElementById("content"));
    map.setCenter(new GLatLng(37.4419, -122.1419), 13);
  }
}