/* 
 * Normally, when a search completes, the first search result is selected, 
 * the map is panned to this result, and the info window associated with the 
 * result is opened. Setting this option to true allows an application to 
 * suppress this initial info window open. The default value is false
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
  
  var options = {
    suppressInitialResultSelection: true
  }
  var lsc = new google.elements.LocalSearch(options);
  map.addControl(lsc);
}

google.setOnLoadCallback(OnLoad);
