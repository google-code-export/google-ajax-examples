var map;
function initialize() {
  var mapDiv = document.getElementById('map-canvas');
  map = new google.maps.Map(mapDiv, {
    center: new google.maps.LatLng(37.4419, -122.1419),
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  google.maps.event.addListenerOnce(map, 'tilesloaded', addMarkers);

}

function addMarkers() {
  var bounds = map.getBounds();
  var southWest = bounds.getSouthWest();
  var northEast = bounds.getNorthEast();
  var lngSpan = northEast.lng() - southWest.lng();
  var latSpan = northEast.lat() - southWest.lat();
  for (var i = 0; i < 10; i++) {
    var latLng = new google.maps.LatLng(southWest.lat() + latSpan * Math.random(),
                                        southWest.lng() + lngSpan * Math.random());
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  }
}
