/*
 * This demo shows how to set the icons for Pins and Labels
 * on the Local Search Control.
*/

google.load("maps", "2");
google.load("elements", "1", {
  packages : ["localsearch"]
});

function OnLoad() {
  var content = document.getElementById("content");
  content.style.border = "1px solid #979797";
  content.style.height = "350px";

  var map = new google.maps.Map2(content);
  map.setMapType(G_PHYSICAL_MAP);
  map.setCenter(new google.maps.LatLng(46.688681, 7.686800), 11);
  var options = {};
  options.pins = {};
  options.labels = {};
  options.pins["local"] = 'blue_mid';
  options.pins["kml"] = 'red_mid';
  options.labels["local"] = 'green_round';
  options.labels["kml"] = 'blue_square';
  options.listingTypes = 'blended';
  options.searchFormHint = 'Search for \'home\'';
  var lsc = new google.elements.LocalSearch(options);
  map.addControl(lsc);
}

google.setOnLoadCallback(OnLoad);