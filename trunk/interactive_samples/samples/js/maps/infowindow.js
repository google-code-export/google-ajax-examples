function loadMap() {
  map = new GMap2(document.getElementById("content"));
  map.setCenter(new GLatLng(37, -122), 10);
 
  map.openInfoWindowHtml(
    map.getCenter(),
    "<center>Hello<br/>" +
    "World</center>");
}
