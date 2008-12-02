function loadMap() {
  map = new GMap2(document.getElementById("content"));
  map.setCenter(new GLatLng(37.496675,-122.15625), 10);
  map.addControl(new GSmallMapControl());
  map.addControl(new GMapTypeControl());
}
