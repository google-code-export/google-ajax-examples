function loadMap() {
  map = new GMap2(document.getElementById("content"));
  map.setCenter(new GLatLng(37.496675,-122.15625), 10);

  var traffic = new GTrafficOverlay();
  map.addOverlay(traffic);
}
