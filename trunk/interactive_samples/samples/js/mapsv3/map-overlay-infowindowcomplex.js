function initialize() {
  var mapDiv = document.getElementById('map-canvas');
  var map = new google.maps.Map(mapDiv, {
    center: new google.maps.LatLng(40.740, -74.18),
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var content = '<strong>A info window!</strong><br/>That is bound to a marker';

  var infowindow = new google.maps.InfoWindow({
    content: content
  });

  var marker = new google.maps.Marker({
    map: map,
    position: map.getCenter(),
    draggable: true
  });

  infowindow.open(map, marker);
}
