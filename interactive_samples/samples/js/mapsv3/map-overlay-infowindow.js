function initialize() {
  var mapDiv = document.getElementById('map-canvas');
  var map = new google.maps.Map(mapDiv, {
    center: new google.maps.LatLng(40.740, -74.18),
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var content = '<strong>A info window!</strong>';

  var infowindow = new google.maps.InfoWindow({
    content: content,
    position: new google.maps.LatLng(40.740, -74.18)
  });

  infowindow.open(map);
}
