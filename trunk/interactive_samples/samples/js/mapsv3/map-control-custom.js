function initialize() {
  var mapDiv = document.getElementById('map-canvas');
  var map = new google.maps.Map(mapDiv, {
    center: new google.maps.LatLng(37.4419, -122.1419),
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var control = document.createElement('DIV');
  control.style.padding = '5px';
  control.style.border = '1px solid #000';
  control.style.backgroundColor = 'white';
  control.style.cursor = 'pointer';
  control.innerHTML = 'A control';
  control.index = 1;

  google.maps.event.addDomListener(control, 'click', function() {
    alert('You clicked the control!');
  });
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(control);
}
