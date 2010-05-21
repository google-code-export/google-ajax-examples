function initialize() {
  var mapDiv = document.getElementById('map-canvas');
  var map = new google.maps.Map(mapDiv, {
    center: new google.maps.LatLng(37.4419, -122.1419),
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var myEventListener = google.maps.event.addListener(map, 'click', function() {
    google.maps.event.removeListener(myEventListener);
    alert('Hello, the event has been removed');
  });
}
