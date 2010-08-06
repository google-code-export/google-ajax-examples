var line;
function initialize() {
  var mapDiv = document.getElementById('map-canvas');
  var map = new google.maps.Map(mapDiv, {
    center: new google.maps.LatLng(0, -180),
    zoom: 2,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  var path = [new google.maps.LatLng(37.772323, -122.214897),
    new google.maps.LatLng(21.291982, -157.821856),
    new google.maps.LatLng(-18.142599, 178.431),
    new google.maps.LatLng(-27.46758, 153.027892)];

  line = new google.maps.Polyline({
    strokeColor: '#ff0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  line.setMap(map);

  google.maps.event.addListener(map, 'click', addNewPoint);
}

function addNewPoint(e) {
  var path = line.getPath();
  path.push(e.latLng);
}
