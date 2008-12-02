function loadMap() {
  map = new GMap2(document.getElementById("content"));
  map.setCenter(new GLatLng(37, -122));
  var div = document.getElementById('dir');
  var dir = new GDirections(map, div);

  GEvent.addListener(dir, "error", function(x) {
    alert('Error: ' + dir.getStatus().code);
  });

  dir.load('San Francisco, CA to San Jose, CA');
}
