function loadMap() {
  map = new GMap2(document.getElementById("content"));
  map.setCenter(new GLatLng(37, -122));
  var marker = new GMarker(map.getCenter());
  map.addOverlay(marker);
  GEvent.addListener(marker, "mouseover", function() {
    marker.setImage("images/yellow.png");
  });
  GEvent.addListener(marker, "mouseout", function() {
    marker.setImage("images/marker.png");
  });
}
