function loadMap() {
  map = new GMap2(document.getElementById("content"));
  map.setCenter(new GLatLng(37, -122));
  div = document.getElementById('dir');
  var dir = new GDirections(map, div);

  dir.loadFromWaypoints(["Paris",
                       "Versailles",
                       "Fontainebleau"],
                      {locale: "fr"});
}
