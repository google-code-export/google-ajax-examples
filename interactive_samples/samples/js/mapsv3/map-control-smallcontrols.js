function initialize() {
  var mapDiv = document.getElementById('map-canvas');
  var map = new google.maps.Map(mapDiv, {
    center: new google.maps.LatLng(37.4419, -122.1419),
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
    },
    navigationControl: true,
    navigationControlOptions: {
      style: google.maps.NavigationControlStyle.SMALL
    }
  });
}
