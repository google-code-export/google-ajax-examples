var infowindow, map;
function initialize() {
  var mapDiv = document.getElementById('map-canvas');
  map = new google.maps.Map(mapDiv, {
    center: new google.maps.LatLng(40.740, -74.18),
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var content = '<strong>I am a shared info window!</strong>';

  infowindow = new google.maps.InfoWindow({
    content: content
  });

  google.maps.event.addListenerOnce(map, 'idle', addMarkers);
}

function addMarkers() {
  var bounds = map.getBounds();
  var southWest = bounds.getSouthWest();
  var northEast = bounds.getNorthEast();
  var lngSpan = northEast.lng() - southWest.lng();
  var latSpan = northEast.lat() - southWest.lat();
  for (var i = 0; i < 5; i++) {
    var latLng = new google.maps.LatLng(southWest.lat() + latSpan * Math.random(),
                                        southWest.lng() + lngSpan * Math.random());
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, this);
    });
  }
}
