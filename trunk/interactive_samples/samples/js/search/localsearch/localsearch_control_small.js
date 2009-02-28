google.load("maps", "2");
google.load("elements", "1", {
  packages : ["localsearch"]
});

function OnLoad() {
  var content = document.getElementById("content");
  content.style.border = "1px solid #979797";
  content.style.width = "300px";
  content.style.height = "300px";

  // Create a separate div for the results
  var results = document.createElement('div');
  results.style.marginTop = '30px';
  results.style.width = "300px";
  document.body.appendChild(results);

  // Create and Center a Map
  var map2 = new google.maps.Map2(content);
  map2.setCenter(new google.maps.LatLng(34.431, -119.573), 13);
  map2.addControl(new google.maps.SmallMapControl());
  map2.addControl(new google.maps.MapTypeControl());

  // Set where the results will appear
  options = new Object();
  options.resultList = results;

  var lsc2 = new google.elements.LocalSearch(options);
  map2.addControl(lsc2, new GControlPosition(G_ANCHOR_BOTTOM_LEFT, new GSize(-1,-30)));
}

google.setOnLoadCallback(OnLoad);