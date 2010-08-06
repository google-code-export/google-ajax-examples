function initialize() {
  var mapDiv = document.getElementById('map-canvas');
  var map = new google.maps.Map(mapDiv, {
    center: new google.maps.LatLng(40.740, -74.18),
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var imageBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(40.712216,-74.22655),
      new google.maps.LatLng(40.773941,-74.12544));

  var oldmap = new google.maps.GroundOverlay(
      "http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg",
      imageBounds);
  oldmap.setMap(map);
}
