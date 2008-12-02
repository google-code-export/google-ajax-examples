function loadMap() {
  map = new GMap2(document.getElementById("content"));
  map.setCenter(new GLatLng(-33.872, 151.20385));
  map.setMapType(G_SATELLITE_MAP);
}
