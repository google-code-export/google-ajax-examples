/*
 * The Local Search Control for Google Maps performs AJAX Search API style 
 * Local Searches on an existing map. If you already have a Google Maps 
 * application and want to add search capabilities it doesn't get much 
 * easier than this. Or, if you want to spruce up your Local Search results,
 * this control will help you easily integrate those results onto a Google Map.
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
  var lsc = new google.elements.LocalSearch();
  map.addControl(lsc);
}

google.setOnLoadCallback(OnLoad);