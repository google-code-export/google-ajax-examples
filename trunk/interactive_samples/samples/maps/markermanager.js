function loadMap() {
  map = new GMap2(document.getElementById("content"));
  map.setCenter(new GLatLng(49, 17), 2);
  map.addControl(new GSmallZoomControl());

  var mgr = new GMarkerManager(map);
  for (var z = 10; count > 0; z -= 2, count /= 4) {
    var markers = [];
    var count = Math.pow(2, z);
    for (var i = 0; i < count; ++i) {
      var lat = 38 + Math.random() * 20;
      var lng = -9 + Math.random() * 52;
      markers.push(
        new GMarker(new GLatLng(lat, lng)));
    }
    mgr.addMarkers(markers, z);
  }
  mgr.refresh();
}
