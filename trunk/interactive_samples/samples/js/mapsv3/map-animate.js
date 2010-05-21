function initialize() {
  var mapDiv = document.getElementById('map-canvas');
  var map = new google.maps.Map(mapDiv, {
    center: new google.maps.LatLng(37.4419, -122.1419),
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
    window.setTimeout(function() {
      map.panTo(new google.maps.LatLng(37.4569, -122.1569));
    }, 1000);
  });
}
