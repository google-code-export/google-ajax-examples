function loadMap() {
  map = new GMap2(document.getElementById("content"));
  map.setCenter(new GLatLng(-22.91, -43.20), 13);
  GEvent.addListener(map, "click", function(marker, point) {
    if (marker) {
      map.removeOverlay(marker);
    } else {
      map.addOverlay(new GMarker(point));
    }
  });
}

