function loadMap() {
  map = new GMap2(document.getElementById("content"));
  map.setCenter(new GLatLng(22.77, 78.05), 4);

  function newMarker(lat, lng, name) {
    var marker = new GMarker(new GLatLng(lat, lng));
    GEvent.addListener(marker, "click", function() {
      marker.openInfoWindowHtml(name);
    });
    return marker;
  }
  map.addOverlay(newMarker(28.63, 77.21, "New Delhi"));
}
