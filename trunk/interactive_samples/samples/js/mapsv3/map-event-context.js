function initialize() {
  var mapDiv = document.getElementById('map-canvas');
  var map = new google.maps.Map(mapDiv, {
    center: new google.maps.LatLng(37.4419, -122.1419),
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  google.maps.event.addListener(map, 'dragend', function() {
    var center = map.getCenter();
    alert(center.toString());
  });
}
