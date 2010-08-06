function initialize() {
  var mapDiv = document.getElementById('map-canvas');
  var map = new google.maps.Map(mapDiv, {
    center: new google.maps.LatLng(24.886436490787712, -70.2685546875),
    zoom: 4,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var paths = [new google.maps.LatLng(25.774252, -80.190262),
    new google.maps.LatLng(18.466465, -66.118292),
    new google.maps.LatLng(32.321384, -64.75737)];

  var shape = new google.maps.Polygon({
    paths: paths,
    strokeColor: '#ff0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#ff0000',
    fillOpacity: 0.35
  });

  shape.setMap(map);
}
