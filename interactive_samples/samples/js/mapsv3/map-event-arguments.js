function initialize() {
  var mapDiv = document.getElementById('map-canvas');
  var map = new google.maps.Map(mapDiv, {
    center: new google.maps.LatLng(37.4419, -122.1419),
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var infoWindow = new google.maps.InfoWindow();
  google.maps.event.addListener(map, 'click', function(event) {
    var html = 'The LatLng value is: ' + event.latLng + ' at zoom level ' + map.getZoom();
    infoWindow.setContent(html);
    infoWindow.setPosition(event.latLng);
    infoWindow.open(map);
  });
}
