google.load("maps", "2");
google.load("elements", "1", {
  packages : ["localsearch"]
});

function initialize() {
  var mapCanvas = document.getElementById("mapCanvas");
  var resultsCanvas = document.getElementById("resultsCanvas");

  var map2 = new google.maps.Map2(mapCanvas);
  map2.setMapType(G_PHYSICAL_MAP);
  map2.setCenter(new google.maps.LatLng(34.431, -119.573), 13);
  map2.addControl(new google.maps.SmallMapControl());
  map2.addControl(new google.maps.MapTypeControl());


  // Set where the results will appear
  options = new Object();
  options.resultList = resultsCanvas;
  options.resultFormat = "multi-line1";
  var lsc2 = new google.elements.LocalSearch(options);
  map2.addControl(lsc2, new GControlPosition(G_ANCHOR_TOP_LEFT, new GSize(-282, -2)));
}
google.setOnLoadCallback(initialize);