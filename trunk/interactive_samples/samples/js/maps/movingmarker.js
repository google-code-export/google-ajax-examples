function loadMap() {
  if (GBrowserIsCompatible()) {
    alert('Drag the marker!');
    var map = new GMap2(document.getElementById("content"));
    var center = new GLatLng(37.4419, -122.1419);
    map.setCenter(center, 13);

    var marker = new GMarker(center, {draggable: true});

    GEvent.addListener(marker, "dragstart", function() {
      map.closeInfoWindow();
    });

    GEvent.addListener(marker, "dragend", function() {
      marker.openInfoWindowHtml("Just bouncing along...");
    });

    map.addOverlay(marker);
  }
}