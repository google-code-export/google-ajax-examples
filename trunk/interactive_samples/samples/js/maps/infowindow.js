function loadMap() {
  map = new GMap2(document.getElementById("content"));
  map.setCenter(new GLatLng(37, -122));
 
  map.openInfoWindowHtml(
    map.getCenter(),
    "<center>Google<br/>" +
    "Australia</center>");
}
