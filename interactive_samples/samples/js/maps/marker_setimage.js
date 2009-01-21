function loadMap() {
  map = new GMap2(document.getElementById("content"));
  map.setCenter(new GLatLng(37, -122), 12);
  var marker = new GMarker(map.getCenter());
  map.addOverlay(marker);
  GEvent.addListener(marker, "mouseover", function() {
    marker.setImage("http://gmaps-samples.googlecode.com/svn/trunk/markers/blue/blank.png");
  });
  GEvent.addListener(marker, "mouseout", function() {
    marker.setImage("http://gmaps-samples.googlecode.com/svn/trunk/markers/green/blank.png");
  });
}