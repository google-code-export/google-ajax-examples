function initialize() {
  var mapDiv = document.getElementById('map-canvas');
  var latLng = new google.maps.LatLng(37.4419, -122.1419);
  var map = new google.maps.Map(mapDiv, {
    center: latLng,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var image = 'http://code.google.com/apis/maps/documentation/javascript/examples/images/beachflag.png';
  var myLatLng = new google.maps.LatLng(-33.890542, 151.274856);
  var beachMarker = new google.maps.Marker({
    position: latLng,
    map: map,
    icon: image
  });
}
