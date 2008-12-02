function loadMap() {
  map = new GMap2(document.getElementById("content"));
  map.setCenter(new GLatLng(37, -122));
  var listener = GEvent.addListener(
    map, "moveend", function() {
      alert(map.getCenter().toString());
      GEvent.removeListener(listener);
  });
}
